import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const baseURL = process.argv[2] || 'http://localhost:3001'
const outPath = process.argv[3]
const shotsDir = process.argv[4]
const chromePath = process.env.PLAYWRIGHT_CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const baseOrigin = new URL(baseURL).origin
const TOKEN_SENTINEL = 'A2_SECRET_SENTINEL_9f3'

const SOURCE_FILES = [
  'src/components/hifi/screens/auth/S05ForgotPassword.tsx',
  'src/components/hifi/screens/auth/S05bResetPassword.tsx',
  'src/components/hifi/screens/auth/S06GuestModePreview.tsx',
  'src/components/hifi/screens/auth/S07CiaOnboarding.tsx',
  'src/components/hifi/screens/auth/S08InitialPlanSummary.tsx',
  'src/components/hifi/screens/auth/S65ForceUpdate.tsx',
  'src/components/hifi/screens/auth/S66NotificationPermission.tsx',
]

const API_FILES = [
  'src/app/globals.css',
  'src/components/hifi/kit/HifiShell.tsx',
  'src/components/hifi/kit/buttons.tsx',
  'src/components/hifi/kit/chips.tsx',
  'src/components/hifi/kit/cia-composer.tsx',
  'src/components/hifi/kit/cia-orb.tsx',
  'src/components/hifi/kit/glass-pill-input.tsx',
  'src/components/layout/ScreenShell.tsx',
]

const EXPECTED_SCREENSHOTS = [
  '05-default.png',
  '05-filled.png',
  '05-loading.png',
  '05-success.png',
  '05-offline.png',
  '05-error.png',
  '05-cooldown-start.png',
  '05-cooldown-ended.png',
  '05-resend-cooldown.png',
  '05b-default.png',
  '05b-filled.png',
  '05b-loading.png',
  '05b-missing.png',
  '05b-invalid.png',
  '05b-expired.png',
  '05b-rate-limit.png',
  '05b-offline.png',
  '05b-success.png',
  '05b-password-visible.png',
  '05b-mismatch.png',
  '05b-interactive-loading.png',
  '06-default.png',
  '06-name-only.png',
  '06-populated.png',
  '06-cap-error.png',
  '06-loading.png',
  '06-error.png',
  '06-success.png',
  '06-three-selected.png',
  '06-fourth-rejected.png',
  '07-default.png',
  '07-listening.png',
  '07-privacy.png',
  '07-crisis.png',
  '07-text-send.png',
  '07-skip-health.png',
  '08-default.png',
  '08-minimal.png',
  '08-editing.png',
  '08-error.png',
  '08-offline.png',
  '08-success.png',
  '08-edit-mission.png',
  '08-offline-queued.png',
  '65-default.png',
  '65-loading.png',
  '65-error.png',
  '65-offline.png',
  '65-empty.png',
  '65-returned.png',
  '65-action-error.png',
  '66-default.png',
  '66-loading.png',
  '66-authorized-preview.png',
  '66-denied.png',
  '66-error.png',
  '66-offline.png',
  '66-re-entry.png',
  '66-default-skipped.png',
  '66-authorized-manage.png',
  '66-reentry-unavailable.png',
]

const expectedScreenshotSet = new Set(EXPECTED_SCREENSHOTS)
const capturedScreenshotSet = new Set()

if (outPath) fs.mkdirSync(path.dirname(path.resolve(outPath)), { recursive: true })
if (shotsDir) {
  const resolvedShotsDir = path.resolve(shotsDir)
  fs.mkdirSync(resolvedShotsDir, { recursive: true })
  for (const file of fs.readdirSync(resolvedShotsDir)) {
    if (file.endsWith('.png')) fs.unlinkSync(path.join(resolvedShotsDir, file))
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

function redact(value) {
  return String(value).split(TOKEN_SENTINEL).join('[REDACTED_TOKEN]')
}

function fingerprint(files) {
  const hash = createHash('sha256')
  for (const relativePath of [...files].sort()) {
    const absolutePath = path.join(projectRoot, relativePath)
    assert(fs.existsSync(absolutePath), `Fingerprint source missing: ${relativePath}`)
    hash.update(relativePath)
    hash.update('\0')
    hash.update(fs.readFileSync(absolutePath))
    hash.update('\0')
  }
  return hash.digest('hex')
}

function parseColor(value) {
  const parts = value.match(/[\d.]+/g)?.map(Number) ?? []
  return { r: parts[0] ?? 0, g: parts[1] ?? 0, b: parts[2] ?? 0, a: parts[3] ?? 1 }
}

function luminance(color) {
  const channels = [color.r, color.g, color.b].map(value => {
    const normalized = value / 255
    return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
}

function contrast(foreground, background) {
  const light = Math.max(luminance(foreground), luminance(background))
  const dark = Math.min(luminance(foreground), luminance(background))
  return (light + 0.05) / (dark + 0.05)
}

const sourceHashStart = fingerprint(SOURCE_FILES)
const apiHashStart = fingerprint(API_FILES)
let sourceHashEnd = sourceHashStart
let apiHashEnd = apiHashStart
let currentCase = 'boot'
let navigationNonce = 0

const browser = await chromium.launch(fs.existsSync(chromePath) ? { executablePath: chromePath } : {})
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' })
const checks = []
const consoleErrors = []
const pageErrors = []
const capabilityEvents = []
const visitedNonces = new Set()

function recordCapability(type, detail = '') {
  capabilityEvents.push({ case: currentCase, type, detail: redact(detail) })
}

await context.exposeBinding('__a2RecordCapability', (_source, type, detail) => {
  recordCapability(String(type), detail)
})

await context.addInitScript(() => {
  const record = (type, detail = '') => {
    try {
      void window.__a2RecordCapability(type, String(detail))
    } catch {
      // The Node-side request/navigation guards remain active if a browser
      // primitive cannot be wrapped in a particular engine build.
    }
  }
  const authLike = /auth|session|token|credential|password|secret|guest|account|user/i

  try {
    if (window.Notification && typeof window.Notification.requestPermission === 'function') {
      Object.defineProperty(window.Notification, 'requestPermission', {
        configurable: true,
        value: (...args) => {
          record('notification.requestPermission', args.length)
          return Promise.resolve('default')
        },
      })
    }
  } catch {
    // Guarded by the browser event layer as well.
  }

  try {
    window.open = (...args) => {
      record('window.open', args[0] ?? '')
      return null
    }
  } catch {
    // Guarded by popup events as well.
  }

  try {
    const originalSetItem = Storage.prototype.setItem
    Storage.prototype.setItem = function setItem(key, value) {
      if (authLike.test(`${key} ${value}`)) {
        let area = 'storage'
        try {
          area = this === window.localStorage ? 'localStorage' : this === window.sessionStorage ? 'sessionStorage' : area
        } catch {
          // Keep generic area name.
        }
        record('auth-storage-write', `${area}:${key}`)
      }
      return originalSetItem.call(this, key, value)
    }
  } catch {
    // Storage can be unavailable on opaque origins; every product fixture is same-origin.
  }

  try {
    const cookieDescriptor = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie')
      ?? Object.getOwnPropertyDescriptor(HTMLDocument.prototype, 'cookie')
    if (cookieDescriptor?.get && cookieDescriptor?.set && cookieDescriptor.configurable) {
      Object.defineProperty(Document.prototype, 'cookie', {
        configurable: true,
        enumerable: cookieDescriptor.enumerable,
        get() {
          return cookieDescriptor.get.call(this)
        },
        set(value) {
          if (authLike.test(String(value))) record('auth-cookie-write', value)
          return cookieDescriptor.set.call(this, value)
        },
      })
    }
  } catch {
    // Context cookie snapshots and navigation guards remain active.
  }

  try {
    const originalFetch = window.fetch.bind(window)
    window.fetch = (input, init) => {
      const raw = typeof input === 'string' || input instanceof URL ? String(input) : input.url
      const target = new URL(raw, window.location.href)
      if (target.origin !== window.location.origin || target.pathname.startsWith('/api/')) {
        record('fetch-capability', `${init?.method ?? 'GET'} ${target.href}`)
      }
      return originalFetch(input, init)
    }
  } catch {
    // Node-side request guard remains active.
  }

  try {
    const originalOpen = XMLHttpRequest.prototype.open
    XMLHttpRequest.prototype.open = function open(method, url, ...rest) {
      const target = new URL(String(url), window.location.href)
      if (target.origin !== window.location.origin || target.pathname.startsWith('/api/')) {
        record('xhr-capability', `${method} ${target.href}`)
      }
      return originalOpen.call(this, method, url, ...rest)
    }
  } catch {
    // Node-side request guard remains active.
  }

  try {
    const originalIndexedDbOpen = indexedDB.open.bind(indexedDB)
    indexedDB.open = (...args) => {
      record('indexeddb-open', args[0] ?? '')
      return originalIndexedDbOpen(...args)
    }
  } catch {
    // IndexedDB may be unavailable in a restricted browser context.
  }

  try {
    const originalCacheOpen = caches.open.bind(caches)
    caches.open = (...args) => {
      record('cache-storage-open', args[0] ?? '')
      return originalCacheOpen(...args)
    }
  } catch {
    // Cache Storage may be unavailable in a restricted browser context.
  }

  document.addEventListener('click', event => {
    const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null
    if (!anchor) return
    const target = new URL(anchor.href, window.location.href)
    if (!['http:', 'https:'].includes(target.protocol) || target.origin !== window.location.origin) {
      record('external-navigation-attempt', target.href)
    }
  }, true)
})

const page = await context.newPage()
const cdpSession = await context.newCDPSession(page)

page.on('console', message => {
  const messageText = message.text()
  if (messageText.includes(TOKEN_SENTINEL)) recordCapability('console-token-leak', messageText)
  if (message.type() === 'error') consoleErrors.push({ case: currentCase, text: redact(messageText) })
})
page.on('pageerror', error => pageErrors.push({ case: currentCase, text: redact(error) }))
page.on('popup', popup => {
  recordCapability('popup', popup.url())
  void popup.close()
})
page.on('framenavigated', frame => {
  if (frame !== page.mainFrame()) return
  const url = frame.url()
  if (url === 'about:blank') return
  try {
    if (new URL(url).origin !== baseOrigin) recordCapability('external-navigation', url)
  } catch {
    recordCapability('non-http-navigation', url)
  }
})
page.on('request', request => {
  const url = request.url()
  try {
    const target = new URL(url)
    if (url.includes(TOKEN_SENTINEL)) {
      const allowedResetDocument = request.resourceType() === 'document'
        && target.origin === baseOrigin
        && target.pathname === '/screens/05b'
        && target.searchParams.get('token') === TOKEN_SENTINEL
      if (!allowedResetDocument) recordCapability('token-request-leak', `${request.method()} ${url}`)
    }
    if (['http:', 'https:'].includes(target.protocol) && target.origin !== baseOrigin) {
      recordCapability('external-request', `${request.method()} ${url}`)
    }
    if (target.origin === baseOrigin && target.pathname.startsWith('/api/')) {
      recordCapability('api-request', `${request.method()} ${url}`)
    }
  } catch {
    // data/blob/devtools requests do not represent product network capability.
  }
})
page.on('websocket', socket => {
  try {
    if (new URL(socket.url()).origin !== baseOrigin.replace(/^http/, 'ws')) recordCapability('external-websocket', socket.url())
  } catch {
    // Ignore unparseable browser-internal sockets.
  }
})

function pass(name, evidence = {}) {
  checks.push({ name, status: 'pass', evidence })
}

async function twoAnimationFrames() {
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
}

async function resetScrollRecursively() {
  await page.evaluate(() => {
    window.scrollTo(0, 0)
    const roots = [
      document.querySelector('[data-testid="phone-frame"]'),
      document.querySelector('[data-testid="screen-content"]'),
    ].filter(Boolean)
    for (const root of roots) {
      for (const node of [root, ...root.querySelectorAll('*')]) {
        if (node instanceof HTMLElement || node instanceof SVGElement) {
          if ('scrollTop' in node) node.scrollTop = 0
          if ('scrollLeft' in node) node.scrollLeft = 0
        }
      }
    }
  })
  const scrollTop = await page.locator('[data-testid="screen-content"]').evaluate(node => node.scrollTop)
  assert(scrollTop === 0, `${currentCase}: screen-content scroll did not reset`)
}

async function openFixture(id, state, rootAttribute, extraQuery = {}) {
  currentCase = `${id}-${state ?? 'default'}`
  await page.goto('about:blank')
  await context.clearCookies()
  await cdpSession.send('Storage.clearDataForOrigin', { origin: baseOrigin, storageTypes: 'all' })
  const target = new URL(`/screens/${id}`, baseURL)
  if (state !== null && state !== undefined) target.searchParams.set('state', state)
  for (const [key, value] of Object.entries(extraQuery)) target.searchParams.set(key, value)
  const nonce = String(++navigationNonce)
  assert(!visitedNonces.has(nonce), `${currentCase}: navigation nonce reused`)
  visitedNonces.add(nonce)
  target.searchParams.set('__a2audit', nonce)
  assert(target.origin === baseOrigin, `${currentCase}: fixture target is not same-origin`)
  await page.goto(target.toString(), { waitUntil: 'networkidle' })
  const finalURL = new URL(page.url())
  assert(finalURL.origin === baseOrigin, `${currentCase}: fixture left the configured origin`)
  assert(finalURL.pathname === `/screens/${id}`, `${currentCase}: unexpected fixture path ${finalURL.pathname}`)
  assert(finalURL.searchParams.get('__a2audit') === nonce, `${currentCase}: nonce was not retained`)
  assert(finalURL.hash === '', `${currentCase}: fixture leaked hash state`)
  if (rootAttribute) {
    await page.waitForFunction(
      ({ rootAttribute, state }) => document.querySelector(`[${rootAttribute}]`)?.getAttribute(rootAttribute) === state,
      { rootAttribute, state },
    )
  }
  await twoAnimationFrames()
  const phone = page.locator('[data-testid="phone-frame"]')
  assert(await phone.count() === 1, `${currentCase}: phone frame missing`)
  await resetScrollRecursively()
  return phone
}

async function openHashFixture(id, state, rootAttribute) {
  currentCase = `${id}-hash-${state}`
  await page.goto('about:blank')
  await context.clearCookies()
  await cdpSession.send('Storage.clearDataForOrigin', { origin: baseOrigin, storageTypes: 'all' })
  const target = new URL(`/screens/${id}`, baseURL)
  const nonce = String(++navigationNonce)
  assert(!visitedNonces.has(nonce), `${currentCase}: navigation nonce reused`)
  visitedNonces.add(nonce)
  target.searchParams.set('__a2audit', nonce)
  target.hash = state
  await page.goto(target.toString(), { waitUntil: 'networkidle' })
  const finalURL = new URL(page.url())
  assert(finalURL.origin === baseOrigin, `${currentCase}: fixture left the configured origin`)
  assert(finalURL.pathname === `/screens/${id}`, `${currentCase}: unexpected fixture path ${finalURL.pathname}`)
  assert(finalURL.searchParams.get('__a2audit') === nonce, `${currentCase}: nonce was not retained`)
  assert(finalURL.hash === `#${state}`, `${currentCase}: hash fixture was not retained`)
  await page.waitForFunction(
    ({ rootAttribute, state }) => document.querySelector(`[${rootAttribute}]`)?.getAttribute(rootAttribute) === state,
    { rootAttribute, state },
  )
  await twoAnimationFrames()
  assert(await page.locator('[data-testid="phone-frame"]').count() === 1, `${currentCase}: phone frame missing`)
  await resetScrollRecursively()
}

async function waitData(selector, attribute, value, timeout = 5000) {
  await page.waitForFunction(
    ({ selector, attribute, value }) => document.querySelector(selector)?.getAttribute(attribute) === value,
    { selector, attribute, value },
    { timeout },
  )
  await twoAnimationFrames()
}

async function targetSize(locator, label, minimum = 44) {
  const box = await locator.boundingBox()
  assert(box && box.width >= minimum && box.height >= minimum, `${label}: expected at least ${minimum}×${minimum}, got ${box ? `${box.width}×${box.height}` : 'no box'}`)
  return box
}

async function inputContract(locator, label, tag = 'INPUT') {
  assert(await locator.evaluate(node => node.tagName) === tag, `${label}: expected native ${tag}`)
  await targetSize(locator, label)
  const fontSize = Number.parseFloat(await locator.evaluate(node => getComputedStyle(node).fontSize))
  assert(fontSize >= 16, `${label}: native input text must be at least 16px, got ${fontSize}px`)
}

async function visibleFocus(locator, label) {
  await page.evaluate(() => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
  })
  const before = await locator.evaluate(node => {
    const snapshots = []
    let current = node
    for (let depth = 0; current && depth < 4; depth += 1, current = current.parentElement) {
      const style = getComputedStyle(current)
      snapshots.push({
        outline: `${style.outlineStyle} ${style.outlineWidth} ${style.outlineColor}`,
        boxShadow: style.boxShadow,
        borderColor: style.borderColor,
      })
    }
    return snapshots
  })
  await page.keyboard.press('Tab')
  await locator.focus()
  const visible = await locator.evaluate((node, previous) => {
    if (!node.matches(':focus-visible')) return false
    let current = node
    for (let depth = 0; current && depth < 4; depth += 1, current = current.parentElement) {
      const style = getComputedStyle(current)
      const prior = previous[depth]
      const outline = `${style.outlineStyle} ${style.outlineWidth} ${style.outlineColor}`
      if (prior && outline !== prior.outline && style.outlineStyle !== 'none' && Number.parseFloat(style.outlineWidth) > 0) return true
      if (prior && style.boxShadow !== prior.boxShadow && style.boxShadow !== 'none') return true
      if (prior && style.borderColor !== prior.borderColor && style.borderColor === 'rgb(255, 94, 0)') return true
    }
    return false
  }, before)
  assert(visible, `${label}: no visible authored focus`)
}

async function fullWidth(locator, label) {
  const [buttonBox, phoneBox] = await Promise.all([
    locator.boundingBox(),
    page.locator('[data-testid="phone-frame"]').boundingBox(),
  ])
  assert(buttonBox && phoneBox && buttonBox.width >= phoneBox.width - 64, `${label}: action is not full width`)
  return buttonBox.width
}

async function fullyVisible(locator, label) {
  const [box, phone] = await Promise.all([
    locator.boundingBox(),
    page.locator('[data-testid="phone-frame"]').boundingBox(),
  ])
  assert(
    box && phone
      && box.x >= phone.x
      && box.y >= phone.y
      && box.x + box.width <= phone.x + phone.width
      && box.y + box.height <= phone.y + phone.height,
    `${label}: not fully visible in phone frame`,
  )
}

async function actionContrast(locator, label) {
  const read = () => locator.evaluate(node => {
    const style = getComputedStyle(node)
    return { color: style.color, background: style.backgroundColor }
  })
  const ratioFor = pair => contrast(parseColor(pair.color), parseColor(pair.background))
  const normal = ratioFor(await read())
  await locator.hover()
  const hover = ratioFor(await read())
  const box = await locator.boundingBox()
  assert(box, `${label}: action missing`)
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
  await page.mouse.down()
  const pressed = ratioFor(await read())
  await page.mouse.move(1, 1)
  await page.mouse.up()
  assert(normal >= 4.5 && hover >= 4.5 && pressed >= 4.5, `${label}: action contrast ${normal.toFixed(2)}/${hover.toFixed(2)}/${pressed.toFixed(2)}`)
  return { normal, hover, pressed }
}

async function assertReducedMotion(label) {
  const reduced = await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)
  assert(reduced, `${label}: reduced-motion media query is not active`)
  const loops = await page.locator('[data-testid="phone-frame"] *').evaluateAll(nodes => nodes.flatMap(node => {
    const style = getComputedStyle(node)
    const names = style.animationName.split(',').map(value => value.trim())
    const iterations = style.animationIterationCount.split(',').map(value => value.trim())
    const hasLoop = names.some((name, index) => name !== 'none' && (iterations[index] === 'infinite' || Number(iterations[index]) > 1))
    return hasLoop && style.animationPlayState !== 'paused'
      ? [`${node.tagName.toLowerCase()}.${String(node.className).slice(0, 80)}:${style.animationName}`]
      : []
  }))
  assert(loops.length === 0, `${label}: reduced-motion loop(s) remain: ${loops.join(' | ')}`)
}

async function auditNativeControls(label, focus = false) {
  const fauxControls = await page.locator('[data-testid="phone-frame"] [role="button"], [data-testid="phone-frame"] [role="link"]').evaluateAll(nodes => nodes.flatMap(node => {
    const native = node.tagName === 'BUTTON' || node.tagName === 'A'
    return native ? [] : [`${node.tagName.toLowerCase()}[role=${node.getAttribute('role')}]`]
  }))
  assert(fauxControls.length === 0, `${label}: non-native action semantics: ${fauxControls.join(', ')}`)

  const controls = page.locator('[data-testid="phone-frame"] button, [data-testid="phone-frame"] a[href], [data-testid="phone-frame"] input, [data-testid="phone-frame"] select, [data-testid="phone-frame"] textarea')
  for (let index = 0; index < await controls.count(); index += 1) {
    const control = controls.nth(index)
    if (!(await control.isVisible())) continue
    const description = await control.evaluate(node => {
      const label = node.getAttribute('aria-label')
        || ('labels' in node && node.labels?.[0]?.textContent?.trim())
        || node.textContent?.trim()
        || node.getAttribute('placeholder')
        || node.tagName
      return String(label).replace(/\s+/g, ' ').trim()
    })
    assert(description.length > 0, `${label}: visible control ${index + 1} has no accessible label text`)
    await targetSize(control, `${label} control ${description}`)
    const tagName = await control.evaluate(node => node.tagName)
    if (['INPUT', 'SELECT', 'TEXTAREA'].includes(tagName)) await inputContract(control, `${label} ${description}`, tagName)
    if (focus && !(await control.isDisabled())) await visibleFocus(control, `${label} ${description}`)
  }
  await resetScrollRecursively()
}

async function auditFixture(label, { focus = false } = {}) {
  const phone = page.locator('[data-testid="phone-frame"]')
  assert(await page.locator('[data-testid="phone-frame"] h1').count() === 1, `${label}: expected exactly one h1`)
  const geometry = await phone.evaluate(node => {
    const box = node.getBoundingClientRect()
    return {
      width: Math.round(box.width),
      height: Math.round(box.height),
      horizontalOverflow: node.scrollWidth > node.clientWidth + 1,
    }
  })
  assert(geometry.width === 390 && geometry.height === 844, `${label}: expected 390×844 phone, got ${geometry.width}×${geometry.height}`)
  assert(!geometry.horizontalOverflow, `${label}: horizontal phone-frame overflow`)
  await auditNativeControls(label, focus)
  return geometry
}

async function capture(name) {
  if (!shotsDir) return
  const fileName = `${name}.png`
  assert(expectedScreenshotSet.has(fileName), `${name}: screenshot is not in the canonical A2 matrix`)
  assert(!capturedScreenshotSet.has(fileName), `${name}: duplicate screenshot capture`)
  await assertReducedMotion(name)
  const phone = page.locator('[data-testid="phone-frame"]')
  const freezeStyle = await page.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}' })
  await phone.evaluate(async node => {
    node.style.transform = 'translateZ(0)'
    node.style.filter = 'brightness(0.9999)'
    void node.getBoundingClientRect()
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  })
  const output = path.join(path.resolve(shotsDir), fileName)
  await phone.screenshot({ path: output, animations: 'disabled', scale: 'css' })
  await phone.evaluate(node => {
    node.style.removeProperty('transform')
    node.style.removeProperty('filter')
  })
  await freezeStyle.evaluate(node => node.remove())
  assert(fs.statSync(output).size > 0, `${name}: screenshot is empty`)
  capturedScreenshotSet.add(fileName)
}

async function assertTokenSecret(label) {
  const leaked = await page.evaluate(token => {
    const root = document.documentElement
    const phone = document.querySelector('[data-testid="phone-frame"]')
    if (!phone) return true
    const propertyLeak = [...root.querySelectorAll('input, textarea, select')].some(element => 'value' in element && String(element.value).includes(token))
    const pseudoLeak = [...phone.querySelectorAll('*')].some(element => {
      const before = getComputedStyle(element, '::before').content
      const after = getComputedStyle(element, '::after').content
      return before.includes(token) || after.includes(token)
    })
    const resourceLeak = performance.getEntriesByType('resource').some(entry => entry.name.includes(token))
    return phone.innerText.includes(token) || phone.outerHTML.includes(token) || propertyLeak || pseudoLeak || resourceLeak
  }, TOKEN_SENTINEL)
  assert(!leaked, `${label}: reset token sentinel leaked into rendered evidence`)
  const originStorageLeak = await page.evaluate(token => {
    const storageValues = []
    for (const storage of [localStorage, sessionStorage]) {
      for (let index = 0; index < storage.length; index += 1) {
        const key = storage.key(index) ?? ''
        storageValues.push(key, storage.getItem(key) ?? '')
      }
    }
    return storageValues.some(value => value.includes(token))
  }, TOKEN_SENTINEL)
  assert(!originStorageLeak, `${label}: reset token sentinel leaked into origin storage`)
  const cookieLeak = (await context.cookies()).some(cookie => cookie.name.includes(TOKEN_SENTINEL) || cookie.value.includes(TOKEN_SENTINEL))
  assert(!cookieLeak, `${label}: reset token sentinel leaked into cookies`)
}

async function assertSameWidth(locator, expectedWidth, label) {
  const box = await locator.boundingBox()
  assert(box && Math.abs(box.width - expectedWidth) <= 1, `${label}: loading/action width changed from ${expectedWidth} to ${box?.width ?? 'missing'}`)
}

async function assertHref(locator, expected, label) {
  assert(await locator.getAttribute('href') === expected, `${label}: expected ${expected}`)
}

async function assertNoForbiddenCapabilities() {
  await page.evaluate(() => Promise.resolve())
  assert(capabilityEvents.length === 0, `Forbidden capability event(s): ${capabilityEvents.map(event => `${event.case}:${event.type}:${event.detail}`).join(' | ')}`)
}

function currentScreenshots() {
  if (!shotsDir) return []
  return fs.readdirSync(path.resolve(shotsDir)).filter(file => file.endsWith('.png')).sort()
}

function assertExpectedScreenshots() {
  if (!shotsDir) return
  const actual = currentScreenshots()
  const missing = EXPECTED_SCREENSHOTS.filter(file => !actual.includes(file))
  const unexpected = actual.filter(file => !expectedScreenshotSet.has(file))
  assert(missing.length === 0 && unexpected.length === 0, `Screenshot set mismatch. Missing: ${missing.join(', ') || 'none'}. Unexpected: ${unexpected.join(', ') || 'none'}.`)
  assert(actual.length === EXPECTED_SCREENSHOTS.length, `Expected ${EXPECTED_SCREENSHOTS.length} screenshots, found ${actual.length}`)
}

function assertScreenshotDelta(baseline, changed, label) {
  if (!shotsDir) return
  const readHash = file => createHash('sha256').update(fs.readFileSync(path.join(path.resolve(shotsDir), file))).digest('hex')
  assert(readHash(baseline) !== readHash(changed), `${label}: ${baseline} and ${changed} are byte-identical`)
}

function buildReport(status, error) {
  sourceHashEnd = fingerprint(SOURCE_FILES)
  apiHashEnd = fingerprint(API_FILES)
  return {
    auditedAt: new Date().toISOString(),
    baseURL,
    viewport: { width: 1440, height: 1000 },
    phoneFrame: { width: 390, height: 844 },
    reducedMotion: 'reduce',
    navigationIsolation: {
      strategy: 'about:blank + Chromium origin-storage clear + cookie clear + same-origin query/hash nonce',
      uniqueNonces: visitedNonces.size,
      fixtureTransports: ['query', 'hash'],
    },
    integrity: {
      source: { files: SOURCE_FILES, start: sourceHashStart, end: sourceHashEnd, unchanged: sourceHashStart === sourceHashEnd },
      api: { files: API_FILES, start: apiHashStart, end: apiHashEnd, unchanged: apiHashStart === apiHashEnd },
    },
    expectedScreenshots: shotsDir ? EXPECTED_SCREENSHOTS : [],
    screenshots: currentScreenshots(),
    checks,
    consoleErrors,
    pageErrors,
    capabilityEvents,
    status,
    ...(error ? { error: redact(error instanceof Error ? error.stack || error.message : error) } : {}),
  }
}

function writeReport(report, stream = 'log') {
  const json = `${JSON.stringify(report, null, 2)}\n`
  assert(!json.includes(TOKEN_SENTINEL), 'JSON evidence leaked the reset token sentinel')
  if (outPath) fs.writeFileSync(path.resolve(outPath), json)
  console[stream](json.trimEnd())
}

try {
  // S05 — recovery request.
  await openFixture('05', 'default', 'data-recovery-state')
  await auditFixture('05 default', { focus: true })
  let recoveryEmail = page.getByLabel('Email address')
  await inputContract(recoveryEmail, '05 Email address')
  assert(await recoveryEmail.getAttribute('type') === 'email', '05 default: email type must be email')
  assert(await recoveryEmail.getAttribute('autocomplete') === 'email', '05 default: email autocomplete missing')
  let recoverySubmit = page.getByRole('button', { name: 'Send reset link' })
  assert(await recoverySubmit.isDisabled(), '05 default: Send reset link must be disabled')
  assert(await page.getByText('Request previewed', { exact: true }).count() === 0, '05 default: confirmation is visible')
  assert(await page.getByRole('button', { name: 'Send again' }).count() === 0, '05 default: resend is visible')
  await capture('05-default')

  await openFixture('05', 'filled', 'data-recovery-state')
  await auditFixture('05 filled')
  recoveryEmail = page.getByLabel('Email address')
  assert(await recoveryEmail.inputValue() === 'amira@example.com', '05 filled: fixture email missing')
  recoverySubmit = page.getByRole('button', { name: 'Send reset link' })
  assert(!(await recoverySubmit.isDisabled()), '05 filled: Send reset link disabled')
  const recoveryWidth = await fullWidth(recoverySubmit, '05 Send reset link')
  const recoveryContrast = await actionContrast(recoverySubmit, '05 Send reset link')
  await capture('05-filled')
  await recoveryEmail.press('Enter')
  await waitData('[data-recovery-state]', 'data-recovery-state', 'loading')
  const interactiveRecoveryLoading = page.getByRole('button', { name: 'Preparing preview' })
  assert(await interactiveRecoveryLoading.getAttribute('aria-busy') === 'true', '05 interactive loading: aria-busy missing')
  await assertSameWidth(interactiveRecoveryLoading, recoveryWidth, '05 interactive loading')
  await waitData('[data-recovery-state]', 'data-recovery-state', 'success')
  await page.getByText(/No account lookup or email was sent/i).waitFor()

  await openFixture('05', 'loading', 'data-recovery-state')
  await auditFixture('05 loading')
  const recoveryLoading = page.getByRole('button', { name: 'Preparing preview' })
  assert(await recoveryLoading.getAttribute('aria-busy') === 'true', '05 loading: aria-busy missing')
  await assertSameWidth(recoveryLoading, recoveryWidth, '05 loading')
  assert(await page.getByLabel('Email address').isDisabled(), '05 loading: email enabled')
  assert(await page.getByText('Request previewed', { exact: true }).count() === 0, '05 loading: confirmation is visible')
  await capture('05-loading')

  await openFixture('05', 'success', 'data-recovery-state')
  await auditFixture('05 success')
  assert(await page.locator('form').count() === 0, '05 success: request form remains')
  await page.getByText('Destination a***@example.com', { exact: true }).waitFor()
  const recoverySuccessText = await page.locator('[data-recovery-state]').innerText()
  assert(!recoverySuccessText.includes('amira@example.com'), '05 success: raw email leaked')
  assert(recoverySuccessText.includes('If that email matches an account'), '05 success: enumeration-safe sentence missing')
  const recoveryLive = page.locator('#recovery-status[aria-live="polite"][aria-atomic="true"]')
  assert(await recoveryLive.count() === 1, '05 success: persistent atomic live region missing')
  assert((await recoveryLive.textContent())?.includes('a***@example.com'), '05 success: live confirmation omits masked destination')
  await targetSize(page.getByRole('button', { name: 'Send again' }), '05 Send again')
  const recoveryBack = page.getByTestId('screen-content').getByRole('link', { name: 'Back to sign in' })
  await targetSize(recoveryBack, '05 Back to sign in')
  await assertHref(recoveryBack, '/screens/04', '05 Back to sign in')
  await capture('05-success')

  for (const state of ['offline', 'error']) {
    await openFixture('05', state, 'data-recovery-state')
    await auditFixture(`05 ${state}`)
    assert(await page.locator('form').count() === 1, `05 ${state}: request form missing`)
    assert(await page.getByText('Request previewed', { exact: true }).count() === 0, `05 ${state}: confirmation visible`)
    if (state === 'offline') {
      assert(!(await page.getByLabel('Email address').isDisabled()), '05 offline: email should remain editable')
      assert(await page.getByRole('button', { name: 'Send reset link' }).isDisabled(), '05 offline: submit enabled')
    } else {
      assert(await page.getByLabel('Email address').getAttribute('aria-invalid') === 'true', '05 error: aria-invalid missing')
    }
    await capture(`05-${state}`)
  }

  await openFixture('05', 'cooldown', 'data-recovery-state')
  const cooldownButton = page.getByRole('button', { name: 'Resend unavailable' })
  assert(await cooldownButton.isDisabled(), '05 cooldown: resend enabled')
  const countdown = page.locator('[aria-label$="seconds remaining"]')
  assert(await countdown.count() === 1, '05 cooldown: countdown missing')
  assert(await countdown.evaluate(node => node.closest('[aria-live]') === null), '05 cooldown: per-second countdown is inside a live region')
  await capture('05-cooldown-start')
  await waitData('[data-recovery-state]', 'data-recovery-state', 'success', 5000)
  await page.getByText('Resend is available now. No email has been sent.', { exact: true }).waitFor()
  await capture('05-cooldown-ended')

  await openFixture('05', 'success', 'data-recovery-state')
  await page.getByRole('button', { name: 'Send again' }).click()
  await waitData('[data-recovery-state]', 'data-recovery-state', 'cooldown')
  assert(await page.getByRole('button', { name: 'Resend unavailable' }).isDisabled(), '05 resend: cooldown did not disable action')
  await capture('05-resend-cooldown')
  await openHashFixture('05', 'filled', 'data-recovery-state')
  assert(await page.getByLabel('Email address').inputValue() === 'amira@example.com', '05 hash fixture: filled state not applied')
  pass('05 recovery request', { fixtures: 7, mutuallyExclusive: true, masked: true, cooldownExpires: true, widthLocked: true, contrast: recoveryContrast })

  // S05b — reset-token and local password rules.
  const openReset = state => openFixture('05b', state, 'data-reset-state', { token: TOKEN_SENTINEL })

  await openReset('default')
  await auditFixture('05b default', { focus: true })
  let newPassword = page.getByLabel('New password', { exact: true })
  let confirmPassword = page.getByLabel('Confirm new password', { exact: true })
  await inputContract(newPassword, '05b New password')
  await inputContract(confirmPassword, '05b Confirm new password')
  assert(await newPassword.getAttribute('type') === 'password' && await confirmPassword.getAttribute('type') === 'password', '05b default: password field types wrong')
  assert(await newPassword.getAttribute('autocomplete') === 'new-password' && await confirmPassword.getAttribute('autocomplete') === 'new-password', '05b default: autocomplete missing')
  assert(await page.getByRole('list', { name: '0 of 5 password rules met' }).count() === 1, '05b default: rule count wrong')
  assert(await page.locator('#password-rules[aria-live="polite"][aria-atomic="true"]').count() === 1, '05b default: password-rule live contract missing')
  const requiredRules = ['8+ characters', 'Uppercase letter', 'Lowercase letter', 'Number', 'Special character']
  for (const rule of requiredRules) assert(await page.getByText(rule, { exact: true }).count() === 1, `05b default: missing rule ${rule}`)
  assert(await page.getByText('Enter both', { exact: true }).count() === 1, '05b default: match state wrong')
  assert(await page.getByRole('button', { name: 'Reset password' }).isDisabled(), '05b default: Reset password enabled')
  await assertTokenSecret('05b default')
  await assertHref(page.getByRole('link', { name: 'Privacy' }), '/legal/privacy', '05b Privacy')
  await capture('05b-default')

  await openReset('filled')
  await auditFixture('05b filled')
  newPassword = page.getByLabel('New password', { exact: true })
  confirmPassword = page.getByLabel('Confirm new password', { exact: true })
  assert(await newPassword.inputValue() === 'ClearSky!2040' && await confirmPassword.inputValue() === 'ClearSky!2040', '05b filled: fixture passwords missing')
  const resetSubmit = page.getByRole('button', { name: 'Reset password' })
  assert(!(await resetSubmit.isDisabled()), '05b filled: Reset password disabled')
  const resetWidth = await fullWidth(resetSubmit, '05b Reset password')
  const resetContrast = await actionContrast(resetSubmit, '05b Reset password')
  await assertTokenSecret('05b filled')
  await capture('05b-filled')

  const newPasswordShell = newPassword.locator('xpath=parent::*')
  const confirmPasswordShell = confirmPassword.locator('xpath=parent::*')
  const shellsBeforeReveal = await Promise.all([newPasswordShell.boundingBox(), confirmPasswordShell.boundingBox()])
  await page.getByRole('button', { name: 'Show new password' }).click()
  await page.getByRole('button', { name: 'Show confirmation password' }).click()
  assert(await newPassword.getAttribute('type') === 'text' && await confirmPassword.getAttribute('type') === 'text', '05b reveal: inputs did not reveal')
  assert(await page.getByRole('button', { name: 'Hide new password' }).count() === 1, '05b reveal: Hide new password missing')
  assert(await page.getByRole('button', { name: 'Hide confirmation password' }).count() === 1, '05b reveal: Hide confirmation missing')
  const shellsAfterReveal = await Promise.all([newPasswordShell.boundingBox(), confirmPasswordShell.boundingBox()])
  for (let index = 0; index < shellsBeforeReveal.length; index += 1) {
    assert(shellsBeforeReveal[index] && shellsAfterReveal[index]
      && Math.abs(shellsBeforeReveal[index].width - shellsAfterReveal[index].width) <= 1
      && Math.abs(shellsBeforeReveal[index].height - shellsAfterReveal[index].height) <= 1, `05b reveal: field ${index + 1} geometry changed`)
  }
  await capture('05b-password-visible')

  await openReset('default')
  newPassword = page.getByLabel('New password', { exact: true })
  confirmPassword = page.getByLabel('Confirm new password', { exact: true })
  await newPassword.fill('Balencia1!')
  await confirmPassword.fill('Balencia2!')
  assert(await page.getByRole('list', { name: '5 of 5 password rules met' }).count() === 1, '05b mismatch: all deterministic rules not met')
  assert(await page.getByText('Not matched', { exact: true }).count() === 1, '05b mismatch: mismatch state missing')
  assert(await page.getByRole('button', { name: 'Reset password' }).isDisabled(), '05b mismatch: submit enabled')
  await capture('05b-mismatch')
  await confirmPassword.fill('Balencia1!')
  const interactiveReset = page.getByRole('button', { name: 'Reset password' })
  assert(!(await interactiveReset.isDisabled()), '05b match: submit disabled')
  await interactiveReset.click()
  await waitData('[data-reset-state]', 'data-reset-state', 'loading')
  const interactiveResetLoading = page.getByRole('button', { name: 'Preparing preview' })
  assert(await interactiveResetLoading.getAttribute('aria-busy') === 'true', '05b interactive loading: busy missing')
  assert(await page.getByLabel('New password', { exact: true }).isDisabled() && await page.getByLabel('Confirm new password', { exact: true }).isDisabled(), '05b interactive loading: inputs enabled')
  await assertSameWidth(interactiveResetLoading, resetWidth, '05b interactive loading')
  await capture('05b-interactive-loading')
  await waitData('[data-reset-state]', 'data-reset-state', 'success')
  await page.getByText(/No password or reset-link data was sent/i).first().waitFor()
  await assertTokenSecret('05b interactive success')

  for (const state of ['loading', 'missing', 'invalid', 'expired', 'rate-limit', 'offline', 'success']) {
    await openReset(state)
    await auditFixture(`05b ${state}`)
    await assertTokenSecret(`05b ${state}`)
    if (state === 'loading') {
      const loadingReset = page.getByRole('button', { name: 'Preparing preview' })
      assert(await loadingReset.getAttribute('aria-busy') === 'true', '05b loading: busy missing')
      assert(await page.getByLabel('New password', { exact: true }).isDisabled() && await page.getByLabel('Confirm new password', { exact: true }).isDisabled(), '05b loading: inputs enabled')
      await assertSameWidth(loadingReset, resetWidth, '05b loading')
    }
    if (['missing', 'invalid', 'expired'].includes(state)) {
      assert(await page.locator('form').count() === 0, `05b ${state}: form remains visible`)
      const terminalLive = page.locator('#reset-status[aria-live="polite"][aria-atomic="true"]')
      assert((await terminalLive.textContent())?.trim().length > 0, `05b ${state}: persistent token-status announcement missing`)
      await assertHref(page.getByRole('link', { name: 'Request a new link' }), '/screens/05', `05b ${state} Request a new link`)
      await assertHref(page.getByRole('link', { name: 'Back to sign in' }), '/screens/04', `05b ${state} Back to sign in`)
    }
    if (state === 'rate-limit') {
      assert(await page.getByLabel('New password', { exact: true }).isDisabled() && await page.getByLabel('Confirm new password', { exact: true }).isDisabled(), '05b rate-limit: inputs enabled')
      assert(await page.getByText(/No server retry-after value is available/i).count() >= 1, '05b rate-limit: honest-null retry copy missing')
    }
    if (state === 'offline') {
      assert(!(await page.getByLabel('New password', { exact: true }).isDisabled()) && !(await page.getByLabel('Confirm new password', { exact: true }).isDisabled()), '05b offline: inputs not editable')
      assert(await page.getByRole('button', { name: 'Reset password' }).isDisabled(), '05b offline: submit enabled')
    }
    if (state === 'success') await assertHref(page.getByRole('link', { name: 'Continue to sign in' }), '/screens/04', '05b success Continue')
    await assertHref(page.getByRole('link', { name: 'Privacy' }), '/legal/privacy', `05b ${state} Privacy`)
    await capture(`05b-${state}`)
  }
  await openHashFixture('05b', 'expired', 'data-reset-state')
  await page.getByRole('heading', { name: 'Your link needs refreshing' }).waitFor()
  pass('05b reset password', { fixtures: 9, nativePasswords: true, rules: 5, revealGeometryStable: true, tokenHidden: true, widthLocked: true, contrast: resetContrast })

  // S06 — guest preview.
  const guestDomainNames = ['Fitness', 'Nutrition', 'Mental wellbeing', 'Finance', 'Career', 'Relationships', 'Spirituality', 'Learning', 'Creativity']

  await openFixture('06', 'default', 'data-guest-state')
  await auditFixture('06 default', { focus: true })
  let guestName = page.getByLabel('Your name')
  await inputContract(guestName, '06 Your name')
  assert(await guestName.getAttribute('autocomplete') === 'given-name', '06: name autocomplete missing')
  let guestChoices = page.locator('button[aria-pressed]')
  assert(await guestChoices.count() === 9, '06 default: expected exactly nine life-area buttons')
  for (const name of guestDomainNames) {
    const choice = page.getByRole('button', { name, exact: true })
    assert(await choice.count() === 1, `06 default: missing ${name}`)
    assert(await choice.getAttribute('aria-pressed') === 'false', `06 default: ${name} preselected`)
    await targetSize(choice, `06 ${name}`)
  }
  assert(await page.getByRole('button', { name: 'Explore as guest' }).isDisabled(), '06 default: Explore enabled')
  assert(await page.getByText('Demo · illustrative', { exact: true }).count() === 0, '06 default: demo provenance shown for honest null')
  assert(!(await page.locator('[data-guest-state]').innerText()).includes('Life Power'), '06 default: illustrative preview presented as Life Power')
  await capture('06-default')

  await openFixture('06', 'name-only', 'data-guest-state')
  await auditFixture('06 name-only')
  assert(await page.getByLabel('Your name').inputValue() === 'Amira', '06 name-only: name missing')
  assert(await page.locator('button[aria-pressed="true"]').count() === 0, '06 name-only: area selected')
  assert(await page.getByRole('button', { name: 'Explore as guest' }).isDisabled(), '06 name-only: Explore enabled')
  await capture('06-name-only')

  await openFixture('06', 'populated', 'data-guest-state')
  await auditFixture('06 populated')
  guestChoices = page.locator('button[aria-pressed="true"]')
  const populatedCount = await guestChoices.count()
  assert(populatedCount >= 1 && populatedCount <= 3, `06 populated: invalid selection count ${populatedCount}`)
  await page.getByText(`${populatedCount} / 3`, { exact: true }).waitFor()
  await page.getByText('Demo · illustrative', { exact: true }).waitFor()
  const guestSubmit = page.getByRole('button', { name: 'Explore as guest' })
  assert(!(await guestSubmit.isDisabled()), '06 populated: Explore disabled')
  const guestWidth = await fullWidth(guestSubmit, '06 Explore as guest')
  const guestContrast = await actionContrast(guestSubmit, '06 Explore as guest')
  await assertHref(page.getByRole('link', { name: 'Sign in instead' }), '/screens/04', '06 Sign in instead')
  await capture('06-populated')

  for (const state of ['cap-error', 'loading', 'error', 'success']) {
    await openFixture('06', state, 'data-guest-state')
    await auditFixture(`06 ${state}`)
    if (state === 'cap-error') {
      assert(await page.locator('button[aria-pressed="true"]').count() === 3, '06 cap-error: prior three selections not retained')
      await page.getByText('Pick up to 3 areas. Your three selections are unchanged.', { exact: true }).waitFor()
      assert(await page.getByRole('button', { name: 'Finance' }).getAttribute('aria-pressed') === 'false', '06 cap-error: fourth choice selected')
    }
    if (state === 'loading') {
      const loadingGuest = page.getByRole('button', { name: 'Preparing preview' })
      assert(await loadingGuest.getAttribute('aria-busy') === 'true', '06 loading: busy missing')
      await assertSameWidth(loadingGuest, guestWidth, '06 loading')
      assert(await page.getByLabel('Your name').isDisabled(), '06 loading: controls enabled')
    }
    if (state === 'error') {
      const retry = page.getByRole('button', { name: 'Try preview again' })
      assert(!(await retry.isDisabled()), '06 error: retry disabled')
      await page.getByText(/Your local choices are intact/i).waitFor()
    }
    if (state === 'success') {
      assert(await page.getByRole('button', { name: 'Preview ready' }).isDisabled(), '06 success: terminal action enabled')
      await page.getByText(/No guest account or session was created/i).waitFor()
    }
    await capture(`06-${state}`)
  }

  await openFixture('06', 'default', 'data-guest-state')
  guestName = page.getByLabel('Your name')
  await guestName.fill('Amira')
  for (const name of ['Fitness', 'Nutrition', 'Mental wellbeing']) await page.getByRole('button', { name, exact: true }).click()
  await waitData('[data-guest-state]', 'data-guest-state', 'populated')
  assert(await page.locator('button[aria-pressed="true"]').count() === 3, '06 interactive: three choices not selected')
  await page.getByText('3 / 3', { exact: true }).waitFor()
  await capture('06-three-selected')
  await page.getByRole('button', { name: 'Finance', exact: true }).click()
  await waitData('[data-guest-state]', 'data-guest-state', 'cap-error')
  assert(await page.locator('button[aria-pressed="true"]').count() === 3, '06 fourth choice: prior selections changed')
  assert(await page.getByRole('button', { name: 'Finance' }).getAttribute('aria-pressed') === 'false', '06 fourth choice: rejected choice became selected')
  await page.getByText('Pick up to 3 areas. Your three selections are unchanged.', { exact: true }).waitFor()
  assert(await page.locator('#guest-cap-status[role="status"][aria-live="polite"][aria-atomic="true"]').count() === 1, '06 fourth choice: live cap rejection missing')
  await capture('06-fourth-rejected')

  await openFixture('06', 'populated', 'data-guest-state')
  const interactiveGuest = page.getByRole('button', { name: 'Explore as guest' })
  await interactiveGuest.click()
  await waitData('[data-guest-state]', 'data-guest-state', 'loading')
  await assertSameWidth(page.getByRole('button', { name: 'Preparing preview' }), guestWidth, '06 interactive loading')
  await waitData('[data-guest-state]', 'data-guest-state', 'success')
  await page.getByText(/No guest account or session was created/i).waitFor()
  await openHashFixture('06', 'cap-error', 'data-guest-state')
  assert(await page.locator('button[aria-pressed="true"]').count() === 3, '06 hash fixture: cap-error state not applied')
  pass('06 guest preview', { fixtures: 7, domains: 9, capRetainsSelection: true, illustrativeOnly: true, noSession: true, widthLocked: true, contrast: guestContrast })

  // S07 — accepted CIA onboarding sentinel.
  await openFixture('07', null, null)
  await auditFixture('07 default', { focus: true })
  const orb = page.locator('[data-cia-state]')
  assert(await orb.getAttribute('data-cia-state') === 'idle', '07 default: CIA orb not idle')
  assert(await orb.getAttribute('aria-label') === 'CIA presence, idle', '07 default: idle orb name wrong')
  let voice = page.getByRole('button', { name: 'Start voice input' })
  assert(await voice.getAttribute('aria-describedby') === 'onboarding-voice-disclosure', '07: mic disclosure not associated')
  assert(await voice.getAttribute('aria-pressed') === 'false', '07: mic starts pressed')
  await targetSize(voice, '07 Start voice input')
  const messageInput = page.getByLabel('Message CIA')
  await inputContract(messageInput, '07 Message CIA')
  await visibleFocus(messageInput, '07 Message CIA')
  assert(await page.getByRole('button', { name: 'Attachments unavailable in this prototype' }).isDisabled(), '07: unavailable attachment enabled')
  assert(await page.getByRole('button', { name: 'Send message' }).isDisabled(), '07: empty send enabled')
  for (const name of ['Privacy controls', 'Crisis support']) await targetSize(page.getByRole('button', { name }), `07 ${name}`)
  await assertReducedMotion('07 default orb')
  await capture('07-default')

  await voice.click()
  await waitData('[data-cia-state]', 'data-cia-state', 'listening')
  voice = page.getByRole('button', { name: 'Stop voice input' })
  assert(await voice.getAttribute('aria-pressed') === 'true', '07 listening: mic pressed state missing')
  assert(await orb.getAttribute('aria-label') === 'CIA presence, listening', '07 listening: orb name wrong')
  await assertReducedMotion('07 listening orb')
  await capture('07-listening')
  await voice.click()
  await waitData('[data-cia-state]', 'data-cia-state', 'idle')

  await openFixture('07', null, null)
  const privacyButton = page.getByRole('button', { name: 'Privacy controls' })
  await privacyButton.click()
  assert(await privacyButton.getAttribute('aria-expanded') === 'true', '07 privacy: panel state missing')
  const privacyDisclosure = page.getByText(/Voice transcripts stay in CIA chat history until you delete them/i)
  await privacyDisclosure.waitFor()
  await privacyDisclosure.scrollIntoViewIfNeeded()
  await capture('07-privacy')

  await openFixture('07', null, null)
  const crisisButton = page.getByRole('button', { name: 'Crisis support' })
  await crisisButton.click()
  assert(await crisisButton.getAttribute('aria-expanded') === 'true', '07 crisis: panel state missing')
  const crisisDisclosure = page.getByText(/contact local emergency services/i)
  await crisisDisclosure.waitFor()
  await crisisDisclosure.scrollIntoViewIfNeeded()
  await capture('07-crisis')

  await openFixture('07', null, null)
  await messageInput.fill('Show me a steadier week')
  const sendMessage = page.getByRole('button', { name: 'Send message' })
  assert(!(await sendMessage.isDisabled()), '07 text: send remained disabled')
  await sendMessage.click()
  assert(await messageInput.inputValue() === '', '07 text: composer did not clear')
  const sentMessage = page.getByText('Show me a steadier week', { exact: true })
  await sentMessage.waitFor()
  await sentMessage.scrollIntoViewIfNeeded()
  await capture('07-text-send')

  await openFixture('07', null, null)
  const fitnessFocus = page.getByRole('button', { name: 'Fitness', exact: true })
  await fitnessFocus.click()
  assert(await fitnessFocus.getAttribute('aria-pressed') === 'true', '07 focus: Fitness not pressed')
  await page.getByText('Focus areas selected: Fitness.', { exact: true }).waitFor()
  const skipHealth = page.getByRole('button', { name: 'Skip health data' })
  await skipHealth.click()
  assert(await skipHealth.getAttribute('aria-pressed') === 'true', '07 health skip: pressed state missing')
  assert(await fitnessFocus.getAttribute('aria-pressed') === 'false', '07 health skip: Fitness not cleared')
  const skipHealthStatus = page.getByText('Health data will be skipped.', { exact: true })
  await skipHealthStatus.waitFor()
  await skipHealthStatus.scrollIntoViewIfNeeded()
  await capture('07-skip-health')
  pass('07 CIA onboarding sentinel', { idleDefault: true, listeningExplicit: true, disclosure: true, textFallback: true, privacyAndCrisis: true, reducedMotionStatic: true })

  // S08 — plan truth.
  const timelineName = 'Plan timeline. Day one. Milestone 1 of 5, Week 1, July 10, current.'

  await openFixture('08', 'default', 'data-plan-state')
  await auditFixture('08 default', { focus: true })
  assert(await page.getByRole('img', { name: timelineName, exact: true }).count() === 1, '08 default: exact timeline sentence missing')
  await page.getByText('Week 1 · July 10', { exact: true }).waitFor()
  await page.getByText('Current', { exact: true }).waitFor()
  assert(await page.locator('[data-domain-count="10"]').count() === 1, '08 default: ten-domain radar contract missing')
  const enterToday = page.getByRole('button', { name: 'Enter Today' })
  const planWidth = await fullWidth(enterToday, '08 Enter Today')
  const planContrast = await actionContrast(enterToday, '08 Enter Today')
  await capture('08-default')
  await enterToday.click()
  await waitData('[data-plan-state]', 'data-plan-state', 'success')
  await page.getByText(/No backend transition was requested/i).waitFor()

  await openFixture('08', 'minimal', 'data-plan-state')
  await auditFixture('08 minimal')
  await page.getByText('A small starting point', { exact: true }).waitFor()
  await page.getByText('CIA starter · estimated', { exact: true }).waitFor()
  assert(await page.locator('[data-domain-count="10"]').count() === 1, '08 minimal: ten-domain payload missing')
  const minimalRadarName = await page.locator('[data-domain-count="10"]').getAttribute('aria-label')
  assert(minimalRadarName?.startsWith('Life Power not yet assessed'), '08 minimal: Life Power honest-null summary missing')
  assert((minimalRadarName?.match(/not yet assessed/g) ?? []).length === 11, '08 minimal: every Life Power/domain metric must remain unassessed')
  assert(!minimalRadarName?.includes('Life Power 72'), '08 minimal: default Life Power leaked into direct entry')
  await page.getByText('Not set', { exact: true }).waitFor()
  await page.getByText('No Domain Stats yet', { exact: true }).waitFor()
  assert(!(await page.locator('[data-plan-state]').innerText()).includes('Your answers'), '08 minimal: user-answer provenance leaked into direct entry')
  await capture('08-minimal')
  await page.getByRole('button', { name: 'Edit mission: Build a steady running rhythm' }).click()
  await waitData('[data-plan-state]', 'data-plan-state', 'editing')
  assert(await page.getByLabel('Mission name').inputValue() === 'Build a steady running rhythm', '08 minimal edit: visible mission did not seed title')
  assert(await page.getByLabel('First action').inputValue() === 'Take a five-minute easy walk', '08 minimal edit: visible mission did not seed action')
  await page.getByRole('button', { name: 'Cancel edits' }).click()
  await waitData('[data-plan-state]', 'data-plan-state', 'minimal')

  await openFixture('08', 'editing', 'data-plan-state')
  await auditFixture('08 editing')
  await inputContract(page.getByLabel('Mission name'), '08 Mission name')
  await inputContract(page.getByLabel('First action'), '08 First action')
  assert(await page.getByRole('button', { name: 'Save plan changes' }).count() === 1, '08 editing: Save missing')
  assert(await page.getByRole('button', { name: 'Cancel edits' }).count() === 1, '08 editing: Cancel missing')
  await capture('08-editing')

  await openFixture('08', 'error', 'data-plan-state')
  await auditFixture('08 error')
  const retryPlan = page.getByRole('button', { name: 'Retry plan preview' })
  await capture('08-error')
  await retryPlan.click()
  await waitData('[data-plan-state]', 'data-plan-state', 'default')

  await openFixture('08', 'offline', 'data-plan-state')
  await auditFixture('08 offline')
  const offlineEnter = page.getByRole('button', { name: 'Enter Today' })
  assert(!(await offlineEnter.isDisabled()), '08 offline: Enter Today disabled')
  await capture('08-offline')
  await offlineEnter.click()
  await waitData('[data-plan-state]', 'data-plan-state', 'offline')
  await page.getByText(/queued locally.*reconnect/i).waitFor()
  await capture('08-offline-queued')

  await openFixture('08', 'success', 'data-plan-state')
  await auditFixture('08 success')
  await page.getByRole('button', { name: 'Ready for Today' }).waitFor()
  await capture('08-success')

  await openFixture('08', 'default', 'data-plan-state')
  await page.getByRole('button', { name: 'Customize plan' }).click()
  await waitData('[data-plan-state]', 'data-plan-state', 'editing')
  await page.getByRole('button', { name: 'Cancel edits' }).click()
  await waitData('[data-plan-state]', 'data-plan-state', 'default')
  await page.getByRole('button', { name: 'Edit mission: Run a half marathon' }).click()
  await waitData('[data-plan-state]', 'data-plan-state', 'editing')
  await inputContract(page.getByLabel('Mission name'), '08 interactive Mission name')
  await inputContract(page.getByLabel('First action'), '08 interactive First action')
  await capture('08-edit-mission')
  await page.getByLabel('Mission name').fill('Run a thoughtful half marathon')
  await page.getByLabel('First action').fill('Walk for 10 minutes')
  await page.getByRole('button', { name: 'Save plan changes' }).click()
  await waitData('[data-plan-state]', 'data-plan-state', 'default')
  await page.getByText('Run a thoughtful half marathon', { exact: true }).waitFor()
  assert((await page.getByRole('button', { name: 'Enter Today' }).boundingBox())?.width === planWidth, '08: primary width changed after local edit')
  pass('08 initial plan summary', { fixtures: 6, tenDomains: true, timeline: timelineName, localEditing: true, offlineQueue: true, widthLocked: true, contrast: planContrast })

  // S65 — force-update system gate.
  await openFixture('65', 'default', 'data-update-state')
  await auditFixture('65 default', { focus: true })
  for (const source of ['/logos/Frame 2147239943.svg', '/logos/Logo Mark.svg']) {
    const asset = page.locator(`img[src="${source}"]`)
    assert(await asset.count() === 1, `65 default: official asset missing ${source}`)
    assert(await asset.evaluate(node => node.complete && node.naturalWidth > 0), `65 default: official asset failed ${source}`)
  }
  await page.getByText('Exact · release-note fixture', { exact: true }).waitFor()
  await page.getByText('Exact · bundled build fixture', { exact: true }).waitFor()
  const releaseCard = page.getByText("What's new", { exact: true }).locator('xpath=ancestor::section[1]')
  assert(await releaseCard.locator('li').count() <= 3, '65 default: more than three release notes')
  assert(await page.locator('[data-testid="phone-frame"] button').count() === 1, '65 default: expected exactly one phone action')
  let updateAction = page.getByRole('button', { name: 'Update now' })
  const updateWidth = await fullWidth(updateAction, '65 Update now')
  await fullyVisible(updateAction, '65 Update now')
  const updateContrast = await actionContrast(updateAction, '65 Update now')
  await capture('65-default')

  for (const state of ['loading', 'error', 'offline', 'empty', 'returned']) {
    await openFixture('65', state, 'data-update-state')
    await auditFixture(`65 ${state}`)
    assert(await page.locator('[data-testid="phone-frame"] button').count() === 1, `65 ${state}: expected exactly one phone action`)
    if (state === 'loading') {
      assert(await page.locator('[data-update-state="loading"][data-loading-source="release-notes"]').count() === 1, '65 loading: release-note loading source missing')
      const loadingUpdate = page.getByRole('button', { name: 'Loading update details' })
      assert(await loadingUpdate.getAttribute('aria-busy') === 'true', '65 loading: busy missing')
      await assertSameWidth(loadingUpdate, updateWidth, '65 loading')
    }
    if (state === 'error') {
      const retryUpdate = page.getByRole('button', { name: 'Try again' })
      assert(!(await retryUpdate.isDisabled()), '65 error: retry disabled')
      await page.getByText(/store is unavailable.*No external app was launched.*try again/i).waitFor()
    }
    if (state === 'offline') {
      updateAction = page.getByRole('button', { name: 'Update now' })
      assert(!(await updateAction.isDisabled()), '65 offline: Update now disabled')
      await page.getByText(/Offline.*retry action remains available/i).waitFor()
    }
    if (state === 'empty') {
      assert(await page.getByText("What's new", { exact: true }).count() === 0, '65 empty: release-note card remains')
      await page.getByText('Version 2.1.0 → 3.0.0 required', { exact: true }).waitFor()
    }
    if (state === 'returned') {
      await page.getByText(/cannot confirm whether an update was installed.*still required/i).waitFor()
      assert(await page.getByRole('button', { name: 'Update now' }).count() === 1, '65 returned: CTA not reset')
    }
    await capture(`65-${state}`)
  }

  await openFixture('65', 'default', 'data-update-state')
  await page.getByRole('button', { name: 'Update now' }).click()
  await waitData('[data-update-state]', 'data-update-state', 'loading')
  assert(await page.locator('[data-update-state="loading"][data-loading-source="store-check"]').count() === 1, '65 interactive: store-check loading source missing')
  await assertSameWidth(page.getByRole('button', { name: 'Checking store availability' }), updateWidth, '65 interactive loading')
  await page.getByText("What's new", { exact: true }).waitFor()
  await waitData('[data-update-state]', 'data-update-state', 'error')
  await page.getByText(/store is unavailable.*No external app was launched.*try again/i).waitFor()
  await capture('65-action-error')
  await page.getByRole('button', { name: 'Try again' }).click()
  await waitData('[data-update-state]', 'data-update-state', 'loading')
  await waitData('[data-update-state]', 'data-update-state', 'error')
  assert(!(await page.getByRole('button', { name: 'Try again' }).isDisabled()), '65 retry: action did not recover')
  pass('65 force update', { fixtures: 6, officialAssets: 2, releaseNotesCapped: 3, noSuccess: true, storeUnavailable: true, widthLocked: true, contrast: updateContrast })

  // S66 — notification permission primer.
  await openFixture('66', 'default', 'data-notification-state')
  await auditFixture('66 default', { focus: true })
  const bellIllustration = page.locator('div[aria-hidden="true"]:has(svg.lucide-bell-ring)')
  assert(await bellIllustration.count() === 1, '66 default: decorative illustration is not hidden')
  const notificationText = await page.locator('[data-notification-state]').innerText()
  for (const copy of ['Notifications are optional', 'Change reminder types later', 'revoke permission', 'Squad and Community updates', 'explicitly opt into']) {
    assert(notificationText.includes(copy), `66 default: required copy missing: ${copy}`)
  }
  assert(!/streak protection|avoid missing|partner updates|know when partners/i.test(notificationText), '66 default: loss-pressure or unscoped partner copy remains')
  let enableNotifications = page.getByRole('button', { name: 'Enable notifications' })
  let notNow = page.getByRole('button', { name: 'Not now' })
  const notificationWidth = await fullWidth(enableNotifications, '66 Enable notifications')
  const notNowWidth = await fullWidth(notNow, '66 Not now')
  assert(Math.abs(notificationWidth - notNowWidth) <= 1, '66 default: Not now is not equal width')
  await targetSize(notNow, '66 Not now')
  const notificationContrast = await actionContrast(enableNotifications, '66 Enable notifications')
  await capture('66-default')

  const notificationStates = ['loading', 'authorized-preview', 'denied', 'error', 'offline', 're-entry']
  const notificationActions = {
    loading: 'Checking permission preview',
    'authorized-preview': 'Manage notification types',
    denied: 'Got it',
    error: 'Try again',
    offline: 'Enable notifications',
    're-entry': 'Open settings preview',
  }
  for (const state of notificationStates) {
    await openFixture('66', state, 'data-notification-state')
    await auditFixture(`66 ${state}`)
    notNow = page.getByRole('button', { name: 'Not now' })
    assert(await notNow.count() === 1, `66 ${state}: Not now missing`)
    await targetSize(notNow, `66 ${state} Not now`)
    await fullWidth(notNow, `66 ${state} Not now`)
    const stateAction = page.getByRole('button', { name: notificationActions[state] })
    assert(await stateAction.count() === 1, `66 ${state}: state action missing`)
    await fullWidth(stateAction, `66 ${state} ${notificationActions[state]}`)
    if (state === 'loading') {
      assert(await stateAction.getAttribute('aria-busy') === 'true', '66 loading: busy missing')
      await assertSameWidth(stateAction, notificationWidth, '66 loading')
    }
    if (state === 'authorized-preview') await page.getByText(/no system prompt was shown and nothing was granted/i).waitFor()
    if (state === 'denied') await page.getByText(/Denied outcome preview only.*no OS status/i).waitFor()
    if (state === 'error') await page.getByText(/No system setting changed/i).first().waitFor()
    if (state === 'offline') assert(!(await stateAction.isDisabled()), '66 offline: Enable notifications disabled')
    if (state === 're-entry') await page.getByText(/Re-entry preview.*no OS status/i).waitFor()
    await capture(`66-${state}`)
  }

  await openFixture('66', 'default', 'data-notification-state')
  await page.getByRole('button', { name: 'Not now' }).click()
  await waitData('[data-notification-state]', 'data-notification-state', 'default')
  const skippedNotificationStatus = page.getByText(/Skipped locally.*No OS prompt was shown.*change this choice later/i)
  await skippedNotificationStatus.waitFor()
  await skippedNotificationStatus.scrollIntoViewIfNeeded()
  await capture('66-default-skipped')

  await openFixture('66', 'default', 'data-notification-state')
  enableNotifications = page.getByRole('button', { name: 'Enable notifications' })
  await enableNotifications.click()
  await waitData('[data-notification-state]', 'data-notification-state', 'loading')
  await assertSameWidth(page.getByRole('button', { name: 'Checking permission preview' }), notificationWidth, '66 interactive loading')
  await waitData('[data-notification-state]', 'data-notification-state', 'authorized-preview')
  await page.getByText(/No OS prompt was shown and notification permission was not granted/i).waitFor()

  await openFixture('66', 'error', 'data-notification-state')
  await page.getByRole('button', { name: 'Try again' }).click()
  await waitData('[data-notification-state]', 'data-notification-state', 'loading')
  await waitData('[data-notification-state]', 'data-notification-state', 'authorized-preview')
  await page.getByText(/No OS prompt was shown and notification permission was not granted/i).waitFor()

  await openFixture('66', 'authorized-preview', 'data-notification-state')
  await page.getByRole('button', { name: 'Manage notification types' }).click()
  await waitData('[data-notification-state]', 'data-notification-state', 'authorized-preview')
  const manageUnavailableStatus = page.getByText(/controls are unavailable.*No preference changed/i)
  await manageUnavailableStatus.waitFor()
  await manageUnavailableStatus.scrollIntoViewIfNeeded()
  await capture('66-authorized-manage')

  await openFixture('66', 're-entry', 'data-notification-state')
  await page.getByRole('button', { name: 'Open settings preview' }).click()
  await waitData('[data-notification-state]', 'data-notification-state', 're-entry')
  const settingsUnavailableStatus = page.getByText(/System Settings is unavailable.*No settings app opened and nothing changed/i)
  await settingsUnavailableStatus.waitFor()
  await settingsUnavailableStatus.scrollIntoViewIfNeeded()
  await capture('66-reentry-unavailable')

  await openFixture('66', 'offline', 'data-notification-state')
  enableNotifications = page.getByRole('button', { name: 'Enable notifications' })
  assert(!(await enableNotifications.isDisabled()), '66 offline interaction: Enable notifications disabled')
  await enableNotifications.click()
  await waitData('[data-notification-state]', 'data-notification-state', 'authorized-preview')
  await page.getByText(/Device permission can be requested offline.*no OS prompt.*granted nothing/i).waitFor()
  pass('66 notification permission', { fixtures: 7, equalReach: true, optionalAndRevocable: true, groupScope: true, noOsClaim: true, widthLocked: true, contrast: notificationContrast })

  await assertNoForbiddenCapabilities()
  assert(consoleErrors.length === 0, `Console errors: ${consoleErrors.map(error => `${error.case}:${error.text}`).join(' | ')}`)
  assert(pageErrors.length === 0, `Page errors: ${pageErrors.map(error => `${error.case}:${error.text}`).join(' | ')}`)
  sourceHashEnd = fingerprint(SOURCE_FILES)
  apiHashEnd = fingerprint(API_FILES)
  assert(sourceHashEnd === sourceHashStart, 'A2 screen source changed while the verifier was running')
  assert(apiHashEnd === apiHashStart, 'A2 accepted API surface changed while the verifier was running')
  assertExpectedScreenshots()
  for (const [baseline, changed, label] of [
    ['07-default.png', '07-privacy.png', '07 privacy visual evidence'],
    ['07-default.png', '07-crisis.png', '07 crisis visual evidence'],
    ['07-default.png', '07-text-send.png', '07 sent-message visual evidence'],
    ['07-default.png', '07-skip-health.png', '07 health-skip visual evidence'],
    ['08-offline.png', '08-offline-queued.png', '08 offline queue visual evidence'],
    ['66-default.png', '66-default-skipped.png', '66 decline visual evidence'],
    ['66-authorized-preview.png', '66-authorized-manage.png', '66 manage visual evidence'],
    ['66-re-entry.png', '66-reentry-unavailable.png', '66 settings visual evidence'],
  ]) assertScreenshotDelta(baseline, changed, label)
  pass('A2 evidence integrity', {
    sourceHash: sourceHashEnd,
    apiHash: apiHashEnd,
    uniqueNonces: visitedNonces.size,
    screenshots: shotsDir ? EXPECTED_SCREENSHOTS.length : 0,
    consoleErrors: 0,
    pageErrors: 0,
    capabilityEvents: 0,
    visualDeltaPairs: 8,
  })

  const report = buildReport('pass')
  writeReport(report)
} catch (error) {
  const report = buildReport('fail', error)
  try {
    writeReport(report, 'error')
  } catch (reportError) {
    console.error(redact(reportError instanceof Error ? reportError.stack || reportError.message : reportError))
  }
  process.exitCode = 1
} finally {
  await browser.close()
}
