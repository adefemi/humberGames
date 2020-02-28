import React from "react";
import FormGroup from "../formGroup/formGroup";
import Input from "../input/Input";
import { Button } from "../button/Button";

function ImmigrationForm(props) {
  const { data } = props;
  return (
    <>
      <div className="form-row">
        <FormGroup label="Country" required>
          <Input value={data.country_of_residence} />
        </FormGroup>
      </div>
      <div className="grid grid-2">
        <FormGroup label="Stay From" required>
          <Input value={data.stay_from} />
        </FormGroup>
        <FormGroup required label="Stay To">
          <Input value={data.stay_to} />
        </FormGroup>
      </div>
      <div className="grid grid-2">
        <FormGroup label="Visa Start Date" required>
          <Input value={data.visa_start} />
        </FormGroup>
        <FormGroup required label="Visa End Date">
          <Input value={data.visa_end} />
        </FormGroup>
      </div>
    </>
  );
}

export default ImmigrationForm;
