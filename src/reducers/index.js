 import { combineReducers } from 'redux';

// const rootReducer = combineReducers({
//     state: () => ({})
// });

// export default rootReducer;


import postReducer from './postReducer';

export default combineReducers({
  posts: postReducer
});