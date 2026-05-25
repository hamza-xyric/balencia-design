import Link from 'next/link'
import { BarChart3, BookOpen, Plus, ShoppingCart } from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { DomainTag } from '@/components/design-system/DomainTag'
import { FAB } from '@/components/design-system/FAB'
import { DomainDashboardHeader } from '@/components/domain/DomainDashboardHeader'
import { MacroBar } from '@/components/domain/MacroBar'
import { MealCard } from '@/components/domain/MealCard'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { SIACoachingNote } from '@/components/screens/SIACoachingNote'
import { nutritionDashboard } from '@/data/mock'

// Screen 28 of 78: Nutrition dashboard
// Spec: /Users/hamza/yHealth/app_design 3/28-nutrition-diet-dashboard.md

function DailyMacrosCard() {
  return (
    <Card className="mt-4 animate-fade-up" style={{ animationDelay: '240ms' }}>
      <div className="mb-5 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">
        Daily macros
      </div>
      <div className="space-y-3">
        {nutritionDashboard.macros.map((macro) => (
          <MacroBar
            key={macro.label}
            label={macro.label}
            current={macro.current}
            target={macro.target}
            unit={macro.unit}
            tone={macro.tone}
          />
        ))}
      </div>
    </Card>
  )
}

function WaterCard() {
  const glasses = Array.from({ length: nutritionDashboard.water.target }, (_, index) => index < nutritionDashboard.water.current)

  return (
    <Card className="mt-4 animate-fade-up" style={{ animationDelay: '320ms' }}>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">
          Water
        </span>
        <button className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-ink-900 text-white" type="button" aria-label="Add water">
          <Plus size={16} strokeWidth={2.3} />
        </button>
      </div>
      <div className="flex justify-between gap-2">
        {glasses.map((filled, index) => (
          <span
            key={index}
            className={[
              'h-6 w-6 rounded-full',
              filled ? 'bg-white/80 shadow-[var(--glow-green)]' : 'border border-dashed border-white/20 bg-white/15',
            ].join(' ')}
            aria-hidden="true"
          />
        ))}
      </div>
      <div className="mt-3 text-caption leading-[18px] text-white/50">
        {nutritionDashboard.water.current} / {nutritionDashboard.water.target} glasses
      </div>
    </Card>
  )
}

function QuickActionsBar() {
  const actions = [
    { label: 'Shopping list', icon: ShoppingCart, href: '/features/shopping-list' },
    { label: 'Recipes', icon: BookOpen, href: '/features/recipes' },
    { label: 'Trends', icon: BarChart3, href: '/features/intelligence' },
  ]

  return (
    <div className="mt-4 grid grid-cols-3 gap-3 animate-fade-up" style={{ animationDelay: '400ms' }}>
      {actions.map((action) => {
        const Icon = action.icon

        return (
          <Link
            key={action.label}
            href={action.href}
            className="flex h-[72px] flex-col items-center justify-center rounded-lg border border-white/[0.06] bg-ink-brown-800 px-2 text-center shadow-1 transition-transform duration-[var(--dur-fast)] active:scale-[0.97]"
          >
            <Icon size={20} className="text-domain-nutrition" strokeWidth={1.9} />
            <span className="mt-2 text-[12px] font-semibold leading-4 text-white/70">{action.label}</span>
          </Link>
        )
      })}
    </div>
  )
}

function MissionProgressRow() {
  const mission = nutritionDashboard.activeMissions[0]

  return (
    <Link
      href="/tabs/goals/detail"
      className="block rounded-md border border-white/[0.06] bg-ink-brown-800 p-4 shadow-1 transition-transform duration-[var(--dur-fast)] active:scale-[0.97]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="truncate text-[15px] leading-5 text-white">{mission.name}</div>
          <div className="mt-3 h-2 overflow-hidden rounded-pill bg-white/[0.08]">
            <div className="h-full rounded-pill bg-brand-orange" style={{ width: `${mission.progress * 100}%` }} />
          </div>
          <div className="mt-2 text-caption font-semibold leading-[18px] text-white tabular-nums">
            {Math.round(mission.progress * 100)}%
          </div>
        </div>
        <DomainTag domain={mission.domain} />
      </div>
    </Link>
  )
}

function ActiveMissionsSection() {
  return (
    <section className="mt-4 animate-fade-up" style={{ animationDelay: '480ms' }}>
      <div className="mb-3 flex h-8 items-center justify-between">
        <h2 className="text-[18px] font-semibold leading-6 text-white">Active missions</h2>
        <Link href="/tabs/goals" className="flex h-8 items-center text-caption leading-[18px] text-brand-orange">
          See all
        </Link>
      </div>
      <MissionProgressRow />
    </section>
  )
}

function RecentFoodLog() {
  return (
    <section className="mt-4 animate-fade-up" style={{ animationDelay: '560ms' }}>
      <div className="mb-3 flex h-8 items-center justify-between">
        <h2 className="text-[18px] font-semibold leading-6 text-white">Recent food log</h2>
        <Link href="/domains/meal" className="flex h-8 items-center text-caption leading-[18px] text-brand-orange">
          See all
        </Link>
      </div>
      <Card variant="small">
        {nutritionDashboard.recentFoodLog.map((item, index) => (
          <Link
            href="/domains/meal"
            key={item.name}
            className={[
              'flex min-h-10 items-center justify-between gap-3 py-2 transition-transform duration-[var(--dur-fast)] active:scale-[0.98]',
              index > 0 ? 'border-t border-white/10' : '',
            ].join(' ')}
          >
            <span className="truncate text-[15px] leading-5 text-white">{item.name}</span>
            <span className="shrink-0 text-[15px] font-semibold leading-5 text-white/50 tabular-nums">
              {item.calories} cal
            </span>
          </Link>
        ))}
      </Card>
    </section>
  )
}

export default function NutritionDashboardScreen() {
  return (
    <PhoneFrame>
      <ScreenShell
        header={<DomainDashboardHeader title="Nutrition & diet" domain="nutrition" level={9} />}
        activeTab="me"
        bottomAction={<FAB href="/domains/meal" label="Log food" icon={<Plus size={16} strokeWidth={2.4} />} display="pill" />}
      >
        <main className="px-4 pb-6 pt-4">
          <SIACoachingNote
            message={nutritionDashboard.siaNote}
            className="animate-fade-up p-4"
          />

          <MealCard
            meals={nutritionDashboard.meals}
            className="mt-4 animate-fade-up"
            style={{ animationDelay: '160ms' }}
          />

          <DailyMacrosCard />
          <WaterCard />
          <QuickActionsBar />
          <ActiveMissionsSection />
          <RecentFoodLog />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
