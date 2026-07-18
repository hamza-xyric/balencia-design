'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AlertTriangle, Check, Eye, EyeOff, LockKeyhole, ShieldCheck, X } from 'lucide-react'
import {
  BtnPrimary,
  GlassCard,
  GlassPillInput,
  HifiShell,
  Provenance,
  SolidCard,
  cx,
} from '@/components/hifi/kit'

type ResetState = 'default' | 'filled' | 'loading' | 'missing' | 'invalid' | 'expired' | 'rate-limit' | 'offline' | 'success'

const RESET_STATES = new Set<ResetState>([
  'default',
  'filled',
  'loading',
  'missing',
  'invalid',
  'expired',
  'rate-limit',
  'offline',
  'success',
])

const FIXTURE_PASSWORD = 'ClearSky!2040'

const passwordRules = [
  { label: '8+ characters', test: (value: string) => value.length >= 8 },
  { label: 'Uppercase letter', test: (value: string) => /[A-Z]/.test(value) },
  { label: 'Lowercase letter', test: (value: string) => /[a-z]/.test(value) },
  { label: 'Number', test: (value: string) => /\d/.test(value) },
  { label: 'Special character', test: (value: string) => /[^A-Za-z0-9]/.test(value) },
]

function fixtureState(): ResetState {
  const query = new URLSearchParams(window.location.search).get('state')
  const hash = window.location.hash.replace(/^#(?:state=)?/, '')
  const candidate = query ?? hash
  return RESET_STATES.has(candidate as ResetState) ? candidate as ResetState : 'default'
}

function terminalCopy(state: Extract<ResetState, 'missing' | 'invalid' | 'expired'>) {
  if (state === 'missing') {
    return {
      eyebrow: 'Link required',
      title: 'Open your reset link',
      body: 'This visual fixture has no reset-link state. Request a fresh link to continue safely.',
    }
  }
  if (state === 'invalid') {
    return {
      eyebrow: 'Link not valid',
      title: 'Request a fresh link',
      body: 'This visual fixture represents a link that cannot be used. Your password was not changed.',
    }
  }
  return {
    eyebrow: 'Link expired',
    title: 'Your link needs refreshing',
    body: 'This visual fixture represents an expired link. Request a new one; no password was submitted.',
  }
}

// Every reset-link condition is a deterministic visual fixture. Password
// checks run locally, and no link secret, password, or network request leaves
// this screen.
export function S05bResetPassword() {
  const [screenState, setScreenState] = useState<ResetState>('default')
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [notice, setNotice] = useState('')
  const [fixtureRevision, setFixtureRevision] = useState(0)
  const transitionTimer = useRef<number | null>(null)

  useEffect(() => {
    const applyFixture = window.setTimeout(() => {
      const fixture = fixtureState()
      const usesFilledForm = ['filled', 'loading', 'rate-limit', 'offline'].includes(fixture)
      const terminalFixture = ['missing', 'invalid', 'expired'].includes(fixture)
        ? terminalCopy(fixture as Extract<ResetState, 'missing' | 'invalid' | 'expired'>)
        : null
      setScreenState(fixture)
      setPassword(usesFilledForm ? FIXTURE_PASSWORD : '')
      setConfirmation(usesFilledForm ? FIXTURE_PASSWORD : '')
      setFixtureRevision(1)
      setNotice(
        fixture === 'offline'
          ? 'You are offline. Both entries remain editable, and no reset request was sent.'
          : fixture === 'rate-limit'
            ? 'Reset is paused in this fixture. No server retry-after value is available.'
            : terminalFixture
              ? `${terminalFixture.eyebrow}. ${terminalFixture.title}. ${terminalFixture.body}`
            : '',
      )
    }, 0)

    return () => {
      window.clearTimeout(applyFixture)
      if (transitionTimer.current) window.clearTimeout(transitionTimer.current)
    }
  }, [])

  const evaluatedRules = passwordRules.map(rule => ({ ...rule, met: rule.test(password) }))
  const metCount = evaluatedRules.filter(rule => rule.met).length
  const rulesMet = metCount === passwordRules.length
  const bothEntered = password.length > 0 && confirmation.length > 0
  const passwordsMatch = bothEntered && password === confirmation
  const formReady = rulesMet && passwordsMatch
  const formVisible = ['default', 'filled', 'loading', 'rate-limit', 'offline'].includes(screenState)
  const submitBlocked = !formReady || screenState === 'offline' || screenState === 'rate-limit'
  const fieldsDisabled = screenState === 'loading' || screenState === 'rate-limit'

  const updatePassword = (value: string) => {
    setPassword(value)
    setNotice('')
    if (screenState === 'default' || screenState === 'filled') {
      setScreenState(value || confirmation ? 'filled' : 'default')
    }
  }

  const updateConfirmation = (value: string) => {
    setConfirmation(value)
    setNotice('')
    if (screenState === 'default' || screenState === 'filled') {
      setScreenState(value || password ? 'filled' : 'default')
    }
  }

  const submitReset = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (screenState === 'offline') {
      setNotice('You are offline. Your entries stay local, and no reset request was sent.')
      return
    }
    if (screenState === 'rate-limit') {
      setNotice('Reset is paused. This fixture has no retry-after value to display.')
      return
    }
    if (!formReady || screenState === 'loading') {
      setNotice('Meet every password rule and make both entries match to continue.')
      return
    }

    setNotice('')
    setScreenState('loading')
    transitionTimer.current = window.setTimeout(() => {
      setPassword('')
      setConfirmation('')
      setScreenState('success')
      setNotice('Visual reset complete. No password or reset-link data was sent.')
      transitionTimer.current = null
    }, 700)
  }

  const terminalState = ['missing', 'invalid', 'expired'].includes(screenState)
    ? terminalCopy(screenState as Extract<ResetState, 'missing' | 'invalid' | 'expired'>)
    : null

  return (
    <HifiShell showTabBar={false} atmosphere="you">
      <main className="flex min-h-full flex-col px-5 pb-6 pt-4" data-reset-state={screenState}>
        <div className="text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/Frame 2147239943.svg" alt="Balencia" className="mx-auto h-auto w-[148px]" />
        </div>

        {formVisible && (
          <>
            <section className="space-y-2 pb-5 pt-6 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-orange">Secure reset</p>
              <h1 className="text-[30px] font-semibold leading-tight tracking-[-0.02em] text-paper-100">
                Set a new <span className="text-emphasis">password</span>
              </h1>
              <p className="mx-auto max-w-[292px] text-[14px] leading-snug text-paper-100/70">
                Use something strong and unique. Checks happen on this device.
              </p>
              <p className="pt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-paper-100/60" role="status" aria-live="polite">
                Visual fixture · reset-link state valid
              </p>
            </section>

            {(screenState === 'offline' || screenState === 'rate-limit') && (
              <div className="mb-4 rounded-[16px] border border-brand-orange/30 bg-ink-brown-800 px-4 py-3">
                <p className="flex items-center gap-2 text-[13px] font-semibold text-paper-100">
                  <AlertTriangle className="h-5 w-5 text-brand-orange" strokeWidth={1.9} aria-hidden="true" />
                  {screenState === 'offline' ? 'No connection' : 'Reset temporarily paused'}
                </p>
                <p className="mt-1 text-[12px] leading-4 text-paper-100/70">
                  {screenState === 'offline'
                    ? 'Keep editing locally. Submit becomes available after reconnecting.'
                    : 'No server retry-after value is available, so this screen does not invent a timer.'}
                </p>
              </div>
            )}

            <form id="reset-password-form" className="space-y-3" aria-describedby="reset-status reset-safety" aria-busy={screenState === 'loading'} onSubmit={submitReset}>
              <div className="space-y-1.5">
                <p aria-hidden="true" className="px-1 text-[12px] font-semibold text-paper-100/75">New password</p>
                <GlassPillInput
                  key={`password-${fixtureRevision}`}
                  id="new-password"
                  label="New password"
                  name="newPassword"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="New password"
                  value={password}
                  minLength={8}
                  required
                  disabled={fieldsDisabled}
                  aria-describedby="password-rules reset-status reset-safety"
                  icon={<LockKeyhole className="h-5 w-5" strokeWidth={1.9} />}
                  trailing={
                    <button
                      type="button"
                      aria-label={`${showPassword ? 'Hide' : 'Show'} new password`}
                      aria-pressed={showPassword}
                      aria-controls="new-password"
                      className="focus-ring flex h-11 min-h-11 min-w-11 items-center justify-center rounded-full text-paper-100/70"
                      onClick={() => setShowPassword(value => !value)}
                    >
                      {showPassword
                        ? <EyeOff className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
                        : <Eye className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />}
                    </button>
                  }
                  onChange={event => updatePassword(event.currentTarget.value)}
                />
              </div>

              <div className="space-y-1.5">
                <p aria-hidden="true" className="px-1 text-[12px] font-semibold text-paper-100/75">Confirm new password</p>
                <GlassPillInput
                  key={`confirmation-${fixtureRevision}`}
                  id="confirm-password"
                  label="Confirm new password"
                  name="confirmPassword"
                  type={showConfirmation ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Confirm new password"
                  value={confirmation}
                  minLength={8}
                  required
                  disabled={fieldsDisabled}
                  aria-describedby="password-match reset-status reset-safety"
                  icon={<LockKeyhole className="h-5 w-5" strokeWidth={1.9} />}
                  trailing={
                    <button
                      type="button"
                      aria-label={`${showConfirmation ? 'Hide' : 'Show'} confirmation password`}
                      aria-pressed={showConfirmation}
                      aria-controls="confirm-password"
                      className="focus-ring flex h-11 min-h-11 min-w-11 items-center justify-center rounded-full text-paper-100/70"
                      onClick={() => setShowConfirmation(value => !value)}
                    >
                      {showConfirmation
                        ? <EyeOff className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
                        : <Eye className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />}
                    </button>
                  }
                  onChange={event => updateConfirmation(event.currentTarget.value)}
                />
              </div>

              <SolidCard className="!p-4">
                <div id="password-match" className="flex items-center justify-between gap-3 border-b border-white/[0.08] pb-3" aria-live="polite" aria-atomic="true">
                  <span className="text-[13px] font-medium text-paper-100/70">Passwords match</span>
                  <span className={cx(
                    'flex items-center gap-1.5 text-[12px] font-semibold',
                    !bothEntered ? 'text-paper-100/55' : passwordsMatch ? 'text-forest-green' : 'text-brand-orange',
                  )}>
                    {bothEntered && (passwordsMatch
                      ? <Check className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
                      : <X className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />)}
                    {!bothEntered ? 'Enter both' : passwordsMatch ? 'Matched' : 'Not matched'}
                  </span>
                </div>

                <div
                  id="password-rules"
                  className="pt-3"
                  role="list"
                  aria-label={`${metCount} of ${passwordRules.length} password rules met`}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {evaluatedRules.map(rule => (
                    <div key={rule.label} role="listitem" className="flex min-h-8 items-center justify-between gap-3">
                      <span className={cx('text-[13px]', rule.met ? 'text-paper-100/75' : 'text-paper-100/60')}>{rule.label}</span>
                      <span className={cx('flex items-center gap-1.5 text-[11px] font-semibold', rule.met ? 'text-forest-green' : 'text-paper-100/55')}>
                        {rule.met
                          ? <Check className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
                          : <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-paper-100/35" />}
                        {rule.met ? 'Met' : 'Needed'}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-3">
                  <span className="text-[11px] font-semibold tabular-nums text-paper-100/60">{metCount} / {passwordRules.length} rules met</span>
                  <Provenance items={['Typed live']} />
                </div>
              </SolidCard>

              <BtnPrimary
                type="submit"
                className="mt-2 w-full"
                disabled={submitBlocked}
                loading={screenState === 'loading'}
                loadingLabel="Preparing preview"
              >
                Reset password
              </BtnPrimary>
            </form>

            <div className="mt-2 flex flex-col items-center text-center">
              <Link href="/screens/04" className="focus-ring inline-flex min-h-11 items-center rounded-pill px-4 text-[14px] font-semibold text-paper-100/75">
                Back to sign in
              </Link>
              <Link href="/screens/05" className="focus-ring inline-flex min-h-11 items-center rounded-pill px-4 text-[12px] font-semibold text-brand-orange">
                Request another reset link
              </Link>
            </div>

            <p id="reset-safety" className="mt-4 text-center text-[12px] leading-5 text-paper-100/55">
              Visual prototype only · no password or reset-link data is sent.
            </p>
          </>
        )}

        {terminalState && (
          <div>
            <GlassCard tone="you" className="mt-8 !p-6 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-brand-orange/30 bg-brand-orange/10">
                <AlertTriangle className="h-6 w-6 text-brand-orange" strokeWidth={1.9} aria-hidden="true" />
              </span>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-orange">{terminalState.eyebrow}</p>
              <h1 className="mt-1 text-[25px] font-semibold leading-tight tracking-[-0.02em] text-paper-100">{terminalState.title}</h1>
              <p className="mx-auto mt-3 max-w-[286px] text-[13px] leading-relaxed text-paper-100/70">{terminalState.body}</p>
              <Link
                href="/screens/05"
                className="hifi-action hifi-action-primary mt-6 inline-flex h-[52px] w-full items-center justify-center rounded-pill px-6 text-[16px] font-semibold"
              >
                Request a new link
              </Link>
              <Link href="/screens/04" className="focus-ring mt-2 inline-flex min-h-11 w-full items-center justify-center rounded-pill px-4 text-[14px] font-semibold text-paper-100/70">
                Back to sign in
              </Link>
            </GlassCard>
          </div>
        )}

        {screenState === 'success' && (
          <GlassCard tone="done" className="mt-8 !p-6 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-forest-green/30 bg-forest-green/15">
              <Check className="h-6 w-6 text-forest-green" strokeWidth={2.4} aria-hidden="true" />
            </span>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-forest-green">Visual reset complete</p>
            <h1 className="mt-1 text-[25px] font-semibold leading-tight tracking-[-0.02em] text-paper-100">Your preview is ready</h1>
            <p className="mx-auto mt-3 max-w-[286px] text-[13px] leading-relaxed text-paper-100/70">
              No password or reset-link data was sent. In the real flow, you would continue to sign in.
            </p>
            <Link
              href="/screens/04"
              className="hifi-action hifi-action-primary mt-6 inline-flex h-[52px] w-full items-center justify-center rounded-pill px-6 text-[16px] font-semibold"
            >
              Continue to sign in
            </Link>
            <div className="mt-4 flex justify-center">
              <Provenance items={['Local preview', 'No request']} />
            </div>
          </GlassCard>
        )}

        <p
          id="reset-status"
          className={terminalState || screenState === 'success' ? 'sr-only' : 'mt-4 min-h-5 text-center text-[12px] leading-5 text-paper-100/70'}
          aria-live="polite"
          aria-atomic="true"
        >
          {notice}
        </p>

        <footer className="mt-auto flex flex-col items-center gap-1 pt-4 text-center">
          <p className="flex items-center gap-1.5 text-[11px] text-paper-100/60">
            <ShieldCheck className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />
            Security state is illustrative; no secret is displayed.
          </p>
          <Link href="/legal/privacy" className="focus-ring inline-flex min-h-11 items-center rounded-sm px-2 text-[12px] text-paper-100/70">
            Privacy
          </Link>
        </footer>
      </main>
    </HifiShell>
  )
}
