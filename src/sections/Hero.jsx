// src/sections/Hero.jsx
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

const titles = ['Full Stack Developer', 'Laravel Expert', 'React.js Developer', 'Node.js Engineer', 'API Architect']

const techStack = [
  { name: 'Laravel', color: '#FF2D20', icon: 'ti-brand-laravel' },
  { name: 'React', color: '#61DAFB', icon: 'ti-brand-react' },
  { name: 'Node.js', color: '#68A063', icon: 'ti-brand-nodejs' },
  { name: 'AWS', color: '#FF9900', icon: 'ti-brand-aws' },
  { name: 'Docker', color: '#2496ED', icon: 'ti-brand-docker' },
  { name: 'MySQL', color: '#00758F', icon: 'ti-database' },
  { name: 'GraphQL', color: '#E10098', icon: 'ti-brand-graphql' },
  { name: 'Next.js', color: '#fff', icon: 'ti-brand-nextjs' },
  { name: 'Tailwind', color: '#06B6D4', icon: 'ti-brand-tailwind' },
]

const stats = [
  { num: '4+', label: 'Years Experience' },
  { num: '500+', label: 'Users Served' },
  { num: '40%', label: 'Performance Boost' },
  { num: '42+', label: 'Projects Delivered' },
]

export default function Hero({ theme: t }) {
  const isMobile = useIsMobile()
  const [titleIdx, setTitleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const current = titles[titleIdx]
    if (typing) {
      if (displayed.length < current.length) {
        const timer = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60)
        return () => clearTimeout(timer)
      } else {
        const timer = setTimeout(() => setTyping(false), 2000)
        return () => clearTimeout(timer)
      }
    } else {
      if (displayed.length > 0) {
        const timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
        return () => clearTimeout(timer)
      } else {
        setTitleIdx(i => (i + 1) % titles.length)
        setTyping(true)
      }
    }
  }, [displayed, typing, titleIdx])

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: i => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.22,1,0.36,1] } })
  }

  return (
    <section id="hero" style={{
      minHeight: isMobile ? 'auto' : '100vh',
      padding: isMobile ? '60px 20px 48px' : '0 40px',
      maxWidth: '1280px', margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1.1fr 0.9fr',
      alignItems: 'center',
      gap: isMobile ? '48px' : '60px',
      position: 'relative',
    }}>

      {/* Background glow */}
      <div style={{
        position: 'fixed', top: '-200px', right: '-200px',
        width: '600px', height: '600px', pointerEvents: 'none', zIndex: 0,
        background: `radial-gradient(circle, ${t.accentGlow} 0%, transparent 70%)`,
      }} />

      {/* LEFT */}
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Available badge */}
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: t.greenFade, border: `0.5px solid ${t.greenBorder}`,
            color: t.green, padding: '6px 16px', borderRadius: '20px',
            fontSize: '12px', fontWeight: 500, marginBottom: '24px',
            letterSpacing: '0.02em',
          }}>
            <span style={{ width: '7px', height: '7px', background: t.green, borderRadius: '50%', animation: 'pulse 2s infinite' }} />
            Available for new opportunities
          </div>
        </motion.div>

        {/* Greeting */}
        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show">
          <div style={{ fontSize: isMobile ? '16px' : '18px', color: t.textSub, marginBottom: '8px', fontWeight: 400 }}>
            Hi, I'm
          </div>
        </motion.div>

        {/* Name */}
        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="show">
          <h1 style={{
            fontSize: isMobile ? 'clamp(36px,9vw,52px)' : 'clamp(44px,5vw,66px)',
            fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em',
            marginBottom: '12px',
          }}>
            <span style={{ color: '#fff' }}>Hafiz </span>
            <span style={{ color: t.accent }}>Shaheed</span>
          </h1>
        </motion.div>

        {/* Title */}
        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show">
          <div style={{
            fontSize: isMobile ? '16px' : '20px', fontWeight: 600,
            color: t.textSub, marginBottom: '20px',
          }}>
            Senior {displayed}
            <span style={{
              display: 'inline-block', width: '2px', height: isMobile ? '18px' : '22px',
              background: t.accent, marginLeft: '2px', verticalAlign: 'middle',
              animation: 'blink 1s step-end infinite',
            }} />
          </div>
        </motion.div>

        {/* Description */}
        <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show">
          <p style={{
            fontSize: isMobile ? '14px' : '16px', color: t.textSub,
            lineHeight: 1.8, maxWidth: '520px', marginBottom: '32px', fontWeight: 400,
          }}>
            I build scalable, secure and high-performance web applications using Laravel, React.js, Node.js and modern technologies.{' '}
            <span style={{ color: '#cbd5e1' }}>I help businesses turn ideas into powerful digital products.</span>
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div custom={5} variants={fadeUp} initial="hidden" animate="show">
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '48px' }}>
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: t.accent, color: '#fff', border: 'none',
                padding: '13px 28px', borderRadius: '8px', fontSize: '14px', fontWeight: 600,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                flex: isMobile ? '1 1 100%' : 'initial', justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = t.btnHover; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = t.accent; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              View My Work
              <i className="ti ti-arrow-right" style={{ fontSize: '16px' }} />
            </button>
            <a
              href="/Hafiz_Shaheed_Full_Stack_Developer_Resume .pdf"
              download
              style={{
                background: 'transparent', color: t.textSub,
                border: '0.5px solid #1e1e2e', padding: '13px 24px',
                borderRadius: '8px', fontSize: '14px', fontWeight: 500,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                flex: isMobile ? '1 1 auto' : 'initial', justifyContent: 'center',
                textDecoration: 'none', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#444' }}
              onMouseLeave={e => { e.currentTarget.style.color = t.textSub; e.currentTarget.style.borderColor = '#1e1e2e' }}
            >
              <i className="ti ti-download" style={{ fontSize: '15px' }} />
              Download CV
            </a>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div custom={6} variants={fadeUp} initial="hidden" animate="show">
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0', paddingTop: '24px', borderTop: `0.5px solid ${t.border}`,
          }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                paddingRight: i < stats.length - 1 ? '16px' : 0,
                marginRight: i < stats.length - 1 ? '16px' : 0,
                borderRight: i < stats.length - 1 ? `0.5px solid ${t.border}` : 'none',
              }}>
                <div style={{
                  fontSize: isMobile ? '20px' : '26px', fontWeight: 800,
                  color: t.accent, fontFamily: 'monospace', letterSpacing: '-0.03em',
                }}>
                  {s.num}
                </div>
                <div style={{ fontSize: '10px', color: t.textDim, marginTop: '3px', lineHeight: 1.4 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* RIGHT — Tech Stack Grid + Photo */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22,1,0.36,1] }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          {/* Tech stack grid card — like Image 4 */}
          <div style={{
            background: t.card, border: `0.5px solid ${t.cardBorder}`,
            borderRadius: '20px', padding: '28px',
            boxShadow: `0 0 80px ${t.accentGlow}`,
          }}>
            <div style={{
              fontSize: '11px', color: t.textDim, fontFamily: 'monospace',
              letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '20px',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <span style={{ width: '16px', height: '0.5px', background: t.accent }} />
              Tech Stack
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {techStack.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.06 }}
                  style={{
                    background: t.surface, border: `0.5px solid ${t.border}`,
                    borderRadius: '12px', padding: '16px 12px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                    cursor: 'default', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#1a1a28'
                    e.currentTarget.style.borderColor = tech.color + '44'
                    e.currentTarget.style.transform = 'translateY(-3px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = t.surface
                    e.currentTarget.style.borderColor = t.border
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <i className={`ti ${tech.icon}`} style={{ fontSize: '28px', color: tech.color }} />
                  <span style={{ fontSize: '11px', color: t.textDim, fontWeight: 500, textAlign: 'center' }}>
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Photo below tech stack */}
            <div style={{
              marginTop: '20px', borderTop: `0.5px solid ${t.border}`,
              paddingTop: '20px', display: 'flex', alignItems: 'center', gap: '14px',
            }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%',
                border: `2px solid ${t.accent}`, overflow: 'hidden',
                background: t.surface, flexShrink: 0,
              }}>
                <img
                  src="/hafiz.jpg"
                  alt="Hafiz Shaheed"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                  onError={e => e.target.style.display = 'none'}
                />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>Hafiz Shaheed Ul Islam</div>
                <div style={{ fontSize: '12px', color: t.textDim, marginTop: '2px' }}>Senior Full Stack Developer</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '4px' }}>
                  <span style={{ width: '6px', height: '6px', background: t.green, borderRadius: '50%', animation: 'pulse 2s infinite' }} />
                  <span style={{ fontSize: '11px', color: t.green }}>Available for new opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes blink { 50%{opacity:0} }
      `}</style>
    </section>
  )
}