import React, { useContext, useEffect, useState } from "react";
import "./team.css";
import { Button } from "../../components/button/Button";
import AppIcon from "../../components/icons/Icon";
import { Card } from "../../components/card/Card";
import { MembershipCard } from "./components/MembershipCard";
import "./team.css";
import RequestCard from "./components/RequestCard";
import teamMembers from "../../assets/teamMembers.svg";
import loadMore from "../../assets/loadMore.svg";
import { Paginator } from "../../components/paginator/paginator";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import { Modal } from "../../components/modal/Modal";
import ConfirmMember from "./components/ConfirmMember";
import { axiosHandler } from "../../utils/axiosHandler";
import { TEAMS_URL } from "../../utils/urls";
import Skeleton from "react-loading-skeleton";

const TeamMembersPage = () => {
  const [modalState, setModalState] = useState(false);
  const [team, setTeam] = useState({});
  const [loaders, setLoaders] = useState({});
  const { dispatch } = useContext(store);
  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Teams" });
    getTeam();
  }, []);

  const toggleLoaders = (key, value) => {
    setLoaders({ ...loaders, [key]: value });
  };

  const getTeam = async () => {
    toggleLoaders("pageLoad", true);
    const team = await axiosHandler("GET", TEAMS_URL);
    toggleLoaders("pageLoad", false);
  };

  const onAcceptClick = () => {
    console.log("Accepted");
    setModalState(true);
  };
  return (
    <div>
      <div className="rectangle flex">
        <img
          src={teamMembers}
          alt="team-members-svg"
          className="team-members-svg"
        />
        <div className="rectangle-text">
          <p className="text-1">Manage your team</p>
          <p className="text-2">
            Here, you are in charge. Manage and your team and assign positions
            of manager as you deem fit
          </p>
        </div>
      </div>
      <div className="flex team-members-container">
        {/* {!loaders.pageLoad ? (
          <Skeleton height={200} />
        ) : ( */}
        <>
          <div className="team-members">
            <div className="team-members-header">
              <span>
                <b>The Elites</b>
                <AppIcon className="edit" name="edit" type="fa" />
              </span>
              <Button className="add-member">
                <AppIcon className="userO" name="userO" type="fa" />
                <span>Add Member</span>
              </Button>
            </div>
            <div className="team-members-card grid-card-container">
              <Card className="single-card grid-card">
                <MembershipCard />
              </Card>
              <Card className="single-card grid-card">
                <MembershipCard />
              </Card>
              <Card className="single-card grid-card">
                <MembershipCard />
              </Card>
              <Card className="single-card grid-card">
                <MembershipCard />
              </Card>
              <Card className="single-card grid-card">
                <MembershipCard />
              </Card>
              <Card className="single-card grid-card">
                <MembershipCard />
              </Card>
              <Card className="single-card grid-card">
                <MembershipCard />
              </Card>
              <Card className="single-card grid-card">
                <MembershipCard />
              </Card>
              <Card className="single-card grid-card">
                <MembershipCard />
              </Card>
            </div>
          </div>
        </>
        {/* )} */}
        <div className="team-requests">
          <h3>Requests from Agents</h3>
          <div className="team-request-content">
            <Card className="single-request">
              <RequestCard onAcceptClick={onAcceptClick} />
            </Card>
            <Card className="single-request">
              <RequestCard />
            </Card>
            <Card className="single-request">
              <RequestCard />
            </Card>
            <Card className="single-request">
              <RequestCard />
            </Card>
            <div className="flex load-more">
              <p>Load More</p>
              <img src={loadMore} alt="load-more" className="load-more-svg" />
            </div>
          </div>
        </div>
      </div>
      <Paginator />
      <Modal
        className="confirm-member"
        type="success"
        onClose={() => {
          setModalState(false);
        }}
        visible={modalState}
      >
        <ConfirmMember onCancelClick={() => setModalState(false)} />
      </Modal>
    </div>
  );
};

export default TeamMembersPage;
