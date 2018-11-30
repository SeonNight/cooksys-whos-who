import React from 'react'
import styled from 'styled-components'
import { Button } from 'semantic-ui-react'

const SongBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SongName = styled.p`
  max-width: 200px;
  text-align: center;
  font-size: 15pt;
  color: white;
  margin: auto;
`

class Song extends React.Component {
  constructor(props) {
    super(props)
    this.state = {play: false}
  }

  componentWillReceiveProps() {
    this.refs.audio.pause()
    this.refs.audio.load()
    this.refs.audio.loop = true
  }

  componentDidMount() {
    this.refs.audio.loop = true
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.playId !== this.props.id) {
      this.refs.audio.pause()
      if (this.state.play) {
        this.setState({ play: false })
      }
    } else {
      if (prevState.play) {
        this.refs.audio.pause()
      } else {
        this.refs.audio.play()
      }
    }
  }

  handleAudio = () => {
    this.setState({ play: !this.state.play })
    this.props.handleAudioPlay(this.props.id)
  }

  render() {
    return (
      <SongBody>
        <Button style={{boxShadow: '2px 2px 10px black'}} size='huge' toggle circular color='red' active={this.state.play} onClick={this.handleAudio} icon='play'></Button>
        {this.props.next? <SongName>{this.props.name}</SongName> : ''}
        <audio ref="audio">
          <source src={this.props.url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </SongBody>
    )
  }
}

export default Song

/*
$('audio').mediaelementplayer({
	features: ['playpause','progress','current','tracks','fullscreen']
});

Play
Pause
Play/Pause
Stop
Volume Up, Down
Volume Meter
Song Meter and Time Tracker
*/