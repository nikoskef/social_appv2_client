import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { Container, Row, Col, Form, Button, Label } from "reactstrap";
import PropTypes from "prop-types";

import TextInput from "../../common/form/TextInput";
import SelectInput from "../../common/form/SelectInput";
import SocialInputs from "./SocialInputs";
import { selectOptions } from "./selectOptions";
import { validateProfile as validate } from "../../common/formValidation/formValidation";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";

class ProfileForm extends Component {
  state = {
    displaySocialInputs: false,
    scriptLoaded: false
  };

  async componentDidMount() {
    await this.props.getCurrentProfile();
  }

  onSubmit = values => {
    console.log(values);
  };

  toggleSocial = () => {
    this.setState(prevState => ({
      displaySocialInputs: !prevState.displaySocialInputs
    }));
  };

  render() {
    const { handleSubmit, error, invalid, submitting, createProfile } = this.props;
    const { displaySocialInputs } = this.state;

    return (
      <div className="create-profile">
        <Container>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <Button className="mt-4" tag={Link} to="/dashboard" outline color="secondary">
                Go Back
              </Button>
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">*= required</small>
              <Form onSubmit={handleSubmit(createProfile)}>
                <Field
                  name="handle"
                  type="input"
                  placeholder="* Profile Handle"
                  component={TextInput}
                  info="A unique handle for your profile URL. Your full name, company name"
                />
                <Field
                  name="status"
                  options={selectOptions}
                  placeholder="Status"
                  component={SelectInput}
                  info="Give us an idea of where you are at in your career"
                />
                <Field
                  name="company"
                  type="input"
                  placeholder="Company"
                  component={TextInput}
                  info="Could be your own company or one you work for"
                />
                <Field
                  name="website"
                  type="input"
                  placeholder="Website"
                  component={TextInput}
                  info="Could be your own website or a company one"
                />
                <Field
                  name="location"
                  type="input"
                  placeholder="Location"
                  component={TextInput}
                  info="City or Town"
                />
                <Field
                  name="skills"
                  type="input"
                  placeholder="* Skills"
                  component={TextInput}
                  info="Please use comma separated values(eg. HTML,CSS,JavaScript )"
                />
                <Field
                  name="githubusername"
                  type="input"
                  placeholder="Github Username"
                  component={TextInput}
                  info="If you want your latest repos and a Github link, include your username"
                />
                <Field
                  name="bio"
                  type="textarea"
                  placeholder="Short Bio"
                  component={TextInput}
                  info="Write something about your self"
                />
                <Button
                  onClick={this.toggleSocial}
                  outline
                  type="button"
                  color="secondary"
                  className="mb-4 mr-2"
                >
                  Add Social Network Links
                </Button>

                <span className="text-muted"> Optional</span>
                {displaySocialInputs && <SocialInputs />}
                <div>{error && <Label className="text-danger">{error}</Label>}</div>
                <Button disabled={invalid || submitting} color="info" block className="mt-4">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  let profile = {};
  if (state.profile.profile) {
    profile = state.profile.profile;
  }

  if (profile.social) {
    profile = { ...profile.social, ...profile };
  }

  return {
    initialValues: profile,
    profile,
    loading: state.async.loading
  };
};

const actions = {
  createProfile,
  getCurrentProfile
};

export default connect(
  mapStateToProps,
  actions
)(reduxForm({ form: "profileForm", validate, enableReinitialize: true })(ProfileForm));
