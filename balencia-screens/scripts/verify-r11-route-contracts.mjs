import fs from 'node:fs'
import { chromium } from 'playwright'

const baseURL = process.env.R11_CONTRACT_BASE_URL || 'http://localhost:3002'
const base = new URL(baseURL)
const expectedOrigin = 'http://localhost:3002'

if (base.origin !== expectedOrigin) {
  throw new Error(`R11 route-contract verification requires ${expectedOrigin}; received ${base.origin}`)
}

const controls = ['category', 'source', 'scope', 'freshness', 'confidence', 'retention', 'export', 'revoke', 'delete']
const controlLabels = Object.fromEntries(controls.map(control => [control, control[0].toUpperCase() + control.slice(1)]))
const controlDialogs = {
  category: 'WHOOP category',
  source: 'WHOOP source',
  scope: 'WHOOP scope',
  freshness: 'WHOOP freshness',
  confidence: 'WHOOP confidence',
  retention: 'WHOOP retention',
  export: 'Export WHOOP preview',
  revoke: 'Revoke WHOOP access',
  delete: 'Delete WHOOP source data',
}

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

async function launchBrowser() {
  const chromePath = process.env.PLAYWRIGHT_CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  if (fs.existsSync(chromePath)) return chromium.launch({ executablePath: chromePath })
  return chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome' })
}

const browser = await launchBrowser()

async function withIsolatedPage(label, run) {
  const context = await browser.newContext({
    // The application is a desktop review shell around an exact 390x844
    // phone frame. Use the review-shell viewport for real pointer clicks;
    // the strict visual harness separately pins the phone capture viewport.
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  })
  const page = await context.newPage()
  const failures = []

  page.on('console', message => {
    if (message.type() === 'error') failures.push(`console: ${message.text()}`)
  })
  page.on('pageerror', error => failures.push(`page: ${error.message}`))
  page.on('request', request => {
    if (new URL(request.url()).origin !== base.origin) failures.push(`external request: ${request.url()}`)
  })

  try {
    await run(page)
    assert(failures.length === 0, `${label} emitted ${failures.join('; ')}`)
    assert((await context.cookies()).length === 0, `${label} wrote cookies`)
    const storage = await page.evaluate(async () => ({
      local: localStorage.length,
      session: sessionStorage.length,
      indexedDb: typeof indexedDB.databases === 'function' ? (await indexedDB.databases()).length : 0,
      caches: typeof caches === 'undefined' ? 0 : (await caches.keys()).length,
    }))
    assert(Object.values(storage).every(value => value === 0), `${label} wrote browser storage: ${JSON.stringify(storage)}`)
  } finally {
    await context.close()
  }
}

try {
  await withIsolatedPage('crisis destination', async page => {
    await page.goto(new URL('/screens/89', base).toString(), { waitUntil: 'networkidle' })
    await page.locator('a[href="/screens/25?support=crisis"]').click()
    await page.waitForURL('**/screens/25?support=crisis')

    const destination = page.locator('[data-support-mode="crisis"]')
    await destination.waitFor({ state: 'visible' })
    assert(await destination.getByText(/contact (?:your )?local emergency services now/i).count() === 1, 'crisis destination lacks immediate-emergency guidance')
    assert(await destination.getByText(/cannot determine your location/i).count() === 1, 'crisis destination lacks unknown-locale fallback')
    assert(await destination.getByText(/cannot place calls, send texts/i).count() === 1, 'crisis destination lacks capability-honesty copy')
    assert(await destination.evaluate(node => node === document.activeElement), 'crisis destination did not receive focus')

    const directory = destination.getByRole('link', { name: 'Find verified local helplines' })
    assert(await directory.getAttribute('href') === 'https://findahelpline.com/', 'crisis directory link is not the verified global destination')
    assert((await directory.getAttribute('rel'))?.split(/\s+/).includes('noreferrer'), 'crisis directory link must suppress referrer data')

    await destination.getByRole('button', { name: 'Return to Help Center' }).click()
    const search = page.getByRole('searchbox', { name: 'Search help topics' })
    await search.waitFor({ state: 'visible' })
    await page.waitForFunction(() => document.activeElement?.id === 'help-search')
    assert(await search.evaluate(node => node === document.activeElement), 'returning from crisis guidance did not focus the Help Center search')
  })

  await withIsolatedPage('in-screen data-control transition', async page => {
    await page.goto(new URL('/screens/84', base).toString(), { waitUntil: 'networkidle' })
    const whoopRow = page.locator('button').filter({ hasText: 'WHOOP' }).first()
    await whoopRow.click()
    const index = page.getByRole('dialog', { name: 'WHOOP data controls' })
    await index.getByRole('button', { name: 'Category', exact: true }).click()

    const detail = page.getByRole('dialog', { name: 'WHOOP category' })
    await detail.waitFor({ state: 'visible' })
    assert(await detail.evaluate(node => node.contains(document.activeElement)), 'WHOOP index-to-category transition lost focus')
    const detailAlpha = await detail.evaluate(node => {
      const color = getComputedStyle(node).backgroundColor
      const match = color.match(/^rgba\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)$/)
      return match ? Number(match[1]) : 1
    })
    assert(detailAlpha >= 0.95, `WHOOP category dialog background is too transparent (${detailAlpha})`)
    await page.keyboard.press('Tab')
    assert(await detail.evaluate(node => node.contains(document.activeElement)), 'WHOOP category dialog did not retain focus after Tab')
  })

  for (const control of controls) {
    const label = controlLabels[control]
    await withIsolatedPage(`${label} data control`, async page => {
      await page.goto(new URL('/screens/89?state=data-controls', base).toString(), { waitUntil: 'networkidle' })
      const wellbeingDialog = page.getByRole('dialog', { name: 'Wellbeing data controls' })
      await wellbeingDialog.getByRole('link', { name: label, exact: true }).click()
      await page.waitForURL(`**/screens/84?control=${control}`)

      const routeMarker = page.locator(`[data-route-control="${control}"]`)
      await routeMarker.waitFor({ state: 'attached' })
      const panel = page.locator(`[data-control-panel="${control}"]`)
      await panel.waitFor({ state: 'visible' })
      const dialog = page.getByRole('dialog', { name: controlDialogs[control] })
      assert(await dialog.count() === 1, `${label} route lacks its named dialog`)
      assert(await dialog.evaluate(node => node.contains(document.activeElement)), `${label} dialog did not contain focus`)
      const backgroundAlpha = await dialog.evaluate(node => {
        const color = getComputedStyle(node).backgroundColor
        const match = color.match(/^rgba\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)$/)
        return match ? Number(match[1]) : 1
      })
      assert(backgroundAlpha >= 0.95, `${label} dialog background is too transparent (${backgroundAlpha})`)

      if (control === 'export') {
        await panel.getByRole('button', { name: 'Preview local export' }).click()
        assert(await panel.getByText(/no file was created/i).count() === 1, 'Export preview lacks no-file outcome')
      }

      if (control === 'revoke') {
        assert(await panel.getByRole('button', { name: 'Confirm local WHOOP revoke' }).count() === 1, 'Revoke route lacks explicit confirmation')
      }

      if (control === 'delete') {
        assert(await panel.getByRole('button', { name: 'Confirm local WHOOP delete' }).count() === 1, 'Delete route lacks explicit confirmation')
      }
    })
  }

  console.log('verify:r11-contracts passed (crisis entry/return, in-screen modal transition, 9 focused data-control routes)')
} finally {
  await browser.close()
}
