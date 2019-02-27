import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Container, Row, Col, Form, Button } from "reactstrap";
import PropTypes from "prop-types";

import TextInput from "../../common/form/TextInput";
import SelectInput from "../../common/form/SelectInput";
import IconInput from "../../common/form/IconInput";

const options = [
  { key: "Developer", text: "Developer", value: "Developer" },
  { key: "Junior Developer", text: "Junior Developer", value: "Junior Developer" },
  { key: "Senior Developer", text: "Senior Developer", value: "Senior Developer" },
  { key: "Manager", text: "Manager", value: "Manager" },
  { key: "Student or Learning", text: "Student or Learning", value: "Student or Learning" },
  { key: "Instructor or Teacher", text: "Instructor or Teacher", value: "Instructor or Teacher" },
  { key: "Intern", text: "Intern", value: "Intern" },
  { key: "Other", text: "Other", value: "Other" }
];

class CreateProfile extends Component {
  state = {
    displaySocialInputs: false,
    scriptLoaded: false
  };

  onSubmit = values => {
    console.log(values);
  };

  toggleSocial = () => {
    this.setState(prevState => ({
      displaySocialInputs: !prevState.displaySocialInputs
    }));
  };

  handleScriptLoaded = () => this.setState({ scriptLoaded: true });

  render() {
    const { handleSubmit } = this.props;
    const { displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <>
          <Field
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fa-fw fab fa-twitter"
            type="input"
            component={IconInput}
          />
          <Field
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fa-fw fab fa-facebook"
            type="input"
            component={IconInput}
          />
          <Field
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fa-fw fab fa-linkedin"
            type="input"
            component={IconInput}
          />
          <Field
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fa-fw fab fa-youtube"
            type="input"
            component={IconInput}
          />
          <Field
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fa-fw fab fa-instagram"
            type="input"
            component={IconInput}
          />
        </>
      );
    }

    return (
      <div className="create-profile">
        <Container>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">*= required</small>
              <Form onSubmit={handleSubmit(this.onSubmit)}>
                <Field
                  name="handle"
                  type="input"
                  placeholder="* Profile Handle"
                  component={TextInput}
                  //info="A unique handle for yout profile URL. Your full name, company name"
                />
                <Field
                  name="status"
                  options={options}
                  placeholder="Status"
                  component={SelectInput}
                  //info="Give us an idea of where you are at in your career"
                />
                <Field
                  name="company"
                  type="input"
                  placeholder="Company"
                  component={TextInput}
                  //info="Could be your own company or one you work for"
                />
                <Field
                  name="website"
                  type="input"
                  placeholder="Website"
                  component={TextInput}
                  //info="Could be your own website or a company one"
                />
                <Field
                  name="location"
                  type="input"
                  placeholder="Location"
                  component={TextInput}
                  //info="City or Town"
                />
                <Field
                  name="skills"
                  type="input"
                  placeholder="* Skills"
                  component={TextInput}
                  //info="Please use comma separated values(eg. HTML,CSS,JavaScript )"
                />
                <Field
                  name="githubusername"
                  type="input"
                  placeholder="Github Username"
                  component={TextInput}
                  //info="If you want your latest repos and a Github link, include your username"
                />
                <Field
                  name="bio"
                  type="textarea"
                  placeholder="Short Bio"
                  component={TextInput}
                  //info="Write something about your self"
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
                <style>
                  {`
                    @import url("https://use.fontawesome.com/releases/v5.7.2/css/all.css");
                  `}
                </style>
                <span className="text-muted"> Optional</span>
                {socialInputs}
                <Button color="info" block className="mt-4">
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

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  loading: state.async.loading
});

export default connect(mapStateToProps)(reduxForm({ form: "profileForm" })(CreateProfile));
