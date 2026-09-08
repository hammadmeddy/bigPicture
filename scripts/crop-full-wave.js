const path = require("path");
const sharp = require("sharp");

/** Crop excess cream under the wave; keep a thin cream band for blend */
async function main() {
  const input = path.join(
    __dirname,
    "..",
    "public",
    "images",
    "full-wave-clear.png",
  );
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  // Find last row that still has blue-ish wave (not pure cream)
  let lastWaveRow = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      // blue wave band (not cream, not transparent)
      if (a > 200 && b > r + 20 && b > 80) {
        lastWaveRow = y;
      }
    }
  }

  // Keep a short cream strip under the wave
  const creamKeep = Math.max(16, Math.round(height * 0.04));
  const cropHeight = Math.min(height, lastWaveRow + 1 + creamKeep);

  const cropped = await sharp(input)
    .extract({ left: 0, top: 0, width, height: cropHeight })
    .png()
    .toBuffer();

  const fs = require("fs");
  fs.writeFileSync(input, cropped);

  console.log({
    width,
    height,
    lastWaveRow,
    cropHeight,
    removed: height - cropHeight,
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
