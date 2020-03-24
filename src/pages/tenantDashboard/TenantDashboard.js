import React, { useContext, useEffect, useState } from "react";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import { Button } from "../../components/button/Button";
import Slider from "../../components/slider/slider";
import NotificationCard from "../../components/notificationDashboardCard/NotificationCard";
import GetActivitySummary from "../../components/dashboardAxiosCall/GetActivitySummary";
import GetQuickView from "../../components/dashboardAxiosCall/GetQuickView";

import "./TenantDashboard.css";

const TenantDashboard = () => {
  const { dispatch } = useContext(store);
  useEffect(() => {
    dispatch({ title: setPageTitleAction, payload: "Tenant Dashboard" });
  }, []);

  return (
    <div>
      <div className="welcome-and-notifications flex">
        <div className="welcome-container">
          <div className="welcome-rectangle flex align-center">
            <div className="welcome-texts">
              <p>Welcome back Lara!</p>
              <p>
                Continue setting up your profile and explore how users are
                checking them out.
              </p>
              <p>Also, if you need help, our chat box is always available</p>
            </div>
            <div className="profile-stat">
              <div className="stat-circle"></div>
              <div className="stat-info">
                <div className="counter">80%</div>
                <Button>Complete Profile</Button>
              </div>
            </div>
          </div>
          <div className="activity-summary-container">
            <p>Activity Summary</p>
            <Slider className="activity-summaries flex">
              <GetActivitySummary userRole="tenant" className="flex" />
            </Slider>
          </div>
        </div>
        <div className="notifications-container">
          <h4>Notifications</h4>
          <div className="notifications-and-show-more">
            <div className="notifications">
              {[1, 2, 3, 4, 5].map((_, key) => (
                <NotificationCard
                  title="You applied to Eko Atlantic"
                  time={`05-01-2020 ${" "} 03:15pm`}
                />
              ))}
            </div>
            <div className="show-more">
              <a className="">Show more</a>
            </div>
          </div>
        </div>
      </div>
      <div className="quick-views-container">
        <h4>Quick Views</h4>
        <div className="quick-views grid grid-3">
          <GetQuickView userRole="tenant" />
        </div>
      </div>
    </div>
  );
};

export default TenantDashboard;
