import React, { useState } from "react";
import moment from "moment";
import noImage from "../../../assets/images/no-image.jpg";
import { Button } from "../../../components/button/Button";
import _ from "lodash";
// import { Modal } from "../../../components/modal/Modal";
// import { Select } from "../../../components/select/Select";

// import ConfirmMember from "./ConfirmMember";

const RequestCard = ({ request, onAcceptClick }) => {
  return (
    <>
      <div
        className="request-picture"
        style={{
          background: `url(${_.get(
            request,
            "user.user_profile.profile_picture.file",
            noImage
          )})`
        }}
      ></div>
      <p className="request-time">
        Requested: {moment(request.created_at).fromNow()}
      </p>
      <p className="agent-name">{`${request.user.first_name} ${request.user.last_name}`}</p>
      <p className="agent-properties">
        Properties: {request.user.meta.total_properties}
      </p>
      <div className="accept-decline">
        <Button onClick={() => onAcceptClick(request)} className="accept">
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
