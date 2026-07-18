'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUpCircle, WifiOff } from 'lucide-react'
import { BtnPrimary, GlassCard, HifiShell, Provenance } from '@/components/hifi/kit'

type UpdateState = 'default' | 'loading' | 'error' | 'offline' | 'empty' | 'returned'
type LoadingSource = 'release-notes' | 'store-check' | null

const UPDATE_STATES: UpdateState[] = ['default', 'loading', 'error', 'offline', 'empty', 'returned']
const WHATS_NEW = ['Faster CIA coaching responses', 'New workout plans and exercises', 'Bug fixes and performance improvements']

export function S65ForceUpdate() {
  const [screenState, setScreenState] = useState<UpdateState>('default')
  const [loadingSource, setLoadingSource] = useState<LoadingSource>(null)
  const [notice, setNotice] = useState('')
  const attemptTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const fixture = new URLSearchParams(window.location.search).get('state') as UpdateState | null
    if (!fixture || !UPDATE_STATES.includes(fixture)) return
    const fixtureTimer = window.setTimeout(() => {
      setScreenState(fixture)
      setLoadingSource(fixture === 'loading' ? 'release-notes' : null)
    }, 0)
    return () => window.clearTimeout(fixtureTimer)
  }, [])

  useEffect(() => () => {
    if (attemptTimer.current) clearTimeout(attemptTimer.current)
  }, [])

  const attemptStorePreview = () => {
    if (attemptTimer.current) clearTimeout(attemptTimer.current)
    setLoadingSource('store-check')
    setScreenState('loading')
    setNotice('Checking the local hand-off preview. No app store has been opened.')
    attemptTimer.current = setTimeout(() => {
      setScreenState('error')
      setLoadingSource(null)
      setNotice('The store is unavailable in this web prototype. No external app was launched. You can try again.')
      attemptTimer.current = null
    }, 650)
  }

  const persistentNotice = screenState === 'offline'
    ? ''
    : screenState === 'returned'
      ? 'Returned-state fixture only. This prototype cannot confirm whether an update was installed, so the update is still required.'
      : screenState === 'error'
        ? 'The store is unavailable in this web prototype. No external app was launched. You can try again.'
        : notice

  return (
    <HifiShell
      showTabBar={false}
      bottomAction={
        <div className="flex flex-col items-center gap-3 pb-1">
          <BtnPrimary
            className="w-full"
            loading={screenState === 'loading'}
            loadingLabel={loadingSource === 'release-notes' ? 'Loading update details' : 'Checking store availability'}
            onClick={attemptStorePreview}
          >
            {screenState === 'error' ? 'Try again' : 'Update now'}
          </BtnPrimary>
          <p className="text-center text-[12px] font-medium tabular-nums text-paper-100/75">Version 2.1.0 → 3.0.0 required</p>
          <Provenance items={['Exact · bundled build fixture']} />
          <p className="max-w-[320px] text-center text-[11px] leading-4 text-paper-100/65">
            Preview only · this web build cannot open an app store or verify an installed update.
          </p>
        </div>
      }
    >
      <main
        className="flex min-h-full flex-col items-center px-6 pb-4 pt-3 text-center"
        data-update-state={screenState}
        data-loading-source={loadingSource ?? 'none'}
      >
        {screenState === 'offline' && (
          <div className="mb-4 flex w-full items-start gap-2 rounded-pill border border-white/10 bg-surface-2 px-4 py-3 text-left" role="status">
            <WifiOff aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-paper-100/70" />
            <p className="text-[12px] leading-4 text-paper-100/75">Offline · update when you reconnect. The retry action remains available.</p>
          </div>
        )}

        {/* Official immutable Balencia wordmark. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/Frame 2147239943.svg" alt="Balencia" className="h-auto w-[148px]" />

        <div className="relative mb-6 mt-8" aria-hidden="true">
          <div className="flex h-24 w-24 items-center justify-center rounded-[24px] border border-brand-orange/70 bg-brand-orange shadow-[var(--edge-highlight)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/Logo Mark.svg" alt="" className="h-12 w-12" />
          </div>
          <span className="absolute -bottom-1.5 -right-1.5 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-ink-900">
            <ArrowUpCircle size={20} strokeWidth={2} className="text-brand-orange" />
          </span>
        </div>
        <span className="sr-only">Update required</span>

        <h1 className="text-[32px] font-semibold leading-[1.12] tracking-[-0.02em] text-paper-100">
          An important security <span className="text-emphasis">update</span> is available
        </h1>
        <p className="mx-auto mt-4 max-w-[292px] text-[15px] leading-[1.45] text-paper-100/75">
          This update includes important security improvements to keep your data safe.
        </p>

        <div className={persistentNotice ? 'mt-4 w-full' : 'sr-only'} aria-live="polite" aria-atomic="true">
          {persistentNotice && (
            <p className="rounded-2xl border border-white/10 bg-surface-2 px-4 py-3 text-left text-[12px] leading-4 text-paper-100/75">
              {persistentNotice}
            </p>
          )}
        </div>

        {screenState === 'loading' && loadingSource === 'release-notes' ? (
          <div className="mt-7 w-full" aria-busy="true">
            <GlassCard tone="muted" className="w-full text-left">
              <p className="sr-only">Loading release-note preview</p>
              <div className="skeleton-block h-3 w-24 rounded-full" />
              <div className="mt-4 space-y-3">
                <div className="skeleton-block h-4 w-full rounded-full" />
                <div className="skeleton-block h-4 w-[88%] rounded-full" />
                <div className="skeleton-block h-4 w-[94%] rounded-full" />
              </div>
              <div className="skeleton-block mt-4 h-7 w-44 rounded-full" />
            </GlassCard>
          </div>
        ) : screenState !== 'empty' ? (
          <GlassCard tone="muted" className="mt-7 w-full text-left">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-paper-100/70">What&apos;s new</p>
            <ul className="mt-3 space-y-2.5">
              {WHATS_NEW.map(item => (
                <li key={item} className="flex items-start gap-3">
                  <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-paper-100/55" />
                  <span className="text-[14px] leading-[1.4] text-paper-100/85">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3"><Provenance items={['Exact · release-note fixture']} /></div>
          </GlassCard>
        ) : null}

      </main>
    </HifiShell>
  )
}
