import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { Container, Row, Col, Form, Button, Label } from "reactstrap";
import PropTypes from "prop-types";

import TextInput from "./../../common/form/TextInput";
import { addExperience } from "../../actions/profileActions";
import Spinner from "./../../common/Spinner";
import { validateExperience as validate } from "../../common/formValidation/formValidation";

class AddExperience extends Component {
  state = {
    disabled: false
  };

  //   async componentDidMount() {
  //       await this.props.getExperience()
  //   }

  onCheck = () => {
    this.setState({
      disabled: !this.state.disabled
    });
  };

  onSubmit = values => {
    console.log(values);
  };

  render() {
    const { handleSubmit, error, invalid, submitting, addExperience, loading } = this.props;
    return (
      <Container>
        <Row>
          <Col sm="12" md={{ size: 7, offset: 3 }}>
            <Button className="mt-4" tag={Link} to="/dashboard" outline color="secondary">
              Go Back
            </Button>
            <h1 className="display-4 text-center">Add Experience</h1>
            <p className="lead text-center">
              Add any job or position that you have had in the past or current
            </p>
            <small className="d-block pb-3">*= required</small>

            <Form onSubmit={handleSubmit(addExperience)}>
              <Field name="company" type="input" placeholder="* Company" component={TextInput} />
              <Field name="title" type="input" placeholder="* Job Title" component={TextInput} />
              <Field name="location" type="input" placeholder="Location" component={TextInput} />
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
                placeholder="Job Description"
                component={TextInput}
                info="Tell us about the position"
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

AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired
};

const actions = {
  addExperience
};

const mapStateToProps = state => ({
  profile: state.profile,
  loading: state.async.loading
});

export default connect(
  mapStateToProps,
  actions
)(reduxForm({ form: "experienceForm", validate, enableReinitialize: true })(AddExperience));
