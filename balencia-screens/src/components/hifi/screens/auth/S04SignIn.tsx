'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, Eye, EyeOff, HelpCircle, Lock, Mail, ShieldCheck } from 'lucide-react'
import {
  BtnPrimary,
  BtnSecondary,
  ComplianceFooter,
  GlassCard,
  GlassPillInput,
  HifiShell,
} from '@/components/hifi/kit'

type SignInState = 'default' | 'filled' | 'offline' | 'wrong-credentials' | 'rate-limit' | 'loading'

const SIGN_IN_FIXTURES: SignInState[] = ['default', 'filled', 'offline', 'wrong-credentials', 'rate-limit', 'loading']

// Returning-user sign-in. Query-only fixtures make each exceptional state
// independently capturable (`?state=offline`, `wrong-credentials`,
// `rate-limit`, or `loading`) without mixing them into the default frame.
// Every action remains local: this visual prototype never attempts auth.
export function S04SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [uiState, setUiState] = useState<SignInState>('default')
  const [status, setStatus] = useState('')
  const stateTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const fixture = new URLSearchParams(window.location.search).get('state') as SignInState | null
    if (!fixture || !SIGN_IN_FIXTURES.includes(fixture)) return

    const fixtureTimer = window.setTimeout(() => {
      setUiState(fixture)
      if (fixture !== 'default') {
        setEmail('amira@example.com')
        setPassword('ClearSky!2040')
      }
    }, 0)
    return () => window.clearTimeout(fixtureTimer)
  }, [])

  useEffect(() => () => {
    if (stateTimer.current) clearTimeout(stateTimer.current)
  }, [])

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const passwordIsValid = password.length >= 8
  const isBlocked = uiState === 'offline' || uiState === 'rate-limit' || uiState === 'loading'
  const canSubmit = emailIsValid && passwordIsValid && !isBlocked

  const changeCredentials = (nextEmail: string, nextPassword: string) => {
    setEmail(nextEmail)
    setPassword(nextPassword)
    setStatus('')
    if (uiState === 'wrong-credentials') setUiState('filled')
  }

  const submitPreview = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canSubmit) return

    if (stateTimer.current) clearTimeout(stateTimer.current)
    setUiState('loading')
    setStatus('Visual preview only. No sign-in request has been sent.')
    stateTimer.current = setTimeout(() => {
      setUiState('wrong-credentials')
      setStatus('Preview complete. Your details were not sent or checked.')
      stateTimer.current = null
    }, 900)
  }

  const previewProvider = (provider: 'Google' | 'Apple') => {
    setStatus(`${provider} sign-in is unavailable in this visual prototype. Nothing was sent.`)
  }

  const exceptionalMessage = uiState === 'wrong-credentials'
      ? 'Preview state: that email or password does not match. No real credential check occurred.'
      : uiState === 'rate-limit'
        ? 'Too many preview attempts. Try again later. No retry-after value is available in this visual prototype.'
        : uiState === 'loading'
          ? 'Showing the loading state. No sign-in request is running.'
          : ''

  return (
    <HifiShell
      atmosphere="you"
      showTabBar={false}
      header={
        <div className="flex h-11 items-center px-2 pt-2">
          <Link
            href="/screens/02"
            aria-label="Return to welcome screen"
            className="focus-ring flex h-11 w-11 items-center justify-center rounded-full text-paper-100/75"
          >
            <ChevronLeft aria-hidden="true" className="h-5 w-5" strokeWidth={1.9} />
          </Link>
        </div>
      }
    >
      <main className="flex min-h-full flex-col px-5 pb-6" data-auth-state={uiState}>
        {uiState === 'offline' && (
          <div className="mb-3 rounded-pill border border-white/10 bg-surface-2 px-4 py-2.5 text-center text-[12px] leading-5 text-paper-100/75" role="status">
            Offline · sign-in requires a connection · nothing queued
          </div>
        )}

        <div className="text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/Frame 2147239943.svg" alt="Balencia" className="mx-auto h-auto w-[128px]" />
        </div>

        <section className="pb-5 pt-5 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-orange">Secure return</p>
          <h1 className="mt-2 text-[28px] font-semibold leading-tight tracking-[-0.02em] text-paper-100">
            Welcome <span className="text-emphasis">back</span>
          </h1>
          <p className="mt-2 text-[14px] leading-snug text-paper-100/70">Pick up where you left off.</p>
        </section>

        <GlassCard tone="you" className="!p-4">
          <form className="space-y-3" aria-busy={uiState === 'loading'} onSubmit={submitPreview}>
            <div className="space-y-1.5">
              <p aria-hidden="true" className="px-1 text-[12px] font-semibold text-paper-100/75">Email address</p>
              <GlassPillInput
                key={`signin-email-${uiState}`}
                id="signin-email"
                label="Email address"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                icon={<Mail className="h-4 w-4" />}
                placeholder="Email address"
                value={email}
                disabled={uiState === 'loading' || uiState === 'rate-limit'}
                required
                onChange={(event) => changeCredentials(event.currentTarget.value, password)}
              />
            </div>

            <div className="space-y-1.5">
              <p aria-hidden="true" className="px-1 text-[12px] font-semibold text-paper-100/75">Password</p>
              <GlassPillInput
                key={`signin-password-${uiState}-${showPassword}`}
                id="signin-password"
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                icon={<Lock className="h-4 w-4" />}
                placeholder="Enter your password"
                value={password}
                disabled={uiState === 'loading' || uiState === 'rate-limit'}
                required
                minLength={8}
                aria-describedby="signin-password-help"
                onChange={(event) => changeCredentials(email, event.currentTarget.value)}
                trailing={
                  <button
                    type="button"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-controls="signin-password"
                    aria-pressed={showPassword}
                    className="focus-ring flex h-11 min-h-11 min-w-11 items-center justify-center rounded-full text-paper-100/70"
                    disabled={uiState === 'loading' || uiState === 'rate-limit'}
                    onClick={() => setShowPassword(current => !current)}
                  >
                    {showPassword
                      ? <EyeOff aria-hidden="true" className="h-4 w-4" strokeWidth={1.9} />
                      : <Eye aria-hidden="true" className="h-4 w-4" strokeWidth={1.9} />}
                  </button>
                }
              />
              <p id="signin-password-help" className="px-1 text-[11px] leading-4 text-paper-100/65">At least 8 characters.</p>
            </div>

            <div className="flex min-h-11 items-center justify-between gap-3">
              <label className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-lg pr-2 focus-within:shadow-[var(--focus-ring)]">
                <span className="flex h-11 w-8 items-center justify-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    disabled={uiState === 'loading' || uiState === 'rate-limit'}
                    onChange={(event) => setRememberMe(event.currentTarget.checked)}
                    className="h-5 w-5 accent-brand-orange"
                    aria-describedby="remember-me-help"
                  />
                </span>
                <span className="text-[14px] text-paper-100">Remember me</span>
              </label>
              <Link
                href="/screens/05"
                className="focus-ring inline-flex min-h-11 shrink-0 items-center rounded-pill px-2 text-[13px] font-semibold text-brand-orange"
              >
                Forgot password?
              </Link>
            </div>

            <p id="remember-me-help" className="text-[11px] leading-4 text-paper-100/65">
              Off by default. If enabled, this device remembers the session for 30 days; revoke it in settings.
            </p>

            {exceptionalMessage && (
              <div
                className={`rounded-xl border px-3 py-2 text-[12px] leading-5 text-paper-100 ${uiState === 'wrong-credentials' ? 'border-error-red/40 bg-error-red/10' : 'border-white/10 bg-white/[0.03]'}`}
                role={uiState === 'wrong-credentials' ? 'alert' : 'status'}
                aria-live="polite"
              >
                <span>{exceptionalMessage}</span>
              </div>
            )}

            <BtnPrimary
              type="submit"
              className="w-full"
              disabled={!canSubmit}
              loading={uiState === 'loading'}
              loadingLabel="Signing in"
            >
              {uiState === 'wrong-credentials' ? 'Try again' : 'Sign in'}
            </BtnPrimary>
          </form>
        </GlassCard>

        <div className="flex items-center gap-4 py-5">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-paper-100/65">Or continue with</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <BtnSecondary aria-label="Continue with Google" onClick={() => previewProvider('Google')}>Google</BtnSecondary>
          <BtnSecondary aria-label="Continue with Apple" onClick={() => previewProvider('Apple')}>Apple</BtnSecondary>
        </div>

        {status && (
          <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-center text-[12px] leading-5 text-paper-100/75" role="status" aria-live="polite">
            {status}
          </div>
        )}

        <div className="mt-3 grid grid-cols-2 gap-2">
          <Link
            href="/screens/03"
            className="focus-ring inline-flex min-h-11 items-center justify-center rounded-pill px-3 text-[13px] font-semibold text-brand-orange"
          >
            Sign up
          </Link>
          <Link
            href="/screens/06"
            className="focus-ring inline-flex min-h-11 items-center justify-center rounded-pill px-3 text-[13px] font-semibold text-paper-100/75"
          >
            Continue as guest
          </Link>
        </div>

        <details className="group mt-3 rounded-2xl border border-white/10 bg-surface-2 px-4">
          <summary className="focus-ring flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-lg text-[13px] font-semibold text-paper-100/75">
            <ShieldCheck aria-hidden="true" className="h-4 w-4 text-forest-green" strokeWidth={1.9} />
            Support and safety resources
          </summary>
          <div className="border-t border-white/10 pb-4 pt-3 text-[12px] leading-5 text-paper-100/70">
            <p>For account access, use password recovery. If you are in immediate danger, contact local emergency services.</p>
            <Link href="/screens/05" className="focus-ring mt-2 inline-flex min-h-11 items-center gap-2 rounded-pill pr-3 font-semibold text-brand-orange">
              <HelpCircle aria-hidden="true" className="h-4 w-4" />
              Open account recovery
            </Link>
          </div>
        </details>

        <ComplianceFooter />
      </main>
    </HifiShell>
  )
}
