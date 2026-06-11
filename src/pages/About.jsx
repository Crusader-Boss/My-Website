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
        <p>I’m a student at Haldia Institute of Technology, West Bengal, studying biotechnology. I’m a tech nerd who loves electronics and enjoys coding as a hobby.</p>
        <p>I know Python and I’m learning more every day by building web experiments and small side projects. My goal is to explore the intersection of software, hardware, and science while sharing what I discover.</p>
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
