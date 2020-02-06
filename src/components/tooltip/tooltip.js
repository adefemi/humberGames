import React, { useState } from "react";
import proptypes from "prop-types";
import ReactTooltip from "react-tooltip";
import "./tooltip.css";

function Tooltip(props) {
  const [id] = useState(Date.now());
  return (
    <>
      <div
        data-tip={props.tipText}
        data-for={id.toString()}
        className={"tooltip"}
      >
        {props.children}
      </div>
      <ReactTooltip
        className="tooltip-inner"
        effect="float"
        multiline
        id={id.toString()}
      />
    </>
  );
}

Tooltip.propTypes = {
  tipText: proptypes.string
};

export default Tooltip;
