// src/components/Navbar.jsx
import { useState, useEffect } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'

const links = [
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Achievements', id: 'achievements' },
  { label: 'Contact', id: 'contact' },
]

export default function Navbar({ theme: t }) {
  const isMobile = useIsMobile()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 200,
      background: scrolled ? 'rgba(10,10,15,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '0.5px solid #1a1a2e' : '0.5px solid transparent',
      transition: 'all 0.3s ease',
    }}>
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: isMobile ? '14px 20px' : '16px 48px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        {/* Logo */}
        <div onClick={() => scrollTo('hero')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '14px', fontWeight: 800, color: '#fff',
          }}>HS</div>
          {!isMobile && (
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>Hafiz Shaheed</div>
              <div style={{ fontSize: '10px', color: '#475569', letterSpacing: '0.05em' }}>Full Stack Developer</div>
            </div>
          )}
        </div>

        {/* Desktop links */}
        {!isMobile && (
          <ul style={{ display: 'flex', gap: '4px', listStyle: 'none' }}>
            {links.map(l => (
              <li key={l.id}>
                <button onClick={() => scrollTo(l.id)} style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '13px', color: '#64748b', fontFamily: 'inherit',
                  fontWeight: 500, padding: '7px 14px', borderRadius: '8px',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.target.style.color = '#fff'; e.target.style.background = '#1a1a2e' }}
                onMouseLeave={e => { e.target.style.color = '#64748b'; e.target.style.background = 'none' }}
                >{l.label}</button>
              </li>
            ))}
          </ul>
        )}

        {/* Right */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {!isMobile && (
            <a href="/Hafiz_Shaheed_Full_Stack_Developer_Resume .pdf" download style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: '#12121a', border: '0.5px solid #1e1e30',
              color: '#94a3b8', padding: '8px 18px', borderRadius: '8px',
              fontSize: '13px', fontWeight: 500, textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#6366f1'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e1e30'; e.currentTarget.style.color = '#94a3b8' }}
            >
              <i className="ti ti-download" style={{ fontSize: '14px' }} />
              Download Resume
            </a>
          )}

          {isMobile && (
            <button onClick={() => setMenuOpen(!menuOpen)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#fff', fontSize: '22px', padding: '4px',
            }}>
              <i className={`ti ${menuOpen ? 'ti-x' : 'ti-menu-2'}`} />
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && menuOpen && (
        <div style={{
          background: '#0a0a0f', borderTop: '0.5px solid #1a1a2e',
          padding: '12px 20px 20px',
        }}>
          {links.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)} style={{
              display: 'block', width: '100%', background: 'none', border: 'none',
              cursor: 'pointer', fontSize: '15px', color: '#94a3b8', textAlign: 'left',
              padding: '12px 8px', fontFamily: 'inherit', fontWeight: 500,
              borderBottom: '0.5px solid #1a1a2e',
            }}>{l.label}</button>
          ))}
          <a href="/Hafiz_Shaheed_Full_Stack_Developer_Resume .pdf" download style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            marginTop: '12px', background: '#6366f1', color: '#fff',
            padding: '12px', borderRadius: '8px', fontSize: '14px',
            textDecoration: 'none', fontWeight: 600,
          }}>
            <i className="ti ti-download" /> Download Resume
          </a>
        </div>
      )}
    </nav>
  )
}