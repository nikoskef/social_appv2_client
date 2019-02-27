import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import asyncReducer from "./asyncReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  form: FormReducer,
  profile: profileReducer,
  async: asyncReducer
});

export default rootReducer;
