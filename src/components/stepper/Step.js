import React, { Fragment } from "react";
import PropTypes from "prop-types";

function Step(props) {
  let activeStatus = props.active ? " active " : "";

  return (
    <Fragment>
      <div className="dflex">
        <button className={"outline-btn-primary btn-page-nav" + activeStatus}>
          {props.step}
        </button>
        <div>
          {props.value}

        </div>
      </div>
    </Fragment>
  );
}

Step.propTypes = {
  step: PropTypes.number
};

Step.defaultProptypes = {
  step: 1,
  value: ""
};

export default Step;
