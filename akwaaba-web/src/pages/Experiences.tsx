import { useMemo, useState } from 'react'
import { reviews as seedReviews } from '../data/reviews'
import { PlaceholderMedia } from '../components/PlaceholderMedia'
import type { Review } from '../data/types'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const filterTabs = ['All', 'Heritage', 'Nature', 'Festivals'] as const

export function Experiences() {
  const { user } = useAuth()
  const [reviews, setReviews] = useState<Review[]>(seedReviews)
  const [activeTab, setActiveTab] = useState<(typeof filterTabs)[number]>('All')
  const [showForm, setShowForm] = useState(false)
  const [place, setPlace] = useState('')
  const [text, setText] = useState('')
  const [rating, setRating] = useState(5)

  const filtered = useMemo(
    () => (activeTab === 'All' ? reviews : reviews.filter((r) => r.category === activeTab)),
    [reviews, activeTab],
  )

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!place.trim() || !text.trim()) return
    const newReview: Review = {
      id: `local-${Date.now()}`,
      author: user?.name ?? 'Guest traveller',
      initial: (user?.name ?? 'G').charAt(0).toUpperCase(),
      color: '#006B3F',
      place: place.trim(),
      category: 'Heritage',
      rating,
      text: `"${text.trim()}"`,
      likes: 0,
      time: 'just now',
    }
    setReviews((prev) => [newReview, ...prev])
    setPlace('')
    setText('')
    setRating(5)
    setShowForm(false)
  }

  return (
    <div className="mx-auto max-w-[1400px] px-5 lg:px-8 py-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">Travel experiences</h1>
          <p className="mt-1 text-sm text-text-4">Real stories and reviews from travelers across Ghana.</p>
        </div>
        {user ? (
          <button
            onClick={() => setShowForm((v) => !v)}
            className="rounded-lg bg-ghana-red px-4 py-2.5 text-sm font-bold text-white hover:bg-red-700 transition-colors self-start"
          >
            ✎ Share your experience
          </button>
        ) : (
          <Link
            to="/sign-in"
            state={{ from: '/experiences' }}
            className="rounded-lg border border-hairline-strong px-4 py-2.5 text-sm font-bold text-white hover:border-ghana-gold hover:text-ghana-gold transition-colors self-start"
          >
            Sign in to share your experience
          </Link>
        )}
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 rounded-2xl border border-hairline bg-surface p-4 sm:p-5 flex flex-col gap-3"
        >
          <div className="grid sm:grid-cols-[1fr_140px] gap-3">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-text-4">Place</span>
              <input
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                placeholder="e.g. Kakum Canopy Walk"
                required
                className="rounded-lg border border-hairline-strong bg-surface-deep px-3 py-2 text-sm text-white placeholder:text-text-6 outline-none focus:border-ghana-green"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-text-4">Rating</span>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="rounded-lg border border-hairline-strong bg-surface-deep px-3 py-2 text-sm text-white outline-none"
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n} className="bg-surface">{'★'.repeat(n)}{'☆'.repeat(5 - n)}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-text-4">Your experience</span>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What made it memorable?"
              required
              rows={3}
              className="rounded-lg border border-hairline-strong bg-surface-deep px-3 py-2 text-sm text-white placeholder:text-text-6 outline-none focus:border-ghana-green resize-none"
            />
          </label>
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-text-4"
            >
              Cancel
            </button>
            <button type="submit" className="rounded-lg bg-ghana-green px-4 py-2 text-sm font-bold text-white hover:bg-ghana-green-deep transition-colors">
              Post experience
            </button>
          </div>
        </form>
      )}

      <div className="flex gap-2 mb-4.5">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === tab ? 'bg-ink text-white' : 'border border-hairline-strong text-text-4'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map((r) => (
          <div key={r.id} className="rounded-2xl border border-hairline overflow-hidden bg-surface">
            <PlaceholderMedia label="traveler photo" className="h-[150px]" />
            <div className="p-3.5">
              <div className="flex items-center gap-2">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ background: r.color }}
                >
                  {r.initial}
                </div>
                <div>
                  <div className="font-bold text-sm text-white">{r.author}</div>
                  <div className="text-[11px] text-text-5">
                    {r.place} · {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                  </div>
                </div>
              </div>
              <div className="mt-2.5 text-sm leading-relaxed text-text-2">{r.text}</div>
              <div className="mt-2 text-[11px] text-text-5">♡ {r.likes} · {r.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
