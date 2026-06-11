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
        <p>I’m a second-year Biotechnology Engineering student at Haldia Institute of Technology, where I combine embedded systems, robotics, and lab science into practical projects.</p>
        <p>I’m not a full-time web developer — I’m a hybrid tech student who builds with Python, C/C++, Arduino, ESP modules, and bioelectronics. Coding is my hobby, electronics are my playground, and I’m focused on the space between biotech and hardware.</p>
        <p>My portfolio is meant to show the types of work I do as I grow: sample articles, project experiments, and a blog platform I’m building to document what’s next.</p>
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
        <p>I like to capture the moment between moments — a hobbyist photographer always looking for the small details that tell a bigger story.</p>
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
