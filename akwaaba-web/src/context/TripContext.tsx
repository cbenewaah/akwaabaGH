import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

interface TripContextValue {
  savedDestinations: string[]
  savedFestivals: string[]
  toggleDestination: (id: string) => void
  toggleFestival: (id: string) => void
  isDestinationSaved: (id: string) => boolean
  isFestivalSaved: (id: string) => boolean
}

const TripContext = createContext<TripContextValue | null>(null)

const DEST_KEY = 'akwaaba_trip_destinations'
const FEST_KEY = 'akwaaba_trip_festivals'

function loadIds(key: string, fallback: string[]): string[] {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function TripProvider({ children }: { children: ReactNode }) {
  const [savedDestinations, setSavedDestinations] = useState<string[]>(() => loadIds(DEST_KEY, []))
  const [savedFestivals, setSavedFestivals] = useState<string[]>(() => loadIds(FEST_KEY, []))

  useEffect(() => {
    localStorage.setItem(DEST_KEY, JSON.stringify(savedDestinations))
  }, [savedDestinations])

  useEffect(() => {
    localStorage.setItem(FEST_KEY, JSON.stringify(savedFestivals))
  }, [savedFestivals])

  function toggleDestination(id: string) {
    setSavedDestinations((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id],
    )
  }

  function toggleFestival(id: string) {
    setSavedFestivals((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    )
  }

  return (
    <TripContext.Provider
      value={{
        savedDestinations,
        savedFestivals,
        toggleDestination,
        toggleFestival,
        isDestinationSaved: (id) => savedDestinations.includes(id),
        isFestivalSaved: (id) => savedFestivals.includes(id),
      }}
    >
      {children}
    </TripContext.Provider>
  )
}

export function useTrip() {
  const ctx = useContext(TripContext)
  if (!ctx) throw new Error('useTrip must be used within TripProvider')
  return ctx
}
