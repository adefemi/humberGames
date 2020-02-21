import React, { useState } from "react";
import { Radio } from "../../components/radio/Radio";
import AppIcon from "../../components/icons/Icon";
import Input from "../../components/input/Input";
import FormGroup from "../../components/formGroup/formGroup";
import infoIcon from "../../assets/images/cloud-info.svg";
import { Select } from "../../components/select/Select";
import FacilityDocument from "../../components/facilityDocument/facilityDocument";
import { Notification } from "../../components/notification/Notification";

function PropertyBasicInfo(props) {
  const [showNext, setShowNext] = useState(0);
  const [propData, setProperty] = useState({});
  const [propertyAddress, setPropertyAddress] = useState({});
  const [showDoc, setShowDoc] = useState(false);
  const [documents, setDocuments] = useState([]);

  const onChangeCategory = value => {
    setProperty({
      ...propData,
      category: value
    });
    if (value === "for_sale") {
      setShowDoc(true);
    } else {
      setShowDoc(false);
    }
  };
  const onSelectDocument = documents => {
    setDocuments(documents);
    if (documents.length < 1 && showNext > 0) {
      setShowNext(0);
    }
  };

  const genericChange = e => {
    setProperty({ ...propData, [e.target.name]: e.target.value });
  };

  const changeAddress = e => {
    setPropertyAddress({ ...propertyAddress, [e.target.name]: e.target.value });
  };

  const proceed = () => {
    if (showNext === 0 && showDoc) {
      if (documents.length > 0) {
        setShowNext(showNext > 1 ? showNext : 1);
      } else {
        Notification.bubble({
          type: "info",
          content: "You need to specify property documents"
        });
      }
    } else if (showNext === 1 && !propData.title) {
      Notification.bubble({
        type: "info",
        content: "You should give your property a name."
      });
    } else if (showNext === 2 && !checkAddress()) {
      Notification.bubble({
        type: "info",
        content: "Let's know where your property is located"
      });
    }
  };

  const checkAddress = _ => {
    if (
      propertyAddress.country &&
      propertyAddress.state &&
      propertyAddress.city &&
      propertyAddress.address
    ) {
      setShowNext(3);
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="basic-info-container">
      <div className="questions" data-aos="slide-right" data-aos-delay="200">
        Quick one!, Is this property for sale or rent?
      </div>
      <div className="radio-group" data-aos="fade-up" data-aos-delay="500">
        <Radio
          onChange={() => onChangeCategory("for_sale")}
          name="propertyCategory"
          label="For sale"
        />
        <Radio
          onChange={() => onChangeCategory("for_rent")}
          name="propertyCategory"
          label="For rent"
        />
      </div>
      <div id="snchor" />

      {showDoc && (
        <div className="item-group" data-aos="fade-up" data-aos-anchor="snchor">
          <div className="questions">
            What documents are available for this property?
          </div>
          <FacilityDocument onAdd={onSelectDocument} type="document" />
        </div>
      )}
      {showNext > 0 && (
        <>
          <section className="flex align-center info-section">
            <h3 data-aos="slide-right">
              Ok lets get on with the main information, shall we!
            </h3>
            <span data-aos="flip-right" data-aos-delay="200">
              <AppIcon name="ic_sentiment_satisfied" type="md" />
            </span>
          </section>
          <br />
          <div data-aos="fade-up" data-aos-delay="500" data-aos-anchor="snchor">
            <FormGroup
              label="Give your property a name"
              subLabel="This will allow you to easily find your property. Also, it gives
            your property some uniqueness"
            >
              <Input
                placeholder="Enter property name"
                onBlur={() => {
                  if (propData.title) {
                    setShowNext(showNext > 2 ? showNext : 2);
                  } else {
                    Notification.bubble({
                      type: "info",
                      content: "You should give your property a name."
                    });
                  }
                }}
                name="title"
                value={propData.title}
                onChange={genericChange}
              />
            </FormGroup>
          </div>
        </>
      )}

      {showNext > 1 && (
        <>
          <section
            className="flex align-center info-section"
            data-aos="slide-right"
          >
            <h3>We want to know where your property is located!</h3>
          </section>
          <br />
          <div className="grid grid-2 grid-gap">
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-anchor="snchor"
            >
              <FormGroup
                label="Country"
                subLabel="We believe we all have a country. Just kidding."
              >
                <Input
                  placeholder="Eg. Nigeria"
                  value={propertyAddress.country}
                  name="country"
                  onChange={changeAddress}
                  onBlur={checkAddress}
                />
              </FormGroup>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="500"
              data-aos-anchor="snchor"
            >
              <FormGroup
                label="State"
                subLabel="Your region or province can be a STATE too."
              >
                <Input
                  placeholder="Eg. Kaduna"
                  value={propertyAddress.state}
                  name="state"
                  onChange={changeAddress}
                  onBlur={checkAddress}
                />
              </FormGroup>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="700"
              data-aos-anchor="snchor"
            >
              <FormGroup
                label="City"
                subLabel="Not so certain of the word here! Your town can be a CITY too."
              >
                <Input
                  placeholder="Eg. Ikoyi"
                  value={propertyAddress.city}
                  name="city"
                  onChange={changeAddress}
                  onBlur={checkAddress}
                />
              </FormGroup>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="900"
              data-aos-anchor="snchor"
            >
              <FormGroup
                label="Address"
                subLabel="Don’t worry, your address is safe with us."
              >
                <Input
                  placeholder="Eg. 21 folakemi street"
                  value={propertyAddress.address}
                  name="address"
                  onChange={changeAddress}
                  onBlur={checkAddress}
                />
              </FormGroup>
            </div>
          </div>
        </>
      )}

      {showNext > 2 && (
        <>
          <div
            className="banner"
            data-aos="zoom-in-down"
            data-aos-anchor="snchor"
          >
            <img src={infoIcon} alt="" />
            <div className="context">
              <h4>Quick Information</h4>
              <p>
                A property is like a container that contains many units. But a
                property can contain just a unit, its still same thing it will
                work fine.
              </p>
            </div>
            <div className="cast">Let’s continue pleasssss</div>
          </div>
          <br />
          <div className="grid grid-2 grid-gap">
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-anchor="snchor"
            >
              <FormGroup
                label="Unit title"
                subLabel="The title of one of the several units in your property."
              >
                <Input placeholder="Eg. Unit 51, or Buga's court" />
              </FormGroup>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="500"
              data-aos-anchor="snchor"
            >
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
          </div>
          <div className="grid grid-3 grid-gap">
            <div
              data-aos="fade-up"
              data-aos-delay="700"
              data-aos-anchor="snchor"
            >
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
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="900"
              data-aos-anchor="snchor"
            >
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
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="1100"
              data-aos-anchor="snchor"
            >
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
          </div>
        </>
      )}
      {(showNext > 0 || showDoc) && (
        <div className="proceed" onClick={proceed}>
          Proceed &nbsp; <AppIcon name="ic_trending_flat" type="md" />
        </div>
      )}
      <br />
      <br />

      <br />
    </div>
  );
}

export default PropertyBasicInfo;
