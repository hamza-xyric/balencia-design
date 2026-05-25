import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const sourceLogoDir = path.resolve(root, '../Balencia/Balencia-Creatives-Reference/logos')
const publicLogoDir = path.join(root, 'public/logos')
const hasSourceLogoDir = fs.existsSync(sourceLogoDir)
let warningCount = 0

const requiredLogoFiles = [
  'Logo Mark.svg',
  'Frame 2147239943.svg',
  'logo mark png.png',
  'Balencia white PNG.png',
  'Balencia black png.png',
  'Balencia white.jpg',
  'Balencia black.jpg',
  'Background+Border.jpg',
  'Background+Border-1.jpg',
  'Background+Border-2.jpg',
  'Background+Border-3.jpg',
  'Background+Border-4.jpg',
  'Background+Border-5.jpg',
  'Background+Border-6.jpg',
]

function fail(message) {
  console.error(`verify:assets failed: ${message}`)
  process.exitCode = 1
}

function warn(message) {
  warningCount += 1
  console.warn(`verify:assets warning: ${message}`)
}

if (!hasSourceLogoDir) {
  warn(`source logo directory unavailable: ${path.relative(path.resolve(root, '..'), sourceLogoDir)}`)
}

for (const fileName of requiredLogoFiles) {
  const sourceFile = path.join(sourceLogoDir, fileName)
  const publicFile = path.join(publicLogoDir, fileName)

  if (!fs.existsSync(publicFile)) {
    fail(`missing public logo asset: ${path.relative(root, publicFile)}`)
    continue
  }

  if (hasSourceLogoDir) {
    if (!fs.existsSync(sourceFile)) {
      fail(`missing source logo asset: ${path.relative(path.resolve(root, '..'), sourceFile)}`)
      continue
    }

    const sourceSize = fs.statSync(sourceFile).size
    const publicSize = fs.statSync(publicFile).size
    if (sourceSize !== publicSize) {
      fail(`public logo asset size differs from source: ${fileName}`)
    }
  }
}

const lockupSvgPath = path.join(publicLogoDir, 'Frame 2147239943.svg')
if (fs.existsSync(lockupSvgPath)) {
  const lockupSvg = fs.readFileSync(lockupSvgPath, 'utf8')
  if (!lockupSvg.includes('#FF6704') && !lockupSvg.includes('#FF5E00')) {
    fail('official lockup svg does not contain an orange mark or brand period accent')
  }
  if (!lockupSvg.includes('fill="white"')) {
    fail('official lockup svg does not contain the white wordmark for dark backgrounds')
  }
}

if (!process.exitCode) {
  const warningSuffix = warningCount > 0 ? `, ${warningCount} warning` : ''
  console.log(`verify:assets passed (${requiredLogoFiles.length} logo assets${warningSuffix})`)
}
