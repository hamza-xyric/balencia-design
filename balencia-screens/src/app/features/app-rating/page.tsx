import { Star } from 'lucide-react'
import { Button } from '@/components/design-system/Button'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { SiaAvatarMark } from '@/components/screens/SIACoachingNote'
import { appRating } from '@/data/mock'

// Screen 69 of 78: App rating
// Spec: /Users/hamza/yHealth/app_design 3/69-app-rating.md

function RatingStars() {
  return (
    <div className="mt-6 flex justify-center gap-2">
      {Array.from({ length: 5 }).map((_, index) => {
        const active = index < appRating.selectedStars
        return (
          <button key={index} type="button" className="flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-[var(--dur-fast)] active:scale-95">
            <Star
              size={32}
              strokeWidth={1.8}
              className={active ? 'fill-brand-orange text-brand-orange' : 'text-white/25'}
            />
          </button>
        )
      })}
    </div>
  )
}

export default function AppRatingScreen() {
  return (
    <PhoneFrame>
      <ScreenShell showTabBar={false}>
        <main className="relative min-h-full overflow-hidden bg-ink-900">
          <div className="absolute inset-0 opacity-35">
            <div className="mx-4 mt-8 h-32 rounded-xl border border-white/[0.06] bg-ink-brown-800" />
            <div className="mx-4 mt-4 h-40 rounded-xl border border-white/[0.06] bg-ink-brown-800" />
          </div>
          <div className="absolute inset-0 bg-ink-900/60" />

          <section className="absolute inset-x-0 bottom-0 z-40 rounded-t-xl border border-white/[0.06] bg-ink-900 px-6 pb-6 pt-3 shadow-3 animate-fade-up">
            <div className="mx-auto h-1 w-9 rounded-pill bg-white/20" />
            <div className="mt-6 flex justify-center">
              <SiaAvatarMark size="md" />
            </div>

            <h1 className="mt-4 text-center text-[22px] font-bold leading-7 text-white">{appRating.prompt}</h1>
            <p className="mt-2 text-center text-[15px] leading-[22px] text-white/60">{appRating.subtitle}</p>
            <RatingStars />

            <div className="mt-7 rounded-lg border border-white/[0.06] bg-ink-brown-800 p-4 text-center">
              <h2 className="text-h3 font-semibold leading-[22px] text-white">{appRating.positiveTitle}</h2>
              <p className="mx-auto mt-2 max-w-[250px] text-caption leading-[18px] text-white/60">{appRating.positiveBody}</p>
              <Button className="mt-4" fullWidth>Rate on App Store</Button>
            </div>

            <button type="button" className="mt-4 h-9 w-full text-[14px] leading-5 text-white/50">Not now</button>
            <button type="button" className="h-8 w-full text-small leading-[14px] text-white/30">Do not ask again</button>
          </section>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
