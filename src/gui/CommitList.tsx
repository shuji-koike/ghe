import * as React from "react"
import {ListGroup, ListGroupItem, Badge} from "reactstrap"
import * as moment from "moment"
import Octicon, {GitCommit} from "@github/octicons-react"
import {Commit} from "../model/git"

interface CommitListProps {
  commits: Commit[]
}

export default class CommitList extends React.Component<CommitListProps> {
  render() {
    return (
      <ListGroup className="CommitList">
        {this.props.commits.map(a => <CommitItem commit={a} key={a.hash} />)}
      </ListGroup>
    )
  }
}

interface CommitItemProps {
  commit: Commit
}

export class CommitItem extends React.Component<CommitItemProps> {
  render() {
    return (
      <ListGroupItem>
        <p>
          <Octicon icon={GitCommit} />
          <label>{this.props.commit.subject}</label>
          <Badge>Undo</Badge>
        </p>
        <p>
          <small>{this.props.commit.author_name}</small>
          <small> committed {moment(this.props.commit.author_date).fromNow()}</small>
        </p>
      </ListGroupItem>
    )
  }
}
