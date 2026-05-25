import { Plus } from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { FAB } from '@/components/design-system/FAB'
import { SegmentedControl } from '@/components/design-system/SegmentedControl'
import { JournalEntryCard } from '@/components/domain/JournalEntryCard'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { journalEntries, journalPrompt } from '@/data/mock'

// Screen 37 of 78: Journal
// Spec: /Users/hamza/yHealth/app_design 3/37-journal.md

function ReflectionPrompt() {
  return (
    <Card variant="small" className="rounded-lg p-6 animate-fade-up">
      <div className="flex items-start gap-3">
        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-royal-purple" aria-hidden="true" />
        <div className="min-w-0">
          <p className="text-h3 font-normal leading-6 text-white/90">{journalPrompt}</p>
          <button
            type="button"
            className="mt-4 inline-flex h-8 items-center rounded-pill border border-white/10 bg-ink-brown-800 px-4 text-caption font-semibold leading-[18px] text-white/70"
          >
            Write about this
          </button>
        </div>
      </div>
    </Card>
  )
}

export default function JournalScreen() {
  return (
    <PhoneFrame>
      <ScreenShell
        header={<Header title="Journal" showBack />}
        activeTab="me"
        bottomAction={
          <FAB
            label="Write"
            icon={<Plus size={16} strokeWidth={2.4} />}
            display="pill"
          />
        }
      >
        <main className="px-4 pb-6 pt-4">
          <ReflectionPrompt />

          <SegmentedControl
            options={[
              { label: 'Entries', value: 'entries' },
              { label: 'Check-ins', value: 'check-ins' },
            ]}
            activeValue="entries"
            className="mt-4 animate-fade-up"
            size="sm"
          />

          <section className="mt-4 animate-fade-up" style={{ animationDelay: '160ms' }}>
            <Card variant="small" className="rounded-lg p-0">
              {journalEntries.map((entry, index) => (
                <JournalEntryCard
                  key={entry.id}
                  date={entry.date}
                  preview={entry.preview}
                  domains={entry.domains}
                  mood={entry.mood}
                  voice={entry.voice}
                  withDivider={index > 0}
                />
              ))}
            </Card>
          </section>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
