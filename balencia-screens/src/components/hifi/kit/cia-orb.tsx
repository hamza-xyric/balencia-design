'use client'

import { useEffect, useState } from 'react'

export type CIAPresenceState = 'idle' | 'listening' | 'thinking' | 'speaking' | 'success'

export function CIAPresenceOrb({
  size = 96,
  state = 'idle',
  decorative = false,
  amplitude = 0.6,
}: {
  size?: number
  state?: CIAPresenceState
  decorative?: boolean
  amplitude?: number
}) {
  const [pageVisible, setPageVisible] = useState(true)
  const sizeTier = size < 32 ? 'compact' : size < 64 ? 'standard' : 'hero'
  const compact = sizeTier === 'compact'
  const normalizedAmplitude = Math.max(0, Math.min(1, amplitude))
  const mainTick = 8 + normalizedAmplitude * 14
  const minorTick = 4 + normalizedAmplitude * 8
  const stateStroke = compact ? 5.8 : sizeTier === 'standard' ? 4.8 : 4.2
  const detailStroke = compact ? 3.2 : 2.4

  useEffect(() => {
    const updateVisibility = () => setPageVisible(document.visibilityState === 'visible')
    updateVisibility()
    document.addEventListener('visibilitychange', updateVisibility)
    return () => document.removeEventListener('visibilitychange', updateVisibility)
  }, [])

  return (
    <div
      className="cia-orb relative shrink-0 text-royal-purple"
      style={{ width: size, height: size }}
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : `CIA presence, ${state}`}
      data-cia-state={state}
      data-cia-size={sizeTier}
      data-cia-paused={pageVisible ? undefined : 'true'}
    >
      {sizeTier === 'hero' && <span className="cia-orb__halo" aria-hidden="true" />}
      <svg viewBox="0 0 100 100" className="relative h-full w-full overflow-visible" aria-hidden="true">
        <g className="cia-orb__core">
          <circle cx="50" cy="50" r={compact ? 19 : 22} fill="currentColor" fillOpacity="0.28" />
          <circle cx="50" cy="50" r={compact ? 9 : 12} fill="currentColor" fillOpacity="0.74" />
          <circle cx="50" cy="50" r={compact ? 3.8 : 4.5} className="fill-paper-100" fillOpacity="0.94" />
        </g>

        {state === 'idle' && (
          <path d="M59 14 A38 38 0 1 0 59 86" fill="none" stroke="currentColor" strokeWidth={stateStroke} strokeLinecap="round" />
        )}

        {state === 'listening' && (
          <g className="cia-orb__listen-ticks" fill="none" stroke="currentColor" strokeLinecap="round">
            <path d="M35 15 A38 38 0 0 0 35 85" strokeWidth={stateStroke} />
            {!compact && <path d="M65 15 A38 38 0 0 1 65 85" strokeWidth={stateStroke} />}
            <path d={`M20 ${50 - mainTick / 2}v${mainTick}M80 ${50 - mainTick / 2}v${mainTick}`} strokeWidth={detailStroke} strokeOpacity="0.82" />
            {!compact && <path d={`M13 ${50 - minorTick / 2}v${minorTick}M87 ${50 - minorTick / 2}v${minorTick}`} strokeWidth={detailStroke} strokeOpacity="0.62" />}
          </g>
        )}

        {state === 'thinking' && (
          <g className="cia-orb__thinking-orbit" fill="none" stroke="currentColor">
            {!compact && <ellipse cx="47" cy="49" rx="36" ry="29" transform="rotate(-18 47 49)" strokeWidth="2.2" strokeOpacity="0.72" />}
            <circle cx="50" cy="15" r={compact ? 4.8 : 4} fill="currentColor" stroke="none" />
            <circle cx="80" cy="65" r={compact ? 4.8 : 4} fill="currentColor" stroke="none" />
            <circle cx="18" cy="70" r={compact ? 4.8 : 4} fill="currentColor" stroke="none" />
          </g>
        )}

        {state === 'speaking' && (
          <g className="cia-orb__speaking-wave" fill="none" stroke="currentColor" strokeLinecap="round">
            <path d="M68 29 A27 27 0 0 1 68 71" strokeWidth={compact ? 4.6 : 3} strokeOpacity="0.62" />
            <path d="M77 21 A38 38 0 0 1 77 79" strokeWidth={stateStroke} />
            {!compact && <path d="M84 16 A46 46 0 0 1 84 84" strokeWidth="3.4" strokeOpacity="0.72" />}
          </g>
        )}

        {state === 'success' && (
          <g className="cia-orb__success" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            {!compact && <path d="M42 14 A38 38 0 1 0 76 25" strokeWidth={stateStroke} />}
            <path d={compact ? 'm35 51 10 10 22-27' : 'm38 50 9 9 20-24'} strokeWidth={compact ? 7 : 5.2} />
            {!compact && <circle cx="84" cy="18" r="4" className="fill-forest-green" stroke="none" />}
          </g>
        )}
      </svg>
    </div>
  )
}
