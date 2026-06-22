// src/pages/ProjectDetail.jsx
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { projects } from '../data/projects'
import { useIsMobile } from '../hooks/useIsMobile'

export default function ProjectDetail({ theme: t }) {
  const isMobile = useIsMobile()
  const { slug } = useParams()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  const project = projects.find(p => p.slug === slug)

  if (!project) {
    return (
      <div style={{ padding: isMobile ? '60px 20px' : '80px 40px', textAlign: 'center' }}>
        <h2 style={{ color: t.text, fontSize: '22px', marginBottom: '12px' }}>Project not found</h2>
        <Link to="/" style={{ color: t.accent, fontSize: '14px', textDecoration: 'none' }}>
          ← Back to home
        </Link>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{ padding: isMobile ? '24px 20px' : '40px', maxWidth: '900px', margin: '0 auto' }}
    >
      <Link
        to="/"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          color: t.textSub, fontSize: '13px', textDecoration: 'none',
          marginBottom: isMobile ? '20px' : '28px',
        }}
      >
        <i className="ti ti-arrow-left" aria-hidden="true" />
        Back to all projects
      </Link>

      <div style={{
        display: 'inline-block', fontSize: '10px', fontFamily: 'monospace',
        padding: '4px 12px', borderRadius: '4px', background: t.accentFade,
        color: t.accent, marginBottom: '14px', textTransform: 'uppercase',
      }}>
        {project.category}
      </div>

      <h1 style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: 700, color: t.text, marginBottom: '12px', letterSpacing: '-0.02em' }}>
        {project.name}
      </h1>

      <p style={{ fontSize: isMobile ? '14px' : '15px', color: t.textSub, lineHeight: 1.8, marginBottom: isMobile ? '20px' : '28px', maxWidth: isMobile ? '100%' : '700px' }}>
        {project.desc}
      </p>

      <div style={{ display: 'flex', gap: '12px', marginBottom: isMobile ? '24px' : '32px', flexWrap: 'wrap' }}>
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: '7px',
            background: t.card, border: `0.5px solid ${t.cardBorder}`,
            color: t.text, padding: '9px 18px', borderRadius: '8px',
            fontSize: '13px', textDecoration: 'none',
            flex: isMobile ? '1 1 auto' : 'initial', justifyContent: 'center',
          }}
        >
          <i className="ti ti-brand-github" aria-hidden="true" />
          View Source Code
        </a>
        {project.live && project.live !== '#' && (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              background: t.btnBg, color: '#fff',
              padding: '9px 18px', borderRadius: '8px',
              fontSize: '13px', textDecoration: 'none',
              flex: isMobile ? '1 1 auto' : 'initial', justifyContent: 'center',
            }}
          >
            <i className="ti ti-external-link" aria-hidden="true" />
            Live Demo
          </a>
        )}
      </div>

      {project.image && (
        <div style={{
          borderRadius: '14px', overflow: 'hidden', marginBottom: isMobile ? '24px' : '32px',
          border: `0.5px solid ${t.cardBorder}`,
        }}>
          <img src={project.image} alt={project.name} style={{ width: '100%', display: 'block' }} />
        </div>
      )}

      <div style={{ marginBottom: isMobile ? '24px' : '32px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: t.text, marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'monospace' }}>
          Tech Stack
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{
              fontSize: '12px', padding: '6px 14px', borderRadius: '6px',
              border: `0.5px solid ${t.accentFade}`, color: t.tagText,
              background: t.tagBg, fontFamily: 'monospace',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: isMobile ? '24px' : '32px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: t.text, marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'monospace' }}>
          Key Highlights
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {project.tags.slice(0, 4).map((tag, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: t.textSub }}>
              <i className="ti ti-circle-check" style={{ color: t.accent, fontSize: '16px', marginTop: '1px', flexShrink: 0 }} aria-hidden="true" />
              Built with {tag} for reliable, production-grade implementation
            </div>
          ))}
        </div>
      </div>

      <div style={{ paddingTop: '24px', borderTop: `0.5px solid ${t.border}` }}>
        <Link to="/" style={{ color: t.accent, fontSize: '13px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <i className="ti ti-arrow-left" aria-hidden="true" />
          Explore more projects
        </Link>
      </div>
    </motion.div>
  )
}
