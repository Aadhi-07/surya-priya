'use client'

import { content } from '@/lib/content'
import { EVENT_SCHEDULE } from '@/lib/constants'

// Description shown on hover for each schedule item (#5)
const scheduleDetails = [
  'Traditional ceremony with family blessings',
  'Cocktails & canapés in the garden courtyard',
  'A curated seven-course dinner by Chef Arvind',
  'Live music, dancing & a fireworks finale',
]

export default function Schedule() {
  return (
    <section
      id="schedule"
      className="relative bg-bg py-32 px-6 overflow-hidden"
      aria-labelledby="schedule-heading"
    >
      {/* Top hairline */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/8" />

      {/* Subtle gold bloom at top */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(212,175,55,0.03) 0%, transparent 60%)' }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Eyebrow */}
        <p className="font-mono text-[9px] tracking-[0.55em] text-ink/30 uppercase text-center mb-8">
          Here&apos;s a sneak peek of
        </p>

        {/* Big editorial heading */}
        <h2
          id="schedule-heading"
          className="font-bodoni italic text-ink text-center leading-[0.92] mb-20"
          style={{ fontSize: 'clamp(44px, 9vw, 120px)' }}
        >
          Our Special Day&apos;s<br />Schedule
        </h2>

        {/* Schedule timeline — with hover expand (#5) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0" role="list">
          {EVENT_SCHEDULE.map((item, i) => (
            <div
              key={item.id}
              className="schedule-item relative flex flex-col items-center py-10 px-6"
              role="listitem"
              tabIndex={0}
              aria-label={`${item.time}: ${item.label}`}
              style={{ borderLeft: '1px solid rgba(253,250,246,0.08)' }}
            >
              {/* Time — large Bodoni */}
              <p
                className="font-bodoni italic text-ink text-center leading-none mb-5 tabular-nums"
                style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
              >
                {item.time}
              </p>

              {/* Gold dot */}
              <div className="w-1.5 h-1.5 rounded-full bg-gold mb-5" />

              {/* Event name */}
              <p className="font-cormorant text-ink/80 text-center text-lg font-light tracking-wide mb-1">
                {item.label}
              </p>

              {/* Sub-label */}
              <p className="font-mono text-[8px] tracking-[0.45em] text-ink/30 uppercase text-center">
                {item.sublabel}
              </p>

              {/* Expandable detail (#5) */}
              <div className="schedule-detail mt-4">
                <p className="font-cormorant italic text-ink/40 text-center text-sm leading-snug px-2">
                  {item.venue}
                </p>
              </div>

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 70%)' }}
              />
            </div>
          ))}
        </div>

        {/* Bottom ornament */}
        <div className="mt-16 flex items-center gap-6">
          <div className="flex-1 h-px bg-white/8" />
          <span className="text-gold/40 text-xs">✦</span>
          <div className="flex-1 h-px bg-white/8" />
        </div>
      </div>
    </section>
  )
}

