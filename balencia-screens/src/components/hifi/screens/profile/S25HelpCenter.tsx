import { ChevronRight, MessageCircle, Search, Sparkles } from 'lucide-react'
import {
  BtnPrimary,
  BtnSecondary,
  Chip,
  ComplianceFooter,
  GlassCard,
  GlassPillInput,
  HifiShell,
  Provenance,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'

export function S25HelpCenter() {
  return (
    <HifiShell header={<TopBar title="Help center" back />} activeTab="me">
      <main className="space-y-5 px-4 pb-6 pt-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/45">Support</p>
          <h1 className="mt-1 text-[26px] leading-tight text-white">
            Find your help <span className="text-emphasis">center</span>
          </h1>
        </div>

        <GlassPillInput
          icon={<Search className="h-4 w-4" />}
          placeholder="Search help topics"
        />

        <GlassCard tone="cia">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-royal-purple/15 text-royal-purple">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-[11px] uppercase tracking-[0.18em] text-royal-purple">Ask CIA</p>
              <h2 className="mt-1 text-[17px] leading-snug text-white">
                Get instant answers from your coach
              </h2>
              <p className="mt-1.5 text-[13px] leading-relaxed text-white/60">
                CIA knows Balencia help, missions, and tracking context. Handoffs include your active query with your consent.
              </p>
              <div className="mt-3">
                <BtnPrimary>
                  <span className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Ask CIA
                  </span>
                </BtnPrimary>
              </div>
              <div className="mt-3">
                <Provenance items={['Source: Balencia help index', 'Scope: this query only']} />
              </div>
            </div>
          </div>
        </GlassCard>

        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-white/45">Frequently asked</h3>
            <Chip tone="muted">6 Categories</Chip>
          </div>

          <SolidCard>
            <ul role="list" className="divide-y divide-white/[0.06]">
              {[
                { title: 'Getting started', meta: 'Setup and onboarding', tone: 'you' as const },
                { title: 'CIA and AI coach', meta: 'Handoffs and context', tone: 'cia' as const },
                { title: 'Missions and tracking', meta: 'Progress and inputs', tone: 'you' as const },
                { title: 'Billing and subscription', meta: 'Plan and invoices', tone: 'muted' as const },
                { title: 'Privacy and data', meta: 'Sources and controls', tone: 'muted' as const },
                { title: 'Troubleshooting', meta: 'Sync and fixes', tone: 'done' as const },
              ].map((row) => (
                <li key={row.title}>
                  <button
                    type="button"
                    className="flex h-[68px] w-full items-center gap-3 px-4 text-left transition-colors hover:bg-white/[0.03]"
                  >
                    <div className="flex-1">
                      <p className="text-[15px] text-white">{row.title}</p>
                      <p className="mt-0.5 text-[12px] text-white/50">{row.meta}</p>
                    </div>
                    <Chip tone={row.tone}>Open</Chip>
                    <ChevronRight className="h-4 w-4 text-white/35" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </SolidCard>
        </section>

        <GlassCard tone="muted">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">Escalation</p>
              <h3 className="mt-1 text-[15px] text-white">Still need help? Contact support</h3>
              <div className="mt-2">
                <Provenance items={['No current SLA', 'Status: open']} />
              </div>
            </div>
            <BtnSecondary>Contact</BtnSecondary>
          </div>
        </GlassCard>

        <ComplianceFooter />
      </main>
    </HifiShell>
  )
}