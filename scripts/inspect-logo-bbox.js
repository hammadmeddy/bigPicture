const sharp = require("sharp");

(async () => {
  const { data, info } = await sharp("public/images/logo-notch.png")
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let minY = info.height,
    maxY = 0,
    minX = info.width,
    maxX = 0,
    count = 0;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * 4;
      if (data[i + 3] > 20) {
        count++;
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
      }
    }
  }
  console.log({ count, bbox: { minX, maxX, minY, maxY } });

  // row opacity profile
  for (let y = 0; y < info.height; y += 10) {
    let opaque = 0;
    for (let x = 0; x < info.width; x++) {
      if (data[(y * info.width + x) * 4 + 3] > 20) opaque++;
    }
    console.log("row", y, "opaque", opaque);
  }
})();
