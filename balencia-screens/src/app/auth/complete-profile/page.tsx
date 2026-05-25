import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { BrandSymbol } from '@/components/design-system/BrandSymbol'
import { Button } from '@/components/design-system/Button'
import { Input } from '@/components/design-system/Input'
import { Calendar, ChevronDown } from 'lucide-react'

// Screen 03d of 78: Complete profile
// Spec: /Users/hamza/yHealth/app_design 3/03d-complete-profile.md

export default function CompleteProfileScreen() {
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
            A few more details
          </h1>
          <p
            className="mx-auto mt-2 max-w-[260px] animate-fade-up text-center text-[15px] leading-[22px] text-white/50"
            style={{ animationDelay: '120ms' }}
          >
            We need this to personalize your experience
          </p>

          <div
            className="mt-6 flex animate-fade-up items-center gap-2"
            style={{ animationDelay: '160ms' }}
            aria-label="SIA says: I'll use this to tailor coaching just for you."
          >
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-royal-purple bg-royal-purple/15 text-small font-semibold text-white">
              S
            </div>
            <p className="text-[15px] leading-5 text-white/70">
              I&apos;ll use this to tailor coaching just for you.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <div className="animate-fade-up" style={{ animationDelay: '240ms' }}>
              <Input
                name="dateOfBirth"
                placeholder="Date of birth"
                defaultValue="15 March 1995"
                readOnly
                rightIcon={<Calendar size={20} aria-hidden="true" />}
              />
            </div>
            <div className="animate-fade-up" style={{ animationDelay: '300ms' }}>
              <Input
                name="gender"
                placeholder="Gender"
                defaultValue="Female"
                readOnly
                rightIcon={<ChevronDown size={18} aria-hidden="true" />}
              />
            </div>
          </div>

          <div className="mt-6 animate-fade-up" style={{ animationDelay: '360ms' }}>
            <Button size="auth" fullWidth>
              Continue
            </Button>
          </div>
        </div>
      </ScreenShell>
    </PhoneFrame>
  )
}
