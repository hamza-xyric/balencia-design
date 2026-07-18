'use client'

import { useEffect, useState } from 'react'
import { Flame, Info, Plus, WifiOff } from 'lucide-react'
import Link from 'next/link'
import {
  BtnGhost,
  BtnPrimary,
  BtnSecondary,
  BtnSuccess,
  CIAInsightCard,
  CIAPresenceOrb,
  ConsentRail,
  GlassCard,
  GlassPillInput,
  HifiShell,
  Provenance,
  SafetyCard,
  SolidCard,
} from '@/components/hifi/kit'

// Daily check-in. `?state=` fixtures: default (mood pre-selected), skeleton,
// empty (first check-in, no history-derived modules), error (save failed,
// input preserved), offline (saves locally, syncs later), success (saved
// confirmation), invalid (no mood selected — Save disabled with the reason
// visible). Everything saves in this preview only; nothing leaves the device.

type CheckinState = 'default' | 'skeleton' | 'empty' | 'error' | 'offline' | 'success' | 'invalid'

const CHECKIN_STATES: CheckinState[] = ['default', 'skeleton', 'empty', 'error', 'offline', 'success', 'invalid']

const moodCells = [
  { emoji: '😞', sentiment: 'Down' },
  { emoji: '😕', sentiment: 'Low' },
  { emoji: '😐', sentiment: 'Okay' },
  { emoji: '🙂', sentiment: 'Good' },
  { emoji: '😄', sentiment: 'Great' },
]
const domainTagClass = {
  career: 'border-domain-career/35 bg-domain-career/15 text-paper-100',
  fitness: 'border-domain-fitness/35 bg-domain-fitness/15 text-paper-100',
  wellbeing: 'border-domain-wellbeing/35 bg-domain-wellbeing/15 text-paper-100',
} as const

// Interactive variant keeps the domain-tinted surface but uses paper text so the
// tappable label clears the 4.5:1 contrast floor on the dark background.
const domainButtonClass = {
  career: 'border-domain-career/45 bg-domain-career/25 text-paper-100',
  fitness: 'border-domain-fitness/45 bg-domain-fitness/25 text-paper-100',
  wellbeing: 'border-domain-wellbeing/45 bg-domain-wellbeing/25 text-paper-100',
} as const

function ReadableProvenance({ items }: { items: string[] }) {
  return <div className="[&_span]:!text-[12px]"><Provenance items={items} /></div>
}

function DomainTag({
  domain,
  label,
  selected,
  interactive = false,
  onToggle,
}: {
  domain: keyof typeof domainTagClass
  label: string
  selected?: boolean
  interactive?: boolean
  onToggle?: () => void
}) {
  const base = 'inline-flex items-center rounded-pill border px-3 text-[12px] font-semibold'
  if (!interactive) return <span className={`${base} min-h-8 ${domainTagClass[domain]}`}>{label}</span>

  return (
    <button
      type="button"
      aria-pressed={Boolean(selected)}
      aria-label={`${label} domain, ${selected ? 'selected' : 'not selected'}`}
      className={`${base} focus-ring min-h-11 ${selected ? domainButtonClass[domain] : 'border-white/15 bg-white/[0.04] text-paper-100/75'}`}
      onClick={onToggle}
    >
      {label}
    </button>
  )
}

function FeelingSlider({
  title,
  minLabel,
  maxLabel,
  value,
  ariaLabel,
  onChange,
}: {
  title: string
  minLabel: string
  maxLabel: string
  value: number | null
  ariaLabel: string
  onChange: (value: number) => void
}) {
  const position = value === null ? 0 : ((value - 1) / 9) * 100
  const promptId = `${ariaLabel.toLowerCase()}-unset-prompt`

  return (
    <div>
      <p className="mb-2 text-[13px] font-medium text-white/80">{title}</p>
      <div className="flex items-center justify-between text-[12px] text-paper-100/65">
        <span>{minLabel}</span>
        <span className="text-[13px] font-medium text-white/90 tabular-nums">{value ?? 'Not set'}</span>
        <span>{maxLabel}</span>
      </div>
      {value === null && (
        <p id={promptId} className="mt-1 text-[12px] leading-4 text-paper-100/70">
          Slide to set {title.toLowerCase()}.
        </p>
      )}
      <div className="relative mt-2 h-11 rounded-pill focus-within:ring-2 focus-within:ring-brand-orange focus-within:ring-offset-2 focus-within:ring-offset-paper-100">
        <div className={`absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 rounded-pill ${value === null ? 'border border-dashed border-white/20 bg-white/[0.025]' : 'bg-white/[0.08]'}`} />
        {value !== null && (
          <>
            <div
              data-slider-fill
              className="absolute left-0 top-1/2 h-2 -translate-y-1/2 rounded-pill bg-brand-orange"
              style={{ width: `${position}%` }}
            />
            <div
              className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[var(--glow-orange-sm)]"
              style={{ left: `${position}%` }}
            />
          </>
        )}
        <input
          type="range"
          min={1}
          max={10}
          value={value ?? 1}
          aria-label={ariaLabel}
          aria-valuetext={value === null ? `${ariaLabel} not set. Slide to choose a value from 1 to 10.` : `${value} out of 10`}
          aria-describedby={value === null ? promptId : undefined}
          className="peer absolute inset-0 z-10 h-11 w-full cursor-pointer opacity-0 focus-visible:outline-none"
          onChange={event => onChange(Number(event.target.value))}
        />
      </div>
    </div>
  )
}

export function S45DailyCheckin() {
  const [screenState, setScreenState] = useState<CheckinState>('default')
  const [selectedMoodIndex, setSelectedMoodIndex] = useState<number | null>(3)
  const [contextDomains, setContextDomains] = useState(['Career'])
  const [energy, setEnergy] = useState<number | null>(7)
  const [stress, setStress] = useState<number | null>(4)
  const [insightDismissed, setInsightDismissed] = useState(false)
  const [saveMode, setSaveMode] = useState<'preview' | 'local'>('preview')
  const [status, setStatus] = useState('Evening check-in fixture ready. Everything here saves in this preview only.')

  useEffect(() => {
    const fixture = new URLSearchParams(window.location.search).get('state') as CheckinState | null
    if (!fixture || !CHECKIN_STATES.includes(fixture)) return
    const timer = window.setTimeout(() => {
      setScreenState(fixture)
      if (fixture === 'empty') {
        setSelectedMoodIndex(null)
        setContextDomains([])
        setEnergy(null)
        setStress(null)
      }
      if (fixture === 'invalid') setSelectedMoodIndex(null)
      if (fixture === 'success') setSaveMode('preview')
      setStatus(
        fixture === 'skeleton'
          ? 'Saving is disabled while the check-in skeleton loads.'
          : fixture === 'empty'
            ? 'First check-in — no history yet, so no pattern is claimed. Mood is the only required field.'
            : fixture === 'error'
              ? 'Couldn’t save your check-in. Everything you entered is kept on this screen.'
              : fixture === 'offline'
                ? 'Offline — this check-in saves on your device and syncs when you’re back.'
                : fixture === 'success'
                  ? 'Check-in saved in this preview. Nothing left your device.'
                  : fixture === 'invalid'
                    ? 'No mood selected yet — Save stays disabled until you pick one.'
                    : 'Evening check-in fixture ready. Everything here saves in this preview only.',
      )
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  const toggleContextDomain = (domain: string) => {
    setContextDomains(current => {
      const adding = !current.includes(domain)
      setStatus(`${domain} context ${adding ? 'added to' : 'removed from'} this check-in · saved in this preview only.`)
      return adding ? [...current, domain] : current.filter(item => item !== domain)
    })
  }

  const moodSelected = selectedMoodIndex !== null
  const isEmpty = screenState === 'empty'
  const isOffline = screenState === 'offline'
  const isSkeleton = screenState === 'skeleton'
  const isSuccess = screenState === 'success'

  const handleSave = () => {
    if (!moodSelected) return
    const nextSaveMode = isOffline ? 'local' : 'preview'
    setSaveMode(nextSaveMode)
    setScreenState('success')
    setStatus(
      nextSaveMode === 'local'
        ? 'Saved locally on this device · syncs later. No network request was made.'
        : screenState === 'error'
          ? 'Retry succeeded in this preview. The error is cleared and nothing left your device.'
          : 'Check-in saved in this preview. Nothing left your device.',
    )
  }

  return (
    <div className="contents [&_[data-chip-interactive]]:!text-[12px] [&_nav_span]:!text-[12px]">
      <HifiShell
      atmosphere="you"
      activeTab="today"
      bottomAction={
        <div className="w-full space-y-2">
          {!moodSelected && !isSkeleton && !isSuccess && (
            <p id="checkin-save-reason" className="text-center text-[12px] leading-4 text-paper-100/70">
              Select a mood to save — it&rsquo;s the only required field.
            </p>
          )}
          {isSuccess ? (
            <BtnSuccess className="w-full" onClick={() => setStatus(saveMode === 'local' ? 'Already saved locally · syncs later.' : 'Already saved in this preview. Nothing left your device.')}>
              {saveMode === 'local' ? 'Saved locally · syncs later' : 'Check-in saved'}
            </BtnSuccess>
          ) : (
            <BtnPrimary
              className="w-full"
              disabled={!moodSelected || isSkeleton}
              aria-describedby={!moodSelected && !isSkeleton ? 'checkin-save-reason' : isSkeleton ? 'checkin-status' : undefined}
              onClick={handleSave}
            >
              {isSkeleton ? 'Loading check-in…' : isOffline ? 'Save locally' : 'Save check-in'}
            </BtnPrimary>
          )}
        </div>
      }
      header={
        <header className="z-30 flex min-h-[58px] shrink-0 items-center gap-3 bg-ink-900/40 px-4 backdrop-blur-md">
          <Link
            href="/screens/12"
            replace
            className="focus-ring flex min-h-11 items-center rounded-pill text-[15px] text-paper-100/70"
            aria-label="Cancel check-in and return to Today"
          >
            Cancel
          </Link>
          <h1 className="min-w-0 flex-1 truncate text-center text-[17px] font-semibold leading-6 text-white">
            Evening check-in
          </h1>
          <div className="h-11 w-11 shrink-0" aria-hidden="true" />
        </header>
      }
    >
      <main className="space-y-4 px-4 pb-4 pt-3" data-checkin-state={screenState} aria-busy={isSkeleton}>
        {isOffline && (
          <div className="glass-pill flex items-start gap-2 px-3 py-2 text-[12px] leading-4 text-paper-100/70">
            <WifiOff aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            Offline — this check-in saves on your device and syncs when you&rsquo;re back.
          </div>
        )}

        {isSuccess ? (
          <>
            <GlassCard tone="done">
              <div className="flex items-start gap-4">
                <CIAPresenceOrb state="idle" size={48} decorative />
                <div className="min-w-0 flex-1">
                  <h2 className="text-[19px] font-semibold leading-6 text-paper-100">Check-in saved</h2>
                  <p className="mt-2 text-[13px] leading-5 text-paper-100/70">
                    {saveMode === 'local'
                      ? 'Your check-in is stored on this device and will sync when you reconnect. No network request was made.'
                      : 'Your check-in is stored in this local preview. Nothing left your device.'}
                  </p>
                  <div className="mt-3"><ReadableProvenance items={['You logged', saveMode === 'local' ? 'Local · sync later' : 'Local preview']} /></div>
                </div>
              </div>
            </GlassCard>
            <GlassCard tone="muted">
              <p className="text-[12px] leading-4 text-paper-100/65">
                Mood, energy, stress, and reflection data stay private to you and are kept until you delete them. Export, revoke, or delete below.
              </p>
              <div className="[&_a]:!text-[12px]"><ConsentRail compact /></div>
            </GlassCard>
            <SafetyCard />
          </>
        ) : isSkeleton ? (
          <div className="space-y-4" aria-label="Loading check-in preview">
            <div className="skeleton-block h-32 rounded-[28px]" />
            <div className="rounded-xl border border-white/[0.06] p-4">
              <div className="skeleton-block h-4 w-32 rounded" />
              <div className="mt-4 flex justify-between gap-2">
                {moodCells.map(cell => <div key={cell.sentiment} className="skeleton-block h-14 w-14 rounded-full" />)}
              </div>
            </div>
            <div className="rounded-xl border border-white/[0.06] p-4">
              <div className="skeleton-block h-4 w-36 rounded" />
              <div className="mt-4 skeleton-block h-2 rounded-pill" />
              <div className="mt-6 skeleton-block h-2 rounded-pill" />
            </div>
            <div className="skeleton-block h-24 rounded-[28px]" />
            <div className="skeleton-block h-36 rounded-[28px]" />
          </div>
        ) : (
          <>
            <GlassCard tone="cia" className="relative overflow-hidden">
              <div className="pointer-events-none absolute -top-12 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-royal-purple/20 blur-3xl" />
              <div className="relative flex items-start gap-4">
                <CIAPresenceOrb state="idle" size={48} decorative />
                <div className="min-w-0 flex-1">
                  <p className="text-[19px] font-medium leading-6 text-white">
                    {isEmpty
                      ? 'Good evening. First check-in — let’s set your baseline. Two minutes.'
                      : 'Good evening. Let’s close out your day. Two minutes. How did it go.'}
                  </p>
                  {!isEmpty && (
                    <div className="mt-3 inline-flex items-center gap-1.5 rounded-pill border border-brand-orange/25 bg-brand-orange/10 px-3 py-1 text-[12px] font-semibold text-brand-orange">
                      <Flame size={12} strokeWidth={2.2} aria-hidden="true" />
                      Day 14 checking in
                    </div>
                  )}
                </div>
              </div>
            </GlassCard>

            <SolidCard>
              <div className="flex items-center justify-between">
                <h2 className="text-[15px] font-medium text-white/90">How you&apos;re feeling</h2>
                {moodSelected && <ReadableProvenance items={['You logged']} />}
              </div>
              <div className="mt-4 grid grid-cols-5 gap-2">
                {moodCells.map((cell, index) => {
                  const isSelected = index === selectedMoodIndex
                  return (
                    <button
                      key={cell.sentiment}
                      type="button"
                      aria-label={`Mood: ${cell.sentiment.toLowerCase()}${isSelected ? ', selected' : ''}`}
                      aria-pressed={isSelected}
                      onClick={() => {
                        setSelectedMoodIndex(index)
                        setStatus(`Mood set to ${cell.sentiment.toLowerCase()} — Save is ${screenState === 'invalid' ? 'now enabled' : 'ready'}. Kept in this preview only.`)
                      }}
                      className={`focus-ring flex aspect-square min-h-11 w-full items-center justify-center rounded-full text-[21px] ${
                        isSelected
                          ? 'bg-brand-orange/15 ring-2 ring-brand-orange shadow-[var(--glow-orange-sm)]'
                          : moodSelected
                            ? 'bg-white/[0.04] ring-1 ring-inset ring-white/10'
                            : 'border border-dashed border-white/20 bg-white/[0.02]'
                      }`}
                    >
                      <span aria-hidden="true">{cell.emoji}</span>
                    </button>
                  )
                })}
              </div>
              {!moodSelected && (
                <p className="mt-2 text-[12px] leading-4 text-paper-100/70">Select a mood to save.</p>
              )}
              <div className="mt-4 flex items-center gap-2">
                <Plus size={13} className="shrink-0 text-white/40" strokeWidth={2.2} aria-hidden="true" />
                <span className="text-[12px] text-paper-100/65">Add context</span>
                <DomainTag domain="career" label="Career" interactive selected={contextDomains.includes('Career')} onToggle={() => toggleContextDomain('Career')} />
                <DomainTag domain="fitness" label="Fitness" interactive selected={contextDomains.includes('Fitness')} onToggle={() => toggleContextDomain('Fitness')} />
              </div>
            </SolidCard>

            <SolidCard className="space-y-5">
              <div className="flex items-center justify-between -mb-1">
                <h2 className="text-[15px] font-medium text-white/90">Energy and stress</h2>
                {(energy !== null || stress !== null) && <ReadableProvenance items={['You logged']} />}
              </div>
              <FeelingSlider
                title="Energy"
                minLabel="Low"
                maxLabel="High"
                value={energy}
                ariaLabel="Energy"
                onChange={next => {
                  setEnergy(next)
                  setStatus(`Energy set to ${next} out of 10 · kept in this preview only.`)
                }}
              />
              <FeelingSlider
                title="Stress"
                minLabel="Calm"
                maxLabel="High"
                value={stress}
                ariaLabel="Stress"
                onChange={next => {
                  setStress(next)
                  setStatus(`Stress set to ${next} out of 10 · kept in this preview only.`)
                }}
              />
            </SolidCard>

            <GlassCard tone="you">
              <h2 className="mb-3 text-[15px] font-medium text-white/90">How today went</h2>
              <GlassPillInput
                label="How today went — optional reflection"
                placeholder="Optional reflection"
                multiline
                rows={3}
                value={isEmpty ? undefined : 'Closed the deck. Slept badly the night before.'}
              />
            </GlassCard>

            {screenState === 'error' && (
              <SolidCard>
                <div className="flex items-start gap-3">
                  <Info aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
                  <div className="min-w-0 flex-1">
                    <h2 className="text-[14px] font-semibold text-paper-100">Couldn&rsquo;t save your check-in</h2>
                    <p className="mt-1 text-[12px] leading-5 text-paper-100/70">Everything you entered is kept on this screen. Nothing was lost.</p>
                    <BtnSecondary className="mt-3 h-11 px-4 text-[13px]" onClick={handleSave}>
                      Try again
                    </BtnSecondary>
                  </div>
                </div>
              </SolidCard>
            )}

            {!isEmpty && (
              insightDismissed ? (
                <GlassCard tone="muted">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[13px] leading-5 text-paper-100/70">Tomorrow&rsquo;s insight dismissed for today.</p>
                    <button
                      type="button"
                      className="focus-ring flex min-h-11 shrink-0 items-center rounded-pill border border-white/15 bg-white/[0.06] px-4 text-[13px] font-semibold text-paper-100"
                      onClick={() => {
                        setInsightDismissed(false)
                        setStatus('Dismiss undone — tomorrow’s insight is back.')
                      }}
                    >
                      Undo
                    </button>
                  </div>
                </GlassCard>
              ) : (
                <CIAInsightCard
                  className="[&>div>div>div.mt-3>div>span]:!text-[12px] [&>div>div>p:first-child]:!text-[12px]"
                  eyebrow="Tomorrow"
                  provenance={['Cross-pillar pattern']}
                  actions={
                    <>
                      <BtnSecondary onClick={() => setStatus('Pattern detail preview opened locally — mood vs. morning training, last 30 days of your logs.')}>See the pattern</BtnSecondary>
                      <BtnGhost
                        quiet
                        onClick={() => {
                          setInsightDismissed(true)
                          setStatus('Check-in insight dismissed for today · undo available on the card.')
                        }}
                      >
                        Not now
                      </BtnGhost>
                    </>
                  }
                >
                  <div className="space-y-3">
                    <p className="text-[14px] leading-[20px] text-white/90">
                      You tend to feel <span className="text-emphasis">calmer</span> on days you train in the morning.
                    </p>
                    <div className="flex gap-2">
                      <DomainTag domain="wellbeing" label="Wellbeing" />
                      <DomainTag domain="fitness" label="Fitness" />
                    </div>
                    <div className="flex items-center gap-2 text-[12px] text-paper-100/70">
                      <span className="flex items-center gap-1" role="img" aria-label="Pattern confidence: moderate, estimated">
                        <span className="h-1.5 w-1.5 rounded-full bg-royal-purple" />
                        <span className="h-1.5 w-1.5 rounded-full bg-royal-purple" />
                        <span className="h-1.5 w-1.5 rounded-full bg-royal-purple/25" />
                      </span>
                      Estimated pattern confidence
                    </div>
                  </div>
                </CIAInsightCard>
              )
            )}

            <GlassCard tone="muted">
              <p className="text-[12px] leading-4 text-paper-100/65">
                {isEmpty
                  ? 'Mood, energy, and stress stay unset until you choose them. Any future entries stay private to you and are kept until you delete them.'
                  : 'Mood, energy, and stress entries come from you — source: You logged. They stay private to you and are kept until you delete them.'} Revoke or delete below.
              </p>
              <div className="[&_a]:!text-[12px]"><ConsentRail compact /></div>
            </GlassCard>

            <SafetyCard />
          </>
        )}

        <p id="checkin-status" className="min-h-5 text-[12px] leading-5 text-paper-100/70" role="status" aria-live="polite" aria-atomic="true">{status}</p>
      </main>
      </HifiShell>
    </div>
  )
}
