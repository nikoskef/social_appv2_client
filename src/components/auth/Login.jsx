import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Button, Col, Form, Container, Label } from "reactstrap";
import TextInput from "../../common/form/TextInput";
import { email, requiredEmail, requiredPassword } from "../../common/formValidation/formValidation";
import { loginUser } from "../../actions/authActions";

class Login extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    const { handleSubmit, error, invalid, submitting, loginUser } = this.props;
    return (
      <Container>
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <h1 className=" display-4 text-center">Log In</h1>
          <p className="lead text-center">Sign in to your DevConnector account</p>
          <Form onSubmit={handleSubmit(loginUser)}>
            <Field
              autocomplete="username"
              name="email"
              type="email"
              validate={[email, requiredEmail]}
              placeholder="Email Address"
              component={TextInput}
            />

            <Field
              autocomplete="new-password"
              name="password"
              type="password"
              validate={requiredPassword}
              placeholder="Password"
              component={TextInput}
            />

            {error && <Label className="text-danger">{error}</Label>}
            <Button disabled={invalid || submitting} color="info" block>
              Submit
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
  auth: state.auth
});

const actions = {
  loginUser
};

export default connect(
  mapStateToProps,
  actions
)(reduxForm({ form: "loginForm" })(Login));
