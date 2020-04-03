import React, { useEffect, useState } from "react";
import { Radio } from "../../components/radio/Radio";
import AppIcon from "../../components/icons/Icon";
import Input from "../../components/input/Input";
import FormGroup from "../../components/formGroup/formGroup";
import infoIcon from "../../assets/images/cloud-info.svg";
import { Select } from "../../components/select/Select";
import FacilityDocument from "../../components/facilityDocument/facilityDocument";
import { Notification } from "../../components/notification/Notification";
import AddressController from "../../components/addressController/addressController";
import UnitTypeModel from "./unitTypeModel";
import { getArrayCount, getToken } from "../../utils/helper";
import { Spinner } from "../../components/spinner/Spinner";
import { axiosHandler } from "../../utils/axiosHandler";
import {
  GENERIC_DOCUMENT_URL,
  PROPERTY_CONTROLLER_URL,
  UNIT_CONTROLLER_URL
} from "../../utils/urls";
import SelectInput from "../../components/selectInput/selectInput";
import { secondaryColor, sizeOptions } from "../../utils/data";
import cloneDeep from "lodash/cloneDeep";

function PropertyBasicInfo(props) {
  const [showNext, setShowNext] = useState(props.edit ? 10 : 0);
  const [propData, setProperty] = useState({});
  const [propertyAddress, setPropertyAddress] = useState({});
  const [showDoc, setShowDoc] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [singleUnit, setSingleUnit] = useState(false);
  const [unitType, setUnitType] = useState({});
  const [requirementLists, setRequirementList] = useState([
    "bedroom",
    "bathroom",
    "parking"
  ]);

  useEffect(() => {
    if (props.edit) {
      getUnitData();
    }
  }, [props.fetching]);

  const getUnitData = () => {
    if (props.fetching) return;
    const unitInfo = cloneDeep(props.unitInfo);
    setProperty({
      size_type: unitInfo.size_type,
      size: unitInfo.size,
      bedroom: unitInfo.bedroom,
      bathroom: unitInfo.bathroom,
      parking: unitInfo.parking,
      category: unitInfo.category,
      unit_title: unitInfo.title
    });
    setUnitType({
      title: unitInfo.unit_type.title,
      value: unitInfo.unit_type
    });
    if (unitInfo.category === "sale") {
      setShowDoc(true);
    }
  };

  const changePropertyType = value => {
    if (value === "single") {
      setProperty({
        ...propData,
        unit_title: propData.title
      });
      setSingleUnit(true);
    } else {
      setProperty({
        ...propData,
        unit_title: ""
      });
      setSingleUnit(false);
    }
  };

  const onChangeCategory = value => {
    setProperty({
      ...propData,
      category: value
    });
    if (value === "sale") {
      setShowDoc(true);
    } else {
      setShowNext(showNext > 1 ? showNext : 1);
      setShowDoc(false);
    }
  };
  const onSelectDocument = documents => {
    setDocuments(documents);
  };

  const genericChange = e => {
    if (e.target.name === "unit_type_id") {
      setRequirementList(e.target.value.unit_factor.map(item => item.value));
      setProperty({
        ...propData,
        [e.target.name]: e.target.value.id
      });
    } else {
      setProperty({ ...propData, [e.target.name]: e.target.value });
    }
  };

  const proceed = () => {
    if (props.edit) {
      document.getElementById("submitButt").click();
      return;
    }
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
    } else if (showNext > 2) {
      document.getElementById("submitButt").click();
    }
  };

  useEffect(() => {
    if (showNext === 2) {
      setTimeout(() => {
        try {
          document
            .getElementById("section2")
            .scrollIntoView({ behavior: "smooth" });
        } catch (e) {}
      }, 500);
    } else if (showNext === 3) {
      setTimeout(() => {
        try {
          document
            .getElementById("section3")
            .scrollIntoView({ behavior: "smooth" });
        } catch (e) {}
      }, 500);
    }
  }, [showNext]);

  const changeSize = e => {
    const data = {};
    e.map(item => {
      data[item.target.name] = item.target.value;
      return null;
    });
    setProperty({ ...propData, ...data });
  };

  const submit = e => {
    e.preventDefault();
    if (documents.length < 1 && showDoc) {
      Notification.bubble({
        type: "info",
        content:
          "You have to specify at least one document for the property category"
      });
      return;
    }
    const newData = props.edit
      ? { ...propData, title: propData.unit_title }
      : { ...propData, ...propertyAddress };
    let url = PROPERTY_CONTROLLER_URL;
    if (props.edit) {
      url = UNIT_CONTROLLER_URL + `/${props.unitInfo.id}`;
    }
    setLoading(true);
    axiosHandler(props.edit ? "patch" : "post", url, getToken(), {
      ...newData,
      multi_unit: singleUnit
    }).then(
      res => {
        axiosHandler(
          "post",
          GENERIC_DOCUMENT_URL +
            `?identifier_type=property&identifier_id=${res.data.results.id}`,
          getToken(),
          formatDocument(documents, res.data.results.id)
        );
        if (props.edit) {
          props.history.push({
            pathname: props.location.pathname,
            search: "stage=1"
          });
        } else {
          props.history.push({
            pathname:
              props.location.pathname +
              `/${res.data.results.uuid}_${res.data.results.id}`,
            search: "stage=1"
          });
        }
      },
      err => {
        setLoading(false);
        Notification.bubble({
          type: "error",
          content: "an error occurred"
        });
      }
    );
  };

  const formatDocument = (docs, unit_id) => {
    const tempDoc = [];

    docs.map(item => {
      tempDoc.push({
        name: item,
        identifier_type: "property",
        identifier_id: unit_id
      });
      return null;
    });

    return tempDoc;
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

  if (props.fetching) {
    return (
      <>
        <br />
        <Spinner size={15} color={secondaryColor} />
      </>
    );
  }

  return (
    <div className="basic-info-container">
      <div
        className="questions"
        data-aos={!props.edit && "slide-right"}
        data-aos-delay="200"
      >
        Quick one!, Is this property for sale or rent?
      </div>
      <div
        className="radio-group"
        data-aos={!props.edit && "fade-up"}
        data-aos-delay="500"
      >
        <Radio
          onChange={() => onChangeCategory("sale")}
          name="propertyCategory"
          label="For sale"
          checked={(propData && propData.category === "sale") || false}
        />
        <Radio
          onChange={() => onChangeCategory("rental")}
          name="propertyCategory"
          label="For rent"
          checked={(propData && propData.category === "rental") || false}
        />
      </div>
      <div id="snchor" />

      {showDoc && (
        <div
          className="item-group"
          data-aos={!props.edit && "fade-up"}
          data-aos-anchor="snchor"
        >
          <div className="questions">
            What documents are available for this property?
          </div>
          <FacilityDocument
            onAdd={onSelectDocument}
            documents={documents}
            type="document"
            defaultContent={props.edit && props.unitInfo.documents}
          />
        </div>
      )}
      <form onSubmit={submit}>
        {showNext > 0 &&
          (!props.edit && (
            <div>
              <section className="flex align-center info-section">
                <h3 data-aos={!props.edit && "slide-right"}>
                  Ok lets get on with the main information, shall we!
                </h3>
                <span data-aos="flip-right" data-aos-delay="200">
                  <AppIcon name="ic_sentiment_satisfied" type="md" />
                </span>
              </section>
              <br />
              <div
                data-aos={!props.edit && "fade-up"}
                data-aos-delay="500"
                data-aos-anchor="snchor"
              >
                <FormGroup
                  label="Give your property a name"
                  subLabel="This will allow you to easily find your property. Also, it gives
            your property some uniqueness"
                  className="facility-con"
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
                    required
                    name="title"
                    value={propData.title}
                    onChange={genericChange}
                  />
                </FormGroup>
              </div>
              <div id="section1" />
            </div>
          ))}

        {showNext > 1 && !props.edit && (
          <div>
            <section
              className="flex align-center info-section"
              data-aos="slide-right"
            >
              <h3>We want to know where your property is located!</h3>
            </section>
            <br />
            <AddressController onChange={setPropertyAddress} />
            <div id="section2" />
          </div>
        )}

        {showNext > 2 && (
          <div>
            {!props.edit && (
              <div
                className="banner"
                data-aos={!props.edit && "zoom-in-down"}
                data-aos-anchor="snchor"
              >
                <img src={infoIcon} alt="" />
                <div className="context">
                  <h4>Quick Information</h4>
                  <p>Is this property a multi-unit property?</p>
                  <div className="radio-group">
                    <Radio
                      onChange={() => changePropertyType("single")}
                      name="propType"
                      label="Yes"
                      checked={singleUnit}
                    />
                    <Radio
                      onChange={() => changePropertyType("multi")}
                      name="propType"
                      label="No"
                      checked={!singleUnit}
                    />
                  </div>
                </div>
                <div className="cast">Let’s continue pleasssss</div>
              </div>
            )}
            <br />
            <div className="grid grid-2 grid-gap">
              <div
                data-aos={!props.edit && "fade-up"}
                data-aos-delay="300"
                data-aos-anchor="snchor"
              >
                <FormGroup
                  label="Unit title"
                  subLabel="The title of one of the several units in your property."
                >
                  <Input
                    placeholder="Eg. Unit 51, or Buga's court"
                    name="unit_title"
                    required
                    value={!singleUnit ? propData.title : propData.unit_title}
                    onChange={genericChange}
                    disabled={!singleUnit}
                  />
                </FormGroup>
              </div>
              <div
                data-aos={!props.edit && "fade-up"}
                data-aos-delay="500"
                data-aos-anchor="snchor"
              >
                <FormGroup
                  label="Choose your unit type"
                  subLabel="Select the most appropriate category your unit falls under"
                >
                  <UnitTypeModel
                    onChange={genericChange}
                    defaultOption={unitType}
                    required
                  />
                </FormGroup>
              </div>
            </div>
            <p />
            <div className="grid grid-3 grid-gap3">
              {requirementLists.includes("bedroom") && (
                <div
                  data-aos={!props.edit && "fade-up"}
                  data-aos-delay="700"
                  data-aos-anchor="snchor"
                >
                  <FormGroup label="How many bedrooms? ">
                    <Select
                      placeholder="--select bedroom--"
                      name="bedroom"
                      onChange={genericChange}
                      required
                      value={propData.bedroom}
                      optionList={getArrayCount({ count: 30 }).map(item => {
                        return {
                          title: item,
                          value: item
                        };
                      })}
                    />
                  </FormGroup>
                </div>
              )}
              {requirementLists.includes("bathroom") && (
                <div
                  data-aos={!props.edit && "fade-up"}
                  data-aos-delay="900"
                  data-aos-anchor="snchor"
                >
                  <FormGroup label="How many bathrooms? ">
                    <Select
                      placeholder="--select bathroom--"
                      name="bathroom"
                      onChange={genericChange}
                      required
                      value={propData.bathroom}
                      optionList={getArrayCount({ count: 30 }).map(item => {
                        return {
                          title: item,
                          value: item
                        };
                      })}
                    />
                  </FormGroup>
                </div>
              )}

              {requirementLists.includes("parking") && (
                <div
                  data-aos={!props.edit && "fade-up"}
                  data-aos-delay="1100"
                  data-aos-anchor="snchor"
                >
                  <FormGroup label="How many parking space? ">
                    <Select
                      placeholder="--select parking--"
                      name="parking"
                      onChange={genericChange}
                      required
                      value={propData.parking}
                      optionList={getArrayCount({ count: 30 }).map(item => {
                        return {
                          title: item,
                          value: item
                        };
                      })}
                    />
                  </FormGroup>
                </div>
              )}

              {requirementLists.includes("size") && (
                <div
                  data-aos={!props.edit && "fade-up"}
                  data-aos-delay="500"
                  data-aos-anchor="snchor"
                >
                  <FormGroup label="What is the size of your property? ">
                    <SelectInput
                      defaultOption={
                        props.edit
                          ? {
                              title: propData.size_type
                                .toString()
                                .toUpperCase(),
                              value: propData.size_type
                            }
                          : sizeOptions[0]
                      }
                      optionList={sizeOptions}
                      placeholder="Size eg. 3000.00"
                      name="size"
                      value={propData.size}
                      selectName="size_type"
                      selectPosition="right"
                      onChange={changeSize}
                      isCurrency={false}
                      type="number"
                    />
                  </FormGroup>
                </div>
              )}
            </div>
            <div id="section3" />
          </div>
        )}
        <button className="hidebut" id="submitButt" type="submit" />
      </form>
      {loading ? (
        <div className="loading-bar">
          <Spinner />
        </div>
      ) : (
        (showNext > 0 || showDoc) && (
          <div className="proceed" onClick={proceed}>
            Proceed &nbsp; <AppIcon name="ic_trending_flat" type="md" />
          </div>
        )
      )}
      <br />
      <br />

      <br />
    </div>
  );
}

export default PropertyBasicInfo;
