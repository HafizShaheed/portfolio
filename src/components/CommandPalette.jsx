// src/components/CommandPalette.jsx
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'
import { useIsMobile } from '../hooks/useIsMobile'

const sections = [
  { type: 'section', label: 'About', id: 'about', icon: 'ti-user' },
  { type: 'section', label: 'Experience', id: 'experience', icon: 'ti-briefcase' },
  { type: 'section', label: 'Projects', id: 'projects', icon: 'ti-folder' },
  { type: 'section', label: 'Skills', id: 'skills', icon: 'ti-code' },
  { type: 'section', label: 'AI Match Score', id: 'resume-match', icon: 'ti-target-arrow' },
  { type: 'section', label: 'Hire Me', id: 'hire-me', icon: 'ti-handshake' },
  { type: 'section', label: 'Contact', id: 'contact', icon: 'ti-mail' },
]

export default function CommandPalette({ theme: t }) {
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(prev => !prev)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setQuery('')
    }
  }, [isOpen])

  const filteredSections = sections.filter(s =>
    s.label.toLowerCase().includes(query.toLowerCase())
  )

  const filteredProjects = query.length > 0
    ? projects.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 5)
    : []

  const goToProject = (slug) => {
    window.location.href = `/projects/${slug}`
    setIsOpen(false)
  }

  const goToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          background: t.card, border: `0.5px solid ${t.cardBorder}`,
          borderRadius: '7px', padding: isMobile ? '6px 8px' : '6px 12px', cursor: 'pointer',
          color: t.textDim, fontSize: '12px',
        }}
      >
        <i className="ti ti-search" aria-hidden="true" />
        {!isMobile && 'Search'}
        {!isMobile && (
          <span style={{
            fontFamily: 'monospace', fontSize: '10px', padding: '1px 6px',
            borderRadius: '4px', background: t.accentFade, color: t.accent,
          }}>
            Ctrl K
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
              zIndex: 2000, display: 'flex', alignItems: 'flex-start',
              justifyContent: 'center', paddingTop: isMobile ? '8vh' : '12vh',
              padding: isMobile ? '0 16px' : '0',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%', maxWidth: isMobile ? '100%' : '480px', background: t.bg,
                border: `0.5px solid ${t.cardBorder}`, borderRadius: '14px',
                overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                marginTop: isMobile ? '0' : '0',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '16px 18px', borderBottom: `0.5px solid ${t.border}` }}>
                <i className="ti ti-search" style={{ color: t.textDim, fontSize: '18px' }} aria-hidden="true" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search sections, projects, skills..."
                  style={{
                    flex: 1, background: 'none', border: 'none', outline: 'none',
                    color: t.text, fontSize: '15px', fontFamily: 'inherit',
                  }}
                />
                <span style={{ fontSize: '10px', color: t.textDim, fontFamily: 'monospace', border: `0.5px solid ${t.cardBorder}`, padding: '2px 6px', borderRadius: '4px' }}>
                  ESC
                </span>
              </div>

              <div style={{ maxHeight: isMobile ? '60vh' : '50vh', overflowY: 'auto', padding: '8px' }}>
                {filteredSections.length === 0 && filteredProjects.length === 0 && (
                  <div style={{ padding: '24px', textAlign: 'center', color: t.textDim, fontSize: '13px' }}>
                    No results found
                  </div>
                )}

                {filteredSections.length > 0 && (
                  <div style={{ marginBottom: '6px' }}>
                    <div style={{ fontSize: '10px', color: t.textDim, padding: '8px 12px 4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Sections
                    </div>
                    {filteredSections.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => goToSection(s.id)}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                          padding: '10px 12px', background: 'none', border: 'none',
                          borderRadius: '8px', cursor: 'pointer', textAlign: 'left',
                          color: t.text, fontSize: '13px',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = t.accentFade}
                        onMouseLeave={e => e.currentTarget.style.background = 'none'}
                      >
                        <i className={`ti ${s.icon}`} style={{ color: t.accent, fontSize: '15px' }} aria-hidden="true" />
                        {s.label}
                      </button>
                    ))}
                  </div>
                )}

                {filteredProjects.length > 0 && (
                  <div>
                    <div style={{ fontSize: '10px', color: t.textDim, padding: '8px 12px 4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Projects
                    </div>
                    {filteredProjects.map((p) => (
                      <button
                        key={p.name}
                        onClick={() => goToProject(p.slug)}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                          padding: '10px 12px', background: 'none', border: 'none',
                          borderRadius: '8px', cursor: 'pointer', textAlign: 'left',
                          color: t.text, fontSize: '13px',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = t.accentFade}
                        onMouseLeave={e => e.currentTarget.style.background = 'none'}
                      >
                        <i className={`ti ${p.icon}`} style={{ color: t.accent, fontSize: '15px' }} aria-hidden="true" />
                        {p.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
