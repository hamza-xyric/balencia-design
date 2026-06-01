'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowRight, ChevronDown, LifeBuoy, Search, X } from 'lucide-react'
import { Button } from '@/components/design-system/Button'
import { Eyebrow } from '@/components/design-system/Eyebrow'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { SettingsGroup } from '@/components/screens/SettingsRow'

// Screen 25 of 78: Help center
// Spec: /Users/hamza/yHealth/app_design 3/25-help-center.md

const faqCategories = [
  { title: 'Getting started', body: 'Create an account, choose focus areas, and let SIA generate your first plan.' },
  { title: 'SIA & AI coach', body: 'SIA can answer product questions, explain recommendations, and help turn insight into action.' },
  { title: 'Missions & tracking', body: 'Missions combine intentions, habits, and next actions. Completion earns XP and improves your plan.' },
  { title: 'Billing & subscription', body: 'Manage your plan from Subscription & billing. Restore purchases is available there too.' },
  { title: 'Privacy & data', body: 'You control connected services, SIA memory, and sensitive data in Settings and Data Sources.' },
  { title: 'Troubleshooting', body: 'Refresh the app, check connected-source health, or contact support if data looks stale.' },
]

function AskSiaCard() {
  return (
    <section className="rounded-xl border border-white/[0.06] bg-ink-brown-800 p-6 shadow-1 animate-fade-up">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-royal-purple" aria-hidden="true" />
        <h1 className="text-[18px] font-semibold leading-6 text-white">Ask SIA</h1>
      </div>
      <p className="mt-3 text-[14px] leading-5 text-white/60">
        Get instant answers from your AI coach. SIA knows Balencia inside and out.
      </p>
      <Link
        href="/tabs/sia"
        className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-pill bg-brand-orange px-5 text-[14px] font-semibold leading-[18px] text-white"
      >
        Ask SIA
        <ArrowRight size={14} strokeWidth={2} />
      </Link>
    </section>
  )
}

function ContactSupportCard() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <section className="rounded-xl border border-white/[0.06] bg-ink-brown-800 p-6 shadow-1 animate-fade-up" style={{ animationDelay: '240ms' }}>
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/[0.06] text-white/60">
          <LifeBuoy size={18} strokeWidth={1.8} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-[16px] font-semibold leading-[22px] text-white">Still need help?</h2>
          <p className="mt-2 text-[14px] leading-5 text-white/50">
            Reach out to our support team and we will get back to you within 24 hours.
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="mt-5 min-h-11 w-full rounded-pill border border-white/10 text-[14px] font-semibold leading-[18px] text-white"
      >
        Contact support
      </button>
      {open && (
        <form
          className="mt-4 space-y-3"
          onSubmit={(event) => {
            event.preventDefault()
            setSent(true)
          }}
        >
          <label className="block text-[12px] font-semibold leading-4 text-white/45" htmlFor="support-message">
            Message
          </label>
          <textarea
            id="support-message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Tell us what happened"
            className="min-h-[96px] w-full resize-none rounded-md border border-white/10 bg-ink-900 px-3 py-3 text-[15px] leading-5 text-white outline-none placeholder:text-white/30 focus:border-brand-orange"
          />
          <Button size="card" fullWidth disabled={message.trim().length < 8}>
            Send request
          </Button>
          {sent && <p className="text-[12px] font-semibold leading-4 text-forest-green" aria-live="polite">Support request queued. We will reply in-app and by email.</p>}
        </form>
      )}
    </section>
  )
}

export default function HelpCenterScreen() {
  const [query, setQuery] = useState('')
  const [openFaq, setOpenFaq] = useState('Getting started')
  const filteredFaq = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return faqCategories
    return faqCategories.filter((item) => `${item.title} ${item.body}`.toLowerCase().includes(normalized))
  }, [query])

  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Help center" showBack />} activeTab="me">
        <main className="px-4 pb-16 pt-2">
          <div className="animate-fade-up">
            <label className="sr-only" htmlFor="help-search">Search help topics</label>
            <div className="flex h-[52px] items-center gap-3 rounded-md border border-white/10 bg-ink-brown-800 px-4 text-[15px] leading-5 shadow-none" role="search">
              <Search size={16} className="shrink-0 text-white/40" strokeWidth={1.8} />
              <input
                id="help-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search help topics"
                className="h-full min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-white/40"
              />
              {query && (
                <button type="button" onClick={() => setQuery('')} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/40" aria-label="Clear search">
                  <X size={16} strokeWidth={1.8} />
                </button>
              )}
            </div>
          </div>

          <div className="mt-6">
            <AskSiaCard />
          </div>

          <section className="mt-8 animate-fade-up" style={{ animationDelay: '160ms' }}>
            <Eyebrow className="mb-3 px-1 text-white/50">FAQ</Eyebrow>
            <SettingsGroup>
              {filteredFaq.map((category) => {
                const expanded = openFaq === category.title
                return (
                  <button
                    key={category.title}
                    type="button"
                    onClick={() => setOpenFaq(expanded ? '' : category.title)}
                    className="w-full border-b border-white/[0.05] px-4 py-3 text-left last:border-b-0"
                    aria-expanded={expanded}
                  >
                    <span className="flex min-h-11 items-center gap-3">
                      <span className="min-w-0 flex-1 text-[15px] font-semibold leading-5 text-white">{category.title}</span>
                      <ChevronDown className={expanded ? 'rotate-180 text-brand-orange' : 'text-white/35'} size={18} strokeWidth={2} />
                    </span>
                    {expanded && <span className="block pb-2 pr-8 text-[13px] leading-[18px] text-white/55">{category.body}</span>}
                  </button>
                )
              })}
            </SettingsGroup>
            {filteredFaq.length === 0 && (
              <div className="mt-3 rounded-md border border-white/[0.06] bg-ink-brown-800 p-4 text-[13px] leading-[18px] text-white/55">
                No help article matched. Ask SIA or contact support with this search.
              </div>
            )}
          </section>

          <div className="mt-8">
            <ContactSupportCard />
          </div>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
