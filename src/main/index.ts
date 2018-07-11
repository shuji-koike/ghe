import {BrowserWindow, app} from "electron"

const DEBUG: boolean = process.env.NODE_ENV !== "production"

function createMainWindow() {
  const window = new BrowserWindow({
    width: 1200,
    height: DEBUG ? 1200 : 600,
    x: 0,
    y: 0
  })
  window.loadURL("http://localhost:4444")
  // window.loadURL(resolve(`${__dirname}/../dist/index.html`));
  // window.loadURL("/dist/index.html");
  window.webContents.openDevTools()
  window.on("focus", e => {
    console.log(e)
  })
  return window
}

app.on("ready", () => {
  createMainWindow()
})
createMainWindow()
