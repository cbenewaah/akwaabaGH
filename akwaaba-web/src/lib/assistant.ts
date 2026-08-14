import { destinations, getDestination } from '../data/destinations'
import { festivals, getFestival } from '../data/festivals'
import type { Destination, Festival } from '../data/types'

export interface AssistantReply {
  text: string
  destinations?: Destination[]
  festivals?: Festival[]
}

interface AssistantApiResponse {
  text: string
  destinationIds: string[]
  festivalIds: string[]
}

export interface ChatTurn {
  role: 'user' | 'assistant'
  content: string
}

/**
 * Calls the real Claude-powered assistant via the local Express backend
 * (server/index.js), which holds the Anthropic API key server-side. `history`
 * is the full conversation so far, ending with the current user turn — the
 * backend forwards it to Claude as-is so replies stay aware of earlier turns.
 * Claude always reasons in English (most reliable for matching the catalog);
 * when `lang` is 'tw' the backend translates just the final reply through
 * Khaya before sending it back, so the reply matches the site's Twi toggle.
 * Falls back to the local mock (getAssistantReply below) if the backend is
 * unreachable or errors, so the page still works without a running server.
 */
export async function getAssistantReplyAI(history: ChatTurn[], lang: 'en' | 'tw' = 'en'): Promise<AssistantReply> {
  try {
    const res = await fetch('/api/assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history, lang }),
    })
    if (!res.ok) throw new Error(`assistant API returned ${res.status}`)

    const data: AssistantApiResponse = await res.json()
    return {
      text: data.text,
      destinations: data.destinationIds.map(getDestination).filter((d): d is Destination => Boolean(d)),
      festivals: data.festivalIds.map(getFestival).filter((f): f is Festival => Boolean(f)),
    }
  } catch (err) {
    console.warn('Assistant API unavailable, falling back to local mock:', err)
    const lastUserTurn = [...history].reverse().find((m) => m.role === 'user')?.content ?? ''
    return getAssistantReply(lastUserTurn)
  }
}

/**
 * Local rule-based fallback — used when the backend/API key isn't
 * available. Keeps the same AssistantReply shape as the real API.
 */
export function getAssistantReply(prompt: string): AssistantReply {
  const q = prompt.toLowerCase()

  const matchedRegion = ['accra', 'ashanti', 'kumasi', 'volta', 'central', 'cape coast', 'northern', 'western']
    .find((r) => q.includes(r))

  const wantsFestival = /festival|afah|homowo|akwasidae|hogbetsotso|celebrat/.test(q)
  const wantsFamily = /family|kid|child/.test(q)
  const wantsBeach = /beach|swim|coast|surf/.test(q)
  const wantsWildlife = /wildlife|animal|safari|elephant|monkey|crocodile/.test(q)
  const wantsHike = /hike|hiking|mountain|trek|waterfall/.test(q)

  const regionKey = matchedRegion === 'kumasi' ? 'ashanti' : matchedRegion === 'cape coast' ? 'central' : matchedRegion

  let pool = destinations
  if (regionKey) {
    pool = pool.filter((d) => d.region.toLowerCase().includes(regionKey))
  }
  if (wantsBeach) pool = pool.filter((d) => d.category === 'Beach')
  else if (wantsWildlife) pool = pool.filter((d) => d.category === 'Wildlife')
  else if (wantsHike) pool = pool.filter((d) => d.category === 'Nature' || d.category === 'Adventure')
  else if (wantsFamily) pool = pool.filter((d) => /famil/i.test(d.goodFor))

  if (pool.length === 0) pool = destinations.filter((d) => (regionKey ? d.region.toLowerCase().includes(regionKey) : d.featured))
  const picks = pool.slice(0, 3)

  let festivalPicks: Festival[] = []
  if (wantsFestival || regionKey) {
    festivalPicks = festivals
      .filter((f) => (regionKey ? f.region.toLowerCase().includes(regionKey) : true))
      .slice(0, 2)
  }

  let text: string
  if (regionKey && wantsFamily) {
    text = `Near ${cap(regionKey)}, here are family-friendly picks worth building a day around:`
  } else if (wantsFestival && regionKey) {
    text = festivalPicks.length
      ? `Here's what's on in ${cap(regionKey)}:`
      : `I don't have a festival on file for ${cap(regionKey)} right now — try Greater Accra, Ashanti, Volta, Central, Northern, or Western.`
  } else if (wantsBeach) {
    text = 'Here are a few quieter, well-rated beaches from the platform:'
  } else if (wantsWildlife) {
    text = 'For wildlife, these curated destinations are the strongest picks:'
  } else if (wantsHike) {
    text = 'For hiking and nature, start with these:'
  } else if (regionKey) {
    text = `Here's a starting list for ${cap(regionKey)}:`
  } else {
    text =
      "I can help with destinations, festivals, and trip ideas — try asking about a region (e.g. \"family spots near Kumasi\") or a festival (e.g. \"festivals in Volta this season\"). Here are a few highlights to start:"
  }

  return { text, destinations: picks, festivals: festivalPicks }
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const suggestedPrompts = [
  "What's good for a family near Kumasi?",
  'Festivals in the Volta Region this season?',
  '3-day heritage trip from Accra',
  'Quiet beaches in the Western Region',
]
