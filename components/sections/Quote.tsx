'use client'

import { useRef, useEffect, useCallback } from 'react'
import RevealController from '@/components/ui/RevealController'
import { content } from '@/lib/content'

// #6 Fix: wrap each SplitText word directly with IntersectionObserver
// instead of nesting inside a RevealController that misses the inner spans
function AnimatedQuoteLine({ text, baseDelay }: { text: string; baseDelay: number }) {
  const ref = useRef<HTMLParagraphElement>(null)

  const reveal = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.querySelectorAll<HTMLSpanElement>('.word-inner').forEach((span, i) => {
      span.style.transitionDelay = `${baseDelay + i * 35}ms`
      span.style.transform = 'translateY(0)'
    })
  }, [baseDelay])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { reveal(); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [reveal])

  const words = text.split(' ')

  return (
    <p
      ref={ref}
      className="font-cormorant text-ink/80 block text-center"
      style={{ fontSize: 'clamp(26px, 3.5vw, 48px)', fontStyle: 'italic', fontWeight: 300, lineHeight: 1.4 }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="word-wrapper" aria-hidden="true">
          <span
            className="word-inner"
            style={{ transform: 'translateY(110%)', transition: 'transform 0.75s cubic-bezier(0.16,1,0.3,1)' }}
          >
            {word}
          </span>
          {i < words.length - 1 ? '\u00a0' : ''}
        </span>
      ))}
    </p>
  )
}

export default function Quote() {
  const lines = content.quote.text.split('\n')

  return (
    <section
      id="quote"
      className="relative py-48 px-6 bg-bg flex flex-col items-center justify-center overflow-hidden"
      aria-label="Wedding quote"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-white/8" />

      {/* Top gold hairline */}
      <RevealController reveal="scale-in">
        <div className="w-16 h-px bg-gold/40 mb-16" />
      </RevealController>

      <div className="max-w-[22em] text-center space-y-1">
        {/* Lines — each has its own IntersectionObserver (#6 fix) */}
        {lines.map((line, i) => (
          <AnimatedQuoteLine
            key={i}
            text={line}
            baseDelay={i * 350}
          />
        ))}

        {/* Attribution */}
        <RevealController reveal="fade-in" delay={1400} className="block pt-10">
          <p className="font-mono text-[10px] tracking-[0.3em] text-ink/40 uppercase">
            {content.quote.attribution}
          </p>
        </RevealController>
      </div>

      {/* Bottom gold hairline */}
      <RevealController reveal="scale-in" delay={800}>
        <div className="w-16 h-px bg-gold/40 mt-16" />
      </RevealController>
    </section>
  )
}
