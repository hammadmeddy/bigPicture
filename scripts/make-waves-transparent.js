const path = require("path");
const sharp = require("sharp");
const fs = require("fs");

async function knockOutBlack(inputPath, outputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let cleared = 0;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] < 40 && data[i + 1] < 40 && data[i + 2] < 40) {
      data[i + 3] = 0;
      cleared++;
    }
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(outputPath);

  console.log(path.basename(outputPath), info.width + "x" + info.height, "cleared", cleared);
}

(async () => {
  const dir = path.join(__dirname, "..", "public", "images");
  // Prefer fresh copies from filenames if originals with black exist elsewhere;
  // process the public files in place.
  for (const name of ["left-wave.png", "right-wawe.png"]) {
    const p = path.join(dir, name);
    if (!fs.existsSync(p)) {
      console.error("missing", p);
      continue;
    }
    await knockOutBlack(p, p);
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
