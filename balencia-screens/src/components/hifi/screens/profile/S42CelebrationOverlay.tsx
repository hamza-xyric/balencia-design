import {
  HifiShell,
  TopBar,
  GlassCard,
  SolidCard,
  Chip,
  BtnPrimary,
  BtnSecondary,
  ProgressRing,
  ProgressBar,
  CIAInsightCard,
  Provenance,
  SectionTitle,
} from '@/components/hifi/kit'

// Reduced-motion path: particles removed entirely; badge, XP, progress, and stroke divider render instantly at final state; CIAInsightCard is immediately visible (no fade-up); glow breathe becomes a static glow; the 1.2s entrance lockout is bypassed so dismissal is available immediately.
export function S42CelebrationOverlay() {
  return (
    <HifiShell
      header={
        <TopBar
          title="Today"
          right={
            <span className="text-[13px] font-medium text-white/50 tabular-nums">
              Lv 12
            </span>
          }
        />
      }
      activeTab="today"
      showTabBar={false}
      atmosphere="you"
    >
      <main className="px-4 pb-4 pt-3 space-y-4">
        {/* Dimmed static Home context lives behind the overlay scrim */}
        <div className="space-y-4 opacity-40 pointer-events-none" aria-hidden="true">
          <SectionTitle title="Active missions" meta="2 active" />

          <GlassCard tone="you">
            <div className="space-y-3 p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-[15px] text-white">Run a half marathon</p>
                  <p className="text-[13px] text-white/50">Distance mission</p>
                </div>
                <Chip tone="you">Fitness</Chip>
              </div>
              <ProgressBar value={68} tone="you" />
            </div>
          </GlassCard>

          <GlassCard tone="you">
            <div className="space-y-3 p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-[15px] text-white">Save $5,000 by December</p>
                  <p className="text-[13px] text-white/50">Finance mission</p>
                </div>
                <Chip tone="you">Finance</Chip>
              </div>
              <ProgressBar value={42} tone="you" />
            </div>
          </GlassCard>

          <SolidCard>
            <div className="space-y-3 p-4">
              <SectionTitle title="Buddy check-in" />
              <p className="text-[13px] text-white/60">
                Aisha Khan logged a 5k run this morning
              </p>
            </div>
          </SolidCard>
        </div>

        {/* Overlay */}
        <div className="fixed inset-0 z-50 flex flex-col justify-center items-center px-6">
          {/* Scrim + dimmed base + tap target for early-dismiss shortcut */}
          <button
            type="button"
            aria-label="Dismiss celebration"
            className="absolute inset-0 w-full h-full bg-ink-900/85 backdrop-blur-md"
          />

          <div className="relative z-10 w-full max-w-[340px] space-y-5">
            {/* Hero FrostCard */}
            <GlassCard tone="done">
              <div className="flex flex-col items-center p-6 text-center shadow-[var(--glow-green-md)]">
                <div className="mb-4">
                  <Chip tone="done">Overall level up</Chip>
                </div>

                <div className="mb-5 flex items-center justify-center">
                  <ProgressRing
                    percent={82}
                    value="13"
                    label="Level"
                    size={112}
                    tone="you"
                  />
                </div>

                <div className="mb-4 space-y-1">
                  <p className="text-[13px] text-white/50">Level 12 → 13</p>
                  <p className="text-[34px] leading-tight text-white tabular-nums">
                    + 120
                  </p>
                  <p className="text-[12px] uppercase tracking-[0.18em] text-white/45">
                    XP
                  </p>
                </div>

                <div className="w-full">
                  <ProgressBar value={82} tone="you" />
                </div>

                <div className="mt-4">
                  <Provenance items={['You earned it']} />
                </div>
              </div>
            </GlassCard>

            {/* Continuous-stroke motif divider */}
            <div className="relative flex items-center justify-center py-1" aria-hidden="true">
              <svg
                width="100%"
                height="24"
                viewBox="0 0 300 24"
                fill="none"
                className="text-white/30"
              >
                <path
                  d="M 4 12 Q 75 4 150 12 T 296 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>

            {/* CIA Synthesis card */}
            <GlassCard tone="cia">
              <div className="p-5">
                <CIAInsightCard
                  eyebrow="CIA"
                  provenance={['Fitness', 'Finance']}
                >
                  <p className="text-[15px] leading-snug text-white">
                    Level 13. Your{' '}
                    <span className="text-emphasis">consistency</span> across
                    fitness and finance is coming together.
                  </p>
                </CIAInsightCard>
              </div>
            </GlassCard>

            {/* Action row - never nest interactive kit components */}
            <div className="flex flex-col gap-3">
              <BtnPrimary>Continue</BtnPrimary>
              <BtnSecondary>Share</BtnSecondary>
            </div>
          </div>
        </div>
      </main>
    </HifiShell>
  )
}