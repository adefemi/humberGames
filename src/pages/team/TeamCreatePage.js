import React from "react";
import "./team.css";
import img from "../../assets/teamCreate.svg";
import { Button } from "../../components/button/Button";

function TeamCreatePage() {
  console.log(window.innerHeight, window.innerWidth);
  return (
    <div className="flex align-center team">
      <div>
        <h3 className="team-text">Welcome to your team</h3>
        <p className="team-text">
          In here you would be able to manage your team members by assigning
          them to different roles and duty post. But before you get a chance to
          do all this, you need to first create a team.{" "}
        </p>
        <Button className="button">Get Started Now</Button>
      </div>
      <div className="team-svg">
        <img src={img} alt="svg" />
      </div>
    </div>
  );
}

export default TeamCreatePage;
