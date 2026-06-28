// src/components/CursorFollower.jsx
import { useState, useEffect, useRef } from 'react'

export default function CursorFollower({ theme: t }) {
  const avatarRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [facingLeft, setFacingLeft] = useState(false)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const lastX = useRef(0)

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches
    if (isTouchDevice) return

    const handleMouseMove = (e) => {
      const movingLeft = e.clientX < lastX.current
      const movingRight = e.clientX > lastX.current
      if (movingLeft) setFacingLeft(true)
      if (movingRight) setFacingLeft(false)
      lastX.current = e.clientX

      target.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)
    }

    window.addEventListener('mousemove', handleMouseMove)

    let animationFrame
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.1
      pos.current.y += (target.current.y - pos.current.y) * 0.1

      if (avatarRef.current) {
        avatarRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`
      }
      animationFrame = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrame)
    }
  }, [isVisible])

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null
  }

  return (
    <div
      ref={avatarRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '25px',
        height: '25px',
        marginLeft: '-20px',
        marginTop: '-34px',
        borderRadius: '100%',       // gol shape
        overflow: 'hidden',         // andar ki cheez circle se bahar nahi dikhegi
        border: `2px solid ${t.accent}`,
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: isVisible ? 0.95 : 0,
        transition: 'opacity 0.3s ease',
        willChange: 'transform',
        boxShadow: `0 4px 16px rgba(0,0,0,0.35), 0 0 0 3px ${t.accentFade}`,
        background: t.bg,
      }}
    >
      <img
        src="/running-avatar.png"
        alt=""
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',     // circle ko poora fill karega
          objectPosition: 'top',  // chehra upar rakhega, taang neeche crop ho jayengi
          display: 'block',
          transform: facingLeft ? 'scaleX(-1)' : 'scaleX(1)',
          transition: 'transform 0.15s ease',
        }}
      />
    </div>
  )
}