'use client'

import { useEffect, useEffectEvent, useRef } from 'react'
import { createPortal } from 'react-dom'

const FOCUSABLE = 'button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

export function E1Modal({ label, onClose, children, className = '' }: { label: string; onClose: () => void; children: React.ReactNode; className?: string }) {
  const dialogRef = useRef<HTMLElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)
  const closeModal = useEffectEvent(onClose)
  const portalTarget = typeof document === 'undefined' ? null : document.querySelector<HTMLElement>('[data-testid="phone-frame"]')

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    openerRef.current = document.activeElement instanceof HTMLElement && document.activeElement !== document.body ? document.activeElement : null
    const phone = dialog.closest('[data-testid="phone-frame"]')
    const inerted = phone ? [...phone.querySelectorAll<HTMLElement>('header, main, nav')].filter(node => !node.contains(dialog)) : []
    inerted.forEach(node => { node.inert = true })
    const focusables = [...dialog.querySelectorAll<HTMLElement>(FOCUSABLE)]
    ;(focusables[0] ?? dialog).focus()
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); closeModal(); return }
      if (event.key !== 'Tab') return
      const current = [...dialog.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(node => node.offsetParent !== null)
      if (!current.length) { event.preventDefault(); dialog.focus(); return }
      const first = current[0]
      const last = current[current.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    dialog.addEventListener('keydown', handleKey)
    return () => {
      dialog.removeEventListener('keydown', handleKey)
      inerted.forEach(node => { node.inert = false })
      requestAnimationFrame(() => {
        if (openerRef.current?.isConnected) openerRef.current.focus()
        else phone?.querySelector<HTMLElement>('button:not([disabled]),a[href],[tabindex="0"]')?.focus()
      })
    }
  }, [])

  if (!portalTarget) return null
  return createPortal(<div className="absolute inset-0 z-50 flex items-end bg-ink-900/75 p-3"><section ref={dialogRef} role="dialog" aria-modal="true" aria-label={label} tabIndex={-1} className={`glass-frost max-h-[78%] w-full overflow-y-auto rounded-t-[28px] p-5 ${className}`}>{children}</section></div>, portalTarget)
}
