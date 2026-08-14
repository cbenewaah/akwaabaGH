import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { destinations, regions, categories } from '../data/destinations'
import { DestinationCard } from '../components/DestinationCard'

const PAGE_SIZE = 9

type SortKey = 'rating' | 'reviews' | 'name'

export function Destinations() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<SortKey>('rating')

  const activeRegion = searchParams.get('region') ?? ''
  const activeCategory = searchParams.get('category') ?? ''

  const selectedRegions = useMemo(
    () => (activeRegion ? [activeRegion] : []),
    [activeRegion],
  )
  const selectedCategories = useMemo(
    () => (activeCategory ? [activeCategory] : []),
    [activeCategory],
  )

  function toggleRegion(region: string) {
    setPage(1)
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (next.get('region') === region) next.delete('region')
      else next.set('region', region)
      return next
    })
  }

  function toggleCategory(category: string) {
    setPage(1)
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (next.get('category') === category) next.delete('category')
      else next.set('category', category)
      return next
    })
  }

  function clearFilter(key: 'region' | 'category') {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.delete(key)
      return next
    })
  }

  const filtered = useMemo(() => {
    let list = destinations.filter((d) => {
      if (selectedRegions.length && !selectedRegions.includes(d.region)) return false
      if (selectedCategories.length && !selectedCategories.includes(d.category)) return false
      if (query.trim() && !d.name.toLowerCase().includes(query.trim().toLowerCase())) return false
      return true
    })
    list = [...list].sort((a, b) => {
      if (sort === 'rating') return b.rating - a.rating
      if (sort === 'reviews') return b.reviewCount - a.reviewCount
      return a.name.localeCompare(b.name)
    })
    return list
  }, [selectedRegions, selectedCategories, query, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="mx-auto max-w-[1400px] px-5 lg:px-8 py-6">
      <div className="mb-1">
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">Destinations</h1>
        <p className="mt-1 text-sm text-text-5">Search and filter {destinations.length} curated sites across Ghana.</p>
      </div>

      {/* search bar */}
      <div className="border-b border-hairline py-4 mb-5">
        <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center">
          <div className="flex-1 flex items-center gap-2 rounded-lg border border-hairline-strong px-3.5 py-2.5 text-sm text-text-5">
            <span>⌕</span>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setPage(1)
              }}
              placeholder="Search destinations by name…"
              className="w-full bg-transparent text-text-2 placeholder:text-text-5 outline-none"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-lg bg-ink px-3.5 py-2.5 text-sm font-semibold text-white outline-none"
          >
            <option value="rating">Sort: Top rated</option>
            <option value="reviews">Sort: Most reviewed</option>
            <option value="name">Sort: Name (A–Z)</option>
          </select>
        </div>

        {(selectedRegions.length > 0 || selectedCategories.length > 0) && (
          <div className="flex flex-wrap gap-2 mt-3 items-center">
            {selectedRegions.map((r) => (
              <button
                key={r}
                onClick={() => clearFilter('region')}
                className="rounded-full bg-ghana-gold/20 px-3 py-1.5 text-xs font-semibold text-ghana-gold"
              >
                {r} ✕
              </button>
            ))}
            {selectedCategories.map((c) => (
              <button
                key={c}
                onClick={() => clearFilter('category')}
                className="rounded-full bg-ghana-gold/20 px-3 py-1.5 text-xs font-semibold text-ghana-gold"
              >
                {c} ✕
              </button>
            ))}
            <span className="text-xs font-semibold text-text-5">
              Showing {pageItems.length} of {filtered.length} destinations
            </span>
          </div>
        )}
        {selectedRegions.length === 0 && selectedCategories.length === 0 && (
          <div className="mt-3 text-xs font-semibold text-text-5">
            Showing {pageItems.length} of {filtered.length} destinations
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* sidebar */}
        <aside className="lg:w-[220px] shrink-0">
          <div className="font-bold text-sm text-white mb-2.5">Region</div>
          <div className="flex flex-col gap-2 text-sm text-text-3">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => toggleRegion(region)}
                className="flex items-center gap-2 text-left hover:text-white transition-colors"
              >
                <span>{selectedRegions.includes(region) ? '◉' : '○'}</span>
                {region}
              </button>
            ))}
          </div>

          <div className="font-bold text-sm text-white mt-5 mb-2.5">Category</div>
          <div className="flex flex-col gap-2 text-sm text-text-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className="flex items-center gap-2 text-left hover:text-white transition-colors"
              >
                <span>{selectedCategories.includes(category) ? '◉' : '○'}</span>
                {category}
              </button>
            ))}
          </div>
        </aside>

        {/* results */}
        <div className="flex-1">
          {pageItems.length === 0 ? (
            <div className="rounded-2xl border border-hairline p-10 text-center text-text-5">
              No destinations match your filters. Try clearing a filter or search term.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {pageItems.map((d) => (
                <DestinationCard key={d.id} destination={d} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center gap-1.5 mt-7">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`h-8 w-8 rounded-lg text-sm font-semibold transition-colors ${
                    p === page ? 'bg-ghana-green text-white' : 'border border-hairline-strong text-text-4'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
