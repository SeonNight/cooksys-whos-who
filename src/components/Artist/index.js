import React from 'react'

class Artist extends React.Component {
  render() {
    return (
      <button id={this.props.id} onClick={this.props.onClick}>
        {this.props.name}
      </button>
    )
  }
}

export default Artist