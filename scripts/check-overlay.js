const sharp = require("sharp");

async function main() {
  const img = await sharp("public/images/rectangle-6.png")
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { data, info } = img;
  const { width, height, channels } = info;
  console.log("size", width, height);

  // Sample top-center row
  for (const y of [0, 5, 10, 20, 40, 80]) {
    const x = Math.floor(width / 2);
    const i = (y * width + x) * channels;
    console.log(
      `y=${y} center RGBA`,
      data[i],
      data[i + 1],
      data[i + 2],
      data[i + 3],
    );
  }

  // Count near-black in top 15%
  const maxY = Math.floor(height * 0.15);
  let black = 0;
  for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      if (data[i] < 15 && data[i + 1] < 15 && data[i + 2] < 15) black++;
    }
  }
  console.log("near-black pixels in top 15%:", black);
}

main();
