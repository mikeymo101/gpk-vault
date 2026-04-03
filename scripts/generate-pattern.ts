// Generates a seamless tiling pattern from GPK sticker assets
// Run: npx tsx scripts/generate-pattern.ts

import sharp from "sharp";
import path from "path";

const TILE_SIZE = 800;
const ICON_SIZE = 90;
const ICONS_DIR = path.resolve(__dirname, "../../icons");
const OUT = path.resolve(__dirname, "../public/gpk-pattern-tile.png");

const stickers = [
  "sticker_ooze.png",
  "sticker_smile.png",
  "sticker_boom.png",
  "sticker_slime_v.png",
  "sticker_tentacles.png",
];

// Placement grid — [x, y, stickerIndex, sizeMult]
// Spread evenly with slight offsets for organic feel
const placements: [number, number, number, number][] = [
  // Row 1
  [70, 60, 0, 0.9],
  [230, 40, 3, 0.8],
  [400, 70, 1, 0.85],
  [560, 45, 4, 0.9],
  [720, 65, 2, 0.8],

  // Row 2
  [140, 200, 2, 0.85],
  [330, 190, 0, 0.8],
  [500, 210, 3, 0.9],
  [680, 185, 1, 0.85],

  // Row 3
  [60, 340, 4, 0.8],
  [240, 360, 1, 0.9],
  [420, 330, 2, 0.85],
  [590, 355, 0, 0.8],
  [750, 340, 3, 0.9],

  // Row 4
  [150, 490, 3, 0.85],
  [340, 510, 4, 0.8],
  [510, 480, 1, 0.9],
  [690, 500, 2, 0.85],

  // Row 5
  [70, 640, 1, 0.8],
  [250, 660, 2, 0.85],
  [430, 635, 4, 0.9],
  [600, 655, 3, 0.8],
  [760, 640, 0, 0.85],

  // Edge wrapping: icons near edges duplicated on opposite side
  // Top edge icons also at bottom
  [70, 60 + TILE_SIZE, 0, 0.9],
  [230, 40 + TILE_SIZE, 3, 0.8],
  [400, 70 + TILE_SIZE, 1, 0.85],
  [560, 45 + TILE_SIZE, 4, 0.9],
  [720, 65 + TILE_SIZE, 2, 0.8],
  // Bottom edge icons also at top
  [70, 640 - TILE_SIZE, 1, 0.8],
  [250, 660 - TILE_SIZE, 2, 0.85],
  [430, 635 - TILE_SIZE, 4, 0.9],
  [600, 655 - TILE_SIZE, 3, 0.8],
  [760, 640 - TILE_SIZE, 0, 0.85],
  // Left edge icons also at right
  [60 + TILE_SIZE, 340, 4, 0.8],
  [70 + TILE_SIZE, 640, 1, 0.8],
  [70 + TILE_SIZE, 60, 0, 0.9],
  // Right edge icons also at left
  [750 - TILE_SIZE, 340, 3, 0.9],
  [760 - TILE_SIZE, 640, 0, 0.85],
  [720 - TILE_SIZE, 65, 2, 0.8],
];

async function generate() {
  console.log("Generating seamless pattern tile...");

  // Pre-load and resize stickers
  const stickerBuffers: Buffer[] = [];
  for (const name of stickers) {
    const buf = await sharp(path.join(ICONS_DIR, name))
      .resize(ICON_SIZE * 2, ICON_SIZE * 2, { fit: "inside" })
      .ensureAlpha()
      .png()
      .toBuffer();
    stickerBuffers.push(buf);
  }

  // Build composite list
  const composites: sharp.OverlayOptions[] = [];

  for (const [x, y, stickerIdx, sizeMult] of placements) {
    const size = Math.round(ICON_SIZE * sizeMult);

    // Resize to target size and reduce saturation for watermark look
    const resized = await sharp(stickerBuffers[stickerIdx])
      .resize(size, size, { fit: "inside" })
      .modulate({ saturation: 0.35, brightness: 1.1 })
      .ensureAlpha(0.15)  // 15% opacity
      .png()
      .toBuffer();

    const meta = await sharp(resized).metadata();
    const w = meta.width ?? size;
    const h = meta.height ?? size;

    // Center the icon on the placement point, clip to tile bounds
    let left = Math.round(x - w / 2);
    let top = Math.round(y - h / 2);

    // Skip if entirely outside tile
    if (left + w < 0 || left >= TILE_SIZE || top + h < 0 || top >= TILE_SIZE) continue;

    // Clip to tile bounds
    if (left < 0 || top < 0 || left + w > TILE_SIZE || top + h > TILE_SIZE) {
      const extractLeft = Math.max(0, -left);
      const extractTop = Math.max(0, -top);
      const extractWidth = Math.min(w - extractLeft, TILE_SIZE - Math.max(0, left));
      const extractHeight = Math.min(h - extractTop, TILE_SIZE - Math.max(0, top));

      if (extractWidth <= 0 || extractHeight <= 0) continue;

      const cropped = await sharp(resized)
        .extract({ left: extractLeft, top: extractTop, width: extractWidth, height: extractHeight })
        .png()
        .toBuffer();

      composites.push({
        input: cropped,
        left: Math.max(0, left),
        top: Math.max(0, top),
      });
    } else {
      composites.push({
        input: resized,
        left,
        top,
      });
    }
  }

  // Create transparent canvas and composite everything
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

  console.log(`✓ Saved ${OUT} (${TILE_SIZE}x${TILE_SIZE}, ${composites.length} icons placed)`);
}

generate().catch(console.error);
