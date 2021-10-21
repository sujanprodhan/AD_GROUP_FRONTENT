import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk';
 import logger from 'redux-logger';
import authReducer from "./reducers/authReducer";
import ipListReducer from "./reducers/ipListReducer";
import { AUTH_LOGOUT } from "./actions/actionTypes";

const composeEnhancers =  compose;

const appReducer = combineReducers({
  auth: authReducer,
  list:ipListReducer
  //other reducers
});

const rootReducer = (state, action) => {
  if (action.type === AUTH_LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

// const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(reduxThunk))
// );

// export default store;




const middleware = applyMiddleware(thunk, logger);

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    reduxDevTools(
        middleware
    )
);

export default store;

