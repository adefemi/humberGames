import React, { useContext, useEffect, useState } from "react";
import { Button } from "../button/Button";
import { Toggle } from "../toggle/Toggle";
import FormGroup from "../formGroup/formGroup";
import Input from "../input/Input";
import { Select } from "../select/Select";
import {
  countryCode,
  maritalStatusOption,
  secondaryColor
} from "../../utils/data";

import SelectInput from "../selectInput/selectInput";
import { axiosHandler } from "../../utils/axiosHandler";
import { USER_BASIC } from "../../utils/urls";
import {
  getActiveAddress,
  getActivePosition,
  getToken
} from "../../utils/helper";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { store } from "../../stateManagement/store";
import { Spinner } from "../spinner/Spinner";
import { Notification } from "../notification/Notification";
import AppIcon from "../icons/Icon";
import { SingleAddress } from "../addressController/addressController";

function BasicInfo(props) {
  const [loading, setLoading] = useState(true);
  const [newBasic, setNewBasic] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [userBasicMain, setUserBasicMain] = useState({});
  const [mode, setMode] = useState(0); // 0 for view and 1 for Edit
  const {
    state: { userDetails }
  } = useContext(store);

  useEffect(() => {
    if (userDetails.user) {
      axiosHandler(
        "GET",
        `${USER_BASIC}/${userDetails.user.id}`,
        getToken()
      ).then(
        res => {
          setUserBasicMain(res.data.results);
          setLoading(false);
        },
        err => {
          setNewBasic(true);
          setLoading(false);
        }
      );
    }
  }, [userDetails]);

  const getCurrentLocation = () => {
    getActivePosition((loc, status) => {
      if (status) {
        getActiveAddress(
          loc.lat,
          loc.lng,
          (res, sta) => {
            setUserBasicMain({
              ...userBasicMain,
              address_info: { ...userBasicMain.address_info, ...res }
            });
          },
          "single"
        );
      }
    });
  };

  const onValueChange = e => {
    try {
      let data = {};
      e.map(item => {
        data[item.target.name] = item.target.value;
        return null;
      });
      setUserBasicMain({
        ...userBasicMain,
        ...data
      });
    } catch (v) {
      setUserBasicMain({
        ...userBasicMain,
        [e.target.name]: e.target.value
      });
    }
  };

  if (loading) {
    return <Spinner size={15} color={secondaryColor} />;
  }

  const handleToggle = (name, target) => {
    if (mode === 0) return;
    setUserBasicMain({
      ...userBasicMain,
      [name]: target
    });
  };

  const Submit = e => {
    e.preventDefault();
    setSubmit(true);
    delete userBasicMain.id;
    axiosHandler(
      newBasic ? "post" : "patch",
      `${USER_BASIC}${newBasic ? "" : "/" + userDetails.user.id}`,
      getToken(),
      userBasicMain
    ).then(
      res => {
        Notification.bubble({
          content: `Information ${
            newBasic ? "created" : "updated"
          } successfully`,
          type: "success"
        });
        if (newBasic) {
          setNewBasic(false);
        }
        setMode(0);
        setSubmit(false);
      },
      err => {
        Notification.bubble({
          type: "error",
          content: "An error occurred"
        });
        setSubmit(false);
      }
    );
  };

  if (mode === 0 && newBasic) {
    return (
      <div className="flex align-center justify-center column newProfile">
        We couldn't find any basic information associated with your account
        <br />
        <br />
        <Button onClick={() => setMode(1)}>Create Info</Button>
      </div>
    );
  }

  return (
    <div className="basic-info-main">
      {mode === 1 && (
        <div onClick={() => setMode(0)} className="pointer">
          <AppIcon name="chevronLeft" type="feather" />
        </div>
      )}
      <div className="proview">
        <div className="profile-viewer">
          <div className="label">
            Have you ever been <strong>Evicted</strong>
          </div>
          <div className="context">
            <Toggle
              toggleStatus={userBasicMain.evicted}
              handleToggle={e => handleToggle("evicted", e)}
            />
          </div>
        </div>
        <div className="profile-viewer">
          <div className="label">
            Do you <strong>Smoke</strong>
          </div>
          <div className="context">
            <Toggle
              toggleStatus={userBasicMain.smoke}
              handleToggle={e => handleToggle("smoke", e)}
            />
          </div>
        </div>
        <div className="profile-viewer">
          <div className="label">
            Do you have <strong>Pets</strong>
          </div>
          <div className="context">
            <Toggle
              toggleStatus={userBasicMain.have_pets}
              handleToggle={e => handleToggle("have_pets", e)}
            />
          </div>
        </div>
        <div className="profile-viewer">
          <div className="label">
            Have you ever been <strong>Convicted</strong>
          </div>
          <div className="context">
            <Toggle
              toggleStatus={userBasicMain.convicted}
              handleToggle={e => handleToggle("convicted", e)}
            />
          </div>
        </div>
        {mode === 0 && (
          <div className="profile-viewer">
            <div className="label">Marital Status</div>
            <div className="context">{userBasicMain.marital_status}</div>
          </div>
        )}
        {mode === 1 && (
          <FormGroup label="Marital Status" required>
            <Select
              optionList={maritalStatusOption}
              name="marital_status"
              onChange={onValueChange}
              placeholder="--choose marital status--"
              defaultOption={{
                value: userBasicMain.marital_status,
                title: userBasicMain.marital_status
              }}
              required
            />
          </FormGroup>
        )}
        <br />
        <br />
        <h4>Kin Information</h4>
        {mode === 0 && (
          <>
            <div className="profile-viewer">
              <div className="label">Kin's Name</div>
              <div className="context">{userBasicMain.kin_name}</div>
            </div>
            <div className="profile-viewer">
              <div className="label">Kin's Relationship</div>
              <div className="context">{userBasicMain.kin_relationship}</div>
            </div>
            <div className="profile-viewer">
              <div className="label">Kin Phone number</div>
              <div className="context">{`${userBasicMain.country_code ||
                ""} - ${userBasicMain.kin_phone_num || ""}`}</div>
            </div>
            <div className="profile-viewer">
              <div className="label">Kin Address</div>
              <div className="context">{userBasicMain.kin_address}</div>
            </div>
          </>
        )}
        {mode === 1 && (
          <BasicInfoView
            userBasicMain={userBasicMain}
            onValueChange={onValueChange}
            getCurrentLocation={getCurrentLocation}
            mode={mode}
            Submit={Submit}
            submit={submit}
            newBasic={newBasic}
          />
        )}
        <br />
        {mode === 0 && (
          <div className="submit-button flex justify-center">
            <Button onClick={() => setMode(1)} color="primary">
              Edit Info
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

const BasicInfoView = props => {
  return (
    <form onSubmit={props.Submit}>
      <div className="grid grid-2 grid-gap">
        <FormGroup label="Kin's Name" required>
          <Input
            name="kin_name"
            onChange={props.onValueChange}
            value={props.userBasicMain.kin_name}
          />
        </FormGroup>
        <FormGroup label="Kin Relationship" required>
          <Input
            name="kin_relationship"
            onChange={props.onValueChange}
            value={props.userBasicMain.kin_relationship}
          />
        </FormGroup>
      </div>
      <FormGroup label="Phone Number" required>
        <SelectInput
          defaultOption={{
            title: `+${props.userBasicMain.country_code || "234"}`,
            value: props.userBasicMain.country_code || "234"
          }}
          selectPosition="left"
          minWidth={90}
          optionList={countryCode}
          selectName="country_code"
          onChange={props.onValueChange}
          name="kin_phone_num"
          isCurrency={false}
          required
          type="number"
          value={props.userBasicMain.kin_phone_num || null}
        />
      </FormGroup>
      <FormGroup label="kin Address" required>
        <SingleAddress
          name="kin_address"
          value={props.userBasicMain.kin_address || ""}
          onChange={props.onValueChange}
        />
      </FormGroup>

      {props.mode === 1 && (
        <div className="submit-button flex justify-center">
          <br />
          <Button
            loading={props.submit}
            disabled={props.submit}
            type="submit"
            color="primary"
          >
            {props.newBasic ? "Create" : "Update"} Info
          </Button>
        </div>
      )}
    </form>
  );
};

export default BasicInfo;
