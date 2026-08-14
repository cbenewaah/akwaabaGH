import { useState } from 'react'
import { Link } from 'react-router-dom'
import { regions } from '../data/destinations'

const colors = ['#006B3F', '#F2B705', '#CE1126'] as const

const features = [
  {
    icon: '✦',
    title: 'AI travel assistant',
    body: 'Ask questions in plain language and get recommendations drawn from curated Ghanaian data, not generic web results.',
  },
  {
    icon: '★',
    title: 'Festivals calendar',
    body: "A living cultural calendar of Ghana's festivals, timed by date, region, and tradition.",
  },
  {
    icon: '🗣',
    title: 'Twi language support',
    body: "Every page works in Twi too, serving the country's largest indigenous language audience.",
  },
  {
    icon: '🧭',
    title: 'Destinations directory',
    body: 'Dozens of richly detailed destinations with hours, entry fees, best times to visit, and more.',
  },
  {
    icon: '💬',
    title: 'Ratings by category',
    body: 'Every destination is rated and tagged by category, so you know what to expect before you go.',
  },
  {
    icon: '🗓',
    title: 'Trip planner',
    body: 'Save places to a trip, keep festivals and destinations together, and revisit the plan anytime.',
  },
  {
    icon: '🗺',
    title: 'Interactive maps',
    body: 'Every destination and festival page includes a map you can explore or get directions from.',
  },
  {
    icon: '⚙',
    title: 'Smart search and filters',
    body: 'Filter by region, category, and vibe to narrow the whole catalog instantly.',
  },
  {
    icon: '📍',
    title: 'Ask AI, everywhere',
    body: 'A floating assistant on every page, ready with destination and festival context wherever you are.',
  },
]

const steps = [
  {
    title: 'Tell us what you want',
    body: 'Describe the trip in your own words, in English or Twi, or browse by region.',
  },
  {
    title: 'Compare what fits best',
    body: 'Read details, check festival dates, and see everything laid out in one place.',
  },
  {
    title: 'Build the itinerary',
    body: 'Save your favorites to a trip and share the plan with your group.',
  },
]

const pillars = [
  {
    title: 'Accuracy first',
    body: 'Listings are checked against real details, not scraped once and forgotten.',
  },
  {
    title: 'Language as access',
    body: 'Twi support is core to the platform, not an afterthought, because language should never be a barrier.',
  },
  {
    title: 'Community benefit',
    body: 'Visibility for local operators, and tourism that benefits communities directly.',
  },
]

const faqs = [
  {
    q: 'Is AkwaabaGH free to use?',
    a: 'Yes. Browsing destinations, festivals, and the AI assistant are all free to use.',
  },
  {
    q: 'How are festival dates confirmed?',
    a: 'Dates come from our curated festivals calendar and are updated as details are confirmed each season.',
  },
  {
    q: 'Can I list my business or tour?',
    a: "There isn't a self serve listing tool yet — reach out at the contact below and we'll help you get listed.",
  },
  {
    q: 'How complete is the Twi translation?',
    a: 'Core navigation is translated, and destination and festival descriptions are translated live through the Khaya AI API whenever you switch the site to Twi.',
  },
]

export function About() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div>
      {/* Hero */}
      <div
        className="px-5 py-16 sm:py-20 text-center"
        style={{ background: 'linear-gradient(160deg,#0d1f16 0%,#0a170f 55%,#0B1220 100%)' }}
      >
        <div className="font-extrabold text-xs tracking-widest text-ghana-gold">
          ★ AKWAABA. YOU ARE WELCOME.
        </div>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white max-w-[680px] mx-auto leading-[1.1]">
          Discover Ghana Like Never Before
        </h1>
        <p className="mt-4 text-sm sm:text-[15px] leading-relaxed text-text-4 max-w-[600px] mx-auto">
          Whether you're planning your first visit or rediscovering home, AkwaabaGH helps you explore
          destinations, festivals, culture, and unforgettable experiences across all {regions.length} regions.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            to="/destinations"
            className="rounded-lg bg-ghana-green px-5 py-2.5 font-bold text-sm text-white hover:bg-ghana-green-deep transition-colors"
          >
            Start exploring
          </Link>
          <Link
            to="/assistant"
            className="rounded-lg border border-hairline-strong px-5 py-2.5 font-bold text-sm text-white hover:border-ghana-gold hover:text-ghana-gold transition-colors"
          >
            ✦ Ask the assistant
          </Link>
        </div>
      </div>

      {/* Our mission */}
      <div className="mx-auto max-w-[720px] px-5 lg:px-8 py-14 sm:py-16 text-center">
        <div className="font-bold text-xs tracking-widest text-text-5 uppercase mb-4">Our mission</div>
        <p className="text-sm sm:text-[15px] leading-relaxed text-text-2">
          Ghana's destinations and festivals are richly documented, yet scattered across blogs, social feeds, and
          sites that have long stopped being updated. AkwaabaGH gathers them into one place: an assistant that
          answers in plain language, a calendar that helps you time a trip around the festivals worth travelling
          for, and full Twi support so the platform speaks the language most of its visitors think in.
        </p>
        <p className="mt-4 text-xs font-semibold text-text-5 italic">
          Built for travellers arriving for the first time, and for Ghanaians rediscovering home.
        </p>
      </div>

      {/* What the platform does */}
      <div className="border-t border-hairline" style={{ background: 'linear-gradient(180deg,#0B1220 0%,#0d1f1a 100%)' }}>
        <div className="mx-auto max-w-[1100px] px-5 lg:px-8 py-14 sm:py-16">
          <div className="text-center mb-10">
            <div className="font-bold text-xs tracking-widest text-text-5 uppercase">What the platform does</div>
            <h2 className="mt-1.5 font-display text-2xl sm:text-3xl font-extrabold text-white">Nine core features</h2>
            <p className="mt-2 text-sm text-text-4 max-w-[440px] mx-auto">
              Every part of the product, from the first search to the trip you finally book.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => {
              const color = colors[i % colors.length]
              return (
                <div key={f.title} className="rounded-2xl border border-hairline bg-surface p-5">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-[16px]"
                    style={{ background: `${color}26`, color }}
                  >
                    {f.icon}
                  </div>
                  <div className="font-display font-bold text-[15px] text-white mt-3 mb-1.5">{f.title}</div>
                  <div className="text-xs leading-relaxed text-text-4">{f.body}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Three steps to a planned trip */}
      <div className="mx-auto max-w-[1100px] px-5 lg:px-8 py-14 sm:py-16">
        <h2 className="text-center font-display text-2xl sm:text-3xl font-extrabold text-white mb-10">
          Three steps to a planned trip
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={s.title} className="text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-ghana-green font-display font-extrabold text-white">
                {i + 1}
              </div>
              <div className="font-display font-bold text-[15px] text-white mt-3 mb-1.5">{s.title}</div>
              <div className="text-xs leading-relaxed text-text-4 max-w-[260px] mx-auto">{s.body}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-hairline p-5 flex flex-wrap justify-around gap-6 text-center">
          <div>
            <div className="font-display text-2xl font-extrabold text-ghana-green">48+</div>
            <div className="text-xs font-semibold text-text-6">Destinations</div>
          </div>
          <div>
            <div className="font-display text-2xl font-extrabold text-ghana-red">14+</div>
            <div className="text-xs font-semibold text-text-6">Festivals</div>
          </div>
          <div>
            <div className="font-display text-2xl font-extrabold text-ghana-gold">{regions.length}</div>
            <div className="text-xs font-semibold text-text-6">Regions covered</div>
          </div>
          <div>
            <div className="font-display text-2xl font-extrabold text-white">2</div>
            <div className="text-xs font-semibold text-text-6">Languages</div>
          </div>
        </div>
      </div>

      {/* What we hold to */}
      <div className="border-t border-hairline" style={{ background: 'linear-gradient(180deg,#0B1220 0%,#0d1f1a 100%)' }}>
        <div className="mx-auto max-w-[1100px] px-5 lg:px-8 py-14 sm:py-16">
          <div className="text-center font-bold text-xs tracking-widest text-text-5 uppercase mb-10">
            What we hold to
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {pillars.map((p) => (
              <div key={p.title} className="text-center sm:text-left">
                <div className="font-display font-bold text-[15px] text-white mb-1.5">{p.title}</div>
                <div className="text-xs leading-relaxed text-text-4">{p.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mx-auto max-w-[720px] px-5 lg:px-8 py-14 sm:py-16">
        <h2 className="text-center font-display text-2xl sm:text-3xl font-extrabold text-white mb-8">
          Answered questions
        </h2>
        <div className="flex flex-col gap-2.5">
          {faqs.map((item, i) => {
            const open = openFaq === i
            return (
              <div key={item.q} className="rounded-xl border border-hairline overflow-hidden">
                <button
                  onClick={() => setOpenFaq(open ? null : i)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left"
                >
                  <span className="font-display font-bold text-sm text-white">{item.q}</span>
                  <span className="shrink-0 text-text-5">{open ? '−' : '+'}</span>
                </button>
                {open && (
                  <div className="px-4 pb-4 text-sm leading-relaxed text-text-4">{item.a}</div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="border-t border-hairline px-5 py-14 sm:py-16 text-center" style={{ background: 'linear-gradient(160deg,#0d1f16 0%,#0a170f 100%)' }}>
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white max-w-[560px] mx-auto">
          Planning a trip, or want to be listed?
        </h2>
        <p className="mt-3 text-sm text-text-4 max-w-[520px] mx-auto">
          Reach the team at akwaabagh@gmail.com, or start with the destinations to see what's possible.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href="mailto:akwaabagh@gmail.com"
            className="rounded-lg bg-ghana-green px-5 py-2.5 font-bold text-sm text-white hover:bg-ghana-green-deep transition-colors"
          >
            Contact the team
          </a>
          <Link
            to="/destinations"
            className="rounded-lg border border-hairline-strong px-5 py-2.5 font-bold text-sm text-white hover:border-ghana-gold hover:text-ghana-gold transition-colors"
          >
            Browse destinations
          </Link>
        </div>
      </div>
    </div>
  )
}
