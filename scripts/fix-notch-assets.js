const path = require("path");
const sharp = require("sharp");

async function fillBlackNotch() {
  const input = path.join(__dirname, "..", "public", "images", "rectangle-6.png");
  const output = path.join(__dirname, "..", "public", "images", "rectangle-6.png");

  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  // Sample a navy pixel just below the notch area (center, ~8% down)
  const sampleY = Math.min(height - 1, Math.floor(height * 0.12));
  const sampleX = Math.floor(width / 2);
  const s = (sampleY * width + sampleX) * channels;
  const fill = [data[s], data[s + 1], data[s + 2], data[s + 3] ?? 255];

  // Only patch the top ~12% center band where the black notch lives
  const maxY = Math.floor(height * 0.1);
  const minX = Math.floor(width * 0.42);
  const maxX = Math.floor(width * 0.58);

  for (let y = 0; y < maxY; y++) {
    for (let x = minX; x < maxX; x++) {
      const i = (y * width + x) * channels;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      if (r < 20 && g < 20 && b < 20) {
        data[i] = fill[0];
        data[i + 1] = fill[1];
        data[i + 2] = fill[2];
        data[i + 3] = fill[3];
      }
    }
  }

  await sharp(data, {
    raw: { width, height, channels },
  })
    .png()
    .toFile(output);

  console.log("Patched black notch in", output);
}

async function makeLogoNotch() {
  const input = path.join(__dirname, "..", "public", "images", "logo-transparent.png");
  const output = path.join(__dirname, "..", "public", "images", "logo-notch.png");

  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const dark = { r: 0x2b, g: 0x42, b: 0x5d };
  const mid = { r: 0x6c, g: 0x95, b: 0xca };
  const light = { r: 0x81, g: 0xb2, b: 0xf6 };

  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] === 0) continue;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const lum = (r + g + b) / 3;
    let target = dark;
    if (lum > 200) target = light;
    else if (lum > 140 || (r > 80 && b > r)) target = mid;
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

Promise.all([fillBlackNotch(), makeLogoNotch()]).catch((err) => {
  console.error(err);
  process.exit(1);
});
