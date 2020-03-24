import React from "react";
import FormGroup from "../formGroup/formGroup";
import Input from "../input/Input";

function ImmigrationForm(props) {
  const { data, onChange, onRemove } = props;
  return (
    <div className="profile-multi">
      {!props.preview && (
        <div className="remove-form" onClick={onRemove}>
          Remove
        </div>
      )}

      <div className="form-row">
        <FormGroup label="Country" required>
          <Input
            value={data.country_of_residence}
            name="country_of_residence"
            onChange={onChange}
            required
          />
        </FormGroup>
      </div>
      <div className="grid grid-2">
        <FormGroup label="Stay From" required>
          <Input
            value={data.stay_from}
            type="date"
            name="stay_from"
            onChange={onChange}
            required
          />
        </FormGroup>
        <FormGroup required label="Stay To">
          <Input
            value={data.stay_to}
            type="date"
            name="stay_to"
            onChange={onChange}
            required
          />
        </FormGroup>
      </div>
      <div className="grid grid-2">
        <FormGroup label="Visa Start Date" required>
          <Input
            value={data.visa_start}
            type="date"
            name="visa_start"
            onChange={onChange}
            required
          />
        </FormGroup>
        <FormGroup required label="Visa End Date">
          <Input
            value={data.visa_end}
            type="date"
            name="visa_end"
            onChange={onChange}
            required
          />
        </FormGroup>
      </div>
    </div>
  );
}

export default ImmigrationForm;
