import React, { Fragment } from "react";
import "./Badge.css";

export default function Badge(props) {
  return (
    <Fragment>
      <span
        className={"badge-text " + props.className}
        data-value={props.value}
      >
        {props.children}
      </span>
    </Fragment>
  );
}
