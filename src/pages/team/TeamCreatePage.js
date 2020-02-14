import React, { useState } from "react";
import TeamTemplate from "./components/TeamTemplate";
import preRegister from "../../assets/preRegister.svg";
import Register from "../../assets/Register.svg";
import { Button } from "../../components/button/Button";
import Input from "../../components/input/Input";
import "./team.css";

const TeamCreatePage = props => {
  const [text, setText] = useState("");
  const [getStartedPage, setGetStartedPage] = useState(true);

  const onFormSubmit = e => {
    e.preventDefault();
    console.log(text);
    setText("");
  };

  let content = getStartedPage ? (
    <Button onClick={() => setGetStartedPage(false)} className="button">
      Get Started
    </Button>
  ) : (
    <>
      <div className="team-input-div">
        {" "}
        <p className="team-input-text">Give your team a name</p>
        <Input
          type="text"
          className="team-input"
          onChange={e => {
            setText(e.target.value);
          }}
          value={text}
          placeholder="Team Name (e.g. The Elites)"
          required
        />
        <br />
        <br />
        <div className="flex">
          <Button type="submit" className="team-button">
            Create Team
          </Button>
          <a className="cancel" onClick={() => setGetStartedPage(true)}>
            Cancel
          </a>
        </div>
      </div>
    </>
  );

  return (
    <TeamTemplate
      content={content}
      undraw={getStartedPage ? preRegister : Register}
      onFormSubmit={onFormSubmit}
    />
  );
};

export default TeamCreatePage;
