const sharp = require("sharp");

(async () => {
  const { data, info } = await sharp("public/images/logo-notch.png")
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  console.log(info);
  const hist = { trans: 0, black: 0, white: 0, cream: 0, other: 0 };
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    if (a < 10) hist.trans++;
    else if (r > 245 && g > 245 && b > 240) hist.white++;
    else if (r > 240 && g > 235 && b > 220) hist.cream++;
    else if (r < 20 && g < 20 && b < 20) hist.black++;
    else hist.other++;
  }
  console.log(hist);
  const pts = [
    [0, 0],
    [info.width - 1, 0],
    [0, info.height - 1],
    [Math.floor(info.width / 2), 10],
    [Math.floor(info.width / 2), Math.floor(info.height / 2)],
    [Math.floor(info.width / 2), info.height - 5],
  ];
  for (const [x, y] of pts) {
    const i = (y * info.width + x) * 4;
    console.log("px", x, y, {
      r: data[i],
      g: data[i + 1],
      b: data[i + 2],
      a: data[i + 3],
    });
  }
})();
