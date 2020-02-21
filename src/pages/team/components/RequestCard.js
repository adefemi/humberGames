import React, { useState } from "react";
import bgImg2 from "../../../assets/images/lahore-18h.png";
import { Button } from "../../../components/button/Button";
import { Modal } from "../../../components/modal/Modal";
import { Select } from "../../../components/select/Select";

const RequestCard = props => {
  return (
    <>
      <div
        className="request-picture"
        style={{ background: `url(${bgImg2})` }}
      ></div>
      <p className="request-time">Requested: 10 mins ago</p>
      <p className="agent-name">Lara Dutta</p>
      <p className="agent-properties">Properties: 45</p>
      <div className="accept-decline">
        <Button onClick={props.onAcceptClick} className="accept">
          Accept
        </Button>
        <Button onClick={() => console.log("Denied")} className="decline">
          Decline
        </Button>
      </div>
    </>
  );
};

export default RequestCard;
