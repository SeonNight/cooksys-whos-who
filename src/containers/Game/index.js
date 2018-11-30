import React from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'
import styled, { keyframes } from 'styled-components'
import { Button, Loader, Dimmer, Segment } from 'semantic-ui-react'

import { loadGameSet, wrongGuess } from '../../ducks/game.duck'
import { addScore } from '../../ducks/score.duck'
import { setHighScore } from '../../ducks/highScore.ducks'

import Song from '../../components/Song'
import Artist from '../../components/Artist'

const correctAnimation = keyframes`
  0% {
    transform: rotate(0deg) scale(1.0);
  }
  25% {
    transform: rotate(30deg) scale(2.0);
  }
  50% {
    transform: rotate(0deg) scale(1.0);
  }
  75% {
    transform: rotate(-30deg) scale(2.0);
  }
  100% {
    transform: rotate(0deg) scale(1.0);
  }
`

const WrongAnimation = keyframes`
  from {
    transform: translate(0px, 0px);
    color: red;
  }
  to {
    transform: translate(0px, 20px);
    color: darkred;
  }
`

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

  border-radius: 15px;
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

const SongContainer = styled.div`
  width: 100%;
  padding: 20px;
  margin: 20px;

  border-radius: 15px;
  background-color: rgb(38, 23, 92);
  box-shadow: inset 2px 2px 20px #000000;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const SongList = styled.div`
  width: 100%;

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
  font-size: 20pt;
`

const Correct = styled.div`
  color: green;
  animation: ${correctAnimation} 2s linear infinite;
`

const Wrong = styled.div`
  color: red;
  animation: ${WrongAnimation} 3s linear;
  animation-fill-mode: forwards;  
`

const Score = styled.div`
  color: green;
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
        this.props.wrongGuess()
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
    if(this.props.guesses <= 0 && this.state.next === false) {
      if(this.props.highScore < this.props.score) {
        this.props.setHighScore(this.props.score)
      }
      return (
        <MainBody>
          <GameBody>
            <h2>DONE</h2>
            {this.props.highScore === this.props.score?
              <ResultBody>
                <Correct>NEW HIGH SCORE</Correct>
              </ResultBody>: ''}
            <ResultBody>
              <Score>SCORE: {this.props.score}</Score>
            </ResultBody>
            <Button primary onClick={this.props.restart}>Restart</Button>
          </GameBody>
        </MainBody>
      )
    } else {
      return (
        <MainBody>
          <GameBody>
            <h2>CATAGORY: {this.props.selectedGenre}</h2>
            <h3>Lives: {this.props.guesses}</h3>
            <ResultBody>
              Score: {this.props.score}
            </ResultBody>
            {this.state.next ? <ResultBody>{this.state.correct ? <Correct>CORRECT</Correct> : <Wrong>WRONG</Wrong>}</ResultBody> : <ResultBody></ResultBody>}
            <SongContainer>
              <SongList>
                {this.props.songs.map((song, index) =>
                  <Song
                    key={index}
                    name={song.name}
                    id={index}
                    url={song.preview}
                    next={this.state.next}
                    playId={this.state.playingMusic}
                    handleAudioPlay={this.handleAudioPlay} />)}
              </SongList>
            </SongContainer>
            <MainContainer>
              {this.state.next ? '' : <HelpText>Choose an Artist</HelpText>}
              <Button.Group>
                {this.props.artists.map((artist, index) =>
                  <Artist
                    key={index}
                    correctId={this.props.correct.artistId}
                    next={this.state.next}
                    name={artist.name}
                    id={artist.artistId}
                    onClick={this.handleArtistClick} />)}
              </Button.Group>
            </MainContainer>
            {this.state.next ? <Button color='blue' onClick={this.handleNext}>Next</Button> : ''}
          </GameBody>
          <Loader active={this.props.loading} size='massive'>Loading</Loader>
          <Button primary onClick={this.props.restart}>Restart</Button>
        </MainBody>
      )
    }
  }
}

Game.propTypes = {
  loadGameSet: PropTypes.func.isRequired,
  addScore: PropTypes.func.isRequired,
  wrongGuess: PropTypes.func.isRequired,
  setHighScore: PropTypes.func.isRequired,
  selectedGenre: PropTypes.string,
  numArtists: PropTypes.number,
  numSongs: PropTypes.number,
  artists: PropTypes.array,
  songs: PropTypes.array,
  correct: PropTypes.object,
  score: PropTypes.number,
  errorLoadingGameSet: PropTypes.bool,
  loading: PropTypes.bool,
  guesses: PropTypes.number,
  highScore: PropTypes.number
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
  loading: state.game.loading,
  guesses: parseInt(state.game.guesses),
  highScore: parseInt(state.highscore)
})

const mapDispatchToProps = (dispatch) => ({
  loadGameSet: (genre, numArtists, numSongs) => () => dispatch(loadGameSet(genre, numArtists, numSongs)),
  addScore: (score) => dispatch(addScore(score)),
  wrongGuess: () => dispatch(wrongGuess()),
  setHighScore: (score) => dispatch(setHighScore(score))
})

export default connect(mapStateToProps, mapDispatchToProps)(Game)
