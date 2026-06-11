import { useState, useEffect } from 'react'
import { themes } from './theme'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Achievements from './sections/Achievements'
import Contact from './sections/Contact'

export default function App() {
  const [themeName, setThemeName] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'teal'
  })

  const theme = themes[themeName]

  useEffect(() => {
    localStorage.setItem('portfolio-theme', themeName)
    document.body.style.background = theme.bg
    document.body.style.color = theme.text
  }, [themeName, theme])

  return (
    <div style={{
      background: theme.bg,
      color: theme.text,
      minHeight: '100vh',
      transition: 'background 0.4s, color 0.4s',
      position: 'relative',
    }}>
      {/* Left accent line */}
      <div style={{
        position: 'fixed', left: 0, top: 0, bottom: 0, width: '2px',
        background: `linear-gradient(to bottom, transparent, ${theme.accent}, transparent)`,
        opacity: 0.3, pointerEvents: 'none', zIndex: 999,
      }} />

      <Navbar theme={theme} onThemeChange={setThemeName} />
      <Hero theme={theme} />
      <About theme={theme} />
      <Experience theme={theme} />
      <Projects theme={theme} />
      <Skills theme={theme} />
      <Achievements theme={theme} />
      <Contact theme={theme} />
    </div>
  )
}
