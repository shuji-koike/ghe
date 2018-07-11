import * as React from "react"
import {ListGroup, ListGroupItem} from "reactstrap"
import {FileStatus} from "../model/git"
import Octicon, {DiffAdded, DiffRemoved, DiffModified, Question} from "@github/octicons-react"

interface FileListProps {
  files: FileStatus[]
  onItemDoubleClick?: (file: FileStatus) => void
  onItemChange?: (file: FileStatus) => void
}

export default class FileList extends React.Component<FileListProps> {
  render() {
    return (
      <ListGroup className="FileList" hidden={!this.props.files.length}>
        {this.props.files.map(file => (
          <FileListItem
            key={file.path}
            file={file}
            onItemDoubleClick={this.props.onItemDoubleClick}
            onItemChange={this.props.onItemChange}
          />
        ))}
      </ListGroup>
    )
  }
}

interface FileListItemProps {
  file: FileStatus
  onItemDoubleClick?: (file: FileStatus) => void
  onItemChange?: (file: FileStatus) => void
}

export class FileListItem extends React.Component<FileListItemProps> {
  render() {
    return (
      <ListGroupItem onDoubleClick={this.noopHandler}>
        <p>
          <input
            type="checkbox"
            defaultChecked={this.defaultChecked()}
            disabled={this.disabled()}
            ref={e => e && (e.indeterminate = this.props.file.indeterminate)}
            onChange={this.onChange.bind(this)}
          />
          <label onDoubleClick={this.onDoubleClick.bind(this)}>
            <span>{this.props.file.path}</span>
          </label>
          <Octicon icon={this.statusIcon()} />
        </p>
      </ListGroupItem>
    )
  }
  private defaultChecked() {
    return this.props.file.staged && !this.props.file.unstaged
  }
  private disabled() {
    return !(this.props.file.staged || this.props.file.unstaged || this.props.file.indeterminate)
  }
  private statusIcon() {
    if (this.props.file.deleted) {
      return DiffRemoved
    } else if (this.props.file.added) {
      return DiffAdded
    } else if (
      this.props.file.staged ||
      this.props.file.unstaged ||
      this.props.file.indeterminate
    ) {
      return DiffModified
    } else {
      return Question
    }
  }
  private onChange(event: MouseEvent) {
    this.props.onItemChange.call(this, this.props.file)
  }
  private onDoubleClick(event: MouseEvent) {
    event.preventDefault()
    this.props.onItemDoubleClick.call(this, this.props.file)
  }
  private noopHandler(event: React.MouseEvent<HTMLLabelElement>) {
    event.preventDefault()
    event.stopPropagation()
    return false
  }
}
