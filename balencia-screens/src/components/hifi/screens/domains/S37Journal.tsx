import { Mic, Plus, Settings, BookOpen, Calendar, TrendingUp, Heart } from 'lucide-react'
import {
  HifiShell,
  TopBar,
  IconButton,
  CIAInsightCard,
  GlassCard,
  SolidCard,
  Chip,
  SafetyCard,
  Provenance,
  SectionTitle
} from '@/components/hifi/kit'

export function S37Journal() {
  return (
    <HifiShell
      header={
        <TopBar
          title="Journal"
          right={
            <div className="flex items-center gap-2">
              <IconButton label="Record voice entry">
                <Mic className="h-5 w-5" />
              </IconButton>
              <IconButton label="Journal settings">
                <Settings className="h-5 w-5" />
              </IconButton>
            </div>
          }
        />
      }
      activeTab="today"
      bottomAction={
        <button
          type="button"
          aria-label="Add new entry"
          className="fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange text-ink-900 shadow-[var(--glow-orange-md)]"
        >
          <Plus className="h-6 w-6" />
        </button>
      }
      atmosphere="you"
    >
      <main className="space-y-4 px-4 pb-4 pt-3">
        <span className="sr-only">Private by default</span>

        <CIAInsightCard
          eyebrow="CIA reflection"
          provenance={["Synthesized from your patterns"]}
        >
          <div className="space-y-4">
            <p className="text-lg leading-snug text-white/90">
              What pattern have you noticed between your energy and creativity this week?
            </p>
            <button type="button" className="min-h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-white/45 transition-colors hover:bg-white/[0.07]">
              Write about this
            </button>
          </div>
        </CIAInsightCard>

        <div className="flex items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.03] p-1">
          <button type="button" className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-white/[0.08] text-sm font-medium text-white">
            <BookOpen className="h-4 w-4" />
            Entries
          </button>
          <button type="button" className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl text-sm font-medium text-white/45 transition-colors hover:text-white/70">
            <Calendar className="h-4 w-4" />
            Check-ins
          </button>
        </div>

        <div className="flex items-center justify-between px-1">
          <span className="text-sm text-white/70">
            <span className="tabular-nums">12</span> entries this month
          </span>
          <Provenance items={["Calculated from entries"]} />
        </div>

        <SectionTitle title="Recent" />

        <div className="-mx-4 overflow-x-auto hide-scrollbar">
          <div className="flex gap-3 px-4 pb-1">
            <button type="button" className="flex h-11 shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm text-white/80">
              <span className="font-medium">Calm</span>
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
              </span>
            </button>
            <button type="button" className="flex h-11 shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm text-white/80">
              <Heart className="h-3.5 w-3.5" />
              Energy
            </button>
            <button type="button" className="flex h-11 shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm text-white/80">
              <TrendingUp className="h-3.5 w-3.5" />
              Stress
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <SolidCard>
            <div className="space-y-3 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/45">May 20, 2026</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-white/90">
                    &quot;The morning session felt clear and focused. I noticed ideas flowing easier after the run.&quot;
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Chip>
                  <span className="h-1.5 w-1.5 rounded-full bg-domain-learning" />
                  Learning
                </Chip>
                <Chip>
                  <span className="h-1.5 w-1.5 rounded-full bg-domain-creativity" />
                  Creativity
                </Chip>
              </div>
            </div>
          </SolidCard>

          <SolidCard>
            <div className="space-y-3 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06]">
                  <Mic className="h-4 w-4 text-white/70" />
                </div>
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-wide text-white/45">May 19, 2026</p>
                  <p className="text-sm text-white/70">Voice · <span className="tabular-nums">2m 14s</span></p>
                </div>
              </div>
              <p className="text-[15px] leading-relaxed text-white/80">
                &quot;Reflecting on the afternoon, the meeting drag was real. Tomorrow I will block focus time earlier.&quot;
              </p>
              <Provenance items={["Via AssemblyAI"]} />
            </div>
          </SolidCard>

          <SolidCard>
            <div className="space-y-3 p-4">
              <p className="text-xs uppercase tracking-wide text-white/45">May 18, 2026</p>
              <p className="text-[15px] leading-relaxed text-white/80">
                &quot;Long walk with Aisha after work. The mission feels closer when I share the small wins out loud.&quot;
              </p>
              <p className="text-xs text-white/45 pt-1">
                This is your <span className="text-emphasis">journal</span> — a space for private reflection.
              </p>
            </div>
          </SolidCard>
        </div>

        <GlassCard tone="muted">
          <div className="p-4">
            <p className="text-xs uppercase tracking-wide text-white/45">Your privacy</p>
            <p className="mt-2 text-sm text-white/70">
              Entries stay private by default. CIA reads only what you choose to share to synthesize patterns.
            </p>
            <div className="mt-4">
              <SafetyCard />
            </div>
          </div>
        </GlassCard>
      </main>
    </HifiShell>
  )
}