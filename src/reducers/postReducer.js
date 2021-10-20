import { FETCH_POSTS, NEW_POST } from '../actions/types';

const initialState = {
  lists: [],
  item: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        lists: action.posts
      };
    case NEW_POST:
      return {
        ...state,
        item: action.payload
      };
    default:
      return state;
  }
}