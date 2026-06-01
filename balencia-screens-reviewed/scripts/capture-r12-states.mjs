import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

const repoRoot = path.resolve(process.cwd(), '..')
const appRoot = path.join(repoRoot, 'balencia-screens')
const appRequire = createRequire(path.join(appRoot, 'package.json'))
const { chromium } = appRequire('playwright')

const baseURL = process.env.A_PLUS_PLUS_BASE_URL || 'http://localhost:3000'
const outputDir = path.join(appRoot, 'output/a-plus-plus-review/R12/states')
fs.mkdirSync(outputDir, { recursive: true })

const chromePath = process.env.PLAYWRIGHT_CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

async function launchBrowser() {
  if (fs.existsSync(chromePath)) {
    return chromium.launch({ executablePath: chromePath })
  }

  try {
    return await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome' })
  } catch (error) {
    if (process.env.PLAYWRIGHT_CHANNEL) throw error
    return chromium.launch()
  }
}

function cleanText(text) {
  return text.trim().replace(/\s+/g, ' ').slice(0, 1400)
}

async function main() {
  const browser = await launchBrowser()
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
  const scenarios = []
  let activeConsoleErrors = []

  page.on('console', (message) => {
    if (message.type() === 'error') activeConsoleErrors.push(message.text())
  })
  page.on('pageerror', (error) => {
    activeConsoleErrors.push(error.message)
  })

  async function goto(route) {
    activeConsoleErrors = []
    await page.goto(new URL(route, baseURL).toString(), { waitUntil: 'networkidle', timeout: 25000 })
    await page.waitForTimeout(350)
  }

  async function capture(name, notes = {}) {
    const phone = page.locator('[data-testid="phone-frame"]')
    const screenshotPath = path.join(outputDir, `${name}.png`)
    await phone.screenshot({ path: screenshotPath })
    const text = await phone.innerText()
    scenarios.push({
      name,
      url: page.url(),
      screenshot: screenshotPath,
      text: cleanText(text),
      consoleErrors: [...new Set(activeConsoleErrors)],
      ...notes,
    })
  }

  async function clickRole(role, name) {
    const target = page.getByRole(role, { name, exact: true })
    await target.click()
    await page.waitForTimeout(250)
  }

  async function fillInput(labelOrPlaceholder, value) {
    const byLabel = page.getByLabel(labelOrPlaceholder, { exact: true })
    if (await byLabel.count()) {
      await byLabel.fill(value)
      await page.waitForTimeout(180)
      return
    }
    await page.getByPlaceholder(labelOrPlaceholder, { exact: true }).fill(value)
    await page.waitForTimeout(180)
  }

  await goto('/domains/spirituality')
  await capture('34-initial')
  await clickRole('button', 'Fajr 5:12 AM')
  await capture('34-practice-toggled')
  await clickRole('button', '12 day streak')
  await capture('34-streak-control')
  await clickRole('button', 'General')
  await capture('34-general-belief')
  await clickRole('button', 'Set up')
  await capture('34-unconfigured-belief')
  await clickRole('button', 'Muslim')
  await clickRole('button', 'Log reading')
  await capture('34-reading-sheet')
  await page.getByPlaceholder('Pages, passage, or notes', { exact: true }).fill('Read 3 pages and noted one reflection.')
  await clickRole('button', 'Save')
  await capture('34-reading-saved')
  await clickRole('button', 'Write reflection')
  await capture('34-reflection-sheet')
  await clickRole('button', 'Cancel')
  await clickRole('button', 'Meditate 10 min')
  await capture('34-timer-modal')
  await clickRole('button', 'Complete session')
  await capture('34-timer-complete')

  await goto('/domains/learning')
  await capture('35-initial')
  await clickRole('button', 'Log learning session')
  const learningSaveDisabledInitial = await page.getByRole('button', { name: 'Save session', exact: true }).isDisabled()
  await capture('35-log-sheet-empty', { learningSaveDisabledInitial })
  await fillInput('Duration minutes', '45')
  const learningSaveDisabledFilled = await page.getByRole('button', { name: 'Save session', exact: true }).isDisabled()
  await capture('35-log-sheet-filled', { learningSaveDisabledFilled })
  await clickRole('button', 'Save session')
  await capture('35-log-saved')
  await clickRole('button', 'Complete Read chapter 7')
  await capture('35-suggestion-completed')
  await clickRole('button', 'Refresh suggestions')
  await capture('35-suggestions-refreshed')
  await goto('/domains/learning')
  await page.locator('a[href="/features/journal?source=learning-book"]').click()
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(250)
  await capture('35-current-book-destination', { destinationUrl: page.url() })

  await goto('/domains/creativity')
  await capture('36-initial')
  await clickRole('button', 'Short film script ▸ Recording demo tracks Jun 8 45%')
  await capture('36-project-expanded')
  await clickRole('button', 'See all')
  await capture('36-see-all-expanded')
  await clickRole('button', 'Start creating')
  await capture('36-start-creating-sheet', {
    promptValue: await page.locator('input').first().inputValue(),
  })
  await fillInput('Minutes', '30')
  await clickRole('button', 'Save session')
  await capture('36-session-saved')
  await goto('/domains/creativity')
  await page.getByRole('link', { name: 'Reflect on this', exact: true }).click()
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(250)
  await capture('36-reflect-destination', {
    destinationUrl: page.url(),
    expectedPromptPresent: (await page.locator('[data-testid="phone-frame"]').innerText()).includes("materials within arm's reach"),
  })

  await goto('/domains/exercise-library')
  await capture('70-initial')
  await fillInput('Search exercises', 'row')
  await capture('70-search-row')
  await page.getByRole('button', { name: 'Dumbbells', exact: true }).click()
  await page.waitForTimeout(250)
  await capture('70-search-row-dumbbells-filter')
  await clickRole('button', 'Row, Back, Dumbbells')
  await capture('70-detail-sheet')
  await clickRole('button', 'Add to workout')
  await capture('70-added-toast')

  await goto('/features/journal')
  await capture('37-initial')
  await clickRole('button', 'Write about this')
  const promptedSaveDisabled = await page.getByRole('button', { name: 'Save', exact: true }).isDisabled()
  await capture('37-prompted-writer', { promptedSaveDisabled })
  page.once('dialog', (dialog) => dialog.accept())
  await clickRole('button', 'Cancel')
  await clickRole('button', 'Write new journal entry')
  const blankSaveDisabled = await page.getByRole('button', { name: 'Save', exact: true }).isDisabled()
  await capture('37-blank-writer', { blankSaveDisabled })
  await page.getByPlaceholder('Write freely...', { exact: true }).fill('Captured a calmer morning and a cleaner plan.')
  await clickRole('button', 'Plus voice transcription preview')
  await clickRole('button', 'Save')
  await capture('37-entry-saved')
  await clickRole('tab', 'Check-ins')
  await capture('37-check-ins')
  await clickRole('button', 'Morning mood: steady Read only')
  await capture('37-check-in-detail')
  await goto('/features/journal')
  await fillInput('Search journal', 'project')
  await capture('37-search-project', {
    searchStillShowsNonMatches: (await page.locator('[data-testid="phone-frame"]').innerText()).includes('Tough conversation with a friend'),
  })

  const result = {
    capturedAt: new Date().toISOString(),
    baseURL,
    scenarios,
  }
  fs.writeFileSync(path.join(outputDir, 'r12-state-capture.json'), JSON.stringify(result, null, 2))
  await browser.close()
  console.log(`Captured ${scenarios.length} R12 state screenshots to ${outputDir}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
