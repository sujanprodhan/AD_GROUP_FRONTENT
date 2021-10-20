import { LOGIN, LOGOUT } from "./actionTypes";

import {login} from "../../api/auth-api";
import history from "../../history";

export const authenticate = (email, password, redirectUrl) => (dispatch) => {
  login(email, password).then((response) => {
    dispatch(logIn(response));
    history.push(redirectUrl);
  });
};

export const logIn = (user, redirectUrl) => {
  history.push(redirectUrl);
  return {
    type: LOGIN,
    payload: user
  };
};

export const logOut = () => {
  history.push("/login");
  return {
    type: LOGOUT
  };
};
