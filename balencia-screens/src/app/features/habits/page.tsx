'use client'

import { useMemo, useState } from 'react'
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

function CompletionRate({ completed, total }: { completed: number; total: number }) {
  const percent = Math.round((completed / total) * 100)

  return (
    <section className="animate-fade-up">
      <div className="flex items-center justify-between">
        <div className="text-body font-semibold leading-[22px] text-white">
          {completed} of {total} today
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
  const initialCompleted = useMemo(
    () => new Set(habitSections.flatMap((section) => section.habits.filter((habit) => habit.completed).map((habit) => habit.id))),
    [],
  )
  const [period, setPeriod] = useState('today')
  const [completed, setCompleted] = useState(initialCompleted)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [draftHabit, setDraftHabit] = useState('')
  const [addedHabits, setAddedHabits] = useState<Array<{ id: string; name: string }>>([])
  const [toast, setToast] = useState('')
  const total = habitSections.reduce((count, section) => count + section.habits.length, 0) + addedHabits.length
  const completedCount = completed.size
  const periodCopy = period === 'today' ? 'Today' : period === 'week' ? 'This week' : 'This month'

  const toggleHabit = (id: string, name: string) => {
    setCompleted((current) => {
      const next = new Set(current)
      if (next.has(id)) {
        next.delete(id)
        setToast(`${name} marked incomplete`)
      } else {
        next.add(id)
        setToast(`${name} complete. +12 XP`)
      }
      return next
    })
  }
  const addHabit = (name: string) => {
    const habitName = name.trim()
    if (!habitName) return
    const id = `custom-${habitName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${addedHabits.length}`
    setAddedHabits((current) => current.some((habit) => habit.name === habitName) ? current : [...current, { id, name: habitName }])
    setDraftHabit('')
    setSheetOpen(false)
    setToast(`${habitName} added to today`)
  }

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
            onClick={() => setSheetOpen(true)}
          />
        }
      >
        <main className="px-4 pb-6 pt-4">
          <CompletionRate completed={completedCount} total={total} />

          <SegmentedControl
            options={[
              { label: 'Today', value: 'today' },
              { label: 'Week', value: 'week' },
              { label: 'Month', value: 'month' },
            ]}
            activeValue={period}
            onValueChange={(value) => {
              setPeriod(value)
              setToast(`${value === 'today' ? 'Today' : value === 'week' ? 'Week' : 'Month'} view selected`)
            }}
            className="mt-4 animate-fade-up"
            size="md"
          />
          <p className="mt-2 px-1 text-caption leading-[18px] text-white/45" aria-live="polite">
            {periodCopy} view: {completedCount} complete, {total - completedCount} left.
          </p>

          <div className="mt-6 space-y-4">
            {addedHabits.length > 0 && (
              <section className="animate-fade-up">
                <Eyebrow>Recently added</Eyebrow>
                <Card variant="small" className="rounded-lg p-0">
                  {addedHabits.map((habit, index) => (
                    <HabitRow
                      key={habit.id}
                      name={habit.name}
                      domain="wellbeing"
                      streak={0}
                      completed={completed.has(habit.id)}
                      withDivider={index > 0}
                      onClick={() => toggleHabit(habit.id, habit.name)}
                    />
                  ))}
                </Card>
              </section>
            )}
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
                      completed={completed.has(habit.id)}
                      withDivider={index > 0}
                      onClick={() => toggleHabit(habit.id, habit.name)}
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
              +{habitSummary.xpToday + Math.max(0, completedCount - habitSummary.completed) * 12} XP earned today
            </div>
            <div className="mt-1 text-caption leading-[18px] text-white/50">
              Keep going - {Math.max(0, total - completedCount)} habits left
            </div>
          </Card>

          <div className="sr-only" role="status" aria-live="polite">{toast}</div>
        </main>

        {sheetOpen && (
          <div className="absolute inset-0 z-40 flex items-end bg-ink-900/70 px-4 pb-4" role="dialog" aria-modal="true" aria-label="Add habit">
            <div className="w-full rounded-xl border border-white/[0.08] bg-ink-brown-800 p-5 shadow-3">
              <div className="mx-auto h-1 w-10 rounded-pill bg-white/20" />
              <h2 className="mt-4 text-h3 font-semibold leading-[22px] text-white">Add habit</h2>
              <p className="mt-2 text-caption leading-[18px] text-white/55">Create a quick habit for today or choose a preset.</p>
              <label className="mt-4 block text-caption leading-[18px] text-white/50">
                Habit name
                <input
                  value={draftHabit}
                  onChange={(event) => setDraftHabit(event.currentTarget.value)}
                  placeholder="Evening walk"
                  className="mt-1 h-11 w-full rounded-md border border-white/10 bg-ink-900 px-3 text-[15px] text-white outline-none placeholder:text-white/30"
                />
              </label>
              <button
                type="button"
                disabled={draftHabit.trim().length < 2}
                onClick={() => addHabit(draftHabit)}
                className="mt-3 h-11 w-full rounded-pill bg-brand-orange text-[15px] font-semibold leading-5 text-white disabled:bg-white/10 disabled:text-white/35"
              >
                Save habit
              </button>
              <div className="mt-4 grid gap-2">
                {['Drink water', 'Evening walk', 'Read 10 pages'].map((label) => (
                  <button key={label} type="button" onClick={() => addHabit(label)} className="flex min-h-11 items-center justify-between rounded-md border border-white/10 bg-ink-900 px-4 text-[15px] font-semibold leading-5 text-white">
                    {label}
                    <Plus size={16} className="text-brand-orange" />
                  </button>
                ))}
              </div>
              <button type="button" onClick={() => setSheetOpen(false)} className="mt-3 h-11 w-full rounded-pill text-[15px] font-semibold leading-5 text-white/60">
                Cancel
              </button>
            </div>
          </div>
        )}
        {toast && !sheetOpen && (
          <div className="absolute inset-x-4 bottom-[156px] z-30 flex min-h-11 items-center rounded-pill bg-forest-green px-4 text-[14px] font-semibold text-white shadow-2" role="status">
            {toast}
          </div>
        )}
      </ScreenShell>
    </PhoneFrame>
  )
}
