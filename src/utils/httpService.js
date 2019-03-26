import axios from "axios";
// import logger from "./logService";
// import { toast } from "react-toastify";

axios.defaults.baseURL = process.env.REACT_APP_URI;

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response && error.response.status >= 400 && error.response.status < 500;
  if (!expectedError) {
    console.log(error);
    // logger.log(error);
    // toast.error("An unexpected error occurred.");
  }

  return Promise.reject(error);
});

function setAuthToken(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setAuthToken
};
