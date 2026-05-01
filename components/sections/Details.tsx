'use client'

import { content } from '@/lib/content'
import { EVENT_SCHEDULE, VENUE_NAME } from '@/lib/constants'
import FloatingInvite from '@/components/ui/FloatingInvite'

export default function Details() {
  return (
    <section
      id="details"
      className="relative py-40 px-6 bg-bg overflow-hidden"
      aria-labelledby="details-heading"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-white/8" />

      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-[9px] tracking-[0.6em] text-ink/30 uppercase text-center mb-4">
          The Details
        </p>

        <h2
          id="details-heading"
          className="font-bodoni italic text-center text-ink mb-20"
          style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
        >
          An Evening of Celebration
        </h2>

        {/* Three floating orbs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center justify-items-center">
          <FloatingInvite
            frameNum={1}
            title={EVENT_SCHEDULE[0].label}
            label1={EVENT_SCHEDULE[0].sublabel}
            label2={`${EVENT_SCHEDULE[0].time} · Black Tie`}
            bobDuration="7s"
          />

          <FloatingInvite
            frameNum={115}
            title={EVENT_SCHEDULE[1].label}
            label1={EVENT_SCHEDULE[1].sublabel}
            label2={`${EVENT_SCHEDULE[1].time} · ${VENUE_NAME}`}
            bobDuration="9s"
          />

          <FloatingInvite
            frameNum={230}
            title="The Afterparty"
            label1="Champagne & Dancing"
            label2="Post Reception"
            bobDuration="11s"
          />
        </div>
      </div>
    </section>
  )
}

