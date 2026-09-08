const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

async function clearBlack(name) {
  const p = path.join(__dirname, "..", "public", "images", name);
  const { data, info } = await sharp(p)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let cleared = 0;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] < 25 && data[i + 1] < 25 && data[i + 2] < 25 && data[i + 3] > 0) {
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
  console.log(name, "cleared", cleared);
}

(async () => {
  for (const n of ["about-1.png", "about-2.png", "about-3.png", "about-4.png", "about-5.png"]) {
    await clearBlack(n);
  }
})();
