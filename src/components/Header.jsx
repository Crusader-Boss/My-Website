import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/header.css'

export default function Header(){
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="brand" onClick={() => window.location.href = '/'}>Kshitij Arya</div>
        <nav className="main-nav" aria-label="Primary Navigation">
          <NavLink to="/" end className={({isActive})=> isActive? 'active' : ''}>Home</NavLink>
          <NavLink to="/about_me" className={({isActive})=> isActive? 'active' : ''}>About</NavLink>
          <NavLink to="/blog" className={({isActive})=> isActive? 'active' : ''}>Blog</NavLink>
          <NavLink to="/contact" className={({isActive})=> isActive? 'active' : ''}>Contact</NavLink>
        </nav>
      </div>
    </header>
  )
}
