import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { BrandSymbol } from '@/components/design-system/BrandSymbol'
import { Button } from '@/components/design-system/Button'
import { Input } from '@/components/design-system/Input'
import { ChevronLeft } from 'lucide-react'

// Screen 05 of 78: Forgot password
// Spec: /Users/hamza/yHealth/app_design 3/05-forgot-password.md

export default function ForgotPasswordScreen() {
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

          <div className="mt-8 animate-fade-up text-center" style={{ animationDelay: '80ms' }}>
            <h1 className="text-[24px] font-bold leading-[30px] text-white">
              Reset your password
            </h1>
            <p className="mx-auto mt-3 max-w-[270px] text-[15px] leading-[22px] text-white/60">
              Enter your email and we&apos;ll send you a reset link
            </p>
          </div>

          <div className="mt-8 animate-fade-up" style={{ animationDelay: '160ms' }}>
            <Input name="email" type="email" placeholder="Email address" />
          </div>

          <div className="mt-6 animate-fade-up" style={{ animationDelay: '240ms' }}>
            <Button size="auth" fullWidth>
              Send reset link
            </Button>
          </div>

          <div className="flex-1" />
        </div>
      </ScreenShell>
    </PhoneFrame>
  )
}
