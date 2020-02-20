import React from "react";
import { Card } from "../card/Card";
import AppIcon from "../icons/Icon";
import { Button } from "../button/Button";

function ApplicationCard() {
  const cardHeading = (
    <div className="flex">
      <div className="property-address flex-1">
        <strong>Lekki Phase 1, Lagos, Unit 11B</strong>
        <div className="unit-main-address">
          4 Bedroom Duplex on 17 Hunponu Wusu
        </div>
      </div>
      <div className="delete-icon">
        <AppIcon
          name="ic_delete"
          className="danger-color"
          size={24}
          type="md"
        />
      </div>
    </div>
  );
  return (
    <div className="ApplicationCard">
      <Card heading={cardHeading}>
        <div className="card-body property-image">
          <Button>View Property</Button>
        </div>
        <div className="card-footer">
          <div className="flex footer-top justify-between">
            <div className="time-of-app">
              <AppIcon name="ic_access_time" type="md" size={20} />
              applied a year ago
            </div>
            <div className="status-of-app">
              <Button>Pending</Button>
            </div>
          </div>
          <div className="booking-detail">
            <div className="flex justify-between">
              <div className="booking-status">No booked viewing</div>
              <div className="book-viewing">
                <a href="#">Book Viewing</a>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ApplicationCard;
