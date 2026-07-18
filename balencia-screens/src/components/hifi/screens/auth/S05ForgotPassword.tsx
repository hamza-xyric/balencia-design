'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Check, ChevronLeft, Mail, RotateCcw } from 'lucide-react'
import {
  BtnGhost,
  BtnPrimary,
  ChargeMeter,
  GlassCard,
  GlassPillInput,
  HifiShell,
  Provenance,
} from '@/components/hifi/kit'

type RecoveryState = 'default' | 'filled' | 'loading' | 'success' | 'offline' | 'error' | 'cooldown'

const RECOVERY_STATES = new Set<RecoveryState>([
  'default',
  'filled',
  'loading',
  'success',
  'offline',
  'error',
  'cooldown',
])

function fixtureState(): RecoveryState {
  const query = new URLSearchParams(window.location.search).get('state')
  const hash = window.location.hash.replace(/^#(?:state=)?/, '')
  const candidate = query ?? hash
  return RECOVERY_STATES.has(candidate as RecoveryState) ? candidate as RecoveryState : 'default'
}

function maskedEmail(value: string) {
  const [local = '', domain = ''] = value.trim().split('@')
  if (!domain) return 'your email address'
  return `${local.slice(0, 1).toLowerCase() || '•'}***@${domain.toLowerCase()}`
}

// Account recovery remains deliberately local and enumeration-safe. Fixtures
// exercise visual states only; no request, account lookup, or email is sent.
export function S05ForgotPassword() {
  const [screenState, setScreenState] = useState<RecoveryState>('default')
  const [email, setEmail] = useState('')
  const [maskedDestination, setMaskedDestination] = useState('your email address')
  const [cooldown, setCooldown] = useState(0)
  const [notice, setNotice] = useState('')
  const [fixtureRevision, setFixtureRevision] = useState(0)
  const transitionTimer = useRef<number | null>(null)

  useEffect(() => {
    const applyFixture = window.setTimeout(() => {
      const fixture = fixtureState()
      const fixtureEmail = fixture === 'default' ? '' : 'amira@example.com'
      setScreenState(fixture)
      setEmail(fixtureEmail)
      setMaskedDestination(maskedEmail(fixtureEmail))
      setCooldown(fixture === 'cooldown' ? 2 : 0)
      setFixtureRevision(1)
      setNotice(
        fixture === 'offline'
          ? 'You are offline. Your email stays here, and no request was sent.'
          : fixture === 'error'
            ? 'The visual request could not be completed. Your email is still here.'
            : fixture === 'cooldown'
              ? 'Resend cooldown started. No email was sent in this visual preview.'
              : fixture === 'success'
                ? `If that email matches an account, reset instructions would be addressed to ${maskedEmail(fixtureEmail)}. No email was sent in this visual preview.`
              : '',
      )
    }, 0)

    return () => {
      window.clearTimeout(applyFixture)
      if (transitionTimer.current) window.clearTimeout(transitionTimer.current)
    }
  }, [])

  useEffect(() => {
    if (screenState !== 'cooldown') return
    const timer = window.setInterval(() => {
      setCooldown(current => Math.max(0, current - 1))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [screenState])

  useEffect(() => {
    if (screenState !== 'cooldown' || cooldown !== 0) return
    const announceExpiry = window.setTimeout(() => {
      setScreenState('success')
      setNotice('Resend is available now. No email has been sent.')
    }, 0)
    return () => window.clearTimeout(announceExpiry)
  }, [cooldown, screenState])

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  const requestVisible = !['success', 'cooldown'].includes(screenState)

  const submitRecovery = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!emailValid || screenState === 'loading') {
      setNotice('Enter a complete email address to continue.')
      return
    }
    if (screenState === 'offline') {
      setNotice('You are offline. Your email stays here, and no request was sent.')
      return
    }

    setNotice('')
    setMaskedDestination(maskedEmail(email))
    setScreenState('loading')
    transitionTimer.current = window.setTimeout(() => {
      setScreenState('success')
      setNotice(`If that email matches an account, reset instructions would be addressed to ${maskedEmail(email)}. No account lookup or email was sent.`)
      transitionTimer.current = null
    }, 700)
  }

  const resendPreview = () => {
    if (screenState === 'cooldown') return
    setCooldown(59)
    setScreenState('cooldown')
    setNotice('Resend cooldown started. No email was sent in this visual preview.')
  }

  return (
    <HifiShell
      atmosphere="you"
      showTabBar={false}
      header={
        <div className="flex min-h-[58px] shrink-0 items-center px-2">
          <Link
            href="/screens/04"
            aria-label="Back to sign in"
            className="focus-ring flex h-11 w-11 items-center justify-center rounded-full text-paper-100/75"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
          </Link>
        </div>
      }
    >
      <main className="flex min-h-full flex-col px-5 pb-6 pt-1" data-recovery-state={screenState}>
        <div className="text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/Frame 2147239943.svg" alt="Balencia" className="mx-auto h-auto w-[148px]" />
        </div>

        <section className="space-y-2 pb-6 pt-7 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-orange">Account recovery</p>
          <h1 className="text-[30px] font-semibold leading-tight tracking-[-0.02em] text-paper-100">
            Reset your <span className="text-emphasis">password</span>
          </h1>
          <p className="mx-auto max-w-[292px] text-[14px] leading-snug text-paper-100/70">
            Enter your email. If it matches an account, reset instructions will arrive.
          </p>
        </section>

        {requestVisible ? (
          <form className="space-y-4" aria-busy={screenState === 'loading'} aria-describedby="recovery-status recovery-privacy" onSubmit={submitRecovery}>
            <div className="space-y-1.5">
              <p aria-hidden="true" className="px-1 text-[12px] font-semibold text-paper-100/75">
                Email address
              </p>
              <GlassPillInput
                key={`recovery-email-${fixtureRevision}`}
                id="recovery-email"
                label="Email address"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="Email address"
                value={email}
                required
                disabled={screenState === 'loading'}
                aria-invalid={screenState === 'error' || undefined}
                aria-describedby="recovery-status recovery-privacy"
                icon={<Mail className="h-5 w-5" strokeWidth={1.9} />}
                onChange={event => {
                  setEmail(event.currentTarget.value)
                  if (screenState === 'error') setScreenState(event.currentTarget.value ? 'filled' : 'default')
                  setNotice('')
                }}
              />
            </div>

            {(screenState === 'offline' || screenState === 'error') && (
              <div className="rounded-[16px] border border-brand-orange/30 bg-ink-brown-800 px-4 py-3">
                <p className="text-[13px] font-semibold text-paper-100">
                  {screenState === 'offline' ? 'No connection' : 'Request paused'}
                </p>
                <p className="mt-1 text-[12px] leading-4 text-paper-100/70">
                  {screenState === 'offline'
                    ? 'Reconnect and try again. Your entry remains local.'
                    : 'Try again when you are ready. We do not reveal whether an account exists.'}
                </p>
              </div>
            )}

            <BtnPrimary
              type="submit"
              className="w-full"
              disabled={!emailValid || screenState === 'offline'}
              loading={screenState === 'loading'}
              loadingLabel="Preparing preview"
            >
              Send reset link
            </BtnPrimary>

            <p id="recovery-privacy" className="px-2 text-center text-[12px] leading-relaxed text-paper-100/55">
              Visual prototype only · no email is sent and no account is checked.
            </p>
          </form>
        ) : (
          <GlassCard tone="done" className="!p-5">
            <div className="flex flex-col items-center text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-forest-green/30 bg-forest-green/15">
                <Check className="h-6 w-6 text-forest-green" strokeWidth={2.4} aria-hidden="true" />
              </span>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-forest-green">Request previewed</p>
              <h2 className="mt-1 text-[19px] font-semibold text-paper-100">Check your email</h2>
              <p className="mt-2 text-[14px] tabular-nums text-paper-100/75">Destination {maskedDestination}</p>
              <p className="mt-3 max-w-[280px] text-[12px] leading-relaxed text-paper-100/65">
                If that email matches an account, reset instructions will arrive. This prototype did not send them.
              </p>

              {screenState === 'cooldown' && (
                <div className="mt-5 w-full rounded-[16px] border border-white/10 bg-ink-900/40 p-3">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[12px] text-paper-100/65">Resend available in</span>
                    <span className="text-[13px] font-semibold tabular-nums text-paper-100" aria-label={`${cooldown} seconds remaining`}>
                      0:{String(cooldown).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="mt-2">
                    <ChargeMeter ticks={12} percent={(cooldown / 59) * 100} label={`${cooldown} seconds remain in the visual resend cooldown`} />
                  </div>
                </div>
              )}

              <div className="mt-4 flex justify-center">
                <Provenance items={['Masked destination', 'Visual only']} />
              </div>

              <div className="mt-4 w-full space-y-1">
                <Link
                  href="/screens/04"
                  className="hifi-action hifi-action-primary inline-flex h-[52px] w-full items-center justify-center rounded-pill px-6 text-[16px] font-semibold"
                >
                  Back to sign in
                </Link>
                <BtnGhost
                  type="button"
                  quiet
                  className="w-full"
                  disabled={screenState === 'cooldown'}
                  onClick={resendPreview}
                >
                  <RotateCcw className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  {screenState === 'cooldown' ? 'Resend unavailable' : 'Send again'}
                </BtnGhost>
              </div>
            </div>
          </GlassCard>
        )}

        <p
          id="recovery-status"
          className={notice.startsWith('If that email matches an account') ? 'sr-only' : 'mt-4 min-h-5 text-center text-[12px] leading-5 text-paper-100/70'}
          aria-live="polite"
          aria-atomic="true"
        >
          {notice}
        </p>
      </main>
    </HifiShell>
  )
}
