import React, { useState } from "react";
import AppIcon from "../../components/icons/Icon";
import FormGroup from "../../components/formGroup/formGroup";
import Input from "../../components/input/Input";
import { Select } from "../../components/select/Select";
import CurrencyInput from "../../components/currencyInput/currencyInput";
import { Button } from "../../components/button/Button";
import { Radio } from "../../components/radio/Radio";
import infoIcon from "../../assets/images/cloud-info.svg";
import SelectInput from "../../components/selectInput/selectInput";
import { Accordion } from "../../components/accordion/Accordion";

function PropertyTerm(props) {
  const [selectMinLease, setSelectedMinLease] = useState(null);
  const [chargeShow, setChargeShow] = useState(true);
  const [otherCharge, setOtherCharge] = useState(false);
  const [chargesCount, setChargesCount] = useState([{}]);
  return (
    <div className="term-info-container">
      <div className="questions flex align-center">
        Tell us what your property fee will be like!&nbsp;
        <AppIcon name="checkCircle" className="check" type="feather" />
      </div>
      <br />
      <div className="grid grid-2 grid-gap">
        <FormGroup
          label="Whats your rent fee?"
          subLabel="Tell us how much you want to rent this property..."
        >
          <CurrencyInput />
        </FormGroup>
        <FormGroup
          label="Whats the fee duration?"
          subLabel="Choose how long the rent fee  covers."
        >
          <Select
            placeholder="--select duration--"
            name="bedroom"
            optionList={[
              { title: "Yearly", value: "Yearly" },
              { title: "Monthly", value: "Monthly" },
              { title: "Weekly", value: "Weekly" },
              { title: "Daily", value: "Daily" }
            ]}
          />
        </FormGroup>
      </div>
      <p />
      <FormGroup
        label="Whats the minimum lease?"
        subLabel="Tell us the minimum time a tenant must be willing to take this property"
      >
        <div className="flex align-center lease-count-list">
          {[1, 2, 3, 4].map((item, key) => (
            <Button
              onClick={() => setSelectedMinLease(item)}
              className={selectMinLease === item ? "selected" : ""}
              key={key}
            >
              {item}
            </Button>
          ))}
          <Input
            type="number"
            placeholder="Custom count, eg. 25"
            value={selectMinLease}
            onChange={e => setSelectedMinLease(e.target.value)}
          />
        </div>
      </FormGroup>
      <br />
      <div className="questions flex align-center other-charge">
        Is there other charges for this property?&nbsp;
        <div className="radio-group">
          <Radio
            checked={otherCharge}
            onChange={() => setOtherCharge(true)}
            name="propertyCategory"
            label="Yes"
          />
          <Radio
            checked={!otherCharge}
            onChange={() => setOtherCharge(false)}
            name="propertyCategory"
            label="No"
          />
        </div>
      </div>

      <Accordion active={otherCharge}>
        <br />
        {chargesCount.map((item, key) => (
          <ChargeMore
            key={key}
            showClose={chargesCount.length > 1}
            removeCharge={() =>
              setChargesCount(chargesCount.filter((_, id) => id !== key))
            }
          />
        ))}
        <br />
        <div className="flex align-center justify-between">
          <div />
          <div
            className="flex align-center add-more"
            onClick={() => setChargesCount([...chargesCount, {}])}
          >
            <AppIcon name="plusCircle" type="feather" /> &nbsp; Add More
          </div>
        </div>
      </Accordion>

      <div className="banner">
        <img src={infoIcon} alt="" />
        <div className="context">
          <h4>Sharing and commission!</h4>
          <p>Enter your commission rate and we would calculate the sharing.</p>
        </div>
      </div>
      <br />
      <div className="grid grid-2 grid-gap">
        <FormGroup
          label="Commission"
          subLabel="You can enter your commission here, You can use flat rate or percentage.s"
        >
          <SelectInput
            defaultOption={{ title: "Percentage (%)", value: "percentage" }}
            optionList={[
              { title: "Percentage (%)", value: "percentage" },
              { title: "Flat Rate", value: "flat_rate" }
            ]}
          />
        </FormGroup>
        <div className="charge-info">
          <small onClick={() => setChargeShow(!chargeShow)}>
            Sharing Breakdown &nbsp;{" "}
            <AppIcon
              name={chargeShow ? "ic_arrow_drop_up" : "ic_arrow_drop_down"}
              type="md"
            />{" "}
          </small>
          <Accordion active={chargeShow} speed={300}>
            <div className="charge-container">
              <h4>Commission Breakdown</h4>
              <div className="flex align-center justify-between charge-item">
                <div className="title">Total Property Price</div>
                <div className="value">₦ 2,000,000.00</div>
              </div>
              <div className="flex align-center justify-between charge-item">
                <div className="title">Total Property Price</div>
                <div className="value">₦ 2,000,000.00</div>
              </div>
              <div className="flex align-center justify-between charge-item">
                <div className="title">Total Property Price</div>
                <div className="value">₦ 2,000,000.00</div>
              </div>
            </div>
          </Accordion>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

const ChargeMore = props => (
  <div className="more-charge-con">
    {props.showClose && (
      <div className="close" onClick={props.removeCharge}>
        <AppIcon name="ic_add_circle" type="md" />
      </div>
    )}
    <div className="grid grid-3 grid-gap">
      <FormGroup
        label="Fee type"
        subLabel="Choose the kind of fee to add to property"
      >
        <Select
          placeholder="--select charge type--"
          name="propertyType"
          optionList={[
            { title: "Service charge", value: "service_charge" },
            { title: "Legal fee", value: "legal_fee" }
          ]}
        />
      </FormGroup>
      <FormGroup
        label="Payment frequency"
        subLabel="Choose how you want your rent to be paid."
      >
        <CurrencyInput />
      </FormGroup>
      <FormGroup label="Fee price" subLabel="Tell us how much this fee is!">
        <Select
          placeholder="--select duration--"
          name="bedroom"
          optionList={[
            { title: "Yearly", value: "Yearly" },
            { title: "Monthly", value: "Monthly" },
            { title: "Weekly", value: "Weekly" },
            { title: "Daily", value: "Daily" }
          ]}
        />
      </FormGroup>
    </div>
    <p />
  </div>
);

export default PropertyTerm;
