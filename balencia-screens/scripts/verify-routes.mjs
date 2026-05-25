import fs from 'node:fs'
import path from 'node:path'
import { expectedScreenCount, screenSpecs, sharedSpecFiles } from './screen-specs.mjs'

const root = process.cwd()
const appDir = path.join(root, 'src/app')
const screensFile = path.join(root, 'src/data/screens.ts')
const specDirs = [
  path.resolve(root, '../app_design 3'),
  path.resolve(root, '../app_design'),
  path.resolve(root, '../Screen-Drafts'),
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

  const routeFile = path.join(appDir, screen.route.replace(/^\//, ''), 'page.tsx')
  if (!fs.existsSync(routeFile)) {
    fail(`missing route file for ${screen.id} ${screen.route}: ${path.relative(root, routeFile)}`)
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

if (!process.exitCode) {
  const warningSuffix = warningCount > 0 ? `, ${warningCount} spec warnings` : ''
  console.log(`verify:routes passed (${screens.length} screens, ${Object.keys(screenSpecs).length} specs${warningSuffix})`)
}
