import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { BrandSymbol } from '@/components/design-system/BrandSymbol'
import { Button } from '@/components/design-system/Button'
import { Input } from '@/components/design-system/Input'
import { Check, Circle } from 'lucide-react'

// Screen 05b of 78: Reset password
// Spec: /Users/hamza/yHealth/app_design 3/05b-reset-password.md

const requirements = [
  { label: '8+ characters', met: true },
  { label: 'Uppercase letter', met: true },
  { label: 'Lowercase letter', met: true },
  { label: 'Number', met: false },
  { label: 'Special character', met: false },
]

export default function ResetPasswordScreen() {
  return (
    <PhoneFrame>
      <ScreenShell showTabBar={false}>
        <div className="flex h-full flex-col px-6 pb-8 pt-8">
          <div className="flex animate-fade-up justify-center">
            <BrandSymbol size={48} />
          </div>

          <div className="mt-8 animate-fade-up text-center" style={{ animationDelay: '80ms' }}>
            <h1 className="text-[24px] font-bold leading-[30px] text-white">
              Set new password
            </h1>
            <p className="mx-auto mt-3 max-w-[270px] text-[15px] leading-[22px] text-white/60">
              Choose a strong password for your account
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <div className="animate-fade-up" style={{ animationDelay: '160ms' }}>
              <Input name="newPassword" type="password" placeholder="New password" showPasswordToggle />
            </div>
            <div className="animate-fade-up" style={{ animationDelay: '220ms' }}>
              <Input name="confirmPassword" type="password" placeholder="Confirm password" showPasswordToggle />
            </div>
          </div>

          <div className="mt-3 animate-fade-up space-y-1" style={{ animationDelay: '280ms' }}>
            {requirements.map((requirement) => (
              <div
                key={requirement.label}
                className={[
                  'flex h-4 items-center gap-2 text-caption leading-[18px]',
                  requirement.met ? 'text-white/60' : 'text-white/30',
                ].join(' ')}
              >
                {requirement.met ? (
                  <Check size={14} className="text-forest-green" strokeWidth={2.2} />
                ) : (
                  <Circle size={12} className="text-white/30" strokeWidth={1.8} />
                )}
                <span>{requirement.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 animate-fade-up" style={{ animationDelay: '360ms' }}>
            <Button size="auth" fullWidth disabled>
              Reset password
            </Button>
          </div>

          <div className="flex-1" />
        </div>
      </ScreenShell>
    </PhoneFrame>
  )
}
