const path = require("path");
const sharp = require("sharp");

/**
 * Fix Rectangle 6 overlay:
 * The baked-in black top-center notch should be cream (#fffcf7)
 * so it matches the header and forms the proper Figma notch —
 * not a separate white plate around the logo.
 */
async function main() {
  const src = path.join(__dirname, "..", "public", "images", "Rectangle 6.png");
  const out = path.join(__dirname, "..", "public", "images", "hero-overall.png");

  const { data, info } = await sharp(src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const cream = { r: 0xff, g: 0xfc, b: 0xf7, a: 255 };

  // Paint the top-center notch region cream (trapezoid / rounded tab)
  const maxY = Math.floor(height * 0.16);
  const cx = width / 2;
  const topHalf = width * 0.11;
  const botHalf = width * 0.07;

  for (let y = 0; y < maxY; y++) {
    const t = y / Math.max(maxY - 1, 1);
    // Ease out for rounded bottom feel
    const ease = 1 - Math.pow(1 - t, 1.5);
    const half = topHalf * (1 - ease) + botHalf * ease;
    // Round the bottom corners of the notch
    const bottomRound = Math.max(0, (t - 0.7) / 0.3);
    const roundShrink = bottomRound * bottomRound * (botHalf * 0.35);
    const halfW = half - roundShrink;

    const minX = Math.floor(cx - halfW);
    const maxX = Math.ceil(cx + halfW);

    for (let x = Math.max(0, minX); x < Math.min(width, maxX); x++) {
      const i = (y * width + x) * channels;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      // Replace dark/black notch pixels (and near-dark) with cream
      if (r < 55 && g < 70 && b < 90) {
        data[i] = cream.r;
        data[i + 1] = cream.g;
        data[i + 2] = cream.b;
        data[i + 3] = cream.a;
      }
    }
  }

  // Also force-fill any remaining near-black in a tighter center band
  for (let y = 0; y < maxY; y++) {
    for (let x = Math.floor(width * 0.4); x < Math.floor(width * 0.6); x++) {
      const i = (y * width + x) * channels;
      if (data[i] < 30 && data[i + 1] < 30 && data[i + 2] < 30) {
        data[i] = cream.r;
        data[i + 1] = cream.g;
        data[i + 2] = cream.b;
        data[i + 3] = cream.a;
      }
    }
  }

  await sharp(data, { raw: { width, height, channels } }).png().toFile(out);
  console.log("Wrote", out, width + "x" + height);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
