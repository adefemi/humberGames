import React, { useContext, useEffect } from "react";
import "./team.css";
import "./team.css";
import teamMembers from "../../assets/teamMembers.svg";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import AllTeamMembers from "./components/AllTeamMembers";
import AllTeamRequests from "./components/AllTeamRequests";
import { useLocation } from "react-router-dom";

const TeamMembersPage = props => {
  const location = useLocation();
  // const inputRef = useRef();
  const { dispatch } = useContext(store);

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Teams" });
  }, []);

  // const onEditClick = () => {
  //   // console.log(inputRef);
  //   // inputRef.current.focus();
  //   setTeamName(teamName);
  // };

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
        <AllTeamMembers />
        <div className="team-requests">
          <h3>Requests from Agents</h3>
          <div className="team-request-content">
            <AllTeamRequests />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMembersPage;
