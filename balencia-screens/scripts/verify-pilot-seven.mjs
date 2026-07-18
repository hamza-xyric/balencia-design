import fs from 'node:fs'
import { chromium } from 'playwright'

const baseURL = process.argv[2] || 'http://localhost:3001'
const outPath = process.argv[3]
const chromePath = process.env.PLAYWRIGHT_CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

async function targetSize(locator, label) {
  const box = await locator.boundingBox()
  assert(box && box.width >= 44 && box.height >= 44, `${label} must render at least 44×44`)
  return box
}

async function effectiveContrast(locator) {
  return locator.evaluate(node => {
    const parse = value => {
      const parts = value.match(/[\d.]+/g)?.map(Number) ?? []
      return { r: parts[0] ?? 0, g: parts[1] ?? 0, b: parts[2] ?? 0, a: parts[3] ?? 1 }
    }
    const composite = (front, back) => {
      const alpha = front.a + back.a * (1 - front.a)
      return {
        r: (front.r * front.a + back.r * back.a * (1 - front.a)) / alpha,
        g: (front.g * front.a + back.g * back.a * (1 - front.a)) / alpha,
        b: (front.b * front.a + back.b * back.a * (1 - front.a)) / alpha,
        a: alpha,
      }
    }
    const layers = []
    for (let current = node; current; current = current.parentElement) layers.push(parse(getComputedStyle(current).backgroundColor))
    let background = { r: 0, g: 0, b: 0, a: 1 }
    for (const layer of layers.reverse()) background = composite(layer, background)
    const foreground = composite(parse(getComputedStyle(node).color), background)
    const luminance = color => {
      const channels = [color.r, color.g, color.b].map(value => {
        const normalized = value / 255
        return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4
      })
      return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
    }
    const lighter = Math.max(luminance(foreground), luminance(background))
    const darker = Math.min(luminance(foreground), luminance(background))
    return (lighter + 0.05) / (darker + 0.05)
  })
}

const browser = await chromium.launch(fs.existsSync(chromePath) ? { executablePath: chromePath } : {})
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: 'reduce',
})
const page = await context.newPage()
const consoleErrors = []
const pageErrors = []
page.on('console', message => {
  if (message.type() === 'error') consoleErrors.push(message.text())
})
page.on('pageerror', error => pageErrors.push(String(error)))

const results = []
const metrics = {}

async function open(id) {
  await page.goto(`${baseURL}/screens/${id}`, { waitUntil: 'networkidle' })
  assert(await page.locator('[data-testid="phone-frame"]').count() === 1, `${id}: phone frame missing`)
}

async function record(id, checks) {
  await open(id)
  await checks()
  const horizontalOverflow = await page.locator('[data-testid="phone-frame"]').evaluate(frame => frame.scrollWidth > frame.clientWidth + 1)
  assert(!horizontalOverflow, `${id}: phone frame has horizontal overflow`)
  results.push({ id, status: 'pass' })
}

try {
  await record('03', async () => {
    assert(await page.locator('h1').count() === 1, '03: expected one h1')
    const email = page.getByLabel('Email address')
    const password = page.getByLabel('Password', { exact: true })
    await targetSize(email, '03: email input')
    await targetSize(password, '03: password input')
    const reveal = page.getByRole('button', { name: 'Show password' })
    await targetSize(reveal, '03: password reveal')
    await reveal.click()
    assert(await password.getAttribute('type') === 'text', '03: reveal must expose the password field')
    assert(await page.getByRole('link', { name: 'Terms of service' }).getAttribute('href') === '/legal/terms', '03: terms link missing')
    assert(await page.getByRole('link', { name: 'Privacy' }).getAttribute('href') === '/legal/privacy', '03: privacy link missing')
    await email.focus()
    const focusShadow = await email.locator('..').evaluate(node => getComputedStyle(node).boxShadow)
    assert(focusShadow !== 'none', '03: input focus treatment missing')
    const form = page.locator('form[data-form-state]')
    assert(await form.getAttribute('data-form-state') === 'default', '03: form must begin in default state')
    const signUp = page.getByRole('button', { name: 'Sign up' })
    const defaultWidth = (await signUp.boundingBox())?.width
    await signUp.click()
    const loading = page.getByRole('button', { name: 'Creating account' })
    assert(await form.getAttribute('data-form-state') === 'loading', '03: submit must enter loading state')
    assert(await loading.getAttribute('aria-busy') === 'true', '03: loading CTA must expose aria-busy')
    assert((await loading.boundingBox())?.width === defaultWidth, '03: loading CTA width must remain locked')
    await page.waitForFunction(() => document.querySelector('form[data-form-state]')?.getAttribute('data-form-state') === 'error')
    const error = page.getByText('This visual prototype can’t create an account. Your details were not sent.', { exact: true })
    await error.waitFor()
    assert(await form.getAttribute('data-form-state') === 'error', '03: local prototype failure must enter error state')
    assert((await error.textContent())?.includes('Your details were not sent.'), '03: error state must state the no-send boundary')
    assert(await page.getByRole('button', { name: 'Try again' }).count() === 1, '03: error state must offer a retry')
    await email.fill('amira+retry@example.com')
    assert(await form.getAttribute('data-form-state') === 'default', '03: editing must clear the error state')
  })

  await record('07', async () => {
    const orb = page.locator('[data-cia-state]').first()
    assert(await orb.getAttribute('data-cia-state') === 'idle', '07: orb must default to idle')
    const mic = page.locator('button[aria-describedby="onboarding-voice-disclosure"]')
    assert(await mic.getAttribute('aria-pressed') === 'false', '07: mic must default off')
    const privacy = page.getByRole('button', { name: 'Privacy controls' })
    const crisis = page.getByRole('button', { name: 'Crisis support' })
    const privacyBox = await targetSize(privacy, '07: privacy control')
    await targetSize(crisis, '07: crisis control')
    const composerTop = await page.locator('[data-testid="screen-composer"]').evaluate(node => node.getBoundingClientRect().top)
    assert(privacyBox.y + privacyBox.height <= composerTop, '07: safety controls overlap the composer')
    const messageInput = page.getByRole('textbox', { name: 'Message CIA' })
    await targetSize(messageInput, '07: message input')
    assert(await messageInput.evaluate(node => getComputedStyle(node).fontSize) === '16px', '07: composer input must avoid iOS focus zoom')
    const attach = page.getByRole('button', { name: 'Attachments unavailable in this prototype' })
    assert(await attach.isDisabled(), '07: unavailable attachments must be disabled')
    const send = page.getByRole('button', { name: 'Send message' })
    assert(await send.isDisabled(), '07: empty composer must not send')
    await messageInput.focus()
    const messageFocusShadow = await messageInput.locator('..').evaluate(node => getComputedStyle(node).boxShadow)
    assert(messageFocusShadow !== 'none', '07: message input focus treatment missing')
    await mic.click()
    assert(await mic.getAttribute('aria-pressed') === 'true', '07: mic state did not toggle')
    assert(await orb.getAttribute('data-cia-state') === 'listening', '07: orb did not enter listening state')
    await privacy.click()
    await page.getByText('Voice transcripts stay in CIA chat history', { exact: false }).waitFor()
    await crisis.click()
    await page.getByText('If you may be in immediate danger', { exact: false }).waitFor()
    await messageInput.fill('Show me a steadier week')
    assert(!(await send.isDisabled()), '07: typed composer must enable send')
    await send.click()
    await page.getByText('Show me a steadier week', { exact: true }).waitFor()
    assert(await messageInput.inputValue() === '', '07: sent composer must clear its input')
    const fitness = page.getByRole('button', { name: 'Fitness' })
    await fitness.click()
    assert(await fitness.getAttribute('aria-pressed') === 'true', '07: focus-area chip must toggle selected')
    await page.getByText('Focus areas selected: Fitness.', { exact: true }).waitFor()
    const skipHealth = page.getByRole('button', { name: 'Skip health data' })
    await skipHealth.click()
    assert(await skipHealth.getAttribute('aria-pressed') === 'true', '07: skip-health consent must toggle selected')
    assert(await fitness.getAttribute('aria-pressed') === 'false', '07: skip-health consent must clear health focus areas')
    await page.getByText('Health data will be skipped.', { exact: true }).waitFor()
    const domainMicrotextRatios = await Promise.all((await page.locator('[data-domain-microtext]').all()).map(effectiveContrast))
    assert(domainMicrotextRatios.length === 4 && domainMicrotextRatios.every(ratio => ratio >= 4.5), `07: domain microtext contrast must be AA (${domainMicrotextRatios.join(', ')})`)
    metrics.s07DomainMicrotextContrast = domainMicrotextRatios
    const animationName = await orb.locator('.cia-orb__core').evaluate(node => getComputedStyle(node).animationName)
    assert(animationName === 'none', '07: reduced motion must stop orb animation')
  })

  await record('11', async () => {
    const orb = page.locator('[data-cia-state]').first()
    assert(await orb.getAttribute('data-cia-state') === 'idle', '11: orb must default to idle')
    const mic = page.locator('button[aria-describedby="voice-retention-disclosure"]')
    await targetSize(mic, '11: microphone toggle')
    await mic.click()
    assert(await mic.getAttribute('aria-pressed') === 'true', '11: microphone did not toggle on')
    assert(await orb.getAttribute('data-cia-state') === 'listening', '11: orb did not enter listening state')
    await page.getByRole('button', { name: 'Pause microphone' }).click()
    assert(await orb.getAttribute('data-cia-state') === 'idle', '11: orb did not return to idle')
    await page.getByRole('button', { name: 'Switch to keyboard' }).click()
    const messageInput = page.getByLabel('Message CIA')
    await messageInput.waitFor()
    await messageInput.focus()
    const messageFocusShadow = await messageInput.locator('..').evaluate(node => getComputedStyle(node).boxShadow)
    assert(messageFocusShadow !== 'none', '11: keyboard input focus treatment missing')
    const mute = page.getByRole('button', { name: 'Mute CIA voice' })
    await mute.click()
    assert(await page.getByRole('button', { name: 'Unmute CIA voice' }).getAttribute('aria-pressed') === 'true', '11: mute state did not toggle')
    await page.getByRole('button', { name: 'Close voice mode' }).click()
    await page.getByText('Voice mode closed.').waitFor()
    await page.getByRole('button', { name: 'Resume voice mode' }).click()
    await page.getByText('Voice mode closed.').waitFor({ state: 'hidden' })
  })

  await record('12', async () => {
    assert(await page.locator('h1').count() === 1, '12: expected one h1')
    assert(await page.getByRole('img', { name: /Life Power 487\. 10 active domains\./ }).count() === 1, '12: Life Power payload/summary mismatch')
    assert(await page.getByRole('link', { name: 'Quick log' }).getAttribute('href') === '/screens/12?action=quick-log', '12: Quick Log route missing')
    assert(await page.getByRole('link', { name: 'Missions' }).getAttribute('href') === '/screens/13', '12: Missions navigation missing')
    assert(await page.getByText('10 active domains').count() === 1, '12: domain count mismatch')
  })

  await record('26', async () => {
    const mediaLoaded = await page.locator('img[alt^="Three-stage workout preparation"]').evaluate(image => image.complete && image.naturalWidth > 0)
    assert(mediaLoaded, '26: HIFI-26-01 did not load')
    assert(await page.getByText('Intensity charge 78%', { exact: true }).count() === 1, '26: intensity value missing')
    const charge = page.getByRole('img', { name: 'Intensity charge 78 percent' })
    const tickWidths = await charge.evaluate(node => [...node.children].map(tick => tick.firstElementChild?.style.width))
    assert(
      tickWidths.length === 10 && tickWidths.slice(0, 7).every(width => width === '100%') && tickWidths[7] === '80%' && tickWidths.slice(8).every(width => width === '0%'),
      '26: 78 percent must render as seven full ticks plus one 80 percent tick',
    )
    for (const label of ['Category', 'Source', 'Scope', 'Freshness', 'Confidence', 'Retention', 'Export', 'Revoke', 'Delete']) {
      assert(await page.getByRole('link', { name: label, exact: true }).count() === 1, `26: missing ${label} data control`)
    }
    assert(await page.getByRole('link', { name: 'Log workout' }).getAttribute('href') === '/screens/26?action=log-workout', '26: workout log route missing')
    assert(await page.getByText('Coaching support, not medical advice.', { exact: false }).count() === 1, '26: safety boundary missing')
  })

  await record('43', async () => {
    assert(await page.locator('h1').count() === 1, '43: expected one h1')
    assert(await page.getByRole('table', { name: /plan feature comparison/i }).count() === 1, '43: semantic plan table missing')
    const lockedPreview = page.getByRole('region', { name: 'Weekly mission model' })
    assert(await lockedPreview.count() === 1, '43: canonical locked preview missing')
    assert(await lockedPreview.getByRole('button', { name: 'Upgrade to Plus' }).count() === 1, '43: eligibility-safe attempted-feature CTA missing')
    assert(await page.getByText(/free trial/i).count() === 0, '43: unverified trial claim present')
    await targetSize(page.getByRole('button', { name: 'Compare all plans' }), '43: compare exit')
    await targetSize(page.getByRole('button', { name: 'Maybe later' }), '43: later exit')
    await targetSize(page.getByRole('button', { name: 'Close upgrade' }), '43: close exit')
  })

  await record('80', async () => {
    const mediaLoaded = await page.locator('img[src*="HIFI-80-01-music-coach"]').evaluate(image => image.complete && image.naturalWidth > 0)
    assert(mediaLoaded, '80: HIFI-80-01 did not load')
    const seek = page.getByRole('slider', { name: /Seek Tempo run focus/ })
    assert(await seek.inputValue() === '118', '80: unexpected initial seek value')
    await seek.focus()
    await page.keyboard.press('ArrowRight')
    assert(await seek.inputValue() === '119', '80: seek control is not keyboard-operable')
    assert(await page.getByRole('button', { name: 'Manage Spotify connection and permissions' }).count() === 1, '80: connected provider CTA missing')
    assert(await page.getByText('Connect Spotify', { exact: true }).count() === 0, '80: connected screen must not say Connect Spotify')
    assert(await page.getByText('CIA matched to your planned pace window', { exact: true }).count() === 1, '80: W-TRUNC-80 text changed')
    const matchedContrast = await effectiveContrast(page.locator('[data-domain-microtext]'))
    assert(matchedContrast >= 4.5, `80: Matched microtext contrast must be AA (${matchedContrast})`)
    metrics.s80MatchedMicrotextContrast = matchedContrast
    for (const label of ['Category', 'Source', 'Scope', 'Freshness', 'Confidence', 'Retention', 'Export', 'Revoke', 'Delete']) {
      assert(await page.getByRole('link', { name: label, exact: true }).count() === 1, `80: missing ${label} data control`)
    }
  })

  assert(consoleErrors.length === 0, `console errors: ${consoleErrors.join(' | ')}`)
  assert(pageErrors.length === 0, `page errors: ${pageErrors.join(' | ')}`)
  const report = { auditedAt: new Date().toISOString(), baseURL, reducedMotion: 'reduce', screens: results, metrics, consoleErrors, pageErrors, status: 'pass' }
  if (outPath) fs.writeFileSync(outPath, `${JSON.stringify(report, null, 2)}\n`)
  console.log(JSON.stringify(report, null, 2))
} catch (error) {
  const report = {
    auditedAt: new Date().toISOString(),
    baseURL,
    reducedMotion: 'reduce',
    screens: results,
    metrics,
    consoleErrors,
    pageErrors,
    status: 'fail',
    error: error instanceof Error ? error.stack || error.message : String(error),
  }
  if (outPath) fs.writeFileSync(outPath, `${JSON.stringify(report, null, 2)}\n`)
  console.error(JSON.stringify(report, null, 2))
  process.exitCode = 1
} finally {
  await browser.close()
}
