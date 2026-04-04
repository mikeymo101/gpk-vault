// Generates a seamless tiling pattern from GPK sticker assets
// Run: npx tsx scripts/generate-pattern.ts

import sharp from "sharp";
import path from "path";

const TILE_SIZE = 1000;
const ICON_SIZE = 120; // 50% bigger than before
const OPACITY = 0.07; // 7% — very faint watermark
const ICONS_DIR = path.resolve(__dirname, "../../icons");
const OUT = path.resolve(__dirname, "../public/gpk-pattern-tile.png");

// All 8 icons
const stickers = [
  "sticker_ooze.png",
  "sticker_smile.png",
  "sticker_boom.png",
  "sticker_slime_v.png",
  "sticker_tentacles.png",
  "Check.png",
  "Trade.png",
  "Badge.png",
];

// Seeded pseudo-random for deterministic but random-looking results
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// Generate evenly-distributed random placements where same icons are never near each other
function generatePlacements(): [number, number, number][] {
  const rng = seededRandom(77);
  const minDist = 150; // minimum distance between ANY icons
  const minSameIconDist = 350; // minimum distance between SAME icon type
  const placements: [number, number, number][] = [];
  const maxAttempts = 5000;
  const targetCount = 36;

  // Toroidal distance (wraps around edges)
  function toroidalDist(x1: number, y1: number, x2: number, y2: number): number {
    let dx = Math.abs(x1 - x2);
    let dy = Math.abs(y1 - y2);
    if (dx > TILE_SIZE / 2) dx = TILE_SIZE - dx;
    if (dy > TILE_SIZE / 2) dy = TILE_SIZE - dy;
    return Math.sqrt(dx * dx + dy * dy);
  }

  for (let i = 0; i < maxAttempts && placements.length < targetCount; i++) {
    const x = rng() * TILE_SIZE;
    const y = rng() * TILE_SIZE;

    // Check minimum distance to all existing icons
    let tooClose = false;
    for (const [px, py] of placements) {
      if (toroidalDist(x, y, px, py) < minDist) {
        tooClose = true;
        break;
      }
    }
    if (tooClose) continue;

    // Pick a sticker that isn't too close to another of the same type
    // Shuffle sticker indices and pick the first valid one
    const indices = Array.from({ length: stickers.length }, (_, i) => i);
    // Fisher-Yates shuffle
    for (let j = indices.length - 1; j > 0; j--) {
      const k = Math.floor(rng() * (j + 1));
      [indices[j], indices[k]] = [indices[k], indices[j]];
    }

    let chosenIdx = -1;
    for (const idx of indices) {
      const sameIconTooClose = placements.some(
        ([px, py, pidx]) => pidx === idx && toroidalDist(x, y, px, py) < minSameIconDist
      );
      if (!sameIconTooClose) {
        chosenIdx = idx;
        break;
      }
    }

    // If no icon works (unlikely), skip this position
    if (chosenIdx === -1) continue;

    placements.push([Math.round(x), Math.round(y), chosenIdx]);
  }

  return placements;
}

// Actually reduce opacity by compositing with a semi-transparent mask
async function fadeImage(buf: Buffer, opacity: number): Promise<Buffer> {
  const meta = await sharp(buf).metadata();
  const w = meta.width!;
  const h = meta.height!;

  // Create a semi-transparent overlay to multiply alpha
  const mask = await sharp({
    create: {
      width: w,
      height: h,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: opacity },
    },
  }).png().toBuffer();

  // Use dest-in blend: keeps source pixels but uses mask's alpha
  return sharp(buf)
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();
}

async function generate() {
  console.log("Generating seamless pattern tile...");
  console.log(`Icons: ${stickers.length}, Size: ${ICON_SIZE}px, Opacity: ${OPACITY * 100}%`);

  // Pre-load stickers at high res
  const stickerBuffers: Buffer[] = [];
  for (const name of stickers) {
    const buf = await sharp(path.join(ICONS_DIR, name))
      .resize(ICON_SIZE * 2, ICON_SIZE * 2, { fit: "inside" })
      .png()
      .toBuffer();
    stickerBuffers.push(buf);
  }

  const placements = generatePlacements();
  console.log(`Placed ${placements.length} icons`);

  const composites: sharp.OverlayOptions[] = [];

  // For seamless tiling, render wrapped copies of edge icons
  const allPlacements: [number, number, number][] = [];
  for (const [x, y, idx] of placements) {
    allPlacements.push([x, y, idx]);
    // Wrap all 4 edges + corners
    for (const dx of [-TILE_SIZE, 0, TILE_SIZE]) {
      for (const dy of [-TILE_SIZE, 0, TILE_SIZE]) {
        if (dx === 0 && dy === 0) continue;
        const nx = x + dx;
        const ny = y + dy;
        // Only include if it would overlap the tile
        if (nx + ICON_SIZE > 0 && nx - ICON_SIZE < TILE_SIZE &&
            ny + ICON_SIZE > 0 && ny - ICON_SIZE < TILE_SIZE) {
          allPlacements.push([nx, ny, idx]);
        }
      }
    }
  }

  for (const [x, y, stickerIdx] of allPlacements) {
    // Vary size slightly using position as seed
    const sizeSeed = ((x * 7 + y * 13) % 20) / 100;
    const size = Math.round(ICON_SIZE * (0.9 + sizeSeed));

    // Resize and desaturate
    const resized = await sharp(stickerBuffers[stickerIdx])
      .resize(size, size, { fit: "inside" })
      .modulate({ saturation: 0.2, brightness: 1.2 })
      .png()
      .toBuffer();

    // Apply real opacity reduction
    const faded = await fadeImage(resized, OPACITY);

    const meta = await sharp(faded).metadata();
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

      const cropped = await sharp(faded)
        .extract({ left: eL, top: eT, width: eW, height: eH })
        .png()
        .toBuffer();

      composites.push({ input: cropped, left: Math.max(0, left), top: Math.max(0, top) });
    } else {
      composites.push({ input: faded, left, top });
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

  console.log(`✓ Saved ${OUT} (${TILE_SIZE}x${TILE_SIZE}, ${composites.length} composites)`);
}

generate().catch(console.error);
