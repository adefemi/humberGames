import React from "react";

const TeamTemplate = props => {
  return (
    <div className="flex align-center team">
      <div className="team-content">
        <h3 className="team-text">Welcome to your team!</h3>
        <p className="team-text">
          In here you would be able to manage your team members by assigning
          them to different roles and duty post. But before you get a chance to
          do all this, you need to first create a team.{" "}
        </p>
        <form onSubmit={props.onFormSubmit}>{props.content}</form>
      </div>
      <div>
        <img src={props.undraw} alt="svg" className={"team-svg"} />
      </div>
    </div>
  );
};

export default TeamTemplate;
