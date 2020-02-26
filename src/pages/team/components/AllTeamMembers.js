import React, { useState, useEffect } from "react";
import { axiosHandler } from "../../../utils/axiosHandler";
import { Notification } from "../../../components/notification/Notification";
import { Card } from "../../../components/card/Card";
import { MembershipCard } from "./MembershipCard";
import Skeleton from "react-loading-skeleton";
import { TEAMS_URL } from "../../../utils/urls";
import { Paginator } from "../../../components/paginator/paginator";
import Input from "../../../components/input/Input";
import AppIcon from "../../../components/icons/Icon";
import { Button } from "../../../components/button/Button";
import { testToken } from "../TeamCreatePage";

const AllTeamMembers = () => {
  const [teams, setTeams] = useState([]);
  const [teamLoader, setTeamLoader] = useState(true);
  const [teamName, setTeamName] = useState("");

  useEffect(() => {
    getTeam();
  }, []);

  useEffect(() => {
    setTeamName(teams && teams[0] && teams[0].name);
  }, [teams]);

  const onTeamNameChange = e => {
    setTeamName(e.target.value);
  };

  const updateTeam = event => {
    if (event.key === "Enter") {
      axiosHandler(
        "PATCH",
        TEAMS_URL + `/${teams && teams[0] && teams[0].id}`,
        testToken,
        { name: teamName, role: "manager" }
      )
        .then(() => {})
        .catch(err => {
          Notification.bubble({
            type: "error",
            content: "Sorry. Unable to edit"
          });
        });
    }
  };

  const getTeam = () => {
    axiosHandler("GET", TEAMS_URL)
      .then(res => {
        setTeams(res.data.results.results);
        setTeamLoader(false);
      })
      .catch(err => {
        Notification.bubble({
          type: "error",
          content: "Error loading team members"
        });
        setTeamLoader(false);
      });
  };

  const noContent = () => {
    if (teams.length === 0) {
      return (
        <div>
          <h4>Error. No team members at the moment</h4>
        </div>
      );
    }
    return teams.map(team => (
      <Card key={team.id} className="single-card grid-card">
        <MembershipCard team={team} />
      </Card>
    ));
  };

  return (
    <>
      <div className="team-members">
        <div className="team-members-header">
          <span className="team-name-container">
            <Input
              onChange={onTeamNameChange}
              onKeyPress={updateTeam}
              type="text"
              className="team-name"
              value={teamName}
              // ref={inputRef}
              placeholder="Team Name"
            />
            <AppIcon className="edit" name="edit" type="fa" />
          </span>
          <Button className="add-member">
            <AppIcon className="userO" name="userO" type="fa" />
            <span>Add Member</span>
          </Button>
        </div>
        <div className="team-members-card grid-card-container">
          {teamLoader ? (
            <>
              <Skeleton height={321} width={280} />
              <Skeleton height={321} width={280} />
            </>
          ) : (
            noContent()
          )}
        </div>
      </div>
      {/* <Paginator /> */}
    </>
  );
};

export default AllTeamMembers;
