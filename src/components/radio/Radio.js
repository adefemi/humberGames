import React, { Fragment } from "react";
import PropTypes from "prop-types";
import shortId from "shortid";

import "./Radio.css";

const Radio = props => {
  const properties = {
    ...props,
    className: "Radio " + props.className,
    type: "radio"
  };

  return (
    <div className="input-radio">
      <input {...properties} />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
};

//proptypes definition
Radio.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

//default proptypes
Radio.defaultProps = {
  id: shortId.generate(),
  label: "",
  name: "",
  onChange: null,
  className: ""
};

export default Radio;
