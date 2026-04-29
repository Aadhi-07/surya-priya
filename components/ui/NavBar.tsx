'use client'

import { useEffect, useRef, useState } from 'react'
import { content } from '@/lib/content'

const navLinks = [
  { href: '#prologue',  label: 'Story' },
  { href: '#schedule',  label: 'Schedule' },
  { href: '#location',  label: 'Location' },
  { href: '#countdown', label: 'Countdown' },
  { href: '#quote',     label: 'Quote' },
]

export default function NavBar() {
  const [visible, setVisible] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const heroHeight = useRef(0)

  useEffect(() => {
    // Hero is 500vh
    heroHeight.current = window.innerHeight * 5

    const onScroll = () => {
      const y = window.scrollY
      // Show after scrolling past 90% of hero
      setVisible(y > heroHeight.current * 0.9)
      setScrolled(y > heroHeight.current * 0.9 + 20)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-8 py-4"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-12px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        pointerEvents: visible ? 'auto' : 'none',
        background: scrolled
          ? 'rgba(0,0,0,0.85)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(253,250,246,0.06)' : 'none',
      }}
      aria-label="Site navigation"
    >
      {/* Wordmark */}
      <span className="font-bodoni italic text-gold" style={{ fontSize: '18px' }}>
        {content.couple.partner1} &amp; {content.couple.partner2}
      </span>

      {/* Links */}
      <ul className="hidden md:flex items-center gap-8 list-none">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="font-mono text-[9px] tracking-[0.4em] text-ink/40 uppercase hover:text-gold transition-colors duration-200"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* RSVP nav link */}
      <button
        id="nav-rsvp"
        onClick={() => document.getElementById('rsvp-button')?.click()}
        className="font-mono text-[9px] tracking-[0.4em] text-bg uppercase bg-gold px-4 py-2 rounded-full hover:bg-gold-dim transition-colors duration-200"
      >
        RSVP
      </button>
    </nav>
  )
}
