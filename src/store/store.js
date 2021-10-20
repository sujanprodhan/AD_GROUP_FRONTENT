import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import reduxThunk from "redux-thunk";
import { AUTH_LOGOUT } from "./actions/actionTypes";

const composeEnhancers =  compose;

const appReducer = combineReducers({
  auth: authReducer,
  //other reducers
});

const rootReducer = (state, action) => {
  if (action.type === AUTH_LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(reduxThunk))
);

export default store;