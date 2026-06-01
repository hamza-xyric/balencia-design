'use client'

import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { BrandSymbol } from '@/components/design-system/BrandSymbol'
import { Button } from '@/components/design-system/Button'
import { Divider } from '@/components/design-system/Divider'
import { Input } from '@/components/design-system/Input'
import { SocialAuthButton } from '@/components/design-system/SocialAuthButton'
import { ChevronLeft, Fingerprint } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

// Screen 04 of 78: Sign in
// Spec: /Users/hamza/yHealth/app_design 3/04-sign-in.md

const mutedDisabledCta = 'disabled:bg-white/10 disabled:text-white/35 disabled:opacity-100 disabled:hover:shadow-none'

export default function SignInScreen() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [biometricNotice, setBiometricNotice] = useState(false)
  const emailValid = useMemo(() => /\S+@\S+\.\S+/.test(email), [email])
  const passwordValid = password.length > 0
  const canSubmit = emailValid && passwordValid
  const submit = () => {
    setSubmitted(true)
    if (canSubmit) router.push('/tabs/today')
  }

  return (
    <PhoneFrame>
      <ScreenShell showTabBar={false}>
        <div className="min-h-full px-6 pb-8">
          <div className="flex h-11 items-center">
            <button aria-label="Back" onClick={() => router.push('/auth/sign-up')} className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors duration-[var(--dur-fast)] hover:bg-white/5">
              <ChevronLeft size={20} strokeWidth={2} />
            </button>
          </div>

          <div className="mt-6 flex animate-fade-up justify-center">
            <BrandSymbol size={48} />
          </div>

          <h1
            className="mt-8 animate-fade-up text-center text-[24px] font-bold leading-[30px] text-white"
            style={{ animationDelay: '80ms' }}
          >
            Welcome back
          </h1>

          <div className="mt-8 flex flex-col gap-4">
            <div className="animate-fade-up" style={{ animationDelay: '160ms' }}>
              <Input
                name="email"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                error={submitted && !emailValid ? 'Enter a valid email address' : undefined}
              />
            </div>
            <div className="animate-fade-up" style={{ animationDelay: '220ms' }}>
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                showPasswordToggle
                error={submitted && !passwordValid ? 'Enter your password' : undefined}
              />
            </div>
          </div>

          <div
            className="mt-2 flex animate-fade-up justify-end"
            style={{ animationDelay: '280ms' }}
          >
            <a href="/auth/forgot-password" className="flex h-11 items-center text-[15px] leading-5 text-brand-orange">
              Forgot password?
            </a>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={rememberMe}
            onClick={() => setRememberMe((checked) => !checked)}
            className="mt-3 flex h-11 animate-fade-up items-center justify-between"
            style={{ animationDelay: '340ms' }}
          >
            <span className="text-[15px] leading-5 text-white/70">Remember me</span>
            <span
              className={[
                'relative inline-flex h-5 w-[34px] shrink-0 rounded-pill transition-colors duration-[var(--dur-fast)]',
                rememberMe ? 'bg-brand-orange' : 'bg-white/15',
              ].join(' ')}
              aria-hidden="true"
            >
              <span
                className={[
                  'absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform duration-[var(--dur-fast)] ease-[var(--ease-flow)]',
                  rememberMe ? 'translate-x-[16px]' : 'translate-x-0.5',
                ].join(' ')}
              />
            </span>
          </button>

          <div className="mt-4 animate-fade-up" style={{ animationDelay: '400ms' }}>
            <Button size="auth" fullWidth className={mutedDisabledCta} disabled={!canSubmit} onClick={submit}>
              Sign in
            </Button>
          </div>

          <div className="mt-6 animate-fade-up" style={{ animationDelay: '460ms' }}>
            <Divider />
          </div>

          <div className="mt-6 flex animate-fade-up gap-4" style={{ animationDelay: '520ms' }}>
            <SocialAuthButton mark="G" label="Google" onClick={() => router.push('/tabs/today')} />
            <SocialAuthButton mark="A" label="Apple" onClick={() => router.push('/tabs/today')} />
          </div>

          <button
            className={[
              'mx-auto mt-6 flex h-11 w-11 animate-fade-up items-center justify-center rounded-full border transition-colors duration-[var(--dur-fast)]',
              biometricNotice
                ? 'border-brand-orange/40 bg-brand-orange/10 text-brand-orange'
                : 'border-transparent text-white/50 hover:bg-white/5 hover:text-white',
            ].join(' ')}
            style={{ animationDelay: '580ms' }}
            aria-label="Sign in with biometrics"
            aria-expanded={biometricNotice}
            aria-controls={biometricNotice ? 'biometric-sign-in-status' : undefined}
            onClick={() => setBiometricNotice(true)}
          >
            <Fingerprint size={24} strokeWidth={1.7} />
          </button>

          {biometricNotice ? (
            <p
              id="biometric-sign-in-status"
              role="status"
              className="mx-auto mt-3 max-w-[240px] animate-fade-up text-center text-[13px] leading-[18px] text-white/60"
            >
              Biometric sign-in is unavailable in this web preview. Use password, Google, or Apple to continue.
            </p>
          ) : null}

          <p
            className="mt-5 animate-fade-up text-center text-[15px] leading-5 text-white/50"
            style={{ animationDelay: '640ms' }}
          >
            Don&apos;t have an account?{' '}
              <a href="/auth/sign-up" className="inline-flex min-h-11 items-center align-middle font-semibold text-brand-orange">Sign up</a>
          </p>
        </div>
      </ScreenShell>
    </PhoneFrame>
  )
}
