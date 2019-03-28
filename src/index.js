import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import ReduxToastr from "react-redux-toastr";
import "./index.css";
import App from "./App.jsx";
import store from "./store";
import * as serviceWorker from "./serviceWorker";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
//import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <Provider store={store}>
    <ReduxToastr position="bottom-right" transitionIn="fadeIn" transitionOut="fadeOut" />
    <App />
  </Provider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
