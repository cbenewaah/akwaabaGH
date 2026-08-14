import { Link, useParams, Navigate } from 'react-router-dom'
import { destinations, getDestination } from '../data/destinations'
import { PlaceholderMedia } from '../components/PlaceholderMedia'
import { useTrip } from '../context/TripContext'
import { useTranslatedText } from '../context/LanguageContext'

export function DestinationDetail() {
  const { id } = useParams<{ id: string }>()
  const destination = getDestination(id ?? '')
  const { isDestinationSaved, toggleDestination } = useTrip()
  const description = useTranslatedText(destination?.description ?? '')

  if (!destination) return <Navigate to="/destinations" replace />

  const saved = isDestinationSaved(destination.id)
  const nearby = destination.nearby
    .map((nid) => destinations.find((d) => d.id === nid))
    .filter(Boolean)

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(destination.mapQuery)}&output=embed`

  return (
    <div className="mx-auto max-w-[1400px] px-5 lg:px-8 py-6">
      <div className="text-xs text-text-5 mb-4">
        <Link to="/destinations" className="hover:text-white">Destinations</Link>
        {' › '}
        <Link to={`/destinations?region=${encodeURIComponent(destination.region)}`} className="hover:text-white">
          {destination.region}
        </Link>
        {' › '}
        <span className="text-text-4">{destination.name}</span>
      </div>

      {/* gallery */}
      <div className="grid grid-cols-2 sm:grid-cols-4 grid-rows-2 gap-2 h-[240px] sm:h-[260px]">
        <PlaceholderMedia
          label="photo · main"
          image={destination.image}
          alt={destination.name}
          className="col-span-2 row-span-2 rounded-l-xl sm:rounded-l-2xl"
        />
        <PlaceholderMedia className="hidden sm:flex" />
        <PlaceholderMedia className="hidden sm:flex rounded-tr-2xl" />
        <PlaceholderMedia className="col-span-2 sm:col-span-1" />
        <PlaceholderMedia className="col-span-2 sm:col-span-1 rounded-br-xl sm:rounded-br-2xl text-sm font-semibold text-text-4">
          + 12 photos
        </PlaceholderMedia>
      </div>

      {/* title row */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mt-5">
        <div>
          <div className="flex gap-2 mb-2">
            <span className="rounded-full bg-ghana-gold/20 px-3 py-1.5 text-xs font-bold text-ghana-gold">
              ★ {destination.category}
            </span>
            {destination.featured && (
              <span className="rounded-full border border-hairline-strong px-3 py-1.5 text-xs font-semibold text-text-4">
                Featured
              </span>
            )}
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">{destination.name}</h1>
          <div className="mt-1 text-sm text-text-4">
            📍 {destination.address} · ★ {destination.rating} ({destination.reviewCount.toLocaleString()} reviews)
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => toggleDestination(destination.id)}
            className="rounded-lg border border-hairline-strong px-3.5 py-2.5 text-sm font-semibold text-white hover:border-ghana-gold transition-colors"
          >
            {saved ? '♥ Saved' : '♡ Save'}
          </button>
          <Link
            to="/my-trip"
            onClick={() => !saved && toggleDestination(destination.id)}
            className="rounded-lg bg-ghana-red px-4 py-2.5 text-sm font-bold text-white hover:bg-red-700 transition-colors"
          >
            + Add to trip
          </Link>
        </div>
      </div>

      {/* body */}
      <div className="flex flex-col lg:flex-row gap-6 mt-5">
        <div className="flex-1">
          <p className="text-sm leading-relaxed text-text-2">{description}</p>

          <h2 className="font-display text-lg font-bold text-white mt-5 mb-2.5">Visitor information</h2>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="rounded-lg border border-hairline p-3">
              <div className="text-[11px] font-semibold text-text-5">HOURS</div>
              <div className="text-sm font-semibold text-white mt-0.5">{destination.hours}</div>
            </div>
            <div className="rounded-lg border border-hairline p-3">
              <div className="text-[11px] font-semibold text-text-5">ENTRY</div>
              <div className="text-sm font-semibold text-white mt-0.5">{destination.entry}</div>
            </div>
            <div className="rounded-lg border border-hairline p-3">
              <div className="text-[11px] font-semibold text-text-5">BEST TIME</div>
              <div className="text-sm font-semibold text-white mt-0.5">{destination.bestTime}</div>
            </div>
            <div className="rounded-lg border border-hairline p-3">
              <div className="text-[11px] font-semibold text-text-5">GOOD FOR</div>
              <div className="text-sm font-semibold text-white mt-0.5">{destination.goodFor}</div>
            </div>
          </div>

          {nearby.length > 0 && (
            <>
              <h2 className="font-display text-lg font-bold text-white mt-5 mb-2.5">Nearby</h2>
              <div className="flex gap-3 flex-wrap">
                {nearby.map((n) => (
                  <Link
                    key={n!.id}
                    to={`/destinations/${n!.id}`}
                    className="flex-1 min-w-[140px] rounded-xl border border-hairline overflow-hidden hover:border-ghana-green/60 transition-colors"
                  >
                    <PlaceholderMedia image={n!.image} alt={n!.name} className="h-[70px]" />
                    <div className="px-2.5 py-2">
                      <div className="font-display font-bold text-xs text-white">{n!.name}</div>
                      <div className="text-[11px] text-text-6">{n!.region}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>

        {/* sidebar */}
        <div className="lg:w-[320px] shrink-0 flex flex-col gap-3">
          <div className="rounded-2xl border border-hairline overflow-hidden">
            <iframe
              title={`Map of ${destination.name}`}
              src={mapSrc}
              className="w-full h-[200px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="p-3.5">
              <div className="text-sm font-semibold text-white">{destination.address}</div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination.mapQuery)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-1.5 inline-block text-sm font-semibold text-ghana-green hover:underline"
              >
                Get directions →
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-hairline p-3.5 bg-surface-deep">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-white">✦</div>
              <div className="font-bold text-sm text-white">Ask the assistant</div>
            </div>
            <div className="mt-2 text-sm text-text-4">
              "Plan a half-day here with kids" or "What else is nearby?"
            </div>
            <Link
              to="/assistant"
              className="mt-2.5 block rounded-lg bg-ghana-green py-2.5 text-center text-sm font-bold text-white hover:bg-ghana-green-deep transition-colors"
            >
              ✦ Ask about this place
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
