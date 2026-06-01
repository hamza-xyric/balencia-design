'use client'

import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { BrandSymbol } from '@/components/design-system/BrandSymbol'
import { Button } from '@/components/design-system/Button'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

// Screen 03b of 78: OTP verification
// Spec: /Users/hamza/yHealth/app_design 3/03b-otp-verification.md

export default function OtpVerificationScreen() {
  const router = useRouter()
  const [digits, setDigits] = useState(['', '', '', ''])
  const [cooldown, setCooldown] = useState(47)
  const [resent, setResent] = useState(false)
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])
  const complete = digits.every(Boolean)
  const resendReady = cooldown === 0 && !resent

  useEffect(() => {
    inputsRef.current[0]?.focus()
  }, [])

  useEffect(() => {
    if (cooldown === 0 || resent) return
    const timer = window.setTimeout(() => setCooldown((seconds) => Math.max(0, seconds - 1)), 1000)
    return () => window.clearTimeout(timer)
  }, [cooldown, resent])

  useEffect(() => {
    if (!resent) return
    const timer = window.setTimeout(() => {
      setResent(false)
      setCooldown(60)
    }, 3000)
    return () => window.clearTimeout(timer)
  }, [resent])

  const updateDigit = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1)
    setDigits((current) => current.map((item, itemIndex) => (itemIndex === index ? digit : item)))
    if (digit && index < digits.length - 1) inputsRef.current[index + 1]?.focus()
  }

  const handlePaste = (value: string) => {
    const pasted = value.replace(/\D/g, '').slice(0, 4).split('')
    if (pasted.length === 4) {
      setDigits(pasted)
      inputsRef.current[3]?.focus()
    }
  }

  const handleResend = () => {
    if (!resendReady) return
    setResent(true)
    setDigits(['', '', '', ''])
    inputsRef.current[0]?.focus()
  }

  const resendLabel = resent
    ? 'Code sent'
    : resendReady
      ? 'Resend code'
      : `Resend code (0:${String(cooldown).padStart(2, '0')})`

  return (
    <PhoneFrame>
      <ScreenShell showTabBar={false}>
        <div className="flex h-full flex-col px-6 pb-8">
          <div className="flex h-11 items-center">
            <button
              aria-label="Back"
              onClick={() => router.push('/auth/sign-up')}
              className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors duration-[var(--dur-fast)] hover:bg-white/5"
            >
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
            Verify your email
          </h1>
          <p
            className="mx-auto mt-3 max-w-[270px] animate-fade-up text-center text-[15px] leading-[22px] text-white/50"
            style={{ animationDelay: '160ms' }}
          >
            We sent a 4-digit code to j***@email.com
          </p>

          <div className="mt-8 flex animate-fade-up justify-center gap-3" style={{ animationDelay: '240ms' }}>
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(node) => {
                  inputsRef.current[index] = node
                }}
                aria-label={`Digit ${index + 1} of 4`}
                inputMode="numeric"
                autoComplete={index === 0 ? 'one-time-code' : undefined}
                maxLength={1}
                value={digit}
                onChange={(event) => updateDigit(index, event.target.value)}
                onPaste={(event) => {
                  event.preventDefault()
                  handlePaste(event.clipboardData.getData('text'))
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Backspace' && !digits[index] && index > 0) {
                    setDigits((current) => current.map((item, itemIndex) => (itemIndex === index - 1 ? '' : item)))
                    inputsRef.current[index - 1]?.focus()
                  }
                }}
                className={[
                  'flex h-14 w-14 items-center justify-center rounded-md border bg-ink-brown-800 text-[24px] font-bold leading-[30px] text-white shadow-1',
                  digit ? 'border-white/10' : index === digits.findIndex((item) => !item) ? 'border-2 border-brand-orange' : 'border-white/10',
                ].join(' ')}
              />
            ))}
          </div>

          <button
            onClick={handleResend}
            disabled={!resendReady}
            aria-live="polite"
            className={[
              'mt-6 min-h-11 animate-fade-up text-center text-[15px] font-semibold leading-5 disabled:cursor-not-allowed',
              resendReady ? 'text-brand-orange' : resent ? 'text-forest-green' : 'text-white/50',
            ].join(' ')}
            style={{ animationDelay: '320ms' }}
          >
            {resendLabel}
          </button>

          <div className="mt-8 animate-fade-up" style={{ animationDelay: '400ms' }}>
            <Button size="auth" fullWidth disabled={!complete} onClick={() => router.push('/auth/consent')}>
              Verify
            </Button>
          </div>

          <div className="flex-1" />
        </div>
      </ScreenShell>
    </PhoneFrame>
  )
}
