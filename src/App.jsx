import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import Contact from './pages/Contact'

export default function App() {
  return (
    <>
      <Header />
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about_me" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </>
  )
}
