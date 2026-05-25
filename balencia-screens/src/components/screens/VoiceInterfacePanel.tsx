import { ArrowUp, Square } from 'lucide-react'
import { VoiceWaveform } from '@/components/screens/VoiceWaveform'

type VoiceInterfacePanelProps = {
  readyToSend?: boolean
}

export function VoiceInterfacePanel({ readyToSend = false }: VoiceInterfacePanelProps) {
  return (
    <section className="h-[200px] shrink-0 rounded-t-xl border-t border-white/[0.08] bg-ink-brown-800 px-6 py-4 shadow-3">
      <p className="voice-status-pulse text-center text-[14px] leading-[18px] text-white/50">
        {readyToSend ? 'processing...' : 'listening...'}
      </p>

      <VoiceWaveform compact className="mt-4" />

      <div className="mt-5 flex items-center justify-between">
        <button className="flex h-11 items-center text-[15px] leading-5 text-white/50">
          Cancel
        </button>
        <button className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange text-white shadow-[var(--glow-orange)] voice-record-glow">
          {readyToSend ? <ArrowUp size={18} strokeWidth={2.4} /> : <Square size={15} fill="currentColor" strokeWidth={0} />}
        </button>
      </div>
    </section>
  )
}
