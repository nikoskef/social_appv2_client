import axios from "axios";
import { SubmissionError } from "redux-form";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER } from "./types";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_URI}/users`,
  timeout: 3000
});

export const registerUser = (userData, ...rest) => async () => {
  try {
    await axiosInstance.post("/register", userData);
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
    const { history } = rest[1];
    const res = await axiosInstance.post("/login", userData);
    const { token } = res.data;
    localStorage.setItem("jwtToken", token);
    setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(setCurrentUser(decoded));
    history.push("/dashboard");
  } catch (error) {
    console.log(error);
    throw new SubmissionError({
      _error: "Invalid Credentials" //error.response.data.message
    });
  }
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
