import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const USAGE = 'Usage: node scripts/verify-b1-cia.mjs <baseURL> <out-json> <shots-dir>'
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(USAGE)
  process.exit(0)
}

const [baseURLArg, outPathArg, shotsDirArg] = process.argv.slice(2)
if (!baseURLArg || !outPathArg || !shotsDirArg) {
  console.error(USAGE)
  process.exit(2)
}

const baseURL = baseURLArg
const outPath = path.resolve(outPathArg)
const shotsDir = path.resolve(shotsDirArg)
const baseOrigin = new URL(baseURL).origin
const chromePath = process.env.PLAYWRIGHT_CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const HILL_ASSET_PATH = 'public/hifi-assets/HIFI-75-01-hill-segment.png'
const HILL_ASSET_SHA256 = '2e3f7674fe6100ec75ee77a02e9beff87c55870af8c6e44462625311f7590b39'

const PRODUCT_FILES = [
  'src/components/hifi/screens/cia/S09CiaChat.tsx',
  'src/components/hifi/screens/cia/S10CiaVoiceInChat.tsx',
  'src/components/hifi/screens/cia/S11CiaVoiceFullScreen.tsx',
  'src/components/hifi/screens/cia/S51VoiceCallHistory.tsx',
  'src/components/hifi/screens/cia/S74ConversationsHub.tsx',
  'src/components/hifi/screens/cia/S75DirectChat.tsx',
  'src/components/hifi/screens/cia/S76GroupChat.tsx',
  'src/components/hifi/screens/cia/S77MessageActions.tsx',
  'src/components/hifi/screens/cia/S79CallSummary.tsx',
  'src/components/hifi/screens/cia/S99WhatsappInbox.tsx',
  'src/components/hifi/screens/cia/index.ts',
  'src/components/hifi/screens/social/S40CommunityRooms.tsx',
  HILL_ASSET_PATH,
]

const API_FILES = [
  'src/app/globals.css',
  'src/components/hifi/HifiPrototype.tsx',
  'src/components/hifi/kit/HifiShell.tsx',
  'src/components/hifi/kit/back-control.tsx',
  'src/components/hifi/kit/buttons.tsx',
  'src/components/hifi/kit/chips.tsx',
  'src/components/hifi/kit/chrome.tsx',
  'src/components/hifi/kit/cia-composer.tsx',
  'src/components/hifi/kit/cia-orb.tsx',
  'src/components/hifi/kit/cia.tsx',
  'src/components/hifi/kit/data.tsx',
  'src/components/hifi/kit/glass-pill-input.tsx',
  'src/components/hifi/kit/prototype-action-sheet.tsx',
  'src/components/hifi/kit/signature-icons.tsx',
  'src/components/hifi/kit/surfaces.tsx',
  'src/components/hifi/kit/system.tsx',
  'src/components/hifi/screens/registry.ts',
  'src/components/layout/PhoneFrame.tsx',
  'src/components/layout/ScreenShell.tsx',
  'src/data/hifi/persona.ts',
  'src/data/screens.ts',
  'src/app/screens/[id]/page.tsx',
  'scripts/verify-b1-cia.mjs',
]

const AUTHORITY_FILES = [
  '../Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/audit/B1-cia-chat-voice.md',
  '../Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/DECISIONS.md',
  '../Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/REFERENCE-DIRECTION.md',
  '../Balencia-New-Screens/canon/COMPACT-CANON.md',
  '../Balencia-New-Screens/canon/COMPONENT-CATALOG.md',
  '../Balencia-New-Screens/hifi-screens/09-cia-chat.md',
  '../Balencia-New-Screens/hifi-screens/10-cia-voice-in-chat.md',
  '../Balencia-New-Screens/hifi-screens/11-cia-voice-full-screen.md',
  '../Balencia-New-Screens/hifi-screens/51-voice-call-history.md',
  '../Balencia-New-Screens/hifi-screens/74-conversations-hub.md',
  '../Balencia-New-Screens/hifi-screens/75-direct-chat.md',
  '../Balencia-New-Screens/hifi-screens/76-group-chat.md',
  '../Balencia-New-Screens/hifi-screens/77-message-actions.md',
  '../Balencia-New-Screens/hifi-screens/79-call-summary.md',
  '../Balencia-New-Screens/hifi-screens/99-whatsapp-inbox.md',
  '../plans/batches/VISUAL-006-B1-cia-chat-voice/BATCH.md',
  '../plans/batches/VISUAL-006-B1-cia-chat-voice/VERIFICATION-MATRIX.md',
  '../plans/batches/VISUAL-006-B1-cia-chat-voice/workers/builder-a.md',
  '../plans/batches/VISUAL-006-B1-cia-chat-voice/workers/builder-b.md',
  '../plans/batches/VISUAL-006-B1-cia-chat-voice/workers/verifier.md',
]

const SCREEN_CONTRACTS = {
  '09': { root: 'data-chat-state', states: ['default', 'skeleton', 'empty', 'error', 'success', 'disabled', 'offline', 'thinking'] },
  '10': { root: 'data-voice-state', states: ['consent-required', 'ready', 'booting', 'listening', 'low-confidence', 'silence', 'permission-denied', 'transcription-error', 'network-error', 'max-duration', 'success', 'disabled', 'offline'] },
  '51': { root: 'data-voice-history-state', states: ['default', 'action-items', 'skeleton', 'empty', 'error', 'success', 'disabled', 'offline', 'schedule', 'detail', 'delete-confirmation', 'safety'] },
  '74': { root: 'data-conversations-state', states: ['default', 'skeleton', 'empty', 'error', 'success', 'disabled', 'offline', 'search', 'compose', 'manage', 'safety'] },
  '75': { root: 'data-direct-chat-state', states: ['default', 'skeleton', 'empty', 'error', 'offline', 'blocked', 'assist-revoked'] },
  '76': { root: 'data-group-chat-state', states: ['default', 'skeleton', 'empty', 'error', 'offline', 'disabled', 'success'] },
  '77': { root: 'data-message-actions-state', states: ['default', 'skeleton', 'empty', 'error', 'offline', 'disabled', 'success'] },
  '79': { root: 'data-call-summary-state', states: ['default', 'skeleton', 'partial', 'error', 'offline', 'success'] },
  '99': { root: 'data-whatsapp-state', states: ['default', 'skeleton', 'empty', 'error', 'offline', 'paused', 'revoked', 'outside-window', 'success'] },
}

const EXPECTED_SCREENSHOTS = [
  '09-default.png', '09-skeleton.png', '09-empty.png', '09-error.png', '09-success.png', '09-disabled.png', '09-offline.png', '09-thinking.png', '09-search-open.png', '09-suggestion-sent.png', '09-composer-sent.png',
  '10-consent-required.png', '10-ready.png', '10-booting.png', '10-listening.png', '10-low-confidence.png', '10-silence.png', '10-permission-denied.png', '10-transcription-error.png', '10-network-error.png', '10-max-duration.png', '10-success.png', '10-disabled.png', '10-offline.png', '10-consent-declined.png', '10-transcript-sent.png', '10-crisis-support.png',
  '11-default-reduced.png', '11-listening.png', '11-keyboard-focus.png', '11-keyboard-sent.png', '11-muted.png', '11-support.png', '11-closed.png',
  '51-default.png', '51-action-items.png', '51-skeleton.png', '51-empty.png', '51-error.png', '51-success.png', '51-disabled.png', '51-offline.png', '51-schedule.png', '51-detail.png', '51-delete-confirmation.png', '51-safety.png', '51-action-checked.png',
  '74-default.png', '74-skeleton.png', '74-empty.png', '74-error.png', '74-success.png', '74-disabled.png', '74-offline.png', '74-search.png', '74-compose.png', '74-manage.png', '74-safety.png', '74-filter-people.png',
  '75-default.png', '75-skeleton.png', '75-empty.png', '75-error.png', '75-offline.png', '75-blocked.png', '75-assist-revoked.png', '75-health-share-confirm.png', '75-online-sent.png', '75-offline-queued.png',
  '76-default.png', '76-skeleton.png', '76-empty.png', '76-error.png', '76-offline.png', '76-disabled.png', '76-success.png', '76-members-sheet.png', '76-recap-consent.png', '76-group-action-confirm.png', '76-online-sent.png',
  '77-default.png', '77-skeleton.png', '77-empty.png', '77-error.png', '77-offline.png', '77-disabled.png', '77-success.png', '77-default-bottom.png', '77-delete-confirm.png', '77-enlarged-bottom.png',
  '79-default.png', '79-skeleton.png', '79-partial.png', '79-error.png', '79-offline.png', '79-success.png', '79-privacy-panel.png', '79-action-checked.png',
  '99-default.png', '99-skeleton.png', '99-empty.png', '99-error.png', '99-offline.png', '99-paused.png', '99-revoked.png', '99-outside-window.png', '99-success.png', '99-delete-confirm.png', '99-enlarged-default.png',
]

const EXPECTED_SET = new Set(EXPECTED_SCREENSHOTS)
const ALLOWED_MESSAGE_STATUSES = new Set(['read', 'delivered', 'sent', 'queued', 'failed', 'draft', 'thinking'])
const ALLOWED_SUBSTATES = {
  '10': { 'data-consent-state': ['required', 'granted', 'denied'] },
  '51': { 'data-history-tab': ['history', 'action-items'], 'data-history-panel': ['none', 'schedule', 'detail', 'delete', 'safety'] },
  '74': { 'data-conversations-filter': ['all', 'cia', 'people', 'groups', 'rooms'] },
  '75': { 'data-delivery-state': ['idle', 'sending', 'queued', 'sent', 'read', 'failed'] },
  '76': { 'data-send-state': ['idle', 'sending', 'queued', 'sent', 'failed'] },
  '77': { 'data-reaction': ['none', 'useful', 'support', 'done', 'insight'] },
}

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

assert(EXPECTED_SCREENSHOTS.length === 109, `Verifier contract declares ${EXPECTED_SCREENSHOTS.length} screenshots; expected 109`)
assert(EXPECTED_SET.size === 109, `Verifier screenshot names are not unique (${EXPECTED_SET.size}/109)`)
for (const [id, contract] of Object.entries(SCREEN_CONTRACTS)) {
  assert(new Set(contract.states).size === contract.states.length, `${id}: duplicate exact fixture state`)
  for (const state of contract.states) assert(EXPECTED_SET.has(`${id}-${state}.png`), `${id}: exact fixture ${state} has no canonical screenshot`)
}

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex')
}

function fingerprint(files) {
  const hash = createHash('sha256')
  const entries = []
  for (const relativePath of [...files].sort()) {
    const absolutePath = path.resolve(projectRoot, relativePath)
    assert(fs.existsSync(absolutePath), `Fingerprint source missing: ${relativePath}`)
    const bytes = fs.readFileSync(absolutePath)
    const fileHash = sha256(bytes)
    entries.push({ path: relativePath, sha256: fileHash })
    hash.update(relativePath)
    hash.update('\0')
    hash.update(bytes)
    hash.update('\0')
  }
  return { digest: hash.digest('hex'), files: entries }
}

function fingerprintAll() {
  return {
    product: fingerprint(PRODUCT_FILES),
    api: fingerprint(API_FILES),
    authority: fingerprint(AUTHORITY_FILES),
  }
}

function sameFingerprint(start, end) {
  return start.product.digest === end.product.digest
    && start.api.digest === end.api.digest
    && start.authority.digest === end.authority.digest
}

function pngGeometry(filePath) {
  const bytes = fs.readFileSync(filePath)
  assert(bytes.length >= 24 && bytes.subarray(1, 4).toString('ascii') === 'PNG', `${path.basename(filePath)}: invalid PNG`)
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20), bytes: bytes.length, sha256: sha256(bytes) }
}

fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.mkdirSync(shotsDir, { recursive: true })
for (const file of fs.readdirSync(shotsDir)) {
  if (EXPECTED_SET.has(file)) fs.unlinkSync(path.join(shotsDir, file))
}
const unexpectedExisting = fs.readdirSync(shotsDir).filter(file => file.endsWith('.png') && !EXPECTED_SET.has(file)).sort()
const tempShotsDir = fs.mkdtempSync(path.join(path.dirname(shotsDir), `.${path.basename(shotsDir)}.b1-${process.pid}-`))

const fingerprintsStart = fingerprintAll()
const hillAssetFingerprint = fingerprintsStart.product.files.find(file => file.path === HILL_ASSET_PATH)
assert(hillAssetFingerprint?.sha256 === HILL_ASSET_SHA256, `Canonical hill asset digest is ${hillAssetFingerprint?.sha256 ?? 'missing'}, expected ${HILL_ASSET_SHA256}`)
let fingerprintsEnd = fingerprintsStart
let browser
let navigationNonce = 0
const visitedNonces = new Set()
const captured = new Set()
const checks = []
const consoleErrors = []
const pageErrors = []
const capabilityEvents = []
const caseEvidence = []
let screenshotEvidence = []

function pass(name, evidence = {}) {
  checks.push({ name, status: 'pass', evidence })
}

function recordCapability(caseName, type, detail = '') {
  capabilityEvents.push({ case: caseName, type: String(type), detail: String(detail).slice(0, 500) })
}

async function installCapabilityGuards(context, caseName) {
  await context.exposeBinding('__b1RecordCapability', (_source, type, detail) => {
    recordCapability(caseName, type, detail)
  })

  await context.addInitScript(({ origin }) => {
    const record = (type, detail = '') => {
      try { void window.__b1RecordCapability(type, String(detail)) } catch { /* Node guards remain active. */ }
    }
    const target = value => {
      try { return new URL(String(value), window.location.href) } catch { return null }
    }
    const allowedFrameworkSocket = value => {
      const parsed = target(value)
      return parsed?.origin === origin && parsed.pathname.startsWith('/_next/')
    }

    try {
      if (navigator.mediaDevices) {
        Object.defineProperty(navigator.mediaDevices, 'getUserMedia', {
          configurable: true,
          value: constraints => {
            record('media.getUserMedia', JSON.stringify(constraints ?? {}))
            return Promise.resolve({ getTracks: () => [] })
          },
        })
      }
    } catch { /* Request/event guards still fail the case. */ }

    class GuardedMediaRecorder {
      static isTypeSupported() { return false }
      constructor(stream, options) {
        record('MediaRecorder', JSON.stringify(options ?? {}))
        this.state = 'inactive'
        this.stream = stream
      }
      start() { record('MediaRecorder.start'); this.state = 'recording' }
      stop() { record('MediaRecorder.stop'); this.state = 'inactive'; this.onstop?.(new Event('stop')) }
      pause() { record('MediaRecorder.pause'); this.state = 'paused' }
      resume() { record('MediaRecorder.resume'); this.state = 'recording' }
      addEventListener() {}
      removeEventListener() {}
    }
    try { Object.defineProperty(window, 'MediaRecorder', { configurable: true, value: GuardedMediaRecorder }) } catch {}

    class GuardedSpeechRecognition {
      constructor() { record('SpeechRecognition') }
      start() { record('SpeechRecognition.start') }
      stop() { record('SpeechRecognition.stop') }
      abort() { record('SpeechRecognition.abort') }
      addEventListener() {}
      removeEventListener() {}
    }
    try { Object.defineProperty(window, 'SpeechRecognition', { configurable: true, value: GuardedSpeechRecognition }) } catch {}
    try { Object.defineProperty(window, 'webkitSpeechRecognition', { configurable: true, value: GuardedSpeechRecognition }) } catch {}

    class GuardedPeerConnection {
      constructor(configuration) { record('RTCPeerConnection', JSON.stringify(configuration ?? {})) }
      close() {}
      addEventListener() {}
      removeEventListener() {}
    }
    try { Object.defineProperty(window, 'RTCPeerConnection', { configurable: true, value: GuardedPeerConnection }) } catch {}

    try {
      Object.defineProperty(HTMLMediaElement.prototype, 'play', {
        configurable: true,
        value() { record('HTMLMediaElement.play', this.currentSrc || this.src || 'inline'); return Promise.resolve() },
      })
    } catch {}

    try {
      Object.defineProperty(navigator, 'share', {
        configurable: true,
        value: data => { record('navigator.share', JSON.stringify(data ?? {})); return Promise.resolve() },
      })
    } catch {}
    try {
      Object.defineProperty(navigator, 'sendBeacon', {
        configurable: true,
        value: (url, data) => { record('navigator.sendBeacon', `${url}:${data ? 'payload' : 'empty'}`); return false },
      })
    } catch {}

    try {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: {
          writeText(value) { record('clipboard.writeText', String(value)); return Promise.resolve() },
          readText() { record('clipboard.readText'); return Promise.resolve('') },
          write() { record('clipboard.write'); return Promise.resolve() },
          read() { record('clipboard.read'); return Promise.resolve([]) },
        },
      })
    } catch {}

    try {
      Object.defineProperty(URL, 'createObjectURL', {
        configurable: true,
        value: value => {
          record('URL.createObjectURL', Object.prototype.toString.call(value))
          return 'blob:b1-blocked'
        },
      })
    } catch {}

    try {
      const NativeWebSocket = window.WebSocket
      class GuardedWebSocket extends NativeWebSocket {
        constructor(url, protocols) {
          if (!allowedFrameworkSocket(url)) record('WebSocket', url)
          if (protocols === undefined) super(url)
          else super(url, protocols)
        }
      }
      Object.defineProperty(window, 'WebSocket', { configurable: true, value: GuardedWebSocket })
    } catch {}
    try {
      const NativeEventSource = window.EventSource
      class GuardedEventSource extends NativeEventSource {
        constructor(url, options) { record('EventSource', url); super(url, options) }
      }
      Object.defineProperty(window, 'EventSource', { configurable: true, value: GuardedEventSource })
    } catch {}

    try {
      window.open = (...args) => { record('window.open', args[0] ?? ''); return null }
    } catch {}

    for (const method of ['setItem', 'removeItem', 'clear']) {
      try {
        const original = Storage.prototype[method]
        Storage.prototype[method] = function guardedStorage(...args) {
          let area = 'storage'
          try { area = this === localStorage ? 'localStorage' : this === sessionStorage ? 'sessionStorage' : area } catch {}
          record(`storage.${method}`, `${area}:${args[0] ?? ''}`)
          return original.apply(this, args)
        }
      } catch {}
    }
    try {
      const descriptor = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie')
        ?? Object.getOwnPropertyDescriptor(HTMLDocument.prototype, 'cookie')
      if (descriptor?.get && descriptor?.set && descriptor.configurable) {
        Object.defineProperty(Document.prototype, 'cookie', {
          configurable: true,
          enumerable: descriptor.enumerable,
          get() { return descriptor.get.call(this) },
          set(value) { record('cookie.write', value); return descriptor.set.call(this, value) },
        })
      }
    } catch {}
    try {
      const originalOpen = indexedDB.open.bind(indexedDB)
      indexedDB.open = (...args) => { record('indexedDB.open', args[0] ?? ''); return originalOpen(...args) }
      const originalDelete = indexedDB.deleteDatabase.bind(indexedDB)
      indexedDB.deleteDatabase = (...args) => { record('indexedDB.deleteDatabase', args[0] ?? ''); return originalDelete(...args) }
    } catch {}
    try {
      const originalOpen = caches.open.bind(caches)
      caches.open = (...args) => { record('caches.open', args[0] ?? ''); return originalOpen(...args) }
      const originalDelete = caches.delete.bind(caches)
      caches.delete = (...args) => { record('caches.delete', args[0] ?? ''); return originalDelete(...args) }
    } catch {}

    document.addEventListener('click', event => {
      const element = event.target instanceof Element ? event.target : null
      const anchor = element?.closest('a[href]')
      if (anchor) {
        const destination = target(anchor.href)
        const forbiddenProtocol = destination && !['http:', 'https:'].includes(destination.protocol)
        const external = destination && destination.origin !== origin
        if (forbiddenProtocol || external) {
          record('external-navigation-attempt', destination?.href ?? anchor.href)
          event.preventDefault()
          event.stopImmediatePropagation()
        }
        if (anchor.hasAttribute('download')) {
          record('download-attempt', anchor.getAttribute('download') ?? '')
          event.preventDefault()
          event.stopImmediatePropagation()
        }
      }
    }, true)
  }, { origin: baseOrigin })
}

async function twoAnimationFrames(page) {
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
}

async function beginCase({ name, id, state = null, rootAttribute = null, rootState = state, reducedMotion = 'reduce', textScale = 1 }) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
    reducedMotion,
  })
  await installCapabilityGuards(context, name)
  const page = await context.newPage()
  const cdp = await context.newCDPSession(page)

  page.on('console', message => {
    if (message.type() === 'error') consoleErrors.push({ case: name, text: message.text() })
  })
  page.on('pageerror', error => pageErrors.push({ case: name, text: String(error) }))
  page.on('popup', popup => { recordCapability(name, 'popup', popup.url()); void popup.close() })
  page.on('download', download => recordCapability(name, 'download', download.suggestedFilename()))
  page.on('framenavigated', frame => {
    if (frame !== page.mainFrame() || frame.url() === 'about:blank') return
    try {
      if (new URL(frame.url()).origin !== baseOrigin) recordCapability(name, 'external-navigation', frame.url())
    } catch { recordCapability(name, 'non-http-navigation', frame.url()) }
  })
  page.on('websocket', socket => {
    try {
      const parsed = new URL(socket.url())
      const isFramework = parsed.origin.replace(/^ws/, 'http') === baseOrigin && parsed.pathname.startsWith('/_next/')
      if (!isFramework) recordCapability(name, 'websocket', socket.url())
    } catch { recordCapability(name, 'websocket', socket.url()) }
  })

  await context.route('**/*', async route => {
    const request = route.request()
    const url = request.url()
    let forbidden = false
    try {
      const parsed = new URL(url)
      const external = ['http:', 'https:'].includes(parsed.protocol) && parsed.origin !== baseOrigin
      const api = parsed.origin === baseOrigin && parsed.pathname.startsWith('/api/')
      const mutation = parsed.origin === baseOrigin && !['GET', 'HEAD', 'OPTIONS'].includes(request.method())
      if (external) { recordCapability(name, 'external-request', `${request.method()} ${url}`); forbidden = true }
      if (api) { recordCapability(name, 'api-request', `${request.method()} ${url}`); forbidden = true }
      if (mutation) { recordCapability(name, 'non-get-request', `${request.method()} ${url}`); forbidden = true }
    } catch { /* data/blob/browser requests are separately guarded. */ }
    if (forbidden) await route.abort('blockedbyclient')
    else await route.continue()
  })

  await page.goto('about:blank')
  await context.clearCookies()
  await cdp.send('Storage.clearDataForOrigin', { origin: baseOrigin, storageTypes: 'all' })
  assert((await context.cookies()).length === 0, `${name}: context did not start cookie-empty`)

  const target = new URL(`/screens/${id}`, baseURL)
  if (state !== null) target.searchParams.set('state', state)
  const nonce = String(++navigationNonce)
  assert(!visitedNonces.has(nonce), `${name}: navigation nonce reused`)
  visitedNonces.add(nonce)
  target.searchParams.set('__b1audit', nonce)
  assert(target.origin === baseOrigin, `${name}: case target is not same-origin`)
  await page.goto(target.toString(), { waitUntil: 'networkidle' })
  const finalURL = new URL(page.url())
  assert(finalURL.origin === baseOrigin, `${name}: case left configured origin`)
  assert(finalURL.pathname === `/screens/${id}`, `${name}: unexpected fixture path ${finalURL.pathname}`)
  assert(finalURL.searchParams.get('__b1audit') === nonce, `${name}: audit nonce was not retained`)
  if (state !== null) assert(finalURL.searchParams.get('state') === state, `${name}: exact state query was not retained`)
  assert(finalURL.hash === '', `${name}: unexpected hash transport`)

  if (rootAttribute) {
    await page.waitForFunction(
      ({ attribute, expected }) => {
        const nodes = document.querySelectorAll(`[${attribute}]`)
        return nodes.length === 1 && nodes[0].getAttribute(attribute) === expected
      },
      { attribute: rootAttribute, expected: rootState },
    )
  } else {
    await page.waitForFunction(() => document.querySelectorAll('[data-testid="phone-frame"]').length === 1)
  }
  if (textScale !== 1) {
    await page.evaluate(scale => { document.documentElement.style.fontSize = `${scale * 100}%` }, textScale)
  }
  await twoAnimationFrames(page)
  return { name, id, state, rootAttribute, rootState, reducedMotion, textScale, context, page, cdp, nonce }
}

async function storageSnapshot(page) {
  return page.evaluate(async () => {
    const read = storage => Array.from({ length: storage.length }, (_, index) => {
      const key = storage.key(index) ?? ''
      return [key, storage.getItem(key) ?? '']
    }).sort(([a], [b]) => a.localeCompare(b))
    const databases = typeof indexedDB.databases === 'function'
      ? (await indexedDB.databases()).map(item => item.name ?? '').filter(Boolean).sort()
      : []
    const cacheNames = typeof caches !== 'undefined' ? (await caches.keys()).sort() : []
    return { local: read(localStorage), session: read(sessionStorage), databases, cacheNames }
  })
}

async function finishCase(handle) {
  const { name, page, context } = handle
  const storage = await storageSnapshot(page)
  const cookies = await context.cookies()
  assert(storage.local.length === 0, `${name}: localStorage changed: ${JSON.stringify(storage.local)}`)
  assert(storage.session.length === 0, `${name}: sessionStorage changed: ${JSON.stringify(storage.session)}`)
  assert(storage.databases.length === 0, `${name}: IndexedDB changed: ${storage.databases.join(', ')}`)
  assert(storage.cacheNames.length === 0, `${name}: Cache Storage changed: ${storage.cacheNames.join(', ')}`)
  assert(cookies.length === 0, `${name}: cookies changed: ${cookies.map(cookie => cookie.name).join(', ')}`)
  const caseConsole = consoleErrors.filter(item => item.case === name)
  const casePage = pageErrors.filter(item => item.case === name)
  assert(caseConsole.length === 0, `${name}: console error(s): ${caseConsole.map(item => item.text).join(' | ')}`)
  assert(casePage.length === 0, `${name}: page error(s): ${casePage.map(item => item.text).join(' | ')}`)
  caseEvidence.push({ name, id: handle.id, state: handle.state, nonce: handle.nonce, reducedMotion: handle.reducedMotion, textScale: handle.textScale, storage, cookies: 0 })
}

async function runCase(config, body) {
  let handle
  try {
    handle = await beginCase(config)
    await body(handle)
    await finishCase(handle)
    pass(`case ${config.name}`, { id: config.id, fixture: config.state, nonce: handle.nonce })
  } finally {
    if (handle) await handle.context.close()
  }
}

async function resetScrollRecursively(page) {
  const residue = await page.locator('[data-testid="phone-frame"]').evaluate(phone => {
    window.scrollTo(0, 0)
    const nodes = [phone, ...phone.querySelectorAll('*')]
    for (const node of nodes) {
      if ('scrollTop' in node) node.scrollTop = 0
      if ('scrollLeft' in node) node.scrollLeft = 0
    }
    return nodes.flatMap((node, index) => {
      if (!('scrollTop' in node) || !('scrollLeft' in node)) return []
      return Math.abs(node.scrollTop) > 0.5 || Math.abs(node.scrollLeft) > 0.5
        ? [{ index, tag: node.tagName, top: node.scrollTop, left: node.scrollLeft }]
        : []
    })
  })
  assert(residue.length === 0, `scroll reset failed: ${JSON.stringify(residue)}`)
  await twoAnimationFrames(page)
}

async function targetSize(locator, label, minimum = 44) {
  const geometry = await locator.evaluate(node => {
    const candidates = [node]
    if ('labels' in node && node.labels) candidates.push(...node.labels)
    const boxes = candidates.map(candidate => candidate.getBoundingClientRect())
    return boxes.reduce((best, box) => box.width * box.height > best.width * best.height ? box : best, boxes[0])
  })
  assert(geometry.width >= minimum && geometry.height >= minimum, `${label}: target ${geometry.width.toFixed(1)}×${geometry.height.toFixed(1)} is below ${minimum}×${minimum}`)
  return geometry
}

async function authoredFocus(page, locator, label, { rovingTab = false, focusOpensDialog = false } = {}) {
  await locator.evaluate(() => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
  })
  if (rovingTab || focusOpensDialog) {
    if (!focusOpensDialog) await locator.focus()
    const evidence = await locator.evaluate(node => ({
      focused: document.activeElement === node,
      authored: [node, node.parentElement].some(candidate => candidate && /(?:^|\s)(?:focus-ring|hifi-action)(?:\s|$)|focus-within:/.test(candidate.className || '')),
    }))
    if (!focusOpensDialog) assert(evidence.focused, `${label}: roving tab cannot receive programmatic focus`)
    assert(evidence.authored, `${label}: control lacks an authored focus-visible treatment`)
    return { redirectedToDialog: false }
  }
  const before = await locator.evaluate(node => {
    const values = []
    for (let current = node, depth = 0; current && depth < 5; current = current.parentElement, depth += 1) {
      const style = getComputedStyle(current)
      values.push({
        outline: `${style.outlineStyle}|${style.outlineWidth}|${style.outlineColor}`,
        boxShadow: style.boxShadow,
        borderColor: style.borderColor,
        backgroundColor: style.backgroundColor,
      })
    }
    return values
  })
  await locator.focus()
  const redirectedToDialog = await locator.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"][aria-modal="true"]')
    return Boolean(dialog && dialog.contains(document.activeElement))
  })
  if (redirectedToDialog) return { redirectedToDialog: true }
  const focusState = await locator.evaluate(node => ({
    focused: document.activeElement === node,
    visible: node.matches(':focus-visible'),
    authored: [node, node.parentElement].some(candidate => candidate && /(?:^|\s)(?:focus-ring|hifi-action)(?:\s|$)|focus-within:/.test(candidate.className || '')),
  }))
  assert(focusState.focused, `${label}: control cannot receive focus`)
  assert(focusState.visible || focusState.authored, `${label}: control lacks keyboard-visible focus evidence`)
  const changed = await locator.evaluate((node, previous) => {
    for (let current = node, depth = 0; current && depth < 5; current = current.parentElement, depth += 1) {
      const style = getComputedStyle(current)
      const now = {
        outline: `${style.outlineStyle}|${style.outlineWidth}|${style.outlineColor}`,
        boxShadow: style.boxShadow,
        borderColor: style.borderColor,
        backgroundColor: style.backgroundColor,
      }
      const prior = previous[depth]
      if (!prior) continue
      if (now.outline !== prior.outline && style.outlineStyle !== 'none' && Number.parseFloat(style.outlineWidth) > 0) return true
      if (now.boxShadow !== prior.boxShadow && now.boxShadow !== 'none') return true
      if (now.borderColor !== prior.borderColor || now.backgroundColor !== prior.backgroundColor) return true
    }
    return false
  }, before)
  assert(changed || focusState.authored, `${label}: no authored focus treatment detected`)
  return { redirectedToDialog: false }
}

async function accessibleControlName(locator) {
  return locator.evaluate(node => {
    const labelledBy = node.getAttribute('aria-labelledby')
    const labelledText = labelledBy
      ? labelledBy.split(/\s+/).map(id => document.getElementById(id)?.textContent?.trim() ?? '').filter(Boolean).join(' ')
      : ''
    const nativeLabel = 'labels' in node && node.labels?.length
      ? [...node.labels].map(label => label.textContent?.trim() ?? '').filter(Boolean).join(' ')
      : ''
    return (node.getAttribute('aria-label') || labelledText || nativeLabel || node.textContent || node.getAttribute('placeholder') || node.getAttribute('title') || '')
      .replace(/\s+/g, ' ')
      .trim()
  })
}

async function effectiveContrast(locator) {
  return locator.evaluate(node => {
    const parse = value => {
      const canvas = document.createElement('canvas')
      canvas.width = 1
      canvas.height = 1
      const context = canvas.getContext('2d', { willReadFrequently: true })
      if (!context) throw new Error('Unable to create a color-resolution canvas')
      context.clearRect(0, 0, 1, 1)
      context.fillStyle = value
      context.fillRect(0, 0, 1, 1)
      const [r, g, b, alpha] = context.getImageData(0, 0, 1, 1).data
      return { r, g, b, a: alpha / 255 }
    }
    const composite = (front, back) => {
      const alpha = front.a + back.a * (1 - front.a)
      return {
        r: (front.r * front.a + back.r * back.a * (1 - front.a)) / alpha,
        g: (front.g * front.a + back.g * back.a * (1 - front.a)) / alpha,
        b: (front.b * front.a + back.b * back.a * (1 - front.a)) / alpha,
        a: alpha,
      }
    }
    const layers = []
    for (let current = node; current; current = current.parentElement) layers.push(parse(getComputedStyle(current).backgroundColor))
    let background = { r: 10, g: 10, b: 15, a: 1 }
    for (const layer of layers.reverse()) background = composite(layer, background)
    const foreground = composite(parse(getComputedStyle(node).color), background)
    const luminance = color => {
      const channels = [color.r, color.g, color.b].map(value => {
        const normalized = value / 255
        return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4
      })
      return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
    }
    const lighter = Math.max(luminance(foreground), luminance(background))
    const darker = Math.min(luminance(foreground), luminance(background))
    return (lighter + 0.05) / (darker + 0.05)
  })
}

async function interactionContrast(page, locator, label) {
  const normal = await effectiveContrast(locator)
  await locator.hover()
  const hover = await effectiveContrast(locator)
  const box = await locator.boundingBox()
  assert(box, `${label}: action has no box for contrast states`)
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
  await page.mouse.down()
  const pressed = await effectiveContrast(locator)
  await page.mouse.move(1, 1)
  await page.mouse.up()
  assert(normal >= 4.5 && hover >= 4.5 && pressed >= 4.5, `${label}: normal/hover/pressed contrast ${normal.toFixed(2)}/${hover.toFixed(2)}/${pressed.toFixed(2)} is below 4.5`)
  return { normal, hover, pressed }
}

async function auditNativeControls(page, label, { disabledReasons = true, acceptedS11 = false } = {}) {
  const persistentModalCount = await page.locator('[role="dialog"][aria-modal="true"]:visible').count()
  const faux = await page.locator('[data-testid="phone-frame"] [role="button"], [data-testid="phone-frame"] [role="link"], [data-testid="phone-frame"] [role="tab"], [data-testid="phone-frame"] [role="checkbox"], [data-testid="phone-frame"] [role="switch"]').evaluateAll(nodes => nodes.flatMap(node => {
    if (node.closest('[aria-hidden="true"], [inert]')) return []
    const role = node.getAttribute('role')
    const native = role === 'link'
      ? node.tagName === 'A' && node.hasAttribute('href')
      : role === 'checkbox'
        ? node.tagName === 'INPUT' && node.getAttribute('type') === 'checkbox'
        : node.tagName === 'BUTTON'
    return native ? [] : [`${node.tagName.toLowerCase()}[role=${role}]`]
  }))
  assert(faux.length === 0, `${label}: faux controls found: ${faux.join(', ')}`)

  const controls = page.locator('[data-testid="phone-frame"] button, [data-testid="phone-frame"] a[href], [data-testid="phone-frame"] input, [data-testid="phone-frame"] select, [data-testid="phone-frame"] textarea')
  const names = new Map()
  let audited = 0
  for (let index = 0; index < await controls.count(); index += 1) {
    const control = controls.nth(index)
    if (!(await control.isVisible())) continue
    if (await control.evaluate(node => Boolean(node.closest('[aria-hidden="true"], [inert]')))) continue
    if (persistentModalCount > 0 && await control.evaluate(node => {
      const modal = document.querySelector('[role="dialog"][aria-modal="true"]')
      return Boolean(modal && !modal.contains(node))
    })) continue
    const name = await accessibleControlName(control)
    assert(name.length > 0, `${label}: visible control ${index + 1} has no accessible name`)
    const key = name.toLocaleLowerCase()
    names.set(key, [...(names.get(key) ?? []), index])
    const disabled = await control.isDisabled()
    if (disabled) {
      const describedBy = await control.getAttribute('aria-describedby')
      if (disabledReasons) {
        const reasonInName = /unavailable|disabled|blocked|offline|\boff\b|not available|for this thread/i.test(name)
        const loadingBusy = await control.getAttribute('aria-busy') === 'true'
        assert(describedBy || reasonInName || loadingBusy, `${label}: disabled “${name}” has no accessible reason`)
        if (describedBy) {
          const reason = await page.evaluate(ids => ids.split(/\s+/).map(id => document.getElementById(id)?.textContent?.trim() ?? '').join(' ').trim(), describedBy)
          assert(reason.length > 0, `${label}: disabled “${name}” points to an empty reason`)
        }
      }
      continue
    }
    const keyboard = await control.evaluate(node => ({ tabIndex: node.tabIndex, role: node.getAttribute('role') }))
    const rovingTab = keyboard.role === 'tab' && keyboard.tabIndex === -1
    assert(keyboard.tabIndex >= 0 || rovingTab, `${label}: “${name}” is not keyboard reachable`)
    const fieldContract = await control.evaluate(node => {
      if (node.tagName === 'TEXTAREA' || node.tagName === 'SELECT') return true
      if (node.tagName !== 'INPUT') return false
      return !['checkbox', 'radio', 'range', 'color', 'file', 'hidden'].includes(node.type)
    })
    await targetSize(control, `${label} “${name}”`, acceptedS11 && fieldContract && name === 'Message CIA' ? 40 : 44)
    if (fieldContract) {
      const fontSize = Number.parseFloat(await control.evaluate(node => getComputedStyle(node).fontSize))
      assert(fontSize >= 16, `${label}: “${name}” field is ${fontSize}px; expected at least 16px`)
    }
    const focusOpensDialog = await control.getAttribute('data-focus-opens-dialog') === 'true'
    const focusEvidence = await authoredFocus(page, control, `${label} “${name}”`, { rovingTab, focusOpensDialog })
    if (focusEvidence.redirectedToDialog && persistentModalCount === 0) {
      await page.keyboard.press('Escape')
      await page.locator('[role="dialog"][aria-modal="true"]').waitFor({ state: 'hidden' })
    }
    const hasVisibleText = await control.evaluate(node => (node.innerText || node.value || node.placeholder || '').trim().length > 0)
    if (hasVisibleText) {
      const tag = await control.evaluate(node => node.tagName)
      if (tag === 'BUTTON' || tag === 'A') await interactionContrast(page, control, `${label} “${name}”`)
      else {
        const ratio = await effectiveContrast(control)
        assert(ratio >= 4.5, `${label}: “${name}” contrast is ${ratio.toFixed(2)}; expected 4.5`)
      }
    }
    audited += 1
  }
  const duplicateNames = [...names.entries()].filter(([, indices]) => indices.length > 1).map(([name]) => name)
  assert(duplicateNames.length === 0, `${label}: duplicate accessible control names: ${duplicateNames.join(', ')}`)
  await page.evaluate(() => { if (document.activeElement instanceof HTMLElement) document.activeElement.blur() })
  await resetScrollRecursively(page)
  return audited
}

async function assertReducedMotion(page, label) {
  assert(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches), `${label}: reduced-motion media query is not active`)
  const loops = await page.locator('[data-testid="phone-frame"] *').evaluateAll(nodes => nodes.flatMap(node => {
    const style = getComputedStyle(node)
    const names = style.animationName.split(',').map(value => value.trim())
    const iterations = style.animationIterationCount.split(',').map(value => value.trim())
    const runningLoop = names.some((name, index) => name !== 'none' && (iterations[index] === 'infinite' || Number(iterations[index]) > 1))
      && style.animationPlayState !== 'paused'
    return runningLoop ? [`${node.tagName.toLowerCase()}:${style.animationName}`] : []
  }))
  assert(loops.length === 0, `${label}: reduced-motion loop(s) remain: ${loops.join(' | ')}`)
}

async function assertMessageMetadata(page, label, { required = false } = {}) {
  const messages = page.locator('article[data-message-id]')
  const count = await messages.count()
  if (required) assert(count > 0, `${label}: expected at least one metadata message article`)
  for (let index = 0; index < count; index += 1) {
    const message = messages.nth(index)
    const metadata = await message.evaluate(node => ({
      id: node.getAttribute('data-message-id'),
      speaker: node.getAttribute('data-message-speaker'),
      status: node.getAttribute('data-message-status'),
      source: node.getAttribute('data-message-source'),
      audience: node.getAttribute('data-message-audience'),
    }))
    for (const [key, value] of Object.entries(metadata)) assert(value?.trim(), `${label}: message ${index + 1} missing ${key}`)
    assert(ALLOWED_MESSAGE_STATUSES.has(metadata.status), `${label}: message ${metadata.id} has unsupported status ${metadata.status}`)
    const time = message.locator('time[datetime]')
    assert(await time.count() === 1, `${label}: message ${metadata.id} needs one descendant time[datetime]`)
    const dateTime = await time.getAttribute('datetime')
    assert(dateTime && !Number.isNaN(Date.parse(dateTime)), `${label}: message ${metadata.id} has invalid datetime ${dateTime}`)
    assert((await time.textContent())?.trim(), `${label}: message ${metadata.id} has no visible time`)
    const timeContrast = await effectiveContrast(time)
    assert(timeContrast >= 4.5, `${label}: message ${metadata.id} time contrast is ${timeContrast.toFixed(2)}`)
  }
  const attachments = page.locator('[data-attachment-source], [data-attachment-retention]')
  for (let index = 0; index < await attachments.count(); index += 1) {
    const attachment = attachments.nth(index)
    assert((await attachment.getAttribute('data-attachment-source'))?.trim(), `${label}: attachment ${index + 1} missing source`)
    assert((await attachment.getAttribute('data-attachment-retention'))?.trim(), `${label}: attachment ${index + 1} missing retention`)
  }
  return { messages: count, attachments: await attachments.count() }
}

async function assertNoFalseCapabilityClaims(page, label) {
  const text = (await page.locator('[data-testid="phone-frame"]').innerText()).replace(/\s+/g, ' ')
  assert(!/\bCia\b/.test(text), `${label}: stale “Cia” casing rendered; expected CIA`)
  const forbidden = [
    /raw audio (?:was |is |has been )?(?:stored|saved|uploaded|retained)/i,
    /(?:opened|opening|sent|sending) (?:in|to|via) WhatsApp/i,
    /(?:called|notified|contacted) (?:your )?emergency contact/i,
    /(?:live call|provider handoff) (?:started|connected|complete)/i,
    /(?:export|sync|revoke|deletion) (?:completed|finished) (?:on|with|to) (?:the )?(?:provider|server|cloud)/i,
    /microphone listening|voice is being captured/i,
  ]
  const hit = forbidden.find(pattern => pattern.test(text))
  assert(!hit, `${label}: false external-capability claim matched ${hit}`)
  const unmaskedNumber = text.match(/(?:\+\d[\d ()-]{7,}\d|\b\d{3}[- ]\d{3}[- ]\d{4}\b)/)
  assert(!unmaskedNumber, `${label}: unmasked provider number rendered: ${unmaskedNumber?.[0]}`)
}

async function assertRootContract(page, id, rootAttribute, expectedState, label) {
  if (!rootAttribute) return
  const roots = page.locator(`[${rootAttribute}]`)
  assert(await roots.count() === 1, `${label}: expected one [${rootAttribute}] root`)
  assert(await roots.getAttribute(rootAttribute) === expectedState, `${label}: expected ${rootAttribute}=${expectedState}`)
  const substates = ALLOWED_SUBSTATES[id] ?? {}
  for (const [attribute, values] of Object.entries(substates)) {
    const value = await roots.getAttribute(attribute)
    assert(value && values.includes(value), `${label}: ${attribute}=${value} is outside ${values.join('|')}`)
  }
}

async function auditFixture(handle, { strictLive = true, messageMetadata = false, messagesRequired = false, loading = false, disabledReasons = true, acceptedS11 = false } = {}) {
  const { page, name, id, rootAttribute } = handle
  const phone = page.locator('[data-testid="phone-frame"]')
  assert(await phone.count() === 1, `${name}: phone frame missing`)
  const geometry = await phone.evaluate(node => {
    const box = node.getBoundingClientRect()
    const protrusions = [...node.querySelectorAll('*')].flatMap(child => {
      const style = getComputedStyle(child)
      if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return []
      const rect = child.getBoundingClientRect()
      return rect.left < box.left - 1 || rect.right > box.right + 1 ? [`${child.tagName.toLowerCase()}:${Math.round(rect.left)}..${Math.round(rect.right)}`] : []
    })
    return {
      width: Math.round(box.width),
      height: Math.round(box.height),
      overflow: node.scrollWidth > node.clientWidth + 1,
      protrusions: protrusions.slice(0, 10),
    }
  })
  assert(geometry.width === 390 && geometry.height === 844, `${name}: phone is ${geometry.width}×${geometry.height}, expected 390×844`)
  assert(!geometry.overflow && geometry.protrusions.length === 0, `${name}: horizontal overflow/protrusion: ${geometry.protrusions.join(' | ')}`)
  const h1 = phone.locator('h1')
  assert(await h1.count() === 1, `${name}: expected exactly one phone-level h1`)
  if (await h1.isVisible()) {
    const headingContrast = await effectiveContrast(h1)
    assert(headingContrast >= 4.5, `${name}: h1 contrast is ${headingContrast.toFixed(2)}`)
  }
  const tinySemanticCopy = await phone.evaluate(node => [...node.querySelectorAll('*')].flatMap(element => {
    if (element.closest('[aria-hidden="true"]') || element.getAttribute('aria-hidden') === 'true') return []
    const style = getComputedStyle(element)
    if (style.display === 'none' || style.visibility === 'hidden' || Number.parseFloat(style.opacity) === 0) return []
    if (!element.getClientRects().length || /(?:^|\s)sr-only(?:\s|$)/.test(String(element.className))) return []
    const directText = [...element.childNodes].filter(child => child.nodeType === Node.TEXT_NODE).map(child => child.textContent?.trim() ?? '').join(' ').trim()
    if (directText.length <= 2) return [] // privacy-safe initials and terse glyph fallbacks
    const fontSize = Number.parseFloat(style.fontSize)
    return fontSize < 11 ? [`${element.tagName.toLowerCase()}:${fontSize}px:${directText.slice(0, 80)}`] : []
  }))
  assert(tinySemanticCopy.length === 0, `${name}: semantic copy below 11px: ${tinySemanticCopy.slice(0, 10).join(' | ')}`)
  if (rootAttribute) {
    await assertRootContract(page, id, rootAttribute, await page.locator(`[${rootAttribute}]`).getAttribute(rootAttribute), name)
  }

  const indicator = page.locator('[data-testid="home-indicator"]')
  const indicatorBox = await indicator.boundingBox()
  assert(indicatorBox, `${name}: home indicator missing`)
  const lowerChrome = page.locator('[data-testid="screen-composer"], [data-testid="screen-bottom-action"], [data-testid="screen-shell"] > nav')
  for (let index = 0; index < await lowerChrome.count(); index += 1) {
    const item = lowerChrome.nth(index)
    if (!(await item.isVisible())) continue
    const box = await item.boundingBox()
    assert(box && box.y + box.height <= indicatorBox.y - 2, `${name}: composer/action/nav overlaps the home indicator`)
  }

  const controlCount = await auditNativeControls(page, name, { disabledReasons, acceptedS11 })
  if (strictLive) {
    const live = page.locator('[data-testid="phone-frame"] [aria-live="polite"][aria-atomic="true"]')
    assert(await live.count() === 1, `${name}: expected one atomic polite live source`)
  }
  if (loading) {
    assert(await page.locator(`[${rootAttribute}][aria-busy="true"], [${rootAttribute}] [aria-busy="true"]`).count() >= 1, `${name}: loading fixture lacks aria-busy=true`)
    const width = await page.locator(`[${rootAttribute}]`).evaluate(node => node.getBoundingClientRect().width)
    assert(width >= geometry.width - 32, `${name}: loading content width collapsed to ${width.toFixed(1)}px; expected the canonical phone width minus at most 16px gutters`)
  }
  if (handle.reducedMotion === 'reduce') await assertReducedMotion(page, name)
  await assertNoFalseCapabilityClaims(page, name)
  const metadata = messageMetadata ? await assertMessageMetadata(page, name, { required: messagesRequired }) : { messages: 0, attachments: 0 }
  await resetScrollRecursively(page)
  return { geometry, controlCount, metadata }
}

async function capture(handle, screenshotName, { top = true } = {}) {
  if (top) await resetScrollRecursively(handle.page)
  const fileName = `${screenshotName}.png`
  assert(EXPECTED_SET.has(fileName), `${handle.name}: ${fileName} is outside the canonical B1 set`)
  assert(!captured.has(fileName), `${handle.name}: duplicate screenshot ${fileName}`)
  if (handle.reducedMotion === 'reduce') await assertReducedMotion(handle.page, screenshotName)
  const phone = handle.page.locator('[data-testid="phone-frame"]')
  const freeze = await handle.page.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}' })
  await phone.evaluate(async node => {
    node.style.transform = 'translateZ(0)'
    node.style.filter = 'brightness(0.9999)'
    void node.getBoundingClientRect()
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  })
  const output = path.join(tempShotsDir, fileName)
  await phone.screenshot({ path: output, animations: 'disabled', scale: 'css' })
  await phone.evaluate(node => { node.style.removeProperty('transform'); node.style.removeProperty('filter') })
  await freeze.evaluate(node => node.remove())
  const geometry = pngGeometry(output)
  assert(geometry.width === 390 && geometry.height === 844, `${fileName}: ${geometry.width}×${geometry.height}, expected 390×844`)
  captured.add(fileName)
}

async function waitAttribute(page, selector, attribute, expected, timeout = 6000) {
  await page.waitForFunction(
    ({ selector, attribute, expected }) => document.querySelector(selector)?.getAttribute(attribute) === expected,
    { selector, attribute, expected },
    { timeout },
  )
  await twoAnimationFrames(page)
}

async function waitAttributeOneOf(page, selector, attribute, expected, timeout = 6000) {
  await page.waitForFunction(
    ({ selector, attribute, expected }) => expected.includes(document.querySelector(selector)?.getAttribute(attribute)),
    { selector, attribute, expected },
    { timeout },
  )
  await twoAnimationFrames(page)
  return page.locator(selector).getAttribute(attribute)
}

async function fullyVisibleInPhone(page, locator, label) {
  const [box, phone] = await Promise.all([locator.boundingBox(), page.locator('[data-testid="phone-frame"]').boundingBox()])
  assert(box && phone && box.x >= phone.x && box.y >= phone.y && box.x + box.width <= phone.x + phone.width && box.y + box.height <= phone.y + phone.height, `${label}: not fully visible in phone frame`)
}

async function fullyVisibleInContent(page, locator, label) {
  const [box, content] = await Promise.all([locator.boundingBox(), page.locator('[data-testid="screen-content"]').boundingBox()])
  assert(box && content && box.x >= content.x && box.y >= content.y && box.x + box.width <= content.x + content.width && box.y + box.height <= content.y + content.height, `${label}: not fully visible in the unobscured screen-content viewport`)
}

async function equalExit(cancel, destructive, label) {
  const [cancelBox, destructiveBox] = await Promise.all([cancel.boundingBox(), destructive.boundingBox()])
  assert(cancelBox && destructiveBox, `${label}: cancel/destructive action missing`)
  assert(Math.abs(cancelBox.width - destructiveBox.width) <= 4 && Math.abs(cancelBox.height - destructiveBox.height) <= 4, `${label}: Cancel is not equal geometry (${cancelBox.width}×${cancelBox.height} vs ${destructiveBox.width}×${destructiveBox.height})`)
  await targetSize(cancel, `${label} Cancel`)
  await targetSize(destructive, `${label} destructive action`)
}

async function equalSensitiveChoice(cancel, affirmative, label) {
  await equalExit(cancel, affirmative, label)
  const [cancelClass, affirmativeClass] = await Promise.all([cancel.getAttribute('class'), affirmative.getAttribute('class')])
  const normalize = value => (value ?? '').split(/\s+/).filter(Boolean).sort().join(' ')
  assert(normalize(cancelClass) === normalize(affirmativeClass), `${label}: sensitive affirmative choice uses a visually favored button variant`)
  assert(/glass-pill/.test(cancelClass ?? '') && !/hifi-action-primary/.test(cancelClass ?? ''), `${label}: sensitive choices do not use the equal secondary treatment`)
}

async function assertDialogTrap(page, dialog, trigger, label, { close = true } = {}) {
  await dialog.waitFor()
  const controls = dialog.locator('button:not(:disabled), a[href], input:not(:disabled), textarea:not(:disabled), select:not(:disabled)')
  assert(await controls.count() > 0, `${label}: dialog has no operable controls`)
  assert(await dialog.evaluate(node => node.contains(document.activeElement)), `${label}: dialog did not receive focus`)
  const first = controls.first()
  const last = controls.last()
  await last.focus()
  await page.keyboard.press('Tab')
  assert(await dialog.evaluate(node => node.contains(document.activeElement)), `${label}: forward Tab escaped dialog`)
  await first.focus()
  await page.keyboard.press('Shift+Tab')
  assert(await dialog.evaluate(node => node.contains(document.activeElement)), `${label}: reverse Tab escaped dialog`)
  if (close) {
    await page.keyboard.press('Escape')
    await dialog.waitFor({ state: 'hidden' })
    await twoAnimationFrames(page)
    assert(await trigger.evaluate(node => document.activeElement === node), `${label}: Escape did not restore trigger focus`)
  }
}

async function assertOneLine(locator, label) {
  const lines = await locator.evaluate(node => {
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT)
    const tops = []
    while (walker.nextNode()) {
      const text = walker.currentNode
      if (!text.textContent?.trim()) continue
      const range = document.createRange()
      range.selectNodeContents(text)
      tops.push(...[...range.getClientRects()].filter(rect => rect.width > 0 && rect.height > 0).map(rect => Math.round(rect.top)))
    }
    return [...new Set(tops)].length
  })
  assert(lines === 1, `${label}: wrapped to ${lines} lines`)
}

async function stateCapture(id, state, options = {}) {
  const contract = SCREEN_CONTRACTS[id]
  const name = options.name ?? `${id}-${state}`
  await runCase({ name, id, state, rootAttribute: contract.root, rootState: state, textScale: options.textScale ?? 1 }, async handle => {
    if (options.beforeAudit) await options.beforeAudit(handle)
    await auditFixture(handle, {
      strictLive: options.strictLive ?? true,
      messageMetadata: options.messageMetadata ?? ['09', '75', '76', '79'].includes(id),
      messagesRequired: options.messagesRequired ?? false,
      loading: options.loading ?? ['skeleton', 'booting'].includes(state),
    })
    assert(await handle.page.locator(`[${contract.root}]`).getAttribute(contract.root) === state, `${name}: exact fixture drifted before capture`)
    if (options.beforeCapture) await options.beforeCapture(handle)
    await capture(handle, name, { top: options.top ?? true })
    if (options.afterCapture) await options.afterCapture(handle)
  })
}

async function assertS77Scroll(page, label, { enlarged = false } = {}) {
  const scroller = page.locator('[data-message-actions-scroll]')
  assert(await scroller.count() === 1, `${label}: expected exactly one data-message-actions-scroll body`)
  const scrollAudit = await page.locator('[data-testid="screen-shell"]').evaluate(shell => {
    const dedicated = shell.querySelector('[data-message-actions-scroll]')
    const internal = [...shell.querySelectorAll('*')].flatMap(node => {
      const style = getComputedStyle(node)
      const scrollable = node.scrollHeight > node.clientHeight + 1 && ['auto', 'scroll'].includes(style.overflowY)
      return scrollable && node !== dedicated ? [`${node.tagName.toLowerCase()}.${String(node.className).slice(0, 80)}`] : []
    })
    const style = dedicated ? getComputedStyle(dedicated) : null
    return {
      extra: internal,
      dedicatedOverflow: style?.overflowY,
      dedicatedScrollable: Boolean(dedicated && dedicated.scrollHeight > dedicated.clientHeight + 1),
      rootFontSize: getComputedStyle(document.documentElement).fontSize,
    }
  })
  assert(scrollAudit.extra.length === 0, `${label}: extra internal scroller(s): ${scrollAudit.extra.join(' | ')}`)
  assert(['auto', 'scroll'].includes(scrollAudit.dedicatedOverflow), `${label}: dedicated body does not own vertical overflow`)
  assert(scrollAudit.dedicatedScrollable, `${label}: dedicated body has no scroll range`)
  if (enlarged) assert(Number.parseFloat(scrollAudit.rootFontSize) >= 20, `${label}: 125% text root is only ${scrollAudit.rootFontSize}`)

  const done = page.getByRole('button', { name: 'Done', exact: true })
  assert(await done.count() === 1, `${label}: one persistent Done action is required`)
  await fullyVisibleInPhone(page, done, `${label} Done at top`)
  const topY = (await done.boundingBox())?.y

  const controls = scroller.locator('button:not(:disabled), a[href], input:not(:disabled), textarea:not(:disabled), select:not(:disabled)')
  for (let index = 0; index < await controls.count(); index += 1) {
    const control = controls.nth(index)
    await control.scrollIntoViewIfNeeded()
    await fullyVisibleInPhone(page, control, `${label} scroll control ${index + 1}`)
  }
  await scroller.evaluate(node => { node.scrollTop = node.scrollHeight })
  await twoAnimationFrames(page)
  await fullyVisibleInPhone(page, done, `${label} Done at max scroll`)
  const bottomY = (await done.boundingBox())?.y
  assert(topY !== undefined && bottomY !== undefined && Math.abs(topY - bottomY) <= 1, `${label}: Done is not sticky/persistent (${topY} → ${bottomY})`)
  return { controls: await controls.count(), topY, bottomY, enlarged }
}

async function assertS99TitleAndCtas(page, label, { enlarged = false } = {}) {
  const title = page.getByRole('heading', { level: 1, name: 'WhatsApp inbox', exact: true })
  assert(await title.count() === 1, `${label}: full “WhatsApp inbox” h1 missing`)
  assert((await title.textContent())?.trim() === 'WhatsApp inbox', `${label}: title is truncated in the DOM`)
  await assertOneLine(title, `${label} title`)
  const open = page.getByRole('button', { name: 'Open WhatsApp thread', exact: true }).or(page.getByRole('link', { name: 'Open WhatsApp thread', exact: true }))
  const resume = page.getByRole('button', { name: 'Resume CIA', exact: true }).or(page.getByRole('link', { name: 'Resume CIA', exact: true }))
  assert(await open.count() === 1 && await resume.count() === 1, `${label}: balanced provider CTAs missing`)
  await assertOneLine(open, `${label} Open WhatsApp thread`)
  await assertOneLine(resume, `${label} Resume CIA`)
  const [openBox, resumeBox] = await Promise.all([open.boundingBox(), resume.boundingBox()])
  assert(openBox && resumeBox && Math.abs(openBox.height - resumeBox.height) <= 2, `${label}: provider CTAs do not share a balanced height`)
  assert(openBox.width / resumeBox.width <= 1.8 && resumeBox.width / openBox.width <= 1.8, `${label}: provider CTA widths are visually unbalanced`)
  if (enlarged) {
    const rootSize = Number.parseFloat(await page.locator('html').evaluate(node => getComputedStyle(node).fontSize))
    assert(rootSize >= 20, `${label}: enlarged-text root is ${rootSize}px`)
  }
}

async function assertPrivateUntilShared(page, label) {
  const privateItems = page.locator('[data-message-audience="private-to-you"]')
  assert(await privateItems.count() >= 1, `${label}: private CIA draft/recap is not marked private-to-you`)
}

async function assertInternalRoute(locator, expectedPath, label) {
  const href = await locator.getAttribute('href')
  assert(href && new URL(href, baseURL).pathname === expectedPath, `${label}: expected ${expectedPath}, got ${href}`)
}

async function validateStagedScreenshots() {
  const actual = fs.readdirSync(tempShotsDir).filter(file => file.endsWith('.png')).sort()
  const missing = EXPECTED_SCREENSHOTS.filter(file => !actual.includes(file))
  const unexpected = actual.filter(file => !EXPECTED_SET.has(file))
  assert(captured.size === 109, `Captured ${captured.size} screenshots; expected 109`)
  assert(actual.length === 109 && missing.length === 0 && unexpected.length === 0, `Staged screenshot mismatch. Missing: ${missing.join(', ') || 'none'}. Unexpected: ${unexpected.join(', ') || 'none'}.`)
  const evidence = actual.map(file => ({ file, ...pngGeometry(path.join(tempShotsDir, file)) }))
  for (const entry of evidence) assert(entry.width === 390 && entry.height === 844, `${entry.file}: wrong dimensions`)
  return evidence
}

function assertCapabilityContract() {
  const clipboard = capabilityEvents.filter(event => event.type === 'clipboard.writeText')
  const forbidden = capabilityEvents.filter(event => event.type !== 'clipboard.writeText')
  assert(clipboard.length === 1, `Expected exactly one intercepted local clipboard call, found ${clipboard.length}`)
  assert(clipboard[0].case === '77-success', `Clipboard call occurred in ${clipboard[0].case}, expected 77-success`)
  assert(clipboard[0].detail === 'Perfect. I added the hill loop near the reservoir.', `Clipboard payload mismatch: ${clipboard[0].detail}`)
  assert(forbidden.length === 0, `Forbidden capability event(s): ${forbidden.map(event => `${event.case}:${event.type}:${event.detail}`).join(' | ')}`)
}

function promoteScreenshots() {
  assert(unexpectedExisting.length === 0, `Unexpected prior PNG(s) in canonical directory: ${unexpectedExisting.join(', ')}`)
  const nowUnexpected = fs.readdirSync(shotsDir).filter(file => file.endsWith('.png') && !EXPECTED_SET.has(file)).sort()
  assert(nowUnexpected.length === 0, `Unexpected PNG(s) appeared before promotion: ${nowUnexpected.join(', ')}`)
  for (const file of EXPECTED_SCREENSHOTS) {
    const from = path.join(tempShotsDir, file)
    const to = path.join(shotsDir, file)
    if (fs.existsSync(to)) fs.unlinkSync(to)
    fs.renameSync(from, to)
  }
  const final = fs.readdirSync(shotsDir).filter(file => file.endsWith('.png')).sort()
  assert(final.length === 109 && final.every(file => EXPECTED_SET.has(file)), `Final screenshot directory is not the exact 109-name set`)
  for (const entry of screenshotEvidence) {
    const promoted = pngGeometry(path.join(shotsDir, entry.file))
    assert(promoted.sha256 === entry.sha256 && promoted.width === 390 && promoted.height === 844, `${entry.file}: promotion changed evidence`)
  }
}

function buildReport(status, error) {
  try { fingerprintsEnd = fingerprintAll() } catch (fingerprintError) {
    if (!error) error = fingerprintError
  }
  return {
    auditedAt: new Date().toISOString(),
    baseURL,
    command: USAGE,
    hostViewport: { width: 1440, height: 1000, deviceScaleFactor: 1 },
    phoneFrame: { width: 390, height: 844 },
    primaryReducedMotion: 'reduce',
    s11MotionContext: 'no-preference',
    navigationIsolation: {
      strategy: 'new context per case + about:blank + Chromium origin clear + cookie clear + exact query fixture + unique __b1audit nonce + two RAFs',
      contexts: caseEvidence.length,
      uniqueNonces: visitedNonces.size,
    },
    integrity: {
      start: fingerprintsStart,
      end: fingerprintsEnd,
      unchanged: sameFingerprint(fingerprintsStart, fingerprintsEnd),
    },
    expectedScreenshotCount: 109,
    expectedScreenshots: EXPECTED_SCREENSHOTS,
    screenshots: screenshotEvidence,
    screenshotPromotion: status === 'pass' ? 'promoted-after-all-assertions' : 'not-promoted',
    checks,
    cases: caseEvidence,
    consoleErrors,
    pageErrors,
    capabilityEvents,
    capabilityExpectation: { forbidden: 0, clipboardWriteText: { count: 1, case: '77-success', payload: 'Perfect. I added the hill loop near the reservoir.', intercepted: true, hostClipboardTouched: false } },
    status,
    ...(error ? { error: error instanceof Error ? error.stack || error.message : String(error) } : {}),
  }
}

function writeReport(report, stream = 'log') {
  const json = `${JSON.stringify(report, null, 2)}\n`
  fs.writeFileSync(outPath, json)
  console[stream](json.trimEnd())
}

try {
  browser = await chromium.launch(fs.existsSync(chromePath) ? { executablePath: chromePath } : {})

  // Shared Composer compatibility sentinel — an absent handler must never clear or claim a send.
  await runCase({ name: 'shared-composer-no-handler', id: '40' }, async ({ page }) => {
    const input = page.getByLabel('Message Morning crew', { exact: true })
    const send = page.getByRole('button', { name: 'Send message', exact: true })
    await input.fill('Keep this local draft')
    assert(await send.isDisabled(), 'Shared Composer: Send must be disabled when no onSend handler exists')
    assert(await input.inputValue() === 'Keep this local draft', 'Shared Composer: unavailable send cleared the draft')
    assert(await page.getByText('Message sent.', { exact: true }).count() === 0, 'Shared Composer: unavailable send announced success')
  })

  // S09 — CIA chat: exact fixtures, native search/voice dialogs and two send paths.
  for (const state of SCREEN_CONTRACTS['09'].states) {
    await stateCapture('09', state, {
      messagesRequired: ['default', 'success', 'thinking'].includes(state),
      afterCapture: state === 'default' ? async ({ page }) => {
        for (const label of ['Search conversations', 'Open voice options', 'Tell me more', 'Show missions', 'Log meal', 'Attach context', 'Start voice input', 'Send message']) {
          assert(await page.getByRole('button', { name: label, exact: true }).count() === 1, `09 default: missing ${label}`)
        }
        const input = page.getByLabel('Message CIA', { exact: true })
        assert(await input.count() === 1, '09 default: Message CIA input missing')
        assert(await page.getByRole('button', { name: 'Send message', exact: true }).isDisabled(), '09 default: empty send must be disabled')
        const voiceTrigger = page.getByRole('button', { name: 'Open voice options', exact: true })
        await voiceTrigger.click()
        const voiceDialog = page.getByRole('dialog', { name: /voice options/i })
        await assertDialogTrap(page, voiceDialog, voiceTrigger, '09 voice options')
      } : undefined,
    })
  }

  await runCase({ name: '09-search-open', id: '09', state: 'default', rootAttribute: 'data-chat-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle, { messageMetadata: true, messagesRequired: true })
    const trigger = page.getByRole('button', { name: 'Search conversations', exact: true })
    await trigger.click()
    const dialog = page.getByRole('dialog', { name: /search conversations/i })
    await assertDialogTrap(page, dialog, trigger, '09 search', { close: false })
    const search = dialog.getByRole('searchbox').or(dialog.getByRole('textbox'))
    assert(await search.count() === 1, '09 search: native search field missing')
    await targetSize(search, '09 search field')
    assert(Number.parseFloat(await search.evaluate(node => getComputedStyle(node).fontSize)) >= 16, '09 search: input must be at least 16px')
    await capture(handle, '09-search-open')
  })

  await runCase({ name: '09-suggestion-sent', id: '09', state: 'default', rootAttribute: 'data-chat-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await page.getByRole('button', { name: 'Tell me more', exact: true }).click()
    await waitAttribute(page, '[data-chat-state]', 'data-chat-state', 'success')
    await twoAnimationFrames(page)
    await auditFixture(handle, { messageMetadata: true, messagesRequired: true })
    const sent = page.locator('article[data-message-speaker="you"]').filter({ hasText: 'Tell me more' }).last()
    assert(await sent.count() === 1, '09 suggestion: member metadata bubble missing')
    assert(['sent', 'read', 'delivered'].includes(await sent.getAttribute('data-message-status')), '09 suggestion: invalid delivery truth')
    await capture(handle, '09-suggestion-sent')
  })

  await runCase({ name: '09-composer-sent', id: '09', state: 'default', rootAttribute: 'data-chat-state', rootState: 'default' }, async handle => {
    const { page } = handle
    const input = page.getByLabel('Message CIA', { exact: true })
    await input.fill('Help me steady tomorrow morning')
    const send = page.getByRole('button', { name: 'Send message', exact: true })
    assert(!(await send.isDisabled()), '09 composer: typed message did not enable Send')
    await send.click()
    await waitAttribute(page, '[data-chat-state]', 'data-chat-state', 'success')
    assert(await input.inputValue() === '', '09 composer: accepted send did not clear the draft')
    await auditFixture(handle, { messageMetadata: true, messagesRequired: true })
    await capture(handle, '09-composer-sent')
  })

  // S10 — consent-first local voice preview. No mic/STT/audio capability is allowed.
  let s10SendWidth
  const s10RecoveryStates = ['silence', 'permission-denied', 'transcription-error', 'network-error', 'max-duration', 'disabled', 'offline']
  for (const state of SCREEN_CONTRACTS['10'].states) {
    await stateCapture('10', state, {
      top: !s10RecoveryStates.includes(state),
      beforeAudit: s10RecoveryStates.includes(state) ? async ({ page }) => {
        await fullyVisibleInContent(page, page.getByTestId('voice-recovery-options'), `10 ${state} recovery auto-reveal`)
      } : undefined,
      beforeCapture: s10RecoveryStates.includes(state) ? async ({ page }) => {
        await page.getByTestId('voice-recovery-options').scrollIntoViewIfNeeded()
      } : undefined,
      afterCapture: async ({ page }) => {
        const root = page.locator('[data-voice-state]')
        const consent = await root.getAttribute('data-consent-state')
        if (state === 'consent-required') {
          assert(consent === 'required', '10 consent-required: data-consent-state must be required')
          const allow = page.getByRole('button', { name: 'Allow voice preview', exact: true })
          const decline = page.getByRole('button', { name: 'Not now', exact: true })
          assert(await allow.count() === 1 && await decline.count() === 1, '10 consent-required: equal consent choices missing')
          await equalSensitiveChoice(decline, allow, '10 voice consent')
        } else {
          assert(['granted', 'denied'].includes(consent), `10 ${state}: consent substate is ${consent}`)
        }
        const disclosure = (await page.locator('[data-testid="phone-frame"]').innerText()).replace(/\s+/g, ' ')
        assert(/raw audio/i.test(disclosure) && /not (?:stored|saved|retained)/i.test(disclosure), `10 ${state}: raw-audio non-retention truth missing`)
        if (state === 'ready') {
          s10SendWidth = (await page.getByRole('button', { name: 'Send transcript', exact: true }).boundingBox())?.width
          assert(s10SendWidth, '10 ready: Send transcript width unavailable')
          const toggle = page.getByRole('button', { name: /start (?:recording|voice preview)/i })
          assert(await toggle.count() === 1, '10 ready: recording toggle missing')
          assert(await toggle.getAttribute('aria-pressed') === 'false', '10 ready: recording toggle must begin off')
          await toggle.click()
          await waitAttributeOneOf(page, '[data-voice-state]', 'data-voice-state', ['booting', 'listening'])
        }
        if (state === 'booting') {
          const loadingAction = page.locator('button[aria-busy="true"]')
          assert(await loadingAction.count() === 1, '10 booting: one aria-busy loading action required')
          const loadingWidth = (await loadingAction.boundingBox())?.width
          assert(s10SendWidth && loadingWidth && Math.abs(s10SendWidth - loadingWidth) <= 1, `10 booting: action width changed ${s10SendWidth} → ${loadingWidth}`)
        }
        if (state === 'network-error') {
          const copy = page.getByRole('button', { name: 'Copy transcript', exact: true })
          assert(await copy.count() === 1, '10 network-error: Copy transcript missing')
          await copy.click()
        }
        if (state === 'offline') {
          const copy = page.getByRole('button', { name: 'Copy transcript', exact: true })
          assert(await copy.count() === 1, '10 offline: preserved transcript recovery action missing')
        }
        if (['permission-denied', 'transcription-error', 'network-error'].includes(state)) {
          assert(await page.getByRole('button', { name: /try (?:voice input )?again|open microphone settings preview/i }).count() >= 1, `10 ${state}: recovery action missing`)
        }
        if (state === 'success') assert(await page.getByRole('button', { name: 'Send transcript', exact: true }).isDisabled(), '10 success: Send transcript must disable after the local commit outcome')
      },
    })
  }

  await runCase({ name: '10-consent-declined', id: '10', state: 'consent-required', rootAttribute: 'data-voice-state', rootState: 'consent-required' }, async handle => {
    const { page } = handle
    await page.getByRole('button', { name: 'Not now', exact: true }).click()
    await waitAttribute(page, '[data-voice-state]', 'data-consent-state', 'denied')
    await auditFixture(handle)
    assert(/not enabled|declined|off/i.test(await page.locator('[data-voice-state]').innerText()), '10 consent declined: honest off-state feedback missing')
    const mic = page.getByRole('button', { name: 'Start voice preview', exact: true })
    assert(await mic.isDisabled(), '10 consent declined: voice preview became operable without renewed consent')
    assert(await page.getByRole('button', { name: 'Discard draft transcript before sending', exact: true }).isDisabled(), '10 consent declined: Discard draft can bypass denied consent')
    assert(await page.getByRole('button', { name: 'Send transcript', exact: true }).isDisabled(), '10 consent declined: Send transcript must remain disabled')
    await capture(handle, '10-consent-declined')
    await page.getByRole('button', { name: 'Review voice privacy', exact: true }).click()
    await waitAttribute(page, '[data-voice-state]', 'data-consent-state', 'required')
    assert(await page.locator('[data-voice-state]').getAttribute('data-voice-state') === 'consent-required', '10 consent declined: only explicit privacy review may leave denied state')
  })

  await runCase({ name: '10-transcript-sent', id: '10', state: 'listening', rootAttribute: 'data-voice-state', rootState: 'listening' }, async handle => {
    const { page } = handle
    const send = page.getByRole('button', { name: 'Send transcript', exact: true })
    assert(await send.count() === 1, '10 transcript: Send transcript missing')
    await send.click()
    await waitAttribute(page, '[data-voice-state]', 'data-voice-state', 'success')
    await auditFixture(handle)
    assert(/local|preview|not sent|CIA chat/i.test(await page.locator('[data-voice-state]').innerText()), '10 transcript: local-only send truth missing')
    await capture(handle, '10-transcript-sent')
  })

  await runCase({ name: '10-crisis-support', id: '10', state: 'ready', rootAttribute: 'data-voice-state', rootState: 'ready' }, async handle => {
    const { page } = handle
    await page.getByRole('button', { name: 'Open crisis support and safety resources', exact: true }).click()
    await page.getByText(/immediate danger|local emergency services/i).first().waitFor()
    await auditFixture(handle)
    assert(/contact local emergency services/i.test(await page.locator('[data-voice-state]').innerText()), '10 safety: local emergency guidance missing')
    await capture(handle, '10-crisis-support')
  })

  // S11 — accepted pilot controls, reduced motion and separate visibility lifecycle proof.
  const s11Case = async (name, interaction) => {
    await runCase({ name, id: '11', reducedMotion: 'reduce' }, async handle => {
      const { page } = handle
      const orb = page.locator('[data-cia-state]').first()
      assert(await orb.count() === 1, `${name}: accepted CIA orb missing`)
      assert(await orb.getAttribute('data-cia-size') === 'hero', `${name}: accepted hero size tier missing`)
      if (interaction) await interaction(handle, orb)
      const keyboardInput = page.getByLabel('Message CIA', { exact: true })
      if (await keyboardInput.count()) {
        const shellHeight = await keyboardInput.locator('..').evaluate(node => node.getBoundingClientRect().height)
        assert(shellHeight >= 44, `${name}: accepted keyboard field shell is below 44px`)
      }
      await auditFixture(handle, { strictLive: false, disabledReasons: false, acceptedS11: true })
      await capture(handle, name)
    })
  }

  await s11Case('11-default-reduced', async ({ page }, orb) => {
    assert(await orb.getAttribute('data-cia-state') === 'idle', '11 default: orb must be idle')
    assert(await page.getByRole('button', { name: 'Start voice preview', exact: true }).getAttribute('aria-pressed') === 'false', '11 default: voice preview must begin off')
    const disclosure = await page.locator('[data-testid="phone-frame"]').innerText()
    assert(/(?:never opens?|no microphone is connected|local state preview)/i.test(disclosure), '11 default: local-only microphone boundary missing')
    assert(!/microphone listening|voice is being captured/i.test(disclosure), '11 default: false microphone capture claim remains')
  })
  await s11Case('11-listening', async ({ page }, orb) => {
    await page.getByRole('button', { name: 'Start voice preview', exact: true }).click()
    await waitAttribute(page, '[data-cia-state]', 'data-cia-state', 'listening')
    assert(await page.getByRole('button', { name: 'Pause voice preview', exact: true }).getAttribute('aria-pressed') === 'true', '11 listening: pressed state missing')
    assert(await orb.getAttribute('data-cia-state') === 'listening', '11 listening: orb state missing')
    assert(/no microphone is connected/i.test(await page.locator('[data-testid="phone-frame"]').innerText()), '11 listening: active preview lacks no-microphone truth')
  })
  await s11Case('11-keyboard-focus', async ({ page }) => {
    await page.getByRole('button', { name: 'Switch to keyboard', exact: true }).click()
    const input = page.getByLabel('Message CIA', { exact: true })
    await input.waitFor()
    assert(await input.evaluate(node => document.activeElement === node), '11 keyboard: input did not receive focus')
  })
  await s11Case('11-keyboard-sent', async ({ page }) => {
    await page.getByRole('button', { name: 'Switch to keyboard', exact: true }).click()
    const input = page.getByLabel('Message CIA', { exact: true })
    await input.fill('Help me settle this thought')
    await page.getByRole('button', { name: 'Send typed message', exact: true }).click()
    await page.waitForFunction(() => [...document.querySelectorAll('[role="status"]')].some(node => node.textContent?.trim() === 'Message sent.'))
    assert(await input.inputValue() === '', '11 keyboard: sent draft did not clear')
  })
  await s11Case('11-muted', async ({ page }) => {
    await page.getByRole('button', { name: 'Mute CIA voice', exact: true }).click()
    assert(await page.getByRole('button', { name: 'Unmute CIA voice', exact: true }).getAttribute('aria-pressed') === 'true', '11 mute: pressed state missing')
  })
  await s11Case('11-support', async ({ page }) => {
    await page.getByRole('button', { name: 'Get support', exact: true }).click()
    await page.getByText(/immediate danger/i).waitFor()
  })
  await s11Case('11-closed', async ({ page }) => {
    await page.getByRole('button', { name: 'Close voice mode', exact: true }).click()
    await page.getByText('Voice mode closed.', { exact: true }).waitFor()
    assert(await page.getByRole('button', { name: 'Resume voice mode', exact: true }).count() === 1, '11 closed: Resume voice mode missing')
  })

  await runCase({ name: '11-motion-visibility', id: '11', reducedMotion: 'no-preference' }, async ({ page }) => {
    const orb = page.locator('[data-cia-state]').first()
    const active = await orb.locator('svg *').evaluateAll(nodes => nodes.filter(node => getComputedStyle(node).animationName !== 'none').length)
    assert(active > 0, '11 motion: expected an active non-reduced orb animation')
    await page.evaluate(() => {
      Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'hidden' })
      document.dispatchEvent(new Event('visibilitychange'))
    })
    await waitAttribute(page, '[data-cia-state]', 'data-cia-paused', 'true')
    const paused = await orb.locator('svg *').evaluateAll(nodes => nodes.filter(node => getComputedStyle(node).animationName !== 'none').every(node => getComputedStyle(node).animationPlayState === 'paused'))
    assert(paused, '11 motion: hidden page did not pause computed animations')
    await page.evaluate(() => {
      Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'visible' })
      document.dispatchEvent(new Event('visibilitychange'))
    })
    await page.waitForFunction(() => document.querySelector('[data-cia-state]')?.getAttribute('data-cia-paused') !== 'true')
    const resumed = await orb.locator('svg *').evaluateAll(nodes => nodes.filter(node => getComputedStyle(node).animationName !== 'none').every(node => getComputedStyle(node).animationPlayState === 'running'))
    assert(resumed, '11 motion: visible page did not resume computed animations')
    pass('S11 visibility pause/resume', { activeAnimations: active, paused, resumed })
  })

  // S51 — voice history, actionable tabs, local schedule/detail/delete/safety panels.
  for (const state of SCREEN_CONTRACTS['51'].states) {
    await stateCapture('51', state, {
      afterCapture: async ({ page }) => {
        const root = page.locator('[data-voice-history-state]')
        const tab = await root.getAttribute('data-history-tab')
        const panel = await root.getAttribute('data-history-panel')
        if (state === 'action-items') assert(tab === 'action-items', '51 action-items: tab substate mismatch')
        if (state === 'default') assert(tab === 'history' && panel === 'none', '51 default: history/none substate mismatch')
        const expectedPanel = { schedule: 'schedule', detail: 'detail', 'delete-confirmation': 'delete', safety: 'safety' }[state]
        if (expectedPanel) assert(panel === expectedPanel, `51 ${state}: panel substate mismatch`)
        if (state === 'default') {
          const history = page.getByRole('tab', { name: 'History', exact: true })
          const actions = page.getByRole('tab', { name: 'Action items', exact: true })
          assert(await history.getAttribute('aria-selected') === 'true', '51 default: History tab not selected')
          await history.focus()
          await page.keyboard.press('End')
          await waitAttribute(page, '[data-voice-history-state]', 'data-history-tab', 'action-items')
          assert(await actions.getAttribute('aria-selected') === 'true', '51 tabs: Action items did not select')
          assert(await actions.evaluate(node => document.activeElement === node), '51 tabs: End did not move focus to Action items')
          await page.keyboard.press('Home')
          await waitAttribute(page, '[data-voice-history-state]', 'data-history-tab', 'history')
          assert(await history.getAttribute('aria-selected') === 'true' && await history.evaluate(node => document.activeElement === node), '51 tabs: Home did not restore History selection and focus')
          assert(await page.getByRole('button', { name: 'Delete Quick question recording', exact: true }).count() === 0, '51 default: already-deleted Quick question exposes an operable delete action')
        }
        if (state === 'delete-confirmation') {
          const cancel = page.getByRole('button', { name: 'Cancel', exact: true })
          const destroy = page.getByRole('button', { name: /delete (?:this )?(?:call|history|record)/i }).last()
          await equalExit(cancel, destroy, '51 delete confirmation')
          assert(/Morning check-in/i.test(await page.getByRole('dialog').innerText()), '51 delete confirmation: selected session is not named')
          await destroy.click()
          await waitAttribute(page, '[data-voice-history-state]', 'data-voice-history-state', 'success')
          const rootText = await root.innerText()
          assert(/Morning check-in recording deleted/i.test(rootText), '51 delete: recording-deleted outcome missing')
          assert(!/Schedule saved/i.test(rootText), '51 delete: unrelated schedule-success copy remains')
          assert(await page.getByRole('button', { name: /Morning check-in.*Recording deleted/i }).count() === 1, '51 delete: Morning check-in row did not switch to deleted provenance')
          assert(await page.getByRole('button', { name: 'Delete Morning check-in recording', exact: true }).count() === 0, '51 delete: deleted recording still exposes Delete')
        }
        if (state === 'schedule') {
          const dialog = page.getByRole('dialog', { name: /schedule preview/i })
          assert(await dialog.count() === 1 && /preview|does not book|calendar/i.test(await dialog.innerText()), '51 schedule: local-only scheduling truth missing')
        }
        if (state === 'safety') {
          const dialog = page.getByRole('dialog', { name: /safety guidance/i })
          assert(await dialog.count() === 1 && /emergency services|immediate danger/i.test(await dialog.innerText()), '51 safety: local emergency guidance missing')
        }
      },
    })
  }

  await runCase({ name: '51-action-checked', id: '51', state: 'action-items', rootAttribute: 'data-voice-history-state', rootState: 'action-items' }, async handle => {
    const { page } = handle
    const checkbox = page.getByRole('checkbox', { name: /Review deadline boundaries/i })
    assert(await checkbox.count() === 1, '51 action items: native checkbox missing')
    assert(await checkbox.evaluate(node => node.tagName === 'INPUT' && node.getAttribute('type') === 'checkbox'), '51 action items: expected native input[type=checkbox]')
    assert(!(await checkbox.isChecked()), '51 action items: fixture must begin unchecked')
    await checkbox.check()
    assert(await checkbox.isChecked(), '51 action items: checkbox did not persist local checked state')
    await auditFixture(handle)
    await capture(handle, '51-action-checked')
  })

  // S74 — conversations hub, filters/routes and focus-managed compose.
  for (const state of SCREEN_CONTRACTS['74'].states) {
    await stateCapture('74', state, {
      afterCapture: async ({ page }) => {
        const root = page.locator('[data-conversations-state]')
        if (!['empty', 'skeleton'].includes(state)) {
          const rootText = await root.innerText()
          assert(/bundled signals/i.test(rootText) && /bundled fixture|cached fixture/i.test(rootText), `74 ${state}: signal source is not qualified as a fixture at the point of claim`)
          assert(!/live signals|synced just now/i.test(rootText), `74 ${state}: visual-only signal copy still implies live sync`)
        }
        if (state === 'default') {
          const phone = page.locator('[data-testid="phone-frame"]')
          assert(await root.getAttribute('data-conversations-filter') === 'all', '74 default: all filter missing')
          const aisha = phone.getByRole('link', { name: /Aisha/i })
          const group = phone.getByRole('link', { name: /Iron Clinic|Morning crew/i }).first()
          const room = phone.getByRole('link', { name: /Run Club|room/i }).first()
          const voice = phone.getByRole('link', { name: /voice/i }).first()
          assert(await aisha.count() === 1, '74 default: Aisha route missing')
          await assertInternalRoute(aisha, '/screens/75', '74 Aisha')
          assert(await group.count() === 1 && await room.count() === 1, '74 default: group/room routes missing')
          await assertInternalRoute(group, '/screens/76', '74 group')
          await assertInternalRoute(room, '/screens/76', '74 room')
          if (await voice.count()) await assertInternalRoute(voice, '/screens/11', '74 voice')
          const allFilter = page.getByRole('tab', { name: 'All', exact: true })
          const roomsFilter = page.getByRole('tab', { name: 'Rooms', exact: true })
          await allFilter.focus()
          await page.keyboard.press('End')
          await waitAttribute(page, '[data-conversations-state]', 'data-conversations-filter', 'rooms')
          assert(await roomsFilter.getAttribute('aria-selected') === 'true' && await roomsFilter.evaluate(node => document.activeElement === node), '74 filters: End did not select/focus Rooms')
          await page.keyboard.press('Home')
          await waitAttribute(page, '[data-conversations-state]', 'data-conversations-filter', 'all')
          assert(await allFilter.getAttribute('aria-selected') === 'true' && await allFilter.evaluate(node => document.activeElement === node), '74 filters: Home did not restore All')
          const searchTrigger = phone.getByLabel('Search conversations', { exact: true })
          await searchTrigger.focus()
          const searchDialog = page.getByRole('dialog', { name: /search conversations/i })
          await assertDialogTrap(page, searchDialog, searchTrigger, '74 search')
          const composeTrigger = page.getByRole('button', { name: 'Start a new conversation', exact: true })
          await composeTrigger.click()
          const composeDialog = page.getByRole('dialog', { name: /new conversation|start a conversation/i })
          await assertDialogTrap(page, composeDialog, composeTrigger, '74 compose')
        }
        if (state === 'search') {
          const search = page.getByRole('searchbox', { name: /search conversations/i }).or(page.getByRole('textbox', { name: /search conversations/i }))
          assert(await search.count() === 1, '74 search: native search field missing')
        }
        if (state === 'compose') assert(await page.getByRole('dialog', { name: /new conversation|start a conversation/i }).count() === 1, '74 compose: dialog missing')
        if (state === 'offline') {
          assert(/cached|stale/i.test(await root.innerText()), '74 offline: cached/stale truth missing')
          const compose = page.getByRole('button', { name: 'Start a new conversation', exact: true })
          assert(await compose.isDisabled(), '74 offline: compose must be disabled')
          const searchTrigger = page.getByLabel('Search conversations', { exact: true })
          await searchTrigger.focus()
          const searchDialog = page.getByRole('dialog', { name: /search conversations/i })
          await assertDialogTrap(page, searchDialog, searchTrigger, '74 offline search')
          assert(await root.getAttribute('data-conversations-state') === 'offline', '74 offline: closing search lost the cached offline base state')
          assert(/cached|stale/i.test(await root.innerText()), '74 offline: stale-data banner did not survive overlay close')
        }
        if (state === 'disabled') {
          const safety = page.getByRole('button', { name: 'Safety and crisis guidance', exact: true })
          assert(await safety.isEnabled(), '74 disabled: safety is promised reachable but disabled')
          await safety.click()
          const safetyDialog = page.getByRole('dialog', { name: /safety and crisis guidance/i })
          await assertDialogTrap(page, safetyDialog, safety, '74 disabled safety')
          assert(await root.getAttribute('data-conversations-state') === 'disabled', '74 disabled: closing safety lost the disabled base state')
        }
      },
    })
  }

  await runCase({ name: '74-filter-people', id: '74', state: 'default', rootAttribute: 'data-conversations-state', rootState: 'default' }, async handle => {
    const { page } = handle
    const people = page.getByRole('tab', { name: 'People', exact: true })
    await people.click()
    await waitAttribute(page, '[data-conversations-state]', 'data-conversations-filter', 'people')
    assert(await people.getAttribute('aria-selected') === 'true', '74 filter: People was not selected')
    await auditFixture(handle)
    await capture(handle, '74-filter-people')
  })

  // S75 — human-first direct chat, private CIA assistance and explicit delivery truth.
  for (const state of SCREEN_CONTRACTS['75'].states) {
    await stateCapture('75', state, {
      messagesRequired: state === 'default',
      top: state !== 'error',
      beforeAudit: state === 'error' ? async ({ page }) => {
        await fullyVisibleInContent(page, page.locator('article[data-message-id="you-local-outgoing"]'), '75 error auto-reveal')
      } : undefined,
      beforeCapture: state === 'error' ? async ({ page }) => {
        await page.locator('article[data-message-id="you-local-outgoing"]').scrollIntoViewIfNeeded()
      } : undefined,
      afterCapture: async ({ page }) => {
        const root = page.locator('[data-direct-chat-state]')
        if (state === 'default') {
          for (const label of ['Call', 'Info', 'Pace', 'Shared', 'Private', 'Insert draft', 'Share health source', 'Attach context', 'Send message']) {
            assert(await page.getByRole('button', { name: label, exact: true }).count() === 1, `75 default: missing ${label}`)
          }
          assert(await page.getByLabel('Message Aisha', { exact: true }).count() === 1, '75 default: native Message Aisha field missing')
          await page.getByRole('button', { name: 'Call', exact: true }).click()
          assert(/unavailable|visual preview|no call/i.test(await root.innerText()), '75 Call: local-unavailable feedback missing')
          await page.getByRole('button', { name: 'Private', exact: true }).click()
          assert(await page.getByRole('button', { name: 'Private', exact: true }).getAttribute('aria-pressed') === 'true', '75 assist: Private mode did not select')
          await page.getByRole('button', { name: 'Insert draft', exact: true }).click()
          assert((await page.getByLabel('Message Aisha', { exact: true }).inputValue()).trim().length > 0, '75 assist: Insert draft did not preserve an editable draft')
          await assertPrivateUntilShared(page, '75 assist')
          const actionsRoute = page.getByRole('link', { name: /message actions/i }).or(page.getByRole('button', { name: /message actions/i })).first()
          assert(await actionsRoute.count() === 1, '75 default: native message-actions path missing')
          await assertInternalRoute(actionsRoute, '/screens/77', '75 message actions')
        }
        if (state === 'offline') assert(/offline/i.test(await root.innerText()), '75 offline: offline truth missing')
        if (state === 'error') assert(await page.getByRole('button', { name: 'Retry sending', exact: true }).count() === 1, '75 error: Retry sending missing')
        if (state === 'assist-revoked') {
          assert(/revoked/i.test(await root.innerText()), '75 assist-revoked: reason missing')
          assert(await page.getByLabel('Message Aisha', { exact: true }).isEnabled(), '75 assist-revoked: human chat must remain enabled')
        }
        if (state === 'blocked') assert(await page.getByLabel('Message Aisha', { exact: true }).isDisabled(), '75 blocked: composer must be disabled')
      },
    })
  }

  await runCase({ name: '75-health-share-confirm', id: '75', state: 'default', rootAttribute: 'data-direct-chat-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle, { messageMetadata: true, messagesRequired: true })
    const trigger = page.getByRole('button', { name: 'Share health source', exact: true })
    const before = await page.locator('article[data-message-audience]:not([data-message-audience="private-to-you"])').count()
    await trigger.click()
    let dialog = page.getByRole('dialog', { name: /share health source|health source/i })
    await dialog.waitFor()
    assert(/source|freshness|audience/i.test(await dialog.innerText()), '75 health share: scope/source/freshness/audience disclosure missing')
    await fullyVisibleInPhone(page, dialog, '75 health share dialog')
    await assertDialogTrap(page, dialog, trigger, '75 health share')
    await trigger.click()
    dialog = page.getByRole('dialog', { name: /share health source|health source/i })
    await dialog.waitFor()
    const cancel = dialog.getByRole('button', { name: 'Cancel', exact: true })
    const share = dialog.getByRole('button', { name: /share (?:with )?Aisha|confirm share/i })
    await equalSensitiveChoice(cancel, share, '75 health share')
    assert(await page.locator('article[data-message-audience]:not([data-message-audience="private-to-you"])').count() === before, '75 health share: context became peer-visible before confirmation')
    await capture(handle, '75-health-share-confirm')
  })

  await runCase({ name: '75-online-sent', id: '75', state: 'default', rootAttribute: 'data-direct-chat-state', rootState: 'default' }, async handle => {
    const { page } = handle
    const input = page.getByLabel('Message Aisha', { exact: true })
    await input.fill('Hill session at seven works for me')
    await page.getByRole('button', { name: 'Send message', exact: true }).click()
    const delivery = await waitAttributeOneOf(page, '[data-direct-chat-state]', 'data-delivery-state', ['sent', 'read'])
    assert(await input.inputValue() === '', '75 online send: accepted draft did not clear')
    const sent = page.locator('article[data-message-speaker="you"]').filter({ hasText: 'Hill session at seven works for me' })
    assert(await sent.count() === 1 && ['sent', 'read'].includes(await sent.getAttribute('data-message-status')), '75 online send: complete sent/read metadata missing')
    assert(await sent.getAttribute('data-message-audience') === 'you and Aisha', '75 online send: delivered message lacks the peer audience')
    await fullyVisibleInContent(page, sent, '75 online send auto-reveal')
    await auditFixture(handle, { messageMetadata: true, messagesRequired: true })
    await sent.scrollIntoViewIfNeeded()
    await capture(handle, '75-online-sent', { top: false })
    pass('S75 optimistic delivery', { delivery })
  })

  await runCase({ name: '75-offline-queued', id: '75', state: 'offline', rootAttribute: 'data-direct-chat-state', rootState: 'offline' }, async handle => {
    const { page } = handle
    const input = page.getByLabel('Message Aisha', { exact: true })
    await input.fill('Keep this until I am back online')
    await page.getByRole('button', { name: 'Send message', exact: true }).click()
    await waitAttribute(page, '[data-direct-chat-state]', 'data-delivery-state', 'queued')
    const queued = page.locator('article[data-message-status="queued"]').filter({ hasText: 'Keep this until I am back online' })
    assert(await queued.count() === 1, '75 offline send: explicit queued metadata missing')
    assert(await queued.getAttribute('data-message-audience') === 'private-to-you', '75 offline send: queued draft falsely claims peer visibility')
    assert(/intended for Aisha/i.test(await queued.getAttribute('data-message-source') ?? ''), '75 offline send: intended destination is not recorded separately')
    await fullyVisibleInContent(page, queued, '75 offline queued auto-reveal')
    await auditFixture(handle, { messageMetadata: true, messagesRequired: true })
    await queued.scrollIntoViewIfNeeded()
    await capture(handle, '75-offline-queued', { top: false })
  })

  // S76 — group audience, explicit recap posting and deterministic send truth.
  for (const state of SCREEN_CONTRACTS['76'].states) {
    await stateCapture('76', state, {
      messagesRequired: ['default', 'success'].includes(state),
      top: !['error', 'success'].includes(state),
      beforeAudit: ['error', 'success'].includes(state) ? async ({ page }) => {
        await fullyVisibleInContent(page, page.locator('article[data-message-id="you-local-group-outgoing"]'), `76 ${state} auto-reveal`)
      } : undefined,
      beforeCapture: ['error', 'success'].includes(state) ? async ({ page }) => {
        await page.locator('article[data-message-id="you-local-group-outgoing"]').scrollIntoViewIfNeeded()
      } : undefined,
      afterCapture: async ({ page }) => {
        const root = page.locator('[data-group-chat-state]')
        if (state === 'default') {
          for (const label of ['Add member', 'Group info', 'Attach context', 'Mention a member', 'Send message', 'Open private CIA recap', 'Open group tempo mission']) {
            assert(await page.getByRole('button', { name: label, exact: true }).count() === 1, `76 default: missing ${label}`)
          }
          assert(await page.getByRole('button', { name: /Bundled presence fixture: 5 members, 4 shown online; not live/i }).count() === 1, '76 default: qualified member presence control missing')
          assert(/4 online · fixture/i.test(await root.innerText()) && /120 group XP · fixture/i.test(await root.innerText()), '76 default: social presence/XP claims lack point-of-claim fixture truth')
          assert(await page.getByLabel('Message Morning crew', { exact: true }).count() === 1, '76 default: native group composer missing')
          const actionsRoute = page.getByRole('link', { name: /message actions/i }).or(page.getByRole('button', { name: /message actions/i })).first()
          assert(await actionsRoute.count() === 1, '76 default: native message-actions path missing')
          await assertInternalRoute(actionsRoute, '/screens/77', '76 message actions')
        }
        if (state === 'offline') {
          const input = page.getByLabel('Message Morning crew', { exact: true })
          await input.fill('Queue the warm-up note')
          await page.getByRole('button', { name: 'Send message', exact: true }).click()
          await waitAttribute(page, '[data-group-chat-state]', 'data-send-state', 'queued')
          const queued = page.locator('article[data-message-status="queued"]')
          assert(await queued.count() >= 1, '76 offline: explicit queued message missing')
          assert(await queued.first().getAttribute('data-message-audience') === 'private-to-you', '76 offline: queued draft falsely claims group visibility')
          assert(/intended for Morning crew/i.test(await queued.first().getAttribute('data-message-source') ?? ''), '76 offline: intended group destination is not recorded separately')
          await fullyVisibleInContent(page, queued.first(), '76 offline queued auto-reveal')
        }
        if (state === 'disabled') assert(await page.getByLabel('Message Morning crew', { exact: true }).isDisabled(), '76 disabled: moderated composer must be disabled')
        if (state === 'error') assert(await page.getByRole('button', { name: 'Retry sending', exact: true }).count() === 1, '76 error: Retry sending missing')
        if (state === 'success') {
          const sent = page.locator('article[data-message-id="you-local-group-outgoing"][data-message-status="sent"]')
          assert(await sent.count() === 1 && /lower trail gate/i.test(await sent.innerText()), '76 success: no concrete sent outcome is rendered')
          assert(await sent.getAttribute('data-message-audience') === 'Morning crew · 5 members', '76 success: sent outcome lacks explicit group audience')
        }
        assert(!/posted recap|shared recap/i.test(await root.innerText()) || state === 'success', `76 ${state}: recap implies sharing without consent`)
      },
    })
  }

  await runCase({ name: '76-members-sheet', id: '76', state: 'default', rootAttribute: 'data-group-chat-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle, { messageMetadata: true, messagesRequired: true })
    const trigger = page.getByRole('button', { name: /Bundled presence fixture: 5 members, 4 shown online; not live/i })
    await trigger.click()
    const region = page.getByRole('region', { name: /Morning crew members/i })
    await region.waitFor()
    assert(/5 members|4 online/i.test(await region.innerText()), '76 members: member/online truth missing')
    await region.scrollIntoViewIfNeeded()
    await capture(handle, '76-members-sheet', { top: false })
  })

  await runCase({ name: '76-recap-consent', id: '76', state: 'default', rootAttribute: 'data-group-chat-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle, { messageMetadata: true, messagesRequired: true })
    await page.getByRole('button', { name: 'Open private CIA recap', exact: true }).click()
    const dialog = page.getByRole('region', { name: /Post CIA recap/i })
    await dialog.waitFor()
    await assertPrivateUntilShared(page, '76 recap')
    assert(/private|only you/i.test(await dialog.innerText()), '76 recap: private-before-post disclosure missing')
    const cancel = dialog.getByRole('button', { name: 'Cancel', exact: true })
    const post = dialog.getByRole('button', { name: 'Post recap', exact: true })
    assert(await post.count() === 1, '76 recap: explicit Post recap missing')
    await equalSensitiveChoice(cancel, post, '76 recap posting consent')
    await dialog.scrollIntoViewIfNeeded()
    await capture(handle, '76-recap-consent', { top: false })
    const recap = page.locator('article[data-message-id="cia-private-recap"]')
    await post.click()
    await page.waitForFunction(() => document.querySelector('article[data-message-id="cia-private-recap"]')?.getAttribute('data-message-audience') !== 'private-to-you')
    assert(await recap.getAttribute('data-message-audience') !== 'private-to-you', '76 recap: explicit post did not change audience')
  })

  await runCase({ name: '76-group-action-confirm', id: '76', state: 'default', rootAttribute: 'data-group-chat-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle, { messageMetadata: true, messagesRequired: true })
    await page.getByRole('button', { name: 'Group info', exact: true }).click()
    const leave = page.locator('button[aria-haspopup="dialog"]').filter({ hasText: 'Leave Morning crew' })
    assert(await leave.count() === 1, '76 group action: Leave Morning crew trigger missing')
    await leave.scrollIntoViewIfNeeded()
    assert(await leave.getAttribute('aria-haspopup') === 'dialog', '76 group action: trigger does not disclose its dialog')
    await leave.click()
    let dialog = page.getByRole('dialog', { name: /confirm leave Morning crew/i })
    await dialog.waitFor()
    await fullyVisibleInPhone(page, dialog, '76 group-action dialog')
    assert(await leave.getAttribute('aria-expanded') === 'true' && await leave.getAttribute('aria-controls') === 'group-action-dialog', '76 group action: trigger does not expose expanded/controlled state')
    await equalSensitiveChoice(dialog.getByRole('button', { name: 'Cancel', exact: true }), dialog.getByRole('button', { name: 'Confirm', exact: true }), '76 group action confirmation')
    await capture(handle, '76-group-action-confirm', { top: false })
    await assertDialogTrap(page, dialog, leave, '76 group action')
    assert(await leave.getAttribute('aria-expanded') === 'false', '76 group action: expanded state survived Escape')
    await leave.click()
    dialog = page.getByRole('dialog', { name: /confirm leave Morning crew/i })
    await dialog.waitFor()
    await dialog.getByRole('button', { name: 'Confirm', exact: true }).click()
    await dialog.waitFor({ state: 'detached' })
    assert(/confirmed locally.*No server state changed/i.test(await page.locator('[data-group-chat-state]').innerText()), '76 group action: local-only confirmation outcome missing')
    assert(await page.locator('[data-group-chat-state]').getAttribute('data-group-chat-state') === 'default', '76 group action: confirmation mutated the base fixture')
  })

  await runCase({ name: '76-online-sent', id: '76', state: 'default', rootAttribute: 'data-group-chat-state', rootState: 'default' }, async handle => {
    const { page } = handle
    const input = page.getByLabel('Message Morning crew', { exact: true })
    await input.fill('Meet at the lower trail gate')
    await page.getByRole('button', { name: 'Send message', exact: true }).click()
    await waitAttributeOneOf(page, '[data-group-chat-state]', 'data-send-state', ['sent'])
    const sent = page.locator('article[data-message-speaker="you"]').filter({ hasText: 'Meet at the lower trail gate' })
    assert(await sent.count() === 1 && await sent.getAttribute('data-message-status') === 'sent', '76 online send: complete sent metadata missing')
    await fullyVisibleInContent(page, sent, '76 online send auto-reveal')
    await auditFixture(handle, { messageMetadata: true, messagesRequired: true })
    await sent.scrollIntoViewIfNeeded()
    await capture(handle, '76-online-sent', { top: false })
  })

  // S77 — sole internal sheet scroller, persistent Done, local Copy and equal destructive exit.
  for (const state of SCREEN_CONTRACTS['77'].states) {
    await stateCapture('77', state, {
      messageMetadata: false,
      beforeAudit: state === 'success' ? async ({ page }) => {
        const copy = page.getByRole('button', { name: 'Copy', exact: true })
        await copy.scrollIntoViewIfNeeded()
        await copy.click()
        await waitAttribute(page, '[data-message-actions-state]', 'data-message-actions-state', 'success')
      } : undefined,
      afterCapture: async ({ page }) => {
        const done = page.getByRole('button', { name: 'Done', exact: true })
        assert(await done.count() === 1 && !(await done.isDisabled()), `77 ${state}: persistent Done missing`)
        if (state === 'default') {
          assert(await page.locator('[data-message-actions-state]').getAttribute('data-reaction') === 'none', '77 default: reaction must begin at none')
          for (const label of ['Useful', 'Support', 'Done reaction', 'Insight', 'Pin', 'Star', 'Copy', 'Forward, off for this thread', 'Report message', 'Mute or block sender', 'Export thread data', 'Revoke CIA summary', 'Remove from my view']) {
            assert(await page.getByRole('button', { name: label, exact: true }).count() === 1, `77 default: missing ${label}`)
          }
          const attachment = page.locator('[data-attachment-source][data-attachment-retention]')
          assert(await attachment.count() >= 1, '77 default: selected hill attachment provenance missing')
          assert(await page.getByAltText('Dusk trail rising along a quiet ridge', { exact: true }).count() === 1, '77 default: canonical hill attachment/alt missing')
          await assertS77Scroll(page, '77 default')
          await resetScrollRecursively(page)
          await page.getByRole('button', { name: 'Useful', exact: true }).click()
          await waitAttribute(page, '[data-message-actions-state]', 'data-reaction', 'useful')
          assert(await page.getByRole('button', { name: 'Useful', exact: true }).getAttribute('aria-pressed') === 'true', '77 default: reaction pressed state missing')
        }
        if (state === 'empty') {
          assert(await page.locator('[data-attachment-source], img[alt="Dusk trail rising along a quiet ridge"]').count() === 0, '77 empty: selected media must not render')
          for (const label of ['Useful', 'Support', 'Done reaction', 'Insight', 'Pin', 'Star', 'Copy', 'Report message', 'Mute or block sender', 'Export thread data', 'Revoke CIA summary', 'Remove from my view']) {
            assert(await page.getByRole('button', { name: label, exact: true }).isDisabled(), `77 empty: ${label} remains operable without a selected message`)
          }
        }
        if (state === 'error') {
          const errorOutcome = page.locator('[data-message-actions-state]').getByText(/message no longer available|message unavailable|message deleted/i).first()
          assert(await errorOutcome.count() === 1 && await errorOutcome.isVisible(), '77 error: surviving error outcome missing')
          await page.locator('[data-message-actions-scroll]').evaluate(node => { node.scrollTop = node.scrollHeight })
          await twoAnimationFrames(page)
          assert(await errorOutcome.count() === 1, '77 error: outcome did not survive max scroll')
          await fullyVisibleInPhone(page, done, '77 error Done')
        }
        if (state === 'offline') {
          await page.getByRole('button', { name: 'Useful', exact: true }).click()
          await waitAttribute(page, '[data-message-actions-state]', 'data-reaction', 'useful')
          assert(/queued locally/i.test(await page.locator('[data-message-actions-state]').innerText()), '77 offline: queued reaction truth missing')
        }
        if (state === 'success') assert(/copied|deleted|saved|updated|success/i.test(await page.locator('[data-message-actions-state]').innerText()), '77 success: local outcome missing')
      },
    })
  }

  await runCase({ name: '77-default-bottom', id: '77', state: 'default', rootAttribute: 'data-message-actions-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const evidence = await assertS77Scroll(page, '77 default bottom')
    await capture(handle, '77-default-bottom', { top: false })
    pass('S77 max-scroll reachability', evidence)
  })

  await runCase({ name: '77-delete-confirm', id: '77', state: 'default', rootAttribute: 'data-message-actions-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const trigger = page.getByRole('button', { name: 'Remove from my view', exact: true })
    await trigger.scrollIntoViewIfNeeded()
    await trigger.click()
    let dialog = page.getByRole('dialog', { name: /remove from my view/i })
    await assertDialogTrap(page, dialog, trigger, '77 delete confirmation')
    await trigger.scrollIntoViewIfNeeded()
    await trigger.click()
    dialog = page.getByRole('dialog', { name: /remove from my view/i })
    await dialog.waitFor()
    const cancel = dialog.getByRole('button', { name: 'Cancel', exact: true })
    const destroy = dialog.getByRole('button', { name: 'Remove locally', exact: true })
    await equalExit(cancel, destroy, '77 delete confirmation')
    assert(/selected Aisha message|local view only|does not delete the sender/i.test(await dialog.innerText()), '77 remove: exact peer/local scope missing')
    await capture(handle, '77-delete-confirm')
    await destroy.click()
    await dialog.waitFor({ state: 'hidden' })
    await page.getByText(/message no longer available|hidden from your local view/i).first().waitFor()
    assert(/hidden from (?:this|your) local view|message no longer available/i.test(await page.locator('[data-message-actions-state]').innerText()), '77 remove: local-hidden outcome did not survive')
    await page.locator('[data-message-actions-scroll]').evaluate(node => { node.scrollTop = node.scrollHeight })
    await twoAnimationFrames(page)
    assert(/hidden from (?:this|your) local view|message no longer available/i.test(await page.locator('[data-message-actions-state]').innerText()), '77 remove: local-hidden outcome did not survive max scroll')
    await fullyVisibleInPhone(page, page.getByRole('button', { name: 'Done', exact: true }), '77 deleted Done')
  })

  await runCase({ name: '77-enlarged-bottom', id: '77', state: 'default', rootAttribute: 'data-message-actions-state', rootState: 'default', textScale: 1.25 }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const evidence = await assertS77Scroll(page, '77 enlarged bottom', { enlarged: true })
    await capture(handle, '77-enlarged-bottom', { top: false })
    pass('S77 125% text reachability', evidence)
  })

  // S79 — transcript provenance, native/reversible action items and local privacy/schedule controls.
  for (const state of SCREEN_CONTRACTS['79'].states) {
    await stateCapture('79', state, {
      messagesRequired: ['default', 'partial', 'success'].includes(state),
      afterCapture: async ({ page }) => {
        const root = page.locator('[data-call-summary-state]')
        if (state === 'default') {
          for (const label of ['Check resting HRV tomorrow', 'Adjust pre-workout nutrition', 'Log wind-down time before 10 pm']) {
            const checkbox = page.getByRole('checkbox', { name: label, exact: true })
            assert(await checkbox.count() === 1, `79 default: native checkbox “${label}” missing`)
          }
          assert(await page.getByRole('button', { name: 'Voice privacy controls', exact: true }).count() === 1, '79 default: Voice privacy controls missing')
          assert(await page.getByRole('button', { name: /Tone 72, warm/i }).count() === 1, '79 default: native tone control missing')
          assert(await page.getByRole('button', { name: 'Review CIA evidence', exact: true }).count() === 1, '79 default: CIA evidence expander missing')
          assert(await page.getByRole('button', { name: 'Schedule follow-up call', exact: true }).count() === 1, '79 default: follow-up action missing')
          for (const [topic, duration] of [['Recovery', '5m'], ['Pace', '3m'], ['Fueling', '4m']]) {
            assert(await page.getByRole('button', { name: new RegExp(`^${topic}.*${duration}$`, 'i') }).count() === 1, `79 default: ${topic} topic segment missing`)
          }
          const pace = page.getByRole('button', { name: /^Pace.*3m$/i })
          await pace.click()
          assert(await pace.getAttribute('aria-pressed') === 'true', '79 topics: Pace did not select')
          const tone = page.getByRole('button', { name: /Tone 72, warm/i })
          await tone.click()
          assert(await tone.getAttribute('aria-expanded') === 'true', '79 tone: control did not expand')
          assert(/how it was estimated|interpretive fixture/i.test(await root.innerText()), '79 tone: estimate disclosure did not expand')
          const evidence = page.getByRole('button', { name: 'Review CIA evidence', exact: true })
          await evidence.click()
          assert(await evidence.getAttribute('aria-expanded') === 'true', '79 CIA evidence: control did not expand')
          assert(/freshness and confidence are not connected/i.test(await root.innerText()), '79 CIA evidence: source disclosure did not expand')
          await page.getByRole('button', { name: 'Schedule follow-up call', exact: true }).click()
          assert(/No calendar or provider request/i.test(await root.innerText()), '79 follow-up: local-only schedule truth missing')
        }
        if (state === 'partial') {
          const partialText = await root.innerText()
          assert(/partial|unavailable|not captured/i.test(partialText), '79 partial: partial-data truth missing')
          assert(!/3 items|CIA-detected|15%/i.test(partialText), '79 partial: transcript-derived metric claims remain visible')
          assert(await page.getByRole('checkbox').count() === 0, '79 partial: transcript-derived action checkboxes remain operable')
          assert(await page.getByRole('button', { name: /^(Recovery|Pace|Fueling)/i }).count() === 0, '79 partial: transcript-derived topic controls remain operable')
          assert(await page.getByRole('button', { name: 'Schedule follow-up call', exact: true }).isDisabled(), '79 partial: follow-up remains active without transcript-derived actions')
          assert(/Action items pending|No actions.*derived/i.test(partialText), '79 partial: explicit pending-action outcome missing')
        }
        if (state === 'offline') assert(/offline|cached/i.test(await root.innerText()), '79 offline: offline truth missing')
        if (state === 'error') assert(await page.getByRole('button', { name: 'Retry', exact: true }).count() === 1, '79 error: Retry missing')
      },
    })
  }

  await runCase({ name: '79-privacy-panel', id: '79', state: 'default', rootAttribute: 'data-call-summary-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle, { messageMetadata: true, messagesRequired: true })
    await page.getByRole('button', { name: 'Voice privacy controls', exact: true }).click()
    const panel = page.getByRole('region', { name: 'Voice privacy controls', exact: true })
    await panel.waitFor()
    assert(/transcript|retention|delete|raw audio/i.test(await panel.innerText()), '79 privacy: transcript/retention/delete truth missing')
    await capture(handle, '79-privacy-panel')
  })

  await runCase({ name: '79-action-checked', id: '79', state: 'default', rootAttribute: 'data-call-summary-state', rootState: 'default' }, async handle => {
    const { page } = handle
    const checkbox = page.getByRole('checkbox', { name: 'Check resting HRV tomorrow', exact: true })
    const initialCountText = await page.locator('[data-call-summary-state]').innerText()
    await checkbox.check()
    assert(await checkbox.isChecked(), '79 action: checked state missing')
    const checkedText = await page.locator('[data-call-summary-state]').innerText()
    assert(checkedText !== initialCountText && /1\s*(?:of|\/)\s*3|1 complete/i.test(checkedText), '79 action: derived completion count missing')
    assert(/Fitness.*XP|XP.*Fitness/i.test(checkedText), '79 action: Fitness-only XP feedback missing')
    assert(!/(?:Nutrition|Sleep).*XP|XP.*(?:Nutrition|Sleep)/i.test(checkedText), '79 action: XP leaked outside the Fitness action')
    await auditFixture(handle, { messageMetadata: true, messagesRequired: true })
    await checkbox.scrollIntoViewIfNeeded()
    await capture(handle, '79-action-checked', { top: false })
    await checkbox.uncheck()
    assert(!(await checkbox.isChecked()), '79 action: checkbox is not reversible')
    const reverted = await page.locator('[data-call-summary-state]').innerText()
    assert(!/1\s*(?:of|\/)\s*3|1 complete/i.test(reverted), '79 action: derived count did not reverse')
  })

  // S99 — provider-neutral visual fixture, local warnings, balanced enlarged CTAs.
  for (const state of SCREEN_CONTRACTS['99'].states) {
    await stateCapture('99', state, {
      afterCapture: async ({ page }) => {
        const root = page.locator('[data-whatsapp-state]')
        if (state === 'default') {
          await assertS99TitleAndCtas(page, '99 default')
          for (const label of ['Settings and privacy', 'Manage WhatsApp', 'Open WhatsApp thread', 'Resume CIA', 'Revoke access', 'Delete history', 'Data sources', 'Retention', 'Export']) {
            const control = page.getByRole('button', { name: label, exact: true }).or(page.getByRole('link', { name: label, exact: true }))
            assert(await control.count() === 1, `99 default: missing ${label}`)
          }
          for (const direction of ['Inbound', 'Outbound', 'Template']) {
            const row = page.getByRole('button', { name: new RegExp(`^${direction}:.*(?:Today|Scheduled preview).*(?:Status:)`, 'i') })
            assert(await row.count() === 1, `99 default: ${direction} row lacks direction/time/delivery name`)
          }
          assert(/visual (?:fixture|preview)|no live sync|not connected/i.test(await root.innerText()), '99 default: visual-only provider boundary missing')
          const manage = page.getByRole('button', { name: 'Manage WhatsApp', exact: true }).or(page.getByRole('link', { name: 'Manage WhatsApp', exact: true }))
          await manage.click()
          let handoff = page.getByRole('dialog', { name: /external provider unavailable/i })
          await handoff.waitFor()
          assert(/unavailable|cannot launch|no external app/i.test(await handoff.innerText()), '99 Manage: warning/local-unavailable feedback missing')
          await fullyVisibleInPhone(page, handoff, '99 Manage provider dialog')
          await assertDialogTrap(page, handoff, manage, '99 Manage provider dialog')
          await manage.click()
          handoff = page.getByRole('dialog', { name: /external provider unavailable/i })
          await handoff.waitFor()
          await handoff.getByRole('button', { name: 'Continue preview', exact: true }).click()
          assert(/provider unavailable|no external app/i.test(await root.innerText()), '99 Manage: local unavailable outcome missing')
          const open = page.getByRole('button', { name: 'Open WhatsApp thread', exact: true }).or(page.getByRole('link', { name: 'Open WhatsApp thread', exact: true }))
          await open.click()
          handoff = page.getByRole('dialog', { name: /external provider unavailable/i })
          await handoff.waitFor()
          await fullyVisibleInPhone(page, handoff, '99 Open thread dialog')
          await assertDialogTrap(page, handoff, open, '99 Open thread dialog')
          const revoke = page.getByRole('button', { name: 'Revoke access', exact: true })
          await revoke.click()
          let revokeDialog = page.getByRole('dialog', { name: /revoke linked-channel access/i })
          await revokeDialog.waitFor()
          await fullyVisibleInPhone(page, revokeDialog, '99 revoke dialog')
          await assertDialogTrap(page, revokeDialog, revoke, '99 revoke confirmation')
          await revoke.click()
          revokeDialog = page.getByRole('dialog', { name: /revoke linked-channel access/i })
          await revokeDialog.waitFor()
          await equalExit(revokeDialog.getByRole('button', { name: 'Cancel', exact: true }), revokeDialog.getByRole('button', { name: 'Revoke access', exact: true }), '99 revoke confirmation')
          await revokeDialog.getByRole('button', { name: 'Cancel', exact: true }).click()
        }
        if (state === 'error') assert(await page.getByRole('button', { name: 'Retry sync', exact: true }).count() === 1, '99 error: Retry sync missing')
        if (state === 'outside-window') assert(/24.hour|outside.*window/i.test(await root.innerText()), '99 outside-window: reply-window truth missing')
        if (state === 'revoked') {
          assert(!/\+\d/.test(await root.innerText()), '99 revoked: linked provider number must not remain')
          for (const label of ['Manage WhatsApp', 'Open WhatsApp thread', 'Resume CIA', 'Revoke access', 'Delete history']) {
            assert(await page.getByRole('button', { name: label, exact: true }).isDisabled(), `99 revoked: ${label} remains operable without enrollment/history`)
          }
        }
      },
    })
  }

  await runCase({ name: '99-delete-confirm', id: '99', state: 'default', rootAttribute: 'data-whatsapp-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const trigger = page.getByRole('button', { name: 'Delete history', exact: true })
    await trigger.click()
    let dialog = page.getByRole('dialog', { name: /delete history|delete imported history/i })
    await assertDialogTrap(page, dialog, trigger, '99 delete confirmation')
    await trigger.click()
    dialog = page.getByRole('dialog', { name: /delete history|delete imported history/i })
    await dialog.waitFor()
    const cancel = dialog.getByRole('button', { name: 'Cancel', exact: true })
    const destroy = dialog.getByRole('button', { name: /delete (?:imported )?history/i })
    await equalExit(cancel, destroy, '99 delete confirmation')
    assert(/messages|media|templates|imported/i.test(await dialog.innerText()), '99 delete: affected-data scope missing')
    await capture(handle, '99-delete-confirm')
    await destroy.click()
    await waitAttribute(page, '[data-whatsapp-state]', 'data-whatsapp-state', 'success')
    assert(/deleted in this local outcome preview|no storage or provider state changed/i.test(await page.locator('[data-whatsapp-state]').innerText()), '99 delete: local-only deleted outcome missing')
    assert(await page.getByRole('button', { name: /^Inbound:/i }).count() === 0, '99 delete: imported rows survived the local deleted outcome')
  })

  await runCase({ name: '99-enlarged-default', id: '99', state: 'default', rootAttribute: 'data-whatsapp-state', rootState: 'default', textScale: 1.25 }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    await assertS99TitleAndCtas(page, '99 enlarged default', { enlarged: true })
    await capture(handle, '99-enlarged-default')
  })

  screenshotEvidence = await validateStagedScreenshots()
  assert(consoleErrors.length === 0, `Console errors: ${consoleErrors.map(item => `${item.case}:${item.text}`).join(' | ')}`)
  assert(pageErrors.length === 0, `Page errors: ${pageErrors.map(item => `${item.case}:${item.text}`).join(' | ')}`)
  assertCapabilityContract()
  fingerprintsEnd = fingerprintAll()
  assert(sameFingerprint(fingerprintsStart, fingerprintsEnd), 'Product/API/authority fingerprint drifted during verification')
  assert(visitedNonces.size === caseEvidence.length && caseEvidence.length === 111, `Expected 111 isolated contexts/nonces (109 captures + S11 motion + shared Composer sentinel), found ${caseEvidence.length}/${visitedNonces.size}`)
  promoteScreenshots()
  pass('atomic screenshot set', { count: screenshotEvidence.length, dimensions: '390x844', hashes: screenshotEvidence.length, promotedAfterPass: true })
  pass('source integrity', { product: fingerprintsEnd.product.digest, api: fingerprintsEnd.api.digest, authority: fingerprintsEnd.authority.digest })
  pass('capability boundary', { forbidden: 0, clipboardWriteText: 1, clipboardCase: '77-success', exactPayload: true, hostClipboardTouched: false })
  writeReport(buildReport('pass'))
} catch (error) {
  try {
    const staged = fs.readdirSync(tempShotsDir).filter(file => file.endsWith('.png')).sort()
    screenshotEvidence = staged.map(file => ({ file, ...pngGeometry(path.join(tempShotsDir, file)) }))
  } catch { /* Preserve the primary failure. */ }
  writeReport(buildReport('fail', error), 'error')
  process.exitCode = 1
} finally {
  if (browser) await browser.close()
  fs.rmSync(tempShotsDir, { recursive: true, force: true })
}
