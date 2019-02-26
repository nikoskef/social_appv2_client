import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Button, Col, Form, Container, Label } from "reactstrap";
import { registerUser } from "../../actions/authActions";
import TextInput from "../../common/form/TextInput";
import {
  email,
  requiredEmail,
  requiredName,
  requiredPassword
} from "../../common/formValidation/formValidation";

class Register extends Component {
  onSubmit = values => {
    const newUser = { ...values };
    console.log(newUser);
  };

  render() {
    const { handleSubmit, error, invalid, submitting } = this.props;
    return (
      <Container>
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <h1 className=" display-4 text-center">Sign Up</h1>
          <p className="lead text-center">Create your DevConnector account</p>
          <Form onSubmit={handleSubmit(this.onSubmit)}>
            <Field
              autocomplete="name"
              name="name"
              type="text"
              placeholder="Name"
              validate={requiredName}
              component={TextInput}
            />
            <Field
              autocomplete="username"
              name="email"
              type="email"
              validate={[email, requiredEmail]}
              placeholder="Email Address"
              component={TextInput}
            />
            <small className="form-text text-muted">
              This site uses Gravatar so if you want a profile image, use a Gravatar email
            </small>
            <Field
              autocomplete="new-password"
              name="password"
              type="password"
              validate={requiredPassword}
              placeholder="Password"
              component={TextInput}
            />
            <Field
              autocomplete="new-password"
              name="password2"
              type="password"
              validate={requiredPassword}
              placeholder="Confirm Password"
              component={TextInput}
            />
            {error && <Label>{error}</Label>}
            <Button disabled={invalid || submitting} color="info" block>
              Submit
            </Button>
          </Form>
        </Col>
      </Container>
    );
  }
}

const actions = {
  registerUser
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  actions
)(reduxForm({ form: "registerForm" })(Register));
