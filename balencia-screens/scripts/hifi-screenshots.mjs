#!/usr/bin/env node
// Capture phone-frame screenshots of hi-fi screens for build evidence.
// Usage: node scripts/hifi-screenshots.mjs --ids 09,12,13 --out <dir> [--base http://localhost:3001]
import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

const args = process.argv.slice(2)
const getArg = name => {
  const index = args.indexOf(`--${name}`)
  return index === -1 ? undefined : args[index + 1]
}

const ids = (getArg('ids') || '').split(',').map(id => id.trim()).filter(Boolean)
const outDir = getArg('out')
const base = getArg('base') || 'http://localhost:3001'

if (!ids.length || !outDir) {
  console.error('usage: hifi-screenshots.mjs --ids 09,12 --out <dir> [--base url]')
  process.exit(1)
}

fs.mkdirSync(outDir, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 640, height: 1000 }, deviceScaleFactor: 2 })
const consoleErrors = []
page.on('console', message => {
  if (message.type() === 'error') consoleErrors.push(`[${message.type()}] ${message.text()}`)
})
page.on('pageerror', error => consoleErrors.push(`[pageerror] ${error.message}`))

let failures = 0
for (const id of ids) {
  const url = `${base}/screens/${id}`
  consoleErrors.length = 0
  try {
    const response = await page.goto(url, { waitUntil: 'networkidle', timeout
: 20000 })
    if (!response || !response.ok()) throw new Error(`HTTP ${response?.status()}`)
    const frame = page.locator('[data-testid="phone-frame"]')
    await frame.waitFor({ state: 'visible', timeout: 10000 })
    await page.waitForTimeout(400)
    await frame.screenshot({ path: path.join(outDir, `${id}.png`) })
    const errorNote = consoleErrors.length ? ` console-errors=${consoleErrors.length}` : ''
    console.log(`ok ${id}${errorNote}`)
    if (consoleErrors.length) consoleErrors.forEach(line => console.log(`   ${line}`))
  } catch (error) {
    failures += 1
    console.error(`FAIL ${id}: ${error.message}`)
  }
}

await browser.close()
process.exit(failures ? 1 : 0)
