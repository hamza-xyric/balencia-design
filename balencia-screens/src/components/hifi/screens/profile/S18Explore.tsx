import { Search, X, Sparkles, Compass, Moon, BookOpen, Repeat, Dumbbell, Flower2, Lock } from 'lucide-react'
import { HifiShell, TopBar, GlassCard, SolidCard, SectionTitle, Chip, ConsentRail, DonutHub, ProgressBar } from '@/components/hifi/kit'

export function S18Explore() {
  return (
    <HifiShell
      activeTab="me"
      atmosphere="cia"
      header={
        <TopBar
          title="Explore"
          eyebrow="Amira · Lv 12"
          back={true}
        />
      }
    >
      <main className="space-y-6 px-4 pb-4 pt-3">
        
        <button
          type="button"
          aria-label="Search modules"
          className="relative flex h-12 w-full min-h-11 items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 text-left backdrop-blur-md"
        >
          <Search className="h-4 w-4 text-white/45" />
          <span className="text-sm text-white/45">Search modules</span>
          <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-white/5">
            <X className="h-3 w-3 text-white/45" />
          </span>
        </button>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-medium uppercase tracking-wider text-white/60">
              Suggested for <span className="text-emphasis">you</span>
            </h2>
            <span className="text-xs text-white/45">Via recent activity</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <GlassCard tone="you">
              <div className="flex h-full flex-col p-4">
                <div className="mb-6 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <BookOpen className="h-4 w-4 text-brand-orange" />
                </div>
                <h3 className="text-sm font-medium text-white">Journal</h3>
                <p className="mt-1 text-xs text-white/60">Start here</p>
              </div>
            </GlassCard>
            <GlassCard tone="cia">
              <div className="flex h-full flex-col p-4">
                <div className="mb-6 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <Moon className="h-4 w-4 text-royal-purple" />
                </div>
                <h3 className="text-sm font-medium text-white">Sleep</h3>
                <p className="mt-1 text-xs text-white/60">Suggested</p>
              </div>
            </GlassCard>
          </div>
        </section>

        <section className="space-y-3">
          <SectionTitle title="Your active domains" meta="5 synced" />
          <SolidCard>
            <div className="flex items-center gap-4 p-4">
              <DonutHub
                value="5"
                label="Active"
                segments={[
                  { percent: 22, className: 'bg-brand-orange' },
                  { percent: 18, className: 'bg-forest-green' },
                  { percent: 20, className: 'text-royal-purple' },
                  { percent: 20, className: 'bg-white/60' },
                  { percent: 20, className: 'bg-white/30' }
                ]}
              />
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand-orange" />
                  <span className="text-xs text-white/80">Fitness</span>
                  <span className="ml-auto text-xs font-medium tabular-nums text-white/45">42%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-forest-green" />
                  <span className="text-xs text-white/80">Mindfulness</span>
                  <span className="ml-auto text-xs font-medium tabular-nums text-white/45">28%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full text-royal-purple" />
                  <span className="text-xs text-white/80">CIA Sessions</span>
                  <span className="ml-auto text-xs font-medium tabular-nums text-white/45">18%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-white/60" />
                  <span className="text-xs text-white/80">Journal</span>
                  <span className="ml-auto text-xs font-medium tabular-nums text-white/45">20%</span>
                </div>
              </div>
            </div>
          </SolidCard>
        </section>

        <section className="space-y-3">
          <SectionTitle title="Fitness and movement" />
          <div className="grid grid-cols-2 gap-3">
            <button type="button" className="text-left">
              <GlassCard tone="you">
                <div className="flex h-full flex-col p-4">
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Dumbbell className="h-4 w-4 text-brand-orange" />
                  </div>
                  <h3 className="text-sm font-medium text-white">Workouts</h3>
                  <div className="mt-2 flex items-center gap-2">
                    <Chip>Plus</Chip>
                    <span className="text-xs font-medium tabular-nums text-white/60">12 sessions</span>
                  </div>
                  <ProgressBar value={68} tone="you" />
                </div>
              </GlassCard>
            </button>
            <button type="button" className="text-left">
              <GlassCard tone="you">
                <div className="flex h-full flex-col p-4">
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Flower2 className="h-4 w-4 text-brand-orange" />
                  </div>
                  <h3 className="text-sm font-medium text-white">Yoga</h3>
                  <div className="mt-2 flex items-center gap-2">
                    <Chip>Included</Chip>
                  </div>
                  <ProgressBar value={0} tone="you" />
                </div>
              </GlassCard>
            </button>
          </div>
        </section>

        <section className="space-y-3">
          <SectionTitle title="Wellbeing" />
          <div className="grid grid-cols-2 gap-3">
            <button type="button" className="text-left">
              <GlassCard tone="you">
                <div className="flex h-full flex-col p-4">
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <BookOpen className="h-4 w-4 text-brand-orange" />
                  </div>
                  <h3 className="text-sm font-medium text-white">Journal</h3>
                  <div className="mt-2 flex items-center gap-2">
                    <Chip>Included</Chip>
                    <span className="text-xs font-medium tabular-nums text-white/60">4 entries</span>
                  </div>
                  <ProgressBar value={32} tone="you" />
                </div>
              </GlassCard>
            </button>
            <button type="button" className="text-left">
              <GlassCard tone="you">
                <div className="flex h-full flex-col p-4">
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Repeat className="h-4 w-4 text-brand-orange" />
                  </div>
                  <h3 className="text-sm font-medium text-white">Habits</h3>
                  <div className="mt-2 flex items-center gap-2">
                    <Chip>Included</Chip>
                  </div>
                  <ProgressBar value={0} tone="you" />
                </div>
              </GlassCard>
            </button>
          </div>
        </section>

        <section className="space-y-3">
          <SectionTitle title="More features" />
          <div className="grid grid-cols-2 gap-3">
            <button type="button" className="text-left opacity-40">
              <SolidCard>
                <div className="flex h-full flex-col p-4">
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Sparkles className="h-4 w-4 text-white/60" />
                  </div>
                  <h3 className="text-sm font-medium text-white">Advanced insights</h3>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-white/60">
                    <Lock className="h-3 w-3" />
                    <span>Pro</span>
                  </div>
                </div>
              </SolidCard>
            </button>
            <button type="button" className="text-left opacity-40">
              <SolidCard>
                <div className="flex h-full flex-col p-4">
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Compass className="h-4 w-4 text-white/60" />
                  </div>
                  <h3 className="text-sm font-medium text-white">Guided journeys</h3>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-white/60">
                    <Lock className="h-3 w-3" />
                    <span>Pro</span>
                  </div>
                </div>
              </SolidCard>
            </button>
          </div>
        </section>

        <section>
          <ConsentRail compact />
        </section>

      </main>
    </HifiShell>
  )
}