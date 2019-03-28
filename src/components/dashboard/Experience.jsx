import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Table, Button } from "reactstrap";
import format from "date-fns/format";
import { deleteExperience } from "../../actions/profileActions";

class Experience extends Component {
  onDeleteClick = id => () => {
    this.props.deleteExperience(id);
  };

  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          {format(new Date(exp.from), "dd/MMM/yyyy")}
          {" - "}
          {exp.to ? format(new Date(exp.to), "dd/MMM/yyyy") : "Now"}
        </td>
        <td>
          <Button onClick={this.onDeleteClick(exp._id)} color="danger">
            Delete
          </Button>
        </td>
      </tr>
    ));

    return (
      <div>
        <h4 className="mt-4 mb-3">Experience Credentials</h4>
        <Table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{experience}</tbody>
        </Table>
      </div>
    );
  }
}

const actions = {
  deleteExperience
};

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  actions
)(Experience);
