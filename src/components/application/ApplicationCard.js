import React from "react";
import { Card } from "../card/Card";
import AppIcon from "../icons/Icon";
import { Button } from "../button/Button";
import { Modal } from "../modal/Modal";
import _ from "lodash";
import moment from "moment";
import { axiosHandler } from "../../utils/axiosHandler";
import { APPLICATIONS_URL } from "../../utils/urls";

function ApplicationCard(props) {
  let {
    id,
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
  const deleteApplication = id => {
    Modal.confirm({
      title: "Delete Application",
      content: "Are you sure you want to delete this application?",
      onOK: () => {
        props.onDelete(id);
      }
    });
  };
  const cardHeading = (
    <div className="flex">
      <div className="property-address flex-1">
        <strong>
          {address}, {state}, {title}
        </strong>
        <div className="unit-description">{description}</div>
      </div>
      <div className="delete-icon" onClick={() => deleteApplication(id)}>
        <AppIcon
          name="ic_delete"
          className="danger-color"
          size={20}
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
          <div className="overlay">
            <Button>View Property</Button>
          </div>
        </div>
        <div className="card-footer">
          <div className="flex footer-top justify-between">
            <div className="time-of-app">
              <AppIcon name="ic_access_time" type="md" size={18} />
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
