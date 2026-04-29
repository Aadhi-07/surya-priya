'use client'

import React, { useEffect, useRef, forwardRef } from 'react'

export interface RevealControllerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  reveal?: 'fade-up' | 'fade-in' | 'scale-in'
  delay?: number
  className?: string
  tag?: React.ElementType
}

const RevealController = forwardRef<HTMLElement, RevealControllerProps>(
  (
    {
      children,
      reveal = 'fade-up',
      delay = 0,
      className = '',
      tag: Tag = 'div',
      ...props
    },
    ref
  ) => {
    const localRef = useRef<HTMLElement>(null)

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

    const setRef = React.useCallback(
      (node: HTMLElement | null) => {
        // Assign to internal ref
        if (localRef) {
          ;(localRef as React.MutableRefObject<HTMLElement | null>).current = node
        }
        // Assign to forwarded ref
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          ;(ref as React.MutableRefObject<HTMLElement | null>).current = node
        }
      },
      [ref]
    )

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
)

RevealController.displayName = 'RevealController'

export default RevealController
