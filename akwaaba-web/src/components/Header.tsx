import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { to: '/about', key: 'nav_about' as const },
  { to: '/destinations', key: 'nav_destinations' as const },
  { to: '/festivals', key: 'nav_festivals' as const },
  { to: '/experiences', key: 'nav_experiences' as const },
]

export function Header() {
  const { lang, setLang, t } = useLanguage()
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
      setMenuOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center gap-6 px-5 py-3.5 lg:px-8">
        <Link to="/" className="flex items-center gap-1.5 font-display text-xl font-extrabold text-white shrink-0">
          <span className="text-ghana-green">★</span>AkwaabaGH
        </Link>

        <nav className="hidden lg:flex items-center gap-5 font-semibold text-sm text-text-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? 'text-ghana-green border-b-2 border-ghana-green pb-0.5' : 'hover:text-white transition-colors'
              }
            >
              {t(item.key)}
            </NavLink>
          ))}
        </nav>

        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-[320px] ml-auto">
          <div className="flex w-full items-center gap-2 rounded-lg border border-hairline-strong px-3 py-1.5 text-sm text-text-5 focus-within:border-ghana-green">
            <span>⌕</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Ghana…"
              className="w-full bg-transparent text-text-2 placeholder:text-text-5 outline-none"
            />
          </div>
        </form>

        <div className="flex items-center gap-2.5 shrink-0">
          <div className="hidden sm:flex overflow-hidden rounded-lg border border-hairline-strong text-xs font-semibold">
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1.5 transition-colors ${lang === 'en' ? 'bg-ghana-green text-white' : 'text-text-4'}`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('tw')}
              className={`px-2.5 py-1.5 transition-colors ${lang === 'tw' ? 'bg-ghana-red text-white' : 'text-text-4'}`}
            >
              TW
            </button>
          </div>

          <Link
            to="/assistant"
            className="hidden sm:flex items-center gap-1.5 rounded-lg bg-ghana-green px-3.5 py-2 text-xs font-bold text-white hover:bg-ghana-green-deep transition-colors"
          >
            ✦ {t('ask_ai')}
          </Link>

          {user ? (
            <div className="hidden lg:flex items-center gap-2">
              <Link
                to="/my-trip"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-ghana-gold/20 text-xs font-bold text-ghana-gold"
                title={user.name}
              >
                {user.name.charAt(0).toUpperCase()}
              </Link>
              <button
                onClick={signOut}
                className="text-xs font-semibold text-text-5 hover:text-white transition-colors"
              >
                {t('sign_out')}
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-2">
              <Link to="/sign-in" className="text-xs font-semibold text-text-4 hover:text-white transition-colors px-2">
                {t('sign_in')}
              </Link>
              <Link
                to="/sign-up"
                className="rounded-lg border border-hairline-strong px-3 py-2 text-xs font-bold text-white hover:border-ghana-gold hover:text-ghana-gold transition-colors"
              >
                {t('sign_up')}
              </Link>
            </div>
          )}

          <button
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-hairline-strong text-white"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t border-hairline bg-surface px-5 py-4 flex flex-col gap-3">
          <form onSubmit={handleSearch} className="flex items-center gap-2 rounded-lg border border-hairline-strong px-3 py-2 text-sm text-text-5">
            <span>⌕</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Ghana…"
              className="w-full bg-transparent text-text-2 placeholder:text-text-5 outline-none"
            />
          </form>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className="font-semibold text-text-3"
            >
              {t(item.key)}
            </NavLink>
          ))}
          <Link to="/assistant" onClick={() => setMenuOpen(false)} className="font-semibold text-ghana-green">
            ✦ {t('ask_ai')}
          </Link>
          <Link to="/my-trip" onClick={() => setMenuOpen(false)} className="font-semibold text-text-3">
            {t('nav_trip')}
          </Link>
          <div className="flex gap-3 pt-2 border-t border-hairline">
            {user ? (
              <button onClick={signOut} className="text-sm font-semibold text-text-4">
                {t('sign_out')}
              </button>
            ) : (
              <>
                <Link to="/sign-in" onClick={() => setMenuOpen(false)} className="text-sm font-semibold text-text-4">
                  {t('sign_in')}
                </Link>
                <Link to="/sign-up" onClick={() => setMenuOpen(false)} className="text-sm font-semibold text-ghana-gold">
                  {t('sign_up')}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
