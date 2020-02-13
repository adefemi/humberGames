import React from "react";
import "./team.css";
import { Button } from "../../components/button/Button";
import AppIcon from "../../components/icons/Icon";
import { Card } from "../../components/card/Card";
import { MembershipCard } from "./components/MembershipCard";
import "./team.css";
import RequestCard from "./components/RequestCard";

const TeamMembersPage = () => {
  return (
    <div>
      <div className="rectangle"></div>
      <div className="flex team-members-container">
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
          <div className="team-members-card">
            <Card className="single-card">
              <MembershipCard />
            </Card>
            <Card className="single-card">
              <MembershipCard />
            </Card>
            <Card className="single-card">
              <MembershipCard />
            </Card>
            <Card className="single-card">
              <MembershipCard />
            </Card>
            <Card className="single-card">
              <MembershipCard />
            </Card>
            <Card className="single-card">
              <MembershipCard />
            </Card>
            <Card className="single-card">
              <MembershipCard />
            </Card>
            <Card className="single-card">
              <MembershipCard />
            </Card>
            <Card className="single-card">
              <MembershipCard />
            </Card>
          </div>
        </div>
        <div className="team-requests">
          <h3>Requests from Agents</h3>
          <Card className="single-request">
            <RequestCard />
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
        </div>
      </div>
    </div>
  );
};

export default TeamMembersPage;
