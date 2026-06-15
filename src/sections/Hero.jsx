import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const titles = ['Full Stack Developer', 'Laravel Expert', 'React.js Developer', 'Node.js Developer', 'API Architect']
const tags = ['Laravel', 'React.js', 'Next.js', 'Node.js', 'MySQL', 'MongoDB', 'AWS', 'REST APIs', 'Docker']

export default function Hero({ theme: t }) {
  const [titleIdx, setTitleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const current = titles[titleIdx]
    if (typing) {
      if (displayed.length < current.length) {
        const timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => setTyping(false), 1800)
        return () => clearTimeout(timeout)
      }
    } else {
      if (displayed.length > 0) {
        const timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
        return () => clearTimeout(timeout)
      } else {
        setTitleIdx((i) => (i + 1) % titles.length)
        setTyping(true)
      }
    }
  }, [displayed, typing, titleIdx])

  const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }

  return (
    <section id="hero" style={{ padding: '60px 40px 48px', position: 'relative', overflow: 'hidden' }}>
      {/* Glow bg */}
      <div style={{
        position: 'absolute', width: '500px', height: '500px',
        background: `radial-gradient(circle, ${t.accentGlow} 0%, transparent 65%)`,
        top: '-100px', right: '-60px', pointerEvents: 'none',
      }} />

      <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.5 }}>
        {/* Available badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '7px',
          fontSize: '11px', fontFamily: 'monospace', color: t.green,
          background: t.greenFade, border: `0.5px solid ${t.greenBorder}`,
          padding: '4px 14px', borderRadius: '20px', marginBottom: '22px',
        }}>
          <span style={{
            width: '6px', height: '6px', background: t.green,
            borderRadius: '50%', display: 'inline-block',
            animation: 'pulse 2s infinite',
          }} />
          Available — Karachi / Remote / Immediate Joiner
        </div>
      </motion.div>

      <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.5, delay: 0.1 }}>
        {/* Eyebrow */}
        <div style={{
          fontFamily: 'monospace', fontSize: '11px', color: t.accent,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <span style={{ width: '22px', height: '0.5px', background: t.accent, display: 'inline-block' }} />
          Full Stack Developer
        </div>

        {/* Name */}
        <h1 style={{
          fontSize: 'clamp(36px, 5vw, 54px)', fontWeight: 700,
          lineHeight: 1.08, letterSpacing: '-0.025em',
          color: t.text, marginBottom: '12px',
        }}>
          Hafiz{' '}
          <span style={{ color: t.accent }}>Shaheed</span>
        </h1>

        {/* Typewriter */}
        <div style={{
          fontFamily: 'monospace', fontSize: '15px', color: t.textSub,
          marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '6px', minHeight: '28px',
        }}>
          {displayed}
          <span style={{
            display: 'inline-block', width: '2px', height: '16px',
            background: t.accent, animation: 'blink 1s step-end infinite', verticalAlign: 'middle',
          }} />
        </div>
      </motion.div>

      <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.5, delay: 0.2 }}>
        {/* Description */}
        <p style={{
          fontSize: '14px', color: t.textSub, lineHeight: 1.8,
          maxWidth: '520px', marginBottom: '28px',
        }}>
          4+ years building enterprise web apps — ERP systems, SaaS platforms, and REST APIs
          serving 500+ concurrent users. Based in Karachi, open to onsite and remote.
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', marginBottom: '32px' }}>
          {tags.map((tag) => (
            <span key={tag} style={{
              fontSize: '11px', fontFamily: 'monospace', padding: '4px 10px',
              borderRadius: '4px', border: `0.5px solid ${t.accentFade}`,
              color: t.tagText, background: t.tagBg, letterSpacing: '0.03em',
            }}>{tag}</span>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: t.btnBg, color: '#fff', border: 'none',
              padding: '11px 26px', borderRadius: '7px', fontSize: '13px',
              fontFamily: 'inherit', fontWeight: 500, cursor: 'pointer',
            }}
          >
            View My Work
          </button>
          <a href="https://github.com/HafizShaheed" target="_blank" rel="noreferrer"
            style={{
              background: 'transparent', color: t.textSub, border: `0.5px solid rgba(107,114,128,0.3)`,
              padding: '11px 20px', borderRadius: '7px', fontSize: '13px',
              fontFamily: 'inherit', cursor: 'pointer', display: 'flex',
              alignItems: 'center', gap: '7px', textDecoration: 'none',
            }}>
            <i className="ti ti-brand-github" aria-hidden="true" /> GitHub
          </a>
          <a href="https://linkedin.com/in/hafiz-shaheed-b17796141" target="_blank" rel="noreferrer"
            style={{
              background: 'transparent', color: t.textSub, border: `0.5px solid rgba(107,114,128,0.3)`,
              padding: '11px 20px', borderRadius: '7px', fontSize: '13px',
              fontFamily: 'inherit', cursor: 'pointer', display: 'flex',
              alignItems: 'center', gap: '7px', textDecoration: 'none',
            }}>
            <i className="ti ti-brand-linkedin" aria-hidden="true" /> LinkedIn
          </a>
        </div>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.5, delay: 0.35 }}
        style={{
          display: 'flex', gap: 0, marginTop: '48px',
          borderTop: `0.5px solid ${t.border}`, paddingTop: '24px',
          flexWrap: 'wrap',
        }}>
        {[
          { num: '4+', label: 'Years exp' },
          { num: '500+', label: 'Users served' },
          { num: '40%', label: 'Perf gain' },
          { num: '43+', label: 'Projects' },
        ].map((s, i) => (
          <div key={i} style={{
            flex: '1', minWidth: '100px',
            padding: '0 24px 0 0', marginRight: '24px',
            borderRight: i < 3 ? `0.5px solid ${t.border}` : 'none',
          }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: t.accent, fontFamily: 'monospace', marginBottom: '3px' }}>
              {s.num}
            </div>
            <div style={{ fontSize: '10px', color: t.textDim, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {s.label}
            </div>
          </div>
        ))}
      </motion.div>

      <style>{`
        @keyframes pulse { 50% { opacity: 0.3; } }
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>
    </section>
  )
}
