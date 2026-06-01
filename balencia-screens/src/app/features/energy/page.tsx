'use client'

import { useState } from 'react'
import { BatteryCharging, Bird, Clock, Plus } from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { SegmentedControl } from '@/components/design-system/SegmentedControl'
import { DomainDashboardHeader } from '@/components/domain/DomainDashboardHeader'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { SIACoachingNote } from '@/components/screens/SIACoachingNote'
import { energyTracking } from '@/data/mock'

// Screen 63 of 78: Energy tracking
// Spec: /Users/hamza/yHealth/app_design 3/63-energy-tracking.md

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 px-1 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-domain-wellbeing">
      {children}
    </div>
  )
}

function CurrentEnergyCard({ value, context, note }: { value: number; context: string; note: string }) {
  return (
    <Card className="mt-4 animate-fade-up text-center" style={{ animationDelay: '80ms' }}>
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-domain-wellbeing/15 text-domain-wellbeing">
        <BatteryCharging size={26} strokeWidth={2.1} />
      </div>
      <div className="mt-3 text-display-xl font-bold leading-[48px] text-white tabular-nums">{value}</div>
      <div className="text-caption font-semibold leading-[18px] text-domain-wellbeing">{context}</div>
      <p className="mt-1 text-caption leading-[18px] text-white/50">{note}</p>
    </Card>
  )
}

function QuickLogCard({ value, setValue, tag, setTag, note, setNote, onLog }: { value: number; setValue: (value: number) => void; tag: string; setTag: (tag: string) => void; note: string; setNote: (note: string) => void; onLog: () => void }) {
  return (
    <section className="mt-5 animate-fade-up" style={{ animationDelay: '160ms' }}>
      <SectionEyebrow>Quick log</SectionEyebrow>
      <Card>
        <div className="flex justify-between text-caption leading-[18px] text-white/40">
          <span>1</span>
          <span>10</span>
        </div>
        <input type="range" min="1" max="10" value={value} onChange={(event) => setValue(Number(event.target.value))} aria-label="Energy level" className="mt-3 h-11 w-full accent-brand-orange" />
        <div className="mt-4 flex flex-wrap gap-2">
          {energyTracking.tags.map((option) => (
            <button
              type="button"
              key={option}
              onClick={() => setTag(option)}
              aria-pressed={tag === option}
              className={['min-h-11 rounded-pill border px-3 py-2 text-caption font-semibold leading-[18px]', tag === option ? 'border-domain-wellbeing/30 bg-domain-wellbeing/15 text-domain-wellbeing' : 'border-white/10 bg-ink-900 text-white/60'].join(' ')}
            >
              {option}
            </button>
          ))}
        </div>
        <input value={note} onChange={(event) => setNote(event.target.value)} placeholder="Optional note..." className="mt-4 h-12 w-full rounded-md border border-white/10 bg-ink-900 px-4 text-[15px] leading-5 text-white outline-none placeholder:text-white/35" />
        <button type="button" onClick={onLog} className="mt-5 h-12 w-full rounded-pill bg-brand-orange text-body font-semibold leading-[22px] text-white">
          Log energy
        </button>
      </Card>
    </section>
  )
}

function EnergyTimeline() {
  const width = 280
  const height = 116
  const points = energyTracking.timeline.map((point, index) => {
    const x = (index / (energyTracking.timeline.length - 1)) * width
    const y = height - 10 - (point.value / 10) * (height - 24)
    return { x, y, label: point.label, value: point.value }
  })
  const pointString = points.map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(' ')

  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '240ms' }}>
      <SectionEyebrow>Energy today</SectionEyebrow>
      <Card>
        <svg className="h-[116px] w-full overflow-visible text-brand-orange" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
          <polyline points={pointString} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {points.map((point) => (
            <circle key={point.label} cx={point.x} cy={point.y} r="4" fill="currentColor" />
          ))}
        </svg>
        <div className="mt-2 flex justify-between text-small leading-[14px] text-white/35">
          {points.map((point) => <span key={point.label}>{point.label}</span>)}
        </div>
        <div className="mt-3 text-caption font-semibold leading-[18px] text-white">Avg: 6.2</div>
      </Card>
    </section>
  )
}

function EnergyTrend({ period, onPeriod }: { period: string; onPeriod: (period: string) => void }) {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '320ms' }}>
      <SectionEyebrow>Energy trend</SectionEyebrow>
      <SegmentedControl
        options={[
          { label: '7d', value: '7d' },
          { label: '14d', value: '14d' },
          { label: '30d', value: '30d' },
        ]}
        activeValue={period}
        onValueChange={onPeriod}
        ariaLabel="Energy trend range"
        className="mb-3"
      />
      <Card>
        <svg className="h-[132px] w-full overflow-visible text-brand-orange" viewBox="0 0 280 132" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 112 C38 90 44 30 82 28 C126 26 128 88 166 68 C204 48 220 40 280 52" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M0 132 L0 112 C38 90 44 30 82 28 C126 26 128 88 166 68 C204 48 220 40 280 52 L280 132 Z" className="fill-brand-orange/10" />
        </svg>
        <div className="mt-2 flex justify-between text-caption leading-[18px]">
          <span className="font-semibold text-white">Avg: {period === '30d' ? '6.8' : period === '14d' ? '6.6' : '6.4'}</span>
          <span className="font-semibold text-domain-wellbeing">Best: 9-11am</span>
        </div>
      </Card>
    </section>
  )
}

function PeakHoursCard() {
  return (
    <Card className="mt-5 animate-fade-up" style={{ animationDelay: '400ms' }}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-h3 font-semibold leading-[22px] text-white">Peak hours</h2>
        <span className="rounded-pill bg-domain-wellbeing/15 px-3 py-1 text-small font-semibold leading-3 text-domain-wellbeing">Lv.8</span>
      </div>
      <div className="space-y-3">
        {energyTracking.peakHours.map((hour) => (
          <div key={hour.label} className="grid grid-cols-[80px_1fr] items-center gap-3">
            <div>
              <div className="text-caption font-semibold leading-[18px] text-white">{hour.label}</div>
              <div className="text-small leading-[14px] text-white/35">{hour.time}</div>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: 4 }).map((_, index) => (
                <span key={index} className={['h-2 flex-1 rounded-pill', index < hour.strength ? 'bg-brand-orange' : 'bg-white/[0.08]'].join(' ')} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-caption leading-[18px] text-white/50">Schedule deep work here.</p>
    </Card>
  )
}

function ChronotypeCard() {
  return (
    <Card className="mt-4 animate-fade-up" style={{ animationDelay: '480ms' }}>
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-brand-orange/10 text-brand-orange">
          <Bird size={28} strokeWidth={1.8} />
        </div>
        <div>
          <div className="text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">Your chronotype</div>
          <h2 className="mt-1 text-h3 font-semibold leading-[22px] text-white">Early bird</h2>
          <p className="mt-1 text-caption leading-[18px] text-white/50">Peak creative hours: 9-11am</p>
        </div>
      </div>
    </Card>
  )
}

function CorrelationsCard() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '560ms' }}>
      <SectionEyebrow>What affects your energy</SectionEyebrow>
      <Card>
        <div className="space-y-3">
          {energyTracking.correlations.map((item) => (
            <div key={item.label} className="grid grid-cols-[64px_1fr_42px] items-center gap-3">
              <span className="text-caption leading-[18px] text-white/60">{item.label}</span>
              <div className="h-2 overflow-hidden rounded-pill bg-white/[0.08]">
                <div className={['h-full rounded-pill', item.positive ? 'bg-domain-wellbeing' : 'bg-stalled-amber'].join(' ')} style={{ width: `${item.width}%` }} />
              </div>
              <span className={['text-right text-caption font-semibold leading-[18px]', item.positive ? 'text-forest-green' : 'text-stalled-amber'].join(' ')}>
                {item.impact}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </section>
  )
}

function SiaInsight({ onAsk }: { onAsk: () => void }) {
  return (
    <Card className="mt-6 border-l-[3px] border-l-royal-purple/50 p-5 animate-fade-up" style={{ animationDelay: '640ms' }}>
      <div className="flex items-start gap-3">
        <Clock size={16} className="mt-1 shrink-0 text-royal-purple" strokeWidth={2.1} />
        <div className="min-w-0">
          <p className="text-[15px] leading-[22px] text-white/80">{energyTracking.insight}</p>
          <button type="button" onClick={onAsk} className="mt-3 min-h-11 w-full rounded-pill border border-royal-purple/25 bg-royal-purple/10 text-caption font-semibold leading-[18px] text-royal-purple">Ask SIA more</button>
        </div>
      </div>
    </Card>
  )
}

export default function EnergyTrackingScreen() {
  const [value, setValue] = useState(7)
  const [tag, setTag] = useState('Afternoon')
  const [note, setNote] = useState('')
  const [period, setPeriod] = useState('7d')
  const [notice, setNotice] = useState('')
  const log = () => setNotice(`Energy logged: ${value}/10, ${tag}${note ? `, ${note}` : ''}`)

  return (
    <PhoneFrame>
      <ScreenShell
        header={<DomainDashboardHeader title="Energy tracking" domain="wellbeing" level={8} backHref="/tabs/me/explore" />}
        activeTab="me"
        bottomAction={(
          <button type="button" onClick={() => document.getElementById('energy-quick-log')?.scrollIntoView({ behavior: 'smooth' })} className="mx-auto flex h-[48px] items-center justify-center gap-2 rounded-pill bg-brand-orange px-6 text-[15px] font-semibold leading-5 text-white shadow-2 shadow-brand-orange/30">
            <Plus size={16} strokeWidth={2.4} />
            Log
          </button>
        )}
      >
        <main className="px-4 pb-6 pt-4">
          {notice && <div className="mb-3 rounded-md bg-forest-green/10 px-3 py-2 text-caption text-forest-green" role="status">{notice}</div>}
          <SIACoachingNote message={energyTracking.siaNote} className="p-4 animate-fade-up" />
          <CurrentEnergyCard value={value} context={tag} note={note || energyTracking.current.note} />
          <div id="energy-quick-log"><QuickLogCard value={value} setValue={setValue} tag={tag} setTag={setTag} note={note} setNote={setNote} onLog={log} /></div>
          <EnergyTimeline />
          <EnergyTrend period={period} onPeriod={setPeriod} />
          <PeakHoursCard />
          <ChronotypeCard />
          <CorrelationsCard />
          <SiaInsight onAsk={() => setNotice('Opening SIA with energy trend context')} />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
