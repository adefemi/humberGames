import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Input.css";
import { Select } from "../select";
import {getNewProps, getCountryCodes,convertValue} from "../../utils/helper";

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


export const Input = props => {
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
              convertValue(props, defaultCode)
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

export default Input;
