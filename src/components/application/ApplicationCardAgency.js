import React from "react";
import { Card } from "../card/Card";
import AppIcon from "../icons/Icon";
import { Button } from "../button/Button";
import { Modal } from "../modal/Modal";
import _ from "lodash";
import moment from "moment";
import "./applicationCard.css";
import { axiosHandler } from "../../utils/axiosHandler";
import { APPLICATIONS_URL } from "../../utils/urls";
import { Link } from "react-router-dom";

function ApplicationCardAgency(props) {
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
  return (
    <div className="ApplicationCard2">
      <div className="more">
        <AppIcon name="moreVertical" type="feather" />
      </div>
      <div className="flex top">
        <div
          className="property-image"
          style={{
            backgroundImage: `url(${_.get(unit_images, "0.image.file")})`
          }}
        />
        <div className="flex column justify-between content">
          <div className="div">
            <h4>{title}</h4>
            <small>{`${address}, ${city} ${state}, ${country}`}</small>
          </div>

          <a href="#">View Property</a>
        </div>
      </div>
      <div className="flex column align-center justify-center body">
        <small>Applicant</small>
        <h4>Adedoyin Adesina CFO</h4>
        <small className="applied-time">
          Applied {moment(created_at).fromNow()}
        </small>
        <br />
        <br />
        <Link to="/">
          <small>View Profile</small>
        </Link>
      </div>
      <div className="flex align-center justify-center card-footer">
        <Button color="danger">Decline</Button>
        <Button color="success">Accept</Button>
      </div>
    </div>
  );
}

export default ApplicationCardAgency;
