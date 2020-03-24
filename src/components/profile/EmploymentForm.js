import React from "react";
import FormGroup from "../formGroup/formGroup";
import Input from "../input/Input";
import { Checkbox } from "../checkbox/Checkbox";
import { SingleAddress } from "../addressController/addressController";
import {
  countryCode,
  currencyOptions,
  durationSelector
} from "../../utils/data";
import SelectInput from "../selectInput/selectInput";
import { Select } from "../select/Select";

function EmploymentForm(props) {
  let { data, onChange, onRemove } = props;
  return (
    <div className="profile-multi">
      {!props.preview && (
        <div className="remove-form" onClick={onRemove}>
          Remove
        </div>
      )}

      <div className="grid grid-2">
        <FormGroup label="Job Title" required>
          <Input
            value={data.job_title}
            name="job_title"
            onChange={onChange}
            placeholder="eg. Data Analyst"
            required
          />
        </FormGroup>
        <FormGroup required label="Company Name">
          <Input
            value={data.employer}
            name="employer"
            onChange={onChange}
            placeholder="eg. Microsoft"
            required
          />
        </FormGroup>
      </div>
      <div className="form-row">
        <FormGroup label="Company Address" required>
          <SingleAddress
            name="company_address"
            value={data.company_address || ""}
            onChange={onChange}
          />
        </FormGroup>
      </div>
      <div className="form-row">
        <div className="employment-status">
          <Checkbox
            checked={data.is_active}
            label={
              <span className="question">Is this your current employment?</span>
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
          <FormGroup label="Salary Range" required>
            <SelectInput
              defaultOption={{
                title: data.salary_currency || "NGN",
                value: data.salary_currency || "NGN"
              }}
              selectPosition="left"
              minWidth={90}
              optionList={currencyOptions}
              selectName="salary_currency"
              onChange={onChange}
              name="salary_range"
              isCurrency={false}
              required
              placeholder="eg. 1000-2000"
              value={data.salary_range || ""}
            />
          </FormGroup>
          <FormGroup label="Salary Rate" required>
            <Select
              required
              onChange={onChange}
              optionList={durationSelector}
              name="salary_rate"
              defaultOption={{ title: "Yearly", content: "yearly" }}
            />
          </FormGroup>
        </div>
        <div className="grid grid-2">
          <FormGroup required label="Start Date">
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
                onChange={onChange}
                type="date"
                required
              />
            </FormGroup>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmploymentForm;
