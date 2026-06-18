// src/components/AIChatbot.jsx
import { useState, useRef, useEffect } from 'react'

export default function AIChatbot({ theme: t }) {
  // Step 1: States banao - yeh widget ki "memory" hai
  const [isOpen, setIsOpen] = useState(false)         // chat khula hai ya band
  const [messages, setMessages] = useState([           // saare messages ki list
    { role: 'assistant', content: "Hi! I'm Hafiz's AI assistant. Ask me anything about his skills, experience, or projects!" }
  ])
  const [input, setInput] = useState('')               // jo user abhi type kar raha
  const [loading, setLoading] = useState(false)        // AI jawab soch raha hai?
  const messagesEndRef = useRef(null)

  // Naya message aane par neeche scroll karo automatically
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Step 2: Jab user "Send" click kare
  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')

    // User ka message list mein add karo (turant dikhane ke liye)
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      // Step 3: Apne backend (api/chat.js) ko call karo
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      })

      const data = await response.json()

      if (data.reply) {
        // AI ka jawab list mein add karo
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

  // Enter key se bhi send ho jaye
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Floating button - hamesha visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed', bottom: '24px', right: '24px',
          width: '56px', height: '56px', borderRadius: '50%',
          background: t.btnBg, border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '24px', zIndex: 1000,
          boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
          transition: 'transform 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {isOpen ? '✕' : '🤖'}
      </button>

      {/* Chat window - sirf jab isOpen true ho */}
      {isOpen && (
        <div style={{
          position: 'fixed', bottom: '92px', right: '24px',
          width: '340px', height: '450px',
          background: t.bg, border: `1px solid ${t.cardBorder}`,
          borderRadius: '14px', zIndex: 999,
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            padding: '14px 16px', background: t.card,
            borderBottom: `0.5px solid ${t.border}`,
            display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: t.accentFade, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🤖</div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: t.text }}>Hafiz's AI Assistant</div>
              <div style={{ fontSize: '11px', color: t.green }}>● Online</div>
            </div>
          </div>

          {/* Messages area */}
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

          {/* Input area */}
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