import Link from 'next/link'
import type { CSSProperties } from 'react'
import {
  Activity,
  Apple,
  BatteryMedium,
  Bell,
  BookOpen,
  Brain,
  Briefcase,
  Calendar,
  ChefHat,
  CircleCheck,
  Droplets,
  Dumbbell,
  Flag,
  Flame,
  Flower2,
  Handshake,
  Heart,
  Images,
  Lock,
  MessagesSquare,
  Moon,
  Palette,
  PenLine,
  Pill,
  ReceiptText,
  ShoppingCart,
  Sparkles,
  StickyNote,
  SunMedium,
  Timer,
  Trophy,
  Users,
  Utensils,
  Wallet,
  Wind,
} from 'lucide-react'
import { domainToneClasses } from '@/components/design-system/Chip'
import { domains } from '@/data/domains'
import type { ExploreModule } from '@/data/mock'

type ModuleCardProps = {
  module: ExploreModule
  variant?: 'suggested' | 'grid'
  className?: string
  style?: CSSProperties
}

const iconMap = {
  Activity,
  Apple,
  BatteryMedium,
  Bell,
  BookOpen,
  Brain,
  Briefcase,
  Calendar,
  ChefHat,
  CircleCheck,
  Droplets,
  Dumbbell,
  Flag,
  Flame,
  Flower2,
  Handshake,
  Heart,
  Images,
  MessagesSquare,
  Moon,
  Palette,
  PenLine,
  Pill,
  ReceiptText,
  ShoppingCart,
  Sparkles,
  StickyNote,
  SunMedium,
  Timer,
  Trophy,
  Users,
  Utensils,
  Wallet,
  Wind,
} as const

const badgeClasses: Record<NonNullable<ExploreModule['badge']>, string> = {
  suggested: 'bg-brand-orange text-white',
  new: 'bg-forest-green text-white',
  popular: 'bg-white/10 text-white/60',
  'start here': 'bg-brand-orange text-white',
}

export function ModuleCard({ module, variant = 'grid', className = '', style }: ModuleCardProps) {
  const Icon = iconMap[module.icon as keyof typeof iconMap] ?? Sparkles
  const tone = module.domain ? domainToneClasses[module.domain] : null
  const isSuggested = variant === 'suggested'

  return (
    <Link
      href={module.route}
      className={[
        'relative flex shrink-0 flex-col border border-alpha-white-06 bg-ink-brown-800 shadow-1 transition-transform duration-[var(--dur-fast)] active:scale-[0.97]',
        isSuggested ? 'h-[120px] w-40 rounded-md p-4' : 'h-[88px] rounded-md p-3',
        className,
      ].filter(Boolean).join(' ')}
      style={style}
      aria-label={`${module.name}, ${module.description}`}
    >
      {isSuggested ? (
        <>
          <div className="flex min-w-0 items-center gap-1.5">
            {tone && <span className={`h-2 w-2 shrink-0 rounded-full ${tone.dot}`} aria-hidden="true" />}
            <span className="min-w-0 truncate text-[11px] leading-[14px] text-white/50">
              {module.domain ? domains[module.domain].label : 'Balencia'}
            </span>
          </div>
          {module.badge && (
            <span className={`absolute right-3 top-3 rounded-pill px-2 py-1 text-[10px] font-semibold leading-[14px] ${badgeClasses[module.badge]}`}>
              {module.badge}
            </span>
          )}
          <div className="mt-3 text-[15px] font-semibold leading-5 text-white">
            {module.name}
          </div>
          <p className="mt-1 line-clamp-2 text-[13px] leading-[18px] text-white/40">
            {module.description}
          </p>
        </>
      ) : (
        <>
          <Icon size={20} className="text-white/60" strokeWidth={1.8} />
          <div className="mt-2 line-clamp-1 text-[14px] font-semibold leading-[18px] text-white">
            {module.name}
          </div>
          <p className="mt-1 truncate text-[12px] leading-4 text-white/40">
            {module.description}
          </p>
        </>
      )}

      {module.lockedTier && (
        <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded-pill bg-white/10 px-1.5 py-1 text-[10px] font-semibold leading-none text-white/50">
          <Lock size={10} strokeWidth={2} />
          {module.lockedTier}
        </span>
      )}
    </Link>
  )
}
