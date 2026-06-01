'use client'

import { type RefObject, useRef, useState } from 'react'
import { Check, ChevronDown, ChevronRight, MoreVertical, Plus, Share2, Trash2 } from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { DomainDashboardHeader } from '@/components/domain/DomainDashboardHeader'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { shoppingList } from '@/data/mock'

// Screen 57 of 78: Shopping list
// Spec: /Users/hamza/yHealth/app_design 3/57-shopping-list.md

type ShoppingItem = { id: string; name: string; quantity: string; source: string; priority?: boolean }

function InlineAddInput({ value, onChange, onAdd, inputRef }: { value: string; onChange: (value: string) => void; onAdd: () => void; inputRef: RefObject<HTMLInputElement | null> }) {
  return (
    <form onSubmit={(event) => { event.preventDefault(); onAdd() }} className="flex h-[52px] items-center gap-3 rounded-md border border-white/10 bg-ink-brown-800 px-4 shadow-1 animate-fade-up">
      <Plus size={20} className="text-domain-nutrition" strokeWidth={2.2} />
      <input ref={inputRef} value={value} onChange={(event) => onChange(event.target.value)} placeholder="Add an item..." className="min-w-0 flex-1 bg-transparent text-body leading-[22px] text-white outline-none placeholder:text-white/40" />
      <button type="submit" disabled={!value.trim()} className="min-h-11 px-2 text-caption font-semibold text-brand-orange disabled:text-white/25">Add</button>
    </form>
  )
}

function SummaryBar({ hidden, onToggle, count, purchasedCount }: { hidden: boolean; onToggle: () => void; count: number; purchasedCount: number }) {
  return (
    <div className="mt-2 flex h-8 items-center justify-between px-1 text-caption leading-[18px] animate-fade-up" style={{ animationDelay: '80ms' }}>
      <span className="text-white/50">{count} items . {purchasedCount} purchased</span>
      <button type="button" onClick={onToggle} className="min-h-11 px-2 font-semibold text-brand-orange">{hidden ? 'Show purchased' : 'Hide purchased'}</button>
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

function ItemRow({ item, purchased = false, onToggle }: { item: ShoppingItem; purchased?: boolean; onToggle: () => void }) {
  const isGenerated = item.source.startsWith('From')

  return (
    <button type="button" onClick={onToggle} className="flex min-h-[58px] w-full items-start gap-3 border-t border-white/[0.08] px-4 py-3 text-left first:border-t-0" aria-pressed={purchased} aria-label={`${purchased ? 'Uncheck' : 'Check off'} ${item.name}`}>
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
    </button>
  )
}

function CategorySection({ section, index, expanded, items, purchasedIds, onToggleExpanded, onToggleItem }: { section: (typeof shoppingList.sections)[number]; index: number; expanded: boolean; items: ShoppingItem[]; purchasedIds: string[]; onToggleExpanded: () => void; onToggleItem: (item: ShoppingItem) => void }) {
  return (
    <Card variant="small" className="rounded-md p-0 animate-fade-up" style={{ animationDelay: `${160 + index * 80}ms` }}>
      <button type="button" onClick={onToggleExpanded} className="flex min-h-11 w-full items-center gap-2 px-4 text-left" aria-expanded={expanded}>
        <span className="text-white/40">{expanded ? <ChevronDown size={16} strokeWidth={2} /> : <ChevronRight size={16} strokeWidth={2} />}</span>
        <h2 className="min-w-0 flex-1 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-domain-nutrition">
          {section.title}
        </h2>
        <span className="text-caption leading-[18px] text-white/40">{items.length}</span>
      </button>
      {expanded && items.filter((item) => !purchasedIds.includes(item.id)).map((item) => (
        <ItemRow key={item.id} item={item} onToggle={() => onToggleItem(item)} />
      ))}
    </Card>
  )
}

function PurchasedSection({ items, onToggle }: { items: ShoppingItem[]; onToggle: (item: ShoppingItem) => void }) {
  return (
    <Card variant="small" className="rounded-md p-0 animate-fade-up" style={{ animationDelay: '520ms' }}>
      <div className="flex h-10 items-center gap-2 px-4">
        <span className="text-white/40"><ChevronDown size={16} strokeWidth={2} /></span>
        <h2 className="min-w-0 flex-1 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-forest-green">
          purchased
        </h2>
        <span className="text-caption leading-[18px] text-white/40">{shoppingList.purchased.length}</span>
      </div>
      {items.map((item) => (
        <ItemRow key={item.id} item={item} purchased onToggle={() => onToggle(item)} />
      ))}
    </Card>
  )
}

function ActionBar({ onClear, onShare }: { onClear: () => void; onShare: () => void }) {
  return (
    <div className="mt-4 flex h-11 items-center justify-between px-1 animate-fade-up" style={{ animationDelay: '600ms' }}>
      <button type="button" onClick={onClear} className="flex h-11 items-center gap-2 text-caption font-semibold leading-[18px] text-white/50">
        <Trash2 size={16} strokeWidth={2.1} />
        Clear purchased
      </button>
      <button type="button" onClick={onShare} className="flex h-11 items-center gap-2 text-caption font-semibold leading-[18px] text-white/50">
        <Share2 size={16} strokeWidth={2.1} />
        Share
      </button>
    </div>
  )
}

function AddItemFab({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-label="Focus add item" className="ml-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.06] bg-ink-brown-800 text-white shadow-2">
      <Plus size={24} strokeWidth={2.3} />
    </button>
  )
}

export default function ShoppingListScreen() {
  const initialItems = shoppingList.sections.flatMap((section) => section.items)
  const addInputRef = useRef<HTMLInputElement | null>(null)
  const [items, setItems] = useState<ShoppingItem[]>(initialItems)
  const [purchased, setPurchased] = useState<ShoppingItem[]>(shoppingList.purchased)
  const [purchasedIds, setPurchasedIds] = useState<string[]>(shoppingList.purchased.map((item) => item.id))
  const [expanded, setExpanded] = useState<string[]>(shoppingList.sections.filter((section) => section.expanded).map((section) => section.id))
  const [hidePurchased, setHidePurchased] = useState(false)
  const [draft, setDraft] = useState('')
  const [notice, setNotice] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [sortMode, setSortMode] = useState<'category' | 'name' | 'source'>('category')
  const addItem = () => {
    if (!draft.trim()) return
    setItems((current) => [{ id: `manual-${Date.now()}`, name: draft.trim(), quantity: '1', source: 'Manual' }, ...current])
    setDraft('')
    setNotice('Item added')
  }
  const toggleItem = (item: ShoppingItem) => {
    const isPurchased = purchasedIds.includes(item.id)
    setPurchasedIds((ids) => isPurchased ? ids.filter((id) => id !== item.id) : [...ids, item.id])
    setPurchased((current) => isPurchased ? current.filter((row) => row.id !== item.id) : [item, ...current])
    setNotice(isPurchased ? 'Moved back to list' : 'Checked off. Undo by tapping again.')
  }
  const totalCount = items.length + purchased.filter((item) => !items.some((row) => row.id === item.id)).length
  const sorted = (rows: ShoppingItem[]) => {
    if (sortMode === 'name') return [...rows].sort((a, b) => a.name.localeCompare(b.name))
    if (sortMode === 'source') return [...rows].sort((a, b) => a.source.localeCompare(b.source))
    return rows
  }
  const focusAdd = () => {
    addInputRef.current?.scrollIntoView({ block: 'center' })
    addInputRef.current?.focus()
    setNotice('Add field ready')
  }

  return (
    <PhoneFrame>
      <ScreenShell
        header={<DomainDashboardHeader title="Shopping list" domain="nutrition" backHref="/domains/nutrition" rightAction={<button type="button" onClick={() => setMenuOpen((value) => !value)} className="flex h-11 w-11 items-center justify-center rounded-full" aria-label="Shopping list menu"><MoreVertical size={20} strokeWidth={2.1} /></button>} />}
        activeTab="me"
        bottomAction={<AddItemFab onClick={focusAdd} />}
      >
        {menuOpen && (
          <div className="absolute right-3 top-[108px] z-40 w-[248px] rounded-xl border border-white/10 bg-ink-brown-800 p-2 shadow-3" role="menu" aria-label="Shopping list actions">
            {[
              { label: 'Sort by category', action: () => setSortMode('category') },
              { label: 'Sort by name', action: () => setSortMode('name') },
              { label: 'Sort by source', action: () => setSortMode('source') },
              { label: 'Import from recipes', action: () => { setItems((current) => [{ id: `recipe-${Date.now()}`, name: 'Lentils', quantity: '500g', source: 'Imported from recipe' }, ...current]); setNotice('Recipe ingredients imported') } },
              { label: 'Clear all purchased', action: () => { setPurchased([]); setPurchasedIds([]); setNotice('Purchased items cleared') } },
            ].map((item) => (
              <button key={item.label} type="button" role="menuitem" onClick={() => { item.action(); setMenuOpen(false) }} className="flex min-h-11 w-full items-center rounded-md px-3 text-left text-[15px] leading-5 text-white/75">
                {item.label}
              </button>
            ))}
          </div>
        )}
        <main className="px-4 pb-6 pt-4">
          <InlineAddInput value={draft} onChange={setDraft} onAdd={addItem} inputRef={addInputRef} />
          <SummaryBar hidden={hidePurchased} onToggle={() => setHidePurchased((value) => !value)} count={totalCount} purchasedCount={purchasedIds.length} />
          <div className="mt-1 px-1 text-small leading-[14px] text-white/30">Sorted by {sortMode}</div>
          {notice && <div className="mt-3 rounded-md bg-forest-green/10 px-3 py-2 text-caption text-forest-green" role="status">{notice}</div>}
          <section className="mt-4 space-y-3">
            {shoppingList.sections.map((section, index) => (
              <CategorySection
                key={section.id}
                section={section}
                index={index}
                expanded={expanded.includes(section.id)}
                items={sorted(items.filter((item) => section.items.some((base) => base.id === item.id) || (section.id === 'produce' && (item.id.startsWith('manual-') || item.id.startsWith('recipe-')))))}
                purchasedIds={purchasedIds}
                onToggleExpanded={() => setExpanded((ids) => ids.includes(section.id) ? ids.filter((id) => id !== section.id) : [...ids, section.id])}
                onToggleItem={toggleItem}
              />
            ))}
            {!hidePurchased && <PurchasedSection items={sorted(purchased)} onToggle={toggleItem} />}
          </section>
          <ActionBar onClear={() => { setPurchased([]); setPurchasedIds([]); setNotice('Purchased items cleared') }} onShare={() => setNotice('Share preview opened. Private AI and health context excluded.')} />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
