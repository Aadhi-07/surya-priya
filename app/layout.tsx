import type { Metadata } from 'next'
import { Bodoni_Moda, Cormorant_Garamond, DM_Mono, Inter, Alex_Brush } from 'next/font/google'
import './globals.css'
import { content } from '@/lib/content'
import { VENUE_NAME } from '@/lib/constants'

// ── Font loading ─────────────────────────────────────────────────────────────
const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-bodoni',
  display: 'swap',
  adjustFontFallback: false,
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal'],
  variable: '--font-mono',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

const alexBrush = Alex_Brush({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-cursive',
  display: 'swap',
  adjustFontFallback: false,
})

// ── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: `${content.couple.partner1} & ${content.couple.partner2} — Wedding Invitation`,
  description: `You are cordially invited to the wedding of ${content.couple.partner1} and ${content.couple.partner2} on ${content.date.display} at ${VENUE_NAME}, Thanjavur.`,
  openGraph: {
    title: `${content.couple.partner1} & ${content.couple.partner2}`,
    description: `Wedding Invitation — ${content.date.display}`,
    type: 'website',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: `${content.couple.partner1} & ${content.couple.partner2} Wedding Invitation`,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${content.couple.partner1} & ${content.couple.partner2} — Wedding Invitation`,
    description: `${content.date.display} · Thanjavur`,
    images: ['/og-image.png'],
  },
  icons: { icon: '/frames/og-image.jpg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodoni.variable} ${cormorant.variable} ${dmMono.variable} ${inter.variable} ${alexBrush.variable}`}>
      <head>
        {/* Preload first frame for instant above-the-fold display */}
        <link rel="preload" as="image" href="/frames/frame_0001.jpg" />
      </head>
      <body className="bg-bg text-ink antialiased overflow-x-hidden">
        {/* SVG Film Grain Overlay */}
        <div
          className="grain-overlay"
          aria-hidden="true"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <filter id="grain-filter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.65"
                numOctaves="3"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grain-filter)" />
          </svg>
        </div>

        {children}
      </body>
    </html>
  )
}
