'use client'

import React, { ElementType } from 'react'

type Props<T extends ElementType> = {
  text: string
  as?: T
  delay?: number
  stagger?: number
  className?: string
} & React.ComponentPropsWithoutRef<T>

export default function SplitText<T extends ElementType = 'p'>({
  text,
  as,
  delay = 0,
  stagger = 35,
  className = '',
  ...props
}: Props<T>) {
  const words = text.split(' ')
  const Tag = as || 'p'

  return (
    <Tag className={`split-text ${className}`} aria-label={text} {...props}>
      {words.map((word, i) => (
        <span
          key={i}
          className="word-wrapper"
          aria-hidden="true"
          style={{ transitionDelay: `${delay + i * stagger}ms` }}
        >
          <span className="word-inner">{word}</span>
          {i < words.length - 1 ? '\u00a0' : ''}
        </span>
      ))}
    </Tag>
  )
}
