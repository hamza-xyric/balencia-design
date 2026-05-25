import { Circle, GripHorizontal, Plus, X } from 'lucide-react'
import { BottomSheet } from '@/components/design-system/BottomSheet'
import { Button } from '@/components/design-system/Button'
import { DomainTag } from '@/components/design-system/DomainTag'
import { Eyebrow } from '@/components/design-system/Eyebrow'
import { SegmentedControl } from '@/components/design-system/SegmentedControl'
import { ToggleSwitch } from '@/components/design-system/ToggleSwitch'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { MissionTypeBadge } from '@/components/screens/MissionTypeBadge'
import { ProgressRing } from '@/components/screens/ProgressRing'
import { createMissionPlan } from '@/data/mock'

// Screen 15 of 78: Create mission
// Spec: /Users/hamza/yHealth/app_design 3/15-create-edit-goal.md

const typeOptions = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Side', value: 'side' },
  { label: 'Main', value: 'main' },
  { label: 'Life', value: 'life' },
]

function Section({ label, children, className = '' }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={className}>
      <Eyebrow>{label}</Eyebrow>
      <div className="mt-2">{children}</div>
    </section>
  )
}

function MissionTypeSuggestion() {
  return (
    <Section label="Mission type">
      <div className="-mx-4 overflow-x-auto px-4 pb-1 hide-scrollbar">
        <div className="flex gap-2">
          {typeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={[
                'h-9 shrink-0 rounded-pill border px-4 text-caption font-semibold leading-[18px]',
                option.value === createMissionPlan.type
                  ? 'border-brand-orange bg-brand-orange text-white'
                  : 'border-white/10 bg-ink-brown-800 text-white/50',
              ].join(' ')}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-1 text-caption leading-[18px] text-white/40">
        This looks like a main mission because it will take a few months of consistent effort.
      </p>
    </Section>
  )
}

function DomainAssignment() {
  return (
    <Section label="Domain">
      <div className="flex flex-wrap items-center gap-2">
        {createMissionPlan.domains.map((domain) => (
          <span key={domain} className="inline-flex items-center gap-1">
            <DomainTag domain={domain} />
            <X size={10} className="-ml-4 text-white/50" strokeWidth={2} />
          </span>
        ))}
        <button
          type="button"
          className="inline-flex h-6 items-center gap-1 rounded-pill border border-dashed border-white/10 px-2 text-small font-semibold leading-[14px] text-white/40"
        >
          <Plus size={12} strokeWidth={2} />
          Add
        </button>
      </div>
    </Section>
  )
}

function ActionsList() {
  return (
    <Section label="Actions">
      <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-ink-brown-800 shadow-1">
        {createMissionPlan.actions.map((action) => (
          <div key={action} className="flex h-11 items-center gap-3 border-b border-white/[0.05] px-4 last:border-b-0">
            <GripHorizontal size={14} className="shrink-0 text-white/20" strokeWidth={2} />
            <span className="min-w-0 flex-1 truncate text-[15px] leading-5 text-white">
              {action}
            </span>
            <X size={14} className="shrink-0 text-white/20" strokeWidth={2} />
          </div>
        ))}
        <button type="button" className="flex h-11 items-center gap-2 px-4 text-[14px] leading-[18px] text-brand-orange">
          <Plus size={14} strokeWidth={2} />
          add action
        </button>
      </div>
    </Section>
  )
}

function MilestonesList() {
  return (
    <Section label="Milestones">
      <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-ink-brown-800 shadow-1">
        {createMissionPlan.milestones.map((milestone) => (
          <div key={milestone.name} className="flex min-h-12 items-center gap-3 border-b border-white/[0.05] px-4 py-2 last:border-b-0">
            <Circle size={10} className="shrink-0 text-brand-orange" strokeWidth={2.4} />
            <span className="min-w-0 flex-1 text-[15px] leading-5 text-white">
              {milestone.name}
            </span>
            <span className="shrink-0 text-caption leading-[18px] text-white/50">
              {milestone.date}
            </span>
          </div>
        ))}
      </div>
    </Section>
  )
}

function TrackingSignals() {
  return (
    <Section label="Tracking">
      <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-ink-brown-800 shadow-1">
        {createMissionPlan.tracking.map((signal) => (
          <div key={signal} className="flex h-9 items-center justify-between border-b border-white/[0.05] px-4 last:border-b-0">
            <span className="text-[14px] leading-[18px] text-white/70">{signal}</span>
            <ToggleSwitch checked aria-label={`Track ${signal}`} />
          </div>
        ))}
      </div>
    </Section>
  )
}

function ConnectionsPreview() {
  return (
    <Section label="Connections">
      <div className="rounded-xl border border-white/[0.06] bg-ink-brown-800 p-6 shadow-1">
        <div className="flex flex-wrap gap-2">
          {createMissionPlan.connections.map((domain) => (
            <DomainTag key={domain} domain={domain} />
          ))}
        </div>
        <p className="mt-3 text-[14px] leading-[18px] text-white/60">
          Fueling supports endurance training and protects recovery.
        </p>
      </div>
    </Section>
  )
}

function MissionPreview() {
  return (
    <Section label="Mission preview">
      <article className="relative rounded-xl border border-white/[0.06] bg-ink-brown-800 p-5 shadow-1">
        <span className="absolute right-4 top-4 text-small font-semibold uppercase tracking-[0.12em] text-white/30">
          preview
        </span>
        <div className="flex gap-3">
          <div className="flex w-14 shrink-0 items-center justify-center">
            <ProgressRing progress={0} size={36} />
          </div>
          <div className="min-w-0 flex-1 pr-10">
            <h2 className="text-body font-semibold leading-[22px] text-white">
              {createMissionPlan.input}
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <MissionTypeBadge type={createMissionPlan.type} />
              {createMissionPlan.domains.map((domain) => (
                <DomainTag key={domain} domain={domain} />
              ))}
            </div>
          </div>
        </div>
      </article>
    </Section>
  )
}

function ChainSuggestions() {
  return (
    <Section label="What comes next?">
      <div className="space-y-3">
        {createMissionPlan.chainSuggestions.map((suggestion) => (
          <article key={suggestion.name} className="rounded-md border border-white/[0.06] bg-ink-brown-800 p-4 shadow-1">
            <h3 className="text-[15px] font-semibold leading-5 text-white">
              {suggestion.name}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <MissionTypeBadge type={suggestion.type} />
              {suggestion.domains.map((domain) => (
                <DomainTag key={domain} domain={domain} />
              ))}
            </div>
          </article>
        ))}
        <p className="text-caption leading-[18px] text-white/40">
          These will be added as suggestions after you complete this mission.
        </p>
        <div className="flex h-10 items-center justify-between">
          <span className="text-[14px] leading-[18px] text-white/70">Link as chain</span>
          <ToggleSwitch checked aria-label="Link as chain" />
        </div>
      </div>
    </Section>
  )
}

export default function CreateMissionScreen() {
  return (
    <PhoneFrame>
      <ScreenShell showTabBar={false}>
        <BottomSheet title="New mission">
          <main className="px-4 pb-8 pt-2">
            <p className="animate-fade-up truncate text-body font-semibold leading-[22px] text-white">
              &quot;{createMissionPlan.input}&quot;
            </p>

            <div className="mt-4 animate-fade-up" style={{ animationDelay: '80ms' }}>
              <MissionTypeSuggestion />
            </div>

            <div className="mt-4 animate-fade-up" style={{ animationDelay: '160ms' }}>
              <DomainAssignment />
            </div>

            <div className="mt-4 animate-fade-up" style={{ animationDelay: '240ms' }}>
              <ActionsList />
            </div>

            <div className="mt-4 animate-fade-up" style={{ animationDelay: '320ms' }}>
              <MilestonesList />
            </div>

            <div className="mt-4 animate-fade-up" style={{ animationDelay: '400ms' }}>
              <TrackingSignals />
            </div>

            <div className="mt-4 animate-fade-up" style={{ animationDelay: '480ms' }}>
              <ConnectionsPreview />
            </div>

            <div className="mt-6 animate-fade-up" style={{ animationDelay: '560ms' }}>
              <Section label="How strict?">
                <SegmentedControl
                  size="md"
                  activeValue="balanced"
                  options={[
                    { label: 'Lenient', value: 'lenient' },
                    { label: 'Balanced', value: 'balanced' },
                    { label: 'Strict', value: 'strict' },
                  ]}
                />
                <p className="mt-2 text-caption leading-[18px] text-white/40">
                  SIA will hold you accountable with reasonable flexibility.
                </p>
              </Section>
            </div>

            <div className="mt-4 animate-fade-up" style={{ animationDelay: '640ms' }}>
              <MissionPreview />
            </div>

            <div className="mt-4 animate-fade-up" style={{ animationDelay: '720ms' }}>
              <ChainSuggestions />
            </div>

            <div className="mt-8 animate-fade-up" style={{ animationDelay: '800ms' }}>
              <Button size="auth" fullWidth>
                Create mission chain
              </Button>
            </div>
          </main>
        </BottomSheet>
      </ScreenShell>
    </PhoneFrame>
  )
}
