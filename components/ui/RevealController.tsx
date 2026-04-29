'use client'

import React, {
  useEffect,
  useRef,
  forwardRef,
  ElementType,
} from 'react'

export type RevealControllerProps<T extends ElementType> = {
  children: React.ReactNode
  reveal?: 'fade-up' | 'fade-in' | 'scale-in'
  delay?: number
  className?: string
  as?: T
} & React.ComponentPropsWithoutRef<T>

const RevealControllerInner = <T extends ElementType = 'div'>(
  {
    children,
    reveal = 'fade-up',
    delay = 0,
    className = '',
    as,
    ...props
  }: RevealControllerProps<T>,
  ref: React.ForwardedRef<Element>
) => {
  const Tag = as || 'div'
  const localRef = useRef<Element | null>(null)

  useEffect(() => {
    const el = localRef.current
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

  const setRef = (node: Element | null) => {
    localRef.current = node

    if (typeof ref === 'function') {
      ref(node)
    } else if (ref) {
      ;(ref as React.MutableRefObject<Element | null>).current = node
    }
  }

  return (
    <Tag
      {...props}
      ref={setRef}
      data-reveal={reveal}
      className={className ? `reveal-el ${className}` : 'reveal-el'}
    >
      {children}
    </Tag>
  )
}

const RevealController = forwardRef(RevealControllerInner) as <T extends ElementType = 'div'>(
  props: RevealControllerProps<T> & { ref?: React.ForwardedRef<Element> }
) => React.ReactElement | null

;(RevealController as any).displayName = 'RevealController'

export default RevealController