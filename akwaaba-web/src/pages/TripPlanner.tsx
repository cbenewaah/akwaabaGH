import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { destinations } from '../data/destinations'
import { festivals } from '../data/festivals'
import { PlaceholderMedia } from '../components/PlaceholderMedia'
import { useTrip } from '../context/TripContext'

export function TripPlanner() {
  const { savedDestinations, savedFestivals, toggleDestination, toggleFestival } = useTrip()

  const tripDestinations = useMemo(
    () => savedDestinations.map((id) => destinations.find((d) => d.id === id)).filter(Boolean),
    [savedDestinations],
  )
  const tripFestivals = useMemo(
    () => savedFestivals.map((id) => festivals.find((f) => f.id === id)).filter(Boolean),
    [savedFestivals],
  )

  const regionsInTrip = useMemo(() => {
    const set = new Set(tripDestinations.map((d) => d!.region))
    return [...set]
  }, [tripDestinations])

  const isEmpty = tripDestinations.length === 0 && tripFestivals.length === 0

  function handleExport() {
    const lines = [
      'My Ghana Trip — AkwaabaGH',
      '',
      'Destinations:',
      ...tripDestinations.map((d) => `- ${d!.name} (${d!.region}) — ${d!.tagline}`),
      '',
      'Festivals:',
      ...tripFestivals.map((f) => `- ${f!.name} (${f!.region}) — ${f!.dateLabel}`),
    ]
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'akwaabagh-trip.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="mx-auto max-w-[1400px] px-5 lg:px-8 py-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-5">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">My Ghana trip</h1>
          <p className="mt-1 text-sm text-text-4">
            {tripDestinations.length} saved places · {tripFestivals.length} festival{tripFestivals.length === 1 ? '' : 's'}
            {regionsInTrip.length > 0 && <> · {regionsInTrip.join(' & ')}</>}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            disabled={isEmpty}
            className="rounded-lg border border-hairline-strong px-3.5 py-2.5 text-sm font-semibold text-white disabled:opacity-40 hover:border-ghana-gold transition-colors"
          >
            ⤓ Export
          </button>
          <Link
            to="/assistant"
            className="rounded-lg bg-ink px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-black transition-colors"
          >
            ✦ Optimize with AI
          </Link>
        </div>
      </div>

      {isEmpty ? (
        <div className="rounded-2xl border border-hairline p-10 text-center">
          <div className="text-4xl mb-3">🗺️</div>
          <div className="font-display text-lg font-bold text-white">Your trip is empty</div>
          <p className="mt-1.5 text-sm text-text-5 max-w-[380px] mx-auto">
            Save destinations and festivals as you browse — tap the ♡ on any card, or "+ Add to trip" on a detail page.
          </p>
          <Link
            to="/destinations"
            className="mt-4 inline-block rounded-lg bg-ghana-green px-5 py-2.5 text-sm font-bold text-white hover:bg-ghana-green-deep transition-colors"
          >
            Browse destinations
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 flex flex-col gap-3">
            {tripFestivals.map((f) => (
              <div key={f!.id} className="rounded-xl border border-hairline p-3 flex gap-3 items-center">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-ghana-gold/20 text-lg">
                  ★
                </div>
                <div className="flex-1">
                  <Link to={`/festivals/${f!.id}`} className="font-bold text-sm text-white hover:text-ghana-gold transition-colors">
                    {f!.name}
                  </Link>
                  <div className="text-xs text-ghana-gold">{f!.dateLabel}</div>
                </div>
                <button
                  onClick={() => toggleFestival(f!.id)}
                  className="text-text-5 hover:text-ghana-red transition-colors text-lg px-1"
                  aria-label="Remove"
                >
                  ⋮⋮
                </button>
              </div>
            ))}
            {tripDestinations.map((d) => (
              <div key={d!.id} className="rounded-xl border border-hairline p-3 flex gap-3 items-center">
                <PlaceholderMedia className="h-11 w-11 shrink-0 rounded-lg" />
                <div className="flex-1">
                  <Link to={`/destinations/${d!.id}`} className="font-bold text-sm text-white hover:text-ghana-green transition-colors">
                    {d!.name}
                  </Link>
                  <div className="text-xs text-text-6">{d!.region} · {d!.tagline}</div>
                </div>
                <button
                  onClick={() => toggleDestination(d!.id)}
                  className="text-text-5 hover:text-ghana-red transition-colors text-lg px-1"
                  aria-label="Remove"
                >
                  ⋮⋮
                </button>
              </div>
            ))}
            <Link
              to="/destinations"
              className="rounded-xl border border-dashed border-hairline-strong p-3 text-center text-sm font-semibold text-text-5 hover:text-white hover:border-ghana-green transition-colors"
            >
              + Add a place or festival
            </Link>
          </div>

          <div className="lg:w-[300px] shrink-0">
            <PlaceholderMedia label={`map · route across ${regionsInTrip.length || 1} region(s)`} className="h-[230px] rounded-2xl" variant="map" />
            <div className="rounded-2xl border border-hairline p-3.5 mt-3 bg-surface-deep">
              <div className="font-bold text-sm text-white mb-2">Trip summary</div>
              <div className="text-sm text-text-4 leading-loose">
                {tripDestinations.length} stops · {tripFestivals.length} festival{tripFestivals.length === 1 ? '' : 's'}
                <br />
                Regions: {regionsInTrip.length ? regionsInTrip.join(', ') : '—'}
                <br />
                {tripFestivals[0] ? `Best season: ${tripFestivals[0]!.monthShort} (${tripFestivals[0]!.name})` : 'No festival timed yet'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
