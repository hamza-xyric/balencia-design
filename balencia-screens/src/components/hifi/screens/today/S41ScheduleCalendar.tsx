import { GripVertical, Plus, RefreshCw } from 'lucide-react'
import {
  BtnGhost,
  ChargeMeter,
  Chip,
  CIAInsightCard,
  ConsentRail,
  cx,
  DonutHub,
  GlassCard,
  HifiShell,
  IconButton,
  Provenance,
  SectionTitle,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'

// Schedule, chosen state: default day view — synced, one CIA suggestion,
// one missed event handled with zero-shame reschedule copy. Overpacked
// (charge meter near-full, recovery-first CIA copy), cold-start (consent
// card, honest-null donut), stale/offline (cached list, disabled add), and
// revoked (manual tasks + CIA suggestions honest-null) share this layout
// and are not rendered in parallel here, per catalog.

const days = [
  { label: 'M', today: false, done: true },
  { label: 'T', today: false, done: true },
  { label: 'W', today: false, done: false },
  { label: 'T', today: true, done: false },
  { label: 'F', today: false, done: false },
  { label: 'S', today: false, done: false },
  { label: 'S', today: false, done: false },
] as const

const hours = ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM'] as const

export function S41ScheduleCalendar() {
  return (
    <HifiShell
      header={
        <TopBar
          title="Schedule"
          right={
            <div className="flex items-center gap-1.5">
              <button type="button" aria-label="Manage calendar connection" className="flex min-h-11 items-center gap-1.5 rounded-pill border border-white/10 bg-white/[0.04] px-3 text-[11px] font-medium text-white/60">
                <RefreshCw size={12} strokeWidth={2} /> Synced 2m ago
              </button>
              <IconButton label="Add event or task"><Plus size={19} strokeWidth={2} /></IconButton>
            </div>
          }
        />
      }
      atmosphere="you"
      activeTab="today"
    >
      <main className="space-y-4 px-4 pb-4 pt-2">
        <div role="tablist" aria-label="Schedule view" className="flex h-11 items-center gap-1 rounded-pill border border-white/10 bg-white/[0.03] p-1">
          {['Day', 'Week', 'Month'].map(view => (
            <button
              key={view}
              type="button"
              role="tab"
              aria-selected={view === 'Day'}
              className={cx('flex h-full flex-1 items-center justify-center rounded-pill text-[13px] font-medium', view === 'Day' ? 'bg-white/10 text-white' : 'text-white/45')}
            >
              {view}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-1.5" role="img" aria-label="Week strip, Thursday selected, Monday and Tuesday completed">
          {days.map((day, index) => (
            <div key={index} className="flex flex-1 flex-col items-center gap-1.5">
              <span className={cx(
                'flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-medium',
                day.today ? 'border-2 border-brand-orange text-white' : 'text-white/55',
              )}>
                {day.label}
              </span>
              <span className={cx('h-1 w-1 rounded-full', day.done ? 'bg-forest-green' : 'bg-transparent')} />
            </div>
          ))}
        </div>

        <SolidCard>
          <div className="flex items-center gap-4">
            <DonutHub
              size={92}
              value="2h 15m"
              label="Scheduled"
              segments={[
                { percent: 66.7, className: 'stroke-domain-career', label: 'Career' },
                { percent: 33.3, className: 'stroke-domain-fitness', label: 'Fitness' },
              ]}
            />
            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 shrink-0 rounded-sm bg-domain-career" />
                <span className="text-[12px] text-white/70">Career</span>
                <span className="text-[12px] font-medium text-white/45 tabular-nums">1h 30m</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 shrink-0 rounded-sm bg-domain-fitness" />
                <span className="text-[12px] text-white/70">Fitness</span>
                <span className="text-[12px] font-medium text-white/45 tabular-nums">45m</span>
              </div>
              <Provenance items={['Via Google Calendar']} />
            </div>
          </div>
          <div className="mt-4 border-t border-white/[0.06] pt-3">
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] font-semibold uppercase leading-4 text-white/45">Day fullness</span>
              <span className="text-[12px] font-medium text-white/60 tabular-nums">4h 30m of 16h</span>
            </div>
            <div className="mt-2"><ChargeMeter ticks={16} filled={4} label="4 of 16 waking hours scheduled" /></div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[12px] font-medium text-brand-orange">Room to breathe</span>
              <Provenance items={['Via sleep schedule']} />
            </div>
          </div>
        </SolidCard>

        <GlassCard tone="cia">
          <CIAInsightCard
            eyebrow="CIA suggestion"
            actions={
              <>
                <BtnGhost quiet>Dismiss</BtnGhost>
                <BtnGhost>See it</BtnGhost>
              </>
            }
          >
            <p className="text-[15px] leading-[21px] text-white">
              Open time this afternoon for a short <span className="text-emphasis">walk</span> &mdash; see below.
            </p>
          </CIAInsightCard>
        </GlassCard>

        <section>
          <SectionTitle title="Unscheduled" meta="2 items" />
          <div className="mt-2 space-y-2">
            <div className="flex min-h-14 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4">
              <span className="h-2 w-2 shrink-0 rounded-full bg-domain-career" aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-medium text-white">Deep work block</p>
                <p className="text-[11px] text-white/40">2h &middot; Career</p>
              </div>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center text-white/30" aria-label="Drag to reorder">
                <GripVertical size={18} strokeWidth={1.9} />
              </span>
            </div>
            <div className="flex min-h-14 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4">
              <span className="h-2 w-2 shrink-0 rounded-full bg-domain-learning" aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-medium text-white">Read 10 pages</p>
                <p className="text-[11px] text-white/40">15m &middot; Learning</p>
              </div>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center text-white/30" aria-label="Drag to reorder">
                <GripVertical size={18} strokeWidth={1.9} />
              </span>
            </div>
          </div>
        </section>

        <section>
          <SectionTitle title="Timeline" meta="Today" />
          <div className="relative mt-3 space-y-7 pl-11">
            {hours.map((hour, index) => (
              <div key={hour} className="relative">
                <span className="absolute -left-11 top-[-6px] text-[10px] font-medium text-white/30 tabular-nums">{hour}</span>
                <div className="h-px w-full bg-white/[0.05]" />

                {index === 1 && (
                  <div className="absolute left-0 top-2.5 w-full rounded-2xl border-l-[3px] border-domain-career bg-white/[0.04] p-3 shadow-[var(--glow-orange-sm)]">
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <span className="inline-block rounded-pill bg-domain-career/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-domain-career">Career</span>
                        <p className="mt-1 text-[14px] font-medium text-white">Team sync</p>
                      </div>
                      <Provenance items={['Via Google Calendar']} />
                    </div>
                  </div>
                )}

                {index === 4 && (
                  <div className="absolute left-0 top-2.5 w-full rounded-2xl border border-dashed border-royal-purple/50 bg-royal-purple/[0.05] p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <span className="inline-block rounded-pill bg-royal-purple/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-royal-purple">CIA fit</span>
                        <p className="mt-1 text-[14px] font-medium text-white">Lunch walk</p>
                      </div>
                      <Chip tone="cia">Projected</Chip>
                    </div>
                  </div>
                )}

                {index === 6 && (
                  <div className="absolute left-0 top-2.5 w-full rounded-2xl border border-dashed border-white/15 bg-white/[0.015] p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <span className="inline-block rounded-pill bg-white/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white/50">Missed</span>
                        <p className="mt-1 text-[14px] font-medium text-white/60">1:1 with Aisha</p>
                      </div>
                      <button type="button" className="flex min-h-11 items-center text-[12px] font-medium text-white/45">Reschedule</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <GlassCard tone="muted">
          <p className="text-[12px] leading-4 text-white/55">
            Schedule reads calendar events and your sleep window to keep the day honest, not fabricated.
          </p>
          <ConsentRail compact />
        </GlassCard>
      </main>
    </HifiShell>
  )
}
