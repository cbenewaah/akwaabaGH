import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getAssistantReplyAI, suggestedPrompts, type AssistantReply, type ChatTurn } from '../lib/assistant'
import { PlaceholderMedia } from '../components/PlaceholderMedia'
import { useLanguage } from '../context/LanguageContext'

interface Message {
  id: string
  role: 'user' | 'assistant'
  text: string
  reply?: AssistantReply
  /** true for the hardcoded opening greeting — not a real turn, excluded from what we send Claude */
  synthetic?: boolean
}

const STORAGE_KEY = 'akwaaba_assistant_chat'

const greeting: Message = {
  id: 'greeting',
  role: 'assistant',
  text: "Akwaaba! Ask me about destinations, festivals, or building a trip — anywhere in Ghana.",
  synthetic: true,
}

function loadMessages(): Message[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return [greeting]
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [greeting]
  } catch {
    return [greeting]
  }
}

function nextId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `m${Date.now()}-${Math.random()}`
}

const recentChats = ['Cape Coast weekend', 'Northern safari ideas', 'Akwasidae timing']

const quickTags = ['📍 Near me', '👨‍👩‍👧 Family', '★ Festivals']

export function Assistant() {
  const { lang } = useLanguage()
  const [messages, setMessages] = useState<Message[]>(loadMessages)
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const lodgingPromptShown = useRef(false)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, thinking])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
  }, [messages])

  // Arriving from the "Find a place to lodge" banner — nudge the user toward
  // a lodging question and clear the param so a refresh doesn't repeat it.
  useEffect(() => {
    if (searchParams.get('topic') !== 'lodging' || lodgingPromptShown.current) return
    lodgingPromptShown.current = true
    setMessages((prev) => [
      ...prev,
      {
        id: nextId(),
        role: 'assistant',
        text: 'Looking for a place to stay? Tell me if you would like hotel and lodging picks generally across Ghana, or name a specific region and I will focus there.',
      },
    ])
    setSearchParams({}, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return
    const userMessage: Message = { id: nextId(), role: 'user', text: trimmed }
    const history: ChatTurn[] = [...messages, userMessage]
      .filter((m) => !m.synthetic)
      .map((m) => ({ role: m.role, content: m.text }))

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setThinking(true)
    const reply = await getAssistantReplyAI(history, lang)
    setMessages((prev) => [...prev, { id: nextId(), role: 'assistant', text: reply.text, reply }])
    setThinking(false)
  }

  return (
    <div className="mx-auto max-w-[1400px] px-0 lg:px-8 lg:py-6">
      <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-160px)] lg:min-h-[600px] rounded-none lg:rounded-2xl border-0 lg:border border-hairline overflow-hidden bg-surface">
        {/* left rail */}
        <div className="hidden lg:flex lg:w-[260px] shrink-0 border-r border-hairline bg-surface-deep p-4.5 flex-col">
          <div className="font-bold text-sm text-white mb-3">Try asking</div>
          <div className="flex flex-col gap-2">
            {suggestedPrompts.map((p) => (
              <button
                key={p}
                onClick={() => void send(p)}
                className="text-left rounded-lg border border-hairline bg-surface px-3 py-2.5 text-xs leading-snug text-text-3 hover:border-ghana-green/60 transition-colors"
              >
                {p}
              </button>
            ))}
          </div>
          <div className="font-bold text-sm text-white mt-6 mb-2.5">Recent chats</div>
          <div className="flex flex-col gap-2 text-xs text-text-6">
            {recentChats.map((c) => (
              <div key={c}>{c}</div>
            ))}
          </div>
        </div>

        {/* chat column */}
        <div className="flex-1 flex flex-col min-h-[70vh] lg:min-h-0">
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 sm:px-7 py-6">
            {messages.map((m) => (
              <div key={m.id} className={`mb-4.5 flex ${m.role === 'user' ? 'justify-end' : 'gap-3'}`}>
                {m.role === 'assistant' && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-white">
                    ✦
                  </div>
                )}
                <div className={m.role === 'user' ? 'max-w-[78%] sm:max-w-[62%]' : 'max-w-[85%] sm:max-w-[74%]'}>
                  <div
                    className={
                      m.role === 'user'
                        ? 'rounded-2xl rounded-tr-md bg-ghana-green px-4 py-3 text-sm text-white'
                        : 'rounded-2xl rounded-tl-md border border-hairline bg-surface-deep px-4 py-3.5 text-sm leading-relaxed text-text-2'
                    }
                  >
                    {m.text}
                  </div>

                  {m.reply?.destinations && m.reply.destinations.length > 0 && (
                    <div className="grid grid-cols-2 gap-2.5 mt-2.5">
                      {m.reply.destinations.map((d) => (
                        <Link
                          key={d.id}
                          to={`/destinations/${d.id}`}
                          className="rounded-xl border border-hairline overflow-hidden bg-surface hover:border-ghana-green/60 transition-colors"
                        >
                          <PlaceholderMedia className="h-[78px]" />
                          <div className="px-2.5 py-2">
                            <div className="font-display font-bold text-xs text-white">{d.name}</div>
                            <div className="text-[11px] text-text-6">{d.region} · {d.tagline}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  {m.reply?.festivals && m.reply.festivals.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2.5">
                      {m.reply.festivals.map((f) => (
                        <Link
                          key={f.id}
                          to={`/festivals/${f.id}`}
                          className="rounded-full bg-ghana-gold/20 px-3 py-1.5 text-xs font-semibold text-ghana-gold hover:bg-ghana-gold/30 transition-colors"
                        >
                          ★ {f.name} — {f.dateLabel}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {thinking && (
              <div className="flex gap-3 mb-4.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-white">✦</div>
                <div className="rounded-2xl rounded-tl-md border border-hairline bg-surface-deep px-4 py-3.5 text-sm text-text-5">
                  Thinking…
                </div>
              </div>
            )}
          </div>

          {/* composer */}
          <div className="border-t border-hairline px-4 sm:px-7 py-4">
            <div className="flex gap-2 mb-2.5 overflow-x-auto">
              {quickTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => void send(tag.replace(/^\S+\s/, ''))}
                  className="shrink-0 rounded-full border border-hairline-strong px-3 py-1.5 text-xs font-semibold text-text-4 hover:text-white transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                void send(input)
              }}
              className="flex items-center gap-2.5 rounded-xl border border-hairline-strong pl-4 pr-2 py-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask in English or Twi…"
                className="flex-1 bg-transparent text-sm text-white placeholder:text-text-5 outline-none"
              />
              <span className="rounded-lg border border-hairline-strong px-2.5 py-1.5 text-[11px] font-semibold text-ghana-green">
                {lang.toUpperCase()}
              </span>
              <button
                type="submit"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-ghana-red text-lg text-white hover:bg-red-700 transition-colors"
                aria-label="Send"
              >
                ↑
              </button>
            </form>
            <div className="text-center text-[11px] text-text-5 mt-2">
              Recommendations drawn only from AkwaabaGH's curated data · powered by Claude
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
