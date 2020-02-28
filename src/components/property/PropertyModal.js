import React, { useState, useEffect } from "react";
import { Modal } from "../modal/Modal";
import AppIcon from "../icons/Icon";
import FormGroup from "../formGroup/formGroup";
import { Button } from "../button/Button";
import Input from "../input/Input";
import addUnit from "../../assets/svgs/add_unit.svg";
import { axiosHandler } from "../../utils/axiosHandler";
import { PROPERTIES_URL, UNITS_URL, UNIT_TYPES_ROUTE } from "../../utils/urls";
import { Notification } from "../notification/Notification";
import { useContext } from "react";
import { store } from "../../stateManagement/store";
import { setPropertyPage } from "../../stateManagement/actions";
import { Select } from "../select/Select";
function PropertyModal(props) {
  const { state, dispatch } = useContext(store);
  const [unitTypes, setUnitTypes] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState("");
  const [formState, setFormState] = useState({
    title: "",
    unit_type_id: "",
    bedroom: "",
    bathroom: "",
    parking: ""
  });
  useEffect(() => {
    getUnitTypes();
  }, []);

  useEffect(() => {}, [selectedUnit]);
  const [addLoading, setAddLoading] = useState(false);
  const submitForm = e => {
    e.preventDefault();
    axiosHandler(
      "POST",
      UNITS_URL,
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTgyOTcxNzY0LCJqdGkiOiIzZDk4MjYxNjQ1Mzg0ZTgzOWEzZThiZTY3NTIzMmYwNCIsInVzZXJfaWQiOjE0fQ.9QnPeWspGPIL-eytJ85r3MUkACKley2bIOB5Jwq8A20",
      {
        ...formState,
        property_id: state.propertyPageData.activePropertyId,
        description: ""
      }
    )
      .then(res => {
        Notification.bubble({
          type: "success",
          content: "Unit added successfully"
        });
      })
      .catch(err => {
        Notification.bubble({
          type: "error",
          content: "Error when adding unit"
        });
      });
  };
  const getUnitTypes = () => {
    axiosHandler("GET", UNIT_TYPES_ROUTE).then(res => {
      setUnitTypes(res.data.results.results);
    });
  };

  const handleFormState = e =>
    setFormState({ ...formState, [e.target.name]: e.target.value });

  const getUnitRequirements = () => {
    console.log(selectedUnit);
    console.log(unitTypes);
    let selectedValue = unitTypes.filter(
      unitType => unitType.title === selectedUnit
    );
    let factors = [];
    if (selectedValue.length > 0) {
      factors = selectedValue[0]["unit_factor"];
    }

    return (
      <div className="grid grid-3">
        {factors.map(factor => (
          <FormGroup label={`Specify unit ${factor.value}`}>
            <Input
              name={factor.value}
              placeholder={factor.value}
              onChange={handleFormState}
              value={formState[factor.value]}
            />
          </FormGroup>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Modal
        visible={state.propertyPageData.modalStatus}
        onOk={() => null}
        onClose={() => {
          dispatch({ type: setPropertyPage, payload: { modalStatus: false } });
        }}
      >
        <div className="modal-body add-unit-form">
          <div className="banner">
            <div className="banner-header flex">
              <div className="banner-image">
                <img src={addUnit} alt="" />
              </div>
              <div className="banner-text">
                Add new unit to your existing property and you will be surprised
                how fit it will be!
              </div>
            </div>
          </div>
          <div className="main-body">
            <div className="top flex">
              <AppIcon name="ic_home" type="md" />
              <div className="property-description">
                <strong>Adedeji Estate</strong>
                <div className="property-location">
                  No. 22 igoba street, ilase lagos
                </div>
              </div>
            </div>
            <form action="" onSubmit={submitForm} className="add-unit-form">
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
                  {/* <Input
                    name={"unit_type_id"}
                    onChange={handleFormState}
                    value={formState.unit_type_id}
                  /> */}
                  {
                    <Select
                      placeholder={"Unit Type"}
                      optionList={unitTypes.map(unitType => ({
                        title: unitType.title,
                        value: unitType.title
                      }))}
                      onChange={e => {
                        setSelectedUnit(e.target.value);
                      }}
                    ></Select>
                  }
                </FormGroup>
              </div>
              {getUnitRequirements()}
              <div className="flex justify-end">
                <Button loading={addLoading} type={"submit"}>
                  Create & Continue
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default PropertyModal;
