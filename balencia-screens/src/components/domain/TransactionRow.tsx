import Link from 'next/link'
import type { ReactNode } from 'react'

type TransactionRowProps = {
  merchant: string
  date: string
  amount: number
  isIncome?: boolean
  icon: ReactNode
  href?: string
  className?: string
  iconClassName?: string
  withDivider?: boolean
}

function formatAmount(amount: number, isIncome: boolean) {
  const hasCents = amount % 1 !== 0
  const value = amount.toLocaleString('en-US', {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  })

  return `${isIncome ? '+' : '-'}$${value}`
}

export function TransactionRow({
  merchant,
  date,
  amount,
  isIncome = false,
  icon,
  href,
  className = '',
  iconClassName = 'bg-alpha-white-06 text-white/70',
  withDivider = false,
}: TransactionRowProps) {
  const content = (
    <>
      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${iconClassName}`}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[16px] font-semibold leading-[22px] text-white">{merchant}</div>
        <div className="mt-0.5 truncate text-caption leading-[18px] text-white/50">{date}</div>
      </div>
      <div className={`shrink-0 text-[17px] font-semibold leading-[22px] tabular-nums ${isIncome ? 'text-forest-green' : 'text-white'}`}>
        {formatAmount(amount, isIncome)}
      </div>
    </>
  )

  const classes = [
    'flex min-h-[56px] items-center gap-3 py-3 transition-transform duration-[var(--dur-fast)] active:scale-[0.98]',
    withDivider ? 'border-t border-alpha-white-05' : '',
    className,
  ].filter(Boolean).join(' ')

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    )
  }

  return <div className={classes}>{content}</div>
}
