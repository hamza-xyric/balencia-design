'use client'

import { useRef, useState } from 'react'
import { BarChart3, Droplets, Flame, Settings, Trophy } from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { DomainDashboardHeader } from '@/components/domain/DomainDashboardHeader'
import { WaterIntakeRing } from '@/components/domain/WaterIntakeRing'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { SectionHeader } from '@/components/screens/SectionHeader'
import { waterIntake } from '@/data/mock'

// Screen 44 of 78: Water intake
// Spec: /Users/hamza/yHealth/app_design 3/44-water-intake.md

const ML_PER_GLASS = 250

function QuickAddButton({
  amount,
  unit,
  primary = false,
  onClick,
}: {
  amount: string
  unit: string
  primary?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'flex h-12 min-w-0 flex-1 flex-col items-center justify-center rounded-pill border text-center transition-transform duration-[var(--dur-fast)] active:scale-95',
        primary ? 'border-brand-orange bg-brand-orange text-white' : 'border-white/10 bg-ink-brown-800 text-white/70',
      ].join(' ')}
      aria-label={`Add ${amount} ${unit}`}
    >
      <span className="text-[15px] font-semibold leading-5">{amount}</span>
      <span className="text-[12px] leading-4">{unit}</span>
    </button>
  )
}

type DrinkEntry = typeof waterIntake.entries[number] & {
  glasses?: number
  ml?: number
}

function formatGlassCount(glasses: number) {
  return Number.isInteger(glasses) ? String(glasses) : glasses.toFixed(1)
}

function getEntryMl(entry: DrinkEntry) {
  if ('ml' in entry && typeof entry.ml === 'number') return entry.ml

  const amountMlMatch = entry.amount.match(/(\d+(?:\.\d+)?)\s*ml/i)
  if (amountMlMatch) return Number(amountMlMatch[1])

  const secondaryMlMatch = entry.secondary.match(/(\d+(?:\.\d+)?)\s*ml/i)
  if (secondaryMlMatch) return Number(secondaryMlMatch[1])

  const amountGlassMatch = entry.amount.match(/(\d+(?:\.\d+)?)\s+glasses?/i)
  if (amountGlassMatch) return Number(amountGlassMatch[1]) * ML_PER_GLASS

  const secondaryGlassMatch = entry.secondary.match(/(\d+(?:\.\d+)?)\s+glasses?/i)
  if (secondaryGlassMatch) return Number(secondaryGlassMatch[1]) * ML_PER_GLASS

  return ML_PER_GLASS
}

function DrinkLog({ entries, onDelete }: { entries: DrinkEntry[]; onDelete: (id: string) => void }) {
  return (
    <section className="mt-8 animate-fade-up" style={{ animationDelay: '160ms' }}>
      <SectionHeader
        title="Today's log"
        className="px-1"
        action={<span className="text-small leading-[14px] text-white/30">{entries.length} entries</span>}
      />
      <Card variant="small" className="rounded-lg p-0">
        {entries.map((entry, index) => (
          <div
            key={entry.id}
            className={[
              'flex min-h-[52px] items-center gap-3 px-4 py-3',
              index > 0 ? 'border-t border-white/[0.05]' : '',
            ].filter(Boolean).join(' ')}
          >
            <Droplets size={16} className="shrink-0 text-domain-wellbeing" strokeWidth={2.2} />
            <div className="min-w-0 flex-1 text-[15px] font-semibold leading-5 text-white">{entry.time}</div>
            <div className="text-right">
              <div className={['text-[15px] leading-5', entry.emphasized ? 'text-domain-wellbeing' : 'text-white'].join(' ')}>
                {entry.amount}
              </div>
              <div className="text-[12px] leading-4 text-white/40">{entry.secondary}</div>
            </div>
            <button type="button" onClick={() => onDelete(entry.id)} className="flex h-11 w-11 items-center justify-center rounded-full text-white/35" aria-label={`Delete water entry at ${entry.time}`}>
              ×
            </button>
          </div>
        ))}
        {entries.length === 0 && (
          <div className="px-4 py-5 text-center text-caption leading-[18px] text-white/40">No entries yet.</div>
        )}
      </Card>
    </section>
  )
}

function WeeklyChart() {
  const max = Math.max(...waterIntake.week.map((day) => day.target))

  return (
    <section className="mt-8 animate-fade-up" style={{ animationDelay: '240ms' }}>
      <Card>
        <div className="mb-5 flex items-center justify-between">
          <div className="text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">
            This week
          </div>
          <div className="text-caption leading-[18px] text-white/50">Avg 6.2/day</div>
        </div>

        <div className="relative h-[132px]">
          <div className="absolute left-0 right-0 top-[36px] border-t border-dashed border-white/20" aria-hidden="true" />
          <div className="absolute right-0 top-[24px] text-[10px] leading-[14px] text-white/25">Target</div>
          <div className="flex h-full items-end justify-between gap-2">
            {waterIntake.week.map((day, index) => {
              const height = day.future ? 4 : Math.max(10, Math.round((day.glasses / max) * 92))

              return (
                <div key={`${day.day}-${index}`} className="flex h-full flex-1 flex-col items-center justify-end">
                  <div className="mb-2 text-small font-semibold leading-[14px] text-white/60 tabular-nums">
                    {day.future ? '' : day.glasses}
                  </div>
                  <div
                    className={[
                      'w-6 rounded-t-sm',
                      day.future ? 'bg-white/[0.03]' : day.met ? 'bg-domain-wellbeing' : 'bg-domain-wellbeing/60',
                    ].join(' ')}
                    style={{ height }}
                    aria-hidden="true"
                  />
                  <div className="mt-2 flex h-5 flex-col items-center gap-1">
                    <span className={['text-[12px] leading-4', day.today ? 'text-white' : 'text-white/40'].join(' ')}>
                      {day.day}
                    </span>
                    {day.today && <span className="h-1 w-1 rounded-full bg-domain-wellbeing" aria-hidden="true" />}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Card>
    </section>
  )
}

function HydrationStats() {
  const stats = [
    { id: 'streak', icon: Flame, value: waterIntake.stats.streak, label: 'Day streak', tone: 'text-brand-orange' },
    { id: 'average', icon: BarChart3, value: waterIntake.stats.average, label: 'Avg glasses/day', tone: 'text-domain-wellbeing' },
    { id: 'best', icon: Trophy, value: waterIntake.stats.bestDay, label: 'Best day', tone: 'text-stalled-amber' },
  ]

  return (
    <Card variant="small" className="mt-4 rounded-md p-4 animate-fade-up" style={{ animationDelay: '320ms' }}>
      <div className="grid grid-cols-3 divide-x divide-white/[0.05]">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <div key={stat.id} className="flex flex-col items-center px-2 text-center">
              <Icon size={16} className={stat.tone} strokeWidth={2.2} />
              <div className="mt-2 text-[24px] font-bold leading-7 text-white tabular-nums">{stat.value}</div>
              <div className="mt-1 text-[12px] leading-4 text-white/50">{stat.label}</div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

export default function WaterIntakeScreen() {
  const [target, setTarget] = useState(waterIntake.targetGlasses)
  const [consumedMl, setConsumedMl] = useState(waterIntake.milliliters)
  const [entries, setEntries] = useState<DrinkEntry[]>(waterIntake.entries)
  const [showCustom, setShowCustom] = useState(false)
  const [showTarget, setShowTarget] = useState(false)
  const [customMl, setCustomMl] = useState('250')
  const [toast, setToast] = useState('')
  const [undoEntry, setUndoEntry] = useState<DrinkEntry | null>(null)
  const consumedMlRef = useRef(waterIntake.milliliters)
  const toastTimeout = useRef<number | null>(null)
  const targetMl = target * ML_PER_GLASS
  const consumedGlasses = Number((consumedMl / ML_PER_GLASS).toFixed(1))
  const achieved = consumedMl >= targetMl

  const showToast = (message: string, duration = 2800) => {
    if (toastTimeout.current) window.clearTimeout(toastTimeout.current)
    setToast(message)
    toastTimeout.current = window.setTimeout(() => {
      setToast('')
      setUndoEntry(null)
    }, duration)
  }

  const updateConsumedMl = (updater: (current: number) => number) => {
    const next = updater(consumedMlRef.current)
    consumedMlRef.current = next
    setConsumedMl(next)
    return next
  }

  const addWater = (ml: number, label = `${ml} ml`) => {
    const amountMl = Math.max(0, Math.round(ml))
    if (!amountMl) return

    const previousConsumedMl = consumedMlRef.current
    const glasses = amountMl / ML_PER_GLASS
    const secondary = label.includes('glass') ? `${amountMl} ml` : `${formatGlassCount(glasses)} ${glasses === 1 ? 'glass' : 'glasses'}`
    const nextConsumedMl = updateConsumedMl((current) => current + amountMl)
    setEntries((current) => [
      {
        id: `entry-${Date.now()}`,
        time: 'Now',
        amount: label,
        secondary,
        glasses,
        ml: amountMl,
        emphasized: true,
      },
      ...current,
    ])
    setUndoEntry(null)
    showToast(previousConsumedMl < targetMl && nextConsumedMl >= targetMl ? `Target achieved. +${waterIntake.xpReward} XP` : `Logged ${label}.`)
  }

  const deleteEntry = (id: string) => {
    const entry = entries.find((item) => item.id === id)
    setEntries((current) => current.filter((item) => item.id !== id))
    if (!entry) return
    updateConsumedMl((current) => Math.max(0, current - getEntryMl(entry)))
    setUndoEntry(entry)
    showToast(`Removed ${entry.amount}.`, 5000)
  }

  const restoreEntry = () => {
    if (!undoEntry) return
    setEntries((current) => [undoEntry, ...current])
    updateConsumedMl((current) => current + getEntryMl(undoEntry))
    setUndoEntry(null)
    showToast(`Restored ${undoEntry.amount}.`)
  }

  return (
    <PhoneFrame>
      <ScreenShell
        header={
          <DomainDashboardHeader
            title="Water intake"
            domain="wellbeing"
            backHref="/tabs/today"
            rightAction={
              <button type="button" onClick={() => setShowTarget(true)} className="flex h-11 w-11 items-center justify-center rounded-full" aria-label="Open water target settings">
                <Settings size={20} strokeWidth={2.1} />
              </button>
            }
          />
        }
        activeTab="today"
      >
        <main className="px-4 pb-20 pt-4">
          <section className="animate-fade-up">
            <WaterIntakeRing
              consumedGlasses={consumedGlasses}
              targetGlasses={target}
              milliliters={consumedMl}
              xpReward={waterIntake.xpReward}
              achievedAt={achieved ? 'now' : undefined}
            />
          </section>

          <section className="mt-8 flex gap-2 animate-fade-up" style={{ animationDelay: '80ms' }}>
            <QuickAddButton amount="1" unit="glass" primary onClick={() => addWater(250, '1 glass')} />
            <QuickAddButton amount="250" unit="ml" onClick={() => addWater(250)} />
            <QuickAddButton amount="500" unit="ml" onClick={() => addWater(500)} />
            <QuickAddButton amount="custom" unit="ml" onClick={() => setShowCustom(true)} />
          </section>

          {toast && (
            <div className="mt-4 flex min-h-11 items-center justify-between gap-3 rounded-md border border-domain-wellbeing/25 bg-domain-wellbeing/10 px-4 py-3 text-caption font-semibold text-domain-wellbeing" role="status">
              <span>{toast}</span>
              {undoEntry && (
                <button type="button" onClick={restoreEntry} className="min-h-11 rounded-pill border border-domain-wellbeing/30 px-3 text-[13px] font-semibold text-domain-wellbeing">
                  Undo
                </button>
              )}
            </div>
          )}

          <DrinkLog entries={entries} onDelete={deleteEntry} />
          <WeeklyChart />
          <HydrationStats />
        </main>

        {showCustom && (
          <div className="absolute inset-0 z-40 flex items-end bg-black/55 p-4" role="dialog" aria-modal="true" aria-label="Add custom water amount">
            <div className="w-full rounded-xl border border-white/[0.08] bg-ink-brown-800 p-5 shadow-3">
              <h2 className="text-h3 font-semibold text-white">Custom amount</h2>
              <label htmlFor="custom-water" className="mt-4 block text-caption font-semibold text-white/60">Milliliters</label>
              <input
                id="custom-water"
                inputMode="numeric"
                value={customMl}
                onChange={(event) => setCustomMl(event.target.value.replace(/\D/g, ''))}
                className="mt-2 h-[52px] w-full rounded-md border border-white/10 bg-ink-900 px-4 text-body text-white outline-none focus:border-domain-wellbeing"
              />
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setShowCustom(false)} className="h-12 rounded-pill border border-white/[0.08] text-[15px] font-semibold text-white/60">Cancel</button>
                <button type="button" onClick={() => { addWater(Number(customMl || 0)); setShowCustom(false) }} disabled={Number(customMl) <= 0} className="h-12 rounded-pill bg-brand-orange text-[15px] font-semibold text-white disabled:opacity-40">Log water</button>
              </div>
            </div>
          </div>
        )}

        {showTarget && (
          <div className="absolute inset-0 z-40 flex items-end bg-black/55 p-4" role="dialog" aria-modal="true" aria-label="Water target settings">
            <div className="w-full rounded-xl border border-white/[0.08] bg-ink-brown-800 p-5 shadow-3">
              <h2 className="text-h3 font-semibold text-white">Daily target</h2>
              <label htmlFor="water-target" className="mt-4 block text-caption font-semibold text-white/60">Glasses per day</label>
              <input
                id="water-target"
                type="range"
                min={4}
                max={12}
                value={target}
                onChange={(event) => setTarget(Number(event.target.value))}
                className="mt-4 w-full accent-domain-wellbeing"
                aria-label="Daily water target in glasses"
              />
              <p className="mt-3 text-center text-[24px] font-bold text-white">{target} glasses</p>
              <p className="mt-1 text-center text-caption leading-[18px] text-white/45">{targetMl} ml target</p>
              <button type="button" onClick={() => setShowTarget(false)} className="mt-4 h-12 w-full rounded-pill bg-brand-orange text-[15px] font-semibold text-white">Save target</button>
            </div>
          </div>
        )}
      </ScreenShell>
    </PhoneFrame>
  )
}
