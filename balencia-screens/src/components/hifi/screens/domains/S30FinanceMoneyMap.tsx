import { TrendingUp, Plus } from 'lucide-react'
import {
  HifiShell,
  TopBar,
  GlassCard,
  SolidCard,
  SectionTitle,
  Chip,
  Provenance,
  CIAInsightCard,
  DonutHub,
  ProgressBar,
  BtnPrimary,
  ComplianceFooter,
  FloatingQuickLog,
} from '@/components/hifi/kit'

export function S30FinanceMoneyMap() {
  return (
    <HifiShell
      header={<TopBar title="Finance" right={<span className="text-sm font-medium text-white/60">Lv 12</span>} />}
      activeTab="today"
      atmosphere="cia"
      bottomAction={<FloatingQuickLog label="Log" />}
    >
      <main className="space-y-4 px-4 pb-4 pt-3">
        <CIAInsightCard
          eyebrow="Pattern"
          provenance={['Finance API', 'Stress API', 'CIA']}
          actions={
            <button type="button" className="text-xs font-medium text-royal-purple">
              Ask CIA
            </button>
          }
        >
          Dining spend rose during high <span className="text-emphasis">stress</span>.
          <div className="mt-2 flex gap-2">
            <Chip tone="cia">Finance</Chip>
            <Chip tone="cia">Stress</Chip>
          </div>
        </CIAInsightCard>

        <GlassCard tone="you">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-white/45">Spend By Category</p>
                <p className="mt-1 text-2xl font-semibold tabular-nums text-white">$2,150 Total</p>
              </div>
              <Provenance items={['Via Finance API']} />
            </div>

            <div className="flex items-center gap-4">
              <DonutHub
                value="$2,150"
                segments={[
                  { percent: 30, className: 'text-brand-orange' },
                  { percent: 19, className: 'text-white/45' },
                  { percent: 14, className: 'text-forest-green' },
                  { percent: 37, className: 'text-white/20' },
                ]}
              />
              <ul className="flex-1 space-y-2 text-sm">
                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-white/80">
                    <span className="h-2 w-2 rounded-full bg-brand-orange" /> Dining
                  </span>
                  <span className="tabular-nums text-white">$650</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-white/80">
                    <span className="h-2 w-2 rounded-full bg-white/45" /> Transit
                  </span>
                  <span className="tabular-nums text-white">$400</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-white/80">
                    <span className="h-2 w-2 rounded-full bg-forest-green" /> Groceries
                  </span>
                  <span className="tabular-nums text-white">$300</span>
                </li>
              </ul>
            </div>
          </div>
        </GlassCard>

        <div>
          <div className="grid grid-cols-3 gap-2">
            <SolidCard>
              <p className="text-xs text-white/45">Income</p>
              <p className="mt-1 text-lg font-semibold tabular-nums text-white">$5,000</p>
            </SolidCard>
            <SolidCard>
              <p className="text-xs text-white/45">Spent</p>
              <p className="mt-1 text-lg font-semibold tabular-nums text-white">$2,150</p>
            </SolidCard>
            <SolidCard>
              <p className="text-xs text-white/45">Saved</p>
              <p className="mt-1 text-lg font-semibold tabular-nums text-white">$1,000</p>
            </SolidCard>
          </div>
          <div className="mt-2 flex items-center gap-2 px-1">
            <TrendingUp className="h-4 w-4 text-forest-green" />
            <p className="text-sm text-white/70">
              Net Change This Month: <span className="font-medium tabular-nums text-forest-green">+$2,850</span>
            </p>
          </div>
        </div>

        <div>
          <SectionTitle title="Budgets" meta="View all" />
          <SolidCard>
            <ul className="space-y-4">
              <li>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="text-white/80">Groceries</span>
                  <span className="tabular-nums text-white/60">
                    $300 / <span className="text-white/80">$400</span>
                  </span>
                </div>
                <ProgressBar value={75} tone="you" />
              </li>
              <li className="flex items-center justify-between gap-2 border-t border-white/5 pt-3">
                <div>
                  <p className="text-sm text-white/80">Dining</p>
                  <p className="mt-0.5 text-xs text-brand-orange">Over By $50</p>
                </div>
                <button type="button" className="min-h-11 shrink-0 rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-white/80">
                  Adjust Or Roll
                </button>
              </li>
            </ul>
          </SolidCard>
        </div>

        <div>
          <SectionTitle title="Transactions" meta="View all" />
          <SolidCard>
            <ul className="-my-2">
              <li>
                <button type="button" className="flex min-h-11 w-full items-center justify-between gap-3 py-2 text-left">
                  <div className="min-w-0">
                    <p className="truncate text-sm text-white">Trader Joe&apos;s</p>
                    <p className="text-xs text-white/45">Apr 12</p>
                  </div>
                  <span className="shrink-0 text-sm font-medium tabular-nums text-white">-$42.10</span>
                </button>
              </li>
              <li className="border-t border-white/5">
                <button type="button" className="flex min-h-11 w-full items-center justify-between gap-3 py-2 text-left">
                  <div className="min-w-0">
                    <p className="truncate text-sm text-white">Uber</p>
                    <p className="text-xs text-white/45">Apr 11</p>
                  </div>
                  <span className="shrink-0 text-sm font-medium tabular-nums text-white">-$18.50</span>
                </button>
              </li>
            </ul>
          </SolidCard>
        </div>

        <GlassCard tone="done">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/80">Emergency Fund Mission</p>
              <span className="text-xs tabular-nums text-white/60">
                $6k / <span className="text-white/80">$10k</span>
              </span>
            </div>
            <ProgressBar value={60} tone="done" />
          </div>
        </GlassCard>

        <div className="pt-2">
          <BtnPrimary>
            <Plus className="mr-2 h-4 w-4" /> Add Transaction
          </BtnPrimary>
          <div className="mt-4">
            <ComplianceFooter links={['Source', 'Retention', 'Export', 'Revoke', 'Delete']} />
          </div>
        </div>
      </main>
    </HifiShell>
  )
}