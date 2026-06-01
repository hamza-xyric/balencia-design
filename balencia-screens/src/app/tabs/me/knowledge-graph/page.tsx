'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, CircleHelp, RotateCcw, X, ZoomIn, ZoomOut } from 'lucide-react'
import { domainToneClasses } from '@/components/design-system/Chip'
import { DomainTag } from '@/components/design-system/DomainTag'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { knowledgeGraph } from '@/data/mock'
import { domainDashboardRoutes, type DomainKey } from '@/data/domains'

// Screen 72 of 78: Knowledge graph
// Spec: /Users/hamza/yHealth/app_design 3/72-knowledge-graph.md

function GraphHeader({ onHelp }: { onHelp: () => void }) {
  return (
    <header className="z-30 shrink-0 bg-ink-900">
      <div className="relative flex h-11 items-center px-4">
        <Link href="/tabs/me" className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full text-white" aria-label="Back">
          <ChevronLeft size={20} strokeWidth={2.1} />
        </Link>
        <h1 className="absolute left-1/2 max-w-[210px] -translate-x-1/2 truncate text-h3 font-semibold leading-[22px] text-white">
          Knowledge graph
        </h1>
        <button type="button" onClick={onHelp} className="ml-auto flex h-11 w-11 items-center justify-center rounded-full text-white/50" aria-label="Open knowledge graph help">
          <CircleHelp size={20} strokeWidth={2.1} />
        </button>
      </div>
      <div className="h-[3px] bg-royal-purple/80" />
    </header>
  )
}

function GraphCanvas({ selectedId, zoom, onSelect, onZoom, onLegend }: { selectedId: string | null; zoom: number; onSelect: (id: string) => void; onZoom: (zoom: number) => void; onLegend: () => void }) {
  const nodeById = new Map(knowledgeGraph.nodes.map((node) => [node.id, node]))

  return (
    <section className="relative flex-1 overflow-hidden bg-ink-900" aria-label="Knowledge graph insight map">
      <svg className="absolute inset-0 h-full w-full text-royal-purple transition-transform" style={{ transform: `scale(${zoom})` }} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {knowledgeGraph.edges.map((edge) => {
          const from = nodeById.get(edge.from)
          const to = nodeById.get(edge.to)
          if (!from || !to) return null
          const selected = selectedId ? edge.from === selectedId || edge.to === selectedId : false
          return (
            <line
              key={`${edge.from}-${edge.to}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="currentColor"
              strokeWidth={selected ? 0.85 : 0.4}
              opacity={selected ? 0.65 : 0.18}
              strokeLinecap="round"
            />
          )
        })}
      </svg>

      {knowledgeGraph.nodes.map((node) => {
        const tone = domainToneClasses[node.domain as DomainKey]
        const selected = node.id === selectedId
        return (
          <button
            type="button"
            key={node.id}
            onClick={() => onSelect(node.id)}
            className="absolute flex min-h-11 min-w-11 -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            style={{ left: `${node.x}%`, top: `${node.y}%`, transform: `translate(-50%, -50%) scale(${zoom})` }}
            aria-pressed={selected}
            aria-label={`${node.label} insight node`}
          >
            <span
              className={[
                'flex items-center justify-center rounded-full border text-small font-semibold text-white shadow-2 transition-transform duration-[var(--dur-base)]',
                tone.dot,
                selected ? 'scale-110 border-white shadow-[var(--glow-purple)]' : 'border-white/10 opacity-80',
              ].join(' ')}
              style={{ width: node.size, height: node.size }}
            >
              {node.label.split(' ').map((part) => part[0]).join('').slice(0, 2)}
            </span>
            <span className="mt-1 max-w-[72px] text-center text-[10px] font-semibold leading-3 text-white/70">{node.label}</span>
          </button>
        )
      })}

      <button type="button" onClick={onLegend} className="absolute bottom-20 left-4 z-20 min-h-11 rounded-pill border border-white/10 bg-ink-brown-800 px-4 py-2 text-small font-semibold leading-3 text-white/60 shadow-1">
        Legend
      </button>
      <div className="absolute bottom-20 right-4 z-20 flex flex-col gap-2">
        <button type="button" onClick={() => onZoom(Math.min(1.25, zoom + 0.1))} className="flex h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-ink-brown-800 text-white/70 shadow-1" aria-label="Zoom in"><ZoomIn size={18} strokeWidth={2.1} /></button>
        <button type="button" onClick={() => onZoom(Math.max(0.85, zoom - 0.1))} className="flex h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-ink-brown-800 text-white/70 shadow-1" aria-label="Zoom out"><ZoomOut size={18} strokeWidth={2.1} /></button>
        <button type="button" onClick={() => onZoom(1)} className="flex h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-ink-brown-800 text-white/70 shadow-1" aria-label="Reset graph zoom"><RotateCcw size={18} strokeWidth={2.1} /></button>
      </div>
    </section>
  )
}

function NodeDetailPanel({ selectedId, onClose }: { selectedId: string; onClose: () => void }) {
  const selectedNode = knowledgeGraph.nodes.find((node) => node.id === selectedId) ?? knowledgeGraph.nodes[0]

  return (
    <section className="absolute inset-x-0 bottom-[90px] z-30 rounded-t-lg border border-white/[0.06] bg-ink-brown-800 px-4 pb-5 pt-3 shadow-3 animate-fade-up">
      <div className="mx-auto h-1 w-10 rounded-pill bg-white/20" />
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-h3 font-semibold leading-[22px] text-white">{selectedNode.label}</h2>
          <div className="mt-2">
            <DomainTag domain={selectedNode.domain as DomainKey} />
          </div>
        </div>
        <button type="button" onClick={onClose} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/45" aria-label="Close node details">
          <X size={18} strokeWidth={2.1} />
        </button>
      </div>

      <div className="mt-4 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">Connected to</div>
      <div className="mt-2 space-y-2">
        {knowledgeGraph.connections.map((connection) => {
          const tone = domainToneClasses[connection.domain]
          return (
            <div key={connection.name}>
              <div className="flex h-7 items-center gap-2">
                <span className={['h-2 w-2 rounded-full', tone.dot].join(' ')} />
                <span className="min-w-0 flex-1 truncate text-caption font-semibold leading-[18px] text-white">{connection.name}</span>
                <span className="text-caption font-semibold leading-[18px] text-white/70">{connection.strength}%</span>
              </div>
              <div className="h-1 overflow-hidden rounded-pill bg-white/[0.06]">
                <div className="h-full rounded-pill bg-royal-purple" style={{ width: `${connection.strength}%` }} />
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 rounded-md bg-ink-900/80 p-3">
        <div className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-royal-purple" />
          <p className="text-caption italic leading-[18px] text-white/65">{knowledgeGraph.insight}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Link href={`/tabs/sia?context=${selectedNode.id}`} className="flex h-11 items-center justify-center rounded-pill bg-royal-purple/15 text-caption font-semibold leading-[18px] text-royal-purple">
          Ask SIA
        </Link>
        <Link href={domainDashboardRoutes[selectedNode.domain as DomainKey]} className="flex h-11 items-center justify-center rounded-pill bg-brand-orange/15 text-caption font-semibold leading-[18px] text-brand-orange">
          Go to domain
        </Link>
      </div>
    </section>
  )
}

export default function KnowledgeGraphScreen() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [zoom, setZoom] = useState(1)
  const [infoSheet, setInfoSheet] = useState<'legend' | 'help' | null>(null)
  const accessibleConnections = useMemo(() => knowledgeGraph.connections.map((item) => `${item.name} ${item.strength}%`).join(', '), [])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search)
      const correlation = params.get('correlation')
      if (!correlation) return
      const matchedNode = knowledgeGraph.nodes.find((node) => node.id === correlation || node.label.toLowerCase().includes(correlation.toLowerCase()))
      if (matchedNode) setSelectedId(matchedNode.id)
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <PhoneFrame>
      <ScreenShell header={<GraphHeader onHelp={() => setInfoSheet('help')} />} activeTab="me">
        <main className="relative flex min-h-full flex-col">
          <GraphCanvas selectedId={selectedId} zoom={zoom} onSelect={setSelectedId} onZoom={setZoom} onLegend={() => setInfoSheet('legend')} />
          {!selectedId && (
            <div className="absolute inset-x-4 bottom-[94px] z-10 rounded-md border border-white/[0.06] bg-ink-brown-800 p-3 text-[13px] leading-[18px] text-white/55 shadow-1">
              Tap a node to inspect correlations between your life domains.
              <span className="sr-only"> Summary: {accessibleConnections}.</span>
            </div>
          )}
          {infoSheet && (
            <div className="absolute left-4 right-4 top-4 z-40 rounded-md border border-white/10 bg-ink-brown-800 p-4 text-[12px] leading-4 text-white/55 shadow-2" role="dialog" aria-label={infoSheet === 'legend' ? 'Knowledge graph legend' : 'Knowledge graph help'}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-[15px] font-semibold leading-5 text-white">{infoSheet === 'legend' ? 'Legend' : 'How to use the graph'}</h2>
                  <p className="mt-2">
                    {infoSheet === 'legend'
                      ? 'Larger nodes have stronger evidence. Purple lines show correlations, not causation. Domain colors match the related life area.'
                      : 'Tap a node to inspect the strongest connections, ask SIA about the context, or open the mapped domain dashboard.'}
                  </p>
                </div>
                <button type="button" onClick={() => setInfoSheet(null)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/55" aria-label="Close knowledge graph information">
                  <X size={18} strokeWidth={2.1} />
                </button>
              </div>
            </div>
          )}
          {selectedId && <NodeDetailPanel selectedId={selectedId} onClose={() => setSelectedId(null)} />}
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
