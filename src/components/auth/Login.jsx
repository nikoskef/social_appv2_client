import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Button, Col, Form, Container, Label } from "reactstrap";
import TextInput from "../../common/form/TextInput";
import { email, requiredEmail, requiredPassword } from "../../common/formValidation/formValidation";

const onSubmit = values => {
  const newUser = { ...values };
  console.log(newUser);
};

const Login = ({ handleSubmit, error, invalid, submitting }) => {
  return (
    <Container>
      <Col sm="12" md={{ size: 8, offset: 2 }}>
        <h1 className=" display-4 text-center">Log In</h1>
        <p className="lead text-center">Sign in to your DevConnector account</p>
        <Form onSubmit={handleSubmit(onSubmit)}>
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

          {error && <Label>{error}</Label>}
          <Button disabled={invalid || submitting} color="info" block>
            Submit
          </Button>
        </Form>
      </Col>
    </Container>
  );
};

export default connect(null)(reduxForm({ form: "loginForm" })(Login));
