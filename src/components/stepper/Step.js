import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Button, Typography } from "../../common";

function Step(props) {
  let activeStatus = props.active ? " active " : "";

  return (
    <Fragment>
      <div className="dflex">
        <Button className={"outline-btn-primary btn-page-nav" + activeStatus}>
          {props.step}
        </Button>
        <Typography variant="normal" wrapperClass="stepper-text">
          {props.value}
        </Typography>
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
