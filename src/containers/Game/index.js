import React from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'
import styled from 'styled-components'

import { loadGameSet } from '../../ducks/game.duck'
import { addScore } from '../../ducks/score.duck'

import Song from '../../components/Song'
import Artist from '../../components/Artist'

const MainBody = styled.div`
  width: 100%;
  height: 100%;
  background-color: lightblue;

  display: flex;
  flex-direction: column;
  align-items: center;
`

class Game extends React.Component {
  state = {
    correct: false,
    next: false,
    playingMusic: -1
  }

  componentDidMount() {
    this.props.loadGameSet(this.props.selectedGenre, this.props.numArtists, this.props.numSongs)()
  }

  componentWillReceiveProps() {
    //If failed to load try reloading
    //Or if answered correctly go to next
    if (this.props.errorLoadingGameSet) {
      this.props.loadGameSet(this.props.selectedGenre, this.props.numArtists, this.props.numSongs)
    }
  }

  handleArtistClick = event => {
    if (!this.state.next) {
      if ((event.target.id.trim()) === (this.props.correct.artistId.trim())) {
        this.props.addScore(10)
        this.setState({ correct: true })
      } else {
        this.setState({ correct: false })
      }
      this.setState({ next: true, playingMusic: -1 })
    }
  }

  handleNext = () => {
    this.props.loadGameSet(this.props.selectedGenre, this.props.numArtists, this.props.numSongs)()
    this.setState({ next: false })
  }

  handleAudioPlay = (id) => {
    console.log('handle audio play')
    this.setState({ playingMusic: id })
  }

  render() {
    return (
      <MainBody>
        <h1>GAME</h1>
        <p>{this.props.selectedGenre}</p>
        <p>{this.props.score}</p>
        {this.state.next ? <p>{this.state.correct ? 'CORRECT' : 'WRONG'}</p> : ''}
        <div>
          <h2>Artists</h2>
          {this.props.artists.map((artist, index) =>
            <Artist key={index} name={artist.name} id={artist.artistId} onClick={this.handleArtistClick} />)}
        </div>
        <div>
          <h2>Songs</h2>
          {this.props.songs.map((song, index) =>
            <Song key={index} name={song.name} id={index} url={song.preview} playId={this.state.playingMusic} handleAudioPlay={this.handleAudioPlay} />)}
        </div>
        {this.state.next ? <button onClick={this.handleNext}>Next</button> : ''}
      </MainBody>
    )
  }
}

Game.propTypes = {
  loadGameSet: PropTypes.func.isRequired,
  addScore: PropTypes.func.isRequired,
  selectedGenre: PropTypes.string,
  numArtists: PropTypes.number,
  numSongs: PropTypes.number,
  artists: PropTypes.array,
  songs: PropTypes.array,
  correct: PropTypes.object,
  score: PropTypes.number,
  errorLoadingGameSet: PropTypes.bool
}

const mapStateToProps = (state) => ({
  selectedGenre: state.config.selectedCategory,
  numArtists: parseInt(state.config.numArtists),
  numSongs: parseInt(state.config.numSongs),
  artists: state.game.artists,
  songs: state.game.songs,
  correct: state.game.correct,
  score: parseInt(state.score),
  errorLoadingGameSet: state.game.errorLoadingGameSet
})

const mapDispatchToProps = (dispatch) => ({
  loadGameSet: (genre, numArtists, numSongs) => () => dispatch(loadGameSet(genre, numArtists, numSongs)),
  addScore: (score) => dispatch(addScore(score))
})

export default connect(mapStateToProps, mapDispatchToProps)(Game)
