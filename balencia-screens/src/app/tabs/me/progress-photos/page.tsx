'use client'

import { useState } from 'react'
import { ArrowDown, ArrowUp, Camera, Lock, Minus, Plus, Ruler, Scale, Sparkles } from 'lucide-react'
import { BottomSheet, PhoneModalLayer } from '@/components/design-system/BottomSheet'
import { Button } from '@/components/design-system/Button'
import { Card } from '@/components/design-system/Card'
import { FAB } from '@/components/design-system/FAB'
import { DomainDashboardHeader } from '@/components/domain/DomainDashboardHeader'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { SIACoachingNote } from '@/components/screens/SIACoachingNote'
import { progressPhotos } from '@/data/mock'

// Screen 49 of 78: Progress photos
// Spec: /Users/hamza/yHealth/app_design 3/49-progress-photos.md

function trendIcon(positive: boolean | null, trend: string) {
  if (positive === null) return <Minus size={13} className="text-white/30" strokeWidth={2.2} />
  if (trend.startsWith('-')) return <ArrowDown size={13} className={positive ? 'text-forest-green' : 'text-domain-fitness'} strokeWidth={2.2} />
  return <ArrowUp size={13} className={positive ? 'text-forest-green' : 'text-domain-fitness'} strokeWidth={2.2} />
}

function chartPoints() {
  const width = 280
  const height = 116
  const values = progressPhotos.weightTrend.map((point) => point.weight)
  const min = Math.min(...values) - 0.5
  const max = Math.max(...values) + 0.5
  const span = max - min

  return {
    width,
    height,
    points: values.map((value, index) => {
      const x = (index / (values.length - 1)) * width
      const y = height - 10 - ((value - min) / span) * (height - 22)
      return { x, y, value }
    }),
  }
}

function WeightTrendCard({ range, onRangeChange }: { range: string; onRangeChange: (range: string) => void }) {
  const { width, height, points } = chartPoints()
  const pointString = points.map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(' ')
  const areaString = `0,${height} ${pointString} ${width},${height}`

  return (
    <Card className="mt-4 animate-fade-up" style={{ animationDelay: '120ms' }}>
      <div className="mb-3 flex items-center justify-between">
        <div className="text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-domain-fitness">Weight trend</div>
        <span className="text-small leading-[14px] text-white/30">Target: 70 kg</span>
      </div>
      <svg className="h-[116px] w-full overflow-visible text-brand-orange" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
        <line x1="0" x2={width} y1="84" y2="84" className="text-white/30" stroke="currentColor" strokeDasharray="6 6" strokeWidth="1" />
        <polygon points={areaString} className="fill-brand-orange/10" />
        <polyline points={pointString} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((point) => (
          <circle key={`${point.x}-${point.value}`} cx={point.x} cy={point.y} r="4" fill="currentColor" />
        ))}
      </svg>
      <div className="mt-2 flex justify-between text-small leading-[14px] text-white/30">
        {progressPhotos.weightTrend.map((point) => (
          <span key={point.month}>{point.month}</span>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        {['1M', '3M', '6M', '1Y', 'All'].map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onRangeChange(option)}
            aria-pressed={range === option}
            className={[
              'min-h-11 rounded-pill px-4 text-caption leading-[18px]',
              range === option ? 'bg-brand-orange font-semibold text-white' : 'text-white/50',
            ].join(' ')}
          >
            {option}
          </button>
        ))}
      </div>
    </Card>
  )
}

function CurrentStats() {
  return (
    <Card variant="small" className="mt-4 rounded-md p-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
      <div className="grid grid-cols-3 divide-x divide-white/[0.05]">
        {progressPhotos.currentStats.map((stat) => (
          <div key={stat.id} className="flex min-w-0 flex-col items-center px-2 text-center">
            <div className="text-[24px] font-bold leading-7 text-white tabular-nums">{stat.value}</div>
            <div className="mt-1 text-[12px] leading-4 text-white/50">{stat.label}</div>
            <div className="mt-2 flex items-center gap-1 text-[12px] font-semibold leading-4 text-white/40">
              {trendIcon(stat.positive, stat.trend)}
              <span>{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

function MeasurementsCard({ onAdd }: { onAdd: () => void }) {
  return (
    <Card className="mt-4 animate-fade-up" style={{ animationDelay: '280ms' }}>
      <div className="mb-3 flex items-center justify-between">
        <div className="text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-domain-fitness">Measurements</div>
        <button type="button" onClick={onAdd} className="min-h-11 rounded-full px-2 text-caption leading-[18px] text-brand-orange">See all</button>
      </div>
      <div>
        {progressPhotos.measurements.map((measurement, index) => (
          <div
            key={measurement.id}
            className={[
              'flex h-9 items-center gap-3',
              index > 0 ? 'border-t border-white/[0.05]' : '',
            ].filter(Boolean).join(' ')}
          >
            <span className="min-w-0 flex-1 text-[15px] leading-5 text-white">{measurement.label}</span>
            <span className="w-16 text-right text-[15px] font-semibold leading-5 text-white tabular-nums">{measurement.value}</span>
            <span className="flex w-12 items-center justify-end gap-1 text-[12px] font-semibold leading-4 text-white/40">
              {trendIcon(measurement.positive, measurement.trend)}
              {measurement.trend}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[12px] leading-4 text-white/30">Last updated: 3 days ago</p>
    </Card>
  )
}

function PhotoTimelineCard({ onCompare, onOpen }: { onCompare: () => void; onOpen: (date: string) => void }) {
  return (
    <Card className="mt-4 animate-fade-up" style={{ animationDelay: '360ms' }}>
      <div className="mb-4 flex items-center justify-between">
        <div className="text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-domain-fitness">Progress photos</div>
        <button type="button" onClick={onCompare} className="min-h-11 rounded-full px-2 text-caption leading-[18px] text-brand-orange">Compare</button>
      </div>
      <div className="-mx-1 overflow-x-auto px-1 pb-1 hide-scrollbar">
        <div className="flex gap-3">
          {progressPhotos.photos.map((photo) => (
            <div key={photo.id} className="w-[100px] shrink-0">
              <button
                type="button"
                onClick={() => onOpen(photo.date)}
                aria-label={`Open encrypted progress photo from ${photo.date}`}
                className={[
                  'relative flex h-[140px] w-full items-center justify-center rounded-md border bg-ink-900 text-white/20',
                  photo.selected ? 'border-brand-orange' : 'border-white/[0.06]',
                ].join(' ')}
              >
                <span className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-ink-900/70 text-white/60">
                  <Camera size={14} strokeWidth={2.1} />
                </span>
                <Camera size={30} strokeWidth={1.8} />
                <span className="absolute bottom-2 right-2 text-white/30">
                  <Lock size={10} strokeWidth={2.2} />
                </span>
              </button>
              <p className="mt-2 text-center text-small leading-[14px] text-white/50">{photo.date}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 rounded-md border border-royal-purple/20 bg-ink-900/80 p-3">
        <div className="flex items-start gap-2">
          <Sparkles size={14} className="mt-0.5 shrink-0 text-royal-purple" strokeWidth={2.2} />
          <div className="min-w-0">
            <div className="text-[14px] font-semibold leading-5 text-white">{progressPhotos.aiAnalysis.title}</div>
            <div className="text-caption leading-[18px] text-white/60">{progressPhotos.aiAnalysis.body}</div>
            <div className="mt-2 text-[11px] font-semibold leading-4 text-white/35">
              Pro opt-in active - analyzed on device from May 21 photo
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

function PrivacyNotice() {
  return (
    <Card variant="small" className="mt-4 rounded-md p-4 animate-fade-up" style={{ animationDelay: '360ms' }}>
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.05] text-white/50">
          <Lock size={15} strokeWidth={2.2} />
        </span>
        <div className="min-w-0">
          <h2 className="text-[14px] font-semibold leading-5 text-white">Private body-photo vault</h2>
          <p className="mt-1 text-[12px] leading-4 text-white/45">
            Photos are encrypted, visible only to you, deletable with backups, and never used for human review or model training.
          </p>
          <p className="mt-2 text-[12px] font-semibold leading-4 text-royal-purple">
            AI body analysis requires Pro opt-in before any result is generated.
          </p>
        </div>
      </div>
    </Card>
  )
}

function AddProgressHint() {
  return (
    <Card variant="small" className="mt-4 rounded-md p-4 animate-fade-up" style={{ animationDelay: '520ms' }}>
      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          { label: 'Log weight', icon: Scale },
          { label: 'Take photo', icon: Camera },
          { label: 'Measure', icon: Ruler },
        ].map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="flex flex-col items-center gap-2 text-white/50">
              <Icon size={18} className="text-brand-orange" strokeWidth={2.2} />
              <span className="text-small leading-[14px]">{item.label}</span>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

export default function ProgressPhotosScreen() {
  const [sheet, setSheet] = useState<'add' | 'compare' | 'photo' | null>(null)
  const [range, setRange] = useState('3M')
  const [selectedPhoto, setSelectedPhoto] = useState('')
  const [weight, setWeight] = useState('74.2')
  const [notice, setNotice] = useState('')
  const showNotice = (message: string) => {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 3000)
  }

  return (
    <PhoneFrame>
      <ScreenShell
        header={<DomainDashboardHeader title="Progress & body comp" domain="fitness" level={12} backHref="/tabs/me" />}
        activeTab="me"
        bottomAction={
          <FAB
            label="Add progress"
            icon={<Plus size={16} strokeWidth={2.4} />}
            display="pill"
            onClick={() => setSheet('add')}
          />
        }
      >
        <main className="px-4 pb-6 pt-4">
          <SIACoachingNote message={progressPhotos.siaNote} className="p-4 animate-fade-up" />
          <WeightTrendCard range={range} onRangeChange={setRange} />
          <CurrentStats />
          <MeasurementsCard onAdd={() => setSheet('add')} />
          <PrivacyNotice />
          <PhotoTimelineCard
            onCompare={() => setSheet('compare')}
            onOpen={(date) => {
              setSelectedPhoto(date)
              setSheet('photo')
            }}
          />
          <AddProgressHint />
          {notice && (
            <div className="fixed bottom-[116px] left-1/2 z-50 w-[300px] -translate-x-1/2 rounded-md border border-white/10 bg-ink-brown-800 px-4 py-3 text-center text-[13px] font-semibold leading-[18px] text-white shadow-3" aria-live="polite">
              {notice}
            </div>
          )}
          {sheet && (
            <PhoneModalLayer>
              <BottomSheet
                title={sheet === 'add' ? 'Add progress' : sheet === 'compare' ? 'Compare photos' : 'Encrypted photo'}
                onClose={() => setSheet(null)}
                closeLabel="Close progress sheet"
                variant="modal"
                contentClassName="px-4 pb-1 pt-1"
              >
              {sheet === 'add' && (
                <form
                  className="space-y-3"
                  onSubmit={(event) => {
                    event.preventDefault()
                    showNotice('Progress saved. AI analysis remains off until you opt in.')
                    setSheet(null)
                  }}
                >
                  <label className="block text-[12px] font-semibold leading-4 text-white/45" htmlFor="weight">Weight</label>
                  <input id="weight" value={weight} onChange={(event) => setWeight(event.target.value)} inputMode="decimal" className="h-12 w-full rounded-md border border-white/10 bg-ink-brown-800 px-3 text-white outline-none focus:border-brand-orange" />
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => { setSheet(null); showNotice('Camera access requires a native build. Photo saved as placeholder.') }}
                      className="min-h-11 rounded-md border border-white/10 text-[13px] font-semibold text-white/70"
                    >
                      Take photo
                    </button>
                    <button
                      type="button"
                      onClick={() => { setSheet(null); showNotice('Measurement entry opens in the production app. Weight logged above.') }}
                      className="min-h-11 rounded-md border border-white/10 text-[13px] font-semibold text-white/70"
                    >
                      Add measurements
                    </button>
                  </div>
                  <p className="rounded-md bg-white/[0.04] p-3 text-[12px] leading-4 text-white/45">Photos are private, encrypted, user-deletable, and never used for human review or model training. AI body analysis is premium opt-in.</p>
                  <Button fullWidth disabled={!weight.trim()}>Save progress</Button>
                </form>
              )}
              {sheet === 'compare' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    {progressPhotos.photos.slice(0, 2).map((photo) => (
                      <div key={photo.id} className="flex h-40 items-center justify-center rounded-md border border-white/10 bg-ink-brown-800 text-white/30">
                        <Camera size={28} strokeWidth={1.8} />
                      </div>
                    ))}
                  </div>
                  <Button fullWidth onClick={() => showNotice('Comparison view updated for selected photos')}>Use these photos</Button>
                </div>
              )}
              {sheet === 'photo' && (
                <div className="space-y-3">
                  <div className="flex h-56 items-center justify-center rounded-md border border-white/10 bg-ink-brown-800 text-white/30">
                    <Camera size={34} strokeWidth={1.8} />
                  </div>
                  <p className="text-[13px] leading-[18px] text-white/55">{selectedPhoto} is decrypted on this device only. Sharing is disabled for V1 progress photos.</p>
                  <Button variant="skip" fullWidth onClick={() => showNotice('Photo deletion confirmation would remove backups too')}>Delete photo</Button>
                </div>
              )}
              </BottomSheet>
            </PhoneModalLayer>
          )}
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
