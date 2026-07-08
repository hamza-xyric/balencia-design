import type { LucideIcon } from 'lucide-react'
import { AlertTriangle, ChevronRight, FileCheck2, Flame, Lock, MessageSquareHeart, ShieldCheck, Users, WifiOff } from 'lucide-react'
import {
  BtnSecondary,
  Chip,
  CIAInsightCard,
  GlassCard,
  HifiShell,
  IconButton,
  ProgressBar,
  ProgressRing,
  SectionTitle,
  SolidCard,
  TopBar,
  TrendChart,
  cx,
} from '@/components/hifi/kit'
import { persona } from '@/data/hifi/persona'

// Reputation — community trust standing with transparency and due process.
// Chosen state: default, good standing, 0 active flags. Per the build
// card's "states woven into default," the breakdown rows each carry an
// independent honesty state (three real, one low-confidence) and one row
// sits behind a premium lock, alongside an offline + sync-error demo. The
// Flagged state layers a private review panel above the CIA insight when
// flags > 0 — mutually exclusive with "no active flags," so the panel
// itself (same layout, evidence + policy link + appeal path) isn't shown
// in parallel here.

const breakdown: Array<{ label: string; value: number; source: string; icon: LucideIcon; muted: boolean }> = [
  { label: 'Consistency', value: 84, source: 'Via activity', icon: Flame, muted: false },
  { label: 'Helpfulness', value: 88, source: 'Via feed', icon: MessageSquareHeart, muted: false },
  { label: 'Engagement', value: 74, source: 'Estimated · low confidence', icon: Users, muted: true },
  { label: 'Accountability', value: 61, source: 'Via contracts', icon: FileCheck2, muted: false },
]

const historyEvents: Array<{ label: string; when: string; done: boolean }> = [
  { label: 'Joined community', when: '4 months ago', done: false },
  { label: 'First helpful reply', when: '3 months ago', done: false },
  { label: 'Reached journeyman', when: '6 weeks ago', done: false },
  { label: 'Reached mentor', when: '2 weeks ago', done: true },
]

function ConfidenceMeter({ level }: { level: 'low' | 'medium' | 'high' }) {
  const filled = level === 'high' ? 3 : level === 'medium' ? 2 : 1
  return (
    <span className="flex items-center gap-1" role="img" aria-label={`Confidence ${level}`}>
      {Array.from({ length: 3 }).map((_, index) => (
        <span key={index} className={cx('h-1.5 w-1.5 rounded-full', index < filled ? 'bg-white/60' : 'bg-white/15')} />
      ))}
    </span>
  )
}

export function S92Reputation() {
  return (
    <HifiShell
      header={
        <TopBar
          title="Reputation"
          right={
            <IconButton label="Safety center">
              <ShieldCheck size={20} strokeWidth={1.9} />
            </IconButton>
          }
        />
      }
      activeTab="me"
      atmosphere="you"
    >
      <main className="space-y-4 px-4 pb-6 pt-2">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-[13px] font-semibold text-white/80">
              {persona.firstName.slice(0, 2).toUpperCase()}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[15px] font-medium leading-tight text-white">{persona.firstName}</p>
              <p className="text-[12px] leading-tight text-white/50">
                View your <span className="text-emphasis">reputation</span>
              </p>
            </div>
          </div>
          <Chip tone="done">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={13} strokeWidth={2} /> Trusted
            </span>
          </Chip>
        </div>

        <GlassCard tone="you" className="flex flex-col items-center text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">Composite trust score</p>
          <div className="mt-4">
            <ProgressRing percent={82} value="82" label="Trust score" size={148} tone="you" />
          </div>
          <span className="mt-4 inline-flex h-8 items-center rounded-pill bg-brand-orange/15 px-3 text-[12px] font-semibold uppercase tracking-wide text-brand-orange">
            Mentor tier
          </span>
          <div className="mt-4 w-full space-y-2">
            <div className="flex items-center justify-between text-[12px] text-white/50">
              <span>18 points to next tier</span>
              <span className="tabular-nums text-white/70">82 / 100</span>
            </div>
            <ProgressBar value={82} tone="you" />
          </div>
          <div className="mt-3"><Chip>Via community + contracts</Chip></div>
        </GlassCard>

        <div className="space-y-2">
          <SectionTitle title="Breakdown" meta="Source-specific" />
          <div className="surface-warm divide-y divide-white/[0.06] overflow-hidden">
            {breakdown.map(row => (
              <div key={row.label} className="flex items-center gap-3 p-4">
                <row.icon size={16} className="shrink-0 text-brand-orange" strokeWidth={1.8} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className={cx('text-[13px] text-white/85', row.muted && 'opacity-60')}>{row.label}</span>
                    <span className={cx('text-[13px] tabular-nums text-white/60', row.muted && 'opacity-60')}>{row.value}</span>
                  </div>
                  <div className="mt-1.5"><ProgressBar value={row.value} tone={row.muted ? 'muted' : 'you'} /></div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <span className="text-right text-[10px] uppercase tracking-wide text-white/40">{row.source}</span>
                  {row.muted && <ConfidenceMeter level="low" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <SectionTitle title="Reputation history" meta="Past 30 days" />
          <SolidCard>
            <TrendChart past={[65, 70, 74, 78, 82]} height={72} label="Trust score trend, past 30 days" />
          </SolidCard>
          <div className="surface-warm space-y-3 p-4">
            {historyEvents.map(event => (
              <div key={event.label} className="flex items-center gap-3">
                <span className={cx('h-2 w-2 shrink-0 rounded-full', event.done ? 'bg-forest-green' : 'bg-white/25')} aria-hidden="true" />
                <span className="min-w-0 flex-1 truncate text-[13px] text-white/75">{event.label}</span>
                <span className="shrink-0 text-[11px] text-white/45">{event.when}</span>
              </div>
            ))}
          </div>
        </div>

        <CIAInsightCard eyebrow="CIA insight" provenance={['Synthesized', 'Updated 1h ago']}>
          <p>Your helpful replies are lifting trust this week.</p>
        </CIAInsightCard>

        <div className="space-y-2">
          <SectionTitle title="Privacy & safety" meta="Visible to you only" />
          <SolidCard className="p-4">
            <div className="flex items-center justify-between py-2">
              <span className="text-[13px] text-white/70">Flags</span>
              <span className="flex items-center gap-2 text-[13px] text-white/90">
                <span className="h-1.5 w-1.5 rounded-full bg-forest-green" aria-hidden="true" /> No active flags
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-[13px] text-white/70">Appeals</span>
              <span className="text-[13px] text-white/90">None</span>
            </div>
            <div className="my-1 border-t border-white/[0.06]" />
            <button type="button" aria-label="Open report path" className="flex min-h-11 w-full items-center justify-between py-2 text-left">
              <span className="text-[13px] text-white/70">Report path</span>
              <ChevronRight size={16} className="text-white/40" strokeWidth={1.8} />
            </button>
            <button type="button" aria-label="Open mute, block, or delete controls" className="flex min-h-11 w-full items-center justify-between py-2 text-left">
              <span className="text-[13px] text-white/70">Mute, block, or delete</span>
              <ChevronRight size={16} className="text-white/40" strokeWidth={1.8} />
            </button>
          </SolidCard>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 opacity-40">
          <Lock size={16} className="shrink-0 text-white/50" strokeWidth={1.75} />
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-medium text-white/70">Full contract audit trail</p>
            <p className="mt-0.5 text-[11px] leading-snug text-white/55">Premium — unlock full source breakdown and confidence meters.</p>
          </div>
        </div>

        <div className="surface-warm space-y-3 p-4">
          <div className="flex items-center gap-2 text-[12px] text-white/60">
            <WifiOff size={14} className="shrink-0 text-white/50" strokeWidth={1.75} />
            <span>Offline — cached score shown. Resolve and appeal actions need a connection.</span>
          </div>
          <div className="flex items-center gap-2 text-[12px] text-white/60">
            <AlertTriangle size={14} className="shrink-0 text-white/50" strokeWidth={1.75} />
            <span className="flex-1">Sync failed. Cached score remains.</span>
            <BtnSecondary>Retry</BtnSecondary>
          </div>
        </div>

        <BtnSecondary className="w-full">Learn how to earn trust</BtnSecondary>
      </main>
    </HifiShell>
  )
}
