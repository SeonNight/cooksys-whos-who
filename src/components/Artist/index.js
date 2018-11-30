import React from 'react'
import { Button } from 'semantic-ui-react'

class Artist extends React.Component {
  render () {
    return (
      <Button color={this.props.next? ((this.props.id.trim()) === (this.props.correctId.trim())) ? 'green' : 'red' : 'teal'} id={this.props.id} onClick={this.props.onClick}>
        {this.props.name}
      </Button>
    )
  }
}

export default Artist
