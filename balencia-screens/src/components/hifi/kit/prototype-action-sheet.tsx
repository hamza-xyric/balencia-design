'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Check, X } from 'lucide-react'

function humanizeAction(value: string) {
  const words = value.replace(/-/g, ' ')
  return words.charAt(0).toUpperCase() + words.slice(1)
}

export function PrototypeActionSheet() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const action = searchParams.get('action')

  if (!action) return null

  const close = () => router.replace(pathname, { scroll: false })
  return <ActionSheetContent key={action} action={action} close={close} />
}

function ActionSheetContent({ action, close }: { action: string; close: () => void }) {
  const [note, setNote] = useState('')
  const [saved, setSaved] = useState(false)
  const dialogRef = useRef<HTMLElement>(null)
  const doneRef = useRef<HTMLButtonElement>(null)
  const label = humanizeAction(action)

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const initialFocus = dialogRef.current?.querySelector<HTMLElement>('input, button, [href]')
    initialFocus?.focus()
    return () => {
      if (previousFocus?.isConnected) previousFocus.focus()
    }
  }, [])

  useEffect(() => {
    if (saved) doneRef.current?.focus()
  }, [saved])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      close()
      return
    }
    if (event.key !== 'Tab') return

    const focusable = [...(dialogRef.current?.querySelectorAll<HTMLElement>('input:not(:disabled), button:not(:disabled), [href]') ?? [])]
    if (!focusable.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <div className="absolute inset-0 z-[60] flex items-end bg-ink-900/85 px-3 pb-[72px]" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) close() }}>
      <section ref={dialogRef} className="action-sheet-surface glass-card relative isolate w-full p-4 shadow-3" role="dialog" aria-modal="true" aria-labelledby="prototype-action-title" onKeyDown={handleKeyDown}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-paper-100/65">Quick action</p>
            <h2 id="prototype-action-title" className="mt-1 text-[18px] font-semibold text-paper-100">{label}</h2>
          </div>
          <button type="button" className="focus-ring flex h-11 w-11 items-center justify-center rounded-full text-paper-100/70" aria-label={`Close ${label.toLowerCase()}`} onClick={close}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {saved ? (
          <div className="mt-4 flex min-h-24 flex-col items-center justify-center rounded-xl border border-forest-green/30 bg-forest-green/10 px-4 text-center" role="status">
            <Check className="h-6 w-6 text-forest-green" />
            <p className="mt-2 text-[14px] font-semibold text-paper-100">Saved for this preview</p>
            <button ref={doneRef} type="button" className="focus-ring mt-2 min-h-11 rounded-pill px-4 text-[13px] font-medium text-brand-orange" onClick={close}>Done</button>
          </div>
        ) : (
          <form className="mt-4 space-y-3" onSubmit={(event) => { event.preventDefault(); setSaved(true) }}>
            <label htmlFor="prototype-quick-note" className="text-[12px] font-medium text-paper-100/70">Quick note (optional)</label>
            <input
              id="prototype-quick-note"
              className="focus-ring h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-[16px] text-paper-100 outline-none placeholder:text-paper-100/50"
              placeholder={`Add context for ${label.toLowerCase()}`}
              value={note}
              onChange={event => setNote(event.target.value)}
            />
            <button type="submit" className="hifi-action hifi-action-primary h-[52px] w-full rounded-pill px-6 text-[16px] font-semibold">Save</button>
          </form>
        )}
      </section>
    </div>
  )
}
