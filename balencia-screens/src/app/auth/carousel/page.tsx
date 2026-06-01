'use client'

import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { Button } from '@/components/design-system/Button'
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Dumbbell,
  Heart,
  MessageCircle,
  Moon,
  Palette,
  Sparkles,
  Trophy,
  Utensils,
  Wallet,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

// Screen 02 of 78: Motion carousel
// Spec: /Users/hamza/yHealth/app_design 3/02-motion-carousel.md

const domainNodes: Array<{
  icon: LucideIcon
  position: string
  color: string
}> = [
  { icon: Dumbbell, position: 'left-[34px] top-[38px]', color: 'text-domain-fitness border-domain-fitness/30 bg-domain-fitness/10' },
  { icon: Moon, position: 'left-[137px] top-[14px]', color: 'text-domain-sleep border-domain-sleep/30 bg-domain-sleep/10' },
  { icon: Briefcase, position: 'right-[34px] top-[52px]', color: 'text-domain-career border-domain-career/30 bg-domain-career/10' },
  { icon: Utensils, position: 'left-[30px] top-[154px]', color: 'text-domain-nutrition border-domain-nutrition/30 bg-domain-nutrition/10' },
  { icon: Wallet, position: 'right-[30px] top-[162px]', color: 'text-domain-finance border-domain-finance/30 bg-domain-finance/10' },
  { icon: Heart, position: 'left-[72px] bottom-[40px]', color: 'text-domain-relationships border-domain-relationships/30 bg-domain-relationships/10' },
  { icon: BookOpen, position: 'left-[139px] bottom-[18px]', color: 'text-domain-wellbeing border-domain-wellbeing/30 bg-domain-wellbeing/10' },
  { icon: Palette, position: 'right-[72px] bottom-[46px]', color: 'text-domain-creativity border-domain-creativity/30 bg-domain-creativity/10' },
  { icon: Sparkles, position: 'left-[139px] top-[128px]', color: 'text-brand-orange border-brand-orange/40 bg-brand-orange/15' },
]

function DomainSystemGraphic() {
  return (
    <div className="relative h-[340px] w-full overflow-hidden">
      <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
      <svg className="absolute left-1/2 top-1/2 h-[230px] w-[260px] -translate-x-1/2 -translate-y-1/2" viewBox="0 0 260 230" fill="none" aria-hidden="true">
        <path
          d="M24 111C62 32 140 28 202 74C245 107 221 177 161 196C93 217 44 170 24 111Z"
          className="stroke-brand-orange/70 stroke-animate"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDasharray: 610, '--stroke-length': 610 } as CSSProperties}
        />
        <path
          d="M80 122C106 90 148 92 180 122"
          className="stroke-forest-green/50"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {domainNodes.map(({ icon: Icon, position, color }, index) => (
        <div
          key={`${position}-${index}`}
          className={[
            'absolute flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-sm animate-fade-up',
            position,
            color,
          ].join(' ')}
          style={{ animationDelay: `${index * 70}ms` }}
        >
          <Icon size={20} strokeWidth={1.8} />
        </div>
      ))}

      <div className="absolute left-1/2 top-[136px] flex h-[78px] w-[78px] -translate-x-1/2 items-center justify-center rounded-full border border-brand-orange/30 bg-ink-brown-800 shadow-1">
        <Sparkles size={30} className="text-brand-orange" strokeWidth={1.8} />
      </div>
    </div>
  )
}

function SiaPresenceGraphic() {
  return (
    <div className="relative h-[340px] w-full overflow-hidden">
      <div className="absolute left-1/2 top-1/2 h-[248px] w-[248px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-royal-purple/20 bg-royal-purple/10 blur-sm" />
      <div className="absolute left-1/2 top-1/2 h-[172px] w-[172px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-royal-purple/30 bg-ink-brown-800 shadow-[var(--glow-purple)]" />
      <div className="absolute left-1/2 top-[114px] flex h-[112px] w-[112px] -translate-x-1/2 items-center justify-center rounded-[40px] border border-royal-purple/40 bg-royal-purple/15">
        <MessageCircle size={42} className="text-royal-purple" strokeWidth={1.6} />
      </div>
      <div className="absolute left-[78px] top-[76px] h-3 w-3 rounded-full bg-royal-purple/70" />
      <div className="absolute right-[82px] top-[86px] h-2 w-2 rounded-full bg-white/50" />
      <div className="absolute bottom-[82px] left-[106px] h-2.5 w-2.5 rounded-full bg-royal-purple/50" />
      <div className="absolute bottom-[72px] right-[98px] h-4 w-4 rounded-full border border-royal-purple/40" />
    </div>
  )
}

function CorrelationGraphic() {
  return (
    <div className="relative h-[340px] w-full overflow-hidden">
      <svg className="absolute left-1/2 top-[100px] h-[130px] w-[250px] -translate-x-1/2" viewBox="0 0 250 130" fill="none" aria-hidden="true">
        <path
          d="M38 74C78 12 151 117 211 48"
          className="stroke-forest-green/60 stroke-animate"
          strokeWidth="4"
          strokeLinecap="round"
          style={{ strokeDasharray: 280, '--stroke-length': 280 } as CSSProperties}
        />
        <path d="M38 74L211 48" className="stroke-white/10" strokeWidth="1" strokeDasharray="6 8" />
      </svg>

      <div className="absolute left-6 top-[80px] flex h-[88px] w-[88px] flex-col items-center justify-center rounded-xl border border-domain-sleep/30 bg-ink-brown-800 shadow-1">
        <Moon size={26} className="text-domain-sleep" />
        <span className="mt-2 text-small font-semibold text-white/70">5.8h</span>
      </div>
      <div className="absolute right-6 top-[126px] flex h-[88px] w-[88px] flex-col items-center justify-center rounded-xl border border-domain-finance/30 bg-ink-brown-800 shadow-1">
        <Wallet size={26} className="text-domain-finance" />
        <span className="mt-2 text-small font-semibold text-white/70">+28%</span>
      </div>

      <div className="absolute bottom-[42px] left-1/2 w-[270px] -translate-x-1/2 rounded-xl border border-white/[0.06] bg-ink-brown-800 p-4 shadow-1">
        <div className="mb-2 flex items-center gap-2">
          <Sparkles size={16} className="text-royal-purple" />
          <span className="text-small font-semibold uppercase tracking-[0.12em] text-white/40">Insight</span>
        </div>
        <p className="text-[15px] leading-5 text-white/80">
          Your spending spikes on low-sleep days.
        </p>
      </div>
    </div>
  )
}

function RpgGraphic() {
  return (
    <div className="relative h-[340px] w-full overflow-hidden">
      <div className="absolute left-1/2 top-[48px] flex h-[148px] w-[148px] -translate-x-1/2 items-center justify-center rounded-full border border-brand-orange/20 bg-brand-orange/10">
        <svg className="absolute h-[120px] w-[120px] -rotate-90" viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="52" className="stroke-white/10" strokeWidth="8" fill="none" />
          <circle
            cx="60"
            cy="60"
            r="52"
            className="stroke-brand-orange ring-animate"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            style={{ strokeDasharray: 327, '--ring-circumference': 327, '--ring-target': 78 } as CSSProperties}
          />
        </svg>
        <div className="text-center">
          <p className="text-small font-semibold uppercase tracking-[0.12em] text-white/40">Level</p>
          <p className="text-[36px] font-bold leading-none text-white">14</p>
        </div>
      </div>

      <div className="absolute bottom-[40px] left-1/2 w-[278px] -translate-x-1/2 rounded-xl border border-white/[0.06] bg-ink-brown-800 p-4 shadow-1">
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-pill bg-mission-silver/20 px-3 py-1 text-small font-semibold text-white/70">
            Main mission
          </span>
          <span className="flex items-center gap-1 text-small font-semibold text-brand-orange">
            <Trophy size={14} />
            +120 XP
          </span>
        </div>
        <p className="text-[15px] font-semibold leading-5 text-white">Run a half marathon</p>
        <div className="mt-3 h-2 overflow-hidden rounded-pill bg-white/10">
          <div className="h-full w-[68%] rounded-pill bg-brand-orange" />
        </div>
      </div>
    </div>
  )
}

const panels: Array<{
  headline: ReactNode
  subtext: string
  graphic: ReactNode
  button: string
}> = [
  {
    headline: <><span className="text-brand-orange">One</span> life, not modules.</>,
    subtext: 'Everything connects in one place.',
    graphic: <DomainSystemGraphic />,
    button: 'Next',
  },
  {
    headline: <>Meet <span className="text-royal-purple">SIA</span>, your coach.</>,
    subtext: 'Always in your corner.',
    graphic: <SiaPresenceGraphic />,
    button: 'Next',
  },
  {
    headline: <>Everything <span className="text-brand-orange">connects</span>.</>,
    subtext: 'Sleep affects spending. Stress affects workouts. SIA sees it all.',
    graphic: <CorrelationGraphic />,
    button: 'Next',
  },
  {
    headline: <>Your life, <span className="text-brand-orange">gamified</span>.</>,
    subtext: 'Earn XP. Level up. Stay on track.',
    graphic: <RpgGraphic />,
    button: 'Get started',
  },
]

function CarouselPanel({
  panel,
  index,
  activeIndex,
  onAction,
}: {
  panel: (typeof panels)[number]
  index: number
  activeIndex: number
  onAction: () => void
}) {
  return (
    <section className="flex h-full w-full flex-col">
      <div className="flex flex-1 items-center justify-center">
        {panel.graphic}
      </div>

      <div className="animate-fade-up text-center" style={{ animationDelay: '200ms' }}>
        <h1 className="text-[24px] font-bold leading-[30px] text-white">
          {panel.headline}
        </h1>
        <p className="mx-auto mt-2 max-w-[286px] text-[15px] leading-[22px] text-white/70">
          {panel.subtext}
        </p>
      </div>

      <div className="mt-8 flex h-5 items-center justify-center gap-3" aria-hidden="true">
        {panels.map((_, dotIndex) => (
          <span
            key={dotIndex}
            className={dotIndex === activeIndex ? 'h-2 w-6 rounded-pill bg-brand-orange' : 'h-2 w-2 rounded-full bg-white/30'}
          />
        ))}
      </div>

      <div className="mt-6">
        <Button
          size="auth"
          fullWidth
          onClick={onAction}
          aria-label={index < panels.length - 1 ? 'Next carousel panel' : 'Get started'}
          rightIcon={index < panels.length - 1 ? <ArrowRight size={18} /> : undefined}
        >
          {panel.button}
        </Button>
      </div>
    </section>
  )
}

export default function MotionCarouselScreen() {
  const router = useRouter()
  const [activeIndex, setActiveIndex] = useState(0)
  const activePanel = panels[activeIndex]
  const goToSignUp = () => router.push('/auth/sign-up')
  const handleAction = () => {
    if (activeIndex < panels.length - 1) setActiveIndex((index) => index + 1)
    else goToSignUp()
  }

  return (
    <PhoneFrame>
      <ScreenShell showTabBar={false}>
        <div className="flex h-full flex-col px-6 pb-4">
          <div className="flex h-11 items-center justify-end">
            <button
              onClick={goToSignUp}
              className="flex h-11 min-w-11 items-center justify-center px-3 text-[15px] text-white/60 transition-colors duration-[var(--dur-fast)] hover:text-white"
            >
              Skip
            </button>
          </div>

          <div className="min-h-0 flex-1">
            <CarouselPanel
              panel={activePanel}
              index={activeIndex}
              activeIndex={activeIndex}
              onAction={handleAction}
            />
          </div>
        </div>
      </ScreenShell>
    </PhoneFrame>
  )
}
