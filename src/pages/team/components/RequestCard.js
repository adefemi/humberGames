import React from "react";
import bgImg2 from "../../../assets/images/lahore-18h.png";
import { Button } from "../../../components/button/Button";

const RequestCard = () => {
  return (
    // <div className="team-request-container">
    <>
      <div
        className="request-picture"
        style={{ background: `url(${bgImg2})` }}
      ></div>
      <p className="request-time">Requested: 10 mins ago</p>
      <p className="agent-name">Lara Dutta</p>
      <p className="agent-properties">Properties: 45</p>
      <div className="accept-decline">
        <Button className="accept">Accept</Button>
        <Button className="decline">Decline</Button>
      </div>
    </>
    // </div>
  );
};

export default RequestCard;
