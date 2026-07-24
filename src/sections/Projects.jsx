
// src/sections/Projects.jsx
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useIsMobile } from '../hooks/useIsMobile'
import { projects, filters } from '../data/projects'

const techColors = {
  'Laravel':    { color: '#FF2D20', icon: 'ti-brand-laravel' },
  'PHP':        { color: '#777BB4', icon: 'ti-brand-php' },
  'MySQL':      { color: '#00758F', icon: 'ti-database' },
  'React.js':   { color: '#61DAFB', icon: 'ti-brand-react' },
  'Node.js':    { color: '#68A063', icon: 'ti-brand-nodejs' },
  'MongoDB':    { color: '#47A248', icon: 'ti-brand-mongodb' },
  'AWS':        { color: '#FF9900', icon: 'ti-brand-aws' },
  'Next.js':    { color: '#EBEBEB', icon: 'ti-brand-nextjs' },
  'Docker':     { color: '#2496ED', icon: 'ti-brand-docker' },
  'Stripe':     { color: '#635BFF', icon: 'ti-brand-stripe' },
  'GraphQL':    { color: '#E1007A', icon: 'ti-brand-graphql' },
  'JWT':        { color: '#D63AFF', icon: 'ti-lock' },
  'Vue.js':     { color: '#42B883', icon: 'ti-brand-vue' },
  'Nuxt.js':    { color: '#00DC82', icon: 'ti-brand-nuxt' },
  'Socket.io':  { color: '#CCCCCC', icon: 'ti-brand-socket-io' },
  'TypeScript': { color: '#3178C6', icon: 'ti-brand-typescript' },
  'PostgreSQL': { color: '#336791', icon: 'ti-database' },
  'PayPal':     { color: '#009CDE', icon: 'ti-brand-paypal' },
  'Bootstrap':  { color: '#7952B3', icon: 'ti-brand-bootstrap' },
  'jQuery':     { color: '#0064A6', icon: 'ti-brand-jquery' },
  'CodeIgniter':{ color: '#EE3224', icon: 'ti-brand-php' },
}

// Tech filters jo dikhane hain
const techFilters = [
  { label: 'Laravel', key: 'Laravel' },
  { label: 'PHP', key: 'PHP' },
  { label: 'MySQL', key: 'MySQL' },
  { label: 'React.js', key: 'React.js' },
  { label: 'Node.js', key: 'Node.js' },
  { label: 'Vue.js', key: 'Vue.js' },
  { label: 'Next.js', key: 'Next.js' },
  { label: 'MongoDB', key: 'MongoDB' },
  { label: 'AWS', key: 'AWS' },
  { label: 'jQuery', key: 'jQuery' },
]

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
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeTech, setActiveTech] = useState('All')
  const [filterMode, setFilterMode] = useState('category') // 'category' | 'tech'
  const navigate = useNavigate()
  const isMobile = useIsMobile()

  // Filter logic — category ya tech
  const filtered = useMemo(() => {
    let result = projects

    // Category filter
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory.toLowerCase())
    }

    // Tech filter
    if (activeTech !== 'All') {
      result = result.filter(p =>
        p.tags?.some(tag => tag.toLowerCase() === activeTech.toLowerCase()) ||
        p.stack?.some(s => s.label?.toLowerCase() === activeTech.toLowerCase())
      )
    }

    return result
  }, [activeCategory, activeTech])

  const resetFilters = () => {
    setActiveCategory('All')
    setActiveTech('All')
  }

  const hasActiveFilter = activeCategory !== 'All' || activeTech !== 'All'

  return (
    <section id="projects" style={{
      padding: isMobile ? '64px 20px' : '100px 40px',
      maxWidth: '1280px', margin: '0 auto',
      borderTop: `0.5px solid ${t.border}`,
    }}>
      {/* Section label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <span style={{ fontSize: '11px', color: t.accent, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'monospace', fontWeight: 600 }}>
          FEATURED PROJECTS
        </span>
        <div style={{ flex: 1, height: '0.5px', background: t.border }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h2 style={{ fontSize: isMobile ? '28px' : '36px', fontWeight: 800, letterSpacing: '-0.03em' }}>
          Some of my <span style={{ color: t.accent }}>recent work</span>
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: t.textDim, fontFamily: 'monospace' }}>
            {filtered.length} projects
          </span>
          {hasActiveFilter && (
            <button
              onClick={resetFilters}
              style={{
                fontSize: '11px', color: '#f87171', background: 'rgba(248,113,113,0.1)',
                border: '0.5px solid rgba(248,113,113,0.3)', padding: '4px 10px',
                borderRadius: '4px', cursor: 'pointer', fontFamily: 'monospace',
              }}
            >
              ✕ Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Filter toggle tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '14px' }}>
        <button
          onClick={() => setFilterMode('category')}
          style={{
            fontSize: '12px', padding: '6px 16px', borderRadius: '6px', cursor: 'pointer',
            fontFamily: 'monospace', fontWeight: 500,
            background: filterMode === 'category' ? t.accent : 'transparent',
            color: filterMode === 'category' ? '#fff' : t.textDim,
            border: `0.5px solid ${filterMode === 'category' ? t.accent : t.border}`,
            transition: 'all 0.2s',
          }}
        >
          By Category
        </button>
        <button
          onClick={() => setFilterMode('tech')}
          style={{
            fontSize: '12px', padding: '6px 16px', borderRadius: '6px', cursor: 'pointer',
            fontFamily: 'monospace', fontWeight: 500,
            background: filterMode === 'tech' ? t.accent : 'transparent',
            color: filterMode === 'tech' ? '#fff' : t.textDim,
            border: `0.5px solid ${filterMode === 'tech' ? t.accent : t.border}`,
            transition: 'all 0.2s',
          }}
        >
          By Technology
        </button>
      </div>

      {/* Category filters */}
      {filterMode === 'category' && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'flex', gap: '6px', marginBottom: '28px',
            flexWrap: isMobile ? 'nowrap' : 'wrap',
            overflowX: isMobile ? 'auto' : 'visible',
            paddingBottom: isMobile ? '4px' : 0,
          }}
        >
          {filters.map(f => (
            <button key={f} onClick={() => setActiveCategory(f)} style={{
              fontSize: '12px', fontFamily: 'monospace', padding: '6px 14px',
              borderRadius: '6px', cursor: 'pointer', flexShrink: 0,
              border: `0.5px solid ${activeCategory === f ? t.accent : t.border}`,
              color: activeCategory === f ? t.accent : t.textDim,
              background: activeCategory === f ? t.accentFade : 'transparent',
              fontWeight: activeCategory === f ? 600 : 400,
              transition: 'all 0.2s',
            }}>{f}</button>
          ))}
        </motion.div>
      )}

      {/* Tech filters */}
      {filterMode === 'tech' && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'flex', gap: '6px', marginBottom: '28px',
            flexWrap: isMobile ? 'nowrap' : 'wrap',
            overflowX: isMobile ? 'auto' : 'visible',
            paddingBottom: isMobile ? '4px' : 0,
          }}
        >
          {/* All button */}
          <button
            onClick={() => setActiveTech('All')}
            style={{
              fontSize: '12px', fontFamily: 'monospace', padding: '6px 14px',
              borderRadius: '6px', cursor: 'pointer', flexShrink: 0,
              border: `0.5px solid ${activeTech === 'All' ? t.accent : t.border}`,
              color: activeTech === 'All' ? t.accent : t.textDim,
              background: activeTech === 'All' ? t.accentFade : 'transparent',
              fontWeight: activeTech === 'All' ? 600 : 400,
              transition: 'all 0.2s',
            }}
          >All</button>

          {techFilters.map(tf => {
            const tech = techColors[tf.key] || { color: '#64748b', icon: 'ti-code' }
            const isActive = activeTech === tf.key
            return (
              <button
                key={tf.key}
                onClick={() => setActiveTech(tf.key)}
                style={{
                  fontSize: '12px', fontFamily: 'monospace', padding: '6px 12px',
                  borderRadius: '6px', cursor: 'pointer', flexShrink: 0,
                  border: `0.5px solid ${isActive ? tech.color : t.border}`,
                  color: isActive ? tech.color : t.textDim,
                  background: isActive ? `${tech.color}12` : 'transparent',
                  fontWeight: isActive ? 600 : 400,
                  transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', gap: '5px',
                }}
              >
                <i className={`ti ${tech.icon}`} style={{ fontSize: '13px', color: isActive ? tech.color : t.textDim }} />
                {tf.label}
              </button>
            )
          })}
        </motion.div>
      )}

      {/* No results */}
      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: t.textDim }}>
          <i className="ti ti-search-off" style={{ fontSize: '40px', marginBottom: '12px', display: 'block' }} />
          <p style={{ fontSize: '14px' }}>No projects found for this filter.</p>
          <button onClick={resetFilters} style={{
            marginTop: '12px', background: t.accentFade, color: t.accent,
            border: `0.5px solid ${t.tagBorder}`, padding: '8px 20px',
            borderRadius: '7px', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit',
          }}>Clear Filters</button>
        </div>
      )}

      {/* Projects Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '16px',
      }}>
        <AnimatePresence>
          {filtered.map(p => (
            <motion.div
              key={p.slug || p.name} layout
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
                      color: '#fff', backdropFilter: 'blur(4px)',
                    }}>{p.category?.toUpperCase()}</span>
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
                <div style={{ height: '140px', background: t.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <i className={`ti ${p.icon}`} style={{ fontSize: '44px', color: t.accent, opacity: 0.3 }} />
                  <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                    <span style={{
                      fontSize: '10px', fontFamily: 'monospace', padding: '3px 10px',
                      borderRadius: '4px', background: t.accentFade, color: t.accent,
                      border: `0.5px solid ${t.tagBorder}`,
                    }}>{p.category?.toUpperCase()}</span>
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

              {/* Footer */}
              <div style={{
                padding: '10px 16px', borderTop: `0.5px solid ${t.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span style={{ fontSize: '12px', color: t.accent, fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  View Project <i className="ti ti-arrow-right" style={{ fontSize: '13px' }} />
                </span>
                {p.live && p.live !== '#' && (
                  <a href={p.live} target="_blank" rel="noreferrer"
                    onClick={e => e.stopPropagation()}
                    style={{ fontSize: '11px', color: t.textDim, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <i className="ti ti-external-link" /> Live
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}

