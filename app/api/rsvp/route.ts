import { NextResponse } from 'next/server'

interface RSVPPayload {
  name: string
  email: string
  guests: number
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body: RSVPPayload = await request.json()

    if (!body.name || !body.email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    // ── Option A: Log to console (works immediately, no external deps) ───────
    console.log('[RSVP]', {
      name: body.name,
      email: body.email,
      guests: body.guests,
      timestamp: new Date().toISOString(),
    })

    // ── Option B: POST to Google Sheets webhook ──────────────────────────────
    // Uncomment and replace WEBHOOK_URL with your Apps Script web app URL:
    //
    // const WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL
    // if (WEBHOOK_URL) {
    //   await fetch(WEBHOOK_URL, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(body),
    //   })
    // }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
