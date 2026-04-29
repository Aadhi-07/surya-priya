'use client'

import { useState } from 'react'

export default function RSVPButton() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [guests, setGuests] = useState('1')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, guests: Number(guests) }),
      })
      if (res.ok) {
        setStatus('done')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      {/* RSVP pill button */}
      <button
        id="rsvp-button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-bg font-mono text-[9px] tracking-[0.3em] uppercase shadow-lg hover:bg-gold-dim transition-colors duration-200"
        aria-label="Open RSVP form"
      >
        {/* Pulsing live dot */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
        </span>
        RSVP
      </button>

      {/* Inline modal */}
      {open && (
        <div
          className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="RSVP Form"
        >
          <div className="w-full max-w-md bg-bg border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <p className="font-mono text-[9px] tracking-[0.5em] text-gold uppercase">
                Your Invitation · RSVP
              </p>
              <button
                onClick={() => setOpen(false)}
                className="text-ink/40 hover:text-ink transition-colors"
                aria-label="Close RSVP form"
              >
                ✕
              </button>
            </div>

            {status === 'done' ? (
              <div className="text-center py-8">
                <p className="font-bodoni italic text-3xl text-ink mb-3">We&apos;ll see you there.</p>
                <p className="font-mono text-[10px] tracking-[0.3em] text-ink/40 uppercase">
                  RSVP confirmed — check your email
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="rsvp-name" className="block font-mono text-[9px] tracking-[0.3em] text-ink/40 uppercase mb-2">
                    Your Name
                  </label>
                  <input
                    id="rsvp-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border-b border-white/15 pb-2 text-ink font-cormorant text-lg focus:outline-none focus:border-gold transition-colors placeholder:text-ink/20"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label htmlFor="rsvp-email" className="block font-mono text-[9px] tracking-[0.3em] text-ink/40 uppercase mb-2">
                    Email
                  </label>
                  <input
                    id="rsvp-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-white/15 pb-2 text-ink font-cormorant text-lg focus:outline-none focus:border-gold transition-colors placeholder:text-ink/20"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="rsvp-guests" className="block font-mono text-[9px] tracking-[0.3em] text-ink/40 uppercase mb-2">
                    Guests attending
                  </label>
                  <select
                    id="rsvp-guests"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-bg border-b border-white/15 pb-2 text-ink font-cormorant text-lg focus:outline-none focus:border-gold transition-colors"
                  >
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n} guest{n > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {status === 'error' && (
                  <p className="font-mono text-[9px] text-red-400 tracking-wider">
                    Something went wrong — please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full mt-4 bg-gold text-bg font-mono text-[10px] tracking-[0.4em] uppercase py-3 rounded-full hover:bg-gold-dim transition-colors disabled:opacity-50"
                >
                  {status === 'submitting' ? 'Sending…' : 'Confirm Attendance'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
