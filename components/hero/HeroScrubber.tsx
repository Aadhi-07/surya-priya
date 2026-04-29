'use client'

import { useRef, useEffect } from 'react'
import { useFrameScrubber } from '@/hooks/useFrameScrubber'
import HeroOverlay from './HeroOverlay'
import LoadingScreen from './LoadingScreen'

// #10 — Gold line wipe that triggers once scroll approaches the end
function HeroTransitionLine({ progress }: { progress: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const firedRef = useRef(false)

  useEffect(() => {
    if (progress >= 0.97 && !firedRef.current && ref.current) {
      firedRef.current = true
      ref.current.classList.add('animate')
    }
  }, [progress])

  return <div ref={ref} className="hero-transition-line" aria-hidden="true" />
}

export default function HeroScrubber() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)

  const { progress, loadProgress, isReady, useVideoFallback } = useFrameScrubber(
    sectionRef,
    canvasRef,
    wrapperRef,
    spotlightRef
  )

  return (
    <>
      <LoadingScreen loadProgress={loadProgress} />

      {/* ── Single scroll-scrubber section — works on all screen sizes ── */}
      <section
        ref={sectionRef}
        id="hero"
        className="relative h-[500vh]"
        aria-label="Hero invitation opening animation — scroll to open or use arrow keys"
        tabIndex={0}
      >
        {/* Sticky viewport — stays pinned while the 500vh section scrolls */}
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-bg flex items-center justify-center">

          {/* Video fallback when frames stall on slow connections */}
          {useVideoFallback && (
            <video
              src="/invitation.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              aria-hidden="true"
            />
          )}

          {/* Cursor spotlight (desktop only — no mouse on mobile, so no-op) */}
          <div
            ref={spotlightRef}
            className="absolute inset-0 pointer-events-none z-10 hidden md:block"
            aria-hidden="true"
          />

          {/* Canvas — radial vignette mask + gentle bob */}
          <div
            ref={wrapperRef}
            className="canvas-wrapper relative w-full h-full"
            style={{
              maskImage: 'radial-gradient(ellipse 68% 75% at 50% 50%, #000 20%, transparent 90%)',
              WebkitMaskImage: 'radial-gradient(ellipse 68% 75% at 50% 50%, #000 20%, transparent 90%)',
              display: useVideoFallback ? 'none' : undefined,
            }}
          >
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
              aria-label="Invitation opening animation"
            />
          </div>

          {/* Card-content overlay */}
          <HeroOverlay progress={progress} />

          {/* Gold wipe transition line */}
          <HeroTransitionLine progress={progress} />

          {/* Left vertical rail — desktop only */}
          <div
            className="absolute left-4 top-1/2 z-20 select-none pointer-events-none hidden md:block"
            style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%) rotate(180deg)' }}
          >
            <span className="font-mono text-[9px] tracking-[0.5em] text-ink/20 uppercase">
              Save the Date
            </span>
          </div>

          {/* Right vertical rail — desktop only */}
          <div
            className="absolute right-4 top-1/2 z-20 select-none pointer-events-none hidden md:block"
            style={{ writingMode: 'vertical-rl' }}
          >
            <span className="font-mono text-[9px] tracking-[0.4em] text-ink/20 uppercase">
              Eternal · Moments · 2026
            </span>
          </div>

          {/* Keyboard hint — desktop only */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none select-none hidden md:block">
            <p className="font-mono text-[7px] tracking-[0.4em] text-ink/15 uppercase">
              ↑ ↓ Arrow keys · Shift for fast-forward
            </p>
          </div>

        </div>
      </section>
    </>
  )
}
