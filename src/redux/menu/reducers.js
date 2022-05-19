/* eslint-disable no-debugger */
import actions from './actions'

const initialState = {
  menuLeftData: [],
  menuTopData: [],
}

export default function userReducer(state = initialState, action) {
  // debugger
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
