import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { BrandSymbol } from '@/components/design-system/BrandSymbol'
import { Button } from '@/components/design-system/Button'
import { ToggleSwitch } from '@/components/design-system/ToggleSwitch'
import { Check } from 'lucide-react'

// Screen 03c of 78: Consent
// Spec: /Users/hamza/yHealth/app_design 3/03c-consent.md

function ConsentCheckbox({ checked = false, label }: { checked?: boolean; label: string }) {
  return (
    <label className="relative flex h-[22px] w-[22px] shrink-0 items-center justify-center">
      <input
        type="checkbox"
        checked={checked}
        readOnly
        aria-label={label}
        className="peer sr-only"
      />
      <span
        className={[
          'flex h-[22px] w-[22px] items-center justify-center rounded-xs border transition-shadow duration-[var(--dur-fast)] peer-focus-visible:ring-2 peer-focus-visible:ring-brand-orange/70',
          checked ? 'border-brand-orange bg-brand-orange' : 'border-white/20 bg-transparent',
        ].join(' ')}
        aria-hidden="true"
      >
        {checked && <Check size={14} className="text-white" strokeWidth={2.2} />}
      </span>
    </label>
  )
}

function ConsentRow({ linkText, href, checked }: { linkText: string; href: string; checked: boolean }) {
  return (
    <div className="flex min-h-[52px] items-center gap-3">
      <ConsentCheckbox checked={checked} label={`Accept ${linkText}`} />
      <p className="text-[15px] leading-5 text-white">
        I accept the <a href={href} className="font-semibold text-brand-orange">{linkText}</a>
      </p>
    </div>
  )
}

export default function ConsentScreen() {
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
            <ConsentRow linkText="Terms of service" href="/auth/consent#terms-of-service" checked />
            <div className="h-px bg-white/10" />
            <ConsentRow linkText="Privacy policy" href="/auth/consent#privacy-policy" checked />
          </div>

          <div
            className="mt-4 animate-fade-up rounded-xl border border-white/[0.06] bg-ink-brown-800 p-4 shadow-1"
            style={{ animationDelay: '240ms' }}
          >
            <p className="mb-2 text-eyebrow font-semibold uppercase tracking-[0.12em] text-white/30">
              Optional
            </p>
            <div className="flex min-h-[52px] items-center gap-3">
              <p className="flex-1 text-[15px] leading-5 text-white">
                Send me tips and updates via email
              </p>
              <ToggleSwitch aria-label="Send me tips and updates via email" />
            </div>
          </div>

          <div className="mt-6 animate-fade-up" style={{ animationDelay: '320ms' }}>
            <Button size="auth" fullWidth>
              Continue
            </Button>
          </div>

          <div className="flex-1" />
        </div>
      </ScreenShell>
    </PhoneFrame>
  )
}
