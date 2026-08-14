import { Link, useParams, Navigate } from 'react-router-dom'
import { getFestival } from '../data/festivals'
import { PlaceholderMedia } from '../components/PlaceholderMedia'
import { useTrip } from '../context/TripContext'
import { useTranslatedText } from '../context/LanguageContext'

export function FestivalDetail() {
  const { id } = useParams<{ id: string }>()
  const festival = getFestival(id ?? '')
  const { isFestivalSaved, toggleFestival } = useTrip()
  const description = useTranslatedText(festival?.description ?? '')
  const expect = useTranslatedText(festival?.expect ?? '')

  if (!festival) return <Navigate to="/festivals" replace />

  const saved = isFestivalSaved(festival.id)
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(festival.location)}&output=embed`

  return (
    <div className="mx-auto max-w-[1400px] px-5 lg:px-8 py-6">
      {/* hero */}
      <div className="relative rounded-2xl overflow-hidden">
        <PlaceholderMedia
          label="festival photo · drumming & procession"
          className="h-[220px] sm:h-[260px] items-end !flex p-5 sm:p-6"
        >
          <div>
            <div className="flex gap-2 mb-2.5">
              {festival.live && (
                <span className="rounded-full bg-ghana-red px-3 py-1.5 text-xs font-bold text-white">
                  ● Happening now
                </span>
              )}
              <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-ink">
                ★ {festival.tag}
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white drop-shadow">
              {festival.name}
            </h1>
          </div>
        </PlaceholderMedia>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-5">
        <div className="flex-1">
          <div className="flex flex-wrap gap-6 mb-4">
            <div>
              <div className="text-[11px] font-semibold text-text-5">PEOPLE</div>
              <div className="text-sm font-bold text-white">{festival.people}</div>
            </div>
            <div>
              <div className="text-[11px] font-semibold text-text-5">REGION</div>
              <div className="text-sm font-bold text-white">{festival.region}</div>
            </div>
            <div>
              <div className="text-[11px] font-semibold text-text-5">WHEN</div>
              <div className="text-sm font-bold text-white">{festival.month}</div>
            </div>
            <div>
              <div className="text-[11px] font-semibold text-text-5">DURATION</div>
              <div className="text-sm font-bold text-white">{festival.duration}</div>
            </div>
          </div>

          <h2 className="font-display text-lg font-bold text-white mb-2">Cultural context</h2>
          <p className="text-sm leading-relaxed text-text-2">{description}</p>

          <h2 className="font-display text-lg font-bold text-white mt-4.5 mb-2">What to expect</h2>
          <p className="text-sm leading-relaxed text-text-2">{expect}</p>
        </div>

        <div className="lg:w-[300px] shrink-0 flex flex-col gap-3">
          <div className="rounded-2xl border border-hairline p-3.5">
            <div className="font-bold text-sm text-white mb-2">📅 This year's dates</div>
            <div className="text-sm font-semibold text-white">{festival.dateLabel}</div>
            <div className="flex gap-2 mt-2.5">
              <button className="flex-1 rounded-lg border border-hairline-strong py-2 text-xs font-semibold text-white">
                Remind me
              </button>
              <button
                onClick={() => toggleFestival(festival.id)}
                className="flex-1 rounded-lg bg-ghana-red py-2 text-xs font-bold text-white hover:bg-red-700 transition-colors"
              >
                {saved ? '✓ Added' : '+ Trip'}
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-hairline overflow-hidden">
            <iframe
              title={`Map of ${festival.location}`}
              src={mapSrc}
              className="w-full h-[130px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="px-3.5 py-2.5 text-sm font-semibold text-ghana-green">See on map →</div>
          </div>

          {festival.pairsWith && (
            <>
              <div className="font-bold text-sm text-white mt-1">Pairs well with</div>
              <div className="flex gap-2.5 rounded-xl border border-hairline p-2">
                <PlaceholderMedia className="h-[50px] w-[50px] rounded-lg shrink-0" />
                <div>
                  <div className="font-bold text-xs text-white">{festival.pairsWith}</div>
                  <div className="text-[11px] text-text-6">{festival.location}</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <Link to="/festivals" className="mt-6 inline-block text-sm font-semibold text-ghana-green hover:underline">
        ← Back to festivals calendar
      </Link>
    </div>
  )
}
