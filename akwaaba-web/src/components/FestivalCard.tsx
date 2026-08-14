import { Link } from 'react-router-dom'
import type { Festival } from '../data/types'

export function FestivalCard({ festival }: { festival: Festival }) {
  return (
    <Link
      to={`/festivals/${festival.id}`}
      className="flex gap-3 rounded-2xl border border-hairline p-3 hover:border-ghana-gold/60 transition-colors bg-surface"
    >
      <div
        className={`flex h-[54px] w-[54px] shrink-0 flex-col items-center justify-center rounded-xl text-white ${
          festival.live ? 'bg-ghana-green' : 'bg-ink'
        }`}
      >
        <span className="font-display text-lg font-bold leading-none">{festival.day}</span>
        <span className="text-[10px] font-semibold mt-0.5">{festival.monthShort}</span>
      </div>
      <div>
        <div className="font-display font-bold text-[15px] text-white">{festival.name}</div>
        <div className="text-xs text-text-6">
          {festival.region} · {festival.people}
        </div>
        <div className="mt-1.5 flex gap-1.5">
          <span className="rounded-full bg-ghana-gold/20 px-2 py-0.5 text-[10px] font-bold text-ghana-gold">
            ★ {festival.tag}
          </span>
        </div>
      </div>
    </Link>
  )
}
