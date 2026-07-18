'use client'

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react'
import {
  ChevronRight,
  Globe,
  KeyRound,
  LogOut,
  Moon,
  PiggyBank,
  Plug,
  ShieldPlus,
  User,
  X,
} from 'lucide-react'
import { BtnSecondary, ComplianceFooter, HifiShell, SafetyCard, SolidCard, TopBar } from '@/components/hifi/kit'
import { persona } from '@/data/hifi/persona'

const SETTINGS_STATES = ['default', 'skeleton', 'partial', 'saving', 'error', 'offline', 'success'] as const
const SETTINGS_PANELS = ['closed', 'password', 'data-controls'] as const
const DATA_CONTROLS = ['Category', 'Source', 'Scope', 'Freshness', 'Retention', 'Export', 'Revoke', 'Delete'] as const

type SettingsState = (typeof SETTINGS_STATES)[number]
type SettingsPanel = (typeof SETTINGS_PANELS)[number]
type HardwareState = 'supported' | 'unsupported'
type SwitchKey = 'notifications' | 'backgroundSync' | 'faceId'

const SETTINGS_STATE_STATUS: Record<SettingsState, string> = {
  default: 'No settings have changed. This screen uses bundled visual fixtures only.',
  skeleton: 'Loading the bundled settings preview. No account, device, or network request is running.',
  partial: 'Some preferences are not configured yet. Honest-null rows remain available without guessed values.',
  saving: 'Applying this local preview. No preference is being sent, stored, or synced.',
  error: "Couldn't save that setting. The previous value is restored; no request left this prototype.",
  offline: 'Offline preview. Existing values remain visible, but device and account changes are disabled.',
  success: 'Local preference preview updated. No OS permission, biometric, account, or network action occurred.',
}

function isSettingsState(value: string | null): value is SettingsState {
  return SETTINGS_STATES.some(state => state === value)
}

function isSettingsPanel(value: string | null): value is SettingsPanel {
  return SETTINGS_PANELS.some(panel => panel === value)
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
    dialogRef.current?.querySelector<HTMLElement>('input, button, [href]')?.focus()
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

    const focusable = [...(dialogRef.current?.querySelectorAll<HTMLElement>('input:not(:disabled), button:not(:disabled), [href]') ?? [])]
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
    <div
      className="absolute inset-0 z-[70] flex items-end bg-ink-900/90 p-3 pb-[72px]"
      role="presentation"
      onMouseDown={event => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        ref={dialogRef}
        role={role}
        aria-modal="true"
        aria-labelledby={titleId}
        className="glass-card max-h-[690px] w-full overflow-y-auto p-5 shadow-3"
        onKeyDown={handleKeyDown}
      >
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

function RouteRow({ href, icon, label, value }: { href: string; icon: ReactNode; label: string; value?: string }) {
  return (
    <a href={href} className="focus-ring flex min-h-14 w-full items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-3 text-left last:border-b-0">
      <span className="flex min-w-0 items-center gap-3">
        <span aria-hidden="true" className="text-paper-100/65">{icon}</span>
        <span className="text-[14px] font-medium text-paper-100">{label}</span>
      </span>
      <span className="flex min-w-0 items-center gap-2">
        {value && <span className="truncate text-[12px] text-paper-100/70">{value}</span>}
        <ChevronRight className="h-5 w-5 shrink-0 text-paper-100/55" aria-hidden="true" />
      </span>
    </a>
  )
}

function LocalActionRow({ icon, label, value, onClick }: { icon?: ReactNode; label: string; value: string; onClick: () => void }) {
  return (
    <button type="button" className="focus-ring flex min-h-14 w-full items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-3 text-left last:border-b-0" onClick={onClick}>
      <span className="flex items-center gap-3">
        {icon && <span aria-hidden="true" className="text-paper-100/65">{icon}</span>}
        <span className="text-[14px] font-medium text-paper-100">{label}</span>
      </span>
      <span className="flex items-center gap-2">
        <span className="text-[12px] text-paper-100/70">{value}</span>
        <ChevronRight className="h-5 w-5 text-paper-100/55" aria-hidden="true" />
      </span>
    </button>
  )
}

function PreferenceSwitch({
  id,
  label,
  description,
  checked,
  disabled,
  describedBy,
  onChange,
}: {
  id: string
  label: string
  description: string
  checked: boolean
  disabled: boolean
  describedBy?: string
  onChange: () => void
}) {
  return (
    <label className={`focus-within:shadow-[var(--focus-ring)] flex min-h-14 items-center justify-between gap-4 rounded-lg px-4 py-3 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
      <span className="min-w-0">
        <span className="block text-[14px] font-medium text-paper-100">{label}</span>
        <span className="mt-0.5 block text-[12px] leading-4 text-paper-100/70">{description}</span>
      </span>
      <span className="relative flex h-11 w-14 shrink-0 items-center justify-center">
        <input
          id={id}
          type="checkbox"
          role="switch"
          className="peer sr-only"
          checked={checked}
          disabled={disabled}
          aria-describedby={describedBy}
          onChange={onChange}
        />
        <span aria-hidden="true" className="h-7 w-12 rounded-full border border-white/20 bg-white/10 transition-colors peer-checked:border-brand-orange peer-checked:bg-cta-ember peer-disabled:opacity-60 motion-reduce:transition-none" />
        <span aria-hidden="true" className="absolute left-[7px] h-5 w-5 rounded-full bg-paper-100 transition-transform peer-checked:translate-x-5 motion-reduce:transition-none" />
      </span>
    </label>
  )
}

function StateBanner({ state }: { state: SettingsState }) {
  const message = state === 'default' ? undefined : SETTINGS_STATE_STATUS[state]
  if (!message) return null
  const success = state === 'success'
  return (
    <div className={`rounded-xl border px-4 py-3 text-[12px] leading-5 text-paper-100/80 ${success ? 'border-forest-green/30 bg-forest-green/10' : 'border-brand-orange/25 bg-brand-orange/10'}`} role={state === 'error' ? 'alert' : 'status'}>
      {message}
    </div>
  )
}

export function S21Settings() {
  const [settingsState, setSettingsState] = useState<SettingsState>('default')
  const [hardwareState, setHardwareState] = useState<HardwareState>('supported')
  const [panel, setPanel] = useState<SettingsPanel>('closed')
  const [preferences, setPreferences] = useState({ notifications: true, backgroundSync: true, faceId: false })
  const [language, setLanguage] = useState('English (US)')
  const [units, setUnits] = useState('Metric')
  const [status, setStatus] = useState(SETTINGS_STATE_STATUS.default)
  const [selectedControl, setSelectedControl] = useState<(typeof DATA_CONTROLS)[number] | null>(null)
  const [dialogStatus, setDialogStatus] = useState('Choose a control to review its local-only outcome.')
  const [passwordPreview, setPasswordPreview] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const requestedState = params.get('state')
    const requestedPanel = params.get('panel')
    queueMicrotask(() => {
      if (isSettingsState(requestedState)) {
        setSettingsState(requestedState)
        setStatus(SETTINGS_STATE_STATUS[requestedState])
      }
      if (requestedPanel === 'data-controls' || requestedPanel === 'controls') setPanel('data-controls')
      else if (isSettingsPanel(requestedPanel)) setPanel(requestedPanel)
      setHardwareState(params.get('hardware') === 'unsupported' ? 'unsupported' : 'supported')
      if (params.get('notifications') === 'off') {
        setPreferences(current => ({ ...current, notifications: false }))
      }
    })
  }, [])

  const interactionDisabled = settingsState === 'saving' || settingsState === 'offline'
  const disabledReasonId = interactionDisabled ? 'settings-disabled-reason' : undefined

  const togglePreference = (key: SwitchKey, label: string) => {
    if (settingsState === 'error') {
      setStatus(`${label} could not be saved in this error fixture. The previous value was restored; no request occurred.`)
      return
    }
    if (interactionDisabled) return
    setPreferences(current => ({ ...current, [key]: !current[key] }))
    setSettingsState('success')
    setStatus(`${label} changed in this local preview. No OS permission, biometric check, account storage, or network request occurred.`)
  }

  const closePanel = () => setPanel('closed')

  const overlay = panel === 'password' ? (
    <ModalFrame title="Change password preview" titleId="settings-password-title" onClose={closePanel}>
      <p className="mt-3 text-[12px] leading-5 text-paper-100/70">
        This local form demonstrates the interaction only. It does not authenticate, store, or change a password.
      </p>
      <form
        className="mt-4 space-y-4"
        onSubmit={event => {
          event.preventDefault()
          setPasswordPreview('')
          setSettingsState('success')
          setStatus('Password update preview completed locally. No password, authentication, storage, or network request changed.')
          closePanel()
        }}
      >
        <label htmlFor="settings-password-preview" className="block text-[12px] font-medium text-paper-100/75">Preview password (not stored)</label>
        <input
          id="settings-password-preview"
          type="password"
          autoComplete="new-password"
          className="focus-ring h-12 w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 text-[16px] text-paper-100 outline-none placeholder:text-paper-100/55"
          placeholder="Enter preview value"
          value={passwordPreview}
          onChange={event => setPasswordPreview(event.target.value)}
        />
        <p id="settings-password-required" className="text-[12px] leading-5 text-paper-100/70">Enter a local preview value to enable Update preview. Nothing is stored.</p>
        <div className="grid grid-cols-2 gap-3">
          <button type="button" className="focus-ring min-h-12 rounded-pill border border-white/15 px-3 text-[13px] font-medium text-paper-100" onClick={closePanel}>Cancel</button>
          <button type="submit" className="hifi-action hifi-action-primary min-h-12 rounded-pill px-3 text-[13px] font-semibold" disabled={!passwordPreview} aria-describedby={!passwordPreview ? 'settings-password-required' : undefined}>Update preview</button>
        </div>
      </form>
    </ModalFrame>
  ) : panel === 'data-controls' ? (
    <ModalFrame title="Settings data controls" titleId="settings-data-controls-title" onClose={closePanel}>
      <p className="mt-3 text-[12px] leading-5 text-paper-100/70">
        These controls cover this settings fixture only. Selecting one previews an outcome; nothing is exported, revoked, or deleted.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2" role="group" aria-label="Settings data controls">
        {DATA_CONTROLS.map(control => (
          <button
            key={control}
            type="button"
            aria-pressed={selectedControl === control}
            className={`focus-ring min-h-12 rounded-xl border px-3 text-[12px] font-semibold ${selectedControl === control ? 'border-brand-orange bg-brand-orange/15 text-paper-100' : 'border-white/12 bg-white/[0.03] text-paper-100/75'}`}
            onClick={() => {
              setSelectedControl(control)
              setDialogStatus(`${control} control selected for this local preview. No member data or account permission changed.`)
            }}
          >
            {control}
          </button>
        ))}
      </div>
      <p className="mt-3 min-h-10 text-[12px] leading-5 text-paper-100/70" role="status" aria-live="polite">{dialogStatus}</p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <button type="button" className="focus-ring min-h-12 rounded-pill border border-white/15 px-3 text-[13px] font-medium text-paper-100" onClick={closePanel}>Keep current choices</button>
        <button
          type="button"
          className="focus-ring min-h-12 rounded-pill border border-white/15 px-3 text-[13px] font-medium text-paper-100"
          onClick={() => {
            setStatus(`${selectedControl ?? 'Data'} control preview closed. No export, revoke, delete, or account change occurred.`)
            closePanel()
          }}
        >
          Apply local preview
        </button>
      </div>
    </ModalFrame>
  ) : undefined

  return (
    <div className="contents [&_nav_span]:!text-[12px]">
    <HifiShell
      header={<TopBar title="Settings" titleLevel="div" back />}
      activeTab="me"
      overlay={overlay}
    >
      <main
        className="space-y-5 px-4 pb-5 pt-3"
        data-settings-state={settingsState}
        data-hardware-state={hardwareState}
        data-settings-panel={panel}
        aria-busy={settingsState === 'skeleton' || undefined}
      >
        <div className="flex flex-col gap-1 px-1">
          <h1 className="text-[28px] font-semibold leading-tight tracking-[-0.02em] text-paper-100">
            Your <span className="text-emphasis">settings</span>
          </h1>
          <p className="text-[13px] leading-5 text-paper-100/70">Manage your account, CIA preferences, and privacy.</p>
        </div>

        <StateBanner state={settingsState} />

        {settingsState === 'skeleton' ? (
          <div className="space-y-4" aria-label="Loading settings preview">
            {[0, 1, 2, 3].map(item => <div key={item} className="skeleton-block h-24 rounded-xl" />)}
          </div>
        ) : (
          <>
            <section className="space-y-2" aria-labelledby="settings-account-title">
              <h2 id="settings-account-title" className="px-1 text-[12px] font-semibold uppercase tracking-[0.1em] text-paper-100/70">Account</h2>
              <SolidCard className="!p-0">
                <RouteRow href="/screens/50" icon={<User className="h-5 w-5" />} label="Profile" value="Amira · Lv 12" />
                <div className="flex min-h-14 items-center px-4 py-3">
                  <span className="text-[13px] text-paper-100/75">Signed in as <span className="tabular-nums text-paper-100">{persona.email}</span></span>
                </div>
                <button type="button" className="focus-ring flex min-h-14 w-full items-center justify-between gap-3 border-t border-white/[0.06] px-4 py-3 text-left" onClick={() => setPanel('password')}>
                  <span className="flex items-center gap-3"><KeyRound className="h-5 w-5 text-paper-100/65" aria-hidden="true" /><span className="text-[14px] font-medium text-paper-100">Change password</span></span>
                  <ChevronRight className="h-5 w-5 text-paper-100/55" aria-hidden="true" />
                </button>
                <RouteRow href="/screens/23" icon={<PiggyBank className="h-5 w-5" />} label="Subscription & billing" />
                <RouteRow href="/screens/22" icon={<Plug className="h-5 w-5" />} label="Connected services" />
              </SolidCard>
            </section>

            <section className="space-y-2" aria-labelledby="settings-device-title">
              <div className="px-1">
                <h2 id="settings-device-title" className="text-[12px] font-semibold uppercase tracking-[0.1em] text-paper-100/70">Device preferences</h2>
                <p className="mt-1 text-[12px] text-paper-100/65">Bundled defaults · no OS permission is connected</p>
              </div>
              <SolidCard className="divide-y divide-white/[0.06] !p-0">
                <PreferenceSwitch id="settings-notifications" label="Notifications" description={`${preferences.notifications ? 'On' : 'Off'} · bundled supported fixture`} checked={preferences.notifications} disabled={interactionDisabled} describedBy={disabledReasonId} onChange={() => togglePreference('notifications', 'Notifications')} />
                <PreferenceSwitch id="settings-background-sync" label="Background sync" description={`${preferences.backgroundSync ? 'On' : 'Off'} · bundled supported fixture`} checked={preferences.backgroundSync} disabled={interactionDisabled} describedBy={disabledReasonId} onChange={() => togglePreference('backgroundSync', 'Background sync')} />
                {hardwareState === 'supported' ? (
                  <PreferenceSwitch id="settings-face-id" label="Face ID" description={`${preferences.faceId ? 'On' : 'Off'} · supported hardware fixture`} checked={preferences.faceId} disabled={interactionDisabled} describedBy={disabledReasonId} onChange={() => togglePreference('faceId', 'Face ID')} />
                ) : (
                  <p id="settings-hardware-disposition" className="px-4 py-4 text-[12px] leading-5 text-paper-100/70">
                    Face ID is omitted because this deterministic fixture represents unsupported hardware. No biometric capability was queried.
                  </p>
                )}
              </SolidCard>
              {interactionDisabled && (
                <p id="settings-disabled-reason" className="px-1 text-[12px] leading-5 text-paper-100/70">
                  {settingsState === 'offline' ? 'Connect before changing device preferences. No OS setting can be changed here.' : 'Controls are unavailable while the local saving fixture is displayed.'}
                </p>
              )}
            </section>

            <section className="space-y-2" aria-labelledby="settings-cia-title">
              <h2 id="settings-cia-title" className="px-1 text-[12px] font-semibold uppercase tracking-[0.1em] text-paper-100/70">CIA preferences</h2>
              <SolidCard className="divide-y divide-white/[0.06] !p-0">
                <div className="flex min-h-14 items-center justify-between gap-3 px-4 py-3"><span className="text-[14px] text-paper-100">Coaching style</span><span className="text-right text-[12px] text-paper-100/70">Supportive<br />Set during onboarding</span></div>
                <div className="flex min-h-14 items-center justify-between gap-3 px-4 py-3"><span className="text-[14px] text-paper-100">Formality</span><span className="text-right text-[12px] text-paper-100/70">{settingsState === 'partial' ? 'Not configured yet' : '4 / 10'}<br />{settingsState === 'partial' ? 'Add a baseline' : 'Set during onboarding'}</span></div>
                <div className="flex min-h-14 items-center justify-between gap-3 px-4 py-3"><span className="text-[14px] text-paper-100">Check-in times</span><span className="text-right text-[12px] text-paper-100/70">8:00, 20:00<br />Default schedule</span></div>
                <div className="flex min-h-14 items-center justify-between gap-3 px-4 py-3"><span className="text-[14px] text-paper-100">Quiet hours</span><span className="text-right text-[12px] text-paper-100/70">{settingsState === 'partial' ? 'Not configured yet' : '22:00 – 07:00'}<br />{settingsState === 'partial' ? 'Add a schedule' : 'Default schedule'}</span></div>
              </SolidCard>
              <p className="px-2 text-[13px] leading-5 text-paper-100/70">Your coaching is built on what CIA learns from our conversations.</p>
            </section>

            <section className="space-y-2" aria-labelledby="settings-locale-title">
              <h2 id="settings-locale-title" className="px-1 text-[12px] font-semibold uppercase tracking-[0.1em] text-paper-100/70">Appearance & locale</h2>
              <SolidCard className="!p-0">
                <div className="flex min-h-14 items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-3"><span className="flex items-center gap-3 text-[14px] text-paper-100"><Moon className="h-5 w-5 text-paper-100/65" aria-hidden="true" />Theme</span><span className="text-right text-[12px] text-paper-100/70">Dark · display only<br />Light coming later</span></div>
                <LocalActionRow icon={<Globe className="h-5 w-5" />} label="Language" value={language} onClick={() => {
                  const next = language === 'English (US)' ? 'English (UK)' : 'English (US)'
                  setLanguage(next)
                  setStatus(`Language changed to ${next} in this local preview. No account setting was stored.`)
                }} />
                <LocalActionRow label="Units" value={units} onClick={() => {
                  const next = units === 'Metric' ? 'Imperial' : 'Metric'
                  setUnits(next)
                  setStatus(`Units changed to ${next} in this local preview. No account setting was stored.`)
                }} />
              </SolidCard>
            </section>

            <section className="space-y-2" aria-labelledby="settings-data-title">
              <h2 id="settings-data-title" className="px-1 text-[12px] font-semibold uppercase tracking-[0.1em] text-paper-100/70">Privacy & data</h2>
              <SolidCard className="!p-0">
                <button type="button" className="focus-ring flex min-h-14 w-full items-center justify-between gap-3 px-4 py-3 text-left" onClick={() => setPanel('data-controls')}>
                  <span className="flex items-center gap-3"><ShieldPlus className="h-5 w-5 text-paper-100/65" aria-hidden="true" /><span><span className="block text-[14px] font-medium text-paper-100">Manage data controls</span><span className="mt-0.5 block text-[12px] text-paper-100/70">Eight contextual, reversible local controls</span></span></span>
                  <ChevronRight className="h-5 w-5 text-paper-100/55" aria-hidden="true" />
                </button>
              </SolidCard>
            </section>

            <section className="space-y-2" aria-labelledby="settings-emergency-title">
              <h2 id="settings-emergency-title" className="px-1 text-[12px] font-semibold uppercase tracking-[0.1em] text-paper-100/70">Emergency</h2>
              <SafetyCard />
            </section>

            <div className="flex flex-col items-center gap-3 pt-1">
              <BtnSecondary aria-label="Preview sign out" onClick={() => setStatus('Sign-out preview selected. No session, account, cookie, or authentication state changed.')}>
                <span className="flex items-center gap-2"><LogOut className="h-4 w-4" aria-hidden="true" />Sign out preview</span>
              </BtnSecondary>
              <ComplianceFooter />
            </div>
          </>
        )}

        <p id="settings-live-status" className="min-h-10 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-[12px] leading-5 text-paper-100/70" role="status" aria-live="polite" aria-atomic="true">
          {status}
        </p>
      </main>
    </HifiShell>
    </div>
  )
}
