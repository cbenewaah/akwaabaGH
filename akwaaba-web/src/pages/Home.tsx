import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { destinations, regions } from '../data/destinations'
import { festivals } from '../data/festivals'
import { PlaceholderMedia } from '../components/PlaceholderMedia'
import { DestinationCard } from '../components/DestinationCard'
import { RegionMarquee } from '../components/RegionMarquee'
import { TravelTipsSection } from '../components/TravelTipsSection'
import { WhyAkwaabaSection } from '../components/WhyAkwaabaSection'
import { LodgingBanner } from '../components/LodgingBanner'
import { useLanguage } from '../context/LanguageContext'
import heroImg from '../assets/images/bui-national-park.jpg'

const vibeTags = ['Beaches', 'Heritage', 'Wildlife', 'Family-friendly']

// Every region tile borrows a photo from one of its own destinations, so a
// region never renders blank as long as at least one destination in it has
// an image — no need to hand-curate a separate region-to-photo map.
const regionImages: Partial<Record<(typeof regions)[number], string>> = Object.fromEntries(
  regions.map((region) => [region, destinations.find((d) => d.region === region && d.image)?.image]),
)

export function Home() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const featured = destinations.filter((d) => d.featured)
  const upcomingFestivals = festivals.slice(0, 2)

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative w-full min-h-[560px] sm:min-h-[620px] lg:min-h-[680px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <PlaceholderMedia image={heroImg} alt="Bui National Park, a river and forested hills in Ghana" className="h-full w-full" />
        </div>
        {/* Bui's photo runs much brighter (pale sky, sunlit water) than a typical
            moody landscape shot, so this overlay leans darker throughout — and a
            center-weighted radial vignette — to keep the white hero text readable. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(8,14,24,.72) 0%, rgba(8,14,24,.62) 30%, rgba(8,14,24,.78) 70%, rgba(8,14,24,.95) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(60% 55% at 50% 45%, rgba(8,14,24,.35) 0%, rgba(8,14,24,0) 100%)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-[820px] px-5 py-16 text-center">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] text-white tracking-tight drop-shadow-lg">
            {t('hero_title')}
          </h1>
          <p className="mt-4 text-[15px] sm:text-lg leading-relaxed text-text-2 max-w-[620px] mx-auto drop-shadow">
            {t('hero_sub')}
          </p>

          <form
            onSubmit={handleSearch}
            className="mt-7 flex gap-2 rounded-xl border border-hairline-strong bg-surface/90 backdrop-blur p-2 max-w-[520px] mx-auto shadow-lg"
          >
            <div className="flex flex-1 items-center gap-2 px-3 text-sm text-text-5">
              <span>⌕</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('search_placeholder')}
                className="w-full bg-transparent text-text-2 placeholder:text-text-5 outline-none"
              />
            </div>
            <button type="submit" className="rounded-lg bg-ghana-red px-5 py-2.5 font-bold text-sm text-white hover:bg-red-700 transition-colors">
              {t('explore')}
            </button>
          </form>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {vibeTags.map((tag) => (
              <Link
                key={tag}
                to={`/destinations?category=${tag === 'Family-friendly' ? '' : tag === 'Beaches' ? 'Beach' : tag}`}
                className="rounded-full border border-white/25 bg-white/5 backdrop-blur px-3.5 py-1.5 text-xs font-semibold text-text-2 hover:border-ghana-green hover:text-white transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by region */}
      <section className="py-9 sm:py-10">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-5">{t('browse_region')}</h2>
        </div>
        <RegionMarquee regions={regions} regionImages={regionImages} />
      </section>

      {/* Featured destinations */}
      <section className="mx-auto max-w-[1400px] px-5 lg:px-8 py-8 sm:py-10">
        <div className="flex items-end justify-between mb-5">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">{t('featured_destinations')}</h2>
          <Link to="/destinations" className="text-sm font-semibold text-ghana-green hover:underline shrink-0">
            {t('view_all')} →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((d) => (
            <DestinationCard key={d.id} destination={d} />
          ))}
        </div>
      </section>

      {/* Festivals strip */}
      <section className="mx-auto max-w-[1400px] px-5 lg:px-8 py-6">
        <div
          className="rounded-2xl p-5 sm:p-6 flex flex-col lg:flex-row items-start lg:items-center gap-5"
          style={{ background: 'linear-gradient(100deg,#00532f,#006B3F)' }}
        >
          <div className="flex-1">
            <div className="font-bold text-[11px] tracking-wider text-[#ffd84d]">★ HAPPENING THIS SEASON</div>
            <div className="mt-1.5 font-display text-2xl font-extrabold text-white">{t('season_title')}</div>
            <div className="mt-1 text-sm text-[#cfe6da]">
              Homowo · Akwasidae · Hogbetsotso — discover what's on, by region and date.
            </div>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {upcomingFestivals.map((f) => (
              <Link
                key={f.id}
                to={`/festivals/${f.id}`}
                className="rounded-xl border border-white/25 bg-white/10 px-3.5 py-2.5 text-white hover:bg-white/20 transition-colors"
              >
                <div className="font-display font-bold text-sm">{f.name}</div>
                <div className="text-xs text-[#cfe6da]">{f.monthShort} · {f.region}</div>
              </Link>
            ))}
            <Link
              to="/festivals"
              className="flex items-center rounded-xl bg-ghana-gold px-4 py-2.5 font-bold text-sm text-ink"
            >
              {t('see_calendar')} →
            </Link>
          </div>
        </div>
      </section>

      <TravelTipsSection />
      <WhyAkwaabaSection />
      <LodgingBanner />
    </div>
  )
}
