import { login } from "../../api/auth-api";
import history from "../../history";

import axios from "axios";
import { LOGIN, LOGOUT } from "./actionTypes";
axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
axios.defaults.headers.post["Content-Type"] = "application/json";
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const attempLogin = (loginData, redirectUrl) => {
  return (dispatch) => {
    return axios
      .post("/api/auth/login", loginData)
      .then(({ data }) => {
        dispatch({ type: LOGIN, payload: data });
        history.push(redirectUrl);
        localStorage.setItem("token", data.token);
        return data;
      })
      .catch(function (error) {
        // Custom error message if needed
        if (error.response) {
          // Request made and server responded
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
          return { error: "Username and password does not match!" };
        } else if (error.request) {
          // The request was made but no response was received
          //console.log(error.request);
          return { error: "Username and password does not match!" };
        } else {
          // Something happened in setting up the request that triggered an Error
          //console.log('Error', error.message);
          return { error: "Username and password does not match!" };
        }
        localStorage.setItem("token", "");
      });
  };
};

export const logOut = () => {
  history.push("/login");
  localStorage.setItem("token", "");
  return {
    type: LOGOUT,
  };
};
