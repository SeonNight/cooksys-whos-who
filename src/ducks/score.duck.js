
export const RESET_SCORE = 'cooksys/whos-who/Game/RESET_SCORE'
export const ADD_SCORE = 'cooksys/whos-who/Game/ADD_SCORE'
export const REMOVE_SCORE = 'cooksys/whos-who/Game/REMOVE_SCORE'

export default function score(state = 0, action) {
  switch (action.type) {
    case RESET_SCORE:
      return 0
    case ADD_SCORE:
      return state + action.payload
    case REMOVE_SCORE:
      return state - action.payload
    default:
      return state
  }
}

export const resetScore = () => ({
  type: RESET_SCORE
})

export const addScore = (score) => ({
  type: ADD_SCORE,
  payload: score
})

export const removeScore = (score) => ({
  type: REMOVE_SCORE,
  payload: score
})