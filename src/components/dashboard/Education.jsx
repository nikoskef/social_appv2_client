import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Table, Button } from "reactstrap";
import format from "date-fns/format";
import { deleteEducation } from "../../actions/profileActions";

class Education extends Component {
  onDeleteClick = id => () => {
    this.props.deleteEducation(id);
  };

  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          {format(new Date(edu.from), "dd/MMM/yyyy")}
          {" - "}
          {edu.to ? format(new Date(edu.to), "dd/MMM/yyyy") : "Now"}
        </td>
        <td>
          <Button onClick={this.onDeleteClick(edu._id)} color="danger">
            Delete
          </Button>
        </td>
      </tr>
    ));

    return (
      <div>
        <h4 className="mt-4 mb-3">Education Credentials</h4>
        <Table>
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{education}</tbody>
        </Table>
      </div>
    );
  }
}

const actions = {
  deleteEducation
};

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  actions
)(Education);
