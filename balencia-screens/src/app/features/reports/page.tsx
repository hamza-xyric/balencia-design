'use client'

import { useState } from 'react'
import { Camera, Check, FileText, Share2, Sparkles, X } from 'lucide-react'
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
        <SignalPill tone="muted">In-app only</SignalPill>
      </div>
    </section>
  )
}

function ReportCard({ report, index, onOpen }: { report: (typeof reportCards)[number]; index: number; onOpen: (report: (typeof reportCards)[number]) => void }) {
  return (
    <button type="button" onClick={() => onOpen(report)} className="w-full text-left">
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
    </button>
  )
}

function BottomAction({ onShare, onReview }: { onShare: () => void; onReview: () => void }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Button variant="ghost" onClick={onShare} leftIcon={<Share2 size={16} strokeWidth={2.2} />}>
        Screenshot
      </Button>
      <Button onClick={onReview} leftIcon={<Check size={16} strokeWidth={2.2} />}>
        Review data
      </Button>
    </div>
  )
}

export default function ReportsScreen() {
  const [selectedReport, setSelectedReport] = useState<(typeof reportCards)[number] | null>(null)
  const [sheet, setSheet] = useState<'none' | 'share' | 'review'>('none')

  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Reports" showBack />} activeTab="me" bottomAction={<BottomAction onShare={() => setSheet('share')} onReview={() => setSheet('review')} />}>
        <main className="space-y-5 px-4 pb-6 pt-4">
          <ReportHero />
          <section>
            <SectionHeader title="Recent reports" />
            <div className="space-y-3">
              {reportCards.map((report, index) => (
                <ReportCard key={report.title} report={report} index={index} onOpen={setSelectedReport} />
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
          {selectedReport && (
            <section className="rounded-lg border border-forest-green/20 bg-forest-green/10 p-4" aria-live="polite">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-[15px] font-semibold leading-5 text-white">{selectedReport.title} preview</h2>
                  <p className="mt-1 text-caption leading-[18px] text-white/55">Includes selected domains only. Private notes remain excluded until you explicitly add them.</p>
                </div>
                <button type="button" aria-label="Close report preview" onClick={() => setSelectedReport(null)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/45"><X size={17} /></button>
              </div>
            </section>
          )}
          {sheet !== 'none' && (
            <section className="rounded-lg border border-white/[0.08] bg-ink-brown-800 p-4" aria-live="polite">
              {sheet === 'share' ? (
                <>
                  <div className="flex items-center gap-2 text-[15px] font-semibold leading-5 text-white"><Camera size={16} className="text-brand-orange" /> Screenshot sharing only</div>
                  <p className="mt-1 text-caption leading-[18px] text-white/55">V1 does not export PDFs or raw data. Use an in-app screenshot after reviewing visible sections.</p>
                </>
              ) : (
                <>
                  <h2 className="text-[15px] font-semibold leading-5 text-white">Included data</h2>
                  <div className="mt-3 space-y-2 text-caption leading-[18px] text-white/60">
                    <label className="flex min-h-11 items-center gap-3"><input type="checkbox" defaultChecked /> Fitness, sleep, nutrition</label>
                    <label className="flex min-h-11 items-center gap-3"><input type="checkbox" defaultChecked /> Mission progress and streaks</label>
                    <label className="flex min-h-11 items-center gap-3"><input type="checkbox" /> Private notes and journal excerpts</label>
                  </div>
                  <p className="mt-2 text-small leading-[14px] text-white/35">Private notes are excluded by default.</p>
                </>
              )}
            </section>
          )}
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
