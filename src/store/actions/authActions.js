import { login } from "../../api/auth-api";
import history from "../../history";

import axios from "axios";
import { LOGIN, LOGOUT, FETCH_IP_LIST, UPDATE_IP_DATA } from "./actionTypes";

import ApiService from "./ApiServices";
export const attempLogin = (loginData, redirectUrl) => {
  return (dispatch) => {
    return ApiService.post("/api/auth/login", loginData)
      .then(({ data }) => {
        dispatch({ type: LOGIN, payload: data });
        localStorage.setItem("token", data.token);
        history.push(redirectUrl);
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

export const fetchIpList = () => {
  return (dispatch) => {
    return ApiService.get("/api/ip-list")
      .then(({ data }) => {
        dispatch({ type: FETCH_IP_LIST, payload: data });
        return data;
      })
      .catch(function (error) {
        if (error.response) {
          // custom meesage if needed
        } else if (error.request) {
        } else {
        }
        return { error: "Something went wrong!. API list data getting error!!!" };
      });
  };
};


//updateIpData


export const updateIpData = (data) => {
  return (dispatch) => {
    return ApiService.put("/api/ip-list/update", data)
      .then(({ data }) => {
        dispatch({ type: UPDATE_IP_DATA, payload: data });
        return data;
      })
      .catch(function (error) {
        if (error.response) {
          // custom meesage if needed
        } else if (error.request) {
        } else {
        }
        return { error: "Something went wrong!. API update data  error!!!" };
      });
  };
};