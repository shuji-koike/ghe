import { FuseBox, CSSPlugin, WebIndexPlugin } from "fuse-box"

process.env["NODE_ENV"] = process.env["NODE_ENV"] || "development"
const NODE_ENV = process.env["NODE_ENV"]

const fuse = FuseBox.init({
  homeDir: "src",
  output: "dist/$name.js",
  sourceMaps: true,
  plugins: [
    CSSPlugin(),
    WebIndexPlugin({
      template: "src/renderer/index.html"
    })
  ]
})

const renderer = fuse
  .bundle("renderer")
  .target("electron")
  .instructions(`> renderer/index.ts`)

if (["development"].includes(NODE_ENV)) {
  renderer.watch().hmr()
  fuse.dev()
}

fuse.run()
