'use client'

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import {
  Bookmark,
  BookmarkCheck,
  Check,
  CircleAlert,
  Database,
  ExternalLink,
  Film,
  LoaderCircle,
  Pause,
  Play,
  RotateCw,
  Search,
  ShieldCheck,
  WifiOff,
  X,
} from 'lucide-react'
import {
  BtnGhost,
  BtnPrimary,
  BtnSecondary,
  CIAInsightCard,
  GlassCard,
  HifiShell,
  IconButton,
  ProgressBar,
  Provenance,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'
import { E1Modal } from '../intelligence/E1Modal'
import { I1TextScaleScope } from './I1TextScaleScope'

const STATES = [
  'default-mobility',
  'filter-focus',
  'filter-webinars',
  'filter-saved',
  'search-results',
  'search-empty',
  'skeleton',
  'empty',
  'error-cached',
  'offline',
  'featured-playing',
  'hip-reset-resume',
  'webinar-playing',
  'unavailable',
  'external-confirm',
  'data-controls',
] as const

type Fixture = (typeof STATES)[number]
type Category = 'Mobility' | 'Focus' | 'Webinars' | 'Saved'
type Panel = 'featured' | 'hip' | 'webinar' | 'external' | 'data' | null
type SaveableId = 'featured' | 'hip' | 'webinar' | 'focus'
type VideoFixture = {
  id: SaveableId | 'unavailable' | 'processing'
  title: string
  category: string
  duration: string
  reason: string
  progress?: number
}
type RowMode = 'play' | 'resume' | 'unavailable' | 'processing' | 'offline'

const CATEGORIES: Category[] = ['Mobility', 'Focus', 'Webinars', 'Saved']
const FILTER_FIXTURE: Record<Category, Fixture> = {
  Mobility: 'default-mobility',
  Focus: 'filter-focus',
  Webinars: 'filter-webinars',
  Saved: 'filter-saved',
}

const FEATURED: VideoFixture = {
  id: 'featured',
  title: 'Post-run mobility',
  category: 'Mobility',
  duration: '8 min',
  reason: 'Bundled mission-match fixture for tomorrow’s run.',
}
const FOCUS_RESET: VideoFixture = {
  id: 'focus',
  title: 'Low-stimulus focus reset',
  category: 'Focus',
  duration: '6 min',
  reason: 'Curated by topic only; no personal signal is required.',
}
const HIP_RESET: VideoFixture = {
  id: 'hip',
  title: '5-minute hip reset',
  category: 'Mobility',
  duration: '5:20',
  reason: 'Bundled local library fixture.',
  progress: 43,
}
const WEBINAR: VideoFixture = {
  id: 'webinar',
  title: 'Stress reset webinar',
  category: 'Webinar',
  duration: '28 min',
  reason: 'Published bundled recording fixture.',
  progress: 12,
}
const UNAVAILABLE_VIDEO: VideoFixture = {
  id: 'unavailable',
  title: 'Sleep wind-down stretch',
  category: 'Mobility',
  duration: 'Unavailable',
  reason: 'Bundled source unavailable.',
}
const PROCESSING_VIDEO: VideoFixture = {
  id: 'processing',
  title: 'Recovery questions webinar',
  category: 'Webinar',
  duration: 'Processing',
  reason: 'Recording is still processing; no playback is available.',
}

const DATA_CONTROL_LABELS = [
  'Category · learning media',
  'Source · bundled local fixtures',
  'Scope · this video-library preview',
  'Freshness · fixed Apr 12, 2026 fixture',
  'Confidence · inline per recommendation',
  'Retention · this browser session only',
  'Export · local summary preview',
  'Revoke · recommendation signals',
  'Delete · local watch-history preview',
  'Correction · metadata review',
]

const OPAQUE_MODAL_CLASS =
  '!bg-ink-900 border border-white/15 shadow-2xl outline-none focus-visible:ring-2 focus-visible:ring-brand-orange'

function fixtureCategory(fixture: Fixture): Category {
  if (fixture === 'filter-focus') return 'Focus'
  if (fixture === 'filter-webinars' || fixture === 'webinar-playing') return 'Webinars'
  if (fixture === 'filter-saved') return 'Saved'
  return 'Mobility'
}

function fixtureQuery(fixture: Fixture) {
  if (fixture === 'search-results') return 'mobility'
  if (fixture === 'search-empty') return 'breathwork'
  return ''
}

function fixturePanel(fixture: Fixture): Panel {
  if (fixture === 'featured-playing') return 'featured'
  if (fixture === 'hip-reset-resume') return 'hip'
  if (fixture === 'webinar-playing') return 'webinar'
  if (fixture === 'external-confirm') return 'external'
  if (fixture === 'data-controls') return 'data'
  return null
}

function fixtureStatus(fixture: Fixture) {
  if (fixture === 'error-cached') return 'The bundled library refresh failed. One cached playable fixture remains available.'
  if (fixture === 'offline') return 'Offline. Bundled metadata remains visible, but playback, saving, retry, and external search are unavailable.'
  if (fixture === 'unavailable') return 'Unavailable and processing fixtures never expose playback controls.'
  if (fixture === 'empty') return 'No bundled videos are available in this cold-library fixture.'
  if (fixture === 'search-empty') return 'No bundled videos match “breathwork”.'
  return ''
}

function AbstractMedia({ compact = false, label }: { compact?: boolean; label: string }) {
  return (
    <div
      role={compact ? undefined : 'img'}
      aria-label={compact ? undefined : `${label}. Code-native abstract media with no person, provider mark, private text, or external asset.`}
      aria-hidden={compact ? true : undefined}
      data-hifi-81-slot="code-native-abstract"
      className={`relative isolate overflow-hidden border border-white/10 bg-ink-900 ${compact ? 'h-16 w-24 shrink-0 rounded-xl' : 'h-44 rounded-2xl'}`}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,color-mix(in_srgb,var(--color-royal-purple)_28%,transparent),transparent_34%),radial-gradient(circle_at_18%_84%,var(--glow-orange-bg),transparent_38%)]" />
      <div aria-hidden="true" className="absolute inset-x-[18%] top-1/2 h-px -rotate-6 bg-brand-orange/70 shadow-[var(--glow-orange-sm)]" />
      <div aria-hidden="true" className="absolute inset-x-[28%] top-[58%] h-px rotate-6 bg-royal-purple/70" />
      <Film aria-hidden="true" className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-paper-100/75 ${compact ? 'h-5 w-5' : 'h-8 w-8'}`} />
      {!compact && (
        <span className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-ink-900/80 px-3 py-1 text-xs font-medium text-paper-100/75">
          Bundled abstract media
        </span>
      )}
    </div>
  )
}

function SkeletonBlock({ className }: { className: string }) {
  return <div aria-hidden="true" className={`animate-pulse rounded-2xl bg-white/[0.07] motion-reduce:animate-none ${className}`} />
}

function LibrarySkeleton() {
  return (
    <section aria-label="Loading bundled video library" aria-busy="true" className="space-y-3">
      <GlassCard tone="muted" className="space-y-3">
        <SkeletonBlock className="h-44" />
        <SkeletonBlock className="h-5 w-2/3" />
        <SkeletonBlock className="h-12" />
      </GlassCard>
      <SkeletonBlock className="h-24" />
      <SkeletonBlock className="h-24" />
    </section>
  )
}

function EmptyLibrary({
  title,
  body,
  onExternal,
}: {
  title: string
  body: string
  onExternal: () => void
}) {
  return (
    <SolidCard className="text-center">
      <Database aria-hidden="true" className="mx-auto h-7 w-7 text-paper-100/55" />
      <h2 className="mt-3 text-lg font-semibold text-paper-100">{title}</h2>
      <p className="mt-2 text-sm leading-5 text-paper-100/70">{body}</p>
      <BtnSecondary className="mt-4 w-full" onClick={onExternal}>
        Review external search
      </BtnSecondary>
    </SolidCard>
  )
}

function VideoRow({
  video,
  mode,
  saved = false,
  progressVisible = true,
  onActivate,
  onToggleSave,
  onRetry,
  disabledReasonId,
}: {
  video: VideoFixture
  mode: RowMode
  saved?: boolean
  progressVisible?: boolean
  onActivate?: () => void
  onToggleSave?: () => void
  onRetry?: () => void
  disabledReasonId?: string
}) {
  const playable = mode === 'play' || mode === 'resume'
  const showProgress = playable && progressVisible && typeof video.progress === 'number'
  const action = mode === 'resume' ? 'Resume' : 'Play'
  const accessibleSummary = `${action} ${video.title}, ${video.category}, duration ${video.duration}, ${video.reason}${showProgress ? `, ${video.progress} percent watched` : ''}, bundled local preview`

  return (
    <li>
      <SolidCard className="!p-0">
        <div className="flex min-h-24 items-stretch">
          {playable ? (
            <button
              type="button"
              aria-label={accessibleSummary}
              onClick={onActivate}
              className="focus-ring flex min-w-0 flex-1 items-center gap-3 rounded-xl p-3 text-left transition-colors hover:bg-white/[0.04] motion-reduce:transition-none"
            >
              <AbstractMedia compact label={video.title} />
              <span className="min-w-0 flex-1">
                <span className="text-xs font-semibold uppercase tracking-[0.08em] text-brand-orange">{video.category}</span>
                <span className="mt-1 block text-sm font-semibold text-paper-100">{video.title}</span>
                <span className="mt-1 block text-xs leading-4 text-paper-100/70">{video.reason} · {video.duration}</span>
                {showProgress && (
                  <span className="mt-2 block" role="progressbar" aria-label={`${video.title} watch progress`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={video.progress}>
                    <ProgressBar value={video.progress ?? 0} tone="you" />
                    <span className="mt-1 block text-xs font-medium tabular-nums text-paper-100/70">{video.progress}% watched · {action}</span>
                  </span>
                )}
              </span>
            </button>
          ) : (
            <div
              role="group"
              aria-label={`${video.title}, ${video.category}, ${video.reason}, no playback available`}
              className="flex min-w-0 flex-1 items-center gap-3 p-3"
            >
              <AbstractMedia compact label={video.title} />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-paper-100/65">{video.category}</p>
                <p className="mt-1 text-sm font-semibold text-paper-100/80">{video.title}</p>
                <p className="mt-1 text-xs leading-4 text-paper-100/70">
                  {mode === 'offline' ? 'Offline · metadata only; playback and saved progress are unavailable.' : video.reason}
                </p>
              </div>
            </div>
          )}

          {playable && onToggleSave && (
            <button
              type="button"
              aria-label={`${saved ? 'Remove saved' : 'Save'} ${video.title}`}
              aria-pressed={saved}
              onClick={onToggleSave}
              className="focus-ring m-3 ml-0 flex h-11 w-11 shrink-0 items-center justify-center self-center rounded-xl border border-white/10 text-paper-100/75 transition-colors hover:bg-white/[0.06] motion-reduce:transition-none"
            >
              {saved ? <BookmarkCheck aria-hidden="true" className="h-5 w-5 text-forest-green" /> : <Bookmark aria-hidden="true" className="h-5 w-5" />}
            </button>
          )}

          {mode === 'unavailable' && (
            <button
              type="button"
              aria-label={`Retry ${video.title}`}
              onClick={onRetry}
              className="focus-ring m-3 ml-0 flex h-11 min-w-11 shrink-0 items-center justify-center self-center rounded-xl border border-white/10 px-3 text-paper-100/75"
            >
              <RotateCw aria-hidden="true" className="h-4 w-4" />
            </button>
          )}

          {(mode === 'processing' || mode === 'offline') && (
            <button
              type="button"
              disabled
              aria-label={`${mode === 'processing' ? 'Processing' : 'Playback unavailable offline'}: ${video.title}`}
              aria-describedby={disabledReasonId}
              className="m-3 ml-0 flex h-11 min-w-11 shrink-0 items-center justify-center self-center rounded-xl border border-white/10 px-3 text-paper-100/45 disabled:opacity-40"
            >
              {mode === 'processing' ? <LoaderCircle aria-hidden="true" className="h-4 w-4 motion-reduce:animate-none" /> : <WifiOff aria-hidden="true" className="h-4 w-4" />}
            </button>
          )}
        </div>
      </SolidCard>
    </li>
  )
}

export function S81VideoLibrary() {
  const searchRef = useRef<HTMLInputElement>(null)
  const [fixture, setFixture] = useState<Fixture>('default-mobility')
  const [returnFixture, setReturnFixture] = useState<Fixture>('default-mobility')
  const [category, setCategory] = useState<Category>('Mobility')
  const [query, setQuery] = useState('')
  const [panel, setPanel] = useState<Panel>(null)
  const [status, setStatus] = useState('')
  const [dialogStatus, setDialogStatus] = useState('')
  const [signalsRevoked, setSignalsRevoked] = useState(false)
  const [watchHistoryDeleted, setWatchHistoryDeleted] = useState(false)
  const [saved, setSaved] = useState<Record<SaveableId, boolean>>({
    featured: false,
    hip: true,
    webinar: true,
    focus: false,
  })

  useEffect(() => {
    const value = new URLSearchParams(location.search).get('state')
    const next = STATES.includes(value as Fixture) ? (value as Fixture) : 'default-mobility'
    queueMicrotask(() => {
      setFixture(next)
      setReturnFixture('default-mobility')
      setCategory(fixtureCategory(next))
      setQuery(fixtureQuery(next))
      setPanel(fixturePanel(next))
      setStatus(fixtureStatus(next))
      setDialogStatus('')
      setSignalsRevoked(false)
      setWatchHistoryDeleted(false)
      setSaved({ featured: false, hip: true, webinar: true, focus: false })
    })
  }, [])

  const offline = fixture === 'offline'
  const skeleton = fixture === 'skeleton'
  const coldEmpty = fixture === 'empty'
  const libraryNavigationLocked = offline || skeleton || coldEmpty
  const libraryNavigationReasonId = offline
    ? 'video-library-offline-reason'
    : skeleton
      ? 'video-library-skeleton-reason'
      : coldEmpty
        ? 'video-library-empty-reason'
        : undefined
  const modalFixture = fixturePanel(fixture) !== null

  const openPanel = (nextPanel: Exclude<Panel, null>, nextFixture: Fixture) => {
    setReturnFixture(modalFixture ? 'default-mobility' : fixture)
    setPanel(nextPanel)
    setFixture(nextFixture)
    setDialogStatus('')
  }

  const closePanel = () => {
    setPanel(null)
    setFixture(returnFixture)
    setCategory(fixtureCategory(returnFixture))
    setDialogStatus('')
  }

  const chooseCategory = (next: Category) => {
    if (libraryNavigationLocked) return
    setCategory(next)
    setFixture(FILTER_FIXTURE[next])
    setQuery('')
    setStatus(`${next} filter selected for bundled local fixtures.`)
  }

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (libraryNavigationLocked) return
    const normalized = query.trim().toLowerCase()
    if (!normalized) {
      setFixture('default-mobility')
      setCategory('Mobility')
      setStatus('Search cleared. Showing bundled Mobility fixtures.')
      return
    }
    if (/mobility|hip|run/.test(normalized)) {
      setFixture('search-results')
      setStatus('2 bundled results for mobility. No external search was used.')
    } else {
      setFixture('search-empty')
      setStatus(`No bundled results for “${query.trim()}”. No external search was used.`)
    }
  }

  const toggleSaved = (id: SaveableId, title: string) => {
    const next = !saved[id]
    setSaved({ ...saved, [id]: next })
    setStatus(`${title} ${next ? 'saved to' : 'removed from'} this session-only local preview.`)
  }

  const retryUnavailable = () => {
    setStatus('Retry checked the bundled fixture. The source remains unavailable; no request was sent.')
  }

  const retryCachedLibrary = () => {
    setFixture('default-mobility')
    setCategory('Mobility')
    setStatus('Bundled library preview restored locally. No provider or network request was made.')
  }

  const featured = category === 'Focus' ? FOCUS_RESET : category === 'Webinars' ? WEBINAR : FEATURED
  const featuredSaved = saved[featured.id as SaveableId]
  const featuredDisabled = offline || skeleton || fixture === 'unavailable'

  const overlay = panel ? (
    <E1Modal
      label={
        panel === 'external'
          ? 'External video search confirmation'
          : panel === 'data'
            ? 'Video library data controls'
            : `${panel === 'hip' ? HIP_RESET.title : panel === 'webinar' ? WEBINAR.title : featured.title} local preview`
      }
      onClose={closePanel}
      className={OPAQUE_MODAL_CLASS}
    >
      <div className="flex min-h-11 items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-paper-100/70">
          {panel === 'data' ? 'Privacy and provenance' : panel === 'external' ? 'Confirmation only' : 'Bundled playback simulation'}
        </p>
        <button
          type="button"
          aria-label="Close dialog"
          onClick={closePanel}
          className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-paper-100/75"
        >
          <X aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>

      {(panel === 'featured' || panel === 'hip' || panel === 'webinar') && (() => {
        const video = panel === 'hip' ? HIP_RESET : panel === 'webinar' ? WEBINAR : featured
        const progress = watchHistoryDeleted ? undefined : video.progress
        return (
          <div className="mt-3 space-y-4">
            <h2 className="text-xl font-semibold text-paper-100">{video.title}</h2>
            <AbstractMedia label={`${video.title} local preview frame`} />
            <p className="text-sm leading-5 text-paper-100/75">
              This is a bundled, code-native playback simulation. No audio, video, provider, browser, storage, or watch-progress capability is invoked.
            </p>
            {typeof progress === 'number' ? (
              <div role="progressbar" aria-label={`${video.title} saved watch progress`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
                <ProgressBar value={progress} tone="you" />
                <p className="mt-2 text-sm font-medium tabular-nums text-paper-100/75">Saved fixture position · {progress}%</p>
              </div>
            ) : (
              <p className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm text-paper-100/70">
                {watchHistoryDeleted
                  ? 'Watch-history fixture is deleted locally. No saved position is shown or recreated.'
                  : 'Preview frame active. Watch progress remains unchanged because no media is playing.'}
              </p>
            )}
            <BtnSecondary className="w-full" onClick={() => {
              setStatus(
                watchHistoryDeleted
                  ? `${video.title} local preview closed. Watch-history fixture remains deleted; no saved position was recreated.`
                  : `${video.title} local preview closed. Saved watch progress is unchanged.`,
              )
              closePanel()
            }}>
              <Pause aria-hidden="true" className="mr-2 h-4 w-4" />
              Pause and close preview
            </BtnSecondary>
          </div>
        )
      })()}

      {panel === 'external' && (
        <div className="mt-3 space-y-4">
          <h2 className="text-xl font-semibold text-paper-100">Review external search</h2>
          <p className="text-sm leading-5 text-paper-100/75">
            Query: “{query.trim() || 'coaching mobility'}”. Mission context, recovery context, saved videos, and watch progress are excluded.
          </p>
          <p className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm text-paper-100/70">
            This visual prototype never opens a browser or sends the query. Continue only records a local confirmation message.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <BtnGhost onClick={closePanel}>Cancel</BtnGhost>
            <BtnSecondary onClick={() => {
              setStatus('External handoff blocked in this local preview. Nothing opened or shared.')
              closePanel()
            }}>
              Keep search local
            </BtnSecondary>
          </div>
        </div>
      )}

      {panel === 'data' && (
        <div className="mt-3 space-y-4">
          <h2 className="text-xl font-semibold text-paper-100">Video library data controls</h2>
          <p className="text-sm leading-5 text-paper-100/75">
            Review the exact bundled scope before changing this session-only preview. No account, provider, file, cache, or backend record exists here.
          </p>
          <ul className="grid gap-2" aria-label="Complete video library data controls">
            {DATA_CONTROL_LABELS.map(label => (
              <li key={label} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs leading-4 text-paper-100/75">{label}</li>
            ))}
          </ul>
          <div className="grid gap-2">
            <button
              type="button"
              onClick={() => setDialogStatus('Export summary prepared in memory only. No file was created.')}
              className="focus-ring min-h-11 rounded-xl border border-white/10 px-3 text-left text-sm text-paper-100"
            >
              Export local summary preview
            </button>
            <button
              type="button"
              aria-pressed={signalsRevoked}
              onClick={() => {
                const next = !signalsRevoked
                setSignalsRevoked(next)
                setDialogStatus(next ? 'Recommendation signals revoked for this local preview.' : 'Recommendation signals restored for this local preview.')
              }}
              className="focus-ring min-h-11 rounded-xl border border-white/10 px-3 text-left text-sm text-paper-100"
            >
              {signalsRevoked ? 'Restore recommendation signals' : 'Revoke recommendation signals'}
            </button>
            <button
              type="button"
              aria-pressed={watchHistoryDeleted}
              onClick={() => {
                const next = !watchHistoryDeleted
                setWatchHistoryDeleted(next)
                setDialogStatus(next ? 'Watch-history fixture deleted locally. Undo remains available.' : 'Watch-history fixture restored locally.')
              }}
              className="focus-ring min-h-11 rounded-xl border border-white/10 px-3 text-left text-sm text-paper-100"
            >
              {watchHistoryDeleted ? 'Undo local watch-history deletion' : 'Delete local watch-history preview'}
            </button>
            <button
              type="button"
              onClick={() => setDialogStatus('Metadata correction review opened locally. No source record changed.')}
              className="focus-ring min-h-11 rounded-xl border border-white/10 px-3 text-left text-sm text-paper-100"
            >
              Review metadata correction
            </button>
          </div>
          {dialogStatus && <p role="status" className="rounded-xl border border-forest-green/30 bg-forest-green/10 p-3 text-sm text-paper-100">{dialogStatus}</p>}
        </div>
      )}
    </E1Modal>
  ) : null

  const openPlayback = (video: VideoFixture) => {
    if (video.id === 'hip') openPanel('hip', 'hip-reset-resume')
    else if (video.id === 'webinar') openPanel('webinar', 'webinar-playing')
    else if (video.id === 'featured' || video.id === 'focus') openPanel('featured', 'featured-playing')
  }

  const row = (video: VideoFixture, mode: RowMode, reasonId?: string) => (
    <VideoRow
      key={video.id}
      video={video}
      mode={mode}
      saved={video.id in saved ? saved[video.id as SaveableId] : false}
      progressVisible={!watchHistoryDeleted}
      onActivate={() => openPlayback(video)}
      onToggleSave={video.id in saved ? () => toggleSaved(video.id as SaveableId, video.title) : undefined}
      onRetry={retryUnavailable}
      disabledReasonId={reasonId}
    />
  )

  let rows: ReactNode[] = []
  if (fixture === 'filter-focus') rows = [row(FOCUS_RESET, 'play')]
  else if (fixture === 'filter-webinars') rows = [row(WEBINAR, 'resume'), row(PROCESSING_VIDEO, 'processing')]
  else if (fixture === 'filter-saved') {
    if (saved.hip) rows.push(row(HIP_RESET, 'resume'))
    if (saved.webinar) rows.push(row(WEBINAR, 'resume'))
    if (saved.featured) rows.push(row(FEATURED, 'play'))
    if (saved.focus) rows.push(row(FOCUS_RESET, 'play'))
  } else if (fixture === 'search-results') rows = [row(HIP_RESET, 'resume'), row(FEATURED, 'play')]
  else if (fixture === 'error-cached') rows = [row(HIP_RESET, 'resume'), row(UNAVAILABLE_VIDEO, 'unavailable')]
  else if (fixture === 'offline') rows = [row(HIP_RESET, 'offline', 'video-library-offline-reason'), row(WEBINAR, 'offline', 'video-library-offline-reason')]
  else if (fixture === 'unavailable') rows = [row(UNAVAILABLE_VIDEO, 'unavailable'), row(PROCESSING_VIDEO, 'processing', 'video-library-unavailable-reason')]
  else rows = [row(HIP_RESET, 'resume'), row(WEBINAR, 'resume'), row(UNAVAILABLE_VIDEO, 'unavailable')]

  const showEmpty = fixture === 'empty' || fixture === 'search-empty' || (fixture === 'filter-saved' && rows.length === 0)
  const showFeatured = !['search-results', 'search-empty', 'empty', 'skeleton', 'error-cached', 'unavailable'].includes(fixture)

  return (
    <HifiShell
      header={
        <TopBar
          title="Video library"
          back
          right={
            <IconButton
              label="Focus video search"
              disabled={libraryNavigationLocked}
              aria-describedby={libraryNavigationReasonId}
              className="disabled:cursor-not-allowed disabled:opacity-40"
              onClick={() => {
                if (!libraryNavigationLocked) searchRef.current?.focus()
              }}
            >
              <Search aria-hidden="true" className="h-5 w-5" />
            </IconButton>
          }
        />
      }
      activeTab="today"
      atmosphere="you"
      overlay={overlay}
    >
      <main
        className="space-y-4 px-4 pb-6 pt-3"
        data-i1-state={`81-${fixture}`}
        data-asset-disposition="HIFI-81-01-code-native-abstract-honest-null"
        data-selected-category={category.toLowerCase()}
        data-hifi-81-disposition="code-native-abstract-honest-null"
        data-media-capability="local-preview-only"
        data-recommendation-signals={signalsRevoked ? 'revoked' : 'fixture-enabled'}
        data-watch-history={watchHistoryDeleted ? 'deleted-locally' : 'fixture-present'}
      >
        <I1TextScaleScope />

        <form role="search" onSubmit={submitSearch} className="space-y-2">
          <label htmlFor="video-library-search" className="sr-only">Search coaching videos</label>
          <div className="glass-pill flex h-[52px] items-center gap-2 px-3 focus-within:border-brand-orange focus-within:shadow-[var(--focus-ring)]">
            <Search aria-hidden="true" className="h-4 w-4 shrink-0 text-paper-100/65" />
            <input
              ref={searchRef}
              id="video-library-search"
              type="search"
              value={query}
              disabled={libraryNavigationLocked}
              aria-describedby={libraryNavigationReasonId}
              onChange={event => setQuery(event.target.value)}
              placeholder="Search coaching videos"
              className="h-11 min-w-0 flex-1 bg-transparent text-[16px] text-paper-100 outline-none placeholder:text-paper-100/55 disabled:opacity-40"
            />
            <button
              type="submit"
              disabled={libraryNavigationLocked}
              aria-label="Search bundled video library"
              aria-describedby={libraryNavigationReasonId}
              className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-brand-orange disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Search aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        </form>

        <section aria-label="Video categories">
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 hide-scrollbar">
            {CATEGORIES.map(item => (
              <button
                key={item}
                type="button"
                aria-pressed={category === item}
                disabled={libraryNavigationLocked}
                aria-describedby={libraryNavigationReasonId}
                onClick={() => chooseCategory(item)}
                className="focus-ring inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-white/10 px-4 text-xs font-semibold text-paper-100/75 transition-colors aria-pressed:border-brand-orange aria-pressed:bg-brand-orange/15 aria-pressed:text-paper-100 disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none"
              >
                {category === item && <Check aria-hidden="true" className="mr-1.5 h-4 w-4 text-brand-orange" />}
                {item}
              </button>
            ))}
          </div>
        </section>

        {status && (
          <p
            role={fixture === 'error-cached' ? 'alert' : 'status'}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm leading-5 text-paper-100/75"
          >
            {status}
          </p>
        )}

        {offline && (
          <p id="video-library-offline-reason" className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm leading-5 text-paper-100/75">
            <WifiOff aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            Offline fixture · cached metadata only. Playback, progress, saving, retry, and external search are disabled.
          </p>
        )}

        {skeleton && (
          <p id="video-library-skeleton-reason" className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm leading-5 text-paper-100/75">
            <LoaderCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 motion-reduce:animate-none" />
            Search, category filters, and search focus stay unavailable while the bundled library fixture is preparing.
          </p>
        )}

        {coldEmpty && (
          <p id="video-library-empty-reason" className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm leading-5 text-paper-100/75">
            <Database aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            This cold-library fixture has no bundled records to search or filter. External-search review and data controls remain local and available.
          </p>
        )}

        {fixture === 'unavailable' && (
          <p id="video-library-unavailable-reason" className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm leading-5 text-paper-100/75">
            <CircleAlert aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            Unavailable and processing rows expose status or Retry only. Neither row implies playback.
          </p>
        )}

        {fixture === 'error-cached' && (
          <button
            type="button"
            onClick={retryCachedLibrary}
            className="focus-ring flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-4 text-sm font-semibold text-paper-100"
          >
            <RotateCw aria-hidden="true" className="h-4 w-4" />
            Retry bundled library locally
          </button>
        )}

        {skeleton ? (
          <LibrarySkeleton />
        ) : showEmpty ? (
          <EmptyLibrary
            title={fixture === 'search-empty' ? 'No bundled matches' : fixture === 'filter-saved' ? 'No saved videos' : 'Your bundled library is empty'}
            body={fixture === 'search-empty' ? `No local fixture matches “${query || 'breathwork'}”. Review the external query before any handoff.` : 'No media, provider, watch-progress, or saved-state claim is available in this fixture.'}
            onExternal={() => openPanel('external', 'external-confirm')}
          />
        ) : (
          <>
            {showFeatured && (
              <section aria-label="Featured bundled video">
                <GlassCard tone="cia" className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-paper-100/75">CIA pick</p>
                    <Provenance items={[signalsRevoked ? 'Curated default · signals off' : 'Bundled mission fixture']} />
                  </div>
                  <AbstractMedia label={featured.title} />
                  <div>
                    <h2 className="text-lg font-semibold text-paper-100">{featured.title}</h2>
                    <p className="mt-1 text-sm leading-5 text-paper-100/70">
                      {signalsRevoked ? 'Curated by category only; no recommendation signal is used.' : featured.reason}
                    </p>
                  </div>
                  <div className="grid grid-cols-[1fr_auto] gap-2">
                    <BtnPrimary
                      disabled={featuredDisabled}
                      aria-describedby={offline ? 'video-library-offline-reason' : fixture === 'unavailable' ? 'video-library-unavailable-reason' : undefined}
                      aria-label={`Play ${featured.title} local preview`}
                      onClick={() => openPlayback(featured)}
                    >
                      <Play aria-hidden="true" className="mr-2 h-4 w-4" />
                      Play local preview
                    </BtnPrimary>
                    <button
                      type="button"
                      aria-label={`${featuredSaved ? 'Remove saved' : 'Save'} ${featured.title}`}
                      aria-pressed={featuredSaved}
                      disabled={featuredDisabled}
                      onClick={() => toggleSaved(featured.id as SaveableId, featured.title)}
                      className="focus-ring flex h-[52px] min-w-[52px] items-center justify-center rounded-xl border border-white/10 text-paper-100/75 disabled:opacity-40"
                    >
                      {featuredSaved ? <BookmarkCheck aria-hidden="true" className="h-5 w-5 text-forest-green" /> : <Bookmark aria-hidden="true" className="h-5 w-5" />}
                    </button>
                  </div>
                  {featuredDisabled && <p className="text-xs leading-4 text-paper-100/70">Featured playback and saving are unavailable in this state.</p>}
                </GlassCard>
              </section>
            )}

            <section aria-labelledby="next-best-videos-title" className="space-y-3">
              <div className="flex min-h-11 items-center justify-between gap-3">
                <h2 id="next-best-videos-title" className="text-xs font-semibold uppercase tracking-[0.1em] text-paper-100/75">
                  {fixture === 'search-results' ? 'Search results' : category === 'Saved' ? 'Saved videos' : 'Next best videos'}
                </h2>
                <button
                  type="button"
                  onClick={() => setStatus(`${rows.length} bundled ${rows.length === 1 ? 'video is' : 'videos are'} already shown.`)}
                  className="focus-ring min-h-11 rounded-lg px-3 text-xs font-semibold text-brand-orange"
                >
                  See all
                </button>
              </div>
              <ul className="space-y-3" aria-label={`${category} bundled videos`}>
                {rows}
              </ul>
            </section>
          </>
        )}

        {!skeleton && (
          <CIAInsightCard
            eyebrow="Recommendation logic"
            provenance={['Bundled local fixtures', 'No provider playback']}
          >
            {signalsRevoked
              ? 'CIA recommendation signals are off. The library uses category-only bundled fixtures.'
              : 'CIA uses bundled mission and recovery fixtures to explain this local recommendation preview.'}
          </CIAInsightCard>
        )}

        <section
          aria-label="HIFI-81-01 media disposition"
          className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
        >
          <div className="flex items-start gap-2">
            <ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-forest-green" />
            <p className="text-xs leading-4 text-paper-100/75">
              HIFI-81-01 · code-native abstract media · bundled locally. No person, provider mark, private text, generated brand asset, or external media is used.
            </p>
          </div>
        </section>

        <section className="space-y-2" aria-label="External search and data controls">
          <BtnSecondary
            className="w-full"
            disabled={offline || skeleton}
            aria-describedby={offline ? 'video-library-offline-reason' : 'external-search-disclosure'}
            onClick={() => openPanel('external', 'external-confirm')}
          >
            <ExternalLink aria-hidden="true" className="mr-2 h-4 w-4" />
            Review external video search
          </BtnSecondary>
          <p id="external-search-disclosure" className="text-center text-xs leading-4 text-paper-100/70">
            Confirmation only. This prototype does not open a browser, share a query, or start playback.
          </p>
          <BtnGhost className="w-full" onClick={() => openPanel('data', 'data-controls')}>
            <ShieldCheck aria-hidden="true" className="mr-2 h-4 w-4" />
            Review video-library data controls
          </BtnGhost>
        </section>
      </main>
    </HifiShell>
  )
}
