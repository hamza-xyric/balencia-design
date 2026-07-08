import { Activity, MoreHorizontal, Plus } from 'lucide-react'
import { Chip, FloatingQuickLog, GlassCard, HifiShell, IconButton, SolidCard, TopBar } from '@/components/hifi/kit'

function FeedPost({ author, time, body, proof, media = false }: { author: string; time: string; body: string; proof: string; media?: boolean }) {
  return (
    <SolidCard>
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.05] text-[12px] font-semibold text-white/70">{author.split(' ').map(part => part[0]).join('')}</span>
        <div className="min-w-0 flex-1">
          <h2 className="text-[14px] font-semibold text-white">{author}</h2>
          <p className="text-[12px] text-white/35">{time}</p>
        </div>
        <MoreHorizontal size={18} className="text-white/45" />
      </div>
      <p className="mt-4 text-[15px] leading-5 text-white/80">{body}</p>
      <div className="mt-3"><Chip>{proof}</Chip></div>
      {media && (
        <div className="mt-3 flex h-[132px] items-center justify-center rounded-lg border border-white/10 bg-brand-orange/10 text-brand-orange">
          <Activity size={30} />
        </div>
      )}
      <div className="mt-4 flex justify-between text-[12px] text-white/45">
        <span>Kudos 24</span><span>Comment 6</span><span>Views 83</span>
      </div>
    </SolidCard>
  )
}

export function S91SocialFeed() {
  return (
    <HifiShell header={<TopBar title="Feed" back={false} right={<><IconButton label="Post"><Plus size={18} /></IconButton><IconButton label="Filter"><MoreHorizontal size={18} /></IconButton></>} />} activeTab="me" bottomAction={<FloatingQuickLog label="Post" />}>
        <main className="space-y-4 px-4 pb-4 pt-3">
          <div className="flex gap-2 overflow-hidden"><Chip tone="you">All</Chip><Chip>My pods</Chip><Chip>Circles</Chip><Chip>Partners</Chip></div>
          <GlassCard>
            <h2 className="text-[20px] font-semibold leading-6 text-white">Share one <span className="text-emphasis">proof</span> update</h2>
            <p className="mt-2 text-[13px] text-white/50">Visible to buddies. Choose audience before attaching health proof.</p>
            <div className="mt-4 flex gap-2"><Chip>Discussion</Chip><Chip>Question</Chip><Chip tone="you">Win</Chip></div>
          </GlassCard>
          <GlassCard tone="cia">
            <p className="text-[15px] leading-5 text-white">CIA sees Aisha&apos;s run post matching your half-marathon mission.</p>
            <div className="mt-3 flex gap-2"><Chip tone="you">Encourage</Chip><Chip>Privacy settings</Chip></div>
          </GlassCard>
          <FeedPost
            author="Aisha Khan"
            time="12m"
            body="Finished tempo run with Amira."
            proof="5.2 mi via wearable"
            media
          />
          <FeedPost
            author="Malik R."
            time="1h"
            body="Budget streak reached 14 days."
            proof="Mission update - inspectable"
          />
        </main>
      </HifiShell>
  )
}
