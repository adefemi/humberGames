import React, { useContext, useEffect, useState } from "react";
import Input from "../input/Input";
import FormGroup from "../formGroup/formGroup";
import { Button } from "../button/Button";
import addUnit from "../../assets/svgs/add_unit.svg";
import AppIcon from "../icons/Icon";
import { Select } from "../select/Select";
import { store } from "../../stateManagement/store";
import { axiosHandler } from "../../utils/axiosHandler";
import { UNIT_TYPES_ROUTE, UNITS_URL } from "../../utils/urls";
import { Notification } from "../notification/Notification";
import { getArrayCount, getToken } from "../../utils/helper";
import "./property.css";
import SelectInput from "../selectInput/selectInput";
import { sizeOptions } from "../../utils/data";
import { withRouter } from "react-router-dom";
import { Radio } from "../radio/Radio";
import FacilityDocument from "../facilityDocument/facilityDocument";

function NewUnit(props) {
  const { state } = useContext(store);
  const [unitTypes, setUnitTypes] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState("");
  const [formState, setFormState] = useState({});

  useEffect(() => {
    getUnitTypes();
    setFormState({ ...formState, property_id: props.activeObj.id });
  }, []);

  const [addLoading, setAddLoading] = useState(false);

  const submitForm = e => {
    setAddLoading(true);
    e.preventDefault();
    axiosHandler("POST", UNITS_URL, getToken(), {
      ...formState,
      unit_type_id: unitTypes.filter(item => item.title === selectedUnit)[0].id
    }).then(
      res => {
        Notification.bubble({
          type: "success",
          content: "Unit added successfully"
        });
        props.history.push(
          `/add-property/${res.data.results.uuid}_${res.data.results.id}?stage=1`
        );
      },
      err => {
        Notification.bubble({
          type: "error",
          content: "Error when adding unit"
        });
        setAddLoading(false);
      }
    );
  };
  const getUnitTypes = () => {
    axiosHandler("GET", UNIT_TYPES_ROUTE).then(res => {
      setUnitTypes(res.data.results.results);
    });
  };

  const handleFormState = e =>
    setFormState({ ...formState, [e.target.name]: e.target.value });

  const changeSize = e => {
    const data = {};
    e.map(item => {
      data[item.target.name] = item.target.value;
      return null;
    });
    setFormState({ ...formState, ...data });
  };

  const getUnitRequirements = () => {
    let selectedValue = unitTypes.filter(
      unitType => unitType.title === selectedUnit
    );
    let factors = [];
    if (selectedValue.length > 0) {
      factors = selectedValue[0]["unit_factor"];
    }

    return (
      <div className={`grid grid-${factors.length < 3 ? "2" : "3"}`}>
        {factors.map(factor => (
          <FormGroup label={`Unit ${factor.value}`}>
            {factor.value.toLowerCase() === "size" ? (
              <SelectInput
                defaultOption={sizeOptions[0]}
                optionList={sizeOptions}
                placeholder="Size eg. 3000.00"
                name="size"
                selectName="size_type"
                selectPosition="right"
                onChange={changeSize}
                isCurrency={false}
                type="number"
                required
                minWidth={90}
              />
            ) : (
              <Select
                placeholder={`--select ${factor.value}--`}
                name={factor.value}
                onChange={handleFormState}
                required
                optionList={getArrayCount({ count: 30 }).map(item => {
                  return {
                    title: item,
                    value: item
                  };
                })}
              />
            )}
          </FormGroup>
        ))}
      </div>
    );
  };

  return (
    <div className="new-unit">
      <div className="banner">
        <div className="banner-header flex">
          <div className="banner-image">
            <img src={addUnit} alt="" />
          </div>
          <div className="banner-text">
            Add new unit to your existing property and you will be surprised how
            fit it will be!
          </div>
        </div>
      </div>
      <div className="main-body">
        <div className="top flex">
          <AppIcon name="ic_home" type="md" />
          <div className="property-description">
            <strong>{props.activeObj.title}</strong>
            <div className="property-location">
              {props.activeObj.address_info.address}{" "}
              {props.activeObj.address_info.city},{" "}
              {props.activeObj.address_info.state}{" "}
              {props.activeObj.address_info.country}
            </div>
          </div>
        </div>
        <form action="" onSubmit={submitForm} className="add-unit-form">
          <div className="questions">
            Quick one!, Is this unit for sale or rent?
          </div>
          <div className="radio-group">
            <Radio
              onChange={() => setFormState({ ...formState, category: "sale" })}
              name="propertyCategory"
              label="For sale"
            />
            <Radio
              onChange={() =>
                setFormState({ ...formState, category: "rental" })
              }
              name="propertyCategory"
              label="For rent"
            />
          </div>
          <br />
          {formState.category === "sale" && (
            <div className="item-group">
              <div className="questions">
                What documents are available for this property?
              </div>
              <FacilityDocument onAdd={() => null} type="document" />
              <br />
              <br />
            </div>
          )}
          <div className="grid grid-2">
            <FormGroup
              label={"Unit Title"}
              subLabel={
                "The title of one of the several units in your property e.g. Unit 1"
              }
            >
              <Input
                placeholder={"Unit Title"}
                name={"title"}
                required
                onChange={handleFormState}
                value={formState.title}
              />
            </FormGroup>
            <FormGroup
              label={"Choose your unit type"}
              subLabel={
                "Select the most appropriate category your unit falls under"
              }
            >
              {
                <Select
                  placeholder={
                    unitTypes.length < 1 ? "loading unit types..." : "Unit Type"
                  }
                  optionList={unitTypes.map(unitType => ({
                    title: unitType.title,
                    value: unitType.title
                  }))}
                  required
                  onChange={e => {
                    setSelectedUnit(e.target.value);
                  }}
                />
              }
            </FormGroup>
          </div>
          {getUnitRequirements()}
          <br />
          <div className="flex justify-end">
            <Button loading={addLoading} disabled={addLoading} type={"submit"}>
              Create & Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withRouter(NewUnit);
