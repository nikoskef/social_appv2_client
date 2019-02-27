import axios from "axios";
import { asyncActionStart, asyncActionFinish, asyncActionError } from "./asyncActions";
import { GET_PROFILE, CLEAR_CURRENT_PROFILE } from "./types";

export const getCurrentProfile = () => async dispatch => {
  dispatch(asyncActionStart());
  try {
    const res = await axios.get("http://localhost:5000/api/profile");
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
