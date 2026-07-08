import { Activity, Info, Phone, Sparkles } from 'lucide-react'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { ChatBubble, Chip, Composer, GlassCard, IconButton, ProgressBar, Provenance, SolidCard, TopBar } from '@/components/hifi/kit'

export function S75DirectChat() {
  return (
    <PhoneFrame>
      <ScreenShell
        header={<TopBar title="Aisha Khan" right={<><IconButton label="Call"><Phone size={18} /></IconButton><IconButton label="Info"><Info size={18} /></IconButton></>} />}
        activeTab="cia"
        composer={<Composer placeholder="Message Aisha" />}
      >
        <main className="space-y-4 px-4 pb-4 pt-3">
          <SolidCard>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange/15 text-[14px] font-bold text-brand-orange">AK</span>
              <div className="min-w-0 flex-1">
                <h2 className="text-[15px] font-semibold text-white">Aisha is training with you</h2>
                <p className="mt-1 text-[12px] text-white/45">Shared mission: Run 30 min</p>
                <div className="mt-2"><ProgressBar value={62} /></div>
              </div>
            </div>
          </SolidCard>
          <GlassCard tone="cia">
            <div className="flex items-start gap-3">
              <Sparkles size={18} className="mt-1 text-royal-purple" />
              <div>
                <p className="text-[12px] font-semibold uppercase text-royal-purple">CIA assist</p>
                <p className="mt-2 text-[13px] leading-[18px] text-white/65">Suggest pacing, summarize, or save to mission. You control access.</p>
                <div className="mt-3 flex gap-2"><Chip>Pace</Chip><Chip>Shared</Chip><Chip>Private</Chip></div>
              </div>
            </div>
          </GlassCard>
          <div className="flex items-center gap-3 py-1 text-[12px] text-white/30"><span className="h-px flex-1 bg-white/[0.06]" />Today<span className="h-px flex-1 bg-white/[0.06]" /></div>
          <ChatBubble speaker="Aisha">I am thinking of the river route this Sunday.</ChatBubble>
          <ChatBubble speaker="CIA" tone="cia">Private draft, visible only to you: recovery supports the river route.</ChatBubble>
          <div className="flex gap-2"><Chip tone="you">Insert draft</Chip><Chip>Share health source</Chip></div>
          <ChatBubble speaker="You">Works.</ChatBubble>
          <ChatBubble speaker="Aisha">Hill segment photo attached.</ChatBubble>
          <SolidCard className="overflow-hidden p-0">
            <div className="flex h-[118px] items-center justify-center bg-brand-orange/10 text-brand-orange">
              <Activity size={34} />
            </div>
            <div className="p-3"><Provenance items={['Hill segment', 'Useful 1', 'Media retention']} /></div>
          </SolidCard>
          <p className="text-[13px] text-white/40">Aisha is typing</p>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
