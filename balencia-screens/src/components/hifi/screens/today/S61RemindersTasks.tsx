import { Bell, CalendarClock, Check, ChevronRight, Plus } from 'lucide-react'
import {
  BtnGhost,
  BtnSecondary,
  CIAInsightCard,
  ConsentRail,
  GlassCard,
  HifiShell,
  IconButton,
  ProgressBar,
  Provenance,
  SectionTitle,
  SolidCard,
  TopBar,
  cx,
} from '@/components/hifi/kit'

// Stack-pushed execution ledger opened from Home, Schedule, Me, or CIA Chat —
// it has no live route of its own, so no tab bar renders. Chosen state:
// default, mid-day, six of nine tasks resolved. Skeleton (band, KPI blocks,
// and rows shimmer in their final geometry), cold-start empty (band and
// lists replaced by a New task / Ask CIA prompt), error (cached rows stay
// visible, Retry preserves queued writes), and offline queuing ("saving when
// online" row badges) are documented in the source spec rather than
// duplicated here — static prototype, no handlers. The wind-down reminder
// below renders its honest real default (off, no delivery channel chosen
// yet) rather than an invented "on" illustration.
export function S61RemindersTasks() {
  return (
    <HifiShell
      header={
        <TopBar
          title={<>Reminders &amp; <span className="text-emphasis">tasks</span></>}
          eyebrow="Synced 10 minutes ago"
          right={
            <IconButton label="Create task or reminder">
              <Plus className="h-5 w-5" strokeWidth={2} />
            </IconButton>
          }
        />
      }
      showTabBar={false}
    >
      <main className="space-y-5 px-4 pb-8 pt-3">
        <GlassCard tone="you">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-wide text-white/45">Today</p>
              <p className="mt-1 text-[19px] font-semibold leading-6 text-white">
                <span className="tabular-nums">6</span> of <span className="tabular-nums">9</span> done
              </p>
            </div>
            <span className="text-[30px] font-semibold leading-8 tabular-nums text-brand-orange">67%</span>
          </div>
          <div className="mt-3">
            <ProgressBar value={67} tone="you" />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-4 text-[13px] text-white/70">
              <span>Done <span className="font-semibold tabular-nums text-white">6</span></span>
              <span>Open <span className="font-semibold tabular-nums text-white">3</span></span>
            </div>
            <Provenance items={['Via tasks sync']} />
          </div>
        </GlassCard>

        <section className="space-y-2.5">
          <SectionTitle title="Today" meta="3 open" />
          <SolidCard className="p-0">
            <div className="divide-y divide-white/[0.06]">
              <TaskRow time="9:30" title="Take medication" domain="Health" domainClass="bg-domain-wellbeing/15 text-domain-wellbeing" meta="Daily" state="open" />
              <TaskRow time="12:45" title="Walk after lunch" domain="Fit" domainClass="bg-domain-fitness/15 text-domain-fitness" meta="15 minutes" state="open" />
              <TaskRow time="8:00" title="Check resting HRV" domain="Health" domainClass="bg-domain-wellbeing/15 text-domain-wellbeing" meta="Synced" state="done" />
            </div>
          </SolidCard>
        </section>

        <section className="space-y-2.5">
          <SectionTitle title="Upcoming" meta="Tomorrow" />
          <SolidCard className="p-0">
            <button
              type="button"
              aria-label="Book lab follow-up, tomorrow, unscheduled"
              className="flex min-h-[64px] w-full items-center gap-3 p-4 text-left"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-white/50">
                <CalendarClock className="h-5 w-5" strokeWidth={1.9} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] text-white">Book lab follow-up</span>
                <span className="mt-0.5 block text-[12px] text-white/40">Tomorrow &middot; unscheduled</span>
              </span>
              <ChevronRight className="h-5 w-5 shrink-0 text-white/30" strokeWidth={1.9} />
            </button>
          </SolidCard>
        </section>

        <section className="space-y-2.5">
          <SectionTitle title="Active reminders" meta="3 of 4 on" />
          <SolidCard className="p-0">
            <div className="divide-y divide-white/[0.06]">
              <ReminderRow label="Medication reminder" detail="Push &middot; 9:00 am &middot; You allowed" on />
              <ReminderRow label="Wind-down reminder" detail="Choose a delivery channel" on={false} />
            </div>
          </SolidCard>
        </section>

        <section className="space-y-2.5">
          <SectionTitle title="Completed today" meta="6 done" />
          <CIAInsightCard
            eyebrow="CIA suggests"
            provenance={['Via schedule + missions']}
            actions={
              <>
                <BtnSecondary>
                  <Plus className="mr-1.5 h-4 w-4" strokeWidth={2} />
                  Add task
                </BtnSecondary>
                <BtnGhost>Ask CIA</BtnGhost>
              </>
            }
          >
            A five-minute stretch fits before your appointment.
          </CIAInsightCard>
        </section>

        <div className="pt-1">
          <p className="text-center text-[12px] leading-4 text-white/45">
            Reminders sync from tasks and your schedule. Manage sources anytime.
          </p>
          <div className="mt-3 flex justify-center">
            <ConsentRail compact />
          </div>
        </div>
      </main>
    </HifiShell>
  )
}

// NEW: CheckboxControl row. 44px checkbox target; not-done renders an empty
// outline, done renders the filled green stroke — state is announced, never
// color-only.
function TaskRow({
  time,
  title,
  domain,
  domainClass,
  meta,
  state,
}: {
  time: string
  title: string
  domain: string
  domainClass: string
  meta: string
  state: 'open' | 'done'
}) {
  const done = state === 'done'
  return (
    <div className={cx('flex min-h-[64px] items-center gap-3 p-4', done && 'opacity-55')}>
      <span
        role="checkbox"
        aria-checked={done}
        aria-label={`${time}, ${title}, ${done ? 'done' : 'not done'}`}
        tabIndex={0}
        className={cx(
          'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border',
          done
            ? 'border-forest-green/40 bg-forest-green/15 text-forest-green shadow-[var(--glow-green-sm)]'
            : 'border-white/15 bg-white/[0.03]',
        )}
      >
        {done && <Check className="h-5 w-5" strokeWidth={2.6} />}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-[13px] font-semibold tabular-nums text-brand-orange">{time}</span>
          <span className={cx('text-[15px] text-white', done && 'text-white/55 line-through decoration-white/25')}>{title}</span>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <span className={cx('rounded-pill px-2 py-0.5 text-[11px] font-semibold', domainClass)}>{domain}</span>
          <span className="text-[11px] text-white/45">{meta}</span>
        </div>
      </div>
    </div>
  )
}

// Reminder toggle row. Off state names the reason inline ("choose a delivery
// channel") instead of hiding the row — consent honesty over a tidy list.
function ReminderRow({ label, detail, on }: { label: string; detail: string; on: boolean }) {
  return (
    <div className={cx('flex min-h-[64px] items-center gap-3 p-4', !on && 'opacity-70')}>
      <span
        className={cx(
          'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
          on ? 'bg-brand-orange/15 text-brand-orange' : 'border border-white/10 bg-white/[0.03] text-white/35',
        )}
      >
        <Bell className="h-5 w-5" strokeWidth={1.9} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[15px] text-white">{label}</p>
        <p className="mt-0.5 text-[11px] text-white/45">{detail}</p>
      </div>
      <span
        role="switch"
        aria-checked={on}
        aria-label={`${label}, currently ${on ? 'on' : 'off'}`}
        tabIndex={0}
        className="flex h-11 w-12 shrink-0 items-center"
      >
        <span
          aria-hidden="true"
          className={cx('relative flex h-7 w-12 items-center rounded-pill p-1', on ? 'bg-brand-orange shadow-[var(--glow-orange-sm)]' : 'bg-white/10')}
        >
          <span className={cx('h-5 w-5 rounded-full bg-paper-50 transition-transform', on ? 'translate-x-5' : 'translate-x-0')} />
        </span>
      </span>
    </div>
  )
}
