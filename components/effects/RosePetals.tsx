'use client'
import { useEffect, useRef } from 'react'

// ── Petal shape (rose silhouette, drawn at origin) ──
function drawPetalShape(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.bezierCurveTo(-w * 0.6, -h * 0.3,  -w * 0.5, -h * 0.9,  0, -h)
  ctx.bezierCurveTo( w * 0.5, -h * 0.9,   w * 0.6, -h * 0.3,  0,  0)
  ctx.closePath()
}

// ── Gold palette variants ──
const PALETTES = [
  { face: '#e8c84a', edge: '#a88920', shadow: '#6b5010', highlight: '#f8e87a' },
  { face: '#d4af37', edge: '#9a7818', shadow: '#5e4408', highlight: '#ecd060' },
  { face: '#c8a020', edge: '#8a6810', shadow: '#543a05', highlight: '#e0c040' },
  { face: '#f0d060', edge: '#b89030', shadow: '#7a5e18', highlight: '#fff090' },
  { face: '#dfc040', edge: '#a08820', shadow: '#685510', highlight: '#f5e060' },
] as const

type Palette = typeof PALETTES[number]

// ── Petal class ──
class Petal {
  x: number; y: number; z: number
  vx: number; vy: number; vz: number
  rotX: number; rotY: number; rotZ: number
  dRotX: number; dRotY: number; dRotZ: number
  swayAmp: number; swayFreq: number; swayPhase: number
  pw: number; ph: number
  palette: Palette
  opacity: number; age: number
  W: number; H: number

  constructor(W: number, H: number, initial = false) {
    this.W = W; this.H = H; this.age = 0
    // Initialise with dummy values then reset
    this.x = 0; this.y = 0; this.z = 0
    this.vx = 0; this.vy = 0; this.vz = 0
    this.rotX = 0; this.rotY = 0; this.rotZ = 0
    this.dRotX = 0; this.dRotY = 0; this.dRotZ = 0
    this.swayAmp = 0; this.swayFreq = 0; this.swayPhase = 0
    this.pw = 0; this.ph = 0
    this.palette = PALETTES[0]
    this.opacity = 1
    this.reset(initial)
  }

  reset(initial = false) {
    this.x  = Math.random() * this.W
    this.y  = initial ? Math.random() * this.H - this.H : -40 - Math.random() * 200
    this.z  = 100 + Math.random() * 900
    this.vx = (Math.random() - 0.5) * 1.2
    this.vy = 0.6 + Math.random() * 1.4
    this.vz = (Math.random() - 0.5) * 0.3
    this.rotX = Math.random() * Math.PI * 2
    this.rotY = Math.random() * Math.PI * 2
    this.rotZ = Math.random() * Math.PI * 2
    this.dRotX = (Math.random() - 0.5) * 0.04
    this.dRotY = (Math.random() - 0.5) * 0.06
    this.dRotZ = (Math.random() - 0.5) * 0.03
    this.swayAmp   = 15 + Math.random() * 30
    this.swayFreq  = 0.003 + Math.random() * 0.004
    this.swayPhase = Math.random() * Math.PI * 2
    this.pw = 10 + Math.random() * 10
    this.ph = 16 + Math.random() * 14
    this.palette = PALETTES[Math.floor(Math.random() * PALETTES.length)]
    this.opacity = 0.7 + Math.random() * 0.3
    this.age = 0
  }

  project() {
    const fov = 600
    const scale = fov / (fov + this.z)
    return {
      sx: this.x * scale + this.W * (1 - scale) / 2,
      sy: this.y * scale + this.H * (1 - scale) / 2,
      scale,
    }
  }

  draw(ctx: CanvasRenderingContext2D, t: number) {
    this.age++
    this.x  += this.vx + Math.sin(t * this.swayFreq + this.swayPhase) * 0.6
    this.y  += this.vy
    this.z  += this.vz
    this.rotX += this.dRotX
    this.rotY += this.dRotY
    this.rotZ += this.dRotZ
    this.vx += (Math.random() - 0.5) * 0.04
    this.vx *= 0.98

    if (this.y > this.H + 60) this.reset()
    if (this.z < 0) this.z = 50

    const { sx, sy, scale } = this.project()
    const pw = this.pw * scale
    const ph = this.ph * scale
    const flipY = Math.cos(this.rotY)
    const flipX = Math.cos(this.rotX)

    ctx.save()
    ctx.translate(sx, sy)
    ctx.rotate(this.rotZ)
    ctx.globalAlpha = this.opacity * Math.min(1, this.age / 30)

    const { face, edge, shadow, highlight } = this.palette

    ctx.save()
    ctx.scale(flipY, flipX)
    ctx.scale(pw / 12, ph / 18)

    // Front vs back face shading
    if (flipY < 0) {
      const g = ctx.createLinearGradient(0, -18, 0, 0)
      g.addColorStop(0, shadow); g.addColorStop(1, edge)
      ctx.fillStyle = g
    } else {
      const g = ctx.createLinearGradient(-6, -18, 6, 0)
      g.addColorStop(0, highlight); g.addColorStop(0.3, face)
      g.addColorStop(0.7, edge);    g.addColorStop(1, shadow)
      ctx.fillStyle = g
    }
    drawPetalShape(ctx, 12, 18)
    ctx.fill()

    // Highlight streak on front face
    if (flipY > 0) {
      const hg = ctx.createLinearGradient(-3, -16, 0, -4)
      hg.addColorStop(0, 'rgba(255,255,200,0.35)')
      hg.addColorStop(1, 'rgba(255,255,200,0)')
      ctx.fillStyle = hg
      ctx.beginPath()
      ctx.ellipse(-1.5, -10, 1.5, 7, -0.3, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.strokeStyle = edge
    ctx.lineWidth   = 0.4 / Math.max(scale, 0.01)
    drawPetalShape(ctx, 12, 18)
    ctx.stroke()

    ctx.restore()
    ctx.restore()
  }
}

// ── Component ──────────────────────────────────────────────────────────────────
export default function RosePetals({ count = 55 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0
    let H = 0
    let petals: Petal[] = []
    let rafId: number
    let t = 0

    function resize() {
      W = canvas!.width  = window.innerWidth
      H = canvas!.height = window.innerHeight
      petals = Array.from({ length: count }, () => new Petal(W, H, true))
    }

    function sortPetals() {
      petals.sort((a, b) => b.z - a.z)
    }

    function loop() {
      ctx!.clearRect(0, 0, W, H)
      t++
      if (t % 30 === 0) sortPetals()
      for (const p of petals) p.draw(ctx!, t)
      rafId = requestAnimationFrame(loop)
    }

    resize()
    window.addEventListener('resize', resize)
    loop()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [count])

  return (
    <canvas
      ref={canvasRef}
      className="petals-canvas fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 10 }}
      aria-hidden="true"
    />
  )
}
