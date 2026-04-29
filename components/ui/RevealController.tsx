'use client'

import { useEffect, useRef } from 'react'

interface Props {
  children: React.ReactNode
  reveal?: 'fade-up' | 'fade-in' | 'scale-in'
  delay?: number
  className?: string
  tag?: keyof JSX.IntrinsicElements
}

export default function RevealController({
  children,
  reveal = 'fade-up',
  delay = 0,
  className = '',
  tag: Tag = 'div',
}: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.classList.add('is-revealed')
            }, delay)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <Tag
      ref={ref as any}
      data-reveal={reveal}
      className={`reveal-el ${className}`}
    >
      {children}
    </Tag>
  )
}
