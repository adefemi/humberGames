import React, { Fragment } from "react";
import PropTypes from "prop-types";

import "./Checkbox.css";

const Checkbox = props => {
  const properties = {
    ...props,
    className: "Checkbox " + props.className,
    type: "checkbox"
  };

  return (
    <Fragment>
      <input {...properties} />
      <label htmlFor={props.id}>{props.label}</label>
    </Fragment>
  );
};

//proptypes definition
Checkbox.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

//default proptypes
Checkbox.defaultProps = {
  id: 0,
  label: "",
  name: "",
  onChange: null,
  className: ""
};

export default Checkbox;
