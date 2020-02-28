import React from "react";
import FormGroup from "../formGroup/formGroup";
import Input from "../input/Input";
import { Checkbox } from "../checkbox/Checkbox";

function EmploymentForm(props) {
  let { data } = props;
  return (
    <div style={{ marginBottom: 150 }}>
      <div className="grid grid-2">
        <FormGroup label="Job Title" required>
          <Input value={data.job_title} />
        </FormGroup>
        <FormGroup required label="Company Name">
          <Input value={data.employer} />
        </FormGroup>
      </div>
      <div className="form-row">
        <FormGroup label="Company Address" required>
          <Input value={data.address_info.address} />
        </FormGroup>
      </div>
      <div className="form-row">
        <div className="employment-status">
          <span className="question">Is this your current employment?</span>{" "}
          <Checkbox checked={data.is_active} label="" onChange={() => {}} />
        </div>
        <div className="grid grid-3">
          <FormGroup label="Salary Range" required>
            <Input value={data.salary_range} />
          </FormGroup>
          <FormGroup required label="Start Date">
            <Input value={data.start_date} />
          </FormGroup>
          <FormGroup required label="End Date">
            <Input value={data.end_date} />
          </FormGroup>
        </div>
      </div>
      <div className="form-row">
        <div className="employment-status">
          <div className="question">Reference (supervisor, manager, e.t.c)</div>
        </div>
        <div className="form-row">
          <FormGroup label="Full Name" required>
            <Input />
          </FormGroup>
        </div>
        <div className="grid grid-2">
          <FormGroup label="Phone Number" required>
            <Input />
          </FormGroup>
          <FormGroup required label="Email">
            <Input />
          </FormGroup>
        </div>
      </div>
    </div>
  );
}

export default EmploymentForm;
