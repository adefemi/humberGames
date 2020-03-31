import React, { useContext, useEffect, useState } from "react";
import { Button } from "../../components/button/Button";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";

import getStartedImg from "../../assets/images/buildings.png";

import "./AgencySetup.css";
import { Link } from "react-router-dom";

const AgencyGetStarted = () => {
  const { dispatch } = useContext(store);
  const [profileLoader, setProfileLoader] = useState(true);

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Agency" });
  }, []);

  const {
    state: { userDetails }
  } = useContext(store);

  const getProfileStats = () => {
    if (userDetails.user) {
      setProfileLoader(false);
    }
  };

  useEffect(() => {
    getProfileStats();
  }, [userDetails]);

  return (
    <div className="get-started-container flex">
      <div className="get-started-texts">
        <h3>
          {profileLoader
            ? ""
            : `Hi ${userDetails.user.first_name}. Welcome to the agency page`}
        </h3>
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
