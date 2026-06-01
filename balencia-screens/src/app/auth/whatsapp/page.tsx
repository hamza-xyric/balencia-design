'use client'

import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { BrandSymbol } from '@/components/design-system/BrandSymbol'
import { Button } from '@/components/design-system/Button'
import { Input } from '@/components/design-system/Input'
import { Check, ChevronDown, ChevronLeft, MessageCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

// Screen 03e of 78: WhatsApp enrollment
// Spec: /Users/hamza/yHealth/app_design 3/03e-whatsapp-enrollment.md

const values = ['Daily reminders', 'Check-in prompts', 'SIA coaching tips']
const mutedDisabledCta = 'disabled:bg-white/10 disabled:text-white/35 disabled:opacity-100 disabled:hover:shadow-none'

export default function WhatsappEnrollmentScreen() {
  const router = useRouter()
  const [phase, setPhase] = useState<'phone' | 'verify'>('phone')
  const [countryCode, setCountryCode] = useState('+1')
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [resendCountdown, setResendCountdown] = useState(47)
  const [resent, setResent] = useState(false)
  const codeRefs = useRef<Array<HTMLInputElement | null>>([])
  const phoneValid = phone.replace(/\D/g, '').length >= 7
  const codeComplete = code.every(Boolean)
  const skip = () => router.push('/auth/sia-onboarding')
  const resendReady = phase === 'verify' && resendCountdown === 0
  const resendTime = `0:${String(resendCountdown).padStart(2, '0')}`

  useEffect(() => {
    if (phase !== 'verify' || resendCountdown === 0) return undefined

    const timer = window.setTimeout(() => {
      setResendCountdown((value) => Math.max(0, value - 1))
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [phase, resendCountdown])

  const updateCode = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1)
    setCode((current) => current.map((item, itemIndex) => (itemIndex === index ? digit : item)))
    if (digit && index < code.length - 1) codeRefs.current[index + 1]?.focus()
  }

  return (
    <PhoneFrame>
      <ScreenShell showTabBar={false}>
        <div className="flex h-full flex-col px-6 pb-8">
          <div className="flex h-11 items-center justify-between">
            {phase === 'verify' ? (
              <button
                onClick={() => setPhase('phone')}
                aria-label="Back to phone number"
                className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors duration-[var(--dur-fast)] hover:bg-white/5"
              >
                <ChevronLeft size={20} strokeWidth={2} />
              </button>
            ) : (
              <span aria-hidden="true" className="h-11 w-11" />
            )}
            <button
              onClick={skip}
              aria-label="Skip WhatsApp enrollment"
              className="-mr-2 flex h-11 items-center px-2 text-[15px] leading-5 text-white/60 transition-colors duration-[var(--dur-fast)] hover:text-white"
            >
              Skip
            </button>
          </div>

          <div className="mt-6 flex animate-fade-up justify-center">
            <BrandSymbol size={48} />
          </div>

          <div className="mt-8 animate-fade-up text-center" style={{ animationDelay: '80ms' }}>
            <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.06] bg-ink-brown-800 text-brand-orange shadow-1">
              <MessageCircle size={22} strokeWidth={1.8} />
            </div>
            <h1 className="text-[24px] font-bold leading-[30px] text-white">
              {phase === 'phone' ? 'Get SIA on WhatsApp' : 'Enter the code'}
            </h1>
            <p className="mx-auto mt-3 max-w-[270px] text-[15px] leading-[22px] text-white/50">
              {phase === 'phone'
                ? 'Optional reminders, check-ins, and coaching tips. Usually 1-2 messages a day, with STOP anytime.'
                : `We sent a 6-digit code to ${countryCode} ${phone || 'your phone'}.`}
            </p>
          </div>

          {phase === 'phone' ? (
            <div className="mt-8 flex animate-fade-up gap-2" style={{ animationDelay: '160ms' }}>
              <label className="relative block h-[52px] w-[82px] shrink-0">
                <select
                  aria-label="Country code"
                  value={countryCode}
                  onChange={(event) => setCountryCode(event.target.value)}
                  className="h-[52px] w-full appearance-none rounded-md border border-white/10 bg-ink-brown-800 px-3 text-body text-white outline-none focus:border-2 focus:border-brand-orange"
                >
                  <option>+1</option>
                  <option>+44</option>
                  <option>+92</option>
                  <option>+971</option>
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white/40" />
              </label>
              <div className="flex-1">
                <Input
                  name="phone"
                  inputMode="tel"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </div>
            </div>
          ) : (
            <div className="mt-8 flex animate-fade-up justify-center gap-2" style={{ animationDelay: '160ms' }}>
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(node) => {
                    codeRefs.current[index] = node
                  }}
                  aria-label={`Digit ${index + 1} of 6`}
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(event) => updateCode(index, event.target.value)}
                  className="h-12 w-[46px] rounded-md border border-white/10 bg-ink-brown-800 text-center text-[20px] font-bold text-white outline-none focus:border-2 focus:border-brand-orange"
                />
              ))}
            </div>
          )}

          <div className="mt-6 animate-fade-up" style={{ animationDelay: '240ms' }}>
            <Button
              size="auth"
              fullWidth
              className={mutedDisabledCta}
              disabled={phase === 'phone' ? !phoneValid : !codeComplete}
              onClick={() => {
                if (phase === 'phone') {
                  setPhase('verify')
                  setResent(false)
                  setResendCountdown(47)
                }
                else router.push('/auth/sia-onboarding')
              }}
            >
              {phase === 'phone' ? 'Send code' : 'Verify'}
            </Button>
          </div>

          {phase === 'verify' && (
            <button
              type="button"
              disabled={!resendReady}
              aria-disabled={!resendReady}
              onClick={() => {
                if (!resendReady) return
                setResent(true)
                setResendCountdown(47)
                setCode(['', '', '', '', '', ''])
              }}
              className={[
                'mt-5 flex h-11 animate-fade-up items-center justify-center text-center text-[15px] font-semibold disabled:cursor-not-allowed',
                resendReady ? 'text-brand-orange' : resent ? 'text-forest-green' : 'text-white/50',
              ].join(' ')}
            >
              {resendReady ? 'Resend code' : resent ? `Code sent - resend in ${resendTime}` : `Resend code (${resendTime})`}
            </button>
          )}

          {phase === 'phone' && (
            <div className="mt-4 animate-fade-up space-y-2" style={{ animationDelay: '320ms' }}>
              {values.map((value) => (
                <div key={value} className="flex items-center gap-2 text-[14px] leading-5 text-white/50">
                  <Check size={14} className="text-forest-green" strokeWidth={2.2} />
                  <span>{value}</span>
                </div>
              ))}
              <p className="pt-1 text-[13px] leading-5 text-white/40">
                You can disable WhatsApp later in Settings. Replies with STOP opt out immediately.
              </p>
            </div>
          )}

          <div className="flex-1" />
        </div>
      </ScreenShell>
    </PhoneFrame>
  )
}
