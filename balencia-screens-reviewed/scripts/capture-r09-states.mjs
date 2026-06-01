import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

const cwd = process.cwd()
const repoRoot = path.basename(cwd) === 'balencia-screens-reviewed' ? path.resolve(cwd, '..') : cwd
const appRoot = path.join(repoRoot, 'balencia-screens')
const appRequire = createRequire(path.join(appRoot, 'package.json'))
const { chromium } = appRequire('playwright')

const baseURL = process.env.A_PLUS_PLUS_BASE_URL || 'http://localhost:3000'
const outputDir = path.join(appRoot, 'output/a-plus-plus-review/R09/states')
fs.mkdirSync(outputDir, { recursive: true })

const screenshots = []
const interactions = []
const consoleErrors = []

async function launchBrowser() {
  const chromePath = process.env.PLAYWRIGHT_CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  if (fs.existsSync(chromePath)) {
    return chromium.launch({ executablePath: chromePath })
  }
  return chromium.launch()
}

function urlFor(route) {
  return new URL(route, baseURL).toString()
}

async function phoneShot(page, name) {
  await page.waitForTimeout(250)
  const file = `${name}.png`
  await page.locator('[data-testid="phone-frame"]').screenshot({
    path: path.join(outputDir, file),
  })
  screenshots.push(file)
}

async function readPhoneState(page) {
  return page.evaluate(() => {
    const phone = document.querySelector('[data-testid="phone-frame"]')
    const scope = phone || document.body
    const controls = [...scope.querySelectorAll('a, button, input, textarea, select, [role="button"], [role="link"], [role="switch"], [role="tab"]')]
      .filter((element) => {
        const rect = element.getBoundingClientRect()
        const style = window.getComputedStyle(element)
        return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden'
      })
      .map((element) => {
        const rect = element.getBoundingClientRect()
        return {
          label: (
            element.getAttribute('aria-label') ||
            element.getAttribute('placeholder') ||
            element.textContent ||
            element.tagName
          ).trim().replace(/\s+/g, ' ').slice(0, 140),
          tag: element.tagName.toLowerCase(),
          role: element.getAttribute('role') || '',
          disabled: Boolean(element.disabled || element.getAttribute('aria-disabled') === 'true'),
          pressed: element.getAttribute('aria-pressed') || '',
          expanded: element.getAttribute('aria-expanded') || '',
          href: element.getAttribute('href') || '',
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        }
      })

    return {
      url: window.location.href,
      text: (scope.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 1800),
      dialogs: scope.querySelectorAll('[role="dialog"]').length,
      controls,
    }
  })
}

async function record(page, label, extra = {}) {
  interactions.push({
    label,
    ...(await readPhoneState(page)),
    ...extra,
  })
}

async function gotoRoute(page, route, label) {
  await page.goto(urlFor(route), { waitUntil: 'networkidle', timeout: 25000 })
  await page.waitForTimeout(300)
  await record(page, label)
}

const browser = await launchBrowser()
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })

page.on('console', (message) => {
  if (message.type() === 'error') consoleErrors.push(message.text())
})
page.on('pageerror', (error) => consoleErrors.push(error.message))

await gotoRoute(page, '/tabs/me/notifications', '24 initial notification history')
await phoneShot(page, '24-notifications-initial')
await page.getByRole('button', { name: 'Mark all read' }).click()
await record(page, '24 mark all read feedback')
await phoneShot(page, '24-notifications-mark-all-read')
await page.getByRole('button', { name: 'All notifications marked read. Undo' }).click()
await record(page, '24 undo read-state feedback')
await phoneShot(page, '24-notifications-undo')
await gotoRoute(page, '/tabs/me/notifications', '24 reset before notification deep link')
await page.getByRole('button', { name: /Unread SIA insight/ }).click()
await page.waitForURL('**/tabs/me/knowledge-graph', { timeout: 10000 })
await record(page, '24 SIA insight deep link')
await phoneShot(page, '24-notifications-sia-deeplink')

await gotoRoute(page, '/tabs/me/help', '25 initial help center')
await phoneShot(page, '25-help-initial')
await page.getByPlaceholder('Search help topics').fill('privacy')
await record(page, '25 search filters FAQ to privacy')
await phoneShot(page, '25-help-search-privacy')
await page.getByRole('button', { name: 'Contact support' }).click()
await record(page, '25 support form open with disabled send')
await phoneShot(page, '25-help-support-form')
await page.getByPlaceholder('Tell us what happened').fill('Privacy export request')
await page.getByRole('button', { name: 'Send request' }).click()
await record(page, '25 support request queued')
await phoneShot(page, '25-help-support-queued')
await gotoRoute(page, '/tabs/me/help', '25 reset before Ask SIA')
await page.getByRole('link', { name: /Ask SIA/ }).click()
await page.waitForURL('**/tabs/sia', { timeout: 10000 })
await record(page, '25 Ask SIA routes to SIA tab')
await phoneShot(page, '25-help-ask-sia-route')

await gotoRoute(page, '/tabs/me/progress-photos', '49 initial progress photos')
await phoneShot(page, '49-progress-initial')
await page.getByRole('button', { name: '1M' }).click()
await record(page, '49 weight range 1M selected')
await phoneShot(page, '49-progress-range-1m')
await page.getByRole('button', { name: 'Add progress' }).click()
await record(page, '49 add progress sheet open')
await phoneShot(page, '49-progress-add-sheet')
await page.locator('#weight').fill('')
await record(page, '49 empty weight disables save')
await phoneShot(page, '49-progress-empty-weight')
await page.locator('#weight').fill('73.8')
await page.getByRole('button', { name: 'Save progress' }).click()
await record(page, '49 progress saved toast')
await phoneShot(page, '49-progress-saved-toast')
await page.getByRole('button', { name: 'Compare' }).click()
await record(page, '49 compare sheet open')
await phoneShot(page, '49-progress-compare-sheet')
await page.getByRole('button', { name: 'Use these photos' }).click()
await record(page, '49 compare toast')
await phoneShot(page, '49-progress-compare-toast')
await page.getByRole('button', { name: 'Open encrypted progress photo from May 21' }).click()
await record(page, '49 encrypted photo detail open')
await phoneShot(page, '49-progress-photo-detail')
await page.getByRole('button', { name: 'Delete photo' }).click()
await record(page, '49 delete photo confirmation copy')
await phoneShot(page, '49-progress-delete-photo-copy')

await gotoRoute(page, '/tabs/me/profile-edit', '50 initial profile edit')
await phoneShot(page, '50-profile-initial')
await page.getByRole('button', { name: 'Change photo' }).click()
await record(page, '50 avatar action options')
await phoneShot(page, '50-profile-avatar-options')
await gotoRoute(page, '/tabs/me/profile-edit', '50 reset before dirty edit')
await page.locator('#profile-timezone').fill('Asia/Karachi (GMT+5)')
await record(page, '50 dirty timezone enables save')
await phoneShot(page, '50-profile-dirty-save-enabled')
await page.getByRole('button', { name: 'Save changes' }).click()
await page.waitForURL('**/tabs/me', { timeout: 10000 })
await record(page, '50 save returns to Me')
await phoneShot(page, '50-profile-save-return')
await gotoRoute(page, '/tabs/me/profile-edit', '50 reset before delete confirmation')
await page.getByRole('button', { name: 'Delete account' }).click()
await record(page, '50 delete confirmation disabled')
await phoneShot(page, '50-profile-delete-disabled')
await page.getByLabel('Type DELETE to confirm account deletion').fill('DELETE')
await record(page, '50 delete confirmation enabled')
await phoneShot(page, '50-profile-delete-enabled')
await page.getByRole('button', { name: 'Cancel' }).click()
await record(page, '50 delete confirmation cancelled')
await phoneShot(page, '50-profile-delete-cancelled')

await gotoRoute(page, '/tabs/me/achievements', '71 initial achievement gallery')
await phoneShot(page, '71-achievements-initial')
await page.getByRole('button', { name: 'Fitness', exact: true }).click()
await record(page, '71 Fitness filter selected')
await phoneShot(page, '71-achievements-fitness-filter')
await page.getByRole('button', { name: /First workout/ }).click()
await record(page, '71 earned achievement detail')
await phoneShot(page, '71-achievements-earned-detail')
await page.getByRole('button', { name: 'Close' }).click()
await page.getByRole('button', { name: 'All', exact: true }).click()
await page.getByRole('button', { name: /30-day streak/ }).click()
await record(page, '71 in-progress achievement detail')
await phoneShot(page, '71-achievements-progress-detail')
await page.getByRole('button', { name: 'Close' }).click()
await page.getByRole('button', { name: /Budget keeper/ }).click()
await record(page, '71 locked achievement detail')
await phoneShot(page, '71-achievements-locked-detail')
await page.getByRole('button', { name: 'Close' }).click()
await page.getByRole('button', { name: 'General', exact: true }).click()
await record(page, '71 General filter empty state')
await phoneShot(page, '71-achievements-empty-filter')

await browser.close()

const result = {
  baseURL,
  capturedAt: new Date().toISOString(),
  consoleErrors: [...new Set(consoleErrors)],
  screenshots: screenshots.sort(),
  interactions,
}

fs.writeFileSync(path.join(outputDir, 'r09-state-capture.json'), JSON.stringify(result, null, 2))

console.log(`R09 state evidence saved to ${outputDir}`)
if (consoleErrors.length) {
  console.error([...new Set(consoleErrors)].join('\n'))
  process.exitCode = 1
}
