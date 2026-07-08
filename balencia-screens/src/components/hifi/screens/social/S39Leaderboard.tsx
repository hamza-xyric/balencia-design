import { Globe, Trophy, MapPin, Crown, TrendingUp, Info, EyeOff, BellOff, Ban, Download } from 'lucide-react'
import {
  HifiShell,
  TopBar,
  GlassCard,
  SolidCard,
  SectionTitle,
  Chip,
  MomentumBar,
  Sparkline,
  ConsentRail,
  Provenance
} from '@/components/hifi/kit'

export function S39Leaderboard() {
  return (
    <HifiShell
      header={
        <TopBar
          title="Leaderboard"
          back
          right={
            <button type="button" aria-label="Fairness info" className="flex h-11 w-11 items-center justify-center text-white/60 transition-colors hover:text-white">
              <Info className="h-5 w-5" />
            </button>
          }
        />
      }
      activeTab="me"
      atmosphere="you"
    >
      <main className="space-y-4 px-4 pb-6 pt-3">
        <p className="px-1 text-[15px] leading-relaxed text-white/55">
          Your climb on the community <span className="text-emphasis">leaderboard</span>. Progress, not comparison.
        </p>

        <div className="space-y-2">
          <div className="flex h-11 w-full items-center gap-1 rounded-xl border border-white/10 bg-white/[0.04] p-1">
            <button type="button" className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg bg-white/[0.08] text-[13px] font-medium text-white">
              <Globe className="h-4 w-4" /> Global
            </button>
            <button type="button" className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg text-[13px] font-medium text-white/50 transition-colors hover:text-white/80">
              <Trophy className="h-4 w-4" /> Competitions
            </button>
            <button type="button" className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg text-[13px] font-medium text-white/50 transition-colors hover:text-white/80">
              <MapPin className="h-4 w-4" /> Country
            </button>
          </div>

          <div className="flex h-9 w-full items-center gap-1 rounded-xl border border-white/10 bg-white/[0.02] p-1 text-[12px]">
            <button type="button" className="flex h-7 flex-1 items-center justify-center rounded-lg bg-white/[0.08] font-medium text-white">
              This week
            </button>
            <button type="button" className="flex h-7 flex-1 items-center justify-center rounded-lg font-medium text-white/40 transition-colors hover:text-white/70">
              This month
            </button>
            <button type="button" className="flex h-7 flex-1 items-center justify-center rounded-lg font-medium text-white/40 transition-colors hover:text-white/70">
              All time
            </button>
          </div>
        </div>

        <GlassCard tone="you">
          <div className="flex w-full items-end justify-center gap-4 px-2 pt-6 pb-3">
            <PodiumSlot rank={2} name="Ahmed" level={15} accent="silver" />
            <PodiumSlot rank={1} name="Sarah" level={18} accent="gold" highlighted />
            <PodiumSlot rank={3} name="Lisa" level={13} accent="bronze" />
          </div>
        </GlassCard>

        <GlassCard tone="you">
          <div className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-brand-orange bg-ink-900 text-[16px] font-semibold text-brand-orange shadow-[var(--glow-orange-sm)]">
              A
              <span className="absolute -bottom-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-ink-900 bg-brand-orange text-[10px] font-bold text-ink-900">
                12
              </span>
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-center gap-2">
                <span className="truncate text-[14px] font-semibold text-white">Amira (You)</span>
              </div>
              <div className="mt-0.5 flex items-center gap-1.5 text-[12px] text-white/50">
                <TrendingUp className="h-3 w-3 text-forest-green" />
                <span className="tabular-nums text-forest-green">+3</span>
                <span>Rank up this week</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[15px] font-semibold tabular-nums text-white">4,210</span>
              <span className="text-[11px] text-white/40">XP Total</span>
            </div>
          </div>

          <div className="mt-4 mb-1 flex items-baseline justify-between text-[12px]">
            <span className="text-white/60">XP to Lv 13</span>
            <span className="font-medium tabular-nums text-white/80">680 / 1,000</span>
          </div>
          <MomentumBar value={68} label="68% to next level" />

          <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
            <div className="flex flex-col">
              <span className="text-[11px] text-white/40">7-Day Activity</span>
              <div className="mt-1 w-24"><Sparkline tone="you" /></div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="rounded-md bg-white/[0.06] px-2 py-0.5 text-[11px] font-medium text-white/70">
                21d streak
              </span>
              <Provenance items={['You logged']} />
            </div>
          </div>
        </GlassCard>

        <div>
          <div className="mb-2 flex items-center justify-between px-1">
            <SectionTitle title="Friends climbing" meta="Accepted" />
            <button type="button" className="flex h-8 items-center rounded-full border border-white/10 bg-white/[0.04] px-3 text-[12px] font-medium text-white/60 transition-colors hover:text-white">
              Global
            </button>
          </div>

          <div className="space-y-2">
            <SolidCard>
              <div className="flex items-center gap-3 p-2">
                <span className="w-6 text-center text-[13px] font-semibold tabular-nums text-white/40">4</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-[13px] font-semibold text-white/70">O</div>
                <div className="flex flex-1 flex-col">
                  <span className="text-[13px] font-medium text-white">Omar</span>
                  <span className="text-[11px] text-white/40">Lv 14 · +5 this week</span>
                </div>
                <span className="inline-flex min-h-8 items-center rounded-pill border border-domain-finance/25 bg-domain-finance/15 px-3 text-[11px] font-semibold text-domain-finance">Finance</span>
                <span className="ml-2 text-[13px] font-semibold tabular-nums text-white">3,410</span>
              </div>
            </SolidCard>

            <SolidCard>
              <div className="flex items-center gap-3 p-2">
                <span className="w-6 text-center text-[13px] font-semibold tabular-nums text-white/40">5</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-[13px] font-semibold text-white/70">P</div>
                <div className="flex flex-1 flex-col">
                  <span className="text-[13px] font-medium text-white">Priya</span>
                  <span className="text-[11px] text-white/40">Lv 11 · +1 this week</span>
                </div>
                <Chip tone="you">Wellbeing</Chip>
                <span className="ml-2 text-[13px] font-semibold tabular-nums text-white">3,200</span>
              </div>
            </SolidCard>

            <SolidCard>
              <div className="flex items-center gap-3 p-2">
                <span className="w-6 text-center text-[13px] font-semibold tabular-nums text-white/40">6</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-[13px] font-semibold text-white/70">Y</div>
                <div className="flex flex-1 flex-col">
                  <span className="text-[13px] font-medium text-white">Yara</span>
                  <span className="text-[11px] text-white/40">Lv 10 · No change</span>
                </div>
                <Chip tone="cia">Creativity</Chip>
                <span className="ml-2 text-[13px] font-semibold tabular-nums text-white">2,980</span>
              </div>
            </SolidCard>
          </div>
        </div>

        <GlassCard tone="muted">
          <div className="space-y-3 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-white/60">
                <EyeOff className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <h3 className="text-[14px] font-semibold text-white">Visibility & controls</h3>
                <p className="mt-0.5 text-[12px] leading-relaxed text-white/50">
                  Manage how you appear and who can see your activity. Your mission, your rules.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button type="button" className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-[13px] font-medium text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white">
                <EyeOff className="h-4 w-4" /> Opt out
              </button>
              <button type="button" className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-[13px] font-medium text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white">
                <BellOff className="h-4 w-4" /> Mute alerts
              </button>
              <button type="button" className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-[13px] font-medium text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white">
                <Download className="h-4 w-4" /> Export data
              </button>
              <button type="button" className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-[13px] font-medium text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white">
                <Ban className="h-4 w-4" /> Block user
              </button>
            </div>
          </div>
        </GlassCard>

        <div className="flex items-center justify-center gap-2 pt-1 text-[12px] text-white/40">
          <Info className="h-3.5 w-3.5" />
          <span>Fairness: your climb, not a verdict.</span>
        </div>

        <div className="pt-2">
          <div className="mb-2 px-1">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-white/40">Ranking data</h3>
          </div>
          <ConsentRail />
        </div>
      </main>
    </HifiShell>
  )
}

function PodiumSlot({ rank, name, level, accent, highlighted }: { rank: 1 | 2 | 3; name: string; level: number; accent: 'gold' | 'silver' | 'bronze'; highlighted?: boolean }) {
  const accents = {
    gold: 'text-amber-400 border-amber-400/50 shadow-[var(--glow-orange-sm)]',
    silver: 'text-slate-300 border-slate-300/50',
    bronze: 'text-orange-700 border-orange-700/50'
  }
  const heights = { 1: 'h-16', 2: 'h-12', 3: 'h-10' }
  
  return (
    <div className="flex flex-1 flex-col items-center justify-end gap-2">
      {rank === 1 && <Crown className="h-4 w-4 text-amber-400" />}
      <div className={`flex h-12 w-12 items-center justify-center rounded-full border-2 bg-ink-900 text-[14px] font-semibold ${accents[accent]} ${highlighted ? 'ring-2 ring-brand-orange/40' : ''}`}>
        {name.charAt(0)}
      </div>
      <div className="flex w-full flex-col items-center gap-1">
        <span className="text-[12px] font-medium text-white">{name}</span>
        <div className={`w-full ${heights[rank]} flex flex-col items-center justify-center rounded-t-lg border-x border-t border-white/10 bg-white/[0.06]`}>
          <span className="text-[11px] font-bold tabular-nums text-white/80">#{rank}</span>
          <span className="text-[10px] text-white/40">Lv {level}</span>
        </div>
      </div>
    </div>
  )
}