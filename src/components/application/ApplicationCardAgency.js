import React, { useContext, useState } from "react";
import { Card } from "../card/Card";
import AppIcon from "../icons/Icon";
import { Button } from "../button/Button";
import { Modal } from "../modal/Modal";
import _ from "lodash";
import moment from "moment";
import "./applicationCard.css";
import { axiosHandler } from "../../utils/axiosHandler";
import { APPLICATIONS_URL, PUBLIC_URL } from "../../utils/urls";
import { Link } from "react-router-dom";
import FormGroup from "../formGroup/formGroup";
import { TextAreaField } from "../textarea/TextAreaField";
import { getToken } from "../../utils/helper";
import { Notification } from "../notification/Notification";
import { store } from "../../stateManagement/store";
import { reloadApplication } from "../../stateManagement/actions";

function ApplicationCardAgency(props) {
  let {
    id,
    uuid,
    unit: {
      title,
      unit_images,
      property: {
        address_info: { address, city, state, country }
      }
    },
    user,
    status,
    lease,
    created_at
  } = props.application;

  const {
    unit: { property }
  } = props.application;
  const { dispatch } = useContext(store);
  const { unit } = props.application;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalState, setModalState] = useState(null);
  const [reason, setReason] = useState(null);
  const [submit, setSubmit] = useState(false);

  const SubmitMain = (e, _type) => {
    if (_type === 1) {
      e.preventDefault();
    }
    setSubmit(true);
    const data = {
      status: _type === 1 ? "rejected" : "accepted",
      reason
    };
    axiosHandler("patch", APPLICATIONS_URL + `/${id}`, getToken(), data).then(
      res => {
        Notification.bubble({
          type: "success",
          content: `Application was ${
            _type === 1 ? "rejected" : "accepted"
          } successfully`
        });
        dispatch({ type: reloadApplication, payload: true });
      },
      err => {
        Notification.bubble({
          type: "error",
          content: "Ops!, an error occurred"
        });
      }
    );
  };

  const declineState = (
    <div>
      <h4>Decline Confirmation</h4>
      <p>
        You are about to decline this application, we would like to know why you
        wish to take this action!
      </p>
      <form onSubmit={e => SubmitMain(e, 1)}>
        <FormGroup label="Reason">
          <TextAreaField
            onChange={e => setReason(e.target.value)}
            value={reason}
            placeholder="provide reasons here.."
            required
          />
        </FormGroup>

        <Button loading={submit} disabled={submit} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );

  const acceptConfirm = () => {
    Modal.confirm({
      title: "Accept Application",
      content: "You are about to accept this application, proceed below...",
      onOK: e => SubmitMain(e, 2),
      okText: "Accept"
    });
  };

  return (
    <div className="ApplicationCard2">
      <Modal onClose={() => setModalVisible(false)} visible={modalVisible}>
        {modalState === 1 && declineState}
      </Modal>
      <div className="flex top">
        <div
          className="property-image"
          style={{
            backgroundImage: `url(${_.get(unit_images, "0.image.file")})`
          }}
        />
        <div className="flex column justify-between content">
          <div className="div">
            <h4>{property.title}</h4>
            <h5>{title}</h5>
            <small>{`${address}, ${city} ${state}, ${country}`}</small>
          </div>

          <a href={PUBLIC_URL + "explore/" + unit.uuid + "_" + unit.id}>
            View Property{" "}
            <AppIcon size={18} name="ic_trending_flat" type="md" />{" "}
          </a>
        </div>
      </div>
      <div className="flex column align-center justify-center body">
        <small>Applicant</small>
        <h4>{`${user.first_name} ${user.last_name}`}</h4>
        <small className="applied-time">
          Applied {moment(created_at).fromNow()}
        </small>
        <br />
        <br />
        <Link to={`/user/${user.uuid}_${user.id}`}>
          <small>
            View Profile <AppIcon size={18} name="ic_trending_flat" type="md" />{" "}
          </small>
        </Link>
      </div>

      <div className="flex align-center justify-center card-footer">
        {lease && (
          <Link to={`/leases/${lease.uuid}_${lease.id}`}>
            <Button color="default" className="view-lease">
              View Lease
            </Button>
          </Link>
        )}
        {!lease && status === "accepted" && (
          <Link to={`/create-lease/${uuid}_${id}`}>
            <Button color="success">Create Lease</Button>
          </Link>
        )}
        {!lease && status !== "accepted" && (
          <Button
            color="danger"
            onClick={() => {
              setModalState(1);
              setModalVisible(true);
            }}
          >
            Decline
          </Button>
        )}
        {!lease && status !== "accepted" && (
          <Button
            color="success"
            loading={submit}
            disabled={submit}
            onClick={acceptConfirm}
          >
            Accept
          </Button>
        )}
      </div>
    </div>
  );
}

export default ApplicationCardAgency;
