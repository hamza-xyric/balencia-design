'use client'

import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { BrandSymbol } from '@/components/design-system/BrandSymbol'
import { Button } from '@/components/design-system/Button'
import { Input } from '@/components/design-system/Input'
import { AlertTriangle, Check, Circle } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useMemo, useState } from 'react'

// Screen 05b of 78: Reset password
// Spec: /Users/hamza/yHealth/app_design 3/05b-reset-password.md

const mutedDisabledCta = 'disabled:bg-white/10 disabled:text-white/35 disabled:opacity-100 disabled:hover:shadow-none'

function ResetPasswordFallback() {
  return (
    <PhoneFrame>
      <ScreenShell showTabBar={false}>
        <div className="flex h-full flex-col px-6 pb-8 pt-8">
          <div className="flex animate-fade-up justify-center">
            <BrandSymbol size={48} />
          </div>
          <div className="mt-8 animate-fade-up text-center" style={{ animationDelay: '80ms' }}>
            <h1 className="text-[24px] font-bold leading-[30px] text-white">Set new password</h1>
            <p className="mx-auto mt-3 max-w-[270px] text-[15px] leading-[22px] text-white/60">
              Preparing your reset link...
            </p>
          </div>
        </div>
      </ScreenShell>
    </PhoneFrame>
  )
}

function ResetPasswordContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const expired = searchParams.get('state') === 'expired'
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [complete, setComplete] = useState(false)
  const requirements = useMemo(() => [
    { label: '8+ characters', met: newPassword.length >= 8 },
    { label: 'Uppercase letter', met: /[A-Z]/.test(newPassword) },
    { label: 'Lowercase letter', met: /[a-z]/.test(newPassword) },
    { label: 'Number', met: /\d/.test(newPassword) },
    { label: 'Special character', met: /[^A-Za-z0-9]/.test(newPassword) },
  ], [newPassword])
  const passwordReady = requirements.every((item) => item.met)
  const matches = newPassword.length > 0 && newPassword === confirmPassword
  const canReset = passwordReady && matches

  return (
    <PhoneFrame>
      <ScreenShell showTabBar={false}>
        <div className="flex h-full flex-col px-6 pb-8 pt-8">
          <div className="flex animate-fade-up justify-center">
            <BrandSymbol size={48} />
          </div>

          <div className="mt-8 animate-fade-up text-center" style={{ animationDelay: '80ms' }}>
            {(complete || expired) && (
              <div
                aria-label={complete ? 'Success. Password has been reset.' : 'Warning. Reset link has expired.'}
                className={[
                  'mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-white',
                  complete ? 'bg-forest-green' : 'bg-stalled-amber',
                ].join(' ')}
              >
                {complete ? <Check size={26} strokeWidth={2.2} /> : <AlertTriangle size={26} strokeWidth={2.2} />}
              </div>
            )}
            <h1 className="text-[24px] font-bold leading-[30px] text-white">
              {expired ? 'Link expired' : complete ? 'Password reset' : 'Set new password'}
            </h1>
            <p className="mx-auto mt-3 max-w-[270px] text-[15px] leading-[22px] text-white/60">
              {expired
                ? 'This reset link has expired. Request a new one to reset your password.'
                : complete
                  ? 'Your password has been updated. Sign in with the new password.'
                  : 'Choose a strong password for your account'}
            </p>
          </div>

          {!expired && !complete && (
            <>
              <div className="mt-8 flex flex-col gap-4">
                <div className="animate-fade-up" style={{ animationDelay: '160ms' }}>
                  <Input
                    name="newPassword"
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    showPasswordToggle
                  />
                </div>
                <div className="animate-fade-up" style={{ animationDelay: '220ms' }}>
                  <Input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    showPasswordToggle
                    error={confirmPassword && !matches ? 'Passwords do not match' : undefined}
                  />
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
            </>
          )}

          <div className="mt-6 animate-fade-up" style={{ animationDelay: '360ms' }}>
            <Button
              size="auth"
              fullWidth
              className={mutedDisabledCta}
              disabled={!expired && !complete && !canReset}
              onClick={() => {
                if (expired) router.push('/auth/forgot-password')
                else if (complete) router.push('/auth/sign-in')
                else setComplete(true)
              }}
            >
              {expired ? 'Request new link' : complete ? 'Back to sign in' : 'Reset password'}
            </Button>
          </div>
          {expired && (
            <button onClick={() => router.push('/auth/sign-in')} className="mt-4 h-11 text-[15px] font-semibold text-white/60">
              Back to sign in
            </button>
          )}

          <div className="flex-1" />
        </div>
      </ScreenShell>
    </PhoneFrame>
  )
}

export default function ResetPasswordScreen() {
  return (
    <Suspense fallback={<ResetPasswordFallback />}>
      <ResetPasswordContent />
    </Suspense>
  )
}
