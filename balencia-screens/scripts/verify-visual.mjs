import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright'

const baseURL = process.env.VISUAL_AUDIT_BASE_URL || 'http://localhost:3000'
const highRiskRoutes = [
  '/auth/splash',
  '/auth/sign-up',
  '/auth/sia-onboarding',
  '/tabs/today',
  '/tabs/sia',
  '/tabs/goals',
  '/tabs/me',
  '/domains/fitness',
  '/domains/nutrition',
  '/features/intelligence',
  '/features/force-update',
  '/features/celebration',
  '/tabs/sia/conversations',
  '/tabs/sia/direct',
  '/tabs/sia/group',
  '/tabs/sia/message-actions',
  '/features/reports',
  '/tabs/sia/call-summary',
  '/features/music',
  '/features/videos',
  '/features/accountability-contract',
  '/features/social-buddy',
  '/tabs/me/data-sources',
  '/tabs/goals/obstacles',
]
const bottomActionRoutes = [
  '/tabs/today/schedule',
  '/domains/fitness',
  '/domains/nutrition',
  '/domains/learning',
  '/domains/creativity',
  '/domains/finance',
  '/domains/relationships',
  '/features/habits',
  '/features/journal',
  '/features/stress',
  '/features/reminders',
  '/features/community',
  '/features/medication',
  '/features/recipes',
  '/features/sleep',
  '/features/energy',
  '/features/quick-notes',
  '/features/shopping-list',
  '/tabs/me/progress-photos',
]
const routes = [...new Set([...highRiskRoutes, ...bottomActionRoutes])]

const viewport = { width: 1440, height: 1000 }
const shouldCaptureScreenshots = process.argv.includes('--screenshots')
const screenshotDir = process.env.VISUAL_AUDIT_SCREENSHOT_DIR || '/private/tmp/balencia-qa'

function fail(message) {
  console.error(`verify:visual failed: ${message}`)
  process.exitCode = 1
}

async function launchBrowser() {
  const chromePath = process.env.PLAYWRIGHT_CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  if (fs.existsSync(chromePath)) {
    return chromium.launch({ executablePath: chromePath })
  }

  try {
    return await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome' })
  } catch (channelError) {
    if (process.env.PLAYWRIGHT_CHANNEL) throw channelError
    return chromium.launch()
  }
}

const browser = await launchBrowser()
const page = await browser.newPage({ viewport })

if (shouldCaptureScreenshots) {
  fs.mkdirSync(screenshotDir, { recursive: true })
}

for (const route of routes) {
  const url = new URL(route, baseURL).toString()
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 })
    await page.waitForTimeout(300)
  } catch (error) {
    fail(`${route} did not load: ${error.message}`)
    continue
  }

  const result = await page.evaluate(() => {
    const overlapPadding = 4
    const selectors = {
      phone: '[data-testid="phone-frame"]',
      dynamicIsland: '[data-testid="dynamic-island"]',
      tabBar: '[data-testid="tab-bar"]',
      composer: '[data-testid="screen-composer"]',
      bottomAction: '[data-testid="screen-bottom-action"]',
      homeIndicator: '[data-testid="home-indicator"]',
    }

    function rectFor(element) {
      if (!element) return null
      const rect = element.getBoundingClientRect()
      if (rect.width <= 0 || rect.height <= 0) return null
      return {
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      }
    }

    function intersectRect(a, b) {
      const left = Math.max(a.left, b.left)
      const top = Math.max(a.top, b.top)
      const right = Math.min(a.right, b.right)
      const bottom = Math.min(a.bottom, b.bottom)
      if (right - left <= 1 || bottom - top <= 1) return null
      return { left, top, right, bottom, width: right - left, height: bottom - top }
    }

    function visibleRectFor(element) {
      let visibleRect = rectFor(element)
      if (!visibleRect) return null

      let ancestor = element.parentElement
      while (ancestor && ancestor !== document.documentElement) {
        const style = window.getComputedStyle(ancestor)
        const overflow = `${style.overflow} ${style.overflowX} ${style.overflowY}`
        if (/(auto|scroll|hidden|clip)/.test(overflow)) {
          const ancestorRect = rectFor(ancestor)
          if (ancestorRect) {
            visibleRect = intersectRect(visibleRect, ancestorRect)
            if (!visibleRect) return null
          }
        }
        ancestor = ancestor.parentElement
      }

      return intersectRect(visibleRect, {
        top: 0,
        right: window.innerWidth,
        bottom: window.innerHeight,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    function intersects(a, b) {
      return (
        a.left < b.right - overlapPadding &&
        a.right > b.left + overlapPadding &&
        a.top < b.bottom - overlapPadding &&
        a.bottom > b.top + overlapPadding
      )
    }

    function isVisible(element) {
      const style = window.getComputedStyle(element)
      if (style.visibility === 'hidden' || style.display === 'none' || Number(style.opacity) === 0) return false
      return Boolean(visibleRectFor(element))
    }

    function elementLabel(element) {
      const text = element.innerText || element.getAttribute('aria-label') || element.getAttribute('placeholder') || element.tagName
      return text.trim().replace(/\s+/g, ' ').slice(0, 80)
    }

    const phone = document.querySelector(selectors.phone)
    const phoneRect = rectFor(phone)
    const issues = []
    if (!phoneRect) return { issues: ['Missing phone-frame selector'] }

    const reserved = Object.entries(selectors)
      .filter(([name]) => name !== 'phone')
      .map(([name, selector]) => ({ name, element: document.querySelector(selector) }))
      .filter(zone => zone.element)
      .map(zone => ({ ...zone, rect: rectFor(zone.element) }))
      .filter(zone => zone.rect)

    const candidates = [...document.querySelectorAll('a, button, input, textarea, select, h1, h2, h3, p, span, [role="button"], [data-visual-audit]')]
      .filter(element => phone.contains(element))
      .filter(isVisible)
      .filter(element => {
        if (element.closest('[data-visual-ignore]')) return false
        return !reserved.some(zone => zone.element.contains(element))
      })

    for (const element of candidates) {
      const rect = visibleRectFor(element)
      if (!rect) continue
      const label = elementLabel(element)

      if (rect.left < phoneRect.left - 1 || rect.right > phoneRect.right + 1 || rect.top < phoneRect.top - 1 || rect.bottom > phoneRect.bottom + 1) {
        issues.push(`${label || element.tagName} escapes phone-frame bounds`)
      }

      for (const zone of reserved) {
        if (intersects(rect, zone.rect)) {
          issues.push(`${label || element.tagName} overlaps ${zone.name}`)
        }
      }
    }

    return { issues: [...new Set(issues)] }
  })

  for (const issue of result.issues) {
    fail(`${route}: ${issue}`)
  }

  if (shouldCaptureScreenshots) {
    const slug = route.replace(/^\//, '').replace(/\//g, '-') || 'index'
    await page.screenshot({ path: path.join(screenshotDir, `${slug}-desktop.png`) })
    await page.locator('[data-testid="phone-frame"]').screenshot({
      path: path.join(screenshotDir, `${slug}-phone.png`),
    })
  }
}

await browser.close()

if (!process.exitCode) {
  console.log(`verify:visual passed (${routes.length} routes audited)`)
  if (shouldCaptureScreenshots) {
    console.log(`verify:visual screenshots saved to ${screenshotDir}`)
  }
}
