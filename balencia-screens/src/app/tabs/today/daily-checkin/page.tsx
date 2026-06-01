'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
import { Button } from '@/components/design-system/Button'
import { Card } from '@/components/design-system/Card'
import { MoodSelector } from '@/components/domain/MoodSelector'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { dailyCheckin } from '@/data/mock'

// Screen 45 of 78: Daily check-in
// Spec: /Users/hamza/yHealth/app_design 3/45-daily-checkin.md

function ModalHeader({ onCancel, onSave, canSave }: { onCancel: () => void; onSave: () => void; canSave: boolean }) {
  return (
    <header className="h-[56px] shrink-0 bg-ink-900 px-4">
      <div className="mx-auto mt-2 h-1 w-9 rounded-pill bg-white/20" />
      <div className="mt-2 flex h-10 items-center justify-between">
        <button type="button" onClick={onCancel} className="flex min-h-11 items-center px-2 text-[15px] leading-5 text-white/60">Cancel</button>
        <button
          type="button"
          onClick={onSave}
          disabled={!canSave}
          className="flex min-h-11 items-center px-2 text-[15px] font-semibold leading-5 text-brand-orange disabled:text-white/25"
        >
          Save draft
        </button>
      </div>
    </header>
  )
}

function Eyebrow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={['mb-3 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  )
}

function SliderPreview({
  label,
  lowLabel,
  value,
  onChange,
}: {
  label: string
  lowLabel: string
  value: number | null
  onChange: (value: number) => void
}) {
  const sliderValue = value ?? 5
  const percent = Math.max(10, Math.min(sliderValue * 10, 100))
  const isUnset = value === null

  return (
    <section className="animate-fade-up">
      <Eyebrow>{label}</Eyebrow>
      <div className="px-1">
        <div className="mb-3 flex items-center justify-between text-caption leading-[18px] text-white/30">
          <span>{lowLabel}</span>
          <span>High</span>
        </div>
        <div className="relative h-11">
          <div className="absolute left-0 right-0 top-1/2 h-1.5 -translate-y-1/2 rounded-pill bg-white/[0.08]" />
          <div
            className="absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-pill bg-domain-wellbeing"
            style={{ width: isUnset ? '0%' : `${percent}%` }}
          />
          <div
            className={[
              'absolute top-1/2 flex h-6 min-w-6 -translate-y-1/2 items-center justify-center rounded-full px-1 text-small font-bold leading-none shadow-1',
              isUnset ? 'bg-white/20 text-white/60' : 'bg-white text-ink-900',
            ].join(' ')}
            style={{ left: `calc(${isUnset ? 10 : percent}% - 12px)` }}
          >
            {value ?? 'Set'}
          </div>
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={sliderValue}
            onChange={(event) => onChange(Number(event.target.value))}
            className="absolute inset-0 h-11 w-full cursor-pointer opacity-0"
            aria-label={`${label} level`}
            aria-valuetext={isUnset ? `${label} not set` : `${label} level: ${value} out of 10`}
          />
        </div>
      </div>
    </section>
  )
}

function IntentionInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <section className="animate-fade-up" style={{ animationDelay: '240ms' }}>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-[52px] w-full rounded-md border border-domain-wellbeing/40 bg-ink-brown-800 px-4 text-body leading-[22px] text-white outline-none focus:border-domain-wellbeing"
        placeholder="Name the one thing that matters today"
        aria-label="Daily intention"
      />
    </section>
  )
}

function EmotionTags({ selected, onToggle }: { selected: string[]; onToggle: (label: string) => void }) {
  return (
    <section className="animate-fade-up" style={{ animationDelay: '320ms' }}>
      <Eyebrow>How would you describe it?</Eyebrow>
      <div className="flex flex-wrap gap-2">
        {dailyCheckin.emotionTags.map((tag) => (
          <button
            key={tag.label}
            type="button"
            onClick={() => onToggle(tag.label)}
            aria-pressed={selected.includes(tag.label)}
            className={[
              'min-h-11 rounded-pill border px-3 text-caption leading-[18px]',
              selected.includes(tag.label)
                ? 'border-domain-wellbeing/30 bg-domain-wellbeing/15 font-semibold text-domain-wellbeing'
                : 'border-white/[0.08] bg-ink-brown-800 text-white/50',
            ].join(' ')}
          >
            {tag.label}
          </button>
        ))}
      </div>
    </section>
  )
}

function ContextNote({ expanded, value, onToggle, onChange }: { expanded: boolean; value: string; onToggle: () => void; onChange: (value: string) => void }) {
  return (
    <section className="animate-fade-up" style={{ animationDelay: '400ms' }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="flex min-h-11 items-center gap-2 text-[14px] font-semibold leading-5 text-white/50"
      >
        <Plus size={14} className="text-white/40" strokeWidth={2.2} />
        <span>{expanded ? 'Hide note' : 'Add a note'}</span>
      </button>
      {expanded && (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="mt-2 min-h-[96px] w-full rounded-md border border-white/10 bg-ink-brown-800 p-4 text-[15px] text-white outline-none placeholder:text-white/35 focus:border-domain-wellbeing"
          placeholder="Anything SIA should know?"
          aria-label="Optional check-in note"
        />
      )}
    </section>
  )
}

export default function DailyCheckinScreen() {
  const router = useRouter()
  const [mood, setMood] = useState('')
  const [energy, setEnergy] = useState<number | null>(null)
  const [stress, setStress] = useState<number | null>(null)
  const [intention, setIntention] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [noteOpen, setNoteOpen] = useState(false)
  const [note, setNote] = useState('')
  const [status, setStatus] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const hasMeaningfulDraft = mood.length > 0
    || intention.trim().length > 0
    || selectedTags.length > 0
    || note.trim().length > 0
    || energy !== null
    || stress !== null
  const canSubmit = mood.length > 0 && intention.trim().length > 0

  const toggleTag = (label: string) => {
    setSelectedTags((current) => current.includes(label) ? current.filter((item) => item !== label) : [...current, label])
  }

  const save = () => {
    if (!hasMeaningfulDraft) return
    setStatus('Draft saved. SIA will only use it after you check in.')
    window.setTimeout(() => setStatus(''), 2200)
  }

  const submit = () => {
    if (!canSubmit || submitting) return
    setSubmitting(true)
    setStatus(`Check-in complete. +${dailyCheckin.xpReward} XP`)
    window.setTimeout(() => router.push('/tabs/today'), 850)
  }

  return (
    <PhoneFrame>
      <ScreenShell header={<ModalHeader onCancel={() => router.push('/tabs/today')} onSave={save} canSave={hasMeaningfulDraft} />} showTabBar={false}>
        <main className="px-4 pb-12 pt-6">
          <section className="animate-fade-up">
            <h1 className="text-h2 font-bold leading-[26px] text-white">{dailyCheckin.greeting}</h1>
            <p className="mt-1 text-[15px] leading-5 text-white/60">{dailyCheckin.subtext}</p>
            <p className="mt-2 text-caption leading-[18px] text-domain-wellbeing">{dailyCheckin.streakNote}</p>
          </section>

          <section className="mt-6 animate-fade-up" style={{ animationDelay: '80ms' }}>
            <Eyebrow>How are you feeling?</Eyebrow>
            <MoodSelector options={dailyCheckin.moods} selectedLabel={mood} onSelect={setMood} />
          </section>

          <div className="mt-6 space-y-5">
            <SliderPreview label="Energy" lowLabel="low" value={energy} onChange={setEnergy} />
            <SliderPreview label="Stress" lowLabel="calm" value={stress} onChange={setStress} />
          </div>

          <section className="mt-6">
            <Eyebrow>Daily intention</Eyebrow>
            <IntentionInput value={intention} onChange={setIntention} />
          </section>

          <div className="mt-6 space-y-5">
            <EmotionTags selected={selectedTags} onToggle={toggleTag} />
            <ContextNote expanded={noteOpen} value={note} onToggle={() => setNoteOpen((current) => !current)} onChange={setNote} />
          </div>

          <Card variant="small" className="mt-8 rounded-md border-domain-wellbeing/20 p-4 animate-fade-up" style={{ animationDelay: '440ms' }}>
            <div className="text-[15px] font-semibold leading-5 text-white">Wellbeing XP</div>
            <div className="mt-1 text-caption leading-[18px] text-white/50">
              Submit this check-in to earn +{dailyCheckin.xpReward} XP.
            </div>
            <p className="mt-3 text-caption leading-[18px] text-white/45">
              Your note stays private and is shared with SIA only after you check in.
            </p>
          </Card>

          <section className="mt-5 animate-fade-up" style={{ animationDelay: '520ms' }}>
            {status && (
              <div className="mb-3 rounded-md border border-forest-green/25 bg-forest-green/10 px-4 py-3 text-caption font-semibold text-forest-green" role="status">
                {status}
              </div>
            )}
            <Button size="auth" fullWidth disabled={!canSubmit || submitting} onClick={submit}>
              {submitting ? 'checked in' : 'check in'}
            </Button>
          </section>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
