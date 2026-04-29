'use client'

import RevealController from '@/components/ui/RevealController'
import { content } from '@/lib/content'

const stats = [
  { label: 'The Date', value: content.date.display },
  { label: 'The Venue', value: content.venue.name },
  { label: 'The City', value: content.venue.city },
  { label: 'The Time', value: content.time },
]

export default function Prologue() {
  const firstLetter = content.prologue[0]
  const restOfParagraph = content.prologue.slice(1)

  return (
    <section
      id="prologue"
      className="relative py-40 px-6 bg-bg overflow-hidden"
      aria-labelledby="prologue-heading"
    >
      {/* Vellum texture line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/8" />

      <div className="max-w-3xl mx-auto">
        {/* Eyebrow */}
        <RevealController reveal="fade-in">
          <p className="font-mono text-[9px] tracking-[0.6em] text-ink/30 uppercase text-center mb-16">
            The Story
          </p>
        </RevealController>

        {/* Drop-cap paragraph */}
        <RevealController reveal="fade-up" delay={100}>
          <p
            id="prologue-heading"
            className="font-cormorant text-ink/80 text-[20px] leading-[1.9] max-w-[68ch] mx-auto text-center"
          >
            <span
              className="float-left font-bodoni italic text-gold leading-[0.8] mr-2"
              style={{ fontSize: 'clamp(72px, 10vw, 120px)' }}
              aria-hidden="true"
            >
              {firstLetter}
            </span>
            {restOfParagraph}
          </p>
        </RevealController>

        {/* Clearfix */}
        <div className="clear-both" />

        {/* Hairline divider */}
        <div className="my-24 flex items-center gap-6">
          <div className="flex-1 h-px bg-white/8" />
          <span className="text-gold text-lg">✦</span>
          <div className="flex-1 h-px bg-white/8" />
        </div>

        {/* 4-column stat grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <RevealController key={stat.label} reveal="fade-up" delay={i * 80}>
              <div className="border-t border-white/8 pt-5">
                <p className="font-mono text-[8px] tracking-[0.4em] text-ink/40 uppercase mb-3">
                  {stat.label}
                </p>
                <p className="font-cormorant font-semibold text-[22px] text-ink leading-tight">
                  {stat.value}
                </p>
              </div>
            </RevealController>
          ))}
        </div>
      </div>
    </section>
  )
}
