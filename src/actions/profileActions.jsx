import axios from "axios";
import { asyncActionStart, asyncActionFinish, asyncActionError } from "./asyncActions";
import { GET_PROFILE, CLEAR_CURRENT_PROFILE } from "./types";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_URI,
  timeout: 3000
});

export const getCurrentProfile = () => async dispatch => {
  dispatch(asyncActionStart());
  try {
    const res = await axiosInstance.get("/profile");
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
    dispatch(asyncActionFinish());
  } catch (error) {
    dispatch({
      type: GET_PROFILE,
      payload: {}
    });
    dispatch(asyncActionError());
  }
};

export const clearProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
