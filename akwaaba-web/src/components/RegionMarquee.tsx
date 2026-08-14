import { Link } from 'react-router-dom'
import { PlaceholderMedia } from './PlaceholderMedia'

interface Props {
  regions: readonly string[]
  regionImages: Partial<Record<string, string>>
}

// Renders the region list twice back to back and animates the track by
// exactly one set width (-50%), so the loop point is invisible and the row
// scrolls left forever without a seam.
export function RegionMarquee({ regions, regionImages }: Props) {
  const track = [...regions, ...regions]

  return (
    <div className="marquee-track overflow-hidden w-full">
      {/* sizing (image height, padding, radius, border) mirrors DestinationCard so the two sections read as the same visual family */}
      <div className="flex w-max gap-4 animate-marquee">
        {track.map((region, i) => (
          <Link
            key={`${region}-${i}`}
            to={`/destinations?region=${encodeURIComponent(region)}`}
            className="w-[280px] sm:w-[320px] shrink-0 rounded-2xl border border-hairline overflow-hidden bg-surface hover:border-ghana-green/60 transition-colors"
          >
            <PlaceholderMedia label={region} image={regionImages[region]} alt={region} className="h-[130px]" />
            <div className="p-3.5">
              <div className="font-display font-bold text-[15px] text-white">{region}</div>
              <div className="mt-1 text-xs text-text-6">Explore destinations →</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
