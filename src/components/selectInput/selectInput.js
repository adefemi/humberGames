import React, { useEffect, useState } from "react";
import { Select } from "../select/Select";
import Input from "../input/Input";
import "./selectInput.css";
import { numberWithCommas } from "../../utils/helper";
import proptype from "prop-types";
import CurrencyInput from "../currencyInput/currencyInput";

function SelectInput(props) {
  const [value, setValue] = useState("");

  useEffect(() => {}, []);

  const selectChange = e => {};

  const onChange = e => {};

  return (
    <div className="select-input-field">
      {props.selectPosition === "left" && (
        <SelectComp
          name={props.name}
          optionList={props.optionList}
          activeOption={props.defaultOption}
          selectChange={selectChange}
        />
      )}
      {props.isCurrency ? (
        <CurrencyInput
          onChange={onChange}
          value={value}
          defaultCurrencyOption={props.defaultCurrencyOption}
        />
      ) : (
        <Input
          placeholder={props.placeholder}
          value={value}
          onChange={onChange}
        />
      )}

      {props.selectPosition === "right" && (
        <SelectComp
          name={props.name}
          optionList={props.optionList}
          activeOption={props.defaultOption}
          selectChange={selectChange}
        />
      )}
    </div>
  );
}

const SelectComp = ({ activeOption, selectChange, optionList, name }) => (
  <Select
    defaultOption={activeOption}
    onChange={e => selectChange(e.target.value)}
    name={name}
    optionList={optionList}
  />
);

SelectInput.propTypes = {
  defaultOption: proptype.objectOf(proptype.any).isRequired,
  defaultCurrencyOption: proptype.objectOf(proptype.any),
  optionList: proptype.arrayOf(proptype.objectOf(proptype.any)),
  placeholder: proptype.string,
  onChange: proptype.func,
  onChangeSelect: proptype.func,
  value: proptype.any,
  name: proptype.string,
  selectPosition: proptype.oneOf(["left", "right"]),
  isCurrency: proptype.bool
};

SelectInput.defaultProps = {
  selectPosition: "right",
  isCurrency: true
};

export default SelectInput;
