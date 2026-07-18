import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const hifiDir = path.resolve(root, '../Balencia-New-Screens/hifi-screens')
const ledgerFile = path.join(hifiDir, '_HIFI-LEDGER.md')
const screensFile = path.join(root, 'src/data/screens.ts')
const specsFile = path.join(root, 'scripts/screen-specs.mjs')

const batchAIds = new Set(['09', '12', '13', '16', '48', '63', '66', '75', '89', '91'])

const nameOverrides = new Map([
  ['13', 'Mission Board'],
  ['14', 'Mission detail'],
  ['15', 'Create or edit mission'],
  ['20', 'Personal wiki and CIA memory'],
  ['43', 'Paywall upgrade'],
])

const sectionRules = [
  ['Auth & onboarding', new Set(['01', '02', '03', '03b', '03c', '03d', '03e', '04', '05', '05b', '06', '07', '08', '65', '66'])],
  ['CIA, voice & chat', new Set(['09', '10', '11', '51', '74', '75', '76', '77', '79', '99'])],
  ['Today & missions', new Set(['12', '13', '14', '15', '41', '44', '45', '59', '61', '73', '97'])],
  ['Life intelligence', new Set(['16', '20', '48', '72', '84', '90', '92', '93', '96'])],
  ['Profile & settings', new Set(['17', '18', '19', '21', '22', '23', '24', '25', '42', '43', '50', '68', '71', '83'])],
  ['Health & wellbeing', new Set(['26', '27', '28', '29', '49', '52', '53', '54', '55', '56', '57', '58', '60', '62', '63', '70', '86', '87', '88', '89'])],
  ['Domains & money', new Set(['30', '31', '32', '33', '34', '35', '36', '37', '38'])],
  ['Social & community', new Set(['39', '40', '46', '47', '64', '78', '82', '91', '94', '95'])],
  ['System & media', new Set(['67', '69', '80', '81', '85', '98'])],
]

function screenIdFromFile(fileName) {
  return fileName.match(/^(\d{2}[a-z]?)-/)?.[1]
}

function titleCaseFromSlug(slug) {
  return slug
    .split('-')
    .map(part => {
      const lower = part.toLowerCase()
      if (lower === 'cia') return 'CIA'
      if (lower === 'rpg') return 'RPG'
      if (lower === 'otp') return 'OTP'
      if (lower === 'whatsapp') return 'WhatsApp'
      return lower.charAt(0).toUpperCase() + lower.slice(1)
    })
    .join(' ')
    .replace(/\bGoals\b/g, 'Missions')
    .replace(/\bGoal\b/g, 'Mission')
}

function nameFromFile(fileName, id) {
  if (nameOverrides.has(id)) return nameOverrides.get(id)
  return titleCaseFromSlug(fileName.replace(/\.md$/, '').replace(`${id}-`, ''))
}

function sectionFor(id) {
  for (const [section, ids] of sectionRules) {
    if (ids.has(id)) return section
  }
  return 'System & media'
}

function cleanLedgerCell(value = '') {
  const cleaned = value.replaceAll('`', '').replace(/\s+/g, ' ').trim()
  if (!cleaned) return ''
  if (/^[a-z]/.test(cleaned)) return cleaned.charAt(0).toUpperCase() + cleaned.slice(1)
  return cleaned
}

function parseLedger() {
  const ledger = fs.readFileSync(ledgerFile, 'utf8')
  const rows = new Map()
  for (const line of ledger.split('\n')) {
    if (!/^\|\s*\d{2}/.test(line)) continue
    const cells = line.split('|').slice(1, -1).map(cell => cell.trim())
    const [id, hifiCell, , routes, status, assetNeeds, gateNotes] = cells
    const hifiFile = hifiCell.match(/`([^`]+)`/)?.[1]
    if (!id || !hifiFile) continue
    rows.set(id, {
      sourceRoutes: cleanLedgerCell(routes),
      conversionStatus: cleanLedgerCell(status),
      assetNeeds: cleanLedgerCell(assetNeeds),
      gateNotes: cleanLedgerCell(gateNotes),
    })
  }
  return rows
}

function sortIds(a, b) {
  const aBase = Number.parseInt(a, 10)
  const bBase = Number.parseInt(b, 10)
  if (aBase !== bBase) return aBase - bBase
  return a.localeCompare(b)
}

const specFiles = fs.readdirSync(hifiDir)
  .filter(fileName => /^\d{2}[a-z]?-.+\.md$/.test(fileName))
  .sort((a, b) => sortIds(screenIdFromFile(a) ?? a, screenIdFromFile(b) ?? b))

const ledgerRows = parseLedger()

if (specFiles.length !== 104) {
  throw new Error(`Expected 104 hi-fi screen specs, found ${specFiles.length}`)
}

const screens = specFiles.map(specFile => {
  const id = screenIdFromFile(specFile)
  if (!id) throw new Error(`Unable to parse screen id from ${specFile}`)
  const ledger = ledgerRows.get(id)
  return {
    id,
    number: id,
    name: nameFromFile(specFile, id),
    route: `/screens/${id}`,
    section: sectionFor(id),
    status: batchAIds.has(id) ? 'complete' : 'not-started',
    specFile,
    sourceRoutes: ledger?.sourceRoutes ?? '',
    conversionStatus: ledger?.conversionStatus ?? '',
    assetNeeds: ledger?.assetNeeds ?? '',
    gateNotes: ledger?.gateNotes ?? '',
  }
})

const sections = [...new Set(screens.map(screen => screen.section))]

function quoted(value) {
  return `'${String(value).replaceAll('\\', '\\\\').replaceAll("'", "\\'")}'`
}

const screensTs = `export interface ScreenInfo {
  id: string
  number: string
  name: string
  route: string
  section: string
  status: 'complete' | 'in-progress' | 'not-started'
  specFile: string
  sourceRoutes: string
  conversionStatus: string
  assetNeeds: string
  gateNotes: string
}

export const expectedScreenCount = 104

export const batchAReferenceIds = [
${[...batchAIds].sort(sortIds).map(id => `  ${quoted(id)},`).join('\n')}
] as const

export const sections = [
${sections.map(section => `  ${quoted(section)},`).join('\n')}
] as const

export const screens: ScreenInfo[] = [
${screens.map(screen => `  { id: ${quoted(screen.id)}, number: ${quoted(screen.number)}, name: ${quoted(screen.name)}, route: ${quoted(screen.route)}, section: ${quoted(screen.section)}, status: ${quoted(screen.status)}, specFile: ${quoted(screen.specFile)}, sourceRoutes: ${quoted(screen.sourceRoutes)}, conversionStatus: ${quoted(screen.conversionStatus)}, assetNeeds: ${quoted(screen.assetNeeds)}, gateNotes: ${quoted(screen.gateNotes)} },`).join('\n')}
]

export function getScreensBySection() {
  const grouped: Record<string, ScreenInfo[]> = {}
  for (const screen of screens) {
    if (!grouped[screen.section]) grouped[screen.section] = []
    grouped[screen.section].push(screen)
  }
  return grouped
}

export function getScreenByRoute(route: string) {
  return screens.find(s => s.route === route)
}

export function getScreenById(id: string) {
  return screens.find(s => s.id === id)
}
`

const specsMjs = `export const expectedScreenCount = 104

export const specRoot = '../Balencia-New-Screens/hifi-screens'

export const screenSpecs = {
${screens.map(screen => `  ${quoted(screen.id)}: ${quoted(screen.specFile)},`).join('\n')}
}

export const sharedSpecFiles = [
  '_HIFI-LEDGER.md',
  '_IMAGE-SLOTS.md',
]
`

fs.writeFileSync(screensFile, screensTs)
fs.writeFileSync(specsFile, specsMjs)

console.log(`Generated ${screens.length} screens from ${path.relative(root, hifiDir)}`)
