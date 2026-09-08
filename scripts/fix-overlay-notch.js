const path = require("path");
const sharp = require("sharp");

async function main() {
  const input = path.join(__dirname, "..", "public", "images", "Rectangle 6.png");
  const output = path.join(__dirname, "..", "public", "images", "rectangle-6.png");

  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  // Sample navy from mid-image
  const sy = Math.floor(height * 0.35);
  const sx = Math.floor(width / 2);
  const si = (sy * width + sx) * channels;
  const fillR = data[si];
  const fillG = data[si + 1];
  const fillB = data[si + 2];
  const fillA = data[si + 3] ?? 255;

  const maxY = Math.floor(height * 0.14);
  const cx = width / 2;
  // Trapezoid half-width grows toward top
  const topHalf = width * 0.1;
  const botHalf = width * 0.06;

  for (let y = 0; y < maxY; y++) {
    const t = y / maxY;
    const half = topHalf * (1 - t) + botHalf * t;
    const minX = Math.floor(cx - half);
    const maxX = Math.ceil(cx + half);
    for (let x = minX; x < maxX; x++) {
      const i = (y * width + x) * channels;
      data[i] = fillR;
      data[i + 1] = fillG;
      data[i + 2] = fillB;
      data[i + 3] = fillA;
    }
  }

  await sharp(data, { raw: { width, height, channels } }).png().toFile(output);
  console.log("Filled notch with", fillR, fillG, fillB, "→", output);

  // Verify logo-notch transparency + sample color
  const logo = await sharp(
    path.join(__dirname, "..", "public", "images", "logo-notch.png"),
  )
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let transparent = 0;
  for (let i = 0; i < logo.data.length; i += 4) {
    if (logo.data[i + 3] === 0) transparent++;
  }
  // Find first opaque pixel
  for (let i = 0; i < logo.data.length; i += 4) {
    if (logo.data[i + 3] > 200) {
      console.log(
        "logo-notch first opaque RGBA",
        logo.data[i],
        logo.data[i + 1],
        logo.data[i + 2],
        logo.data[i + 3],
      );
      break;
    }
  }
  console.log("logo-notch transparent pixels", transparent);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
