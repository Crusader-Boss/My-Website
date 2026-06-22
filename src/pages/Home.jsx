import React, { useEffect } from 'react'
import '../styles/home.css'
import Particles from '../components/Particles'

export default function Home(){
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll('.card'))
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
          io.unobserve(entry.target)
        }
      })
    }, { threshold: 0.08 })
    cards.forEach(c => io.observe(c))
    return () => io.disconnect()
  }, [])

  return (
    <main className="site-hero">
      <Particles count={48} />

      <section className="hero-inner">
        <div className="hero-left">
          <h1 className="hero-title">Kshitij<br/><span className="hero-title--accent">Arya</span></h1>
          <p className="hero-lead">Biotechnology student • Embedded systems & robotics • Maker & writer</p>
          <div className="hero-ctas">
            <a href="/about_me" className="btn btn-primary">About Me</a>
            <a href="/contact" className="btn btn-ghost">Contact</a>
          </div>
        </div>

        <aside className="hero-right">
          <div className="profile-card card card-animate">
            <img src="/images/pfp.jpg" alt="Kshitij Arya" className="profile-photo" onError={(e)=>{e.currentTarget.style.display='none'}} />
            <p className="profile-caption">Maker • Coder • Researcher</p>
          </div>
        </aside>
      </section>

      <section className="content-cards">
        <div className="card card-animate">
          <h2>Featured Work</h2>
          <div className="work-grid">
            <article className="work-item">
              <div className="work-icon">⚙️</div>
              <h3>Embedded Systems</h3>
              <p>Projects with Arduino, ESP32 and sensor integrations.</p>
              <a href="/about_me" className="work-link">View →</a>
            </article>

            <article className="work-item">
              <div className="work-icon">📝</div>
              <h3>Writing</h3>
              <p>Technical notes and tutorials about hardware and software.</p>
              <a href="/blog" className="work-link">Read →</a>
            </article>

            <article className="work-item">
              <div className="work-icon">🔬</div>
              <h3>Biotech Experiments</h3>
              <p>Hands-on lab work and instrumentation projects.</p>
              <a href="/about_me#gallery" className="work-link">Gallery →</a>
            </article>
          </div>
        </div>
      </section>

    </main>
  )
}


