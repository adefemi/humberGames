import React from "react";
import "./formGroup.css";

function FormGroup({ className, label, subLabel, children }) {
  return (
    <div className={`form-group ${className ? className : ""}`}>
      <label>
        <span>{label}</span>
        <small>{subLabel}</small>
        {children}
      </label>
    </div>
  );
}

export default FormGroup;
