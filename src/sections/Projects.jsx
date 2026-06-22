import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { projects, filters } from '../data/projects'
import { useIsMobile } from '../hooks/useIsMobile'

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

function StackBadge({ label }) {
  const tech = techColors[label] || { bg: 'rgba(100,100,100,0.10)', color: '#888888', icon: 'ti-code' }
  return (
    <div title={label} style={{
      display: 'flex', alignItems: 'center', gap: '4px',
      padding: '3px 9px', borderRadius: '5px',
      background: tech.bg, color: tech.color,
      fontSize: '11px', fontFamily: 'monospace',
      border: `0.5px solid ${tech.color}40`,
      whiteSpace: 'nowrap', fontWeight: 500,
    }}>
      <i className={`ti ${tech.icon}`} style={{ fontSize: '13px' }} aria-hidden="true" />
      {label}
    </div>
  )
}

export default function Projects({ theme: t }) {
  const [active, setActive] = useState('All')
  const navigate = useNavigate()
  const isMobile = useIsMobile()

  const filtered = active === 'All'
    ? projects
    : projects.filter(p => p.category === active.toLowerCase())

  const openProject = (slug) => {
    navigate(`/projects/${slug}`)
  }

  return (
    <section id="projects" style={{ padding: isMobile ? '40px 20px' : '56px 40px', borderTop: `0.5px solid ${t.border}` }}>
      <div style={{ fontFamily: 'monospace', fontSize: '11px', color: t.accent, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ width: '22px', height: '0.5px', background: t.accent, display: 'inline-block' }} />
        03 — Projects
      </div>
      <h2 style={{ fontSize: isMobile ? '22px' : '26px', fontWeight: 700, color: t.text, letterSpacing: '-0.02em', marginBottom: '6px' }}>
        Things I've Built
      </h2>
      <p style={{ fontSize: '13px', color: t.textSub, marginBottom: isMobile ? '20px' : '24px' }}>
        Enterprise systems, SaaS platforms, and full-stack products — click any card for details
      </p>

      {/* Filters - scrollable on mobile */}
      <div style={{
        display: 'flex', gap: '8px', marginBottom: isMobile ? '20px' : '28px',
        flexWrap: isMobile ? 'nowrap' : 'wrap',
        overflowX: isMobile ? 'auto' : 'visible',
        paddingBottom: isMobile ? '4px' : 0,
        WebkitOverflowScrolling: 'touch',
      }}>
        {filters.map((f) => (
          <button key={f} onClick={() => setActive(f)}
            style={{
              fontSize: '11px', fontFamily: 'monospace', padding: '5px 14px',
              borderRadius: '5px', cursor: 'pointer', letterSpacing: '0.04em',
              border: `0.5px solid ${active === f ? t.accent : t.cardBorder}`,
              color: active === f ? t.accent : t.textSub,
              background: active === f ? t.accentFade : 'transparent',
              transition: 'all 0.2s', flexShrink: 0,
            }}>
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        <AnimatePresence>
          {filtered.map((p) => (
            <motion.div key={p.name}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              onClick={() => openProject(p.slug)}
              style={{
                background: t.card,
                border: `0.5px solid ${t.cardBorder}`,
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'border-color 0.25s, transform 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = t.hoverBorder
                e.currentTarget.style.transform = 'translateY(-3px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = t.cardBorder
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {p.image ? (
                <div style={{ position: 'relative', height: isMobile ? '160px' : '180px', overflow: 'hidden' }}>
                  <img src={p.image} alt={p.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }} />
                  <div style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '10px', fontFamily: 'monospace', padding: '3px 10px', borderRadius: '4px', background: 'rgba(0,0,0,0.5)', color: '#fff', backdropFilter: 'blur(4px)' }}>
                    {p.category.toUpperCase()}
                  </div>
                  <div style={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', gap: '6px' }}>
                    <a href={p.live} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '13px', textDecoration: 'none', backdropFilter: 'blur(4px)' }}>
                      <i className="ti ti-external-link" aria-hidden="true" />
                    </a>
                    <a href={p.github} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '13px', textDecoration: 'none', backdropFilter: 'blur(4px)' }}>
                      <i className="ti ti-brand-github" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              ) : (
                <div style={{ height: '140px', background: t.accentFade, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <i className={`ti ${p.icon}`} style={{ fontSize: '48px', color: t.accent, opacity: 0.4 }} aria-hidden="true" />
                  <div style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '10px', fontFamily: 'monospace', padding: '3px 10px', borderRadius: '4px', background: t.accentFade, color: t.accent, border: `0.5px solid ${t.accentFade}` }}>
                    {p.category.toUpperCase()}
                  </div>
                  <div style={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', gap: '6px' }}>
                    <a href={p.live} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} style={{ width: '28px', height: '28px', borderRadius: '6px', border: `0.5px solid ${t.cardBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.textDim, fontSize: '13px', textDecoration: 'none' }}>
                      <i className="ti ti-external-link" aria-hidden="true" />
                    </a>
                    <a href={p.github} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} style={{ width: '28px', height: '28px', borderRadius: '6px', border: `0.5px solid ${t.cardBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.textDim, fontSize: '13px', textDecoration: 'none' }}>
                      <i className="ti ti-brand-github" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              )}

              <div style={{ padding: isMobile ? '14px' : '16px' }}>
                <div style={{ fontSize: '15px', fontWeight: 600, color: t.text, marginBottom: '6px' }}>{p.name}</div>
                <div style={{ fontSize: '12px', color: t.textSub, lineHeight: 1.65, marginBottom: '12px' }}>{p.desc}</div>

                {p.stack && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', paddingTop: '10px', borderTop: `0.5px solid ${t.border}` }}>
                    {p.stack.map((s) => (
                      <StackBadge key={s.label} label={s.label} />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}
