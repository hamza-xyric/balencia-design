import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { BrandSymbol } from '@/components/design-system/BrandSymbol'
import { Button } from '@/components/design-system/Button'
import { Chip } from '@/components/design-system/Chip'
import { Eyebrow } from '@/components/design-system/Eyebrow'
import { Input } from '@/components/design-system/Input'
import type { DomainKey } from '@/data/domains'
import { ChevronLeft } from 'lucide-react'

// Screen 06 of 78: Guest preview
// Spec: /Users/hamza/yHealth/app_design 3/06-guest-mode-preview.md

const lifeAreas: { label: string; domain: DomainKey; selected?: boolean }[] = [
  { label: 'Fitness', domain: 'fitness', selected: true },
  { label: 'Nutrition', domain: 'nutrition' },
  { label: 'Wellbeing', domain: 'wellbeing', selected: true },
  { label: 'Finance', domain: 'finance' },
  { label: 'Career', domain: 'career' },
  { label: 'Relationships', domain: 'relationships' },
  { label: 'Spirituality', domain: 'faith' },
  { label: 'Learning', domain: 'learning' },
  { label: 'Creativity', domain: 'creativity' },
]

export default function GuestPreviewScreen() {
  return (
    <PhoneFrame>
      <ScreenShell showTabBar={false}>
        <div className="min-h-full px-6 pb-8">
          <div className="flex h-11 items-center">
            <button aria-label="Back" className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors duration-[var(--dur-fast)] hover:bg-white/5">
              <ChevronLeft size={20} strokeWidth={2} />
            </button>
          </div>

          <div className="mt-4 flex animate-fade-up justify-center">
            <BrandSymbol size={48} />
          </div>

          <div className="mt-8 animate-fade-up text-center" style={{ animationDelay: '80ms' }}>
            <h1 className="text-[24px] font-bold leading-[30px] text-white">
              Take a look around
            </h1>
            <p className="mx-auto mt-3 max-w-[275px] text-[15px] leading-[22px] text-white/50">
              Tell us your name and pick a few areas you care about.
            </p>
          </div>

          <div className="mt-8 animate-fade-up" style={{ animationDelay: '160ms' }}>
            <Input name="guestName" placeholder="Your name" defaultValue="Amira" />
          </div>

          <div className="mt-6 animate-fade-up" style={{ animationDelay: '240ms' }}>
            <Eyebrow>Life areas</Eyebrow>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {lifeAreas.map((area) => (
                <Chip
                  key={area.label}
                  domain={area.domain}
                  selected={area.selected}
                  className="w-full px-2 text-[12px]"
                >
                  {area.label}
                </Chip>
              ))}
            </div>
          </div>

          <div className="mt-8 animate-fade-up" style={{ animationDelay: '320ms' }}>
            <Button size="auth" fullWidth>
              Explore
            </Button>
          </div>

          <p
            className="mt-8 animate-fade-up text-center text-[15px] leading-5 text-white/50"
            style={{ animationDelay: '400ms' }}
          >
            Already have an account?{' '}
              <a href="/auth/sign-in" className="font-semibold text-brand-orange">Sign in</a>
          </p>
        </div>
      </ScreenShell>
    </PhoneFrame>
  )
}
