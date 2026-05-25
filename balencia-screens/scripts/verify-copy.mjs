import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const sourceRoots = ['src/app', 'src/components', 'src/data']
const screensFile = path.join(root, 'src/data/screens.ts')
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
]

const allowedLowercaseFragments = new Set([
  'life, not modules.',
  'connects',
  'gamified',
  'kg',
])
const toneBlacklist = [
  { pattern: /\bcrush(?:ed|es|ing)?\b/i, label: 'crush' },
  { pattern: /\bhustle\b/i, label: 'hustle' },
  { pattern: /\bdominat(?:e|es|ed|ing)\b/i, label: 'dominate' },
  { pattern: /\bfinally\b/i, label: 'finally' },
  { pattern: /\bno excuses\b/i, label: 'no excuses' },
]

function fail(message) {
  console.error(`verify:copy failed: ${message}`)
  process.exitCode = 1
}

function warn(message) {
  console.warn(`verify:copy warning: ${message}`)
}

function walk(dir) {
  if (!fs.existsSync(dir)) return []
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

function parseScreenStatuses() {
  const source = fs.readFileSync(screensFile, 'utf8')
  const matches = [...source.matchAll(/\{\s*id:\s*'([^']+)'\s*,\s*number:\s*'[^']+'\s*,\s*name:\s*'[^']+'\s*,\s*route:\s*'([^']+)'\s*,\s*section:\s*'[^']+'\s*,\s*status:\s*'([^']+)'/g)]

  return new Map(matches.map(match => {
    const routeFile = path.join(root, 'src/app', match[2].replace(/^\//, ''), 'page.tsx')
    return [routeFile, { id: match[1], route: match[2], status: match[3] }]
  }))
}

const screenStatuses = parseScreenStatuses()
const files = sourceRoots.flatMap(sourceRoot => walk(path.join(root, sourceRoot)))

function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '')
}

function isLowercaseFirst(value) {
  const firstVisible = value.trim().charAt(0)
  return Boolean(firstVisible && firstVisible >= 'a' && firstVisible <= 'z')
}

function isAllowedLowercase(value) {
  const normalized = value.trim().replace(/\s+/g, ' ')
  return (
    allowedLowercaseFragments.has(normalized) ||
    /^\d+(am|pm)$/i.test(normalized)
  )
}

function checkSentenceCase(relativePath, value, context) {
  const normalized = value.trim().replace(/\s+/g, ' ')
  if (!normalized || !/[A-Za-z]/.test(normalized)) return
  for (const term of toneBlacklist) {
    if (term.pattern.test(normalized)) {
      fail(`${relativePath} contains harsh or hype-led ${context} term "${term.label}" in "${normalized}"`)
    }
  }
  if (isLowercaseFirst(normalized) && !isAllowedLowercase(normalized)) {
    fail(`${relativePath} contains lowercase ${context} "${normalized}"`)
  }
}

function checkVisibleJsxText(relativePath, source) {
  const matches = [...source.matchAll(/>([^<>{}\n]*[A-Za-z][^<>{}\n]*)</g)]
  for (const match of matches) {
    if (source[match.index - 1] === '=') continue
    checkSentenceCase(relativePath, match[1], 'visible JSX text')
  }
}

function checkVisibleStringLiterals(relativePath, source) {
  const objectKeys = visibleLiteralKeys.join('|')
  const objectLiteralPattern = new RegExp(`\\b(${objectKeys})\\s*:\\s*(['"\`])([^'"\`]*[A-Za-z][^'"\`]*)\\2`, 'g')
  for (const match of source.matchAll(objectLiteralPattern)) {
    checkSentenceCase(relativePath, match[3], `${match[1]} string`)
  }

  const propKeys = visibleLiteralKeys.filter(key => key !== 'name').join('|')
  const propLiteralPattern = new RegExp(`\\b(${propKeys})\\s*=\\s*(['"\`])([^'"\`]*[A-Za-z][^'"\`]*)\\2`, 'g')
  for (const match of source.matchAll(propLiteralPattern)) {
    checkSentenceCase(relativePath, match[3], `${match[1]} string`)
  }
}

function checkDisplayArrays(relativePath, source) {
  const arrayPattern = /\b(filters|tags)\s*:\s*\[([^\]]*)\]/g
  for (const arrayMatch of source.matchAll(arrayPattern)) {
    for (const valueMatch of arrayMatch[2].matchAll(/(['"`])([^'"`]*[A-Za-z][^'"`]*)\1/g)) {
      checkSentenceCase(relativePath, valueMatch[2], `${arrayMatch[1]} array value`)
    }
  }
}

for (const filePath of files) {
  const relativePath = path.relative(root, filePath)
  const rawSource = fs.readFileSync(filePath, 'utf8')
  const source = stripComments(rawSource)
  const screen = screenStatuses.get(filePath)
  const isStartedScreen = screen && screen.status !== 'not-started'

  if (source.includes('Coming in a future batch')) {
    if (isStartedScreen) {
      fail(`${relativePath} still contains placeholder copy but is marked ${screen.status}`)
    } else {
      warn(`${relativePath} still contains placeholder copy`)
    }
  }

  const visibleExclamation = [...source.matchAll(/>([^<>{}\n]*!)</g)]
  for (const match of visibleExclamation) {
    if (source[match.index - 1] === '=') continue
    fail(`${relativePath} contains visible exclamation copy: "${match[1].trim()}"`)
  }

  const lowercaseButtonLabels = [...source.matchAll(/>(sign up|sign in|continue|verify|next|get started|skip|send code|send reset link|create mission|submit report|not now|cancel)</g)]
  for (const match of lowercaseButtonLabels) {
    fail(`${relativePath} contains lowercase action label "${match[1]}"`)
  }

  checkVisibleJsxText(relativePath, source)
  checkVisibleStringLiterals(relativePath, source)
  checkDisplayArrays(relativePath, source)
}

if (!process.exitCode) {
  console.log(`verify:copy passed (${files.length} files scanned)`)
}
