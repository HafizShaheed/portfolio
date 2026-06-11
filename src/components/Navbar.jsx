import { useState } from 'react'
import ThemeSwitcher from './ThemeSwitcher'

const links = ['About', 'Experience', 'Projects', 'Skills', 'Contact']

export default function Navbar({ theme, onThemeChange }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const t = theme

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 40px',
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
        fontSize: '15px',
        color: t.accent,
        letterSpacing: '0.04em',
        fontWeight: 500,
      }}>
        &lt;hafiz.dev /&gt;
      </div>

      {/* Desktop links */}
      <ul style={{ display: 'flex', gap: '28px', listStyle: 'none', margin: 0, padding: 0 }}
        className="nav-links">
        {links.map((l) => (
          <li key={l}>
            <button
              onClick={() => scrollTo(l)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '13px', color: t.textSub, letterSpacing: '0.02em',
                fontFamily: 'inherit', transition: 'color 0.2s', padding: '4px 0',
              }}
              onMouseEnter={e => e.target.style.color = t.accent}
              onMouseLeave={e => e.target.style.color = t.textSub}
            >
              {l}
            </button>
          </li>
        ))}
      </ul>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <ThemeSwitcher current={t.name} onChange={onThemeChange} />
        <a
          href="/Hafiz_Shaheed_Resume.pdf"
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
          }}
          onMouseEnter={e => e.currentTarget.style.background = t.accentFade}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <i className="ti ti-download" aria-hidden="true" />
          Resume
        </a>
      </div>
    </nav>
  )
}
