import { Bell, CreditCard, Fingerprint, Link2, LockKeyhole, ShieldCheck } from 'lucide-react'
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

export default function SettingsScreen() {
  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Settings" showBack />} activeTab="me">
        <main className="px-4 pb-16 pt-2">
          <div className="space-y-8">
            <SettingsSection title="Account" className="animate-fade-up">
              <SettingsRow label="Email" value="amira@balencia.app" variant="display" icon={<ShieldCheck size={17} />} />
              <SettingsRow label="Change password" icon={<LockKeyhole size={17} />} />
              <SettingsRow label="Face ID" variant="toggle" checked icon={<Fingerprint size={17} />} />
              <SettingsRow label="Manage subscription" href="/tabs/me/subscription" icon={<CreditCard size={17} />} />
              <SettingsRow label="Connected services" href="/tabs/me/connected-services" icon={<Link2 size={17} />} />
            </SettingsSection>

            <section className="animate-fade-up" style={{ animationDelay: '80ms' }}>
              <SettingsSection title="SIA preferences">
                {siaPreferenceRows.map(([label, value]) => (
                  <SettingsRow key={label} label={label} value={value} />
                ))}
              </SettingsSection>
              <SiaSettingsNote className="mt-3">
                SIA adapts based on your conversations and the preferences you set here.
              </SiaSettingsNote>
            </section>

            <SettingsSection title="Notifications" className="animate-fade-up" style={{ animationDelay: '160ms' }}>
              {notificationRows.map(([label, checked]) => (
                <SettingsRow key={label} label={label} variant="toggle" checked={checked} icon={<Bell size={17} />} />
              ))}
              <SettingsRow label="Quiet hours" value="22:00-07:00" />
              <SettingsRow label="Channels" value="Push, email" />
            </SettingsSection>

            <SettingsSection title="Appearance & locale" className="animate-fade-up" style={{ animationDelay: '240ms' }}>
              <SettingsRow label="Theme" value="Dark" variant="display" />
              <SettingsRow label="Language" value="English" />
              <SettingsRow label="Units" value="Metric" />
              <SettingsRow label="Time format" value="12h" />
              <SettingsRow label="Date format" value="MMM D, YYYY" />
            </SettingsSection>

            <SettingsSection title="Privacy" className="animate-fade-up" style={{ animationDelay: '320ms' }}>
              <SettingsRow label="Health profile" value="Private" />
              <SettingsRow label="Leaderboard visibility" value="Friends" />
              <SettingsRow label="Data retention" value="Keep until deleted" />
              <SettingsRow label="Background sync" variant="toggle" checked />
            </SettingsSection>

            <SettingsSection title="Emergency" className="animate-fade-up" style={{ animationDelay: '400ms' }}>
              <SettingsRow label="Emergency resources" />
            </SettingsSection>

            <SettingsSection title="About" className="animate-fade-up" style={{ animationDelay: '480ms' }}>
              <SettingsRow label="App version" value="1.0.0" variant="display" />
              <SettingsRow label="Terms of service" />
              <SettingsRow label="Privacy policy" />
              <SettingsRow label="Licenses" />
            </SettingsSection>

            <section className="space-y-4 animate-fade-up" style={{ animationDelay: '560ms' }}>
              <SettingsRow label="Sign out" variant="destructive" />
              <SettingsRow label="Delete account" variant="destructive" />
            </section>
          </div>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
