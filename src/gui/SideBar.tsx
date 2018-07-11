import * as React from "react"
import {ListGroup, ListGroupItem} from "reactstrap"
import CommitList from "./CommitList"
import BranchList from "./BranchList"
import FileList from "./FileList"
import {GitRepo, FileStatus} from "../model/git"
import {setStaged, setUnstaged, updateRepo} from "../lib/git"

interface SideBarProps {
  className?: string
  repo: GitRepo
}

interface SideBarState {}

export default class SideBar extends React.Component<SideBarProps, SideBarState> {
  constructor(props: SideBarProps) {
    super(props)
  }
  render() {
    return (
      <aside className={"SideBar " + this.props.className}>
        <ListGroup hidden={!this.props.repo.status.length}>
          <ListGroupItem>
            <label>Changes to be committed</label>
          </ListGroupItem>
        </ListGroup>
        <FileList
          files={this.props.repo.status}
          onItemDoubleClick={this.stageFileChange.bind(this)}
          onItemChange={this.stageFileChange.bind(this)}
        />
        <ListGroup>
          <ListGroupItem>
            <label>Commits</label>
          </ListGroupItem>
        </ListGroup>
        <CommitList commits={this.props.repo.commits} />
        <ListGroup>
          <ListGroupItem>
            <label>Branches</label>
          </ListGroupItem>
        </ListGroup>
        <BranchList branches={this.props.repo.branches} />
      </aside>
    )
  }
  private async stageFileChange(file: FileStatus) {
    if (file.staged && !file.unstaged) {
      await setUnstaged(this.props.repo.dir, file.path)
    } else if ((!file.staged && file.unstaged) || file.indeterminate) {
      await setStaged(this.props.repo.dir, file.path)
    } else {
      console.info("not implimented")
    }
    await updateRepo(this.props.repo)
    this.forceUpdate()
  }
}
