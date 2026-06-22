import React, { useState } from 'react'
import '../styles/contact.css'
import Particles from '../components/Particles'
import Doodles from '../components/Doodles'

export default function Contact(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle')

  function validate() {
    if (!name.trim() || name.trim().length < 2) return { ok: false, field: 'name', msg: 'Name must be at least 2 characters' }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) return { ok: false, field: 'email', msg: 'Please enter a valid email' }
    if (!message.trim() || message.trim().length < 10) return { ok: false, field: 'message', msg: 'Message must be at least 10 characters' }
    return { ok: true }
  }

  function onSubmit(e) {
    e.preventDefault()
    const v = validate()
    if (!v.ok) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 700)
      return
    }

    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
      setTimeout(() => setStatus('idle'), 2500)
    }, 1400)
  }

  return (
    <main className="contact-page">
      <Particles count={40} mode="bounce" color={'rgba(25,118,210,0.25)'} lineColor={'rgba(25,118,210,0.08)'} />
      <div className="box centered">
        <h1 className="contact-title">Contact Me</h1>
        <p className="contact-copy">Interested in biotech, embedded systems, robotics, or a blog collaboration? Drop a line and I’ll respond as soon as I can.</p>
        <Doodles />
        <form className="form" onSubmit={onSubmit} noValidate>
          <div className={`form-group ${status === 'error' ? 'error' : ''}`}>
            <label htmlFor="name">Your Name</label>
            <input id="name" className="fname" name="name" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} />
            <div className="error-message" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input id="email" className="femail" name="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <div className="error-message" />
          </div>

          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea id="message" className="fmessage" name="message" placeholder="Tell me what you have in mind..." rows={6} value={message} onChange={(e) => setMessage(e.target.value)} />
            <div className="error-message" />
          </div>

          <button className={`submitbtn ${status === 'loading' ? 'loading' : ''} ${status === 'success' ? 'success' : ''}`} type="submit">
            {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent! ✓' : 'Submit'}
          </button>
        </form>
      </div>
    </main>
  )
}
