'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { manifest, getFrameUrl } from '@/lib/manifest'

const TOTAL = manifest.total
const DPR_CAP = 2
const STALL_TIMEOUT_MS = 8000   // #2: if < 30% loaded after 8s → fallback
const STALL_THRESHOLD = 30       // percent

interface ScrubberState {
  progress: number
  loadProgress: number
  isReady: boolean
  useVideoFallback: boolean
}

export function useFrameScrubber(
  sectionRef: React.RefObject<HTMLElement | null>,
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  wrapperRef: React.RefObject<HTMLDivElement | null>,
  spotlightRef: React.RefObject<HTMLDivElement | null>
) {
  const [state, setState] = useState<ScrubberState>({
    progress: 0,
    loadProgress: 0,
    isReady: false,
    useVideoFallback: false,
  })

  const imagesRef = useRef<HTMLImageElement[]>([])
  const progressRef = useRef(0)
  const lastPRef = useRef(-1)
  const rafRef = useRef<number | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const cursorRef = useRef({ x: 0, y: 0 })
  const loadedRef = useRef(0)

  // ── Frame Preloading ──────────────────────────────────────────────────────
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(TOTAL)
    imagesRef.current = images

    const onFrameLoad = () => {
      loadedRef.current++
      const pct = (loadedRef.current / TOTAL) * 100
      setState(prev => ({
        ...prev,
        loadProgress: pct,
        isReady: pct >= 80,
      }))
    }

    // Eager: first 20 frames
    for (let i = 0; i < Math.min(20, TOTAL); i++) {
      const img = new Image()
      img.src = getFrameUrl(i)
      img.onload = onFrameLoad
      img.onerror = onFrameLoad
      images[i] = img
    }

    // Lazy: rest in idle chunks
    const loadRest = () => {
      for (let i = 20; i < TOTAL; i++) {
        const img = new Image()
        img.src = getFrameUrl(i)
        img.onload = onFrameLoad
        img.onerror = onFrameLoad
        images[i] = img
      }
    }

    if ('requestIdleCallback' in window) {
      ;(window as Window & typeof globalThis).requestIdleCallback(loadRest)
    } else {
      setTimeout(loadRest, 200)
    }

    // ── #2: Stall detection — switch to video fallback if loading too slow ──
    const stallTimer = setTimeout(() => {
      if (loadedRef.current / TOTAL * 100 < STALL_THRESHOLD) {
        setState(prev => ({ ...prev, useVideoFallback: true, isReady: true }))
      }
    }, STALL_TIMEOUT_MS)

    return () => clearTimeout(stallTimer)
  }, [])

  // ── Canvas Draw ───────────────────────────────────────────────────────────
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const p = progressRef.current
    if (Math.abs(p - lastPRef.current) < 0.001) return
    lastPRef.current = p

    const idx = Math.round(p * (TOTAL - 1))
    const img = imagesRef.current[idx]
    if (!img?.complete || !img.naturalWidth) return

    const dpr = Math.min(window.devicePixelRatio, DPR_CAP)
    const cw = canvas.width / dpr
    const ch = canvas.height / dpr

    // Portrait (mobile) → COVER + 1.18× zoom so card fills the screen
    // Landscape (desktop) → CONTAIN so the full cinematic frame is visible
    const isPortrait = ch > cw
    const scale = isPortrait
      ? Math.max(cw / img.naturalWidth, ch / img.naturalHeight) * 1.18
      : Math.min(cw / img.naturalWidth, ch / img.naturalHeight)

    // Center the (potentially cropped) frame
    const dx = (cw - img.naturalWidth  * scale) / 2
    const dy = (ch - img.naturalHeight * scale) / 2

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save()
    ctx.scale(dpr, dpr)
    ctx.drawImage(img, dx, dy, img.naturalWidth * scale, img.naturalHeight * scale)
    ctx.restore()
  }, [canvasRef])

  // ── rAF Loop ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const loop = (t: number) => {
      draw()

      if (wrapperRef.current) {
        const bob = Math.sin(t * 0.0007) * 6 + Math.sin(t * 0.00045) * 3
        wrapperRef.current.style.transform = `translateY(${bob}px)`
      }

      cursorRef.current.x += (mouseRef.current.x - cursorRef.current.x) * 0.07
      cursorRef.current.y += (mouseRef.current.y - cursorRef.current.y) * 0.07
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(320px at ${cursorRef.current.x}px ${cursorRef.current.y}px, rgba(247,231,206,0.04) 0%, transparent 70%)`
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
  }, [draw, wrapperRef, spotlightRef])

  // ── Scroll Listener ───────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const p = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)))
      progressRef.current = p
      document.documentElement.style.setProperty('--scroll-progress', String(p))
      setState(prev => ({ ...prev, progress: p }))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [sectionRef])

  // ── #11: Keyboard arrow key control ──────────────────────────────────────
  useEffect(() => {
    const STEP = 1 / (TOTAL - 1)   // one frame per key press
    const BIG_STEP = STEP * 10     // 10 frames per Shift+arrow

    const onKeyDown = (e: KeyboardEvent) => {
      // Only activate when hero is in viewport (scroll progress between 0 and 1)
      const p = progressRef.current
      if (p < 0 || p > 1) return
      // Only intercept arrow keys
      if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(e.key)) return

      e.preventDefault()

      const section = sectionRef.current
      if (!section) return

      const step = e.shiftKey ? BIG_STEP : STEP
      const direction = (e.key === 'ArrowDown' || e.key === 'ArrowRight') ? 1 : -1
      const newP = Math.max(0, Math.min(1, p + direction * step))

      // Convert progress to scroll position and jump there
      const scrollTarget = section.offsetTop + newP * (section.offsetHeight - window.innerHeight)
      window.scrollTo({ top: scrollTarget, behavior: 'instant' })
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [sectionRef])

  // ── Mouse Tracker ─────────────────────────────────────────────────────────
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  // ── Canvas Resize ─────────────────────────────────────────────────────────
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const dpr = Math.min(window.devicePixelRatio, DPR_CAP)
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      lastPRef.current = -1
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [canvasRef])

  return state
}
