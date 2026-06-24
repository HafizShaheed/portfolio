// src/components/CursorFollower.jsx
import { useState, useEffect, useRef } from 'react'

export default function CursorFollower({ theme: t }) {
  const dotRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Mobile/touch devices pe yeh effect skip karo - cursor hi nahi hota wahan
    const isTouchDevice = window.matchMedia('(hover: none)').matches
    if (isTouchDevice) return

    const handleMouseMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)
    }

    // Hover detect karo - links/buttons pe bada ho jaye
    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, [role="button"]')) {
        setIsHovering(true)
      }
    }
    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, [role="button"]')) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)

    // Smooth follow animation - lerp (linear interpolation) se delay create hota hai
    let animationFrame
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15
      pos.current.y += (target.current.y - pos.current.y) * 0.15

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`
      }
      animationFrame = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
      cancelAnimationFrame(animationFrame)
    }
  }, [isVisible])

  // Touch devices pe kuch render hi mat karo
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null
  }

  return (
    <div
      ref={dotRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: isHovering ? '40px' : '16px',
        height: isHovering ? '40px' : '16px',
        marginLeft: isHovering ? '-20px' : '-8px',
        marginTop: isHovering ? '-20px' : '-8px',
        borderRadius: '50%',
        background: isHovering ? 'transparent' : t.accent,
        border: isHovering ? `1.5px solid ${t.accent}` : 'none',
        boxShadow: isHovering ? 'none' : `0 0 12px ${t.accent}`,
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: isVisible ? 0.7 : 0,
        transition: 'width 0.2s, height 0.2s, margin 0.2s, background 0.2s, border 0.2s, opacity 0.3s',
        willChange: 'transform',
      }}
    />
  )
}