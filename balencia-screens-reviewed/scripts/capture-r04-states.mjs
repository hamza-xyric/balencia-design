import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

const repoRoot = path.resolve(process.cwd(), '..')
const appRoot = path.join(repoRoot, 'balencia-screens')
const appRequire = createRequire(path.join(appRoot, 'package.json'))
const { chromium } = appRequire('playwright')

const baseURL = process.env.A_PLUS_PLUS_BASE_URL || process.env.VISUAL_AUDIT_BASE_URL || 'http://localhost:3000'
const outputDir = path.join(appRoot, 'output/a-plus-plus-review/R04')
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

async function statusText(page) {
  return page.locator('[role="status"]').evaluateAll((elements) => elements.map((element) => element.textContent?.trim()).filter(Boolean))
}

async function collectControls(page) {
  return page.evaluate(() => {
    const phone = document.querySelector('[data-testid="phone-frame"]')
    return [...document.querySelectorAll('a,button,input,textarea,select,[role="button"],[role="link"],[role="switch"],[role="tab"],[role="slider"],[role="checkbox"]')]
      .filter((element) => !phone || phone.contains(element))
      .filter((element) => {
        const rect = element.getBoundingClientRect()
        const style = window.getComputedStyle(element)
        return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none' && Number(style.opacity) !== 0
      })
      .map((element) => {
        const rect = element.getBoundingClientRect()
        return {
          label: (element.getAttribute('aria-label') || element.getAttribute('placeholder') || element.textContent || element.tagName).trim().replace(/\s+/g, ' ').slice(0, 140),
          tag: element.tagName.toLowerCase(),
          role: element.getAttribute('role') || '',
          disabled: Boolean(element.disabled || element.getAttribute('aria-disabled') === 'true'),
          href: element.getAttribute('href') || '',
          ariaPressed: element.getAttribute('aria-pressed') || '',
          ariaExpanded: element.getAttribute('aria-expanded') || '',
          value: 'value' in element ? element.value : '',
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          top: Math.round(rect.top),
          bottom: Math.round(rect.bottom),
        }
      })
  })
}

async function recordStep(page, steps, label, screenshotName, extra = {}) {
  steps.push({
    label,
    url: page.url(),
    screenshot: await capturePhone(page, screenshotName),
    text: (await phoneText(page)).replace(/\s+/g, ' ').slice(0, 1200),
    status: await statusText(page),
    controls: await collectControls(page),
    ...extra,
  })
}

async function setRange(page, label, value) {
  await page.locator(`input[aria-label="${label}"]`).evaluate((element, nextValue) => {
    element.value = String(nextValue)
    element.dispatchEvent(new Event('input', { bubbles: true }))
    element.dispatchEvent(new Event('change', { bubbles: true }))
  }, value)
}

async function collectRouteMetrics(page, route) {
  await page.goto(resolveURL(route), { waitUntil: 'networkidle' })
  const controls = await collectControls(page)
  return {
    controls,
    smallTargets: controls.filter((control) => !control.disabled && (control.width < 44 || control.height < 44)),
    disabledControls: controls.filter((control) => control.disabled),
  }
}

async function run() {
  const browser = await launchBrowser()
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
  const consoleMessages = []
  const steps = []

  page.on('console', (message) => {
    if (['error', 'warning'].includes(message.type())) {
      consoleMessages.push({ type: message.type(), text: message.text(), url: page.url() })
    }
  })
  page.on('pageerror', (error) => {
    consoleMessages.push({ type: 'pageerror', text: error.message, url: page.url() })
  })

  await page.goto(resolveURL('/tabs/today/water-intake'), { waitUntil: 'networkidle' })
  await recordStep(page, steps, '44 initial water intake', '44-r04-water-initial.png')
  await page.getByRole('button', { name: 'Add 1 glass' }).click()
  await page.waitForTimeout(300)
  await recordStep(page, steps, '44 add 1 glass updates progress and log', '44-r04-water-add-one.png')
  await page.getByRole('button', { name: 'Delete water entry at Now' }).click()
  await page.waitForTimeout(250)
  await recordStep(page, steps, '44 delete new entry exposes undo', '44-r04-water-delete-new.png')
  await page.getByRole('button', { name: 'Undo' }).click()
  await page.waitForTimeout(250)
  await recordStep(page, steps, '44 undo restores deleted entry', '44-r04-water-undo.png')
  await page.getByRole('button', { name: 'Add custom ml' }).click()
  await page.waitForTimeout(200)
  await recordStep(page, steps, '44 custom amount dialog opens', '44-r04-water-custom-dialog.png')
  await page.locator('#custom-water').fill('375')
  await page.getByRole('button', { name: 'Log water' }).click()
  await page.waitForTimeout(300)
  await recordStep(page, steps, '44 custom 375 ml logs and reaches target', '44-r04-water-custom-logged.png')
  await page.getByRole('button', { name: 'Open water target settings' }).click()
  await page.waitForTimeout(200)
  await recordStep(page, steps, '44 target settings dialog opens', '44-r04-water-target-settings.png')

  await page.goto(resolveURL('/tabs/today/daily-checkin'), { waitUntil: 'networkidle' })
  await recordStep(page, steps, '45 initial check-in disabled submit', '45-r04-checkin-initial.png')
  await page.getByRole('button', { name: 'Save' }).click()
  await page.waitForTimeout(200)
  await recordStep(page, steps, '45 save empty draft status', '45-r04-checkin-save-empty.png')
  await page.getByRole('button', { name: 'Happy mood' }).click()
  await setRange(page, 'Energy level', 8)
  await setRange(page, 'Stress level', 3)
  await page.getByLabel('Daily intention').fill('Protect deep work before meetings')
  await page.getByRole('button', { name: 'Add a note' }).click()
  await page.getByLabel('Optional check-in note').fill('Felt calm after fajr and want to keep the morning quiet.')
  await page.getByRole('button', { name: 'Excited' }).click()
  await page.waitForTimeout(250)
  await recordStep(page, steps, '45 filled check-in ready to submit', '45-r04-checkin-filled-ready.png')
  await page.getByRole('button', { name: 'check in' }).click()
  await page.waitForTimeout(1100)
  await recordStep(page, steps, '45 submit routes back to Today', '45-r04-checkin-after-submit.png')

  await page.goto(resolveURL('/tabs/sia'), { waitUntil: 'networkidle' })
  await recordStep(page, steps, '09 initial SIA chat', '09-r04-sia-initial.png')
  await page.getByLabel('Message SIA').fill('Help me plan protein after my run')
  await page.getByRole('button', { name: 'Send message' }).click()
  await page.waitForTimeout(900)
  await recordStep(page, steps, '09 text send shows response', '09-r04-sia-text-send.png')
  await page.getByRole('button', { name: 'Show my missions' }).click()
  await page.waitForTimeout(900)
  await recordStep(page, steps, '09 suggestion chip sends message', '09-r04-sia-suggestion-send.png')
  await page.getByRole('button', { name: 'Voice input. Tap for in-chat voice.' }).click()
  await page.waitForTimeout(250)
  await recordStep(page, steps, '09 inline voice permission from chat', '09-r04-sia-voice-permission.png')
  await page.getByRole('button', { name: 'Allow' }).click()
  await page.waitForTimeout(1150)
  await recordStep(page, steps, '09 inline voice transcript ready from chat', '09-r04-sia-voice-ready.png')
  await page.getByRole('button', { name: 'Send voice message' }).click()
  await page.waitForTimeout(900)
  await recordStep(page, steps, '09 voice send returns to chat', '09-r04-sia-voice-sent.png')

  await page.goto(resolveURL('/tabs/sia/voice-inline'), { waitUntil: 'networkidle' })
  await recordStep(page, steps, '10 direct inline voice permission', '10-r04-inline-permission.png')
  await page.getByRole('button', { name: 'Allow mic' }).click()
  await page.waitForTimeout(900)
  await recordStep(page, steps, '10 direct inline voice ready', '10-r04-inline-ready.png')
  await page.getByRole('button', { name: 'Send voice message' }).click()
  await page.waitForTimeout(450)
  await recordStep(page, steps, '10 direct inline send returns to SIA chat', '10-r04-inline-after-send.png')

  await page.goto(resolveURL('/tabs/sia/voice-fullscreen'), { waitUntil: 'networkidle' })
  await recordStep(page, steps, '11 full voice permission gate', '11-r04-full-permission.png')
  await page.getByRole('button', { name: 'Allow microphone' }).click()
  await page.waitForTimeout(250)
  await recordStep(page, steps, '11 full voice listening after permission', '11-r04-full-listening.png')
  await page.getByRole('button', { name: 'Mute microphone' }).click()
  await page.waitForTimeout(200)
  await recordStep(page, steps, '11 full voice muted state', '11-r04-full-muted.png')
  await page.getByRole('button', { name: 'Unmute microphone, currently muted' }).click()
  await page.waitForTimeout(200)
  await page.getByRole('button', { name: 'Advance voice session state' }).click()
  await page.waitForTimeout(1150)
  await recordStep(page, steps, '11 full voice speaking state', '11-r04-full-speaking.png')

  const metrics = {}
  for (const route of ['/tabs/today/water-intake', '/tabs/today/daily-checkin', '/tabs/sia', '/tabs/sia/voice-inline', '/tabs/sia/voice-fullscreen']) {
    metrics[route] = await collectRouteMetrics(page, route)
  }

  const result = {
    capturedAt: new Date().toISOString(),
    baseURL,
    outputDir,
    steps,
    consoleMessages,
    metrics,
  }

  const output = path.join(outputDir, 'r04-interaction-evidence.json')
  fs.writeFileSync(output, JSON.stringify(result, null, 2))
  await browser.close()
  console.log(`R04 interaction evidence written: ${output}`)
}

run().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
