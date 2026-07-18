import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright'

const baseURL = process.argv[2] || 'http://localhost:3001'
const outputDirectory = path.resolve(process.argv[3] || '../Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/pilot/states')
const afterDirectory = path.resolve(process.argv[4] || '../Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/pilot/after')
const chromePath = process.env.PLAYWRIGHT_CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

fs.mkdirSync(outputDirectory, { recursive: true })
fs.mkdirSync(afterDirectory, { recursive: true })

const browser = await chromium.launch(fs.existsSync(chromePath) ? { executablePath: chromePath } : {})
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' })
const page = await context.newPage()

async function open(id) {
  await page.goto(`${baseURL}/screens/${id}`, { waitUntil: 'networkidle' })
}

const captures = []

async function capture(name, directory = outputDirectory, locator = page.locator('[data-testid="screen-shell"]')) {
  await page.bringToFront()
  await locator.evaluate(async node => {
    node.setAttribute('data-capture-repaint', 'true')
    node.style.transform = 'translateZ(0)'
    node.style.filter = 'brightness(0.9999)'
    void node.getBoundingClientRect()
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  })
  await locator.screenshot({ animations: 'disabled', scale: 'css' })
  await page.waitForTimeout(80)
  await locator.screenshot({ path: path.join(directory, `${name}.png`), animations: 'disabled', scale: 'css' })
  await locator.evaluate(node => {
    node.removeAttribute('data-capture-repaint')
    node.style.removeProperty('transform')
    node.style.removeProperty('filter')
  })
  captures.push(path.relative(process.cwd(), path.join(directory, `${name}.png`)))
}

await open('03')
await page.getByLabel('Email address').focus()
await capture('03-input-focus')

await open('03')
await page.getByRole('button', { name: 'Sign up' }).click()
await page.waitForFunction(() => document.querySelector('form[data-form-state]')?.getAttribute('data-form-state') === 'loading')
await capture('03-loading')
await page.waitForFunction(() => document.querySelector('form[data-form-state]')?.getAttribute('data-form-state') === 'error')
await capture('03-error')

await open('07')
await page.locator('button[aria-describedby="onboarding-voice-disclosure"]').click()
await capture('07-listening')

await open('07')
await page.getByRole('textbox', { name: 'Message CIA' }).focus()
await capture('07-input-focus')

await open('07')
await page.getByRole('textbox', { name: 'Message CIA' }).fill('Show me a steadier week')
await page.getByRole('button', { name: 'Send message' }).click()
await page.getByText('Show me a steadier week', { exact: true }).scrollIntoViewIfNeeded()
await capture('07-composer-sent')

await open('07')
await page.getByRole('button', { name: 'Fitness' }).click()
await page.getByText('Focus areas selected: Fitness.', { exact: true }).scrollIntoViewIfNeeded()
await capture('07-focus-area')

await open('11')
await page.locator('button[aria-describedby="voice-retention-disclosure"]').click()
await capture('11-listening')

await open('11')
await page.getByRole('button', { name: 'Switch to keyboard' }).click()
await page.getByLabel('Message CIA').focus()
await capture('11-keyboard-focus')

await open('12')
await page.getByText('Today momentum').scrollIntoViewIfNeeded()
await capture('12-operations')

await open('12')
await page.getByRole('link', { name: 'Quick log' }).click()
await page.getByRole('dialog', { name: 'Quick log' }).waitFor()
await capture('12-quick-log', afterDirectory)

await open('26')
await page.locator('img[alt^="Three-stage workout preparation"]').scrollIntoViewIfNeeded()
await capture('26-media')

await open('43')
await page.getByText('$20', { exact: true }).scrollIntoViewIfNeeded()
await capture('43-price-exits')

await open('43')
const upgradeButton = page.getByRole('button', { name: 'Upgrade to Plus' })
await upgradeButton.hover()
const upgradeBox = await upgradeButton.boundingBox()
if (!upgradeBox) throw new Error('Upgrade to Plus button is not rendered')
await page.mouse.move(upgradeBox.x + upgradeBox.width / 2, upgradeBox.y + upgradeBox.height / 2)
await page.mouse.down()
await capture('43-cta-pressed')
await page.mouse.up()

await open('80')
await page.getByText('Listening data').scrollIntoViewIfNeeded()
await capture('80-privacy')

await page.getByRole('button', { name: 'Manage Spotify connection and permissions' }).scrollIntoViewIfNeeded()
await capture('80-provider-cta')

await open('45')
await page.getByRole('slider', { name: 'Energy' }).focus()
await capture('45-slider-focus')

await open('98')
await capture('98-states', afterDirectory, page.locator('[data-testid="cia-state-grid"]'))
await capture('98-icons', afterDirectory, page.locator('[data-testid="signature-icon-grid"]'))

await browser.close()
console.log(JSON.stringify({ baseURL, reducedMotion: 'reduce', outputDirectory, afterDirectory, captures, status: 'pass' }, null, 2))
