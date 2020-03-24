import React from "react";
import FormGroup from "../formGroup/formGroup";
import Input from "../input/Input";
import { Checkbox } from "../checkbox/Checkbox";
import { SingleAddress } from "../addressController/addressController";
import { countryCode, durationSelector } from "../../utils/data";
import SelectInput from "../selectInput/selectInput";
import CurrencyInput from "../currencyInput/currencyInput";
import { Select } from "../select/Select";

function ResidenceForm(props) {
  let { data, onChange, onRemove } = props;
  return (
    <div className="profile-multi">
      {!props.preview && (
        <div className="remove-form" onClick={onRemove}>
          Remove
        </div>
      )}
      <div className="form-row">
        <FormGroup label="Resident Address" required>
          <SingleAddress
            name="resident_address"
            value={data.resident_address || ""}
            onChange={onChange}
          />
        </FormGroup>
      </div>
      <div className="form-row">
        <div className="employment-status">
          <Checkbox
            checked={data.is_active}
            label={
              <span className="question">Is this your current resident?</span>
            }
            id={props.id}
            name="is_active"
            onChange={e =>
              onChange({
                target: {
                  name: "is_active",
                  value: !data.is_active
                }
              })
            }
          />
        </div>
        <div className="grid grid-2">
          <FormGroup label="Start Date" required>
            <Input
              value={data.start_date}
              name="start_date"
              type="date"
              onChange={onChange}
              required
            />
          </FormGroup>
          {!data.is_active && (
            <FormGroup required label="End Date">
              <Input
                value={data.end_date}
                name="end_date"
                type="date"
                onChange={onChange}
                required
              />
            </FormGroup>
          )}
        </div>
        <div className="grid grid-3">
          <FormGroup label="Landlord's Name" required>
            <Input
              value={data.landlord_name}
              name="landlord_name"
              onChange={onChange}
              placeholder="eg. Adesola Oluyole"
            />
          </FormGroup>
          <FormGroup required label="Landlord's Email">
            <Input
              value={data.landlord_email}
              name="landlord_email"
              type="email"
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup label="Landlord's Phone Number" required>
            <SelectInput
              defaultOption={{
                title: `+${data.country_code || "234"}`,
                value: data.country_code || "234"
              }}
              selectPosition="left"
              minWidth={90}
              optionList={countryCode}
              selectName="country_code"
              onChange={onChange}
              name="landlord_phone_num"
              isCurrency={false}
              required
              type="number"
              value={data.landlord_phone_num || ""}
            />
          </FormGroup>
        </div>
        <div className="grid grid-2">
          <FormGroup required label="Rent Amount">
            <CurrencyInput
              onChange={e =>
                onChange({
                  target: {
                    name: "rent_amount",
                    value: e.target.rawValue
                  }
                })
              }
              value={data.rent_amount || ""}
            />
          </FormGroup>
          <FormGroup label="Rent Rate" required>
            <Select
              required
              onChange={onChange}
              optionList={durationSelector}
              name="rent_rate"
              defaultOption={{ title: "Yearly", content: "yearly" }}
            />
          </FormGroup>
        </div>
      </div>
    </div>
  );
}

export default ResidenceForm;
