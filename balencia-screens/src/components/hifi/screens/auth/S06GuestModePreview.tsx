'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  Apple,
  BookOpen,
  Brain,
  Briefcase,
  Check,
  ChevronLeft,
  Dumbbell,
  Feather,
  Palette,
  Sparkles,
  Users,
  Wallet,
} from 'lucide-react'
import { BtnPrimary, GlassCard, GlassPillInput, HifiShell, Provenance, cx } from '@/components/hifi/kit'

type GuestState = 'default' | 'name-only' | 'populated' | 'cap-error' | 'loading' | 'error' | 'success'

const GUEST_STATES = new Set<GuestState>([
  'default',
  'name-only',
  'populated',
  'cap-error',
  'loading',
  'error',
  'success',
])

const domains = [
  { key: 'fitness', label: 'Fitness', shortLabel: 'Fitness', Icon: Dumbbell, x: 100, y: 22, selectedClass: 'border-domain-fitness/55 bg-domain-fitness/20', iconClass: 'text-domain-fitness' },
  { key: 'nutrition', label: 'Nutrition', shortLabel: 'Nutrition', Icon: Apple, x: 150, y: 40, selectedClass: 'border-domain-nutrition/55 bg-domain-nutrition/20', iconClass: 'text-domain-nutrition' },
  { key: 'wellbeing', label: 'Mental wellbeing', shortLabel: 'Mental', Icon: Brain, x: 177, y: 87, selectedClass: 'border-domain-wellbeing/55 bg-domain-wellbeing/20', iconClass: 'text-domain-wellbeing' },
  { key: 'finance', label: 'Finance', shortLabel: 'Finance', Icon: Wallet, x: 168, y: 139, selectedClass: 'border-domain-finance/55 bg-domain-finance/20', iconClass: 'text-domain-finance' },
  { key: 'career', label: 'Career', shortLabel: 'Career', Icon: Briefcase, x: 127, y: 173, selectedClass: 'border-domain-career/55 bg-domain-career/20', iconClass: 'text-domain-career' },
  { key: 'relationships', label: 'Relationships', shortLabel: 'Bonds', Icon: Users, x: 73, y: 173, selectedClass: 'border-domain-relationships/55 bg-domain-relationships/20', iconClass: 'text-domain-relationships' },
  { key: 'faith', label: 'Spirituality', shortLabel: 'Spirit', Icon: Feather, x: 33, y: 139, selectedClass: 'border-domain-faith/55 bg-domain-faith/20', iconClass: 'text-domain-faith' },
  { key: 'learning', label: 'Learning', shortLabel: 'Learning', Icon: BookOpen, x: 23, y: 87, selectedClass: 'border-domain-learning/55 bg-domain-learning/20', iconClass: 'text-domain-learning' },
  { key: 'creativity', label: 'Creativity', shortLabel: 'Create', Icon: Palette, x: 50, y: 40, selectedClass: 'border-domain-creativity/55 bg-domain-creativity/20', iconClass: 'text-domain-creativity' },
] as const

type DomainKey = typeof domains[number]['key']

function fixtureState(): GuestState {
  const query = new URLSearchParams(window.location.search).get('state')
  const hash = window.location.hash.replace(/^#(?:state=)?/, '')
  const candidate = query ?? hash
  return GUEST_STATES.has(candidate as GuestState) ? candidate as GuestState : 'default'
}

function derivedState(name: string, selected: DomainKey[]): GuestState {
  if (selected.length > 0) return 'populated'
  return name.trim() ? 'name-only' : 'default'
}

function ConstellationPreview({ selected }: { selected: DomainKey[] }) {
  const selectedDomains = domains.filter(domain => selected.includes(domain.key))
  const labels = selectedDomains.map(domain => domain.label).join(', ')
  const meshPoints = selectedDomains.map(domain => `${domain.x},${domain.y}`).join(' ')

  return (
    <div className="glass-frost relative overflow-hidden rounded-[24px] px-4 py-3">
      <div aria-hidden="true" className="absolute inset-x-16 top-6 h-20 rounded-full bg-royal-purple/10 blur-2xl" />
      <svg
        viewBox="0 0 200 200"
        className="relative mx-auto h-24 w-24"
        role="img"
        aria-label={selectedDomains.length
          ? `Illustrative CIA constellation for selected areas: ${labels}. Demo only, not a measured reading.`
          : 'Empty illustrative CIA constellation. Pick one to three areas to create a demo; no reading is shown.'}
      >
        {selectedDomains.length === 0 ? (
          <>
            <circle cx="100" cy="100" r="16" className="fill-royal-purple/10" />
            <circle cx="100" cy="100" r="4" className="fill-paper-100/65" />
          </>
        ) : (
          <>
            <circle cx="100" cy="100" r="72" fill="none" className="stroke-white/10" strokeWidth="1" />
            <circle cx="100" cy="100" r="43" fill="none" className="stroke-white/10" strokeWidth="1" strokeDasharray="2 5" />
            {selectedDomains.map(domain => (
              <line
                key={`axis-${domain.key}`}
                x1="100"
                y1="100"
                x2={domain.x}
                y2={domain.y}
                className="stroke-royal-purple/45"
                strokeWidth="1.5"
              />
            ))}
            {selectedDomains.length > 1 && (
              <polygon points={meshPoints} className="fill-royal-purple/10 stroke-royal-purple/55" strokeWidth="1.5" />
            )}
            <circle cx="100" cy="100" r="4" className="fill-paper-100/75" />
            {selectedDomains.map(domain => (
              <g key={`node-${domain.key}`}>
                <circle cx={domain.x} cy={domain.y} r="12" className="fill-royal-purple/15" />
                <circle cx={domain.x} cy={domain.y} r="5" className="fill-royal-purple" />
              </g>
            ))}
          </>
        )}
      </svg>

      <div className="relative text-center">
        {selectedDomains.length === 0 ? (
          <>
            <p className="text-[13px] font-semibold text-paper-100">Nothing to map yet</p>
            <p className="mt-1 text-[11px] leading-4 text-paper-100/60">Pick 1–3 areas to see an illustrative map.</p>
          </>
        ) : (
          <div className="flex justify-center">
            <Provenance items={['Demo · illustrative']} />
          </div>
        )}
      </div>
    </div>
  )
}

// Guest exploration is a local visual preview. The screen starts at an
// honest null, caps selection at three, and never creates a guest session or
// presents the illustrative constellation as a score.
export function S06GuestModePreview() {
  const [screenState, setScreenState] = useState<GuestState>('default')
  const [name, setName] = useState('')
  const [selected, setSelected] = useState<DomainKey[]>([])
  const [notice, setNotice] = useState('')
  const [fixtureRevision, setFixtureRevision] = useState(0)
  const transitionTimer = useRef<number | null>(null)

  useEffect(() => {
    const applyFixture = window.setTimeout(() => {
      const fixture = fixtureState()
      const fixtureName = fixture === 'default' ? '' : 'Amira'
      const fixtureSelection: DomainKey[] = fixture === 'default' || fixture === 'name-only'
        ? []
        : fixture === 'cap-error'
          ? ['fitness', 'nutrition', 'wellbeing']
          : ['fitness', 'wellbeing']
      setScreenState(fixture)
      setName(fixtureName)
      setSelected(fixtureSelection)
      setFixtureRevision(1)
      setNotice(
        fixture === 'cap-error'
          ? 'Pick up to 3 areas. Your three selections are unchanged.'
          : fixture === 'error'
            ? 'The local preview paused. Your name and selected areas are still here.'
            : fixture === 'success'
              ? 'Preview ready locally. No guest session was created.'
              : '',
      )
    }, 0)

    return () => {
      window.clearTimeout(applyFixture)
      if (transitionTimer.current) window.clearTimeout(transitionTimer.current)
    }
  }, [])

  const ready = name.trim().length > 0 && selected.length >= 1 && selected.length <= 3
  const controlsDisabled = screenState === 'loading' || screenState === 'success'

  const changeName = (value: string) => {
    setName(value)
    setNotice('')
    if (!controlsDisabled) setScreenState(derivedState(value, selected))
  }

  const toggleDomain = (key: DomainKey) => {
    if (controlsDisabled) return
    if (selected.includes(key)) {
      const next = selected.filter(item => item !== key)
      setSelected(next)
      setScreenState(derivedState(name, next))
      setNotice('')
      return
    }
    if (selected.length >= 3) {
      setScreenState('cap-error')
      setNotice('Pick up to 3 areas. Your three selections are unchanged.')
      return
    }
    const next = [...selected, key]
    setSelected(next)
    setScreenState('populated')
    setNotice('')
  }

  const submitGuestPreview = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!ready || screenState === 'loading' || screenState === 'success') {
      if (!ready) setNotice('Add your name and pick 1–3 areas to explore.')
      return
    }
    setNotice('')
    setScreenState('loading')
    transitionTimer.current = window.setTimeout(() => {
      setScreenState('success')
      setNotice('Preview ready locally. No guest session was created.')
      transitionTimer.current = null
    }, 700)
  }

  return (
    <HifiShell
      showTabBar={false}
      atmosphere="cia"
      bottomAction={
        <div className="space-y-1">
          <BtnPrimary
            type="submit"
            form="guest-preview-form"
            className="w-full"
            disabled={!ready || screenState === 'success'}
            loading={screenState === 'loading'}
            loadingLabel="Preparing preview"
          >
            {screenState === 'error' ? 'Try preview again' : screenState === 'success' ? 'Preview ready' : 'Explore as guest'}
          </BtnPrimary>
          <Link href="/screens/04" className="focus-ring inline-flex min-h-11 w-full items-center justify-center rounded-pill px-4 text-[14px] font-semibold text-paper-100/75">
            Sign in instead
          </Link>
        </div>
      }
    >
      <main className="flex min-h-full flex-col px-5 pb-5 pt-2" data-guest-state={screenState}>
        <header className="grid min-h-11 grid-cols-[44px_1fr_44px] items-center">
          <Link
            href="/screens/04"
            aria-label="Back to sign in"
            className="focus-ring flex h-11 w-11 items-center justify-center rounded-full text-paper-100/75"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
          </Link>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/Frame 2147239943.svg" alt="Balencia" className="mx-auto h-auto w-[128px]" />
          <span aria-hidden="true" />
        </header>

        <section className="space-y-2 pb-5 pt-4 text-center">
          <p className="flex items-center justify-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-royal-purple">
            <Sparkles className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />
            CIA preview
          </p>
          <h1 className="text-[29px] font-semibold leading-tight tracking-[-0.02em] text-paper-100">
            Take a <span className="text-emphasis">look</span> around
          </h1>
          <p className="mx-auto max-w-[300px] text-[14px] leading-snug text-paper-100/70">
            Add your name and choose 1–3 areas for an illustrative preview.
          </p>
        </section>

        <form
          id="guest-preview-form"
          aria-describedby={`guest-status${screenState === 'cap-error' ? ' guest-cap-status' : ''} guest-safety`}
          aria-busy={screenState === 'loading'}
          onSubmit={submitGuestPreview}
        >
          <fieldset disabled={controlsDisabled} className="space-y-4 border-0 p-0">
            <div className="space-y-1.5">
              <p aria-hidden="true" className="px-1 text-[12px] font-semibold text-paper-100/75">Your name</p>
              <GlassPillInput
                key={`guest-name-${fixtureRevision}`}
                id="guest-name"
                label="Your name"
                name="name"
                type="text"
                autoComplete="given-name"
                placeholder="What should we call you?"
                value={name}
                required
                onChange={event => changeName(event.currentTarget.value)}
              />
            </div>

            <ConstellationPreview selected={selected} />

            <div>
              <div className="flex items-end justify-between gap-3 px-1 pb-3">
                <div>
                  <p className="text-[12px] font-semibold text-paper-100/80">Life areas</p>
                  <p className="mt-0.5 text-[11px] text-paper-100/55">Choose at least 1, up to 3</p>
                </div>
                <span className="text-[12px] font-semibold tabular-nums text-paper-100/65">{selected.length} / 3</span>
              </div>

              {screenState === 'cap-error' && (
                <p
                  id="guest-cap-status"
                  className="mb-3 rounded-[14px] border border-brand-orange/35 bg-brand-orange/10 px-3 py-2 text-[12px] font-semibold leading-4 text-paper-100"
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  Pick up to 3 areas. Your three selections are unchanged.
                </p>
              )}

              <div className="grid grid-cols-3 gap-2" role="group" aria-label="Life areas">
                {domains.map(domain => {
                  const isSelected = selected.includes(domain.key)
                  const DomainIcon = domain.Icon
                  return (
                    <button
                      key={domain.key}
                      type="button"
                      aria-label={domain.label}
                      aria-pressed={isSelected}
                      className={cx(
                        'focus-ring flex min-h-[58px] flex-col items-center justify-center gap-1 rounded-[16px] border px-1.5 py-2 text-[11px] font-semibold transition-[border-color,background-color,transform] duration-[var(--dur-fast)] active:scale-[0.98]',
                        isSelected
                          ? `${domain.selectedClass} text-paper-100`
                          : 'border-white/10 bg-white/[0.04] text-paper-100/65',
                      )}
                      onClick={() => toggleDomain(domain.key)}
                    >
                      <DomainIcon className={cx('h-6 w-6', isSelected ? domain.iconClass : 'text-paper-100/50')} strokeWidth={1.8} aria-hidden="true" />
                      <span>{domain.shortLabel}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </fieldset>
        </form>

        {screenState === 'error' && (
          <GlassCard tone="you" className="mt-4 !p-4">
            <p className="text-[13px] font-semibold text-paper-100">Preview paused</p>
            <p className="mt-1 text-[12px] leading-4 text-paper-100/65">Your local choices are intact. Use the persistent action to try again.</p>
          </GlassCard>
        )}

        {screenState === 'success' && (
          <GlassCard tone="done" className="mt-4 !p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-green/15">
                <Check className="h-5 w-5 text-forest-green" strokeWidth={2.4} aria-hidden="true" />
              </span>
              <div>
                <p className="text-[13px] font-semibold text-paper-100">Illustrative preview ready</p>
                <p className="mt-1 text-[12px] leading-4 text-paper-100/65">No guest account or session was created.</p>
              </div>
            </div>
          </GlassCard>
        )}

        <p id="guest-status" className={cx(
          'mt-4 min-h-5 text-center text-[12px] leading-5',
          screenState === 'cap-error' ? 'font-semibold text-brand-orange' : 'text-paper-100/70',
        )} aria-live="polite" aria-atomic="true">
          {screenState === 'cap-error' ? '' : notice}
        </p>
        <p id="guest-safety" className="mt-1 text-center text-[11px] leading-4 text-paper-100/55">
          Visual prototype only · selections stay local and are not measurements.
        </p>
      </main>
    </HifiShell>
  )
}
