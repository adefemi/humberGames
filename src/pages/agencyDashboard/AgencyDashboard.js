import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { store } from "../../stateManagement/store";
import Slider from "../../components/slider/slider";
import { Link } from "react-router-dom";

import "./AgencyDashboard.css";
import AgencyGraphRequest from "./AgencyGraphRequest";
import GetActivitySummary from "../../components/dashboardAxiosCall/GetActivitySummary";
import GetQuickView from "../../components/dashboardAxiosCall/GetQuickView";
import { setPageTitleAction } from "../../stateManagement/actions";
import moment from "moment";
import _ from "lodash";

import { axiosHandler } from "../../utils/axiosHandler";
import { AGENCY_URL } from "../../utils/urls";
import { getToken } from "../../utils/helper";
import { Notification } from "../../components/notification/Notification";
import { Spinner } from "../../components/spinner/Spinner";
import AgencyGetStarted from "../agencyCreation/AgencyGetStarted";

const AgencyDashboard = props => {
  const [agency, setAgency] = useState({});
  const [loader, setLoader] = useState(true);

  const {
    dispatch,
    state: { userDetails }
  } = useContext(store);

  const getAgency = () => {
    if (userDetails.user) {
      const userID = userDetails.user.id;
      axiosHandler("GET", AGENCY_URL + `?user_id=${userID}`, getToken())
        .then(res => {
          setAgency(res.data.results.results);
          setLoader(false);
        })
        .catch(err => {
          Notification.bubble({
            type: "error",
            content: "Unable to load agency data"
          });
        });
    }
  };

  useEffect(() => {
    dispatch({ title: setPageTitleAction, payload: "Agency Dashboard" });
  }, []);

  useEffect(() => {
    if (!userDetails.role) return;
    if (userDetails.role.name.toLowerCase() !== "agency") {
      props.history.push("/");
    }
    getAgency();
  }, [userDetails]);

  const role = loader ? "" : userDetails.role.name;

  const showAgency = () => {
    if (loader) {
      return <Spinner color="#000" />;
    } else {
      if (agency.length == 0) {
        return <AgencyGetStarted />;
      }
      return (
        <>
          <div className="graph-and-quick-links flex">
            <div className="graph-and-agency-logo">
              {loader ? (
                <Spinner color="#000" />
              ) : (
                <div className="agency-name-and-logo">
                  <div
                    className="agency-logo"
                    style={{
                      backgroundImage: `url(${_.get(
                        agency[0],
                        "corporate_logo.file"
                      )})`
                    }}
                  ></div>
                  <div className="agency-name">
                    <p>{_.get(agency[0], "name")}</p>
                    <p>
                      Created {moment(_.get(agency[0], "created_at")).fromNow()}
                    </p>
                  </div>
                </div>
              )}
              <AgencyGraphRequest />
            </div>
            <div className="quick-links-container">
              <p>Quick Links</p>
              <div className="quick-links">
                <Link to="/branch">Branches</Link>
                <div className="ag-divider"></div>
                <Link to="/team">Teams</Link>
                <div className="ag-divider"></div>
                <Link to="/">Agents</Link>
                <div className="ag-divider"></div>
                <Link to="/">Customer Base</Link>
                <div className="ag-divider"></div>
                <Link to="/transactions">Transactions</Link>
                <div className="ag-divider"></div>
                <Link to="/bank-account">Bank Accounts</Link>
              </div>
            </div>
          </div>
          <div className="activity-summary-container">
            <p>Activity Summary</p>
            <Slider className="activity-summaries flex">
              <GetActivitySummary userRole="agency" className="flex" />
            </Slider>
          </div>
          <div className="quick-views-container">
            <h4>Quick Views</h4>
            <div className="quick-views grid grid-3">
              <GetQuickView userRole="agency" />
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <div className="agency-dashboard">
      {role == "agency" ? showAgency() : ""}
    </div>
  );
};

export default AgencyDashboard;
