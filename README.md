# Wedding Invitation — Cinematic Editorial Site

A scroll-scrubber wedding invitation site for Priya & Surya.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customisation

All content is in **`lib/content.ts`** — edit names, date, venue, quote there.

## Asset Pipeline

- 240 frames are in `public/frames/frame_0001.jpg` → `frame_0240.jpg`
- `public/frames/manifest.json` — source of truth for frame count

## Structure

```
app/
  layout.tsx       ← fonts, grain, SEO
  page.tsx         ← section composition
  globals.css      ← design tokens, animations
  api/rsvp/        ← POST handler
components/
  hero/            ← HeroScrubber, HeroOverlay, LoadingScreen
  sections/        ← Prologue, Details, Venue, Quote
  ui/              ← FloatingInvite, RevealController, SplitText, RSVPButton
hooks/
  useFrameScrubber.ts   ← all canvas/scroll logic
lib/
  content.ts       ← ALL copy lives here
  manifest.ts      ← typed frame manifest loader
public/
  frames/          ← 240 JPG frames + manifest.json
```
