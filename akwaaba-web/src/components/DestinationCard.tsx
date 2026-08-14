import { Link } from 'react-router-dom'
import type { Destination } from '../data/types'
import { PlaceholderMedia } from './PlaceholderMedia'
import { useTrip } from '../context/TripContext'

export function DestinationCard({ destination }: { destination: Destination }) {
  const { isDestinationSaved, toggleDestination } = useTrip()
  const saved = isDestinationSaved(destination.id)

  return (
    <Link
      to={`/destinations/${destination.id}`}
      className="group rounded-2xl border border-hairline overflow-hidden bg-surface hover:border-ghana-green/60 transition-colors"
    >
      <PlaceholderMedia
        label={destination.name}
        image={destination.image}
        alt={destination.name}
        className="h-[130px] items-start justify-between !flex flex-row p-2.5"
      >
        <span className="rounded-full bg-ghana-gold/20 px-2.5 py-1 text-[10px] font-bold text-ghana-gold">
          ★ {destination.category}
        </span>
        <button
          onClick={(e) => {
            e.preventDefault()
            toggleDestination(destination.id)
          }}
          className="flex h-6.5 w-6.5 items-center justify-center rounded-full bg-white/90 text-xs"
          style={{ color: saved ? '#CE1126' : '#16140F' }}
          aria-label={saved ? 'Remove from trip' : 'Save to trip'}
        >
          {saved ? '♥' : '♡'}
        </button>
      </PlaceholderMedia>
      <div className="p-3.5">
        <div className="flex items-center justify-between gap-2">
          <div className="font-display font-bold text-[15px] text-white group-hover:text-ghana-green transition-colors">
            {destination.name}
          </div>
          <div className="text-xs font-semibold text-text-4 shrink-0">★ {destination.rating}</div>
        </div>
        <div className="mt-1 text-xs text-text-6">
          {destination.region} · {destination.tagline}
        </div>
      </div>
    </Link>
  )
}
