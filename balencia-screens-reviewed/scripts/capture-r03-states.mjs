import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

const repoRoot = path.resolve(process.cwd(), '..')
const appRoot = path.join(repoRoot, 'balencia-screens')
const appRequire = createRequire(path.join(appRoot, 'package.json'))
const { chromium } = appRequire('playwright')

const baseURL = process.env.A_PLUS_PLUS_BASE_URL || process.env.VISUAL_AUDIT_BASE_URL || 'http://localhost:3000'
const outputDir = path.join(appRoot, 'output/a-plus-plus-review/R03')
const chromePath = process.env.PLAYWRIGHT_CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

fs.mkdirSync(outputDir, { recursive: true })

function resolveURL(route) {
  return new URL(route, baseURL).toString()
}

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

async function capturePhone(page, name) {
  const screenshot = path.join(outputDir, name)
  await page.locator('[data-testid="phone-frame"]').screenshot({ path: screenshot })
  return screenshot
}

async function phoneText(page) {
  return page.locator('[data-testid="phone-frame"]').innerText({ timeout: 5000 })
}

async function recordStep(page, steps, label, extra = {}) {
  steps.push({
    label,
    url: page.url(),
    text: (await phoneText(page)).replace(/\s+/g, ' ').slice(0, 900),
    ...extra,
  })
}

async function clickByRole(page, role, name) {
  const locator = page.getByRole(role, { name })
  await locator.waitFor({ state: 'visible', timeout: 5000 })
  await locator.click()
}

async function clickUniqueByLabel(page, label) {
  const locator = page.getByLabel(label, { exact: true })
  await locator.waitFor({ state: 'visible', timeout: 5000 })
  await locator.click()
}

async function clickByText(page, text) {
  const locator = page.getByText(text, { exact: true })
  await locator.waitFor({ state: 'visible', timeout: 5000 })
  await locator.click()
}

async function clickAtElementCenter(page, selector) {
  return page.locator(selector).evaluate((element) => {
    const rect = element.getBoundingClientRect()
    const target = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2)
    target?.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2 }))
    return {
      targetTag: target?.tagName || '',
      targetText: target?.textContent?.trim().replace(/\s+/g, ' ').slice(0, 140) || '',
    }
  })
}

async function collectMetrics(page) {
  return page.evaluate(() => {
    const phone = document.querySelector('[data-testid="phone-frame"]')
    const controls = [...document.querySelectorAll('a,button,input,textarea,select,[role="button"],[role="link"],[role="switch"],[role="tab"],[role="slider"],[role="checkbox"]')]
      .filter((element) => !phone || phone.contains(element))
      .filter((element) => {
        const rect = element.getBoundingClientRect()
        const style = window.getComputedStyle(element)
        return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none' && Number(style.opacity) !== 0
      })
      .map((element) => {
        const rect = element.getBoundingClientRect()
        return {
          label: (element.getAttribute('aria-label') || element.getAttribute('placeholder') || element.textContent || element.tagName).trim().replace(/\s+/g, ' ').slice(0, 120),
          tag: element.tagName.toLowerCase(),
          role: element.getAttribute('role') || '',
          disabled: Boolean(element.disabled || element.getAttribute('aria-disabled') === 'true'),
          href: element.getAttribute('href') || '',
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        }
      })

    return {
      controls,
      smallTargets: controls.filter((control) => !control.disabled && (control.width < 44 || control.height < 44)),
      nestedControls: [...document.querySelectorAll('a a, a button, button a, button button, [role="button"] button, [role="button"] a')]
        .filter((element) => !phone || phone.contains(element))
        .map((element) => (element.getAttribute('aria-label') || element.textContent || element.tagName).trim().replace(/\s+/g, ' ').slice(0, 120)),
    }
  })
}

async function clickByLabel(page, label) {
  const locator = page.getByLabel(label, { exact: true })
  await locator.waitFor({ state: 'visible', timeout: 5000 })
  await locator.click()
}

async function continueRun() {
  const browser = await launchBrowser()
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
  const consoleMessages = []
  const steps = []
  const screenshots = {}

  page.on('console', (message) => {
    if (['error', 'warning'].includes(message.type())) {
      consoleMessages.push({ type: message.type(), text: message.text(), url: page.url(), source: message.location().url })
    }
  })
  page.on('pageerror', (error) => {
    consoleMessages.push({ type: 'pageerror', text: error.message, url: page.url() })
  })

  await page.goto(resolveURL('/auth/guest-preview'), { waitUntil: 'networkidle' })
  screenshots.guestInitial = await capturePhone(page, '06-r03-guest-initial.png')
  await page.getByLabel('Your name for the preview demo').fill('Amira')
  for (const area of ['Fitness', 'Finance', 'Wellbeing']) await clickByRole(page, 'button', area)
  await clickByRole(page, 'button', 'Learning')
  await recordStep(page, steps, 'guest max-selection validation', { screenshot: await capturePhone(page, '06-r03-guest-max-selection.png') })
  await clickByRole(page, 'button', 'Explore preview')
  await recordStep(page, steps, 'guest preview dialog opens', { screenshot: await capturePhone(page, '06-r03-guest-dialog.png') })
  await clickByText(page, 'Continue to demo Today')
  await page.waitForURL(resolveURL('/tabs/today'), { timeout: 5000 })
  await recordStep(page, steps, 'guest continue reaches Today demo', { screenshot: await capturePhone(page, '06-r03-guest-continue-today.png') })

  await page.goto(resolveURL('/auth/sia-onboarding'), { waitUntil: 'networkidle' })
  screenshots.siaInitial = await capturePhone(page, '07-r03-sia-initial.png')
  await clickByRole(page, 'button', 'Run a half marathon')
  await page.waitForTimeout(800)
  await recordStep(page, steps, 'SIA suggestion sends and follow-up appears', { screenshot: await capturePhone(page, '07-r03-sia-follow-up.png') })
  await page.getByLabel('Type a message to SIA').fill('I need structure before work.')
  await clickByRole(page, 'button', 'Send message')
  await page.waitForURL(resolveURL('/auth/initial-plan'), { timeout: 4000 })
  await recordStep(page, steps, 'SIA second answer routes to Initial plan', { screenshot: await capturePhone(page, '07-r03-sia-to-plan.png') })

  await page.goto(resolveURL('/auth/initial-plan'), { waitUntil: 'networkidle' })
  screenshots.initialPlan = await capturePhone(page, '08-r03-plan-initial.png')
  await clickByRole(page, 'button', 'Customize')
  await recordStep(page, steps, 'Initial plan customize panel opens', { screenshot: await capturePhone(page, '08-r03-plan-customize.png') })
  await clickByLabel(page, 'Edit Run a half marathon')
  await page.getByLabel('Mission title').fill('Run a confident half marathon')
  await clickByRole(page, 'button', 'Save change')
  await recordStep(page, steps, 'Initial plan mission edit saves', { screenshot: await capturePhone(page, '08-r03-plan-edit-saved.png') })
  await clickByRole(page, 'button', 'Start your journey')
  await page.waitForURL(resolveURL('/tabs/today'), { timeout: 5000 })
  await recordStep(page, steps, 'Initial plan starts journey to Today', { screenshot: await capturePhone(page, '08-r03-plan-start-today.png') })

  await page.goto(resolveURL('/tabs/today'), { waitUntil: 'networkidle' })
  screenshots.todayInitial = await capturePhone(page, '12-r03-today-initial.png')
  await clickByLabel(page, 'Select mood: Good')
  await recordStep(page, steps, 'Today mood capture feedback', { screenshot: await capturePhone(page, '12-r03-today-mood.png') })
  await page.getByRole('button', { name: /^Meditation Meditate 10 min/ }).click()
  await recordStep(page, steps, 'Today action card expands', { screenshot: await capturePhone(page, '12-r03-today-action-expanded.png') })
  await clickByLabel(page, 'Mark Meditate 10 min as complete')
  await recordStep(page, steps, 'Today action completion feedback', { screenshot: await capturePhone(page, '12-r03-today-action-complete.png') })
  await clickByLabel(page, 'Breathe, tap to open')
  await page.waitForURL(resolveURL('/features/breathing'), { timeout: 5000 })
  await recordStep(page, steps, 'Today quick action navigates to breathing', { screenshot: await capturePhone(page, '12-r03-today-breathe-route.png') })
  await page.goto(resolveURL('/tabs/today'), { waitUntil: 'networkidle' })
  await clickByLabel(page, 'sleep: 7.2 hrs')
  await page.waitForURL(resolveURL('/features/sleep'), { timeout: 5000 })
  await recordStep(page, steps, 'Today sleep metric navigates to sleep detail', { screenshot: await capturePhone(page, '12-r03-today-sleep-route.png') })
  await page.goto(resolveURL('/tabs/today'), { waitUntil: 'networkidle' })
  await clickByLabel(page, 'Open schedule item Meditate 15m')
  await page.waitForURL(resolveURL('/tabs/today/schedule'), { timeout: 5000 })
  await recordStep(page, steps, 'Today schedule row navigates to schedule', { screenshot: await capturePhone(page, '12-r03-today-schedule-route.png') })
  await page.goto(resolveURL('/tabs/today'), { waitUntil: 'networkidle' })
  const missionClick = await clickAtElementCenter(page, 'article[aria-label^=\"Run a half marathon\"]')
  await page.waitForTimeout(300)
  await recordStep(page, steps, 'Today pinned mission card click has no route change', { clickTarget: missionClick, screenshot: await capturePhone(page, '12-r03-today-mission-noop.png') })
  await page.locator('[data-testid=\"screen-content\"]').evaluate((element) => { element.scrollTop = element.scrollHeight })
  await page.waitForTimeout(300)
  const activityBefore = page.url()
  await clickByRole(page, 'button', 'View all')
  await page.waitForTimeout(300)
  await recordStep(page, steps, 'Today recent activity View all has no route change', { beforeUrl: activityBefore, screenshot: await capturePhone(page, '12-r03-today-activity-view-all-noop.png') })

  await page.goto(resolveURL('/tabs/today/schedule'), { waitUntil: 'networkidle' })
  screenshots.scheduleInitial = await capturePhone(page, '41-r03-schedule-initial.png')
  await clickByRole(page, 'tab', 'Week')
  await recordStep(page, steps, 'Schedule week view switches', { screenshot: await capturePhone(page, '41-r03-schedule-week.png') })
  await clickByRole(page, 'tab', 'Month')
  await recordStep(page, steps, 'Schedule month view switches', { screenshot: await capturePhone(page, '41-r03-schedule-month.png') })
  await clickByLabel(page, 'Next month')
  await recordStep(page, steps, 'Schedule date navigator advances month', { screenshot: await capturePhone(page, '41-r03-schedule-next-month.png') })
  await clickByRole(page, 'tab', 'Day')
  await clickByLabel(page, 'Schedule task Read 20 min')
  await recordStep(page, steps, 'Schedule task placement feedback', { screenshot: await capturePhone(page, '41-r03-schedule-task-placed.png') })
  await clickByLabel(page, 'Add schedule item from header')
  await recordStep(page, steps, 'Schedule add modal opens with disabled create', { screenshot: await capturePhone(page, '41-r03-schedule-add-modal.png') })
  await page.getByLabel('Title').fill('Stretch break')
  await clickByRole(page, 'button', 'Create')
  await recordStep(page, steps, 'Schedule event create adds event', { screenshot: await capturePhone(page, '41-r03-schedule-event-created.png') })
  const eventBefore = page.url()
  await clickAtElementCenter(page, 'article:has-text(\"Morning run\")')
  await page.waitForTimeout(300)
  await recordStep(page, steps, 'Schedule event card click has no route change', { beforeUrl: eventBefore, screenshot: await capturePhone(page, '41-r03-schedule-event-noop.png') })
  await clickByLabel(page, 'Calendar synced 2 minutes ago. Open connected services')
  await page.waitForURL(resolveURL('/tabs/me/connected-services'), { timeout: 5000 })
  await recordStep(page, steps, 'Schedule sync control opens connected services', { screenshot: await capturePhone(page, '41-r03-schedule-sync-route.png') })

  const metrics = {}
  for (const route of ['/auth/guest-preview', '/auth/sia-onboarding', '/auth/initial-plan', '/tabs/today', '/tabs/today/schedule']) {
    await page.goto(resolveURL(route), { waitUntil: 'networkidle' })
    metrics[route] = await collectMetrics(page)
  }

  const result = {
    capturedAt: new Date().toISOString(),
    baseURL,
    screenshots,
    steps,
    consoleMessages,
    metrics,
  }

  const output = path.join(outputDir, 'r03-interaction-evidence.json')
  fs.writeFileSync(output, JSON.stringify(result, null, 2))
  await browser.close()
  console.log(`R03 interaction evidence written: ${output}`)
}

continueRun().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
