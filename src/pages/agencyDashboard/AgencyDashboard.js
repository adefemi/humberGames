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

const AgencyDashboard = () => {
  const { dispatch } = useContext(store);
  useEffect(() => {
    dispatch({ title: setPageTitleAction, payload: "Agency Dashboard" });
  }, []);
  return (
    <div className="agency-dashboard">
      <div className="graph-and-quick-links flex">
        <AgencyGraphRequest />
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
    </div>
  );
};

export default AgencyDashboard;
