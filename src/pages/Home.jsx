import React, { useEffect, useRef } from 'react'
import '../styles/home.css'
import Particles from '../components/Particles'

export default function Home(){
  useEffect(() => {
    // card entrance animations and stat counters
    const cards = Array.from(document.querySelectorAll('.card'))
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
          const nums = entry.target.querySelectorAll('.stat-number')
          if (nums && nums.length) {
            nums.forEach(el => {
              const target = parseInt(el.getAttribute('data-target') || '0', 10)
              let current = 0
              const step = Math.max(1, Math.floor(target / 60))
              const raf = () => {
                current += step
                if (current >= target) {
                  el.textContent = String(target)
                } else {
                  el.textContent = String(current)
                  requestAnimationFrame(raf)
                }
              }
              requestAnimationFrame(raf)
            })
          }
          io.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })
    cards.forEach(c => io.observe(c))

    return () => io.disconnect()
  }, [])

  return (
    <main className="hero">
      <Particles count={60} />
      <div className="card card-animate">
        <h1>Hi, I’m Kshitij Arya</h1>
        <p className="hero-subtitle">Biotechnology student • Tech nerd • Hobbyist coder</p>
        <div className="social">
          <a href="https://twitter.com/Arya_Kshitij69" target="_blank" rel="noreferrer"><img src="/images/twitter.svg" alt="Twitter" /></a>
          <a href="https://github.com/Crusader-Boss" target="_blank" rel="noreferrer"><img src="/images/github.svg" alt="Github" /></a>
          <a href="https://www.youtube.com/@Kshitij_Arya69" target="_blank" rel="noreferrer"><img src="/images/youtube.svg" alt="YouTube" /></a>
          <a href="https://www.linkedin.com/in/kshitijarya06/" target="_blank" rel="noreferrer"><img src="/images/linkedin-svgrepo-com.svg" alt="LinkedIn" /></a>
        </div>
        <p>I’m a student at Haldia Institute of Technology, West Bengal, studying biotechnology. I love electronics and coding is my hobby—Python, web experiments, and building small interactive projects keep me curious.</p>
      </div>
      <div className="card card-animate">
        <h2>Featured Work</h2>
        <div className="work-grid">
          <article className="work-item">
            <div className="work-icon">💻</div>
            <h3>Portfolio Website</h3>
            <p>A polished personal site built for speed, readability, and a memorable first impression.</p>
            <a href="/about_me" className="work-link">View Details →</a>
          </article>

          <article className="work-item">
            <div className="work-icon">📝</div>
            <h3>Articles</h3>
            <p>Practical notes on web development, component design, and the craft of building better interfaces.</p>
            <a href="/blog" className="work-link">Read Articles →</a>
          </article>

          <article className="work-item">
            <div className="work-icon">📸</div>
            <h3>Creative Work</h3>
            <p>Side projects, visual experiments, and the occasional photo that makes me stop scrolling.</p>
            <a href="/about_me#gallery" className="work-link">View Gallery →</a>
          </article>
        </div>
      </div>

      <div className="card card-animate">
        <h2>Quick Numbers</h2>
        <div className="stats-grid">
          <div className="stat-item"><div className="stat-number" data-target="24">24</div><div className="stat-label">Projects</div></div>
          <div className="stat-item"><div className="stat-number" data-target="120">120</div><div className="stat-label">Blog Posts</div></div>
          <div className="stat-item"><div className="stat-number" data-target="3">3</div><div className="stat-label">Years Learning</div></div>
          <div className="stat-item"><div className="stat-number" data-target="5000">5000</div><div className="stat-label">Hours Coded</div></div>
        </div>
      </div>

      <div className="card card-animate cta-card">
        <h2>Let's Connect</h2>
        <p>Interested in collaborating, learning together, or just want to say hello? I'd love to hear from you!</p>
        <div className="cta-buttons">
          <a href="/contact" className="cta-btn primary">Get In Touch</a>
          <a href="/about_me" className="cta-btn secondary">Learn More</a>
        </div>
      </div>
    </main>
  )
}


