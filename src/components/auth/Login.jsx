import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import { Button, Col, Form, Container, Label } from "reactstrap";
import TextInput from "../../common/form/TextInput";

import { loginUser } from "../../actions/authActions";
import { validateLogin as validate } from "../../common/formValidation/formValidation";
import Spinner from "./../../common/Spinner";

class Login extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    const { handleSubmit, error, invalid, submitting, loginUser, loading } = this.props;
    return (
      <Container>
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <h1 className=" display-4 text-center">Log In</h1>
          <p className="lead text-center">Sign in to your DevConnector account</p>
          <Form onSubmit={handleSubmit(loginUser)}>
            <Field
              autoComplete="username"
              name="email"
              type="text"
              placeholder="Email Address"
              component={TextInput}
            />

            <Field
              autoComplete="new-password"
              name="password"
              type="password"
              placeholder="Password"
              component={TextInput}
            />

            {error && <Label className="text-danger">{error}</Label>}
            <Button disabled={invalid || submitting} color="info" block>
              {loading ? <Spinner /> : "Submit"}
            </Button>
          </Form>
        </Col>
      </Container>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  loading: state.async.loading
});

const actions = {
  loginUser
};

export default connect(
  mapStateToProps,
  actions
)(reduxForm({ form: "loginForm", validate })(Login));
