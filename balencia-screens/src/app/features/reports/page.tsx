import { Download, FileText, Share2, Sparkles } from 'lucide-react'
import { Button } from '@/components/design-system/Button'
import { Card } from '@/components/design-system/Card'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { SignalPill } from '@/components/screens/ConversationSuite'
import { SectionHeader } from '@/components/screens/SectionHeader'

// Screen 78 of 90: Reports center

const reportCards = [
  { title: 'Weekly life report', meta: 'Fitness, sleep, nutrition, finance', status: 'Ready' },
  { title: 'Doctor summary', meta: 'Medication, sleep, symptoms, vitals', status: 'Draft' },
  { title: 'Mission progress export', meta: 'Streaks, XP, milestones, obstacles', status: 'Ready' },
]

const insightRows = [
  { label: 'Sleep consistency', value: '+18%', tone: 'text-forest-green' },
  { label: 'Workout adherence', value: '72%', tone: 'text-brand-orange' },
  { label: 'Stress load', value: '-11%', tone: 'text-forest-green' },
]

function ReportHero() {
  return (
    <section className="animate-fade-up rounded-xl border border-royal-purple/20 bg-[linear-gradient(145deg,rgba(127,36,255,0.18),rgba(33,16,8,0.95)_64%)] p-5 shadow-2">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-royal-purple">Report builder</p>
          <h2 className="mt-2 text-[22px] font-semibold leading-[28px] text-white">Turn your data into a clean shareable summary.</h2>
          <p className="mt-2 text-[13px] leading-[19px] text-white/55">
            SIA prepares plain-language context without exposing private notes by default.
          </p>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-royal-purple text-white shadow-[var(--glow-purple)]">
          <Sparkles size={19} strokeWidth={2.2} />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <SignalPill tone="purple">SIA summary</SignalPill>
        <SignalPill tone="green">Private by default</SignalPill>
        <SignalPill tone="muted">PDF ready</SignalPill>
      </div>
    </section>
  )
}

function ReportCard({ report, index }: { report: (typeof reportCards)[number]; index: number }) {
  return (
    <Card variant="small" className="animate-fade-up rounded-lg p-4" style={{ animationDelay: `${index * 70}ms` }}>
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-white/[0.08] bg-white/[0.04] text-brand-orange">
          <FileText size={18} strokeWidth={2} />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-[15px] font-semibold leading-5 text-white">{report.title}</h2>
          <p className="mt-1 text-[12px] leading-4 text-white/45">{report.meta}</p>
        </div>
        <span className="rounded-pill border border-white/[0.08] bg-white/[0.04] px-2 py-1 text-[10px] font-semibold leading-none text-white/45">
          {report.status}
        </span>
      </div>
    </Card>
  )
}

function BottomAction() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Button variant="ghost" leftIcon={<Share2 size={16} strokeWidth={2.2} />}>
        Share
      </Button>
      <Button leftIcon={<Download size={16} strokeWidth={2.2} />}>
        Export PDF
      </Button>
    </div>
  )
}

export default function ReportsScreen() {
  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Reports" showBack />} activeTab="me" bottomAction={<BottomAction />}>
        <main className="space-y-5 px-4 pb-6 pt-4">
          <ReportHero />
          <section>
            <SectionHeader title="Recent reports" />
            <div className="space-y-3">
              {reportCards.map((report, index) => (
                <ReportCard key={report.title} report={report} index={index} />
              ))}
            </div>
          </section>
          <section className="animate-fade-up rounded-lg border border-white/[0.06] bg-ink-brown-800 p-4 shadow-1">
            <SectionHeader title="This week" />
            <div className="space-y-3">
              {insightRows.map((row) => (
                <div key={row.label} className="flex items-center justify-between">
                  <span className="text-[13px] leading-[18px] text-white/55">{row.label}</span>
                  <span className={`text-[14px] font-semibold leading-[18px] ${row.tone}`}>{row.value}</span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
