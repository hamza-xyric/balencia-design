import { Calendar, Flame, Lock, Snowflake, Trophy, X } from 'lucide-react'
import {
  ArcGauge,
  BtnPrimary,
  CIAInsightCard,
  ConsentRail,
  GlassCard,
  HifiShell,
  Provenance,
  SectionTitle,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'

type DayState = 'active' | 'freeze' | 'missed' | 'future' | 'blank'

const may2026: Array<{ day: number; state: DayState }> = [
  { day: 1, state: 'blank' },
  ...Array.from({ length: 30 }, (_, index) => {
    const day = index + 2
    if (day === 10) return { day, state: 'freeze' as DayState }
    if (day === 18) return { day, state: 'missed' as DayState }
    if (day > 27) return { day, state: 'future' as DayState }
    return { day, state: 'active' as DayState }
  }),
]

const milestones = [
  { threshold: 7, label: 'First week', earned: true },
  { threshold: 14, label: 'Fortnight', earned: true },
  { threshold: 30, label: 'One month', earned: true },
  { threshold: 60, label: 'Two months', earned: false },
]

export function S59StreakDetails() {
  return (
    <HifiShell
      atmosphere="you"
      showTabBar={false}
      header={
        <TopBar
          title={
            <>
              Streak <span className="text-emphasis">details</span>
            </>
          }
        />
      }
    >
      <main className="space-y-4 px-4 pb-8 pt-3">
        <GlassCard tone="you" className="relative overflow-hidden">
          <div className="pointer-events-none absolute -top-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-brand-orange/20 blur-3xl" />
          <div className="relative flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-orange/80">
              <Flame size={13} strokeWidth={2.2} />
              Current streak
            </span>
            <p className="mt-3 text-[56px] font-semibold leading-none tracking-tight text-white tabular-nums">42</p>
            <p className="mt-2 text-[17px] font-medium text-white/85">Days strong</p>
            <div className="mt-3 flex items-center gap-2 text-[12px] text-white/55">
              <span className="tabular-nums">Longest: 67</span>
              <span className="h-3 w-px bg-white/15" />
              <span className="tabular-nums">63% of best</span>
            </div>
            <div className="mt-4">
              <Provenance items={['Via streaks']} />
            </div>
          </div>
        </GlassCard>

        <section className="space-y-2">
          <div className="flex items-end justify-between">
            <SectionTitle title="May 2026" />
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-wide text-white/45">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-brand-orange" />Active</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-white/50" />Freeze</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-white/20" />Missed</span>
            </div>
          </div>
          <SolidCard>
            <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] font-semibold uppercase text-white/45">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((weekday, index) => (
                <span key={index}>{weekday}</span>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-7 gap-1.5">
              {may2026.map(({ day, state }) => {
                if (state === 'blank') {
                  return (
                    <div
                      key={day}
                      role="img"
                      aria-label="Day 1, before this streak began"
                      className="aspect-square rounded-md border border-dashed border-white/10"
                    />
                  )
                }
                if (state === 'future') {
                  return (
                    <div
                      key={day}
                      role="img"
                      aria-label={`Day ${day}, future`}
                      className="aspect-square rounded-md bg-white/[0.02]"
                    />
                  )
                }
                if (state === 'freeze') {
                  return (
                    <button
                      key={day}
                      type="button"
                      aria-label={`Day ${day}, protected with a freeze`}
                      className="flex aspect-square min-h-11 items-center justify-center rounded-md bg-white/[0.08] text-white/70"
                    >
                      <Snowflake size={13} strokeWidth={2} />
                    </button>
                  )
                }
                if (state === 'missed') {
                  return (
                    <button
                      key={day}
                      type="button"
                      aria-label={`Day ${day}, missed`}
                      className="relative flex aspect-square min-h-11 items-center justify-center rounded-md bg-white/[0.05] text-[11px] font-medium text-white/45 tabular-nums"
                    >
                      {day}
                      <X size={8} strokeWidth={2.5} className="absolute right-1 top-1 text-white/40" aria-hidden="true" />
                    </button>
                  )
                }
                return (
                  <button
                    key={day}
                    type="button"
                    aria-label={`Day ${day}, active streak day`}
                    className="flex aspect-square min-h-11 items-center justify-center rounded-md bg-brand-orange/20 text-[11px] font-medium text-brand-orange tabular-nums"
                  >
                    {day}
                  </button>
                )
              })}
            </div>
          </SolidCard>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <SolidCard className="flex flex-col items-center py-4">
            <ArcGauge value="1.5x" label="XP multiplier" />
            <p className="mt-2 text-[11px] leading-4 text-white/45 tabular-nums">Next 2.0x at 60 days</p>
          </SolidCard>
          <SolidCard className="flex flex-col items-center justify-center gap-2 py-4 text-center">
            <p className="text-[11px] font-semibold uppercase leading-3 text-white/45">Recovery multiplier</p>
            <Lock size={18} className="text-white/25" strokeWidth={1.8} />
            <p className="text-[11px] leading-4 text-white/40">Unlocks at 50 days</p>
          </SolidCard>
        </section>

        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <SectionTitle title="Streak freezes" meta="Protects a missed day" />
            <span className="rounded-pill bg-white/[0.06] px-2.5 py-1 text-[12px] font-medium text-white/80 tabular-nums">2 available</span>
          </div>
          <SolidCard className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-white/70">
                <Snowflake size={18} strokeWidth={1.9} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] text-white/90">Use a freeze to protect today</p>
                <p className="text-[12px] leading-4 text-white/45">The streak stays intact if today goes unlogged</p>
              </div>
            </div>
            <BtnPrimary className="w-full">Use freeze</BtnPrimary>
          </SolidCard>
        </section>

        <section className="space-y-2">
          <SectionTitle title="Milestones" meta="Earned days stay yours" />
          <SolidCard className="divide-y divide-white/[0.06] p-0">
            {milestones.map(milestone => (
              <div key={milestone.threshold} className="flex min-h-11 items-center gap-3 px-4 py-3">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full border ${
                    milestone.earned
                      ? 'border-forest-green/35 bg-forest-green/15 text-forest-green'
                      : 'border-white/10 bg-white/[0.02] text-white/25'
                  }`}
                >
                  {milestone.earned ? <Flame size={15} strokeWidth={2} /> : <Lock size={15} strokeWidth={1.8} />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className={`text-[14px] ${milestone.earned ? 'text-white' : 'text-white/40'}`}>
                    <span className="tabular-nums">{milestone.threshold}</span> days
                  </p>
                  <p className="text-[11px] leading-4 text-white/40">{milestone.label}</p>
                </div>
                {milestone.earned && (
                  <span className="rounded-pill bg-forest-green/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-forest-green">
                    Earned
                  </span>
                )}
              </div>
            ))}
          </SolidCard>
        </section>

        <section className="space-y-2">
          <SectionTitle title="Streak history" meta="Previous runs" />
          <SolidCard>
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.04] text-brand-orange/70">
                <Trophy size={17} strokeWidth={1.9} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between">
                  <span className="text-[16px] font-medium text-white tabular-nums">67 days</span>
                  <span className="text-[11px] text-white/40">March 2026</span>
                </div>
                <p className="mt-0.5 text-[12px] leading-4 text-white/45">Ended: travel</p>
              </div>
            </div>
          </SolidCard>
        </section>

        <CIAInsightCard eyebrow="Streak support" provenance={['CIA synthesis']}>
          The March break did not erase the missions built during those 67 days. Showing up again is what
          keeps the pattern going, not an unbroken count.
        </CIAInsightCard>

        <SolidCard>
          <SectionTitle title="Data and consent" meta="Streaks" />
          <dl className="mt-3 space-y-2 text-[13px] leading-4">
            <div className="flex items-center justify-between border-b border-white/[0.05] pb-2">
              <dt className="text-white/50">Category</dt>
              <dd className="text-white/85">Consistency</dd>
            </div>
            <div className="flex items-center justify-between border-b border-white/[0.05] pb-2">
              <dt className="text-white/50">Source</dt>
              <dd className="text-white/85">Habit and mission logs</dd>
            </div>
            <div className="flex items-center justify-between border-b border-white/[0.05] pb-2">
              <dt className="text-white/50">Scope</dt>
              <dd className="text-white/85">Streak calendar only</dd>
            </div>
            <div className="flex items-center justify-between pb-1">
              <dt className="text-white/50">Retention</dt>
              <dd className="text-white/85">Until revoked</dd>
            </div>
          </dl>
          <ConsentRail compact />
        </SolidCard>

        <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-white/45">
          <Calendar size={13} strokeWidth={1.9} />
          Edge swipe back returns to where you opened this from.
        </div>
      </main>
    </HifiShell>
  )
}
