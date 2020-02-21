import React, { useEffect, useState } from "react";
import { Select } from "../select/Select";
import Input from "../input/Input";
import "./currencyInput.css";
import { numberWithCommas } from "../../utils/helper";
import proptype from "prop-types";

function CurrencyInput(props) {
  const [activeCurrency, setActiveCurrency] = useState("NGN");
  const [value, setValue] = useState("");

  useEffect(() => {
    if (props.defaultCurrencyOption) {
      setActiveCurrency(props.defaultCurrencyOption.value);
    }
  }, []);

  useEffect(() => {
    if (props.value) {
      onChangeCurrency({ target: { value: props.value } });
    }
  }, [props.value]);

  const onChangeCurrency = ({ target: { value } }) => {
    let newValue;
    newValue = value.replace(/,/g, "");
    newValue = numberWithCommas(newValue);
    if (props.onChange) {
      props.onChange({
        target: {
          name: props.name,
          value: newValue,
          rawValue: newValue.replace(/,/g, ""),
          currency: activeCurrency
        }
      });
    }
    setValue(newValue);
  };

  return (
    <div className="currency-input-field">
      <Select
        defaultOption={{ title: activeCurrency, value: activeCurrency }}
        onChange={e => setActiveCurrency(e.target.value)}
        name="currency"
        optionList={[
          { title: "NGN", value: "NGN" },
          { title: "USD", value: "USD" },
          { title: "GBP", value: "GBP" }
        ]}
      />
      <Input
        placeholder="0.00"
        value={value}
        onChange={onChangeCurrency}
        {...props}
      />
    </div>
  );
}

CurrencyInput.propTypes = {
  value: proptype.number,
  onChange: proptype.func,
  defaultCurrencyOption: proptype.objectOf(proptype.any)
};

export default CurrencyInput;
