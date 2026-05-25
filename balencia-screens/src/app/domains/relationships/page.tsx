import { AlertTriangle, ChevronRight, Coffee, Gift, Lightbulb, Plus, Utensils } from 'lucide-react'
import { Button } from '@/components/design-system/Button'
import { Card } from '@/components/design-system/Card'
import { FAB } from '@/components/design-system/FAB'
import { DomainDashboardHeader } from '@/components/domain/DomainDashboardHeader'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { SIACoachingNote } from '@/components/screens/SIACoachingNote'
import { relationshipsDashboard } from '@/data/mock'

// Screen 33 of 78: Relationships dashboard
// Spec: /Users/hamza/yHealth/app_design 3/33-relationships-dashboard.md

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="mb-3 flex h-8 items-center">
      <h2 className="text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/50">
        {title}
      </h2>
    </div>
  )
}

function CheckInSection() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '160ms' }}>
      <SectionTitle title="Check in" />
      <Card variant="small" className="p-4">
        {relationshipsDashboard.reminders.map((reminder, index) => (
          <div
            key={reminder}
            className={[
              'flex min-h-[56px] items-center gap-3 py-3',
              index > 0 ? 'border-t border-white/[0.05]' : 'pt-0',
            ].join(' ')}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange">
              <AlertTriangle size={17} strokeWidth={2.1} />
            </span>
            <p className="min-w-0 flex-1 text-[15px] leading-5 text-white">{reminder}</p>
            <ChevronRight size={14} className="text-white/30" strokeWidth={2.1} />
          </div>
        ))}
      </Card>
    </section>
  )
}

function KeyPeopleSection() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '240ms' }}>
      <SectionTitle title="Key people" />
      <Card variant="small" className="p-4">
        {relationshipsDashboard.people.map((person, index) => (
          <div
            key={person.name}
            className={[
              'flex min-h-[64px] items-center gap-3 py-3',
              index > 0 ? 'border-t border-white/[0.05]' : 'pt-0',
            ].join(' ')}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-domain-relationships/15 text-[15px] font-semibold text-white">
              {person.initials}
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[16px] font-semibold leading-[22px] text-white">{person.name}</div>
              <div className={`mt-0.5 truncate text-caption leading-[18px] ${person.fading ? 'text-brand-orange' : 'text-white/50'}`}>
                {person.relationship} - {person.lastInteraction}
              </div>
            </div>
            <ChevronRight size={14} className="text-white/30" strokeWidth={2.1} />
          </div>
        ))}
        <button
          type="button"
          className="flex min-h-11 items-center gap-2 border-t border-white/[0.05] pt-3 text-[15px] leading-5 text-brand-orange"
        >
          <Plus size={16} strokeWidth={2.3} />
          Add person
        </button>
      </Card>
    </section>
  )
}

function QualityTimeSection() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '320ms' }}>
      <div className="mb-3 flex h-8 items-center justify-between">
        <h2 className="text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/50">
          Recent quality time
        </h2>
        <button className="flex h-8 items-center text-caption leading-[18px] text-brand-orange" type="button">
          View all
        </button>
      </div>
      <Card variant="small" className="p-4">
        {relationshipsDashboard.qualityTime.map((entry, index) => {
          const Icon = index === 0 ? Coffee : Utensils

          return (
            <div
              key={entry.activity}
              className={[
                'flex min-h-[56px] items-center gap-3 py-3',
                index > 0 ? 'border-t border-white/[0.05]' : 'pt-0',
              ].join(' ')}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-domain-relationships/15 text-domain-relationships">
                <Icon size={17} strokeWidth={2.1} />
              </span>
              <div className="min-w-0">
                <div className="truncate text-[16px] font-semibold leading-[22px] text-white">{entry.activity}</div>
                <div className="mt-0.5 text-caption leading-[18px] text-white/50">
                  {entry.date} - {entry.duration}
                </div>
              </div>
            </div>
          )
        })}
      </Card>
    </section>
  )
}

function SiaSuggestion() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '400ms' }}>
      <SectionTitle title="SIA suggests" />
      <Card variant="small" className="p-4">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-royal-purple/15 text-royal-purple">
            <Lightbulb size={17} strokeWidth={2.1} />
          </span>
          <p className="min-w-0 flex-1 text-[15px] leading-5 text-white">{relationshipsDashboard.suggestion}</p>
        </div>
        <div className="mt-4 flex gap-2 pl-11">
          <Button size="compact" className="min-w-[78px]">
            Do it
          </Button>
          <Button size="compact" variant="ghost" className="min-w-[78px]">
            Skip
          </Button>
        </div>
      </Card>
    </section>
  )
}

function UpcomingDates() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '480ms' }}>
      <SectionTitle title="Upcoming dates" />
      <Card variant="small" className="p-4">
        {relationshipsDashboard.dates.map((date, index) => (
          <div
            key={date.name}
            className={[
              'flex min-h-[48px] items-center gap-3 py-3',
              index > 0 ? 'border-t border-white/[0.05]' : 'pt-0',
            ].join(' ')}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-domain-relationships/15 text-domain-relationships">
              <Gift size={17} strokeWidth={2.1} />
            </span>
            <div className="min-w-0">
              <div className="truncate text-[16px] font-semibold leading-[22px] text-white">{date.name}</div>
              <div className={`mt-0.5 text-caption leading-[18px] ${date.urgency === 'soon' ? 'text-brand-orange' : 'text-white/50'}`}>
                {date.date} - {date.countdown}
              </div>
            </div>
          </div>
        ))}
      </Card>
    </section>
  )
}

export default function RelationshipsScreen() {
  return (
    <PhoneFrame>
      <ScreenShell
        header={<DomainDashboardHeader title="Relationships" domain="relationships" level={7} />}
        activeTab="me"
        bottomAction={<FAB label="Log quality time" icon={<Plus size={24} strokeWidth={2.2} />} />}
      >
        <main className="px-4 pb-6 pt-4">
          <SIACoachingNote
            message={relationshipsDashboard.siaNote}
            actionLabel="Ask SIA"
            className="animate-fade-up p-4"
          />

          <CheckInSection />
          <KeyPeopleSection />
          <QualityTimeSection />
          <SiaSuggestion />
          <UpcomingDates />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
