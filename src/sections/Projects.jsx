import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, filters } from '../data/projects'

export default function Projects({ theme: t }) {
  const [active, setActive] = useState('All')

  const filtered = active === 'All'
    ? projects
    : projects.filter(p => p.category === active.toLowerCase())

  return (
    <section id="projects" style={{ padding: '56px 40px', borderTop: `0.5px solid ${t.border}` }}>
      <div style={{ fontFamily: 'monospace', fontSize: '11px', color: t.accent, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ width: '22px', height: '0.5px', background: t.accent, display: 'inline-block' }} />
        03 — Projects
      </div>
      <h2 style={{ fontSize: '26px', fontWeight: 700, color: t.text, letterSpacing: '-0.02em', marginBottom: '6px' }}>
        Things I've Built
      </h2>
      <p style={{ fontSize: '13px', color: t.textSub, marginBottom: '24px' }}>
        Enterprise systems, SaaS platforms, and full-stack products
      </p>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' }}>
        {filters.map((f) => (
          <button key={f} onClick={() => setActive(f)}
            style={{
              fontSize: '11px', fontFamily: 'monospace', padding: '5px 14px',
              borderRadius: '5px', cursor: 'pointer', letterSpacing: '0.04em',
              border: `0.5px solid ${active === f ? t.accent : t.cardBorder}`,
              color: active === f ? t.accent : t.textSub,
              background: active === f ? t.accentFade : 'transparent',
              transition: 'all 0.2s',
            }}>
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        <AnimatePresence>
          {filtered.map((p) => (
            <motion.div key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              style={{
                background: t.card,
                border: `0.5px solid ${t.cardBorder}`,
                borderRadius: '12px',
                overflow: 'hidden',
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
              {/* Project Image / Preview */}
              {p.image ? (
                <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                  />
                  {/* Gradient overlay */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }} />
                  {/* Category badge */}
                  <div style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '10px', fontFamily: 'monospace', padding: '3px 10px', borderRadius: '4px', background: t.accentFade, color: t.accent, border: `0.5px solid ${t.accentFade}`, backdropFilter: 'blur(4px)' }}>
                    {p.category.toUpperCase()}
                  </div>
                  {/* Links */}
                  <div style={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', gap: '6px' }}>
                    <a href={p.live} target="_blank" rel="noreferrer" style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '13px', textDecoration: 'none', backdropFilter: 'blur(4px)' }}>
                      <i className="ti ti-external-link" aria-hidden="true" />
                    </a>
                    <a href={p.github} target="_blank" rel="noreferrer" style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '13px', textDecoration: 'none', backdropFilter: 'blur(4px)' }}>
                      <i className="ti ti-brand-github" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              ) : (
                /* No image — colored placeholder with icon */
                <div style={{ height: '140px', background: t.accentFade, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <i className={`ti ${p.icon}`} style={{ fontSize: '48px', color: t.accent, opacity: 0.4 }} aria-hidden="true" />
                  <div style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '10px', fontFamily: 'monospace', padding: '3px 10px', borderRadius: '4px', background: t.accentFade, color: t.accent, border: `0.5px solid ${t.accentFade}` }}>
                    {p.category.toUpperCase()}
                  </div>
                  <div style={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', gap: '6px' }}>
                    <a href={p.live} target="_blank" rel="noreferrer" style={{ width: '28px', height: '28px', borderRadius: '6px', border: `0.5px solid ${t.cardBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.textDim, fontSize: '13px', textDecoration: 'none' }}>
                      <i className="ti ti-external-link" aria-hidden="true" />
                    </a>
                    <a href={p.github} target="_blank" rel="noreferrer" style={{ width: '28px', height: '28px', borderRadius: '6px', border: `0.5px solid ${t.cardBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.textDim, fontSize: '13px', textDecoration: 'none' }}>
                      <i className="ti ti-brand-github" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              )}

              {/* Card body */}
              <div style={{ padding: '16px' }}>
                <div style={{ fontSize: '15px', fontWeight: 600, color: t.text, marginBottom: '6px' }}>{p.name}</div>
                <div style={{ fontSize: '12px', color: t.textSub, lineHeight: 1.65, marginBottom: '12px' }}>{p.desc}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {p.tags.map((tag) => (
                    <span key={tag} style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '3px', border: `0.5px solid ${t.accentFade}`, color: t.tagText, background: t.tagBg, fontFamily: 'monospace' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}
