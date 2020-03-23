import React, { useContext, useEffect } from "react";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import { Button } from "../../components/button/Button";
import { QuickActionCard } from "../../components/quickActionCard/quickActionCard";
import Slider from "../../components/slider/slider";
import { Link } from "react-router-dom";
import GetActivitySummary from "../../components/dashboardAxiosCall/GetActivitySummary";
import GetQuickView from "../../components/dashboardAxiosCall/GetQuickView";
import Graph from "../../components/graph/Graph";
import { graphOptions } from "./graphOptions";

import homeImg from "../../assets/images/home.png";
import graphImg from "../../assets/images/graph.png";
import housesImg from "../../assets/images/houses.png";
import inspectionImg from "../../assets/images/inspection.png";

import "./dashboard.css";

function Dashboard(_) {
  const { dispatch } = useContext(store);
  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Dashboard" });
  }, []);
  const xAxisLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  const yAxisData = [12, 19, 3, 5, 2, 3, 20, 7, 11, 8, 2, 10];

  return (
    <div className="dashboard-main">
      <div className="home-grid">
        <div className="left-side">
          <div className="welcome-card">
            <div className="content">
              <h3>Welcome Adefemi!</h3>
              <p>
                Continue setting up your portfolio and explore how users are
                checking them out.
              </p>
              <p>
                And also, if need help, our chat bot is always available to
                help.
              </p>
            </div>
            <div className="profile-stat">
              <div className="stat-circle" />
              <div className="stat-info">
                <div className="counter">80%</div>
                <Button>Complete Profile</Button>
              </div>
            </div>
          </div>
          <div className="activity-graph">
            <div className="heading">
              <h3>Properties Activity</h3>
              <small>
                This is a quick overview on your properties have been doing
                lately.
              </small>
              <div className="graph-content">
                <Graph
                  labels={xAxisLabels}
                  options={graphOptions}
                  datasets={[
                    { label: "Test", data: yAxisData, lineTension: 0.3 }
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="quick-action">
          <h3>Quick Actions</h3>
          <div className="quick-action-grid">
            <Link to="/add-property">
              <QuickActionCard
                title="List Property"
                type="list_property"
                image={homeImg}
              />
            </Link>
            <QuickActionCard
              title="View Properties"
              type="view_properties"
              image={housesImg}
            />
            <QuickActionCard
              title="Manage Transactions"
              type="manage_transactions"
              image={graphImg}
            />
            <QuickActionCard
              title="Manage Inspections"
              type="manage_inspections"
              image={inspectionImg}
            />
          </div>
        </div>
      </div>
      <section className="dashboard-section">
        <h3>Activity Summary</h3>
        <Slider className="summary-list">
          <GetActivitySummary userRole="agent" className="flex" />
        </Slider>
      </section>

      <section className="dashboard-section">
        <h3>Quick Views</h3>
        <Slider className="views-list">
          <GetQuickView userRole="agent" />
        </Slider>
      </section>
      <br />
      <br />
    </div>
  );
}

export const ViewCard = ({ title, children }) => {
  return (
    <div className="views-card">
      <h4>{title}</h4>
      <div className="content">{children}</div>
      <div className="bottom">
        <h5>Show More</h5>
      </div>
    </div>
  );
};

export default Dashboard;
