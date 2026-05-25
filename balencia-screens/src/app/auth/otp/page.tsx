import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { BrandSymbol } from '@/components/design-system/BrandSymbol'
import { Button } from '@/components/design-system/Button'
import { ChevronLeft } from 'lucide-react'

// Screen 03b of 78: OTP verification
// Spec: /Users/hamza/yHealth/app_design 3/03b-otp-verification.md

const digits = ['4', '7', '2', '9']

export default function OtpVerificationScreen() {
  return (
    <PhoneFrame>
      <ScreenShell showTabBar={false}>
        <div className="flex h-full flex-col px-6 pb-8">
          <div className="flex h-11 items-center">
            <button className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors duration-[var(--dur-fast)] hover:bg-white/5">
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
              <div
                key={`${digit}-${index}`}
                className={[
                  'flex h-14 w-14 items-center justify-center rounded-md border bg-ink-brown-800 text-[24px] font-bold leading-[30px] text-white shadow-1',
                  index === digits.length - 1 ? 'border-2 border-brand-orange' : 'border-white/10',
                ].join(' ')}
              >
                {digit}
              </div>
            ))}
          </div>

          <button
            disabled
            className="mt-6 animate-fade-up text-center text-[15px] font-semibold leading-5 text-white/50"
            style={{ animationDelay: '320ms' }}
          >
            Resend code (0:47)
          </button>

          <div className="mt-8 animate-fade-up" style={{ animationDelay: '400ms' }}>
            <Button size="auth" fullWidth>
              Verify
            </Button>
          </div>

          <div className="flex-1" />
        </div>
      </ScreenShell>
    </PhoneFrame>
  )
}
