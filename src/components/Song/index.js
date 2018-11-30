import React from 'react'

class Song extends React.Component {
  state = {
    play: false
  }

  componentWillReceiveProps() {
    this.refs.audio.pause()
    this.refs.audio.load()
  }

  componentDidMount() {
    this.refs.audio.loop = true
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('upload props: ' + this.props.id)
    console.log(this.props.id + '!==' + this.props.playId)
    console.log('Prev: ' + prevState.play)
    console.log('Cur: ' + this.state.play)
    if (this.props.playId !== this.props.id) {
      console.log('clicked other pause')
      this.refs.audio.pause()
      if (this.state.play) {
        this.setState({ play: false })
      }
    } else {
      if (prevState.play) {
        console.log('pause')
        this.refs.audio.pause()
      } else {
        console.log('play')
        this.refs.audio.play()
      }
    }
    console.log('---------------')
  }

  handleAudio = () => {
    console.log('---------------')
    console.log('button')
    console.log('---------------')
    this.setState({ play: !this.state.play })
    this.props.handleAudioPlay(this.props.id)
  }

  //handleAudioPlay
  //playId
  render() {
    return (
      <div>
        <p>{this.props.name}</p>
        <button onClick={this.handleAudio}>Play</button>
        <audio ref="audio">
          <source src={this.props.url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
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