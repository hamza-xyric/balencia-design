'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { Camera, Check, ChevronLeft, Pencil, Trash2, Utensils, X } from 'lucide-react'
import { Button } from '@/components/design-system/Button'
import { Card } from '@/components/design-system/Card'
import { TransactionRow } from '@/components/domain/TransactionRow'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { SIACoachingNote } from '@/components/screens/SIACoachingNote'
import { budgetDetail, financeDashboard } from '@/data/mock'

// Screen 31 of 78: Transaction / budget detail
// Spec: /Users/hamza/yHealth/app_design 3/31-transaction-budget-detail.md

function BudgetHeader({ title, onEdit, mode }: { title: string; onEdit: () => void; mode: 'budget' | 'transaction' | 'add' }) {
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
        {title}
      </h1>
      <button className="ml-auto flex h-11 w-11 items-center justify-center rounded-full text-white" type="button" aria-label={`Edit ${mode}`} onClick={onEdit}>
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

function formatSignedCurrency(amount: number, isIncome: boolean) {
  return `${isIncome ? '+' : '-'}$${amount.toFixed(2)}`
}

function BudgetOverviewCard({ allocated }: { allocated: number }) {
  const spent = budgetDetail.spent
  const remaining = Math.max(0, allocated - spent)
  const progress = spent / allocated

  return (
    <Card className="mt-4 animate-fade-up p-4" style={{ animationDelay: '120ms' }}>
      <div className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.12em] text-white/40">
        Allocated
      </div>
      <div className="mt-1 text-[24px] font-bold leading-8 text-white tabular-nums">
        ${allocated.toFixed(2)}
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
            ${remaining.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <ProgressBar progress={progress} />
      </div>
      <div className="mt-2 flex items-center justify-between text-caption leading-[18px] text-white/50">
        <span>{budgetDetail.daysRemaining} days remaining</span>
        <span className="tabular-nums">{Math.round(progress * 100)}%</span>
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
            href={`/domains/budget?type=transaction&id=${transaction.id}`}
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

function BudgetListState() {
  return (
    <section className="animate-fade-up">
      <Card variant="small" className="p-4">
        {financeDashboard.budgets.map((budget, index) => (
          <Link
            key={budget.id}
            href={`/domains/budget?type=budget&id=${budget.id}`}
            className={[
              'block py-3',
              index > 0 ? 'border-t border-white/[0.05]' : 'pt-0',
            ].join(' ')}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="truncate text-[16px] font-semibold leading-[22px] text-white">{budget.name}</span>
              <span className="shrink-0 text-caption leading-[18px] text-white/60 tabular-nums">
                ${budget.spent} / ${budget.allocated}
              </span>
            </div>
            <div className="mt-3">
              <ProgressBar progress={budget.progress} />
            </div>
          </Link>
        ))}
      </Card>
    </section>
  )
}

function TransactionListState() {
  return (
    <section className="animate-fade-up">
      <Card variant="small" className="p-4">
        {[...financeDashboard.recentTransactions, ...budgetDetail.transactions].map((transaction, index) => (
          <TransactionRow
            key={`${transaction.id}-${index}`}
            href={`/domains/budget?type=transaction&id=${transaction.id}`}
            merchant={transaction.merchant}
            date={transaction.date}
            amount={transaction.amount}
            isIncome={transaction.isIncome}
            icon={<Utensils size={16} strokeWidth={2.1} />}
            iconClassName={transaction.isIncome ? 'bg-forest-green/15 text-forest-green' : 'bg-brand-orange/15 text-brand-orange'}
            withDivider={index > 0}
          />
        ))}
      </Card>
    </section>
  )
}

export default function BudgetDetailScreen() {
  const [mode, setMode] = useState<'budget' | 'transaction' | 'add'>('budget')
  const [listView, setListView] = useState<'budgets' | 'transactions' | null>(null)
  const [editOpen, setEditOpen] = useState(false)
  const [allocated, setAllocated] = useState(budgetDetail.allocated)
  const [draftAllocated, setDraftAllocated] = useState(String(budgetDetail.allocated))
  const [draftAmount, setDraftAmount] = useState('')
  const [category, setCategory] = useState('Dining')
  const [receipt, setReceipt] = useState(false)
  const [toast, setToast] = useState('')
  const [deleteOpen, setDeleteOpen] = useState(false)

  const transaction = useMemo(() => budgetDetail.transactions[0], [])
  const title = listView === 'budgets' ? 'All budgets' : listView === 'transactions' ? 'All transactions' : mode === 'transaction' ? transaction.merchant : mode === 'add' ? 'Add transaction' : category
  const showToast = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 3000)
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search)
      const type = params.get('type')
      const view = params.get('view')
      const nextMode = type === 'transaction' || type === 'add' ? type : 'budget'
      setMode(nextMode)
      setListView(view === 'budgets' || view === 'transactions' ? view : null)
      setEditOpen(nextMode === 'add')
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <PhoneFrame>
      <ScreenShell header={<BudgetHeader title={title} mode={mode} onEdit={() => setEditOpen(true)} />} activeTab="me">
        <main className="px-4 pb-20 pt-4">
          {listView === 'budgets' ? (
            <BudgetListState />
          ) : listView === 'transactions' ? (
            <TransactionListState />
          ) : mode === 'transaction' ? (
            <>
              <section className="animate-fade-up">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-caption uppercase tracking-[0.12em] text-white/40">Transaction</p>
                    <h2 className={['mt-1 text-[34px] font-bold leading-[40px] tabular-nums', transaction.isIncome ? 'text-forest-green' : 'text-white'].join(' ')}>
                      {formatSignedCurrency(transaction.amount, transaction.isIncome)}
                    </h2>
                    <p className="mt-1 text-[15px] leading-5 text-white/50">{transaction.date} - Demo Checking</p>
                  </div>
                  <button type="button" onClick={() => setDeleteOpen(true)} className="flex h-11 w-11 items-center justify-center rounded-full text-error-red" aria-label="Delete transaction"><Trash2 size={19} /></button>
                </div>
                <Card className="mt-4 p-4">
                  <button type="button" onClick={() => setEditOpen(true)} className="flex min-h-11 w-full items-center justify-between rounded-md bg-ink-900 px-3 text-left text-[15px] text-white">
                    <span>Category</span><span className="font-semibold text-brand-orange">{category}</span>
                  </button>
                  <button type="button" onClick={() => setReceipt(true)} className="mt-3 flex min-h-11 w-full items-center justify-between rounded-md border border-white/10 px-3 text-left text-[15px] text-white/70">
                    <span className="inline-flex items-center gap-2"><Camera size={16} />{receipt ? 'Receipt attached' : 'Add receipt photo'}</span>
                    <span className="text-brand-orange">{receipt ? 'Replace' : 'Add'}</span>
                  </button>
                  <p className="mt-3 text-caption leading-[18px] text-white/45">Metadata: imported from demo bank feed. You can edit category, receipt, and notes before SIA uses this context.</p>
                </Card>
                <SIACoachingNote message="SIA categorized this as Dining with medium confidence based on merchant history. Review before automating future labels." actionLabel="Ask why" className="mt-4 p-4" />
                <Button onClick={() => { setCategory('Groceries'); showToast('Category changed. Undo available.') }} fullWidth className="mt-4">Recategorize</Button>
              </section>
            </>
          ) : mode === 'add' ? (
            <section className="animate-fade-up">
              <Card className="p-5">
                <p className="text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">
                  New transaction
                </p>
                <h2 className="mt-2 text-h2 font-semibold leading-[26px] text-white">Add transaction</h2>
                <p className="mt-2 text-caption leading-[18px] text-white/55">
                  Enter the amount, category, and note before this becomes budget or SIA context.
                </p>
                <Button onClick={() => setEditOpen(true)} fullWidth className="mt-4">
                  Open transaction form
                </Button>
              </Card>
            </section>
          ) : (
            <>
              <section className="flex items-center gap-3 animate-fade-up">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange">
                  <Utensils size={22} strokeWidth={2.1} />
                </span>
                <div>
                  <h2 className="text-h2 font-semibold leading-[26px] text-white">{category}</h2>
                  <p className="mt-0.5 text-caption leading-[18px] text-white/50">Monthly budget category</p>
                </div>
              </section>

              <BudgetOverviewCard allocated={allocated} />

              <SIACoachingNote
                message={budgetDetail.siaNote}
                actionLabel="Ask SIA"
                className="mt-4 animate-fade-up p-4"
                style={{ animationDelay: '240ms' }}
              />

              <FilteredTransactions />

              <Button onClick={() => setEditOpen(true)} fullWidth className="mt-6 animate-fade-up" style={{ animationDelay: '400ms' }}>
                Edit budget
              </Button>
            </>
          )}
        </main>
        {editOpen && (
          <div className="absolute inset-x-0 bottom-[84px] z-20 mx-3 rounded-xl border border-white/10 bg-ink-brown-800 p-4 shadow-2" role="dialog" aria-label={`Edit ${mode}`}>
            <div className="flex items-center justify-between">
              <h2 className="text-[17px] font-semibold text-white">{mode === 'budget' ? 'Edit budget' : mode === 'add' ? 'Add transaction' : 'Edit transaction'}</h2>
              <button type="button" onClick={() => setEditOpen(false)} className="flex h-11 w-11 items-center justify-center rounded-full text-white/60" aria-label="Cancel"><X size={18} /></button>
            </div>
            {mode === 'budget' ? (
              <>
                <label className="mt-3 block text-caption leading-[18px] text-white/50">Monthly amount
                  <input value={draftAllocated} onChange={(event) => setDraftAllocated(event.target.value)} type="number" className="mt-1 h-11 w-full rounded-md border border-white/10 bg-ink-900 px-3 text-[15px] text-white outline-none" />
                </label>
                <div className="mt-3 rounded-md bg-ink-900 p-3 text-caption leading-[18px] text-white/55">SIA suggestion: $620 based on the last three dining-heavy weeks.</div>
                <Button disabled={!Number(draftAllocated)} onClick={() => { setAllocated(Number(draftAllocated)); setEditOpen(false); showToast('Budget saved') }} fullWidth variant="completion" className="mt-3">Save budget</Button>
              </>
            ) : (
              <>
                <label className="mt-3 block text-caption leading-[18px] text-white/50">Amount
                  <input
                    value={draftAmount}
                    onChange={(event) => setDraftAmount(event.target.value)}
                    inputMode="decimal"
                    className="mt-1 h-11 w-full rounded-md border border-white/10 bg-ink-900 px-3 text-[15px] text-white outline-none"
                    placeholder="0.00"
                  />
                </label>
                <label className="mt-3 block text-caption leading-[18px] text-white/50">Category
                  <select value={category} onChange={(event) => setCategory(event.target.value)} className="mt-1 h-11 w-full rounded-md border border-white/10 bg-ink-900 px-3 text-[15px] text-white outline-none">
                    <option>Dining</option>
                    <option>Groceries</option>
                    <option>Transport</option>
                  </select>
                </label>
                <label className="mt-3 block text-caption leading-[18px] text-white/50">Note
                  <input className="mt-1 h-11 w-full rounded-md border border-white/10 bg-ink-900 px-3 text-[15px] text-white outline-none" defaultValue="Client lunch" />
                </label>
                <Button
                  onClick={() => { setEditOpen(false); showToast(mode === 'add' ? `Transaction added: -$${Number(draftAmount).toFixed(2)}` : 'Transaction updated') }}
                  disabled={mode === 'add' && !Number(draftAmount)}
                  fullWidth
                  variant="completion"
                  className="mt-3"
                >
                  Save transaction
                </Button>
              </>
            )}
          </div>
        )}
        {deleteOpen && (
          <div className="absolute inset-x-4 bottom-[108px] z-30 rounded-xl border border-error-red/30 bg-ink-brown-800 p-4 shadow-2" role="alertdialog" aria-label="Delete transaction confirmation">
            <h2 className="text-[17px] font-semibold text-white">Delete this transaction?</h2>
            <p className="mt-2 text-caption leading-[18px] text-white/55">This cannot be undone in the prototype session.</p>
            <div className="mt-4 flex gap-2">
              <Button onClick={() => setDeleteOpen(false)} variant="ghost" className="flex-1">Cancel</Button>
              <Button onClick={() => { setDeleteOpen(false); showToast('Transaction deleted') }} className="flex-1 bg-error-red">Delete</Button>
            </div>
          </div>
        )}
        {toast && (
          <div className="absolute inset-x-4 bottom-[96px] z-40 flex min-h-11 items-center gap-2 rounded-pill bg-forest-green px-4 text-[14px] font-semibold text-white shadow-2" role="status"><Check size={16} />{toast}</div>
        )}
      </ScreenShell>
    </PhoneFrame>
  )
}
