// Generates a seamless tiling pattern from GPK sticker assets
// Run: npx tsx scripts/generate-pattern.ts

import sharp from "sharp";
import path from "path";

const TILE_SIZE = 900;
const ICON_SIZE = 80;
const OPACITY = 0.08; // 8% opacity — very subtle
const ICONS_DIR = path.resolve(__dirname, "../../icons");
const OUT = path.resolve(__dirname, "../public/gpk-pattern-tile.png");

const stickers = [
  "sticker_ooze.png",
  "sticker_smile.png",
  "sticker_boom.png",
  "sticker_slime_v.png",
  "sticker_tentacles.png",
];

// Even grid with slight offsets for organic feel
// 6 columns x 6 rows, staggered every other row
function generatePlacements(): [number, number, number][] {
  const cols = 6;
  const rows = 6;
  const spacingX = TILE_SIZE / cols;
  const spacingY = TILE_SIZE / rows;
  const placements: [number, number, number][] = []; // x, y, stickerIdx

  let stickerIdx = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Center of cell
      let x = Math.round(col * spacingX + spacingX / 2);
      let y = Math.round(row * spacingY + spacingY / 2);

      // Stagger odd rows by half a cell
      if (row % 2 === 1) {
        x += Math.round(spacingX / 2);
        if (x >= TILE_SIZE) x -= TILE_SIZE;
      }

      // Small random-ish offset for organic feel (deterministic based on position)
      const seed = (row * 7 + col * 13) % 20;
      x += (seed - 10) * 1.5;
      y += ((seed * 3) % 20 - 10) * 1.2;

      placements.push([x, y, stickerIdx % stickers.length]);
      stickerIdx++;
    }
  }

  return placements;
}

async function generate() {
  console.log("Generating seamless pattern tile...");

  // Pre-load stickers
  const stickerBuffers: Buffer[] = [];
  for (const name of stickers) {
    const buf = await sharp(path.join(ICONS_DIR, name))
      .resize(ICON_SIZE * 2, ICON_SIZE * 2, { fit: "inside" })
      .ensureAlpha()
      .png()
      .toBuffer();
    stickerBuffers.push(buf);
  }

  const placements = generatePlacements();
  const composites: sharp.OverlayOptions[] = [];

  // For seamless tiling, also render wrapped versions of edge icons
  const allPlacements: [number, number, number][] = [];
  for (const [x, y, idx] of placements) {
    allPlacements.push([x, y, idx]);
    // Wrap edges
    if (x < ICON_SIZE) allPlacements.push([x + TILE_SIZE, y, idx]);
    if (x > TILE_SIZE - ICON_SIZE) allPlacements.push([x - TILE_SIZE, y, idx]);
    if (y < ICON_SIZE) allPlacements.push([x, y + TILE_SIZE, idx]);
    if (y > TILE_SIZE - ICON_SIZE) allPlacements.push([x, y - TILE_SIZE, idx]);
  }

  for (const [x, y, stickerIdx] of allPlacements) {
    // Vary size slightly per icon
    const sizeSeed = (Math.round(x) * 3 + Math.round(y) * 7) % 10;
    const size = Math.round(ICON_SIZE * (0.85 + sizeSeed * 0.03));

    const resized = await sharp(stickerBuffers[stickerIdx])
      .resize(size, size, { fit: "inside" })
      .modulate({ saturation: 0.25, brightness: 1.15 })
      .ensureAlpha(OPACITY)
      .png()
      .toBuffer();

    const meta = await sharp(resized).metadata();
    const w = meta.width ?? size;
    const h = meta.height ?? size;

    let left = Math.round(x - w / 2);
    let top = Math.round(y - h / 2);

    // Skip if entirely outside
    if (left + w < 0 || left >= TILE_SIZE || top + h < 0 || top >= TILE_SIZE) continue;

    // Clip to bounds
    if (left < 0 || top < 0 || left + w > TILE_SIZE || top + h > TILE_SIZE) {
      const eL = Math.max(0, -left);
      const eT = Math.max(0, -top);
      const eW = Math.min(w - eL, TILE_SIZE - Math.max(0, left));
      const eH = Math.min(h - eT, TILE_SIZE - Math.max(0, top));
      if (eW <= 0 || eH <= 0) continue;

      const cropped = await sharp(resized)
        .extract({ left: eL, top: eT, width: eW, height: eH })
        .png()
        .toBuffer();

      composites.push({ input: cropped, left: Math.max(0, left), top: Math.max(0, top) });
    } else {
      composites.push({ input: resized, left, top });
    }
  }

  await sharp({
    create: {
      width: TILE_SIZE,
      height: TILE_SIZE,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite(composites)
    .png()
    .toFile(OUT);

  console.log(`✓ Saved ${OUT} (${TILE_SIZE}x${TILE_SIZE}, ${composites.length} icons)`);
}

generate().catch(console.error);
