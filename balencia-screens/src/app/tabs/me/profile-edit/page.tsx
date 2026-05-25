import { Calendar, Camera, Check, ChevronDown, MapPin } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button } from '@/components/design-system/Button'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { user } from '@/data/mock'

// Screen 50 of 78: Profile edit
// Spec: /Users/hamza/yHealth/app_design 3/50-profile-edit.md

type ProfileFieldProps = {
  label: string
  value: string
  disabled?: boolean
  right?: ReactNode
  prefix?: ReactNode
}

function ProfileField({ label, value, disabled = false, right, prefix }: ProfileFieldProps) {
  return (
    <div
      className={[
        'flex h-[52px] items-center overflow-hidden rounded-md border bg-ink-brown-800',
        disabled ? 'border-white/[0.05] opacity-70' : 'border-white/10',
      ].join(' ')}
    >
      {prefix && (
        <div className="flex h-full w-[72px] shrink-0 items-center justify-center border-r border-white/10 text-[14px] leading-5 text-white">
          {prefix}
        </div>
      )}
      <div className="min-w-0 flex-1 px-4">
        <p className="text-[11px] font-semibold leading-[14px] text-white/40">{label}</p>
        <p className={disabled ? 'mt-0.5 truncate text-[15px] leading-5 text-white/50' : 'mt-0.5 truncate text-[15px] leading-5 text-white'}>
          {value}
        </p>
      </div>
      {right && <div className="shrink-0 pr-4 text-white/50">{right}</div>}
    </div>
  )
}

function AvatarSection() {
  return (
    <section className="flex flex-col items-center pt-6 text-center animate-fade-up">
      <button className="relative">
        <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/15 bg-ink-brown-800 text-[28px] font-bold text-white/70 shadow-1">
          {user.avatar}
        </span>
        <span className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-ink-brown-800 text-white/80">
          <Camera size={15} strokeWidth={1.8} />
        </span>
      </button>
      <button className="mt-2 h-11 text-[13px] leading-[18px] text-brand-orange">
        Change photo
      </button>
    </section>
  )
}

export default function ProfileEditScreen() {
  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Edit profile" showBack />} showTabBar={false}>
        <main className="px-4 pb-12">
          <AvatarSection />

          <section className="mt-3 space-y-4 animate-fade-up" style={{ animationDelay: '120ms' }}>
            <ProfileField label="First name" value="Amira" />
            <ProfileField label="Last name" value="Rahman" />
            <ProfileField
              label="Email"
              value="amira@balencia.app"
              disabled
              right={
                <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-forest-green/15 text-forest-green">
                  <Check size={14} strokeWidth={2.2} />
                </span>
              }
            />
            <ProfileField label="Date of birth" value="15 March 1998" right={<Calendar size={18} strokeWidth={1.8} />} />
            <ProfileField label="Gender" value="Female" right={<ChevronDown size={18} strokeWidth={1.8} />} />
            <ProfileField
              label="Phone number"
              value="55 123 4567"
              prefix={<span className="font-semibold">+971</span>}
            />
            <ProfileField
              label="Timezone"
              value="Asia/Dubai (GMT+4)"
              prefix={<span className="rounded-pill border border-white/10 px-2 py-1 text-[10px] font-semibold leading-[12px] text-white/40">Auto</span>}
              right={<MapPin size={18} strokeWidth={1.8} />}
            />
          </section>

          <section className="mt-8 animate-fade-up" style={{ animationDelay: '240ms' }}>
            <Button size="auth" fullWidth>
              Save changes
            </Button>
          </section>

          <button className="mt-12 flex h-11 w-full items-center justify-center text-[15px] leading-5 text-error-red animate-fade-up" style={{ animationDelay: '320ms' }}>
            Delete account
          </button>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
