'use client'

import { useState } from 'react'
import { AlertTriangle, Bell, Check, Lock, Plus, X } from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { Input } from '@/components/design-system/Input'
import { SegmentedControl } from '@/components/design-system/SegmentedControl'
import { DomainDashboardHeader } from '@/components/domain/DomainDashboardHeader'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { SIACoachingNote } from '@/components/screens/SIACoachingNote'
import { medicationTracking } from '@/data/mock'

// Screen 60 of 78: Medication tracking
// Spec: /Users/hamza/yHealth/app_design 3/60-medication-tracking.md

type MedicationRecord = (typeof medicationTracking.medications)[number] & { notes?: string }

type MedicationSheet =
  | { mode: 'add' }
  | { mode: 'list' }
  | { mode: 'detail'; name: string }

type MedicationDraft = {
  name: string
  dosage: string
  frequency: string
  time: string
  startDate: string
  notes: string
  reminder: boolean
  reminderOffset: string
}

const initialMedicationDraft: MedicationDraft = {
  name: '',
  dosage: '',
  frequency: 'daily',
  time: '8:00 AM',
  startDate: 'May 27, 2026',
  notes: '',
  reminder: true,
  reminderOffset: '15 min',
}

const frequencyOptions = [
  { label: 'Daily', value: 'daily' },
  { label: 'Twice', value: 'twice daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'PRN', value: 'as needed' },
]

const reminderOffsetOptions = ['5 min', '15 min', '30 min', '1 hour']

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 px-1 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">
      {children}
    </div>
  )
}

function AdherenceSummary({ taken, total }: { taken: number; total: number }) {
  const percent = Math.round((taken / total) * 100)
  return (
    <section className="mt-4 animate-fade-up" style={{ animationDelay: '80ms' }}>
      <div className="flex items-center justify-between">
        <div className="text-body font-semibold leading-[22px] text-white">
          {taken} of {total} today
        </div>
        <div className="text-body font-semibold leading-[22px] text-domain-wellbeing tabular-nums">{percent}%</div>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-pill bg-white/[0.08]">
        <div className="h-full rounded-pill bg-domain-wellbeing" style={{ width: `${percent}%` }} />
      </div>
    </section>
  )
}

function WarningBanner() {
  return (
    <Card variant="small" className="mt-4 rounded-lg border-stalled-amber/30 bg-stalled-amber/10 p-4 animate-fade-up" style={{ animationDelay: '160ms' }}>
      <div className="flex items-start gap-3">
        <AlertTriangle size={18} className="mt-0.5 shrink-0 text-stalled-amber" strokeWidth={2.2} />
        <div>
          <div className="text-[15px] font-semibold leading-5 text-white">Medication interactions</div>
          <p className="mt-1 text-caption leading-[18px] text-white/60">Always consult your doctor before changing medications.</p>
        </div>
      </div>
    </Card>
  )
}

function MedicationCheckRow({ item, divider, taken, onToggle }: { item: { name: string; dosage: string; schedule: string; taken: boolean }; divider?: boolean; taken: boolean; onToggle: () => void }) {
  return (
    <button type="button" onClick={onToggle} aria-pressed={taken} className={['flex min-h-[62px] w-full items-center gap-3 px-4 py-3 text-left', divider ? 'border-t border-white/[0.05]' : ''].join(' ')}>
      <span className={['flex h-6 w-6 shrink-0 items-center justify-center rounded-xs border', taken ? 'border-domain-wellbeing bg-domain-wellbeing text-white' : 'border-white/20 text-transparent'].join(' ')}>
        <Check size={14} strokeWidth={2.6} />
      </span>
      <div className="min-w-0 flex-1">
        <div className={['truncate text-[15px] font-semibold leading-5', taken ? 'text-white/50' : 'text-white'].join(' ')}>
          {item.name} {item.dosage}
        </div>
        <div className="mt-1 text-caption leading-[18px] text-white/40">{item.schedule}</div>
      </div>
    </button>
  )
}

function TodaysMedications({ takenIds, onToggle }: { takenIds: string[]; onToggle: (id: string) => void }) {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '240ms' }}>
      <SectionEyebrow>Medications today</SectionEyebrow>
      <Card variant="small" className="rounded-xl p-0">
        {medicationTracking.groups.map((group, groupIndex) => (
          <div key={group.label}>
            <div className={['px-4 pb-2 pt-4 text-small font-semibold uppercase leading-[14px] tracking-[0.12em] text-domain-wellbeing', groupIndex > 0 ? 'border-t border-white/[0.05]' : ''].join(' ')}>
              {group.label}
            </div>
            {group.items.map((item, itemIndex) => (
              <MedicationCheckRow key={item.name} item={item} taken={takenIds.includes(item.name)} onToggle={() => onToggle(item.name)} divider={itemIndex > 0} />
            ))}
          </div>
        ))}
      </Card>
    </section>
  )
}

function AllMedications({ medications, onDetail, onSeeAll }: { medications: MedicationRecord[]; onDetail: (name: string) => void; onSeeAll: () => void }) {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '320ms' }}>
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">All medications</div>
        <button type="button" onClick={onSeeAll} className="min-h-11 px-2 text-caption font-semibold leading-[18px] text-brand-orange">See all</button>
      </div>
      <Card variant="small" className="rounded-xl p-0">
        {medications.map((item, index) => (
          <button type="button" key={item.name} onClick={() => onDetail(item.name)} className={['w-full px-4 py-4 text-left', index > 0 ? 'border-t border-white/[0.05]' : ''].join(' ')}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[15px] font-semibold leading-5 text-white">{item.name}</div>
                <div className="mt-1 text-caption leading-[18px] text-white/50">{item.details}</div>
                <div className="text-small leading-[14px] text-white/30">{item.since}</div>
              </div>
              <div className="inline-flex items-center gap-1 rounded-pill bg-domain-wellbeing/15 px-2.5 py-1 text-small font-semibold leading-3 text-domain-wellbeing">
                <Bell size={12} strokeWidth={2.2} />
                {item.reminder}
              </div>
            </div>
          </button>
        ))}
      </Card>
    </section>
  )
}

function AdherenceHistory() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '400ms' }}>
      <SectionEyebrow>Adherence history</SectionEyebrow>
      <Card>
        <div className="grid grid-cols-7 gap-1 text-center text-small leading-[14px] text-white/30">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}
        </div>
        <div className="mt-3 space-y-1.5">
          {medicationTracking.adherenceRows.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-7 gap-1.5">
              {row.map((value, index) => (
                <span
                  key={`${rowIndex}-${index}`}
                  className={[
                    'h-7 rounded-xs border border-transparent',
                    value === 0 ? 'bg-white/[0.03]' : value === 2 ? 'bg-domain-wellbeing/25' : value === 3 ? 'bg-domain-wellbeing/55' : 'bg-domain-wellbeing',
                  ].join(' ')}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between text-caption leading-[18px]">
          <span className="text-white/40">May 2026</span>
          <span className="font-semibold text-domain-wellbeing">87% adherence</span>
        </div>
      </Card>
    </section>
  )
}

function PrivacyNotice() {
  return (
    <Card variant="small" className="mt-4 rounded-lg p-4 animate-fade-up" style={{ animationDelay: '480ms' }}>
      <div className="flex items-start gap-3">
        <Lock size={16} className="mt-0.5 shrink-0 text-white/40" strokeWidth={2.2} />
        <p className="text-caption leading-[18px] text-white/60">
          Your medication data is encrypted and private. Only you can see it.
        </p>
      </div>
    </Card>
  )
}

function AddMedicationFab({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="mx-auto flex h-[48px] items-center justify-center gap-2 rounded-pill border border-white/[0.06] bg-brand-orange px-5 text-[15px] font-semibold leading-5 text-white shadow-2 shadow-brand-orange/30">
      <Plus size={16} strokeWidth={2.4} />
      Add medication
    </button>
  )
}

function MedicationSwitch({ checked, label, onCheckedChange }: { checked: boolean; label: string; onCheckedChange: (checked: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onCheckedChange(!checked)}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full focus-visible:ring-2 focus-visible:ring-brand-orange/70"
    >
      <span className={['relative h-5 w-[34px] rounded-pill transition-colors duration-[var(--dur-fast)]', checked ? 'bg-brand-orange' : 'bg-white/15'].join(' ')}>
        <span className={['absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform duration-[var(--dur-fast)]', checked ? 'translate-x-[16px]' : 'translate-x-0.5'].join(' ')} />
      </span>
    </button>
  )
}

function MedicationSheetFrame({ label, children, onDismiss }: { label: string; children: React.ReactNode; onDismiss: () => void }) {
  return (
    <div className="absolute inset-0 z-40 flex items-end bg-black/50" role="presentation">
      <button type="button" aria-label="Dismiss medication sheet" onClick={onDismiss} className="absolute inset-0 cursor-default" />
      <section
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className="relative z-10 max-h-[720px] w-full overflow-y-auto rounded-t-2xl border border-white/[0.08] bg-ink-brown-800 px-5 pb-6 pt-3 shadow-3 animate-fade-up"
      >
        <div className="mx-auto h-1 w-9 rounded-pill bg-white/20" />
        {children}
      </section>
    </div>
  )
}

function SheetHeader({ title, onClose, action }: { title: string; onClose: () => void; action?: React.ReactNode }) {
  return (
    <div className="mt-3 flex min-h-11 items-center justify-between gap-3">
      <button type="button" onClick={onClose} className="min-h-11 rounded-pill px-1 text-caption font-semibold leading-[18px] text-white/60">
        Cancel
      </button>
      <h2 className="text-h3 font-semibold leading-[22px] text-white">{title}</h2>
      <div className="min-w-[52px] text-right">{action}</div>
    </div>
  )
}

function AddMedicationSheet({
  draft,
  onDraftChange,
  onCancel,
  onSave,
}: {
  draft: MedicationDraft
  onDraftChange: (patch: Partial<MedicationDraft>) => void
  onCancel: () => void
  onSave: () => void
}) {
  const canSave = draft.name.trim().length > 0 && draft.dosage.trim().length > 0

  return (
    <MedicationSheetFrame label="Add medication" onDismiss={onCancel}>
      <SheetHeader
        title="Add medication"
        onClose={onCancel}
        action={(
          <button type="button" onClick={onSave} disabled={!canSave} className="min-h-11 min-w-11 rounded-pill px-1 text-caption font-semibold leading-[18px] text-brand-orange disabled:text-white/25">
            Save
          </button>
        )}
      />

      <div className="mt-4 space-y-4">
        <Input
          label="Medication name"
          value={draft.name}
          onChange={(event) => onDraftChange({ name: event.currentTarget.value })}
          placeholder="Metformin"
          autoFocus
        />
        <Input
          label="Dosage"
          value={draft.dosage}
          onChange={(event) => onDraftChange({ dosage: event.currentTarget.value })}
          placeholder="500mg"
        />
        <p className="rounded-md bg-white/[0.04] px-3 py-2 text-caption leading-[18px] text-white/50" id="medication-add-validation">
          {canSave ? 'Ready to save medication.' : 'Name and dosage are required before saving.'}
        </p>

        <div>
          <div className="mb-2 text-caption font-semibold text-white/70">Frequency</div>
          <SegmentedControl options={frequencyOptions} activeValue={draft.frequency} onValueChange={(value) => onDraftChange({ frequency: value })} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input label="Time of day" value={draft.time} onChange={(event) => onDraftChange({ time: event.currentTarget.value })} />
          <Input label="Start date" value={draft.startDate} onChange={(event) => onDraftChange({ startDate: event.currentTarget.value })} />
        </div>

        <label className="block">
          <span className="mb-2 block text-caption font-semibold text-white/70">Notes</span>
          <textarea
            value={draft.notes}
            onChange={(event) => onDraftChange({ notes: event.currentTarget.value })}
            placeholder="Take with food"
            className="min-h-[86px] w-full resize-none rounded-md border border-white/10 bg-ink-brown-800 px-4 py-3 text-body text-white outline-none transition-colors duration-[var(--dur-fast)] placeholder:text-white/40 focus:border-2 focus:border-brand-orange"
          />
        </label>

        <div className="rounded-lg border border-white/[0.06] bg-ink-900/60 p-4">
          <div className="flex min-h-11 items-center justify-between gap-3">
            <div>
              <div className="text-[15px] font-semibold leading-5 text-white">Reminder</div>
              <div className="mt-1 text-caption leading-[18px] text-white/45">{draft.reminder ? `${draft.reminderOffset} before dose` : 'Off'}</div>
            </div>
            <MedicationSwitch checked={draft.reminder} onCheckedChange={(checked) => onDraftChange({ reminder: checked })} label="Toggle medication reminder" />
          </div>
          {draft.reminder && (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {reminderOffsetOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => onDraftChange({ reminderOffset: option })}
                  aria-pressed={draft.reminderOffset === option}
                  className={[
                    'min-h-11 rounded-pill px-2 text-small font-semibold leading-[14px]',
                    draft.reminderOffset === option ? 'bg-brand-orange text-white' : 'bg-white/[0.06] text-white/55',
                  ].join(' ')}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

      </div>
    </MedicationSheetFrame>
  )
}

function AllMedicationsSheet({ medications, onDismiss, onDetail }: { medications: MedicationRecord[]; onDismiss: () => void; onDetail: (name: string) => void }) {
  return (
    <MedicationSheetFrame label="All medications" onDismiss={onDismiss}>
      <SheetHeader title="All medications" onClose={onDismiss} />
      <div className="mt-4 rounded-lg border border-white/[0.06] bg-ink-900/60 p-4">
        <div className="text-caption leading-[18px] text-white/50">Active medications</div>
        <div className="mt-1 text-h3 font-semibold leading-[22px] text-white">{medications.length} tracked</div>
        <div className="mt-2 text-caption leading-[18px] text-domain-wellbeing">87% adherence this month</div>
      </div>
      <div className="mt-4 overflow-hidden rounded-xl border border-white/[0.06]">
        {medications.map((item, index) => (
          <button
            key={item.name}
            type="button"
            onClick={() => onDetail(item.name)}
            className={['flex min-h-[74px] w-full items-center justify-between gap-3 bg-ink-900/40 px-4 py-3 text-left', index > 0 ? 'border-t border-white/[0.06]' : ''].join(' ')}
          >
            <div className="min-w-0">
              <div className="truncate text-[15px] font-semibold leading-5 text-white">{item.name}</div>
              <div className="mt-1 text-caption leading-[18px] text-white/45">{item.details}</div>
            </div>
            <div className="shrink-0 text-right">
              <div className="text-small font-semibold leading-[14px] text-domain-wellbeing">{item.reminder}</div>
              <div className="mt-1 text-small leading-[14px] text-white/35">Details</div>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-lg border border-white/[0.06] bg-ink-900/60 p-4">
        <div className="text-[15px] font-semibold leading-5 text-white">History summary</div>
        <p className="mt-2 text-caption leading-[18px] text-white/55">Last 7 days: 25 of 28 doses taken. No interaction warnings have been added by the user.</p>
      </div>
    </MedicationSheetFrame>
  )
}

function MedicationDetailSheet({
  medication,
  reminderOn,
  status,
  onReminderChange,
  onDismiss,
}: {
  medication: MedicationRecord
  reminderOn: boolean
  status: string
  onReminderChange: (checked: boolean) => void
  onDismiss: () => void
}) {
  return (
    <MedicationSheetFrame label={`${medication.name} details`} onDismiss={onDismiss}>
      <div className="mt-3 flex min-h-11 items-center justify-between gap-3">
        <div>
          <div className="text-h3 font-semibold leading-[22px] text-white">{medication.name}</div>
          <div className="mt-1 text-caption leading-[18px] text-white/45">{medication.details}</div>
        </div>
        <button type="button" onClick={onDismiss} aria-label="Close medication detail" className="flex h-11 w-11 items-center justify-center rounded-full text-white/50">
          <X size={18} />
        </button>
      </div>

      {status && (
        <div className="mt-4 rounded-md bg-forest-green/10 px-3 py-2 text-caption leading-[18px] text-forest-green" role="status">
          {status}
        </div>
      )}

      <div className="mt-4 space-y-3">
        <div className="rounded-lg border border-white/[0.06] bg-ink-900/60 p-4">
          <div className="text-caption font-semibold uppercase leading-4 tracking-[0.12em] text-white/35">Schedule</div>
          <div className="mt-2 flex items-center justify-between gap-3">
            <span className="text-[15px] font-semibold leading-5 text-white">{medication.since}</span>
            <span className="rounded-pill bg-domain-wellbeing/15 px-3 py-1 text-small font-semibold leading-3 text-domain-wellbeing">{medication.reminder}</span>
          </div>
          {medication.notes && <p className="mt-2 text-caption leading-[18px] text-white/50">{medication.notes}</p>}
        </div>

        <div className="rounded-lg border border-white/[0.06] bg-ink-900/60 p-4">
          <div className="flex min-h-11 items-center justify-between gap-3">
            <div>
              <div className="text-[15px] font-semibold leading-5 text-white">Reminder settings</div>
              <div className="mt-1 text-caption leading-[18px] text-white/45">{reminderOn ? `Push reminder at ${medication.reminder}` : 'Reminder paused for this medication'}</div>
            </div>
            <MedicationSwitch checked={reminderOn} onCheckedChange={onReminderChange} label={`Toggle ${medication.name} reminder`} />
          </div>
        </div>

        <div className="rounded-lg border border-white/[0.06] bg-ink-900/60 p-4">
          <div className="text-[15px] font-semibold leading-5 text-white">Dose history</div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            {[
              { value: '6/7', label: 'This week' },
              { value: '25/28', label: '4 weeks' },
              { value: '0', label: 'Skipped' },
            ].map((item) => (
              <div key={item.label} className="rounded-md bg-white/[0.04] px-2 py-3">
                <div className="text-body font-semibold leading-[22px] text-white">{item.value}</div>
                <div className="mt-1 text-small leading-[14px] text-white/35">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-stalled-amber/25 bg-stalled-amber/10 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle size={16} className="mt-0.5 shrink-0 text-stalled-amber" />
            <p className="text-caption leading-[18px] text-white/60">Interaction notes are informational. Confirm medication changes with a clinician.</p>
          </div>
        </div>

        <div className="rounded-lg border border-white/[0.06] bg-ink-900/60 p-4">
          <div className="flex items-start gap-3">
            <Lock size={16} className="mt-0.5 shrink-0 text-domain-wellbeing" />
            <p className="text-caption leading-[18px] text-white/55">Only you can view this medication record. SIA uses it only with your health-data settings.</p>
          </div>
        </div>

        <button type="button" onClick={onDismiss} className="h-12 w-full rounded-pill bg-brand-orange font-semibold text-white">Done</button>
      </div>
    </MedicationSheetFrame>
  )
}

export default function MedicationTrackingScreen() {
  const [takenIds, setTakenIds] = useState(medicationTracking.groups.flatMap((group) => group.items).filter((item) => item.taken).map((item) => item.name))
  const [sheet, setSheet] = useState<MedicationSheet | null>(null)
  const [draft, setDraft] = useState<MedicationDraft>(initialMedicationDraft)
  const [savedMedication, setSavedMedication] = useState<MedicationRecord | null>(null)
  const [sheetStatus, setSheetStatus] = useState('')
  const [reminderStates, setReminderStates] = useState<Record<string, boolean>>({})
  const allDoseCount = medicationTracking.groups.flatMap((group) => group.items).length
  const medications = savedMedication ? [savedMedication, ...medicationTracking.medications] : medicationTracking.medications
  const selectedMedication = sheet?.mode === 'detail' ? medications.find((item) => item.name === sheet.name) : undefined

  const openDetail = (name: string) => {
    setSheetStatus('')
    setSheet({ mode: 'detail', name })
  }

  const closeSheet = () => {
    setSheet(null)
    setSheetStatus('')
  }

  const saveMedication = () => {
    const name = draft.name.trim()
    const dosage = draft.dosage.trim()
    if (!name || !dosage) return

    const medication: MedicationRecord = {
      name,
      details: `${dosage} - ${draft.frequency}`,
      since: `starts ${draft.startDate}`,
      reminder: draft.reminder ? draft.time : 'off',
      notes: draft.notes.trim() || 'No notes added.',
    }

    setSavedMedication(medication)
    setReminderStates((states) => ({ ...states, [name]: draft.reminder }))
    setSheetStatus(`Medication saved: ${name} ${dosage}.`)
    setSheet({ mode: 'detail', name })
    setDraft(initialMedicationDraft)
  }

  return (
    <PhoneFrame>
      <ScreenShell
        header={<DomainDashboardHeader title="Medication tracking" domain="wellbeing" level={7} backHref="/tabs/me/explore" />}
        activeTab="me"
        bottomAction={<AddMedicationFab onClick={() => { setSheetStatus(''); setSheet({ mode: 'add' }) }} />}
      >
        {sheet?.mode === 'add' && (
          <AddMedicationSheet draft={draft} onDraftChange={(patch) => setDraft((value) => ({ ...value, ...patch }))} onCancel={closeSheet} onSave={saveMedication} />
        )}
        {sheet?.mode === 'list' && (
          <AllMedicationsSheet medications={medications} onDismiss={closeSheet} onDetail={(name) => { setSheetStatus(''); setSheet({ mode: 'detail', name }) }} />
        )}
        {selectedMedication && (
          <MedicationDetailSheet
            medication={selectedMedication}
            reminderOn={reminderStates[selectedMedication.name] ?? selectedMedication.reminder !== 'off'}
            status={sheetStatus}
            onReminderChange={(checked) => setReminderStates((states) => ({ ...states, [selectedMedication.name]: checked }))}
            onDismiss={closeSheet}
          />
        )}
        <main className="px-4 pb-6 pt-4" aria-hidden={sheet ? true : undefined}>
          <SIACoachingNote message={medicationTracking.siaNote} className="p-4 animate-fade-up" />
          <AdherenceSummary taken={takenIds.length} total={allDoseCount} />
          <WarningBanner />
          <TodaysMedications takenIds={takenIds} onToggle={(id) => setTakenIds((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id])} />
          <AllMedications medications={medications} onDetail={openDetail} onSeeAll={() => { setSheetStatus(''); setSheet({ mode: 'list' }) }} />
          <AdherenceHistory />
          <PrivacyNotice />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
