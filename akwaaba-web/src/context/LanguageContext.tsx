import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { translateToTwi } from '../lib/translate'

export type Lang = 'en' | 'tw'

const dictionary: Record<string, { en: string; tw: string }> = {
  nav_destinations: { en: 'Destinations', tw: 'Mmeae' },
  nav_festivals: { en: 'Festivals', tw: 'Afahyɛ' },
  nav_experiences: { en: 'Experiences', tw: 'Osuahu' },
  nav_about: { en: 'About', tw: 'Yɛn ho asɛm' },
  nav_home: { en: 'Home', tw: 'Fie' },
  nav_trip: { en: 'Trip', tw: 'Akwantu' },
  ask_ai: { en: 'Ask AI', tw: 'Bisa AI' },
  sign_in: { en: 'Sign in', tw: 'Kɔ mu' },
  sign_up: { en: 'Sign up', tw: 'Kyerɛw wo din' },
  sign_out: { en: 'Sign out', tw: 'Fi mu' },
  search_placeholder: { en: 'Search a place, region, or vibe…', tw: 'Hwehwɛ baabi, ɔmantam anaa su…' },
  explore: { en: 'Explore', tw: 'Hwehwɛ mu' },
  hero_title: {
    en: 'Discover the soul of Ghana, all in one place.',
    tw: 'Hunu Ghana honhom no wɔ baabiara.',
  },
  hero_sub: {
    en: 'From Cape Coast Castle to the Volta hills, explore destinations, time your trip to living festivals, and ask anything in English or Twi.',
    tw: 'Efi Cape Coast Aban kɔsi Volta mmepɔw, hwehwɛ mmeae, hyehyɛ wo akwantu ma afahyɛ, na bisa biribiara wɔ Borɔfo anaa Twi mu.',
  },
  browse_region: { en: 'Browse by region', tw: 'Hwɛ mmeae sɛnea ɔmantam teɛ' },
  featured_destinations: { en: 'Featured destinations', tw: 'Mmeae a wɔapaw' },
  view_all: { en: 'View all', tw: 'Hwɛ nyinaa' },
  season_title: { en: 'Time your trip to a living festival', tw: 'Hyehyɛ wo akwantu ma afahyɛ a ɛrekɔ so' },
  see_calendar: { en: 'See calendar', tw: 'Hwɛ kalenda' },
}

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: keyof typeof dictionary) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')

  function t(key: keyof typeof dictionary) {
    return dictionary[key]?.[lang] ?? String(key)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

/**
 * For free-form content that isn't in the static UI dictionary above
 * (destination/festival descriptions, etc.) — translates live via the
 * Khaya AI API when the site is in Twi mode. Shows the English source
 * text until the translation resolves, and stays on English if lang is 'en'.
 */
export function useTranslatedText(text: string) {
  const { lang } = useLanguage()
  const [translated, setTranslated] = useState(text)

  useEffect(() => {
    if (lang !== 'tw') return
    let cancelled = false
    setTranslated(text) // show English immediately while the real translation loads, avoids flashing stale text from a previous page
    translateToTwi(text).then((result) => {
      if (!cancelled) setTranslated(result)
    })
    return () => {
      cancelled = true
    }
  }, [lang, text])

  return lang === 'tw' ? translated : text
}
