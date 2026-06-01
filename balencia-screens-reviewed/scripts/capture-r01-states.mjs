import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

const repoRoot = path.resolve(process.cwd(), '..')
const appRoot = path.join(repoRoot, 'balencia-screens')
const appRequire = createRequire(path.join(appRoot, 'package.json'))
const { chromium } = appRequire('playwright')

const baseURL = process.env.A_PLUS_PLUS_BASE_URL || 'http://localhost:3000'
const outputDir = path.join(appRoot, 'output/a-plus-plus-review/R01/states')
fs.mkdirSync(outputDir, { recursive: true })

async function launchBrowser() {
  const chromePath = process.env.PLAYWRIGHT_CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  if (fs.existsSync(chromePath)) {
    return chromium.launch({ executablePath: chromePath })
  }
  return chromium.launch()
}

async function phoneShot(page, name) {
  await page.locator('[data-testid="phone-frame"]').screenshot({
    path: path.join(outputDir, `${name}.png`),
  })
}

const browser = await launchBrowser()
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
const consoleErrors = []
page.on('console', (message) => {
  if (message.type() === 'error') consoleErrors.push(message.text())
})
page.on('pageerror', (error) => consoleErrors.push(error.message))

await page.goto(new URL('/auth/carousel', baseURL).toString(), { waitUntil: 'networkidle' })
await page.getByRole('button', { name: 'Next carousel panel' }).click()
await page.getByRole('button', { name: 'Next carousel panel' }).click()
await page.getByRole('button', { name: 'Next carousel panel' }).click()
await page.waitForTimeout(300)
await phoneShot(page, '02-carousel-final-panel')

await page.goto(new URL('/auth/sign-up', baseURL).toString(), { waitUntil: 'networkidle' })
await page.getByPlaceholder('Email address').fill('qa@balencia.app')
await page.getByPlaceholder('Password').fill('strongpass1')
await page.waitForTimeout(300)
await phoneShot(page, '03-sign-up-valid')
await page.getByRole('button', { name: 'Sign up' }).click()
await page.waitForURL('**/auth/otp')
await page.waitForTimeout(300)
await phoneShot(page, '03-sign-up-submit-to-otp')

await page.getByLabel('Digit 1 of 4').fill('1')
await page.getByLabel('Digit 2 of 4').fill('2')
await page.getByLabel('Digit 3 of 4').fill('3')
await page.getByLabel('Digit 4 of 4').fill('4')
await page.waitForTimeout(300)
await phoneShot(page, '03b-otp-complete')
await page.getByRole('button', { name: 'Verify' }).click()
await page.waitForURL('**/auth/consent')
await page.waitForTimeout(500)
await phoneShot(page, '03b-otp-submit-to-consent')

await page.getByLabel('I accept the Terms of service').check({ force: true })
await page.getByLabel('I accept the Privacy policy').check({ force: true })
await page.waitForTimeout(300)
await phoneShot(page, '03c-consent-accepted')
await page.getByRole('button', { name: 'Continue' }).click()
await page.waitForURL('**/auth/whatsapp')
await page.waitForTimeout(300)
await phoneShot(page, '03c-consent-continue-to-whatsapp')

await browser.close()

fs.writeFileSync(path.join(outputDir, 'r01-state-capture.json'), JSON.stringify({
  baseURL,
  capturedAt: new Date().toISOString(),
  consoleErrors: [...new Set(consoleErrors)],
  screenshots: fs.readdirSync(outputDir).filter((file) => file.endsWith('.png')).sort(),
}, null, 2))

console.log(`R01 state evidence saved to ${outputDir}`)
if (consoleErrors.length) {
  console.error([...new Set(consoleErrors)].join('\n'))
  process.exitCode = 1
}
