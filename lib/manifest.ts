// lib/manifest.ts — typed loader for manifest.json
import manifestData from '@/public/frames/manifest.json'

export interface FrameManifest {
  total: number
  ext: string
  aspectRatio: string
}

export const manifest: FrameManifest = manifestData as FrameManifest

export function getFrameUrl(index: number): string {
  // index is 0-based
  const num = String(index + 1).padStart(4, '0')
  return `/frames/frame_${num}.${manifest.ext}`
}
