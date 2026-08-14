import { fileURLToPath } from 'url'
import path from 'path'
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import Anthropic from '@anthropic-ai/sdk'
import { destinations, festivals } from './context.js'

// Load server/.env by absolute path so it's found regardless of the cwd
// the process was launched from (npm scripts, `node server/index.js` from
// the repo root, etc. all resolve `.env` relative to cwd by default).
dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), '.env') })

const app = express()
app.use(cors())
app.use(express.json())

// Reads ANTHROPIC_API_KEY from the environment — never hardcode the key.
const client = new Anthropic()

const SYSTEM_PROMPT = `You are the AkwaabaGH travel assistant — an AI guide embedded in a Ghana tourism website. You help visitors find destinations, plan trips, and time visits to festivals.

Only recommend places from the CATALOG below — never invent a destination or festival that isn't listed. Pick at most 3 relevant destination_ids and 2 relevant festival_ids; leave an array empty if nothing in the catalog genuinely fits the question. Keep "reply" to 1-3 warm, concrete sentences. Always reply in English (the site has a separate UI-only Twi toggle, unrelated to this chat). If asked about something outside Ghana tourism, politely redirect to what you can help with.

DESTINATIONS CATALOG (id | name | region | category | tagline | rating):
${destinations.map((d) => `${d.id} | ${d.name} | ${d.region} | ${d.category} | ${d.tagline} | ${d.rating}`).join('\n')}

FESTIVALS CATALOG (id | name | region | people | when | tag):
${festivals.map((f) => `${f.id} | ${f.name} | ${f.region} | ${f.people} | ${f.dateLabel} | ${f.tag}`).join('\n')}`

const RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    reply: { type: 'string', description: "1-3 sentence reply to the user's message" },
    destination_ids: { type: 'array', items: { type: 'string' }, description: 'Up to 3 destination ids from the catalog, or an empty array' },
    festival_ids: { type: 'array', items: { type: 'string' }, description: 'Up to 2 festival ids from the catalog, or an empty array' },
  },
  required: ['reply', 'destination_ids', 'festival_ids'],
  additionalProperties: false,
}

// In-memory cache — same page content gets re-translated a lot (every
// visitor viewing the same destination/festival, every assistant reply that
// repeats a recommendation), and the Khaya free tier has a limited quota, so
// avoid re-hitting the API for text we've already translated this process.
const translationCache = new Map()

async function translateText(text, lang) {
  const cacheKey = `${lang}:${text}`
  const cached = translationCache.get(cacheKey)
  if (cached) return cached

  const khayaRes = await fetch('https://translation-api.ghananlp.org/v1/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Ocp-Apim-Subscription-Key': process.env.KHAYA_API_KEY,
    },
    body: JSON.stringify({ in: text, lang }),
  })

  if (!khayaRes.ok) {
    const errBody = await khayaRes.text()
    throw new Error(`Khaya translate error (status ${khayaRes.status}): ${errBody.slice(0, 300)}`)
  }

  // Khaya's /v1/translate returns the translated string directly as the
  // JSON body (e.g. "Kofi rekɔ sukuu"), not wrapped in an object — but
  // fall back to common wrapper shapes defensively in case that changes.
  const raw = await khayaRes.json()
  const translation =
    typeof raw === 'string' ? raw : raw?.translation ?? raw?.output ?? raw?.out ?? raw?.text ?? String(raw)

  translationCache.set(cacheKey, translation)
  return translation
}

// Keep only the most recent turns sent to Claude — bounds cost/latency as a
// chat grows long. The client still keeps and displays the full history.
const MAX_HISTORY_TURNS = 24

app.post('/api/assistant', async (req, res) => {
  const rawMessages = Array.isArray(req.body?.messages) ? req.body.messages : null
  const messages = rawMessages
    ?.filter(
      (m) =>
        m &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.trim(),
    )
    .map((m) => ({ role: m.role, content: m.content.trim() }))
    .slice(-MAX_HISTORY_TURNS)

  if (!messages || messages.length === 0 || messages[messages.length - 1].role !== 'user') {
    return res.status(400).json({ error: 'messages must be a non-empty array ending with a user turn' })
  }

  // Claude reasons and matches the catalog in English regardless (most
  // reliable for the structured id-picking task) — when the site is in Twi
  // mode we translate just the final reply through Khaya before returning it.
  const wantsTwi = req.body?.lang === 'tw'

  try {
    // Haiku 4.5 doesn't support `thinking` (adaptive or otherwise) or
    // `output_config.effort` — omit both, structured output alone is plenty
    // for a "pick 1-3 items from a fixed list" task.
    const response = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 1024,
      output_config: {
        format: { type: 'json_schema', schema: RESPONSE_SCHEMA },
      },
      system: SYSTEM_PROMPT,
      messages,
    })

    if (response.stop_reason === 'refusal') {
      const text = "I can't help with that one — try asking about a Ghanaian destination, region, or festival instead."
      return res.json({
        text: wantsTwi ? await translateText(text, 'en-tw').catch(() => text) : text,
        destinationIds: [],
        festivalIds: [],
      })
    }

    const textBlock = response.content.find((block) => block.type === 'text')
    if (!textBlock) throw new Error('No text block in Claude response')

    const parsed = JSON.parse(textBlock.text)
    const replyText = wantsTwi
      ? await translateText(parsed.reply, 'en-tw').catch((err) => {
          console.error(`Khaya translate error (assistant reply): ${err?.message ?? err}`)
          return parsed.reply
        })
      : parsed.reply

    res.json({
      text: replyText,
      destinationIds: Array.isArray(parsed.destination_ids) ? parsed.destination_ids : [],
      festivalIds: Array.isArray(parsed.festival_ids) ? parsed.festival_ids : [],
    })
  } catch (err) {
    // Anthropic SDK errors carry a structured `.error.error` payload with
    // the actual API-side reason (billing, rate limit, bad request, etc.) —
    // log that specifically instead of the full stack, so the real cause
    // (e.g. "credit balance too low") is visible at a glance in the console.
    const apiMessage = err?.error?.error?.message ?? err?.message ?? String(err)
    console.error(`Assistant API error (status ${err?.status ?? 'unknown'}): ${apiMessage}`)
    res.status(500).json({ error: 'assistant_failed' })
  }
})

app.post('/api/translate', async (req, res) => {
  const text = typeof req.body?.text === 'string' ? req.body.text.trim() : ''
  const lang = typeof req.body?.lang === 'string' ? req.body.lang : 'en-tw'
  if (!text) {
    return res.status(400).json({ error: 'text is required' })
  }

  try {
    const translation = await translateText(text, lang)
    res.json({ translation })
  } catch (err) {
    console.error(`Khaya translate error: ${err?.message ?? err}`)
    res.status(502).json({ error: 'translation_failed' })
  }
})

app.get('/api/health', (_req, res) => res.json({ ok: true }))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`AkwaabaGH assistant API listening on http://localhost:${PORT}`)
})
