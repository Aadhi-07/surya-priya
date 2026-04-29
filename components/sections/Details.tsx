'use client'

import { content } from '@/lib/content'
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
            title={content.ceremony.label}
            label1={content.time}
            label2={`Dress Code · ${content.ceremony.dresscode}`}
            bobDuration="7s"
          />

          <FloatingInvite
            frameNum={120}
            title={content.banquet.label}
            label1={content.banquet.menuNote}
            label2={content.banquet.note}
            bobDuration="9s"
          />

          <FloatingInvite
            frameNum={240}
            title={content.afterparty.label}
            label1={content.afterparty.time}
            label2={content.afterparty.venueNote}
            bobDuration="11s"
          />
        </div>
      </div>
    </section>
  )
}

