import { BookOpen, BrainCircuit, CheckCircle2, ChevronRight, Flame, GraduationCap, Plus, Sparkles } from 'lucide-react'
import {
  Chip,
  CIAInsightCard,
  GlassCard,
  HifiShell,
  MetricPill,
  MomentumBar,
  Provenance,
  ProgressBar,
  ProgressRing,
  SectionTitle,
  SolidCard,
  TopBar,
  TrendChart,
} from '@/components/hifi/kit'

export function S35LearningDashboard() {
  return (
    <HifiShell
      header={
        <TopBar
          title="Learning & growth"
          eyebrow="Explore"
          right={
            <button
              type="button"
              aria-label="More options"
              className="flex h-11 w-11 items-center justify-center rounded-full text-white/60 transition-colors hover:text-white"
            >
              <Sparkles className="h-5 w-5" />
            </button>
          }
        />
      }
      activeTab="today"
      bottomAction={
        <button type="button" className="group relative flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-brand-orange text-ink-900 shadow-[var(--glow-orange-md)] transition-transform active:scale-[0.98]">
          <Plus className="h-5 w-5" strokeWidth={2.5} />
          <span className="text-[15px] font-semibold tracking-tight">Log session</span>
        </button>
      }
    >
      <main className="space-y-4 px-4 pb-4 pt-3">
        <p className="px-1 font-sans text-[11px] uppercase tracking-[0.2em] text-brand-cyan/80">
          Learning <span className="text-emphasis">dashboard</span>
        </p>

        <GlassCard tone="you">
          <div className="flex items-start gap-4">
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-brand-orange" />
                <span className="text-sm font-medium text-white/90">Thinking, fast and slow</span>
              </div>
              <h2 className="text-lg font-semibold leading-tight text-white">
                Current mission · read 15 pages
              </h2>
              <div className="mt-1">
                <ProgressBar value={60} tone="you" />
                <p className="mt-1.5 text-[13px] text-white/55">
                  <span className="tabular-nums text-white/80">9</span> / 15 pages today
                </p>
              </div>
            </div>
            <ProgressRing percent={62} value="62%" size={72} tone="you" label="Book" />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <MetricPill label="Pages" value="45" tone="you" />
            <MetricPill label="Minutes" value="135" tone="you" />
            <Provenance items={['You logged']} />
          </div>
        </GlassCard>

        <div className="grid grid-cols-3 gap-2">
          <SolidCard className="flex flex-col gap-1 p-3">
            <span className="text-[10px] uppercase tracking-wider text-white/45">Pages</span>
            <span className="text-lg font-semibold tabular-nums text-white">45</span>
            <span className="text-[10px] text-white/40">Today</span>
          </SolidCard>
          <SolidCard className="flex flex-col gap-1 p-3">
            <span className="text-[10px] uppercase tracking-wider text-white/45">Minutes</span>
            <span className="text-lg font-semibold tabular-nums text-white">135</span>
            <span className="text-[10px] text-white/40">Today</span>
          </SolidCard>
          <SolidCard className="flex flex-col gap-1 p-3">
            <span className="text-[10px] uppercase tracking-wider text-white/45">Streak</span>
            <span className="flex items-center gap-1 text-lg font-semibold tabular-nums text-white">
              <Flame className="h-4 w-4 text-brand-orange" />
              12
            </span>
            <span className="text-[10px] text-white/40">Days</span>
          </SolidCard>
        </div>

        <CIAInsightCard
          eyebrow="Reading pace"
          provenance={['CIA projection']}
        >
          <p className="text-[13px] leading-relaxed text-white/80">
            45 pages this week across books. Pace is steady for the current mission.
          </p>
        </CIAInsightCard>

        <div className="space-y-2">
          <SectionTitle title="Cia suggested actions" meta="Current plan" />
          <GlassCard tone="muted" className="!p-0">
            <ul>
              <li>
                <button type="button" className="flex w-full items-center gap-3 p-3.5 text-left transition-colors hover:bg-white/[0.02]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <span className="flex-1 text-[13px] text-white/85">Read chapter 7</span>
                  <ChevronRight className="h-4 w-4 text-white/30" />
                </button>
              </li>
              <li className="border-t border-white/5">
                <button type="button" className="flex w-full items-center gap-3 p-3.5 text-left transition-colors hover:bg-white/[0.02]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange">
                    <BrainCircuit className="h-4 w-4" />
                  </div>
                  <span className="flex-1 text-[13px] text-white/85">Review notes</span>
                  <ChevronRight className="h-4 w-4 text-white/30" />
                </button>
              </li>
            </ul>
          </GlassCard>
        </div>

        <div className="space-y-2">
          <SectionTitle title="Active missions" />
          <div className="grid grid-cols-2 gap-3">
            <GlassCard tone="you" className="flex flex-col items-center gap-2 py-4">
              <ProgressRing percent={68} value="68%" size={88} tone="you" label="Book" />
              <div className="text-center">
                <p className="text-[12px] font-medium text-white/85">Read a half marathon</p>
                <p className="mt-0.5 text-[10px] text-white/45">68% complete</p>
              </div>
            </GlassCard>
            <GlassCard tone="you" className="flex flex-col items-center gap-2 py-4">
              <ProgressRing percent={42} value="42%" size={88} tone="you" label="Course" />
              <div className="text-center">
                <p className="text-[12px] font-medium text-white/85">Data science intro</p>
                <p className="mt-0.5 text-[10px] text-white/45">42% complete</p>
              </div>
            </GlassCard>
          </div>
        </div>

        <div className="space-y-2">
          <SectionTitle title="Skill mastery" meta="Inferred" />
          <SolidCard className="space-y-4 p-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-white/70">Critical thinking</span>
                <span className="text-[12px] font-medium tabular-nums text-white/90">78</span>
              </div>
              <MomentumBar value={78} />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-white/70">Data analysis</span>
                <span className="text-[12px] font-medium tabular-nums text-white/90">54</span>
              </div>
              <MomentumBar value={54} />
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <Chip tone="muted">Estimated · low confidence</Chip>
            </div>
          </SolidCard>
        </div>

        <div className="space-y-2">
          <SectionTitle title="Study time" meta="Past 7 days" />
          <SolidCard className="p-4">
            <TrendChart
              past={[22, 45, 30, 60, 15, 50, 135]}
              height={120}
              label="Daily minutes"
            />
            <div className="mt-3 flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1.5 text-white/60">
                <span className="h-2 w-2 rounded-full bg-brand-orange" />
                Logged time
              </span>
              <span className="flex items-center gap-1.5 text-white/60">
                <span className="h-2 w-2 rounded-full bg-royal-purple" />
                CIA planned
              </span>
            </div>
          </SolidCard>
        </div>

        <div className="space-y-2">
          <SectionTitle title="Consistency" />
          <GlassCard tone="done" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-green/15">
              <Flame className="h-5 w-5 text-forest-green" />
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-medium text-white">12-day streak</p>
              <p className="text-[11px] text-white/50">Keep the momentum going</p>
            </div>
            <CheckCircle2 className="h-5 w-5 text-forest-green/80" />
          </GlassCard>
        </div>

        <div className="space-y-2">
          <SectionTitle title="Library" meta="3 items" />
          <SolidCard className="!p-0">
            <button type="button" className="flex w-full items-center gap-3 p-3.5 text-left transition-colors hover:bg-white/[0.02]">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-orange/15 text-brand-orange">
                <BookOpen className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-medium text-white/90">Thinking, fast and slow</p>
                <p className="text-[11px] text-white/45">Book · 62% complete</p>
              </div>
              <Chip tone="you">Active</Chip>
            </button>
            <div className="border-t border-white/5">
              <button type="button" className="flex w-full items-center gap-3 p-3.5 text-left transition-colors hover:bg-white/[0.02]">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-royal-purple/15 text-royal-purple">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-medium text-white/90">Data science intro</p>
                  <p className="text-[11px] text-white/45">Course · 42% complete</p>
                </div>
                <Chip tone="cia">Import</Chip>
              </button>
            </div>
            <div className="border-t border-white/5">
              <button type="button" className="flex w-full items-center gap-3 p-3.5 text-left transition-colors hover:bg-white/[0.02]">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest-green/15 text-forest-green">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-medium text-white/90">Deep work</p>
                  <p className="text-[11px] text-white/45">Book · Finished</p>
                </div>
                <Chip tone="done">Done</Chip>
              </button>
            </div>
          </SolidCard>
        </div>
      </main>
    </HifiShell>
  )
}