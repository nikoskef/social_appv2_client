import React from "react";
import { FormFeedback, Input, FormGroup } from "reactstrap";

const TextInput = ({ input, width, autocomplete, type, placeholder, meta: { touched, error } }) => {
  return (
    <FormGroup width={width}>
      <Input
        autoComplete={autocomplete}
        invalid={touched && !!error}
        bsSize="lg"
        {...input}
        placeholder={placeholder}
        type={type}
      />
      {touched && !!error && <FormFeedback>{error}</FormFeedback>}
    </FormGroup>
  );
};

export default TextInput;
