const path = require("path");
const sharp = require("sharp");

/**
 * Build a light-background logo:
 * - keep transparency
 * - map light blues → brand dark/secondary blues (Figma on cream notch)
 */
async function main() {
  const input = path.join(__dirname, "..", "public", "images", "logo-transparent.png");
  const output = path.join(__dirname, "..", "public", "images", "logo-notch.png");

  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const dark = { r: 0x2b, g: 0x42, b: 0x5d }; // --color-dark-blue
  const mid = { r: 0x6c, g: 0x95, b: 0xca }; // --color-secondary
  const light = { r: 0x81, g: 0xb2, b: 0xf6 }; // --color-light-blue

  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    if (a === 0) continue;

    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const lum = (r + g + b) / 3;

    // Very light (tagline / highlights) → light blue
    // Mid blues → secondary
    // Everything else opaque → dark blue
    let target = dark;
    if (lum > 200) target = light;
    else if (lum > 140) target = mid;
    else if (r > 80 && b > r) target = mid;

    data[i] = target.r;
    data[i + 1] = target.g;
    data[i + 2] = target.b;
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(output);

  console.log("Wrote", output);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
