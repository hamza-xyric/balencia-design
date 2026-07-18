'use client'

import { useEffect, useRef, useState } from 'react'
import { BellRing, Brain, ListChecks, Settings2, UsersRound, WifiOff } from 'lucide-react'
import { BtnGhost, BtnPrimary, BtnSecondary, GlassCard, HifiShell } from '@/components/hifi/kit'

type NotificationState = 'default' | 'loading' | 'authorized-preview' | 'denied' | 'error' | 'offline' | 're-entry'

const NOTIFICATION_STATES: NotificationState[] = ['default', 'loading', 'authorized-preview', 'denied', 'error', 'offline', 're-entry']

const BENEFITS = [
  { title: 'CIA coaching nudges', body: 'Choose whether CIA can send timely coaching.', Icon: Brain },
  { title: 'Helpful reminders', body: 'Pick only the reminders you want.', Icon: ListChecks },
  { title: 'Squad and Community updates', body: 'Only from groups you explicitly opt into.', Icon: UsersRound },
]

function notificationStatusCopy(state: NotificationState) {
  if (state === 'loading') return 'Status fixture: checking · no OS request is running'
  if (state === 'authorized-preview') return 'Status fixture: authorized outcome preview · not read from the OS'
  if (state === 'denied') return 'Status fixture: denied outcome preview · not read from the OS'
  if (state === 're-entry') return 'Status fixture: denied re-entry preview · not read from the OS'
  if (state === 'offline') return 'Status fixture: unrequested and offline · not read from the OS'
  if (state === 'error') return 'Status fixture: preview error · no system setting changed'
  return 'Status fixture: unrequested · not read from the OS'
}

export function S66NotificationPermission() {
  const [screenState, setScreenState] = useState<NotificationState>('default')
  const [status, setStatus] = useState('')
  const previewTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const fixture = new URLSearchParams(window.location.search).get('state') as NotificationState | null
    if (!fixture || !NOTIFICATION_STATES.includes(fixture)) return
    const fixtureTimer = window.setTimeout(() => setScreenState(fixture), 0)
    return () => window.clearTimeout(fixtureTimer)
  }, [])

  useEffect(() => () => {
    if (previewTimer.current) clearTimeout(previewTimer.current)
  }, [])

  const requestPermissionPreview = () => {
    if (previewTimer.current) clearTimeout(previewTimer.current)
    const startedOffline = screenState === 'offline'
    setScreenState('loading')
    setStatus('Checking a visual permission outcome. No OS request is running.')
    previewTimer.current = setTimeout(() => {
      setScreenState('authorized-preview')
      setStatus(startedOffline
        ? 'Authorized outcome preview only. Device permission can be requested offline, but this web prototype showed no OS prompt and granted nothing.'
        : 'Authorized outcome preview only. No OS prompt was shown and notification permission was not granted.')
      previewTimer.current = null
    }, 650)
  }

  const skipPreview = () => {
    if (previewTimer.current) {
      clearTimeout(previewTimer.current)
      previewTimer.current = null
    }
    if (screenState === 'loading') setScreenState('default')
    setStatus('Skipped locally. No OS prompt was shown, and you can change this choice later.')
  }

  const primaryAction = screenState === 'loading' ? (
    <BtnPrimary className="w-full" loading loadingLabel="Checking permission preview">
      Enable notifications
    </BtnPrimary>
  ) : screenState === 'error' ? (
    <BtnSecondary className="w-full" onClick={requestPermissionPreview}>Try again</BtnSecondary>
  ) : screenState === 'denied' ? (
    <BtnPrimary className="w-full" onClick={() => setStatus('Denied outcome preview acknowledged. No OS setting changed.')}>
      Got it
    </BtnPrimary>
  ) : screenState === 're-entry' ? (
    <BtnPrimary className="w-full" onClick={() => setStatus('System Settings is unavailable in this web prototype. No settings app opened and nothing changed.')}>
      <Settings2 aria-hidden="true" className="h-4 w-4" />
      Open settings preview
    </BtnPrimary>
  ) : screenState === 'authorized-preview' ? (
    <BtnSecondary className="w-full" onClick={() => setStatus('Notification-type controls are unavailable in this visual prototype. No preference changed.')}>
      Manage notification types
    </BtnSecondary>
  ) : (
    <BtnPrimary className="w-full" onClick={requestPermissionPreview}>Enable notifications</BtnPrimary>
  )

  const fixtureMessage = screenState === 'offline'
    ? 'Offline · a device permission request can work without a connection. This web prototype cannot call the OS; any later push-token sync would wait.'
    : screenState === 'authorized-preview'
      ? 'Authorized outcome preview only · no system prompt was shown and nothing was granted.'
      : screenState === 'denied'
        ? 'Denied outcome preview only · notifications would be off in system settings. This browser supplied no OS status.'
        : screenState === 're-entry'
          ? 'Re-entry preview · an app with a prior denial would offer System Settings here. This browser supplied no OS status.'
          : screenState === 'error'
            ? 'The permission preview could not finish. No system setting changed.'
            : ''

  return (
    <HifiShell
      showTabBar={false}
      atmosphere="cia"
      bottomAction={
        <div className="space-y-2 pb-1">
          {primaryAction}
          <BtnGhost className="w-full" quiet onClick={skipPreview}>Not now</BtnGhost>
        </div>
      }
    >
      <main className="flex min-h-full flex-col px-5 pb-4 pt-2 text-center" data-notification-state={screenState}>
        {fixtureMessage && (
          <div className="mb-3 flex items-start gap-2 rounded-2xl border border-white/10 bg-surface-2 px-4 py-3 text-left">
            {screenState === 'offline' && <WifiOff aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-paper-100/70" />}
            <p className="text-[12px] leading-4 text-paper-100/75">{fixtureMessage}</p>
          </div>
        )}

        {screenState === 'loading' ? (
          <div aria-busy="true">
            <h1 className="sr-only">Stay on track</h1>
            <GlassCard tone="cia" className="!p-5 text-left">
              <p className="sr-only">Checking the local notification permission preview</p>
              <div className="skeleton-block mx-auto h-20 w-20 rounded-full" />
              <div className="skeleton-block mx-auto mt-6 h-7 w-48 rounded-full" />
              <div className="skeleton-block mx-auto mt-3 h-4 w-64 rounded-full" />
              <div className="mt-7 space-y-3">
                {[0, 1, 2].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="skeleton-block h-11 w-11 shrink-0 rounded-xl" />
                    <div className="flex-1 space-y-2">
                      <div className="skeleton-block h-4 w-40 rounded-full" />
                      <div className="skeleton-block h-3 w-full rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        ) : (
          <GlassCard tone="cia" className="!rounded-[32px] !p-5">
            <div aria-hidden="true" className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-white/[0.06]">
              <BellRing className="h-10 w-10 text-paper-100" strokeWidth={1.7} />
              <span className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full border-2 border-ink-900 bg-brand-orange" />
            </div>

            <h1 className="mt-5 text-[28px] font-semibold leading-8 tracking-[-0.02em] text-paper-100">
              Stay on <span className="text-emphasis">track</span>
            </h1>
            <p className="mx-auto mt-2 max-w-[286px] text-[14px] leading-5 text-paper-100/75">
              CIA can use notifications for coaching and reminders you choose.
            </p>

            <div className="mt-5 space-y-2 text-left">
              {BENEFITS.map(({ title, body, Icon }) => (
                <div key={title} className="flex min-h-[64px] items-center gap-3 rounded-2xl border border-white/[0.07] bg-black/10 px-3 py-2.5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-paper-100/75">
                    <Icon aria-hidden="true" size={24} strokeWidth={1.8} />
                  </span>
                  <span>
                    <strong className="block text-[14px] font-semibold text-paper-100">{title}</strong>
                    <span className="mt-0.5 block text-[12px] leading-4 text-paper-100/70">{body}</span>
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-4 rounded-2xl border border-white/10 bg-black/10 px-3 py-2.5 text-left text-[11px] leading-4 text-paper-100/70">
              {notificationStatusCopy(screenState)}
            </p>
          </GlassCard>
        )}

        <p className="mt-3 text-left text-[12px] leading-5 text-paper-100/75">
          Notifications are optional. Change reminder types later in Balencia, or revoke permission any time in system settings.
        </p>
        <p className="mt-1 text-left text-[11px] leading-4 text-paper-100/65">
          Visual prototype · no OS prompt, permission status, or system setting is opened from this screen.
        </p>

        <div className="mt-3 min-h-10" aria-live="polite" aria-atomic="true">
          {status && (
            <p className="rounded-2xl border border-white/10 bg-surface-2 px-4 py-3 text-left text-[12px] leading-4 text-paper-100/75">
              {status}
            </p>
          )}
        </div>
      </main>
    </HifiShell>
  )
}
