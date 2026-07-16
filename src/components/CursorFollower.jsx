// src/components/CursorFollower.jsx
import { useState, useEffect, useRef } from 'react'

export default function CursorFollower({ theme: t, cursorImage = '/running-avatar.png' }) {
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

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return null

  return (
    <div
      ref={avatarRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '60px', height: '60px',
        marginLeft: '-30px', marginTop: '-54px',
        borderRadius: '50%', overflow: 'hidden',
        border: `2px solid ${t.accent}`,
        pointerEvents: 'none', zIndex: 9999,
        opacity: isVisible ? 0.95 : 0,
        transition: 'opacity 0.3s ease',
        willChange: 'transform',
        boxShadow: `0 4px 16px rgba(99,102,241,0.3), 0 0 0 3px rgba(99,102,241,0.1)`,
        background: t.card,
      }}
    >
      <img
        src={cursorImage}
        alt=""
        style={{
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'top',
          display: 'block',
          transform: facingLeft ? 'scaleX(-1)' : 'scaleX(1)',
          transition: 'transform 0.15s ease',
        }}
      />
    </div>
  )
}
