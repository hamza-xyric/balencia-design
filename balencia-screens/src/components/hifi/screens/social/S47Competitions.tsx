import { Trophy, Users, Gift, Medal, ChevronRight, Sparkles, Calendar, ShieldCheck, UserCheck, Crown, Bell, Info } from 'lucide-react'
import { TopBar, HifiShell, GlassCard, Chip, SectionTitle, SolidCard, ProgressRing, BtnPrimary, ComplianceFooter, ConsentRail, Provenance, TrendChart } from '@/components/hifi/kit'

export function S47Competitions() {
  return (
    <HifiShell
      header={<TopBar title="Competitions" eyebrow="Challenges" back />}
      activeTab="me"
      atmosphere="cia"
    >
      <main className="space-y-5 px-4 pb-4 pt-3">
        {/* Hero Feature */}
        <GlassCard tone="you">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-brand-orange" />
              <span className="text-sm font-medium tracking-wide text-white/90">Featured Challenge</span>
            </div>
            <span className="rounded-full bg-brand-orange/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-brand-orange">Active</span>
          </div>
          
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-semibold leading-tight text-white">Step Challenge</h2>
              <p className="mt-1 text-xs text-white/55">May 25 - Jun 8 · Mission 1 of 3</p>
            </div>
            <ProgressRing 
              percent={68} 
              value="68%" 
              label="Time elapsed" 
              size={48} 
              tone="you" 
            />
          </div>
          
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-white/[0.04] p-2.5">
              <Users className="h-3.5 w-3.5 text-white/40" />
              <p className="mt-1.5 text-base font-semibold tabular-nums text-white">234</p>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Participants</p>
            </div>
            <div className="rounded-lg bg-white/[0.04] p-2.5">
              <Gift className="h-3.5 w-3.5 text-white/40" />
              <p className="mt-1.5 text-base font-semibold tabular-nums text-white">500</p>
              <p className="text-[10px] uppercase tracking-wider text-white/40">XP Prize</p>
            </div>
            <div className="rounded-lg bg-white/[0.04] p-2.5">
              <Medal className="h-3.5 w-3.5 text-white/40" />
              <p className="mt-1.5 text-base font-semibold tabular-nums text-white">#42</p>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Your Rank</p>
            </div>
          </div>
          
          <div className="mt-5 space-y-2">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <div className="h-full w-[68%] rounded-full bg-brand-orange shadow-[var(--glow-orange-sm)]" />
            </div>
            <p className="text-[10px] text-white/40">9 of 14 days remaining · Fair play enforced</p>
          </div>
          
          <div className="mt-5 flex items-center gap-3">
            <BtnPrimary>View Details</BtnPrimary>
            <Provenance items={["Synced via Health"]} />
          </div>
        </GlassCard>

        {/* Invitations */}
        <section className="space-y-2">
          <SectionTitle title="Invitations" meta="2 New" />
          <SolidCard>
            <button type="button" className="flex w-full items-center gap-3 p-3 text-left">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.06]">
                <Bell className="h-4 w-4 text-white/70" />
                <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-ink-900 bg-brand-orange" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-white/90">From Sarah & Ahmed</p>
                <p className="truncate text-[11px] text-white/50">Join the weekend warrior mission</p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-white/40" />
            </button>
          </SolidCard>
        </section>

        {/* CIA Suggestions */}
        <section className="space-y-2">
          <SectionTitle title="CIA Suggestions" meta="Matched" />
          <GlassCard tone="cia">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-royal-purple" />
                <p className="text-xs font-medium text-royal-purple">Based On Your Patterns</p>
              </div>
              <Chip tone="cia">Low impact</Chip>
            </div>
            <div className="mt-3 space-y-3">
              <button type="button" className="flex w-full items-center justify-between rounded-lg bg-white/[0.03] p-3 text-left">
                <div>
                  <p className="text-sm text-white/90">7-Day Mindful Mission</p>
                  <p className="mt-0.5 text-[11px] text-white/50">Starts Monday · 5 min daily</p>
                </div>
                <span className="rounded-md bg-white/[0.06] px-2.5 py-1 text-[10px] font-medium text-white/70">Join</span>
              </button>
              <button type="button" className="flex w-full items-center justify-between rounded-lg bg-white/[0.03] p-3 text-left">
                <div>
                  <p className="text-sm text-white/90">Fit Feb Team Mission</p>
                  <p className="mt-0.5 text-[11px] text-white/50">February · Team of 5</p>
                </div>
                <span className="rounded-md bg-white/[0.06] px-2.5 py-1 text-[10px] font-medium text-white/70">Preview</span>
              </button>
            </div>
            <div className="mt-3">
              <Provenance items={["Evidence match", "Opt-in visible"]} />
            </div>
          </GlassCard>
        </section>

        {/* Browse Challenges */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <SectionTitle title="Browse Missions" />
          </div>
          
          {/* Filter Chips */}
          <div className="hide-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
            <button type="button" className="flex h-9 shrink-0 items-center rounded-full bg-white/[0.08] px-4 text-xs text-white/80">All</button>
            <button type="button" className="flex h-9 shrink-0 items-center rounded-full bg-white/[0.04] px-4 text-xs text-white/60">Active</button>
            <button type="button" className="flex h-9 shrink-0 items-center rounded-full bg-white/[0.04] px-4 text-xs text-white/60">Upcoming</button>
            <button type="button" className="flex h-9 shrink-0 items-center rounded-full bg-white/[0.04] px-4 text-xs text-white/60">Past</button>
            <button type="button" className="flex h-9 shrink-0 items-center rounded-full bg-brand-orange px-4 text-xs font-medium text-ink-900">My Missions</button>
          </div>

          <div className="space-y-2">
            <SolidCard>
              <button type="button" className="flex w-full items-center gap-3 p-3 text-left">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-orange/10">
                  <span className="text-xs font-semibold text-brand-orange">7D</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium text-white/90">Step Challenge #12</p>
                    <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[9px] uppercase text-white/50">Joined</span>
                  </div>
                  <p className="mt-0.5 truncate text-[11px] text-white/50">42% complete · Rank #42 of 234</p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-white/40" />
              </button>
            </SolidCard>
            
            <SolidCard>
              <button type="button" className="flex w-full items-center gap-3 p-3 text-left">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-royal-purple/10">
                  <Calendar className="h-5 w-5 text-royal-purple" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium text-white/90">Meditation Marathon</p>
                  </div>
                  <p className="mt-0.5 truncate text-[11px] text-white/50">Starts Jun 10 · 120 joined</p>
                </div>
                <span className="shrink-0 rounded-md bg-white/[0.06] px-2.5 py-1.5 text-[10px] font-medium text-white/70">Join</span>
              </button>
            </SolidCard>

            <SolidCard>
              <button type="button" className="flex w-full items-center gap-3 p-3 text-left">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/[0.04]">
                  <ShieldCheck className="h-5 w-5 text-white/40" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white/90">Nutrition Challenge #5</p>
                  <p className="mt-0.5 truncate text-[11px] text-white/50">Ended May 20 · Completed</p>
                </div>
                <span className="shrink-0 rounded-md bg-white/[0.04] px-2.5 py-1.5 text-[10px] font-medium text-white/50">Results</span>
              </button>
            </SolidCard>
            
            <SolidCard>
              <button type="button" className="flex w-full items-center gap-3 p-3 text-left">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/[0.04]">
                  <Crown className="h-5 w-5 text-white/40" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white/90">Elite Cycling League</p>
                  <p className="mt-0.5 truncate text-[11px] text-white/50">Premium · Members only</p>
                </div>
                <span className="shrink-0 rounded-md bg-white/[0.04] px-2.5 py-1.5 text-[10px] font-medium text-white/40">Locked</span>
              </button>
            </SolidCard>
          </div>
        </section>

        {/* Active Mission Trend */}
        <section className="space-y-2">
          <SectionTitle title="Your Step Trend" meta="Last 7 Days" />
          <GlassCard tone="you">
            <div className="flex items-center justify-between">
              <p className="text-xs text-white/60">Daily steps vs mission target</p>
              <Chip tone="you">Target: 8K</Chip>
            </div>
            <div className="mt-3">
              <TrendChart 
                past={[6200, 7100, 8500, 9200, 7800, 8400, 8200]} 
                milestones={[2, 3, 6]} 
                height={80}
                label="Daily step count over the past week"
              />
            </div>
          </GlassCard>
        </section>

        {/* Consent & Controls */}
        <section className="space-y-2">
          <SectionTitle title="Controls" />
          <div className="space-y-2">
            <button type="button" className="flex w-full items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3 text-left">
              <div className="flex items-center gap-3">
                <UserCheck className="h-4 w-4 text-white/50" />
                <span className="text-sm text-white/80">Leaderboard Visibility</span>
              </div>
              <span className="text-[11px] text-white/40">Friends only</span>
            </button>
            <button type="button" className="flex w-full items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3 text-left">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-white/50" />
                <span className="text-sm text-white/80">Health Proof Sharing</span>
              </div>
              <span className="text-[11px] text-white/40">Off</span>
            </button>
            <button type="button" className="flex w-full items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3 text-left">
              <div className="flex items-center gap-3">
                <Info className="h-4 w-4 text-white/50" />
                <span className="text-sm text-white/80">Report Or Block</span>
              </div>
              <ChevronRight className="h-4 w-4 text-white/40" />
            </button>
          </div>
        </section>

        <div className="pt-1">
          <ConsentRail />
        </div>
        
        <ComplianceFooter />
      </main>
    </HifiShell>
  )
}