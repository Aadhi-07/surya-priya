'use client'

import { content } from '@/lib/content'
import { VENUE_NAME, VENUE_ADDRESS, VENUE_LAT, VENUE_LNG } from '@/lib/constants'

export default function Venue() {
  return (
    <section
      id="venue"
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-bg"
      aria-labelledby="venue-heading"
    >
      {/* Parallax background using CSS custom property */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 60% at 50% 40%, rgba(212,175,55,0.04) 0%, transparent 70%),
            linear-gradient(180deg, #000 0%, #0a0a08 50%, #000 100%)
          `,
        }}
      />

      {/* Horizontal rule lines */}
      <div className="absolute top-[30%] left-0 right-0 h-px bg-white/[0.08]" />
      <div className="absolute top-[70%] left-0 right-0 h-px bg-white/[0.08]" />

      {/* Editorial stats between rules */}
      <div className="absolute top-[30%] left-0 right-0 flex justify-center">
        <div className="grid grid-cols-3 gap-16 px-8 -mt-6">
          {[
            'Golden Hour Ceremony',
            'Heritage Estate',
            'Open Sky',
          ].map((stat) => (
            <p
              key={stat}
              className="font-mono text-[11px] tracking-[0.35em] text-ink/30 uppercase text-center"
            >
              {stat}
            </p>
          ))}
        </div>
      </div>

      {/* Center content */}
      <div className="relative z-10 text-center px-6 py-40">
        <p className="font-mono text-[9px] tracking-[0.6em] text-ink/30 uppercase mb-8">
          The Venue
        </p>

        <h2
          id="venue-heading"
          className="font-bodoni italic text-ink mb-6"
          style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
        >
          {VENUE_NAME}
        </h2>

        <p className="font-cormorant text-ink/50 text-xl tracking-[0.15em]">
          {VENUE_ADDRESS}
        </p>

        {/* Gold ornament */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <div className="w-20 h-px bg-gold/30" />
          <span className="text-gold">✦</span>
          <div className="w-20 h-px bg-gold/30" />
        </div>
      </div>

      {/* Coordinates bottom-right */}
      <div className="absolute bottom-6 right-8 font-mono text-[9px] text-ink/20 tracking-[0.3em]">
        {VENUE_LAT}° N, {VENUE_LNG}° E
      </div>
    </section>
  )
}

