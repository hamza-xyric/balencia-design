import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { BrandSymbol } from '@/components/design-system/BrandSymbol'
import { Button } from '@/components/design-system/Button'
import { Divider } from '@/components/design-system/Divider'
import { Input } from '@/components/design-system/Input'
import { SocialAuthButton } from '@/components/design-system/SocialAuthButton'
import { ToggleSwitch } from '@/components/design-system/ToggleSwitch'
import { ChevronLeft, Fingerprint } from 'lucide-react'

// Screen 04 of 78: Sign in
// Spec: /Users/hamza/yHealth/app_design 3/04-sign-in.md

export default function SignInScreen() {
  return (
    <PhoneFrame>
      <ScreenShell showTabBar={false}>
        <div className="min-h-full px-6 pb-8">
          <div className="flex h-11 items-center">
            <button aria-label="Back" className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors duration-[var(--dur-fast)] hover:bg-white/5">
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
            Welcome back
          </h1>

          <div className="mt-8 flex flex-col gap-4">
            <div className="animate-fade-up" style={{ animationDelay: '160ms' }}>
              <Input name="email" type="email" placeholder="Email address" />
            </div>
            <div className="animate-fade-up" style={{ animationDelay: '220ms' }}>
              <Input name="password" type="password" placeholder="Password" showPasswordToggle />
            </div>
          </div>

          <div
            className="mt-2 flex animate-fade-up justify-end"
            style={{ animationDelay: '280ms' }}
          >
            <a href="/auth/forgot-password" className="text-[15px] leading-5 text-brand-orange">
              Forgot password?
            </a>
          </div>

          <div
            className="mt-3 flex h-11 animate-fade-up items-center justify-between"
            style={{ animationDelay: '340ms' }}
          >
            <span className="text-[15px] leading-5 text-white/70">Remember me</span>
            <ToggleSwitch checked aria-label="Remember me" />
          </div>

          <div className="mt-4 animate-fade-up" style={{ animationDelay: '400ms' }}>
            <Button size="auth" fullWidth>
              Sign in
            </Button>
          </div>

          <div className="mt-6 animate-fade-up" style={{ animationDelay: '460ms' }}>
            <Divider />
          </div>

          <div className="mt-6 flex animate-fade-up gap-4" style={{ animationDelay: '520ms' }}>
            <SocialAuthButton mark="G" label="Google" />
            <SocialAuthButton mark="A" label="Apple" />
          </div>

          <button
            className="mx-auto mt-6 flex h-11 w-11 animate-fade-up items-center justify-center rounded-full text-white/50 transition-colors duration-[var(--dur-fast)] hover:text-white"
            style={{ animationDelay: '580ms' }}
            aria-label="Sign in with biometrics"
          >
            <Fingerprint size={24} strokeWidth={1.7} />
          </button>

          <p
            className="mt-5 animate-fade-up text-center text-[15px] leading-5 text-white/50"
            style={{ animationDelay: '640ms' }}
          >
            Don&apos;t have an account?{' '}
              <a href="/auth/sign-up" className="font-semibold text-brand-orange">Sign up</a>
          </p>
        </div>
      </ScreenShell>
    </PhoneFrame>
  )
}
