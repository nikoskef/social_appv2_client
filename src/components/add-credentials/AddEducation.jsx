import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Row, Col, Form, Button, Label } from "reactstrap";
import TextInput from "../../common/form/TextInput";
import { addEducation } from "../../actions/profileActions";
import { validateEducation as validate } from "../../common/formValidation/formValidation";

import Spinner from "./../../common/Spinner";

class AddEducation extends Component {
  state = {
    disable: false
  };
  render() {
    const { handleSubmit, error, invalid, submitting, loading, addEducation } = this.props;
    return (
      <Container>
        <Row>
          <Col sm="12" md={{ size: 7, offset: 3 }}>
            <Button className="mt-4" tag={Link} to="/dashboard" outline color="secondary">
              Go Back
            </Button>
            <h1 className="display-4 text-center">Add Education</h1>
            <p className="lead text-center">
              Add any school, boot camp , etc that you have attended
            </p>
            <small className="d-block pb-3">*= required</small>

            <Form onSubmit={handleSubmit(addEducation)}>
              <Field name="school" type="input" placeholder="* School" component={TextInput} />
              <Field
                name="degree"
                type="input"
                placeholder="* Degree or Certification"
                component={TextInput}
              />
              <Field
                name="fieldofstudy"
                type="input"
                placeholder="* Field of Study"
                component={TextInput}
              />
              <h6>From Date</h6>
              <Field name="from" type="date" component={TextInput} />
              <h6>To Date</h6>
              <Field name="to" type="date" component={TextInput} disabled={this.state.disabled} />
              <Label for="checkbox">
                <Field
                  name="current"
                  type="checkbox"
                  id="checkbox"
                  onChange={this.onCheck}
                  component={TextInput}
                />
                Current Job
              </Label>

              <Field
                name="description"
                type="textarea"
                placeholder="Program Description"
                component={TextInput}
                info="Tell us about the program that you were in"
              />

              <div>{error && <Label className="text-danger">{error}</Label>}</div>

              <Button disabled={invalid || submitting} color="info" block className="mt-4">
                {loading ? <Spinner /> : "Submit"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

const actions = {
  addEducation
};

export default connect(
  mapStateToProps,
  actions
)(reduxForm({ form: "educationForm", validate, enableReinitialize: true })(AddEducation));
