const path = require("path");
const sharp = require("sharp");

async function main() {
  const input = path.join(
    __dirname,
    "..",
    "public",
    "images",
    "logo-before-about us seciton.png",
  );
  const output = path.join(
    __dirname,
    "..",
    "public",
    "images",
    "logo-before-about.png",
  );

  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  // Find light-blue circle bounds
  let minX = width;
  let maxX = 0;
  let minY = height;
  let maxY = 0;
  let count = 0;
  let sumX = 0;
  let sumY = 0;

  const isBrandBlue = (r, g, b) =>
    b > 140 && b > r && b > g && r > 60 && g > 100 && r < 200;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      if (isBrandBlue(r, g, b)) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
        sumX += x;
        sumY += y;
        count++;
      }
    }
  }

  const cx = sumX / count;
  const cy = (minY + Math.min(maxY, height * 0.72)) / 2;
  // Radius from horizontal extent of blue circle (ignore pin)
  const radius = (maxX - minX) / 2 + 2;

  console.log({ cx, cy, radius, minY, maxY, count });

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const inCircle = dist <= radius + 1;

      // Pin: thin blue line + tip below circle
      const inPinZone =
        y >= cy &&
        Math.abs(x - cx) <= 4 &&
        y <= height - 2 &&
        (isBrandBlue(r, g, b) || (r > 200 && g > 200 && b > 200));

      // Keep white icon pixels only inside the circle
      const isWhiteIcon = r > 220 && g > 220 && b > 220;

      if (inCircle) {
        // Inside circle: keep blue + white icon; drop dark gray ring remnants
        const isDark = (r + g + b) / 3 < 100 && !isBrandBlue(r, g, b);
        if (isDark) data[i + 3] = 0;
        continue;
      }

      if (inPinZone && isBrandBlue(r, g, b)) {
        continue; // keep pin
      }

      // Everything else transparent
      data[i + 3] = 0;
    }
  }

  await sharp(data, { raw: { width, height, channels } }).png().toFile(output);
  console.log("Wrote", output);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
