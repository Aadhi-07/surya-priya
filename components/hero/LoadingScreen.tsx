'use client'

import { useEffect, useState } from 'react'

interface Props {
  loadProgress: number
}

export default function LoadingScreen({ loadProgress }: Props) {
  const [visible, setVisible] = useState(true)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (loadProgress >= 80 && !exiting) {
      setExiting(true)
      const t = setTimeout(() => setVisible(false), 1200)
      return () => clearTimeout(t)
    }
  }, [loadProgress, exiting])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 bg-bg z-[10000] flex flex-col items-center justify-center gap-8"
      style={{
        transition: exiting ? 'opacity 1.2s ease-in-out' : undefined,
        opacity: exiting ? 0 : 1,
        pointerEvents: exiting ? 'none' : 'auto',
      }}
      aria-live="polite"
      role="status"
    >
      {/* Decorative gold lines */}
      <div className="flex items-center gap-4 mb-2">
        <div className="w-16 h-px bg-gold/30" />
        <span className="font-mono text-gold text-[10px] tracking-[0.6em] uppercase">Invi</span>
        <div className="w-16 h-px bg-gold/30" />
      </div>

      <p className="font-mono text-[9px] tracking-[0.5em] text-ink/30 uppercase">
        Preparing your invitation
      </p>

      {/* Big percentage */}
      <p className="font-bodoni italic text-5xl text-ink leading-none">
        {Math.round(loadProgress)}
        <span className="text-gold text-3xl ml-1">%</span>
      </p>

      {/* Hairline progress bar */}
      <div className="w-52 h-px bg-white/8 relative overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-gold"
          style={{
            width: `${loadProgress}%`,
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      {/* Tagline */}
      <p className="font-cormorant italic text-ink/20 text-sm tracking-widest">
        {loadProgress < 40
          ? 'Setting the stage…'
          : loadProgress < 70
          ? 'Almost ready…'
          : 'Opening the envelope…'}
      </p>
    </div>
  )
}
