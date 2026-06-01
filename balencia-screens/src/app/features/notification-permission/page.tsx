'use client'

import { useState } from 'react'
import { BellRing, Flame, MessageCircle, Users } from 'lucide-react'
import { Button } from '@/components/design-system/Button'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { notificationPermission } from '@/data/mock'

// Screen 66 of 78: Notification permission
// Spec: /Users/hamza/yHealth/app_design 3/66-notification-permission.md

const benefitIcon = {
  purple: MessageCircle,
  orange: Flame,
  green: Users,
} as const

const benefitTone = {
  purple: 'bg-royal-purple/15 text-royal-purple',
  orange: 'bg-brand-orange/15 text-brand-orange',
  green: 'bg-forest-green/15 text-forest-green',
} as const

function BellIllustration() {
  return (
    <div className="relative mx-auto flex h-[120px] w-[120px] items-center justify-center rounded-2xl border border-white/[0.06] bg-ink-brown-800 shadow-1 animate-fade-up">
      <BellRing size={48} className="text-brand-orange quiet-pulse" strokeWidth={1.8} />
      <span className="absolute left-2 top-7 rounded-pill bg-royal-purple px-2 py-1 text-small font-semibold leading-3 text-white">3</span>
      <span className="absolute right-3 top-4 h-3 w-3 rounded-full bg-forest-green" />
      <span className="absolute bottom-6 right-1 rounded-pill bg-brand-orange px-2 py-1 text-small font-semibold leading-3 text-white">2</span>
    </div>
  )
}

function BenefitRows() {
  return (
    <div className="mt-8 space-y-4 animate-fade-up" style={{ animationDelay: '240ms' }}>
      {notificationPermission.benefits.map((benefit) => {
        const Icon = benefitIcon[benefit.tone as keyof typeof benefitIcon]
        return (
          <div key={benefit.title} className="flex min-h-14 items-start gap-3 text-left">
            <span className={['flex h-10 w-10 shrink-0 items-center justify-center rounded-md', benefitTone[benefit.tone as keyof typeof benefitTone]].join(' ')}>
              <Icon size={19} strokeWidth={2.1} />
            </span>
            <div>
              <div className="text-[15px] font-semibold leading-5 text-white">{benefit.title}</div>
              <div className="mt-1 text-caption leading-[18px] text-white/50">{benefit.detail}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function NotificationPermissionScreen() {
  const [status, setStatus] = useState<'ask' | 'native' | 'allowed' | 'denied' | 'skipped' | 'settings' | 'enabled' | 'done'>('ask')
  const resolvedStatus = ['allowed', 'denied', 'skipped', 'settings', 'enabled', 'done'].includes(status)
  const showBenefits = status === 'ask' || status === 'native'

  const bottomAction = {
    ask: {
      label: 'Enable notifications',
      onClick: () => setStatus('native'),
      secondary: 'Not now',
      secondaryClick: () => setStatus('skipped'),
    },
    native: {
      label: 'Not now',
      variant: 'skip' as const,
      onClick: () => setStatus('skipped'),
    },
    allowed: {
      label: 'Done',
      onClick: () => setStatus('done'),
    },
    denied: {
      label: 'Open Settings',
      onClick: () => setStatus('settings'),
    },
    skipped: {
      label: 'Done',
      onClick: () => setStatus('done'),
    },
    settings: {
      label: 'Done',
      onClick: () => setStatus('done'),
    },
    enabled: {
      label: 'Done',
      onClick: () => setStatus('done'),
    },
    done: null,
  }[status]

  return (
    <PhoneFrame>
      <ScreenShell showTabBar={false}>
        <main className="flex min-h-full flex-col px-6 pb-6 pt-14 text-center">
          <BellIllustration />

          <section className="mt-8 animate-fade-up" style={{ animationDelay: '120ms' }}>
            <h1 className="text-[26px] font-bold leading-8 text-white">{notificationPermission.title}</h1>
            <p className="mx-auto mt-2 max-w-[280px] text-[15px] leading-[22px] text-white/60">{notificationPermission.subtitle}</p>
          </section>

          {showBenefits && <BenefitRows />}

          {status !== 'ask' && (
            <section className={['rounded-lg border border-white/[0.08] bg-ink-brown-800 p-4 text-left animate-fade-up', resolvedStatus ? 'mt-8' : 'mt-6'].join(' ')} aria-live="polite">
              {status === 'native' && (
                <>
                  <div className="text-[15px] font-semibold leading-5 text-white">Native permission fixture</div>
                  <p className="mt-1 text-caption leading-[18px] text-white/50">Choose a system response. Not now has not consumed the one-time system prompt.</p>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    <button type="button" onClick={() => setStatus('allowed')} className="h-11 rounded-pill bg-forest-green text-caption font-semibold text-white">Allow</button>
                    <button type="button" onClick={() => setStatus('denied')} className="h-11 rounded-pill bg-white/[0.06] text-caption font-semibold text-white/70">Deny</button>
                    <button type="button" onClick={() => setStatus('enabled')} className="h-11 rounded-pill bg-white/[0.06] px-2 text-small font-semibold leading-3 text-white/70">Already enabled</button>
                  </div>
                </>
              )}
              {status === 'allowed' && <p className="text-[15px] font-semibold leading-5 text-white">Notifications enabled. SIA can now send coaching nudges and partner check-ins.</p>}
              {status === 'skipped' && <p className="text-[15px] font-semibold leading-5 text-white">Skipped for now. Balencia will wait for a relevant reminder or accountability action before asking again.</p>}
              {status === 'denied' && (
                <>
                  <p className="text-[15px] font-semibold leading-5 text-white">Notifications are blocked.</p>
                  <p className="mt-1 text-caption leading-[18px] text-white/50">Recovery requires Settings; Balencia will not repeat the system prompt.</p>
                </>
              )}
              {status === 'settings' && <p className="text-[15px] font-semibold leading-5 text-white">Settings recovery opened. Return here after enabling notifications.</p>}
              {status === 'enabled' && <p className="text-[15px] font-semibold leading-5 text-white">Already enabled. No prompt needed.</p>}
              {status === 'done' && <p className="text-[15px] font-semibold leading-5 text-white">Notification preference saved.</p>}
            </section>
          )}

          <div className="flex-1" />

          {bottomAction && (
            <div className="animate-fade-up" style={{ animationDelay: '320ms' }}>
              <Button size="auth" variant={bottomAction.variant ?? 'primary'} fullWidth onClick={bottomAction.onClick}>
                {bottomAction.label}
              </Button>
              {'secondary' in bottomAction && (
                <button type="button" onClick={bottomAction.secondaryClick} className="mt-4 h-11 w-full text-[15px] leading-5 text-white/50">{bottomAction.secondary}</button>
              )}
            </div>
          )}
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
