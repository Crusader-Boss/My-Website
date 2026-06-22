import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import '../styles/header.css'

export default function Header(){
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink to="/" className="brand" aria-label="Go to home page">Kshitij Arya</NavLink>
        <button
          type="button"
          className={`nav-toggle ${isMenuOpen ? 'is-open' : ''}`}
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          id="primary-navigation"
          className={`main-nav ${isMenuOpen ? 'is-open' : ''}`}
          aria-label="Primary Navigation"
        >
          <NavLink to="/" end className={({isActive})=> isActive ? 'active' : ''}>Home</NavLink>
          <NavLink to="/about_me" className={({isActive})=> isActive ? 'active' : ''}>About</NavLink>
          <NavLink to="/blog" className={({isActive})=> isActive ? 'active' : ''}>Blog</NavLink>
          <NavLink to="/contact" className={({isActive})=> isActive ? 'active' : ''}>Contact</NavLink>
        </nav>
      </div>
    </header>
  )
}
