const sharp = require("sharp");

(async () => {
  const p = "public/images/hero-overall.png";
  const { data, info } = await sharp(p)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const cream = [255, 252, 247, 255];
  const maxY = Math.floor(height * 0.025);
  const minX = Math.floor(width * 0.38);
  const maxX = Math.floor(width * 0.62);
  for (let y = 0; y < maxY; y++) {
    for (let x = minX; x < maxX; x++) {
      const i = (y * width + x) * channels;
      data[i] = cream[0];
      data[i + 1] = cream[1];
      data[i + 2] = cream[2];
      data[i + 3] = cream[3];
    }
  }
  await sharp(data, { raw: { width, height, channels } }).png().toFile(p);
  console.log("sealed top edge of cream notch");
})();
