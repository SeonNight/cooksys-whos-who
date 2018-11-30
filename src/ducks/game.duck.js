import { fetchFromSpotify } from '../services/api'

export const SELECT_ARTIST = 'cooksys/whos-who/Game/SELECT_ARTIST'
export const LOAD_GAME_SET = 'cooksys/whos-who/Game/LOAD_GAME_SET'
export const LOAD_GAME_SET_SUCCESS = 'cooksys/whos-who/Game/LOAD_GAME_SET_SUCCESS'
export const LOAD_GAME_SET_FAILURE = 'cooksys/whos-who/Game/LOAD_GAME_SET_FAILURE'
export const LOAD_GAME_SET_FAILURE_RESET = 'cooksys/whos-who/Game/LOAD_GAME_SET_FAILURE_RESET'
export const LOADING = 'cooksys/whos-who/Game/LOADING'
export const GUESS_WRONG = 'cooksys/whos-who/Game/GUESS_WRONG'
export const SET_GUESS = 'cooksys/whos-who/Game/SET_GUESS'

const initialState = {
  artists: [],
  songs: [],
  correct: {},
  errorLoadingGameSet: false,
  loading: false,
  guesses: 3
}

export default function game (state = initialState, action) {
  switch (action.type) {
    case SET_GUESS:
      return {
        ...state,
        guesses: action.payload
      }
    case GUESS_WRONG:
      return {
        ...state,
        guesses: state.guesses - 1
      }
    case LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case LOAD_GAME_SET_SUCCESS:
      return {
        ...state,
        artists: action.payload.artists,
        songs: action.payload.songs,
        correct: action.payload.correct,
        errorLoadingGameSet: false
      }
    case LOAD_GAME_SET_FAILURE:
      return {
        ...state,
        errorLoadingGameSet: true
      }
    case LOAD_GAME_SET_FAILURE_RESET:
      return {
        ...state,
        errorLoadingGameSet: false
      }
    default:
      return state
  }
}

export const wrongGuess = () => ({
  type: GUESS_WRONG
})

export const setLives = (lives) => ({
  type: SET_GUESS,
  payload: lives
})


const loadingGame = (set) => ({
  type: LOADING,
  payload: set
})

const loadGameSetSuccess = (data) => ({
  type: LOAD_GAME_SET_SUCCESS,
  payload: data
})

const loadGameSetFailure = (data) => ({
  type: LOAD_GAME_SET_FAILURE,
  payload: data
})

const loadGameSetFailureReset = () => ({
  type: LOAD_GAME_SET_FAILURE_RESET
})

const getRandomAlbums = (albums, numberOfArtists) => {
  let selectedAlbums = []
  let album

  while (numberOfArtists > 0) {
    if (numberOfArtists > albums.length) {
      return 'ERROR not enough albums'
    }
    album = albums.splice(Math.floor(Math.random() * albums.length), 1)[0]
    if (!albums.find(alb => alb.artists[0].id === album.artists[0].id) && album.preview_url !== null && album.album.album_type !== 'single') {
      selectedAlbums.push(album)
      numberOfArtists--
    }
  }

  return selectedAlbums.map(album => ({ artists: album.artists, id: album.album.id }))
}

const getRandomSongs = (tracks, numberOfSongs) => {
  let selectedSongs = []
  let song

  while (numberOfSongs > 0) {
    if (numberOfSongs > tracks.length) {
      return 'ERROR not enough songs'
    }
    song = tracks.splice(Math.floor(Math.random() * tracks.length), 1)[0]
    if (song.preview_url !== null) {
      selectedSongs.push(song)
      numberOfSongs--
    }
  }

  return selectedSongs.map(song => ({ id: song.id, name: song.name, preview: song.preview_url }))
}

const getArtistsInfo = (selectedArtists) => {
  return selectedArtists.map(artist => ({ albumId: artist.id, name: artist.artists[0].name, artistId: artist.artists[0].id }))
}

export const loadGameSet = (genre, numberOfArtists = 4, numberOfSongs = 3) =>
  dispatch => {
    dispatch(loadGameSetFailureReset())
    dispatch(loadingGame(true))
    return fetchFromSpotify({ endpoint: 'recommendations', params: { seed_genres: genre, limit: 20 } })
      .then(data => data.tracks)
      .then(albums => getRandomAlbums(albums, numberOfArtists))
      .then(selectedArtists => {
        if (typeof selectedArtists === 'string') {
          dispatch(loadGameSetFailure(selectedArtists))
        } else {
          selectedArtists = getArtistsInfo(selectedArtists)
          let correctArtist = selectedArtists[Math.floor(Math.random() * numberOfArtists)]
          fetchFromSpotify({ endpoint: `albums/${correctArtist.albumId}` })
            .then(albumn => albumn.tracks.items)
            .then(tracks => getRandomSongs(tracks, numberOfSongs))
            .then(selectedSongs => {
              if (typeof selectedSongs === 'string') {
                dispatch(loadGameSetFailure(selectedSongs))
              } else {
                dispatch(loadGameSetSuccess({ artists: selectedArtists, songs: selectedSongs, correct: correctArtist }))
                dispatch(loadingGame(false))
              }
            })
        }
      })
      .catch(err => dispatch(loadGameSetFailure(err)))
    }
