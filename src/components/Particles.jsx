import React, { useRef, useEffect } from 'react'

// Canvas-based particle network (lightweight)
export default function Particles({ count = 60, mode = 'network', color = 'rgba(25,118,210,0.9)', lineColor = 'rgba(25,118,210,0.12)' }){
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let dpr = window.devicePixelRatio || 1
    let width = 0
    let height = 0
    let animationId = null
    let time = 0

    function resize(){
      dpr = window.devicePixelRatio || 1
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    // init particles
    const particles = []
    function initParticles(){
      particles.length = 0
      for (let i = 0; i < count; i++){
        if (mode === 'balloon'){
          particles.push({
            x: Math.random() * width,
            y: height + Math.random() * 50,
            vx: (Math.random() - 0.5) * 0.15,
            vy: -0.3 - Math.random() * 0.2,
            r: Math.random() * 2 + 1,
            wobblePhase: Math.random() * Math.PI * 2
          })
        } else if (mode === 'bounce'){
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            r: Math.random() * 3 + 2,
            gravity: 0.15
          })
        } else {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            r: Math.random() * 2 + 1
          })
        }
      }
    }

    function step(){
      ctx.clearRect(0,0,width,height)
      time += 1
      
      // move and draw
      for (let i = 0; i < particles.length; i++){
        const p = particles[i]
        
        if (mode === 'balloon'){
          p.y += p.vy
          p.wobblePhase += 0.02
          p.vx = Math.sin(p.wobblePhase) * 0.1
          p.x += p.vx
          
          if (p.x < -10) p.x = width + 10
          if (p.x > width + 10) p.x = -10
          if (p.y < -50) {
            p.y = height + 10
            p.wobblePhase = Math.random() * Math.PI * 2
          }
        } else if (mode === 'bounce'){
          // apply gravity
          p.vy += p.gravity
          
          // move
          p.x += p.vx
          p.y += p.vy
          
          // bounce off walls
          if (p.x - p.r < 0) { p.x = p.r; p.vx *= -0.9 }
          if (p.x + p.r > width) { p.x = width - p.r; p.vx *= -0.9 }
          if (p.y - p.r < 0) { p.y = p.r; p.vy *= -0.9 }
          if (p.y + p.r > height) { p.y = height - p.r; p.vy *= -0.9 }
          
          // friction/drag
          p.vx *= 0.995
          p.vy *= 0.995
        } else {
          p.x += p.vx
          p.y += p.vy
          if (p.x < -10) p.x = width + 10
          if (p.x > width + 10) p.x = -10
          if (p.y < -10) p.y = height + 10
          if (p.y > height + 10) p.y = -10
        }

        ctx.beginPath()
        ctx.fillStyle = color
        ctx.globalAlpha = 0.9
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }


      for (let i = 0; i < particles.length; i++){
        for (let j = i + 1; j < particles.length; j++){
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx*dx + dy*dy)
          if (dist < 110){
            ctx.beginPath()
            ctx.strokeStyle = lineColor
            ctx.globalAlpha = 1 - dist / 140
            ctx.lineWidth = 1
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(step)
    }

    function start(){
      resize()
      initParticles()
      if (!animationId) animationId = requestAnimationFrame(step)
    }

    function handleResize(){
      resize()
      initParticles()
    }

    start()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [count, mode, color, lineColor])


  return (
    <div className="canvas-particles" style={{position:'absolute', inset:0, pointerEvents:'none', zIndex:-1}}>
      <canvas ref={canvasRef} style={{width:'100%', height:'100%', display:'block'}} aria-hidden="true" />
    </div>
  )
}
