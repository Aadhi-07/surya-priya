'use client'

import { getFrameUrl } from '@/lib/manifest'
import Image from 'next/image'

interface Props {
  frameNum: number  // 1-indexed
  title: string
  label1: string
  label2: string
  bobDuration?: string
}

export default function FloatingInvite({ frameNum, title, label1, label2, bobDuration = '7s' }: Props) {
  const url = getFrameUrl(frameNum - 1)  // getFrameUrl is 0-indexed

  return (
    <div
      className="relative rounded-full overflow-hidden cursor-pointer group"
      style={{
        width: 'clamp(280px, 28vw, 380px)',
        height: 'clamp(280px, 28vw, 380px)',
        animation: `bob ${bobDuration} ease-in-out infinite`,
        transition: 'box-shadow 0.4s ease, transform 0.4s ease',
      }}
    >
      {/* Frame image background */}
      <Image
        src={url}
        alt={title}
        fill
        className="object-cover"
        sizes="380px"
        priority={frameNum === 1}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 backdrop-blur-[2px] bg-black/50 flex flex-col items-center justify-center gap-4 group-hover:bg-black/35 transition-colors duration-400"
        style={{
          boxShadow: 'inset 0 0 60px rgba(0,0,0,0.4)',
        }}
      >
        {/* Gold hairline top */}
        <div className="w-10 h-px bg-gold/50" />

        <p className="font-bodoni italic text-ink text-center" style={{ fontSize: 'clamp(18px, 2.5vw, 24px)' }}>
          {title}
        </p>

        <div className="flex flex-col items-center gap-1">
          <p className="font-mono text-[10px] tracking-[0.35em] text-ink/60 uppercase text-center">
            {label1}
          </p>
          <p className="font-mono text-[9px] tracking-[0.25em] text-gold/70 uppercase text-center">
            {label2}
          </p>
        </div>

        {/* Gold hairline bottom */}
        <div className="w-10 h-px bg-gold/50" />
      </div>

      {/* Hover glow ring */}
      <div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ boxShadow: '0 0 40px rgba(212,175,55,0.2), 0 0 80px rgba(212,175,55,0.08)' }}
      />
    </div>
  )
}
