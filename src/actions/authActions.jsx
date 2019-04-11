import { SubmissionError } from "redux-form";
import jwt_decode from "jwt-decode";
import http from "../utils/httpService";
import { SET_CURRENT_USER } from "./types";
import { asyncActionStart, asyncActionFinish } from "./asyncActions";

const tokenKey = "token";

export const registerUser = (userData, ...rest) => async () => {
  try {
    await http.post("users/register", userData);
    const { history } = rest[1];
    history.push("/login");
  } catch (error) {
    throw new SubmissionError({
      _error: error.response.data.message
    });
  }
};

export const loginUser = (userData, ...rest) => async dispatch => {
  try {
    dispatch(asyncActionStart());
    const { history } = rest[1];
    const res = await http.post("users/login", userData);
    const { token } = res.data;
    localStorage.setItem(tokenKey, token);
    http.setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(setCurrentUser(decoded));
    dispatch(asyncActionFinish());
    history.push("/dashboard");
  } catch (error) {
    dispatch(asyncActionFinish());
    if (error.response && error.response.data) {
      throw new SubmissionError({
        _error: error.response.data.message
      });
    }
    console.log(error);
  }
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const getCurrentUser = () => {
  try {
    const token = localStorage.getItem(tokenKey);
    http.setAuthToken(token);
    return jwt_decode(token);
  } catch (error) {
    return null;
  }
};

export const getToken = () => {
  return localStorage.getItem(tokenKey);
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem(tokenKey);
  http.setAuthToken(false);
  dispatch(setCurrentUser({}));
};

http.setAuthToken(getToken());
