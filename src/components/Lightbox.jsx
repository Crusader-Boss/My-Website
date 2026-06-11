import React, { useEffect, useRef } from 'react'

export default function Lightbox({ images = [], startIndex = 0, onClose }){
  const [index, setIndex] = React.useState(startIndex)
  const overlayRef = useRef(null)
  const closeRef = useRef(null)
  const previousActive = useRef(null)

  useEffect(() => {
    previousActive.current = document.activeElement
    // focus close button when opened
    setTimeout(() => closeRef.current?.focus(), 0)

    function onKey(e){
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'ArrowLeft') setIndex(i => Math.max(0, i - 1))
      if (e.key === 'ArrowRight') setIndex(i => Math.min(images.length - 1, i + 1))
      if (e.key === 'Tab') {
        // simple focus trap
        const focusable = overlayRef.current?.querySelectorAll('a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])') || []
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'

    // preload neighbors
    const nextIndex = Math.min(images.length - 1, index + 1)
    const prevIndex = Math.max(0, index - 1)
    const nImg = new Image(); nImg.src = images[nextIndex]
    const pImg = new Image(); pImg.src = images[prevIndex]

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      previousActive.current?.focus()
    }
  }, [images, index, onClose])

  if (!images || images.length === 0) return null

  return (
    <div ref={overlayRef} className="lightbox-overlay" role="dialog" aria-modal="true" aria-label="Image viewer">
      <button ref={closeRef} className="lightbox-close" onClick={onClose} aria-label="Close">✕</button>
      <button className="lightbox-prev" onClick={() => setIndex(i => Math.max(0, i - 1))} aria-label="Previous">◀</button>
      <div className="lightbox-content" role="document">
        <img src={images[index]} alt={`Image ${index + 1}`} />
        <div className="lightbox-caption">{index + 1} / {images.length}</div>
      </div>
      <button className="lightbox-next" onClick={() => setIndex(i => Math.min(images.length - 1, i + 1))} aria-label="Next">▶</button>
    </div>
  )
}
