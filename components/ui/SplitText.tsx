'use client'

interface Props {
  text: string
  tag?: keyof JSX.IntrinsicElements
  delay?: number
  stagger?: number
  className?: string
}

export default function SplitText({
  text,
  tag: Tag = 'p',
  delay = 0,
  stagger = 35,
  className = '',
}: Props) {
  const words = text.split(' ')

  return (
    // @ts-expect-error dynamic tag
    <Tag className={`split-text ${className}`} aria-label={text}>
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
