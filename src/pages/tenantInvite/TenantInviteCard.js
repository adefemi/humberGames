import React from "react";
import { Button } from "../../components/button/Button";
import AppIcon from "../../components/icons/Icon";

export const TenantInviteCard = () => {
  return (
    <div className="tenant-invite-card">
      <div className="card-header">
        <div className="email-container">
          <AppIcon className="envelopeO" type="fa" name="envelopeO" />
          <div className="invite">
            <span className="email">yemi@garuba.com</span>
            <p>invited 4 days ago</p>
          </div>
        </div>
        <div className="status">
          <small>status</small>
          <p>
            <span className="bullet">&#8226;</span>Pending
          </p>
        </div>
      </div>
      <p className="property">Property Details</p>
      <div className="card-footer">
        <p className="property-details">
          Adedeji Estate, Unit: Towers hall. No. 12 Hospital Road, Off Awa,
          Lagos
        </p>
        <Button className="cancel-invite">Cancel Invite</Button>
      </div>
    </div>
  );
};
