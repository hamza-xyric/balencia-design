'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, LockKeyhole, MessageSquareText, ShieldCheck, Star, Store, X } from 'lucide-react'
import { CIAPresenceOrb, GlassCard, HifiShell, TopBar } from '@/components/hifi/kit'
import { E1Modal } from '../intelligence/E1Modal'
import { I1TextScaleScope } from './I1TextScaleScope'

const STATES = [
  'default-neutral',
  'rating-1',
  'rating-3',
  'rating-5',
  'choice-neutral',
  'public-review-confirm',
  'private-feedback',
  'feedback-ready',
  'feedback-error',
  'feedback-success',
  'not-now',
  'suppressed',
  'data-controls',
] as const

type Fixture = (typeof STATES)[number]

const RATING_DATA_CONTROLS = [
  'Category',
  'Source',
  'Scope',
  'Audience',
  'Freshness',
  'Confidence',
  'Retention',
  'Export',
  'Revoke',
  'Delete',
  'Correction',
] as const

const MIN_FEEDBACK_LENGTH = 20
const READY_FEEDBACK = 'The mission timeline was clear, but the next action was hard to find.'
const FOCUS_CLASS =
  'focus-ring rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900'
const PRIMARY_CLASS = `${FOCUS_CLASS} min-h-[52px] bg-cta-ember px-4 text-[14px] font-semibold text-paper-100 transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none`
const SECONDARY_CLASS = `${FOCUS_CLASS} min-h-[52px] border border-white/15 bg-white/[0.06] px-4 text-[14px] font-semibold text-paper-100/85 transition-colors hover:bg-white/[0.1] motion-reduce:transition-none`
const MODAL_CLASS =
  '!max-h-[88%] !bg-ink-900 border border-white/15 shadow-2xl outline-none focus-visible:ring-2 focus-visible:ring-brand-orange'

function queryFixture(): Fixture {
  const value = new URLSearchParams(location.search).get('state')
  return STATES.includes(value as Fixture) ? (value as Fixture) : 'default-neutral'
}

function initialRating(fixture: Fixture): number | null {
  if (fixture === 'rating-1') return 1
  if (fixture === 'rating-5') return 5
  if (
    fixture === 'rating-3'
    || fixture === 'choice-neutral'
    || fixture === 'public-review-confirm'
    || fixture === 'private-feedback'
    || fixture === 'feedback-ready'
    || fixture === 'feedback-error'
    || fixture === 'feedback-success'
  ) return 3
  return null
}

function initialFeedback(fixture: Fixture) {
  return fixture === 'feedback-ready' || fixture === 'feedback-error' || fixture === 'feedback-success'
    ? READY_FEEDBACK
    : ''
}

function ratingFixture(value: number): Fixture {
  if (value === 1) return 'rating-1'
  if (value === 3) return 'rating-3'
  if (value === 5) return 'rating-5'
  return 'choice-neutral'
}

function StarRating({ value, onChange }: { value: number | null; onChange: (next: number) => void }) {
  return (
    <div className="grid grid-cols-5 gap-2" role="group" aria-label="Choose a rating from 1 to 5 stars">
      {[1, 2, 3, 4, 5].map(star => {
        const selected = value === star
        return (
          <button
            key={star}
            type="button"
            aria-label={`${star} star${star === 1 ? '' : 's'}`}
            aria-pressed={selected}
            className={`${FOCUS_CLASS} flex min-h-[52px] flex-col items-center justify-center gap-1 border ${selected ? 'border-brand-orange bg-brand-orange/10' : 'border-white/10 bg-white/[0.03]'}`}
            onClick={() => onChange(star)}
          >
            <Star className={`h-6 w-6 ${selected ? 'fill-brand-orange text-brand-orange' : 'text-paper-100/55'}`} aria-hidden="true" />
            <span className="text-[12px] tabular-nums text-paper-100/75">{star}</span>
          </button>
        )
      })}
    </div>
  )
}

function DataControlGrid({ onAction }: { onAction: (control: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-2" role="group" aria-label="Rating data controls">
      {RATING_DATA_CONTROLS.map(control => (
        <button key={control} type="button" className={`${SECONDARY_CLASS} text-left`} onClick={() => onAction(control)}>
          {control}
        </button>
      ))}
    </div>
  )
}

export function S69AppRating() {
  const [mounted, setMounted] = useState(false)
  const [fixture, setFixture] = useState<Fixture>('default-neutral')
  const [rating, setRating] = useState<number | null>(null)
  const [feedback, setFeedback] = useState('')
  const [status, setStatus] = useState('')
  const [controlStatus, setControlStatus] = useState('')
  const [publicPreviewed, setPublicPreviewed] = useState(false)
  const promptButtonRef = useRef<HTMLButtonElement>(null)
  const panelContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const next = queryFixture()
    const frame = requestAnimationFrame(() => {
      setMounted(true)
      setFixture(next)
      setRating(initialRating(next))
      setFeedback(initialFeedback(next))
      setPublicPreviewed(false)
      setControlStatus('')
      setStatus(
        next === 'feedback-error'
          ? 'The local feedback preview could not complete. Your text is preserved.'
          : next === 'feedback-success'
            ? 'Feedback preview completed locally. Nothing was sent.'
            : next === 'not-now'
              ? 'Not now selected. No reminder, cooldown, or storage changed in this prototype.'
              : next === 'suppressed'
                ? 'Do not ask again selected locally. No account preference changed.'
                : '',
      )
      if (next === 'not-now' || next === 'suppressed') {
        requestAnimationFrame(() => promptButtonRef.current?.focus({ preventScroll: true }))
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  const dismissed = fixture === 'not-now' || fixture === 'suppressed'
  const selectedFixture = fixture === 'rating-1' || fixture === 'rating-3' || fixture === 'rating-5'
  const feedbackReady = feedback.trim().length >= MIN_FEEDBACK_LENGTH

  useEffect(() => {
    if (!dismissed) return
    const frame = requestAnimationFrame(() => promptButtonRef.current?.focus({ preventScroll: true }))
    return () => cancelAnimationFrame(frame)
  }, [dismissed])

  useEffect(() => {
    if (!mounted || dismissed) return
    const frame = requestAnimationFrame(() => {
      const content = panelContentRef.current
      const dialog = content?.closest<HTMLElement>('[role="dialog"]')
      const active = document.activeElement
      if (!content || !dialog || (active instanceof HTMLElement && dialog.contains(active))) return
      const next = content.querySelector<HTMLElement>(
        'textarea:not(:disabled), input:not(:disabled), button:not(:disabled), [tabindex]:not([tabindex="-1"])',
      )
      ;(next ?? content).focus({ preventScroll: true })
    })
    return () => cancelAnimationFrame(frame)
  }, [dismissed, fixture, mounted, publicPreviewed])

  const chooseRating = (nextRating: number) => {
    setRating(nextRating)
    setFixture(ratingFixture(nextRating))
    setStatus(`${nextRating} star${nextRating === 1 ? '' : 's'} selected privately. No public or private path was chosen.`)
  }

  const reopenPrompt = () => {
    setFixture('default-neutral')
    setRating(null)
    setFeedback('')
    setStatus('')
    setControlStatus('')
    setPublicPreviewed(false)
  }

  const dismissNotNow = () => {
    setFixture('not-now')
    setStatus('Not now selected. No reminder, cooldown, or storage changed in this prototype.')
  }

  const dismissPermanently = () => {
    setFixture('suppressed')
    setStatus('Do not ask again selected locally. No account preference changed.')
  }

  const renderInitialRating = () => (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-[22px] font-semibold leading-7 text-paper-100">
          Enjoying <span className="text-emphasis">Balencia</span>?
        </h2>
        <p className="mt-2 text-[14px] leading-5 text-paper-100/75">
          Choose only if you want to. No rating is selected by default.
        </p>
      </div>
      <StarRating value={rating} onChange={chooseRating} />
      {rating !== null && (
        <p className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-center text-[12px] leading-4 text-paper-100/80" role="status" aria-live="polite">
          {rating} star{rating === 1 ? '' : 's'} selected privately. Your score does not choose a destination.
        </p>
      )}
      {selectedFixture && (
        <button type="button" className={`${PRIMARY_CLASS} w-full`} onClick={() => {
          setFixture('choice-neutral')
          setStatus('Choose either local preview. Both remain available for every score.')
        }}>
          Continue to equal choices
        </button>
      )}
      <div className="grid grid-cols-2 gap-2">
        <button type="button" className={SECONDARY_CLASS} onClick={dismissNotNow}>Not now</button>
        <button type="button" className={SECONDARY_CLASS} onClick={dismissPermanently}>Do not ask again</button>
      </div>
      <button type="button" className={`${FOCUS_CLASS} min-h-11 w-full px-3 text-[12px] font-semibold text-brand-orange`} onClick={() => {
        setFixture('data-controls')
        setControlStatus('')
      }}>
        Rating data controls
      </button>
    </div>
  )

  const renderChoices = () => (
    <div className="space-y-4">
      <div>
        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-paper-100/70">Your choice</p>
        <h2 className="mt-2 text-[22px] font-semibold text-paper-100">Choose what to preview</h2>
        <p className="mt-2 text-[14px] leading-5 text-paper-100/75">
          {rating ?? 3} stars remains private. Public review and private feedback are independent, equal-reach local previews at every score.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button type="button" className={`${SECONDARY_CLASS} flex flex-col items-center justify-center gap-2 text-center`} onClick={() => {
          setFixture('public-review-confirm')
          setPublicPreviewed(false)
          setStatus('')
        }}>
          <Store className="h-5 w-5" aria-hidden="true" />
          Public review preview
        </button>
        <button type="button" className={`${SECONDARY_CLASS} flex flex-col items-center justify-center gap-2 text-center`} onClick={() => {
          setFixture('private-feedback')
          setFeedback('')
          setStatus('')
        }}>
          <MessageSquareText className="h-5 w-5" aria-hidden="true" />
          Private feedback preview
        </button>
      </div>
      <button type="button" className={`${FOCUS_CLASS} min-h-11 w-full px-3 text-[12px] font-semibold text-brand-orange`} onClick={() => setFixture(rating === null ? 'default-neutral' : ratingFixture(rating))}>
        Change rating
      </button>
      <div className="grid grid-cols-2 gap-2">
        <button type="button" className={SECONDARY_CLASS} onClick={dismissNotNow}>Not now</button>
        <button type="button" className={SECONDARY_CLASS} onClick={dismissPermanently}>Do not ask again</button>
      </div>
    </div>
  )

  const renderPublicPreview = () => (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <Store className="mt-1 h-6 w-6 shrink-0 text-brand-orange" aria-hidden="true" />
        <div>
          <h2 className="text-[22px] font-semibold text-paper-100">Public review preview</h2>
          <p className="mt-2 text-[14px] leading-5 text-paper-100/75">
            This is available for every selected score. The prototype will not open an app store, submit a review, or navigate away.
          </p>
        </div>
      </div>
      {publicPreviewed ? (
        <div className="flex min-h-11 items-center gap-3 rounded-xl border border-forest-green/40 bg-forest-green/10 p-3" role="status" aria-live="polite">
          <Check className="h-5 w-5 shrink-0 text-forest-green" aria-hidden="true" />
          <p className="text-[12px] leading-4 text-paper-100/80">Public review preview completed locally. No store opened.</p>
        </div>
      ) : (
        <button type="button" className={`${PRIMARY_CLASS} w-full`} onClick={() => {
          setPublicPreviewed(true)
          setStatus('Public review preview completed locally. No store opened.')
        }}>
          Confirm local preview
        </button>
      )}
      <button type="button" className={`${SECONDARY_CLASS} w-full`} onClick={() => setFixture('choice-neutral')}>Back to equal choices</button>
    </div>
  )

  const renderFeedback = () => (
    <div className="space-y-4">
      <div>
        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-paper-100/70">Private path</p>
        <h2 className="mt-2 text-[22px] font-semibold text-paper-100">Private feedback preview</h2>
        <p className="mt-2 text-[14px] leading-5 text-paper-100/75">
          Nothing leaves this bundled visual preview. Your selected score does not change access to this path.
        </p>
      </div>
      <div>
        <label htmlFor="rating-feedback" className="block text-[14px] font-semibold text-paper-100">Feedback</label>
        <textarea
          id="rating-feedback"
          value={feedback}
          rows={4}
          onChange={event => {
            const next = event.currentTarget.value
            setFeedback(next)
            setFixture(next.trim().length >= MIN_FEEDBACK_LENGTH ? 'feedback-ready' : 'private-feedback')
            setStatus('')
          }}
          className={`${FOCUS_CLASS} mt-2 w-full resize-none border border-white/15 bg-white/[0.05] p-3 text-[16px] leading-5 text-paper-100 placeholder:text-paper-100/55`}
          placeholder="Share what would make the experience clearer"
          aria-describedby="rating-feedback-help"
        />
        <p id="rating-feedback-help" className="mt-2 text-[12px] leading-4 text-paper-100/70">
          {feedback.trim().length}/{MIN_FEEDBACK_LENGTH} minimum characters · local preview only
        </p>
      </div>

      {fixture === 'feedback-error' && (
        <div className="rounded-xl border border-white/15 bg-white/[0.04] p-3" role="alert">
          <p className="text-[14px] font-semibold text-paper-100">Local preview did not complete</p>
          <p className="mt-1 text-[12px] leading-4 text-paper-100/70">Your text is preserved. No note was sent or queued.</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        <button type="button" className={SECONDARY_CLASS} onClick={() => setFixture('choice-neutral')}>Back</button>
        {fixture === 'feedback-error' ? (
          <button type="button" className={PRIMARY_CLASS} onClick={() => {
            setFixture('feedback-ready')
            setStatus('Feedback is ready for another local preview.')
          }}>
            Retry locally
          </button>
        ) : (
          <button
            type="button"
            className={PRIMARY_CLASS}
            disabled={!feedbackReady}
            aria-describedby={!feedbackReady ? 'rating-feedback-help' : undefined}
            onClick={() => {
              setFixture('feedback-success')
              setStatus('Feedback preview completed locally. Nothing was sent.')
            }}
          >
            Submit local preview
          </button>
        )}
      </div>
    </div>
  )

  const renderFeedbackSuccess = () => (
    <div className="space-y-4 text-center">
      <Check className="mx-auto h-10 w-10 text-forest-green" aria-hidden="true" />
      <h2 className="text-[22px] font-semibold text-paper-100">Feedback preview complete</h2>
      <p className="text-[14px] leading-5 text-paper-100/75">
        Nothing was sent, stored, or queued. Your text remains only in component memory until this preview resets.
      </p>
      <button type="button" className={`${PRIMARY_CLASS} w-full`} onClick={() => setFixture('choice-neutral')}>Return to equal choices</button>
    </div>
  )

  const renderDataControls = () => (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-paper-100/70" aria-hidden="true" />
        <div>
          <h2 className="text-[22px] font-semibold text-paper-100">Rating data controls</h2>
          <p className="mt-2 text-[14px] leading-5 text-paper-100/75">
            Category · product sentiment. Source · bundled milestone fixture. Audience · private until you independently choose a preview. Freshness · current session. Confidence · exact local selection.
          </p>
        </div>
      </div>
      <DataControlGrid onAction={control => setControlStatus(`${control} is a reversible local preview. No response, preference, or account data changed.`)} />
      <p className="min-h-11 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-[12px] leading-4 text-paper-100/75" role="status" aria-live="polite">
        {controlStatus || 'Choose a control to preview its scoped explanation.'}
      </p>
      <button type="button" className={`${SECONDARY_CLASS} w-full`} onClick={() => setFixture(rating === null ? 'default-neutral' : 'choice-neutral')}>Back to rating</button>
    </div>
  )

  const overlay = !mounted || dismissed ? null : (
    <E1Modal
      label={
        fixture === 'choice-neutral'
          ? 'Choose rating destination'
          : fixture === 'public-review-confirm'
            ? 'Public review preview'
            : fixture === 'private-feedback' || fixture === 'feedback-ready' || fixture === 'feedback-error'
              ? 'Private feedback preview'
              : fixture === 'feedback-success'
                ? 'Feedback preview complete'
                : fixture === 'data-controls'
                  ? 'Rating data controls'
                  : 'Rate Balencia'
      }
      onClose={dismissNotNow}
      className={MODAL_CLASS}
    >
      <div
        className="space-y-4 pb-1 motion-reduce:[&_*]:!animate-none motion-reduce:[&_*]:!transition-none"
        style={{ paddingBottom: 'max(0.25rem, env(safe-area-inset-bottom))' }}
      >
        <div className="flex min-h-11 items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <CIAPresenceOrb size={48} state="idle" />
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-paper-100/70">CIA check-in</p>
              <p className="text-[12px] text-paper-100/70">Optional · local visual preview</p>
            </div>
          </div>
          <button type="button" aria-label="Dismiss rating prompt" className={`${FOCUS_CLASS} flex h-11 w-11 shrink-0 items-center justify-center text-paper-100/75`} onClick={dismissNotNow}>
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div ref={panelContentRef} tabIndex={-1}>
          {(fixture === 'default-neutral' || selectedFixture) && renderInitialRating()}
          {fixture === 'choice-neutral' && renderChoices()}
          {fixture === 'public-review-confirm' && renderPublicPreview()}
          {(fixture === 'private-feedback' || fixture === 'feedback-ready' || fixture === 'feedback-error') && renderFeedback()}
          {fixture === 'feedback-success' && renderFeedbackSuccess()}
          {fixture === 'data-controls' && renderDataControls()}
        </div>

        {status && fixture !== 'feedback-error' && (
          <p className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-[12px] leading-4 text-paper-100/75" role="status" aria-live="polite">{status}</p>
        )}
      </div>
    </E1Modal>
  )

  return (
    <HifiShell
      header={<TopBar title="Today" eyebrow="Amira · Lv 12" />}
      activeTab="today"
      showTabBar={false}
      atmosphere="you"
      overlay={overlay}
    >
      <main className="space-y-4 px-4 pb-4 pt-3" data-i1-state={`69-${fixture}`}>
        <I1TextScaleScope />
        <p className="text-[15px] leading-6 text-paper-100/75">
          Mission pause. Your bundled half-marathon mission and savings mission are ready for review. No provider or account data is loaded.
        </p>
        <GlassCard tone="muted" className="space-y-3">
          <div className="flex items-center gap-3">
            <LockKeyhole className="h-6 w-6 text-paper-100/65" aria-hidden="true" />
            <div>
              <h2 className="text-[17px] font-semibold text-paper-100">Private milestone fixture</h2>
              <p className="mt-1 text-[12px] leading-4 text-paper-100/70">Bundled locally · no store or feedback capability</p>
            </div>
          </div>
        </GlassCard>

        {dismissed && (
          <GlassCard tone="muted" className="space-y-4">
            <div aria-live="polite">
              <h2 className="text-[22px] font-semibold text-paper-100">
                {fixture === 'suppressed' ? 'Rating prompt suppressed locally' : 'Rating prompt dismissed for now'}
              </h2>
              <p className="mt-2 text-[14px] leading-5 text-paper-100/75">
                {fixture === 'suppressed'
                  ? 'No permanent account preference changed. Restore the prompt to reverse this visual-only outcome.'
                  : 'No 30-day cooldown, reminder, storage, or account state changed in this visual-only outcome.'}
              </p>
            </div>
            <button ref={promptButtonRef} type="button" className={`${PRIMARY_CLASS} w-full`} onClick={reopenPrompt}>
              {fixture === 'suppressed' ? 'Undo local suppression' : 'Show rating prompt'}
            </button>
            <p className="text-[12px] leading-4 text-paper-100/70" role="status">{status}</p>
          </GlassCard>
        )}
      </main>
    </HifiShell>
  )
}
