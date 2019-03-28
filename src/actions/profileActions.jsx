import { toastr } from "react-redux-toastr";
import { SubmissionError } from "redux-form";
import http from "../utils/httpService";
import { asyncActionStart, asyncActionFinish, asyncActionError } from "./asyncActions";
import { GET_PROFILE, CLEAR_CURRENT_PROFILE, SET_CURRENT_USER } from "./types";

const toast_success = message => {
  toastr.success("Success!", message);
};

const toast_error = () => {
  toastr.error("Oops!", "Something went wrong");
};

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
    dispatch(asyncActionError());
    throw new SubmissionError({
      _error: error.response.data.message
    });
  }
};

export const addExperience = (expData, ...rest) => async dispatch => {
  dispatch(asyncActionStart());
  try {
    const { history } = rest[1];
    await http.post("/profile/experience", expData);
    dispatch(asyncActionFinish());
    history.push("/dashboard");
    toast_success("Experience Added!");
  } catch (error) {
    dispatch(asyncActionError());
    throw new SubmissionError({
      _error: error.response.data.message
    });
  }
};

export const addEducation = (eduData, ...rest) => async dispatch => {
  dispatch(asyncActionStart());
  try {
    const { history } = rest[1];
    await http.post("/profile/education", eduData);
    dispatch(asyncActionFinish());
    history.push("/dashboard");
    toast_success("Education Added!");
  } catch (error) {
    dispatch(asyncActionError());
    throw new SubmissionError({
      _error: error.response.data.message
    });
  }
};

export const deleteExperience = id => async dispatch => {
  try {
    const res = await http.delete(`/profile/experience/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
    toast_success("Experience Deleted!");
  } catch (error) {
    toast_error();
  }
};

export const deleteEducation = id => async dispatch => {
  try {
    const res = await http.delete(`/profile/education/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
    toast_success("Education Deleted!");
  } catch (error) {
    toast_error();
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
