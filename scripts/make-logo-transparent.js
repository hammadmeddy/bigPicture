const path = require("path");
const sharp = require("sharp");

async function main() {
  const input = path.join(__dirname, "..", "public", "images", "logo.png");
  const output = path.join(
    __dirname,
    "..",
    "public",
    "images",
    "logo-transparent.png",
  );

  const image = sharp(input);
  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    // Near-black → transparent (removes baked-in black background)
    if (r < 30 && g < 30 && b < 30) {
      data[i + 3] = 0;
    }
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(output);

  console.log("Wrote", output, `(${info.width}x${info.height})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
