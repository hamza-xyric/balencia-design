'use client'

import { useState } from 'react'
import { Check, Star, X } from 'lucide-react'
import { Button } from '@/components/design-system/Button'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { SiaAvatarMark } from '@/components/screens/SIACoachingNote'
import { appRating } from '@/data/mock'

// Screen 69 of 78: App rating
// Spec: /Users/hamza/yHealth/app_design 3/69-app-rating.md

const feedbackLimit = 200
const minimumFeedbackCharacters = 10

function RatingStars({ rating, setRating }: { rating: number; setRating: (rating: number) => void }) {
  return (
    <div className="mt-6 flex justify-center gap-2" role="radiogroup" aria-label="Rate Balencia">
      {Array.from({ length: 5 }).map((_, index) => {
        const value = index + 1
        const active = value <= rating
        return (
          <button key={value} type="button" role="radio" aria-checked={value === rating} aria-label={`Rate ${value} out of 5 stars`} onClick={() => setRating(value)} className="flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-[var(--dur-fast)] active:scale-95">
            <Star
              size={32}
              strokeWidth={1.8}
              className={active ? 'fill-brand-orange text-brand-orange' : 'text-white/25'}
            />
          </button>
        )
      })}
    </div>
  )
}

function ResolvedRatingState({ title, body }: { title: string; body: string }) {
  return (
    <PhoneFrame>
      <ScreenShell showTabBar={false}>
        <main className="flex min-h-full items-center justify-center bg-ink-900 px-6 text-center">
          <section className="rounded-lg border border-white/[0.08] bg-ink-brown-800 p-5">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-forest-green/15 text-forest-green">
              <Check size={20} />
            </div>
            <h1 className="mt-4 text-[18px] font-semibold leading-6 text-white">{title}</h1>
            <p className="mt-2 text-caption leading-[18px] text-white/55">{body}</p>
          </section>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}

export default function AppRatingScreen() {
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [status, setStatus] = useState<'open' | 'native' | 'feedback' | 'cooldown' | 'confirmSuppress' | 'suppressed' | 'closed' | 'submitted'>('open')
  const feedbackCharacterCount = feedback.trim().length
  const canSubmitFeedback = feedbackCharacterCount >= minimumFeedbackCharacters
  const isSuppressing = status === 'confirmSuppress'
  const title = status === 'native' ? 'Share the good moment?' : status === 'feedback' ? 'What could be better?' : isSuppressing ? 'Stop rating prompts?' : appRating.prompt
  const subtitle = status === 'native'
    ? 'Only continue if you want to open the App Store review prompt.'
    : status === 'feedback'
      ? 'Your note stays private with Balencia and helps us improve.'
      : isSuppressing
        ? 'We will stop asking on this account. You can re-enable prompts in Settings.'
        : appRating.subtitle

  if (status === 'closed') {
    return <ResolvedRatingState title="Rating prompt dismissed" body="We will wait for another meaningful milestone before asking again." />
  }

  if (status === 'cooldown') {
    return <ResolvedRatingState title="Paused for 30 days" body="Thanks for letting us know. Balencia will not show another rating prompt during the cooldown." />
  }

  if (status === 'suppressed') {
    return <ResolvedRatingState title="Rating prompts suppressed" body="We will stop asking on this account. You can re-enable prompts in Settings." />
  }

  if (status === 'submitted') {
    return <ResolvedRatingState title="Feedback sent" body="Thanks for the private note. It helps us make Balencia feel better without pushing you to review." />
  }

  return (
    <PhoneFrame>
      <ScreenShell showTabBar={false}>
        <main className="relative min-h-full overflow-hidden bg-ink-900">
          <div className="absolute inset-0 opacity-35">
            <div className="mx-4 mt-8 h-32 rounded-xl border border-white/[0.06] bg-ink-brown-800" />
            <div className="mx-4 mt-4 h-40 rounded-xl border border-white/[0.06] bg-ink-brown-800" />
          </div>
          <div className="absolute inset-0 bg-ink-900/60" />
          <button type="button" aria-label="Dismiss rating prompt" onClick={() => setStatus('closed')} className="absolute inset-0 z-10 cursor-default" />

          <section className="absolute inset-x-0 bottom-0 z-40 rounded-t-xl border border-white/[0.06] bg-ink-900 px-6 pb-6 pt-3 shadow-3 animate-fade-up">
            <button type="button" aria-label="Dismiss rating prompt" onClick={() => setStatus('closed')} className="mx-auto flex h-11 w-11 items-start justify-center pt-2">
              <span className="h-1 w-9 rounded-pill bg-white/20" />
            </button>
            <div className="mt-6 flex justify-center">
              <SiaAvatarMark size="md" />
            </div>

            <h1 className="mt-4 text-center text-[22px] font-bold leading-7 text-white">{title}</h1>
            <p className="mt-2 text-center text-[15px] leading-[22px] text-white/60">{subtitle}</p>
            {!isSuppressing && (
              <>
                <RatingStars rating={rating} setRating={(value) => {
                  setRating(value)
                  setStatus(value >= 4 ? 'native' : 'feedback')
                }} />

                {rating === 0 && (
                  <p className="mt-5 text-center text-caption leading-[18px] text-white/45">Choose a rating to continue. No App Store prompt opens until you ask for it.</p>
                )}
              </>
            )}

            {status === 'native' && (
              <div className="mt-7 rounded-lg border border-white/[0.06] bg-ink-brown-800 p-4 text-center">
                <h2 className="text-h3 font-semibold leading-[22px] text-white">Open App Store review</h2>
                <p className="mx-auto mt-2 max-w-[250px] text-caption leading-[18px] text-white/60">{appRating.positiveBody}</p>
                <Button className="mt-4" fullWidth onClick={() => setStatus('closed')}>Rate on App Store</Button>
              </div>
            )}

            {status === 'feedback' && (
              <div className="mt-7 rounded-lg border border-white/[0.06] bg-ink-brown-800 p-4">
                <label className="text-caption font-semibold leading-[18px] text-white/60" htmlFor="rating-feedback">Private feedback</label>
                <textarea id="rating-feedback" value={feedback} maxLength={feedbackLimit} aria-describedby="rating-feedback-counter" onChange={(event) => setFeedback(event.target.value)} className="mt-2 min-h-24 w-full resize-none rounded-md border border-white/[0.08] bg-ink-900 p-3 text-[14px] leading-5 text-white outline-none placeholder:text-white/30" placeholder="Tell us what felt off." />
                <div id="rating-feedback-counter" className="mt-2 flex items-center justify-between text-small leading-[14px] text-white/35">
                  <span>Minimum {minimumFeedbackCharacters} characters</span>
                  <span>{feedback.length}/{feedbackLimit}</span>
                </div>
                <Button className="mt-3" fullWidth disabled={!canSubmitFeedback} onClick={() => setStatus('submitted')}>Submit feedback</Button>
              </div>
            )}

            {status === 'confirmSuppress' && (
              <div className="mt-7 rounded-lg border border-brand-orange/25 bg-brand-orange/10 p-4 text-center" aria-live="polite">
                <Button fullWidth onClick={() => setStatus('suppressed')} leftIcon={<Check size={16} />}>Confirm suppression</Button>
                <button type="button" onClick={() => setStatus('closed')} className="mt-3 h-11 w-full text-[14px] leading-5 text-white/55">Dismiss for now</button>
              </div>
            )}

            {!isSuppressing && (
              <>
                <button type="button" onClick={() => setStatus('cooldown')} className="mt-4 h-11 w-full text-[14px] leading-5 text-white/50">Not now</button>
                <button type="button" onClick={() => setStatus('confirmSuppress')} className="h-11 w-full text-small leading-[14px] text-white/35">
                  <X size={12} className="mr-1 inline" /> Do not ask again
                </button>
              </>
            )}
          </section>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
