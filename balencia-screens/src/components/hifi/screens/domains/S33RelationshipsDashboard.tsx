import { Sparkles, Phone, ChevronRight, ShieldCheck } from 'lucide-react'
import {
  HifiShell,
  TopBar,
  CIAInsightCard,
  SolidCard,
  GlassCard,
  ProgressRing,
  Chip,
  Provenance,
  ConsentRail,
  FloatingQuickLog,
  SectionTitle,
  BtnPrimary,
  BtnGhost,
} from '@/components/hifi/kit'

export function S33RelationshipsDashboard() {
  return (
    <HifiShell
      atmosphere="cia"
      activeTab="today"
      header={
        <TopBar
          title="Relationships"
          right={<Chip tone="you">Lv 12</Chip>}
        />
      }
      bottomAction={<FloatingQuickLog label="Log quality time" />}
    >
      <div className="h-0.5 w-full bg-white/[0.06]">
        <div className="h-full w-3/5 bg-domain-people" />
      </div>

      <main className="space-y-4 px-4 pb-6 pt-4">
        <CIAInsightCard
          eyebrow="CIA coaching note"
          provenance={['CIA sync']}
        >
          <p className="text-[15px] leading-snug text-white/80">
            You feel more <span className="text-emphasis">connected</span> after morning walks with family. Consider inviting Ahmed this week.
          </p>
        </CIAInsightCard>

        <SolidCard>
          <div className="grid grid-cols-3 divide-x divide-white/10">
            <div className="flex flex-col items-center justify-center gap-1 py-3">
              <span className="text-2xl font-semibold tabular-nums text-white">4.5h</span>
              <span className="text-[11px] uppercase tracking-wider text-white/45">Time</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 py-3">
              <span className="text-2xl font-semibold tabular-nums text-white">5</span>
              <span className="text-[11px] uppercase tracking-wider text-white/45">Sessions</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 py-3">
              <span className="text-2xl font-semibold tabular-nums text-white">3</span>
              <span className="text-[11px] uppercase tracking-wider text-white/45">People</span>
            </div>
          </div>
          <div className="px-4 pb-3 pt-1">
            <Provenance items={['You logged']} />
          </div>
        </SolidCard>

        <GlassCard tone="cia">
          <div className="flex flex-col items-center gap-3 py-6">
            <ProgressRing percent={84} value="84%" size={120} tone="cia" label="In touch" />
            <div className="text-center">
              <p className="text-[13px] text-white/65">Connection strength across your inner circle</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 pt-1">
              <Chip tone="muted">CIA sync</Chip>
              <Chip tone="muted">Estimated</Chip>
            </div>
          </div>
        </GlassCard>

        <div className="space-y-2">
          <SectionTitle title="Check in" meta="2 reminders" />
          <SolidCard>
            <button
              type="button"
              className="flex min-h-11 w-full items-center justify-between px-4 py-3 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06]">
                  <Phone className="h-4 w-4 text-brand-orange" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-medium text-white">Ahmed on your mind</span>
                  <span className="text-[12px] text-white/45">2 weeks since last call</span>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-white/30" />
            </button>
          </SolidCard>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <SectionTitle title="Key people" />
            <button type="button" className="flex min-h-11 items-center text-[12px] font-medium uppercase tracking-wider text-brand-orange">
              View all
            </button>
          </div>
          <SolidCard>
            <div className="border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="relative flex h-9 w-9 items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/15" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-medium text-white">Inner circle portfolio</span>
                  <span className="text-[12px] text-white/45">Tap a person to retarget</span>
                </div>
              </div>
            </div>

            <PersonRow name="Ahmed" status="In touch" tone="done" percent={72} lastContext="Call · 2w" />
            <PersonRow name="Mom" status="Today" tone="you" percent={88} lastContext="Dinner · 2h" />
            <PersonRow name="Sarah" status="Reach out" tone="cia" percent={34} lastContext="Text · 1mo" />
          </SolidCard>
        </div>

        <div className="space-y-2">
          <SectionTitle title="Recent quality time" />
          <SolidCard>
            <button type="button" className="flex w-full min-h-11 items-center justify-between px-4 py-3 text-left">
              <div className="flex flex-col">
                <span className="text-[14px] font-medium text-white">Dinner with Mom</span>
                <span className="text-[12px] text-white/45">2h ago · 90 minutes</span>
              </div>
              <span className="rounded-full bg-domain-people/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-domain-people">Family</span>
            </button>
          </SolidCard>
        </div>

        <CIAInsightCard
          eyebrow="CIA suggests"
          provenance={['Pattern match']}
          actions={
            <>
              <BtnGhost quiet>Skip</BtnGhost>
              <BtnPrimary>Do it</BtnPrimary>
            </>
          }
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.06]">
              <Sparkles className="h-4 w-4 text-royal-purple" />
            </div>
            <p className="text-[14px] leading-snug text-white/80">
              Exercising with Ahmed this week aligns with your fitness mission and boosts connection scores.
            </p>
          </div>
        </CIAInsightCard>

        <div className="space-y-2">
          <SectionTitle title="Data sources" />
          <GlassCard tone="muted">
            <div className="space-y-3 p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                <p className="text-[12px] leading-snug text-white/65">
                  Contacts and calendar inform your relationship <span className="text-emphasis">dashboard</span>. You control what is synced.
                </p>
              </div>
              <ConsentRail />
            </div>
          </GlassCard>
        </div>
      </main>
    </HifiShell>
  )
}

function PersonRow({
  name,
  status,
  tone,
  percent,
  lastContext,
}: {
  name: string
  status: string
  tone: 'done' | 'you' | 'cia'
  percent: number
  lastContext: string
}) {
  return (
    <button type="button" className="flex w-full min-h-[60px] items-center justify-between border-b border-white/10 px-4 py-2 text-left last:border-b-0">
      <div className="flex items-center gap-3">
        <ProgressRing percent={percent} value="" size={40} tone={tone} ghost />
        <div className="flex flex-col">
          <span className="text-[14px] font-medium text-white">{name}</span>
          <span className="text-[11px] uppercase tracking-wider text-white/45">{lastContext}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wider ${
          tone === 'done' ? 'bg-forest-green/15 text-forest-green' :
          tone === 'you' ? 'bg-brand-orange/15 text-brand-orange' :
          'bg-royal-purple/15 text-royal-purple'
        }`}>
          {status}
        </span>
        <ChevronRight className="h-4 w-4 text-white/30" />
      </div>
    </button>
  )
}