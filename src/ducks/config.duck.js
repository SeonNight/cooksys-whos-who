import { fetchGenres } from '../services/api'

export const LOAD_CATEGORIES_BEGIN = 'cooksys/whos-who/Home/LOAD_CATEGORIES_BEGIN'
export const LOAD_CATEGORIES_FAILURE = 'cooksys/whos-who/Home/LOAD_CATEGORIES_FAILURE'
export const LOAD_CATEGORIES_DONE = 'cooksys/whos-who/Home/LOAD_CATEGORIES_DONE'
export const LOAD_CATEGORIES_UPDATE = 'cooksys/whos-who/Home/LOAD_CATEGORIES_UPDATE'
export const SELECT_CATEGORY = 'cooksys/whos-who/Home/SELECT_CATEGORY'
export const SELECT_NUM_ARTISTS = 'cooksys/whos-who/Home/SELECT_NUM_ARTISTS'
export const SELECT_NUM_SONGS = 'cooksys/whos-who/Home/SELECT_NUM_SONGS'

const initialState = {
  categories: [],
  selectedCategory: 'acoustic',
  numArtists: 2,
  numSongs: 1,
  errorLoadingCategories: false
}

export default function game (state = initialState, action) {
  switch (action.type) {
    case LOAD_CATEGORIES_DONE:
      return {
        ...state,
        errorLoadingCategories: false,
        categories: action.payload
      }
    case LOAD_CATEGORIES_FAILURE:
      return {
        ...state,
        errorLoadingCategories: true,
        categories: initialState.categories
      }
    case SELECT_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload
      }
    case SELECT_NUM_ARTISTS:
      return {
        ...state,
        numArtists: action.payload
      }
    case SELECT_NUM_SONGS:
      return {
        ...state,
        numSongs: action.payload
      }
    default:
      return state
  }
}

export const selectCategory = (category) => ({
  type: SELECT_CATEGORY,
  payload: category
})

export const selectNumArtists = (num) => ({
  type: SELECT_NUM_ARTISTS,
  payload: num
})

export const selectNumSongs = (num) => ({
  type: SELECT_NUM_SONGS,
  payload: num
})

const loadCategoriesDone = (categories) => ({
  type: LOAD_CATEGORIES_DONE,
  payload: categories
})

const loadCategoriesFailure = () => ({
  type: LOAD_CATEGORIES_FAILURE
})

export const loadGenres = () =>
  (dispatch) =>
    fetchGenres()
      .then(genres => {
        return dispatch(loadCategoriesDone(genres.genres))
      })
      .catch(err => dispatch(loadCategoriesFailure(err)))
