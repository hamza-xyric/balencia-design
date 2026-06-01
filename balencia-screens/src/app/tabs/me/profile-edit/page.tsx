'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, Camera, Check, ChevronDown, MapPin } from 'lucide-react'
import type { InputHTMLAttributes, ReactNode } from 'react'
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
  onChange?: (value: string) => void
  disabled?: boolean
  right?: ReactNode
  prefix?: ReactNode
  type?: string
  inputMode?: InputHTMLAttributes<HTMLInputElement>['inputMode']
}

type PickerKind = 'gender' | 'country' | 'timezone'

const initialProfile = {
  first: 'Amira',
  last: 'Rahman',
  dob: '15/03/1998',
  gender: 'Female',
  phone: '55 123 4567',
  timezone: 'Asia/Dubai (GMT+4)',
}

function ProfileField({ label, value, onChange, disabled = false, right, prefix, type = 'text', inputMode }: ProfileFieldProps) {
  const id = `profile-${label.toLowerCase().replaceAll(' ', '-')}`

  return (
    <div
      className={[
        'flex min-h-[64px] items-center overflow-hidden rounded-md border bg-ink-brown-800',
        disabled ? 'border-white/[0.05] opacity-70' : 'border-white/10',
      ].join(' ')}
    >
      {prefix && (
        <div className="flex h-full w-[72px] shrink-0 items-center justify-center border-r border-white/10 text-[14px] leading-5 text-white">
          {prefix}
        </div>
      )}
      <div className="min-w-0 flex-1 px-4">
        <label htmlFor={id} className="text-[11px] font-semibold leading-[14px] text-white/40">{label}</label>
        <input
          id={id}
          type={type}
          value={value}
          inputMode={inputMode}
          onChange={(event) => onChange?.(event.target.value)}
          readOnly={disabled}
          className={disabled ? 'mt-0.5 h-11 w-full truncate bg-transparent text-[15px] leading-5 text-white/50 outline-none' : 'mt-0.5 h-11 w-full truncate bg-transparent text-[15px] leading-5 text-white outline-none'}
          aria-readonly={disabled}
        />
      </div>
      {right && <div className="shrink-0 pr-4 text-white/50">{right}</div>}
    </div>
  )
}

function PickerField({
  label,
  value,
  onClick,
  right,
  prefix,
}: {
  label: string
  value: string
  onClick: () => void
  right?: ReactNode
  prefix?: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-[64px] w-full items-center overflow-hidden rounded-md border border-white/10 bg-ink-brown-800 text-left"
      aria-label={`Open ${label.toLowerCase()} picker`}
    >
      {prefix && (
        <span className="flex h-full w-[72px] shrink-0 items-center justify-center border-r border-white/10 text-[14px] leading-5 text-white">
          {prefix}
        </span>
      )}
      <span className="min-w-0 flex-1 px-4">
        <span className="block text-[11px] font-semibold leading-[14px] text-white/40">{label}</span>
        <span className="mt-0.5 block truncate text-[15px] leading-[44px] text-white">{value}</span>
      </span>
      <span className="shrink-0 pr-4 text-white/50">{right ?? <ChevronDown size={18} strokeWidth={1.8} />}</span>
    </button>
  )
}

function AvatarSection() {
  const [open, setOpen] = useState(false)

  return (
    <section className="flex flex-col items-center pt-6 text-center animate-fade-up">
      <button type="button" onClick={() => setOpen(true)} className="relative" aria-label="Change profile photo">
        <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/15 bg-ink-brown-800 text-[28px] font-bold text-white/70 shadow-1">
          {user.avatar}
        </span>
        <span className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-ink-brown-800 text-white/80">
          <Camera size={15} strokeWidth={1.8} />
        </span>
      </button>
      <button type="button" onClick={() => setOpen(true)} className="mt-2 h-11 text-[13px] leading-[18px] text-brand-orange">
        Change photo
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 px-4 pb-4" role="dialog" aria-modal="true" aria-label="Profile photo options">
          <div className="w-full max-w-[390px] rounded-t-xl border border-white/10 bg-ink-900 p-5 shadow-2">
            <div className="mx-auto h-1 w-10 rounded-pill bg-white/20" />
            <h2 className="mt-4 text-[18px] font-semibold leading-6 text-white">Profile photo</h2>
            <p className="mt-2 text-[14px] leading-5 text-white/60">Use a system photo sheet in production. This prototype documents the final choices for Figma.</p>
            <div className="mt-4 grid gap-2">
              {['Take photo', 'Choose photo', 'Remove photo'].map((option) => (
                <button key={option} type="button" onClick={() => setOpen(false)} className="min-h-11 rounded-md border border-white/10 bg-ink-brown-800 px-4 text-left text-[15px] font-semibold text-white/70">
                  {option}
                </button>
              ))}
              <button type="button" onClick={() => setOpen(false)} className="min-h-11 rounded-pill text-[15px] font-semibold text-white/50">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default function ProfileEditScreen() {
  const router = useRouter()
  const [form, setForm] = useState(initialProfile)
  const [countryCode, setCountryCode] = useState('+971')
  const [picker, setPicker] = useState<PickerKind | null>(null)
  const [saved, setSaved] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteText, setDeleteText] = useState('')
  const [deleteStatus, setDeleteStatus] = useState<'idle' | 'loading'>('idle')
  const dirty = useMemo(() => !saved && Object.entries(initialProfile).some(([key, value]) => form[key as keyof typeof form] !== value), [form, saved])
  const valid = form.first.trim().length > 1 && form.last.trim().length > 1 && form.phone.trim().length >= 8 && form.dob.trim().length >= 8

  function update(key: keyof typeof form, value: string) {
    setSaved(false)
    setForm((current) => ({ ...current, [key]: value }))
  }

  const pickerOptions: Record<PickerKind, string[]> = {
    gender: ['Female', 'Male', 'Non-binary', 'Prefer not to say'],
    country: ['+971 United Arab Emirates', '+1 United States', '+44 United Kingdom', '+92 Pakistan'],
    timezone: ['Asia/Dubai (GMT+4)', 'Asia/Karachi (GMT+5)', 'Europe/London (GMT+1)', 'America/New_York (GMT-4)'],
  }

  const choosePickerOption = (value: string) => {
    if (picker === 'gender') update('gender', value)
    if (picker === 'country') setCountryCode(value.split(' ')[0])
    if (picker === 'timezone') update('timezone', value)
    setPicker(null)
  }

  const closeDeleteDialog = () => {
    setDeleteOpen(false)
    setDeleteText('')
    setDeleteStatus('idle')
  }

  const confirmDelete = () => {
    if (deleteText !== 'DELETE') return
    setDeleteStatus('loading')
    window.setTimeout(() => router.push('/auth/splash'), 650)
  }

  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Edit profile" showBack />} showTabBar={false}>
        <main className="px-4 pb-12" aria-hidden={deleteOpen}>
          <AvatarSection />

          <section className="mt-3 space-y-4 animate-fade-up" style={{ animationDelay: '120ms' }}>
            <ProfileField label="First name" value={form.first} onChange={(value) => update('first', value)} />
            <ProfileField label="Last name" value={form.last} onChange={(value) => update('last', value)} />
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
            <ProfileField label="Date of birth" value={form.dob} inputMode="numeric" onChange={(value) => update('dob', value)} right={<Calendar size={18} strokeWidth={1.8} />} />
            <PickerField label="Gender" value={form.gender} onClick={() => setPicker('gender')} />
            <ProfileField
              label="Phone number"
              value={form.phone}
              onChange={(value) => update('phone', value)}
              prefix={<button type="button" onClick={() => setPicker('country')} className="flex h-full w-full items-center justify-center font-semibold" aria-label="Open country code picker">{countryCode}</button>}
            />
            <PickerField
              label="Timezone"
              value={form.timezone}
              onClick={() => setPicker('timezone')}
              prefix={<span className="rounded-pill border border-white/10 px-2 py-1 text-[10px] font-semibold leading-[12px] text-white/40">Auto</span>}
              right={<MapPin size={18} strokeWidth={1.8} />}
            />
          </section>

          <section className="mt-8 animate-fade-up" style={{ animationDelay: '240ms' }}>
            <Button
              size="auth"
              fullWidth
              disabled={!dirty || !valid}
              onClick={() => {
                setSaved(true)
                window.setTimeout(() => router.push('/tabs/me'), 650)
              }}
            >
              Save changes
            </Button>
            {saved && <p className="mt-3 text-center text-[13px] font-semibold leading-[18px] text-forest-green" aria-live="polite">Profile saved. Returning to Me.</p>}
          </section>

          <button type="button" onClick={() => setDeleteOpen(true)} className="mt-12 flex h-11 w-full items-center justify-center text-[15px] leading-5 text-error-red animate-fade-up" style={{ animationDelay: '320ms' }}>
            Delete account
          </button>
        </main>
        {deleteOpen && (
          <div className="absolute inset-0 z-40 flex items-end bg-ink-900/75 px-4 pb-10" role="alertdialog" aria-modal="true" aria-labelledby="delete-account-title" aria-describedby="delete-account-description">
            <section className="w-full rounded-2xl border border-error-red/35 bg-ink-brown-800 p-5 shadow-3">
              <h2 id="delete-account-title" className="text-[18px] font-semibold leading-[24px] text-white">Delete account?</h2>
              <p id="delete-account-description" className="mt-2 text-[13px] leading-[18px] text-white/60">
                This signs you out, clears profile data in this prototype session, and returns to the welcome screen. You can cancel safely.
              </p>
              <label htmlFor="delete-account-confirm" className="mt-4 block text-caption font-semibold leading-[18px] text-white/60">
                Type DELETE to confirm
              </label>
              <input
                id="delete-account-confirm"
                value={deleteText}
                onChange={(event) => setDeleteText(event.target.value)}
                autoFocus
                disabled={deleteStatus === 'loading'}
                className="mt-2 h-12 w-full rounded-md border border-white/10 bg-ink-900 px-3 text-white outline-none focus:border-error-red disabled:opacity-50"
              />
              <p className="mt-3 rounded-md bg-error-red/10 px-3 py-2 text-caption leading-[18px] text-error-red/90">
                Recovery note: if deletion fails, your account remains active and the local reset does not run.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button variant="skip" onClick={closeDeleteDialog} disabled={deleteStatus === 'loading'}>Cancel</Button>
                <Button disabled={deleteText !== 'DELETE' || deleteStatus === 'loading'} onClick={confirmDelete} className="bg-error-red">
                  {deleteStatus === 'loading' ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </section>
          </div>
        )}
        {picker && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 px-4 pb-4" role="dialog" aria-modal="true" aria-label={`${picker} picker`}>
            <div className="w-full max-w-[390px] rounded-t-xl border border-white/10 bg-ink-900 p-5 shadow-2">
              <div className="mx-auto h-1 w-10 rounded-pill bg-white/20" />
              <h2 className="mt-4 text-[18px] font-semibold capitalize leading-6 text-white">
                {picker === 'country' ? 'Country code' : picker}
              </h2>
              <div className="mt-4 grid gap-2">
                {pickerOptions[picker].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => choosePickerOption(option)}
                    className="min-h-11 rounded-md border border-white/10 bg-ink-brown-800 px-4 text-left text-[15px] font-semibold text-white/75"
                  >
                    {option}
                  </button>
                ))}
                <button type="button" onClick={() => setPicker(null)} className="min-h-11 rounded-pill text-[15px] font-semibold text-white/50">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </ScreenShell>
    </PhoneFrame>
  )
}
