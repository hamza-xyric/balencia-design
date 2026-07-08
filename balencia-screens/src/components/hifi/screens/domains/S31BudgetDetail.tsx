import { Receipt } from 'lucide-react'
import {
  BtnPrimary,
  BtnSecondary,
  Chip,
  CIAInsightCard,
  ConsentRail,
  GlassCard,
  HifiShell,
  ProgressBar,
  ProgressRing,
  Provenance,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'

export function S31BudgetDetail() {
  return (
    <HifiShell
      header={
        <TopBar
          title="Dining budget"
          back
          right={<button type="button" className="min-h-11 px-3 -mr-2 text-white/55 text-[13px] tracking-tight">Edit</button>}
        />
      }
      showTabBar={false}
      atmosphere="you"
    >
      <main className="space-y-4 px-4 pb-10 pt-2">
        <SolidCard className="relative overflow-hidden p-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.18em] text-white/45">Allocated this mission</span>
            <Provenance items={['Via Plaid']} />
          </div>
          <div className="mt-4 flex items-center gap-5">
            <ProgressRing percent={78} value="78%" label="Spent" size={104} tone="you" />
            <div className="flex-1 space-y-1.5">
              <p className="text-[26px] leading-none text-white tabular-nums">
                $480 <span className="text-white/35 text-[15px]">/ $620</span>
              </p>
              <p className="text-[12px] text-white/55">12 days left · On pace</p>
              <div className="pt-1">
                <ProgressBar value={78} tone="you" />
              </div>
            </div>
          </div>
        </SolidCard>

        <GlassCard tone="cia">
          <CIAInsightCard
            eyebrow="Pattern"
            provenance={['3-month average · calculated']}
            actions={[]}
          >
            <p className="text-[14px] leading-relaxed text-white/85">
              Dining jumps 40% after short <span className="text-emphasis">detail</span> in your sleep window.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <Chip tone="you">Finance</Chip>
              <Chip tone="cia">Wellbeing</Chip>
              <div className="flex-1" />
              <BtnSecondary>Ask CIA</BtnSecondary>
            </div>
          </CIAInsightCard>
        </GlassCard>

        <section>
          <div className="flex items-center justify-between px-1 pb-2">
            <h3 className="text-[11px] uppercase tracking-[0.18em] text-white/45">Recent activity</h3>
            <button type="button" className="min-h-11 px-2 -mr-2 text-[12px] text-white/55">See all</button>
          </div>
          <SolidCard className="divide-y divide-white/5">
            <button type="button" className="flex w-full min-h-11 items-center justify-between gap-3 p-4 text-left">
              <div className="min-w-0">
                <p className="truncate text-[14px] text-white">Joe&apos;s Pizza</p>
                <p className="text-[12px] text-white/45">2 days ago · Dining</p>
              </div>
              <span className="text-[14px] tabular-nums text-white">-$24.00</span>
            </button>
            <button type="button" className="flex w-full min-h-11 items-center justify-between gap-3 p-4 text-left">
              <div className="min-w-0">
                <p className="truncate text-[14px] text-white">Spotify</p>
                <p className="text-[12px] text-white/45">4 days ago · Dining</p>
              </div>
              <span className="text-[14px] tabular-nums text-white">-$11.99</span>
            </button>
          </SolidCard>
        </section>

        <section>
          <div className="flex items-center justify-between px-1 pb-2">
            <h3 className="text-[11px] uppercase tracking-[0.18em] text-white/45">Transaction detail</h3>
            <span className="text-[12px] text-white/45">Via Plaid</span>
          </div>
          <SolidCard className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/[0.04] border border-white/10">
                  <Receipt className="h-5 w-5 text-white/60" />
                </span>
                <div>
                  <p className="text-[20px] leading-tight text-white tabular-nums">-$42.10</p>
                  <p className="text-[12px] text-white/55">Trader Joe&apos;s</p>
                </div>
              </div>
              <Chip tone="you">Groceries</Chip>
            </div>
            <div className="mt-4 space-y-2 border-t border-white/5 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-white/45">Category</span>
                <span className="text-[12px] text-white/80">Groceries</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-white/45">Receipt</span>
                <span className="text-[12px] text-white/80">Attached</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-white/45">Status</span>
                <span className="text-[12px] text-white/80">Posted</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <BtnSecondary>Recategorize</BtnSecondary>
              <BtnSecondary>Replace receipt</BtnSecondary>
            </div>
            <div className="mt-2">
              <BtnPrimary>Edit budget</BtnPrimary>
            </div>
          </SolidCard>
        </section>

        <ConsentRail compact />

        <p className="px-1 text-center text-[11px] uppercase tracking-[0.2em] text-white/30">
          Amira · Lv 12
        </p>
      </main>
    </HifiShell>
  )
}