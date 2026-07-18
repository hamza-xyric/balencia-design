'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUp, Check, Plus, X } from 'lucide-react'
import {
  BtnCoach,
  BtnDestructive,
  BtnPrimary,
  BtnSecondary,
  BtnSuccess,
  Chip,
  CIAInsightCard,
  ConsentRail,
  cx,
  GlassCard,
  GlassPillInput,
  HifiShell,
  IconButton,
  LIFE_DOMAIN_ORDER,
  ProgressRing,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'

type MissionEditorState = 'default' | 'empty' | 'processing' | 'error' | 'offline' | 'success' | 'invalid'
type MissionType = 'Life' | 'Main' | 'Side' | 'Weekly' | 'Daily' | 'Group'
type DomainName = (typeof LIFE_DOMAIN_ORDER)[number]
type Milestone = { title: string; date: string }

const EDITOR_STATES: MissionEditorState[] = ['default', 'empty', 'processing', 'error', 'offline', 'success', 'invalid']
const MISSION_TYPES: MissionType[] = ['Life', 'Main', 'Side', 'Weekly', 'Daily', 'Group']
const STRICTNESS_OPTIONS = ['Lenient', 'Balanced', 'Strict'] as const
type Strictness = (typeof STRICTNESS_OPTIONS)[number]

const DOMAIN_CHIP_CLASS: Record<DomainName, string> = {
  Fitness: 'border-domain-fitness/25 bg-domain-fitness/15 text-paper-100',
  Sleep: 'border-domain-sleep/25 bg-domain-sleep/15 text-paper-100',
  Career: 'border-domain-career/25 bg-domain-career/15 text-paper-100',
  Nutrition: 'border-domain-nutrition/25 bg-domain-nutrition/15 text-paper-100',
  Finance: 'border-domain-finance/25 bg-domain-finance/15 text-paper-100',
  Faith: 'border-domain-faith/25 bg-domain-faith/15 text-paper-100',
  Productivity: 'border-domain-productivity/25 bg-domain-productivity/15 text-paper-100',
  Relationships: 'border-domain-relationships/25 bg-domain-relationships/15 text-paper-100',
  Wellbeing: 'border-domain-wellbeing/25 bg-domain-wellbeing/15 text-paper-100',
  Meditation: 'border-domain-meditation/25 bg-domain-meditation/15 text-paper-100',
}

const DEFAULT_PROMPT = 'Run a half marathon by October'
const DEFAULT_ACTIONS = ['Run 3x weekly', 'Strength train 2x']
const DEFAULT_MILESTONES: Milestone[] = [
  { title: '5K pace check', date: 'Aug 15' },
  { title: '10K long run', date: 'Sep 12' },
]

function moveItem<T>(list: T[], index: number, delta: number): T[] {
  const target = index + delta
  if (target < 0 || target >= list.length) return list
  const next = [...list]
  const [item] = next.splice(index, 1)
  next.splice(target, 0, item)
  return next
}

function EditorSegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
  columns,
  disabled = false,
}: {
  label: string
  options: readonly T[]
  value: T
  onChange: (next: T) => void
  columns: number
  disabled?: boolean
}) {
  const refs = useRef<Array<HTMLButtonElement | null>>([])
  const handleKeyDown = (event: React.KeyboardEvent) => {
    const focusedIndex = refs.current.findIndex(element => element === document.activeElement)
    const index = focusedIndex >= 0 ? focusedIndex : options.indexOf(value)
    let next = -1
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % options.length
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + options.length) % options.length
    else return
    event.preventDefault()
    onChange(options[next])
    refs.current[next]?.focus()
  }
  return (
    <div
      role="group"
      aria-label={label}
      onKeyDown={handleKeyDown}
      className="grid gap-1 rounded-xl bg-white/[0.04] p-1"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {options.map((option, index) => (
        <button
          key={option}
          ref={element => { refs.current[index] = element }}
          type="button"
          aria-pressed={option === value}
          disabled={disabled}
          onClick={() => onChange(option)}
          className={cx(
            'focus-ring flex h-11 items-center justify-center rounded-lg text-[12px] font-medium disabled:opacity-40',
            option === value ? 'bg-white/10 text-paper-100' : 'text-paper-100/60',
          )}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

export function S15CreateEditMission() {
  const [screenState, setScreenState] = useState<MissionEditorState>('default')
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT)
  const [promptSeed, setPromptSeed] = useState(0)
  const [planReady, setPlanReady] = useState(true)
  const [missionType, setMissionType] = useState<MissionType>('Main')
  const [typeSource, setTypeSource] = useState<'Via prompt' | 'You chose'>('Via prompt')
  const [domains, setDomains] = useState<DomainName[]>(['Fitness', 'Nutrition'])
  const [actions, setActions] = useState<string[]>(DEFAULT_ACTIONS)
  const [newAction, setNewAction] = useState('')
  const [milestones, setMilestones] = useState<Milestone[]>(DEFAULT_MILESTONES)
  const [trackDistance, setTrackDistance] = useState(true)
  const [unit, setUnit] = useState<'Metric' | 'Imperial'>('Metric')
  const [strictness, setStrictness] = useState<Strictness>('Balanced')
  const [showDomainPicker, setShowDomainPicker] = useState(false)
  const [showDiscard, setShowDiscard] = useState(false)
  const [dirty, setDirty] = useState(false)
  const [status, setStatus] = useState('Mission editor visual fixture ready. Everything here stays in this preview until you tap create.')

  useEffect(() => {
    const fixture = new URLSearchParams(window.location.search).get('state') as MissionEditorState | null
    if (!fixture || !EDITOR_STATES.includes(fixture)) return
    const timer = window.setTimeout(() => {
      setScreenState(fixture)
      if (fixture === 'empty') {
        setPrompt('')
        setPromptSeed(seed => seed + 1)
        setPlanReady(false)
        setDomains([])
        setActions([])
        setMilestones([])
      }
      if (fixture === 'invalid') {
        setDomains([])
        setActions([])
      }
      setStatus(
        fixture === 'empty'
          ? 'Blank editor — type what you want to achieve, or tap an example. The create action stays disabled until the draft is valid.'
          : fixture === 'processing'
            ? 'CIA is structuring your prompt locally. Controls unlock when the draft plan resolves — nothing was sent anywhere.'
            : fixture === 'error'
              ? 'CIA couldn’t structure this prompt. Your text is preserved — try again or keep editing manually.'
              : fixture === 'offline'
                ? 'Offline — this draft is kept locally on this device. Create unlocks when you’re back online.'
                : fixture === 'success'
                  ? 'Mission saved in this preview. No account, backend, or external action was taken.'
                  : fixture === 'invalid'
                    ? 'This draft isn’t ready — the create gate below lists exactly what is missing.'
                    : `${fixture} mission editor fixture loaded.`,
      )
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (showDiscard) document.getElementById('discard-keep')?.focus()
  }, [showDiscard])

  const locked = screenState === 'processing'
  const missing = [
    !prompt.trim() && 'a mission title',
    actions.length === 0 && 'at least one action',
    domains.length === 0 && 'at least one domain',
  ].filter((entry): entry is string => Boolean(entry))
  const valid = missing.length === 0
  const xpEstimate = actions.length > 0 ? 180 + actions.length * 90 + milestones.length * 30 : null

  const markDirty = () => setDirty(true)

  const handlePlan = () => {
    setPlanReady(true)
    setTypeSource('Via prompt')
    markDirty()
    setStatus('CIA plan drafted locally from your prompt — preview only, nothing saved or sent.')
  }

  const handleCreate = () => {
    setScreenState('success')
    setDirty(false)
    setStatus('Mission saved in this preview. No account, backend, or external action was taken.')
  }

  const closeDiscard = () => {
    setShowDiscard(false)
    window.setTimeout(() => document.getElementById('mission-editor-close')?.focus(), 0)
  }

  const handleClose = () => {
    if (dirty && screenState !== 'success') {
      setShowDiscard(true)
      return
    }
    window.location.assign('/screens/13')
  }

  const handleDialogKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.stopPropagation()
      closeDiscard()
      return
    }
    if (event.key !== 'Tab') return
    event.preventDefault()
    const keep = document.getElementById('discard-keep')
    const confirm = document.getElementById('discard-confirm')
    ;(document.activeElement === keep ? confirm : keep)?.focus()
  }

  const addDomain = (domain: DomainName) => {
    setDomains(current => [...current, domain])
    setShowDomainPicker(false)
    markDirty()
    setStatus(`${domain} domain added to this draft.`)
  }

  const removeDomain = (domain: DomainName) => {
    setDomains(current => current.filter(entry => entry !== domain))
    markDirty()
    setStatus(`${domain} domain removed from this draft.`)
  }

  const addAction = () => {
    const trimmed = newAction.trim()
    if (!trimmed) return
    setActions(current => [...current, trimmed])
    setNewAction('')
    markDirty()
    setStatus(`“${trimmed}” action added to this draft.`)
  }

  return (
    <HifiShell
      header={
        <TopBar
          title="New mission"
          back={false}
          right={
            <IconButton id="mission-editor-close" label="Close" onClick={handleClose}>
              <X size={18} strokeWidth={1.9} />
            </IconButton>
          }
        />
      }
      atmosphere="you"
      showTabBar={false}
      bottomAction={
        <div className="space-y-2">
          {screenState !== 'success' && !valid && !locked && (
            <p id="mission-editor-gate" className="px-1 text-[12px] leading-4 text-paper-100/70">
              To create this mission, add {missing.join(', ')}.
            </p>
          )}
          {screenState === 'offline' && (
            <p id="mission-editor-offline" className="px-1 text-[12px] leading-4 text-paper-100/70">Offline — this draft is queued locally; create unlocks when you’re back online.</p>
          )}
          {screenState === 'success' ? (
            <BtnSuccess className="w-full" onClick={() => setStatus('Already saved in this preview — close to return to the Mission Board.')}>
              <span className="flex items-center gap-2"><Check size={16} strokeWidth={2.4} /> Saved in this preview</span>
            </BtnSuccess>
          ) : (
            <BtnPrimary
              className="w-full"
              disabled={!valid || screenState === 'offline'}
              loading={locked}
              loadingLabel="Structuring"
              aria-describedby={!valid && !locked ? 'mission-editor-gate' : screenState === 'offline' ? 'mission-editor-offline' : undefined}
              onClick={handleCreate}
            >
              <span className="flex items-center gap-2"><Check size={16} strokeWidth={2.4} /> Create mission</span>
            </BtnPrimary>
          )}
        </div>
      }
      overlay={
        showDiscard ? (
          <div className="absolute inset-0 z-40 flex items-end justify-center bg-ink-900/70 p-4 pb-10" role="presentation">
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="discard-title"
              aria-describedby="discard-copy"
              onKeyDown={handleDialogKeyDown}
              className="glass-card w-full p-5"
            >
              <h2 id="discard-title" className="text-[17px] font-semibold leading-6 text-paper-100">Discard this mission draft?</h2>
              <p id="discard-copy" className="mt-1 text-[13px] leading-5 text-paper-100/70">
                “{prompt.trim() || 'New mission'}” has unsaved edits. Discarding removes this local draft only — nothing was saved anywhere.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <BtnSecondary id="discard-keep" className="w-full" onClick={closeDiscard}>Keep editing</BtnSecondary>
                <BtnDestructive
                  id="discard-confirm"
                  className="w-full"
                  onClick={() => window.location.assign('/screens/13')}
                >
                  Discard mission draft
                </BtnDestructive>
              </div>
            </div>
          </div>
        ) : undefined
      }
    >
      <main className="space-y-4 px-4 pb-6 pt-1" data-mission-editor-state={screenState} aria-busy={locked}>
        <div className="mx-auto h-1 w-10 rounded-full bg-white/15" aria-hidden="true" />

        <p className="text-[13px] leading-[18px] text-paper-100/70">
          You are building a mission for yourself, and CIA is here to help structure it.
        </p>

        <GlassCard tone="you" className="space-y-3">
          <p aria-hidden="true" className="block text-[12px] font-semibold uppercase leading-4 text-paper-100/70">
            What do you want to achieve?
          </p>
          <GlassPillInput
            key={`prompt-${promptSeed}`}
            id="mission-prompt"
            multiline
            rows={3}
            label="What do you want to achieve?"
            placeholder="Try: Run a half marathon by October"
            value={prompt}
            disabled={locked}
            aria-describedby={locked ? 'mission-editor-status' : undefined}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPrompt(event.target.value)
              markDirty()
            }}
          />
          <BtnCoach
            className="w-full"
            disabled={!prompt.trim() || locked}
            loading={locked}
            loadingLabel="CIA structuring"
            aria-describedby={!prompt.trim() && !locked ? 'mission-editor-status' : undefined}
            onClick={handlePlan}
          >
            Let CIA plan this
          </BtnCoach>
        </GlassCard>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Example missions">
          {['Save $5,000', 'Meditate daily', '5K'].map(example => (
            <Chip
              key={example}
              interactive
              disabled={locked}
              aria-describedby={locked ? 'mission-editor-status' : undefined}
              className="!text-[12px] disabled:opacity-40"
              onClick={() => {
                setPrompt(example)
                setPromptSeed(seed => seed + 1)
                markDirty()
                setStatus(`Prompt filled with “${example}” — edit it or let CIA plan.`)
              }}
            >
              {example}
            </Chip>
          ))}
        </div>

        {locked && (
          <GlassCard tone="cia">
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-paper-100/80">CIA structuring</p>
            <ol className="mt-2 space-y-1.5">
              <li className="text-[13px] leading-5 text-paper-100/85">Reading your prompt</li>
              <li className="text-[13px] leading-5 text-paper-100/85">Sketching actions and milestones</li>
              <li className="text-[13px] leading-5 text-paper-100/85">Estimating XP from rewards rules</li>
            </ol>
            <p className="mt-2 text-[12px] leading-4 text-paper-100/60">Staged locally — no request leaves this preview.</p>
          </GlassCard>
        )}

        {screenState === 'error' && (
          <GlassCard tone="muted">
            <h2 className="text-[15px] font-semibold leading-5 text-paper-100">CIA couldn’t structure this prompt</h2>
            <p className="mt-1 text-[12px] leading-4 text-paper-100/70">Your text is preserved. Try again, or keep building the plan manually below.</p>
            <BtnSecondary
              className="mt-3"
              onClick={() => {
                setScreenState('default')
                setPlanReady(true)
                setStatus('Retry preview selected — no network request was made. The draft plan is editable below.')
              }}
            >
              Retry
            </BtnSecondary>
          </GlassCard>
        )}

        {planReady && !locked && (
          <>
            <CIAInsightCard
              eyebrow="Endurance chain"
              provenance={['Via prompt']}
              className="[&>div>div>div.mt-3>div>span]:!text-[12px] [&>div>div>p:first-child]:!text-[12px]"
            >
              <p>
                This looks like a <span className="text-emphasis">mission</span> that chains across endurance, needing steady weekly volume.
              </p>
            </CIAInsightCard>

            <section className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-[12px] font-semibold uppercase leading-4 text-paper-100/70">Mission type</h2>
                <span className="text-[12px] leading-4 text-paper-100/70">{typeSource}</span>
              </div>
              <EditorSegmentedControl
                label="Mission type"
                options={MISSION_TYPES}
                value={missionType}
                columns={3}
                disabled={locked}
                onChange={next => {
                  setMissionType(next)
                  setTypeSource('You chose')
                  markDirty()
                  setStatus(`Mission type set to ${next} — chosen by you, overriding the prompt suggestion.`)
                }}
              />
            </section>

            <section className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-[12px] font-semibold uppercase leading-4 text-paper-100/70">Domains</h2>
                <span className="text-[12px] leading-4 text-paper-100/70">Via prompt · editable</span>
              </div>
              <SolidCard className="flex flex-wrap items-center gap-2">
                {domains.map(domain => (
                  <span
                    key={domain}
                    className={cx('inline-flex items-center rounded-pill border pl-3 text-[12px] font-semibold', DOMAIN_CHIP_CLASS[domain])}
                  >
                    {domain}
                    <button
                      type="button"
                      aria-label={`Remove ${domain}`}
                      disabled={locked}
                      onClick={() => removeDomain(domain)}
                      className="focus-ring flex h-11 w-11 items-center justify-center rounded-pill disabled:opacity-40"
                    >
                      <X size={12} aria-hidden="true" />
                    </button>
                  </span>
                ))}
                {domains.length === 0 && (
                  <p className="text-[12px] leading-4 text-paper-100/65">Add a domain to keep this organized.</p>
                )}
                <button
                  type="button"
                  aria-expanded={showDomainPicker}
                  aria-controls="domain-picker"
                  disabled={locked}
                  onClick={() => setShowDomainPicker(open => !open)}
                  className="focus-ring flex h-11 items-center gap-1 rounded-pill border border-dashed border-white/15 px-3 text-[12px] text-paper-100/70 disabled:opacity-40"
                >
                  <Plus size={12} strokeWidth={2} aria-hidden="true" /> Add domain
                </button>
              </SolidCard>
              {showDomainPicker && (
                <div id="domain-picker" role="group" aria-label="Choose a domain" className="flex flex-wrap gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  {LIFE_DOMAIN_ORDER.filter(domain => !domains.includes(domain)).map(domain => (
                    <button
                      key={domain}
                      type="button"
                      onClick={() => addDomain(domain)}
                      className={cx('focus-ring inline-flex min-h-11 items-center rounded-pill border px-4 text-[12px] font-semibold', DOMAIN_CHIP_CLASS[domain])}
                    >
                      {domain}
                    </button>
                  ))}
                </div>
              )}
            </section>

            <section className="space-y-2">
              <h2 className="px-1 text-[12px] font-semibold uppercase leading-4 text-paper-100/70">Actions</h2>
              <SolidCard className="divide-y divide-white/[0.05] p-0">
                {actions.map((action, index) => (
                  <div key={`${action}-${index}`} className="flex min-h-14 items-center gap-1 py-1 pl-4 pr-2">
                    <span className="min-w-0 flex-1 text-[14px] text-white/85">{action}</span>
                    <IconButton
                      label={index === 0 ? `Move up — ${action} (unavailable, already first)` : `Move up — ${action}`}
                      disabled={locked || index === 0}
                      className="disabled:opacity-30"
                      onClick={() => { setActions(current => moveItem(current, index, -1)); markDirty(); setStatus(`“${action}” moved up.`) }}
                    >
                      <ArrowUp size={15} strokeWidth={1.9} />
                    </IconButton>
                    <IconButton
                      label={index === actions.length - 1 ? `Move down — ${action} (unavailable, already last)` : `Move down — ${action}`}
                      disabled={locked || index === actions.length - 1}
                      className="disabled:opacity-30"
                      onClick={() => { setActions(current => moveItem(current, index, 1)); markDirty(); setStatus(`“${action}” moved down.`) }}
                    >
                      <ArrowDown size={15} strokeWidth={1.9} />
                    </IconButton>
                    <IconButton
                      label={`Remove ${action}`}
                      disabled={locked}
                      className="disabled:opacity-30"
                      onClick={() => { setActions(current => current.filter((_, i) => i !== index)); markDirty(); setStatus(`“${action}” removed from this draft.`) }}
                    >
                      <X size={15} strokeWidth={1.9} />
                    </IconButton>
                  </div>
                ))}
                {actions.length === 0 && (
                  <p className="px-4 py-4 text-[12px] leading-4 text-paper-100/65">Add at least one action.</p>
                )}
                <div className="flex min-h-14 items-center gap-2 rounded-xl px-4 py-1 focus-within:shadow-[var(--focus-ring)]">
                  <label htmlFor="new-action" className="sr-only">Add an action</label>
                  <input
                    id="new-action"
                    value={newAction}
                    disabled={locked}
                    onChange={event => setNewAction(event.target.value)}
                    onKeyDown={event => { if (event.key === 'Enter') addAction() }}
                    placeholder="Add an action"
                    className="h-11 min-w-0 flex-1 bg-transparent text-[16px] text-paper-100 outline-none placeholder:text-paper-100/55"
                  />
                  <button
                    type="button"
                    disabled={locked || !newAction.trim()}
                    aria-label={!newAction.trim() ? 'Add — needs action text first' : undefined}
                    onClick={addAction}
                    className="focus-ring flex h-11 shrink-0 items-center gap-1 rounded-pill px-3 text-[13px] font-medium text-brand-orange disabled:opacity-40"
                  >
                    <Plus size={14} strokeWidth={2} aria-hidden="true" /> Add
                  </button>
                </div>
              </SolidCard>
            </section>

            <section className="space-y-2">
              <h2 className="px-1 text-[12px] font-semibold uppercase leading-4 text-paper-100/70">Milestones</h2>
              <SolidCard className="divide-y divide-white/[0.05] p-0">
                {milestones.map((milestone, index) => (
                  <div key={milestone.title} className="flex min-h-14 items-center gap-1 py-1 pl-4 pr-2">
                    <span className="text-[12px] font-semibold text-brand-orange tabular-nums">{index + 1}</span>
                    <span className="ml-2 min-w-0 flex-1 text-[14px] text-white/85">{milestone.title}</span>
                    <span className="text-[12px] text-paper-100/70">{milestone.date}</span>
                    <IconButton
                      label={index === 0 ? `Move up — ${milestone.title} (unavailable, already first)` : `Move up — ${milestone.title}`}
                      disabled={locked || index === 0}
                      className="disabled:opacity-30"
                      onClick={() => { setMilestones(current => moveItem(current, index, -1)); markDirty(); setStatus(`“${milestone.title}” moved up.`) }}
                    >
                      <ArrowUp size={15} strokeWidth={1.9} />
                    </IconButton>
                    <IconButton
                      label={index === milestones.length - 1 ? `Move down — ${milestone.title} (unavailable, already last)` : `Move down — ${milestone.title}`}
                      disabled={locked || index === milestones.length - 1}
                      className="disabled:opacity-30"
                      onClick={() => { setMilestones(current => moveItem(current, index, 1)); markDirty(); setStatus(`“${milestone.title}” moved down.`) }}
                    >
                      <ArrowDown size={15} strokeWidth={1.9} />
                    </IconButton>
                  </div>
                ))}
                {milestones.length === 0 && (
                  <p className="px-4 py-4 text-[12px] leading-4 text-paper-100/65">No milestones yet — CIA can draft them from your actions.</p>
                )}
              </SolidCard>
            </section>

            <section className="space-y-2">
              <h2 className="px-1 text-[12px] font-semibold uppercase leading-4 text-paper-100/70">Tracking signals</h2>
              <SolidCard className="space-y-3">
                <div className="flex min-h-11 items-center justify-between">
                  <span className="text-[14px] text-white/85">Weekly distance</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={trackDistance}
                    aria-label="Track weekly distance"
                    disabled={locked}
                    onClick={() => {
                      setTrackDistance(current => {
                        setStatus(current ? 'Weekly distance tracking turned off in this draft.' : 'Weekly distance tracking turned on in this draft.')
                        return !current
                      })
                      markDirty()
                    }}
                    className="focus-ring flex h-11 shrink-0 items-center rounded-pill px-1 disabled:opacity-40"
                  >
                    <span
                      aria-hidden="true"
                      className={cx(
                        'flex h-8 w-[52px] items-center rounded-pill p-1 transition-colors motion-reduce:transition-none',
                        trackDistance ? 'bg-brand-orange shadow-[var(--glow-orange-sm)]' : 'bg-white/15',
                      )}
                    >
                      <span className={cx('h-6 w-6 rounded-full bg-paper-50 transition-transform motion-reduce:transition-none', trackDistance && 'translate-x-5')} />
                    </span>
                  </button>
                </div>
                <fieldset className="grid min-h-11 grid-cols-[1fr_auto] items-center border-0 p-0">
                  <legend className="sr-only">Unit</legend>
                  <span aria-hidden="true" className="text-[14px] text-white/85">Unit</span>
                  <div className="flex items-center gap-4">
                    {(['Metric', 'Imperial'] as const).map(option => (
                      <label key={option} className={cx('flex min-h-11 cursor-pointer items-center gap-1.5 text-[13px] font-medium', unit === option ? 'text-white' : 'text-white/60')}>
                        <input
                          type="radio"
                          name="mission-unit"
                          checked={unit === option}
                          disabled={locked}
                          onChange={() => { setUnit(option); markDirty(); setStatus(`${option} units selected.`) }}
                          className="h-5 w-5 cursor-pointer accent-brand-orange"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </fieldset>
              </SolidCard>
            </section>

            <section className="space-y-2">
              <h2 className="px-1 text-[12px] font-semibold uppercase leading-4 text-paper-100/70">Strictness</h2>
              <EditorSegmentedControl
                label="Strictness"
                options={STRICTNESS_OPTIONS}
                value={strictness}
                columns={3}
                disabled={locked}
                onChange={next => { setStrictness(next); markDirty(); setStatus(`Strictness set to ${next.toLowerCase()}.`) }}
              />
            </section>

            <GlassCard tone="you">
              {xpEstimate !== null ? (
                <div className="flex items-center gap-4">
                  {/* Screen-local legibility override keeps the kit ring label on the frozen 12px semantic-copy floor. */}
                  <div className="[&_[role=img]_span:last-child]:!text-[12px] [&_[role=img]_span:last-child]:!text-paper-100/70"><ProgressRing percent={42} value={`~${xpEstimate}`} label="XP forecast" size={72} tone="cia" /></div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="text-[12px] font-semibold uppercase leading-4 text-paper-100/70">Mission preview</p>
                    <p className="text-[15px] font-semibold leading-5 text-white/70 tabular-nums">~{xpEstimate} XP</p>
                    <p className="text-[12px] leading-4 text-white/55">Estimated &middot; low confidence &middot; Via rewards rules</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-[12px] font-semibold uppercase leading-4 text-paper-100/70">Mission preview</p>
                  <p className="text-[13px] leading-5 text-paper-100/70">XP estimate appears after actions.</p>
                </div>
              )}
            </GlassCard>
          </>
        )}

        <GlassCard tone="muted">
          <p className="text-[12px] leading-4 text-white/55">
            CIA suggestions here are drafted from your prompt, not saved until you create this mission.
          </p>
          <div className="[&_a]:!text-[12px]">
            <ConsentRail compact />
          </div>
        </GlassCard>

        <p id="mission-editor-status" role="status" aria-live="polite" aria-atomic="true" className="min-h-5 text-[12px] leading-5 text-paper-100/70">{status}</p>
      </main>
    </HifiShell>
  )
}
