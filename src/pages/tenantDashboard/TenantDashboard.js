import React, { useContext, useEffect } from "react";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import { Button } from "../../components/button/Button";
import { ActivitySummaryCard } from "../../components/activeSummaryCard/activitySummaryCard";
import { ViewCard } from "../Dashboard/dashboard";
import PaymentDashboardCard from "../../components/paymentDashboardCard/PaymentDashboardCard";
import InspectionDashboardCard from "../../components/inspectionDashboardCard/InspectionDashboardCard";
import Slider from "../../components/slider/slider";
import ApplicationDashboardCard from "../../components/applicationDashboardCard/ApplicationDashboardCard";
import NotificationCard from "../../components/notificationDashboardCard/NotificationCard";

import houseImg from "../../assets/agencyPortfolio/house.jpg";
import documentSvg from "../../assets/images/document.svg";
import shieldSvg from "../../assets/images/shield.svg";

import "./TenantDashboard.css";

const TenantDashboard = () => {
  const { dispatch } = useContext(store);

  useEffect(() => {
    dispatch({ title: setPageTitleAction, payload: "Dashboard" });
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
              <div className="application-summary">
                <ActivitySummaryCard
                  image={documentSvg}
                  mainContent={{ title: "Total Applications", count: 20 }}
                  subContent={{ title: "Pending Applications", count: 5 }}
                  color="green"
                />
              </div>
              <div className="lease-summary">
                <ActivitySummaryCard
                  image={shieldSvg}
                  mainContent={{ title: "Total Leases", count: 10 }}
                  subContent={{ title: "Awaiting Signature", count: 3 }}
                  color="yellow"
                />
              </div>
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
          <ViewCard title="PAYMENTS IN VIEW">
            {[1, 2, 3, 4].map((_, key) => (
              <PaymentDashboardCard
                key={key}
                title="Payments for Unit 3, Eko Atlantic..."
                dueDate="30-01-2021"
                description="service charge, N100,000"
                link="/"
              />
            ))}
          </ViewCard>
          <ViewCard title="UPCOMING INSPECTIONS">
            {[1, 2, 3, 4].map((_, key) => (
              <InspectionDashboardCard
                key={key}
                image={houseImg}
                title="The Pavilion"
                schedule="03-04-2020 10:00am"
                name="Oliver Gucci"
                phoneNum="08111021984"
                userType="Agent"
              />
            ))}
          </ViewCard>
          <ViewCard title="APPLICATIONS">
            {[1, 2, 3, 4].map((_, key) => (
              <ApplicationDashboardCard
                key={key}
                image={houseImg}
                title="The Pavilion Annex"
                appDate="03-06-2020 10:00am"
                appStatus="Pending"
              />
            ))}
          </ViewCard>
        </div>
      </div>
    </div>
  );
};

export default TenantDashboard;
