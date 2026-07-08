import { Sparkles, MoreHorizontal, Plus, Play, MessageSquare, Camera, Mic, PenLine } from 'lucide-react'
import {
  HifiShell,
  TopBar,
  IconButton,
  SectionTitle,
  GlassCard,
  SolidCard,
  Chip,
  Provenance,
  ConsentRail,
  BtnPrimary,
  BtnGhost,
  BtnSecondary,
  CIAInsightCard,
  FloatingQuickLog,
  ProgressBar,
  HeatGrid,
  MomentumBar,
  MetricPill,
} from '@/components/hifi/kit'

function PortfolioTimeline() {
  const milestones = [
    { label: 'First draft', state: 'done' },
    { label: 'Demo cut', state: 'done' },
    { label: 'Short film', state: 'pending' },
  ]
  return (
    <div className="flex items-center gap-2">
      <div className="h-px flex-1 bg-white/15" />
      {milestones.map((m, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`h-9 w-9 rounded-full border flex items-center justify-center ${
                m.state === 'done'
                  ? 'border-forest-green/60 bg-forest-green/15'
                  : 'border-white/15 bg-white/[0.04]'
              }`}
            >
              {m.state === 'done' ? (
                <span className="h-2 w-2 rounded-full bg-forest-green" />
              ) : (
                <span className="h-2 w-2 rounded-full bg-white/30" />
              )}
            </div>
            <span className="text-[10px] uppercase tracking-wider text-white/45">
              {m.label}
            </span>
          </div>
          {i < milestones.length - 1 && <div className="h-px w-6 bg-white/15" />}
        </div>
      ))}
      <div className="h-px flex-1 bg-white/15" />
    </div>
  )
}

export function S36CreativityDashboard() {
  return (
    <HifiShell
      header={
        <TopBar
          title="Creativity"
          eyebrow="Practice hub"
          right={<IconButton label="More options"><MoreHorizontal size={18} /></IconButton>}
        />
      }
      activeTab="today"
      bottomAction={<FloatingQuickLog label="Log session" />}
      atmosphere="you"
    >
      <main className="space-y-4 px-4 pb-4 pt-3">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-amber-400/80">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80" />
            <span className="text-amber-400/80">Amira · Lv 12</span>
            <span className="text-white/30">·</span>
            <span className="text-white/45">Explore domain</span>
          </div>
          <h1 className="text-xl font-semibold leading-tight text-white/90">
            Your creativity <span className="text-emphasis">dashboard</span>
          </h1>
        </div>

        <CIAInsightCard
          eyebrow="CIA pattern"
          provenance={['CIA synthesis', 'Recent practice']}
          actions={<Chip tone="cia" interactive>See morning sessions</Chip>}
        >
          Your best work happens in the morning. Try a short session after breakfast.
        </CIAInsightCard>

        <section className="space-y-2.5">
          <SectionTitle title="Active projects" meta="2 missions" />
          <SolidCard>
            <div className="space-y-3 p-3">
              <button
                type="button"
                className="block w-full text-left"
              >
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <span className="text-[13px] font-medium text-white/90">
                    Short film script
                  </span>
                  <span className="text-[11px] tabular-nums text-white/55">
                    45%
                  </span>
                </div>
                <ProgressBar value={45} tone="you" />
                <div className="mt-2 flex items-center gap-1.5">
                  <Chip tone="you">Project update</Chip>
                  <Chip tone="muted">2 days ago</Chip>
                </div>
              </button>

              <div className="h-px bg-white/[0.06]" />

              <button
                type="button"
                className="block w-full text-left"
              >
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <span className="text-[13px] font-medium text-white/90">
                    Photography portfolio
                  </span>
                  <span className="text-[11px] tabular-nums text-white/55">
                    72%
                  </span>
                </div>
                <ProgressBar value={72} tone="done" />
                <div className="mt-2 flex items-center gap-1.5">
                  <Chip tone="you">Project update</Chip>
                  <Chip tone="muted">Today</Chip>
                </div>
              </button>
            </div>
          </SolidCard>
        </section>

        <GlassCard tone="you">
          <div className="space-y-3 p-4">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-brand-orange" />
              <span className="text-[11px] uppercase tracking-wider text-white/55">
                Inspiration prompt
              </span>
            </div>
            <p className="text-[13px] leading-snug text-white/80">
              Make something with the materials nearby.
            </p>
            <Provenance items={['Journal prompt']} />
            <div className="flex flex-wrap gap-2 pt-1">
              <BtnSecondary>
                <span className="flex items-center gap-1.5">
                  <Play className="h-3.5 w-3.5" /> Start creating
                </span>
              </BtnSecondary>
              <BtnGhost>
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="h-3.5 w-3.5" /> Reflect
                </span>
              </BtnGhost>
            </div>
          </div>
        </GlassCard>

        <section className="space-y-2.5">
          <SectionTitle title="This week" meta="2 of 7 days" />
          <SolidCard>
            <div className="flex items-center justify-between gap-2 p-3">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-[12px] font-medium ${
                      i === 0 || i === 3
                        ? 'bg-brand-orange/20 text-brand-orange'
                        : 'bg-white/[0.04] text-white/40'
                    }`}
                  >
                    {d}
                  </div>
                  <div
                    className={`h-1 w-1 rounded-full ${
                      i === 0 || i === 3 ? 'bg-brand-orange' : 'bg-white/15'
                    }`}
                  />
                </div>
              ))}
            </div>
          </SolidCard>
        </section>

        <section className="space-y-2.5">
          <SectionTitle title="Creative practice" />
          <SolidCard>
            <div className="space-y-3 p-3">
              <p className="text-[11px] uppercase tracking-wider text-white/45">
                Practice consistency
              </p>
              <HeatGrid
                values={[1, 0, 2, 3, 0, 1, 2, 0, 0, 3, 1, 2, 0, 1, 3, 2, 0, 1, 0, 2, 1, 0, 2, 3]}
                columns={6}
              />
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <Chip tone="you">You logged</Chip>
                <Chip tone="muted">Last 24 days</Chip>
              </div>
            </div>
          </SolidCard>
        </section>

        <section className="space-y-2.5">
          <SectionTitle title="This week" />
          <div className="grid grid-cols-3 gap-2">
            <MetricPill label="Sessions" value="3" tone="you" />
            <MetricPill label="Hours" value="4.5" tone="you" />
            <MetricPill label="Streak" value="8" tone="you" />
          </div>
        </section>

        <section className="space-y-2.5">
          <SectionTitle title="Mission progress" />
          <SolidCard>
            <div className="space-y-3 p-3">
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[12px] text-white/70">Film</span>
                  <span className="text-[11px] tabular-nums text-white/55">55%</span>
                </div>
                <MomentumBar value={55} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[12px] text-white/70">Photo</span>
                  <span className="text-[11px] tabular-nums text-white/55">80%</span>
                </div>
                <MomentumBar value={80} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[12px] text-white/70">Write</span>
                  <span className="text-[11px] tabular-nums text-white/55">30%</span>
                </div>
                <MomentumBar value={30} />
              </div>
            </div>
          </SolidCard>
        </section>

        <section className="space-y-2.5">
          <SectionTitle title="Gallery" meta="2 of 3 milestones" />
          <SolidCard>
            <div className="space-y-3 p-3">
              <PortfolioTimeline />
              <p className="text-center text-[11px] text-white/45">
                First draft to demo to film
              </p>
            </div>
          </SolidCard>
        </section>

        <section className="space-y-2.5">
          <SectionTitle title="Recent activity" />
          <SolidCard>
            <div className="divide-y divide-white/[0.06]">
              <button type="button" className="flex min-h-11 w-full items-center gap-3 p-3 text-left">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-orange/15">
                  <PenLine className="h-4 w-4 text-brand-orange" />
                </div>
                <div className="flex-1">
                  <p className="text-[12px] text-white/85">Writing session</p>
                  <p className="text-[11px] text-white/45">Today · 45 min</p>
                </div>
                <Chip tone="you">You logged</Chip>
              </button>
              <button type="button" className="flex min-h-11 w-full items-center gap-3 p-3 text-left">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-orange/15">
                  <Camera className="h-4 w-4 text-brand-orange" />
                </div>
                <div className="flex-1">
                  <p className="text-[12px] text-white/85">Photo export</p>
                  <p className="text-[11px] text-white/45">Yesterday · 12 frames</p>
                </div>
                <Chip tone="you">You logged</Chip>
              </button>
              <button type="button" className="flex min-h-11 w-full items-center gap-3 p-3 text-left">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-orange/15">
                  <Mic className="h-4 w-4 text-brand-orange" />
                </div>
                <div className="flex-1">
                  <p className="text-[12px] text-white/85">Voice note</p>
                  <p className="text-[11px] text-white/45">2 days ago · 8 min</p>
                </div>
                <Chip tone="muted">Estimated</Chip>
              </button>
            </div>
          </SolidCard>
        </section>

        <section className="space-y-2.5">
          <SectionTitle title="Data sources" />
          <ConsentRail compact />
        </section>

        <div className="pt-1">
          <BtnPrimary>
            <span className="flex items-center gap-1.5">
              <Plus className="h-4 w-4" /> Log new session
            </span>
          </BtnPrimary>
        </div>
      </main>
    </HifiShell>
  )
}