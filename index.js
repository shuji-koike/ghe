const waitPort = require("wait-port")
require("ts-node").register({})
console.info(process.argv)
if (typeof require("electron") != "string") {
  startElectron()
} else {
  require("./src/cli")
}

async function startElectron() {
  require("./fuse")
  await waitPort({port: 4444, output: "silent"})
  require("./src/main")
}
