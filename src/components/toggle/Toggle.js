import React from "react";
import "./Toggle.css";
import proptypes from "prop-types";

export default function Toggle({ toggleStatus, handleToggle, className }) {
  return (
    <div className={`Toggle ${className}`}>
      <div
        onClick={() => handleToggle(!toggleStatus)}
        className={"toggle-wrapper " + (toggleStatus ? "active" : "")}
      >
        <div className={"toggle-switch " + (toggleStatus ? "active" : "")} />
      </div>
    </div>
  );
}

Toggle.propTypes = {
  toggleStatus: proptypes.bool,
  handleToggle: proptypes.func,
  className: proptypes.string
};
