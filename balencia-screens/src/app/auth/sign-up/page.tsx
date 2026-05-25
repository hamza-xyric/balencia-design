import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { BrandSymbol } from '@/components/design-system/BrandSymbol'
import { Button } from '@/components/design-system/Button'
import { Divider } from '@/components/design-system/Divider'
import { Input } from '@/components/design-system/Input'
import { SocialAuthButton } from '@/components/design-system/SocialAuthButton'
import { Calendar, ChevronDown } from 'lucide-react'

// Screen 03 of 78: Sign up
// Spec: /Users/hamza/yHealth/app_design 3/03-welcome-sign-up.md

export default function SignUpScreen() {
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
            Create your account
          </h1>

          <div className="mt-8 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-2 animate-fade-up" style={{ animationDelay: '160ms' }}>
              <Input name="firstName" placeholder="First name" />
              <Input name="lastName" placeholder="Last name" />
            </div>
            <div className="animate-fade-up" style={{ animationDelay: '220ms' }}>
              <Input name="email" type="email" placeholder="Email address" />
            </div>
            <div className="animate-fade-up" style={{ animationDelay: '280ms' }}>
              <Input name="password" type="password" placeholder="Password" showPasswordToggle />
            </div>
            <div className="animate-fade-up" style={{ animationDelay: '340ms' }}>
              <Input
                name="dateOfBirth"
                placeholder="Date of birth"
                readOnly
                rightIcon={<Calendar size={20} aria-hidden="true" />}
              />
            </div>
            <div className="animate-fade-up" style={{ animationDelay: '400ms' }}>
              <Input
                name="gender"
                placeholder="Gender"
                readOnly
                rightIcon={<ChevronDown size={18} aria-hidden="true" />}
              />
            </div>
          </div>

          <div className="mt-6 animate-fade-up" style={{ animationDelay: '460ms' }}>
            <Button size="auth" fullWidth disabled>
              Sign up
            </Button>
          </div>

          <div className="mt-6 animate-fade-up" style={{ animationDelay: '520ms' }}>
            <Divider />
          </div>

          <div className="mt-6 flex animate-fade-up gap-4" style={{ animationDelay: '580ms' }}>
            <SocialAuthButton mark="G" label="Google" />
            <SocialAuthButton mark="A" label="Apple" />
          </div>

          <div className="mt-8 flex animate-fade-up flex-col items-center gap-3 text-center text-[15px] leading-5" style={{ animationDelay: '640ms' }}>
            <p className="text-white/50">
              Already have an account?{' '}
              <a href="/auth/sign-in" className="font-semibold text-brand-orange">Sign in</a>
            </p>
            <p className="text-white/50">
              Try{' '}
              <a href="/auth/guest-preview" className="font-semibold text-brand-orange">Guest mode</a>
            </p>
          </div>

          <p className="mt-6 animate-fade-up text-center text-[12px] leading-4 text-white/30" style={{ animationDelay: '700ms' }}>
            Terms of service / Privacy policy
          </p>
        </div>
      </ScreenShell>
    </PhoneFrame>
  )
}
