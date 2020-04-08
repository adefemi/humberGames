import React from "react";
import { Card } from "../card/Card";
import AppIcon from "../icons/Icon";
import { Button } from "../button/Button";
import { Modal } from "../modal/Modal";
import _ from "lodash";
import moment from "moment";
import { PUBLIC_URL } from "../../utils/urls";
import { Link } from "react-router-dom";

function ApplicationCard(props) {
  let {
    id,
    inspection,
    unit: {
      unit_images,
      property: {
        address_info: { address, city, state, country }
      }
    },
    lease,
    status,
    created_at
  } = props.application;
  let { unit } = props.application;

  const getInspectionSchedule = ins => {
    if (!ins) return;
    let dateTime = `${ins.inspection_date} ${ins.inspection_time}`;
    dateTime = new Date(dateTime);
    return moment(dateTime).format("DD MMMM, YYYY.  h:m a");
  };

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
          {unit.title}, {unit.property.title}
        </strong>
        <div className="unit-description">
          {address} {city}, {state} {country}
        </div>
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
        <a href={PUBLIC_URL + "explore/" + unit.uuid + "_" + unit.id}>
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
        </a>
        <div className="card-footer">
          <div className="flex footer-top justify-between">
            <div className="time-of-app">
              <AppIcon name="ic_access_time" type="md" size={18} />
              Applied {moment(created_at).fromNow()}
            </div>
            <div className="status-of-app">
              <Button>{status}</Button>
            </div>
          </div>
          <div className="booking-detail">
            {status === "accepted" && !inspection ? (
              <div className="flex justify-between">
                <div className="booking-status">No booked viewing</div>
                <div className="book-viewing">
                  <span
                    className="link"
                    onClick={() => props.bookViewing(props.application)}
                  >
                    Book Viewing
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex justify-between align-center">
                <div className="inspectSchedule">
                  Inspection scheduled for:{" "}
                  <strong>{getInspectionSchedule(inspection)}</strong>
                </div>
                {inspection && inspection.status !== "completed" && (
                  <div className="book-viewing">
                    <span
                      className="link"
                      onClick={() => props.updateViewing(inspection)}
                    >
                      Update
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
          {lease && (
            <div className="view-lease-con">
              <Link to={`/leases/view/${lease.uuid}_${lease.id}`}>
                <Button className="view-lease" color="default">
                  View Lease
                </Button>
              </Link>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default ApplicationCard;
