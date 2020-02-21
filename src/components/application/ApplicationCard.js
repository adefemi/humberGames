import React from "react";
import { Card } from "../card/Card";
import AppIcon from "../icons/Icon";
import { Button } from "../button/Button";
import _ from "lodash";
import moment from "moment";

function ApplicationCard(props) {
  let {
    unit: {
      title,
      description,
      unit_images,
      property: {
        address_info: { address, city, state, country }
      }
    },
    unit_schedules,
    status,
    created_at
  } = props.application;
  const cardHeading = (
    <div className="flex">
      <div className="property-address flex-1">
        <strong>
          {address}, {state}, {title}
        </strong>
        <div className="unit-description">{description}</div>
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
        <div
          className="card-body property-image"
          style={{
            backgroundImage: `url(${_.get(unit_images, "0.image.file")})`
          }}
        >
          <Button>View Property</Button>
        </div>
        <div className="card-footer">
          <div className="flex footer-top justify-between">
            <div className="time-of-app">
              <AppIcon name="ic_access_time" type="md" size={20} />
              applied {moment(created_at).fromNow()}
            </div>
            <div className="status-of-app">
              <Button>{status}</Button>
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
