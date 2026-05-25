import { Check, ChevronDown, ChevronRight, MoreVertical, Plus, Share2, Trash2 } from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { DomainDashboardHeader } from '@/components/domain/DomainDashboardHeader'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { shoppingList } from '@/data/mock'

// Screen 57 of 78: Shopping list
// Spec: /Users/hamza/yHealth/app_design 3/57-shopping-list.md

function InlineAddInput() {
  return (
    <div className="flex h-[52px] items-center gap-3 rounded-md border border-white/10 bg-ink-brown-800 px-4 shadow-1 animate-fade-up">
      <Plus size={20} className="text-domain-nutrition" strokeWidth={2.2} />
      <span className="min-w-0 flex-1 text-body leading-[22px] text-white/40">Add an item...</span>
    </div>
  )
}

function SummaryBar() {
  return (
    <div className="mt-2 flex h-8 items-center justify-between px-1 text-caption leading-[18px] animate-fade-up" style={{ animationDelay: '80ms' }}>
      <span className="text-white/50">{shoppingList.summary}</span>
      <button type="button" className="font-semibold text-brand-orange">Hide purchased</button>
    </div>
  )
}

function Checkbox({ checked = false }: { checked?: boolean }) {
  return (
    <span className={['flex h-6 w-6 shrink-0 items-center justify-center rounded-full border', checked ? 'border-forest-green bg-forest-green text-white' : 'border-white/20 bg-white/[0.08] text-transparent'].join(' ')}>
      <Check size={14} strokeWidth={2.6} />
    </span>
  )
}

function ItemRow({ item, purchased = false }: { item: { name: string; quantity: string; source: string; priority?: boolean }; purchased?: boolean }) {
  const isGenerated = item.source.startsWith('From')

  return (
    <div className="flex min-h-[58px] items-start gap-3 border-t border-white/[0.08] px-4 py-3 first:border-t-0">
      <Checkbox checked={purchased} />
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center gap-1.5">
          {item.priority && !purchased && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" />}
          <span className={['min-w-0 flex-1 truncate text-[15px] leading-5', purchased ? 'text-white/30 line-through' : 'text-white'].join(' ')}>
            {item.name}
          </span>
        </div>
        <p className={['mt-0.5 truncate text-small leading-[14px]', isGenerated ? 'text-domain-nutrition' : 'text-white/30'].join(' ')}>
          {item.source}
        </p>
      </div>
      <span className={['shrink-0 text-[15px] font-semibold leading-5', purchased ? 'text-white/30' : 'text-white/70'].join(' ')}>
        {item.quantity}
      </span>
    </div>
  )
}

function CategorySection({ section, index }: { section: (typeof shoppingList.sections)[number]; index: number }) {
  return (
    <Card variant="small" className="rounded-md p-0 animate-fade-up" style={{ animationDelay: `${160 + index * 80}ms` }}>
      <div className="flex h-10 items-center gap-2 px-4">
        <span className="text-white/40">{section.expanded ? <ChevronDown size={16} strokeWidth={2} /> : <ChevronRight size={16} strokeWidth={2} />}</span>
        <h2 className="min-w-0 flex-1 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-domain-nutrition">
          {section.title}
        </h2>
        <span className="text-caption leading-[18px] text-white/40">{section.count}</span>
      </div>
      {section.expanded && section.items.map((item) => (
        <ItemRow key={item.id} item={item} />
      ))}
    </Card>
  )
}

function PurchasedSection() {
  return (
    <Card variant="small" className="rounded-md p-0 animate-fade-up" style={{ animationDelay: '520ms' }}>
      <div className="flex h-10 items-center gap-2 px-4">
        <span className="text-white/40"><ChevronDown size={16} strokeWidth={2} /></span>
        <h2 className="min-w-0 flex-1 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-forest-green">
          purchased
        </h2>
        <span className="text-caption leading-[18px] text-white/40">{shoppingList.purchased.length}</span>
      </div>
      {shoppingList.purchased.map((item) => (
        <ItemRow key={item.id} item={item} purchased />
      ))}
    </Card>
  )
}

function ActionBar() {
  return (
    <div className="mt-4 flex h-11 items-center justify-between px-1 animate-fade-up" style={{ animationDelay: '600ms' }}>
      <button type="button" className="flex h-11 items-center gap-2 text-caption font-semibold leading-[18px] text-white/50">
        <Trash2 size={16} strokeWidth={2.1} />
        Clear purchased
      </button>
      <button type="button" className="flex h-11 items-center gap-2 text-caption font-semibold leading-[18px] text-white/50">
        <Share2 size={16} strokeWidth={2.1} />
        Share
      </button>
    </div>
  )
}

function AddItemFab() {
  return (
    <button type="button" className="ml-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.06] bg-ink-brown-800 text-white shadow-2">
      <Plus size={24} strokeWidth={2.3} />
    </button>
  )
}

export default function ShoppingListScreen() {
  return (
    <PhoneFrame>
      <ScreenShell
        header={<DomainDashboardHeader title="Shopping list" domain="nutrition" backHref="/domains/nutrition" rightAction={<MoreVertical size={20} strokeWidth={2.1} />} />}
        activeTab="me"
        bottomAction={<AddItemFab />}
      >
        <main className="px-4 pb-6 pt-4">
          <InlineAddInput />
          <SummaryBar />
          <section className="mt-4 space-y-3">
            {shoppingList.sections.map((section, index) => (
              <CategorySection key={section.id} section={section} index={index} />
            ))}
            <PurchasedSection />
          </section>
          <ActionBar />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
