export const SET_HIGHSCORE = 'cooksys/whos-who/Game/SET_HIGHSCORE'


const initialState = 0

export default function score (state = initialState, action) {
  switch (action.type) {
    case SET_HIGHSCORE:
      return action.payload
    default:
      return state
  }
}

export const setHighScore = (score) => ({
  type: SET_HIGHSCORE,
  payload: score
})