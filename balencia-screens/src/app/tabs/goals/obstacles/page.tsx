import { Compass, RotateCcw, Sparkles, TimerReset } from 'lucide-react'
import { Button } from '@/components/design-system/Button'
import { Card } from '@/components/design-system/Card'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { SignalPill } from '@/components/screens/ConversationSuite'
import { SectionHeader } from '@/components/screens/SectionHeader'

// Screen 85 of 90: Obstacle coach

const obstacles = [
  { title: 'Late meetings block workouts', detail: 'Detected 3 missed sessions after 6 PM calls', action: 'Move workouts to morning' },
  { title: 'Protein target drops on travel days', detail: '4 low-protein days after airport meals', action: 'Create travel meal fallback' },
  { title: 'Budget review skipped on Sundays', detail: 'Engagement is stronger Monday at 8 AM', action: 'Retune reminder timing' },
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

function BottomAction() {
  return (
    <Button fullWidth leftIcon={<RotateCcw size={16} strokeWidth={2.2} />}>
      Start reconnection
    </Button>
  )
}

export default function ObstacleCoachScreen() {
  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Obstacle coach" showBack />} activeTab="goals" bottomAction={<BottomAction />}>
        <main className="space-y-5 px-4 pb-6 pt-4">
          <ObstacleHero />
          <section>
            <SectionHeader title="Detected blockers" />
            <div className="space-y-3">
              {obstacles.map((item, index) => (
                <Card key={item.title} variant="small" className="animate-fade-up rounded-lg p-4" style={{ animationDelay: `${index * 70}ms` }}>
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-brand-orange/25 bg-brand-orange/10 text-brand-orange">
                      <TimerReset size={18} strokeWidth={2} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-[15px] font-semibold leading-5 text-white">{item.title}</h2>
                      <p className="mt-1 text-[12px] leading-4 text-white/45">{item.detail}</p>
                      <p className="mt-3 text-[12px] font-semibold leading-4 text-brand-orange">{item.action}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
          <section className="rounded-lg border border-royal-purple/20 bg-royal-purple/10 p-4">
            <div className="flex items-center gap-2 text-royal-purple">
              <Sparkles size={17} strokeWidth={2} />
              <h2 className="text-[15px] font-semibold leading-5">Next best timing</h2>
            </div>
            <p className="mt-2 text-[13px] leading-[19px] text-white/55">Monday at 8:10 AM has the strongest historical follow-through.</p>
          </section>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
