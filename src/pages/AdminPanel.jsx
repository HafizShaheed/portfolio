// src/pages/AdminPanel.jsx
import { useState, useEffect, useRef } from 'react'

const SECTIONS = [
  {
    key: 'hero',
    label: 'Hero Section Photo',
    desc: 'Right side tech stack card ke andar photo — Portrait (3:4)',
    recommended: '600×800px',
    icon: '🏠',
  },
  {
    key: 'about',
    label: 'About Section Photo',
    desc: 'About section ke right card mein — Square (1:1)',
    recommended: '400×400px',
    icon: '👤',
  },
  {
    key: 'cursor',
    label: 'Cursor Follower Avatar',
    desc: 'Mouse ke peeche follow karne wali photo — Square (1:1)',
    recommended: '200×200px',
    icon: '🖱️',
  },
]

// Resize image on client side before upload
function resizeImage(file, maxWidth, maxHeight, quality = 0.92) {
  return new Promise((resolve) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      let { width, height } = img

      // Maintain aspect ratio
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width)
        width = maxWidth
      }
      if (height > maxHeight) {
        width = Math.round((width * maxHeight) / height)
        height = maxHeight
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)

      canvas.toBlob((blob) => {
        URL.revokeObjectURL(url)
        resolve(blob)
      }, 'image/webp', quality)
    }
    img.src = url
  })
}

const SIZES = {
  hero: { width: 600, height: 800 },
  about: { width: 400, height: 400 },
  cursor: { width: 200, height: 200 },
}

export default function AdminPanel() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [images, setImages] = useState({ hero: null, about: null, cursor: null })
  const [uploading, setUploading] = useState({})
  const [success, setSuccess] = useState({})
  const [error, setError] = useState({})
  const [previews, setPreviews] = useState({})
  const fileRefs = { hero: useRef(), about: useRef(), cursor: useRef() }

  // Fetch current images
  useEffect(() => {
    if (authenticated) {
      fetch('/api/get-images')
        .then(r => r.json())
        .then(data => setImages(data))
        .catch(console.error)
    }
  }, [authenticated])

  const handleLogin = (e) => {
    e.preventDefault()
    // Client side mein sirf basic check — real auth server side hoti hai
    if (password.length < 4) {
      setPasswordError('Password too short')
      return
    }
    setAuthenticated(true)
    setPasswordError('')
  }

  const handleFileSelect = async (section, file) => {
    if (!file) return

    // Preview dikhao
    const previewUrl = URL.createObjectURL(file)
    setPreviews(p => ({ ...p, [section]: previewUrl }))
  }

  const handleUpload = async (section) => {
    const fileInput = fileRefs[section].current
    if (!fileInput?.files?.[0]) {
      setError(e => ({ ...e, [section]: 'Please select a file first' }))
      return
    }

    const file = fileInput.files[0]
    const { width, height } = SIZES[section]

    setUploading(u => ({ ...u, [section]: true }))
    setError(e => ({ ...e, [section]: '' }))
    setSuccess(s => ({ ...s, [section]: '' }))

    try {
      // Resize karo pehle
      const resized = await resizeImage(file, width, height)

      // Upload karo
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'image/webp',
          'x-admin-password': password,
          'x-section': section,
        },
        body: resized,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      setImages(i => ({ ...i, [section]: data.url }))
      setSuccess(s => ({ ...s, [section]: '✅ Uploaded! Refresh website to see changes.' }))

    } catch (err) {
      setError(e => ({ ...e, [section]: err.message }))
    } finally {
      setUploading(u => ({ ...u, [section]: false }))
    }
  }

  // Login Screen
  if (!authenticated) {
    return (
      <div style={{
        minHeight: '100vh', background: '#0a0a0f',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Inter', sans-serif",
      }}>
        <div style={{
          background: '#12121a', border: '0.5px solid #1e1e2e',
          borderRadius: '16px', padding: '40px', width: '100%', maxWidth: '400px',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '52px', height: '52px', borderRadius: '12px',
              background: '#6366f1', display: 'flex', alignItems: 'center',
              justifyContent: 'center', margin: '0 auto 16px',
              fontSize: '22px', fontWeight: 800, color: '#fff',
            }}>HS</div>
            <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>
              Admin Panel
            </h1>
            <p style={{ fontSize: '13px', color: '#475569' }}>
              Portfolio Image Manager
            </p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '12px', color: '#475569', display: 'block', marginBottom: '6px', letterSpacing: '0.05em' }}>
                ADMIN PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                autoFocus
                style={{
                  width: '100%', padding: '12px 16px', borderRadius: '8px',
                  border: `0.5px solid ${passwordError ? '#f87171' : '#1e1e2e'}`,
                  background: '#0a0a0f', color: '#fff', fontSize: '14px',
                  outline: 'none', fontFamily: 'inherit',
                }}
              />
              {passwordError && (
                <p style={{ fontSize: '12px', color: '#f87171', marginTop: '6px' }}>{passwordError}</p>
              )}
            </div>

            <button type="submit" style={{
              background: '#6366f1', color: '#fff', border: 'none',
              padding: '12px', borderRadius: '8px', fontSize: '14px',
              fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
            }}>
              Enter Panel →
            </button>
          </form>

          <p style={{ fontSize: '11px', color: '#1e2a3a', textAlign: 'center', marginTop: '20px' }}>
            🔒 This page is not linked anywhere on the site
          </p>
        </div>
      </div>
    )
  }

  // Admin Panel
  return (
    <div style={{
      minHeight: '100vh', background: '#0a0a0f',
      fontFamily: "'Inter', sans-serif", padding: '32px 20px',
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>
              🖼️ Portfolio Image Manager
            </h1>
            <p style={{ fontSize: '13px', color: '#475569' }}>
              Upload new images — auto-resize hoti hain automatically
            </p>
          </div>
          <button
            onClick={() => setAuthenticated(false)}
            style={{
              background: 'transparent', color: '#475569', border: '0.5px solid #1e1e2e',
              padding: '8px 16px', borderRadius: '7px', fontSize: '12px', cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Logout
          </button>
        </div>

        {/* Section Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {SECTIONS.map(section => (
            <div key={section.key} style={{
              background: '#12121a', border: '0.5px solid #1e1e2e',
              borderRadius: '14px', padding: '24px',
            }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                {/* Left — Info + Upload */}
                <div style={{ flex: 1, minWidth: '260px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '20px' }}>{section.icon}</span>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>{section.label}</h3>
                  </div>
                  <p style={{ fontSize: '12px', color: '#475569', marginBottom: '6px' }}>{section.desc}</p>
                  <p style={{ fontSize: '11px', color: '#6366f1', fontFamily: 'monospace', marginBottom: '16px' }}>
                    Recommended: {section.recommended} · Auto-converted to WebP
                  </p>

                  {/* File input */}
                  <input
                    ref={fileRefs[section.key]}
                    type="file"
                    accept="image/*"
                    onChange={e => handleFileSelect(section.key, e.target.files[0])}
                    style={{ display: 'none' }}
                    id={`file-${section.key}`}
                  />

                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <label
                      htmlFor={`file-${section.key}`}
                      style={{
                        background: '#0a0a0f', color: '#94a3b8',
                        border: '0.5px solid #1e1e2e', padding: '10px 18px',
                        borderRadius: '7px', fontSize: '13px', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '6px',
                      }}
                    >
                      📁 Select Image
                    </label>

                    <button
                      onClick={() => handleUpload(section.key)}
                      disabled={uploading[section.key]}
                      style={{
                        background: uploading[section.key] ? '#2d2d3d' : '#6366f1',
                        color: '#fff', border: 'none', padding: '10px 18px',
                        borderRadius: '7px', fontSize: '13px', cursor: uploading[section.key] ? 'default' : 'pointer',
                        fontFamily: 'inherit', fontWeight: 600,
                        display: 'flex', alignItems: 'center', gap: '6px',
                        opacity: uploading[section.key] ? 0.7 : 1,
                      }}
                    >
                      {uploading[section.key] ? '⏳ Uploading...' : '🚀 Upload & Replace'}
                    </button>
                  </div>

                  {success[section.key] && (
                    <p style={{ fontSize: '12px', color: '#22c55e', marginTop: '10px' }}>
                      {success[section.key]}
                    </p>
                  )}
                  {error[section.key] && (
                    <p style={{ fontSize: '12px', color: '#f87171', marginTop: '10px' }}>
                      ❌ {error[section.key]}
                    </p>
                  )}
                </div>

                {/* Right — Preview */}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {/* Current image */}
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '10px', color: '#475569', marginBottom: '6px', letterSpacing: '0.08em' }}>CURRENT</p>
                    <div style={{
                      width: section.key === 'cursor' ? '80px' : '100px',
                      height: section.key === 'cursor' ? '80px' : (section.key === 'about' ? '100px' : '133px'),
                      borderRadius: section.key === 'cursor' ? '50%' : '10px',
                      overflow: 'hidden', background: '#0a0a0f',
                      border: '0.5px solid #1e1e2e',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {images[section.key] ? (
                        <img src={images[section.key]} alt="current" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                      ) : (
                        <span style={{ fontSize: '10px', color: '#1e2a3a', textAlign: 'center', padding: '4px' }}>No image</span>
                      )}
                    </div>
                  </div>

                  {/* New preview */}
                  {previews[section.key] && (
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: '10px', color: '#6366f1', marginBottom: '6px', letterSpacing: '0.08em' }}>NEW PREVIEW</p>
                      <div style={{
                        width: section.key === 'cursor' ? '80px' : '100px',
                        height: section.key === 'cursor' ? '80px' : (section.key === 'about' ? '100px' : '133px'),
                        borderRadius: section.key === 'cursor' ? '50%' : '10px',
                        overflow: 'hidden', background: '#0a0a0f',
                        border: '0.5px solid #6366f130',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <img src={previews[section.key]} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div style={{
          marginTop: '32px', padding: '16px 20px',
          background: '#0c0c15', border: '0.5px solid #1e1e2e', borderRadius: '10px',
        }}>
          <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.7 }}>
            💡 <strong style={{ color: '#6366f1' }}>How it works:</strong> Image select karo → Upload click karo → Auto-resize hogi → Vercel Blob mein save hogi → Website pe automatically reflect hogi bina code push kiye.
            <br />
            ⚠️ URL directly share mat karna — yeh secret admin panel hai. Bookmark kar lo: <code style={{ color: '#6366f133' }}>/admin</code>
          </p>
        </div>
      </div>
    </div>
  )
}
