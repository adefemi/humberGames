import React from "react";
import "./basicInfo.css";
import { Radio } from "../../components/radio/Radio";
import AppIcon from "../../components/icons/Icon";
import Input from "../../components/input/Input";
import { Button } from "../../components/button/Button";
import FormGroup from "../../components/formGroup/formGroup";
import infoIcon from "../../assets/images/cloud-info.svg";
import { Select } from "../../components/select/Select";

function PropertyBasicInfo(props) {
  return (
    <div className="basic-info-container">
      <div className="questions">
        Quick one!, Is this property for sale or rent?
      </div>
      <div className="radio-group">
        <Radio name="propertyCategory" label="For sale" />
        <Radio name="propertyCategory" label="For rent" />
      </div>

      <div className="item-group">
        <div className="questions">
          What documents are available for this property?
        </div>
        <div className="flex">
          <Input
            type="text"
            iconRight={<AppIcon name="search" type="feather" />}
            placeholder="Search Documents (e.g Governor’s consent...)"
          />
          <Button className="btn">
            <AppIcon name="plus" type="feather" />
          </Button>
        </div>
      </div>
      <section className="flex align-center info-section">
        <h3>Ok lets get on with the main information, shall we!</h3>
        <AppIcon name="ic_sentiment_satisfied" type="md" />
      </section>
      <br />
      <FormGroup
        label="Give your property a name"
        subLabel="This will allow you to easily find your property. Also, it gives
            your property some uniqueness"
      >
        <Input placeholder="Enter property name" />
      </FormGroup>

      <section className="flex align-center info-section">
        <h3>We want to know where your property is located!</h3>
      </section>
      <br />
      <div className="grid grid-2 grid-gap">
        <FormGroup
          label="Address"
          subLabel="Don’t worry, your address is safe with us."
        >
          <Input placeholder="Eg. 21 folakemi street" />
        </FormGroup>
        <FormGroup
          label="City"
          subLabel="Not so certain of the word here! Your town can be a CITY too."
        >
          <Input placeholder="Eg. Ikoyi" />
        </FormGroup>
        <FormGroup
          label="State"
          subLabel="Your region or province can be a STATE too."
        >
          <Input placeholder="Eg. Kaduna" />
        </FormGroup>
        <FormGroup
          label="Country"
          subLabel="We believe we all have a country. Just kidding."
        >
          <Input placeholder="Eg. Nigeria" />
        </FormGroup>
      </div>

      <div className="banner">
        <img src={infoIcon} alt="" />
        <div className="context">
          <h4>Quick Information</h4>
          <p>
            A property is like a container that contains many units. But a
            property can contain just a unit, its still same thing it will work
            fine.
          </p>
        </div>
        <div className="cast">Let’s continue pleasssss</div>
      </div>
      <br />
      <div className="grid grid-2 grid-gap">
        <FormGroup
          label="Unit title"
          subLabel="The title of one of the several units in your property."
        >
          <Input placeholder="Eg. Unit 51, or Buga's court" />
        </FormGroup>
        <FormGroup
          label="Choose your unit type"
          subLabel="Select the most appropriate category your unit falls under"
        >
          <Select
            placeholder="--select property type--"
            name="propertyType"
            optionList={[
              { title: "apartment", value: "apartment" },
              { title: "bungalow", value: "bungalow" },
              { title: "studio", value: "studio" },
              { title: "house", value: "house" }
            ]}
          />
        </FormGroup>
      </div>
      <div className="grid grid-3 grid-gap">
        <FormGroup label="How many bedrooms? ">
          <Select
            placeholder="--select bedroom--"
            name="bedroom"
            optionList={[
              { title: "1", value: "1" },
              { title: "2", value: "2" },
              { title: "3", value: "3" },
              { title: "4", value: "4" }
            ]}
          />
        </FormGroup>
        <FormGroup label="How many bathrooms? ">
          <Select
            placeholder="--select bathroom--"
            name="bathroom"
            optionList={[
              { title: "1", value: "1" },
              { title: "2", value: "2" },
              { title: "3", value: "3" },
              { title: "4", value: "4" }
            ]}
          />
        </FormGroup>

        <FormGroup label="How many parking space? ">
          <Select
            placeholder="--select parking--"
            name="parking"
            optionList={[
              { title: "1", value: "1" },
              { title: "2", value: "2" },
              { title: "3", value: "3" },
              { title: "4", value: "4" }
            ]}
          />
        </FormGroup>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

export default PropertyBasicInfo;
