import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { getCurrentUser } from "./actions/authActions";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearProfile } from "./actions/profileActions";
import store from "./store";
import Header from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./common/PrivateRoute";
import CreateProfile from "./components/create-profile/CreateProfile";

import "./App.css";

//Check for token and set header

const user = getCurrentUser();
if (user) {
  store.dispatch(setCurrentUser(user));

  //Check for expired token
  const currentTime = Date.now() / 1000;
  if (user.exp < currentTime) {
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
            </Switch>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
