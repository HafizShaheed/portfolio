// src/hooks/usePortfolioImages.js
import { useState, useEffect } from 'react'

const FALLBACKS = {
  hero: '/avatar-cursor.png',
  about: '/avatar-cursor.png',
  cursor: '/running-avatar.png',
}

// Cache globally taake baar baar fetch na ho
let cachedImages = null

export function usePortfolioImages() {
  const [images, setImages] = useState(cachedImages || FALLBACKS)
  const [loading, setLoading] = useState(!cachedImages)

  useEffect(() => {
    if (cachedImages) return // Already fetched

    fetch('/api/get-images')
      .then(r => r.json())
      .then(data => {
        const resolved = {
          hero: data.hero || FALLBACKS.hero,
          about: data.about || FALLBACKS.about,
          cursor: data.cursor || FALLBACKS.cursor,
        }
        cachedImages = resolved
        setImages(resolved)
      })
      .catch(() => setImages(FALLBACKS))
      .finally(() => setLoading(false))
  }, [])

  return { images, loading }
}