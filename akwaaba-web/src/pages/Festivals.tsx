import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { festivals, festivalMonthOrder } from '../data/festivals'
import { regions } from '../data/destinations'
import { FestivalCard } from '../components/FestivalCard'

const timelineMonths = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function Festivals() {
  const [region, setRegion] = useState('')
  const [view, setView] = useState<'calendar' | 'list'>('calendar')
  const [activeMonth, setActiveMonth] = useState<string | null>(null)

  const liveFestival = festivals.find((f) => f.live)

  const filtered = useMemo(
    () => festivals.filter((f) => (region ? f.region === region : true)),
    [region],
  )

  const grouped = useMemo(() => {
    const map = new Map<string, typeof festivals>()
    for (const f of filtered) {
      const key = f.month
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(f)
    }
    return [...map.entries()].sort(
      (a, b) => festivalMonthOrder.indexOf(a[0]) - festivalMonthOrder.indexOf(b[0]),
    )
  }, [filtered])

  const listSorted = useMemo(
    () => [...filtered].sort((a, b) => festivalMonthOrder.indexOf(a.month) - festivalMonthOrder.indexOf(b.month)),
    [filtered],
  )

  return (
    <div className="mx-auto max-w-[1400px] px-5 lg:px-8 py-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-5">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">Ghana's festival calendar</h1>
          <p className="mt-1 text-sm text-text-4 max-w-[520px]">
            Discover what's happening, by month and region — plan your trip around living culture.
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="rounded-lg border border-hairline-strong bg-transparent px-3.5 py-2 text-sm font-semibold text-white outline-none"
          >
            <option value="" className="bg-surface">All regions</option>
            {regions.map((r) => (
              <option key={r} value={r} className="bg-surface">{r}</option>
            ))}
          </select>
          <button
            onClick={() => setView('calendar')}
            className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
              view === 'calendar' ? 'bg-ghana-green text-white' : 'border border-hairline-strong text-white'
            }`}
          >
            Calendar
          </button>
          <button
            onClick={() => setView('list')}
            className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
              view === 'list' ? 'bg-ghana-green text-white' : 'border border-hairline-strong text-white'
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* month timeline */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 mb-1">
        {timelineMonths.map((m) => (
          <button
            key={m}
            onClick={() => setActiveMonth((v) => (v === m ? null : m))}
            className={`relative shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              activeMonth === m ? 'bg-ink text-white' : 'border border-hairline-strong text-text-4'
            }`}
          >
            {m}
            {m === 'Aug' && (
              <span className="absolute -top-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-ghana-red" />
            )}
          </button>
        ))}
      </div>

      {/* happening now */}
      {liveFestival && (
        <Link
          to={`/festivals/${liveFestival.id}`}
          className="my-4 flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl p-4 sm:p-4.5 hover:opacity-95 transition-opacity"
          style={{ background: 'linear-gradient(100deg,#2e2508,#3d3010)' }}
        >
          <div className="self-start rounded-full bg-ghana-red px-3 py-1.5 text-[11px] font-bold tracking-wide text-white shrink-0">
            ● HAPPENING NOW
          </div>
          <div className="flex-1">
            <div className="font-display text-lg font-bold text-white">
              {liveFestival.name} — {liveFestival.blurb}
            </div>
            <div className="text-xs text-[#e8d9a0]">
              {liveFestival.people} · {liveFestival.region} · {liveFestival.dateLabel}
            </div>
          </div>
          <div className="rounded-lg bg-surface px-3.5 py-2.5 text-sm font-semibold text-white shrink-0">
            View details →
          </div>
        </Link>
      )}

      {/* festival groups */}
      {view === 'calendar' ? (
        <div className="mt-2">
          {grouped
            .filter(([month]) => !activeMonth || month.toLowerCase().startsWith(activeMonth.toLowerCase()))
            .map(([month, list]) => (
              <div key={month} className="mb-6">
                <div className="text-xs font-bold tracking-wider text-text-6 mb-2.5">{month.toUpperCase()}</div>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3.5">
                  {list.map((f) => (
                    <FestivalCard key={f.id} festival={f} />
                  ))}
                </div>
              </div>
            ))}
          {grouped.length === 0 && (
            <div className="rounded-2xl border border-hairline p-10 text-center text-text-5">
              No festivals found for this region.
            </div>
          )}
        </div>
      ) : (
        <div className="mt-4 grid sm:grid-cols-2 xl:grid-cols-3 gap-3.5">
          {listSorted.map((f) => (
            <FestivalCard key={f.id} festival={f} />
          ))}
        </div>
      )}
    </div>
  )
}
