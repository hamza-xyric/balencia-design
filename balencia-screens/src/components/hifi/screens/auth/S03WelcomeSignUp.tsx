'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import {
  BtnPrimary,
  BtnSecondary,
  ComplianceFooter,
  GlassPillInput,
  HifiShell,
  MomentumBar,
  Provenance,
  TopBar,
} from '@/components/hifi/kit'

// Pre-auth sign-up. Smallest source form (email + password) rendered in the
// TYPED state per founder directive: full momentum bar, enabled CTA. The
// connects promise stays a single future-tense caption line — no pill row,
// no provenance — because no domain history exists yet to synthesize.
export function S03WelcomeSignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formState, setFormState] = useState<'default' | 'loading' | 'error'>('default')
  const [actionStatus, setActionStatus] = useState('')
  const stateTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (stateTimer.current) clearTimeout(stateTimer.current)
  }, [])

  const resetError = () => {
    if (formState === 'error') setFormState('default')
  }

  const submitPrototype = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (formState === 'loading') return
    if (stateTimer.current) clearTimeout(stateTimer.current)
    setFormState('loading')
    stateTimer.current = setTimeout(() => {
      setFormState('error')
      stateTimer.current = null
    }, 1200)
  }

  const previewProvider = (provider: 'Google' | 'Apple') => {
    setActionStatus(`${provider} account creation is unavailable in this visual prototype. Nothing was sent.`)
  }

  return (
    <HifiShell header={<TopBar title="Balencia" titleLevel="div" back={false} />} showTabBar={false} atmosphere="cia">
      <main className="flex flex-col px-5 pb-3 pt-4">
        <section className="space-y-2 pb-5 pt-2 text-center">
          <h1 className="text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] text-white">
            Create your account with <span className="text-emphasis">CIA</span>.
          </h1>
          <p className="text-pretty text-[15px] leading-snug text-paper-100/70">
            CIA connects your life once there is enough history.
          </p>
        </section>

        <form className="space-y-3" data-form-state={formState} aria-busy={formState === 'loading'} onSubmit={submitPrototype}>
          <GlassPillInput
            id="signup-email"
            label="Email address"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            icon={<Mail className="h-4 w-4" />}
            placeholder="Email address"
            defaultValue="amira@example.com"
            onChange={resetError}
          />

          <div className="space-y-2">
            <GlassPillInput
              id="signup-password"
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              icon={<Lock className="h-4 w-4" />}
              placeholder="Password"
              defaultValue="ClearSky!2040"
              onChange={resetError}
              trailing={
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-controls="signup-password"
                  aria-pressed={showPassword}
                  className="focus-ring flex h-11 min-h-11 min-w-11 items-center justify-center gap-1 rounded-full px-1 text-[13px] font-medium text-paper-100/70"
                  onClick={() => setShowPassword(current => !current)}
                >
                  {showPassword
                    ? <EyeOff className="h-4 w-4" strokeWidth={1.9} />
                    : <Eye className="h-4 w-4" strokeWidth={1.9} />}
                  <span aria-hidden="true">{showPassword ? 'Hide' : 'Show'}</span>
                </button>
              }
            />
            <div className="flex items-center justify-between gap-3 pt-1">
              <div className="flex-1">
                <MomentumBar value={100} label="Meets 4 of 4 rules" />
              </div>
              <Provenance items={['Typed live']} />
            </div>
          </div>

          <div className="pt-2">
            <BtnPrimary
              type="submit"
              className="w-full"
              loading={formState === 'loading'}
              loadingLabel="Creating account"
            >
              {formState === 'error' ? 'Try again' : 'Sign up'}
            </BtnPrimary>
            <div className="min-h-9 pt-2" aria-live="polite">
              {formState === 'loading' && (
                <p className="text-center text-[12px] leading-4 text-paper-100/70" role="status">
                  Checking your details securely…
                </p>
              )}
              {formState === 'error' && (
                <p className="rounded-lg border border-error-red/35 bg-error-red/10 px-3 py-2 text-[12px] leading-4 text-paper-100" role="alert">
                  This visual prototype can’t create an account. Your details were not sent.
                </p>
              )}
            </div>
          </div>
        </form>

        <ComplianceFooter />

        <div className="flex items-center gap-4 py-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-paper-100/65">Or continue with</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <BtnSecondary aria-label="Continue with Google" onClick={() => previewProvider('Google')}>Google</BtnSecondary>
          <BtnSecondary aria-label="Continue with Apple" onClick={() => previewProvider('Apple')}>Apple</BtnSecondary>
        </div>

        <p className="min-h-5 pt-2 text-center text-[12px] leading-5 text-paper-100/70" role="status" aria-live="polite">
          {actionStatus}
        </p>

        <div className="flex flex-col items-center gap-0 pt-4">
          <p className="text-[13px] text-paper-100/70">Already have an account?</p>
          <Link href="/screens/04" className="focus-ring inline-flex min-h-11 items-center rounded-pill px-4 text-[15px] font-medium text-brand-orange">Sign in</Link>
          <Link href="/screens/06" className="focus-ring inline-flex min-h-11 items-center rounded-pill px-4 text-[15px] font-medium text-paper-100/70">Try without an account</Link>
        </div>

      </main>
    </HifiShell>
  )
}
