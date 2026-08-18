// Regenerates every favicon / app icon in public/ from the canonical brand logo.
// Run manually on macOS (`node scripts/generate-icons.mjs`) and commit the output;
// this depends on `sips`, so it is not part of the Linux CI build.

import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const source = join(root, 'src/assets/artiq-logo.png')
const publicDir = join(root, 'public')

// The logo is a 1024px rounded card centred on a black field. Trimming the
// surrounding margin keeps the artwork legible at 16px favicon sizes.
const CARD_SIZE = 928

const PNG_TARGETS = [
  { size: 16, name: 'favicon-16.png' },
  { size: 32, name: 'favicon-32.png' },
  { size: 32, name: 'favicon.png' },
  { size: 48, name: 'favicon-48.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'icon-192.png' },
  { size: 512, name: 'icon-512.png' },
]

// Social preview is served as JPEG: the same image as PNG is ~1.7MB, which some
// scrapers refuse to fetch.
const OG_TARGET = { size: 1024, name: 'og-image.jpg', quality: 82 }

const ICO_SIZES = [16, 32, 48]

const sips = (...args) => execFileSync('sips', args, { stdio: 'pipe' })

/**
 * Packs PNGs into an .ico container. Entries store PNG data directly, which
 * every browser and the Google favicon crawler decode natively.
 */
function buildIco(pngs) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // 1 = icon
  header.writeUInt16LE(pngs.length, 4)

  const directory = Buffer.alloc(16 * pngs.length)
  let offset = header.length + directory.length

  pngs.forEach(({ size, data }, index) => {
    const entry = index * 16
    directory.writeUInt8(size >= 256 ? 0 : size, entry + 0)
    directory.writeUInt8(size >= 256 ? 0 : size, entry + 1)
    directory.writeUInt8(0, entry + 2) // palette size
    directory.writeUInt8(0, entry + 3) // reserved
    directory.writeUInt16LE(1, entry + 4) // colour planes
    directory.writeUInt16LE(32, entry + 6) // bits per pixel
    directory.writeUInt32LE(data.length, entry + 8)
    directory.writeUInt32LE(offset, entry + 12)
    offset += data.length
  })

  return Buffer.concat([header, directory, ...pngs.map((png) => png.data)])
}

const work = mkdtempSync(join(tmpdir(), 'artiq-icons-'))

try {
  const card = join(work, 'card.png')
  sips('-c', String(CARD_SIZE), String(CARD_SIZE), source, '--out', card)

  const render = (size, destination) => {
    sips('-z', String(size), String(size), card, '--out', destination)
    return readFileSync(destination)
  }

  for (const { size, name } of PNG_TARGETS) {
    render(size, join(publicDir, name))
    console.log(`wrote public/${name} (${size}px)`)
  }

  const ogSource = join(work, 'og.png')
  sips('-z', String(OG_TARGET.size), String(OG_TARGET.size), card, '--out', ogSource)
  sips(
    '-s', 'format', 'jpeg',
    '-s', 'formatOptions', String(OG_TARGET.quality),
    ogSource, '--out', join(publicDir, OG_TARGET.name),
  )
  console.log(`wrote public/${OG_TARGET.name} (${OG_TARGET.size}px)`)

  const icoPngs = ICO_SIZES.map((size) => ({
    size,
    data: render(size, join(work, `ico-${size}.png`)),
  }))

  writeFileSync(join(publicDir, 'favicon.ico'), buildIco(icoPngs))
  console.log(`wrote public/favicon.ico (${ICO_SIZES.join(', ')}px)`)
} finally {
  rmSync(work, { recursive: true, force: true })
}
