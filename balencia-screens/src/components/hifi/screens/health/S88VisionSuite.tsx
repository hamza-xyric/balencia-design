import { Bell, Info, Play, Shield, ShieldCheck } from 'lucide-react'
import {
  BtnPrimary,
  Chip,
  ConsentRail,
  cx,
  GlassCard,
  HifiShell,
  IconButton,
  ProgressRing,
  Provenance,
  SolidCard,
  TopBar,
  TrendChart,
} from '@/components/hifi/kit'

const visionTools = ['Eye test', 'Exercises', 'Strain']
const strainDays = ['Mon', 'Tue', 'Wed']

// Vision suite, default state: today's care hero, Exercises tab selected
// (20-20-20 reset with a live timer ring), a three-day strain trend, urgent
// safety guidance, and screen-health consent. Skeleton (timer/tab/chart
// geometry preserved, no invented score), empty (exercise/eye-test/strain-log
// entry points, no pressure), and disabled (motion, permission, or
// connectivity reasons) are documented in the source spec and not rendered
// in parallel here, per catalog.

export function S88VisionSuite() {
  return (
    <HifiShell
      header={
        <TopBar
          title={
            <>
              Vision <span className="text-emphasis">suite</span>
            </>
          }
          right={
            <div className="flex items-center gap-1">
              <IconButton label="Vision reminders">
                <Bell size={18} strokeWidth={1.9} />
              </IconButton>
              <IconButton label="Vision suite information">
                <Info size={18} strokeWidth={1.9} />
              </IconButton>
            </div>
          }
        />
      }
      activeTab="today"
      atmosphere="you"
    >
      <main className="space-y-4 px-4 pb-6 pt-3">
        <GlassCard tone="you">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-orange">Vision check-in</p>
          <h2 className="mt-1 text-[20px] font-semibold leading-6 text-white">Eye care today</h2>
          <div className="mt-4 flex items-end justify-between gap-4 border-t border-white/10 pt-4">
            <div>
              <p className="text-[12px] text-white/55">Exercise</p>
              <p className="mt-1 text-[26px] font-semibold text-white tabular-nums">2:00</p>
              <p className="text-[11px] text-white/40">Min remaining</p>
            </div>
            <div className="text-right">
              <p className="text-[12px] text-white/55">Last eye test</p>
              <p className="mt-1 text-[15px] font-medium text-white/90">Non-diagnostic</p>
              <p className="text-[11px] text-white/40">Via wellbeing log</p>
            </div>
          </div>
          <div className="mt-3">
            <Provenance items={['Manual note', 'Updated 2h ago']} />
          </div>
        </GlassCard>

        <div role="tablist" aria-label="Vision tools" className="grid grid-cols-3 gap-1 rounded-2xl border border-white/10 bg-white/[0.04] p-1">
          {visionTools.map((tool, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={index === 1}
              className={cx(
                'flex min-h-11 items-center justify-center rounded-xl px-3 text-[13px] font-medium',
                index === 1 ? 'bg-brand-orange text-white shadow-[var(--glow-orange-sm)]' : 'text-white/55',
              )}
            >
              {tool}
            </button>
          ))}
        </div>

        <GlassCard tone="you">
          <div className="flex items-center gap-4">
            <div className="min-w-0 flex-1">
              <h3 className="text-[15px] font-semibold text-white">20-20-20 reset</h3>
              <p className="mt-1 text-[13px] leading-5 text-white/65">Look 20 feet away for 20 seconds.</p>
              <div className="mt-3">
                <BtnPrimary className="h-11 text-[14px]">
                  <Play size={15} strokeWidth={2} className="mr-2" aria-hidden="true" />
                  Start eye exercise
                </BtnPrimary>
              </div>
            </div>
            <ProgressRing percent={25} value="15s" label="Remaining" size={76} />
          </div>
          <p className="mt-3 border-t border-white/10 pt-3 text-[11px] text-white/40">Reduced motion shows elapsed time as text, with no animated arc.</p>
        </GlassCard>

        <SolidCard>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-[14px] font-semibold text-white">Strain notes</h3>
            <Chip>3 days</Chip>
          </div>
          <TrendChart past={[1, 2, 1]} height={70} label="Strain cadence: Monday low, Tuesday medium, Wednesday low" />
          <div className="mt-2 flex gap-2">
            {strainDays.map((day, index) => (
              <span key={index} className="flex-1 text-center text-[10px] text-white/35">{day}</span>
            ))}
          </div>
          <div className="mt-3 border-t border-white/10 pt-3">
            <Provenance items={['Manual log', '3 entries']} />
          </div>
        </SolidCard>

        <SolidCard className="border-white/10">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-white/70">
              <Shield size={19} strokeWidth={1.9} aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="text-[15px] font-semibold leading-5 text-white">Not a diagnosis</h3>
              <p className="mt-1 text-[12px] leading-4 text-white/55">
                Sudden vision changes need a clinician. Flashes, floaters, or sharp pain need urgent care.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] text-[13px] font-semibold text-white/80"
          >
            <ShieldCheck size={16} strokeWidth={1.9} aria-hidden="true" />
            Find urgent guidance
          </button>
        </SolidCard>

        <GlassCard tone="muted">
          <h3 className="text-[14px] font-semibold text-white">Screen-health log</h3>
          <p className="mt-1 text-[12px] text-white/50">Non-diagnostic and private by default. Manage how this log is used.</p>
          <div className="mt-4 flex min-h-11 items-center justify-between rounded-2xl border border-white/10 bg-ink-900/40 px-3 py-2.5">
            <div>
              <p className="text-[13px] font-medium text-white">Wellbeing log</p>
              <p className="text-[11px] text-white/40">Local only, no cloud sync</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked="true"
              aria-label="Toggle wellbeing log consent"
              className="relative h-7 w-12 rounded-pill bg-brand-orange"
            >
              <span className="absolute right-1 top-1 h-5 w-5 rounded-full bg-white" />
            </button>
          </div>
          <ConsentRail compact />
        </GlassCard>
      </main>
    </HifiShell>
  )
}
