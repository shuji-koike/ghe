import * as React from "react"
import {ListGroup, ListGroupItem} from "reactstrap"
import {Branch} from "../model/git"

interface Props {
  branches: Branch[]
}

export default class BranchList extends React.Component<Props> {
  render() {
    return (
      <ListGroup className="BranchList">
        {this.props.branches.map(branch => (
          <ListGroupItem key={branch.name}>
            <label>{branch.name}</label>
          </ListGroupItem>
        ))}
      </ListGroup>
    )
  }
}
