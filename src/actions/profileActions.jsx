import { SubmissionError } from "redux-form";
import http from "../utils/httpService";
import { asyncActionStart, asyncActionFinish, asyncActionError } from "./asyncActions";
import { GET_PROFILE, CLEAR_CURRENT_PROFILE, SET_CURRENT_USER } from "./types";

export const getCurrentProfile = () => async dispatch => {
  dispatch(asyncActionStart());
  try {
    const res = await http.get("/profile");
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

export const createProfile = (profileData, ...rest) => async dispatch => {
  dispatch(asyncActionStart());
  try {
    await http.post("/profile", profileData);
    const { history } = rest[1];
    dispatch(asyncActionFinish());
    history.push("/dashboard");
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
    throw new SubmissionError({
      _error: error.response.data.message
    });
  }
};

export const deleteAccount = () => async dispatch => {
  if (window.confirm("Are you sure? This can Not be undone!")) {
    await http.delete("/profile");
    dispatch({
      type: CLEAR_CURRENT_PROFILE
    });
    dispatch({
      type: SET_CURRENT_USER,
      payload: {}
    });
  }
};

export const clearProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
