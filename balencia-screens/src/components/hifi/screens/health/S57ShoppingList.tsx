import { Check, ChevronDown, Plus } from 'lucide-react'
import {
  BtnGhost,
  Chip,
  ConsentRail,
  cx,
  FloatingQuickLog,
  GlassCard,
  GlassPillInput,
  HifiShell,
  ProgressBar,
  SectionTitle,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'

// Nested Nutrition execution module launched from Nutrition, recipes, or CIA
// chat — no live route, no tab of its own beyond the shared primary nav.
// Chosen state: default active list, 6 of 8 items open, categorized, offline
// cache enabled, purchased section collapsed. Skeleton (ghost rows), cold
// empty ("Talk to CIA" / "Import from diet plan"), sync error (cached list
// with staleness banner), and the "all done" celebration overlay are
// documented in the source spec rather than duplicated here — static
// prototype, no handlers. The estimated-quantity chip below carries the
// low-confidence read; category source chips carry provenance throughout.

const produce = [
  { name: 'Avocados', qty: '2', source: 'Meal plan', checked: true },
  { name: 'Spinach', qty: '200g', source: 'Recipe: chicken bowl', checked: false },
]

const protein = [
  { name: 'Chicken thigh', qty: '1kg', source: 'Meal plan', checked: false },
  { name: 'Salmon fillet', qty: '~2 servings', source: 'Estimated · sync pending', checked: false, estimated: true },
]

export function S57ShoppingList() {
  return (
    <HifiShell
      header={<TopBar title="Shopping list" />}
      activeTab="today"
      atmosphere="you"
      bottomAction={<FloatingQuickLog label="Add item" />}
    >
      <main className="space-y-4 px-4 pb-4 pt-3">
        <GlassPillInput
          placeholder="Add an item…"
          trailing={
            <button type="button" className="flex h-11 items-center justify-center rounded-pill bg-brand-orange px-4 text-[13px] font-semibold text-white shadow-[var(--glow-orange-sm)]">
              <Plus size={15} strokeWidth={2.4} className="mr-1" /> Add
            </button>
          }
        />

        <GlassCard tone="you">
          <div className="flex items-start justify-between gap-2">
            <p className="text-[15px] font-semibold leading-5 text-white">
              <span className="tabular-nums">8</span> items · <span className="tabular-nums">2</span> purchased
            </p>
            <div className="flex flex-col items-end gap-1.5">
              <span className="text-[13px] font-semibold text-brand-orange tabular-nums">25%</span>
              <Chip>Computed locally</Chip>
            </div>
          </div>
          <div className="mt-3">
            <ProgressBar value={25} tone="you" />
          </div>
          <button type="button" className="mt-3 flex min-h-11 w-full items-center justify-between border-t border-white/[0.06] pt-3 text-[13px] font-medium text-white/70">
            Hide purchased
            <ChevronDown size={16} strokeWidth={1.9} className="text-white/40" />
          </button>
        </GlassCard>

        <section className="space-y-2">
          <SectionTitle title="Produce" />
          <SolidCard className="p-0">
            <div className="divide-y divide-white/[0.06]">
              {produce.map(item => (
                <ShoppingItemRow key={item.name} name={item.name} qty={item.qty} source={item.source} checked={item.checked} />
              ))}
            </div>
          </SolidCard>
        </section>

        <section className="space-y-2">
          <SectionTitle title="Protein" />
          <SolidCard className="p-0">
            <div className="divide-y divide-white/[0.06]">
              {protein.map(item => (
                <ShoppingItemRow key={item.name} name={item.name} qty={item.qty} source={item.source} checked={item.checked} estimated={item.estimated} />
              ))}
            </div>
          </SolidCard>
        </section>

        <SectionTitle title="Purchased" meta="2 items · hidden" />

        <div className="flex gap-2 border-t border-white/[0.06] pt-3">
          <BtnGhost quiet className="flex-1 border border-white/10">Clear purchased</BtnGhost>
          <BtnGhost className="flex-1 border border-white/10">Share</BtnGhost>
        </div>

        <GlassCard tone="muted">
          <p className="text-[12px] font-semibold uppercase text-white/45">Data &amp; consent</p>
          <p className="mt-1 text-[12px] leading-4 text-white/55">
            Items keep their source, category, and retention. Meal plan and recipe sources respect your allergies and restrictions.
          </p>
          <ConsentRail compact />
        </GlassCard>
      </main>
    </HifiShell>
  )
}

// NEW: ShoppingItemRow. 44px checkbox target; checked items strikethrough
// and mute rather than disappear, matching the 1.5s undo-before-move motion
// documented in the source spec.
function ShoppingItemRow({
  name,
  qty,
  source,
  checked = false,
  estimated = false,
}: {
  name: string
  qty: string
  source: string
  checked?: boolean
  estimated?: boolean
}) {
  return (
    <div className={cx('flex min-h-[64px] items-center gap-3 p-4', checked && 'opacity-55')}>
      <span
        role="checkbox"
        aria-checked={checked}
        aria-label={`${name}, quantity ${qty}, ${checked ? 'purchased' : 'unchecked'}. Double-tap to mark purchased.`}
        tabIndex={0}
        className={cx(
          'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border',
          checked ? 'border-forest-green/40 bg-forest-green/15 text-forest-green shadow-[var(--glow-green-sm)]' : 'border-white/15 bg-white/[0.03]',
        )}
      >
        {checked && <Check size={18} strokeWidth={2.6} />}
      </span>
      <div className="min-w-0 flex-1">
        <p className={cx('text-[15px] text-white', checked && 'text-white/55 line-through decoration-white/25')}>
          {name} <span className="font-normal text-white/45 tabular-nums">{estimated ? `(~${qty})` : `(${qty})`}</span>
        </p>
        <div className="mt-1">
          <Chip>{source}</Chip>
        </div>
      </div>
    </div>
  )
}
