// src/hooks/usePortfolioImages.js
// Blob se current images fetch karta hai
import { useState, useEffect } from 'react'

const FALLBACKS = {
  hero: '/avatar-cursor.png',
  about: '/avatar-cursor.png',
  cursor: '/running-avatar.png',
}

export function usePortfolioImages() {
  const [images, setImages] = useState(FALLBACKS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/get-images')
      .then(r => r.json())
      .then(data => {
        setImages({
          hero: data.hero || FALLBACKS.hero,
          about: data.about || FALLBACKS.about,
          cursor: data.cursor || FALLBACKS.cursor,
        })
      })
      .catch(() => setImages(FALLBACKS))
      .finally(() => setLoading(false))
  }, [])

  return { images, loading }
}
