'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  Flag,
  ImageOff,
  LoaderCircle,
  LockKeyhole,
  PanelsTopLeft,
  Share2,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  TriangleAlert,
  WifiOff,
  X,
} from 'lucide-react'
import { HifiShell } from '@/components/hifi/kit'
import { E1Modal } from '../intelligence/E1Modal'
import { I1TextScaleScope } from './I1TextScaleScope'

const STATES = [
  'default',
  'comparison',
  'thumbnail-loading',
  'highres-loading',
  'single-image',
  'empty',
  'load-error',
  'decrypt-error',
  'offline',
  'share-warning',
  'share-success',
  'data-controls',
  'delete-confirm',
  'report-confirm',
  'disabled-consent',
] as const

type Fixture = (typeof STATES)[number]

const MODAL_STATES: readonly Fixture[] = [
  'share-warning',
  'data-controls',
  'delete-confirm',
  'report-confirm',
]

const PHOTO_DATA_CONTROLS = [
  'Category',
  'Source',
  'Scope',
  'Audience',
  'Freshness',
  'Confidence',
  'Retention',
  'Export',
  'Revoke',
  'Delete',
  'Correction',
] as const

const FOCUS_CLASS =
  'focus-ring rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900'
const PRIMARY_CLASS = `${FOCUS_CLASS} min-h-11 bg-cta-ember px-4 text-[14px] font-semibold text-paper-100 transition-transform active:scale-[0.98] motion-reduce:transition-none`
const SECONDARY_CLASS = `${FOCUS_CLASS} min-h-11 border border-white/15 bg-white/[0.06] px-4 text-[14px] font-semibold text-paper-100/85 transition-colors hover:bg-white/[0.1] motion-reduce:transition-none`
const MODAL_CLASS =
  '!bg-ink-900 border border-white/15 shadow-2xl outline-none focus-visible:ring-2 focus-visible:ring-brand-orange'

function queryFixture(): Fixture {
  const value = new URLSearchParams(location.search).get('state')
  return STATES.includes(value as Fixture) ? (value as Fixture) : 'default'
}

function baseFixture(fixture: Fixture): Fixture {
  if (MODAL_STATES.includes(fixture) || fixture === 'share-success') return 'default'
  return fixture
}

function PrivacySafeMedia({
  fixture,
  divider,
  onDividerChange,
}: {
  fixture: Fixture
  divider: number
  onDividerChange: (value: number) => void
}) {
  const loadingThumbnail = fixture === 'thumbnail-loading'
  const loadingHighResolution = fixture === 'highres-loading'
  const offline = fixture === 'offline'
  const comparison = fixture === 'comparison'

  if (fixture === 'empty') {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 px-8 text-center" role="status">
        <ImageOff className="h-8 w-8 text-paper-100/55" aria-hidden="true" />
        <h2 className="text-[20px] font-semibold text-paper-100">No photo available</h2>
        <p className="text-[14px] leading-5 text-paper-100/70">
          Return to Progress Photos or restore the bundled preview fixture.
        </p>
      </div>
    )
  }

  if (fixture === 'load-error') {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 px-8 text-center" role="alert">
        <TriangleAlert className="h-8 w-8 text-paper-100/70" aria-hidden="true" />
        <h2 className="text-[20px] font-semibold text-paper-100">Photo could not load</h2>
        <p className="text-[14px] leading-5 text-paper-100/70">
          The bundled preview is intact. Retry only restarts this local loading state.
        </p>
      </div>
    )
  }

  if (fixture === 'decrypt-error') {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 px-8 text-center" role="alert">
        <LockKeyhole className="h-8 w-8 text-paper-100/70" aria-hidden="true" />
        <h2 className="text-[20px] font-semibold text-paper-100">Photo cannot be decrypted</h2>
        <p className="text-[14px] leading-5 text-paper-100/70">
          Retry is unavailable. Review the source and consent details without exposing the photo.
        </p>
      </div>
    )
  }

  if (fixture === 'disabled-consent') {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 px-8 text-center" role="status">
        <ShieldAlert className="h-8 w-8 text-paper-100/70" aria-hidden="true" />
        <h2 className="text-[20px] font-semibold text-paper-100">Photo access is paused</h2>
        <p className="text-[14px] leading-5 text-paper-100/70">
          Consent is off for this local fixture. Media and sharing actions stay disabled.
        </p>
      </div>
    )
  }

  return (
    <div
      className="relative h-full overflow-hidden rounded-[28px] border border-white/15 bg-ink-brown-800 shadow-2xl"
      aria-busy={loadingThumbnail || loadingHighResolution || undefined}
      data-asset-disposition="HIFI-67-01-code-native-no-raster"
    >
      <div
        className="absolute inset-0"
        role="img"
        aria-label={
          comparison
            ? `Privacy-safe code-native comparison preview, divider at ${divider} percent`
            : offline
              ? 'Privacy-safe code-native thumbnail preview, high resolution unavailable offline'
              : loadingThumbnail
                ? 'Neutral canvas while the bundled thumbnail loads'
                : loadingHighResolution
                  ? 'Privacy-safe thumbnail while high resolution loads'
                  : 'Privacy-safe code-native abstract stand-in for a progress photo'
        }
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_36%_24%,var(--glow-orange-bg),transparent_38%),linear-gradient(145deg,var(--color-ink-brown-800),var(--color-ink-900)_72%)]" />
        <div className="absolute left-[18%] top-[14%] h-[34%] w-[38%] rounded-[45%_55%_48%_52%] border border-white/10 bg-white/[0.05]" />
        <div className="absolute bottom-[12%] right-[12%] h-[42%] w-[58%] rounded-[52%_48%_40%_60%] border border-brand-orange/25 bg-brand-orange/[0.07]" />
        <div className="absolute bottom-[23%] left-[24%] h-[28%] w-[18%] rotate-12 rounded-full bg-paper-100/[0.04]" />

        {comparison && (
          <>
            <div
              className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_68%_30%,var(--glow-orange-bg),transparent_40%),linear-gradient(135deg,var(--color-ink-brown-800),var(--color-ink-900))]"
              style={{ clipPath: `inset(0 ${100 - divider}% 0 0)` }}
              aria-hidden="true"
            />
            <div className="absolute inset-y-0 w-0.5 bg-paper-100/85" style={{ left: `${divider}%` }} aria-hidden="true" />
          </>
        )}
      </div>

      {comparison && (
        <>
          <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-ink-900/80 px-3 py-1.5 text-[12px] text-paper-100/80">
            Jun 18
          </span>
          <span className="absolute right-3 top-3 rounded-full border border-white/15 bg-ink-900/80 px-3 py-1.5 text-[12px] text-paper-100/80">
            Oct 24
          </span>
          <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/15 bg-ink-900/90 p-2.5 backdrop-blur-md">
            <label htmlFor="comparison-divider" className="block text-[12px] font-semibold text-paper-100/80">
              Comparison divider · {divider}%
            </label>
            <input
              id="comparison-divider"
              type="range"
              min="0"
              max="100"
              value={divider}
              onChange={event => onDividerChange(Number(event.currentTarget.value))}
              className="focus-ring h-11 w-full accent-brand-orange outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
            />
            <div className="grid grid-cols-3 gap-2">
              <button type="button" className={`${FOCUS_CLASS} min-h-11 border border-white/15 text-[12px] text-paper-100/80`} onClick={() => onDividerChange(100)}>
                Earlier only
              </button>
              <button type="button" className={`${FOCUS_CLASS} min-h-11 border border-white/15 text-[12px] text-paper-100/80`} onClick={() => onDividerChange(50)}>
                Split view
              </button>
              <button type="button" className={`${FOCUS_CLASS} min-h-11 border border-white/15 text-[12px] text-paper-100/80`} onClick={() => onDividerChange(0)}>
                Later only
              </button>
            </div>
          </div>
        </>
      )}

      {loadingThumbnail && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink-900/70" role="status">
          <LoaderCircle className="h-8 w-8 text-paper-100/70 motion-safe:animate-spin" aria-hidden="true" />
          <p className="text-[14px] font-medium text-paper-100">Loading thumbnail</p>
          <p className="text-[12px] text-paper-100/70">No photo detail is shown yet</p>
        </div>
      )}

      {loadingHighResolution && (
        <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-ink-900/90 p-3" role="status">
          <p className="text-[14px] font-medium text-paper-100">Loading high-resolution photo</p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
            <div className="h-full w-2/3 rounded-full bg-brand-orange" />
          </div>
          <p className="mt-2 text-[12px] text-paper-100/70">Privacy-safe thumbnail remains visible</p>
        </div>
      )}

      {offline && (
        <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl border border-white/15 bg-ink-900/90 p-3" role="status">
          <WifiOff className="h-5 w-5 shrink-0 text-paper-100/70" aria-hidden="true" />
          <div>
            <p className="text-[14px] font-medium text-paper-100">Offline · thumbnail only</p>
            <p className="text-[12px] text-paper-100/70">High resolution and sharing stay unavailable</p>
          </div>
        </div>
      )}
    </div>
  )
}

function DataControlGrid({ onAction }: { onAction: (control: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-2" role="group" aria-label="Photo data controls">
      {PHOTO_DATA_CONTROLS.map(control => (
        <button key={control} type="button" className={`${SECONDARY_CLASS} text-left`} onClick={() => onAction(control)}>
          {control}
        </button>
      ))}
    </div>
  )
}

export function S67ImageViewer() {
  const [fixture, setFixture] = useState<Fixture>('default')
  const [galleryIndex, setGalleryIndex] = useState(2)
  const [divider, setDivider] = useState(50)
  const [status, setStatus] = useState('')
  const [announcement, setAnnouncement] = useState('')
  const [controlStatus, setControlStatus] = useState('')
  const [returnFixture, setReturnFixture] = useState<Fixture>('default')
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const next = queryFixture()
    const frame = requestAnimationFrame(() => {
      setFixture(next)
      setReturnFixture(baseFixture(next))
      setGalleryIndex(next === 'single-image' ? 1 : 2)
      setDivider(50)
      setStatus(next === 'share-success' ? 'Share preview completed locally. No operating-system sheet opened.' : '')
      setControlStatus('')
      setAnnouncement(
        next === 'single-image'
          ? 'Progress Photos. Single privacy-safe preview. Encrypted locally. Pinch is optional; labeled controls are available.'
          : 'Progress Photos. Photo 2 of 7. Encrypted locally. Use Previous and Next; pinch is optional and labeled controls are available.',
      )
      if (!MODAL_STATES.includes(next)) closeButtonRef.current?.focus({ preventScroll: true })
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  const contentFixture = MODAL_STATES.includes(fixture) ? returnFixture : baseFixture(fixture)
  const galleryTotal = contentFixture === 'single-image' ? 1 : 7
  const loading = contentFixture === 'thumbnail-loading' || contentFixture === 'highres-loading'
  const loaded = contentFixture === 'default' || contentFixture === 'comparison' || contentFixture === 'single-image'
  const consentBlocked = contentFixture === 'disabled-consent'
  const canShareOrSave = loaded && !consentBlocked
  const canManage = !loading && contentFixture !== 'empty' && !consentBlocked
  const actionReason = consentBlocked
    ? 'Consent is off for this local fixture.'
    : contentFixture === 'single-image'
      ? 'Single image loaded. Comparison needs at least two photos.'
    : contentFixture === 'offline'
      ? 'High resolution is unavailable while offline.'
      : loading
        ? 'Wait for the high-resolution local fixture to load.'
        : contentFixture === 'empty'
          ? 'No image payload is available.'
          : contentFixture === 'load-error' || contentFixture === 'decrypt-error'
            ? 'The image is unavailable.'
            : ''

  const announcePosition = (nextIndex: number) => {
    setGalleryIndex(nextIndex)
    setAnnouncement(`Progress Photos. Photo ${nextIndex} of ${galleryTotal}. Encrypted local preview.`)
  }

  const openModal = (next: Fixture) => {
    setReturnFixture(contentFixture)
    setControlStatus('')
    setFixture(next)
  }

  const closeModal = () => setFixture(returnFixture)

  const overlay = MODAL_STATES.includes(fixture) ? (
    <E1Modal
      label={
        fixture === 'share-warning'
          ? 'Share warning'
          : fixture === 'data-controls'
            ? 'Photo data controls'
            : fixture === 'delete-confirm'
              ? 'Delete preview confirmation'
              : 'Report preview confirmation'
      }
      onClose={closeModal}
      className={MODAL_CLASS}
    >
      <div className="space-y-4 motion-reduce:[&_*]:!transition-none">
        <button type="button" className={SECONDARY_CLASS} onClick={closeModal}>
          Close
        </button>

        {fixture === 'share-warning' && (
          <>
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-paper-100/70" aria-hidden="true" />
              <div>
                <h2 className="text-[22px] font-semibold text-paper-100">Share outside Balencia</h2>
                <p className="mt-2 text-[14px] leading-5 text-paper-100/75">
                  A real share would leave encrypted storage and may become unencrypted. This visual prototype will not open an operating-system share sheet.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" className={SECONDARY_CLASS} onClick={closeModal}>Cancel</button>
              <button
                type="button"
                className={PRIMARY_CLASS}
                onClick={() => {
                  setFixture('share-success')
                  setStatus('Share preview completed locally. No operating-system sheet opened.')
                  setAnnouncement('Local share preview complete. Nothing was shared.')
                }}
              >
                Preview locally
              </button>
            </div>
          </>
        )}

        {fixture === 'data-controls' && (
          <>
            <div>
              <h2 className="text-[22px] font-semibold text-paper-100">Photo data controls</h2>
              <p className="mt-2 text-[14px] leading-5 text-paper-100/75">
                Category · Progress photo. Source · bundled local fixture. Audience · only you. Freshness · Oct 24, 2025 fixture. Confidence · exact fixture metadata.
              </p>
            </div>
            <DataControlGrid onAction={control => setControlStatus(`${control} is a local preview. No file, consent, or account data changed.`)} />
            <p className="min-h-11 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-[12px] leading-4 text-paper-100/75" role="status" aria-live="polite">
              {controlStatus || 'Choose a control to preview its scoped, reversible explanation.'}
            </p>
          </>
        )}

        {fixture === 'delete-confirm' && (
          <>
            <div>
              <h2 className="text-[22px] font-semibold text-paper-100">Remove this local fixture?</h2>
              <p className="mt-2 text-[14px] leading-5 text-paper-100/75">
                No real photo or account data will be deleted. You can restore the bundled fixture from the resulting empty state.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" className={SECONDARY_CLASS} onClick={closeModal}>Keep preview</button>
              <button
                type="button"
                className={PRIMARY_CLASS}
                onClick={() => {
                  setFixture('empty')
                  setStatus('Bundled photo removed from this local preview. No data was deleted.')
                  setAnnouncement('Local fixture removed. No real photo was deleted.')
                }}
              >
                Remove locally
              </button>
            </div>
          </>
        )}

        {fixture === 'report-confirm' && (
          <>
            <div>
              <h2 className="text-[22px] font-semibold text-paper-100">Preview a report?</h2>
              <p className="mt-2 text-[14px] leading-5 text-paper-100/75">
                This records only a reversible on-screen outcome. No moderation report, network request, or message will be sent.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" className={SECONDARY_CLASS} onClick={closeModal}>Cancel</button>
              <button
                type="button"
                className={PRIMARY_CLASS}
                onClick={() => {
                  setFixture(returnFixture)
                  setStatus('Report noted in the local preview. Nothing was sent.')
                  setAnnouncement('Local report preview complete. Nothing was sent.')
                }}
              >
                Preview report
              </button>
            </div>
          </>
        )}
      </div>
    </E1Modal>
  ) : null

  const bottomAction = (
    <div className="glass-card space-y-2.5 rounded-[24px] border border-white/10 p-3">
      {galleryTotal > 1 && loaded ? (
        <div className="flex min-h-11 items-center justify-between gap-2" role="group" aria-label="Gallery navigation">
          <button
            type="button"
            aria-label="Previous photo"
            className={`${FOCUS_CLASS} flex h-11 w-11 shrink-0 items-center justify-center text-paper-100/80 disabled:opacity-40`}
            disabled={galleryIndex <= 1}
            onClick={() => announcePosition(Math.max(1, galleryIndex - 1))}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="min-w-0 text-center">
            <p className="text-[14px] font-semibold tabular-nums text-paper-100">Photo {galleryIndex} of {galleryTotal}</p>
            <p className="text-[12px] text-paper-100/70">Pagination stays above actions</p>
          </div>
          <button
            type="button"
            aria-label="Next photo"
            className={`${FOCUS_CLASS} flex h-11 w-11 shrink-0 items-center justify-center text-paper-100/80 disabled:opacity-40`}
            disabled={galleryIndex >= galleryTotal}
            onClick={() => announcePosition(Math.min(galleryTotal, galleryIndex + 1))}
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      ) : (
        <div className="flex min-h-11 items-center justify-between gap-3 rounded-xl border border-white/10 px-3">
          <p className="text-[12px] text-paper-100/75">
            {galleryTotal === 1 ? 'Single-image viewer · pagination hidden' : 'Gallery navigation unavailable in this state'}
          </p>
          {contentFixture === 'comparison' && (
            <button type="button" className={`${SECONDARY_CLASS} shrink-0`} onClick={() => setFixture('default')}>Done</button>
          )}
        </div>
      )}

      <div className="grid grid-cols-5 gap-2">
        <button
          type="button"
          className={`${FOCUS_CLASS} flex min-h-[56px] flex-col items-center justify-center gap-1 border border-white/10 bg-white/[0.04] text-[12px] text-paper-100/85 disabled:opacity-40`}
          disabled={!canShareOrSave}
          aria-describedby={!canShareOrSave ? 's67-action-reason' : undefined}
          onClick={() => setStatus('Download is blocked in this visual preview. No file was written.')}
        >
          <Download className="h-5 w-5" aria-hidden="true" />
          Save
        </button>
        <button
          type="button"
          className={`${FOCUS_CLASS} flex min-h-[56px] flex-col items-center justify-center gap-1 border border-white/10 bg-white/[0.04] text-[12px] text-paper-100/85 disabled:opacity-40`}
          disabled={!canShareOrSave}
          aria-describedby={!canShareOrSave ? 's67-action-reason' : undefined}
          onClick={() => openModal('share-warning')}
        >
          <Share2 className="h-5 w-5" aria-hidden="true" />
          Share
        </button>
        <button
          type="button"
          className={`${FOCUS_CLASS} flex min-h-[56px] flex-col items-center justify-center gap-1 border border-white/10 bg-white/[0.04] text-[12px] text-paper-100/85 disabled:opacity-40`}
          disabled={!canManage}
          aria-describedby={!canManage ? 's67-action-reason' : undefined}
          onClick={() => openModal('delete-confirm')}
        >
          <Trash2 className="h-5 w-5" aria-hidden="true" />
          Delete
        </button>
        <button
          type="button"
          className={`${FOCUS_CLASS} flex min-h-[56px] flex-col items-center justify-center gap-1 border border-white/10 bg-white/[0.04] text-[12px] text-paper-100/85 disabled:opacity-40`}
          disabled={!canManage}
          aria-describedby={!canManage ? 's67-action-reason' : undefined}
          onClick={() => openModal('report-confirm')}
        >
          <Flag className="h-5 w-5" aria-hidden="true" />
          Report
        </button>
        <button
          type="button"
          className={`${FOCUS_CLASS} flex min-h-[56px] flex-col items-center justify-center gap-1 border border-white/10 bg-white/[0.04] text-[11px] text-paper-100/85 disabled:opacity-40`}
          disabled={contentFixture !== 'default' && contentFixture !== 'comparison'}
          aria-describedby={contentFixture !== 'default' && contentFixture !== 'comparison' ? 's67-action-reason' : undefined}
          onClick={() => {
            const next = contentFixture === 'comparison' ? 'default' : 'comparison'
            setFixture(next)
            setAnnouncement(next === 'comparison' ? 'Comparison opened. Earlier photo is on the left and later photo is on the right.' : 'Comparison closed. Standard viewer restored.')
          }}
        >
          {contentFixture === 'comparison' ? <Check className="h-5 w-5" aria-hidden="true" /> : <PanelsTopLeft className="h-5 w-5" aria-hidden="true" />}
          {contentFixture === 'comparison' ? 'Done' : 'Compare'}
        </button>
      </div>

      <div className="flex min-h-11 items-center justify-between gap-3 border-t border-white/10 pt-2">
        <p id="s67-action-reason" className="text-[12px] leading-4 text-paper-100/70">
          {actionReason || 'Encrypted local fixture · outside sharing would be unencrypted'}
        </p>
        <button type="button" className={`${FOCUS_CLASS} min-h-11 shrink-0 px-3 text-[12px] font-semibold text-brand-orange`} onClick={() => openModal('data-controls')}>
          Data controls
        </button>
      </div>
    </div>
  )

  return (
    <HifiShell showTabBar={false} atmosphere="you" bottomAction={bottomAction} overlay={overlay}>
      <main
        className="relative flex min-h-full flex-col overflow-hidden bg-ink-900 px-4 pb-3 text-paper-100"
        data-i1-state={`67-${fixture}`}
        data-asset-disposition="HIFI-67-01-code-native-no-raster"
        aria-busy={loading || undefined}
      >
        <I1TextScaleScope />
        <p className="sr-only" role="status" aria-live="polite">{announcement}</p>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_-10%,var(--glow-orange-bg),transparent_60%)]" aria-hidden="true" />

        <header className="relative z-10 flex min-h-[60px] items-center justify-between gap-3">
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close viewer preview"
            className={`${FOCUS_CLASS} flex h-11 w-11 items-center justify-center border border-white/10 bg-white/[0.06]`}
            onClick={() => {
              setStatus('Close acknowledged locally. The review route stays open and no navigation occurred.')
              setAnnouncement('Close viewer preview acknowledged. No navigation occurred.')
            }}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="min-w-0 text-center">
            <p className="text-[14px] font-semibold tabular-nums text-paper-100">
              {galleryTotal === 1 ? 'Single photo' : `${galleryIndex} of ${galleryTotal}`}
            </p>
            <p className="mt-0.5 inline-flex items-center gap-1.5 text-[12px] text-paper-100/75">
              <ShieldCheck className="h-4 w-4 text-paper-100/70" aria-hidden="true" />
              Progress Photos · encrypted
            </p>
          </div>

          <button
            type="button"
            aria-label="Share photo preview"
            className={`${FOCUS_CLASS} flex h-11 w-11 items-center justify-center border border-white/10 bg-white/[0.06] disabled:opacity-40`}
            disabled={!canShareOrSave}
            aria-describedby={!canShareOrSave ? 's67-action-reason' : undefined}
            onClick={() => openModal('share-warning')}
          >
            <Share2 className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        <section className="relative z-10 min-h-0 flex-1" aria-label="Image viewer canvas">
          <div className="absolute inset-x-0 bottom-2 top-0">
            <PrivacySafeMedia fixture={contentFixture} divider={divider} onDividerChange={value => {
              setDivider(value)
              setAnnouncement(`Comparison divider at ${value} percent. Earlier photo is on the left and later photo is on the right.`)
            }} />
          </div>
        </section>

        {contentFixture === 'load-error' && (
          <button
            type="button"
            className={`${PRIMARY_CLASS} relative z-10 mx-auto mb-2 w-full max-w-[260px]`}
            onClick={() => {
              setFixture('highres-loading')
              setStatus('High-resolution retry started locally.')
              setAnnouncement('High-resolution local retry started.')
            }}
          >
            Retry local load
          </button>
        )}

        {contentFixture === 'thumbnail-loading' && (
          <button
            type="button"
            className={`${SECONDARY_CLASS} relative z-10 mx-auto mb-2 w-full max-w-[260px]`}
            onClick={() => {
              setFixture('highres-loading')
              setStatus('Bundled thumbnail ready. High-resolution local loading started.')
              setAnnouncement('Bundled thumbnail ready. High-resolution local loading started.')
            }}
          >
            Continue local load
          </button>
        )}

        {contentFixture === 'highres-loading' && (
          <button
            type="button"
            className={`${SECONDARY_CLASS} relative z-10 mx-auto mb-2 w-full max-w-[260px]`}
            onClick={() => {
              setFixture('default')
              setStatus('High-resolution bundled fixture loaded locally.')
              setAnnouncement('High-resolution bundled fixture loaded. Photo 2 of 7.')
            }}
          >
            Complete local load
          </button>
        )}

        {contentFixture === 'offline' && (
          <button
            type="button"
            className={`${SECONDARY_CLASS} relative z-10 mx-auto mb-2 w-full max-w-[260px]`}
            onClick={() => {
              setFixture('default')
              setStatus('Online bundled fixture restored locally. No network was used.')
              setAnnouncement('Online bundled fixture restored locally. No network was used.')
            }}
          >
            Restore online preview
          </button>
        )}

        {contentFixture === 'decrypt-error' && (
          <button type="button" className={`${SECONDARY_CLASS} relative z-10 mx-auto mb-2 w-full max-w-[260px]`} onClick={() => openModal('data-controls')}>
            Review source details
          </button>
        )}

        {contentFixture === 'disabled-consent' && (
          <button type="button" className={`${SECONDARY_CLASS} relative z-10 mx-auto mb-2 w-full max-w-[260px]`} onClick={() => openModal('data-controls')}>
            Review consent controls
          </button>
        )}

        {contentFixture === 'empty' && (
          <button
            type="button"
            className={`${SECONDARY_CLASS} relative z-10 mx-auto mb-2 w-full max-w-[260px]`}
            onClick={() => {
              setFixture('default')
              setStatus('Bundled privacy-safe fixture restored locally.')
              setAnnouncement('Bundled privacy-safe fixture restored. Photo 2 of 7.')
            }}
          >
            Restore local fixture
          </button>
        )}

        {status && (
          <div className="relative z-10 mb-2 flex min-h-11 items-center justify-between gap-2 rounded-xl border border-white/15 bg-ink-900/95 px-3 py-2" role="status" aria-live="polite">
            <span className="text-[12px] leading-4 text-paper-100/80">{status}</span>
            <button
              type="button"
              aria-label="Dismiss status"
              className={`${FOCUS_CLASS} flex h-11 w-11 shrink-0 items-center justify-center`}
              onClick={() => {
                setStatus('')
                if (fixture === 'share-success') setFixture('default')
              }}
            >
              {fixture === 'share-success' ? <Check className="h-5 w-5 text-forest-green" aria-hidden="true" /> : <X className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        )}
      </main>
    </HifiShell>
  )
}
