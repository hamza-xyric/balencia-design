'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  Car,
  ChevronRight,
  Database,
  Eye,
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
        <Link href={actionHref} className="flex min-h-11 items-center text-caption leading-[18px] text-brand-orange">
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
  const [selected, setSelected] = useState(financeDashboard.kpis[0].label)

  return (
    <section className="mt-4 animate-fade-up" style={{ animationDelay: '160ms' }}>
      <SectionTitle title="May overview" />
      <div className="grid grid-cols-3 gap-3">
        {financeDashboard.kpis.map((kpi) => (
          <button
            key={kpi.label}
            type="button"
            onClick={() => setSelected(kpi.label)}
            aria-pressed={selected === kpi.label}
            className="min-h-[96px] rounded-lg text-left transition-transform duration-[var(--dur-fast)] active:scale-[0.98]"
          >
          <Card variant="small" className={['h-full p-3', selected === kpi.label ? 'border-brand-orange/40' : ''].join(' ')}>
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
          </button>
        ))}
      </div>
      <p className="mt-3 text-[15px] leading-5 text-white">{financeDashboard.netSummary}</p>
      <p className="mt-1 text-caption leading-[18px] text-white/45">Filtered by {selected.toLowerCase()}. Tap a KPI to update dashboard context.</p>
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
      <SectionTitle title="Budgets" actionHref="/domains/budget?view=budgets" actionLabel="View all budgets" />
      <Card variant="small" className="p-4">
        {financeDashboard.budgets.slice(0, 3).map((budget, index) => (
          <Link
            href={`/domains/budget?type=budget&id=${budget.id}`}
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
      <SectionTitle title="Recent transactions" actionHref="/domains/budget?view=transactions" actionLabel="View all transactions" />
      <Card variant="small" className="p-4">
        {financeDashboard.recentTransactions.slice(0, 4).map((transaction, index) => (
          <TransactionRow
            key={transaction.id}
            href={`/domains/budget?type=transaction&id=${transaction.id}`}
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
  const [expanded, setExpanded] = useState('')

  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '400ms' }}>
      <SectionTitle title="Savings targets" />
      <div className="space-y-3">
        {financeDashboard.savingsTargets.map((target) => (
          <button
            key={target.name}
            type="button"
            onClick={() => setExpanded(expanded === target.name ? '' : target.name)}
            aria-expanded={expanded === target.name}
            className="w-full rounded-lg text-left transition-transform duration-[var(--dur-fast)] active:scale-[0.98]"
          >
          <Card variant="small" className="p-4">
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
            {expanded === target.name && (
              <div className="mt-3 rounded-md bg-ink-900 p-3 text-caption leading-[18px] text-white/55">
                On track from bank transactions and manual cash entries. SIA confidence: medium.
              </div>
            )}
          </Card>
          </button>
        ))}
      </div>
    </section>
  )
}

function SpendingTrend() {
  const [period, setPeriod] = useState<'7d' | '30d'>('7d')
  const [point, setPoint] = useState('Wed: $82 dining and groceries')

  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '480ms' }}>
      <SectionTitle title="Spending trend" />
      <Card variant="small" className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[15px] font-semibold leading-5 text-white">
            <ReceiptText size={18} className="text-white/50" strokeWidth={2.1} />
            7-day trend
          </div>
          <div className="flex min-h-11 items-center rounded-pill border border-white/10 bg-ink-900 p-1 text-caption font-semibold leading-[18px]" role="group" aria-label="Trend period">
            {(['7d', '30d'] as const).map((option) => (
              <button key={option} type="button" onClick={() => setPeriod(option)} aria-pressed={period === option} className={['min-h-11 min-w-11 rounded-pill px-3', period === option ? 'bg-brand-orange/15 text-brand-orange' : 'text-white/50'].join(' ')}>
                {option}
              </button>
            ))}
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
          <g tabIndex={0} role="button" aria-label="Wednesday spending point, 82 dollars" onClick={() => setPoint('Wed: $82 dining and groceries')} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') setPoint('Wed: $82 dining and groceries') }}>
            <circle cx="168" cy="38" r="22" className="fill-transparent" />
            <circle cx="168" cy="38" r="8" className="fill-forest-green" />
          </g>
          <g tabIndex={0} role="button" aria-label="Friday forecast point, 116 dollars" onClick={() => setPoint('Fri forecast: $116 if current pacing continues')} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') setPoint('Fri forecast: $116 if current pacing continues') }}>
            <circle cx="248" cy="42" r="22" className="fill-transparent" />
            <circle cx="248" cy="42" r="8" className="fill-brand-orange" />
          </g>
        </svg>
        <div className="mt-3 rounded-md bg-ink-900 p-3 text-caption leading-[18px] text-white/60">
          {point}. {period === '30d' ? '30-day view compares recurring bills and weekday patterns.' : '7-day view highlights recent spend.'}
        </div>
      </Card>
    </section>
  )
}

export default function FinanceScreen() {
  const [sourcesOpen, setSourcesOpen] = useState(false)

  return (
    <PhoneFrame>
      <ScreenShell
        header={<DomainDashboardHeader title="Finance" domain="finance" level={8} />}
        activeTab="me"
        bottomAction={<FAB href="/domains/budget?type=add" label="Add transaction" icon={<Plus size={24} strokeWidth={2.2} />} />}
      >
        <main className="px-4 pb-6 pt-4">
          <SIACoachingNote
            message={financeDashboard.siaNote}
            actionLabel="Ask SIA"
            actionHref="/tabs/sia?context=finance"
            className="animate-fade-up p-4"
          />
          <button
            type="button"
            onClick={() => setSourcesOpen(!sourcesOpen)}
            aria-expanded={sourcesOpen}
            className="mt-3 flex min-h-11 w-full items-center justify-between rounded-md border border-white/10 bg-ink-brown-800 px-4 text-left text-caption leading-[18px] text-white/60"
          >
            <span className="inline-flex items-center gap-2"><Database size={16} />Money insights use demo bank + manual data</span>
            <ChevronRight size={15} className={sourcesOpen ? 'rotate-90' : ''} />
          </button>
          {sourcesOpen && (
            <Card variant="small" className="mt-2 p-4 text-caption leading-[18px] text-white/55">
              <div className="flex items-center gap-2 text-white"><Eye size={16} />Data controls</div>
              <p className="mt-2">Sources: Demo Checking, Cash wallet, and user labels. Confidence appears on inferred categories. Manage or disconnect financial data from Connected Services.</p>
              <Link href="/tabs/me/connected-services" className="mt-3 inline-flex h-11 items-center rounded-pill bg-ink-900 px-4 font-semibold text-brand-orange">Manage data used</Link>
            </Card>
          )}

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
