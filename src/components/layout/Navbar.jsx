import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem,
  Container
} from "reactstrap";

import { logoutUser } from "../../actions/authActions";
import { clearProfile } from "../../actions/profileActions";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  onLogoutClick = () => {
    this.props.clearProfile();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink onClick={this.onLogoutClick} tag={Link} to="/">
            <img
              className="rounded-circle"
              style={{ width: "30px", marginRight: "5px" }}
              src={user.avatar}
              alt={user.name}
              title="Something"
            />
            LogOut
          </NavLink>
        </NavItem>
      </Nav>
    );

    const guestLinks = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink tag={Link} to="/register">
            Sign Up
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/login">
            Login
          </NavLink>
        </NavItem>
      </Nav>
    );

    return (
      <Navbar className="header" color="dark" dark expand="md">
        <Container>
          <NavbarBrand tag={Link} to="/">
            DevConnector
          </NavbarBrand>

          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/profiles">
                  Developers
                </NavLink>
              </NavItem>
            </Nav>
            {isAuthenticated ? authLinks : guestLinks}
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const actions = {
  logoutUser,
  clearProfile
};

export default connect(
  mapStateToProps,
  actions
)(Header);
