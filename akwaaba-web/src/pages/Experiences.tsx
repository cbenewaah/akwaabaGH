import { useEffect, useMemo, useRef, useState } from 'react'
import { reviews as seedReviews } from '../data/reviews'
import { getDestination } from '../data/destinations'
import { PlaceholderMedia } from '../components/PlaceholderMedia'
import type { Review } from '../data/types'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const filterTabs = ['All', 'Heritage', 'Nature', 'Festivals'] as const
const MAX_MEDIA_BYTES = 25 * 1024 * 1024 // 25MB — generous for a phone photo/short clip, guards against pathological files

export function Experiences() {
  const { user } = useAuth()
  const [reviews, setReviews] = useState<Review[]>(seedReviews)
  const [activeTab, setActiveTab] = useState<(typeof filterTabs)[number]>('All')
  const [showForm, setShowForm] = useState(false)
  const [place, setPlace] = useState('')
  const [text, setText] = useState('')
  const [rating, setRating] = useState(5)
  const [media, setMedia] = useState<{ type: 'image' | 'video'; url: string } | null>(null)
  const objectUrlRef = useRef<string | null>(null)

  const filtered = useMemo(
    () => (activeTab === 'All' ? reviews : reviews.filter((r) => r.category === activeTab)),
    [reviews, activeTab],
  )

  // Revoke the blob URL used for video previews so we don't leak memory —
  // images are read as base64 instead, so only video needs this.
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
    }
  }, [])

  function handleMediaChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return

    if (file.size > MAX_MEDIA_BYTES) {
      alert('That file is too large — please choose something under 25MB.')
      return
    }

    const isVideo = file.type.startsWith('video/')
    if (isVideo) {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
      const url = URL.createObjectURL(file)
      objectUrlRef.current = url
      setMedia({ type: 'video', url })
    } else {
      const reader = new FileReader()
      reader.onload = () => setMedia({ type: 'image', url: reader.result as string })
      reader.readAsDataURL(file)
    }
  }

  function clearMedia() {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current)
      objectUrlRef.current = null
    }
    setMedia(null)
  }

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
      media: media ?? undefined,
    }
    setReviews((prev) => [newReview, ...prev])
    setPlace('')
    setText('')
    setRating(5)
    // Video preview URL now belongs to the posted review's card — don't revoke it.
    objectUrlRef.current = null
    setMedia(null)
    setShowForm(false)
  }

  return (
    <div className="mx-auto max-w-[1400px] px-5 lg:px-8 py-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">Travel experiences</h1>
          <p className="mt-1 text-sm text-text-4">Real stories, photos, and videos from travelers across Ghana.</p>
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

          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-text-4">Photo or video (optional)</span>
            {media ? (
              <div className="relative w-44 rounded-lg overflow-hidden border border-hairline-strong">
                {media.type === 'video' ? (
                  <video src={media.url} className="h-28 w-44 object-cover bg-black" muted />
                ) : (
                  <img src={media.url} alt="Selected preview" className="h-28 w-44 object-cover" />
                )}
                <button
                  type="button"
                  onClick={clearMedia}
                  className="absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-xs text-white hover:bg-black/90 transition-colors"
                  aria-label="Remove media"
                >
                  ✕
                </button>
              </div>
            ) : (
              <label className="inline-flex w-fit items-center gap-2 rounded-lg border border-dashed border-hairline-strong px-3.5 py-2.5 text-sm font-semibold text-text-4 cursor-pointer hover:border-ghana-green hover:text-white transition-colors">
                📷 Add a photo or video
                <input type="file" accept="image/*,video/*" onChange={handleMediaChange} className="hidden" />
              </label>
            )}
          </div>

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
        {filtered.map((r) => {
          // No uploaded photo/video? Fall back to the real photo of the place
          // being reviewed, if we have one, instead of a generic placeholder.
          const destinationImage = r.destinationId ? getDestination(r.destinationId)?.image : undefined
          return (
          <div key={r.id} className="rounded-2xl border border-hairline overflow-hidden bg-surface">
            {r.media ? (
              r.media.type === 'video' ? (
                <video src={r.media.url} controls className="h-[150px] w-full object-cover bg-black" />
              ) : (
                <PlaceholderMedia image={r.media.url} alt={`${r.author}'s photo from ${r.place}`} className="h-[150px]" />
              )
            ) : destinationImage ? (
              <PlaceholderMedia image={destinationImage} alt={r.place} className="h-[150px]" />
            ) : (
              <PlaceholderMedia label="traveler photo" className="h-[150px]" />
            )}
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
          )
        })}
      </div>
    </div>
  )
}
