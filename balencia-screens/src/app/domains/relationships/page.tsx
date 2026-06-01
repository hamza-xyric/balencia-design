'use client'

import { useState } from 'react'
import { AlertTriangle, Check, ChevronRight, Coffee, Eye, Gift, Lightbulb, Plus, Settings, Utensils, X } from 'lucide-react'
import { Button } from '@/components/design-system/Button'
import { Card } from '@/components/design-system/Card'
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
  const [handled, setHandled] = useState<string[]>([])

  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '160ms' }}>
      <SectionTitle title="Check in" />
      <Card variant="small" className="p-4">
        {relationshipsDashboard.reminders.map((reminder, index) => (
          <button
            key={reminder}
            type="button"
            onClick={() => setHandled((items) => items.includes(reminder) ? items : [...items, reminder])}
            aria-pressed={handled.includes(reminder)}
            className={[
              'flex min-h-[56px] w-full items-center gap-3 py-3 text-left',
              index > 0 ? 'border-t border-white/[0.05]' : 'pt-0',
            ].join(' ')}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange">
              <AlertTriangle size={17} strokeWidth={2.1} />
            </span>
            <p className={['min-w-0 flex-1 text-[15px] leading-5', handled.includes(reminder) ? 'text-white/40 line-through' : 'text-white'].join(' ')}>{reminder}</p>
            {handled.includes(reminder) ? <Check size={16} className="text-forest-green" /> : <ChevronRight size={14} className="text-white/30" strokeWidth={2.1} />}
          </button>
        ))}
      </Card>
    </section>
  )
}

function KeyPeopleSection({ onAdd, onSettings }: { onAdd: () => void; onSettings: () => void }) {
  const [expanded, setExpanded] = useState('')

  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '240ms' }}>
      <SectionTitle title="Key people" />
      <Card variant="small" className="p-4">
        {relationshipsDashboard.people.map((person, index) => (
          <div key={person.name} className={index > 0 ? 'border-t border-white/[0.05]' : ''}>
            <button
              type="button"
              onClick={() => setExpanded(expanded === person.name ? '' : person.name)}
              aria-expanded={expanded === person.name}
              className="flex min-h-[64px] w-full items-center gap-3 py-3 text-left"
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
              <ChevronRight size={14} className={['text-white/30 transition-transform', expanded === person.name ? 'rotate-90' : ''].join(' ')} strokeWidth={2.1} />
            </button>
            {expanded === person.name && (
              <div className="pb-3 pl-[52px]">
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-md bg-ink-900 p-2 text-center">
                    <div className="text-[15px] font-semibold leading-5 text-white">{person.lastInteraction.includes('week') ? '2' : '5'}</div>
                    <div className="mt-0.5 text-small leading-[14px] text-white/40">Interactions</div>
                  </div>
                  <div className="rounded-md bg-ink-900 p-2 text-center">
                    <div className="text-[15px] font-semibold leading-5 text-white">{person.fading ? 'Fading' : 'Healthy'}</div>
                    <div className="mt-0.5 text-small leading-[14px] text-white/40">Status</div>
                  </div>
                </div>
                <div className="mt-2 flex gap-2">
                  <button type="button" onClick={onAdd} className="flex min-h-11 flex-1 items-center justify-center rounded-pill bg-ink-900 text-caption font-semibold text-white/60">Log time</button>
                  <button type="button" onClick={onSettings} className="flex min-h-11 flex-1 items-center justify-center rounded-pill bg-ink-900 text-caption font-semibold text-white/60">Settings</button>
                </div>
              </div>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={onAdd}
          className="flex min-h-11 items-center gap-2 border-t border-white/[0.05] pt-3 text-[15px] leading-5 text-brand-orange"
        >
          <Plus size={16} strokeWidth={2.3} />
          Add person
        </button>
        <button type="button" onClick={onSettings} className="mt-2 flex min-h-11 items-center gap-2 text-[15px] leading-5 text-white/60">
          <Settings size={16} />Relationship tracking settings
        </button>
      </Card>
    </section>
  )
}

function QualityTimeSection({ onLog }: { onLog: () => void }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '320ms' }}>
      <div className="mb-3 flex h-8 items-center justify-between">
        <h2 className="text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/50">
          Recent quality time
        </h2>
        <button onClick={() => setExpanded(!expanded)} className="flex h-11 items-center text-caption leading-[18px] text-brand-orange" type="button" aria-expanded={expanded}>
          View all
        </button>
      </div>
      <Card variant="small" className="p-4">
        {relationshipsDashboard.qualityTime.concat(expanded ? [{ activity: 'Voice note catch-up', date: 'May 18', duration: '8 min' }] : []).map((entry, index) => {
          const Icon = index === 0 ? Coffee : Utensils

          return (
            <button
              type="button"
              onClick={onLog}
              key={entry.activity}
              className={[
                'flex min-h-[56px] w-full items-center gap-3 py-3 text-left',
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
            </button>
          )
        })}
      </Card>
    </section>
  )
}

function SiaSuggestion() {
  const [state, setState] = useState<'open' | 'done' | 'skipped'>('open')

  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '400ms' }}>
      <SectionTitle title="SIA suggests" />
      <Card variant="small" className="p-4">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-royal-purple/15 text-royal-purple">
            <Lightbulb size={17} strokeWidth={2.1} />
          </span>
        <p className="min-w-0 flex-1 text-[15px] leading-5 text-white">{state === 'done' ? 'Done. SIA will remind you to follow up gently tomorrow.' : state === 'skipped' ? 'Skipped for now. The suggestion is snoozed for 7 days.' : relationshipsDashboard.suggestion}</p>
        </div>
        <div className="mt-4 flex gap-2 pl-11">
          <Button onClick={() => setState('done')} size="compact" className="min-w-[78px]">
            Do it
          </Button>
          <Button onClick={() => setState('skipped')} size="compact" variant="ghost" className="min-w-[78px]">
            Skip
          </Button>
        </div>
        <div className="mt-3 flex items-center gap-2 pl-11 text-caption leading-[18px] text-white/45"><Eye size={14} />Based on opted-in reminders only. No contact-pattern inference is enabled.</div>
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
  const [sheet, setSheet] = useState<'person' | 'quality' | 'settings' | null>(null)
  const [name, setName] = useState('')
  const [toast, setToast] = useState('')
  const save = (message: string) => {
    setSheet(null)
    setToast(message)
    window.setTimeout(() => setToast(''), 3000)
  }
  const openSheet = (nextSheet: 'person' | 'quality' | 'settings') => {
    setToast('')
    setSheet(nextSheet)
  }

  return (
    <PhoneFrame>
      <ScreenShell
        header={<DomainDashboardHeader title="Relationships" domain="relationships" level={7} />}
        activeTab="me"
        bottomAction={<button type="button" onClick={() => openSheet('quality')} className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange text-white shadow-2 shadow-brand-orange/30 transition-transform duration-[var(--dur-fast)] active:scale-[0.93]" aria-label="Log quality time"><Plus size={24} strokeWidth={2.2} /></button>}
      >
        <main className="px-4 pb-20 pt-4">
          <SIACoachingNote
            message={relationshipsDashboard.siaNote}
            actionLabel="Ask SIA"
            actionHref="/tabs/sia?context=relationships"
            className="animate-fade-up p-4"
          />

          <CheckInSection />
          <KeyPeopleSection onAdd={() => openSheet('person')} onSettings={() => openSheet('settings')} />
          <QualityTimeSection onLog={() => openSheet('quality')} />
          <SiaSuggestion />
          <UpcomingDates />
        </main>
        {sheet && (
          <div className="absolute inset-x-0 bottom-[84px] z-20 mx-3 rounded-xl border border-white/10 bg-ink-brown-800 p-4 shadow-2" role="dialog" aria-label={sheet === 'person' ? 'Add person' : sheet === 'quality' ? 'Log quality time' : 'Relationship tracking settings'}>
            <div className="flex items-center justify-between">
              <h2 className="text-[17px] font-semibold text-white">{sheet === 'person' ? 'Add person' : sheet === 'quality' ? 'Log quality time' : 'Tracking settings'}</h2>
              <button type="button" onClick={() => setSheet(null)} className="flex h-11 w-11 items-center justify-center rounded-full text-white/60" aria-label="Cancel"><X size={18} /></button>
            </div>
            {sheet === 'settings' ? (
              <div className="mt-3 space-y-3 text-caption leading-[18px] text-white/55">
                <label className="flex min-h-11 items-center justify-between rounded-md bg-ink-900 px-3"><span>Allow SIA relationship nudges</span><input type="checkbox" defaultChecked /></label>
                <label className="flex min-h-11 items-center justify-between rounded-md bg-ink-900 px-3"><span>Use contact frequency inference</span><input type="checkbox" /></label>
                <Button onClick={() => save('Relationship settings saved')} fullWidth variant="completion">Save settings</Button>
              </div>
            ) : (
              <>
                <label className="mt-3 block text-caption leading-[18px] text-white/50">{sheet === 'person' ? 'Name' : 'Person and activity'}
                  <input value={name} onChange={(event) => setName(event.target.value)} placeholder={sheet === 'person' ? 'Amina' : 'Coffee with Amina'} className="mt-1 h-11 w-full rounded-md border border-white/10 bg-ink-900 px-3 text-[15px] text-white outline-none placeholder:text-white/30" />
                </label>
                <label className="mt-3 block text-caption leading-[18px] text-white/50">Visibility
                  <select className="mt-1 h-11 w-full rounded-md border border-white/10 bg-ink-900 px-3 text-[15px] text-white outline-none">
                    <option>Private to me</option>
                    <option>Visible to SIA coaching</option>
                  </select>
                </label>
                <Button disabled={!name.trim()} onClick={() => save(sheet === 'person' ? 'Person added' : 'Quality time logged')} fullWidth variant="completion" className="mt-3">Save</Button>
              </>
            )}
          </div>
        )}
        {toast && !sheet && (
          <div className="absolute inset-x-4 bottom-[96px] z-30 flex min-h-11 items-center gap-2 rounded-pill bg-forest-green px-4 text-[14px] font-semibold text-white shadow-2" role="status"><Check size={16} />{toast}</div>
        )}
      </ScreenShell>
    </PhoneFrame>
  )
}
