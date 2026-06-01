'use client'

import Link from 'next/link'
import { Circle, GripHorizontal, Plus, X } from 'lucide-react'
import { useState } from 'react'
import { BottomSheet } from '@/components/design-system/BottomSheet'
import { Button } from '@/components/design-system/Button'
import { DomainTag } from '@/components/design-system/DomainTag'
import { Eyebrow } from '@/components/design-system/Eyebrow'
import { SegmentedControl } from '@/components/design-system/SegmentedControl'
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

type MissionTypeValue = typeof createMissionPlan.type
type TrackingState = Record<string, boolean>

function Section({ label, children, className = '' }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={className}>
      <Eyebrow>{label}</Eyebrow>
      <div className="mt-2">{children}</div>
    </section>
  )
}

function SwitchButton({ checked, onChange, label }: { checked: boolean; onChange: (checked: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform duration-[var(--dur-fast)] active:scale-95"
    >
      <span className={['relative inline-flex h-5 w-[34px] rounded-pill transition-colors duration-[var(--dur-fast)]', checked ? 'bg-brand-orange' : 'bg-white/15'].join(' ')}>
        <span className={['absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform duration-[var(--dur-fast)]', checked ? 'translate-x-[16px]' : 'translate-x-0.5'].join(' ')} />
      </span>
    </button>
  )
}

function MissionTypeSuggestion({ selected, onChange }: { selected: MissionTypeValue; onChange: (value: MissionTypeValue) => void }) {
  return (
    <Section label="Mission type">
      <div className="-mx-4 overflow-x-auto px-4 pb-1 hide-scrollbar">
        <div className="flex gap-2">
          {typeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={[
                'h-11 shrink-0 rounded-pill border px-4 text-caption font-semibold leading-[18px]',
                option.value === selected
                  ? 'border-brand-orange bg-brand-orange text-white'
                  : 'border-white/10 bg-ink-brown-800 text-white/50',
              ].join(' ')}
              onClick={() => onChange(option.value as MissionTypeValue)}
              aria-pressed={option.value === selected}
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

function DomainAssignment({ domains, onAdd, onRemove }: { domains: typeof createMissionPlan.domains; onAdd: () => void; onRemove: (domain: typeof createMissionPlan.domains[number]) => void }) {
  return (
    <Section label="Domain">
      <div className="flex flex-wrap items-center gap-2">
        {domains.map((domain) => (
          <span key={domain} className="inline-flex items-center gap-1">
            <DomainTag domain={domain} />
            <button type="button" onClick={() => onRemove(domain)} className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full text-white/50" aria-label={`Remove ${domain}`}>
              <X size={10} strokeWidth={2} />
            </button>
          </span>
        ))}
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex h-11 items-center gap-1 rounded-pill border border-dashed border-white/10 px-3 text-small font-semibold leading-[14px] text-white/40"
        >
          <Plus size={12} strokeWidth={2} />
          Add
        </button>
      </div>
    </Section>
  )
}

function ActionsList({ actions, onAdd, onRemove }: { actions: string[]; onAdd: () => void; onRemove: (action: string) => void }) {
  return (
    <Section label="Actions">
      <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-ink-brown-800 shadow-1">
        {actions.map((action) => (
          <div key={action} className="flex h-11 items-center gap-3 border-b border-white/[0.05] px-4 last:border-b-0">
            <GripHorizontal size={14} className="shrink-0 text-white/20" strokeWidth={2} />
            <span className="min-w-0 flex-1 truncate text-[15px] leading-5 text-white">
              {action}
            </span>
            <button type="button" onClick={() => onRemove(action)} className="flex h-11 w-11 items-center justify-center text-white/30" aria-label={`Remove ${action}`}>
              <X size={14} strokeWidth={2} />
            </button>
          </div>
        ))}
        <button type="button" onClick={onAdd} className="flex h-11 items-center gap-2 px-4 text-[14px] leading-[18px] text-brand-orange">
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

function TrackingSignals({ tracking, onToggle }: { tracking: TrackingState; onToggle: (signal: string, checked: boolean) => void }) {
  return (
    <Section label="Tracking">
      <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-ink-brown-800 shadow-1">
        {createMissionPlan.tracking.map((signal) => (
          <div key={signal} className="flex min-h-12 items-center justify-between gap-3 border-b border-white/[0.05] px-4 last:border-b-0">
            <span className="text-[14px] leading-[18px] text-white/70">{signal}</span>
            <SwitchButton checked={tracking[signal]} onChange={(checked) => onToggle(signal, checked)} label={`Track ${signal}`} />
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

function MissionPreview({ title, type, domains }: { title: string; type: typeof createMissionPlan.type; domains: typeof createMissionPlan.domains }) {
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
              {title}
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <MissionTypeBadge type={type} />
              {domains.map((domain) => (
                <DomainTag key={domain} domain={domain} />
              ))}
            </div>
          </div>
        </div>
      </article>
    </Section>
  )
}

function ChainSuggestions({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) {
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
        <div className="flex min-h-12 items-center justify-between gap-3">
          <span className="text-[14px] leading-[18px] text-white/70">Link as chain</span>
          <SwitchButton checked={checked} onChange={onChange} label="Link as chain" />
        </div>
      </div>
    </Section>
  )
}

export default function CreateMissionScreen() {
  const [intent, setIntent] = useState('')
  const [stage, setStage] = useState<'input' | 'planning' | 'result' | 'error'>('input')
  const [missionType, setMissionType] = useState(createMissionPlan.type)
  const [domains, setDomains] = useState(createMissionPlan.domains)
  const [actions, setActions] = useState(createMissionPlan.actions)
  const [strictness, setStrictness] = useState('balanced')
  const [chain, setChain] = useState(true)
  const [tracking, setTracking] = useState<TrackingState>(() => Object.fromEntries(createMissionPlan.tracking.map((signal) => [signal, true])))
  const canPlan = intent.trim().length >= 8
  const createdTitle = intent.trim() || createMissionPlan.input
  const createdMissionHref = `/tabs/goals/detail?source=create&title=${encodeURIComponent(createdTitle)}&type=${missionType}&domains=${encodeURIComponent(domains.join(','))}&next=${encodeURIComponent(actions[0] ?? 'Review plan with SIA')}`

  const planMission = () => {
    if (!canPlan) {
      setStage('error')
      return
    }
    setStage('planning')
    window.setTimeout(() => setStage('result'), 500)
  }

  return (
    <PhoneFrame>
      <ScreenShell showTabBar={false}>
        <BottomSheet title="New mission" closeHref="/tabs/goals">
          <main className="px-4 pb-8 pt-2">
            {stage !== 'result' && (
              <section className="animate-fade-up">
                <Eyebrow>What do you want to build?</Eyebrow>
                <textarea
                  value={intent}
                  onChange={(event) => setIntent(event.currentTarget.value)}
                  placeholder="Example: train for a half marathon without burning out"
                  className="mt-2 min-h-[112px] w-full resize-none rounded-xl border border-white/10 bg-ink-brown-800 p-4 text-[15px] leading-5 text-white outline-none placeholder:text-white/35"
                  aria-label="Mission intent"
                />
                {stage === 'error' && <p className="mt-2 text-caption leading-[18px] text-error-red">Add a little more detail so SIA can build a useful plan.</p>}
                <Button className="mt-4" fullWidth disabled={!canPlan || stage === 'planning'} onClick={planMission}>
                  {stage === 'planning' ? 'Planning...' : 'Plan with SIA'}
                </Button>
              </section>
            )}

            {stage === 'result' && (
            <>
            <p className="animate-fade-up text-body font-semibold leading-[22px] text-white">
              &quot;{intent || createMissionPlan.input}&quot;
            </p>
            <div className="mt-4 animate-fade-up" style={{ animationDelay: '80ms' }}>
              <MissionTypeSuggestion selected={missionType} onChange={setMissionType} />
            </div>

            <div className="mt-4 animate-fade-up" style={{ animationDelay: '160ms' }}>
              <DomainAssignment
                domains={domains}
                onAdd={() => setDomains((current) => current.includes('wellbeing') ? current : [...current, 'wellbeing'])}
                onRemove={(domain) => setDomains((current) => current.filter((item) => item !== domain))}
              />
            </div>

            <div className="mt-4 animate-fade-up" style={{ animationDelay: '240ms' }}>
              <ActionsList actions={actions} onAdd={() => setActions((current) => [...current, 'Review plan with SIA'])} onRemove={(action) => setActions((current) => current.filter((item) => item !== action))} />
            </div>

            <div className="mt-4 animate-fade-up" style={{ animationDelay: '320ms' }}>
              <MilestonesList />
            </div>

            <div className="mt-4 animate-fade-up" style={{ animationDelay: '400ms' }}>
              <TrackingSignals tracking={tracking} onToggle={(signal, checked) => setTracking((current) => ({ ...current, [signal]: checked }))} />
            </div>

            <div className="mt-4 animate-fade-up" style={{ animationDelay: '480ms' }}>
              <ConnectionsPreview />
            </div>

            <div className="mt-6 animate-fade-up" style={{ animationDelay: '560ms' }}>
              <Section label="How strict?">
                <SegmentedControl
                  size="md"
                  activeValue={strictness}
                  onValueChange={setStrictness}
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
              <MissionPreview title={createdTitle} type={missionType} domains={domains} />
            </div>

            <div className="mt-4 animate-fade-up" style={{ animationDelay: '720ms' }}>
              <ChainSuggestions checked={chain} onChange={setChain} />
            </div>

            <div className="mt-8 animate-fade-up" style={{ animationDelay: '800ms' }}>
              <Link href={createdMissionHref} className="flex h-[56px] w-full items-center justify-center rounded-pill bg-brand-orange px-6 text-[17px] font-semibold text-white">
                {chain ? 'Create mission chain' : 'Create mission'}
              </Link>
            </div>
            </>
            )}
          </main>
        </BottomSheet>
      </ScreenShell>
    </PhoneFrame>
  )
}
