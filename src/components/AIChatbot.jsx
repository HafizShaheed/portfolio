// src/components/AIChatbot.jsx
import { useState, useRef, useEffect } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'

export default function AIChatbot({ theme: t }) {
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm Hafiz's AI assistant. Ask me anything about his skills, experience, or projects!" }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      })

      const data = await response.json()

      if (data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, something went wrong. Please try again." }])
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Connection error. Please try again later." }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed', bottom: isMobile ? '16px' : '24px', right: isMobile ? '16px' : '24px',
          width: isMobile ? '50px' : '56px', height: isMobile ? '50px' : '56px', borderRadius: '50%',
          background: t.btnBg, border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: isMobile ? '20px' : '24px', zIndex: 1000,
          boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
          transition: 'transform 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {isOpen ? '✕' : '🤖'}
      </button>

      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: isMobile ? '0' : '92px',
          right: isMobile ? '0' : '24px',
          left: isMobile ? '0' : 'auto',
          top: isMobile ? '0' : 'auto',
          width: isMobile ? '100%' : '340px',
          height: isMobile ? '100%' : '450px',
          background: t.bg,
          border: isMobile ? 'none' : `1px solid ${t.cardBorder}`,
          borderRadius: isMobile ? '0' : '14px',
          zIndex: 999,
          display: 'flex', flexDirection: 'column',
          boxShadow: isMobile ? 'none' : '0 8px 32px rgba(0,0,0,0.35)',
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '14px 16px', background: t.card,
            borderBottom: `0.5px solid ${t.border}`,
            display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: t.accentFade, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🤖</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: t.text }}>Hafiz's AI Assistant</div>
              <div style={{ fontSize: '11px', color: t.green }}>● Online</div>
            </div>
            {isMobile && (
              <button
                onClick={() => setIsOpen(false)}
                style={{ background: 'none', border: 'none', color: t.textSub, fontSize: '20px', cursor: 'pointer', padding: '4px' }}
              >
                ✕
              </button>
            )}
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                background: msg.role === 'user' ? t.btnBg : t.card,
                color: msg.role === 'user' ? '#fff' : t.text,
                padding: '9px 13px', borderRadius: '12px',
                fontSize: '13px', lineHeight: 1.5,
                border: msg.role === 'assistant' ? `0.5px solid ${t.cardBorder}` : 'none',
              }}>
                {msg.content}
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: 'flex-start', color: t.textSub, fontSize: '12px', fontStyle: 'italic' }}>
                Thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ padding: '12px', borderTop: `0.5px solid ${t.border}`, display: 'flex', gap: '8px' }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about Hafiz..."
              style={{
                flex: 1, padding: '9px 12px', borderRadius: '20px',
                border: `0.5px solid ${t.cardBorder}`, background: t.card,
                color: t.text, fontSize: '13px', outline: 'none',
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: t.btnBg, border: 'none', cursor: 'pointer',
                color: '#fff', fontSize: '14px',
                opacity: loading ? 0.5 : 1,
                flexShrink: 0,
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  )
}
