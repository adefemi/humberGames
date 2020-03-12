import React, { useContext, useEffect } from "react";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";

import "./TenantDashboard.css";

const TenantDashboard = () => {
  const { dispatch } = useContext(store);

  useEffect(() => {
    dispatch({ title: setPageTitleAction, payload: "Dashboard" });
  }, []);
  return (
    <div>
      <div className="header-and-notifications flex">
        <div className="header-container">
          <div className="header-rectangle flex align-center">
            <div className="header-texts">
              <p>Welcome back Lara!</p>
              <p>
                Continue setting up your profile and explore how users are
                checking them out.
              </p>
              <p>Also, if you need help, our chat box is always available</p>
            </div>
            <div className="completion-level">
              <p>60%</p>
              <p>Complete Profile</p>
            </div>
          </div>
          <div className="activity-summary-container">
            <p>Activity Summary</p>
            <div className="activity-summaries">
              <div className="application-summary"></div>
              <div className="lease-summary"></div>
            </div>
          </div>
        </div>
        <div className="notifications-container">
          <h4>Notifications</h4>
          <div className="notifications-and-show-more">
            <div className="notifications-content">
              <p>You have an upcoming inspetion</p>
              <div className="divider"></div>
              <p>You applied for Suite 35, Banana Island</p>
              <div className="divider"></div>
              <p>Your rent for House 22, Eko Atlantic City is due!!!</p>
            </div>
            <div className="show-more">
              <a className="">Show more</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantDashboard;
