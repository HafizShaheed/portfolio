import { useState } from 'react'
import ThemeSwitcher from './ThemeSwitcher'
import CommandPalette from './CommandPalette'
import { useIsMobile } from '../hooks/useIsMobile'

const links = [
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Match Score', id: 'resume-match' },
  { label: 'Code Review', id: 'code-review' },
  { label: 'Contact', id: 'contact' },
  { label: 'Book a Call', id: 'availability' },
  { label: 'Hire Me', id: 'hire-me' },
]

export default function Navbar({ theme, onThemeChange }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const isMobile = useIsMobile()
  const t = theme

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: isMobile ? '14px 16px' : '16px 40px',
      borderBottom: `0.5px solid ${t.border}`,
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: t.bg,
      backdropFilter: 'blur(12px)',
    }}>
      {/* Logo */}
      <div style={{
        fontFamily: 'monospace',
        fontSize: isMobile ? '13px' : '15px',
        color: t.accent,
        letterSpacing: '0.04em',
        fontWeight: 500,
      }}>
        &lt;hafiz.dev /&gt;
      </div>

      {/* Desktop links - mobile pe hide */}
      {!isMobile && (
        <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', margin: 0, padding: 0 }}>
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => scrollTo(l.id)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '13px', color: t.textSub, letterSpacing: '0.02em',
                  fontFamily: 'inherit', transition: 'color 0.2s', padding: '4px 0',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => e.target.style.color = t.accent}
                onMouseLeave={e => e.target.style.color = t.textSub}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '12px' }}>
        {!isMobile && <CommandPalette theme={t} />}
        <ThemeSwitcher current={t.name} onChange={onThemeChange} />

        {!isMobile && (
          <a
            href="/Hafiz_Shaheed_Full_Stack_Developer_Resume .pdf"
            download
            style={{
              background: 'transparent',
              border: `0.5px solid ${t.accentFade}`,
              color: t.accent,
              padding: '7px 18px',
              borderRadius: '6px',
              fontSize: '12px',
              fontFamily: 'inherit',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              transition: 'background 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => e.currentTarget.style.background = t.accentFade}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <i className="ti ti-download" aria-hidden="true" />
            Resume
          </a>
        )}

        {/* Hamburger - sirf mobile pe */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: t.text, fontSize: '22px', padding: '4px',
              display: 'flex', alignItems: 'center',
            }}
          >
            <i className={`ti ${menuOpen ? 'ti-x' : 'ti-menu-2'}`} aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Mobile dropdown menu */}
      {isMobile && menuOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: t.bg, borderBottom: `0.5px solid ${t.border}`,
          padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '4px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        }}>
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '14px', color: t.textSub, textAlign: 'left',
                padding: '10px 8px', borderRadius: '6px', fontFamily: 'inherit',
              }}
            >
              {l.label}
            </button>
          ))}
          <a
            href="/Hafiz_Shaheed_Full_Stack_Developer_Resume .pdf"
            download
            style={{
              marginTop: '6px', background: t.accentFade, color: t.accent,
              padding: '10px', borderRadius: '6px', fontSize: '13px',
              textDecoration: 'none', textAlign: 'center', display: 'flex',
              alignItems: 'center', justifyContent: 'center', gap: '6px',
            }}
          >
            <i className="ti ti-download" aria-hidden="true" />
            Download Resume
          </a>
        </div>
      )}
    </nav>
  )
}
