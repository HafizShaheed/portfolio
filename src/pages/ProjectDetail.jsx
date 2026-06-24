// src/pages/ProjectDetail.jsx
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { projects } from '../data/projects'
import { useIsMobile } from '../hooks/useIsMobile'

function getHighlights(project) {
  const tags = project.tags || []
  const category = project.category
  const highlights = []

  const has = (keyword) => tags.some(t => t.toLowerCase().includes(keyword.toLowerCase()))

  if (has('RBAC')) highlights.push({ icon: 'ti-shield-check', text: 'Role-based access control for secure, permission-based user management' })
  if (has('PayPal') || has('Stripe')) highlights.push({ icon: 'ti-credit-card', text: 'Integrated payment gateway for secure, end-to-end transaction processing' })
  if (has('PDF') || has('DomPDF')) highlights.push({ icon: 'ti-file-type-pdf', text: 'Automated PDF generation for invoices, reports, and documents' })
  if (has('AWS')) highlights.push({ icon: 'ti-cloud', text: 'Deployed on AWS infrastructure for reliability and scalability' })
  if (has('JWT')) highlights.push({ icon: 'ti-lock', text: 'JWT-based authentication securing all API endpoints' })
  if (has('Socket.io') || has('Real-time')) highlights.push({ icon: 'ti-bolt', text: 'Real-time updates powered by WebSocket communication' })
  if (has('GraphQL')) highlights.push({ icon: 'ti-api', text: 'GraphQL API layer enabling flexible, efficient data queries' })
  if (has('MongoDB')) highlights.push({ icon: 'ti-database', text: 'NoSQL data modeling for flexible, scalable schema design' })
  if (has('jQuery') || has('Bootstrap')) highlights.push({ icon: 'ti-layout', text: 'Interactive, responsive UI built with modern frontend practices' })

  const categoryHighlights = {
    erp: { icon: 'ti-building-skyscraper', text: 'Multi-module architecture handling complex, interconnected business workflows' },
    crm: { icon: 'ti-users', text: 'End-to-end lead and customer relationship tracking with status workflows' },
    ecommerce: { icon: 'ti-shopping-cart', text: 'Full product catalog, cart, and order management system' },
    saas: { icon: 'ti-cloud', text: 'Built for multi-user access with role-based dashboards and views' },
    cms: { icon: 'ti-file-text', text: 'Content management with structured publishing workflows' },
  }
  if (categoryHighlights[category] && highlights.length < 4) {
    highlights.push(categoryHighlights[category])
  }

  const generic = [
    { icon: 'ti-code', text: 'Clean, maintainable codebase following MVC architecture' },
    { icon: 'ti-devices', text: 'Responsive design tested across modern browsers and devices' },
    { icon: 'ti-git-branch', text: 'Version-controlled development with structured Git workflow' },
  ]
  let gi = 0
  while (highlights.length < 3 && gi < generic.length) {
    highlights.push(generic[gi])
    gi++
  }

  return highlights.slice(0, 4)
}

export default function ProjectDetail({ theme: t }) {
  const isMobile = useIsMobile()
  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  const project = projects.find(p => p.slug === slug)

  // Back button - sessionStorage mein flag set karta hai
  // Homepage mount hone par yeh flag check hoga aur scroll trigger hoga
  const goBackToProjects = (e) => {
    e.preventDefault()
    sessionStorage.setItem('scrollToProjects', 'true')
    navigate('/')
  }

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

  const highlights = getHighlights(project)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{ padding: isMobile ? '24px 20px' : '40px', maxWidth: '900px', margin: '0 auto' }}
    >
      <button
        onClick={goBackToProjects}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          color: t.textSub, fontSize: '13px', textDecoration: 'none',
          marginBottom: isMobile ? '20px' : '28px', background: 'none',
          border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit',
        }}
      >
        <i className="ti ti-arrow-left" aria-hidden="true" />
        Back to all projects
      </button>

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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {highlights.map((h, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '13px', color: t.textSub }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '8px',
                background: t.accentFade, display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: t.accent, fontSize: '14px',
                flexShrink: 0, marginTop: '1px',
              }}>
                <i className={`ti ${h.icon}`} aria-hidden="true" />
              </div>
              <span style={{ lineHeight: 1.6, paddingTop: '4px' }}>{h.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ paddingTop: '24px', borderTop: `0.5px solid ${t.border}` }}>
        <button
          onClick={goBackToProjects}
          style={{
            color: t.accent, fontSize: '13px', textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: '6px',
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            fontFamily: 'inherit',
          }}
        >
          <i className="ti ti-arrow-left" aria-hidden="true" />
          Explore more projects
        </button>
      </div>
    </motion.div>
  )
}