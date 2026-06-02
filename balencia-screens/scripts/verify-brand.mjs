import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const sourceRoot = path.join(root, 'src')
const visibleLiteralKeys = [
  'label',
  'title',
  'name',
  'description',
  'placeholder',
  'actionLabel',
  'cta',
  'meta',
  'note',
  'eyebrow',
  'text',
  'body',
  'preview',
  'subtitle',
]
const allowedHexFiles = new Set([
  'src/app/globals.css',
  'src/data/domains.ts',
])
const allowedGoalCopy = new Map([
  ['src/components/layout/TabBar.tsx', new Set(['Goals'])],
  ['src/data/screens.ts', new Set(['Goals Tab'])],
])
// Raw brand-colour rgba (orange #FF5E00 / green #34A853 / purple #7F24FF) belongs in
// globals.css (and domains.ts) only — components must reference the --glow-* / --grad-* / color
// tokens, never inline a brand colour with an ad-hoc alpha. These pre-existing files use inline
// atmospheric bg-[linear-gradient(rgba(...))] backgrounds and are grandfathered pending a token
// migration; do NOT add new files here.
const allowedWarmRgbaFiles = new Set([
  'src/app/tabs/goals/obstacles/page.tsx',
  'src/app/tabs/sia/page.tsx',
  'src/app/tabs/sia/conversations/page.tsx',
  'src/app/tabs/sia/call-summary/page.tsx',
  'src/app/features/accountability-contract/page.tsx',
  'src/app/features/videos/page.tsx',
  'src/app/features/reports/page.tsx',
])

function fail(message) {
  console.error(`verify:brand failed: ${message}`)
  process.exitCode = 1
}

function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '')
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  return entries.flatMap(entry => {
    const filePath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === '.next') return []
      return walk(filePath)
    }
    if (!/\.(tsx|ts|css)$/.test(entry.name)) return []
    return [filePath]
  })
}

const files = walk(sourceRoot)

function isAllowedGoalCopy(relativePath, value) {
  const allowedValues = allowedGoalCopy.get(relativePath)
  return Boolean(allowedValues?.has(value.trim()))
}

function failGoalCopy(relativePath, value, context) {
  if (/\bgoals?\b/i.test(value) && !isAllowedGoalCopy(relativePath, value)) {
    fail(`${relativePath} contains visible goal language in ${context}: "${value.trim()}"`)
  }
}

function checkVisibleGoalLanguage(relativePath, source) {
  const jsxTextMatches = [...source.matchAll(/>([^<>{}\n]*\b[Gg]oals?\b[^<>{}\n]*)</g)]
  for (const match of jsxTextMatches) {
    if (source[match.index - 1] === '=') continue
    failGoalCopy(relativePath, match[1], 'JSX text')
  }

  const keys = visibleLiteralKeys.join('|')
  const literalPattern = new RegExp(`\\b(${keys})\\s*[:=]\\s*(['"\`])([^'"\`]*\\b[Gg]oals?\\b[^'"\`]*)\\2`, 'g')
  for (const match of source.matchAll(literalPattern)) {
    failGoalCopy(relativePath, match[3], `${match[1]} string`)
  }
}

function checkSiaOrangeLeaks(relativePath, source) {
  const lines = source.split('\n')
  for (let index = 0; index < lines.length; index += 1) {
    const context = lines.slice(Math.max(0, index - 2), Math.min(lines.length, index + 3)).join('\n')
    if (/connection spotted/i.test(context) && /\b(?:text|bg|border)-brand-orange\b/.test(context)) {
      fail(`${relativePath} uses brand-orange for a SIA connection accent; use royal-purple`)
    }
  }

  if (/voiceActive[^'\n]*brand-orange|brand-orange[^'\n]*voiceActive/.test(source)) {
    fail(`${relativePath} uses brand-orange for active SIA voice state; use royal-purple`)
  }

  if (/VoiceWaveform/.test(relativePath) && /tone\s*=\s*['"]orange['"]/.test(source)) {
    fail(`${relativePath} defaults the SIA voice waveform to orange; use royal-purple`)
  }

  if (/src\/app\/tabs\/sia\/voice-fullscreen\/page\.tsx$/.test(relativePath) && /bg-brand-orange\/(?:10|15|20|25)/.test(source)) {
    fail(`${relativePath} uses orange ambient SIA voice accents; use royal-purple`)
  }
}

for (const filePath of files) {
  const relativePath = path.relative(root, filePath).replaceAll(path.sep, '/')
  const source = stripComments(fs.readFileSync(filePath, 'utf8'))
  const allowsHex = allowedHexFiles.has(relativePath)

  if (!allowsHex) {
    const hexMatches = [...source.matchAll(/#[0-9A-Fa-f]{3,8}\b/g)]
    for (const match of hexMatches) {
      fail(`${relativePath} contains hardcoded hex ${match[0]}; use Tailwind tokens or CSS variables`)
    }
  }

  const arbitraryColorMatches = [...source.matchAll(/\b(?:bg|text|border|shadow|from|to|via)-\[#/g)]
  for (const match of arbitraryColorMatches) {
    fail(`${relativePath} contains arbitrary color utility "${match[0]}"`)
  }

  const coolShadowMatches = [...source.matchAll(/rgba\(\s*0\s*,\s*0\s*,\s*0\s*,/g)]
  for (const match of coolShadowMatches) {
    fail(`${relativePath} contains cool shadow ${match[0]}; use warm rgba(33, 16, 8, ...) shadows`)
  }

  if (!allowsHex && !allowedWarmRgbaFiles.has(relativePath)) {
    const warmBrandRgba = [...source.matchAll(/rgba\(\s*255\s*,\s*94\s*,\s*0\b|rgba\(\s*52\s*,\s*168\s*,\s*83\b|rgba\(\s*127\s*,\s*36\s*,\s*255\b/g)]
    for (const match of warmBrandRgba) {
      fail(`${relativePath} inlines a raw brand colour (${match[0]}…); reference a --glow-* / --grad-* / colour token from globals.css instead`)
    }
  }

  if (/SIA[^'\n]*brand-orange|brand-orange[^'\n]*SIA/.test(source)) {
    fail(`${relativePath} appears to pair SIA copy with brand-orange; SIA/AI accents must use royal-purple`)
  }

  checkVisibleGoalLanguage(relativePath, source)
  checkSiaOrangeLeaks(relativePath, source)
}

if (!process.exitCode) {
  console.log(`verify:brand passed (${files.length} files scanned)`)
}
