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
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { IntegrationCard } from '@/components/screens/IntegrationCard'

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
  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Connected services" showBack />} activeTab="me">
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
                    <IntegrationCard key={service.name} {...service} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
