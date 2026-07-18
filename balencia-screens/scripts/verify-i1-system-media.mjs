import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import sharp from 'sharp'

sharp.cache(false)
sharp.concurrency(1)

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const repo = path.resolve(root, '..')
const [baseURL, outArg, shotsArg] = process.argv.slice(2)

if (!baseURL || !outArg || !shotsArg) {
  throw new Error('Usage: node scripts/verify-i1-system-media.mjs <baseURL> <out-json> <shots-dir>')
}

const origin = new URL(baseURL)
if (origin.hostname !== 'localhost' || origin.port !== '3002') {
  throw new Error('I1 acceptance requires localhost:3002 production')
}

const outPath = path.resolve(root, outArg)
const shotsDir = path.resolve(root, shotsArg)
const candidateDir = `${shotsDir}.candidate`
const states = {
  67: [
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
  ],
  69: [
    'default-neutral',
    'rating-1',
    'rating-3',
    'rating-5',
    'choice-neutral',
    'public-review-confirm',
    'private-feedback',
    'feedback-ready',
    'feedback-error',
    'feedback-success',
    'not-now',
    'suppressed',
    'data-controls',
  ],
  81: [
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
  ],
  85: [
    'default',
    'blocker-time-accepted',
    'blocker-food-dismissed',
    'blocker-recovery-dismissed',
    'undo-restored',
    'detail-time',
    'detail-food',
    'detail-recovery',
    'data-controls',
    'dependencies',
    'plan-review',
    'plan-success',
    'plan-error',
    'skeleton',
    'empty',
    'offline',
    'disabled-consent',
    'safety-support',
  ],
  98: [
    'catalog',
    'offline',
    'maintenance',
    'forbidden',
    'unauthorized',
    'coming-soon',
    'cache-skeleton',
    'cache-empty',
    'retrying',
    'retry-success',
    'disabled',
    'support',
    'data-controls',
    'capability-matrix',
  ],
}

const queryCases = Object.entries(states).flatMap(([id, list]) =>
  list.map(state => ({ id, state, name: `${id}-${state}`, kind: 'query' })),
)
const s80Cases = ['default', 'seek-focus', 'privacy', 'provider-cta'].map(view => ({
  id: '80',
  state: view,
  name: `80-${view}`,
  kind: 'accepted-sentinel',
}))
const cases = [...queryCases, ...s80Cases]
const textCases = [
  { id: '67', state: 'data-controls', name: '67-text-scale-proof', mode: 'root-text' },
  { id: '69', state: 'default-neutral', name: '69-text-scale-proof', mode: 'root-text' },
  { id: '80', state: null, name: '80-text-scale-proof', mode: 'accepted-css-zoom-waiver' },
  { id: '81', state: 'external-confirm', name: '81-text-scale-proof', mode: 'root-text' },
  { id: '85', state: 'plan-review', name: '85-text-scale-proof', mode: 'root-text' },
  { id: '98', state: 'data-controls', name: '98-text-scale-proof', mode: 'root-text' },
]

if (queryCases.length !== 76 || s80Cases.length !== 4 || cases.length !== 80 || textCases.length !== 6) {
  throw new Error(`Frozen I1 matrix drift: ${queryCases.length}+${s80Cases.length}+${textCases.length}`)
}

const modalStates = {
  67: new Set(['share-warning', 'data-controls', 'delete-confirm', 'report-confirm']),
  69: new Set(states[69].filter(state => !['not-now', 'suppressed'].includes(state))),
  81: new Set(['featured-playing', 'hip-reset-resume', 'webinar-playing', 'external-confirm', 'data-controls']),
  85: new Set(['detail-time', 'detail-food', 'detail-recovery', 'data-controls', 'dependencies', 'plan-review', 'safety-support']),
  98: new Set(['support', 'data-controls', 'capability-matrix']),
}

const transitionAllowlist = new Set([
  '67-default',
  '67-comparison',
  '67-decrypt-error',
  '67-offline',
  '67-share-warning',
  '67-data-controls',
  '67-delete-confirm',
  '67-report-confirm',
  '67-disabled-consent',
  '69-default-neutral',
  '69-rating-1',
  '69-rating-3',
  '69-rating-5',
  '69-choice-neutral',
  '69-public-review-confirm',
  '69-private-feedback',
  '69-feedback-ready',
  '69-feedback-error',
  '69-not-now',
  '69-suppressed',
  '69-data-controls',
  '80-seek-focus',
  '81-default-mobility',
  '81-filter-focus',
  '81-filter-webinars',
  '81-filter-saved',
  '81-search-results',
  '81-search-empty',
  '81-error-cached',
  '81-featured-playing',
  '81-hip-reset-resume',
  '81-webinar-playing',
  '81-unavailable',
  '81-external-confirm',
  '81-data-controls',
  '85-default',
  '85-blocker-time-accepted',
  '85-blocker-food-dismissed',
  '85-blocker-recovery-dismissed',
  '85-undo-restored',
  '85-detail-time',
  '85-data-controls',
  '85-dependencies',
  '85-plan-review',
  '85-plan-success',
  '85-plan-error',
  '85-safety-support',
  '98-offline',
  '98-retrying',
  '98-support',
  '98-data-controls',
])

const DIALOG_FOCUSABLE = 'button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

if ([...transitionAllowlist].some(name => !cases.some(test => test.name === name))) {
  throw new Error('Frozen I1 transition allowlist drift')
}

const productFiles = [
  'src/components/hifi/screens/system/I1TextScaleScope.tsx',
  'src/components/hifi/screens/system/S67ImageViewer.tsx',
  'src/components/hifi/screens/system/S69AppRating.tsx',
  'src/components/hifi/screens/system/S80MusicCoach.tsx',
  'src/components/hifi/screens/system/S81VideoLibrary.tsx',
  'src/components/hifi/screens/system/S85ObstacleCoach.tsx',
  'src/components/hifi/screens/system/S98SystemStates.tsx',
]

const apiFiles = [
  'package.json',
  'package-lock.json',
  'next.config.ts',
  'src/app/screens/[id]/page.tsx',
  'src/components/hifi/HifiPrototype.tsx',
  'src/components/hifi/screens/registry.ts',
  'src/components/hifi/screens/system/index.ts',
  'scripts/verify-i1-system-media.mjs',
]

function filesUnder(relativeDir) {
  const absoluteDir = path.resolve(root, relativeDir)
  if (!fs.existsSync(absoluteDir)) return []
  const rows = []
  const visit = absolute => {
    for (const entry of fs.readdirSync(absolute, { withFileTypes: true })) {
      const child = path.join(absolute, entry.name)
      if (entry.isDirectory()) visit(child)
      else if (entry.isFile()) rows.push(path.relative(root, child))
    }
  }
  visit(absoluteDir)
  return rows
}

const productionInputFiles = [
  ...filesUnder('src'),
  ...filesUnder('public'),
  'package.json',
  'package-lock.json',
  'next.config.ts',
  'postcss.config.mjs',
  'tsconfig.json',
]
  .filter(file => fs.existsSync(path.resolve(root, file)))
  .sort()

const h1Evidence = 'plans/batches/VISUAL-014-H1-social-community/evidence/h1-acceptance-final-v4.json'
const h1Additions = 'plans/batches/VISUAL-015-I1-system-media/evidence/ACCEPTED-H1-ADDITIONS-BEFORE.sha256'
const expectedAcceptedDigest = '8616b67d6b2977d8c141838f41e4cb9bd7ee680faf346ec6c9bac84e5415ab05'
const acceptedS80 = 'balencia-screens/src/components/hifi/screens/system/S80MusicCoach.tsx'
const acceptedS80Hash = '250fe435013c40a7060b3c91f49be39f5328c213095323c1d2072d3100fc38fb'
const acceptedAsset = 'public/hifi-assets/HIFI-80-01-music-coach.png'
const acceptedAssetHash = '01a6aa68730a7492a71f175c7fe6f0e5292ed0628347fcc66e28b9e1adefa465'

const sha = value => crypto.createHash('sha256').update(value).digest('hex')

function fingerprint(files, base = root) {
  const rows = files.map(file => ({ path: file, sha256: sha(fs.readFileSync(path.resolve(base, file))) }))
  return {
    digest: sha(Buffer.from(rows.map(row => `${row.sha256}  ${row.path}`).join('\n'))),
    files: rows,
  }
}

function acceptedFingerprint() {
  const prior = JSON.parse(fs.readFileSync(path.resolve(repo, h1Evidence), 'utf8'))
  const rows = (prior?.integrity?.start?.accepted?.files ?? []).map(row => ({ ...row }))
  const seen = new Set()

  for (const row of rows) {
    if (!/^[a-f0-9]{64}$/.test(row.sha256) || typeof row.path !== 'string') throw new Error('Malformed inherited sentinel')
    if (seen.has(row.path)) throw new Error(`Duplicate inherited sentinel: ${row.path}`)
    seen.add(row.path)
  }

  const additions = fs.readFileSync(path.resolve(repo, h1Additions), 'utf8').trim().split('\n')
  for (const line of additions) {
    const match = line.match(/^([a-f0-9]{64})  (.+)$/)
    if (!match) throw new Error(`Malformed H1 sentinel: ${line}`)
    if (seen.has(match[2])) throw new Error(`Duplicate accepted sentinel: ${match[2]}`)
    seen.add(match[2])
    rows.push({ sha256: match[1], path: match[2] })
  }

  if (rows.length !== 100) throw new Error(`Accepted union must be 100, got ${rows.length}`)
  if (!rows.some(row => row.path === acceptedS80 && row.sha256 === acceptedS80Hash)) {
    throw new Error('Accepted S80 sentinel missing from 100-file union')
  }
  for (const row of rows) {
    if (sha(fs.readFileSync(path.resolve(repo, row.path))) !== row.sha256) {
      throw new Error(`Accepted sentinel drift: ${row.path}`)
    }
  }
  const digest = sha(Buffer.from(rows.map(row => `${row.sha256}  ${row.path}`).join('\n')))
  if (digest !== expectedAcceptedDigest) throw new Error(`Accepted union digest drift: ${digest}`)
  return { digest, files: rows }
}

const result = {
  auditedAt: new Date().toISOString(),
  baseURL,
  phoneFrame: { width: 390, height: 844 },
  expectedContexts: 86,
  expectedScreenshots: 80,
  expectedTransitionCases: transitionAllowlist.size,
  checks: [],
  cases: [],
  screenshots: [],
  deterministicReplays: [],
  textScaleCases: [],
  transitionCases: [],
  focusRestorations: [],
  waivers: [{ id: 'W-TRUNC-80', scope: 'Accepted S80 sentinel uses CSS zoom evidence; physical Dynamic Type/root reflow remains waived.' }],
  consoleErrors: [],
  pageErrors: [],
  capabilityEvents: [],
  externalRequests: [],
  browserIsolation: [],
  status: 'fail',
}

function check(ok, label, evidence = null) {
  result.checks.push({ label, ok: Boolean(ok), evidence })
  if (!ok) throw new Error(label)
}

async function launchBrowser() {
  const chromePath = process.env.PLAYWRIGHT_CHROME_PATH
  if (chromePath) {
    if (!fs.existsSync(chromePath)) throw new Error(`PLAYWRIGHT_CHROME_PATH does not exist: ${chromePath}`)
    return chromium.launch({ executablePath: chromePath })
  }
  if (process.env.PLAYWRIGHT_CHANNEL) return chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL })
  return chromium.launch()
}

async function addGuards(context) {
  await context.addInitScript(
    ({ allowedOrigin }) => {
      const events = []
      Object.defineProperty(window, '__i1Events', { value: events })
      const record = (type, detail = '') => events.push({ type, detail: String(detail) })
      const reject = type => (...args) => {
        record(type, args[0] ?? '')
        return Promise.reject(new Error(`${type} blocked`))
      }
      const nativeFetch = fetch.bind(window)
      window.fetch = (...args) => {
        const request = args[0]
        const url = new URL(request instanceof Request ? request.url : String(request), location.href)
        const method = String(args[1]?.method ?? (request instanceof Request ? request.method : 'GET')).toUpperCase()
        if (url.origin === allowedOrigin) {
          if (/^\/api(?:\/|$)/.test(url.pathname)) {
            record('same-origin-api-fetch', `${method} ${url.href}`)
            return Promise.reject(new Error('same-origin API fetch blocked'))
          }
          if (!['GET', 'HEAD'].includes(method)) {
            record('same-origin-mutation-fetch', `${method} ${url.href}`)
            return Promise.reject(new Error('same-origin mutation fetch blocked'))
          }
          return nativeFetch(...args)
        }
        return reject('fetch')(...args)
      }
      const nativeOpen = XMLHttpRequest.prototype.open
      XMLHttpRequest.prototype.open = function (method, url, ...rest) {
        const parsed = new URL(String(url), location.href)
        const normalized = String(method).toUpperCase()
        if (parsed.origin === allowedOrigin) {
          if (/^\/api(?:\/|$)/.test(parsed.pathname)) {
            record('same-origin-api-xhr', `${normalized} ${parsed.href}`)
            throw new Error('same-origin API xhr blocked')
          }
          if (!['GET', 'HEAD'].includes(normalized)) {
            record('same-origin-mutation-xhr', `${normalized} ${parsed.href}`)
            throw new Error('same-origin mutation xhr blocked')
          }
          return nativeOpen.call(this, method, url, ...rest)
        }
        record('xhr', `${normalized} ${parsed.href}`)
        throw new Error('xhr blocked')
      }
      window.WebSocket = class {
        constructor(url) { record('websocket', url); throw new Error('websocket blocked') }
      }
      window.EventSource = class {
        constructor(url) { record('eventsource', url); throw new Error('eventsource blocked') }
      }
      window.Worker = class {
        constructor(url) { record('worker', url); throw new Error('worker blocked') }
      }
      window.SharedWorker = class {
        constructor(url) { record('shared-worker', url); throw new Error('shared-worker blocked') }
      }
      window.open = (...args) => { record('window-open', args[0] ?? ''); return null }
      if (navigator.sendBeacon) navigator.sendBeacon = (...args) => { record('beacon', args[0]); return false }
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition = () => record('geolocation')
        navigator.geolocation.watchPosition = () => { record('geolocation-watch'); return 0 }
      }
      if (navigator.mediaDevices) navigator.mediaDevices.getUserMedia = reject('media')
      if (window.HTMLMediaElement) window.HTMLMediaElement.prototype.play = reject('media-play')
      if ('Audio' in window) {
        window.Audio = class {
          constructor(src) { record('audio-constructor', src ?? ''); throw new Error('audio blocked') }
        }
      }
      if (navigator.share) navigator.share = reject('share')
      if (navigator.clipboard) navigator.clipboard.writeText = reject('clipboard')
      if (navigator.credentials) navigator.credentials.get = reject('credentials')
      if (navigator.vibrate) navigator.vibrate = (...args) => { record('vibration', args); return false }
      if ('PaymentRequest' in window) {
        window.PaymentRequest = class {
          constructor() { record('payment'); throw new Error('payment blocked') }
        }
      }
      if ('Notification' in window) {
        window.Notification = class {
          constructor() { record('notification'); throw new Error('notification blocked') }
          static requestPermission() { record('notification-permission'); return Promise.resolve('denied') }
        }
      }
      const nativeInputClick = HTMLInputElement.prototype.click
      HTMLInputElement.prototype.click = function (...args) {
        if (this.type === 'file') { record('file-picker'); return }
        return nativeInputClick.apply(this, args)
      }
      document.addEventListener('click', event => {
        const anchor = event.target instanceof Element ? event.target.closest('a') : null
        if (!anchor) return
        const target = new URL(anchor.href, location.href)
        if (target.origin !== allowedOrigin || anchor.hasAttribute('download')) {
          record('external-navigation', target.href)
          event.preventDefault()
          event.stopImmediatePropagation()
        }
      }, true)
    },
    { allowedOrigin: origin.origin },
  )
}

async function settle(page) {
  await page.locator('[data-testid="phone-frame"]').waitFor({ state: 'visible', timeout: 30_000 })
  await page.addStyleTag({
    content: '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}::-webkit-scrollbar{display:none!important}',
  })
  await page.evaluate(async () => {
    await document.fonts.ready
    await Promise.all([...document.images].map(async image => {
      if (!image.complete) {
        await new Promise(resolve => {
          image.addEventListener('load', resolve, { once: true })
          image.addEventListener('error', resolve, { once: true })
        })
      }
      if (image.decode) await image.decode().catch(() => undefined)
    }))
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(resolve))))
  })
  await page.waitForTimeout(350)
}

async function auditLayout(page, test) {
  const evidence = await page.locator('[data-testid="phone-frame"]').evaluate(phone => {
    const frame = phone.getBoundingClientRect()
    const rendered = element => {
      const rect = element.getBoundingClientRect()
      const style = getComputedStyle(element)
      return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden' && !element.closest('[hidden],[aria-hidden="true"],[inert]')
    }
    const intersectsFrame = element => {
      const rect = element.getBoundingClientRect()
      return rect.right > frame.left + 1 && rect.left < frame.right - 1 && rect.bottom > frame.top + 1 && rect.top < frame.bottom - 1
    }
    const hasScrollableAncestor = element => {
      for (let parent = element.parentElement; parent && parent !== phone; parent = parent.parentElement) {
        const style = getComputedStyle(parent)
        if (/(?:auto|scroll)/.test(style.overflowY) && parent.scrollHeight > parent.clientHeight + 1) return true
      }
      return false
    }
    const name = element => element.getAttribute('aria-label')
      || element.getAttribute('title')
      || element.textContent?.trim()
      || ('labels' in element ? [...element.labels].map(label => label.textContent?.trim()).join(' ') : '')
    const target = element => {
      if (element instanceof HTMLInputElement && ['checkbox', 'radio'].includes(element.type)) {
        const label = element.closest('label') || element.labels?.[0]
        if (label && rendered(label)) return label
      }
      return element
    }
    const controls = [...phone.querySelectorAll('button,a,input,select,textarea,[role="button"],[role="switch"],[role="tab"],[role="radio"]')].filter(rendered)
    const fields = [...phone.querySelectorAll('input,textarea,select')].filter(element => {
      if (!rendered(element)) return false
      return !(element instanceof HTMLInputElement) || ['text', 'search', 'email', 'password', 'tel', 'url', 'number'].includes(element.type)
    })
    const bottomAction = phone.querySelector('[data-testid="screen-bottom-action"]')?.getBoundingClientRect() ?? null
    const tabBar = phone.querySelector('[data-testid="tab-bar"]')?.getBoundingClientRect() ?? null
    const home = phone.querySelector('[data-testid="home-indicator"]')?.getBoundingClientRect() ?? null
    const overlaps = (a, b) => Boolean(a && b && a.left < b.right - 1 && a.right > b.left + 1 && a.top < b.bottom - 1 && a.bottom > b.top + 1)
    return {
      frame: { width: Math.round(frame.width), height: Math.round(frame.height) },
      overflow: Math.max(phone.scrollWidth - phone.clientWidth, document.documentElement.scrollWidth - document.documentElement.clientWidth),
      small: controls.map(element => {
        const rect = target(element).getBoundingClientRect()
        return { name: name(element), width: rect.width, height: rect.height }
      }).filter(item => item.width < 43.5 || item.height < 43.5),
      unnamed: controls.filter(element => !name(element)).length,
      smallFields: fields.map(element => ({ name: name(element), fontSize: parseFloat(getComputedStyle(element).fontSize) })).filter(item => item.fontSize < 16),
      nested: phone.querySelectorAll('button button,button a,a button,a a,label button,label a').length,
      unreachable: controls
        .filter(element => !intersectsFrame(element) && !hasScrollableAncestor(element))
        .map(element => ({ name: name(element), rect: element.getBoundingClientRect().toJSON() })),
      wrongCoach: /\b(?:SIA|Sia|Cia)\b/.test(phone.innerText),
      bottomOverlap: overlaps(bottomAction, tabBar) || overlaps(bottomAction, home),
      activeDialogs: [...phone.querySelectorAll('[role="dialog"]')].filter(rendered).length,
    }
  })

  check(evidence.frame.width === 390 && evidence.frame.height === 844, `${test.name}: phone 390x844`, evidence.frame)
  check(evidence.overflow <= 1, `${test.name}: no horizontal overflow`, evidence.overflow)
  check(evidence.small.length === 0, `${test.name}: visible controls >=44px`, evidence.small)
  check(evidence.unnamed === 0, `${test.name}: visible controls named`, evidence.unnamed)
  check(evidence.smallFields.length === 0, `${test.name}: text fields >=16px`, evidence.smallFields)
  check(evidence.nested === 0, `${test.name}: no nested interactives`, evidence.nested)
  check(evidence.unreachable.length === 0, `${test.name}: no rendered control is unreachable outside the phone`, evidence.unreachable)
  check(!evidence.wrongCoach, `${test.name}: coach naming is CIA`)
  check(!evidence.bottomOverlap, `${test.name}: bottom action clears nav and home indicator`)

  if (test.id !== '80') {
    const expectsDialog = modalStates[test.id]?.has(test.state) ?? false
    check(evidence.activeDialogs === (expectsDialog ? 1 : 0), `${test.name}: exact active dialog count`, evidence.activeDialogs)
  }
}

async function auditFocusStyle(page, test) {
  const dialog = page.getByRole('dialog')
  const focusRoot = (await dialog.count()) === 1 ? dialog : page.locator('[data-testid="phone-frame"]')
  const candidate = focusRoot.locator('button:not([disabled]):visible, a[href]:visible, input:not([disabled]):visible, textarea:not([disabled]):visible, select:not([disabled]):visible').first()
  if ((await candidate.count()) === 0) return
  await candidate.focus()
  const proof = await candidate.evaluate(element => {
    const style = getComputedStyle(element)
    const parent = element.parentElement ? getComputedStyle(element.parentElement) : null
    return {
      outlineStyle: style.outlineStyle,
      outlineWidth: style.outlineWidth,
      boxShadow: style.boxShadow,
      parentBoxShadow: parent?.boxShadow ?? 'none',
    }
  })
  const visible = (proof.outlineStyle !== 'none' && parseFloat(proof.outlineWidth) > 0)
    || proof.boxShadow !== 'none'
    || proof.parentBoxShadow !== 'none'
  check(visible, `${test.name}: keyboard focus is visibly branded`, proof)
}

async function collectTextBaseline(page, ignoredAttribute) {
  return page.locator('[data-testid="phone-frame"]').evaluate((phone, ignored) => {
    const rows = []
    const visible = element => {
      const rect = element.getBoundingClientRect()
      const style = getComputedStyle(element)
      return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden' && !element.closest(`[${ignored}],.sr-only,[hidden]`)
    }
    const clipped = element => {
      const style = getComputedStyle(element)
      return (element.clientWidth > 0 && element.scrollWidth - element.clientWidth > 1)
        || (element.clientHeight > 0 && element.scrollHeight - element.clientHeight > 1 && ['hidden', 'clip'].includes(style.overflowY))
    }
    for (const element of [phone, ...phone.querySelectorAll('*')]) {
      if (!visible(element)) continue
      const direct = [...element.childNodes].some(node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim())
      if (!direct && !['INPUT', 'SELECT', 'TEXTAREA'].includes(element.tagName)) continue
      const style = getComputedStyle(element)
      const fontSize = parseFloat(style.fontSize)
      if (!Number.isFinite(fontSize) || fontSize <= 0) continue
      const lineHeight = parseFloat(style.lineHeight)
      const id = `i1-scale-${rows.length}`
      element.setAttribute('data-i1-scale-proof', id)
      rows.push({
        id,
        fontSize,
        lineHeight: Number.isFinite(lineHeight) && lineHeight > 0 ? lineHeight : null,
        clipped: clipped(element),
        text: element.textContent?.trim().replace(/\s+/g, ' ').slice(0, 100) ?? '',
      })
    }
    return { rootSize: parseFloat(getComputedStyle(document.documentElement).fontSize), rows }
  }, ignoredAttribute)
}

async function rootTextScaleProof(page) {
  const baseline = await collectTextBaseline(page, 'data-i1-scale-ignore')
  await page.evaluate(rootSize => document.documentElement.style.setProperty('font-size', `${rootSize * 1.25}px`, 'important'), baseline.rootSize)
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
  return page.locator('[data-testid="phone-frame"]').evaluate((phone, before) => {
    const clipped = element => {
      const style = getComputedStyle(element)
      return (element.clientWidth > 0 && element.scrollWidth - element.clientWidth > 1)
        || (element.clientHeight > 0 && element.scrollHeight - element.clientHeight > 1 && ['hidden', 'clip'].includes(style.overflowY))
    }
    const rows = before.rows.map(row => {
      const element = phone.querySelector(`[data-i1-scale-proof="${row.id}"]`)
      const style = element ? getComputedStyle(element) : null
      const fontSize = style ? parseFloat(style.fontSize) : 0
      const lineHeight = style ? parseFloat(style.lineHeight) : 0
      return {
        ...row,
        fontSizeAfter: fontSize,
        fontRatio: fontSize / row.fontSize,
        lineHeightAfter: lineHeight,
        lineHeightRatio: row.lineHeight ? lineHeight / row.lineHeight : null,
        clippedAfter: element ? clipped(element) : true,
      }
    })
    const fixed = rows.filter(row => row.fontRatio < 1.249 || row.fontRatio > 1.251)
    const fixedLine = rows.filter(row => row.lineHeightRatio !== null && (row.lineHeightRatio < 1.249 || row.lineHeightRatio > 1.251))
    const newlyClipped = rows.filter(row => !row.clipped && row.clippedAfter)
    const rootAfter = parseFloat(getComputedStyle(document.documentElement).fontSize)
    const frame = phone.getBoundingClientRect()
    const rendered = element => {
      const rect = element.getBoundingClientRect()
      const style = getComputedStyle(element)
      return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden' && !element.closest('[hidden],[aria-hidden="true"],[inert]')
    }
    const intersectsFrame = element => {
      const rect = element.getBoundingClientRect()
      return rect.right > frame.left + 1 && rect.left < frame.right - 1 && rect.bottom > frame.top + 1 && rect.top < frame.bottom - 1
    }
    const hasScrollableAncestor = element => {
      for (let parent = element.parentElement; parent && parent !== phone; parent = parent.parentElement) {
        const style = getComputedStyle(parent)
        if (/(?:auto|scroll)/.test(style.overflowY) && parent.scrollHeight > parent.clientHeight + 1) return true
      }
      return false
    }
    const controls = [...phone.querySelectorAll('button,a,input,select,textarea,[role="button"],[role="switch"],[role="tab"],[role="radio"]')].filter(rendered)
    const unreachableControls = controls
      .filter(element => !intersectsFrame(element) && !hasScrollableAncestor(element))
      .map(element => element.getAttribute('aria-label') || element.textContent?.trim() || element.tagName)
    const bottomAction = phone.querySelector('[data-testid="screen-bottom-action"]')?.getBoundingClientRect() ?? null
    const tabBar = phone.querySelector('[data-testid="tab-bar"]')?.getBoundingClientRect() ?? null
    const home = phone.querySelector('[data-testid="home-indicator"]')?.getBoundingClientRect() ?? null
    const overlaps = (a, b) => Boolean(a && b && a.left < b.right - 1 && a.right > b.left + 1 && a.top < b.bottom - 1 && a.bottom > b.top + 1)
    const dialog = [...phone.querySelectorAll('[role="dialog"]')].find(rendered)
    return {
      mode: 'root-text',
      rootBefore: before.rootSize,
      rootAfter,
      rootRatio: rootAfter / before.rootSize,
      measured: rows.length,
      fixedCount: fixed.length,
      fixed: fixed.slice(0, 20),
      fixedLineCount: fixedLine.length,
      fixedLine: fixedLine.slice(0, 20),
      newlyClippedCount: newlyClipped.length,
      newlyClipped: newlyClipped.slice(0, 20),
      horizontalOverflow: Math.max(phone.scrollWidth - phone.clientWidth, document.documentElement.scrollWidth - document.documentElement.clientWidth),
      bottomOverlap: overlaps(bottomAction, tabBar) || overlaps(bottomAction, home),
      unreachableControlCount: unreachableControls.length,
      unreachableControls: unreachableControls.slice(0, 20),
      dialogHorizontalOverflow: dialog ? dialog.scrollWidth - dialog.clientWidth : 0,
    }
  }, baseline)
}

async function browserZoomProof(page) {
  const baseline = await page.locator('[data-testid="phone-frame"]').evaluate(phone => {
    const rows = []
    for (const element of phone.querySelectorAll('*')) {
      const direct = [...element.childNodes].some(node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim())
      const rect = element.getBoundingClientRect()
      const style = getComputedStyle(element)
      if (!direct || rect.width <= 0 || rect.height <= 0 || style.display === 'none' || style.visibility === 'hidden' || element.closest('.sr-only,[hidden]')) continue
      const id = `i1-zoom-${rows.length}`
      element.setAttribute('data-i1-zoom-proof', id)
      rows.push({ id, height: rect.height, width: rect.width, text: element.textContent?.trim().replace(/\s+/g, ' ').slice(0, 100) ?? '' })
    }
    const frame = phone.getBoundingClientRect()
    return { frame: { width: frame.width, height: frame.height }, rows }
  })
  await page.locator('[data-testid="phone-frame"]').evaluate(phone => { phone.style.zoom = '1.25' })
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
  return page.locator('[data-testid="phone-frame"]').evaluate((phone, before) => {
    const frame = phone.getBoundingClientRect()
    const rows = before.rows.map(row => {
      const element = phone.querySelector(`[data-i1-zoom-proof="${row.id}"]`)
      const rect = element?.getBoundingClientRect()
      return { ...row, heightRatio: rect ? rect.height / row.height : 0, widthRatio: rect ? rect.width / row.width : 0 }
    })
    const failed = rows.filter(row => row.heightRatio < 1.249 || row.heightRatio > 1.251)
    return {
      mode: 'browser-zoom-accepted-sentinel',
      frameWidthRatio: frame.width / before.frame.width,
      frameHeightRatio: frame.height / before.frame.height,
      measured: rows.length,
      fixedCount: failed.length,
      fixed: failed.slice(0, 20),
      internalOverflow: phone.scrollWidth - phone.clientWidth,
    }
  }, baseline)
}

function validScaleProof(proof) {
  if (proof.mode === 'browser-zoom-accepted-sentinel') {
    return proof.frameWidthRatio >= 1.249 && proof.frameWidthRatio <= 1.251
      && proof.frameHeightRatio >= 1.249 && proof.frameHeightRatio <= 1.251
      && proof.measured >= 10
      && proof.fixedCount <= 2
      && proof.internalOverflow <= 1
  }
  return proof.rootRatio >= 1.249 && proof.rootRatio <= 1.251
    && proof.measured >= 10
    && proof.fixedCount === 0
    && proof.fixedLineCount === 0
    && proof.newlyClippedCount === 0
    && proof.horizontalOverflow <= 1
    && !proof.bottomOverlap
    && proof.unreachableControlCount === 0
    && proof.dialogHorizontalOverflow <= 1
}

async function prepareView(page, test) {
  if (test.name === '80-seek-focus') {
    await page.locator('#music-playback-position').focus()
  } else if (test.name === '80-privacy') {
    await page.getByText('Listening data', { exact: true }).scrollIntoViewIfNeeded()
  } else if (test.name === '80-provider-cta') {
    await page.getByRole('button', { name: /Manage Spotify connection and permissions/i }).scrollIntoViewIfNeeded()
    await page.getByRole('button', { name: /Manage Spotify connection and permissions/i }).focus()
  }
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
}

async function captureDeterministic(page, test, index) {
  await prepareView(page, test)
  const phone = page.locator('[data-testid="phone-frame"]')
  const first = await phone.screenshot({ animations: 'disabled' })
  const replayBrowser = await launchBrowser()
  let replay
  let second
  try {
    replay = await createIsolatedPage(replayBrowser, { ...test, name: `${test.name}-determinism-replay` })
    await replay.page.goto(caseURL(test, `png-${index}`), { waitUntil: 'networkidle', timeout: 30_000 })
    await settle(replay.page)
    await prepareView(replay.page, test)
    second = await replay.page.locator('[data-testid="phone-frame"]').screenshot({ animations: 'disabled' })
  } finally {
    if (replay) await replay.context.close().catch(() => undefined)
    await replayBrowser.close().catch(() => undefined)
  }
  const firstHash = sha(first)
  const secondHash = sha(second)
  check(firstHash === secondHash, `${test.name}: fresh-context deterministic pixels`, { firstHash, secondHash })
  result.deterministicReplays.push(test.name)
  const metadata = await sharp(first).metadata()
  check(metadata.width === 390 && metadata.height === 844, `${test.name}: screenshot is native 390x844`, metadata)
  const target = path.join(candidateDir, `${test.name}.png`)
  fs.writeFileSync(target, first)
  result.screenshots.push({ name: `${test.name}.png`, sha256: firstHash, width: metadata.width, height: metadata.height })
}

async function semanticChecks(page, test) {
  const phone = page.locator('[data-testid="phone-frame"]')
  const body = await phone.innerText()

  if (test.id !== '80') {
    const marker = page.locator(`[data-i1-state="${test.id}-${test.state}"]`)
    check((await marker.count()) === 1, `${test.name}: exact state marker`)
  }

  check(!/\b(?:SIA|Sia|Cia)\b/.test(body), `${test.name}: no stale coach casing`)
  check(!/\b(?:live provider|uploaded successfully|published publicly|store review submitted|feedback sent to the team|download complete|shared externally)\b/i.test(body), `${test.name}: no unsupported capability outcome`, body.slice(0, 1400))

  if (/data-controls/.test(test.state)) {
    const required = ['category', 'source', 'freshness', 'confidence', 'retention', 'export', 'revoke', 'delete', 'correction']
    const missing = required.filter(term => !new RegExp(`\\b${term}\\b`, 'i').test(body))
    if (!/\b(?:scope|audience)\b/i.test(body)) missing.push('scope-or-audience')
    check(missing.length === 0, `${test.name}: complete scoped data controls`, { missing, body: body.slice(0, 2000) })
  }

  if (test.id === '67') {
    const marker = page.locator(`[data-i1-state="67-${test.state}"]`)
    check((await marker.getAttribute('data-asset-disposition'))?.includes('HIFI-67-01-code-native') ?? false, `${test.name}: HIFI-67 code-native disposition`)
    check(/Progress Photos|source unavailable|image unavailable|encrypted/i.test(body), `${test.name}: image source/privacy context remains explicit`, body.slice(0, 1200))
    check((await page.locator('[role="img"] button, [role="img"] input, [role="img"] select, [role="img"] textarea, [role="img"] a').count()) === 0, `${test.name}: media semantics never swallow interactive controls`)
    if (['default', 'comparison', 'thumbnail-loading', 'highres-loading', 'single-image', 'offline'].includes(test.state)) {
      const media = marker.getByRole('img').first()
      const mediaBox = await media.boundingBox()
      check(Boolean(mediaBox) && mediaBox.width >= 300 && mediaBox.height >= 280, `${test.name}: dominant media canvas is visibly bounded`, mediaBox)
    }
    if (test.state === 'default') {
      check(/2 of 7/i.test(body) && !/retry high-res.*offline/is.test(body), `${test.name}: loaded gallery is coherent`, body.slice(0, 1200))
    }
    if (test.state === 'comparison') {
      const slider = page.getByRole('slider')
      const sliderBox = await slider.boundingBox()
      const phoneBox = await phone.boundingBox()
      const intersectsPhone = Boolean(sliderBox && phoneBox
        && sliderBox.x + sliderBox.width > phoneBox.x
        && sliderBox.x < phoneBox.x + phoneBox.width
        && sliderBox.y + sliderBox.height > phoneBox.y
        && sliderBox.y < phoneBox.y + phoneBox.height)
      check((await slider.count()) === 1 && /before|after|earlier|later/i.test(body), `${test.name}: native comparison control and date alternatives`)
      check(intersectsPhone, `${test.name}: comparison slider intersects the native phone viewport`, { sliderBox, phoneBox })
    }
    if (['offline', 'disabled-consent', 'empty', 'load-error', 'decrypt-error'].includes(test.state)) {
      const share = page.getByRole('button', { name: /^share/i }).first()
      check((await share.count()) === 0 || await share.isDisabled(), `${test.name}: unavailable media cannot claim share`)
    }
  }

  if (test.id === '69') {
    const stars = page.getByRole('button', { name: /\b[1-5] stars?\b/i })
    const ratingSurface = test.state === 'default-neutral' || /^rating-[135]$/.test(test.state)
    check((await stars.count()) === (ratingSurface ? 5 : 0), `${test.name}: stars exist only on semantic rating surface`)
    if (test.state === 'default-neutral') {
      check((await page.getByRole('button', { pressed: true }).count()) === 0, `${test.name}: no fabricated star selection`)
    }
    if (/^rating-[135]$/.test(test.state)) {
      check((await page.getByRole('button', { pressed: true }).count()) === 1, `${test.name}: exactly one selected rating`)
      check((await page.getByRole('button', { name: /continue to equal choices/i }).count()) === 1, `${test.name}: selected score exposes neutral continuation`)
    }
    if (test.state === 'choice-neutral') {
      check(/public review[\s\S]*private feedback|private feedback[\s\S]*public review/is.test(body), `${test.name}: public and private choices have equal reach`, body.slice(0, 1400))
    }
    check(!/1.?3 stars?[\s\S]*(?:only|must)[\s\S]*private|4.?5 stars?[\s\S]*(?:only|must)[\s\S]*(?:store|public)/is.test(body), `${test.name}: no sentiment-gated review routing`)
  }

  if (test.id === '80') {
    check(/Manage Spotify/i.test(body) && !/Connect Spotify/i.test(body), `${test.name}: accepted connected CTA remains Manage Spotify`)
    check(/Source · Spotify/i.test(body) && /cached 2m ago/i.test(body), `${test.name}: provider source and freshness remain visible`)
    check(/154-158 BPM/i.test(body) && /156 BPM/i.test(body), `${test.name}: BPM claims remain coherent`)
    const range = page.locator('#music-playback-position')
    check((await range.count()) === 1 && await range.getAttribute('min') === '0' && await range.getAttribute('max') === '192' && await range.inputValue() === '118', `${test.name}: accepted native seek contract`)
  }

  if (test.id === '81') {
    const marker = page.locator(`[data-i1-state="81-${test.state}"]`)
    check((await marker.getAttribute('data-asset-disposition'))?.includes('HIFI-81-01-code-native') ?? false, `${test.name}: HIFI-81 code-native disposition`)
    const expectsModal = modalStates[81].has(test.state)
    check(
      expectsModal
        ? (await page.getByRole('dialog').count()) === 1 && (await page.locator('input[type="search"]').count()) === 1
        : (await page.getByRole('searchbox').count()) === 1,
      `${test.name}: native labeled search or inert modal background`,
    )
    if (test.state === 'default-mobility') {
      const progress = await page.getByRole('progressbar').evaluateAll(elements => elements.map(element => element.getAttribute('aria-valuenow')).filter(Boolean).sort())
      check(JSON.stringify(progress) === JSON.stringify(['12', '43']), `${test.name}: exact playable progress fixtures`, progress)
    }
    if (test.state === 'error-cached') {
      const playable = phone.getByRole('button', { name: /^(?:play|resume)\b/i })
      check((await phone.getByRole('alert').count()) === 1 && (await playable.count()) === 1, `${test.name}: cache error exposes exactly one cached playable fixture`)
    }
    if (test.state === 'unavailable') {
      check(/unavailable|processing/i.test(body) && (await page.getByRole('button', { name: /play.*unavailable|play.*processing/i }).count()) === 0, `${test.name}: unavailable media is not playable`)
    }
    if (test.state === 'offline') {
      const blockedPlayback = page.getByRole('button', { name: /^(?:play|resume)\b/i })
      const disabled = await blockedPlayback.evaluateAll(elements => elements.every(element => element.matches(':disabled,[aria-disabled="true"]')))
      const categories = page.locator('section[aria-label="Video categories"] button')
      check(await page.getByRole('searchbox').isDisabled(), `${test.name}: search is disabled offline`)
      check(await page.getByRole('button', { name: /focus video search/i }).isDisabled(), `${test.name}: search focus shortcut is disabled offline`)
      check((await categories.count()) === 4 && await categories.evaluateAll(elements => elements.every(element => element.matches(':disabled'))), `${test.name}: categories cannot escape offline state`)
      check(disabled && (await page.getByRole('progressbar').count()) === 0, `${test.name}: playback and progress are unavailable offline`)
      check(await page.getByRole('button', { name: /review external video search/i }).isDisabled(), `${test.name}: external search is disabled offline`)
    }
    if (test.state === 'skeleton') {
      const categories = page.locator('section[aria-label="Video categories"] button')
      check(await page.getByRole('searchbox').isDisabled(), `${test.name}: search is disabled during skeleton state`)
      check(await page.getByRole('button', { name: /focus video search/i }).isDisabled(), `${test.name}: search focus shortcut is disabled during skeleton state`)
      check((await categories.count()) === 4 && await categories.evaluateAll(elements => elements.every(element => element.matches(':disabled'))), `${test.name}: categories cannot escape skeleton state`)
      check((await page.getByRole('button', { name: /^(?:play|resume)\b/i }).count()) === 0 && (await page.getByRole('progressbar').count()) === 0, `${test.name}: skeleton has no playable claim`)
    }
    if (test.state === 'empty') {
      const categories = page.locator('section[aria-label="Video categories"] button')
      check(/empty|no media/i.test(body) && (await page.getByRole('button', { name: /^(?:play|resume)\b/i }).count()) === 0, `${test.name}: empty library is an honest null`)
      check(await page.getByRole('searchbox').isDisabled(), `${test.name}: cold-empty search cannot repopulate the library`)
      check(await page.getByRole('button', { name: /focus video search/i }).isDisabled(), `${test.name}: cold-empty search shortcut is disabled`)
      check((await categories.count()) === 4 && await categories.evaluateAll(elements => elements.every(element => element.matches(':disabled'))), `${test.name}: cold-empty categories cannot repopulate the library`)
    }
    if (test.state.startsWith('filter-')) {
      const expected = test.state === 'filter-focus' ? 'Focus' : test.state === 'filter-webinars' ? 'Webinars' : 'Saved'
      check((await page.getByRole('button', { name: new RegExp(`^${expected}$`, 'i') }).getAttribute('aria-pressed')) === 'true', `${test.name}: seeded category is semantically selected`)
      const expectedCopy = test.state === 'filter-focus' ? /Low-stimulus focus reset/i : test.state === 'filter-webinars' ? /Stress reset webinar/i : /5-minute hip reset[\s\S]*Stress reset webinar/is
      check(expectedCopy.test(body), `${test.name}: seeded category content is exact`, body.slice(0, 1600))
    }
  }

  if (test.id === '85') {
    if (['blocker-food-dismissed', 'blocker-recovery-dismissed'].includes(test.state)) {
      check(/2 active[\s\S]*1 dismissed/i.test(body) && (await page.locator('[data-blocker-row]').count()) === 2, `${test.name}: dismissed blocker summary is exact`)
    } else if (!['skeleton', 'empty'].includes(test.state)) {
      check(/3 (?:possible )?blockers/i.test(body), `${test.name}: three-blocker summary is exact`)
    }
    check(!/identified the root cause|diagnosed|guaranteed|best odds/i.test(body), `${test.name}: coaching stays non-diagnostic and evidence-qualified`, body.slice(0, 1400))
    if (test.state === 'default') {
      check((await page.locator('[data-blocker-row]').count()) === 3, `${test.name}: exactly three blocker rows`)
    }
    if (['offline', 'disabled-consent', 'skeleton', 'empty', 'safety-support'].includes(test.state)) {
      const topPlan = page.locator('button[aria-label="Open plan review"]')
      check((await topPlan.count()) === 1 && await topPlan.isDisabled(), `${test.name}: every plan opener respects the blocked state`)
      check((await page.getByRole('button', { name: /create local preview/i }).count()) === 0, `${test.name}: blocked state cannot expose plan creation`)
    }
  }

  if (test.id === '98') {
    const routeCards = page.locator('[data-route-card]')
    const count = await routeCards.count()
    const isModalState = modalStates[98].has(test.state)
    const expectedRouteCount = test.state === 'catalog' || test.state === 'capability-matrix' ? 0 : 1
    check(count === expectedRouteCount, `${test.name}: route-state exclusivity`, count)
    if (test.state === 'catalog') {
      check((await page.locator('[data-route-choice]').count()) === 5, `${test.name}: catalog exposes five explicit route choices`)
    } else if (isModalState) {
      check((await page.getByRole('dialog').count()) === 1, `${test.name}: modal fixture is isolated from route-state semantics`)
      if (test.state === 'capability-matrix') check((await page.locator('[data-route-choice]').count()) === 5, `${test.name}: capability matrix preserves its catalog return target`)
      else check((await page.locator('[data-i1-route-state]').getAttribute('data-i1-route-state')) === 'offline', `${test.name}: informational modal preserves its offline return target`)
    } else {
      check((await page.locator('[data-i1-route-state]').getAttribute('data-i1-route-state')) === test.state, `${test.name}: exact route-state marker`)
    }
    check(!/Aisha Khan|your buddy|scheduled maintenance window ends/i.test(body), `${test.name}: no fabricated person or ETA`)
    if (test.state === 'cache-skeleton') check((await page.locator('.skeleton-block').count()) > 0, `${test.name}: unresolved cache uses skeleton treatment`)
    if (['offline', 'retry-success'].includes(test.state)) check((await page.locator('.skeleton-block').count()) === 0, `${test.name}: resolved values never shimmer`)
  }
}

async function assertDialogKeyboardContract(page, test, { openerPattern = null, fallbackPattern = null } = {}) {
  const opener = openerPattern ? page.getByRole('button', { name: openerPattern }).first() : null
  if (opener) {
    check((await opener.count()) === 1, `${test.name}: dialog opener exists`)
    await opener.focus()
    await opener.click()
  }

  const dialog = page.getByRole('dialog')
  await dialog.waitFor({ state: 'visible' })
  await page.waitForFunction(() => Boolean(document.activeElement?.closest('[role="dialog"]')))
  check(await dialog.evaluate(element => element.contains(document.activeElement)), `${test.name}: dialog receives focus`)

  const focusSelector = DIALOG_FOCUSABLE.split(',').map(selector => `${selector}:visible`).join(',')
  const focusables = dialog.locator(focusSelector)
  const focusableCount = await focusables.count()
  check(focusableCount > 0, `${test.name}: dialog has keyboard controls`, focusableCount)
  const first = focusables.first()
  const last = focusables.last()

  await last.focus()
  await page.keyboard.press('Tab')
  check(await first.evaluate(element => element === document.activeElement), `${test.name}: dialog forward focus wraps`)

  await first.focus()
  await page.keyboard.press('Shift+Tab')
  check(await last.evaluate(element => element === document.activeElement), `${test.name}: dialog reverse focus wraps`)

  await page.keyboard.press('Escape')
  await dialog.waitFor({ state: 'detached' })
  await page.waitForTimeout(80)

  const restorationTarget = opener ?? (fallbackPattern ? page.getByRole('button', { name: fallbackPattern }).first() : null)
  check(Boolean(restorationTarget) && (await restorationTarget.count()) === 1, `${test.name}: restoration target exists`)
  check(await restorationTarget.evaluate(element => element === document.activeElement), `${test.name}: focus restores after Escape`)
  result.focusRestorations.push(test.name)
}

async function assertFocusContainedAfterSwap(page, test, label) {
  const dialog = page.getByRole('dialog')
  await dialog.waitFor({ state: 'visible' })
  await page.waitForFunction(() => Boolean(document.activeElement?.closest('[role="dialog"]')))
  check(await dialog.evaluate(element => element.contains(document.activeElement)), `${test.name}: focus remains in dialog after ${label}`)
}

async function interactionChecks(page, test) {
  const body = () => page.locator('[data-testid="phone-frame"]').innerText()
  const button = pattern => page.getByRole('button', { name: pattern }).first()
  let exercised = false

  if (test.name === '67-default') {
    await assertDialogKeyboardContract(page, test, { openerPattern: /share photo preview/i })
    check((await page.locator('[data-i1-state="67-default"]').count()) === 1, `${test.name}: Escape restores viewer state`)
    exercised = true
  }
  if (test.name === '67-decrypt-error') {
    await assertDialogKeyboardContract(page, test, { openerPattern: /review source details/i })
    check((await page.locator('[data-i1-state="67-decrypt-error"]').count()) === 1, `${test.name}: source details restore the exact decrypt-error opener state`)
    exercised = true
  }
  if (test.name === '67-disabled-consent') {
    await assertDialogKeyboardContract(page, test, { openerPattern: /review consent controls/i })
    check((await page.locator('[data-i1-state="67-disabled-consent"]').count()) === 1, `${test.name}: consent controls restore the exact disabled-consent opener state`)
    exercised = true
  }
  if (test.name === '69-default-neutral') {
    await assertDialogKeyboardContract(page, test, { fallbackPattern: /show rating prompt/i })
    check((await page.locator('[data-i1-state="69-not-now"]').count()) === 1, `${test.name}: Escape chooses reversible dismissal`)
    exercised = true
  }
  if (test.name === '81-default-mobility') {
    await assertDialogKeyboardContract(page, test, { openerPattern: /review external video search/i })
    check((await page.locator('[data-i1-state="81-default-mobility"]').count()) === 1, `${test.name}: Escape restores library state`)
    await button(/play post-run mobility.*local preview/i).click()
    await page.getByRole('dialog').waitFor({ state: 'visible' })
    await button(/pause and close preview/i).click()
    await page.getByRole('dialog').waitFor({ state: 'detached' })
    check(/post-run mobility local preview closed.*unchanged/is.test(await body()), `${test.name}: Play opener reaches reversible local preview`)
    await button(/save post-run mobility/i).click()
    check((await button(/remove saved post-run mobility/i).getAttribute('aria-pressed')) === 'true', `${test.name}: Save toggles semantically`)
    await button(/^see all$/i).click()
    check(/bundled videos are already shown/i.test(await body()), `${test.name}: See all gives an explicit local outcome`)
    exercised = true
  }
  if (test.name === '85-default') {
    await assertDialogKeyboardContract(page, test, { openerPattern: /^data controls$/i })
    check((await page.locator('[data-i1-state="85-default"]').count()) === 1, `${test.name}: Escape restores blocker review`)
    await page.goto(new URL('/screens/85?state=offline&nonce=blocked-restore', origin).toString(), { waitUntil: 'networkidle', timeout: 30_000 })
    await settle(page)
    check(await page.locator('button[aria-label="Open plan review"]').isDisabled(), `${test.name}: alternate TopBar opener is disabled offline`)
    await button(/^data controls$/i).click()
    await page.getByRole('dialog').waitFor({ state: 'visible' })
    await page.keyboard.press('Escape')
    await page.getByRole('dialog').waitFor({ state: 'detached' })
    check((await page.locator('[data-i1-state="85-offline"]').count()) === 1, `${test.name}: informational dialog restores exact blocked opener state`)
    check(await page.locator('button[aria-label="Open plan review"]').isDisabled(), `${test.name}: closing information cannot clear the offline gate`)
    exercised = true
  }
  if (test.name === '98-offline') {
    await assertDialogKeyboardContract(page, test, { openerPattern: /^privacy$/i })
    check((await page.locator('[data-i1-state="98-offline"]').count()) === 1, `${test.name}: Escape restores route state`)
    exercised = true
  }

  if (test.name === '80-seek-focus') {
    const range = page.locator('#music-playback-position')
    await range.focus()
    await range.press('ArrowRight')
    check(await range.inputValue() === '119', `${test.name}: ArrowRight increments seek`)
    await range.press('Home')
    check(await range.inputValue() === '0', `${test.name}: Home seeks to start`)
    await range.press('End')
    check(await range.inputValue() === '192', `${test.name}: End seeks to duration`)
    exercised = true
  }

  if (test.id === '67' && test.state === 'comparison') {
    const slider = page.getByRole('slider')
    const before = Number(await slider.inputValue())
    await slider.focus()
    await slider.press('ArrowRight')
    check(Number(await slider.inputValue()) > before, `${test.name}: keyboard changes comparison position`)
    exercised = true
  }
  if (test.id === '67' && test.state === 'offline') {
    const retry = button(/retry|restore online preview/i)
    if (await retry.count()) {
      await retry.click()
      check(/local|preview|no network/i.test(await body()), `${test.name}: retry stays capability-honest`)
      exercised = true
    }
  }
  if (test.id === '67' && ['share-warning', 'delete-confirm', 'report-confirm'].includes(test.state)) {
    const confirm = button(test.state === 'share-warning' ? /preview locally|confirm.*share|open.*share.*preview|share locally/i : test.state === 'delete-confirm' ? /remove locally|confirm.*delete|delete.*preview/i : /preview report|confirm.*report|report.*preview/i)
    if (await confirm.count()) {
      await confirm.click()
      check(/local|preview|nothing|not shared|not deleted|not submitted/i.test(await body()), `${test.name}: destructive/media action remains local preview`)
      exercised = true
    }
  }
  if (test.id === '67' && test.state === 'data-controls') {
    await button(/^category$/i).click()
    check(/local preview[\s\S]*no file, consent, or account data changed/is.test(await body()), `${test.name}: photo data control is operable and scoped`)
    exercised = true
  }

  if (test.id === '69' && /^rating-[135]$/.test(test.state)) {
    const target = page.getByRole('button', { name: /2 stars/i })
    await target.click()
    check((await page.locator('[data-i1-state="69-choice-neutral"]').count()) === 1, `${test.name}: new score reaches neutral choice state`)
    check(/public review[\s\S]*private feedback|private feedback[\s\S]*public review/is.test(await body()), `${test.name}: equal paths remain after a new score`)
    await assertFocusContainedAfterSwap(page, test, 'rating-to-choice swap')
    exercised = true
  }
  if (test.id === '69' && test.state === 'choice-neutral') {
    await button(/public review preview/i).click()
    check((await page.locator('[data-i1-state="69-public-review-confirm"]').count()) === 1, `${test.name}: public path remains independently reachable`)
    await assertFocusContainedAfterSwap(page, test, 'choice-to-public swap')
    await button(/back to equal choices/i).click()
    await assertFocusContainedAfterSwap(page, test, 'public-to-choice swap')
    await button(/private feedback preview/i).click()
    check((await page.locator('[data-i1-state="69-private-feedback"]').count()) === 1, `${test.name}: private path remains independently reachable`)
    await assertFocusContainedAfterSwap(page, test, 'choice-to-private swap')
    exercised = true
  }
  if (test.id === '69' && test.state === 'public-review-confirm') {
    await button(/confirm local preview/i).click()
    check(/completed locally.*no store opened/is.test(await body()), `${test.name}: public preview outcome is capability-honest`)
    await assertFocusContainedAfterSwap(page, test, 'public confirmation swap')
    exercised = true
  }
  if (test.id === '69' && test.state === 'private-feedback') {
    const field = page.getByRole('textbox')
    if (await field.count()) {
      await field.fill('The pacing controls could be clearer.')
      check((await field.inputValue()).includes('pacing controls'), `${test.name}: private draft is operable`)
      exercised = true
    }
  }
  if (test.id === '69' && test.state === 'feedback-ready') {
    await button(/submit local preview/i).click()
    check((await page.locator('[data-i1-state="69-feedback-success"]').count()) === 1, `${test.name}: ready feedback reaches local success only`)
    await assertFocusContainedAfterSwap(page, test, 'feedback-success swap')
    exercised = true
  }
  if (test.id === '69' && test.state === 'feedback-error') {
    await button(/retry locally/i).click()
    check((await page.locator('[data-i1-state="69-feedback-ready"]').count()) === 1, `${test.name}: failed local preview is retryable`)
    await assertFocusContainedAfterSwap(page, test, 'feedback-retry swap')
    exercised = true
  }
  if (test.id === '69' && test.state === 'not-now') {
    await button(/show rating prompt/i).click()
    await page.getByRole('dialog').waitFor({ state: 'visible' })
    check((await page.locator('[data-i1-state="69-default-neutral"]').count()) === 1, `${test.name}: dismissal is reversible`)
    exercised = true
  }
  if (test.id === '69' && test.state === 'suppressed') {
    await button(/undo local suppression/i).click()
    await page.getByRole('dialog').waitFor({ state: 'visible' })
    check((await page.locator('[data-i1-state="69-default-neutral"]').count()) === 1, `${test.name}: suppression is reversible`)
    exercised = true
  }
  if (test.id === '69' && test.state === 'data-controls') {
    await button(/^category$/i).click()
    check(/reversible local preview/i.test(await body()), `${test.name}: scoped data control is operable`)
    exercised = true
  }

  if (test.id === '81' && test.state.startsWith('filter-')) {
    const mobility = button(/^Mobility$/i)
    if (await mobility.count()) {
      await mobility.click()
      check((await mobility.getAttribute('aria-pressed')) === 'true', `${test.name}: filter selection is semantic`)
      exercised = true
    }
  }
  if (test.id === '81' && ['search-results', 'search-empty'].includes(test.state)) {
    const search = page.getByRole('searchbox')
    await search.fill(test.state === 'search-results' ? 'zz-no-match' : 'mobility')
    await search.press('Enter')
    const expectedState = test.state === 'search-results' ? 'search-empty' : 'search-results'
    check((await page.locator(`[data-i1-state="81-${expectedState}"]`).count()) === 1, `${test.name}: native search submits to exact bundled state`)
    check(/no external search was used/i.test(await body()), `${test.name}: search submission remains local`)
    exercised = true
  }
  if (test.id === '81' && ['featured-playing', 'hip-reset-resume', 'webinar-playing'].includes(test.state)) {
    const pause = button(/pause/i)
    if (await pause.count()) {
      await pause.click()
      await page.getByRole('dialog').waitFor({ state: 'detached' })
      check((await page.locator('[data-i1-state="81-default-mobility"]').count()) === 1, `${test.name}: playback preview returns to library`)
      check(/local preview closed.*unchanged/is.test(await body()), `${test.name}: playback preview is reversible and local`)
      exercised = true
    }
  }
  if (test.id === '81' && test.state === 'error-cached') {
    await button(/retry bundled library locally/i).click()
    check((await page.locator('[data-i1-state="81-default-mobility"]').count()) === 1, `${test.name}: cached error restores bundled library`)
    check(/restored locally.*no provider or network request/is.test(await body()), `${test.name}: cached retry is capability-honest`)
    exercised = true
  }
  if (test.id === '81' && test.state === 'unavailable') {
    const retry = button(/retry/i)
    if (await retry.count()) {
      await retry.click()
      check(/Retry checked the bundled fixture[\s\S]*remains unavailable[\s\S]*no request was sent/is.test(await body()), `${test.name}: retry remains local and honest`)
      exercised = true
    }
  }
  if (test.id === '81' && test.state === 'external-confirm') {
    await button(/keep search local/i).click()
    await page.getByRole('dialog').waitFor({ state: 'detached' })
    check((await page.locator('[data-i1-state="81-default-mobility"]').count()) === 1, `${test.name}: external confirmation returns locally`)
    check(/handoff blocked[\s\S]*nothing opened or shared/is.test(await body()), `${test.name}: external handoff is capability-honest`)
    exercised = true
  }
  if (test.id === '81' && test.state === 'data-controls') {
    const controlsDialog = page.getByRole('dialog')
    await button(/export local summary preview/i).click()
    check(/no file was created/i.test(await controlsDialog.innerText()), `${test.name}: export outcome is visible inside the active dialog`)
    await button(/revoke recommendation signals/i).click()
    check((await button(/restore recommendation signals/i).getAttribute('aria-pressed')) === 'true', `${test.name}: recommendation signals are reversibly revoked`)
    await button(/delete local watch-history preview/i).click()
    check((await button(/undo local watch-history deletion/i).getAttribute('aria-pressed')) === 'true', `${test.name}: watch-history fixture deletion is reversible`)
    await button(/review metadata correction/i).click()
    check(/correction review opened locally[\s\S]*no source record changed/is.test(await controlsDialog.innerText()), `${test.name}: correction outcome is visible inside the active dialog`)
    await button(/close dialog/i).click()
    await controlsDialog.waitFor({ state: 'detached' })
    await page.getByRole('button', { name: /^resume 5-minute hip reset\b/i }).click()
    const playbackDialog = page.getByRole('dialog')
    await playbackDialog.waitFor({ state: 'visible' })
    check((await playbackDialog.getByRole('progressbar').count()) === 0, `${test.name}: deleted watch history never reappears in playback`)
    check(/deleted locally[\s\S]*no saved position is shown or recreated/is.test(await playbackDialog.innerText()), `${test.name}: playback explains the deleted-history state honestly`)
    await playbackDialog.getByRole('button', { name: /pause and close preview/i }).click()
    await playbackDialog.waitFor({ state: 'detached' })
    exercised = true
  }

  if (test.id === '85' && test.state === 'blocker-time-accepted') {
    const dismiss = page.locator('[data-blocker-id="time"]').getByRole('button', { name: /^dismiss$/i })
    if (await dismiss.count()) {
      await dismiss.click()
      check(/dismissed|undo/i.test(await body()), `${test.name}: accepted blocker can be reconsidered`)
      exercised = true
    }
  }
  if (test.id === '85' && ['blocker-food-dismissed', 'blocker-recovery-dismissed'].includes(test.state)) {
    await button(/review reconnection steps/i).click()
    const planDialog = page.getByRole('dialog')
    await planDialog.waitFor({ state: 'visible' })
    const dismissedStep = test.state === 'blocker-food-dismissed' ? /preparing lunch/i : /lighter return step/i
    check(!dismissedStep.test(await planDialog.innerText()), `${test.name}: dismissed blocker is excluded from plan review`)
    await planDialog.getByRole('button', { name: /keep reviewing blockers/i }).click()
    await planDialog.waitFor({ state: 'detached' })
    check((await page.locator(`[data-i1-state="85-${test.state}"]`).count()) === 1, `${test.name}: plan close restores dismissed state`)
    const undo = button(/undo/i)
    if (await undo.count()) {
      await undo.click()
      check(/restored|review/i.test(await body()), `${test.name}: dismissed blocker can be restored`)
      exercised = true
    }
  }
  if (test.id === '85' && test.state === 'undo-restored') {
    await page.locator('[data-blocker-id="food"]').getByRole('button', { name: /^dismiss$/i }).click()
    await page.locator('[data-blocker-id="recovery"]').getByRole('button', { name: /^dismiss$/i }).click()
    check(/dismissed.*undo/is.test(await body()), `${test.name}: multiple restored blockers remain dismissible`)
    await button(/undo/i).click()
    check((await page.locator('[data-blocker-row]').count()) === 3, `${test.name}: Undo restores every dismissed blocker`)
    check((await page.locator('[data-blocker-state="dismissed"]').count()) === 0, `${test.name}: no dismissed blocker remains after Undo`)
    exercised = true
  }
  if (test.id === '85' && test.state === 'detail-time') {
    await button(/^accept step$/i).click()
    await page.getByRole('dialog').waitFor({ state: 'detached' })
    check((await page.locator('[data-i1-state="85-blocker-time-accepted"]').count()) === 1, `${test.name}: detail accept reaches exact local state`)
    exercised = true
  }
  if (test.id === '85' && test.state === 'data-controls') {
    const dataDialog = page.getByRole('dialog')
    await button(/preview export/i).click()
    check(/no file was created or opened/i.test(await dataDialog.innerText()), `${test.name}: export outcome is visible inside the active dialog`)
    await button(/preview correction/i).click()
    check(/correction preview opened locally[\s\S]*no source record changed/is.test(await dataDialog.innerText()), `${test.name}: correction outcome is visible inside the active dialog`)
    await button(/revoke local consent/i).click()
    await page.getByRole('dialog').waitFor({ state: 'detached' })
    check((await page.locator('[data-i1-state="85-disabled-consent"]').count()) === 1, `${test.name}: consent control is reversible and local`)
    exercised = true
  }
  if (test.id === '85' && test.state === 'dependencies') {
    await button(/close capability limits/i).click()
    await page.getByRole('dialog').waitFor({ state: 'detached' })
    check((await page.locator('[data-i1-state="85-default"]').count()) === 1, `${test.name}: capability limits close to blocker review`)
    exercised = true
  }
  if (test.id === '85' && test.state === 'plan-review') {
    await button(/create local preview/i).click()
    await page.getByRole('dialog').waitFor({ state: 'detached' })
    check((await page.locator('[data-i1-state="85-plan-success"]').count()) === 1, `${test.name}: plan review creates only a local preview`)
    exercised = true
  }
  if (test.id === '85' && test.state === 'plan-success') {
    await page.locator('[data-blocker-id="time"]').getByRole('button', { name: /^dismiss$/i }).click()
    const updated = await body()
    check((await page.locator('[data-i1-state="85-plan-success"]').count()) === 0, `${test.name}: dismissing the accepted step invalidates the ready preview`)
    check(!/Preview ready|One reviewed step is highlighted/i.test(updated), `${test.name}: invalidated plan success copy is removed`, updated.slice(0, 1600))
    check(/ready preview was cleared[\s\S]*undo is available/i.test(updated), `${test.name}: invalidation remains explicit and reversible`, updated.slice(0, 1600))
    exercised = true
  }
  if (test.id === '85' && test.state === 'plan-error') {
    const retry = button(/try(?: local preview)? again|review plan/i)
    if (await retry.count()) {
      await retry.click()
      check(/local|review|preview|no plan/i.test(await body()), `${test.name}: plan retry stays local`)
      exercised = true
    }
  }
  if (test.id === '85' && test.state === 'safety-support') {
    await button(/close safety preview/i).click()
    await page.getByRole('dialog').waitFor({ state: 'detached' })
    check((await page.locator('[data-i1-state="85-default"]').count()) === 1, `${test.name}: safety preview closes without contacting a service`)
    exercised = true
  }

  if (test.id === '98' && test.state === 'offline') {
    await button(/retry connection preview/i).click()
    check((await page.locator('[data-i1-state="98-retrying"]').count()) === 1, `${test.name}: retry transition is explicit before completion`)
    await button(/open support preview/i).click()
    const supportDialog = page.getByRole('dialog')
    await supportDialog.waitFor({ state: 'visible' })
    await page.waitForTimeout(850)
    check((await page.locator('[data-i1-state="98-support"]').count()) === 1, `${test.name}: later panel action cancels the pending retry timer`)
    check((await page.locator('[data-i1-state="98-retry-success"]').count()) === 0, `${test.name}: cancelled retry cannot overwrite a later action`)
    await supportDialog.getByRole('button', { name: /close support preview/i }).first().click()
    await supportDialog.waitFor({ state: 'detached' })
    check((await page.locator('[data-i1-state="98-offline"]').count()) === 1, `${test.name}: dialog opened during retry returns to cancelled offline state`)
    check(/cancelled|no connection was checked/i.test(await body()), `${test.name}: retry cancellation remains capability-honest`)
    exercised = true
  }
  if (test.id === '98' && test.state === 'retrying') {
    await button(/cancel local check/i).click()
    check((await page.locator('[data-i1-state="98-offline"]').count()) === 1, `${test.name}: retry can be cancelled`)
    check(/offline fixture|bundled snapshot/i.test(await body()), `${test.name}: cancellation restores honest offline state`)
    exercised = true
  }
  if (test.id === '98' && test.state === 'support') {
    await button(/close support preview/i).click()
    await page.getByRole('dialog').waitFor({ state: 'detached' })
    check((await page.locator('[data-i1-state="98-offline"]').count()) === 1, `${test.name}: support preview closes to local route state`)
    await page.goto(new URL('/screens/98?state=catalog&nonce=panel-restore', origin).toString(), { waitUntil: 'networkidle', timeout: 30_000 })
    await settle(page)
    await button(/open support preview/i).click()
    const catalogDialog = page.getByRole('dialog')
    await catalogDialog.waitFor({ state: 'visible' })
    await catalogDialog.getByRole('button', { name: /close support preview/i }).first().click()
    await catalogDialog.waitFor({ state: 'detached' })
    check((await page.locator('[data-i1-state="98-catalog"]').count()) === 1, `${test.name}: support dialog restores exact catalog opener state`)
    check((await page.locator('[data-route-choice]').count()) === 5, `${test.name}: catalog remains intact after dialog close`)
    await assertDialogKeyboardContract(page, test, { openerPattern: /open capability matrix/i })
    check((await page.locator('[data-i1-state="98-catalog"]').count()) === 1, `${test.name}: capability matrix restores its remounted catalog opener`)
    exercised = true
  }
  if (test.id === '98' && test.state === 'data-controls') {
    const dataDialog = page.getByRole('dialog')
    await button(/preview export/i).click()
    check(/no file was created or opened/i.test(await dataDialog.innerText()), `${test.name}: cache export outcome is visible inside the active dialog`)
    await button(/preview correction/i).click()
    check(/fixed values remain unchanged[\s\S]*honest-null state/is.test(await dataDialog.innerText()), `${test.name}: cache correction outcome is visible inside the active dialog`)
    await button(/revoke local cache use/i).click()
    await page.getByRole('dialog').waitFor({ state: 'detached' })
    check((await page.locator('[data-i1-state="98-cache-empty"]').count()) === 1, `${test.name}: cache consent reaches honest null locally`)
    await assertDialogKeyboardContract(page, test, { openerPattern: /review data controls/i })
    check((await page.locator('[data-i1-state="98-cache-empty"]').count()) === 1, `${test.name}: cache-empty data controls restore their exact opener state`)
    exercised = true
  }

  if (transitionAllowlist.has(test.name)) {
    check(exercised, `${test.name}: frozen transition is explicitly exercised`)
    result.transitionCases.push(test.name)
  }
}

function caseURL(test, nonce) {
  const url = new URL(`/screens/${test.id}`, origin)
  if (test.kind === 'query') url.searchParams.set('state', test.state)
  url.searchParams.set('nonce', nonce)
  return url.toString()
}

async function isolationEvidence(page, context, test) {
  const client = await page.evaluate(async () => ({
    localStorage: Object.keys(localStorage),
    sessionStorage: Object.keys(sessionStorage),
    databases: typeof indexedDB.databases === 'function' ? (await indexedDB.databases()).map(item => item.name ?? '') : [],
    caches: 'caches' in window ? await caches.keys() : [],
    cookie: document.cookie,
    events: window.__i1Events ?? [],
  }))
  const cookies = await context.cookies()
  const evidence = { name: test.name, ...client, cookies: cookies.map(cookie => cookie.name) }
  result.browserIsolation.push(evidence)
  result.capabilityEvents.push(...client.events.map(event => ({ name: test.name, ...event })))
  check(client.localStorage.length === 0, `${test.name}: localStorage remains empty`, client.localStorage)
  check(client.sessionStorage.length === 0, `${test.name}: sessionStorage remains empty`, client.sessionStorage)
  check(client.databases.length === 0, `${test.name}: IndexedDB remains empty`, client.databases)
  check(client.caches.length === 0, `${test.name}: CacheStorage remains empty`, client.caches)
  check(!client.cookie && cookies.length === 0, `${test.name}: cookies remain empty`, { document: client.cookie, context: cookies })
  check(client.events.length === 0, `${test.name}: no capability event`, client.events)
}

async function createIsolatedPage(browser, test) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
    serviceWorkers: 'block',
  })
  await addGuards(context)
  await context.route('**/*', async route => {
    const request = route.request()
    const url = new URL(request.url())
    if (url.origin === origin.origin) {
      if (/^\/api(?:\/|$)/.test(url.pathname) || !['GET', 'HEAD'].includes(request.method())) {
        result.capabilityEvents.push({ name: test.name, type: 'network-request', detail: `${request.method()} ${request.url()}` })
        await route.abort('blockedbyclient')
        return
      }
      await route.continue()
      return
    }
    result.externalRequests.push({ name: test.name, method: request.method(), url: request.url() })
    await route.abort('blockedbyclient')
  })
  const page = await context.newPage()
  page.on('console', message => {
    if (message.type() === 'error') result.consoleErrors.push({ name: test.name, text: message.text() })
  })
  page.on('pageerror', error => result.pageErrors.push({ name: test.name, text: error.message }))
  page.on('download', download => result.capabilityEvents.push({ name: test.name, type: 'download', detail: download.suggestedFilename() }))
  page.on('popup', popup => result.capabilityEvents.push({ name: test.name, type: 'popup', detail: popup.url() }))
  page.on('worker', worker => result.capabilityEvents.push({ name: test.name, type: 'page-worker', detail: worker.url() }))
  return { context, page }
}

async function runCase(browser, test, index) {
  const startedAt = new Date().toISOString()
  const record = { name: test.name, id: test.id, state: test.state, kind: test.kind, startedAt, status: 'fail', error: null }
  let context
  try {
    const isolated = await createIsolatedPage(browser, test)
    context = isolated.context
    const { page } = isolated
    await page.goto(caseURL(test, `png-${index}`), { waitUntil: 'networkidle', timeout: 30_000 })
    await settle(page)
    await semanticChecks(page, test)
    await auditLayout(page, test)
    await captureDeterministic(page, test, index)
    await auditFocusStyle(page, test)
    await interactionChecks(page, test)
    await isolationEvidence(page, context, test)
    record.status = 'pass'
  } catch (error) {
    record.error = error instanceof Error ? error.message : String(error)
  } finally {
    if (context) await context.close().catch(() => undefined)
    record.finishedAt = new Date().toISOString()
    result.cases.push(record)
  }
}

async function runTextCase(browser, test, index) {
  const record = { ...test, status: 'fail', error: null }
  let context
  try {
    const isolated = await createIsolatedPage(browser, test)
    context = isolated.context
    const { page } = isolated
    const url = new URL(`/screens/${test.id}`, origin)
    if (test.state) url.searchParams.set('state', test.state)
    url.searchParams.set('nonce', `scale-${index}`)
    await page.goto(url.toString(), { waitUntil: 'networkidle', timeout: 30_000 })
    await settle(page)
    const proof = test.mode === 'accepted-css-zoom-waiver' ? await browserZoomProof(page) : await rootTextScaleProof(page)
    check(validScaleProof(proof), `${test.name}: ${test.mode === 'accepted-css-zoom-waiver' ? 'accepted CSS-zoom waiver evidence' : 'actual 125% root-text proof'}`, proof)
    await isolationEvidence(page, context, test)
    Object.assign(record, { proof, status: 'pass' })
  } catch (error) {
    record.error = error instanceof Error ? error.message : String(error)
  } finally {
    if (context) await context.close().catch(() => undefined)
    result.textScaleCases.push(record)
  }
}

async function productionBinding() {
  const buildFile = path.resolve(root, '.next/BUILD_ID')
  check(fs.existsSync(buildFile), 'current production BUILD_ID exists')
  const buildId = fs.readFileSync(buildFile, 'utf8').trim()
  check(Boolean(buildId), 'current production BUILD_ID is non-empty')
  const buildMtimeMs = fs.statSync(buildFile).mtimeMs
  const newestInput = productionInputFiles
    .map(file => ({ file, mtimeMs: fs.statSync(path.resolve(root, file)).mtimeMs }))
    .sort((a, b) => b.mtimeMs - a.mtimeMs)[0]
  check(newestInput.mtimeMs <= buildMtimeMs, 'production build postdates every production input', { buildMtimeMs, newestInput })
  const response = await fetch(new URL('/screens/67', origin))
  const html = await response.text()
  check(response.ok, 'production binding route responds', { status: response.status })
  check(html.includes(buildId), 'served HTML contains current production build ID', buildId)
  return {
    id: buildId,
    buildMtime: new Date(buildMtimeMs).toISOString(),
    newestInput: { ...newestInput, mtime: new Date(newestInput.mtimeMs).toISOString() },
    servedHTMLSha256: sha(Buffer.from(html)),
  }
}

function promoteScreenshots() {
  const backup = `${shotsDir}.previous`
  fs.rmSync(backup, { recursive: true, force: true })
  if (fs.existsSync(shotsDir)) fs.renameSync(shotsDir, backup)
  try {
    fs.renameSync(candidateDir, shotsDir)
    fs.rmSync(backup, { recursive: true, force: true })
    result.screenshotPromotion = { status: 'promoted', candidateDir, shotsDir }
  } catch (error) {
    if (fs.existsSync(shotsDir)) fs.rmSync(shotsDir, { recursive: true, force: true })
    if (fs.existsSync(backup)) fs.renameSync(backup, shotsDir)
    throw error
  }
}

async function auditPerceptualDistinctness() {
  const width = 78
  const height = 169
  const signatures = new Map()
  for (const screenshot of result.screenshots) {
    const pixels = await sharp(path.join(candidateDir, screenshot.name))
      .resize(width, height, { fit: 'fill' })
      .greyscale()
      .raw()
      .toBuffer()
    signatures.set(screenshot.name, pixels)
  }

  const pairs = []
  const names = [...signatures.keys()]
  for (let left = 0; left < names.length; left += 1) {
    for (let right = left + 1; right < names.length; right += 1) {
      const a = signatures.get(names[left])
      const b = signatures.get(names[right])
      let changedPixels = 0
      let absoluteDelta = 0
      for (let index = 0; index < a.length; index += 1) {
        const delta = Math.abs(a[index] - b[index])
        absoluteDelta += delta
        if (delta >= 2) changedPixels += 1
      }
      pairs.push({
        left: names[left],
        right: names[right],
        changedPixels,
        changedRatio: changedPixels / a.length,
        meanAbsoluteDelta: absoluteDelta / a.length,
      })
    }
  }

  pairs.sort((a, b) => a.meanAbsoluteDelta - b.meanAbsoluteDelta || a.changedPixels - b.changedPixels)
  const minimumChangedPixels = 64
  const minimumMeanAbsoluteDelta = 0.05
  const nearDuplicates = pairs.filter(pair => pair.changedPixels < minimumChangedPixels || pair.meanAbsoluteDelta < minimumMeanAbsoluteDelta)
  result.perceptualDistinctness = {
    sample: `${width}x${height} grayscale`,
    pairCount: pairs.length,
    thresholds: { minimumChangedPixels, minimumMeanAbsoluteDelta },
    nearDuplicates,
    closestPairs: pairs.slice(0, 12),
  }
  check(nearDuplicates.length === 0, 'all screenshot pairs clear the perceptual distinctness floor', nearDuplicates)
}

async function main() {
  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.rmSync(candidateDir, { recursive: true, force: true })
  fs.mkdirSync(candidateDir, { recursive: true })

  result.productionBuild = await productionBinding()
  result.integrity = {
    start: {
      product: fingerprint(productFiles),
      api: fingerprint(apiFiles),
      productionInputs: fingerprint(productionInputFiles),
      accepted: acceptedFingerprint(),
    },
  }
  check(sha(fs.readFileSync(path.resolve(root, acceptedAsset))) === acceptedAssetHash, 'accepted HIFI-80-01 bytes match')
  check(!fs.existsSync(path.resolve(root, 'public/hifi-assets/HIFI-67-01-image-viewer.png')), 'no unapproved HIFI-67 raster added')
  check(!fs.existsSync(path.resolve(root, 'public/hifi-assets/HIFI-81-01-video-library.png')), 'no unapproved HIFI-81 raster added')

  for (const [index, test] of cases.entries()) {
    const browser = await launchBrowser()
    try {
      await runCase(browser, test, index)
    } finally {
      await browser.close()
    }
  }
  for (const [index, test] of textCases.entries()) {
    const browser = await launchBrowser()
    try {
      await runTextCase(browser, test, index)
    } finally {
      await browser.close()
    }
  }

  result.integrity.end = {
    product: fingerprint(productFiles),
    api: fingerprint(apiFiles),
    productionInputs: fingerprint(productionInputFiles),
    accepted: acceptedFingerprint(),
  }

  check(result.cases.length === 80 && result.cases.every(test => test.status === 'pass'), 'all 80 PNG contexts pass', result.cases.filter(test => test.status !== 'pass'))
  check(result.textScaleCases.length === 6 && result.textScaleCases.every(test => test.status === 'pass'), 'five actual 125% root-text proofs plus accepted S80 CSS-zoom waiver pass', result.textScaleCases.filter(test => test.status !== 'pass'))
  check(result.screenshots.length === 80, 'exactly 80 PNG proofs captured', result.screenshots.length)
  check(new Set(result.screenshots.map(item => item.name)).size === 80, 'all screenshot names are unique')
  check(new Set(result.screenshots.map(item => item.sha256)).size === 80, 'all screenshot byte hashes are unique')
  check(result.deterministicReplays.length === 80 && new Set(result.deterministicReplays).size === 80, 'all PNG proofs replay deterministically in fresh contexts', result.deterministicReplays.length)
  await auditPerceptualDistinctness()
  check(result.transitionCases.length === transitionAllowlist.size && new Set(result.transitionCases).size === transitionAllowlist.size, 'every frozen transition case is covered', { expected: transitionAllowlist.size, actual: result.transitionCases })
  check(result.focusRestorations.length === 9 && new Set(result.focusRestorations).size === 9, 'nine screen-local modal focus contracts pass', result.focusRestorations)
  check(result.consoleErrors.length === 0, 'zero console errors', result.consoleErrors)
  check(result.pageErrors.length === 0, 'zero page errors', result.pageErrors)
  check(result.capabilityEvents.length === 0, 'zero capability events', result.capabilityEvents)
  check(result.externalRequests.length === 0, 'zero external requests', result.externalRequests)
  check(result.browserIsolation.length === 86, 'all 86 contexts use isolated browser storage', result.browserIsolation.length)
  check(JSON.stringify(result.integrity.start) === JSON.stringify(result.integrity.end), 'product/API/production-input/100-sentinel fingerprints stable')
  check(result.integrity.end.accepted.digest === expectedAcceptedDigest, 'accepted-through-H1 digest exact', result.integrity.end.accepted.digest)
  check(sha(fs.readFileSync(path.resolve(repo, acceptedS80))) === acceptedS80Hash, 'accepted S80 bytes remain exact')
  check(sha(fs.readFileSync(path.resolve(root, acceptedAsset))) === acceptedAssetHash, 'accepted HIFI-80-01 remains exact')

  result.status = 'pass'
  promoteScreenshots()
}

try {
  await main()
} catch (error) {
  result.status = 'fail'
  result.fatal = error instanceof Error ? { message: error.message, stack: error.stack } : { message: String(error) }
  fs.rmSync(candidateDir, { recursive: true, force: true })
  if (!result.screenshotPromotion) result.screenshotPromotion = { status: 'not-promoted', candidateDir, shotsDir }
}

fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.writeFileSync(outPath, `${JSON.stringify(result, null, 2)}\n`)

const summary = {
  status: result.status,
  buildId: result.productionBuild?.id ?? null,
  contexts: `${result.cases.filter(test => test.status === 'pass').length + result.textScaleCases.filter(test => test.status === 'pass').length}/86`,
  screenshots: `${result.screenshots.length}/80`,
  checks: `${result.checks.filter(item => item.ok).length}/${result.checks.length}`,
  transitions: `${result.transitionCases.length}/${transitionAllowlist.size}`,
  consoleErrors: result.consoleErrors.length,
  pageErrors: result.pageErrors.length,
  capabilityEvents: result.capabilityEvents.length,
  externalRequests: result.externalRequests.length,
  outPath,
}

console.log(JSON.stringify(summary, null, 2))
if (result.status !== 'pass') process.exitCode = 1
