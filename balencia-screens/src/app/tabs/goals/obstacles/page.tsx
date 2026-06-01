'use client'

import { useState } from 'react'
import { CircleCheck, Compass, RotateCcw, Sparkles, TimerReset } from 'lucide-react'
import { Button } from '@/components/design-system/Button'
import { Card } from '@/components/design-system/Card'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { SignalPill } from '@/components/screens/ConversationSuite'
import { SectionHeader } from '@/components/screens/SectionHeader'

// Screen 85 of 90: Obstacle coach

const obstacles = [
  { id: 'meetings', title: 'Late meetings block workouts', detail: 'Detected 3 missed sessions after 6 PM calls', action: 'Move workouts to morning' },
  { id: 'travel', title: 'Protein target drops on travel days', detail: '4 low-protein days after airport meals', action: 'Create travel meal fallback' },
  { id: 'budget', title: 'Budget review skipped on Sundays', detail: 'Engagement is stronger Monday at 8 AM', action: 'Retune reminder timing' },
]

function ObstacleHero() {
  return (
    <section className="animate-fade-up rounded-xl border border-brand-orange/25 bg-[linear-gradient(145deg,rgba(255,94,0,0.18),rgba(33,16,8,0.96)_64%)] p-5 shadow-2">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-brand-orange">Obstacle diagnosis</p>
          <h2 className="mt-2 text-[22px] font-semibold leading-[28px] text-white">SIA found the pattern behind missed missions.</h2>
          <p className="mt-2 text-[13px] leading-[19px] text-white/55">Reconnection starts with timing, friction, and context instead of guilt.</p>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-orange text-white shadow-[var(--glow-orange)]">
          <Compass size={20} strokeWidth={2.2} />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <SignalPill tone="orange">3 blockers</SignalPill>
        <SignalPill tone="purple">SIA plan</SignalPill>
        <SignalPill tone="green">Reconnection ready</SignalPill>
      </div>
    </section>
  )
}

function BottomAction({ onStart, disabled, success }: { onStart: () => void; disabled: boolean; success: boolean }) {
  if (success) {
    return (
      <Button fullWidth variant="completion" onClick={() => { window.location.href = '/tabs/goals' }} leftIcon={<CircleCheck size={16} strokeWidth={2.2} />}>
        View mission board
      </Button>
    )
  }

  return (
    <Button fullWidth disabled={disabled} onClick={onStart} leftIcon={<RotateCcw size={16} strokeWidth={2.2} />}>
      Start reconnection
    </Button>
  )
}

export default function ObstacleCoachScreen() {
  const [dismissed, setDismissed] = useState<string[]>([])
  const [dismissedNotice, setDismissedNotice] = useState<(typeof obstacles)[number] | null>(null)
  const [accepted, setAccepted] = useState<string[]>([])
  const [schedule, setSchedule] = useState('Monday 8:10 AM')
  const [detail, setDetail] = useState<(typeof obstacles)[number] | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const activeObstacles = obstacles.filter((item) => !dismissed.includes(item.id))
  const startReconnection = () => {
    setLoading(true)
    window.setTimeout(() => {
      setLoading(false)
      setSuccess(true)
    }, 650)
  }

  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Obstacle coach" showBack />} activeTab="goals" bottomAction={<BottomAction disabled={loading || accepted.length === 0} success={success} onStart={startReconnection} />}>
        <main className="space-y-5 px-4 pb-6 pt-4">
          <ObstacleHero />
          <section>
            <SectionHeader title="Detected blockers" />
            <div className="space-y-3">
              {activeObstacles.map((item, index) => (
                <Card key={item.title} variant="small" className="animate-fade-up rounded-lg p-4" style={{ animationDelay: `${index * 70}ms` }}>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setDetail(item)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-brand-orange/25 bg-brand-orange/10 text-brand-orange" aria-label={`View details for ${item.title}`}>
                      <TimerReset size={18} strokeWidth={2} />
                    </button>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-[15px] font-semibold leading-5 text-white">{item.title}</h2>
                      <p className="mt-1 text-[12px] leading-4 text-white/45">{item.detail}</p>
                      <p className="mt-3 text-[12px] font-semibold leading-4 text-brand-orange">{item.action}</p>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <button type="button" onClick={() => setAccepted((current) => current.includes(item.id) ? current : [...current, item.id])} className="min-h-11 rounded-pill bg-brand-orange px-3 text-[13px] font-semibold text-white" aria-pressed={accepted.includes(item.id)}>
                          {accepted.includes(item.id) ? 'Accepted' : 'Accept'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setDismissed((current) => current.includes(item.id) ? current : [...current, item.id])
                            setAccepted((current) => current.filter((id) => id !== item.id))
                            setDismissedNotice(item)
                          }}
                          className="min-h-11 rounded-pill border border-white/10 px-3 text-[13px] font-semibold text-white/60"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            {dismissedNotice && (
              <div className="mt-3 flex min-h-11 items-center justify-between gap-3 rounded-lg border border-brand-orange/20 bg-brand-orange/10 px-3 py-2 text-[13px] leading-[18px] text-white/70" role="status">
                <span>Dismissed: {dismissedNotice.title}</span>
                <button
                  type="button"
                  onClick={() => {
                    setDismissed((current) => current.filter((id) => id !== dismissedNotice.id))
                    setDismissedNotice(null)
                  }}
                  className="min-h-11 shrink-0 rounded-pill px-3 text-[13px] font-semibold text-brand-orange"
                >
                  Undo
                </button>
              </div>
            )}
          </section>
          <section className="rounded-lg border border-royal-purple/20 bg-royal-purple/10 p-4">
            <div className="flex items-center gap-2 text-royal-purple">
              <Sparkles size={17} strokeWidth={2} />
              <h2 className="text-[15px] font-semibold leading-5">Next best timing</h2>
            </div>
            <p className="mt-2 text-[13px] leading-[19px] text-white/55">{schedule} has the strongest historical follow-through.</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {['Monday 8:10 AM', 'Tuesday 7:30 AM'].map((time) => (
                <button key={time} type="button" onClick={() => setSchedule(time)} aria-pressed={schedule === time} className={['min-h-11 rounded-pill px-3 text-[13px] font-semibold', schedule === time ? 'bg-royal-purple text-white' : 'border border-white/10 text-white/60'].join(' ')}>
                  {time}
                </button>
              ))}
            </div>
          </section>
          {loading && <p className="text-center text-[13px] leading-[18px] text-white/50">Building your reconnection plan...</p>}
          {success && (
            <section className="rounded-xl border border-forest-green/30 bg-forest-green/10 p-4 text-[14px] leading-5 text-white/70" aria-live="polite">
              Reconnection started with {accepted.length} accepted blocker{accepted.length === 1 ? '' : 's'}. Your next reminder is set for {schedule}.
            </section>
          )}
        </main>
        {detail && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 px-4 pb-4" role="dialog" aria-modal="true" aria-label="Blocker detail">
            <div className="w-full max-w-[390px] rounded-t-xl border border-white/10 bg-ink-900 p-5 shadow-2">
              <h2 className="text-[18px] font-semibold leading-6 text-white">{detail.title}</h2>
              <p className="mt-2 text-[14px] leading-5 text-white/60">{detail.detail}. SIA recommends: {detail.action}.</p>
              <Button fullWidth className="mt-5" onClick={() => setDetail(null)}>Done</Button>
            </div>
          </div>
        )}
      </ScreenShell>
    </PhoneFrame>
  )
}
