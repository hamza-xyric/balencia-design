import { MoreHorizontal, ChevronRight, Clock, Calendar, Apple, Sparkles, AlertTriangle } from 'lucide-react'
import {
  BtnPrimary,
  BtnGhost,
  Chip,
  CIAInsightCard,
  CIAPresenceOrb,
  GlassCard,
  HifiShell,
  IconButton,
  Provenance,
  SectionTitle,
  SolidCard,
  TopBar
} from '@/components/hifi/kit'

export function S85ObstacleCoach() {
  return (
    <HifiShell
      header={
        <TopBar
          title="Obstacle Coach"
          right={<IconButton label="Plan history"><MoreHorizontal size={18} /></IconButton>}
          back
        />
      }
      activeTab="cia"
      atmosphere="cia"
    >
      <main className="hide-scrollbar space-y-5 px-4 pb-28 pt-3">
        <GlassCard tone="cia">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Chip tone="cia">Diagnosis Ready</Chip>
                <Chip tone="muted">3 Blockers Found</Chip>
              </div>
              <h1 className="font-headline text-2xl leading-tight text-white/90">
                Late meetings moved your runs
              </h1>
              <p className="text-sm text-white/55">
                Your CIA <span className="text-emphasis">coach</span> identified the root cause behind missed workouts this week.
              </p>
              <Provenance items={['Calendar', '3 Missed sessions']} />
            </div>
            <CIAPresenceOrb size={48} state="thinking" />
          </div>
        </GlassCard>

        <section className="space-y-3">
          <SectionTitle title="Detected Blockers" meta="From your recent patterns" />

          <SolidCard>
            <div className="flex items-start gap-3 p-4">
              <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.04] text-brand-orange">
                <Clock className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="text-base text-white/90">Late meetings moved runs</h3>
                <p className="text-xs text-white/45">
                  Evidence: 3 missed after 7 PM
                </p>
                <p className="text-sm text-white/70">
                  Next step: Try Tuesday 6 AM
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <Chip tone="done">Verified</Chip>
                  <Chip tone="muted">Calendar</Chip>
                </div>
              </div>
              <ChevronRight className="mt-2 h-4 w-4 shrink-0 text-white/30" />
            </div>
          </SolidCard>

          <SolidCard>
            <div className="flex items-start gap-3 p-4">
              <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.04] text-brand-orange">
                <Apple className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="text-base text-white/90">Protein target dipped</h3>
                <p className="text-sm text-white/70">
                  Next step: Prepped lunch
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <Chip tone="muted">Nutrition log</Chip>
                  <Chip tone="muted">Low signal</Chip>
                </div>
              </div>
              <ChevronRight className="mt-2 h-4 w-4 shrink-0 text-white/30" />
            </div>
          </SolidCard>
        </section>

        <CIAInsightCard
          eyebrow="Next Best Timing"
          provenance={['Schedule history', 'Calendar']}
        >
          <div className="flex items-center gap-3 pt-2">
            <Calendar className="h-5 w-5 shrink-0 text-royal-purple" />
            <p className="text-sm text-white/80">
              Monday 8:10 AM has the best odds for mission consistency based on your prior follow-through.
            </p>
          </div>
        </CIAInsightCard>

        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.04] text-white/50">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-white/80">
                Coaching Support, Not Medical Advice
              </h4>
              <p className="text-xs leading-relaxed text-white/45">
                CIA helps you reframe obstacles and build non-shaming plans. Reach out for crisis support anytime if you need human help.
              </p>
              <div className="pt-2">
                <button type="button" className="inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-white/[0.04] px-3 text-sm text-white/70 hover:bg-white/[0.06]">
                  <AlertTriangle className="h-4 w-4 text-brand-orange" />
                  Crisis Support
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <BtnGhost quiet>
            Review Blockers
          </BtnGhost>
        </div>
      </main>

      <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-ink-900/80 px-4 pb-5 pt-3 backdrop-blur-xl">
        <BtnPrimary>
          Start Reconnection Plan
        </BtnPrimary>
      </div>
    </HifiShell>
  )
}