'use client'

import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { BrandSymbol } from '@/components/design-system/BrandSymbol'
import { Button } from '@/components/design-system/Button'
import { Input } from '@/components/design-system/Input'
import { Check, ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

// Screen 05 of 78: Forgot password
// Spec: /Users/hamza/yHealth/app_design 3/05-forgot-password.md

const mutedDisabledCta = 'disabled:bg-white/10 disabled:text-white/35 disabled:opacity-100 disabled:hover:shadow-none'

export default function ForgotPasswordScreen() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [resendState, setResendState] = useState<'idle' | 'sent' | 'cooldown'>('idle')
  const [resendCount, setResendCount] = useState(0)
  const emailValid = useMemo(() => /\S+@\S+\.\S+/.test(email), [email])
  const maskedEmail = emailValid ? email.replace(/^(.).+(@.+)$/, '$1***$2') : 'your email'

  const submit = () => {
    setSubmitted(true)
    if (emailValid) setConfirmed(true)
  }

  return (
    <PhoneFrame>
      <ScreenShell showTabBar={false}>
        <div className="flex h-full flex-col px-6 pb-8">
          <div className="flex h-11 items-center">
            <button
              aria-label="Back"
              onClick={() => router.push('/auth/sign-in')}
              className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors duration-[var(--dur-fast)] hover:bg-white/5"
            >
              <ChevronLeft size={20} strokeWidth={2} />
            </button>
          </div>

          <div className="mt-6 flex animate-fade-up justify-center">
            <BrandSymbol size={48} />
          </div>

          <div className="mt-8 animate-fade-up text-center" style={{ animationDelay: '80ms' }}>
            {confirmed && (
              <div aria-label="Success. Password reset link sent." className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-forest-green text-white">
                <Check size={26} strokeWidth={2.2} />
              </div>
            )}
            <h1 className="text-[24px] font-bold leading-[30px] text-white">
              {confirmed ? 'Check your email' : 'Reset your password'}
            </h1>
            <p className="mx-auto mt-3 max-w-[270px] text-[15px] leading-[22px] text-white/60">
              {confirmed ? `We sent a reset link to ${maskedEmail}` : 'Enter your email and we will send you a reset link'}
            </p>
          </div>

          {!confirmed && (
            <div className="mt-8 animate-fade-up" style={{ animationDelay: '160ms' }}>
              <Input
                name="email"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                error={submitted && !emailValid ? 'Enter a valid email address' : undefined}
              />
            </div>
          )}

          <div className="mt-6 animate-fade-up" style={{ animationDelay: '240ms' }}>
            <Button size="auth" fullWidth className={mutedDisabledCta} disabled={!confirmed && !emailValid} onClick={confirmed ? () => router.push('/auth/sign-in') : submit}>
              {confirmed ? 'Back to sign in' : 'Send reset link'}
            </Button>
          </div>
          {confirmed && (
            <button
              type="button"
              disabled={resendState === 'cooldown'}
              onClick={() => {
                const nextCount = resendCount + 1
                setResendCount(nextCount)
                if (nextCount >= 2) {
                  setResendState('cooldown')
                  return
                }
                setResendState('sent')
                window.setTimeout(() => setResendState('idle'), 2500)
              }}
              className={[
                'mt-4 flex h-11 items-center justify-center text-center text-[15px] leading-5',
                resendState === 'sent' ? 'font-semibold text-forest-green' : resendState === 'cooldown' ? 'text-white/30' : 'text-white/50',
              ].join(' ')}
            >
              {resendState === 'sent' ? 'Sent' : resendState === 'cooldown' ? 'Try again in 0:59' : "Didn't receive it? send again"}
            </button>
          )}

          <div className="flex-1" />
        </div>
      </ScreenShell>
    </PhoneFrame>
  )
}
