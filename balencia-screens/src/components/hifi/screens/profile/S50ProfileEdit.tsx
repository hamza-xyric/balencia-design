'use client'

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react'
import { Calendar, Camera, Check, ChevronLeft, ChevronRight, Copy, Globe, Info, Mail, Phone, Trash2, User, X } from 'lucide-react'
import { BtnGhost, BtnPrimary, Chip, GlassCard, HifiShell, ProgressBar, SectionTitle, SolidCard } from '@/components/hifi/kit'
import { persona } from '@/data/hifi/persona'

const PROFILE_STATES = ['default', 'partial', 'skeleton', 'error', 'offline', 'success', 'invalid'] as const
const PROFILE_PANELS = ['closed', 'photo-consent', 'picker-preview', 'discard', 'delete', 'demographic'] as const
const PHOTO_CONSENT_STATES = ['unknown', 'declined', 'accepted', 'revoked'] as const
const DATA_CONTROLS = ['Category', 'Source', 'Scope', 'Freshness', 'Retention', 'Export', 'Revoke', 'Delete'] as const

type ProfileState = (typeof PROFILE_STATES)[number]
type ProfilePanel = (typeof PROFILE_PANELS)[number]
type PhotoConsentState = (typeof PHOTO_CONSENT_STATES)[number]
type DemographicField = 'dateOfBirth' | 'gender' | 'timezone'

const PROFILE_STATE_STATUS: Record<ProfileState, string> = {
  default: 'Profile form is unchanged. No account, media, clipboard, storage, or network action has occurred.',
  partial: 'Day-1 fixture: first and last name are present; six optional profile signals remain honest-null.',
  skeleton: 'Loading the bundled profile form. No account, media, clipboard, storage, or network action is running.',
  error: 'Couldn’t save this local preview. Your edits remain visible; no account or network request occurred.',
  offline: 'Offline preview. Your local edits are preserved, and Save is disabled until a connection is available.',
  success: 'Profile outcome updated in this local preview. No account, storage, clipboard, media, or network state changed.',
  invalid: 'Review the text validation message below. Color is not the only error signal.',
}

type ProfileForm = {
  firstName: string
  lastName: string
  phone: string
  about: string
  dateOfBirth: string
  gender: string
  timezone: string
}

const DEFAULT_FORM: ProfileForm = {
  firstName: persona.firstName,
  lastName: persona.lastName,
  phone: persona.phone,
  about: '',
  dateOfBirth: persona.dateOfBirth,
  gender: 'Prefer not to say',
  timezone: persona.timezone,
}

const PARTIAL_FORM: ProfileForm = {
  firstName: persona.firstName,
  lastName: persona.lastName,
  phone: '',
  about: '',
  dateOfBirth: '',
  gender: '',
  timezone: '',
}

const DEMOGRAPHIC_OPTIONS: Record<DemographicField, readonly string[]> = {
  dateOfBirth: ['1 Jan 1996', '2 Jan 1996'],
  gender: ['Prefer not to say', 'Woman'],
  timezone: ['Asia/Dubai', 'Asia/Karachi'],
}

function isProfileState(value: string | null): value is ProfileState {
  return PROFILE_STATES.some(state => state === value)
}

function isProfilePanel(value: string | null): value is ProfilePanel {
  return PROFILE_PANELS.some(panel => panel === value)
}

function isPhotoConsentState(value: string | null): value is PhotoConsentState {
  return PHOTO_CONSENT_STATES.some(state => state === value)
}

function isDemographicField(value: string | null): value is DemographicField {
  return value === 'dateOfBirth' || value === 'gender' || value === 'timezone'
}

function ModalFrame({
  title,
  titleId,
  role = 'dialog',
  onClose,
  children,
}: {
  title: string
  titleId: string
  role?: 'dialog' | 'alertdialog'
  onClose: () => void
  children: ReactNode
}) {
  const dialogRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    dialogRef.current?.querySelector<HTMLElement>('button:not(:disabled), input:not(:disabled), textarea:not(:disabled), [href]')?.focus()
    return () => {
      if (previousFocus?.isConnected) previousFocus.focus()
    }
  }, [])

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
      return
    }
    if (event.key !== 'Tab') return
    const focusable = [...(dialogRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), textarea:not(:disabled), [href]') ?? [])]
    if (!focusable.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <div className="absolute inset-0 z-[70] flex items-end bg-ink-900/90 p-3 pb-[44px]" role="presentation" onMouseDown={event => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section ref={dialogRef} role={role} aria-modal="true" aria-labelledby={titleId} className="glass-card max-h-[735px] w-full overflow-y-auto p-5 shadow-3" onKeyDown={handleKeyDown}>
        <div className="flex items-center justify-between gap-3">
          <h2 id={titleId} className="text-[18px] font-semibold text-paper-100">{title}</h2>
          <button type="button" className="focus-ring flex h-11 w-11 items-center justify-center rounded-full text-paper-100/70" aria-label={`Close ${title.toLowerCase()}`} onClick={onClose}>
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        {children}
      </section>
    </div>
  )
}

function ProfileHeader({ onBack, onInfo }: { onBack: () => void; onInfo: () => void }) {
  return (
    <header className="z-30 flex min-h-[58px] shrink-0 items-center gap-3 bg-ink-900/40 px-4 backdrop-blur-md">
      <button type="button" className="focus-ring flex h-11 w-11 items-center justify-center rounded-full text-paper-100/75" aria-label="Back to Me" onClick={onBack}>
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>
      <h1 className="min-w-0 flex-1 truncate text-[17px] font-semibold leading-6 text-paper-100">Edit profile</h1>
      <button type="button" className="focus-ring flex h-11 w-11 items-center justify-center rounded-full text-paper-100/70" aria-label="Profile completeness details" onClick={onInfo}>
        <Info className="h-5 w-5" aria-hidden="true" />
      </button>
    </header>
  )
}

function TextField({
  id,
  label,
  type = 'text',
  autoComplete,
  value,
  placeholder,
  error,
  onChange,
}: {
  id: string
  label: string
  type?: 'text' | 'tel'
  autoComplete: 'given-name' | 'family-name' | 'tel'
  value: string
  placeholder: string
  error?: string
  onChange: (value: string) => void
}) {
  const errorId = `${id}-error`
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-[12px] font-medium text-paper-100/75">{label}</label>
      <div className={`glass-pill flex h-[52px] items-center gap-3 px-4 focus-within:border-brand-orange focus-within:shadow-[var(--focus-ring)] ${error ? 'border-brand-orange' : ''}`}>
        {type === 'tel' && <Phone className="h-4 w-4 shrink-0 text-paper-100/65" aria-hidden="true" />}
        <input
          id={id}
          type={type}
          autoComplete={autoComplete}
          inputMode={type === 'tel' ? 'tel' : 'text'}
          className="h-11 min-w-0 flex-1 bg-transparent text-[16px] text-paper-100 outline-none placeholder:text-paper-100/55"
          placeholder={placeholder}
          value={value}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onChange={event => onChange(event.target.value)}
        />
      </div>
      {error && <p id={errorId} className="text-[12px] leading-5 text-paper-100" role="alert">{error}</p>}
    </div>
  )
}

function StateBanner({ state }: { state: ProfileState }) {
  const message = state === 'default' ? undefined : PROFILE_STATE_STATUS[state]
  if (!message) return null
  return (
    <div className={`rounded-xl border px-4 py-3 text-[12px] leading-5 text-paper-100/80 ${state === 'success' ? 'border-forest-green/30 bg-forest-green/10' : 'border-brand-orange/25 bg-brand-orange/10'}`} role={state === 'invalid' || state === 'error' ? 'alert' : 'status'}>
      {message}
    </div>
  )
}

export function S50ProfileEdit() {
  const [profileState, setProfileState] = useState<ProfileState>('default')
  const [panel, setPanel] = useState<ProfilePanel>('closed')
  const [photoConsent, setPhotoConsent] = useState<PhotoConsentState>('unknown')
  const [form, setForm] = useState<ProfileForm>(DEFAULT_FORM)
  const [baseline, setBaseline] = useState<ProfileForm>(DEFAULT_FORM)
  const [demographicField, setDemographicField] = useState<DemographicField>('dateOfBirth')
  const [selectedControl, setSelectedControl] = useState<(typeof DATA_CONTROLS)[number] | null>(null)
  const [dialogStatus, setDialogStatus] = useState('Review the privacy-first photo disclosure before choosing.')
  const [status, setStatus] = useState(PROFILE_STATE_STATUS.default)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const requestedState = params.get('state')
    const requestedPanel = params.get('panel')
    const requestedConsent = params.get('consent')
    const requestedDirty = params.get('dirty') ?? params.get('form')
    const requestedField = params.get('field')
    queueMicrotask(() => {
      let nextBaseline = DEFAULT_FORM
      let nextForm = DEFAULT_FORM

      if (requestedState === 'partial') {
        nextBaseline = PARTIAL_FORM
        nextForm = PARTIAL_FORM
      } else if (requestedState === 'offline') {
        nextForm = { ...DEFAULT_FORM, about: 'Offline edit preserved locally' }
      } else if (requestedState === 'error') {
        nextForm = { ...DEFAULT_FORM, about: 'Edit preserved for retry' }
      } else if (requestedState === 'invalid') {
        nextForm = { ...DEFAULT_FORM, phone: 'invalid phone' }
      }

      if (requestedDirty === 'valid' || requestedDirty === 'dirty-valid') nextForm = { ...nextBaseline, about: 'Training for a balanced season' }
      if (requestedDirty === 'invalid' || requestedDirty === 'dirty-invalid') nextForm = { ...nextBaseline, phone: 'invalid phone' }
      if (requestedPanel === 'discard' || requestedPanel === 'unsaved-exit') nextForm = { ...nextForm, about: nextForm.about || 'Unsaved local edit' }

      setBaseline(nextBaseline)
      setForm(nextForm)
      if (isProfileState(requestedState)) {
        setProfileState(requestedState)
        setStatus(PROFILE_STATE_STATUS[requestedState])
      }
      if (requestedPanel === 'unsaved-exit') setPanel('discard')
      else if (requestedPanel === 'delete-confirm') setPanel('delete')
      else if (isProfilePanel(requestedPanel)) setPanel(requestedPanel)
      if (isPhotoConsentState(requestedConsent)) setPhotoConsent(requestedConsent)
      if (isDemographicField(requestedField)) setDemographicField(requestedField)
    })
  }, [])

  const dirty = Object.keys(form).some(key => form[key as keyof ProfileForm] !== baseline[key as keyof ProfileForm])
  const firstNameError = form.firstName.trim() ? undefined : 'First name is required.'
  const lastNameError = form.lastName.trim() ? undefined : 'Last name is required.'
  const phoneError = form.phone.trim() && !/^\+?[0-9 ()-]{7,}$/.test(form.phone.trim()) ? 'Enter a valid phone number or leave this optional field empty.' : undefined
  const valid = !firstNameError && !lastNameError && !phoneError
  const completenessSignals = [false, Boolean(form.firstName.trim()), Boolean(form.lastName.trim()), Boolean(form.phone.trim()), Boolean(form.dateOfBirth), Boolean(form.gender), Boolean(form.timezone), Boolean(form.about.trim())]
  const completedCount = completenessSignals.filter(Boolean).length
  const completionPercent = Math.round((completedCount / 8) * 100)
  const remainingCount = 8 - completedCount
  const offline = profileState === 'offline'
  const saveDisabled = !dirty || !valid || offline
  const saveReason = offline
    ? 'Save disabled offline. Your local edits remain in this preview.'
    : !dirty
      ? 'Save disabled because the form is unchanged.'
      : !valid
        ? 'Save disabled until the text errors are fixed.'
        : 'Save is available for this valid local edit; optional completeness does not block it.'

  const updateField = <Key extends keyof ProfileForm>(key: Key, value: ProfileForm[Key]) => {
    const nextForm = { ...form, [key]: value }
    const nextPhoneInvalid = nextForm.phone.trim() && !/^\+?[0-9 ()-]{7,}$/.test(nextForm.phone.trim())
    const nextFormValid = Boolean(nextForm.firstName.trim() && nextForm.lastName.trim() && !nextPhoneInvalid)
    setForm(nextForm)
    if (profileState === 'success' || (profileState === 'invalid' && nextFormValid)) {
      setProfileState('default')
      if (profileState === 'invalid') setStatus('Profile validation errors resolved locally. Review the valid unsaved changes before saving.')
    } else if (profileState === 'invalid') {
      setStatus(PROFILE_STATE_STATUS.invalid)
    }
  }

  const handleBack = () => {
    if (dirty) {
      setPanel('discard')
      return
    }
    window.location.assign('/screens/17')
  }

  const handleSave = () => {
    if (profileState === 'error') {
      setStatus('Save failed in this deterministic error fixture. Your local edits are preserved; no account or network request occurred.')
      return
    }
    if (saveDisabled) return
    setBaseline(form)
    setProfileState('success')
    setStatus('Profile save outcome completed locally. No account, storage, media, clipboard, or network state changed.')
  }

  const closePanel = () => setPanel('closed')

  const overlay = panel === 'photo-consent' ? (
    <ModalFrame key="photo-consent" title="Profile photo consent" titleId="profile-photo-consent-title" onClose={closePanel}>
      <p className="mt-3 text-[13px] leading-5 text-paper-100/80">
        This preview covers a profile photo only. The current avatar remains honest-null, and no camera roll or file picker will open.
      </p>
      <p className="mt-2 text-[12px] leading-5 text-paper-100/70">Audience: your profile preview · Source: none selected · Retention: none · Current image: none.</p>
      <div className="mt-4 grid grid-cols-2 gap-2" role="group" aria-label="Profile photo data controls">
        {DATA_CONTROLS.map(control => (
          <button
            key={control}
            type="button"
            aria-pressed={selectedControl === control}
            className={`focus-ring min-h-12 rounded-xl border px-3 text-[12px] font-semibold ${selectedControl === control ? 'border-brand-orange bg-brand-orange/15 text-paper-100' : 'border-white/12 bg-white/[0.03] text-paper-100/75'}`}
            onClick={() => {
              setSelectedControl(control)
              setDialogStatus(`${control} reviewed for the honest-null photo preview. No photo, permission, export, revoke, or deletion occurred.`)
            }}
          >
            {control}
          </button>
        ))}
      </div>
      <p className="mt-3 min-h-10 text-[12px] leading-5 text-paper-100/70" role="status" aria-live="polite">{dialogStatus}</p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <button type="button" className="focus-ring min-h-12 rounded-pill border border-white/15 px-3 text-[13px] font-medium text-paper-100" onClick={() => {
          setPhotoConsent('declined')
          setStatus('Profile photo consent declined. The honest-null avatar remains, and no media capability was invoked.')
          closePanel()
        }}>Not now</button>
        <button type="button" className="focus-ring min-h-12 rounded-pill border border-white/15 px-3 text-[13px] font-medium text-paper-100" onClick={() => {
          setPhotoConsent('accepted')
          setStatus('Profile photo consent accepted for a local picker preview only. No file or media capability was invoked.')
          setPanel('picker-preview')
        }}>Allow local preview</button>
      </div>
    </ModalFrame>
  ) : panel === 'picker-preview' ? (
    <ModalFrame key="picker-preview" title="Photo picker preview" titleId="profile-picker-preview-title" onClose={closePanel}>
      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-5 text-center">
        <Camera className="mx-auto h-7 w-7 text-paper-100/65" aria-hidden="true" />
        <p className="mt-3 text-[14px] font-semibold text-paper-100">No image selected</p>
        <p className="mt-2 text-[12px] leading-5 text-paper-100/70">This is an honest picker-preview state. No file input exists, and no camera, library, media, or OS permission was opened.</p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button type="button" className="focus-ring min-h-12 rounded-pill border border-white/15 px-3 text-[13px] font-medium text-paper-100" onClick={closePanel}>Keep consent</button>
        <button type="button" className="focus-ring min-h-12 rounded-pill border border-white/15 px-3 text-[13px] font-medium text-paper-100" onClick={() => {
          setPhotoConsent('revoked')
          setStatus('Profile photo consent revoked locally. No file, photo, or provider data existed to delete.')
          closePanel()
        }}>Revoke consent</button>
      </div>
    </ModalFrame>
  ) : panel === 'discard' ? (
    <ModalFrame key="discard" title="Discard unsaved changes?" titleId="profile-discard-title" role="alertdialog" onClose={closePanel}>
      <p className="mt-3 text-[13px] leading-5 text-paper-100/80">Your local edits have not been saved. Keep editing to preserve the current values, or discard and return to Me.</p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button type="button" className="focus-ring min-h-12 rounded-pill border border-white/15 px-3 text-[13px] font-medium text-paper-100" onClick={closePanel}>Keep editing</button>
        <button type="button" className="focus-ring min-h-12 rounded-pill border border-white/15 px-3 text-[13px] font-medium text-paper-100" onClick={() => window.location.assign('/screens/17')}>Discard and return</button>
      </div>
    </ModalFrame>
  ) : panel === 'delete' ? (
    <ModalFrame key="delete" title="Delete account preview" titleId="profile-delete-title" role="alertdialog" onClose={closePanel}>
      <p className="mt-3 text-[13px] leading-5 text-paper-100/80">This visual prototype cannot delete an account or member data. Reviewing this outcome will not contact a server or alter storage.</p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button type="button" className="focus-ring min-h-12 rounded-pill border border-white/15 px-3 text-[13px] font-medium text-paper-100" onClick={closePanel}>Keep account</button>
        <button type="button" className="focus-ring min-h-12 rounded-pill border border-white/15 px-3 text-[13px] font-medium text-paper-100" onClick={() => {
          setStatus('Delete-account outcome reviewed locally. No account, member data, storage, or network state changed.')
          closePanel()
        }}>Review locally</button>
      </div>
    </ModalFrame>
  ) : panel === 'demographic' ? (
    <ModalFrame key={`demographic-${demographicField}`} title={`Update ${demographicField === 'dateOfBirth' ? 'date of birth' : demographicField}`} titleId="profile-demographic-title" onClose={closePanel}>
      <p className="mt-3 text-[12px] leading-5 text-paper-100/70">Choose a bundled local value. No account storage or network request will occur.</p>
      <div className="mt-4 space-y-2">
        {DEMOGRAPHIC_OPTIONS[demographicField].map(option => (
          <button key={option} type="button" className="focus-ring flex min-h-12 w-full items-center justify-between rounded-xl border border-white/12 px-4 text-[13px] text-paper-100" onClick={() => {
            updateField(demographicField, option)
            setStatus(`${demographicField === 'dateOfBirth' ? 'Date of birth' : demographicField} changed to ${option} in this local preview. No account value was stored.`)
            closePanel()
          }}>
            {option}
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        ))}
      </div>
    </ModalFrame>
  ) : undefined

  const bottomAction = (
    <div className="space-y-2 px-4 pb-3 pt-2">
      <BtnPrimary className="w-full" disabled={saveDisabled} aria-describedby="profile-save-reason" onClick={handleSave}>Save changes</BtnPrimary>
      <p id="profile-save-reason" className="text-center text-[12px] leading-4 text-paper-100/70" role="status" aria-live="polite">{saveReason}</p>
    </div>
  )

  return (
    <HifiShell
      header={<ProfileHeader onBack={handleBack} onInfo={() => setStatus(`Profile completeness is ${completedCount} of 8, ${completionPercent} percent. Completeness is optional and does not block a valid edit.`)} />}
      showTabBar={false}
      atmosphere="you"
      overlay={overlay}
      bottomAction={bottomAction}
    >
      <main
        className="space-y-6 px-4 pb-5 pt-3"
        data-profile-state={profileState}
        data-form-dirty={dirty ? 'true' : 'false'}
        data-form-valid={valid ? 'true' : 'false'}
        data-photo-consent={photoConsent}
        data-profile-panel={panel}
        aria-busy={profileState === 'skeleton' || undefined}
      >
        <StateBanner state={profileState} />

        {profileState === 'skeleton' ? (
          <div className="space-y-4" aria-label="Loading profile edit preview">
            <div className="skeleton-block mx-auto h-24 w-24 rounded-full" />
            <div className="skeleton-block h-40 rounded-xl" />
            {[0, 1, 2, 3].map(item => <div key={item} className="skeleton-block h-[52px] rounded-pill" />)}
          </div>
        ) : (
          <>
            <section className="flex flex-col items-center gap-2.5 pt-1" aria-labelledby="profile-photo-title">
              <h2 id="profile-photo-title" className="sr-only">Profile photo</h2>
              <button
                type="button"
                aria-label="Profile photo not added. Review consent before previewing a photo picker."
                className="focus-ring relative flex h-24 w-24 items-center justify-center rounded-full border border-white/15 bg-white/[0.04]"
                onClick={() => setPanel(photoConsent === 'accepted' ? 'picker-preview' : 'photo-consent')}
              >
                <User className="h-9 w-9 text-paper-100/55" aria-hidden="true" />
                <span aria-hidden="true" className="absolute bottom-0 right-0 flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink-900 bg-white/10"><Camera className="h-5 w-5 text-paper-100/85" /></span>
              </button>
              <p className="text-[13px] font-medium text-paper-100/70">No profile photo · consent {photoConsent}</p>
            </section>

            <GlassCard tone="cia">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-paper-100/70">Profile completeness</p>
                <span className="rounded-pill border border-white/12 px-3 py-1.5 text-[12px] text-paper-100/70">You logged</span>
              </div>
              <div className="mt-3 flex items-baseline gap-2" aria-live="polite" aria-atomic="true">
                <span className="text-[30px] font-semibold leading-none tabular-nums text-paper-100">{completedCount} of 8</span>
                <span className="text-[14px] text-paper-100/70">Complete</span>
              </div>
              <div className="mt-4" role="progressbar" aria-valuemin={0} aria-valuemax={8} aria-valuenow={completedCount} aria-valuetext={`${completedCount} of 8 complete, ${completionPercent} percent, ${remainingCount} remaining`}>
                <ProgressBar value={completionPercent} tone="you" />
              </div>
              <p className="mt-2 text-[12px] text-paper-100/70">{completionPercent}% · {remainingCount} optional {remainingCount === 1 ? 'signal' : 'signals'} remaining</p>
              <p className="mt-3 border-t border-white/[0.07] pt-3 text-[13px] leading-5 text-paper-100/75">Completeness helps CIA personalise context, but it never blocks a valid profile edit.</p>
            </GlassCard>

            <section className="space-y-3" aria-labelledby="profile-identity-title">
              <div id="profile-identity-title"><SectionTitle title="Identity" /></div>
              <TextField id="profile-first-name" label="First name" autoComplete="given-name" value={form.firstName} placeholder="Enter first name" error={firstNameError} onChange={value => updateField('firstName', value)} />
              <TextField id="profile-last-name" label="Last name" autoComplete="family-name" value={form.lastName} placeholder="Enter last name" error={lastNameError} onChange={value => updateField('lastName', value)} />
              <div className="space-y-1.5">
                <label htmlFor="profile-about" className="text-[12px] font-medium text-paper-100/75">About you (optional)</label>
                <div className="glass-pill rounded-[20px] px-4 py-3 focus-within:border-brand-orange focus-within:shadow-[var(--focus-ring)]">
                  <textarea
                    id="profile-about"
                    rows={4}
                    maxLength={160}
                    className="w-full resize-none bg-transparent text-[16px] leading-6 text-paper-100 outline-none placeholder:text-paper-100/55"
                    placeholder="Tell CIA what matters right now"
                    value={form.about}
                    aria-describedby="profile-about-counter"
                    onChange={event => updateField('about', event.target.value)}
                  />
                </div>
                <p id="profile-about-counter" className="text-right text-[12px] tabular-nums text-paper-100/70">{form.about.length} / 160 characters</p>
              </div>
            </section>

            <section className="space-y-3" aria-labelledby="profile-contact-title">
              <div id="profile-contact-title"><SectionTitle title="Contact" /></div>
              <SolidCard className="!p-0">
                <div className="flex min-h-14 items-center justify-between gap-3 px-4 py-3">
                  <span className="flex min-w-0 items-center gap-3"><Mail className="h-4 w-4 shrink-0 text-paper-100/65" aria-hidden="true" /><span className="truncate text-[13px] text-paper-100/80">{persona.email}</span></span>
                  <span className="flex shrink-0 items-center gap-1"><Chip tone="done"><span className="flex items-center gap-1 text-[12px]"><Check className="h-3 w-3" aria-hidden="true" />Verified</span></Chip><button type="button" className="focus-ring flex h-11 w-11 items-center justify-center rounded-full text-paper-100/70" aria-label="Copy email address" onClick={() => setStatus('Copy email preview selected. The clipboard was not accessed and no text was copied.')}><Copy className="h-4 w-4" aria-hidden="true" /></button></span>
                </div>
              </SolidCard>
              <TextField id="profile-phone" label="Phone (optional)" type="tel" autoComplete="tel" value={form.phone} placeholder="Enter phone number" error={phoneError} onChange={value => updateField('phone', value)} />
            </section>

            <section className="space-y-2.5" aria-labelledby="profile-demographics-title">
              <div id="profile-demographics-title"><SectionTitle title="Demographics" /></div>
              {([
                { key: 'dateOfBirth' as const, icon: Calendar, label: 'Date of birth', value: form.dateOfBirth || 'Not set' },
                { key: 'gender' as const, icon: User, label: 'Gender', value: form.gender || 'Not set' },
                { key: 'timezone' as const, icon: Globe, label: 'Timezone', value: form.timezone || 'Not set' },
              ]).map(item => {
                const Icon = item.icon
                return (
                  <button key={item.key} type="button" aria-label={`Change ${item.label.toLowerCase()}, currently ${item.value}`} className="focus-ring flex min-h-14 w-full items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left" onClick={() => {
                    setDemographicField(item.key)
                    setPanel('demographic')
                  }}>
                    <span className="flex items-center gap-3"><Icon className="h-4 w-4 text-paper-100/65" aria-hidden="true" /><span className="text-[14px] font-medium text-paper-100">{item.label}</span></span>
                    <span className="flex items-center gap-2"><span className="text-[13px] text-paper-100/70">{item.value}</span><ChevronRight className="h-4 w-4 text-paper-100/55" aria-hidden="true" /></span>
                  </button>
                )
              })}
            </section>

            <div className="pt-1">
              <BtnGhost quiet className="mx-auto w-fit gap-2 text-error-red" onClick={() => setPanel('delete')}><Trash2 className="h-4 w-4" aria-hidden="true" />Delete account</BtnGhost>
            </div>

            <p className="min-h-10 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-[12px] leading-5 text-paper-100/70" role="status" aria-live="polite" aria-atomic="true">{status}</p>
          </>
        )}
      </main>
    </HifiShell>
  )
}
