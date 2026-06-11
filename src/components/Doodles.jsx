import React from 'react'
import '../styles/contact.css'

export default function Doodles({items}){
  // items: [{left, top, size, color, delay}]
  const map = (items || [
    {left:'8%', top:'20%', size:36, color:'var(--accent-2)', delay: '0s'},
    {left:'85%', top:'12%', size:28, color:'rgba(99,164,255,0.18)', delay: '1.2s'},
    {left:'75%', top:'68%', size:44, color:'rgba(25,118,210,0.08)', delay: '0.6s'},
    {left:'18%', top:'76%', size:30, color:'rgba(25,118,210,0.06)', delay: '0.9s'}
  ])

  return (
    <div className="doodles-wrap" aria-hidden>
      {map.map((d, i) => (
        <svg key={i} className="doodle" style={{left: d.left, top: d.top, width: d.size, height: d.size, animationDelay: d.delay}} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill={d.color} />
        </svg>
      ))}
    </div>
  )
}
