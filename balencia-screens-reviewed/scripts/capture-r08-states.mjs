import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

const repoRoot = path.resolve(process.cwd(), '..')
const appRoot = path.join(repoRoot, 'balencia-screens')
const appRequire = createRequire(path.join(appRoot, 'package.json'))
const { chromium } = appRequire('playwright')

const baseURL = process.env.A_PLUS_PLUS_BASE_URL || 'http://localhost:3000'
const outputDir = path.join(appRoot, 'output/a-plus-plus-review/R08/states')
fs.mkdirSync(outputDir, { recursive: true })

async function launchBrowser() {
  const chromePath = process.env.PLAYWRIGHT_CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  if (fs.existsSync(chromePath)) {
    return chromium.launch({ executablePath: chromePath })
  }
  return chromium.launch()
}

async function captureState(page, states, name, note = '') {
  await page.waitForTimeout(250)
  const screenshotPath = path.join(outputDir, `${name}.png`)
  const phone = page.locator('[data-testid="phone-frame"]')
  if (await phone.count()) {
    await phone.screenshot({ path: screenshotPath })
  } else {
    await page.screenshot({ path: screenshotPath, fullPage: true })
  }

  const state = await page.evaluate(() => {
    const phoneElement = document.querySelector('[data-testid="phone-frame"]')
    const root = phoneElement || document.body
    const controlSelector = [
      'a',
      'button',
      'input',
      'textarea',
      'select',
      '[role="button"]',
      '[role="link"]',
      '[role="switch"]',
      '[role="tab"]',
    ].join(',')

    function visible(element) {
      const style = window.getComputedStyle(element)
      const rect = element.getBoundingClientRect()
      return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none'
    }

    function labelFor(element) {
      return (
        element.getAttribute('aria-label') ||
        element.getAttribute('placeholder') ||
        element.innerText ||
        element.textContent ||
        element.tagName
      ).trim().replace(/\s+/g, ' ').slice(0, 140)
    }

    return {
      url: window.location.href,
      text: (root.innerText || document.body.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 1800),
      controls: [...root.querySelectorAll(controlSelector)].filter(visible).map((element) => {
        const rect = element.getBoundingClientRect()
        return {
          label: labelFor(element),
          tag: element.tagName.toLowerCase(),
          role: element.getAttribute('role') || '',
          disabled: Boolean(element.disabled || element.getAttribute('aria-disabled') === 'true'),
          ariaChecked: element.getAttribute('aria-checked') || '',
          href: element.getAttribute('href') || '',
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        }
      }),
      dialogs: [...document.querySelectorAll('[role="dialog"]')].filter(visible).map(labelFor),
    }
  })

  states.push({
    name,
    note,
    screenshot: screenshotPath,
    ...state,
  })
}

const browser = await launchBrowser()
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
const consoleErrors = []
const states = []

page.on('console', (message) => {
  if (message.type() === 'error') consoleErrors.push(message.text())
})
page.on('pageerror', (error) => consoleErrors.push(error.message))

await page.goto(new URL('/tabs/me/rpg', baseURL).toString(), { waitUntil: 'networkidle' })
await page.getByRole('button', { name: 'Open Fitness sub-stats' }).click()
await captureState(page, states, '19-rpg-fitness-substats', 'Fitness card opens the domain sub-stats sheet with a dashboard CTA.')
await page.getByRole('button', { name: 'Close' }).click()
await page.getByRole('button', { name: 'Open Sleep sub-stats' }).click()
await captureState(page, states, '19-rpg-sleep-substats', 'Sleep card opens the same sub-stats pattern before testing the dashboard CTA.')
await page.getByRole('link', { name: 'Dashboard', exact: true }).click()
await page.waitForLoadState('networkidle')
await captureState(page, states, '19-rpg-sleep-dashboard-click', 'Sleep Dashboard CTA target after click.')

await page.goto(new URL('/tabs/me/personal-wiki', baseURL).toString(), { waitUntil: 'networkidle' })
await page.getByLabel('Search Book of life memories').fill('sleep')
await captureState(page, states, '20-wiki-search-sleep', 'Search filters across Book of life chapters.')
await page.getByRole('button', { name: 'Clear search' }).click()
await page.getByRole('tab', { name: /Preferences/ }).click()
await captureState(page, states, '20-wiki-preferences-tab', 'Chapter tab switches visible memory category.')
await page.getByRole('tab', { name: /Patterns/ }).click()
await page.getByRole('button', { name: 'Edit' }).first().click()
await captureState(page, states, '20-wiki-edit-mode', 'Inline edit exposes title, memory, save, cancel, and delete controls.')
await page.getByLabel('Title').fill('Morning rhythm')
await page.getByRole('button', { name: 'Save' }).click()
await captureState(page, states, '20-wiki-edit-saved', 'Saved edit updates source to edited by you for this session.')
await page.getByRole('button', { name: 'This is wrong' }).first().click()
await captureState(page, states, '20-wiki-review-memory-sheet', 'This is wrong opens the remove/edit/cancel review sheet.')
await page.getByRole('button', { name: 'Cancel' }).click()

await page.goto(new URL('/tabs/me/settings', baseURL).toString(), { waitUntil: 'networkidle' })
await page.getByRole('switch', { name: 'Face ID' }).click()
await captureState(page, states, '21-settings-face-id-toggle', 'Full settings row toggles Face ID state.')
await page.getByRole('button', { name: 'Change password' }).click()
await captureState(page, states, '21-settings-change-password-sheet', 'Change password opens a settings bottom sheet.')
await page.getByRole('button', { name: 'Done' }).click()
await page.getByRole('button', { name: 'Language English' }).click()
await captureState(page, states, '21-settings-language-sheet', 'Language row opens the current prototype picker pattern.')
await page.getByRole('button', { name: 'Done' }).click()
await page.getByRole('button', { name: 'Delete account' }).click()
await captureState(page, states, '21-settings-delete-account-confirmation', 'Delete account opens confirmation and export-before-delete copy.')
await page.getByRole('button', { name: 'Cancel' }).click()

await page.goto(new URL('/tabs/me/connected-services', baseURL).toString(), { waitUntil: 'networkidle' })
await page.locator('article', { hasText: 'Apple Health' }).getByRole('button', { name: 'Connect' }).click()
await captureState(page, states, '22-services-apple-health-oauth-preview', 'Connect opens a provider-specific OAuth preview with scopes and storage copy.')
await page.getByRole('button', { name: 'Allow' }).click()
await page.waitForTimeout(900)
await captureState(page, states, '22-services-apple-health-connected', 'Allow transitions Apple Health into a connected state with just-now sync.')
await page.locator('article', { hasText: 'WHOOP' }).getByRole('button', { name: 'Force sync' }).click()
await captureState(page, states, '22-services-whoop-syncing', 'Force sync shows a temporary syncing state.')
await page.waitForTimeout(900)
await page.locator('article', { hasText: 'WHOOP' }).getByRole('button', { name: 'Disconnect' }).click()
await captureState(page, states, '22-services-whoop-disconnect-confirmation', 'Disconnect opens confirmation with future-sync and deletion/revocation copy.')

await page.goto(new URL('/tabs/me/subscription', baseURL).toString(), { waitUntil: 'networkidle' })
await page.getByRole('tab', { name: 'Annual' }).click()
await captureState(page, states, '23-subscription-annual-pricing', 'Annual toggle updates plan pricing and save badges.')
await page.getByRole('button', { name: 'Upgrade to Pro' }).click()
await captureState(page, states, '23-subscription-upgrade-pro-modal', 'Upgrade opens purchase confirmation copy.')
await page.getByRole('button', { name: 'Close' }).click()
await page.getByRole('button', { name: 'Restore purchases' }).click()
await captureState(page, states, '23-subscription-restore-modal', 'Restore purchases opens restore confirmation copy.')
await page.getByRole('button', { name: 'Confirm' }).click()
await captureState(page, states, '23-subscription-restore-status', 'Restore action updates entitlement status copy.')
await page.getByRole('button', { name: 'Cancel subscription' }).click()
await captureState(page, states, '23-subscription-cancel-modal', 'Cancel subscription opens mobile-store handoff copy.')

await browser.close()

const result = {
  baseURL,
  capturedAt: new Date().toISOString(),
  consoleErrors: [...new Set(consoleErrors)],
  states,
}

fs.writeFileSync(path.join(outputDir, 'r08-state-capture.json'), JSON.stringify(result, null, 2))
console.log(`R08 state evidence saved to ${outputDir}`)
if (consoleErrors.length) {
  console.error([...new Set(consoleErrors)].join('\n'))
  process.exitCode = 1
}
