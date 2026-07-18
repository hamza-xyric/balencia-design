import fs from 'node:fs'
import path from 'node:path'
import { expectedScreenCount, screenSpecs, sharedSpecFiles, specRoot } from './screen-specs.mjs'

const root = process.cwd()
const appDir = path.join(root, 'src/app')
const screensFile = path.join(root, 'src/data/screens.ts')
const specDirs = [
  path.resolve(root, specRoot),
]
let warningCount = 0

function fail(message) {
  console.error(`verify:routes failed: ${message}`)
  process.exitCode = 1
}

function warn(message) {
  warningCount += 1
  console.warn(`verify:routes warning: ${message}`)
}

function findSpecFile(specName) {
  for (const specDir of specDirs) {
    const specFile = path.join(specDir, specName)
    if (fs.existsSync(specFile)) return specFile
  }
  return null
}

function routeFileFor(route) {
  if (/^\/screens\/[^/]+$/.test(route)) {
    return path.join(appDir, 'screens/[id]/page.tsx')
  }

  return path.join(appDir, route.replace(/^\//, ''), 'page.tsx')
}

function parseScreens() {
  const source = fs.readFileSync(screensFile, 'utf8')
  const matches = [...source.matchAll(/\{\s*id:\s*'([^']+)'\s*,\s*number:\s*'([^']+)'\s*,\s*name:\s*'([^']+)'\s*,\s*route:\s*'([^']+)'/g)]

  return matches.map(match => ({
    id: match[1],
    number: match[2],
    name: match[3],
    route: match[4],
  }))
}

const screens = parseScreens()
const routeSet = new Set()
const idSet = new Set()

if (screens.length !== expectedScreenCount) {
  fail(`expected ${expectedScreenCount} screens in src/data/screens.ts, found ${screens.length}`)
}

for (const screen of screens) {
  if (idSet.has(screen.id)) fail(`duplicate screen id "${screen.id}"`)
  idSet.add(screen.id)

  if (routeSet.has(screen.route)) fail(`duplicate route "${screen.route}"`)
  routeSet.add(screen.route)

  const routeFile = routeFileFor(screen.route)
  if (!fs.existsSync(routeFile)) {
    fail(`missing route file for ${screen.id} ${screen.route}: ${path.relative(root, routeFile)}`)
  }

  if (/^\/screens\//.test(screen.route) && screen.route !== `/screens/${screen.id}`) {
    fail(`screen ${screen.id} route must be /screens/${screen.id}, found ${screen.route}`)
  }

  const specName = screenSpecs[screen.id]
  if (!specName) {
    fail(`missing spec mapping for screen ${screen.id}`)
    continue
  }

  if (!findSpecFile(specName)) warn(`missing spec file for ${screen.id}: ${specName}`)
}

for (const [id, specName] of Object.entries(screenSpecs)) {
  if (!idSet.has(id)) fail(`screen spec map includes ${id}, but src/data/screens.ts does not`)
  if (!findSpecFile(specName)) warn(`missing mapped spec file: ${specName}`)
}

for (const specName of sharedSpecFiles) {
  if (!findSpecFile(specName)) warn(`missing shared spec file: ${specName}`)
}

const activeSpecFiles = fs.readdirSync(path.resolve(root, specRoot))
  .filter(fileName => /^\d{2}[a-z]?-.+\.md$/.test(fileName))
if (activeSpecFiles.length !== expectedScreenCount) {
  fail(`expected ${expectedScreenCount} active hi-fi specs, found ${activeSpecFiles.length}`)
}

// Hi-fi registry coverage: a screen with implementation status must have a
// registry entry in src/components/hifi/screens/<family>/index.ts, and every
// registry entry must map to a screen that is at least in progress.
const hifiScreensDir = path.join(root, 'src/components/hifi/screens')
const registryIds = new Set()
if (fs.existsSync(hifiScreensDir)) {
  for (const family of fs.readdirSync(hifiScreensDir, { withFileTypes: true })) {
    if (!family.isDirectory()) continue
    const indexFile = path.join(hifiScreensDir, family.name, 'index.ts')
    if (!fs.existsSync(indexFile)) continue
    const indexSource = fs.readFileSync(indexFile, 'utf8')
    for (const match of indexSource.matchAll(/'(\d{2}[a-z]?)':/g)) {
      if (registryIds.has(match[1])) fail(`duplicate hi-fi registry entry for screen ${match[1]}`)
      registryIds.add(match[1])
    }
  }
}

const statusById = new Map(
  [...fs.readFileSync(screensFile, 'utf8').matchAll(/\{\s*id:\s*'([^']+)'[^}]*?status:\s*'([^']+)'/g)]
    .map(match => [match[1], match[2]])
)
for (const [id, status] of statusById) {
  if (status !== 'not-started' && !registryIds.has(id)) {
    fail(`screen ${id} has status "${status}" but no hi-fi registry entry`)
  }
}
for (const id of registryIds) {
  if (!statusById.has(id)) {
    fail(`hi-fi registry has entry for unknown screen id ${id}`)
  } else if (statusById.get(id) === 'not-started') {
    fail(`hi-fi registry has entry for ${id} but screens.ts status is "not-started"`)
  }
}

if (!process.exitCode) {
  const warningSuffix = warningCount > 0 ? `, ${warningCount} spec warnings` : ''
  console.log(`verify:routes passed (${screens.length} screens, ${Object.keys(screenSpecs).length} specs${warningSuffix})`)
}
