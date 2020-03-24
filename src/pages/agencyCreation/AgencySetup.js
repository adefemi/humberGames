import React from "react";
import Input from "../../components/input/Input";
import FormGroup from "../../components/formGroup/formGroup";
import { TextAreaField } from "../../components/textarea/TextAreaField";
import { Button } from "../../components/button/Button";

import agencyImg from "../../assets/images/no-image.jpg";

import "./AgencySetup.css";

const AgencySetup = () => {
  const textAreaStyle = {
    borderRadius: "10px",
    background: "rgba(196,196,196,0.15)"
  };
  return (
    <div className="agency-setup-container">
      <div className="agency-setup-hints">
        <h2>Create your agency info.</h2>
        <p>* Fields are required</p>
      </div>
      <div className="agency-name-and-logo">
        <p>
          Give your agency a name <span>*</span>
        </p>
        <div className="flex">
          <Input
            placeholder="Agency name (e.g. The Elites)"
            className="agency-name"
          />
          <div className="agency-logo-container">
            <div
              className="agency-logo"
              style={{ backgroundImage: `url(${agencyImg})` }}
            ></div>
            <p>Upload agency logo</p>
          </div>
        </div>
      </div>
      <p className="location-hint">
        Where is your agency located? <span>Use current location!</span>
      </p>
      <div className="agency-location grid grid-2">
        <FormGroup
          className="address"
          label="Address"
          subLabel="Rest assured, your address will not be disclosed to a third party"
          required
        >
          <Input
            placeholder="e.g. 74 Raymond Njoku Street"
            className="address-input"
          />
        </FormGroup>
        <FormGroup
          className="city"
          label="City"
          subLabel="Your town can be a city too"
          required
        >
          <Input placeholder="e.g. Ikoyi" className="city-input" />
        </FormGroup>
        <FormGroup
          className="state"
          label="State"
          subLabel="Your region or province can be used as a state too"
          required
        >
          <Input placeholder="e.g. Lagos" className="state-input" />
        </FormGroup>
        <FormGroup
          className="country"
          label="Country"
          subLabel="Your country is simply your country"
          required
        >
          <Input placeholder="e.g. Nigeria" className="country-input" />
        </FormGroup>
        <FormGroup
          className="phone-num"
          label="Phone Number"
          subLabel="We want to be able to reach you very often to do business of course"
          required
        >
          <Input placeholder="e.g. 0903 335 4195" className="phone-num-input" />
        </FormGroup>
        <FormGroup
          className="corporate-email"
          label="Corporate Email"
          subLabel="Your official mail with which we can keep in touch"
          required
        >
          <Input
            placeholder="e.g. theelites@theelites.com"
            className="corporate-email-input"
          />
        </FormGroup>
      </div>
      <p className="corporate-hint">Let's get a bit more corporate</p>
      <div className="corporate-details grid grid-2">
        <FormGroup
          className="rc-number"
          label="RC Number"
          subLabel="We need your RC number to validate your agency"
          required
        >
          <Input className="rc-number-input" />
        </FormGroup>
        <FormGroup
          className="website"
          label="Website"
          subLabel="Yes, we would like to advertise you to the world"
          required
        >
          <Input
            placeholder="e.g. www.theelites.com"
            className="website-input"
          />
        </FormGroup>
      </div>
      <FormGroup
        className="description"
        label="Description"
        subLabel="Tell us about your agency"
      >
        <TextAreaField style={textAreaStyle} />
      </FormGroup>
      <div align="center">
        <Button className="create-agency">Create Agency</Button>
      </div>
    </div>
  );
};

export default AgencySetup;
