'use client'

import { useState } from 'react'
import { Bell, CreditCard, Fingerprint, Link2, LockKeyhole, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/design-system/Button'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { SettingsRow, SettingsSection, SiaSettingsNote } from '@/components/screens/SettingsRow'

// Screen 21 of 78: Settings
// Spec: /Users/hamza/yHealth/app_design 3/21-settings.md

const siaPreferenceRows = [
  ['Coaching style', 'Supportive'],
  ['Coaching intensity', 'Moderate'],
  ['AI persona', 'SIA'],
  ['Formality level', 'Balanced'],
  ['Emoji usage', 'Minimal'],
  ['Encouragement level', 'Medium'],
  ['Check-in times', 'Morning'],
  ['Check-in frequency', 'Daily'],
]

const notificationRows = [
  ['SIA insights', true],
  ['Reminders', true],
  ['Check-ins', true],
  ['Social', false],
  ['Coaching', true],
  ['Achievements', true],
] as const

const sheetContent: Record<string, { description: string; options: { label: string; selected?: boolean }[] }> = {
  'Change password': {
    description: 'Enter your current password, then choose a new one.',
    options: [{ label: 'Current password', selected: true }, { label: 'New password' }, { label: 'Confirm new password' }],
  },
  'Coaching style': {
    description: 'How SIA approaches your coaching conversations.',
    options: [{ label: 'Supportive', selected: true }, { label: 'Direct' }, { label: 'Balanced' }],
  },
  'Coaching intensity': {
    description: 'How much SIA pushes you toward your missions.',
    options: [{ label: 'Gentle' }, { label: 'Moderate', selected: true }, { label: 'Intense' }],
  },
  'AI persona': {
    description: 'SIA is your default coach. Custom personas are coming.',
    options: [{ label: 'SIA', selected: true }],
  },
  'Formality level': {
    description: 'How SIA speaks to you.',
    options: [{ label: 'Casual' }, { label: 'Balanced', selected: true }, { label: 'Formal' }],
  },
  'Emoji usage': {
    description: 'How often SIA uses emojis in messages.',
    options: [{ label: 'None' }, { label: 'Minimal', selected: true }, { label: 'Frequent' }],
  },
  'Encouragement level': {
    description: 'How often SIA celebrates your wins.',
    options: [{ label: 'Low' }, { label: 'Medium', selected: true }, { label: 'High' }],
  },
  'Check-in times': {
    description: 'When SIA sends your daily check-in.',
    options: [{ label: 'Morning', selected: true }, { label: 'Afternoon' }, { label: 'Evening' }],
  },
  'Check-in frequency': {
    description: 'How often SIA initiates check-in conversations.',
    options: [{ label: 'Daily', selected: true }, { label: 'Every other day' }, { label: 'Weekly' }],
  },
  'Quiet hours': {
    description: 'No notifications will be sent during quiet hours.',
    options: [{ label: '22:00 - 07:00', selected: true }, { label: '23:00 - 08:00' }, { label: 'Custom' }],
  },
  Channels: {
    description: 'Where you receive notifications.',
    options: [{ label: 'Push + email', selected: true }, { label: 'Push only' }, { label: 'Email only' }],
  },
  Language: {
    description: 'App display language.',
    options: [{ label: 'English', selected: true }, { label: 'Arabic' }, { label: 'Spanish' }],
  },
  Units: {
    description: 'Measurement units for health and fitness.',
    options: [{ label: 'Metric (kg, cm)', selected: true }, { label: 'Imperial (lb, in)' }],
  },
  'Time format': {
    description: 'How times are displayed.',
    options: [{ label: '12-hour', selected: true }, { label: '24-hour' }],
  },
  'Date format': {
    description: 'How dates are displayed.',
    options: [{ label: 'MMM D, YYYY', selected: true }, { label: 'D MMM YYYY' }, { label: 'YYYY-MM-DD' }],
  },
  'Health profile': {
    description: 'Who can see your health data and stats.',
    options: [{ label: 'Private', selected: true }, { label: 'Friends only' }, { label: 'Public' }],
  },
  'Leaderboard visibility': {
    description: 'Who can see your leaderboard ranking.',
    options: [{ label: 'Friends', selected: true }, { label: 'Everyone' }, { label: 'Hidden' }],
  },
  'Data retention': {
    description: 'How long your data is stored. You can export or delete at any time from your profile.',
    options: [{ label: 'Keep until deleted', selected: true }, { label: '1 year' }, { label: '6 months' }],
  },
  'Emergency resources': {
    description: 'If you or someone you know is in crisis, these resources are available 24/7.',
    options: [{ label: 'Crisis text line: text HOME to 741741' }, { label: 'National suicide prevention: 988' }, { label: 'International Association for Suicide Prevention: iasp.info' }],
  },
  'Terms of service': {
    description: 'Last updated May 2026. Review the full terms at balencia.app/terms.',
    options: [],
  },
  'Privacy policy': {
    description: 'Last updated May 2026. Review the full policy at balencia.app/privacy.',
    options: [],
  },
  Licenses: {
    description: 'Open source licenses for libraries used in Balencia.',
    options: [{ label: 'React (MIT)' }, { label: 'Next.js (MIT)' }, { label: 'Lucide (ISC)' }],
  },
}

function SettingsSheetContent({ setting }: { setting: string }) {
  const content = sheetContent[setting]
  if (!content) {
    return (
      <p className="mt-2 text-[14px] leading-5 text-white/60">
        This setting is available in the production app.
      </p>
    )
  }

  return (
    <>
      <p className="mt-2 text-[14px] leading-5 text-white/60">{content.description}</p>
      {content.options.length > 0 && (
        <div className="mt-4 space-y-2">
          {content.options.map((option) => (
            <div key={option.label} className="flex min-h-[52px] w-full items-center justify-between rounded-lg border border-white/10 bg-ink-brown-800 px-4 text-[15px] text-white">
              {option.label}
              {option.selected && <span className="text-caption font-semibold text-brand-orange">Selected</span>}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default function SettingsScreen() {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    'Face ID': true,
    'SIA insights': true,
    Reminders: true,
    'Check-ins': true,
    Social: false,
    Coaching: true,
    Achievements: true,
    'Background sync': true,
  })
  const [sheet, setSheet] = useState<string | null>(null)
  const [confirming, setConfirming] = useState<string | null>(null)
  const setToggle = (label: string, checked: boolean) => {
    setToggles((current) => ({ ...current, [label]: checked }))
  }

  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Settings" showBack fallbackHref="/tabs/me" />} activeTab="me">
        <main className="px-4 pb-16 pt-2">
          <div className="space-y-8">
            <SettingsSection title="Account" className="animate-fade-up">
              <SettingsRow label="Email" value="amira@balencia.app" variant="display" icon={<ShieldCheck size={17} />} />
              <SettingsRow label="Change password" onClick={() => setSheet('Change password')} icon={<LockKeyhole size={17} />} />
              <SettingsRow label="Face ID" variant="toggle" checked={toggles['Face ID']} onClick={() => setToggle('Face ID', !toggles['Face ID'])} icon={<Fingerprint size={17} />} />
              <SettingsRow label="Manage subscription" href="/tabs/me/subscription" icon={<CreditCard size={17} />} />
              <SettingsRow label="Connected services" href="/tabs/me/connected-services" icon={<Link2 size={17} />} />
            </SettingsSection>

            <section className="animate-fade-up" style={{ animationDelay: '80ms' }}>
              <SettingsSection title="SIA preferences">
                {siaPreferenceRows.map(([label, value]) => (
                  <SettingsRow key={label} label={label} value={value} onClick={() => setSheet(label)} />
                ))}
              </SettingsSection>
              <SiaSettingsNote className="mt-3">
                SIA adapts based on your conversations and the preferences you set here.
              </SiaSettingsNote>
            </section>

            <SettingsSection title="Notifications" className="animate-fade-up" style={{ animationDelay: '160ms' }}>
              {notificationRows.map(([label, checked]) => (
                <SettingsRow key={label} label={label} variant="toggle" checked={toggles[label] ?? checked} onClick={() => setToggle(label, !(toggles[label] ?? checked))} icon={<Bell size={17} />} />
              ))}
              <SettingsRow label="Quiet hours" value="22:00-07:00" onClick={() => setSheet('Quiet hours')} />
              <SettingsRow label="Channels" value="Push, email" onClick={() => setSheet('Channels')} />
            </SettingsSection>

            <SettingsSection title="Appearance & locale" className="animate-fade-up" style={{ animationDelay: '240ms' }}>
              <SettingsRow label="Theme" value="Dark" disabled />
              <SettingsRow label="Language" value="English" onClick={() => setSheet('Language')} />
              <SettingsRow label="Units" value="Metric" onClick={() => setSheet('Units')} />
              <SettingsRow label="Time format" value="12h" onClick={() => setSheet('Time format')} />
              <SettingsRow label="Date format" value="MMM D, YYYY" onClick={() => setSheet('Date format')} />
            </SettingsSection>

            <SettingsSection title="Privacy" className="animate-fade-up" style={{ animationDelay: '320ms' }}>
              <SettingsRow label="Health profile" value="Private" onClick={() => setSheet('Health profile')} />
              <SettingsRow label="Leaderboard visibility" value="Friends" onClick={() => setSheet('Leaderboard visibility')} />
              <SettingsRow label="Data retention" value="Keep until deleted" onClick={() => setSheet('Data retention')} />
              <SettingsRow label="Background sync" variant="toggle" checked={toggles['Background sync']} onClick={() => setToggle('Background sync', !toggles['Background sync'])} />
            </SettingsSection>

            <SettingsSection title="Emergency" className="animate-fade-up" style={{ animationDelay: '400ms' }}>
              <SettingsRow label="Emergency resources" onClick={() => setSheet('Emergency resources')} />
            </SettingsSection>

            <SettingsSection title="About" className="animate-fade-up" style={{ animationDelay: '480ms' }}>
              <SettingsRow label="App version" value="1.0.0" variant="display" />
              <SettingsRow label="Terms of service" onClick={() => setSheet('Terms of service')} />
              <SettingsRow label="Privacy policy" onClick={() => setSheet('Privacy policy')} />
              <SettingsRow label="Licenses" onClick={() => setSheet('Licenses')} />
            </SettingsSection>

            <section className="space-y-4 animate-fade-up" style={{ animationDelay: '560ms' }}>
              <SettingsRow label="Sign out" variant="destructive" onClick={() => setConfirming('Sign out')} />
              <SettingsRow label="Delete account" variant="destructive" onClick={() => setConfirming('Delete account')} />
            </section>
          </div>
        </main>
        {sheet && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 px-4 pb-4" role="dialog" aria-modal="true" aria-label={sheet}>
            <div className="w-full max-w-[390px] rounded-t-xl border border-white/10 bg-ink-900 p-5 shadow-2">
              <h2 className="text-[18px] font-semibold leading-6 text-white">{sheet}</h2>
              <SettingsSheetContent setting={sheet} />
              <Button fullWidth className="mt-4" onClick={() => setSheet(null)}>Done</Button>
            </div>
          </div>
        )}
        {confirming && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 px-4 pb-4" role="dialog" aria-modal="true" aria-label={`${confirming} confirmation`}>
            <div className="w-full max-w-[390px] rounded-t-xl border border-white/10 bg-ink-900 p-5 shadow-2">
              <h2 className="text-[18px] font-semibold leading-6 text-white">{confirming}?</h2>
              <p className="mt-2 text-[14px] leading-5 text-white/60">
                {confirming === 'Delete account'
                  ? 'This will request account deletion and show data export options before anything is removed.'
                  : 'You can sign back in any time with your email or connected account.'}
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <Button variant="ghost" onClick={() => setConfirming(null)}>Cancel</Button>
                <Button variant="skip" className="text-error-red" onClick={() => setConfirming(null)}>{confirming}</Button>
              </div>
            </div>
          </div>
        )}
      </ScreenShell>
    </PhoneFrame>
  )
}
