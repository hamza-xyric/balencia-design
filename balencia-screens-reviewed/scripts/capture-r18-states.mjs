import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

const cwd = process.cwd()
const repoRoot = path.basename(cwd) === 'balencia-screens-reviewed' ? path.resolve(cwd, '..') : cwd
const appRoot = path.join(repoRoot, 'balencia-screens')
const appRequire = createRequire(path.join(appRoot, 'package.json'))
const { chromium } = appRequire('playwright')

const baseURL = process.env.A_PLUS_PLUS_BASE_URL || 'http://localhost:3000'
const outputDir = path.join(appRoot, 'output/a-plus-plus-review/R18/states')
fs.mkdirSync(outputDir, { recursive: true })

const screenshots = []
const interactions = []
let activeConsole = []
const allConsole = []

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

function cleanText(text, limit = 1800) {
  return (text || '').trim().replace(/\s+/g, ' ').slice(0, limit)
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
    const bottomAction = scope.querySelector('[data-testid="screen-bottom-action"]')?.getBoundingClientRect()
    const tabBar = scope.querySelector('[data-testid="tab-bar"]')?.getBoundingClientRect()
    const homeIndicator = scope.querySelector('[data-testid="home-indicator"]')?.getBoundingClientRect()
    const candidates = [...scope.querySelectorAll('a, button, input, textarea, select, [role="button"], [role="link"], [role="switch"], [role="tab"], [role="checkbox"], [role="progressbar"]')]

    function labelFor(element) {
      return (
        element.getAttribute('aria-label') ||
        element.getAttribute('placeholder') ||
        element.textContent ||
        element.tagName
      ).trim().replace(/\s+/g, ' ').slice(0, 160)
    }

    function compactText(text, limit = 200) {
      return (text || '').trim().replace(/\s+/g, ' ').slice(0, limit)
    }

    function isVisible(element) {
      const rect = element.getBoundingClientRect()
      const style = window.getComputedStyle(element)
      return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden'
    }

    function effectiveTouchRect(element) {
      if (element.tagName === 'INPUT' && element.closest('label')) {
        return element.closest('label').getBoundingClientRect()
      }
      return element.getBoundingClientRect()
    }

    function overlaps(a, b) {
      if (!a || !b) return false
      return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top
    }

    const controls = candidates
      .filter(isVisible)
      .map((element) => {
        const rect = element.getBoundingClientRect()
        const effectiveRect = effectiveTouchRect(element)
        const role = element.getAttribute('role') || ''
        const interactive = role !== 'progressbar'
        return {
          label: labelFor(element),
          tag: element.tagName.toLowerCase(),
          role,
          disabled: Boolean(element.disabled || element.getAttribute('aria-disabled') === 'true'),
          checked: element.checked ?? null,
          ariaChecked: element.getAttribute('aria-checked') || '',
          pressed: element.getAttribute('aria-pressed') || '',
          expanded: element.getAttribute('aria-expanded') || '',
          href: element.getAttribute('href') || '',
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          effectiveWidth: Math.round(effectiveRect.width),
          effectiveHeight: Math.round(effectiveRect.height),
          smallTouchTarget: interactive && !element.disabled && (effectiveRect.width < 44 || effectiveRect.height < 44),
          overlapsBottomAction: overlaps(rect, bottomAction),
          overlapsTabBar: overlaps(rect, tabBar),
          overlapsHomeIndicator: overlaps(rect, homeIndicator),
        }
      })

    const active = document.activeElement
    const activeElement = active ? {
      tag: active.tagName.toLowerCase(),
      label: labelFor(active),
      value: active.value ?? '',
    } : null

    return {
      url: window.location.href,
      text: (scope.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 2200),
      dialogs: scope.querySelectorAll('[role="dialog"]').length,
      checkboxes: [...scope.querySelectorAll('input[type="checkbox"]')].map((input) => ({
        label: compactText(input.closest('label')?.innerText || input.getAttribute('aria-label') || '', 200),
        checked: input.checked,
        effectiveHeight: Math.round(effectiveTouchRect(input).height),
      })),
      activeElement,
      smallTouchTargets: controls.filter((control) => control.smallTouchTarget).map((control) => `${control.label} (${control.effectiveWidth}x${control.effectiveHeight})`),
      overlapCandidates: controls
        .filter((control) => control.overlapsBottomAction || control.overlapsTabBar || control.overlapsHomeIndicator)
        .map((control) => `${control.label}${control.overlapsBottomAction ? ' overlaps bottom action' : ''}${control.overlapsTabBar ? ' overlaps tab bar' : ''}${control.overlapsHomeIndicator ? ' overlaps home indicator' : ''}`),
      controls,
    }
  })
}

async function record(page, screen, label, extra = {}) {
  interactions.push({
    screen,
    label,
    ...(await readPhoneState(page)),
    consoleErrors: [...new Set(activeConsole)],
    ...extra,
  })
}

async function capture(page, screen, name, label, extra = {}) {
  if (extra.scrollToBottom) {
    await page.locator('[data-testid="screen-content"]').evaluate((element) => { element.scrollTop = element.scrollHeight })
    await page.waitForTimeout(250)
  }
  await phoneShot(page, name)
  const { scrollToBottom, ...recordExtra } = extra
  await record(page, screen, label, {
    screenshot: path.join(outputDir, `${name}.png`),
    ...recordExtra,
  })
}

async function gotoRoute(page, route, screen, label) {
  activeConsole = []
  await page.goto(urlFor(route), { waitUntil: 'networkidle', timeout: 25000 })
  await page.waitForTimeout(350)
  await record(page, screen, label)
}

async function clickRole(page, role, name) {
  await page.getByRole(role, { name, exact: true }).click()
  await page.waitForTimeout(300)
}

async function clickButtonContaining(page, text) {
  await page.locator('button').filter({ hasText: text }).click()
  await page.waitForTimeout(300)
}

async function fillLabel(page, label, value) {
  await page.getByLabel(label, { exact: true }).fill(value)
  await page.waitForTimeout(200)
}

const browser = await launchBrowser()
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })

page.on('console', (message) => {
  if (message.type() === 'error') {
    activeConsole.push(message.text())
    allConsole.push(message.text())
  }
})
page.on('pageerror', (error) => {
  activeConsole.push(error.message)
  allConsole.push(error.message)
})

// 78 - Reports center
await gotoRoute(page, '/features/reports', '78 Reports center', 'initial route state')
await capture(page, '78 Reports center', '78-reports-initial', 'initial route screenshot')
await clickRole(page, 'button', 'Weekly life report Fitness, sleep, nutrition, finance Ready')
await capture(page, '78 Reports center', '78-reports-weekly-preview', 'report card opens in-app preview', { scrollToBottom: true })
await clickRole(page, 'button', 'Review data')
await capture(page, '78 Reports center', '78-reports-review-data', 'Review data opens included-data controls', { scrollToBottom: true })
await page.getByLabel('Private notes and journal excerpts', { exact: true }).check()
await capture(page, '78 Reports center', '78-reports-private-notes-selected', 'Private notes checkbox can be explicitly selected', { scrollToBottom: true })
await gotoRoute(page, '/features/reports', '78 Reports center', 'reset before screenshot guidance')
await clickRole(page, 'button', 'Screenshot')
await capture(page, '78 Reports center', '78-reports-screenshot-guidance', 'Screenshot action explains screenshot-only V1 sharing', { scrollToBottom: true })

// 80 - Music coach
await gotoRoute(page, '/features/music', '80 Music coach', 'initial route state')
await capture(page, '80 Music coach', '80-music-initial', 'initial route screenshot')
await clickRole(page, 'button', 'Pause')
await capture(page, '80 Music coach', '80-music-paused', 'Pause toggles player to Play state')
await clickRole(page, 'button', 'Next track')
await capture(page, '80 Music coach', '80-music-next-track', 'Next track advances now-playing playlist')
await clickRole(page, 'button', 'SIA matched')
await capture(page, '80 Music coach', '80-music-sia-rationale', 'SIA matched opens rationale panel', { scrollToBottom: true })
await gotoRoute(page, '/features/music', '80 Music coach', 'reset before provider flow')
await clickRole(page, 'button', 'Connect Spotify')
await page.waitForTimeout(650)
await capture(page, '80 Music coach', '80-music-spotify-connected', 'Connect Spotify enters connected provider state', { scrollToBottom: true })
await clickRole(page, 'button', 'Manage Spotify')
await capture(page, '80 Music coach', '80-music-manage-spotify', 'Manage Spotify opens provider management panel', { scrollToBottom: true })
await clickRole(page, 'button', 'Simulate expired token')
await capture(page, '80 Music coach', '80-music-expired-token', 'Expired token state is visible', { scrollToBottom: true })
await clickRole(page, 'button', 'Connect Spotify')
await page.waitForTimeout(650)
await clickRole(page, 'button', 'Manage Spotify')
await clickRole(page, 'button', 'Disconnect')
await capture(page, '80 Music coach', '80-music-disconnected', 'Disconnect returns provider to ready state', { scrollToBottom: true })

// 81 - Video library
await gotoRoute(page, '/features/videos', '81 Video library', 'initial route state')
await capture(page, '81 Video library', '81-videos-initial', 'initial route screenshot')
await fillLabel(page, 'Search coaching videos', 'focus')
await capture(page, '81 Video library', '81-videos-search-focus', 'Search filters in-app video results')
await fillLabel(page, 'Search coaching videos', 'zzzz')
await capture(page, '81 Video library', '81-videos-no-results', 'Search shows no-results state')
await clickRole(page, 'button', 'Clear video search')
await clickRole(page, 'button', 'Play featured video')
await capture(page, '81 Video library', '81-videos-player-modal', 'Featured play opens player dialog', { scrollToBottom: true })
await clickRole(page, 'button', 'Close video player')
await clickRole(page, 'button', 'Post-run stretch Protects tomorrow recovery score 8:45')
await capture(page, '81 Video library', '81-videos-row-player', 'Video row opens player dialog', { scrollToBottom: true })
await clickRole(page, 'button', 'Close video player')
await fillLabel(page, 'Search coaching videos', 'hip')
await clickRole(page, 'button', 'Search YouTube')
await capture(page, '81 Video library', '81-videos-youtube-handoff', 'YouTube handoff confirms outgoing query and privacy strip', { scrollToBottom: true })
await clickRole(page, 'button', 'Cancel')
await capture(page, '81 Video library', '81-videos-handoff-cancelled', 'Cancel closes YouTube handoff', { scrollToBottom: true })

// 82 - Accountability contract
await gotoRoute(page, '/features/accountability-contract', '82 Accountability contract', 'initial route state')
await capture(page, '82 Accountability contract', '82-contract-initial', 'initial route screenshot', {
  primaryDisabled: await page.getByRole('button', { name: 'No update to sign', exact: true }).isDisabled(),
})
await clickRole(page, 'button', 'Edit')
await capture(page, '82 Accountability contract', '82-contract-pending-update', 'Edit creates pending update and enables signing', {
  primaryEnabled: await page.getByRole('button', { name: 'Review and sign', exact: true }).isEnabled(),
})
await clickRole(page, 'button', 'Review and sign')
await capture(page, '82 Accountability contract', '82-contract-review-sign', 'Review and sign opens terms review', { scrollToBottom: true })
await clickRole(page, 'button', 'Sign update')
await capture(page, '82 Accountability contract', '82-contract-signed', 'Signing records audit-trail success state', { scrollToBottom: true })
await gotoRoute(page, '/features/accountability-contract', '82 Accountability contract', 'reset before secondary actions')
await clickRole(page, 'button', 'Morning run proof Photo or wearable sync')
await capture(page, '82 Accountability contract', '82-contract-proof-detail', 'Verification check opens proof detail', { scrollToBottom: true })
await gotoRoute(page, '/features/accountability-contract', '82 Accountability contract', 'reset before partners')
await clickRole(page, 'button', 'Partners Aisha and Omar can see opted-in terms, proof, and check status. SIA reads this contract only with consent.')
await capture(page, '82 Accountability contract', '82-contract-partner-permissions', 'Partners opens visibility explanation', { scrollToBottom: true })
await gotoRoute(page, '/features/accountability-contract', '82 Accountability contract', 'reset before audit trail')
await clickRole(page, 'button', 'View audit trail')
await capture(page, '82 Accountability contract', '82-contract-audit-trail', 'Audit trail is reachable', { scrollToBottom: true })

// 83 - Social buddy profile
await gotoRoute(page, '/features/social-buddy', '83 Social buddy profile', 'initial route state')
await capture(page, '83 Social buddy profile', '83-buddy-initial', 'initial route screenshot')
await page.locator('[data-testid="screen-content"]').evaluate((element) => { element.scrollTop = element.scrollHeight })
await page.waitForTimeout(250)
await capture(page, '83 Social buddy profile', '83-buddy-network-controls', 'Scrolled state shows network controls')
await gotoRoute(page, '/features/social-buddy', '83 Social buddy profile', 'reset before privacy')
await clickRole(page, 'button', 'Privacy')
await capture(page, '83 Social buddy profile', '83-buddy-privacy-sheet', 'Privacy opens buddy visibility controls', { scrollToBottom: true })
await page.getByLabel('SIA can read this buddy thread', { exact: true }).check()
await capture(page, '83 Social buddy profile', '83-buddy-sia-consent-selected', 'SIA-read consent can be explicitly selected', { scrollToBottom: true })
await gotoRoute(page, '/features/social-buddy', '83 Social buddy profile', 'reset before message')
await clickRole(page, 'button', 'Message')
await capture(page, '83 Social buddy profile', '83-buddy-message-state', 'Message action exposes direct-chat destination', { scrollToBottom: true })
await gotoRoute(page, '/features/social-buddy', '83 Social buddy profile', 'reset before invite/report/avatar/mission')
await clickRole(page, 'button', 'Invite buddy')
await capture(page, '83 Social buddy profile', '83-buddy-invite-sheet', 'Invite opens data-preview copy', { scrollToBottom: true })
await gotoRoute(page, '/features/social-buddy', '83 Social buddy profile', 'reset before report')
await clickRole(page, 'button', 'Report')
await capture(page, '83 Social buddy profile', '83-buddy-report-sheet', 'Report opens report/block controls copy', { scrollToBottom: true })
await gotoRoute(page, '/features/social-buddy', '83 Social buddy profile', 'reset before avatar')
await clickRole(page, 'button', 'AK')
await capture(page, '83 Social buddy profile', '83-buddy-avatar-preview', 'Avatar opens profile preview', { scrollToBottom: true })
await gotoRoute(page, '/features/social-buddy', '83 Social buddy profile', 'reset before mission')
await clickButtonContaining(page, 'Run a half marathon')
await capture(page, '83 Social buddy profile', '83-buddy-mission-detail', 'Shared mission opens detail copy', { scrollToBottom: true })

await browser.close()

const result = {
  baseURL,
  capturedAt: new Date().toISOString(),
  consoleErrors: [...new Set(allConsole)],
  screenshots: screenshots.sort(),
  interactions,
}

fs.writeFileSync(path.join(outputDir, 'r18-state-capture.json'), JSON.stringify(result, null, 2))

console.log(`R18 state evidence saved to ${outputDir}`)
if (allConsole.length) {
  console.error([...new Set(allConsole)].join('\n'))
  process.exitCode = 1
}
