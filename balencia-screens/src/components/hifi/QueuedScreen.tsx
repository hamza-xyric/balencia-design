import type { ScreenInfo } from '@/data/screens'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { Chip, ConsentRail, GlassCard, SectionTitle, SolidCard, TopBar } from '@/components/hifi/kit'

export function QueuedScreen({ screen }: { screen: ScreenInfo }) {
  return (
    <PhoneFrame>
      <ScreenShell header={<TopBar title={screen.name} eyebrow={`Spec ${screen.id}`} />} showTabBar={false}>
        <main className="flex min-h-full flex-col px-4 pb-8 pt-4">
          <GlassCard tone="cia">
            <p className="text-[12px] font-semibold uppercase text-white/45">Source queued</p>
            <h1 className="mt-3 text-[27px] font-bold leading-8 text-white">{screen.name}</h1>
            <p className="mt-3 text-[14px] leading-5 text-white/60">This screen is registered from the new 104-screen hi-fi source and waits for its implementation batch.</p>
            <ConsentRail />
          </GlassCard>
          <div className="mt-4 space-y-3">
            <SolidCard>
              <SectionTitle title="Source route intent" />
              <p className="mt-3 text-[13px] leading-[18px] text-white/65">{screen.sourceRoutes || 'Source-only surface'}</p>
            </SolidCard>
            <SolidCard>
              <SectionTitle title="Implementation truth" />
              <div className="mt-3 flex flex-wrap gap-2">
                <Chip>{screen.specFile}</Chip>
                <Chip>{screen.conversionStatus}</Chip>
                <Chip>{screen.assetNeeds === 'none' ? 'No image slot' : screen.assetNeeds}</Chip>
              </div>
            </SolidCard>
            <SolidCard>
              <SectionTitle title="Required rendering passes" />
              <div className="mt-3 space-y-2 text-[13px] leading-[18px] text-white/60">
                <p>Read the hi-fi spec before composing UI.</p>
                <p>Preserve focal hierarchy, provenance chips, safety exits, honest-null states, and motion notes.</p>
                <p>Use CIA naming in visible UI.</p>
              </div>
            </SolidCard>
          </div>
          <div className="flex-1" />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
