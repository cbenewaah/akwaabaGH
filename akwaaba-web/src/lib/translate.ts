const cache = new Map<string, string>()

/**
 * Translates English text to Twi via the Khaya AI API (server/index.js
 * holds the subscription key). Falls back to the original English text on
 * any failure so content never disappears if the free-tier quota runs out
 * or the API is unreachable.
 */
export async function translateToTwi(text: string): Promise<string> {
  const trimmed = text.trim()
  if (!trimmed) return text

  const cached = cache.get(trimmed)
  if (cached) return cached

  try {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: trimmed, lang: 'en-tw' }),
    })
    if (!res.ok) throw new Error(`translate API returned ${res.status}`)

    const data: { translation: string } = await res.json()
    cache.set(trimmed, data.translation)
    return data.translation
  } catch (err) {
    console.warn('Translation unavailable, showing English:', err)
    return text
  }
}
