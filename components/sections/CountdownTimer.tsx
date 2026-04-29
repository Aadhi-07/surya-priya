'use client'

import { useEffect, useState } from 'react'
import { content } from '@/lib/content'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calcTimeLeft(): TimeLeft {
  const target = new Date(`${content.date.iso}T19:00:00`)
  const now = new Date()
  const diff = Math.max(0, target.getTime() - now.getTime())
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

interface UnitProps {
  value: number
  label: string
  mounted: boolean
}

function Unit({ value, label, mounted }: UnitProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <p
        className="font-bodoni italic text-ink leading-none tabular-nums"
        style={{ fontSize: 'clamp(56px, 12vw, 140px)', letterSpacing: '-0.02em' }}
      >
        {mounted ? String(value).padStart(3, '\u2007') : '—'}
      </p>
      <p
        className="font-mono uppercase text-ink/30"
        style={{ fontSize: '9px', letterSpacing: '0.5em' }}
      >
        {label}
      </p>
    </div>
  )
}

export default function CountdownTimer() {
  const [time, setTime] = useState<TimeLeft>(calcTimeLeft())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const id = setInterval(() => setTime(calcTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="countdown"
      className="relative bg-bg overflow-hidden"
      style={{ minHeight: '60vh' }}
      aria-label="Wedding countdown"
    >
      {/* Dark floral background — large petals/botanicals */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 20% 50%, rgba(30,22,8,0.95) 0%, rgba(0,0,0,0.6) 60%, transparent 100%),
            radial-gradient(ellipse 120% 80% at 80% 50%, rgba(30,22,8,0.95) 0%, rgba(0,0,0,0.6) 60%, transparent 100%)
          `,
          zIndex: 1,
        }}
      />

      {/* Decorative large flower shapes via SVG */}
      <div className="absolute inset-0 flex items-center justify-between pointer-events-none" style={{ zIndex: 0 }}>
        {/* Left bloom */}
        <svg viewBox="0 0 400 600" className="h-full opacity-[0.12]" style={{ marginLeft: '-8%' }} aria-hidden="true">
          <ellipse cx="200" cy="300" rx="160" ry="220" fill="#c8a020" />
          <ellipse cx="200" cy="100" rx="80" ry="120" fill="#a88920" transform="rotate(-20 200 300)" />
          <ellipse cx="360" cy="250" rx="80" ry="120" fill="#a88920" transform="rotate(40 200 300)" />
          <ellipse cx="320" cy="450" rx="80" ry="120" fill="#a88920" transform="rotate(70 200 300)" />
          <ellipse cx="80" cy="450" rx="80" ry="120" fill="#a88920" transform="rotate(-70 200 300)" />
          <ellipse cx="40" cy="250" rx="80" ry="120" fill="#a88920" transform="rotate(-40 200 300)" />
          <circle cx="200" cy="300" r="50" fill="#d4af37" />
        </svg>

        {/* Right bloom */}
        <svg viewBox="0 0 400 600" className="h-full opacity-[0.12]" style={{ marginRight: '-8%', transform: 'scaleX(-1)' }} aria-hidden="true">
          <ellipse cx="200" cy="300" rx="160" ry="220" fill="#c8a020" />
          <ellipse cx="200" cy="100" rx="80" ry="120" fill="#a88920" transform="rotate(-20 200 300)" />
          <ellipse cx="360" cy="250" rx="80" ry="120" fill="#a88920" transform="rotate(40 200 300)" />
          <ellipse cx="320" cy="450" rx="80" ry="120" fill="#a88920" transform="rotate(70 200 300)" />
          <ellipse cx="80" cy="450" rx="80" ry="120" fill="#a88920" transform="rotate(-70 200 300)" />
          <ellipse cx="40" cy="250" rx="80" ry="120" fill="#a88920" transform="rotate(-40 200 300)" />
          <circle cx="200" cy="300" r="50" fill="#d4af37" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center py-28 px-6" style={{ zIndex: 2 }}>
        {/* Eyebrow */}
        <p
          className="font-mono uppercase text-ink/30 text-center mb-16"
          style={{ fontSize: '9px', letterSpacing: '0.55em' }}
        >
          Let the countdown begin
        </p>

        {/* Numbers grid — large, airy, like the reference */}
        <div className="grid grid-cols-4 gap-8 md:gap-16">
          <Unit value={time.days}    label="Days"    mounted={mounted} />
          <Unit value={time.hours}   label="Hours"   mounted={mounted} />
          <Unit value={time.minutes} label="Minutes" mounted={mounted} />
          <Unit value={time.seconds} label="Seconds" mounted={mounted} />
        </div>

        {/* Date line */}
        <div className="mt-16 flex items-center gap-5">
          <div className="w-12 h-px bg-gold/20" />
          <p className="font-cormorant italic text-ink/25 tracking-widest text-sm">
            {content.date.display} · {content.venue.city}
          </p>
          <div className="w-12 h-px bg-gold/20" />
        </div>
      </div>
    </section>
  )
}
