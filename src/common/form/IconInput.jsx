import React from "react";
import { FormFeedback, Input, FormGroup, InputGroup, InputGroupText } from "reactstrap";

const IconInput = ({
  input,
  icon,
  width,
  autocomplete,
  type,
  placeholder,
  meta: { touched, error }
}) => {
  return (
    <FormGroup width={width}>
      <InputGroup>
        <InputGroupText>
          <i className={icon} />
        </InputGroupText>
        <Input
          autoComplete={autocomplete}
          invalid={touched && !!error}
          bsSize="lg"
          {...input}
          placeholder={placeholder}
          type={type}
        />
        {touched && !!error && <FormFeedback>{error}</FormFeedback>}
      </InputGroup>
    </FormGroup>
  );
};

export default IconInput;
