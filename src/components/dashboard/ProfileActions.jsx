import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const ProfileActions = () => {
  return (
    <div>
      <Link to="/edit-profile">
        <Button color="link">
          <i className="fas fa-user-circle text-info mr-1" />
          Edit Profile
        </Button>
      </Link>
      <Link to="/edit-profile">
        <Button color="link">
          <i className="fab fa-black-tie text-info mr-1" />
          Add Experience
        </Button>
      </Link>
      <Link to="/edit-profile">
        <Button color="link">
          <i className="fas fa-graduation-cap text-info mr-1" />
          Add Education
        </Button>
      </Link>
      <style>{`@import url("https://use.fontawesome.com/releases/v5.7.2/css/all.css");`}</style>
    </div>
  );
};

export default ProfileActions;
