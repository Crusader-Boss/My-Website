import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../styles/header.css'

export default function Header(){
  const [query, setQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [btnState, setBtnState] = useState('idle')
  const headerRef = useRef(null)
  const inputRef = useRef(null)
  const logoRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    // small entrance animation for header
    const el = headerRef.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(-8px)'
    requestAnimationFrame(() => {
      el.style.transition = 'opacity .45s ease, transform .45s ease'
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    })

    // typing placeholder suggestions (from original header.js)
    const suggestions = ['about me','contact','blog','projects','skills','photography']
    let suggestionIndex = 0
    let typingTimeout = null
    let typingActive = true

    function typeSearchPlaceholder() {
      const inp = inputRef.current
      if (!inp || !typingActive) return
      const text = suggestions[suggestionIndex]
      let i = 0
      inp.placeholder = ''

      function typeChar() {
        if (!typingActive) return
        if (i < text.length) {
          inp.placeholder += text.charAt(i)
          i++
          typingTimeout = setTimeout(typeChar, 150)
        } else {
          typingTimeout = setTimeout(() => {
            suggestionIndex = (suggestionIndex + 1) % suggestions.length
            typeSearchPlaceholder()
          }, 3000)
        }
      }
      typeChar()
    }

    // start typing after a delay
    const startTimer = setTimeout(typeSearchPlaceholder, 2000)

    return () => {
      clearTimeout(startTimer)
      typingActive = false
      if (typingTimeout) clearTimeout(typingTimeout)
    }
  }, [])

  function onSubmitSearch(e){
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    // button feedback animation
    setBtnState('clicked')
    setTimeout(() => setBtnState('idle'), 900)

    // navigate to blog with query param (simple behavior)
    navigate(`/blog?search=${encodeURIComponent(q)}`)
  }

  // keyboard shortcuts and misc interactions
  useEffect(() => {
    const onKey = (e) => {
      // Ctrl/Cmd + K to focus search
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
      // Escape to clear search when focused
      if (e.key === 'Escape') {
        const inp = inputRef.current
        if (inp && document.activeElement === inp) {
          inp.blur()
          setQuery('')
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header ref={headerRef} className={`headerog ${scrolled ? 'scrolled' : ''}`}>
      <p ref={logoRef} className="logo-container" tabIndex={0} onClick={() => { 
        // ripple effect
        const el = logoRef.current
        if (el) {
          const ripple = document.createElement('div')
          ripple.style.cssText = `position:absolute;border-radius:50%;background:rgba(211,84,0,0.3);transform:scale(0);animation:ripple 0.6s linear;pointer-events:none;width:100px;height:100px;top:50%;left:50%;margin:-50px 0 0 -50px;`
          el.style.position = 'relative'
          el.appendChild(ripple)
          setTimeout(() => ripple.remove(), 650)
        }
        navigate('/')
      }}>Kshitij_Arya</p>
      <nav>
        <NavLink to="/" end className={({isActive})=> isActive? 'active' : ''}>Home</NavLink>
        <NavLink to="/about_me" className={({isActive})=> isActive? 'active' : ''}>About Me</NavLink>
        <NavLink to="/blog" className={({isActive})=> isActive? 'active' : ''}>Articles</NavLink>
        <NavLink to="/contact" className={({isActive})=> isActive? 'active' : ''}>Contact Me</NavLink>
      </nav>

      <form className="search-container" onSubmit={onSubmitSearch} role="search">
        <input
          ref={inputRef}
          aria-label="Search"
          className="search-input"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search..."
        />
        <button className={`search-button ${btnState === 'clicked' ? 'clicked' : ''}`} type="submit">
          {btnState === 'clicked' ? '✓' : 'Go'}
        </button>
      </form>
    </header>
  )
}
