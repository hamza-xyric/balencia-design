'use client'

import { useState, type ComponentType, type KeyboardEvent, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import {
  BtnGhost,
  BtnPrimary,
  CIAPresenceOrb,
  CorrelationIcon,
  HifiShell,
  ProgressRing,
} from '@/components/hifi/kit'

type CarouselPanel = {
  id: string
  title: ReactNode
  titleText: string
  body: string
  Stage: ComponentType
}

const panels: CarouselPanel[] = [
  {
    id: 'connected-life',
    title: <>One <span className="text-emphasis">life</span>, not modules.</>,
    titleText: 'One life, not modules.',
    body: 'Ten domains connect into one whole-life view.',
    Stage: ConnectionStage,
  },
  {
    id: 'meet-cia',
    title: <>Meet <span className="text-emphasis">CIA</span>, your coach.</>,
    titleText: 'Meet CIA, your coach.',
    body: 'Guidance starts only when there is enough history to be useful.',
    Stage: CIAStage,
  },
  {
    id: 'correlation',
    title: <>Everything <span className="text-emphasis">connects</span>.</>,
    titleText: 'Everything connects.',
    body: 'See how one rhythm can shape another without presenting examples as your data.',
    Stage: CorrelationStage,
  },
  {
    id: 'missions',
    title: <>Your life, <span className="text-emphasis">gamified</span>.</>,
    titleText: 'Your life, gamified.',
    body: 'Missions turn steady actions into visible progress.',
    Stage: ProgressStage,
  },
]

export function S02MotionCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const reduceMotion = useReducedMotion()
  const panel = panels[current]
  const Stage = panel.Stage
  const isLast = current === panels.length - 1

  const selectPanel = (next: number) => {
    const bounded = Math.max(0, Math.min(panels.length - 1, next))
    if (bounded === current) return
    setDirection(bounded > current ? 1 : -1)
    setCurrent(bounded)
  }

  const continueForward = () => {
    if (isLast) {
      window.location.assign('/screens/03')
      return
    }
    selectPanel(current + 1)
  }

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index
    if (event.key === 'ArrowRight') next = (index + 1) % panels.length
    else if (event.key === 'ArrowLeft') next = (index - 1 + panels.length) % panels.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = panels.length - 1
    else return

    event.preventDefault()
    selectPanel(next)
    const tabs = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
    tabs?.[next]?.focus()
  }

  return (
    <HifiShell
      atmosphere="cia"
      showTabBar={false}
      header={
        <div className="flex min-h-[52px] items-center justify-end px-4">
          <BtnGhost quiet onClick={() => window.location.assign('/screens/03')}>Skip</BtnGhost>
        </div>
      }
      bottomAction={
        <BtnPrimary
          className="w-full"
          aria-label={isLast ? 'Get started' : 'Next'}
          onClick={continueForward}
        >
          <span className="flex items-center justify-center gap-2">
            {isLast ? 'Get started' : 'Next'}
            <ArrowRight className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
          </span>
        </BtnPrimary>
      }
    >
      <main className="flex min-h-full flex-col items-center px-5 pb-3 pt-1" data-carousel-slide={current + 1}>
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          Slide {current + 1} of {panels.length}: {panel.titleText}
        </p>

        <div className="relative flex h-[408px] w-full items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.section
              key={panel.id}
              custom={direction}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * 26 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * -20 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.32, ease: [0.16, 1, 0.3, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              dragMomentum={false}
              onDragEnd={(_, info) => {
                if (info.offset.x <= -48) selectPanel(current + 1)
                if (info.offset.x >= 48) selectPanel(current - 1)
              }}
              className="absolute inset-0 flex flex-col items-center justify-center"
              id={`carousel-panel-${current + 1}`}
              role="tabpanel"
              aria-label={`Slide ${current + 1} of ${panels.length}`}
            >
              <div className="flex h-[276px] w-full items-center justify-center">
                <Stage />
              </div>

              <div className="mx-auto max-w-[320px] space-y-2 px-2 text-center">
                <h1 className="text-balance text-[27px] font-semibold leading-[1.12] tracking-[-0.02em] text-paper-100">
                  {panel.title}
                </h1>
                <p className="text-pretty text-[15px] leading-snug text-paper-100/70">{panel.body}</p>
              </div>
            </motion.section>
          </AnimatePresence>
        </div>

        <div className="mt-2 flex flex-col items-center gap-1.5">
          <span className="text-[12px] font-medium tabular-nums text-paper-100/70">
            Slide {current + 1} of {panels.length}
          </span>
          <div className="flex items-center justify-center gap-0.5" role="tablist" aria-label="Carousel slides">
            {panels.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={index === current}
                aria-label={`Show slide ${index + 1}: ${item.titleText}`}
                tabIndex={index === current ? 0 : -1}
                className="focus-ring flex h-11 w-11 items-center justify-center rounded-full"
                onClick={() => selectPanel(index)}
                onKeyDown={event => handleTabKeyDown(event, index)}
              >
                <span
                  aria-hidden="true"
                  className={index === current
                    ? 'h-2 w-7 rounded-pill bg-brand-orange'
                    : 'h-2 w-2 rounded-full bg-paper-100/25'}
                />
              </button>
            ))}
          </div>
        </div>
      </main>
    </HifiShell>
  )
}

const domainNodes = [
  { x: 76, y: 40, className: 'fill-domain-fitness' },
  { x: 132, y: 26, className: 'fill-domain-sleep' },
  { x: 187, y: 43, className: 'fill-domain-career' },
  { x: 220, y: 86, className: 'fill-domain-nutrition' },
  { x: 219, y: 142, className: 'fill-domain-finance' },
  { x: 184, y: 188, className: 'fill-domain-faith' },
  { x: 129, y: 204, className: 'fill-domain-productivity' },
  { x: 75, y: 185, className: 'fill-domain-relationships' },
  { x: 42, y: 141, className: 'fill-domain-wellbeing' },
  { x: 43, y: 84, className: 'fill-domain-meditation' },
] as const

function ConnectionStage() {
  return (
    <div className="relative h-[252px] w-[276px]" aria-hidden="true">
      <span className="absolute inset-8 rounded-full bg-brand-orange/10 blur-3xl" />
      <svg viewBox="0 0 260 232" className="relative h-full w-full overflow-visible">
        <path
          d="M76 40C101 22 158 20 187 43s43 53 33 99-48 72-91 62-77-27-87-63 0-78 34-101Z"
          pathLength={1}
          fill="none"
          className="line-draw-slow stroke-brand-orange"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {domainNodes.map(node => (
          <circle key={`${node.x}-${node.y}`} cx={node.x} cy={node.y} r="5" className={node.className} />
        ))}
        <circle cx="130" cy="116" r="35" className="fill-ink-900 stroke-brand-orange" strokeWidth="1.5" />
        <path d="m115 119 12 11 22-27" fill="none" className="stroke-paper-100" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

function CIAStage() {
  return (
    <div className="relative flex h-[252px] w-full items-center justify-center" aria-hidden="true">
      <span className="absolute h-48 w-48 rounded-full bg-royal-purple/12 blur-3xl" />
      <CIAPresenceOrb size={152} state="idle" decorative />
    </div>
  )
}

function CorrelationStage() {
  return (
    <div className="relative w-full max-w-[306px]" aria-label="Example pattern connecting Sleep and Wellbeing">
      <span className="absolute inset-8 rounded-full bg-royal-purple/12 blur-3xl" aria-hidden="true" />
      <div className="glass-card glow-inner-cia relative space-y-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-pill border border-royal-purple/30 bg-royal-purple/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-paper-100/75">
            Example pattern
          </span>
          <CorrelationIcon size={24} active className="text-royal-purple" />
        </div>
        <p className="text-[18px] font-medium leading-snug text-paper-100">
          A steadier bedtime can support a calmer morning.
        </p>
        <div className="flex gap-2">
          <span className="rounded-pill bg-domain-sleep-subtle px-3 py-1.5 text-[12px] font-medium text-domain-sleep">Sleep</span>
          <span className="rounded-pill bg-domain-wellbeing-subtle px-3 py-1.5 text-[12px] font-medium text-domain-wellbeing">Wellbeing</span>
        </div>
      </div>
    </div>
  )
}

function ProgressStage() {
  return (
    <div className="flex h-[252px] w-full flex-col items-center justify-center gap-4" aria-label="Sample Mission progress">
      <div className="relative">
        <span className="absolute inset-1 rounded-full bg-brand-orange/14 blur-2xl" aria-hidden="true" />
        <ProgressRing percent={68} value="40 XP" label="Sample" size={142} />
      </div>
      <span className="rounded-pill border border-white/10 bg-ink-brown-800 px-4 py-2 text-[12px] font-medium text-paper-100/75">
        Sample Mission progress
      </span>
    </div>
  )
}
