'use client'

import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { BrandSymbol } from '@/components/design-system/BrandSymbol'
import { Button } from '@/components/design-system/Button'
import { Input } from '@/components/design-system/Input'
import { Calendar, ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

// Screen 03d of 78: Complete profile
// Spec: /Users/hamza/yHealth/app_design 3/03d-complete-profile.md

export default function CompleteProfileScreen() {
  const router = useRouter()
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [gender, setGender] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const hasAnyProfileDetail = Boolean(dateOfBirth || gender)
  const isAdult = !dateOfBirth || new Date(dateOfBirth) <= new Date(new Date().setFullYear(new Date().getFullYear() - 18))
  const submit = () => {
    setSubmitted(true)
    if (!hasAnyProfileDetail || (dateOfBirth && gender && isAdult)) router.push('/auth/consent')
  }

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
            Personalize later
          </h1>
          <p
            className="mx-auto mt-2 max-w-[260px] animate-fade-up text-center text-[15px] leading-[22px] text-white/50"
            style={{ animationDelay: '120ms' }}
          >
            You can add age and gender later when a coaching moment explains why it helps.
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
              Optional now. SIA will ask with context before using sensitive profile details.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <div className="animate-fade-up" style={{ animationDelay: '240ms' }}>
              <Input
                name="dateOfBirth"
                type="date"
                placeholder="Date of birth"
                value={dateOfBirth}
                onChange={(event) => setDateOfBirth(event.target.value)}
                rightIcon={<Calendar size={20} aria-hidden="true" />}
                helperText={!submitted ? 'Optional for now. Leave both blank to continue.' : undefined}
                error={
                  submitted && hasAnyProfileDetail && !dateOfBirth
                    ? 'Add date of birth or clear gender to skip'
                    : submitted && !isAdult
                      ? 'Balencia is for users 18+'
                      : undefined
                }
              />
            </div>
            <div className="animate-fade-up" style={{ animationDelay: '300ms' }}>
              <label className="relative block">
                <select
                  name="gender"
                  value={gender}
                  onChange={(event) => setGender(event.target.value)}
                  className={[
                    'h-[52px] w-full appearance-none rounded-md border bg-ink-brown-800 px-4 pr-12 text-body outline-none transition-colors duration-[var(--dur-fast)]',
                    submitted && !gender ? 'border-2 border-error-red text-white/40' : 'border-white/10 text-white focus:border-2 focus:border-brand-orange',
                  ].join(' ')}
                >
                  <option value="">Gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="non_binary">Non-binary</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
                <ChevronDown size={18} aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/50" />
              </label>
              {submitted && hasAnyProfileDetail && !gender && (
                <span className="mt-2 block text-caption text-error-red">Add gender or clear date of birth to skip</span>
              )}
            </div>
          </div>

          <div className="mt-6 animate-fade-up" style={{ animationDelay: '360ms' }}>
            <Button size="auth" fullWidth onClick={submit}>
              Continue
            </Button>
          </div>
          <button
            onClick={() => router.push('/auth/consent')}
            className="mt-4 h-11 w-full text-[15px] font-semibold text-white/60 transition-colors hover:text-white"
          >
            Skip for now
          </button>
        </div>
      </ScreenShell>
    </PhoneFrame>
  )
}
