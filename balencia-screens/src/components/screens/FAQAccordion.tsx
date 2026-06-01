import { ChevronDown, ChevronRight } from 'lucide-react'

type FAQAccordionProps = {
  question: string
  answer: string
  expanded?: boolean
}

export function FAQAccordion({ question, answer, expanded = false }: FAQAccordionProps) {
  const Icon = expanded ? ChevronDown : ChevronRight

  return (
    <article className="border-b border-alpha-white-05 bg-ink-brown-800 last:border-b-0">
      <button type="button" className="flex min-h-14 w-full items-center gap-3 px-4 py-3 text-left">
        <span className="min-w-0 flex-1 text-[15px] font-semibold leading-5 text-white">{question}</span>
        <Icon size={15} className="shrink-0 text-white/40" strokeWidth={2} />
      </button>
      {expanded && (
        <div className="border-t border-alpha-white-05 px-4 pb-4 pt-3">
          <p className="text-[15px] leading-[22px] text-white/70">{answer}</p>
        </div>
      )}
    </article>
  )
}
