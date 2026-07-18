'use client'

import { Check, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  Chip,
  CIAInsightCard,
  ConsentRail,
  DonutHub,
  FloatingQuickLog,
  FULL_DATA_CONTROLS,
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
  { day: 'S', logged: true },
  { day: 'S', logged: true },
]

const meals = [
  { name: 'Breakfast', dish: 'Oats & berries', kcal: 350, time: '9:00 AM' },
  { name: 'Lunch', dish: 'Chicken bowl', kcal: 450, time: '1:30 PM' },
]

export function S28NutritionDashboard() {
  const [state, setState] = useState('default')
  const [water, setWater] = useState(5)
  const empty = state === 'empty'
  const error = state === 'error'
  const offline = state === 'offline'
  useEffect(() => {
    const next = new URLSearchParams(window.location.search).get('state') ?? 'default'
    queueMicrotask(() => {
      setState(next)
      setWater(next === 'water-success' || next === 'water-disabled' ? 8 : 5)
    })
  }, [])
  const showControls = state === 'data-controls' || state === 'allergy'
  const currentWater = empty || error ? 0 : water
  return (
    <HifiShell
      header={<TopBar title="Nutrition & diet" back={false} right={<Chip tone="you">Lv 12</Chip>} />}
      activeTab="today"
      bottomAction={<FloatingQuickLog label="Log food" href="/screens/28?action=log-food" />}
    >
      <main className="space-y-4 px-4 pb-4 pt-3" data-state={state}>
        {offline && <p role="status" className="glass-pill px-4 py-3 text-[13px] text-paper-100/75">Offline — showing last sync 2h ago. Logging is unavailable.</p>}
        {error && <SolidCard><p role="alert" className="text-[14px] text-paper-100">Couldn&rsquo;t refresh nutrition data.</p><button type="button" className="focus-ring mt-3 min-h-11 rounded-pill border px-4 text-[13px]" onClick={() => setState('default')}>Retry locally</button></SolidCard>}
        {state === 'water-success' && <p role="status" className="rounded-xl border border-forest-green/30 bg-forest-green/10 px-4 py-3 text-[13px]">Hydration target reached · 8 of 8 glasses</p>}
        {state === 'success' && <p role="status" className="rounded-xl border border-forest-green/30 bg-forest-green/10 px-4 py-3 text-[13px]">Local navigation preview selected. No data was sent.</p>}
        {state === 'tab-empty' && <SolidCard><h2 className="text-[17px] font-semibold">Today trend</h2><p className="mt-2 text-[13px] text-paper-100/70">No trend yet. Log your first meal to begin.</p></SolidCard>}
        <CIAInsightCard provenance={['Via food log']}>
          {empty ? 'No nutrition data yet. Add restrictions before asking for suggestions.' : <>You are 30g short on protein today. Chicken or lentils for <span className="text-emphasis">dinner</span>?</>}
        </CIAInsightCard>
        <p className="px-2 text-[11px] leading-4 text-white/55">
          Coaching support, not medical nutrition advice. Your allergies and restrictions outrank suggestions.
        </p>

        <div className="grid grid-cols-3 gap-2">
          <MetricPill label="Cal left" value={empty || error ? '—' : '1,450'} />
          <MetricPill label="Protein" value={empty || error ? '0g' : '95g'} />
          <MetricPill label="Adherence" value={empty || error ? 'No target' : '5/7'} />
        </div>
        <div className="flex items-center justify-between px-1">
          <Provenance items={['Via food log']} />
          <Chip interactive onClick={() => setState('data-controls')}>Data sources</Chip>
        </div>

        <SolidCard>
          <h2 className="mb-3 text-[12px] font-semibold uppercase leading-3 text-white/45">Daily macros</h2>
          <div className="flex items-center gap-4">
            <DonutHub
              size={104}
              value={empty || error ? '—' : '1,450'}
              label="Kcal left"
              segments={[
                { percent: empty || error ? 0 : 39, className: 'stroke-brand-orange', label: 'Carbs' },
                { percent: empty || error ? 0 : 30, className: 'stroke-forest-green', label: 'Fat' },
                { percent: empty || error ? 0 : 31, className: 'stroke-white/40', label: 'Protein' },
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
                      {empty || error ? 'Not logged' : `${macro.grams} / ${macro.target}`}
                    </span>
                  </div>
                  <ProgressBar value={empty || error ? 0 : macro.value} tone={macro.tone} />
                </div>
              ))}
            </div>
          </div>
          <p className="mt-3 text-[11px] leading-4 text-paper-100/65">{empty || error ? 'Log a meal to see your split.' : 'Macro energy: 1,220 kcal · carbs 480 (39%), fat 360 (30%), protein 380 (31%). Daily target 2,200 · consumed 750 · 1,450 left.'}</p>
          <div className="mt-4 flex items-center gap-2 border-t border-white/[0.06] pt-3">
            {weekDays.map((entry, index) => (
              <Chip key={index} tone={!empty && !error && entry.logged ? 'you' : 'muted'}>
                {!empty && !error && entry.logged && <Check size={10} strokeWidth={3} className="mr-1" aria-label="Logged" />}
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
                <span className="font-semibold tabular-nums">{currentWater} of 8</span> glasses · <span className="tabular-nums">{(currentWater * 0.24).toFixed(2)} L</span>
              </p>
              <div className="mt-2">
                <ProgressBar value={(currentWater / 8) * 100} tone="done" />
              </div>
            </div>
            <IconButton label="Add water glass" disabled={currentWater >= 8 || offline || error} onClick={() => setWater(value => Math.min(8, value + 1))}>
              <Plus size={19} strokeWidth={2.2} />
            </IconButton>
          </div>
        </SolidCard>

        <div className="grid grid-cols-3 gap-2">
          <Chip interactive onClick={() => setState('success')}>Shopping list</Chip>
          <Chip interactive onClick={() => setState('success')}>Recipes</Chip>
          <Chip interactive onClick={() => setState('tab-empty')}>Trends</Chip>
        </div>

        <SectionTitle title="Today meals" />
        <div className="space-y-3">
          {meals.map(meal => (
            <button type="button" key={meal.name} onClick={() => setState('success')} className="focus-ring block min-h-11 w-full rounded-xl text-left">
            <SolidCard>
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
            </button>
          ))}
          <SolidCard className="border-dashed border-white/10">
            <div className="flex min-h-11 items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase leading-3 text-white/35">Dinner</p>
                <p className="mt-1 text-[14px] leading-5 text-white/55">No dinner logged yet</p>
              </div>
              <IconButton label="Log dinner" onClick={() => setState('success')}>
                <Plus size={17} strokeWidth={2.2} />
              </IconButton>
            </div>
          </SolidCard>
        </div>
        {showControls && <SolidCard><SectionTitle title={state === 'allergy' ? 'Allergies and restrictions' : 'Nutrition data controls'} /><p className="mt-2 text-[12px] leading-5 text-paper-100/70">{state === 'allergy' ? 'Confirmed allergy: dairy · Preference: gluten-free. Confirmed allergies always override CIA ranking.' : 'Category: nutrition · Source: food log and database · Freshness: today · Confidence: high · Retention: 12 months.'}</p><ConsentRail compact controls={FULL_DATA_CONTROLS} /><Chip interactive className="mt-3" onClick={() => setState('allergy')}>Edit allergies</Chip></SolidCard>}
      </main>
    </HifiShell>
  )
}
