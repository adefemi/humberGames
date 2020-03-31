import React, { useState } from "react";
import Input from "../../components/input/Input";
import FormGroup from "../../components/formGroup/formGroup";
import { TextAreaField } from "../../components/textarea/TextAreaField";
import { Button } from "../../components/button/Button";

import agencyImg from "../../assets/images/no-image.jpg";

import "./AgencySetup.css";
import AddressController from "../../components/addressController/addressController";
import { axiosHandler } from "../../utils/axiosHandler";
import { AGENCY_URL } from "../../utils/urls";
import { getToken } from "../../utils/helper";
import { Notification } from "../../components/notification/Notification";
import { countryCode } from "../../utils/data";
import SelectInput from "../../components/selectInput/selectInput";

const AgencySetup = () => {
  const [agencyPropAddress, setAgencyPropAddress] = useState({});
  const [agencyName, setAgencyName] = useState("");
  const [rcNum, setRcNum] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [corporateEmail, setCorporateEmail] = useState("");

  const textAreaStyle = {
    borderRadius: "10px",
    background: "rgba(196,196,196,0.15)"
  };

  const agencySetupData = {
    name: agencyName,
    website: website,
    description: description,
    address_info: agencyPropAddress,
    corporate_email: corporateEmail,
    rc_number: rcNum
  };
  // const setupAgency = e => {
  //   e.preventDefault();
  //   axiosHandler("POST", AGENCY_URL, getToken(), agencySetupData)
  //     .then(res => {
  //       setAgencyName(agencyName);
  //     })
  //     .catch(err => {
  //       Notification.bubble({
  //         type: "error",
  //         content: "Unable to create agency"
  //       });
  //     });
  // };

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
      <div className="agency-location">
        <AddressController disableAnim onChange={setAgencyPropAddress} />
      </div>
      <div className="agency-phone-and-email grid grid-2 grid-gap">
        <FormGroup
          className="phone-num"
          label="Phone Number"
          subLabel="We want to be able to reach you very often to do business of course"
          required
        >
          {/* <Input placeholder="e.g. 0903 335 4195" className="phone-num-input" /> */}
          {/* <SelectInput
            defaultOption={{
              title: `234`,
              value: "234"
            }}
            selectPosition="left"
            minWidth={90}
            optionList={countryCode}
            selectName="country_code"
            // onChange={props.onValueChange}
            name="kin_phone_num"
            isCurrency={false}
            required
            type="number"
            // value={props.userBasicMain.kin_phone_num || null}
          /> */}
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
