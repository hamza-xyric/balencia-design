import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright'

const baseURL = process.argv[2] || 'http://localhost:3001'
const outPath = process.argv[3]
const shotsDir = process.argv[4]
const chromePath = process.env.PLAYWRIGHT_CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

if (outPath) fs.mkdirSync(path.dirname(path.resolve(outPath)), { recursive: true })
if (shotsDir) {
  const resolvedShotsDir = path.resolve(shotsDir)
  fs.mkdirSync(resolvedShotsDir, { recursive: true })
  for (const file of fs.readdirSync(resolvedShotsDir)) {
    if (file.endsWith('.png')) fs.unlinkSync(path.join(resolvedShotsDir, file))
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

function parseColor(value) {
  const parts = value.match(/[\d.]+/g)?.map(Number) ?? []
  return { r: parts[0] ?? 0, g: parts[1] ?? 0, b: parts[2] ?? 0, a: parts[3] ?? 1 }
}

function luminance(color) {
  const channels = [color.r, color.g, color.b].map(value => {
    const normalized = value / 255
    return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
}

function contrast(foreground, background) {
  const light = Math.max(luminance(foreground), luminance(background))
  const dark = Math.min(luminance(foreground), luminance(background))
  return (light + 0.05) / (dark + 0.05)
}

const browser = await chromium.launch(fs.existsSync(chromePath) ? { executablePath: chromePath } : {})
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' })
const page = await context.newPage()
const checks = []
const consoleErrors = []
const pageErrors = []
let navigationNonce = 0

page.on('console', message => {
  if (message.type() === 'error') consoleErrors.push(message.text())
})
page.on('pageerror', error => pageErrors.push(String(error)))

function pass(name, evidence = {}) {
  checks.push({ name, status: 'pass', evidence })
}

async function open(id, suffix = '') {
  const target = new URL(`/screens/${id}${suffix}`, baseURL)
  target.searchParams.set('__a1audit', String(++navigationNonce))
  await page.goto(target.toString(), { waitUntil: 'networkidle' })
  const phone = page.locator('[data-testid="phone-frame"]')
  assert(await phone.count() === 1, `${id}${suffix}: phone frame missing`)
  await page.locator('[data-testid="screen-content"]').evaluate(node => { node.scrollTop = 0 })
  const overflow = await phone.evaluate(node => node.scrollWidth > node.clientWidth + 1)
  assert(!overflow, `${id}${suffix}: horizontal phone-frame overflow`)
}

async function capture(name, locator = page.locator('[data-testid="screen-shell"]')) {
  if (!shotsDir) return
  await page.bringToFront()
  const freezeStyle = await page.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}' })
  await locator.evaluate(async node => {
    node.style.transform = 'translateZ(0)'
    node.style.filter = 'brightness(0.9999)'
    void node.getBoundingClientRect()
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  })
  await locator.screenshot({ path: path.join(path.resolve(shotsDir), `${name}.png`), animations: 'disabled', scale: 'css' })
  await locator.evaluate(node => {
    node.style.removeProperty('transform')
    node.style.removeProperty('filter')
  })
  await freezeStyle.evaluate(node => node.remove())
}

async function targetSize(locator, label, minimum = 44) {
  const box = await locator.boundingBox()
  assert(box && box.width >= minimum && box.height >= minimum, `${label}: expected at least ${minimum}×${minimum}, got ${box ? `${box.width}×${box.height}` : 'no box'}`)
  return box
}

async function inputContract(locator, label, tag = 'INPUT') {
  assert(await locator.evaluate(node => node.tagName) === tag, `${label}: expected native ${tag}`)
  await targetSize(locator, label)
  assert(await locator.evaluate(node => getComputedStyle(node).fontSize) === '16px' || Number.parseFloat(await locator.evaluate(node => getComputedStyle(node).fontSize)) > 16, `${label}: native input text must be at least 16px`)
}

async function visibleFocus(locator, label) {
  await locator.evaluate(node => node.blur())
  const before = await locator.evaluate(node => {
    const snapshots = []
    let current = node
    for (let depth = 0; current && depth < 4; depth += 1, current = current.parentElement) {
      const style = getComputedStyle(current)
      snapshots.push({
        outline: `${style.outlineStyle} ${style.outlineWidth} ${style.outlineColor}`,
        boxShadow: style.boxShadow,
        borderColor: style.borderColor,
      })
    }
    return snapshots
  })
  await page.keyboard.press('Tab')
  await locator.focus()
  const visible = await locator.evaluate((node, previous) => {
    if (!node.matches(':focus-visible')) return false
    let current = node
    for (let depth = 0; current && depth < 4; depth += 1, current = current.parentElement) {
      const style = getComputedStyle(current)
      const prior = previous[depth]
      const outline = `${style.outlineStyle} ${style.outlineWidth} ${style.outlineColor}`
      if (prior && outline !== prior.outline && style.outlineStyle !== 'none' && Number.parseFloat(style.outlineWidth) > 0) return true
      if (prior && style.boxShadow !== prior.boxShadow && style.boxShadow !== 'none') return true
      if (prior && style.borderColor !== prior.borderColor && style.borderColor === 'rgb(255, 94, 0)') return true
    }
    return false
  }, before)
  assert(visible, `${label}: no visible authored focus`)
}

async function fullWidth(locator, label) {
  const [buttonBox, phoneBox] = await Promise.all([locator.boundingBox(), page.locator('[data-testid="phone-frame"]').boundingBox()])
  assert(buttonBox && phoneBox && buttonBox.width >= phoneBox.width - 64, `${label}: primary action is not full width`)
  return buttonBox.width
}

async function fillsContainer(locator, container, label) {
  const [buttonBox, containerBox] = await Promise.all([locator.boundingBox(), container.boundingBox()])
  assert(buttonBox && containerBox && buttonBox.width >= containerBox.width - 1, `${label}: primary action does not fill its action container`)
  return buttonBox.width
}

async function actionContrast(locator, label) {
  const read = () => locator.evaluate(node => {
    const style = getComputedStyle(node)
    return { color: style.color, background: style.backgroundColor }
  })
  const ratioFor = pair => contrast(parseColor(pair.color), parseColor(pair.background))
  const normal = ratioFor(await read())
  await locator.hover()
  const hover = ratioFor(await read())
  const box = await locator.boundingBox()
  assert(box, `${label}: action missing`)
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
  await page.mouse.down()
  const pressed = ratioFor(await read())
  await page.mouse.move(1, 1)
  await page.mouse.up()
  assert(normal >= 4.5 && hover >= 4.5 && pressed >= 4.5, `${label}: action contrast ${normal.toFixed(2)}/${hover.toFixed(2)}/${pressed.toFixed(2)}`)
  return { normal, hover, pressed }
}

async function fullyVisible(locator, label) {
  const [box, phone] = await Promise.all([locator.boundingBox(), page.locator('[data-testid="phone-frame"]').boundingBox()])
  assert(box && phone && box.x >= phone.x && box.y >= phone.y && box.x + box.width <= phone.x + phone.width && box.y + box.height <= phone.y + phone.height, `${label}: not fully visible in phone frame`)
}

async function waitData(selector, attribute, value) {
  await page.waitForFunction(({ selector, attribute, value }) => document.querySelector(selector)?.getAttribute(attribute) === value, { selector, attribute, value })
}

try {
  await open('01')
  assert(await page.getByRole('status').filter({ hasText: 'Balencia. Loading.' }).count() === 1, '01: expected one loading announcement')
  const splashLogo = page.locator('img[src="/logos/Frame 2147239943.svg"]')
  assert(await splashLogo.count() === 1 && await splashLogo.getAttribute('alt') === '', '01: official lockup must be decorative')
  assert(await splashLogo.evaluate(node => node.complete && node.naturalWidth > 0), '01: official lockup did not load')
  assert(await page.locator('[data-testid="phone-frame"] button, [data-testid="phone-frame"] a[href], [data-testid="phone-frame"] input, [data-testid="phone-frame"] select, [data-testid="phone-frame"] textarea, [data-testid="phone-frame"] [role="button"], [data-testid="phone-frame"] [role="link"]').count() === 0, '01: splash must be passive')
  const splashAnimations = await page.locator('[data-testid="screen-shell"] *').evaluateAll(nodes => nodes.filter(node => getComputedStyle(node).animationName !== 'none').length)
  assert(splashAnimations === 0, '01: reduced motion must settle every reveal animation')
  await capture('01-default-reduced')
  pass('01 splash', { announcement: 1, officialAsset: true, activeAnimations: splashAnimations })

  await open('02')
  await waitData('[data-carousel-slide]', 'data-carousel-slide', '1')
  const skip = page.getByRole('button', { name: 'Skip' })
  const tabs = page.getByRole('tab')
  const next = page.getByRole('button', { name: 'Next', exact: true })
  await targetSize(skip, '02 Skip')
  assert(await tabs.count() === 4, '02: expected four carousel tabs')
  for (let index = 0; index < 4; index += 1) await targetSize(tabs.nth(index), `02 tab ${index + 1}`)
  await targetSize(next, '02 Next')
  await fullWidth(next, '02 Next')
  const carouselContrast = await actionContrast(next, '02 Next')
  await visibleFocus(next, '02 Next')
  assert(await tabs.nth(0).getAttribute('aria-selected') === 'true', '02: first tab not selected')
  await page.getByRole('heading', { name: 'One life, not modules.', exact: true }).waitFor()
  await capture('02-next-focus')
  await next.evaluate(node => node.blur())
  await capture('02-slide-1')
  const sourceTitles = ['One life, not modules.', 'Meet CIA, your coach.', 'Everything connects.', 'Your life, gamified.']
  for (let slide = 2; slide <= 4; slide += 1) {
    await page.getByRole('button', { name: slide === 4 ? 'Next' : 'Next', exact: true }).click()
    await waitData('[data-carousel-slide]', 'data-carousel-slide', String(slide))
    await page.getByRole('heading', { name: sourceTitles[slide - 1], exact: true }).waitFor()
    if (slide === 3) await page.getByText('Example pattern', { exact: true }).waitFor()
    if (slide === 4) await page.getByText(/Sample Mission progress/i).first().waitFor()
    await page.getByRole('button', { name: slide === 4 ? 'Get started' : 'Next', exact: true }).evaluate(node => node.blur())
    await capture(`02-slide-${slide}`)
  }
  assert(await page.getByRole('button', { name: 'Get started' }).count() === 1, '02: final CTA missing')
  await tabs.nth(0).focus()
  await page.keyboard.press('End')
  await waitData('[data-carousel-slide]', 'data-carousel-slide', '4')
  assert(await tabs.nth(3).getAttribute('aria-selected') === 'true', '02: End key did not select final tab')
  const finalPanel = page.getByRole('tabpanel')
  const panelBox = await finalPanel.boundingBox()
  assert(panelBox, '02: swipe panel missing')
  await page.mouse.move(panelBox.x + panelBox.width / 2, panelBox.y + panelBox.height / 2)
  await page.mouse.down()
  await page.mouse.move(panelBox.x + panelBox.width / 2 + 90, panelBox.y + panelBox.height / 2, { steps: 8 })
  await page.mouse.up()
  await waitData('[data-carousel-slide]', 'data-carousel-slide', '3')
  await tabs.nth(3).click()
  await waitData('[data-carousel-slide]', 'data-carousel-slide', '4')
  assert(await page.getByText(/in this carousel/i).count() === 0, '02: implementation-facing carousel copy remains')
  await page.getByRole('button', { name: 'Get started' }).click()
  await page.waitForURL('**/screens/03')
  await open('02')
  await page.getByRole('button', { name: 'Skip' }).click()
  await page.waitForURL('**/screens/03')
  pass('02 carousel', { slides: 4, keyboardTabs: true, swipe: true, routes: true, contrast: carouselContrast })

  await open('03')
  assert(await page.locator('h1').count() === 1, '03: expected one h1')
  const signupEmail = page.getByLabel('Email address')
  const signupPassword = page.getByLabel('Password', { exact: true })
  await inputContract(signupEmail, '03 email')
  await inputContract(signupPassword, '03 password')
  assert(await signupEmail.getAttribute('autocomplete') === 'email', '03: email autocomplete missing')
  assert(await signupPassword.getAttribute('autocomplete') === 'new-password', '03: password autocomplete missing')
  await visibleFocus(signupEmail, '03 email')
  const signup = page.getByRole('button', { name: 'Sign up' })
  const signupWidth = await fullWidth(signup, '03 Sign up')
  const signupContrast = await actionContrast(signup, '03 Sign up')
  await capture('03-default')
  await page.getByRole('button', { name: 'Show password' }).click()
  assert(await signupPassword.getAttribute('type') === 'text', '03: password reveal failed')
  await capture('03-password-visible')
  assert(await page.getByRole('link', { name: 'Terms of service' }).getAttribute('href') === '/legal/terms', '03: Terms link wrong')
  assert(await page.getByRole('link', { name: 'Privacy' }).getAttribute('href') === '/legal/privacy', '03: Privacy link wrong')
  const signupContent = page.getByTestId('screen-content')
  assert(await signupContent.getByRole('link', { name: 'Sign in', exact: true }).getAttribute('href') === '/screens/04', '03: Sign in route wrong')
  assert(await signupContent.getByRole('link', { name: 'Try without an account', exact: true }).getAttribute('href') === '/screens/06', '03: guest route wrong')
  await page.getByRole('button', { name: 'Continue with Google' }).click()
  await page.getByText(/Google account creation is unavailable.*Nothing was sent/i).waitFor()
  await signup.click()
  await waitData('form[data-form-state]', 'data-form-state', 'loading')
  const creating = page.getByRole('button', { name: 'Creating account' })
  assert(await creating.getAttribute('aria-busy') === 'true', '03: loading aria-busy missing')
  assert((await creating.boundingBox())?.width === signupWidth, '03: loading width changed')
  await capture('03-loading')
  await waitData('form[data-form-state]', 'data-form-state', 'error')
  await page.getByText(/Your details were not sent/i).waitFor()
  await capture('03-error')
  pass('03 sign-up sentinel', { loadingWidthLocked: true, providerHonesty: true, contrast: signupContrast })

  await open('03b')
  await waitData('[data-otp-state]', 'data-otp-state', 'default')
  const otpInputs = page.getByLabel(/Verification code digit \d of 4/)
  assert(await otpInputs.count() === 4, '03b: expected four OTP inputs')
  for (let index = 0; index < 4; index += 1) {
    await inputContract(otpInputs.nth(index), `03b digit ${index + 1}`)
    assert(await otpInputs.nth(index).getAttribute('inputmode') === 'numeric', `03b: digit ${index + 1} inputMode`)
    assert(await otpInputs.nth(index).getAttribute('maxlength') === '1', `03b: digit ${index + 1} maxLength`)
  }
  assert(await otpInputs.nth(0).getAttribute('autocomplete') === 'one-time-code', '03b: one-time-code autocomplete missing')
  assert(await otpInputs.nth(0).evaluate(node => document.activeElement === node), '03b: first digit not focused')
  assert(await page.getByText('a***@email.com', { exact: false }).count() === 1, '03b: masked destination missing')
  assert(await page.getByText(/amira@example\.com/i).count() === 0, '03b: raw account email leaked')
  const resend = page.getByRole('button', { name: 'Resend code' })
  assert(await resend.isDisabled(), '03b: resend must begin disabled')
  assert(await page.getByRole('button', { name: 'Verify', exact: true }).isDisabled(), '03b: Verify must begin disabled')
  await capture('03b-default')
  await otpInputs.nth(0).fill('1')
  assert(await otpInputs.nth(1).evaluate(node => document.activeElement === node), '03b: typing did not advance focus')
  await page.keyboard.press('Backspace')
  assert(await otpInputs.nth(0).evaluate(node => document.activeElement === node) && await otpInputs.nth(0).inputValue() === '', '03b: empty-cell Backspace did not clear prior digit')
  await otpInputs.nth(0).evaluate(node => {
    const transfer = new DataTransfer()
    transfer.setData('text/plain', '1234')
    node.dispatchEvent(new ClipboardEvent('paste', { bubbles: true, clipboardData: transfer }))
  })
  assert(JSON.stringify(await otpInputs.evaluateAll(nodes => nodes.map(node => node.value))) === JSON.stringify(['1', '2', '3', '4']), '03b: paste did not fill four digits')
  const verifyReady = page.getByRole('button', { name: 'Verify', exact: true })
  assert(!(await verifyReady.isDisabled()), '03b: Verify did not enable')
  const otpWidth = await fullWidth(verifyReady, '03b Verify')
  const otpContrast = await actionContrast(verifyReady, '03b Verify')
  await capture('03b-ready')

  const otpFixtures = ['partial', 'loading', 'invalid', 'expired', 'rate-limited', 'resend-success', 'offline', 'success']
  for (const fixture of otpFixtures) {
    await open('03b', `#${fixture}`)
    const expectedState = fixture === 'partial' ? 'default' : fixture
    await waitData('[data-otp-state]', 'data-otp-state', expectedState)
    const fixtureInputs = page.getByLabel(/Verification code digit \d of 4/)
    if (fixture === 'partial') {
      assert(JSON.stringify(await fixtureInputs.evaluateAll(nodes => nodes.map(node => node.value))) === JSON.stringify(['2', '5', '', '']), '03b partial: fixture digits missing')
      assert(await page.getByRole('button', { name: 'Verify', exact: true }).isDisabled(), '03b partial: Verify enabled')
    }
    if (fixture === 'loading') {
      assert(await page.getByRole('button', { name: 'Verifying code' }).getAttribute('aria-busy') === 'true', '03b loading: busy missing')
      assert((await page.getByRole('button', { name: 'Verifying code' }).boundingBox())?.width === otpWidth, '03b loading: width changed')
      assert(await fixtureInputs.nth(0).isDisabled(), '03b loading: inputs enabled')
    }
    if (fixture === 'invalid') {
      const otpAlert = page.locator('#otp-status [role="alert"]')
      await otpAlert.waitFor()
      assert(await otpAlert.count() === 1, '03b invalid: alert missing')
      assert(await fixtureInputs.nth(0).getAttribute('aria-invalid') === 'true', '03b invalid: aria-invalid missing')
    }
    if (fixture === 'expired') assert(!(await page.getByRole('button', { name: 'Resend code' }).isDisabled()), '03b expired: resend disabled')
    if (fixture === 'rate-limited') {
      assert(await page.getByText(/Try again in 4:/).count() === 1, '03b rate limit: countdown missing')
      await page.getByText(/About 5 minutes remaining/i).waitFor()
      await page.getByText('Paused', { exact: true }).waitFor()
      assert(await page.getByText('Ready', { exact: true }).count() === 0, '03b rate limit: contradictory resend readiness')
      assert(await fixtureInputs.nth(0).isDisabled(), '03b rate limit: inputs enabled')
      assert(await page.locator('[data-otp-state="rate-limited"] [aria-live]').count() === 1, '03b rate limit: duplicate live regions')
    }
    if (fixture === 'resend-success') await page.getByText(/Code sent/i).waitFor()
    if (fixture === 'offline') {
      assert(JSON.stringify(await fixtureInputs.evaluateAll(nodes => nodes.map(node => node.value))) === JSON.stringify(['2', '5', '8', '0']), '03b offline: digits not preserved')
      await page.getByText(/No connection.*still here/i).waitFor()
    }
    if (fixture === 'success') await page.getByText(/local prototype.*Nothing was sent/i).waitFor()
    await capture(`03b-${fixture}`)
  }
  await open('03b', '#rate-limit-expiring')
  await waitData('[data-otp-state]', 'data-otp-state', 'rate-limited')
  await waitData('[data-otp-state]', 'data-otp-state', 'default')
  await page.getByText(/Verification is available again/i).waitFor()
  assert(!(await page.getByLabel('Verification code digit 1 of 4').isDisabled()), '03b rate-limit expiry: inputs remained disabled')
  assert(!(await page.getByRole('button', { name: 'Resend code' }).isDisabled()), '03b rate-limit expiry: resend remained disabled')
  await capture('03b-rate-limit-ended')
  pass('03b OTP', { fixtures: otpFixtures.length + 1, paste: true, backspace: true, rateLimitExpires: true, widthLocked: true, contrast: otpContrast })

  await open('03c')
  await waitData('form[data-consent-state]', 'data-consent-state', 'default')
  const terms = page.getByRole('checkbox', { name: 'Accept the Terms of Service' })
  const privacy = page.getByRole('checkbox', { name: 'Accept the Privacy Policy' })
  const marketing = page.getByRole('switch', { name: 'Send me tips and updates' })
  for (const [control, label] of [[terms, '03c Terms'], [privacy, '03c Privacy']]) {
    assert(await control.evaluate(node => node.tagName) === 'INPUT', `${label}: not native`)
    await targetSize(control.locator('xpath=ancestor::label[1]'), `${label} row`)
    await visibleFocus(control, label)
  }
  assert(await marketing.evaluate(node => node.tagName) === 'INPUT', '03c Marketing: not native')
  assert(!(await terms.isChecked()) && !(await privacy.isChecked()) && !(await marketing.isChecked()), '03c: consents must start unchecked')
  const consentContinue = page.getByRole('button', { name: 'Continue', exact: true })
  assert(await consentContinue.isDisabled(), '03c: Continue must start disabled')
  assert(await page.getByText('0 of 2 required', { exact: true }).count() === 1, '03c: default count wrong')
  assert(await page.getByRole('link', { name: 'Read Terms of Service' }).getAttribute('href') === '/legal/terms', '03c: Terms document link wrong')
  assert(await page.getByRole('link', { name: 'Read Privacy Policy' }).getAttribute('href') === '/legal/privacy', '03c: Privacy document link wrong')
  await capture('03c-privacy-focus')
  await privacy.evaluate(node => node.blur())
  await capture('03c-default')
  await marketing.click()
  assert(await page.getByText('0 of 2 required', { exact: true }).count() === 1 && await consentContinue.isDisabled(), '03c: optional marketing changed required gate')
  await terms.focus()
  await page.keyboard.press('Space')
  assert(await page.getByText('1 of 2 required', { exact: true }).count() === 1, '03c: partial count wrong')
  await privacy.focus()
  await page.keyboard.press('Space')
  assert(await page.getByText('2 of 2 ready', { exact: true }).count() === 1 && !(await consentContinue.isDisabled()), '03c: ready gate wrong')
  const consentWidth = await fullWidth(consentContinue, '03c Continue')
  const consentContrast = await actionContrast(consentContinue, '03c Continue')
  await privacy.focus()
  await page.keyboard.press('Space')
  assert(await consentContinue.isDisabled(), '03c: unchecking must disable Continue')
  for (const fixture of ['partial', 'ready', 'loading', 'offline', 'success']) {
    await open('03c', `#${fixture}`)
    const expectedState = fixture === 'partial' || fixture === 'ready' ? 'default' : fixture
    await waitData('form[data-consent-state]', 'data-consent-state', expectedState)
    if (fixture === 'partial') {
      assert(await page.getByRole('checkbox', { name: 'Accept the Terms of Service' }).isChecked(), '03c partial: Terms fixture missing')
      assert(!(await page.getByRole('checkbox', { name: 'Accept the Privacy Policy' }).isChecked()), '03c partial: Privacy fixture wrong')
      await page.getByText('1 of 2 required', { exact: true }).waitFor()
    }
    if (fixture === 'ready') {
      assert(await page.getByRole('checkbox', { name: 'Accept the Terms of Service' }).isChecked(), '03c ready: Terms fixture missing')
      assert(await page.getByRole('checkbox', { name: 'Accept the Privacy Policy' }).isChecked(), '03c ready: Privacy fixture missing')
      await page.getByText('2 of 2 ready', { exact: true }).waitFor()
    }
    if (fixture === 'loading') {
      const busy = page.getByRole('button', { name: 'Saving choices' })
      assert(await busy.getAttribute('aria-busy') === 'true', '03c loading: busy missing')
      assert((await busy.boundingBox())?.width === consentWidth, '03c loading: width changed')
    }
    if (fixture === 'offline') {
      await page.getByText(/continuing needs you online/i).waitFor()
      assert(await page.getByRole('button', { name: 'Continue', exact: true }).isDisabled(), '03c offline: Continue enabled')
    }
    if (fixture === 'success') {
      await page.getByText(/local prototype.*No data was sent/i).waitFor()
      await capture('03c-success')
      const fixtureMarketing = page.getByRole('switch', { name: 'Send me tips and updates' })
      await fixtureMarketing.click()
      await waitData('form[data-consent-state]', 'data-consent-state', 'default')
      assert(await page.getByText(/Choices saved in this local prototype/i).count() === 0, '03c success: stale saved message after marketing change')
    }
    if (fixture !== 'success') await capture(`03c-${fixture}`)
  }
  pass('03c consent', { native: true, optionalNeutral: true, fixtures: 5, widthLocked: true, contrast: consentContrast })

  await open('03d')
  const firstName = page.getByLabel('First name')
  const lastName = page.getByLabel('Last name, optional')
  const dob = page.getByLabel('Date of birth')
  const gender = page.getByLabel('Gender')
  await inputContract(firstName, '03d first name')
  await inputContract(lastName, '03d last name')
  await inputContract(dob, '03d date of birth')
  await inputContract(gender, '03d gender', 'SELECT')
  assert(await firstName.inputValue() === 'Amira' && await page.getByText('From Google', { exact: true }).count() >= 1, '03d: initial first-name provenance wrong')
  assert(await dob.inputValue() === '', '03d: DOB must start empty')
  assert(await gender.inputValue() === '', '03d: gender must start not selected')
  assert(await gender.locator('option[value="prefer-not-to-say"]').count() === 1, '03d: Prefer not to say missing')
  assert(await page.locator('form[data-profile-readiness="0"]').count() === 1, '03d: readiness must start 0')
  const saveDetails = page.getByRole('button', { name: 'Save details' })
  const skipProfile = page.getByRole('link', { name: 'Skip for now' })
  assert(!(await saveDetails.isDisabled()), '03d: optional empty form must remain saveable')
  await targetSize(saveDetails, '03d Save details')
  await targetSize(skipProfile, '03d Skip')
  await fullyVisible(saveDetails, '03d Save details')
  await fullyVisible(skipProfile, '03d Skip')
  const profileContrast = await actionContrast(saveDetails, '03d Save details')
  const privacyControls = ['Category', 'Source', 'Scope', 'Freshness', 'Confidence', 'Retention', 'Export', 'Revoke', 'Delete']
  for (const label of privacyControls) assert(await page.getByRole('link', { name: label, exact: true }).count() === 1, `03d: ${label} control missing`)
  assert(await page.getByRole('checkbox').count() === 0 && await page.getByRole('switch').count() === 0, '03d: fake consent control remains')
  await capture('03d-default')
  await firstName.fill('Amina')
  await page.getByText('You entered', { exact: true }).first().waitFor()
  await gender.selectOption('prefer-not-to-say')
  await waitData('form[data-profile-readiness]', 'data-profile-readiness', '1')
  await dob.fill('1994-05-18')
  await waitData('form[data-profile-readiness]', 'data-profile-readiness', '2')
  await fullyVisible(gender, '03d completed gender')
  await dob.evaluate(node => node.blur())
  await capture('03d-complete')
  pass('03d profile', { readiness: '0→2', privacyControls: 9, contrast: profileContrast })

  await open('03e')
  await waitData('form[data-enrollment-phase]', 'data-enrollment-phase', 'phone')
  const optIn = page.getByRole('checkbox', { name: 'Enable the optional message channel' })
  const country = page.getByLabel('Country code')
  const phone = page.getByLabel('Phone number')
  const channelContinue = page.getByRole('button', { name: 'Continue to code preview' })
  const channelSkip = page.getByRole('link', { name: 'Skip for now' })
  assert(!(await optIn.isChecked()), '03e: opt-in must start false')
  assert(await country.isDisabled() && await phone.isDisabled() && await channelContinue.isDisabled(), '03e: collection enabled before opt-in')
  await targetSize(optIn.locator('xpath=ancestor::label[1]'), '03e opt-in row')
  await targetSize(channelSkip, '03e Skip')
  for (const label of privacyControls) assert(await page.getByRole('link', { name: label, exact: true }).count() === 1, `03e: ${label} control missing`)
  await page.getByText(/Reply STOP/i).waitFor()
  assert(await page.getByTestId('screen-content').getByText(/WhatsApp/i).count() === 0, '03e: provider launch branding remains')
  await capture('03e-default')
  await optIn.click()
  assert(!(await country.isDisabled()) && !(await phone.isDisabled()), '03e: opt-in did not unlock phone controls')
  await inputContract(country, '03e country', 'SELECT')
  await inputContract(phone, '03e phone')
  await page.getByText('No phone number entered yet.', { exact: true }).waitFor()
  await phone.fill('202 55')
  assert(await phone.getAttribute('aria-invalid') === 'true', '03e: partial phone missing aria-invalid')
  await page.getByText(/Enter at least 10 digits.*not sent/i).first().waitFor()
  await phone.fill('202 555 0143')
  assert(await phone.getAttribute('aria-invalid') === null, '03e: valid phone retained aria-invalid')
  assert(!(await channelContinue.isDisabled()), '03e: valid opted-in phone did not enable Continue')
  await fullWidth(channelContinue, '03e Continue')
  const channelContrast = await actionContrast(channelContinue, '03e Continue')
  await phone.scrollIntoViewIfNeeded()
  await fullyVisible(phone, '03e opted-in phone')
  await capture('03e-opted-valid')
  await channelContinue.click()
  await waitData('form[data-enrollment-phase]', 'data-enrollment-phase', 'verify')
  const unavailablePhase = page.getByText(/Preview only.*provider unavailable.*no code sent/i)
  await unavailablePhase.waitFor()
  await fullyVisible(unavailablePhase, '03e provider-unavailable message')
  const channelDigits = page.getByLabel(/Verification digit \d of 6/)
  assert(await channelDigits.count() === 6, '03e: expected six OTP inputs')
  for (let index = 0; index < 6; index += 1) await inputContract(channelDigits.nth(index), `03e digit ${index + 1}`)
  assert(await page.getByRole('button', { name: 'Resend unavailable' }).isDisabled(), '03e: unavailable resend enabled')
  assert(await page.getByRole('button', { name: 'Verify preview' }).isDisabled(), '03e: empty preview code enabled')
  await targetSize(page.getByRole('button', { name: 'Back to phone number' }), '03e Back')
  await capture('03e-verify-unavailable')
  await channelDigits.nth(0).fill('1')
  assert(await channelDigits.nth(1).evaluate(node => document.activeElement === node), '03e: typing did not advance OTP focus')
  await page.keyboard.press('Backspace')
  assert(await channelDigits.nth(0).evaluate(node => document.activeElement === node) && await channelDigits.nth(0).inputValue() === '', '03e: empty-cell Backspace did not clear prior digit')
  await channelDigits.nth(0).evaluate(node => {
    const transfer = new DataTransfer()
    transfer.setData('text/plain', '123456')
    node.dispatchEvent(new ClipboardEvent('paste', { bubbles: true, clipboardData: transfer }))
  })
  assert(JSON.stringify(await channelDigits.evaluateAll(nodes => nodes.map(node => node.value))) === JSON.stringify(['1', '2', '3', '4', '5', '6']), '03e: paste did not fill six digits')
  assert(!(await page.getByRole('button', { name: 'Verify preview' }).isDisabled()), '03e: complete preview code did not enable local action')
  await capture('03e-code-preview-complete')
  await page.getByRole('button', { name: 'Back to phone number' }).click()
  await waitData('form[data-enrollment-phase]', 'data-enrollment-phase', 'phone')
  assert(await phone.inputValue() === '202 555 0143', '03e: Back did not preserve phone')
  await open('03e', '?phase=verify')
  await waitData('form[data-enrollment-phase]', 'data-enrollment-phase', 'verify')
  await page.getByText(/Preview only.*provider unavailable.*no code sent/i).waitFor()
  pass('03e optional channel', { explicitOptIn: true, privacyControls: 9, providerNeutral: true, contrast: channelContrast })

  await open('04', '?state=default')
  await waitData('[data-auth-state]', 'data-auth-state', 'default')
  const signinEmail = page.getByLabel('Email address')
  const signinPassword = page.getByLabel('Password', { exact: true })
  const remember = page.getByRole('checkbox', { name: 'Remember me' })
  await inputContract(signinEmail, '04 email')
  await inputContract(signinPassword, '04 password')
  assert(await signinEmail.inputValue() === '' && await signinPassword.inputValue() === '', '04 default: fields not empty')
  assert(!(await remember.isChecked()), '04 default: remember preselected')
  assert(await page.getByRole('button', { name: 'Sign in', exact: true }).isDisabled(), '04 default: Sign in enabled')
  assert(await signinEmail.getAttribute('autocomplete') === 'email' && await signinPassword.getAttribute('autocomplete') === 'current-password', '04: autocomplete contract missing')
  await visibleFocus(signinEmail, '04 email')
  await capture('04-email-focus')
  await signinEmail.evaluate(node => node.blur())
  for (const [name, href] of [['Forgot password?', '/screens/05'], ['Sign up', '/screens/03'], ['Continue as guest', '/screens/06']]) {
    const link = page.getByRole('link', { name, exact: true })
    assert(await link.getAttribute('href') === href, `04: ${name} route wrong`)
    await targetSize(link, `04 ${name}`)
  }
  await targetSize(page.getByText('Support and safety resources', { exact: true }), '04 support')
  for (const provider of ['Google', 'Apple']) await targetSize(page.getByRole('button', { name: `Continue with ${provider}` }), `04 ${provider}`)
  await capture('04-default')
  await page.getByRole('button', { name: 'Continue with Google' }).click()
  await page.getByText(/Google sign-in is unavailable.*Nothing was sent/i).waitFor()
  assert(await page.getByRole('button', { name: /Face ID|fingerprint|biometric/i }).count() === 0, '04: unverified biometric control present')
  await capture('04-provider-unavailable')

  await open('04', '?state=filled')
  await waitData('[data-auth-state]', 'data-auth-state', 'filled')
  const filledEmail = page.getByLabel('Email address')
  const filledPassword = page.getByLabel('Password', { exact: true })
  assert(await filledEmail.inputValue() === 'amira@example.com' && await filledPassword.inputValue() === 'ClearSky!2040', '04 filled: fixture values missing')
  const signInReady = page.getByRole('button', { name: 'Sign in', exact: true })
  assert(!(await signInReady.isDisabled()), '04 filled: Sign in disabled')
  const signinWidth = await fillsContainer(signInReady, signInReady.locator('xpath=ancestor::form[1]'), '04 Sign in')
  const signinContrast = await actionContrast(signInReady, '04 Sign in')
  await page.getByRole('button', { name: 'Show password' }).click()
  assert(await page.getByLabel('Password', { exact: true }).getAttribute('type') === 'text', '04: reveal failed')
  await remember.focus()
  await page.keyboard.press('Space')
  assert(await remember.isChecked(), '04: Remember me keyboard toggle failed')
  await capture('04-filled')

  for (const fixture of ['offline', 'wrong-credentials', 'rate-limit', 'loading']) {
    await open('04', `?state=${fixture}`)
    await waitData('[data-auth-state]', 'data-auth-state', fixture)
    const text = await page.locator('[data-auth-state]').innerText()
    if (fixture === 'offline') {
      assert(text.includes('nothing queued') && !text.includes('does not match') && !text.includes('Try again in'), '04 offline: state conflation')
    }
    if (fixture === 'wrong-credentials') {
      assert(text.includes('No real credential check occurred') && !text.includes('nothing queued') && !text.includes('Try again in'), '04 wrong credentials: state conflation')
    }
    if (fixture === 'rate-limit') {
      assert(text.includes('Try again later') && text.includes('No retry-after value') && !/Try again in \d/.test(text), '04 rate limit: honest-null evidence missing')
      assert(await page.getByLabel('Email address').isDisabled() && await page.getByLabel('Password', { exact: true }).isDisabled(), '04 rate limit: fields enabled')
    }
    if (fixture === 'loading') {
      const loadingButton = page.getByRole('button', { name: 'Signing in' })
      assert(await loadingButton.getAttribute('aria-busy') === 'true', '04 loading: aria-busy missing')
      assert((await loadingButton.boundingBox())?.width === signinWidth, '04 loading: width changed')
    }
    await capture(`04-${fixture}`)
  }
  pass('04 sign-in', { fixtures: 6, providerHonesty: true, stateSeparation: true, contrast: signinContrast })

  assert(consoleErrors.length === 0, `Console errors: ${consoleErrors.join(' | ')}`)
  assert(pageErrors.length === 0, `Page errors: ${pageErrors.join(' | ')}`)

  const report = {
    auditedAt: new Date().toISOString(),
    baseURL,
    reducedMotion: 'reduce',
    checks,
    consoleErrors,
    pageErrors,
    screenshots: shotsDir ? fs.readdirSync(path.resolve(shotsDir)).filter(file => file.endsWith('.png')).sort() : [],
    status: 'pass',
  }
  if (outPath) fs.writeFileSync(path.resolve(outPath), `${JSON.stringify(report, null, 2)}\n`)
  console.log(JSON.stringify(report, null, 2))
} catch (error) {
  const report = {
    auditedAt: new Date().toISOString(),
    baseURL,
    reducedMotion: 'reduce',
    checks,
    consoleErrors,
    pageErrors,
    status: 'fail',
    error: error instanceof Error ? error.stack || error.message : String(error),
  }
  if (outPath) fs.writeFileSync(path.resolve(outPath), `${JSON.stringify(report, null, 2)}\n`)
  console.error(JSON.stringify(report, null, 2))
  process.exitCode = 1
} finally {
  await browser.close()
}
