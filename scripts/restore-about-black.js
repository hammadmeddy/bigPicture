const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

/**
 * Restore black clothing punched out by clear-about-black.js.
 * Keep edge-connected transparent pixels (outside warped silhouette).
 * Restore interior near-black transparent pixels to opaque.
 */
async function restore(file) {
  const p = path.join(__dirname, "..", "public", "images", file);
  const { data, info } = await sharp(p)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const idx = (x, y) => (y * width + x) * 4;
  const isTransparent = (x, y) => data[idx(x, y) + 3] < 10;

  // Flood-fill from edges to mark background transparency
  const bg = new Uint8Array(width * height);
  const stack = [];
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const i = y * width + x;
    if (bg[i]) return;
    if (!isTransparent(x, y)) return;
    bg[i] = 1;
    stack.push([x, y]);
  };

  for (let x = 0; x < width; x++) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    push(0, y);
    push(width - 1, y);
  }

  while (stack.length) {
    const [x, y] = stack.pop();
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }

  let restored = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = idx(x, y);
      const a = data[i + 3];
      if (a >= 10) continue;
      if (bg[y * width + x]) continue; // keep silhouette exterior

      // Interior hole — restore as opaque (use existing RGB or pure black)
      if (data[i] < 40 && data[i + 1] < 40 && data[i + 2] < 40) {
        data[i + 3] = 255;
        restored++;
      }
    }
  }

  const out = await sharp(data, {
    raw: { width, height, channels: 4 },
  })
    .png()
    .toBuffer();
  fs.writeFileSync(p, out);
  console.log(file, "restored", restored);
}

(async () => {
  for (const f of [
    "about-1.png",
    "about-2.png",
    "about-3.png",
    "about-4.png",
    "about-5.png",
  ]) {
    await restore(f);
  }
})();
