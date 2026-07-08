import { Check, Plus } from 'lucide-react'
import {
  Chip,
  CIAInsightCard,
  DonutHub,
  FloatingQuickLog,
  HifiShell,
  IconButton,
  MetricPill,
  ProgressBar,
  Provenance,
  SectionTitle,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'

const macros = [
  { label: 'Carbs', value: 60, grams: '120g', target: '200g', tone: 'you' as const, dot: 'bg-brand-orange' },
  { label: 'Fat', value: 57, grams: '40g', target: '70g', tone: 'done' as const, dot: 'bg-forest-green' },
  { label: 'Protein', value: 76, grams: '95g', target: '125g', tone: 'you' as const, dot: 'bg-white/40' },
]

const weekDays = [
  { day: 'M', logged: true },
  { day: 'T', logged: true },
  { day: 'W', logged: true },
  { day: 'T', logged: false },
  { day: 'F', logged: false },
]

const meals = [
  { name: 'Breakfast', dish: 'Oats & berries', kcal: 350, time: '9:00 AM' },
  { name: 'Lunch', dish: 'Chicken bowl', kcal: 450, time: '1:30 PM' },
]

export function S28NutritionDashboard() {
  return (
    <HifiShell
      header={<TopBar title="Nutrition & diet" back={false} right={<Chip tone="you">Lv 12</Chip>} />}
      activeTab="today"
      bottomAction={<FloatingQuickLog label="Log food" />}
    >
      <main className="space-y-4 px-4 pb-4 pt-3">
        <CIAInsightCard provenance={['Via food log']}>
          You are 30g short on protein today. Chicken or lentils for <span className="text-emphasis">dinner</span>?
        </CIAInsightCard>
        <p className="px-2 text-[11px] leading-4 text-white/55">
          Coaching support, not medical nutrition advice. Your allergies and restrictions outrank suggestions.
        </p>

        <div className="grid grid-cols-3 gap-2">
          <MetricPill label="Cal left" value="1,450" />
          <MetricPill label="Protein" value="95g" />
          <MetricPill label="Adherence" value="5/7" />
        </div>
        <div className="flex items-center justify-between px-1">
          <Provenance items={['Via food log']} />
          <Chip interactive>Data sources</Chip>
        </div>

        <SolidCard>
          <h2 className="mb-3 text-[12px] font-semibold uppercase leading-3 text-white/45">Daily macros</h2>
          <div className="flex items-center gap-4">
            <DonutHub
              size={104}
              value="1,450"
              label="Kcal left"
              segments={[
                { percent: 45, className: 'stroke-brand-orange', label: 'Carbs' },
                { percent: 25, className: 'stroke-forest-green', label: 'Fat' },
                { percent: 30, className: 'stroke-white/40', label: 'Protein' },
              ]}
            />
            <div className="min-w-0 flex-1 space-y-2.5">
              {macros.map(macro => (
                <div key={macro.label}>
                  <div className="mb-1 flex items-baseline justify-between">
                    <span className="flex items-center gap-1.5 text-[12px] leading-4 text-white/70">
                      <span className={`h-2 w-2 shrink-0 rounded-full ${macro.dot}`} />
                      {macro.label}
                    </span>
                    <span className="text-[11px] leading-4 text-white/45 tabular-nums">
                      {macro.grams} / {macro.target}
                    </span>
                  </div>
                  <ProgressBar value={macro.value} tone={macro.tone} />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 border-t border-white/[0.06] pt-3">
            {weekDays.map((entry, index) => (
              <Chip key={index} tone={entry.logged ? 'you' : 'muted'}>
                {entry.logged && <Check size={10} strokeWidth={3} className="mr-1" aria-label="Logged" />}
                {entry.day}
              </Chip>
            ))}
          </div>
        </SolidCard>

        <SolidCard>
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h2 className="text-[12px] font-semibold uppercase leading-3 text-white/45">Water</h2>
              <p className="mt-2 text-[15px] leading-5 text-white">
                <span className="font-semibold tabular-nums">5 of 8</span> glasses · <span className="tabular-nums">1.2 L</span>
              </p>
              <div className="mt-2">
                <ProgressBar value={62} tone="done" />
              </div>
            </div>
            <IconButton label="Add water glass">
              <Plus size={19} strokeWidth={2.2} />
            </IconButton>
          </div>
        </SolidCard>

        <div className="grid grid-cols-3 gap-2">
          <Chip interactive>Shopping list</Chip>
          <Chip interactive>Recipes</Chip>
          <Chip interactive>Trends</Chip>
        </div>

        <SectionTitle title="Today meals" />
        <div className="space-y-3">
          {meals.map(meal => (
            <SolidCard key={meal.name}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase leading-3 text-brand-orange">{meal.name}</p>
                  <p className="mt-1 text-[15px] font-semibold leading-5 text-white">{meal.dish}</p>
                  <p className="mt-1 text-[12px] leading-4 text-white/45 tabular-nums">{meal.time}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[15px] font-semibold leading-5 text-white tabular-nums">{meal.kcal}</p>
                  <p className="text-[11px] leading-4 text-white/45">Kcal</p>
                </div>
              </div>
              <div className="mt-3">
                <Provenance items={['You logged']} />
              </div>
            </SolidCard>
          ))}
          <SolidCard className="border-dashed border-white/10">
            <div className="flex min-h-11 items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase leading-3 text-white/35">Dinner</p>
                <p className="mt-1 text-[14px] leading-5 text-white/55">No dinner logged yet</p>
              </div>
              <IconButton label="Log dinner">
                <Plus size={17} strokeWidth={2.2} />
              </IconButton>
            </div>
          </SolidCard>
        </div>
      </main>
    </HifiShell>
  )
}
