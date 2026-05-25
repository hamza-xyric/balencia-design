import Link from 'next/link'
import { ChevronLeft, Pencil, Utensils } from 'lucide-react'
import { Button } from '@/components/design-system/Button'
import { Card } from '@/components/design-system/Card'
import { TransactionRow } from '@/components/domain/TransactionRow'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { SIACoachingNote } from '@/components/screens/SIACoachingNote'
import { budgetDetail } from '@/data/mock'

// Screen 31 of 78: Transaction / budget detail
// Spec: /Users/hamza/yHealth/app_design 3/31-transaction-budget-detail.md

function BudgetHeader() {
  return (
    <header className="relative flex h-[56px] shrink-0 items-center bg-ink-900 px-4">
      <Link
        href="/domains/finance"
        className="-ml-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-[var(--dur-fast)] active:scale-95"
        aria-label="Back to finance"
      >
        <ChevronLeft size={20} strokeWidth={2.1} />
      </Link>
      <h1 className="absolute left-1/2 max-w-[190px] -translate-x-1/2 truncate text-[17px] font-semibold leading-[22px] text-white">
        Dining
      </h1>
      <button className="ml-auto flex h-11 w-11 items-center justify-center rounded-full text-white" type="button" aria-label="Edit budget">
        <Pencil size={19} strokeWidth={2.1} />
      </button>
    </header>
  )
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="h-2 overflow-hidden rounded-pill bg-white/[0.08]">
      <div
        className="h-full rounded-pill bg-brand-orange"
        style={{ width: `${Math.round(Math.max(0, Math.min(progress, 1)) * 100)}%` }}
      />
    </div>
  )
}

function BudgetOverviewCard() {
  return (
    <Card className="mt-4 animate-fade-up p-4" style={{ animationDelay: '120ms' }}>
      <div className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.12em] text-white/40">
        Allocated
      </div>
      <div className="mt-1 text-[24px] font-bold leading-8 text-white tabular-nums">
        ${budgetDetail.allocated.toFixed(2)}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div>
          <div className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.12em] text-white/40">
            Spent
          </div>
          <div className="mt-1 text-h2 font-semibold leading-[26px] text-white tabular-nums">
            ${budgetDetail.spent.toFixed(2)}
          </div>
        </div>
        <div>
          <div className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.12em] text-white/40">
            Remaining
          </div>
          <div className="mt-1 text-h2 font-semibold leading-[26px] text-forest-green tabular-nums">
            ${budgetDetail.remaining.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <ProgressBar progress={budgetDetail.progress} />
      </div>
      <div className="mt-2 flex items-center justify-between text-caption leading-[18px] text-white/50">
        <span>{budgetDetail.daysRemaining} days remaining</span>
        <span className="tabular-nums">{Math.round(budgetDetail.progress * 100)}%</span>
      </div>
    </Card>
  )
}

function FilteredTransactions() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '320ms' }}>
      <div className="mb-3 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/50">
        Transactions in dining
      </div>
      <Card variant="small" className="p-4">
        {budgetDetail.transactions.map((transaction, index) => (
          <TransactionRow
            key={transaction.id}
            merchant={transaction.merchant}
            date={transaction.date}
            amount={transaction.amount}
            isIncome={transaction.isIncome}
            icon={<Utensils size={16} strokeWidth={2.1} />}
            iconClassName="bg-brand-orange/15 text-brand-orange"
            withDivider={index > 0}
          />
        ))}
      </Card>
    </section>
  )
}

export default function BudgetDetailScreen() {
  return (
    <PhoneFrame>
      <ScreenShell header={<BudgetHeader />} activeTab="me">
        <main className="px-4 pb-20 pt-4">
          <section className="flex items-center gap-3 animate-fade-up">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange">
              <Utensils size={22} strokeWidth={2.1} />
            </span>
            <div>
              <h2 className="text-h2 font-semibold leading-[26px] text-white">{budgetDetail.category}</h2>
              <p className="mt-0.5 text-caption leading-[18px] text-white/50">Monthly budget category</p>
            </div>
          </section>

          <BudgetOverviewCard />

          <SIACoachingNote
            message={budgetDetail.siaNote}
            actionLabel="Ask SIA"
            className="mt-4 animate-fade-up p-4"
            style={{ animationDelay: '240ms' }}
          />

          <FilteredTransactions />

          <Button fullWidth className="mt-6 animate-fade-up" style={{ animationDelay: '400ms' }}>
            Edit budget
          </Button>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
