import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Row, Button } from "reactstrap";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../../common/Spinner";
import ProfileActions from "./ProfileActions";

class Dashboard extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.getCurrentProfile();
    }
  }

  onDeleteClick = () => {
    this.props.deleteAccount();
  };

  render() {
    const { user } = this.props.auth;
    const { profile } = this.props.profile;
    const { loading } = this.props;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(profile).length !== 0) {
        dashboardContent = (
          <div>
            <p>
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            <Button onClick={this.onDeleteClick} color="danger">
              Delete my Account
            </Button>
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user && user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Button tag={Link} to="/create-profile" size="lg" color="info">
              Create Profile
            </Button>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <Container>
          <Row>
            <h1>Dashboard</h1>
          </Row>
          {dashboardContent}
        </Container>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

const actions = {
  getCurrentProfile,
  deleteAccount
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  loading: state.async.loading
});

export default connect(
  mapStateToProps,
  actions
)(Dashboard);
