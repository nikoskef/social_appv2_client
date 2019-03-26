import React from "react";
import { Field } from "redux-form";
import IconInput from "../../common/form/IconInput";

const SocialInputs = () => {
  return (
    <>
      <Field
        placeholder="Twitter Profile URL"
        name="twitter"
        icon="fa-fw fab fa-twitter"
        type="input"
        component={IconInput}
      />
      <Field
        placeholder="Facebook Page URL"
        name="facebook"
        icon="fa-fw fab fa-facebook"
        type="input"
        component={IconInput}
      />
      <Field
        placeholder="Linkedin Profile URL"
        name="linkedin"
        icon="fa-fw fab fa-linkedin"
        type="input"
        component={IconInput}
      />
      <Field
        placeholder="YouTube Channel URL"
        name="youtube"
        icon="fa-fw fab fa-youtube"
        type="input"
        component={IconInput}
      />
      <Field
        placeholder="Instagram Page URL"
        name="instagram"
        icon="fa-fw fab fa-instagram"
        type="input"
        component={IconInput}
      />
    </>
  );
};

export default SocialInputs;
