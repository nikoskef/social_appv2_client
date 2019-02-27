import React from "react";
import { FormFeedback, Input, FormGroup } from "reactstrap";
const SelectInput = ({ input, options, placeholder, meta: { touched, error } }) => {
  return (
    <FormGroup>
      <Input
        value={input.value || "Drinks"}
        onChange={e => input.onChange(e.target.value)}
        invalid={touched && !!error}
        bsSize="lg"
        placeholder={placeholder}
        type="select"
      >
        {options.map(option => {
          return <option key={option.key}>{option.text}</option>;
        })}
      </Input>
      {touched && !!error && <FormFeedback>{error}</FormFeedback>}
    </FormGroup>
  );
};

export default SelectInput;
