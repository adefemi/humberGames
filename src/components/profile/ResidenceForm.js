import React from "react";
import FormGroup from "../formGroup/formGroup";
import Input from "../input/Input";
import { Checkbox } from "../checkbox/Checkbox";

function ResidenceForm() {
  return (
    <>
      <div className="grid grid-2">
        <FormGroup label="Country" required>
          <Input />
        </FormGroup>
        <FormGroup required label="State">
          <Input />
        </FormGroup>
      </div>
      <div className="grid grid-2">
        <FormGroup label="City" required>
          <Input />
        </FormGroup>
        <FormGroup required label="Street">
          <Input />
        </FormGroup>
      </div>
      <div className="form-row">
        <div className="employment-status">
          <span className="question">Is this your current residence?</span>{" "}
          <Checkbox label="" />
        </div>
        <div className="grid grid-2">
          <FormGroup label="Start Date" required>
            <Input />
          </FormGroup>
          <FormGroup required label="End Date">
            <Input />
          </FormGroup>
        </div>
        <div className="grid grid-2">
          <FormGroup label="Landlord's Name" required>
            <Input />
          </FormGroup>
          <FormGroup required label="Landlord's Email">
            <Input />
          </FormGroup>
        </div>
        <div className="grid grid-2">
          <FormGroup label="Landlord's Phone Number" required>
            <Input />
          </FormGroup>
          <FormGroup required label="Annual Rent Amount">
            <Input />
          </FormGroup>
        </div>
      </div>
    </>
  );
}

export default ResidenceForm;
