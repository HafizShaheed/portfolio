// src/App.jsx
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
import SubscriptionPlans from './sections/SubscriptionPlans'
import AIChatbot from './components/AIChatbot'
import TawkChat from './components/TawkChat'
import CursorFollower from './components/CursorFollower'
import ScrollProgress from './components/ScrollProgress'
import ProjectDetail from './pages/ProjectDetail'
import AdminPanel from './pages/AdminPanel'
import { PageSkeleton } from './components/Skeleton'
import { usePortfolioImages } from './hooks/usePortfolioImages'

function HomePage({ theme, images }) {
  useEffect(() => {
    const shouldScroll = sessionStorage.getItem('scrollToProjects')
    if (shouldScroll === 'true') {
      sessionStorage.removeItem('scrollToProjects')
      setTimeout(() => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
      }, 150)
    }
  }, [])

  return (
    <>
      <Hero theme={theme} heroImage={images.hero} />
      <About theme={theme} aboutImage={images.about} />
      <Experience theme={theme} />
      <Projects theme={theme} />
      <Skills theme={theme} />
      <Achievements theme={theme} />
      <ResumeMatch theme={theme} />
      <CodeReview theme={theme} />
      <ProjectRecommender theme={theme} />
      <HireMe theme={theme} />
      <SubscriptionPlans theme={theme} />
      <Availability theme={theme} />
      <Contact theme={theme} />
    </>
  )
}

function MainApp() {
  const theme = themes.dark
  const [appReady, setAppReady] = useState(false)
  const { images } = usePortfolioImages()

  useEffect(() => {
    document.body.style.background = theme.bg
    document.body.style.color = theme.text
    const timer = setTimeout(() => setAppReady(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <ScrollProgress theme={theme} />
      <div style={{ background: theme.bg, color: theme.text, minHeight: '100vh' }}>
        <Navbar theme={theme} />
        {!appReady ? (
          <PageSkeleton theme={theme} />
        ) : (
          <Routes>
            <Route path="/" element={<HomePage theme={theme} images={images} />} />
            <Route path="/projects/:slug" element={<ProjectDetail theme={theme} />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        )}
        <AIChatbot theme={theme} />
        <TawkChat />
        <CursorFollower theme={theme} cursorImage={images.cursor} />
      </div>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  )
}
