import { createRequire } from 'node:module'
import fs from 'node:fs/promises'
import fsSync from 'node:fs'

const require = createRequire('/Users/hamza/Desktop/balencia-design/balencia-screens/package.json')
const { chromium } = require('playwright')

const outDir = '/Users/hamza/Desktop/balencia-design/balencia-screens/output/p16-p18-states'
const baseUrl = process.env.P_BASE_URL || 'http://localhost:3000'
await fs.mkdir(outDir, { recursive: true })

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const browser = fsSync.existsSync(chromePath)
  ? await chromium.launch({ executablePath: chromePath, headless: true })
  : await chromium.launch({ headless: true })
const context = await browser.newContext({
  viewport: { width: 480, height: 900 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
})

const evidence = {
  capturedAt: new Date().toISOString(),
  baseUrl,
  results: [],
}

async function openRoute(route) {
  const page = await context.newPage()
  const logs = []
  page.on('console', (msg) => {
    const type = msg.type()
    if (type === 'error' || type === 'warning') logs.push({ type, text: msg.text() })
  })
  page.on('pageerror', (err) => logs.push({ type: 'pageerror', text: String(err?.message || err) }))
  await page.goto(baseUrl + route, { waitUntil: 'domcontentloaded', timeout: 25000 })
  await page.waitForTimeout(500)
  return { page, logs }
}

async function shot(page, name) {
  await page.screenshot({ path: `${outDir}/${name}.png`, fullPage: false })
}

async function capture(slug, route, steps) {
  console.log(`>>> ${slug} ${route}`)
  const { page, logs } = await openRoute(route)
  const states = []
  await shot(page, `${slug}-00-initial`)
  states.push({ name: 'initial' })
  try {
    if (steps) await steps({ page, states, shot: (name) => shot(page, `${slug}-${name}`) })
  } catch (err) {
    states.push({ name: 'error', detail: String(err?.message || err) })
  }
  await page.close()
  evidence.results.push({ slug, route, errors: logs.filter((l) => l.type === 'pageerror' || l.type === 'error'), warnings: logs.filter((l) => l.type === 'warning'), consoleAll: logs, states })
}

async function clickByText(page, role, name) {
  await page.getByRole(role, { name }).first().click({ timeout: 4000 })
  await page.waitForTimeout(250)
}

await capture('60-medication', '/features/medication', async ({ page, states, shot }) => {
  await clickByText(page, 'button', /Metformin 500mg/i)
  await shot('01-dose-toggled')
  states.push({ name: 'dose-toggled' })
  await page.getByRole('button', { name: /Add medication/i }).first().click()
  await page.waitForTimeout(300)
  await shot('02-add-sheet')
  states.push({ name: 'add-sheet-open' })
  await page.getByPlaceholder('Metformin').fill('Iron supplement')
  await page.getByPlaceholder('500mg').fill('65 mg')
  await page.waitForTimeout(200)
  await shot('03-add-filled')
  states.push({ name: 'add-sheet-filled' })
  await page.getByRole('button', { name: /^Save$/ }).click()
  await page.waitForTimeout(400)
  await shot('04-detail-after-save')
  states.push({ name: 'detail-after-save' })
})

await capture('61-reminders', '/features/reminders', async ({ page, states, shot }) => {
  await clickByText(page, 'button', /Take vitamin D/i)
  await shot('01-task-completed')
  states.push({ name: 'task-completed' })
  await page.getByRole('switch', { name: /Medication reminder/i }).click({ timeout: 4000 })
  await page.waitForTimeout(300)
  await shot('02-reminder-toggled')
  const reminderText = await page.locator('button[role=switch]').filter({ hasText: /Medication/i }).first().textContent()
  states.push({ name: 'reminder-toggled', reminderText: (reminderText || '').replace(/\s+/g, ' ').trim() })
  await page.getByRole('button', { name: /^Add$/ }).first().click()
  await page.waitForTimeout(300)
  await shot('03-add-sheet')
  states.push({ name: 'add-sheet-open' })
  await page.getByPlaceholder(/Book lab appointment/i).fill('Thursday physio')
  await page.getByPlaceholder(/Tomorrow 9:00 AM/i).fill('Thu 4:00 PM')
  await page.waitForTimeout(150)
  await page.getByRole('button', { name: /^Save$/ }).click()
  await page.waitForTimeout(300)
  await shot('04-task-saved')
  states.push({ name: 'task-saved' })
})

await capture('62-quick-notes', '/features/quick-notes', async ({ page, states, shot }) => {
  await page.getByLabel(/Search Balencia/i).first().fill('protein').catch(() => {})
  await page.getByPlaceholder(/What is on your mind/i).fill('Felt energy spike after coffee + protein.')
  await page.waitForTimeout(150)
  await shot('01-quick-add-filled')
  states.push({ name: 'quick-add-filled' })
  await page.getByRole('button', { name: /Save quick note/i }).click()
  await page.waitForTimeout(300)
  await shot('02-note-saved')
  states.push({ name: 'note-saved' })
  await page.getByRole('button', { name: /Health/i }).first().click()
  await page.waitForTimeout(200)
  await shot('03-filter-health')
  states.push({ name: 'filter-health' })
})

await capture('63-energy', '/features/energy', async ({ page, states, shot }) => {
  await page.locator('input[type="range"]').first().evaluate((el) => {
    el.value = '9'
    el.dispatchEvent(new Event('input', { bubbles: true }))
    el.dispatchEvent(new Event('change', { bubbles: true }))
  })
  await page.waitForTimeout(150)
  await shot('01-slider-set')
  states.push({ name: 'slider-set' })
  await page.getByRole('button', { name: /^Log energy$/ }).click()
  await page.waitForTimeout(300)
  await shot('02-logged')
  states.push({ name: 'energy-logged' })
  const tablists = await page.locator('[role="tablist"]').count()
  states.push({ name: 'tablist-count', count: tablists })
  await page.getByRole('tab', { name: '30d' }).click()
  await page.waitForTimeout(250)
  await shot('03-trend-30d')
  states.push({ name: 'trend-30d' })
})

await capture('64-report-block', '/features/report-block', async ({ page, states, shot }) => {
  const submitDisabledInitially = await page.getByRole('button', { name: /Submit report/i }).isDisabled()
  states.push({ name: 'submit-initially', disabled: submitDisabledInitially })
  await shot('01-default-disabled')
  await page.getByRole('radio').first().click()
  await page.waitForTimeout(200)
  await shot('02-reason-selected')
  const submitNow = await page.getByRole('button', { name: /Submit report/i }).isDisabled()
  states.push({ name: 'submit-after-reason', disabled: submitNow })
  const blockState = await page.locator('button[role="switch"]').first().getAttribute('aria-checked')
  states.push({ name: 'block-default', ariaChecked: blockState })
  await page.locator('button[role="switch"]').first().click()
  await page.waitForTimeout(200)
  await shot('03-block-on')
  states.push({ name: 'block-on' })
  await page.getByRole('button', { name: /Submit report/i }).click()
  await page.waitForTimeout(600)
  await shot('04-success')
  states.push({ name: 'success-replaces-sheet' })
})

await capture('65-force-update', '/features/force-update', async ({ page, states, shot }) => {
  await clickByText(page, 'button', /Update now/i)
  await shot('01-store-handoff')
  states.push({ name: 'store-handoff' })
  if (await page.getByRole('button', { name: /Simulate store unavailable/i }).count()) {
    await clickByText(page, 'button', /Simulate store unavailable/i)
    await shot('02-store-unavailable')
    states.push({ name: 'store-unavailable' })
    await clickByText(page, 'button', /Retry update/i)
    await shot('03-retry')
    states.push({ name: 'retry' })
  }
})

await capture('66-notification-permission', '/features/notification-permission', async ({ page, states, shot }) => {
  await clickByText(page, 'button', /Enable notifications/i)
  await shot('01-native-fixture')
  states.push({ name: 'native-fixture' })
  await clickByText(page, 'button', /Deny/i)
  await shot('02-denied')
  states.push({ name: 'denied' })
  const ctaText = await page.locator('button').filter({ hasText: /Open Settings/i }).first().textContent()
  states.push({ name: 'denied-cta', text: (ctaText || '').trim() })
  await clickByText(page, 'button', /Open Settings/i)
  await shot('03-settings')
  states.push({ name: 'settings-recovery' })
})

await capture('67-image-viewer', '/features/image-viewer', async ({ page, states, shot }) => {
  await clickByText(page, 'button', /Next image/i)
  await shot('01-next')
  states.push({ name: 'next-image' })
  const counter = await page.locator('text=/\\d+ of \\d+/').first().textContent()
  states.push({ name: 'counter', text: (counter || '').trim() })
  const altCheck = await page.locator('img').first().getAttribute('alt')
  states.push({ name: 'image-alt', alt: altCheck })
  await clickByText(page, 'button', /Share image/i)
  await shot('02-share-warning')
  states.push({ name: 'share-warning' })
  const gotItBox = await page.getByRole('button', { name: /Got it/i }).first().boundingBox()
  states.push({ name: 'got-it-size', width: gotItBox?.width, height: gotItBox?.height })
  await clickByText(page, 'button', /Got it/i)
  await shot('03-warning-dismissed')
  states.push({ name: 'warning-dismissed' })
  await clickByText(page, 'button', /Close image viewer/i)
  await shot('04-closed')
  states.push({ name: 'viewer-closed' })
})

await capture('68-universal-search', '/features/universal-search', async ({ page, states, shot }) => {
  await page.getByLabel('Search Balencia').fill('protein')
  await page.waitForTimeout(300)
  await shot('01-query')
  states.push({ name: 'query-protein' })
  await page.getByRole('button', { name: /^Goals$/ }).click()
  await page.waitForTimeout(250)
  await shot('02-filter-goals')
  const goalsBody = await page.locator('main').innerText()
  states.push({ name: 'filter-goals', containsRecipes: /RECIPES/i.test(goalsBody), containsQuickNotes: /QUICK NOTES/i.test(goalsBody) })
  await page.getByRole('button', { name: /^Settings$/ }).click()
  await page.waitForTimeout(200)
  await shot('03-filter-settings')
  states.push({ name: 'settings-chip-present' })
  await clickByText(page, 'button', /Cancel/i)
  await page.waitForTimeout(250)
  await shot('04-cancel-clears')
  const afterCancel = await page.locator('main').innerText()
  states.push({ name: 'cancel-state', hasStaleBanner: /Opening .* detail/.test(afterCancel) })
})

await capture('69-app-rating', '/features/app-rating', async ({ page, states, shot }) => {
  await page.getByLabel(/Rate 5 out of 5 stars/i).click()
  await page.waitForTimeout(250)
  await shot('01-positive-path')
  states.push({ name: 'positive-branch' })
  await clickByText(page, 'button', /Not now/i)
  await page.waitForTimeout(300)
  await shot('02-cooldown-resolved')
  const body = await page.locator('main').innerText()
  states.push({ name: 'cooldown-resolved', hasResolved: /Paused for 30 days/.test(body), hasStarsStill: /Rate 1 out of 5 stars/.test(await page.content()) })
})

await capture('78-reports', '/features/reports', async ({ page, states, shot }) => {
  await clickByText(page, 'button', /Weekly life report/i)
  await shot('01-preview-open')
  states.push({ name: 'preview-open' })
  const closeBtn = await page.getByRole('button', { name: /Close report preview/i }).first().boundingBox()
  states.push({ name: 'close-size', width: closeBtn?.width, height: closeBtn?.height })
  await clickByText(page, 'button', /Screenshot/i)
  await shot('02-share-sheet')
  states.push({ name: 'share-sheet' })
})

await capture('80-music', '/features/music', async ({ page, states, shot }) => {
  await clickByText(page, 'button', /Connect Spotify/i)
  await shot('01-permission-preview')
  states.push({ name: 'permission-preview' })
  await clickByText(page, 'button', /Allow Spotify/i)
  await page.waitForTimeout(700)
  await shot('02-connected')
  states.push({ name: 'connected' })
})

await capture('81-videos', '/features/videos', async ({ page, states, shot }) => {
  await page.getByLabel('Search coaching videos').fill('hip')
  await page.waitForTimeout(200)
  await shot('01-query-hip')
  states.push({ name: 'query-hip' })
  const clearBtn = await page.getByRole('button', { name: /Clear video search/i }).first().boundingBox()
  states.push({ name: 'clear-search-size', width: clearBtn?.width, height: clearBtn?.height })
  await clickByText(page, 'button', /5-minute hip reset/i)
  await page.waitForTimeout(250)
  await shot('02-player')
  states.push({ name: 'player-open' })
  const closeBtn = await page.getByRole('button', { name: /Close video player/i }).first().boundingBox()
  states.push({ name: 'player-close-size', width: closeBtn?.width, height: closeBtn?.height })
  await clickByText(page, 'button', /Search YouTube/i)
  await shot('03-handoff')
  states.push({ name: 'handoff-confirmation' })
})

await capture('82-accountability-contract', '/features/accountability-contract', async ({ page, states, shot }) => {
  await clickByText(page, 'button', /^Edit$/i)
  await shot('01-pending-update')
  states.push({ name: 'pending-update-on' })
  await clickByText(page, 'button', /Review and sign/i)
  await page.waitForTimeout(200)
  await shot('02-review-sheet')
  states.push({ name: 'review-sheet' })
  await clickByText(page, 'button', /Sign update/i)
  await page.waitForTimeout(300)
  await shot('03-signed')
  states.push({ name: 'signed' })
})

await capture('83-social-buddy', '/features/social-buddy', async ({ page, states, shot }) => {
  const inviteBox = await page.getByRole('button', { name: /Invite buddy/i }).first().boundingBox()
  states.push({ name: 'invite-size', width: inviteBox?.width, height: inviteBox?.height })
  const reportBox = await page.getByRole('button', { name: /^Report$/ }).first().boundingBox()
  states.push({ name: 'report-size', width: reportBox?.width, height: reportBox?.height })
  await clickByText(page, 'button', /Privacy/i)
  await shot('01-privacy-sheet')
  states.push({ name: 'privacy-sheet' })
  await clickByText(page, 'button', /^Report$/)
  await shot('02-report-sheet')
  states.push({ name: 'report-sheet' })
})

const totals = {
  routes: evidence.results.length,
  errorCount: evidence.results.reduce((acc, r) => acc + r.errors.length, 0),
  warningCount: evidence.results.reduce((acc, r) => acc + r.warnings.length, 0),
}
evidence.totals = totals

await fs.writeFile(`${outDir}/evidence.json`, JSON.stringify(evidence, null, 2))

await browser.close()

console.log('\nRESULT', JSON.stringify(totals, null, 2))
for (const r of evidence.results) {
  if (r.errors.length || r.warnings.length) {
    console.log(`\n${r.slug} (${r.route}): ${r.errors.length} errors, ${r.warnings.length} warnings`)
    for (const e of r.errors) console.log(`  ERROR ${e.text.slice(0, 200)}`)
    for (const w of r.warnings) console.log(`  WARN  ${w.text.slice(0, 200)}`)
  }
}
