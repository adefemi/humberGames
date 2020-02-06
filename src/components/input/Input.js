import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import countryControl from "country-state-city";

import "./Input.css";
import { decodeCurrency } from "../../currency";
import { Select } from "../select";
import { connect } from "react-redux";
const defaultPropList = {
  value: PropTypes.any,
  type: PropTypes.oneOf([
    "text",
    "number",
    "password",
    "tel",
    "currency",
    "phone"
  ]),
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  errorText: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOf(["default", "small", "large"]),
  disabled: PropTypes.bool,
  disableCurrencySwap: PropTypes.bool,
  iconLeft: PropTypes.any,
  iconRight: PropTypes.any,
  placeholder: PropTypes.string,
  setPhoneNumber: PropTypes.func,
  dispatch: PropTypes.func,
  setCurrencyState: PropTypes.func,
  defaultCurrencyValue: PropTypes.object,
  isError: PropTypes.bool,
  noCurrencySelect: PropTypes.bool
};

export const getNewProps = (props, defaultPropList) => {
  let newProps = { ...props };

  for (let key in defaultPropList) {
    if (newProps.hasOwnProperty(key) || newProps.hasOwnProperty("isError")) {
      delete newProps[key.toString()];
    }
  }
  return newProps;
};

const getCountryCodes = () => {
  let allCountry = countryControl.getAllCountries();
  let arrayContent = [];

  allCountry.map(country => {
    arrayContent.push({
      value: country.phonecode,
      content: `${country.phonecode}`,
      displayed: `+${country.phonecode}`
    });
    return null;
  });

  return arrayContent;
};

const convertValue = (props, code) => {
  if (!props.value) {
    return "";
  }
  if (props.type !== "phone") {
    return props.value;
  }
  let value = props.value.split("");
  let newValue = props.value.split("");
  let codeConvert = value[0] === "+" ? `+${code}`.split("") : code.split("");

  if (codeConvert.length > value.length) {
    return props.value;
  }

  for (let i = 0; i < codeConvert.length; i++) {
    if (codeConvert[parseInt(i, 10)] === value[parseInt(i, 10)]) {
      newValue.splice(0, 1);
    } else {
      return props.value;
    }
  }
  return newValue.join("");
};

const Input = props => {
  let newProps = getNewProps(props, defaultPropList);
  let inputType = props.type;
  if (inputType === "currency") {
    inputType = "text";
  }
  const [defaultCode, setDefaultCode] = useState("234");
  const [currencyDetails, setCurrencyDetails] = useState(
    props.defaultCurrencyValue || {
      amountCurrency: "NGN",
      amount: null
    }
  );

  useEffect(() => {
    if (props.type === "currency") {
      props.onChange({
        target: {
          value: currencyDetails,
          name: props.name
        }
      });
    }
  }, [currencyDetails, props.value]);

  return (
    <div
      className={
        props.error
          ? props.className + " input-control error " + props.size
          : props.className + " input-control " + props.size
      }
      style={props.style}
    >
      <div className="input-container-cover">
        {props.type === "phone" && (
          <Select
            showDropDown={false}
            placeholder=""
            className={`dropdown-control ${props.className} ${
              props.disabled ? "disabled" : ""
            }`}
            value={defaultCode}
            displayed={`+${defaultCode}`}
            onChange={e => setDefaultCode(e.target.value)}
            noInitial
          >
            {getCountryCodes().map((codes, index) => (
              <Select.Option
                key={index}
                value={codes.value}
                displayed={codes.displayed}
              >
                {codes.content}
              </Select.Option>
            ))}
          </Select>
        )}
        <div
          className={`input-field ${props.className} ${
            props.disabled ? "disabled" : ""
          }`}
          style={props.isError ? { border: "1px solid red" } : {}}
        >
          {props.type !== "currency" ? (
            props.iconLeft
          ) : (
            <div
              className={
                "currency-selector " + (props.noCurrencySelect ? "hide" : "")
              }
            >
              <Select
                onChange={e =>
                  setCurrencyDetails({
                    ...currencyDetails,
                    amountCurrency: e.target.value
                  })
                }
                disabled={props.disableCurrencySwap}
                value={currencyDetails.amountCurrency}
                noInitial
              >
                {props.currencies.map(currency => (
                  <Select.Option key={currency.uuid} value={currency.shortCode}>
                    {currency.shortCode}
                  </Select.Option>
                ))}
              </Select>
            </div>
          )}
          <input
            placeholder={props.placeholder}
            type={inputType === "phone" ? "number" : inputType}
            disabled={props.disabled}
            onChange={e => {
              if (props.type === "currency") {
                e.target.value = e.target.value.replace(/,|\D/g, "");
                setCurrencyDetails({
                  ...currencyDetails,
                  amount: e.target.value
                });
                props.onChange(e);
              } else {
                props.onChange(e);
              }
            }}
            onBlur={e => {
              if (props.type === "phone") {
                props.setPhoneNumber(
                  `+${defaultCode}${parseInt(e.target.value, 10).toString()}`
                );
              } else {
                props.onBlur && props.onBlur(e);
              }
            }}
            {...newProps}
            value={
              props.type === "currency"
                ? props.value
                  ? decodeCurrency(("" + props.value).replace(/,/g, ""))
                  : ""
                : convertValue(props, defaultCode)
            }
          />
          {props.iconRight}
        </div>
      </div>
      {props.isError && (
        <div className={"input-error-text"}>{props.errorText}</div>
      )}
    </div>
  );
};

Input.Option = ({ value }) => null;

Input.propTypes = defaultPropList;

Input.defaultProps = {
  value: "",
  type: "text",
  onChange: () => null,
  error: false,
  errorText: "Invalid input",
  className: "",
  size: "default",
  disabled: false,
  placeholder: "",
  setPhoneNumber: () => null
};

export default connect(state => ({ currencies: state.currencies }))(Input);
