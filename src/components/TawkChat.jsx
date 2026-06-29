// src/components/TawkChat.jsx
import { useEffect } from 'react'

export default function TawkChat() {
  useEffect(() => {
    // Tawk.to widget script dynamically load karo
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://embed.tawk.to/6a40f0509dc18b1d4d5ce599/1js6qlf69'
    script.charset = 'UTF-8'
    script.setAttribute('crossorigin', '*')
    document.body.appendChild(script)

    return () => {
      // Cleanup - script aur Tawk widget hata do agar component unmount ho
      document.body.removeChild(script)
      const tawkIframe = document.querySelector('iframe[title*="chat" i], iframe[src*="tawk.to"]')
      if (tawkIframe) tawkIframe.remove()
    }
  }, [])

  return null // yeh component kuch render nahi karta, sirf script load karta hai
}