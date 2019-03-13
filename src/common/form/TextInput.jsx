import React from "react";
import { FormFeedback, Input, FormGroup } from "reactstrap";

const TextInput = ({ input, width, info, meta: { touched, error }, ...rest }) => {
  return (
    <FormGroup width={width}>
      <Input {...rest} invalid={touched && !!error} bsSize="lg" {...input} />
      {info && <small className="form-text text-muted">{info}</small>}
      {touched && !!error && <FormFeedback>{error}</FormFeedback>}
    </FormGroup>
  );
};

export default TextInput;
