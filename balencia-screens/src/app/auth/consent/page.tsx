'use client'

import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { BrandSymbol } from '@/components/design-system/BrandSymbol'
import { Button } from '@/components/design-system/Button'
import { Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

// Screen 03c of 78: Consent
// Spec: /Users/hamza/yHealth/app_design 3/03c-consent.md

function CheckboxMark({ checked = false }: { checked?: boolean }) {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center">
      <span
        className={[
          'flex h-[22px] w-[22px] items-center justify-center rounded-xs border transition-shadow duration-[var(--dur-fast)] peer-focus-visible:ring-2 peer-focus-visible:ring-brand-orange/70',
          checked ? 'border-brand-orange bg-brand-orange' : 'border-white/20 bg-transparent',
        ].join(' ')}
        aria-hidden="true"
      >
        {checked && <Check size={14} className="text-white" strokeWidth={2.2} />}
      </span>
    </span>
  )
}

function ConsentRow({ linkText, href, checked, onChange }: { linkText: string; href: string; checked: boolean; onChange: () => void }) {
  return (
    <div className="flex min-h-[52px] items-center gap-1">
      <label className="flex min-h-[52px] flex-1 cursor-pointer items-center gap-1 pr-2 text-[15px] leading-5 text-white">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          aria-label={`I accept the ${linkText}`}
          className="peer sr-only"
        />
        <CheckboxMark checked={checked} />
        <span>I accept the</span>
      </label>
      <a href={href} className="flex min-h-11 items-center text-[15px] font-semibold leading-5 text-brand-orange">
        {linkText}
      </a>
    </div>
  )
}

export default function ConsentScreen() {
  const router = useRouter()
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [privacyAccepted, setPrivacyAccepted] = useState(false)
  const [emailTips, setEmailTips] = useState(false)
  const [showError, setShowError] = useState(false)
  const canContinue = termsAccepted && privacyAccepted
  const continueFlow = () => {
    if (!canContinue) {
      setShowError(true)
      return
    }
    router.push('/auth/whatsapp')
  }

  return (
    <PhoneFrame>
      <ScreenShell showTabBar={false}>
        <div className="flex h-full flex-col px-6 pb-8 pt-8">
          <div className="flex animate-fade-up justify-center">
            <BrandSymbol size={48} />
          </div>

          <h1
            className="mt-8 animate-fade-up text-center text-[24px] font-bold leading-[30px] text-white"
            style={{ animationDelay: '80ms' }}
          >
            Before we begin
          </h1>
          <p
            className="mt-3 animate-fade-up text-center text-[15px] leading-[22px] text-white/50"
            style={{ animationDelay: '120ms' }}
          >
            Please review and accept our policies
          </p>

          <div
            className="mt-8 animate-fade-up rounded-xl border border-white/[0.06] bg-ink-brown-800 p-4 shadow-1"
            style={{ animationDelay: '160ms' }}
          >
            <p className="mb-1 text-eyebrow font-semibold uppercase tracking-[0.12em] text-white/30">
              Required consents
            </p>
            <ConsentRow
              linkText="Terms of service"
              href="/legal/terms"
              checked={termsAccepted}
              onChange={() => {
                setTermsAccepted((accepted) => !accepted)
                setShowError(false)
              }}
            />
            <div className="h-px bg-white/10" />
            <ConsentRow
              linkText="Privacy policy"
              href="/legal/privacy"
              checked={privacyAccepted}
              onChange={() => {
                setPrivacyAccepted((accepted) => !accepted)
                setShowError(false)
              }}
            />
          </div>
          {showError && (
            <p className="mt-2 text-caption text-error-red">
              Please accept both Terms of service and Privacy policy.
            </p>
          )}

          <div
            className="mt-4 animate-fade-up rounded-xl border border-white/[0.06] bg-ink-brown-800 p-4 shadow-1"
            style={{ animationDelay: '240ms' }}
          >
            <p className="mb-2 text-eyebrow font-semibold uppercase tracking-[0.12em] text-white/30">
              Optional
            </p>
            <label className="flex min-h-[52px] cursor-pointer items-center gap-3">
              <span className="flex-1 text-[15px] leading-5 text-white">
                Send me tips and updates via email
              </span>
              <span className="relative flex h-11 w-11 shrink-0 items-center justify-center">
                <input
                  type="checkbox"
                  role="switch"
                  checked={emailTips}
                  onChange={(event) => setEmailTips(event.currentTarget.checked)}
                  aria-label="Send me tips and updates via email"
                  className="peer sr-only"
                />
                <span className="h-5 w-[34px] rounded-pill bg-white/15 transition-colors duration-[var(--dur-fast)] peer-checked:bg-brand-orange peer-focus-visible:ring-2 peer-focus-visible:ring-brand-orange/70" />
                <span className="pointer-events-none absolute left-[7px] h-4 w-4 rounded-full bg-white transition-transform duration-[var(--dur-fast)] ease-[var(--ease-flow)] peer-checked:translate-x-[16px]" />
              </span>
            </label>
          </div>

          <div className="mt-6 animate-fade-up" style={{ animationDelay: '320ms' }}>
            <Button size="auth" fullWidth disabled={!canContinue} onClick={continueFlow}>
              Continue
            </Button>
          </div>

          <div className="flex-1" />
        </div>
      </ScreenShell>
    </PhoneFrame>
  )
}
