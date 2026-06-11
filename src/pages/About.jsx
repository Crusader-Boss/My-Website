import React, { useEffect, useRef, useState } from 'react'
import '../styles/about_me.css'
import Lightbox from '../components/Lightbox'
import Particles from '../components/Particles'

export default function About(){
  const skillsRef = useRef(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [startIndex, setStartIndex] = useState(0)

  const gallery = [
    '/images/photo1.webp',
    '/images/photo2.webp',
    '/images/photo3.webp'
  ]

  useEffect(() => {
    const bars = document.querySelectorAll('.skill-bar-fill')
    bars.forEach(b => {
      const pct = b.getAttribute('data-percent') || '0'
      // ensure percent includes %
      b.style.width = pct.endsWith('%') ? pct : pct + '%'
    })
  }, [])

  function openLightbox(i){ setStartIndex(i); setLightboxOpen(true) }

  return (
    <main className="about">
      <Particles count={30} color={'rgba(25,118,210,0.08)'} lineColor={'rgba(25,118,210,0.04)'} />

      <section className="card">
        <h1 id="about">About Me</h1>
        <p>I’m a web developer focused on building responsive, easy-to-use interfaces with React, HTML, and CSS. I enjoy turning ideas into fast, polished products that feel reliable on desktop and mobile.</p>
        <p>As a student and creator, I’m always learning new tools, refining my design sense, and finding better ways to make code readable for whoever comes next.</p>
      </section>

      <section className="card skills">
        <h2>Skills</h2>
        <div className="skill">
          <div className="skill-title">JavaScript</div>
          <div className="skill-bar"><div className="skill-bar-fill" data-percent="90%"></div></div>
        </div>
        <div className="skill">
          <div className="skill-title">React</div>
          <div className="skill-bar"><div className="skill-bar-fill" data-percent="85%"></div></div>
        </div>
        <div className="skill">
          <div className="skill-title">CSS</div>
          <div className="skill-bar"><div className="skill-bar-fill" data-percent="80%"></div></div>
        </div>
        <div className="skill">
          <div className="skill-title">HTML</div>
          <div className="skill-bar"><div className="skill-bar-fill" data-percent="90%"></div></div>
        </div>
      </section>

      <section className="card gallery" id="gallery">
        <h2>Gallery</h2>
        <div className="gallery-grid">
          {gallery.map((src, i) => (
            <button key={src} className="gallery-thumb" onClick={() => openLightbox(i)} aria-label={`Open image ${i+1}`}>
              <img src={src} alt={`Gallery ${i+1}`} />
            </button>
          ))}
        </div>
      </section>

      {lightboxOpen && <Lightbox images={gallery} startIndex={startIndex} onClose={() => setLightboxOpen(false)} />}
    </main>
  )
}
