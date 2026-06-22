// src/hooks/useIsMobile.js
import { useState, useEffect } from 'react'

// Yeh hook batata hai screen mobile-size hai ya nahi
// breakpoint = 768px se neeche "mobile" maana jata hai
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [breakpoint])

  return isMobile
}
