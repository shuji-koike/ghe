process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true"
process.env["LOCAL_GIT_DIRECTORY"] = "/usr/local"

import "bootstrap/dist/css/bootstrap.css"
import "./index.css"
import * as React from "react"
import * as ReactDOM from "react-dom"
import App from "../gui/App"
import {getRepo} from "../lib/git"

async function init() {
  ReactDOM.render(React.createElement(App, {repo: await getRepo()}), document.getElementById("app"))
}

init()
