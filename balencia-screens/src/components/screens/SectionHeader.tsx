import type { HTMLAttributes, ReactNode } from 'react'
import { Eyebrow } from '@/components/design-system/Eyebrow'

type SectionHeaderProps = HTMLAttributes<HTMLDivElement> & {
  title: string
  action?: ReactNode
}

export function SectionHeader({ title, action, className = '', ...props }: SectionHeaderProps) {
  return (
    <div
      className={['mb-3 flex items-center justify-between', className].filter(Boolean).join(' ')}
      {...props}
    >
      <Eyebrow>{title}</Eyebrow>
      {action}
    </div>
  )
}
