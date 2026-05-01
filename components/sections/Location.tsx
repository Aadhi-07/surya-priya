'use client'

import Image from 'next/image'
import { content } from '@/lib/content'
import { VENUE_NAME, VENUE_ADDRESS, VENUE_LAT, VENUE_LNG, VENUE_MAP_URL } from '@/lib/constants'

export default function Location() {
  return (
    <section
      id="location"
      className="relative py-28 px-6 overflow-hidden"
      style={{ backgroundColor: '#f5f0e8' }}
      aria-labelledby="location-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2
          id="location-heading"
          className="font-bodoni italic text-center mb-16"
          style={{
            fontSize: 'clamp(42px, 8vw, 100px)',
            color: '#0a0a0a',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          Location
        </h2>

        {/* Three-column layout: left text | center image | right text */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-10 md:gap-12">

          {/* Left — venue name + address */}
          <div className="text-center md:text-right space-y-3">
            <p
              className="font-bodoni italic"
              style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: '#1a1a1a', lineHeight: 1.3 }}
            >
              {VENUE_NAME}<br />
              <span style={{ fontStyle: 'normal', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.3em', color: '#666', textTransform: 'uppercase' }}>
                Thanjavur
              </span>
            </p>
            <p
              className="font-cormorant"
              style={{ fontSize: '14px', color: '#555', lineHeight: 1.7, fontStyle: 'italic' }}
            >
              {VENUE_ADDRESS}
            </p>
            <p
              style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.3em', color: '#888', textTransform: 'uppercase' }}
            >
              Tamil Nadu, India
            </p>
          </div>

          {/* Center — venue image */}
          <div
            className="relative mx-auto overflow-hidden"
            style={{
              width: 'clamp(200px, 28vw, 360px)',
              height: 'clamp(240px, 36vw, 460px)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.10)',
            }}
          >
            <Image
              src="/frames/venue.png"
              alt={`${VENUE_NAME} — Thanjavur`}
              fill
              className="object-cover grayscale"
              sizes="360px"
              priority
            />
            {/* Subtle vignette overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.15) 100%)',
              }}
            />
          </div>

          {/* Right — travel note + coordinates */}
          <div className="text-center md:text-left space-y-3">
            <p
              style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.35em', color: '#888', textTransform: 'uppercase', marginBottom: '8px' }}
            >
              Getting there
            </p>
            <p
              className="font-cormorant"
              style={{ fontSize: '14px', color: '#555', lineHeight: 1.7, fontStyle: 'italic' }}
            >
              Ample parking available · Easy access from main road
            </p>
            <p
              style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.25em', color: '#aaa', textTransform: 'uppercase', marginTop: '12px' }}
            >
              {VENUE_LAT}° N, {VENUE_LNG}° E
            </p>
          </div>
        </div>

        {/* Plan a visit button */}
        <div className="flex justify-center mt-16">
          <a
            href={VENUE_MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 border border-zinc-800/20 px-8 py-3 hover:border-zinc-800/40 transition-colors duration-300"
            style={{ color: '#1a1a1a' }}
          >
            <span
              style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.45em', textTransform: 'uppercase' }}
            >
              Plan a Visit
            </span>
            <svg
              className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

