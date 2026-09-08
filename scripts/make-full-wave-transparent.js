const path = require("path");
const sharp = require("sharp");

/** Knock out black so hero shows through above the wave */
async function main() {
  const input = path.join(__dirname, "..", "public", "images", "full-wave.png");
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let cleared = 0;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] < 35 && data[i + 1] < 35 && data[i + 2] < 35) {
      data[i + 3] = 0;
      cleared++;
    }
  }

  const outClear = path.join(
    __dirname,
    "..",
    "public",
    "images",
    "full-wave-clear.png",
  );

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(outClear);

  console.log(
    "Wrote full-wave-clear.png",
    info.width + "x" + info.height,
    "cleared",
    cleared,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
