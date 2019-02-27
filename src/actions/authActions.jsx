import axios from "axios";
import { SubmissionError } from "redux-form";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER } from "./types";

export const registerUser = (userData, ...rest) => async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/users/register", userData);
    const { history } = rest[1];
    history.push("/login");
  } catch (error) {
    throw new SubmissionError({
      _error: error.response.data.message
    });
  }
};

export const loginUser = userData => async dispatch => {
  try {
    const res = await axios.post("/api/users/login", userData);
    const { token } = res.data;
    localStorage.setItem("jwtToken", token);
    setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(setCurrentUser(decoded));
  } catch (error) {
    console.log(error);
    throw new SubmissionError({
      _error: error.message
    });
  }
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
