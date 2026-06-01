import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { BrandSymbol } from '@/components/design-system/BrandSymbol'
import { BrandWordmark } from '@/components/design-system/BrandWordmark'
import { ContinuousStroke } from '@/components/design-system/ContinuousStroke'

// Screen 01 of 78: Splash screen
// Spec: /Users/hamza/yHealth/app_design 3/01-splash-screen.md

export default function SplashScreenScreen() {
  return (
    <PhoneFrame>
      <ScreenShell showTabBar={false}>
        <div className="relative flex h-full flex-col items-center px-6">
          <span className="sr-only">Balencia. Loading.</span>
          <div className="flex-[0.42]" />
          <div className="relative flex min-h-[220px] w-full flex-col items-center justify-center">
            <div className="absolute h-[320px] w-[320px] rounded-full bg-brand-orange/15 blur-3xl" />
            <BrandSymbol
              size={72}
              className="relative z-10 animate-fade-up"
            />
            <ContinuousStroke className="relative z-10 mt-4" />
            <div className="relative z-10 mt-4 animate-fade-up" style={{ animationDelay: '1200ms' }}>
              <BrandWordmark width={140} />
            </div>
          </div>
          <div className="flex-[0.58]" />
        </div>
      </ScreenShell>
    </PhoneFrame>
  )
}
