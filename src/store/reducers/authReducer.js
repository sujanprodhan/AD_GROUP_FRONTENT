import {
  LOGIN,
  LOGOUT,
} from "../actions/actionTypes";

const openState = {
  loggedIn: false,
  user: null
}

export default (state = openState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, loggedIn: true, user: action.payload }
    case LOGOUT:
      return { ...state, loggedIn: false, user: null }
    default:
      return state
  }
}