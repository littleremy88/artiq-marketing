/**
 * One-shot export: GTA-style 3×3 art wall + Artiq branding → PNG
 * Usage: node scripts/export-gta-hero.mjs
 */
import sharp from "sharp";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const WIDTH = 1920;
const HEIGHT = 1080;
const COLS = 3;
const ROWS = 3;
const GAP = 3;

/** Mix of local assets + Wikimedia tiles from the splash collage */
const artworks = [
  join(root, "src/assets/artwork-1.jpg"),
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tsunami_by_hokusai_19th_century.jpg/1280px-Tsunami_by_hokusai_19th_century.jpg",
  join(root, "src/assets/artwork-2.jpg"),
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/1280px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg",
  join(root, "src/assets/artwork-3.jpg"),
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/1280px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg",
  join(root, "src/assets/artwork-4.jpg"),
  join(root, "src/assets/artwork-5.jpg"),
];

const tileW = Math.floor((WIDTH - GAP * (COLS - 1)) / COLS);
const tileH = Math.floor((HEIGHT - GAP * (ROWS - 1)) / ROWS);

async function loadSource(src) {
  if (src.startsWith("http")) {
    const res = await fetch(src, {
      headers: { "User-Agent": "ArtiqMarketingExport/1.0 (local asset export)" },
    });
    if (!res.ok) throw new Error(`Fetch failed ${res.status}: ${src}`);
    return Buffer.from(await res.arrayBuffer());
  }
  return readFile(src);
}

async function coverTile(buf) {
  return sharp(buf)
    .rotate()
    .resize(tileW, tileH, { fit: "cover", position: "centre" })
    .jpeg({ quality: 90 })
    .toBuffer();
}

async function main() {
  console.log("Loading artworks…");
  const tiles = [];
  for (let i = 0; i < artworks.length; i++) {
    process.stdout.write(`  ${i + 1}/${artworks.length}\r`);
    const raw = await loadSource(artworks[i]);
    tiles.push(await coverTile(raw));
  }
  console.log("\nCompositing mosaic…");

  const composites = tiles.map((input, i) => {
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    return {
      input,
      left: col * (tileW + GAP),
      top: row * (tileH + GAP),
    };
  });

  const mosaic = await sharp({
    create: {
      width: WIDTH,
      height: HEIGHT,
      channels: 3,
      background: { r: 18, g: 18, b: 17 },
    },
  })
    .composite(composites)
    .png()
    .toBuffer();

  const scrim = Buffer.from(`
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="v" cx="50%" cy="45%" r="70%">
          <stop offset="0%" stop-color="rgb(28,28,26)" stop-opacity="0.15"/>
          <stop offset="55%" stop-color="rgb(28,28,26)" stop-opacity="0.55"/>
          <stop offset="100%" stop-color="rgb(28,28,26)" stop-opacity="0.92"/>
        </radialGradient>
        <linearGradient id="b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgb(28,28,26)" stop-opacity="0.35"/>
          <stop offset="50%" stop-color="rgb(28,28,26)" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="rgb(28,28,26)" stop-opacity="0.88"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#v)"/>
      <rect width="100%" height="100%" fill="url(#b)"/>
    </svg>
  `);

  const brand = Buffer.from(`
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <style>
        .title { font-family: Georgia, 'Times New Roman', serif; font-weight: 600; fill: #F3EBDD; }
        .sub { font-family: Georgia, 'Times New Roman', serif; font-weight: 500; fill: #F3EBDD; fill-opacity: 0.9; }
        .body { font-family: system-ui, -apple-system, sans-serif; fill: #F3EBDD; fill-opacity: 0.62; }
      </style>
      <text x="96" y="720" class="title" font-size="96" letter-spacing="2">Artiq</text>
      <text x="96" y="790" class="sub" font-size="40">Discover &amp; collect art in a scrolling gallery.</text>
      <text x="96" y="840" class="body" font-size="24">Discover • Collect • Connect</text>
    </svg>
  `);

  const logoPath = join(root, "src/assets/artiq-logo.png");
  const logo = await sharp(logoPath)
    .resize(120, 120, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const finalBuf = await sharp(mosaic)
    .composite([
      { input: scrim, left: 0, top: 0 },
      { input: logo, left: 96, top: 560 },
      { input: brand, left: 0, top: 0 },
    ])
    .png()
    .toBuffer();

  const outDir = join(root, "exports");
  const publicDir = join(root, "public/exports");
  const desktopOut = join(
    "/Users/jimmymartin/Desktop/Artiq",
    "artiq-gta-hero.png"
  );

  await mkdir(outDir, { recursive: true });
  await mkdir(publicDir, { recursive: true });

  const projectOut = join(outDir, "artiq-gta-hero.png");
  const publicOut = join(publicDir, "artiq-gta-hero.png");

  await writeFile(projectOut, finalBuf);
  await writeFile(publicOut, finalBuf);
  await writeFile(desktopOut, finalBuf);

  console.log("Saved:");
  console.log(" ", projectOut);
  console.log(" ", publicOut);
  console.log(" ", desktopOut);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
