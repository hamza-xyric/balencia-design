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

const results = {}

async function openRoute(route) {
  const page = await context.newPage()
  const logs = []
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') logs.push({ type: m.type(), text: m.text() }) })
  page.on('pageerror', (e) => logs.push({ type: 'pageerror', text: String(e?.message || e) }))
  await page.goto(baseUrl + route, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(500)
  return { page, logs }
}

const shot = (page, name) => page.screenshot({ path: `${outDir}/${name}.png` })

// 67 image-viewer: prove the photo alt changes per index (scope to screen-content)
{
  const { page, logs } = await openRoute('/features/image-viewer')
  const screen = page.getByTestId('screen-content')
  const altInitial = await screen.locator('img').first().getAttribute('alt')
  const counterInitial = await screen.locator('text=/\\d+ of \\d+/').first().textContent()
  await screen.getByRole('button', { name: /Next image/i }).click()
  await page.waitForTimeout(250)
  const altNext = await screen.locator('img').first().getAttribute('alt')
  const counterNext = await screen.locator('text=/\\d+ of \\d+/').first().textContent()
  await shot(page, '67-followup-next')
  await screen.getByRole('button', { name: /Next image/i }).click()
  await page.waitForTimeout(250)
  const altThird = await screen.locator('img').first().getAttribute('alt')
  await shot(page, '67-followup-third')
  results['67-image-viewer'] = {
    counterInitial: counterInitial?.trim(),
    altInitial,
    counterNext: counterNext?.trim(),
    altNext,
    altThird,
    altsDistinct: altInitial !== altNext && altNext !== altThird,
    errors: logs.filter(l => l.type === 'pageerror' || l.type === 'error'),
  }
  await page.close()
}

// 68 universal-search: filter actually scopes; cancel clears stale banner
{
  const { page, logs } = await openRoute('/features/universal-search')
  const screen = page.getByTestId('screen-content')
  await screen.getByLabel('Search Balencia').fill('protein')
  await page.waitForTimeout(300)
  // open a result so banner shows
  const firstResult = await screen.getByRole('button').filter({ hasText: /Protein pancakes/i }).first()
  if (await firstResult.count()) await firstResult.click()
  await page.waitForTimeout(250)
  const allFiltersText = (await screen.getByText('All', { exact: true }).count()) > 0
  await shot(page, '68-followup-with-banner')
  const bodyBefore = await screen.innerText()
  const stateBefore = { allChip: allFiltersText, hasOpeningBanner: /Opening .* detail/.test(bodyBefore) }
  await screen.getByRole('button', { name: /^Goals$/ }).click()
  await page.waitForTimeout(250)
  const bodyGoals = await screen.innerText()
  await shot(page, '68-followup-goals')
  const goalsState = {
    showsRecipesSection: /RECIPES \(\d+\)/.test(bodyGoals),
    showsQuickNotesSection: /QUICK NOTES \(\d+\)/.test(bodyGoals),
    showsMissionsSection: /MISSIONS \(\d+\)/.test(bodyGoals),
    bannerStillShown: /Opening .* detail/.test(bodyGoals),
  }
  await screen.getByRole('button', { name: /^Settings$/ }).click()
  await page.waitForTimeout(200)
  const bodySettings = await screen.innerText()
  await shot(page, '68-followup-settings')
  const settingsState = { settingsChipExists: true, showsAnyResults: /\(\d+\)/.test(bodySettings) }
  // Cancel resets
  await screen.getByRole('button', { name: /^Cancel$/i }).click()
  await page.waitForTimeout(250)
  const bodyAfterCancel = await screen.innerText()
  await shot(page, '68-followup-cancel')
  results['68-universal-search'] = {
    stateBefore,
    goalsState,
    settingsState,
    afterCancel: {
      hasRecentSearches: /Recent searches/i.test(bodyAfterCancel),
      bannerCleared: !/Opening .* detail/.test(bodyAfterCancel),
    },
    errors: logs.filter(l => l.type === 'pageerror' || l.type === 'error'),
  }
  await page.close()
}

// 69 app-rating: Not now actually replaces sheet
{
  const { page, logs } = await openRoute('/features/app-rating')
  const screen = page.getByTestId('screen-content')
  await screen.getByLabel(/Rate 5 out of 5 stars/i).click()
  await page.waitForTimeout(250)
  await shot(page, '69-followup-positive')
  const bodyPositive = await screen.innerText()
  const positiveState = {
    hasOpenAppStore: /Open App Store review/.test(bodyPositive),
    hasNotNow: /Not now/.test(bodyPositive),
  }
  await screen.getByRole('button', { name: /Not now/i }).click()
  await page.waitForTimeout(400)
  const bodyAfter = await screen.innerText()
  await shot(page, '69-followup-cooldown')
  const cooldownState = {
    hasPausedCopy: /Paused for 30 days/.test(bodyAfter),
    starsHidden: !/Rate 1 out of 5 stars/.test(await page.content()) || (await screen.locator('[role="radio"]').count()) === 0,
    notNowGone: !/Not now/.test(bodyAfter),
    doNotAskGone: !/Do not ask again/.test(bodyAfter),
  }
  results['69-app-rating'] = { positiveState, cooldownState, errors: logs.filter(l => l.type === 'pageerror' || l.type === 'error') }
  await page.close()
}

// 69 app-rating again: Do not ask -> Confirm -> suppressed
{
  const { page, logs } = await openRoute('/features/app-rating')
  const screen = page.getByTestId('screen-content')
  await screen.getByRole('button', { name: /Do not ask again/i }).click()
  await page.waitForTimeout(200)
  await screen.getByRole('button', { name: /Confirm suppression/i }).click()
  await page.waitForTimeout(400)
  const bodyAfter = await screen.innerText()
  await shot(page, '69-followup-suppressed')
  results['69-app-rating-suppressed'] = {
    hasSuppressedCopy: /Rating prompts suppressed/.test(bodyAfter),
    starsGone: (await screen.locator('[role="radio"]').count()) === 0,
    errors: logs.filter(l => l.type === 'pageerror' || l.type === 'error'),
  }
  await page.close()
}

await fs.writeFile(`${outDir}/followups.json`, JSON.stringify(results, null, 2))
await browser.close()

console.log(JSON.stringify(results, null, 2))
