'use client'

import { useRef, useEffect } from 'react'
import { content } from '@/lib/content'

interface Props {
  progress: number
}

export default function HeroOverlay({ progress }: Props) {
  const cardContentRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll CTA — fades out as soon as user begins scrolling
    if (ctaRef.current) {
      ctaRef.current.style.opacity = String(Math.max(0, 1 - progress / 0.06))
    }

    // Card content — fades in once card is largely revealed (p > 0.68)
    // Smooth 0.68 → 0.88 fade-in window
    if (cardContentRef.current) {
      const op = progress > 0.68 ? Math.min(1, (progress - 0.68) / 0.20) : 0
      cardContentRef.current.style.opacity = String(op)
      // Subtle upward drift as content materialises
      const rise = (1 - op) * 14
      cardContentRef.current.style.transform = `translateY(${rise}px)`
    }
  }, [progress])

  return (
    <div className="absolute inset-0 z-20 pointer-events-none select-none flex items-center justify-center">

      {/* ── CARD CONTENT — sits over the white invitation card in the frame ── */}
      {/*
        The canvas draws the 16:9 frame in CONTAIN mode, centered.
        The white card occupies ~52% of frame width, ~44% of frame height.
        This box is sized/positioned to match that card area.
      */}
      <div
        ref={cardContentRef}
        className="card-content"
        style={{ opacity: 0, transition: 'none' }}
        role="presentation"
        aria-label={`Wedding invitation for ${content.couple.partner1} and ${content.couple.partner2}`}
      >
        {/* Eyebrow */}
        <span className="card-eyebrow">Together with their families</span>

        {/* Names with gold foil shimmer */}
        <div className="card-names" aria-label={`${content.couple.partner1} and ${content.couple.partner2}`}>
          {content.couple.partner1}
          <span className="card-amp" aria-hidden="true">&amp;</span>
          {content.couple.partner2}
        </div>

        {/* Hairline divider */}
        <div className="card-divider" aria-hidden="true" />

        {/* Date in Roman numerals */}
        <span className="card-date">VIII · XXXI · MMXXVI</span>

        {/* Tagline */}
        <span className="card-tagline">Join us as we begin our forever</span>
      </div>

      {/* ── SCROLL CTA — visible only at the very start ── */}
      <div
        ref={ctaRef}
        className="absolute bottom-8 flex flex-col items-center gap-2"
        style={{ transition: 'none' }}
        aria-label="Scroll to open the invitation"
      >
        <span className="font-mono text-[8px] tracking-[0.5em] text-ink/40 uppercase">
          Scroll to Open
        </span>
        <svg
          className="w-4 h-4 text-gold animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* ── Date line at very bottom — appears at near-full reveal ── */}
    </div>
  )
}
