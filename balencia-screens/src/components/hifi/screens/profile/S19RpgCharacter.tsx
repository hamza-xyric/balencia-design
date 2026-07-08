import { ChevronRight, Flame, Snowflake, Sparkles } from 'lucide-react'
import {
  CIAPresenceOrb,
  ConsentRail,
  GlassCard,
  HifiShell,
  MiniRadar,
  ProgressBar,
  Provenance,
  SectionTitle,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'
import { persona } from '@/data/hifi/persona'

const domainSkills = [
  { name: 'Fitness', value: 74, color: 'text-domain-fitness', bar: 'bg-domain-fitness' },
  { name: 'Wellbeing', value: 62, color: 'text-domain-wellbeing', bar: 'bg-domain-wellbeing' },
  { name: 'Career', value: 55, color: 'text-domain-career', bar: 'bg-domain-career' },
  { name: 'Nutrition', value: 51, color: 'text-domain-nutrition', bar: 'bg-domain-nutrition' },
  { name: 'Finance', value: 48, color: 'text-domain-finance', bar: 'bg-domain-finance' },
  { name: 'Learning', value: null, color: 'text-white/40', bar: 'bg-white/[0.06]' },
] as const

const rankedDomains = [
  { name: 'Fitness', value: 74, bar: 'bg-domain-fitness' },
  { name: 'Wellbeing', value: 62, bar: 'bg-domain-wellbeing' },
] as const

const missionHistory = persona.pinnedMissions

// Life World — read-only celebratory whole-life progression view. Chosen
// state: default, populated, five of six domains reporting. Honest-null
// (level 1, ghosted radar, unstarted domains with starter copy), low-
// confidence (dashed domain bars, "estimated · low confidence"), offline/
// disabled (refresh and links dimmed), skeleton, error (scoped ErrorState),
// and the level-up CelebrationOverlay are documented in the source spec —
// static prototype, no handlers.
export function S19RpgCharacter() {
  return (
    <HifiShell
      header={
        <TopBar
          title="Life world"
          back={false}
          right={<CIAPresenceOrb size={28} state="idle" />}
        />
      }
      activeTab="me"
      atmosphere="you"
      showTabBar
    >
      <main className="space-y-4 px-4 pb-6 pt-3">
        {/* Character card — dominant focal moment */}
        <GlassCard tone="you">
          <div className="flex items-start gap-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-white/15 bg-white/[0.06]">
              <span className="flex h-full w-full items-center justify-center text-[18px] font-semibold text-white/85">AM</span>
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-pill bg-brand-orange px-2 py-0.5 text-[10px] font-semibold text-white shadow-[var(--glow-orange-sm)]">
                Lv {persona.level}
              </span>
            </div>
            <div className="flex-1 space-y-1 pt-1">
              <h2 className="text-[18px] font-semibold leading-6 text-white">{persona.firstName}, dedicated explorer</h2>
              <p className="text-[13px] leading-4 text-white/55">
                Your <span className="text-emphasis">character</span> across every domain of life.
              </p>
            </div>
          </div>
          <div className="mt-5 space-y-2">
            <div className="flex items-baseline justify-between text-[11px] uppercase tracking-wide text-white/40">
              <span>Experience</span>
              <span className="text-[13px] font-medium normal-case tabular-nums text-white/75">2,450 / 5,809 XP</span>
            </div>
            <ProgressBar value={42} tone="you" />
          </div>
        </GlassCard>

        {/* Constellation radar */}
        <SolidCard className="flex flex-col items-center gap-4 py-6">
          <MiniRadar labels />
          <p className="max-w-[260px] text-center text-[13px] leading-5 text-white/55">
            Strongest in Fitness. Meditation has room to grow.
          </p>
          <Provenance items={['Via RPG stats']} />
        </SolidCard>

        {/* Domain skills */}
        <section className="space-y-3">
          <SectionTitle title="Domain skills" meta="6 areas" />
          <div className="grid grid-cols-3 gap-2.5">
            {domainSkills.map(skill => (
              <SolidCard key={skill.name} className="space-y-1.5 p-3">
                <span className={`text-[10px] font-semibold uppercase tracking-wide ${skill.color}`}>{skill.name}</span>
                <p className="text-[19px] font-semibold tabular-nums text-white">{skill.value ?? '--'}</p>
                <div className="h-1 w-full overflow-hidden rounded-pill bg-white/[0.06]">
                  {skill.value !== null && <div className={`h-full rounded-pill ${skill.bar}`} style={{ width: `${skill.value}%` }} />}
                </div>
                {skill.value === null && <span className="text-[10px] leading-3 text-white/45">Log one entry to begin</span>}
              </SolidCard>
            ))}
          </div>
          <ConsentRail compact />
        </section>

        {/* Ranked magnitude */}
        <section className="space-y-3">
          <SectionTitle title="Ranked" meta="Top domains" />
          <SolidCard className="space-y-3 p-4">
            {rankedDomains.map(domain => (
              <div key={domain.name} className="flex items-center gap-3">
                <span className="w-20 shrink-0 text-[13px] font-medium text-white/65">{domain.name}</span>
                <div className="h-2.5 flex-1 overflow-hidden rounded-pill bg-white/[0.06]">
                  <div className={`h-full rounded-pill ${domain.bar}`} style={{ width: `${domain.value}%` }} />
                </div>
                <span className="w-7 shrink-0 text-right text-[13px] font-semibold tabular-nums text-white/80">{domain.value}</span>
              </div>
            ))}
          </SolidCard>
        </section>

        {/* Streak & rewards */}
        <section className="space-y-3">
          <SectionTitle title="Streak & rewards" />
          <div className="grid grid-cols-3 gap-2.5">
            <SolidCard className="flex flex-col items-center gap-1.5 py-3.5 text-center">
              <Flame className="h-4 w-4 text-brand-orange" strokeWidth={1.9} />
              <span className="text-[17px] font-semibold leading-5 tabular-nums text-white">42 days</span>
            </SolidCard>
            <SolidCard className="flex flex-col items-center gap-1.5 py-3.5 text-center">
              <Sparkles className="h-4 w-4 text-brand-orange" strokeWidth={1.9} />
              <span className="text-[17px] font-semibold leading-5 tabular-nums text-white">2.5&times; XP</span>
            </SolidCard>
            <SolidCard className="flex flex-col items-center gap-1.5 py-3.5 text-center">
              <Snowflake className="h-4 w-4 text-white/60" strokeWidth={1.9} />
              <span className="text-[17px] font-semibold leading-5 tabular-nums text-white">2 freezes</span>
            </SolidCard>
          </div>
        </section>

        {/* Mission history */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between">
            <SectionTitle title="Mission history" />
            <span className="flex min-h-11 items-center gap-1 px-2 text-[13px] font-medium text-brand-orange/90">
              View all <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.9} />
            </span>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/[0.06]">
            {missionHistory.map((mission, index) => (
              <button
                key={mission.name}
                type="button"
                aria-label={`${mission.name}, ${mission.progress} percent complete`}
                className={`flex min-h-14 w-full items-center justify-between gap-3 px-4 py-3 text-left ${index > 0 ? 'border-t border-white/[0.06]' : ''}`}
              >
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-medium text-white">{mission.name}</p>
                  <p className="mt-0.5 text-[12px] text-white/45">{mission.domain} mission</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-[13px] font-semibold tabular-nums text-white/65">{mission.progress}%</span>
                  <ChevronRight className="h-4 w-4 text-white/30" strokeWidth={1.9} />
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>
    </HifiShell>
  )
}
