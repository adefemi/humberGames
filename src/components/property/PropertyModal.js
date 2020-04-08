import React from "react";
import AppIcon from "../icons/Icon";
import "../orderSummary/orderSummary.css";
import NewUnit from "./newUnit";
import EditProperty from "./editProperty";
import "./property.css";

function PropertyModal(props) {
  return (
    <div
      className={`order-summary-con ${
        props.visible ? "show" : ""
      } property-con`}
    >
      <div className="overlay" onClick={() => props.closeVisibility(false)} />
      <div className="summary-con">
        <div className="close" onClick={() => props.closeVisibility(false)}>
          <AppIcon name="x" type="feather" />
        </div>
        {props.visible && (
          <div className="inner">
            {props.modalType === "unit" && (
              <NewUnit activeObj={props.activeObj} />
            )}
            {props.modalType === "property" && (
              <EditProperty
                activeObj={props.activeObj}
                closeVisibility={props.closeVisibility}
              />
            )}
            {props.modalType === "generic" && props.children}
          </div>
        )}
      </div>
    </div>
  );
}

export default PropertyModal;
