import React, { useContext, useEffect } from "react";
import { Button } from "../../components/button/Button";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";

import getStartedImg from "../../assets/images/buildings.png";

import "./AgencySetup.css";
import { Link } from "react-router-dom";

const AgencyGetStarted = () => {
  const { dispatch } = useContext(store);

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Agency" });
  }, []);

  return (
    <div className="get-started-container flex">
      <div className="get-started-texts">
        <h3>Hi Lara. Welcome to the agency page</h3>
        <p>
          In order to enjoy the agency functionalities, you need to provide some
          credentials which will prove your existence
        </p>
        <Link to="/agency-setup">
          <Button className="get-started-button">Get Started</Button>
        </Link>
      </div>
      <div
        className="get-started-img"
        style={{ backgroundImage: `url(${getStartedImg})` }}
      ></div>
    </div>
  );
};

export default AgencyGetStarted;
