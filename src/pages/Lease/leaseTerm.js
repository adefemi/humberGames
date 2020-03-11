import React, { useState } from "react";
import FormGroup from "../../components/formGroup/formGroup";
import CurrencyInput from "../../components/currencyInput/currencyInput";
import Input from "../../components/input/Input";
import { Button } from "../../components/button/Button";
import { Select } from "../../components/select/Select";
import { durationSelector } from "../../utils/data";

function LeaseTerm(props) {
  const [selectMinLease, setSelectedMinLease] = useState(null);
  return (
    <div className="lease-card lease-term">
      <div className="flex justify-between top">
        <h4>Premise</h4>
        <p>
          Unit 45, Adedeji Estate <br />
          230 Ajanwachuku Cl, Unit ranch unit one <br />
          Ikoyi - Eti Osa, <br />
          Lagos, Nigeria
        </p>
      </div>
      <div className="body">
        <h3>Term</h3>
        <FormGroup label="Lease Price">
          <CurrencyInput />
        </FormGroup>
        <div className="grid grid-2 grid-gap">
          <FormGroup
            label="Lease start date"
            subLabel="When is your lease starting"
          >
            <Input type="date" />
          </FormGroup>
          <FormGroup label="Rent type" subLabel="specify your lease frequency">
            <Select
              optionList={durationSelector}
              defaultOption={{ title: "Yearly", value: "yearly" }}
            />
          </FormGroup>
        </div>
        <FormGroup
          label="Whats the minimum lease?"
          subLabel="Tell us the minimum time a tenant must be willing to take this property"
        >
          <div className="flex align-center lease-count-list">
            {[1, 2, 3, 4, 5].map((item, key) => (
              <Button
                onClick={() => setSelectedMinLease(item)}
                className={selectMinLease === item ? "selected" : ""}
                key={key}
                id={key}
              >
                {item}
              </Button>
            ))}
            <Input
              type="number"
              placeholder="Custom count, eg. 25"
              value={selectMinLease || ""}
              onChange={e => setSelectedMinLease(e.target.value)}
            />
          </div>
        </FormGroup>

        <br />
        <h3>Other Charges</h3>
        <div className="grid grid-3 grid-gap">
          <FormGroup label="Lease Price">
            <Input disabled />
          </FormGroup>
          <FormGroup label="Lease start date">
            <Input type="date" />
          </FormGroup>
          <FormGroup label="Lease start date">
            <Select optionList={durationSelector} />
          </FormGroup>
        </div>
        <div className="grid grid-3 grid-gap">
          <FormGroup label="Lease Price">
            <Input disabled />
          </FormGroup>
          <FormGroup label="Lease start date">
            <Input type="date" />
          </FormGroup>
          <FormGroup label="Lease start date">
            <Select optionList={durationSelector} />
          </FormGroup>
        </div>
      </div>
    </div>
  );
}

export default LeaseTerm;
