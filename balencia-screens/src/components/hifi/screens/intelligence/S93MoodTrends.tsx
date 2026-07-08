import { CircleHelp, Lock, Plus } from 'lucide-react'
import {
  BtnGhost,
  Chip,
  CIAInsightCard,
  ConsentRail,
  GlassCard,
  HifiShell,
  IconButton,
  Provenance,
  SafetyCard,
  SolidCard,
  TopBar,
  TrendChart,
} from '@/components/hifi/kit'

// Mood trends, chosen state: default — 7-day window with four real
// check-ins, a dashed low-confidence context line, and two journal-day
// markers. Partial (sparse dots, no connecting line), honest-null ("log
// mood" invite with safety still visible), stale/offline (cached trend,
// named failed source), and the 30D/90D/1Y paywall are documented in the
// source spec and not rendered in parallel here, per catalog.

const recent = [
  { date: 'Jul 7', mood: 'steady' },
  { date: 'Jul 6', mood: 'low' },
] as const

export function S93MoodTrends() {
  return (
    <HifiShell
      header={
        <TopBar
          title="Mood"
          right={
            <div className="flex items-center gap-1">
              <IconButton label="Log mood"><Plus size={18} strokeWidth={2} /></IconButton>
              <IconButton label="Help and crisis resources"><CircleHelp size={18} strokeWidth={1.9} /></IconButton>
            </div>
          }
        />
      }
      atmosphere="you"
      activeTab="me"
    >
      <main className="space-y-4 px-4 pb-4 pt-3">
        <div role="tablist" aria-label="Timeframe" className="flex h-11 items-center gap-1 rounded-pill border border-white/10 bg-white/[0.03] p-1">
          <button type="button" role="tab" aria-selected={true} className="flex h-full flex-1 items-center justify-center rounded-pill bg-white/10 text-[13px] font-semibold text-white">
            7D
          </button>
          <button type="button" role="tab" aria-selected={false} className="flex h-full flex-1 items-center justify-center rounded-pill text-[13px] font-medium text-white/45">
            30D
          </button>
          <button type="button" role="tab" aria-selected={false} aria-disabled="true" className="flex h-full flex-1 items-center justify-center gap-1 rounded-pill text-[12px] font-medium text-white/30">
            <Lock size={11} strokeWidth={2} /> 90D
          </button>
          <button type="button" role="tab" aria-selected={false} aria-disabled="true" className="flex h-full flex-1 items-center justify-center gap-1 rounded-pill text-[12px] font-medium text-white/30">
            <Lock size={11} strokeWidth={2} /> 1Y
          </button>
        </div>

        <GlassCard tone="you">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-orange">Today feels</p>
            <span className="text-[11px] text-white/40 tabular-nums">Jul 7</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-[30px] font-semibold leading-9 text-white tabular-nums">6</span>
            <span className="text-[14px] text-white/40">/10</span>
            <span className="text-[17px] text-white/85">
              <span className="text-emphasis">steady</span>
            </span>
          </div>
          <div className="mt-2"><Provenance items={['Via check-in']} /></div>
        </GlassCard>

        <SafetyCard />

        <SolidCard>
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-semibold text-white">Mood trend</p>
            <span className="text-[11px] text-white/40">7-day window</span>
          </div>
          <div className="mt-3">
            <TrendChart
              past={[5, 6, 5, 6]}
              projected={[6, 7, 6]}
              milestones={[1, 3]}
              height={100}
              label="Mood trend, 4 real check-in values ranging from 5 to 6, with 2 journal-day markers, plus 3 days of estimated context"
            />
          </div>
          <div className="mt-2 grid grid-cols-7 text-center text-[10px] text-white/35">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-white/10 pt-3 text-[11px] text-white/45">
            <span className="flex items-center gap-1.5"><span className="h-0.5 w-3 bg-brand-orange" /> Mood, real</span>
            <span className="flex items-center gap-1.5"><span className="h-0.5 w-3 border-t border-dashed border-royal-purple" /> Estimated context</span>
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-forest-green" /> Journal days</span>
          </div>
        </SolidCard>

        <CIAInsightCard provenance={['4 check-ins', '3 journal entries']} actions={<BtnGhost className="px-0">Discuss patterns with CIA &rarr;</BtnGhost>}>
          <p>Mood higher on journal days in this window. An observation, not a diagnosis.</p>
        </CIAInsightCard>

        <SolidCard>
          <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">Recent</p>
          <div className="mt-2 space-y-1.5">
            {recent.map(row => (
              <button key={row.date} type="button" className="flex min-h-11 w-full items-center justify-between rounded-lg bg-white/[0.03] px-3">
                <span className="text-[12px] text-white/45 tabular-nums">{row.date}</span>
                <Chip>{row.mood}</Chip>
              </button>
            ))}
            <button type="button" className="flex min-h-11 w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-white/15 text-[13px] font-medium text-brand-orange">
              <Plus size={15} strokeWidth={2} /> Add note
            </button>
          </div>
        </SolidCard>

        <GlassCard tone="muted">
          <p className="text-[12px] font-semibold uppercase text-white/45">Data & consent</p>
          <p className="mt-1 text-[12px] leading-4 text-white/55">
            Mood, journal, and health-context sharing can be revoked or exported any time.
          </p>
          <ConsentRail compact />
        </GlassCard>
      </main>
    </HifiShell>
  )
}
