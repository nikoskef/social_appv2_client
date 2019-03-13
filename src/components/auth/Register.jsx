import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Button, Col, Form, Container, Label, FormText } from "reactstrap";
import { registerUser } from "../../actions/authActions";
import TextInput from "../../common/form/TextInput";
import { validateRegister as validate } from "../../common/formValidation/formValidation";

class Register extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    const { handleSubmit, error, invalid, submitting, registerUser } = this.props;
    return (
      <Container>
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <h1 className=" display-4 text-center">Sign Up</h1>
          <p className="lead text-center">Create your DevConnector account</p>
          <Form onSubmit={handleSubmit(registerUser)}>
            <Field
              autoComplete="name"
              name="name"
              type="text"
              placeholder="Name"
              component={TextInput}
            />
            <Field
              autoComplete="username"
              name="email"
              type="email"
              placeholder="Email Address"
              component={TextInput}
            />
            <FormText>
              This site uses Gravatar so if you want a profile image, use a Gravatar email
            </FormText>
            <Field
              autoComplete="new-password"
              name="password"
              type="password"
              placeholder="Password"
              component={TextInput}
            />
            <Field
              autoComplete="new-password"
              name="password2"
              type="password"
              placeholder="Confirm Password"
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

const actions = {
  registerUser
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  actions
)(reduxForm({ form: "registerForm", validate })(Register));
