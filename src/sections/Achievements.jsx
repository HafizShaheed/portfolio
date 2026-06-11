import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
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
        const step = Math.ceil(target / 50)
        const timer = setInterval(() => {
          current = Math.min(current + step, target)
          setCount(current)
          if (current >= target) clearInterval(timer)
        }, 30)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref} style={{ fontSize: '28px', fontWeight: 700, color: t.accent, fontFamily: 'monospace' }}>
      {count}{suffix}
    </span>
  )
}

export default function Achievements({ theme: t }) {
  return (
    <section id="achievements" style={{ padding: '56px 40px', borderTop: `0.5px solid ${t.border}` }}>
      <div style={{ fontFamily: 'monospace', fontSize: '11px', color: t.accent, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ width: '22px', height: '0.5px', background: t.accent, display: 'inline-block' }} />
        04 — Achievements
      </div>
      <h2 style={{ fontSize: '26px', fontWeight: 700, color: t.text, letterSpacing: '-0.02em', marginBottom: '32px' }}>
        By the Numbers
      </h2>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '14px', marginBottom: '28px' }}>
        {stats.map((s, i) => (
          <motion.div key={s.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            viewport={{ once: true }}
            style={{ background: t.statCard, border: `0.5px solid ${t.cardBorder}`, borderRadius: '10px', padding: '20px 16px', textAlign: 'center' }}
          >
            <Counter target={s.num} suffix={s.suffix} theme={t} />
            <div style={{ fontSize: '11px', color: t.textSub, lineHeight: 1.4, marginTop: '4px' }}>{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Achievement list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {achievementList.map((a, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: i * 0.08 }}
            viewport={{ once: true }}
            style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 16px', background: t.card, border: `0.5px solid ${t.cardBorder}`, borderRadius: '8px' }}
          >
            <i className={`ti ${a.icon}`} style={{ color: t.accent, fontSize: '16px', marginTop: '1px', flexShrink: 0 }} aria-hidden="true" />
            <p style={{ fontSize: '13px', color: t.textSub, lineHeight: 1.6 }}>{a.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
