import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const repo = path.resolve(root, '..')
const [baseURL, outArg, shotsArg] = process.argv.slice(2)
if (!baseURL || !outArg || !shotsArg) {
  console.error('Usage: node scripts/verify-e1-life-intelligence.mjs <baseURL> <out-json> <shots-dir>')
  process.exit(2)
}
if (new URL(baseURL).port !== '3002') throw new Error('E1 acceptance requires fresh production port 3002')
const outPath = path.resolve(root, outArg)
const shotsDir = path.resolve(root, shotsArg)
const tempDir = `${shotsDir}.candidate`

const states = {
  16: ['default','low-confidence','empty','error','offline','compare-week','domain-detail','data-controls'],
  20: ['default','search','node-detail','edit','delete-confirm','success','error','offline','upload','citation-medical'],
  48: ['default','low-confidence','empty','error','offline','contradiction','legend','timeframe'],
  72: ['default','node-detail','legend','document','citation-medical','empty','error','offline'],
  84: ['default','sync-failure','reconnect','consent','empty','offline','revoke','delete'],
  90: ['default','monthly','yearly-lock','photo-consent','photo-detail','empty','offline','history-detail'],
  93: ['default','crisis','offline-crisis','log-sheet','success','empty','error-cached','paywall-90d'],
  96: ['default','formula-detail','metric-detail','cia-consent','empty','partial','stale-offline','sync-error','bridge','primary-conflict','revoke-confirm','delete-confirm','premium-lock','disabled','skeleton'],
}
const cases = Object.entries(states).flatMap(([id, values]) => values.map(state => ({ id, state, name: `${id}-${state}` })))
const textCases = Object.keys(states).map(id => ({ id, state: 'default', name: `${id}-text-scale-proof`, textScale: 1.25 }))
if (cases.length !== 73 || textCases.length !== 8) throw new Error('Frozen E1 case count drift')

const productFiles = ['E1Modal.tsx','S16LifeAreas.tsx','S20CiaMemory.tsx','S48Intelligence.tsx','S72KnowledgeGraph.tsx','S84DataSources.tsx','S90ProgressMeasurements.tsx','S93MoodTrends.tsx','S96HealthDataView.tsx']
  .map(file => `src/components/hifi/screens/intelligence/${file}`)
const apiFiles = ['package.json','package-lock.json','next.config.ts','src/app/screens/[id]/page.tsx','src/components/hifi/HifiPrototype.tsx','src/components/hifi/screens/registry.ts','scripts/verify-e1-life-intelligence.mjs']
const sentinelPath = path.join(repo, 'plans/batches/VISUAL-010-E1-life-intelligence/evidence/ACCEPTED-D2-SENTINELS-BEFORE.sha256')

function sha(buffer) { return crypto.createHash('sha256').update(buffer).digest('hex') }
function fingerprint(files, base = root) {
  const rows = files.map(file => ({ path: file, sha256: sha(fs.readFileSync(path.resolve(base, file))) }))
  return { digest: sha(Buffer.from(rows.map(row => `${row.sha256}  ${row.path}`).join('\n'))), files: rows }
}
function parseSentinels() {
  const rows = fs.readFileSync(sentinelPath, 'utf8').trim().split('\n').map(line => {
    const match = line.match(/^([a-f0-9]{64})  (.+)$/)
    if (!match) throw new Error(`Malformed sentinel row: ${line}`)
    return { sha256: match[1], path: match[2] }
  })
  if (rows.length !== 53 || new Set(rows.map(row => row.path)).size !== 53) throw new Error('Accepted sentinel set must contain 53 unique files')
  for (const row of rows) {
    const actual = sha(fs.readFileSync(path.resolve(repo, row.path)))
    if (actual !== row.sha256) throw new Error(`Accepted sentinel drift: ${row.path}`)
  }
  return { digest: sha(Buffer.from(rows.map(row => `${row.sha256}  ${row.path}`).join('\n'))), files: rows }
}

const result = {
  auditedAt: new Date().toISOString(), baseURL, phoneFrame: { width: 390, height: 844 },
  expectedContexts: 81, expectedScreenshots: 73, checks: [], cases: [], screenshots: [],
  consoleErrors: [], pageErrors: [], capabilityEvents: [], status: 'fail',
}
function check(ok, label, evidence = null) {
  result.checks.push({ label, ok, evidence })
  if (!ok) throw new Error(label)
}

async function addGuards(context) {
  await context.addInitScript(({ origin }) => {
    const events = []
    Object.defineProperty(window, '__e1CapabilityEvents', { value: events })
    const record = (type, detail = '') => events.push({ type, detail: String(detail) })
    const block = type => (...args) => { record(type, args[0]); return Promise.reject(new Error(`${type} blocked by E1 verifier`)) }
    const nativeFetch = window.fetch.bind(window)
    window.fetch = (...args) => {
      const target = new URL(args[0] instanceof Request ? args[0].url : String(args[0]), location.href)
      if (target.origin === origin) return nativeFetch(...args)
      return block('fetch')(...args)
    }
    const nativeXhrOpen = XMLHttpRequest.prototype.open
    XMLHttpRequest.prototype.open = function(method, url, ...rest) {
      const target = new URL(String(url), location.href)
      if (target.origin === origin) return nativeXhrOpen.call(this, method, url, ...rest)
      record('xhr', `${method} ${url}`); throw new Error('xhr blocked')
    }
    window.WebSocket = class { constructor(url) { record('websocket', url); throw new Error('websocket blocked') } }
    window.EventSource = class { constructor(url) { record('eventsource', url); throw new Error('eventsource blocked') } }
    if (navigator.sendBeacon) navigator.sendBeacon = (...args) => { record('beacon', args[0]); return false }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition = () => record('geolocation')
      navigator.geolocation.watchPosition = () => { record('geolocation-watch'); return 0 }
    }
    if (navigator.mediaDevices) navigator.mediaDevices.getUserMedia = block('media')
    if (navigator.share) navigator.share = block('share')
    if (navigator.clipboard) navigator.clipboard.writeText = block('clipboard')
    if (navigator.credentials) navigator.credentials.get = block('credentials')
    if ('PaymentRequest' in window) window.PaymentRequest = class { constructor() { record('payment'); throw new Error('payment blocked') } }
    if ('Notification' in window) window.Notification = class { constructor() { record('notification'); throw new Error('notification blocked') } static requestPermission() { record('notification-permission'); return Promise.resolve('denied') } }
    document.addEventListener('click', event => {
      const anchor = event.target instanceof Element ? event.target.closest('a') : null
      if (!anchor) return
      const target = new URL(anchor.href, location.href)
      if (target.origin !== origin || !['http:','https:'].includes(target.protocol) || anchor.hasAttribute('download')) {
        record('external-navigation', target.href); event.preventDefault(); event.stopImmediatePropagation()
      }
    }, true)
  }, { origin: new URL(baseURL).origin })
}

async function applyTextScale(page, scale) {
  return page.locator('[data-testid="phone-frame"]').evaluate((phone, requestedScale) => {
    let count = 0
    for (const element of [phone, ...phone.querySelectorAll('*')]) {
      if (element.closest('[aria-hidden="true"],.sr-only')) continue
      const text = [...element.childNodes].some(node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim())
      const editable = ['INPUT','SELECT','TEXTAREA'].includes(element.tagName)
      if (!text && !editable) continue
      const size = Number.parseFloat(getComputedStyle(element).fontSize)
      if (!Number.isFinite(size) || size <= 0) continue
      element.style.setProperty('font-size', `${size * requestedScale}px`, 'important')
      count += 1
    }
    return count
  }, scale)
}

async function auditLayout(page, label, textScale = 1) {
  const evidence = await page.locator('[data-testid="phone-frame"]').evaluate(phone => {
    const frame = phone.getBoundingClientRect()
    const visible = element => {
      const r = element.getBoundingClientRect(); const s = getComputedStyle(element)
      return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && r.bottom > frame.top && r.top < frame.bottom - 34
    }
    const targets = [...phone.querySelectorAll('button,a,input,select,textarea')].filter(visible).map(element => {
      const r = element.getBoundingClientRect(); return { label: element.getAttribute('aria-label') || element.textContent?.trim().slice(0,60) || element.tagName, width: r.width, height: r.height }
    })
    return {
      frame: { width: Math.round(frame.width), height: Math.round(frame.height) },
      horizontalOverflow: phone.scrollWidth - phone.clientWidth,
      smallTargets: targets.filter(target => target.width < 43.5 || target.height < 43.5),
      unnamed: [...phone.querySelectorAll('button,a,input,select,textarea')].filter(visible).filter(element => !(
        element.getAttribute('aria-label') ||
        element.textContent?.trim() ||
        element.getAttribute('title') ||
        ('labels' in element && [...element.labels].some(label => label.textContent?.trim()))
      )).length,
      visibleSia: /\bSIA\b|\bSia\b/.test(phone.innerText),
      visibleWrongCia: /\bCia\b/.test(phone.innerText),
    }
  })
  check(evidence.frame.width === 390 && evidence.frame.height === 844, `${label}: phone frame is 390x844`, evidence.frame)
  check(evidence.horizontalOverflow <= 1, `${label}: no phone horizontal overflow`, evidence.horizontalOverflow)
  check(evidence.smallTargets.length === 0, `${label}: visible controls meet 44px`, evidence.smallTargets)
  check(evidence.unnamed === 0, `${label}: visible controls are named`, evidence.unnamed)
  check(!evidence.visibleSia && !evidence.visibleWrongCia, `${label}: visible coach name is CIA`, { visibleSia: evidence.visibleSia, visibleWrongCia: evidence.visibleWrongCia })
  if (textScale !== 1) check(evidence.horizontalOverflow <= 1, `${label}: 125% reflow stays inside phone`, evidence)
}

async function semanticChecks(page, id, state, name) {
  const body = await page.locator('[data-testid="phone-frame"]').innerText()
  if (id === '16' && state === 'default') {
    check(await page.locator('[data-domain-count="10"]').count() === 1, `${name}: ten-domain radar`)
    check(body.includes('49') && body.includes('10/10'), `${name}: Life Power formula result and reporting`, body.slice(0,500))
  }
  if (id === '20' && state === 'default') check(/does not establish cause|not caus/i.test(body), `${name}: non-causal correlation boundary`)
  if (id === '48' && state === 'default') {
    check(await page.locator('[role="meter"][aria-valuenow="87"]').count() === 1, `${name}: contained score meter 87`)
    check((await page.locator('[role="img"][aria-label*="paired days"]').count()) >= 20, `${name}: semantic matrix cells`)
  }
  if (id === '72' && state === 'default') check((await page.locator('button').count()) >= 8, `${name}: native graph controls`)
  if (id === '84' && state === 'default') check(/co-variation, not causation/i.test(body), `${name}: provider co-variation boundary`)
  if (id === '90' && state === 'default') check(await page.locator('[data-asset-disposition="HIFI-90-01-code-native-no-raster"]').count() === 1, `${name}: HIFI-90-01 code-native disposition`)
  if (id === '93' && state === 'default') check(body.includes('3 private journal markers'), `${name}: marker evidence count reconciled`)
  if (id === '96' && state === 'default') {
    check(body.includes('84') && body.includes('View formula & sources'), `${name}: readiness score and formula disclosure are exposed`)
    check(body.includes('Illustrative demo data only'), `${name}: provider dependency honesty`)
  }
  if (id === '96' && state === 'formula-detail') {
    check(body.includes('84.1 rounds to 84') && body.includes('86 × 40%') && body.includes('82 × 35%') && body.includes('84 × 25%'), `${name}: readiness arithmetic is exact`)
    check(body.includes('WHOOP recovery 78') && body.includes('not an input'), `${name}: device-native score stays separate`)
  }
  if (id === '93') check(/Call preview|Text preview|Local help|crisis resources/i.test(body), `${name}: crisis help remains reachable`)
}

async function assertModalContract(page, label, opener) {
  const dialog = page.getByRole('dialog')
  await dialog.waitFor()
  check(await dialog.evaluate(node => node.contains(document.activeElement)), `${label}: modal receives initial focus`)
  check(await page.locator('[data-testid="phone-frame"]').evaluate(phone => { const regions = [...phone.querySelectorAll('header, main, nav')].filter(node => !node.closest('[role="dialog"]')); return regions.length >= 2 && regions.every(node => node.inert) }), `${label}: every underlying shell region is inert`)
  await page.keyboard.press('Shift+Tab')
  check(await dialog.evaluate(node => node.contains(document.activeElement)), `${label}: reverse Tab stays contained`)
  await page.keyboard.press('Tab')
  check(await dialog.evaluate(node => node.contains(document.activeElement)), `${label}: Tab stays contained`)
  await page.keyboard.press('Escape')
  await dialog.waitFor({ state: 'detached' })
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
  check(await opener.evaluate(node => node === document.activeElement), `${label}: Escape restores exact opener`)
}

async function assertOpenModalContract(page, label) {
  const dialog = page.getByRole('dialog')
  if (await dialog.count() === 0) return
  check(await dialog.evaluate(node => node.contains(document.activeElement)), `${label}: query-opened modal receives initial focus`)
  check(await page.locator('[data-testid="phone-frame"]').evaluate(phone => { const regions = [...phone.querySelectorAll('header, main, nav')].filter(node => !node.closest('[role="dialog"]')); return regions.length >= 2 && regions.every(node => node.inert) }), `${label}: query-opened modal isolates every shell region`)
  await page.keyboard.press('Tab')
  check(await dialog.evaluate(node => node.contains(document.activeElement)), `${label}: query-opened modal contains Tab focus`)
}

async function interactionChecks(page, id, name) {
  const reset = async () => { await page.reload({ waitUntil: 'networkidle' }); await page.locator('[data-testid="phone-frame"]').waitFor(); await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))) }
  if (id === '16') {
    const controls = page.getByRole('button', { name: 'Data controls' }); await controls.click(); await assertModalContract(page, `${name}: data controls`, controls)
    const domain = page.getByRole('button', { name: /^Fitness,/ }); await domain.click(); await assertModalContract(page, `${name}: domain detail`, domain)
  }
  if (id === '20') {
    const edit = page.getByRole('button', { name: 'Edit' }).first(); await edit.click(); await page.getByRole('button', { name: 'Save changes' }).click(); check((await page.getByRole('status').allInnerTexts()).join(' ').includes('Memory saved'), `${name}: edit outcome visible`)
    const remove = page.getByRole('button', { name: /Delete Gut health/ }); await remove.click(); await page.getByRole('button', { name: 'Delete memory' }).click(); check((await page.getByRole('status').allInnerTexts()).join(' ').includes('Memory deleted'), `${name}: delete outcome visible`)
    const upload = page.getByRole('button', { name: 'Upload document' }); await upload.click(); await page.getByRole('button', { name: 'Preview processing' }).click(); check((await page.getByRole('status').allInnerTexts()).join(' ').includes('processed locally'), `${name}: upload outcome visible`)
    const citation = page.getByRole('button', { name: 'Citation preview' }); await citation.click(); await assertModalContract(page, `${name}: citation modal`, citation)
  }
  if (id === '48') {
    const manage = page.getByRole('button', { name: 'Manage data' }); await manage.click(); await assertModalContract(page, `${name}: manage data`, manage)
    const resolve = page.getByRole('button', { name: 'Resolve' }); await resolve.click(); await page.getByRole('button', { name: /Use WHOOP/ }).click(); check((await page.getByRole('status').allInnerTexts()).join(' ').includes('resolved'), `${name}: resolve outcome visible`)
    await reset(); await page.getByRole('button', { name: 'Dismiss' }).click(); check((await page.getByRole('status').allInnerTexts()).join(' ').includes('dismissed'), `${name}: dismiss outcome visible`)
  }
  if (id === '72') {
    const zoom = page.getByRole('button', { name: 'Zoom in' }); await zoom.click(); check(await page.locator('[data-zoom="110"]').count() === 1, `${name}: zoom changes graph state`); check((await page.locator('svg[style*="scale"]').getAttribute('style'))?.includes('1.1'), `${name}: zoom visibly transforms graph`)
    await page.getByRole('button', { name: 'Reset view' }).click(); check(await page.locator('[data-zoom="100"]').count() === 1, `${name}: reset restores graph`)
    const node = page.getByRole('button', { name: /Workout, 4 connections/ }); await node.click(); await assertModalContract(page, `${name}: node detail`, node)
  }
  if (id === '84') {
    const source = page.getByRole('button', { name: /WHOOP/ }).first(); await source.click(); await page.getByRole('button', { name: 'Export' }).click(); check((await page.getByRole('status').allInnerTexts()).join(' ').includes('Export preview'), `${name}: source control outcome visible`); await page.keyboard.press('Escape')
    await page.getByRole('button', { name: /Reconnect Spotify/ }).click(); check((await page.getByRole('status').allInnerTexts()).join(' ').includes('reconnect succeeded'), `${name}: reconnect outcome visible`)
    const remove = page.getByRole('button', { name: 'Delete source' }); await remove.click(); await page.getByRole('button', { name: 'Confirm local delete' }).click(); check((await page.getByRole('status').allInnerTexts()).join(' ').includes('deleted'), `${name}: delete outcome visible`)
    await reset()
    const revoke = page.getByRole('button', { name: 'Revoke access' }); await revoke.click(); await page.getByRole('button', { name: 'Confirm local revoke' }).click(); check((await page.getByRole('status').allInnerTexts()).join(' ').includes('revoked'), `${name}: revoke outcome visible`)
  }
  if (id === '90') {
    const consent = page.getByRole('button', { name: 'Consent', exact: true }); await consent.click(); await page.getByRole('button', { name: 'Allow local preview' }).click(); check(await page.locator('[data-asset-disposition="HIFI-90-01-code-native"]').count() === 1, `${name}: consent exposes code-native comparison`)
    await page.getByRole('button', { name: 'Retention details' }).click(); check((await page.getByRole('status').allInnerTexts()).join(' ').includes('Retention details completed'), `${name}: privacy control outcome visible`); await page.keyboard.press('Escape')
    const history = page.getByRole('button', { name: /Measurement history/ }); await history.click(); await assertModalContract(page, `${name}: history detail`, history)
  }
  if (id === '93') {
    await page.getByRole('tab', { name: '30D' }).click(); check(await page.getByRole('tab', { name: '30D' }).getAttribute('aria-selected') === 'true' && (await page.locator('[data-testid="phone-frame"] main').innerText()).includes('30 days'), `${name}: 30D selection changes styling and evidence`)
    const crisis = page.getByRole('button', { name: 'Help and crisis resources' }); await crisis.click(); await page.getByRole('button', { name: 'Call emergency help preview' }).click(); check((await page.getByRole('status').allInnerTexts()).join(' ').includes('no external action fired'), `${name}: crisis preview outcome visible`); await page.keyboard.press('Escape')
    const log = page.getByRole('button', { name: 'Log mood' }); await log.click(); await page.getByRole('button', { name: '8' }).click(); await page.getByRole('button', { name: 'Save mood' }).click(); check((await page.locator('[data-testid="phone-frame"] main').innerText()).includes('hopeful'), `${name}: mood log outcome visible`)
    const consent = page.getByRole('button', { name: 'Manage consent & data' }); await consent.click(); await page.getByRole('button', { name: 'Delete local mood data' }).click(); check((await page.getByRole('dialog').innerText()).includes('Permanently delete'), `${name}: delete requires consequence confirmation`); check(await page.getByRole('button', { name: 'Cancel' }).evaluate(node => node === document.activeElement), `${name}: delete confirmation focuses safe Cancel action`); await page.getByRole('button', { name: 'Delete mood data' }).click(); check((await page.getByRole('status').allInnerTexts()).join(' ').includes('permanently deleted'), `${name}: delete completion announced`)
  }
  if (id === '96') {
    for (const vital of completeVitalProofs) {
      const card = page.getByRole('button', { name: new RegExp(`^${vital.label} `) }); await card.click(); const text = await page.getByRole('dialog').innerText(); check(text.includes(`${vital.label} evidence`) && text.includes(vital.value) && text.includes(vital.source), `${name}: ${vital.label} opens matching evidence`); await page.keyboard.press('Escape')
    }
    const formula = page.getByRole('button', { name: 'View formula & sources' }); await formula.click(); await assertModalContract(page, `${name}: formula detail`, formula)
    const consent = page.getByRole('button', { name: 'Talk to CIA' }); await consent.click(); await page.getByRole('button', { name: 'Decline' }).click(); check((await page.getByRole('status').allInnerTexts()).join(' ').includes('no health context was sent'), `${name}: consent decline sends nothing`)
    const primary = page.getByRole('button', { name: 'Primary' }); await primary.click(); await page.getByRole('button', { name: 'Demo ring' }).click(); await page.getByRole('button', { name: 'Confirm primary' }).click(); check((await page.getByRole('status').allInnerTexts()).join(' ').includes('Demo ring is now'), `${name}: primary-source confirmation visible`)
    const revoke = page.getByRole('button', { name: 'Revoke' }); await revoke.click(); await page.getByRole('button', { name: 'Confirm revoke' }).click(); check((await page.getByRole('status').allInnerTexts()).join(' ').includes('revoked'), `${name}: source revoke visible`)
    await reset(); const remove = page.getByRole('button', { name: 'Delete synced demo records' }); await remove.click(); await page.getByRole('button', { name: 'Delete records' }).click(); check((await page.getByRole('status').allInnerTexts()).join(' ').includes('records deleted'), `${name}: source delete visible`)
  }
}

const completeVitalProofs = [
  { label: 'HRV', value: '42 ms', source: 'Demo wearable' },
  { label: 'Strain', value: '14.2 score', source: 'Demo wearable' },
  { label: 'RHR', value: '52 bpm', source: 'Demo phone health' },
  { label: 'Sleep', value: '7h 12m duration', source: 'Demo wearable' },
]

async function run() {
  fs.rmSync(tempDir, { recursive: true, force: true }); fs.mkdirSync(tempDir, { recursive: true })
  const buildId = fs.readFileSync(path.join(root, '.next/BUILD_ID'), 'utf8').trim()
  const servedBuild = await (await fetch(new URL('/screens/16', baseURL))).text()
  check(servedBuild.includes(buildId), 'served production HTML binds current BUILD_ID', buildId)
  result.productionBuild = { buildId, mode: 'next start production', port: '3002' }
  result.integrity = { start: { product: fingerprint(productFiles), api: fingerprint(apiFiles), accepted: parseSentinels() } }
  const executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  const browser = await chromium.launch(fs.existsSync(executablePath) ? { executablePath } : {})
  let nonce = 0
  try {
    for (const test of [...cases, ...textCases]) {
      nonce += 1
      const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1, reducedMotion: 'reduce' })
      await addGuards(context)
      const page = await context.newPage()
      page.on('console', message => { if (message.type() === 'error') result.consoleErrors.push({ case: test.name, text: message.text() }) })
      page.on('pageerror', error => result.pageErrors.push({ case: test.name, text: String(error) }))
      const url = new URL(`/screens/${test.id}`, baseURL); url.searchParams.set('state', test.state); url.searchParams.set('__e1audit', String(nonce))
      await page.goto(url.toString(), { waitUntil: 'networkidle' })
      await page.locator('[data-testid="phone-frame"]').waitFor()
      await page.waitForTimeout(120)
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
      if (test.textScale) {
        const scaled = await applyTextScale(page, test.textScale)
        check(scaled >= 10, `${test.name}: at least ten text nodes enlarged`, scaled)
      }
      await auditLayout(page, test.name, test.textScale ?? 1)
      await semanticChecks(page, test.id, test.state, test.name)
      await assertOpenModalContract(page, test.name)
      if (test.state === 'error' && (test.id === '16' || test.id === '48')) {
        await page.getByRole('button', { name: 'Retry locally' }).click()
        check(await page.locator('[data-state="default"]').count() === 1, `${test.name}: retry restores the local default surface`)
        await page.goto(url.toString(), { waitUntil: 'networkidle' })
        await page.locator('[data-testid="phone-frame"]').waitFor()
        await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
      }
      if (!test.textScale && test.state === 'default') {
        await interactionChecks(page, test.id, test.name)
        await page.goto(url.toString(), { waitUntil: 'networkidle' })
        await page.locator('[data-testid="phone-frame"]').waitFor()
        await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
      }
      const capability = await page.evaluate(() => window.__e1CapabilityEvents ?? [])
      result.capabilityEvents.push(...capability.map(event => ({ case: test.name, ...event })))
      const storage = await page.evaluate(async () => ({ local: Object.keys(localStorage), session: Object.keys(sessionStorage), databases: indexedDB.databases ? (await indexedDB.databases()).map(db => db.name) : [], caches: 'caches' in window ? await caches.keys() : [] }))
      const cookies = await context.cookies()
      check(storage.local.length + storage.session.length + storage.databases.length + storage.caches.length === 0 && cookies.length === 0, `${test.name}: storage and cookies empty`, { storage, cookies: cookies.length })
      if (!test.textScale) {
        const target = path.join(tempDir, `${test.name}.png`)
        const locator = page.locator('[data-testid="phone-frame"]')
        const first = await locator.screenshot()
        await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
        const second = await locator.screenshot()
        check(sha(first) === sha(second), `${test.name}: two consecutive captures are byte-identical`, sha(first))
        fs.writeFileSync(target, first)
        result.screenshots.push({ name: `${test.name}.png`, sha256: sha(first) })
      }
      result.cases.push({ ...test, nonce: String(nonce), storage, cookies: cookies.length })
      await context.close()
      process.stdout.write(`[${nonce}/81] ${test.name} ok\n`)
    }
  } finally { await browser.close() }
  result.integrity.end = { product: fingerprint(productFiles), api: fingerprint(apiFiles), accepted: parseSentinels() }
  check(JSON.stringify(result.integrity.start) === JSON.stringify(result.integrity.end), 'start/end integrity unchanged')
  check(result.cases.length === 81 && result.screenshots.length === 73, 'exact context and screenshot counts', { cases: result.cases.length, screenshots: result.screenshots.length })
  check(result.consoleErrors.length === 0 && result.pageErrors.length === 0 && result.capabilityEvents.length === 0, 'zero console/page/capability events', { console: result.consoleErrors, page: result.pageErrors, capability: result.capabilityEvents })
  fs.rmSync(shotsDir, { recursive: true, force: true }); fs.renameSync(tempDir, shotsDir)
  result.screenshotPromotion = 'promoted-after-all-assertions'
  result.status = 'pass'
}

try { await run() } catch (error) { result.error = String(error); fs.rmSync(tempDir, { recursive: true, force: true }); process.exitCode = 1 }
fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.writeFileSync(outPath, JSON.stringify(result, null, 2))
console.log(JSON.stringify({ status: result.status, build: result.productionBuild?.buildId, contexts: result.cases.length, screenshots: result.screenshots.length, checks: result.checks.length, console: result.consoleErrors.length, page: result.pageErrors.length, capability: result.capabilityEvents.length, error: result.error }, null, 2))
