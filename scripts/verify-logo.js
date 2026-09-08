const sharp = require("sharp");

sharp("public/images/logo-transparent.png")
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    let transparent = 0;
    let opaque = 0;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] === 0) transparent++;
      else opaque++;
    }
    console.log(`${info.width}x${info.height}`);
    console.log(`transparent=${transparent} opaque=${opaque}`);
    console.log(`corner RGBA=${[data[0], data[1], data[2], data[3]].join(",")}`);
  });
