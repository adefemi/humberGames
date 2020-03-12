import React, { useContext } from "react";
import { useEffect } from "react";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import Slider from "../../components/slider/slider";
import { ActivitySummaryCard } from "../../components/activeSummaryCard/activitySummaryCard";
import { ViewCard } from "../Dashboard/dashboard";
import PaymentDashboardCard from "../../components/paymentDashboardCard/PaymentDashboardCard";
import InspectionDashboardCard from "../../components/inspectionDashboardCard/InspectionDashboardCard";
import ApplicationDashboardCard from "../../components/applicationDashboardCard/ApplicationDashboardCard";

import houseImg from "../../assets/agencyPortfolio/house.jpg";
import documentSvg from "../../assets/images/document.svg";
import shieldSvg from "../../assets/images/shield.svg";
import keySvg from "../../assets/images/key-outlined.svg";

import "./AgencyDashboard.css";
import { Link } from "react-router-dom";

const AgencyDashboard = () => {
  const { dispatch } = useContext(store);
  useEffect(() => {
    dispatch({ title: setPageTitleAction, payload: "Agency Dashboard" });
  });
  return (
    <div>
      <div className="graph-and-quick-links flex">
        <div className="agency-graph">Graph to be Here</div>
        <div className="quick-links-container">
          <p>Quick Links</p>
          <div className="quick-links">
            <Link to="/">Branches</Link>
            <div className="divider"></div>
            <Link to="/">Teams</Link>
            <div className="divider"></div>
            <Link to="/">Agents</Link>
            <div className="divider"></div>
            <Link to="/">Customer Base</Link>
            <div className="divider"></div>
            <Link to="/">Transactions</Link>
            <div className="divider"></div>
            <Link to="/">Bank Accounts</Link>
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
          <ActivitySummaryCard
            image={keySvg}
            mainContent={{ title: "Total Properties", count: 147 }}
            subContent={{ title: "Unpubllished", count: 5 }}
            color="blue"
          />
        </Slider>
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

export default AgencyDashboard;
