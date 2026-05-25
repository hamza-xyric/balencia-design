import { ChevronLeft } from 'lucide-react'

interface HeaderProps {
  title?: string
  showBack?: boolean
  rightAction?: React.ReactNode
}

export function Header({ title, showBack = false, rightAction }: HeaderProps) {
  return (
    <div className="flex items-center h-[56px] px-4 bg-ink-900 relative">
      {showBack && (
        <div className="w-[44px] h-[44px] flex items-center justify-center">
          <ChevronLeft size={20} className="text-white" />
        </div>
      )}

      {title && (
        <h1 className="absolute left-1/2 -translate-x-1/2 text-[17px] font-semibold text-white truncate max-w-[200px]">
          {title}
        </h1>
      )}

      {rightAction && (
        <div className="ml-auto">
          {rightAction}
        </div>
      )}
    </div>
  )
}
