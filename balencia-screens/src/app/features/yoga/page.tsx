'use client'

import { useState } from 'react'
import { Check, ChevronRight, Flame, Flower2, Leaf, Pause, Play, X } from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { Chip } from '@/components/design-system/Chip'
import { DomainDashboardHeader } from '@/components/domain/DomainDashboardHeader'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { yogaSessions } from '@/data/mock'

// Screen 55 of 78: Yoga sessions
// Spec: /Users/hamza/yHealth/app_design 3/55-yoga-sessions.md

const difficultyClasses: Record<string, string> = {
  beginner: 'bg-domain-wellbeing/15 text-domain-wellbeing',
  intermediate: 'bg-stalled-amber/15 text-stalled-amber',
  advanced: 'bg-domain-fitness/15 text-domain-fitness',
}

const difficultyLabels: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

function sentenceLabel(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function StreakBanner() {
  return (
    <Card className="relative overflow-hidden p-5 animate-fade-up">
      <div className="absolute inset-x-0 top-0 h-10 bg-domain-wellbeing/10 blur-xl" aria-hidden="true" />
      <div className="relative flex items-center gap-3">
        <Flame size={24} className="shrink-0 text-brand-orange" fill="currentColor" strokeWidth={2.1} />
        <div>
          <h2 className="text-h2 font-bold leading-[26px] text-white">{yogaSessions.streak.current}</h2>
          <p className="mt-1 text-caption leading-[18px] text-white/50">{yogaSessions.streak.longest}</p>
        </div>
      </div>
    </Card>
  )
}

function SiaYogaNote() {
  return (
    <Card className="mt-4 p-5 animate-fade-up" style={{ animationDelay: '80ms' }}>
      <div className="flex gap-3">
        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-royal-purple" />
        <p className="text-[15px] leading-[22px] text-white">{yogaSessions.siaNote}</p>
      </div>
    </Card>
  )
}

function DifficultyFilters({ active, onChange }: { active: string; onChange: (filter: string) => void }) {
  return (
    <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 hide-scrollbar animate-fade-up" style={{ animationDelay: '160ms' }}>
      {yogaSessions.filters.map((filter) => (
        <button key={filter} type="button" onClick={() => onChange(filter)} aria-pressed={active === filter} className="min-h-11 shrink-0">
        <Chip selected={active === filter} className="shrink-0">
          {sentenceLabel(filter)}
        </Chip>
        </button>
      ))}
    </div>
  )
}

function SessionCard({ session, index, onStart, completed }: { session: (typeof yogaSessions.sessions)[number]; index: number; onStart: () => void; completed: boolean }) {
  return (
    <Card className="p-5 animate-fade-up" style={{ animationDelay: `${240 + index * 80}ms` }}>
      <div className="h-20 rounded-md bg-gradient-to-br from-domain-wellbeing/20 via-ink-brown-800 to-ink-900 p-4">
        <div className="flex h-full items-center justify-center text-domain-wellbeing/80">
          <Flower2 size={34} strokeWidth={1.6} />
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-h3 font-semibold leading-[22px] text-white">{session.name}</h2>
          <p className="mt-1 text-caption leading-[18px] text-white/50">{session.duration} . {session.poses} poses</p>
        </div>
        <span className={`rounded-pill px-2.5 py-1 text-small font-semibold leading-3 ${difficultyClasses[session.difficulty]}`}>
          {difficultyLabels[session.difficulty] ?? session.difficulty}
        </span>
      </div>
      {completed ? (
        <div className="mt-4 flex h-12 items-center justify-center gap-2 rounded-pill border border-forest-green/20 bg-forest-green/10 text-body font-semibold leading-[22px] text-forest-green">
          <Check size={16} strokeWidth={2.4} />
          Completed
        </div>
      ) : (
        <button type="button" onClick={onStart} className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-pill bg-brand-orange text-body font-semibold leading-[22px] text-white">
          Start session
          <ChevronRight size={16} strokeWidth={2.2} />
        </button>
      )}
    </Card>
  )
}

function PoseLibrary({
  onOpenPose,
  onSeeAll,
}: {
  onOpenPose: (pose: (typeof yogaSessions.poses)[number]) => void
  onSeeAll: () => void
}) {
  return (
    <section className="mt-7 animate-fade-up" style={{ animationDelay: '520ms' }}>
      <div className="mb-3 flex h-8 items-center justify-between px-1">
        <h2 className="text-[18px] font-semibold leading-6 text-white">Pose library</h2>
        <button type="button" onClick={onSeeAll} className="min-h-11 px-2 text-caption leading-[18px] text-brand-orange">See all</button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {yogaSessions.poses.map((pose) => (
          <button key={pose.id} type="button" onClick={() => onOpenPose(pose)} className="text-center" aria-label={`${pose.name} pose details`}>
          <Card variant="small" className="rounded-md p-2 text-center">
            <div className="flex aspect-square items-center justify-center rounded-sm bg-domain-wellbeing/10 text-domain-wellbeing">
              <Leaf size={22} strokeWidth={1.8} />
            </div>
            <div className="mt-2 truncate text-small font-semibold leading-[14px] text-white">{pose.name}</div>
            <span className={['mx-auto mt-1 block h-1.5 w-1.5 rounded-full', pose.difficulty === 'beginner' ? 'bg-domain-wellbeing' : pose.difficulty === 'intermediate' ? 'bg-stalled-amber' : 'bg-domain-fitness'].join(' ')} />
          </Card>
          </button>
        ))}
      </div>
    </section>
  )
}

function PoseDetailSheet({
  pose,
  onClose,
}: {
  pose: (typeof yogaSessions.poses)[number]
  onClose: () => void
}) {
  return (
    <div className="absolute inset-0 z-40 flex items-end bg-black/45 px-3 pb-[84px]" role="presentation">
      <section className="max-h-[72%] w-full overflow-y-auto rounded-xl border border-white/10 bg-ink-brown-800 p-4 shadow-3" role="dialog" aria-modal="true" aria-label={`${pose.name} details`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-h2 font-semibold leading-[26px] text-white">{pose.name}</h2>
            <p className="mt-1 text-caption leading-[18px] text-white/50">{difficultyLabels[pose.difficulty] ?? pose.difficulty} pose</p>
          </div>
          <button type="button" onClick={onClose} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/60" aria-label="Close pose details">
            <X size={18} />
          </button>
        </div>
        <div className="mt-4 flex h-[132px] items-center justify-center rounded-lg bg-domain-wellbeing/10 text-domain-wellbeing">
          <Leaf size={42} strokeWidth={1.7} />
        </div>
        <div className="mt-4 space-y-3 text-[15px] leading-5 text-white/70">
          <p><strong className="text-white">Setup:</strong> Move slowly into the pose and keep the breath steady.</p>
          <p><strong className="text-white">Watch for:</strong> Ease out if you feel sharp pressure, numbness, or joint strain.</p>
          <p><strong className="text-white">SIA note:</strong> Good after strength days when hips or shoulders feel tight.</p>
        </div>
      </section>
    </div>
  )
}

function PoseLibrarySheet({ onOpenPose, onClose }: { onOpenPose: (pose: (typeof yogaSessions.poses)[number]) => void; onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-40 flex items-end bg-black/45 px-3 pb-[84px]" role="presentation">
      <section className="max-h-[76%] w-full overflow-y-auto rounded-xl border border-white/10 bg-ink-brown-800 p-4 shadow-3" role="dialog" aria-modal="true" aria-label="Full pose library">
        <div className="flex items-center justify-between">
          <h2 className="text-h3 font-semibold leading-[22px] text-white">Full pose library</h2>
          <button type="button" onClick={onClose} className="flex h-11 w-11 items-center justify-center rounded-full text-white/60" aria-label="Close full pose library">
            <X size={18} />
          </button>
        </div>
        <div className="mt-3 space-y-2">
          {yogaSessions.poses.map((pose) => (
            <button key={pose.id} type="button" onClick={() => onOpenPose(pose)} className="flex min-h-[56px] w-full items-center gap-3 rounded-md bg-ink-900 px-3 text-left">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-domain-wellbeing/10 text-domain-wellbeing">
                <Leaf size={18} strokeWidth={1.8} />
              </span>
              <span className="min-w-0 flex-1 text-[15px] font-semibold leading-5 text-white">{pose.name}</span>
              <span className={`rounded-pill px-2.5 py-1 text-small font-semibold leading-3 ${difficultyClasses[pose.difficulty]}`}>{difficultyLabels[pose.difficulty]}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

function StatsSection() {
  return (
    <section className="mt-7 animate-fade-up" style={{ animationDelay: '600ms' }}>
      <div className="mb-3 px-1 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">
        Your stats
      </div>
      <div className="grid grid-cols-3 gap-2">
        {yogaSessions.stats.slice(0, 3).map((stat) => (
          <Card key={stat.label} variant="small" className="rounded-md p-3 text-center">
            <div className="text-h2 font-semibold leading-[26px] text-white">{stat.value}</div>
            <div className="mt-1 text-small leading-[14px] text-white/50">{stat.label}</div>
          </Card>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {yogaSessions.stats.slice(3).map((stat) => (
          <Card key={stat.label} variant="small" className="rounded-md p-3 text-center">
            <div className="text-h2 font-semibold leading-[26px] text-white">{stat.value}</div>
            <div className="mt-1 text-small leading-[14px] text-white/50">{stat.label}</div>
          </Card>
        ))}
      </div>
    </section>
  )
}

function ActiveSessionPreview({
  session,
  poseIndex,
  paused,
  complete,
  onPause,
  onSkip,
  onEnd,
  onClose,
}: {
  session: (typeof yogaSessions.sessions)[number]
  poseIndex: number
  paused: boolean
  complete: boolean
  onPause: () => void
  onSkip: () => void
  onEnd: () => void
  onClose: () => void
}) {
  const pose = yogaSessions.poses[poseIndex % yogaSessions.poses.length]
  return (
    <div className="absolute inset-0 z-50 flex flex-col overflow-y-auto bg-ink-900 px-4 pb-8 pt-[62px] animate-fade-up" role="dialog" aria-modal="true" aria-label={`${session.name} active session`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-h3 font-semibold leading-[22px] text-white">{complete ? 'Session complete' : session.name}</h2>
          <p className="mt-1 text-caption leading-[18px] text-white/50">{complete ? '+45 XP earned' : `Pose ${poseIndex + 1} of ${session.poses}`}</p>
        </div>
        <button type="button" onClick={onClose} aria-label="Close yoga session" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-ink-brown-800 text-white/60">
          <X size={18} />
        </button>
      </div>
      <div className="mt-4 rounded-lg bg-gradient-to-br from-domain-wellbeing/20 via-ink-brown-800 to-ink-900 p-5 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-domain-wellbeing/15 text-domain-wellbeing">
          <Flower2 size={30} strokeWidth={1.7} />
        </div>
        <h3 className="mt-3 text-h2 font-semibold leading-[26px] text-white">{complete ? 'Flow finished' : pose.name}</h3>
        <p className="mt-1 text-[15px] leading-5 text-white/50">{paused ? 'Paused' : complete ? 'Nice work. Recovery saved.' : 'Hold for 45 seconds'}</p>
      </div>
      <div className="mx-auto mt-5 flex h-28 w-28 items-center justify-center rounded-full border-[6px] border-domain-wellbeing bg-domain-wellbeing/10 text-display-l font-semibold leading-10 text-white tabular-nums">
        {complete ? '0:00' : paused ? '0:32' : '0:31'}
      </div>
      <Card variant="small" className="mt-5 rounded-md p-4">
        <div className="text-caption font-semibold leading-[18px] text-white/50">Instructions:</div>
        <p className="mt-1 line-clamp-3 text-[14px] leading-5 text-white/70">
          Stand with feet wide apart. Extend arms parallel to the floor. Bend front knee to 90 degrees.
        </p>
      </Card>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button type="button" onClick={onSkip} disabled={complete} className="h-12 rounded-pill border border-white/10 bg-ink-900 text-[15px] font-semibold leading-5 text-white/60 disabled:opacity-50">
          Skip pose
        </button>
        <button type="button" onClick={complete ? onClose : onPause} className="flex h-12 items-center justify-center gap-2 rounded-pill border border-white/10 bg-ink-900 text-[15px] font-semibold leading-5 text-white">
          {paused ? <Play size={15} fill="currentColor" strokeWidth={2.1} /> : <Pause size={15} fill="currentColor" strokeWidth={2.1} />}
          {complete ? 'Done' : paused ? 'Resume' : 'Pause'}
        </button>
      </div>
      {!complete && <button type="button" onClick={onEnd} className="mt-3 h-12 rounded-pill bg-brand-orange text-body font-semibold text-white">Finish session</button>}
      <div className="mt-4 flex gap-2 text-caption leading-[18px] text-white/70">
        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-royal-purple" />
        <span>Breathe deeply. Keep your shoulders relaxed.</span>
      </div>
    </div>
  )
}

export default function YogaSessionsScreen() {
  const [filter, setFilter] = useState('All')
  const [activeSession, setActiveSession] = useState<(typeof yogaSessions.sessions)[number] | null>(null)
  const [poseIndex, setPoseIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [completed, setCompleted] = useState<string[]>(yogaSessions.sessions.filter((session) => session.completed).map((session) => session.id))
  const [selectedPose, setSelectedPose] = useState<(typeof yogaSessions.poses)[number] | null>(null)
  const [poseLibraryOpen, setPoseLibraryOpen] = useState(false)
  const visibleSessions = yogaSessions.sessions.filter((session) => filter === 'All' || session.difficulty.toLowerCase() === filter.toLowerCase())
  const finish = () => {
    if (activeSession) setCompleted((items) => Array.from(new Set([...items, activeSession.id])))
    setPaused(false)
  }

  return (
    <PhoneFrame>
      <ScreenShell header={activeSession ? undefined : <DomainDashboardHeader title="Yoga sessions" domain="wellbeing" level={8} />} activeTab="me" showTabBar={!activeSession}>
        {activeSession && (
          <ActiveSessionPreview
            session={activeSession}
            poseIndex={poseIndex}
            paused={paused}
            complete={completed.includes(activeSession.id)}
            onPause={() => setPaused((value) => !value)}
            onSkip={() => setPoseIndex((value) => Math.min(value + 1, activeSession.poses - 1))}
            onEnd={finish}
            onClose={() => setActiveSession(null)}
          />
        )}
        {!activeSession && <main className="px-4 pb-20 pt-4">
          <StreakBanner />
          <SiaYogaNote />
          <DifficultyFilters active={filter} onChange={setFilter} />
          <section className="mt-5">
            <div className="mb-3 px-1 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">
              Guided sessions
            </div>
            <div className="space-y-3">
              {visibleSessions.map((session, index) => (
                <SessionCard key={session.id} session={session} index={index} completed={completed.includes(session.id)} onStart={() => { setActiveSession(session); setPoseIndex(0); setPaused(false) }} />
              ))}
            </div>
          </section>
          <PoseLibrary onOpenPose={(pose) => { setSelectedPose(pose); setPoseLibraryOpen(false) }} onSeeAll={() => setPoseLibraryOpen(true)} />
          <StatsSection />
        </main>}
        {!activeSession && poseLibraryOpen && (
          <PoseLibrarySheet onOpenPose={(pose) => { setSelectedPose(pose); setPoseLibraryOpen(false) }} onClose={() => setPoseLibraryOpen(false)} />
        )}
        {!activeSession && selectedPose && (
          <PoseDetailSheet pose={selectedPose} onClose={() => setSelectedPose(null)} />
        )}
      </ScreenShell>
    </PhoneFrame>
  )
}
