'use client'

import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { BrandSymbol } from '@/components/design-system/BrandSymbol'
import { Button } from '@/components/design-system/Button'
import { Divider } from '@/components/design-system/Divider'
import { Input } from '@/components/design-system/Input'
import { SocialAuthButton } from '@/components/design-system/SocialAuthButton'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

// Screen 03 of 78: Sign up
// Spec: /Users/hamza/yHealth/app_design 3/03-welcome-sign-up.md

export default function SignUpScreen() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const emailValid = useMemo(() => /\S+@\S+\.\S+/.test(email), [email])
  const passwordValid = password.length >= 8
  const canSubmit = emailValid && passwordValid
  const submit = () => {
    setSubmitted(true)
    if (canSubmit) router.push('/auth/otp')
  }

  return (
    <PhoneFrame>
      <ScreenShell showTabBar={false}>
        <div className="min-h-full px-6 pb-8 pt-8">
          <div className="flex animate-fade-up justify-center">
            <BrandSymbol size={48} />
          </div>

          <h1
            className="mt-8 animate-fade-up text-center text-[24px] font-bold leading-[30px] text-white"
            style={{ animationDelay: '80ms' }}
          >
            Create your account
          </h1>

          <div className="mt-8 flex flex-col gap-4">
            <div className="animate-fade-up" style={{ animationDelay: '220ms' }}>
              <Input
                name="email"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                error={submitted && !emailValid ? 'Enter a valid email address' : undefined}
              />
            </div>
            <div className="animate-fade-up" style={{ animationDelay: '280ms' }}>
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                showPasswordToggle
                helperText="Use at least 8 characters"
                error={submitted && !passwordValid ? 'Use at least 8 characters' : undefined}
              />
            </div>
          </div>

          <div className="mt-6 animate-fade-up" style={{ animationDelay: '460ms' }}>
            <Button size="auth" fullWidth disabled={!canSubmit} onClick={submit}>
              Sign up
            </Button>
          </div>

          <div className="mt-6 animate-fade-up" style={{ animationDelay: '520ms' }}>
            <Divider />
          </div>

          <div className="mt-6 flex animate-fade-up gap-4" style={{ animationDelay: '580ms' }}>
            <SocialAuthButton mark="G" label="Google" onClick={() => router.push('/auth/consent')} />
            <SocialAuthButton mark="A" label="Apple" onClick={() => router.push('/auth/consent')} />
          </div>

          <div className="mt-8 flex animate-fade-up flex-col items-center gap-3 text-center text-[15px] leading-5" style={{ animationDelay: '640ms' }}>
            <p className="text-white/50">
              Already have an account?{' '}
              <a href="/auth/sign-in" className="inline-flex min-h-11 items-center align-middle font-semibold text-brand-orange">Sign in</a>
            </p>
            <p className="text-white/50">
              Try{' '}
              <a href="/auth/guest-preview" className="inline-flex min-h-11 items-center align-middle font-semibold text-brand-orange">Guest mode</a>
            </p>
          </div>

          <p className="mt-6 animate-fade-up text-center text-[12px] leading-4 text-white/50" style={{ animationDelay: '700ms' }}>
            <a href="/legal/terms" className="inline-flex min-h-11 items-center align-middle font-medium text-white/65 hover:text-white/80">Terms of service</a>
            {' / '}
            <a href="/legal/privacy" className="inline-flex min-h-11 items-center align-middle font-medium text-white/65 hover:text-white/80">Privacy policy</a>
          </p>
        </div>
      </ScreenShell>
    </PhoneFrame>
  )
}
