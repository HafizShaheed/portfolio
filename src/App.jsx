import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { themes } from './theme'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Achievements from './sections/Achievements'
import Contact from './sections/Contact'
import ResumeMatch from './sections/ResumeMatch'
import CodeReview from './sections/CodeReview'
import HireMe from './sections/HireMe'
import Availability from './sections/Availability'
import ProjectRecommender from './sections/ProjectRecommender'
import AIChatbot from './components/AIChatbot'
import ProjectDetail from './pages/ProjectDetail'
import ScrollProgress from './components/ScrollProgress'
import { PageSkeleton } from './components/Skeleton'
import CursorFollower from './components/CursorFollower'



function HomePage({ theme }) {
  // Jab homepage mount ho, check karo kya "back to projects" se aaye hain
  useEffect(() => {
    const shouldScroll = sessionStorage.getItem('scrollToProjects')
    if (shouldScroll === 'true') {
      sessionStorage.removeItem('scrollToProjects')
      // Thoda wait karo taaki DOM fully ready ho jaye
      setTimeout(() => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
      }, 150)
    }
  }, [])

  return (
    <>
      <Hero theme={theme} />
      <About theme={theme} />
      <Experience theme={theme} />
      <Projects theme={theme} />
      <ProjectRecommender theme={theme} />
      <Skills theme={theme} />
      <Achievements theme={theme} />
      <ResumeMatch theme={theme} />
      <CodeReview theme={theme} />
      <HireMe theme={theme} />
      <Availability theme={theme} />
      <CursorFollower theme={theme} />

      <Contact theme={theme} />
    </>
  )
}

export default function App() {
  const [themeName, setThemeName] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'teal'
  })
  const [appReady, setAppReady] = useState(false)

  const theme = themes[themeName]

  useEffect(() => {
    localStorage.setItem('portfolio-theme', themeName)
    document.body.style.background = theme.bg
    document.body.style.color = theme.text
  }, [themeName, theme])

  useEffect(() => {
    const timer = setTimeout(() => setAppReady(true), 400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <BrowserRouter>
      <div style={{
        background: theme.bg,
        color: theme.text,
        minHeight: '100vh',
        transition: 'background 0.4s, color 0.4s',
        position: 'relative',
      }}>
        <div style={{
          position: 'fixed', left: 0, top: 0, bottom: 0, width: '2px',
          background: `linear-gradient(to bottom, transparent, ${theme.accent}, transparent)`,
          opacity: 0.3, pointerEvents: 'none', zIndex: 999,
        }} />

        <ScrollProgress theme={theme} />
        <Navbar theme={theme} onThemeChange={setThemeName} />

        {!appReady ? (
          <PageSkeleton theme={theme} />
        ) : (
          <Routes>
            <Route path="/" element={<HomePage theme={theme} />} />
            <Route path="/projects/:slug" element={<ProjectDetail theme={theme} />} />
          </Routes>
        )}

        <AIChatbot theme={theme} />
      </div>
    </BrowserRouter>
  )
}