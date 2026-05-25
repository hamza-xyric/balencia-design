import { Plus } from 'lucide-react'
import { CalendarHeatmap, type HeatmapCell } from '@/components/charts/CalendarHeatmap'
import { Card } from '@/components/design-system/Card'
import { FAB } from '@/components/design-system/FAB'
import { SegmentedControl } from '@/components/design-system/SegmentedControl'
import { HabitRow } from '@/components/domain/HabitRow'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { habitHeatmap, habitSections, habitSummary } from '@/data/mock'

// Screen 38 of 78: Habits
// Spec: /Users/hamza/yHealth/app_design 3/38-habits.md

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">
      {children}
    </div>
  )
}

function CompletionRate() {
  const percent = Math.round(habitSummary.progress * 100)

  return (
    <section className="animate-fade-up">
      <div className="flex items-center justify-between">
        <div className="text-body font-semibold leading-[22px] text-white">
          {habitSummary.completed} of {habitSummary.total} today
        </div>
        <div className="text-body font-semibold leading-[22px] text-white/70 tabular-nums">{percent}%</div>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-xs bg-white/[0.08]">
        <div className="h-full rounded-xs bg-brand-orange" style={{ width: `${percent}%` }} />
      </div>
    </section>
  )
}

export default function HabitsScreen() {
  return (
    <PhoneFrame>
      <ScreenShell
        header={<Header title="Habits" showBack />}
        activeTab="me"
        bottomAction={
          <FAB
            label="Add habit"
            icon={<Plus size={16} strokeWidth={2.4} />}
            display="pill"
          />
        }
      >
        <main className="px-4 pb-6 pt-4">
          <CompletionRate />

          <SegmentedControl
            options={[
              { label: 'Today', value: 'today' },
              { label: 'Week', value: 'week' },
              { label: 'Month', value: 'month' },
            ]}
            activeValue="today"
            className="mt-4 animate-fade-up"
            size="md"
          />

          <div className="mt-6 space-y-4">
            {habitSections.map((section, sectionIndex) => (
              <section
                key={section.id}
                className="animate-fade-up"
                style={{ animationDelay: `${160 + sectionIndex * 80}ms` }}
              >
                <Eyebrow>{section.title}</Eyebrow>
                <Card variant="small" className="rounded-lg p-0">
                  {section.habits.map((habit, index) => (
                    <HabitRow
                      key={habit.id}
                      name={habit.name}
                      domain={habit.domain}
                      streak={habit.streak}
                      completed={habit.completed}
                      withDivider={index > 0}
                    />
                  ))}
                </Card>
              </section>
            ))}
          </div>

          <section className="mt-6 animate-fade-up" style={{ animationDelay: '440ms' }}>
            <Card variant="small" className="rounded-lg p-6">
              <CalendarHeatmap
                dayLabels={habitHeatmap.dayLabels}
                rows={habitHeatmap.rows as HeatmapCell[][]}
                tone="brand"
                cellSize={28}
                monthLabel={habitHeatmap.monthLabel}
              />
            </Card>
          </section>

          <Card variant="small" className="mt-4 rounded-lg p-4 animate-fade-up" style={{ animationDelay: '520ms' }}>
            <div className="text-[15px] font-semibold leading-5 text-forest-green">
              +{habitSummary.xpToday} XP earned today
            </div>
            <div className="mt-1 text-caption leading-[18px] text-white/50">
              Keep going - {habitSummary.remaining} habits left
            </div>
          </Card>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
