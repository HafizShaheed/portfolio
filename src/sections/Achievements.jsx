// src/sections/Achievements.jsx
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'
import { stats, achievementList } from '../data/achievements'

function Counter({ target, suffix, theme: t }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        let current = 0
        const step = Math.ceil(target / 60)
        const timer = setInterval(() => {
          current = Math.min(current + step, target)
          setCount(current)
          if (current >= target) clearInterval(timer)
        }, 24)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref} style={{
      fontSize: '36px', fontWeight: 900, color: '#fff',
      fontFamily: 'monospace', letterSpacing: '-0.04em',
    }}>
      {count}<span style={{ color: t.accent }}>{suffix}</span>
    </span>
  )
}

export default function Achievements({ theme: t }) {
  const isMobile = useIsMobile()

  const bigStats = [
    { num: 500, suffix: '+', label: 'Active Users', sub: 'Across Multiple Campuses', icon: 'ti-users' },
    { num: 40, suffix: '%', label: 'Performance Improvement', sub: 'Through Automation', icon: 'ti-trending-up' },
    { num: 100, suffix: '+', label: 'Roles Managed', sub: 'RBAC Architecture', icon: 'ti-shield-check' },
    { num: 42, suffix: '+', label: 'Enterprise Modules', sub: 'Delivered Successfully', icon: 'ti-layers-intersect' },
    { num: 99, suffix: '.9%', label: 'System Uptime', sub: 'For Critical Systems', icon: 'ti-activity' },
    { num: 4, suffix: '+', label: 'Years Journey', sub: 'Professional Experience', icon: 'ti-calendar' },
  ]

  return (
    <section id="achievements" style={{
      padding: isMobile ? '64px 20px' : '100px 40px',
      maxWidth: '1280px', margin: '0 auto',
      borderTop: `0.5px solid ${t.border}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <span style={{ fontSize: '11px', color: t.accent, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'monospace', fontWeight: 600 }}>
          ACHIEVEMENTS
        </span>
        <div style={{ flex: 1, height: '0.5px', background: t.border }} />
      </div>

      <h2 style={{
        fontSize: isMobile ? '28px' : '36px', fontWeight: 800,
        letterSpacing: '-0.03em', marginBottom: '48px',
      }}>
        Numbers that <span style={{ color: t.accent }}>matter</span>
      </h2>

      {/* Big stats grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
        gap: '12px', marginBottom: '48px',
      }}>
        {bigStats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            viewport={{ once: true }}
            style={{
              background: t.card, border: `0.5px solid ${t.cardBorder}`,
              borderRadius: '14px', padding: isMobile ? '20px' : '24px',
              display: 'flex', gap: '14px', alignItems: 'flex-start',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = t.hoverBorder
              e.currentTarget.style.transform = 'translateY(-3px)'
              e.currentTarget.style.boxShadow = `0 12px 40px ${t.accentGlow}`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = t.cardBorder
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div style={{
              width: '44px', height: '44px', borderRadius: '10px',
              background: t.accentFade, display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: t.accent, fontSize: '20px', flexShrink: 0,
            }}>
              <i className={`ti ${s.icon}`} />
            </div>
            <div>
              <Counter target={s.num} suffix={s.suffix} theme={t} />
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#cbd5e1', marginTop: '4px' }}>{s.label}</div>
              <div style={{ fontSize: '11px', color: t.textDim, marginTop: '2px' }}>{s.sub}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Achievement list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {achievementList.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            viewport={{ once: true }}
            style={{
              display: 'flex', alignItems: 'flex-start', gap: '14px',
              padding: '16px 20px', background: t.card,
              border: `0.5px solid ${t.cardBorder}`, borderRadius: '10px',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = t.hoverBorder}
            onMouseLeave={e => e.currentTarget.style.borderColor = t.cardBorder}
          >
            <i className={`ti ${a.icon}`} style={{ color: t.accent, fontSize: '18px', marginTop: '2px', flexShrink: 0 }} />
            <p style={{ fontSize: '14px', color: t.textSub, lineHeight: 1.7 }}>{a.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

