import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Row, Container } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <Container>
            <Row>
              <Col className=" text-center">
                <h1 className="display-3 mb-4">Developer Connector</h1>
                <p className="lead">
                  {" "}
                  Create a developer profile/portfolio, share posts and get help from other
                  developers
                </p>
                <hr />
                <Button tag={Link} to="/register" size="lg" color="info">
                  Sign Up
                </Button>{" "}
                <Button tag={Link} to="/login" size="lg" color="success">
                  Login
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
