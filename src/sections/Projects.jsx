
// src/sections/Projects.jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useIsMobile } from '../hooks/useIsMobile'
import { projects, filters } from '../data/projects'

// const techColors = {
//   'Laravel':    { color: '#FF2D20', icon: 'ti-brand-laravel' },
//   'PHP':        { color: '#777BB4', icon: 'ti-brand-php' },
//   'MySQL':      { color: '#00758F', icon: 'ti-database' },
//   'React.js':   { color: '#61DAFB', icon: 'ti-brand-react' },
//   'Node.js':    { color: '#68A063', icon: 'ti-brand-nodejs' },
//   'MongoDB':    { color: '#47A248', icon: 'ti-brand-mongodb' },
//   'AWS':        { color: '#FF9900', icon: 'ti-brand-aws' },
//   'Next.js':    { color: '#EBEBEB', icon: 'ti-brand-nextjs' },
//   'Docker':     { color: '#2496ED', icon: 'ti-brand-docker' },
//   'Stripe':     { color: '#635BFF', icon: 'ti-brand-stripe' },
//   'GraphQL':    { color: '#E1007A', icon: 'ti-brand-graphql' },
//   'JWT':        { color: '#D63AFF', icon: 'ti-lock' },
//   'Socket.io':  { color: '#CCCCCC', icon: 'ti-brand-socket-io' },
// }

const techColors = {
  'Laravel':     { bg: 'rgba(255,45,32,0.12)',   color: '#FF2D20', icon: 'ti-brand-laravel' },
  'PHP':         { bg: 'rgba(119,123,180,0.12)',  color: '#777BB4', icon: 'ti-brand-php' },
  'MySQL':       { bg: 'rgba(0,117,143,0.12)',    color: '#00758F', icon: 'ti-database' },
  'JavaScript':  { bg: 'rgba(247,223,30,0.12)',   color: '#F7DF1E', icon: 'ti-brand-javascript' },
  'JS':          { bg: 'rgba(247,223,30,0.12)',   color: '#F7DF1E', icon: 'ti-brand-javascript' },
  'jQuery':      { bg: 'rgba(0,100,166,0.12)',    color: '#0064A6', icon: 'ti-brand-jquery' },
  'React.js':    { bg: 'rgba(97,218,251,0.12)',   color: '#61DAFB', icon: 'ti-brand-react' },
  'Next.js':     { bg: 'rgba(180,180,180,0.08)',  color: '#EBEBEB', icon: 'ti-brand-nextjs' },
  'Nuxt.js':     { bg: 'rgba(0,220,130,0.12)',    color: '#00DC82', icon: 'ti-brand-nuxt' },
  'Vue.js':      { bg: 'rgba(66,184,131,0.12)',   color: '#42B883', icon: 'ti-brand-vue' },
  'Node.js':     { bg: 'rgba(104,160,99,0.12)',   color: '#68A063', icon: 'ti-brand-nodejs' },
  'MongoDB':     { bg: 'rgba(71,162,72,0.12)',    color: '#47A248', icon: 'ti-brand-mongodb' },
  'PostgreSQL':  { bg: 'rgba(51,103,145,0.12)',   color: '#336791', icon: 'ti-database' },
  'AWS':         { bg: 'rgba(255,153,0,0.12)',    color: '#FF9900', icon: 'ti-brand-aws' },
  'Docker':      { bg: 'rgba(36,150,237,0.12)',   color: '#2496ED', icon: 'ti-brand-docker' },
  'Stripe':      { bg: 'rgba(99,91,255,0.12)',    color: '#635BFF', icon: 'ti-brand-stripe' },
  'PayPal':      { bg: 'rgba(0,156,222,0.12)',    color: '#009CDE', icon: 'ti-brand-paypal' },
  'GraphQL':     { bg: 'rgba(225,0,122,0.12)',    color: '#E1007A', icon: 'ti-brand-graphql' },
  'Bootstrap':   { bg: 'rgba(121,82,179,0.12)',   color: '#7952B3', icon: 'ti-brand-bootstrap' },
  'Tailwind':    { bg: 'rgba(6,182,212,0.12)',    color: '#06B6D4', icon: 'ti-brand-tailwind' },
  'TypeScript':  { bg: 'rgba(49,120,198,0.12)',   color: '#3178C6', icon: 'ti-brand-typescript' },
  'Chart.js':    { bg: 'rgba(255,99,132,0.12)',   color: '#FF6384', icon: 'ti-chart-line' },
  'Socket.io':   { bg: 'rgba(200,200,200,0.08)',  color: '#CCCCCC', icon: 'ti-brand-socket-io' },
  'PDF':         { bg: 'rgba(220,38,38,0.12)',    color: '#DC2626', icon: 'ti-file-type-pdf' },
  'DomPDF':      { bg: 'rgba(220,38,38,0.12)',    color: '#DC2626', icon: 'ti-file-type-pdf' },
  'REST API':    { bg: 'rgba(16,185,129,0.12)',   color: '#10B981', icon: 'ti-api' },
  'CodeIgniter': { bg: 'rgba(238,50,36,0.12)',    color: '#EE3224', icon: 'ti-brand-php' },
  'Express.js':  { bg: 'rgba(200,200,200,0.08)',  color: '#CCCCCC', icon: 'ti-brand-nodejs' },
  'JWT':         { bg: 'rgba(210,0,52,0.12)',     color: '#D63AFF', icon: 'ti-lock' },
  'HTML':        { bg: 'rgba(227,76,38,0.12)',    color: '#E34C26', icon: 'ti-brand-html5' },
  'CSS':         { bg: 'rgba(38,77,228,0.12)',    color: '#264DE4', icon: 'ti-brand-css3' },
  'Blade':       { bg: 'rgba(255,45,32,0.08)',    color: '#FF6B6B', icon: 'ti-template' },
  'RBAC':        { bg: 'rgba(16,185,129,0.10)',   color: '#10B981', icon: 'ti-shield-check' },
  'HelloSign':   { bg: 'rgba(0,150,255,0.10)',    color: '#0096FF', icon: 'ti-writing-sign' },
  'Multi-role':  { bg: 'rgba(139,92,246,0.10)',   color: '#8B5CF6', icon: 'ti-users' },
  'Gamification':{ bg: 'rgba(251,191,36,0.10)',   color: '#FBBF24', icon: 'ti-trophy' },
  'Leaderboard': { bg: 'rgba(251,191,36,0.10)',   color: '#FBBF24', icon: 'ti-medal' },
  'LMS':         { bg: 'rgba(59,130,246,0.10)',   color: '#3B82F6', icon: 'ti-school' },
}

function TechBadge({ label }) {
  const tech = techColors[label] || { color: '#64748b', icon: 'ti-code' }
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      fontSize: '10px', fontFamily: 'monospace', padding: '3px 8px',
      borderRadius: '4px', background: `${tech.color}12`,
      border: `0.5px solid ${tech.color}30`, color: tech.color,
      fontWeight: 500, whiteSpace: 'nowrap',
    }}>
      <i className={`ti ${tech.icon}`} style={{ fontSize: '11px' }} />
      {label}
    </span>
  )
}

export default function Projects({ theme: t }) {
  const [active, setActive] = useState('All')
  const navigate = useNavigate()
  const isMobile = useIsMobile()

  const filtered = active === 'All'
    ? projects
    : projects.filter(p => p.category === active.toLowerCase())

  return (
    <section id="projects" style={{
      padding: isMobile ? '64px 20px' : '100px 40px',
      maxWidth: '1280px', margin: '0 auto',
      borderTop: `0.5px solid ${t.border}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <span style={{ fontSize: '11px', color: t.accent, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'monospace', fontWeight: 600 }}>
          FEATURED PROJECTS
        </span>
        <div style={{ flex: 1, height: '0.5px', background: t.border }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
        <h2 style={{ fontSize: isMobile ? '28px' : '36px', fontWeight: 800, letterSpacing: '-0.03em' }}>
          Some of my <span style={{ color: t.accent }}>recent work</span>
        </h2>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActive(f)} style={{
              fontSize: '12px', fontFamily: 'monospace', padding: '6px 14px',
              borderRadius: '6px', cursor: 'pointer',
              border: `0.5px solid ${active === f ? t.accent : t.border}`,
              color: active === f ? t.accent : t.textDim,
              background: active === f ? t.accentFade : 'transparent',
              fontWeight: active === f ? 600 : 400,
              transition: 'all 0.2s',
            }}>{f}</button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '16px',
      }}>
        <AnimatePresence>
          {filtered.map(p => (
            <motion.div
              key={p.name} layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              onClick={() => navigate(`/projects/${p.slug}`)}
              style={{
                background: t.card, border: `0.5px solid ${t.cardBorder}`,
                borderRadius: '14px', overflow: 'hidden', cursor: 'pointer',
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = t.hoverBorder
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = `0 16px 48px ${t.accentGlow}`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = t.cardBorder
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Image */}
              {p.image ? (
                <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
                  <img src={p.image} alt={p.name} style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    objectPosition: 'top', display: 'block',
                  }} />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(18,18,26,0.8) 0%, transparent 60%)',
                  }} />
                  <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                    <span style={{
                      fontSize: '10px', fontFamily: 'monospace', padding: '3px 10px',
                      borderRadius: '4px', background: 'rgba(0,0,0,0.6)',
                      color: '#fff', backdropFilter: 'blur(4px)', letterSpacing: '0.05em',
                    }}>{p.category.toUpperCase()}</span>
                  </div>
                  <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '6px' }}>
                    <a href={p.github} target="_blank" rel="noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{
                        width: '30px', height: '30px', borderRadius: '7px',
                        background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontSize: '14px', textDecoration: 'none',
                      }}>
                      <i className="ti ti-brand-github" />
                    </a>
                  </div>
                </div>
              ) : (
                <div style={{
                  height: '140px', background: t.surface,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative',
                }}>
                  <i className={`ti ${p.icon}`} style={{ fontSize: '44px', color: t.accent, opacity: 0.3 }} />
                  <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                    <span style={{
                      fontSize: '10px', fontFamily: 'monospace', padding: '3px 10px',
                      borderRadius: '4px', background: t.accentFade, color: t.accent,
                      border: `0.5px solid ${t.tagBorder}`,
                    }}>{p.category.toUpperCase()}</span>
                  </div>
                </div>
              )}

              {/* Body */}
              <div style={{ padding: '16px' }}>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>{p.name}</div>
                <div style={{ fontSize: '12px', color: t.textSub, lineHeight: 1.65, marginBottom: '14px' }}>{p.desc}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', paddingTop: '12px', borderTop: `0.5px solid ${t.border}` }}>
                  {p.stack?.map(s => <TechBadge key={s.label} label={s.label} />)}
                </div>
              </div>

              {/* View Project link */}
              <div style={{
                padding: '10px 16px', borderTop: `0.5px solid ${t.border}`,
                display: 'flex', alignItems: 'center', gap: '6px',
                fontSize: '12px', color: t.accent, fontWeight: 600,
              }}>
                View Project
                <i className="ti ti-arrow-right" style={{ fontSize: '13px' }} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}
