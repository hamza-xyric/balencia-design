import { ArrowUp, Square } from 'lucide-react'
import { VoiceWaveform } from '@/components/screens/VoiceWaveform'

type VoiceInterfacePanelProps = {
  readyToSend?: boolean
  status?: string
  transcript?: string
  onCancel?: () => void
  onPrimary?: () => void
}

export function VoiceInterfacePanel({
  readyToSend = false,
  status,
  transcript,
  onCancel,
  onPrimary,
}: VoiceInterfacePanelProps) {
  return (
    <section className="min-h-[208px] shrink-0 rounded-t-xl border-t border-alpha-white-08 bg-ink-brown-800 px-6 pb-5 pt-4 shadow-3">
      <p className="voice-status-pulse text-center text-[14px] leading-[18px] text-white/50" aria-live="polite">
        {status || (readyToSend ? 'processing...' : 'listening...')}
      </p>

      <VoiceWaveform compact className="mt-4" />
      {transcript && (
        <p className="mt-3 max-h-[44px] overflow-hidden text-center text-caption leading-[18px] text-white/55" aria-live="polite">
          {transcript}
        </p>
      )}

      <div className="mt-3 flex items-center justify-between">
        <button type="button" onClick={onCancel} className="flex h-11 items-center px-2 text-[15px] leading-5 text-white/50" aria-label="Cancel voice input and return to text mode">
          Cancel
        </button>
        <button
          type="button"
          onClick={onPrimary}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange text-white shadow-[var(--glow-orange)] voice-record-glow"
          aria-label={readyToSend ? 'Send voice message' : 'Stop recording and send message'}
        >
          {readyToSend ? <ArrowUp size={18} strokeWidth={2.4} /> : <Square size={15} fill="currentColor" strokeWidth={0} />}
        </button>
      </div>
    </section>
  )
}
