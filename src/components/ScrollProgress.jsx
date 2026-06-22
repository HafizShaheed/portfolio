// src/components/ScrollProgress.jsx
import { useState, useEffect } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'

export default function ScrollProgress({ theme: t }) {
  const isMobile = useIsMobile()
  const [progress, setProgress] = useState(0)
  const [showBadge, setShowBadge] = useState(false)
  let hideTimer = null

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      const percentage = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0
      setProgress(percentage)

      // Badge dikhao scroll karte waqt, phir 1 second baad chhupa do
      setShowBadge(true)
      clearTimeout(hideTimer)
      hideTimer = setTimeout(() => setShowBadge(false), 1000)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <>
      {/* Thick progress bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        height: '5px', zIndex: 1001,
        background: 'rgba(255,255,255,0.05)',
      }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: `linear-gradient(90deg, ${t.accent2 || t.accent}, ${t.accent})`,
          transition: 'width 0.1s ease-out',
          boxShadow: `0 0 12px ${t.accent}`,
        }} />
      </div>

      {/* Percentage badge - dikhta hai scroll karte waqt */}
      <div style={{
        position: 'fixed',
        top: isMobile ? '12px' : '16px',
        left: isMobile ? '12px' : '20px',
        zIndex: 1002,
        background: t.bg,
        border: `1px solid ${t.accent}`,
        color: t.accent,
        fontFamily: 'monospace',
        fontWeight: 700,
        fontSize: isMobile ? '11px' : '12px',
        padding: isMobile ? '5px 10px' : '6px 12px',
        borderRadius: '20px',
        boxShadow: `0 2px 12px rgba(0,0,0,0.3)`,
        opacity: showBadge ? 1 : 0,
        transform: showBadge ? 'translateY(0)' : 'translateY(-8px)',
        transition: 'opacity 0.25s ease, transform 0.25s ease',
        pointerEvents: 'none',
      }}>
        {Math.round(progress)}%
      </div>
    </>
  )
}