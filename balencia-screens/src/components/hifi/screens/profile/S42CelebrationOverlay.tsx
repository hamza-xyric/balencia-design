'use client'

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react'
import Link from 'next/link'
import { Award, ChevronRight, X } from 'lucide-react'
import {
  BtnPrimary,
  BtnSecondary,
  CIAInsightCard,
  Chip,
  GlassCard,
  HifiShell,
  ProgressBar,
  SectionTitle,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'

const CELEBRATION_STATES = ['default', 'skeleton', 'cia-null', 'streak', 'share-error', 'dismissed', 'toast'] as const

type CelebrationState = (typeof CELEBRATION_STATES)[number]
type ShareState = 'idle' | 'error' | 'retry'

const CELEBRATION_STATUS: Record<CelebrationState, string> = {
  default: 'This screen uses bundled milestone fixtures only. No reward, share, haptic, account, or network action occurred.',
  skeleton: 'Loading the bundled milestone result. Share is unavailable and no account or network request is running.',
  'cia-null': 'CIA insight is honestly unavailable for this bundled milestone. The level result remains visible without an inferred explanation.',
  streak: 'Seven-day streak milestone preview. No reward, haptic, account, or network action occurred.',
  'share-error': 'Sharing failed inside this deterministic local fixture. Nothing was shared and no native share capability opened.',
  dismissed: 'Celebration dismissed locally. No reward, route, account, or device state changed.',
  toast: 'Local XP toast preview. No reward, haptic, account, or network action occurred.',
}

function isCelebrationState(value: string | null): value is CelebrationState {
  return CELEBRATION_STATES.some(state => state === value)
}

function CodeNativeBadge({ streak }: { streak: boolean }) {
  const radius = 42
  const circumference = 2 * Math.PI * radius
  return (
    <div
      className="relative h-24 w-24 shrink-0"
      role="img"
      aria-label={streak ? 'Seven day streak badge, earned' : 'Level 13 badge, earned'}
      data-code-native-emblem="neutral"
    >
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="50" cy="50" r={radius} fill="none" className="stroke-white/15" strokeWidth="8" />
        {!streak && (
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            className="stroke-brand-orange"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${0.82 * circumference} ${circumference}`}
          />
        )}
      </svg>
      <span className="absolute inset-0 flex items-center justify-center">
        <Award className="h-10 w-10 text-paper-100" strokeWidth={1.6} aria-hidden="true" />
      </span>
    </div>
  )
}

function ContinuousStrokeDivider() {
  return (
    <div className="flex h-5 items-center justify-center" aria-hidden="true" data-continuous-stroke-divider>
      <svg width="100%" height="20" viewBox="0 0 300 20" fill="none" className="text-paper-100/35">
        <path d="M 4 10 Q 75 2 150 10 T 296 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  )
}

function DomainEvidence() {
  return (
    <div className="mt-3 flex flex-wrap gap-2" aria-label="Evidence domains: Fitness and Finance">
      <span data-domain-tag="fitness" className="inline-flex min-h-8 items-center gap-2 rounded-pill border border-domain-fitness/45 bg-domain-fitness/[0.16] px-3 text-[12px] font-semibold text-paper-100">
        <span className="h-2 w-2 rounded-full bg-domain-fitness" aria-hidden="true" />Fitness
      </span>
      <span data-domain-tag="finance" className="inline-flex min-h-8 items-center gap-2 rounded-pill border border-domain-finance/45 bg-domain-finance/[0.16] px-3 text-[12px] font-semibold text-paper-100">
        <span className="h-2 w-2 rounded-full bg-domain-finance" aria-hidden="true" />Finance
      </span>
    </div>
  )
}

function CelebrationDialog({
  state,
  shareState,
  reducedMotion,
  onDismiss,
  onShare,
}: {
  state: CelebrationState
  shareState: ShareState
  reducedMotion: boolean
  onDismiss: () => void
  onShare: () => void
}) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const skeleton = state === 'skeleton'
  const ciaNull = state === 'cia-null'
  const streak = state === 'streak'
  const showCia = !skeleton && !ciaNull

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    dialogRef.current?.querySelector<HTMLElement>('[data-initial-focus]')?.focus()
    return () => {
      if (previousFocus?.isConnected) previousFocus.focus()
    }
  }, [])

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onDismiss()
      return
    }
    if (event.key !== 'Tab') return

    const focusable = [...(dialogRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), [href]') ?? [])]
    if (!focusable.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="celebration-dialog-title"
      className="absolute inset-0 z-[70] overflow-y-auto bg-ink-900/90 backdrop-blur-md"
      data-celebration-overlay="full-screen"
      data-reduced-motion={reducedMotion}
      onKeyDown={handleKeyDown}
    >
      <h2 id="celebration-dialog-title" className="sr-only">Milestone celebration</h2>
      <button
        type="button"
        aria-label="Dismiss celebration"
        data-scrim-dismiss
        data-focus-cue="inset-dual-ring"
        className="focus-ring absolute inset-0 min-h-full w-full cursor-default focus-visible:!shadow-[inset_0_0_0_2px_var(--color-paper-100),inset_0_0_0_4px_var(--color-brand-orange)]"
        onClick={onDismiss}
      />

      <div className="pointer-events-none relative z-10 flex min-h-full items-center px-5 py-5">
        <div className="pointer-events-auto mx-auto w-full max-w-[350px] space-y-3">
          {!reducedMotion && !skeleton && (
            <div className="pointer-events-none absolute inset-x-8 top-8 flex justify-between motion-reduce:hidden" aria-hidden="true">
              <span className="h-1.5 w-1.5 rounded-full bg-forest-green/70 animate-pulse motion-reduce:animate-none" />
              <span className="mt-7 h-1 w-1 rounded-full bg-brand-orange/70 animate-pulse motion-reduce:animate-none" />
              <span className="h-1.5 w-1.5 rounded-full bg-forest-green/60 animate-pulse motion-reduce:animate-none" />
            </div>
          )}

          <GlassCard tone="done" className="!p-4 shadow-[var(--glow-green-md)] motion-reduce:animate-none">
            {skeleton ? (
              <div className="flex flex-col items-center text-center">
                <Chip tone="done" className="!text-[12px]">Milestone preview</Chip>
                <div className="skeleton-block mt-4 h-24 w-24 rounded-full" aria-hidden="true" />
                <p className="mt-4 text-[28px] font-semibold tabular-nums text-paper-100">0 XP</p>
                <p className="mt-1 text-[13px] text-paper-100/70">Getting your result ready</p>
                <p id="celebration-loading-reason" className="mt-2 text-[12px] leading-5 text-paper-100/65">Share is unavailable while this bundled result loads. No account or network request is running.</p>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center">
                <div className="flex w-full items-center justify-between gap-3">
                  <Chip tone="done" className="!text-[12px]">{streak ? 'Streak milestone' : 'Overall level up'}</Chip>
                  <span className="text-[12px] font-medium tabular-nums text-paper-100/70">{streak ? '7 days' : 'Lv 12 → 13'}</span>
                </div>

                <div className="mt-3"><CodeNativeBadge streak={streak} /></div>

                <div className="mt-2" data-metric-mode="flush">
                  <p className="text-[32px] font-semibold leading-9 tabular-nums text-paper-100">+120</p>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-paper-100/70">XP</p>
                  <p className="mt-1 text-[12px] text-paper-100/65">You earned it</p>
                </div>

                {!streak && (
                  <div
                    className="mt-3 w-full space-y-1.5"
                    role="progressbar"
                    aria-label="82 percent to level 14"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={82}
                    data-celebration-progress="82"
                  >
                    <div className="flex items-center justify-between text-[12px] text-paper-100/70"><span>Progress to level 14</span><span className="font-semibold tabular-nums text-paper-100">82%</span></div>
                    <ProgressBar value={82} tone="you" />
                  </div>
                )}
              </div>
            )}
          </GlassCard>

          {showCia && (
            <>
              <ContinuousStrokeDivider />
              <CIAInsightCard eyebrow="CIA" className="!p-4 [&>div>div>p]:!text-[12px] [&_span]:!text-[12px]">
                <div aria-label={streak ? 'CIA: Your seven day consistency across fitness and finance is coming together.' : 'CIA: Level 13. Your consistency across fitness and finance is coming together.'}>
                  <p className="text-[14px] leading-5 text-paper-100">
                    {streak ? 'Seven days. Your ' : 'Level 13. Your '}<span className="text-emphasis">consistency</span> across fitness and finance is coming together.
                  </p>
                  <DomainEvidence />
                </div>
              </CIAInsightCard>
            </>
          )}

          <div className="grid grid-cols-2 gap-3" data-celebration-actions>
            <BtnPrimary data-initial-focus className="w-full min-w-0 px-3" onClick={onDismiss}>Continue</BtnPrimary>
            <BtnSecondary
              className="h-auto min-h-12 w-full min-w-0 px-3 py-3 text-[13px] leading-5"
              disabled={skeleton}
              aria-describedby={skeleton ? 'celebration-loading-reason' : shareState === 'error' ? 'celebration-share-error' : undefined}
              onClick={onShare}
            >
              {shareState === 'error' ? 'Sharing failed · Try again' : shareState === 'retry' ? 'Share preview only' : 'Share'}
            </BtnSecondary>
          </div>
          {shareState === 'error' && <p id="celebration-share-error" className="text-center text-[12px] leading-5 text-paper-100/70">Nothing was shared. Try the local preview again.</p>}
          {shareState === 'retry' && <p className="text-center text-[12px] leading-5 text-paper-100/70" role="status" aria-live="polite">Share preview only. No native share sheet, clipboard, file, message, or network action opened.</p>}
        </div>
      </div>
    </div>
  )
}

export function S42CelebrationOverlay() {
  const [screenState, setScreenState] = useState<CelebrationState>('default')
  const [overlayOpen, setOverlayOpen] = useState(true)
  const [shareState, setShareState] = useState<ShareState>('idle')
  const [reducedMotion, setReducedMotion] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const [status, setStatus] = useState('This screen uses bundled milestone fixtures only. No reward, share, haptic, account, or network action occurred.')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const requestedState = params.get('state')
    const resolvedState = isCelebrationState(requestedState) ? requestedState : 'default'
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    queueMicrotask(() => {
      setScreenState(resolvedState)
      setStatus(CELEBRATION_STATUS[resolvedState])
      setOverlayOpen(resolvedState !== 'dismissed' && resolvedState !== 'toast')
      setToastVisible(resolvedState === 'toast')
      setShareState(resolvedState === 'share-error' ? 'error' : 'idle')
      setReducedMotion(prefersReducedMotion || params.get('motion') === 'reduced')
    })
  }, [])

  const celebrationKind = screenState === 'streak' ? 'streak' : screenState === 'toast' ? 'toast' : 'level'
  const evidenceCount = overlayOpen && screenState !== 'skeleton' && screenState !== 'cia-null' ? 2 : 0

  const dismissCelebration = () => {
    setOverlayOpen(false)
    setScreenState('dismissed')
    setStatus('Celebration dismissed locally. No reward, route, account, or device state changed.')
  }

  const openCelebration = () => {
    setScreenState('default')
    setShareState('idle')
    setOverlayOpen(true)
    setToastVisible(false)
    setStatus('Celebration replayed from its bundled fixture. No reward or account state changed.')
  }

  const previewShare = () => {
    setShareState('retry')
    setStatus(shareState === 'error'
      ? 'Share retry stayed inside this local preview. No native share sheet, clipboard, file, message, or network action opened.'
      : 'Share selected as a local preview only. No native share sheet, clipboard, file, message, or network action opened.')
  }

  const overlay = overlayOpen ? (
    <CelebrationDialog
      state={screenState}
      shareState={shareState}
      reducedMotion={reducedMotion}
      onDismiss={dismissCelebration}
      onShare={previewShare}
    />
  ) : undefined

  return (
    <HifiShell
      header={<TopBar title="Today" back={false} right={<span className="text-[13px] font-medium tabular-nums text-paper-100/70">Lv 12</span>} />}
      activeTab="today"
      showTabBar={false}
      atmosphere="you"
      overlay={overlay}
    >
      <main
        className="space-y-4 px-4 pb-5 pt-3"
        data-state-surface={screenState}
        data-celebration-state={screenState}
        data-overlay-open={overlayOpen}
        data-share-state={shareState}
        data-celebration-kind={celebrationKind}
        data-domain-evidence-count={evidenceCount}
        data-route="/subscription/success"
        data-reduced-motion={reducedMotion}
        aria-busy={screenState === 'skeleton' || undefined}
      >
        {screenState === 'toast' && toastVisible && (
          <div className="sticky top-2 z-40 flex min-h-14 items-center gap-3 rounded-2xl border border-brand-orange/35 bg-ink-brown-800/95 px-4 py-3 shadow-[var(--glow-orange-sm)]" role="status" aria-live="polite" aria-atomic="true">
            <Award className="h-5 w-5 shrink-0 text-paper-100" aria-hidden="true" />
            <p className="min-w-0 flex-1 text-[14px] font-semibold tabular-nums text-paper-100">+40 XP <span data-toast-domain="fitness" className="ml-1 text-[12px] font-medium text-domain-fitness">Fitness</span></p>
            <button type="button" className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-paper-100/70" aria-label="Dismiss XP toast" onClick={() => {
              setToastVisible(false)
              setStatus('XP toast dismissed early in this local preview. No reward or account state changed.')
            }}><X className="h-5 w-5" aria-hidden="true" /></button>
          </div>
        )}

        <SectionTitle title="Active missions" meta="2 active" />

        <Link href="/screens/14?mission=run-a-half-marathon" className="focus-ring block rounded-[28px]">
          <GlassCard tone="you">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1"><p className="text-[15px] text-paper-100">Run a half marathon</p><p className="text-[13px] text-paper-100/70">Fitness Mission</p></div>
                <Chip tone="you" className="!text-[12px]">Fitness</Chip>
              </div>
              <ProgressBar value={68} tone="you" />
            </div>
          </GlassCard>
        </Link>

        <Link href="/screens/14?mission=save-5000" className="focus-ring block rounded-[28px]">
          <GlassCard tone="you">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1"><p className="text-[15px] text-paper-100">Save $5,000 by December</p><p className="text-[13px] text-paper-100/70">Finance Mission</p></div>
                <Chip tone="you" className="!text-[12px]">Finance</Chip>
              </div>
              <ProgressBar value={42} tone="you" />
            </div>
          </GlassCard>
        </Link>

        <SolidCard className="!p-0">
          <Link href="/screens/83" className="focus-ring flex min-h-14 items-center justify-between gap-3 px-4 py-3">
            <span><span className="block text-[14px] font-medium text-paper-100">Buddy check-in</span><span className="mt-0.5 block text-[12px] text-paper-100/70">Aisha logged a 5k run this morning</span></span>
            <ChevronRight className="h-5 w-5 shrink-0 text-paper-100/60" aria-hidden="true" />
          </Link>
        </SolidCard>

        <button
          type="button"
          data-replay-celebration
          className="focus-ring flex min-h-12 w-full items-center justify-center rounded-pill border border-white/15 px-4 text-[13px] font-semibold text-paper-100"
          onClick={openCelebration}
        >
          Replay milestone preview
        </button>

        <p className="min-h-10 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-[12px] leading-5 text-paper-100/70" role="status" aria-live="polite" aria-atomic="true">
          {status}
        </p>
      </main>
    </HifiShell>
  )
}
