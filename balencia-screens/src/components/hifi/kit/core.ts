export type Tone = 'you' | 'done' | 'cia' | 'muted'

export const toneClass: Record<Tone, string> = {
  you: 'border-brand-orange/25 bg-brand-orange/10 text-brand-orange',
  done: 'border-forest-green/25 bg-forest-green/10 text-forest-green',
  cia: 'border-royal-purple/25 bg-royal-purple/10 text-royal-purple',
  muted: 'border-white/10 bg-white/[0.04] text-white/55',
}

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}
