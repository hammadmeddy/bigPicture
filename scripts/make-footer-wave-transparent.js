const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

/**
 * Footer wave: cream top + gold ribbon + black bottom.
 * - Knock out near-black so footer bg shows through
 * - Crop excess cream above the wave (keep a thin cream band)
 */
async function main() {
  const src = path.join(
    __dirname,
    "..",
    "public",
    "images",
    "footer-wave-src.png",
  );
  const out = path.join(
    __dirname,
    "..",
    "public",
    "images",
    "footer-wave-clear.png",
  );

  const { data, info } = await sharp(src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  let cleared = 0;

  for (let i = 0; i < data.length; i += 4) {
    if (data[i] < 35 && data[i + 1] < 35 && data[i + 2] < 35) {
      data[i + 3] = 0;
      cleared++;
    }
  }

  // Find first/last rows that look like the gold wave (warm, not cream)
  let firstWaveRow = height;
  let lastWaveRow = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      // gold/tan band: warm, not near-white cream
      const isGold =
        a > 200 &&
        r > 140 &&
        g > 100 &&
        b < 160 &&
        r > b + 30 &&
        !(r > 230 && g > 230 && b > 220);
      if (isGold) {
        if (y < firstWaveRow) firstWaveRow = y;
        if (y > lastWaveRow) lastWaveRow = y;
      }
    }
  }

  const creamKeep = Math.max(24, Math.round(height * 0.06));
  const bottomPad = Math.max(20, Math.round(height * 0.05));
  const top = Math.max(0, firstWaveRow - creamKeep);
  const bottom = Math.min(height - 1, lastWaveRow + bottomPad);
  const cropHeight = bottom - top + 1;

  const cropped = await sharp(data, {
    raw: { width, height, channels: 4 },
  })
    .extract({ left: 0, top, width, height: cropHeight })
    .png()
    .toBuffer();

  fs.writeFileSync(out, cropped);

  console.log({
    width,
    height,
    firstWaveRow,
    lastWaveRow,
    top,
    cropHeight,
    cleared,
    out: "footer-wave-clear.png",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
