import React, { useContext, useEffect, useState } from "react";
import { store } from "../../stateManagement/store";
import { Button } from "../../components/button/Button";
import { QuickActionCard } from "../../components/quickActionCard/quickActionCard";
import Slider from "../../components/slider/slider";
import { Link } from "react-router-dom";
import GetActivitySummary from "../../components/dashboardAxiosCall/GetActivitySummary";
import GetQuickView from "../../components/dashboardAxiosCall/GetQuickView";
import Graph from "../../components/graph/Graph";
import { graphOptions } from "../Dashboard/graphOptions";
import { axiosHandler } from "../../utils/axiosHandler";
import { PROFILE_STATUS_URL } from "../../utils/urls";
import { getToken } from "../../utils/helper";
import { Notification } from "../../components/notification/Notification";
import { Spinner } from "../../components/spinner/Spinner";
import _ from "lodash";

import homeImg from "../../assets/images/home.png";
import graphImg from "../../assets/images/graph.png";
import housesImg from "../../assets/images/houses.png";
import inspectionImg from "../../assets/images/inspection.png";

import "./AgentDashboard.css";

function AgentDashboard(_) {
  const [profileStat, setProfileStat] = useState("");
  const [proifleLoader, setProfileLoader] = useState(true);

  const {
    state: { userDetails }
  } = useContext(store);

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

  const getProfileStats = () => {
    if (userDetails.user) {
      axiosHandler(
        "GET",
        PROFILE_STATUS_URL + `/${userDetails.user.id}`,
        getToken()
      )
        .then(res => {
          setProfileStat(res.data.status);
          setProfileLoader(false);
        })
        .catch(err => {
          Notification.bubble({
            type: "error",
            content: "Error loading profile status"
          });
          setProfileLoader(false);
        });
    }
  };

  // const role = proifleLoader ? "" : userDetails.role.name;

  useEffect(() => {
    getProfileStats();
  }, [userDetails]);

  return (
    <div className="dashboard-main">
      <div className="home-grid">
        <div className="left-side">
          <div className="welcome-card">
            <div className="content">
              <h3>
                {" "}
                {proifleLoader ? "" : `Welcome ${userDetails.user.first_name}`}
              </h3>
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
                <div className="counter">
                  {proifleLoader ? <Spinner /> : `${profileStat}%`}
                </div>
                <Button>
                  <Link to="/profile">Complete Profile</Link>
                </Button>
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

export default AgentDashboard;
