import React, { useState, useEffect } from "react";
import { Notification } from "../../../components/notification/Notification";
import { TEAM_REQUEST_URL } from "../../../utils/urls";
import { axiosHandler, testToken } from "../../../utils/axiosHandler";
import Skeleton from "react-loading-skeleton";
import { Card } from "../../../components/card/Card";
import RequestCard from "./RequestCard";
import { Modal } from "../../../components/modal/Modal";
import { Select } from "../../../components/select/Select";
import noImage from "../../../assets/images/no-image.jpg";
import loadMore from "../../../assets/loadMore.svg";
import { Button } from "../../../components/button/Button";
import _ from "lodash";

const AllTeamRequests = () => {
  const [acceptModalState, setAcceptModalState] = useState(false);
  const [teamRequests, setTeamRequests] = useState([]);
  const [requestLoader, setRequestLoader] = useState(true);
  const [request, setRequest] = useState({});
  const [role, setRole] = useState("team_member");
  useEffect(() => {
    getRequests();
  }, []);

  const getRequests = () => {
    axiosHandler("GET", TEAM_REQUEST_URL)
      .then(res => {
        setTeamRequests(res.data.results.results);
        setRequestLoader(false);
      })
      .catch(err => {
        Notification.bubble({
          type: "error",
          content: "Error loading requests"
        });
        setRequestLoader(false);
      });
  };

  const onCompleteClick = () => {
    console.log("Complete clicked");
    axiosHandler(
      "PATCH",
      TEAM_REQUEST_URL + `/${_.get(request, "id")}`,
      testToken,
      {
        request_status: "accepted",
        role: role
      }
    )
      .then(() => {
        setAcceptModalState(false);
      })
      .catch(err => {
        Notification.bubble({
          type: "error",
          content: "Unable to accept agent's request"
        });
      });
  };

  const onAcceptClick = request => {
    setRequest(request);
    setAcceptModalState(true);
  };

  const onDeclineClick = request => {
    setRequest(request);
    Modal.confirm({
      title: "Decline Request",
      content: "Do you really want to decline this request?",
      onOK: () => {
        axiosHandler(
          "DELETE",
          TEAM_REQUEST_URL + `/${_.get(request, "id")}`,
          testToken
        )
          .then(() => {
            getRequests();
          })
          .catch(err => {
            Notification.bubble({
              type: "error",
              content: "unable to delete request"
            });
          });
      }
    });
  };

  const noContent = () => {
    if (teamRequests.length === 0) {
      return (
        <div>
          <h4>No requests at the moment</h4>
        </div>
      );
    } else {
      return teamRequests.map(request => (
        <Card key={request.id} className="single-request">
          <RequestCard
            request={request}
            onAcceptClick={request => onAcceptClick(request)}
            onDeclineClick={request => onDeclineClick(request)}
          />
        </Card>
      ));
    }
  };

  return (
    <>
      {requestLoader ? <Skeleton height={106} width={441} /> : noContent()}
      <div className="flex load-more">
        <p>Load More</p>
        <img src={loadMore} alt="load-more" className="load-more-svg" />
      </div>
      <Modal
        className="confirm-member"
        type="success"
        onClose={() => setAcceptModalState(false)}
        visible={acceptModalState}
      >
        <p>Confirm Member</p>
        <div className="confirm-member-details flex">
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
          <div className="membership flex">
            <p>{`${_.get(request, "user.first_name")} ${_.get(
              request,
              "user.last_name"
            )}`}</p>
            <Select
              placeholder="assign a position"
              optionList={[
                { title: "manager", value: "manager" },
                { title: "member", value: "team_member" }
              ]}
              onChange={e => setRole(e.target.value)}
              name="position"
            />
          </div>
        </div>
        <div className="confirm-member-buttons">
          <Button onClick={() => setAcceptModalState(false)} className="cancel">
            Cancel
          </Button>
          <Button onClick={onCompleteClick} className="complete">
            Complete
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AllTeamRequests;
