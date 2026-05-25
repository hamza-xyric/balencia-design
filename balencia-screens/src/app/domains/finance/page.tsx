import Link from 'next/link'
import {
  Car,
  Home,
  Plus,
  ReceiptText,
  ShoppingCart,
  TrendingUp,
  Utensils,
  Wallet,
} from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { FAB } from '@/components/design-system/FAB'
import { DomainDashboardHeader } from '@/components/domain/DomainDashboardHeader'
import { TransactionRow } from '@/components/domain/TransactionRow'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { SIACoachingNote } from '@/components/screens/SIACoachingNote'
import { financeDashboard } from '@/data/mock'

// Screen 30 of 78: Finance / money map dashboard
// Spec: /Users/hamza/yHealth/app_design 3/30-finance-money-map-dashboard.md

function SectionTitle({ title, actionHref, actionLabel }: { title: string; actionHref?: string; actionLabel?: string }) {
  return (
    <div className="mb-3 flex h-8 items-center justify-between">
      <h2 className="text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/50">
        {title}
      </h2>
      {actionHref && actionLabel && (
        <Link href={actionHref} className="flex h-8 items-center text-caption leading-[18px] text-brand-orange">
          {actionLabel}
        </Link>
      )}
    </div>
  )
}

function ProgressBar({ progress, tone = 'orange' }: { progress: number; tone?: 'orange' | 'green' }) {
  return (
    <div className="h-2 overflow-hidden rounded-pill bg-white/[0.08]">
      <div
        className={`h-full rounded-pill ${tone === 'green' ? 'bg-forest-green' : 'bg-brand-orange'}`}
        style={{ width: `${Math.round(Math.max(0, Math.min(progress, 1)) * 100)}%` }}
      />
    </div>
  )
}

function KPIStrip() {
  return (
    <section className="mt-4 animate-fade-up" style={{ animationDelay: '160ms' }}>
      <SectionTitle title="May overview" />
      <div className="grid grid-cols-3 gap-3">
        {financeDashboard.kpis.map((kpi) => (
          <Card key={kpi.label} variant="small" className="min-h-[96px] p-3">
            <div className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.12em] text-white/40">
              {kpi.label}
            </div>
            <div className="mt-2 text-[22px] font-bold leading-[28px] text-white tabular-nums">
              {kpi.amount}
            </div>
            <div className={`mt-2 text-caption font-semibold leading-[18px] ${kpi.positive ? 'text-forest-green' : 'text-brand-orange'}`}>
              {kpi.delta}
            </div>
          </Card>
        ))}
      </div>
      <p className="mt-3 text-[15px] leading-5 text-white">{financeDashboard.netSummary}</p>
    </section>
  )
}

function budgetIcon(id: string) {
  const className = 'h-5 w-5'

  if (id === 'dining') return <Utensils className={className} strokeWidth={2} />
  if (id === 'housing') return <Home className={className} strokeWidth={2} />
  if (id === 'transport') return <Car className={className} strokeWidth={2} />
  return <ShoppingCart className={className} strokeWidth={2} />
}

function BudgetCategories() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '240ms' }}>
      <SectionTitle title="Budgets" actionHref="/domains/budget" actionLabel="View all budgets" />
      <Card variant="small" className="p-4">
        {financeDashboard.budgets.slice(0, 3).map((budget, index) => (
          <Link
            href="/domains/budget"
            key={budget.id}
            className={[
              'block py-3 transition-transform duration-[var(--dur-fast)] active:scale-[0.98]',
              index > 0 ? 'border-t border-white/[0.05]' : 'pt-0',
            ].join(' ')}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-domain-finance/15 text-domain-finance">
                  {budgetIcon(budget.id)}
                </span>
                <span className="truncate text-[16px] font-semibold leading-[22px] text-white">{budget.name}</span>
              </div>
              <span className="shrink-0 text-[15px] leading-5 text-white/70 tabular-nums">
                ${budget.spent} / ${budget.allocated}
              </span>
            </div>
            <div className="mt-3">
              <ProgressBar progress={budget.progress} />
            </div>
            <div className="mt-1 text-right text-[12px] leading-4 text-white/50 tabular-nums">
              {Math.round(budget.progress * 100)}%
            </div>
          </Link>
        ))}
      </Card>
    </section>
  )
}

function transactionIconClass(category: string) {
  if (category === 'income') return 'bg-forest-green/15 text-forest-green'
  if (category === 'groceries') return 'bg-domain-nutrition/15 text-domain-nutrition'
  if (category === 'health') return 'bg-domain-wellbeing/15 text-domain-wellbeing'
  return 'bg-brand-orange/15 text-brand-orange'
}

function transactionIcon(category: string) {
  if (category === 'income') return <Wallet size={16} strokeWidth={2.1} />
  if (category === 'groceries') return <ShoppingCart size={16} strokeWidth={2.1} />
  if (category === 'health') return <TrendingUp size={16} strokeWidth={2.1} />
  return <Utensils size={16} strokeWidth={2.1} />
}

function RecentTransactions() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '320ms' }}>
      <SectionTitle title="Recent transactions" actionHref="/domains/budget" actionLabel="View all transactions" />
      <Card variant="small" className="p-4">
        {financeDashboard.recentTransactions.slice(0, 4).map((transaction, index) => (
          <TransactionRow
            key={transaction.id}
            href="/domains/budget"
            merchant={transaction.merchant}
            date={transaction.date}
            amount={transaction.amount}
            isIncome={transaction.isIncome}
            icon={transactionIcon(transaction.category)}
            iconClassName={transactionIconClass(transaction.category)}
            withDivider={index > 0}
          />
        ))}
      </Card>
    </section>
  )
}

function SavingsTargets() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '400ms' }}>
      <SectionTitle title="Savings targets" />
      <div className="space-y-3">
        {financeDashboard.savingsTargets.map((target) => (
          <Card key={target.name} variant="small" className="p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="text-[16px] font-semibold leading-[22px] text-white">{target.name}</div>
              <div className="text-caption font-semibold leading-[18px] text-forest-green tabular-nums">
                {Math.round(target.progress * 100)}%
              </div>
            </div>
            <div className="mt-1 text-[15px] leading-5 text-white/70 tabular-nums">
              ${target.current.toLocaleString()} / ${target.target.toLocaleString()}
            </div>
            <div className="mt-3">
              <ProgressBar progress={target.progress} tone="green" />
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}

function SpendingTrend() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '480ms' }}>
      <SectionTitle title="Spending trend" />
      <Card variant="small" className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[15px] font-semibold leading-5 text-white">
            <ReceiptText size={18} className="text-white/50" strokeWidth={2.1} />
            7-day trend
          </div>
          <div className="flex h-8 items-center rounded-pill border border-white/10 bg-ink-900 p-1 text-caption font-semibold leading-[18px]">
            <span className="rounded-pill bg-brand-orange/15 px-3 py-1 text-brand-orange">7d</span>
            <span className="px-3 py-1 text-white/50">30d</span>
          </div>
        </div>
        <svg viewBox="0 0 280 108" className="h-[108px] w-full" role="img" aria-label="Spending trend chart">
          <g className="text-white/10" stroke="currentColor" strokeWidth="1">
            <line x1="0" y1="24" x2="280" y2="24" />
            <line x1="0" y1="60" x2="280" y2="60" />
            <line x1="0" y1="96" x2="280" y2="96" />
          </g>
          <polyline
            points="8,78 48,66 88,52 128,58 168,38 208,30"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            className="text-brand-orange"
          />
          <polyline
            points="208,30 248,42 272,34"
            fill="none"
            stroke="currentColor"
            strokeDasharray="6 6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            className="text-royal-purple"
          />
          <circle cx="168" cy="38" r="4" className="fill-forest-green" />
        </svg>
      </Card>
    </section>
  )
}

export default function FinanceScreen() {
  return (
    <PhoneFrame>
      <ScreenShell
        header={<DomainDashboardHeader title="Finance" domain="finance" level={8} />}
        activeTab="me"
        bottomAction={<FAB href="/domains/budget" label="Add transaction" icon={<Plus size={24} strokeWidth={2.2} />} />}
      >
        <main className="px-4 pb-6 pt-4">
          <SIACoachingNote
            message={financeDashboard.siaNote}
            actionLabel="Ask SIA"
            className="animate-fade-up p-4"
          />

          <KPIStrip />
          <BudgetCategories />
          <RecentTransactions />
          <SavingsTargets />
          <SpendingTrend />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
