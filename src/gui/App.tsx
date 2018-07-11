import * as React from "react"
import {Navbar, Button} from "reactstrap"
import SideBar from "./SideBar"
import {GitRepo} from "../model/git"
import {updateRepo} from "../lib/git"

interface Props {
  repo: GitRepo
}

export default class App extends React.Component<Props, GitRepo> {
  constructor(props: Props) {
    super(props)
  }
  render() {
    return (
      <div className="App container-fluid">
        <div className="row">
          <SideBar className="col-sm-6 col-md-5 col-lg-4" repo={this.props.repo} />
          <article className="col-sm-6 col-md-7 col-lg-8">
            <Navbar dark={true} onClick={this.reload.bind(this)}>
              <Button>reload</Button>
            </Navbar>
          </article>
        </div>
      </div>
    )
  }
  componentDidMount() {
    window.addEventListener("focus", e => {
      this.reload()
    })
  }
  private async reload() {
    await updateRepo(this.props.repo)
    this.forceUpdate()
  }
}
