const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

async function main() {
  const p = path.join(__dirname, "..", "public", "images", "big-pic-footer.png");
  const { data, info } = await sharp(p)
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

  const out = await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer();

  fs.writeFileSync(p, out);
  console.log(info.width + "x" + info.height, "cleared", cleared);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
