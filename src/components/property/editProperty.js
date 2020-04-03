import React, { useState } from "react";
import Input from "../input/Input";
import FormGroup from "../formGroup/formGroup";
import AddressController from "../addressController/addressController";
import { Button } from "../button/Button";
import {
  getActiveAddress,
  getActivePosition,
  getToken
} from "../../utils/helper";
import { axiosHandler } from "../../utils/axiosHandler";
import { PROPERTIES_URL } from "../../utils/urls";
import { Notification } from "../notification/Notification";

function EditProperty(props) {
  const [propData, setPropData] = useState({ title: props.activeObj.title });
  const [propertyAddress, setPropertyAddress] = useState(
    props.activeObj.address_info
  );
  const [loading, setLoading] = useState(false);

  const genericChange = e => {
    setPropData({ ...propData, [e.target.name]: e.target.value });
  };

  const getCurrentLocation = () => {
    getActivePosition((loc, status) => {
      if (status) {
        getActiveAddress(
          loc.lat,
          loc.lng,
          (res, sta) => {
            setPropertyAddress(res);
          },
          "single"
        );
      }
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    const updateData = { ...propData, ...propertyAddress };
    setLoading(true);
    axiosHandler(
      "patch",
      PROPERTIES_URL + `/${props.activeObj.id}`,
      getToken(),
      updateData
    ).then(
      res => {
        Notification.bubble({
          content: "Property updated successfully",
          type: "success"
        });
        props.closeVisibility(true);
      },
      err => {
        Notification.bubble({
          content: "Ops!, an error occurred",
          type: "error"
        });
        setLoading(false);
      }
    );
  };

  return (
    <form className="edit-property" onSubmit={onSubmit}>
      <h3>Update Property</h3>
      <br />
      <br />
      <br />
      <FormGroup label="Property Title">
        <Input
          placeholder="Enter property name"
          required
          name="title"
          value={propData.title}
          onChange={genericChange}
        />
      </FormGroup>
      <br />
      <br />
      <div>
        <div className="flex align-center justify-between">
          <h3>Property Location</h3>
          <div className="link" onClick={getCurrentLocation}>
            Use current location
          </div>
        </div>

        <br />
        <AddressController
          addressData={propertyAddress}
          disableAnim
          edit
          onChange={setPropertyAddress}
        />
      </div>
      <br />
      <br />
      <Button type="submit" disabled={loading} loading={loading}>
        Update
      </Button>
    </form>
  );
}

export default EditProperty;
