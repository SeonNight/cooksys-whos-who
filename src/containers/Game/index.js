import React from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'
import styled from 'styled-components'
import { Button, Loader, Dimmer, Segment } from 'semantic-ui-react'

import { loadGameSet } from '../../ducks/game.duck'
import { addScore } from '../../ducks/score.duck'

import Song from '../../components/Song'
import Artist from '../../components/Artist'

const MainBody = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const GameBody = styled.div`
  min-width: 600px;
  margin: auto;
  background-color: white;
  margin: 10px;
  padding: 20px;
  color: black;

  box-shadow: 10px 10px 10px grey;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const MainContainer = styled.div`
  width: 100%;
  padding: 10px;
  
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SongList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

const HelpText = styled.div`
  color: grey;
  font-size: 15pt;
`

const ResultBody = styled.div`
  font-weight: bold;
`

const Correct = styled.div`
  color: green;
`
const Wrong = styled.div`
  color: red;
`

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      correct: false,
      next: false,
      playingMusic: -1
    }
  }

  componentDidMount() {
    this.props.loadGameSet(this.props.selectedGenre, this.props.numArtists, this.props.numSongs)()
  }

  componentDidUpdate() {
    //If failed to load try reloading
    //Or if answered correctly go to next
    if (this.props.errorLoadingGameSet) {
      this.props.loadGameSet(this.props.selectedGenre, this.props.numArtists, this.props.numSongs)()
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
    this.setState({ next: false, playingMusic: -1  })
  }

  handleAudioPlay = (id) => {
    this.setState({ playingMusic: id })
  }

  render() {
    return (
      <MainBody>
        <GameBody>
          <h2>CATAGORY: {this.props.selectedGenre}</h2>
          {this.state.next ? <ResultBody>{this.state.correct ? <Correct>CORRECT</Correct> : <Wrong>WRONG</Wrong>}</ResultBody> : <ResultBody></ResultBody>}
          <MainContainer>
            <label>Songs</label>
            <SongList>
              {this.props.songs.map((song, index) =>
                <Song
                  key={index}
                  name={song.name}
                  id={index}
                  url={song.preview}
                  playId={this.state.playingMusic}
                  handleAudioPlay={this.handleAudioPlay} />)}
            </SongList>
          </MainContainer>
          <MainContainer>
            <label>Artists</label>
            <Button.Group>
              {this.props.artists.map((artist, index) =>
                <Artist
                  key={index}
                  correctId={this.props.correct.artistId}
                  next={this.state.next} name={artist.name}
                  id={artist.artistId}
                  onClick={this.handleArtistClick} />)}
            </Button.Group>
          </MainContainer>
          {this.state.next ? <Button color='blue' onClick={this.handleNext}>Next</Button> : <HelpText>Choose an Artist</HelpText>}
        </GameBody>
        <Loader active={this.props.loading} size='massive'>Loading</Loader>
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
  errorLoadingGameSet: PropTypes.bool,
  loading: PropTypes.bool
}

const mapStateToProps = (state) => ({
  selectedGenre: state.config.selectedCategory,
  numArtists: parseInt(state.config.numArtists),
  numSongs: parseInt(state.config.numSongs),
  artists: state.game.artists,
  songs: state.game.songs,
  correct: state.game.correct,
  score: parseInt(state.score),
  errorLoadingGameSet: state.game.errorLoadingGameSet,
  loading: state.game.loading
})

const mapDispatchToProps = (dispatch) => ({
  loadGameSet: (genre, numArtists, numSongs) => () => dispatch(loadGameSet(genre, numArtists, numSongs)),
  addScore: (score) => dispatch(addScore(score))
})

export default connect(mapStateToProps, mapDispatchToProps)(Game)
