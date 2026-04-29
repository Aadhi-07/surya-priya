import dynamic from 'next/dynamic'
import Prologue from '@/components/sections/Prologue'
import Schedule from '@/components/sections/Schedule'
import Location from '@/components/sections/Location'
import Quote from '@/components/sections/Quote'
import NavBar from '@/components/ui/NavBar'

// Client-only — no SSR for canvas/timer
const HeroScrubber = dynamic(() => import('@/components/hero/HeroScrubber'), { ssr: false })
const CountdownTimer = dynamic(() => import('@/components/sections/CountdownTimer'), { ssr: false })
const RosePetals = dynamic(() => import('@/components/effects/RosePetals'), { ssr: false })

export default function Page() {
  return (
    <>
      {/* 3D gold rose petals — fixed behind everything (z-index: 10) */}
      <RosePetals count={55} />

      <main>
        {/* Sticky Nav */}
        <NavBar />

        {/* 01 — Hero Scrubber (500vh scroll animation) */}
        <HeroScrubber />

        {/* 02 — Prologue / Story */}
        <Prologue />

        {/* 03 — Schedule: "Our Special Day's Schedule" */}
        <Schedule />

        {/* 04 — Location: cream bg, centered venue photo */}
        <Location />

        {/* 05 — Countdown: dark floral */}
        <CountdownTimer />

        {/* 06 — Quote */}
        <Quote />

        {/* Footer */}
        <footer className="relative bg-bg border-t border-white/8 py-20 text-center px-6 overflow-hidden">
          {/* #7 Monogram watermark */}
          <div className="footer-monogram" aria-hidden="true">S &amp; P</div>

          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-px bg-gold/20" />
              <span className="text-gold text-xl">✦</span>
              <div className="w-16 h-px bg-gold/20" />
            </div>
            <p className="font-bodoni italic text-ink/50 mb-2" style={{ fontSize: 'clamp(22px, 3vw, 32px)' }}>
              With love, always.
            </p>
            <p className="font-cormorant italic text-ink/25 text-lg mb-6">
              Surya &amp; Priyaa · 31 August 2026
            </p>
            <p className="font-mono text-[8px] tracking-[0.5em] text-ink/15 uppercase">
              Made with love
            </p>
          </div>
        </footer>
      </main>
    </>
  )
}
