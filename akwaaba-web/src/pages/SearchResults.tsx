import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { destinations } from '../data/destinations'
import { festivals } from '../data/festivals'
import { reviews } from '../data/reviews'
import { PlaceholderMedia } from '../components/PlaceholderMedia'
import { getAssistantReply } from '../lib/assistant'

type ResultType = 'All' | 'Destinations' | 'Festivals' | 'Experiences'

export function SearchResults() {
  const [searchParams] = useSearchParams()
  const q = searchParams.get('q') ?? ''
  const [tab, setTab] = useState<ResultType>('All')

  const matchedDestinations = useMemo(
    () =>
      q
        ? destinations.filter(
            (d) =>
              d.name.toLowerCase().includes(q.toLowerCase()) ||
              d.region.toLowerCase().includes(q.toLowerCase()) ||
              d.category.toLowerCase().includes(q.toLowerCase()) ||
              d.tagline.toLowerCase().includes(q.toLowerCase()),
          )
        : [],
    [q],
  )
  const matchedFestivals = useMemo(
    () =>
      q
        ? festivals.filter(
            (f) =>
              f.name.toLowerCase().includes(q.toLowerCase()) ||
              f.region.toLowerCase().includes(q.toLowerCase()) ||
              f.people.toLowerCase().includes(q.toLowerCase()),
          )
        : [],
    [q],
  )
  const matchedReviews = useMemo(
    () =>
      q
        ? reviews.filter(
            (r) => r.place.toLowerCase().includes(q.toLowerCase()) || r.text.toLowerCase().includes(q.toLowerCase()),
          )
        : [],
    [q],
  )

  const total = matchedDestinations.length + matchedFestivals.length + matchedReviews.length
  const aiSummary = q ? getAssistantReply(q).text : ''

  const showDestinations = tab === 'All' || tab === 'Destinations'
  const showFestivals = tab === 'All' || tab === 'Festivals'
  const showReviews = tab === 'All' || tab === 'Experiences'

  return (
    <div className="mx-auto max-w-[1400px] px-5 lg:px-8 py-6">
      <div className="text-sm text-text-4 mb-3">
        <b className="text-white">{total} results</b> for "{q}" · destinations, festivals &amp; experiences
      </div>

      {q && (
        <div className="rounded-2xl bg-ink p-4 sm:p-4.5 flex gap-3.5 items-start mb-4">
          <div className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-full bg-ghana-green text-white">
            ✦
          </div>
          <div className="flex-1">
            <div className="font-bold text-sm text-ghana-gold mb-1">AI summary</div>
            <div className="text-sm leading-relaxed text-[#f3eee2]">{aiSummary}</div>
          </div>
          <Link to="/assistant" className="text-xs font-semibold text-ghana-gold whitespace-nowrap hover:underline">
            Open chat →
          </Link>
        </div>
      )}

      <div className="flex gap-2 mb-4 flex-wrap">
        {(['All', 'Destinations', 'Festivals', 'Experiences'] as ResultType[]).map((t) => {
          const count =
            t === 'All' ? total : t === 'Destinations' ? matchedDestinations.length : t === 'Festivals' ? matchedFestivals.length : matchedReviews.length
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                tab === t ? 'bg-ink text-white' : 'border border-hairline-strong text-text-4'
              }`}
            >
              {t} {count}
            </button>
          )
        })}
      </div>

      <div className="flex flex-col gap-2.5">
        {showDestinations &&
          matchedDestinations.map((d) => (
            <Link
              key={d.id}
              to={`/destinations/${d.id}`}
              className="rounded-xl border border-hairline p-2.5 flex gap-3 items-center hover:border-ghana-green/60 transition-colors"
            >
              <PlaceholderMedia className="h-[60px] w-20 shrink-0 rounded-lg" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-ghana-green/25 px-1.5 py-0.5 text-[10px] font-semibold text-ghana-green">
                    DESTINATION
                  </span>
                  <span className="font-display font-bold text-[15px] text-white">{d.name}</span>
                </div>
                <div className="text-xs text-text-6 mt-0.5">
                  {d.region} · {d.tagline} · ★ {d.rating}
                </div>
              </div>
              <span className="text-text-5">→</span>
            </Link>
          ))}

        {showFestivals &&
          matchedFestivals.map((f) => (
            <Link
              key={f.id}
              to={`/festivals/${f.id}`}
              className="rounded-xl border border-hairline p-2.5 flex gap-3 items-center hover:border-ghana-gold/60 transition-colors"
            >
              <div className="flex h-[60px] w-20 shrink-0 items-center justify-center rounded-lg bg-ghana-gold/20 text-2xl">
                ★
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-ghana-gold/20 px-1.5 py-0.5 text-[10px] font-semibold text-ghana-gold">
                    FESTIVAL
                  </span>
                  <span className="font-display font-bold text-[15px] text-white">{f.name}</span>
                </div>
                <div className="text-xs text-text-6 mt-0.5">
                  {f.region} · {f.people} · {f.dateLabel}
                </div>
              </div>
              <span className="text-text-5">→</span>
            </Link>
          ))}

        {showReviews &&
          matchedReviews.map((r) => (
            <div
              key={r.id}
              className="rounded-xl border border-hairline p-2.5 flex gap-3 items-center"
            >
              <PlaceholderMedia className="h-[60px] w-20 shrink-0 rounded-lg" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] font-semibold text-ghana-gold">
                    EXPERIENCE
                  </span>
                  <span className="font-display font-bold text-[15px] text-white">{r.place}</span>
                </div>
                <div className="text-xs text-text-6 mt-0.5">
                  Review by {r.author} · {r.text} · {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                </div>
              </div>
            </div>
          ))}

        {q && total === 0 && (
          <div className="rounded-2xl border border-hairline p-10 text-center text-text-5">
            No results for "{q}". Try a region, festival, or category name.
          </div>
        )}
        {!q && (
          <div className="rounded-2xl border border-hairline p-10 text-center text-text-5">
            Search for a place, region, or festival using the search bar above.
          </div>
        )}
      </div>
    </div>
  )
}
