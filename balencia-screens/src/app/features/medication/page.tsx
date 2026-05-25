import { AlertTriangle, Bell, Check, Lock, Plus } from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { DomainDashboardHeader } from '@/components/domain/DomainDashboardHeader'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { SIACoachingNote } from '@/components/screens/SIACoachingNote'
import { medicationTracking } from '@/data/mock'

// Screen 60 of 78: Medication tracking
// Spec: /Users/hamza/yHealth/app_design 3/60-medication-tracking.md

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 px-1 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">
      {children}
    </div>
  )
}

function AdherenceSummary() {
  return (
    <section className="mt-4 animate-fade-up" style={{ animationDelay: '80ms' }}>
      <div className="flex items-center justify-between">
        <div className="text-body font-semibold leading-[22px] text-white">
          {medicationTracking.summary.taken} of {medicationTracking.summary.total} today
        </div>
        <div className="text-body font-semibold leading-[22px] text-domain-wellbeing tabular-nums">{medicationTracking.summary.percent}%</div>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-pill bg-white/[0.08]">
        <div className="h-full rounded-pill bg-domain-wellbeing" style={{ width: `${medicationTracking.summary.percent}%` }} />
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

function MedicationCheckRow({ item, divider }: { item: { name: string; dosage: string; schedule: string; taken: boolean }; divider?: boolean }) {
  return (
    <div className={['flex min-h-[62px] items-center gap-3 px-4 py-3', divider ? 'border-t border-white/[0.05]' : ''].join(' ')}>
      <span className={['flex h-6 w-6 shrink-0 items-center justify-center rounded-xs border', item.taken ? 'border-domain-wellbeing bg-domain-wellbeing text-white' : 'border-white/20 text-transparent'].join(' ')}>
        <Check size={14} strokeWidth={2.6} />
      </span>
      <div className="min-w-0 flex-1">
        <div className={['truncate text-[15px] font-semibold leading-5', item.taken ? 'text-white/50' : 'text-white'].join(' ')}>
          {item.name} {item.dosage}
        </div>
        <div className="mt-1 text-caption leading-[18px] text-white/40">{item.schedule}</div>
      </div>
    </div>
  )
}

function TodaysMedications() {
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
              <MedicationCheckRow key={item.name} item={item} divider={itemIndex > 0} />
            ))}
          </div>
        ))}
      </Card>
    </section>
  )
}

function AllMedications() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '320ms' }}>
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">All medications</div>
        <button type="button" className="text-caption font-semibold leading-[18px] text-brand-orange">See all</button>
      </div>
      <Card variant="small" className="rounded-xl p-0">
        {medicationTracking.medications.map((item, index) => (
          <div key={item.name} className={['px-4 py-4', index > 0 ? 'border-t border-white/[0.05]' : ''].join(' ')}>
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
          </div>
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

function AddMedicationFab() {
  return (
    <button type="button" className="mx-auto flex h-[48px] items-center justify-center gap-2 rounded-pill border border-white/[0.06] bg-brand-orange px-5 text-[15px] font-semibold leading-5 text-white shadow-2 shadow-brand-orange/30">
      <Plus size={16} strokeWidth={2.4} />
      Add medication
    </button>
  )
}

export default function MedicationTrackingScreen() {
  return (
    <PhoneFrame>
      <ScreenShell
        header={<DomainDashboardHeader title="Medication tracking" domain="wellbeing" level={7} backHref="/tabs/me/explore" />}
        activeTab="me"
        bottomAction={<AddMedicationFab />}
      >
        <main className="px-4 pb-6 pt-4">
          <SIACoachingNote message={medicationTracking.siaNote} className="p-4 animate-fade-up" />
          <AdherenceSummary />
          <WarningBanner />
          <TodaysMedications />
          <AllMedications />
          <AdherenceHistory />
          <PrivacyNotice />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
