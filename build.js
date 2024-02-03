import Bun from "bun"
import lightningcss from 'bun-lightningcss'

if (Bun.argv.length < 2) {
  console.log("no args")
  process.exit(1)
}
const devMode = Bun.argv[2] == "dev";

const buildConfig = {
  entrypoints: ["./app/index.jsx"],
  outdir: "./build",
  minify: devMode ? false : true,
  sourcemap: devMode ? "inline" : "none",
  plugins: [lightningcss()],
}

const res = await Bun.build(buildConfig)
if (!res.success) {
  console.error("build failed: ")
  for (const msg of res.logs) {
    console.error("  " + msg)
  }
  process.exit(1)
}

const indexHtml = Bun.file("./app/index.html")
if (indexHtml.size != 0) {
  const buildedHtml = Bun.file("./build/index.html")
  Bun.write(buildedHtml, indexHtml)
}

// google closure compiler magic
if (devMode == false) {
  await Bun.$`bun x google-closure-compiler -O SIMPLE --js ./build/index.js --js_output_file ./build/index.optimized.js`
  await Bun.$`rm ./build/index.js`
  await Bun.$`mv ./build/index.optimized.js ./build/index.js`
}

console.log("build completed")
