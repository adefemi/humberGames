import React, { useState, useEffect } from "react";
import Input from "../../components/input/Input";
import FormGroup from "../../components/formGroup/formGroup";
import { TextAreaField } from "../../components/textarea/TextAreaField";
import { Button } from "../../components/button/Button";
import _ from "lodash";

import agencyImg from "../../assets/images/no-image.jpg";

import "./AgencySetup.css";
import AddressController from "../../components/addressController/addressController";
import { axiosHandler } from "../../utils/axiosHandler";
import { AGENCY_URL } from "../../utils/urls";
import { getToken } from "../../utils/helper";
import { Notification } from "../../components/notification/Notification";
import { countryCode } from "../../utils/data";
import SelectInput from "../../components/selectInput/selectInput";
import { useHistory } from "react-router-dom";
import FileUploadNew from "../../components/fileUploadNew/fileUploadNew";
import { Spinner } from "../../components/spinner/Spinner";

const AgencySetup = () => {
  let history = useHistory();
  const [agencyPropAddress, setAgencyPropAddress] = useState({
    address: "",
    city: "",
    state: "",
    country: ""
  });
  const [agencyName, setAgencyName] = useState("");
  const [rcNum, setRcNum] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [corporateEmail, setCorporateEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [agencyLogoId, setAgencyLogoId] = useState(null);
  const [agencyLogo, setAgencyLogo] = useState(null);
  const [logoLoader, setLogoLoader] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const textAreaStyle = {
    borderRadius: "10px",
    background: "rgba(196,196,196,0.15)"
  };

  const agencySetupData = {
    name: agencyName,
    website: website,
    description: description,
    address: agencyPropAddress.address,
    city: agencyPropAddress.city,
    state: agencyPropAddress.state,
    country: agencyPropAddress.country,
    corporate_email: corporateEmail,
    rc_number: rcNum,
    phone_number: phoneNum,
    corporate_logo: agencyLogoId
  };

  const spin = showSpinner ? null : { display: "none" };

  const setupAgency = e => {
    e.preventDefault();
    setPhoneNum(true);
    axiosHandler("POST", AGENCY_URL, getToken(), agencySetupData)
      .then(res => {
        setShowSpinner(false);
        Notification.bubble({
          type: "success",
          content: "Agency setup was successful"
        });
        history.push({
          pathname: "/dashboard/agency"
        });
      })
      .catch(err => {
        Notification.bubble({
          type: "error",
          content: "Unable to create agency"
        });
        setShowSpinner(false);
      });
  };

  const fileChange = e => {
    if (!e[0]) return;
    setLogoLoader(true);
    if (e[0].completed) {
      setAgencyLogoId(e[0].id);
      setAgencyLogo(e[0].src);
      setLogoLoader(false);
    }
  };

  const onValueChange = e => {
    let data = {};
    e.map(item => {
      data[item.target.name] = item.target.value;
      return null;
    });
    setPhoneNum(data.agency_phone_num);
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
            value={agencyName}
            onChange={e => setAgencyName(e.target.value)}
          />
          <div className="agency-logo-container">
            <div
              className="agency-logo"
              style={{
                backgroundImage: `url(${agencyLogo || agencyImg})`
              }}
            />
            <div>
              <FileUploadNew
                disabled={logoLoader}
                multiple={false}
                single={true}
                onChange={fileChange}
                token={getToken()}
              >
                {logoLoader ? <Spinner /> : <p>Upload agency logo</p>}
              </FileUploadNew>
            </div>
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
          <SelectInput
            defaultOption={countryCode[0]}
            placeholder="phone number"
            selectPosition="left"
            minWidth={90}
            optionList={countryCode}
            selectName="country_code"
            onChange={onValueChange}
            name="agency_phone_num"
            isCurrency={false}
            required
            type="number"
            value={phoneNum}
          />
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
            onChange={e => setCorporateEmail(e.target.value)}
            value={corporateEmail}
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
          <Input
            className="rc-number-input"
            onChange={e => setRcNum(e.target.value)}
            value={rcNum}
          />
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
            onChange={e => setWebsite(e.target.value)}
            value={website}
          />
        </FormGroup>
      </div>
      <FormGroup
        className="description"
        label="Description"
        subLabel="Tell us about your agency"
      >
        <TextAreaField
          style={textAreaStyle}
          onChange={e => setDescription(e.target.value)}
          value={description}
        />
      </FormGroup>
      <div align="center">
        <Button onClick={setupAgency} className="create-agency">
          Create Agency
          <div style={spin}>
            <Spinner />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default AgencySetup;
