import { Mic, Search } from 'lucide-react'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { ChatBubble, Chip, Composer, ConsentRail, IconButton, InlineArtifact, TopBar } from '@/components/hifi/kit'

export function S09CiaChat() {
  return (
    <PhoneFrame>
      <ScreenShell
        header={<TopBar title="CIA" eyebrow="Today" back={false} right={<><IconButton label="Search"><Search size={18} /></IconButton><IconButton label="Voice"><Mic size={18} /></IconButton></>} />}
        activeTab="cia"
        composer={<Composer />}
      >
        <main className="space-y-4 px-4 pb-4 pt-3">
          <ChatBubble speaker="CIA" tone="cia">
            <p>Good morning, Amira. Your sleep and workout load are connected.</p>
          </ChatBubble>
          <InlineArtifact />
          <ChatBubble speaker="You">What should I change today?</ChatBubble>
          <div className="flex items-center gap-2 text-[13px] text-white/45">
            <span className="flex gap-1">
              <i className="voice-status-pulse h-1.5 w-1.5 rounded-full bg-royal-purple" />
              <i className="voice-status-pulse h-1.5 w-1.5 rounded-full bg-royal-purple [animation-delay:120ms]" />
              <i className="voice-status-pulse h-1.5 w-1.5 rounded-full bg-royal-purple [animation-delay:240ms]" />
            </span>
            CIA is thinking
          </div>
          <div className="flex flex-wrap gap-2">
            <Chip tone="you">Tell me more</Chip><Chip>Show missions</Chip><Chip>Log meal</Chip>
          </div>
          <ConsentRail />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
