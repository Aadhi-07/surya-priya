'use client'

import Image from 'next/image'
import RevealController from '@/components/ui/RevealController'
import { content } from '@/lib/content'

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
        <RevealController reveal="fade-up">
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
        </RevealController>

        {/* Three-column layout: left text | center image | right text */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-10 md:gap-12">

          {/* Left — venue name + address */}
          <RevealController reveal="fade-up" delay={100}>
            <div className="text-center md:text-right space-y-3">
              <p
                className="font-bodoni italic"
                style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: '#1a1a1a', lineHeight: 1.3 }}
              >
                {content.venue.name}<br />
                <span style={{ fontStyle: 'normal', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.3em', color: '#666', textTransform: 'uppercase' }}>
                  {content.venue.area}
                </span>
              </p>
              <p
                className="font-cormorant"
                style={{ fontSize: '14px', color: '#555', lineHeight: 1.7, fontStyle: 'italic' }}
              >
                {content.venue.address}
              </p>
              <p
                style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.3em', color: '#888', textTransform: 'uppercase' }}
              >
                {content.venue.city}
              </p>
            </div>
          </RevealController>

          {/* Center — venue image */}
          <RevealController reveal="scale-in" delay={150}>
            <div
              className="relative mx-auto overflow-hidden"
              style={{
                width: 'clamp(200px, 28vw, 360px)',
                height: 'clamp(240px, 36vw, 460px)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.10)',
              }}
            >
              <Image
                src="/venue.png"
                alt={`${content.venue.name} — ${content.venue.city}`}
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
          </RevealController>

          {/* Right — travel note + coordinates */}
          <RevealController reveal="fade-up" delay={200}>
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
                {content.venue.travelNote}
              </p>
              <p
                style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.25em', color: '#aaa', textTransform: 'uppercase', marginTop: '12px' }}
              >
                {content.venue.coordinates}
              </p>
            </div>
          </RevealController>
        </div>

        {/* Plan a visit button */}
        <RevealController reveal="fade-up" delay={300}>
          <div className="flex justify-center mt-16">
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(content.venue.name + ', ' + content.venue.city)}`}
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
        </RevealController>
      </div>
    </section>
  )
}
