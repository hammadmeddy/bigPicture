const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");

function dilate(mask, w, h, radius) {
  let cur = Uint8Array.from(mask);
  for (let r = 0; r < radius; r++) {
    const next = Uint8Array.from(cur);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = y * w + x;
        if (cur[i]) continue;
        const left = x > 0 && cur[i - 1];
        const right = x + 1 < w && cur[i + 1];
        const up = y > 0 && cur[i - w];
        const down = y + 1 < h && cur[i + w];
        if (left || right || up || down) next[i] = 1;
      }
    }
    cur = next;
  }
  return cur;
}

function floodExterior(blocked, w, h) {
  const exterior = new Uint8Array(w * h);
  const stack = [];
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= w || y >= h) return;
    const i = y * w + x;
    if (exterior[i] || blocked[i]) return;
    exterior[i] = 1;
    stack.push([x, y]);
  };
  for (let x = 0; x < w; x++) {
    push(x, 0);
    push(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    push(0, y);
    push(w - 1, y);
  }
  while (stack.length) {
    const [x, y] = stack.pop();
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }
  return exterior;
}

async function fix(file, dilateRadius) {
  const p = path.join(__dirname, "..", "public", "images", file);
  const { data, info } = await sharp(p)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;

  // Content = currently opaque OR any non-near-black (keeps photo color even if transparent)
  const content = new Uint8Array(w * h);
  for (let i = 0, pidx = 0; i < data.length; i += 4, pidx++) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    const nearBlack = r < 28 && g < 28 && b < 28;
    if (a >= 20 || !nearBlack) content[pidx] = 1;
  }

  const sealed = dilate(content, w, h, dilateRadius);
  const exterior = floodExterior(sealed, w, h);

  let restored = 0;
  let cleared = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const pidx = y * w + x;
      const i = pidx * 4;
      if (exterior[pidx]) {
        if (data[i + 3] !== 0) {
          data[i + 3] = 0;
          cleared++;
        }
        continue;
      }
      // Interior photo region
      if (data[i + 3] < 20) {
        if (data[i] < 8 && data[i + 1] < 8 && data[i + 2] < 8) {
          data[i] = 12;
          data[i + 1] = 12;
          data[i + 2] = 12;
        }
        data[i + 3] = 255;
        restored++;
      }
    }
  }

  const out = await sharp(data, {
    raw: { width: w, height: h, channels: 4 },
  })
    .png()
    .toBuffer();
  fs.writeFileSync(p, out);
  console.log(file, { restored, cleared, dilateRadius, w, h });
}

(async () => {
  execSync(
    "git checkout HEAD -- public/images/about-1.png public/images/about-2.png public/images/about-3.png public/images/about-4.png public/images/about-5.png",
    { stdio: "inherit" },
  );
  const radii = {
    "about-1.png": 6,
    "about-2.png": 10,
    "about-3.png": 14,
    "about-4.png": 10,
    "about-5.png": 14,
  };
  for (const [f, r] of Object.entries(radii)) {
    await fix(f, r);
  }
})();
