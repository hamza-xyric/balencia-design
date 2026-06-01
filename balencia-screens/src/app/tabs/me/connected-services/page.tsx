'use client'

import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  CalendarDays,
  Database,
  Dumbbell,
  Footprints,
  HeartPulse,
  Moon,
  Music2,
  Utensils,
  Watch,
} from 'lucide-react'
import { Eyebrow } from '@/components/design-system/Eyebrow'
import { Button } from '@/components/design-system/Button'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'

// Screen 22 of 78: Connected services
// Spec: /Users/hamza/yHealth/app_design 3/22-connected-services.md

type Service = {
  name: string
  iconLabel: string
  Icon?: LucideIcon
  status: 'connected' | 'not-connected' | 'coming-soon'
  description: string
  lastSync?: string
}

type ServiceStatus = Service['status'] | 'syncing' | 'error'

const serviceTrustCopy: Record<string, { scopes: string; storage: string }> = {
  WHOOP: {
    scopes: 'Sleep, HRV, recovery, and strain read-only.',
    storage: 'Imported recovery signals are stored for coaching until you disconnect or delete synced data.',
  },
  'Apple Health': {
    scopes: 'Steps, workouts, sleep, and heart-rate read-only.',
    storage: 'Health samples are summarized for trends; raw service data can be deleted after disconnect.',
  },
  Fitbit: {
    scopes: 'Steps, sleep, heart rate, workouts, and calories read-only.',
    storage: 'Balencia keeps imported summaries for coaching and removes them from active use on disconnect.',
  },
  Garmin: {
    scopes: 'Activities, heart rate, GPS activity metadata, sleep, and VO2 max read-only.',
    storage: 'Location-bearing activity metadata is used only for fitness trends and can be deleted from data controls.',
  },
  'Oura Ring': {
    scopes: 'Sleep, readiness, HRV, and body-temperature trends read-only.',
    storage: 'Readiness trends are stored as coaching signals until revoked or deleted.',
  },
  'Samsung Health': {
    scopes: 'Steps, sleep, heart-rate, and workout summaries read-only.',
    storage: 'Imported health summaries remain private and can be removed after disconnect.',
  },
  Strava: {
    scopes: 'GPS activities and training-load summaries read-only.',
    storage: 'Activity imports are private to Balencia coaching; disconnect stops future sync.',
  },
  MyFitnessPal: {
    scopes: 'Calories, macros, and meal-log summaries read-only.',
    storage: 'Nutrition summaries are used for coaching and can be deleted from data controls.',
  },
  Nutritionix: {
    scopes: 'Food database lookups and nutrition facts read-only.',
    storage: 'Lookup history is stored only when attached to your logs.',
  },
  Cronometer: {
    scopes: 'Detailed nutrition and micronutrient summaries read-only.',
    storage: 'Micronutrient summaries stay private and can be deleted after disconnect.',
  },
  'Google Calendar': {
    scopes: 'Events, schedule blocks, and availability read-only.',
    storage: 'Calendar context is summarized for planning; Balencia never edits your calendar from this screen.',
  },
  Spotify: {
    scopes: 'Listening history and mood-signal metadata read-only.',
    storage: 'Listening signals are used for wellbeing patterns and can be deleted from data controls.',
  },
}

function statusBadgeClass(status: ServiceStatus) {
  if (status === 'connected') return 'bg-forest-green/15 text-forest-green'
  if (status === 'syncing') return 'bg-brand-orange/15 text-brand-orange'
  if (status === 'error') return 'bg-error-red/15 text-error-red'
  if (status === 'coming-soon') return 'bg-white/5 text-white/30'
  return 'bg-white/10 text-white/55'
}

const serviceSections: { title: string; services: Service[] }[] = [
  {
    title: 'Wearables & fitness',
    services: [
      { name: 'WHOOP', iconLabel: 'W', Icon: Activity, status: 'connected', description: 'Sleep, HRV, recovery, strain', lastSync: '2m ago' },
      { name: 'Apple Health', iconLabel: 'A', Icon: HeartPulse, status: 'not-connected', description: 'Steps, workouts, sleep, heart rate' },
      { name: 'Fitbit', iconLabel: 'F', Icon: Footprints, status: 'not-connected', description: 'Steps, sleep, HR, workouts, calories' },
      { name: 'Garmin', iconLabel: 'G', Icon: Watch, status: 'not-connected', description: 'Activities, HR, GPS, sleep, VO2 max' },
      { name: 'Oura Ring', iconLabel: 'O', Icon: Moon, status: 'not-connected', description: 'Sleep, readiness, HRV, body temperature' },
      { name: 'Samsung Health', iconLabel: 'S', Icon: HeartPulse, status: 'not-connected', description: 'Steps, sleep, HR, workouts' },
      { name: 'Strava', iconLabel: 'St', Icon: Dumbbell, status: 'not-connected', description: 'GPS activities and training load' },
    ],
  },
  {
    title: 'Nutrition',
    services: [
      { name: 'MyFitnessPal', iconLabel: 'M', Icon: Utensils, status: 'not-connected', description: 'Calories, macros, meal logging' },
      { name: 'Nutritionix', iconLabel: 'N', Icon: Database, status: 'not-connected', description: 'Food database and nutrition data' },
      { name: 'Cronometer', iconLabel: 'C', Icon: Utensils, status: 'not-connected', description: 'Detailed nutrition and micronutrients' },
    ],
  },
  {
    title: 'Productivity',
    services: [
      { name: 'Google Calendar', iconLabel: 'Cal', Icon: CalendarDays, status: 'not-connected', description: 'Events, schedule, availability' },
    ],
  },
  {
    title: 'Lifestyle',
    services: [
      { name: 'Spotify', iconLabel: 'Sp', Icon: Music2, status: 'not-connected', description: 'Listening data and mood signals' },
    ],
  },
]

function SiaIntegrationNote() {
  return (
    <section className="rounded-xl border border-white/[0.06] bg-ink-brown-800 p-4 shadow-1 animate-fade-up">
      <div className="flex items-start gap-3">
        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-royal-purple" aria-hidden="true" />
        <p className="text-[13px] leading-[18px] text-white/60">
          Connecting your services helps SIA understand the full picture across sleep, workouts, calendar, and mood signals.
        </p>
      </div>
    </section>
  )
}

export default function ConnectedServicesScreen() {
  const [statuses, setStatuses] = useState<Record<string, ServiceStatus>>({ WHOOP: 'connected' })
  const [lastSyncs, setLastSyncs] = useState<Record<string, string>>({ WHOOP: '2m ago' })
  const [selected, setSelected] = useState<Service | null>(null)
  const [disconnecting, setDisconnecting] = useState<Service | null>(null)
  const getStatus = (service: Service) => statuses[service.name] ?? service.status
  const getLastSync = (service: Service) => lastSyncs[service.name] ?? service.lastSync
  const connect = (service: Service) => {
    setStatuses((current) => ({ ...current, [service.name]: 'syncing' }))
    setSelected(null)
    window.setTimeout(() => {
      setStatuses((current) => ({ ...current, [service.name]: 'connected' }))
      setLastSyncs((current) => ({ ...current, [service.name]: 'just now' }))
    }, 700)
  }
  const forceSync = (service: Service) => {
    setStatuses((current) => ({ ...current, [service.name]: 'syncing' }))
    window.setTimeout(() => {
      setStatuses((current) => ({ ...current, [service.name]: 'connected' }))
      setLastSyncs((current) => ({ ...current, [service.name]: 'just now' }))
    }, 700)
  }
  const disconnect = () => {
    if (!disconnecting) return
    setStatuses((current) => ({ ...current, [disconnecting.name]: 'not-connected' }))
    setDisconnecting(null)
  }

  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Connected services" showBack fallbackHref="/tabs/me" />} activeTab="me">
        <main className="px-4 pb-16 pt-2">
          <SiaIntegrationNote />

          <div className="mt-8 space-y-8">
            {serviceSections.map((section, sectionIndex) => (
              <section
                key={section.title}
                className="animate-fade-up"
                style={{ animationDelay: `${120 + sectionIndex * 90}ms` }}
              >
                <Eyebrow className="mb-3 px-1 text-white/50">{section.title}</Eyebrow>
                <div className="space-y-3">
                  {section.services.map((service) => (
                    <article key={service.name} className="rounded-xl border border-white/[0.06] bg-ink-brown-800 p-4 shadow-1">
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/10 bg-ink-900 text-[12px] font-bold text-white/70">
                          {service.Icon ? <service.Icon size={18} strokeWidth={1.8} /> : service.iconLabel}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h2 className="truncate text-[16px] font-semibold leading-[22px] text-white">{service.name}</h2>
                            <span className={`shrink-0 rounded-pill px-2.5 py-1 text-small font-semibold leading-[14px] ${statusBadgeClass(getStatus(service))}`}>
                              {getStatus(service) === 'syncing' ? 'Syncing' : getStatus(service) === 'connected' ? 'Connected' : getStatus(service) === 'error' ? 'Needs attention' : getStatus(service) === 'coming-soon' ? 'Coming soon' : 'Not connected'}
                            </span>
                          </div>
                          <p className="mt-2 text-[13px] leading-[18px] text-white/50">{service.description}</p>
                          <p className="mt-2 text-[12px] leading-4 text-white/35">
                            Scopes preview: {serviceTrustCopy[service.name].scopes} Sync cadence: hourly while connected. {serviceTrustCopy[service.name].storage}
                          </p>
                          {getLastSync(service) && getStatus(service) === 'connected' && (
                            <p className="mt-1 text-[13px] leading-[18px] text-white/40">Last sync: {getLastSync(service)}</p>
                          )}
                          {getStatus(service) === 'error' && (
                            <p className="mt-2 text-[13px] leading-[18px] text-error-red">OAuth failed. Retry connection or choose another account.</p>
                          )}
                        </div>
                      </div>
                      <div className={getStatus(service) === 'connected' || getStatus(service) === 'syncing' ? 'mt-4 grid grid-cols-2 gap-3' : 'mt-4 flex justify-end'}>
                        {getStatus(service) === 'connected' || getStatus(service) === 'syncing' ? (
                          <>
                            <button
                              type="button"
                              disabled={getStatus(service) === 'syncing'}
                              aria-label={getStatus(service) === 'syncing' ? `Syncing ${service.name}` : `Force sync ${service.name}`}
                              onClick={() => forceSync(service)}
                              className="min-h-11 rounded-pill border border-white/10 px-3 text-[14px] font-semibold leading-[18px] text-white/80 disabled:opacity-50"
                            >
                              {getStatus(service) === 'syncing' ? 'Syncing...' : 'Force sync'}
                            </button>
                            <button
                              type="button"
                              aria-label={`Disconnect ${service.name}`}
                              onClick={() => setDisconnecting(service)}
                              className="min-h-11 rounded-pill border border-white/10 px-3 text-[14px] font-semibold leading-[18px] text-error-red"
                            >
                              Disconnect
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            disabled={getStatus(service) === 'coming-soon'}
                            aria-label={getStatus(service) === 'coming-soon' ? `Notify me when ${service.name} is available` : `Connect ${service.name}`}
                            onClick={() => setSelected(service)}
                            className="min-h-11 min-w-[112px] rounded-pill bg-brand-orange px-4 text-[14px] font-semibold leading-[18px] text-white disabled:border disabled:border-white/10 disabled:bg-transparent disabled:text-white/30"
                          >
                            {getStatus(service) === 'coming-soon' ? 'Notify me' : 'Connect'}
                          </button>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </main>
        {selected && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 px-4 pb-4" role="dialog" aria-modal="true" aria-label={`${selected.name} OAuth preview`}>
            <div className="w-full max-w-[390px] rounded-t-xl border border-white/10 bg-ink-900 p-5 shadow-2">
              <h2 className="text-[18px] font-semibold leading-6 text-white">Connect {selected.name}</h2>
              <p className="mt-2 text-[14px] leading-5 text-white/60">
                Balencia requests {serviceTrustCopy[selected.name].scopes.toLowerCase()} We store imported signals for coaching, sync hourly, and let you disconnect, revoke provider access, or delete imported data later.
              </p>
              <p className="mt-3 rounded-md border border-white/10 bg-ink-brown-800 p-3 text-[12px] leading-4 text-white/45">
                {serviceTrustCopy[selected.name].storage}
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <Button variant="ghost" aria-label={`Cancel ${selected.name} connection`} onClick={() => setSelected(null)}>Cancel</Button>
                <Button aria-label={`Allow ${selected.name} connection`} onClick={() => connect(selected)}>Allow</Button>
              </div>
            </div>
          </div>
        )}
        {disconnecting && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 px-4 pb-4" role="dialog" aria-modal="true" aria-label={`${disconnecting.name} disconnect confirmation`}>
            <div className="w-full max-w-[390px] rounded-t-xl border border-white/10 bg-ink-900 p-5 shadow-2">
              <h2 className="text-[18px] font-semibold leading-6 text-white">Disconnect {disconnecting.name}?</h2>
              <p className="mt-2 text-[14px] leading-5 text-white/60">
                Future sync stops immediately and SIA stops reading new {disconnecting.description.toLowerCase()} data. Existing imported data stays available for review until you delete it from data controls; you can also revoke access at the provider.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <Button variant="ghost" aria-label={`Keep ${disconnecting.name} connected`} onClick={() => setDisconnecting(null)}>Keep</Button>
                <Button variant="skip" aria-label={`Disconnect ${disconnecting.name}`} className="text-error-red" onClick={disconnect}>Disconnect</Button>
              </div>
            </div>
          </div>
        )}
      </ScreenShell>
    </PhoneFrame>
  )
}
