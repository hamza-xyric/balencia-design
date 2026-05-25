type VoiceWaveformProps = {
  tone?: 'orange' | 'purple' | 'idle'
  compact?: boolean
  className?: string
}

const bars = [10, 18, 28, 16, 36, 44, 24, 38, 48, 32, 20, 42, 30, 18, 34, 46, 26, 14, 24, 36, 22, 12, 18, 28]

export function VoiceWaveform({ tone = 'purple', compact = false, className = '' }: VoiceWaveformProps) {
  const colorClass =
    tone === 'purple' ? 'bg-royal-purple' : tone === 'idle' ? 'bg-white' : 'bg-brand-orange'
  const height = compact ? 'h-12' : 'h-[48px]'
  const width = compact ? 'w-full' : 'w-[280px]'

  return (
    <div
      className={[
        'flex items-center justify-center gap-1 overflow-hidden',
        height,
        width,
        className,
      ].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      {bars.map((bar, index) => {
        const distanceFromCenter = Math.abs(index - (bars.length - 1) / 2)
        const opacity = tone === 'idle' ? 0.12 : Math.max(0.3, 0.86 - distanceFromCenter * 0.045)
        return (
          <span
            key={`${bar}-${index}`}
            className={['voice-wave-bar w-[3px] rounded-pill', colorClass].join(' ')}
            style={{
              height: compact ? Math.max(8, Math.round(bar * 0.82)) : bar,
              opacity,
              animationDelay: `${index * 38}ms`,
            }}
          />
        )
      })}
    </div>
  )
}
