const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

/**
 * Remove the baked white header notch from hero-overall.png so Header owns that UI.
 * Turns near-white opaque pixels in the top band transparent (or cream-matched fade).
 */
async function main() {
  const p = path.join(__dirname, "..", "public", "images", "hero-overall.png");
  const { data, info } = await sharp(p)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  // Only touch top ~12% where the white notch lives
  const maxY = Math.ceil(height * 0.12);
  let cleared = 0;

  for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      if (a < 10) continue;
      // near-white / cream notch plate
      if (r > 230 && g > 230 && b > 220) {
        data[i + 3] = 0;
        cleared++;
      }
    }
  }

  const out = await sharp(data, {
    raw: { width, height, channels: 4 },
  })
    .png()
    .toBuffer();
  fs.writeFileSync(p, out);
  console.log("hero-overall.png cleared white notch pixels", cleared, `${width}x${height}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
