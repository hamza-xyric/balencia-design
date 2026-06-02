'use client'

import { useEffect, useRef, useState } from 'react'

// The "count" beat of the draw→rise→count→settle choreography (CK-P4 / CONSISTENCY §3).
// A self-contained client island so the presentational primitives that use it (GaugeRing,
// KPIStatTile, ConstellationRadar hub) stay server-renderable. Honours prefers-reduced-motion
// by snapping to the final value — the settled frame is the canonical frame.
type CountUpProps = {
  value: number
  /** 520ms for hero figures (ring/hub), 280ms for KPI numbers (CONSISTENCY §3). */
  durationMs?: number
  /** Hold before counting, to sequence after the hero draw/rise. */
  delayMs?: number
  /** Format the rounded value (e.g. thousands separators). */
  format?: (n: number) => string
  /** When false, snap to the final value (parent animation disabled). */
  enabled?: boolean
  className?: string
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

export function CountUp({ value, durationMs = 520, delayMs = 0, format, enabled = true, className }: CountUpProps) {
  const [display, setDisplay] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    // When disabled or reduced-motion, the loop snaps to the final value on the first frame
    // (settled frame is canonical) — setState stays inside the rAF callback, never the effect body.
    const animateIt = enabled && !reduced

    let start: number | null = null
    const step = (ts: number) => {
      if (start === null) start = ts
      const t = animateIt ? Math.min((ts - start) / durationMs, 1) : 1
      setDisplay(value * easeOut(t))
      if (t < 1) rafRef.current = requestAnimationFrame(step)
    }
    const timeout = window.setTimeout(() => {
      rafRef.current = requestAnimationFrame(step)
    }, animateIt ? delayMs : 0)

    return () => {
      window.clearTimeout(timeout)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [value, durationMs, delayMs, enabled])

  const rounded = Math.round(display)
  return <span className={className}>{format ? format(rounded) : rounded}</span>
}
