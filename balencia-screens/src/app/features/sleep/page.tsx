'use client'

import { useState } from 'react'
import { ChevronDown, Moon, Plus, Star, X } from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { SegmentedControl } from '@/components/design-system/SegmentedControl'
import { DomainDashboardHeader } from '@/components/domain/DomainDashboardHeader'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { SIACoachingNote } from '@/components/screens/SIACoachingNote'
import { sleepTracking } from '@/data/mock'

// Screen 58 of 78: Sleep tracking
// Spec: /Users/hamza/yHealth/app_design 3/58-sleep-tracking.md

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 px-1 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-domain-sleep">
      {children}
    </div>
  )
}

function LastNightCard() {
  return (
    <section className="mt-4 animate-fade-up" style={{ animationDelay: '80ms' }}>
      <Card>
        <div className="flex items-center justify-between">
          <div className="text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">Last night</div>
          <span className="rounded-pill border border-domain-sleep/20 bg-domain-sleep/15 px-3 py-1 text-small font-semibold leading-3 text-domain-sleep">
            Synced from {sleepTracking.lastNight.syncedFrom}
          </span>
        </div>

        <div className="mt-5 text-center">
          <div className="text-display-xl font-bold leading-[48px] text-white tabular-nums">
            {sleepTracking.lastNight.hours}
            <span className="ml-1 text-h3 font-semibold text-white/40">Hrs</span>
          </div>
          <div className="mt-2 flex justify-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={18}
                strokeWidth={2}
                className={index < sleepTracking.lastNight.quality ? 'fill-brand-orange text-brand-orange' : 'text-white/15'}
              />
            ))}
          </div>
          <p className="mt-1 text-caption leading-[18px] text-white/50">Quality rating</p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {[
            { label: 'Bedtime', value: sleepTracking.lastNight.bedtime },
            { label: 'Wake time', value: sleepTracking.lastNight.wake },
          ].map((item) => (
            <div key={item.label} className="rounded-md bg-ink-900/70 p-3 text-center">
              <div className="text-small leading-[14px] text-white/40">{item.label}</div>
              <div className="mt-1 text-[15px] font-semibold leading-5 text-white">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between rounded-md bg-ink-900/70 p-3">
          <span className="text-caption leading-[18px] text-white/50">Recovery</span>
          <span className="text-h3 font-semibold leading-[22px] text-forest-green tabular-nums">{sleepTracking.lastNight.recovery}%</span>
        </div>
      </Card>
    </section>
  )
}

function SleepTrendCard({ period, onPeriod }: { period: string; onPeriod: (period: string) => void }) {
  const maxHours = 9

  return (
    <section className="mt-4 animate-fade-up" style={{ animationDelay: '160ms' }}>
      <Card>
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-h3 font-semibold leading-[22px] text-white">Sleep trend</h2>
          <SegmentedControl
            options={[
              { label: '7', value: '7' },
              { label: '14', value: '14' },
              { label: '30', value: '30' },
            ]}
            activeValue={period}
            onValueChange={onPeriod}
            ariaLabel="Sleep trend range"
            className="w-[144px]"
          />
        </div>

        <div className="relative mt-5 h-[132px] rounded-md bg-ink-900/70 px-3 pb-8 pt-4">
          <div className="absolute left-3 right-3 top-[41%] border-t border-dashed border-white/25" />
          <div className="flex h-full items-end gap-2">
            {sleepTracking.durationTrend.map((item, index) => (
              <div key={`${item.day}-${index}`} className="flex flex-1 flex-col items-center justify-end gap-2">
                <div className="relative flex h-[92px] w-full items-end justify-center">
                  <div
                    className="w-full max-w-[22px] rounded-t-sm bg-domain-sleep shadow-[var(--glow-purple)] ring-animate"
                    style={{ height: `${(item.hours / maxHours) * 100}%` }}
                  />
                </div>
                <span className="text-small leading-[14px] text-white/40">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-between text-caption leading-[18px]">
          <span className="font-semibold text-white">Avg: {period === '30' ? '7.0' : period === '14' ? '7.2' : '7.1'} hrs</span>
          <span className="font-semibold text-domain-sleep">Target: 7.5 hrs</span>
        </div>
      </Card>
    </section>
  )
}

function ConsistencyCard() {
  return (
    <section className="mt-4 animate-fade-up" style={{ animationDelay: '240ms' }}>
      <Card>
        <h2 className="text-h3 font-semibold leading-[22px] text-white">Bedtime consistency</h2>
        <div className="mt-4 space-y-5">
          {[
            { label: 'Bedtime range', value: sleepTracking.consistency.bedtimeRange, dots: sleepTracking.consistency.bedtimeDots },
            { label: 'Wake range', value: sleepTracking.consistency.wakeRange, dots: sleepTracking.consistency.wakeDots },
          ].map((row) => (
            <div key={row.label}>
              <div className="flex justify-between text-caption leading-[18px]">
                <span className="text-white/40">{row.label}</span>
                <span className="font-semibold text-white/70">{row.value}</span>
              </div>
              <div className="relative mt-3 h-8 rounded-pill bg-ink-900/80">
                <div className="absolute left-[18%] right-[18%] top-1/2 h-1 -translate-y-1/2 rounded-pill bg-domain-sleep/25" />
                {row.dots.map((left, index) => (
                  <span
                    key={`${row.label}-${index}`}
                    className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-domain-sleep"
                    style={{ left: `${left}%` }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </section>
  )
}

function QualityTrendCard() {
  const width = 280
  const height = 120
  const points = sleepTracking.qualityTrend.map((value, index) => {
    const x = (index / (sleepTracking.qualityTrend.length - 1)) * width
    const y = height - 12 - ((value - 1) / 4) * (height - 24)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')

  return (
    <section className="mt-4 animate-fade-up" style={{ animationDelay: '320ms' }}>
      <Card>
        <h2 className="text-h3 font-semibold leading-[22px] text-white">Quality trend</h2>
        <svg className="mt-4 h-[120px] w-full overflow-visible text-brand-orange" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
          {[1, 2, 3, 4, 5].map((line) => {
            const y = height - 12 - ((line - 1) / 4) * (height - 24)
            return <line key={line} x1="0" x2={width} y1={y} y2={y} stroke="currentColor" strokeWidth="1" className="text-white/[0.05]" />
          })}
          <polyline points={points} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="mt-2 flex justify-between text-small leading-[14px] text-white/30">
          {sleepTracking.durationTrend.map((item, index) => <span key={`${item.day}-${index}`}>{item.day}</span>)}
        </div>
      </Card>
    </section>
  )
}

function HygieneTips() {
  const [open, setOpen] = useState(true)
  return (
    <section className="mt-4 animate-fade-up" style={{ animationDelay: '400ms' }}>
      <Card variant="small" className="rounded-lg p-4">
        <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} className="flex min-h-11 w-full items-center justify-between text-left">
          <div className="flex items-center gap-2 text-[15px] font-semibold leading-5 text-white">
            <Moon size={16} className="text-domain-sleep" strokeWidth={2.1} />
            Sleep hygiene tips
          </div>
          <ChevronDown size={16} className="text-white/40" strokeWidth={2} />
        </button>
        {open && <div className="mt-4 space-y-3">
          {sleepTracking.tips.map((tip) => (
            <div key={tip} className="flex gap-3 text-caption leading-[18px] text-white/60">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-domain-sleep" />
              <span>{tip}</span>
            </div>
          ))}
        </div>}
      </Card>
    </section>
  )
}

function LogSleepFab({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="mx-auto flex h-[48px] items-center justify-center gap-2 rounded-pill border border-white/[0.06] bg-brand-orange px-6 text-[15px] font-semibold leading-5 text-white shadow-2 shadow-brand-orange/30">
      <Plus size={16} strokeWidth={2.4} />
      Log sleep
    </button>
  )
}

const sleepTags = ['Late caffeine', 'Evening walk', 'Screen-free', 'Stress', 'Travel']

function deriveSleepHours(bedtime: string, wake: string) {
  const [bedHour, bedMinute] = bedtime.split(':').map(Number)
  const [wakeHour, wakeMinute] = wake.split(':').map(Number)
  if ([bedHour, bedMinute, wakeHour, wakeMinute].some((value) => Number.isNaN(value))) return 0
  const bedTotal = bedHour * 60 + bedMinute
  let wakeTotal = wakeHour * 60 + wakeMinute
  if (wakeTotal <= bedTotal) wakeTotal += 24 * 60
  return Math.round(((wakeTotal - bedTotal) / 60) * 10) / 10
}

export default function SleepTrackingScreen() {
  const [period, setPeriod] = useState('7')
  const [showLog, setShowLog] = useState(false)
  const [bedtime, setBedtime] = useState('23:15')
  const [wake, setWake] = useState('06:45')
  const [quality, setQuality] = useState(4)
  const [notes, setNotes] = useState('')
  const [tags, setTags] = useState<string[]>(['Screen-free'])
  const [savedSummary, setSavedSummary] = useState('')
  const derivedHours = deriveSleepHours(bedtime, wake)
  const canSave = derivedHours > 0 && derivedHours <= 16

  return (
    <PhoneFrame>
      <ScreenShell
        header={<DomainDashboardHeader title="Sleep" domain="sleep" level={8} backHref="/tabs/me/explore" />}
        activeTab="me"
        bottomAction={<LogSleepFab onClick={() => setShowLog(true)} />}
      >
        {showLog && (
          <div className="absolute inset-x-0 bottom-0 z-50 max-h-[78%] overflow-y-auto rounded-t-2xl border border-white/[0.06] bg-ink-brown-800 p-5 shadow-3 animate-fade-up" role="dialog" aria-modal="true" aria-label="Manual sleep log">
            <div className="flex items-center justify-between">
              <h2 className="text-h3 font-semibold text-white">Log sleep</h2>
              <button type="button" onClick={() => setShowLog(false)} aria-label="Close sleep log" className="flex h-11 w-11 items-center justify-center rounded-full text-white/50"><X size={18} /></button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <label className="block text-caption font-semibold text-white/50">Bedtime
                <input type="time" value={bedtime} onChange={(event) => setBedtime(event.target.value)} className="mt-2 h-12 w-full rounded-md border border-white/10 bg-ink-900 px-3 text-white outline-none" />
              </label>
              <label className="block text-caption font-semibold text-white/50">Wake time
                <input type="time" value={wake} onChange={(event) => setWake(event.target.value)} className="mt-2 h-12 w-full rounded-md border border-white/10 bg-ink-900 px-3 text-white outline-none" />
              </label>
            </div>
            <div className="mt-3 rounded-md bg-ink-900 p-3 text-caption leading-[18px] text-white/60">
              Manual source . duration {derivedHours || '0'} hrs
            </div>
            <div className="mt-4">
              <div className="text-caption font-semibold text-white/50">Quality</div>
              <div className="mt-2 flex gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button key={value} type="button" onClick={() => setQuality(value)} aria-pressed={quality === value} aria-label={`Sleep quality ${value}`} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10">
                    <Star size={18} className={value <= quality ? 'fill-brand-orange text-brand-orange' : 'text-white/25'} />
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <div className="text-caption font-semibold text-white/50">Tags</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {sleepTags.map((tag) => (
                  <button key={tag} type="button" onClick={() => setTags((items) => items.includes(tag) ? items.filter((item) => item !== tag) : [...items, tag])} aria-pressed={tags.includes(tag)} className={['min-h-11 rounded-pill border px-3 text-caption font-semibold', tags.includes(tag) ? 'border-domain-sleep bg-domain-sleep/15 text-domain-sleep' : 'border-white/10 text-white/55'].join(' ')}>
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <label className="mt-4 block text-caption font-semibold text-white/50">Notes
              <textarea value={notes} onChange={(event) => setNotes(event.target.value)} className="mt-2 min-h-[72px] w-full rounded-md border border-white/10 bg-ink-900 p-3 text-[15px] leading-5 text-white outline-none" placeholder="Optional sleep context..." />
            </label>
            <button type="button" disabled={!canSave} onClick={() => { setSavedSummary(`${derivedHours} hrs, ${bedtime}-${wake}, quality ${quality}/5${tags.length ? `, ${tags.join(', ')}` : ''}`); setShowLog(false) }} className="mt-5 h-12 w-full rounded-pill bg-brand-orange font-semibold text-white disabled:opacity-50">Save sleep</button>
          </div>
        )}
        <main className="px-4 pb-6 pt-4">
          {savedSummary && <div className="mb-3 rounded-md bg-forest-green/10 px-3 py-2 text-caption text-forest-green" role="status">Sleep log saved: {savedSummary}</div>}
          <SIACoachingNote message={sleepTracking.siaNote} className="p-4 animate-fade-up" />
          <LastNightCard />
          <SleepTrendCard period={period} onPeriod={setPeriod} />
          <ConsistencyCard />
          <QualityTrendCard />
          <SectionEyebrow>Personalized tips</SectionEyebrow>
          <HygieneTips />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
