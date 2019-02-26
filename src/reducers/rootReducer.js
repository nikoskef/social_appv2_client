import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  form: FormReducer
});

export default rootReducer;
