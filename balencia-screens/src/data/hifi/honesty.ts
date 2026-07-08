// Honesty invariant (canon §7): every metric ships as one of three explicit
// states. Kit data components accept HonestMetric so a screen cannot render a
// bare number without declaring where it came from.
export type HonestMetric =
  | { kind: 'real'; value: string; provenance: string }
  | { kind: 'estimate'; value: string; note?: string }
  | { kind: 'null'; reason: string; action?: string }

export const honest = {
  real: (value: string, provenance: string): HonestMetric => ({ kind: 'real', value, provenance }),
  estimate: (value: string, note?: string): HonestMetric => ({ kind: 'estimate', value, note }),
  none: (reason: string, action?: string): HonestMetric => ({ kind: 'null', reason, action }),
}
