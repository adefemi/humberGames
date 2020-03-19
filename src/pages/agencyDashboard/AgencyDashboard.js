import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import Slider from "../../components/slider/slider";
import { ActivitySummaryCard } from "../../components/activeSummaryCard/activitySummaryCard";
import { ViewCard } from "../Dashboard/dashboard";
import PaymentDashboardCard from "../../components/paymentDashboardCard/PaymentDashboardCard";
import InspectionDashboardCard from "../../components/inspectionDashboardCard/InspectionDashboardCard";
import ApplicationDashboardCard from "../../components/applicationDashboardCard/ApplicationDashboardCard";
import { Link } from "react-router-dom";
import { DASHBOARD_URL } from "../../utils/urls";
import { Notification } from "../../components/notification/Notification";
import { axiosHandler, testToken } from "../../utils/axiosHandler";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import TransactionTable from "../../components/transactionTable/transactionTable";

// import houseImg from "../../assets/agencyPortfolio/house.jpg";
import documentSvg from "../../assets/images/document.svg";
import shieldSvg from "../../assets/images/shield.svg";
import keySvg from "../../assets/images/key-outlined.svg";
import officeSvg from "../../assets/svg/office.svg";

import "./AgencyDashboard.css";
import AgencyGraph from "./AgencyGraph";

const AgencyDashboard = () => {
  const { dispatch } = useContext(store);
  const [activitySummary, setActivitySummary] = useState({});
  const [quickViews, setQuickViews] = useState({});
  const [summaryLoader, setSummaryLoader] = useState(true);

  useEffect(() => {
    dispatch({ title: setPageTitleAction, payload: "Agency Dashboard" });
  });

  useEffect(() => {
    getSummary();
  }, []);

  const getSummary = () => {
    axiosHandler("GET", DASHBOARD_URL + "?user_role=agency", testToken)
      .then(res => {
        setActivitySummary(res.data.summary);
        setQuickViews(res.data.quick_views);
        setSummaryLoader(false);
      })
      .catch(err => {
        Notification.bubble({
          type: "error",
          content: "Error loading summary and/or quick view"
        });
        setSummaryLoader(false);
      });
  };

  const upComingPayments = () => {
    let up = quickViews["upcoming_payments"];
    if (up) {
      if (up.length === 0) {
        return <h4>No upcoming payments</h4>;
      }
      return up.map(payment => (
        <PaymentDashboardCard
          key={payment.uuid}
          title={payment.title}
          dueDate={moment(payment.due_date).format("MMM Do YYYY")}
          description={`${payment.description}, ${payment.total_fee_currency}${payment.total_fee}`}
          link="/"
        />
      ));
    }
    return <h4>Failed to load upcoming payments</h4>;
  };

  const upComingInspections = () => {
    let ui = quickViews["upcoming_inspection"];
    if (ui) {
      if (ui.length === 0) {
        return <h4>No upcoming inspections</h4>;
      }
      return ui.map(inspection => (
        <InspectionDashboardCard
          key={inspection.uuid}
          image={inspection.application.unit.unit_images[0].image.file}
          title={inspection.application.unit.title}
          schedule={`${inspection.inspection_date}, ${inspection.inspection_time}`}
          name={`${inspection.application.user.first_name}, ${inspection.application.user.last_name}`}
          phoneNum={`${inspection.application.user.user_profile.country_code}${inspection.application.user.user_profile.phone_number}`}
          userType={inspection.application.user.user_type}
        />
      ));
    }
    return <h4>Failed to load upcoming inspections</h4>;
  };

  const recentTransactions = () => {
    let rt = quickViews["transactions"];
    if (rt) {
      if (rt.length === 0) {
        return <h4>No recent transactions at the moment</h4>;
      }
      return rt.map(transaction => (
        <TransactionTable
          key={["blah", "blah"]}
          values={[
            ["a", 1],
            ["b", 2]
          ]}
        />
      ));
    }
    return <h4>Failed to load recent transactions</h4>;
  };

  return (
    <div className="agency-dashboard">
      <div className="graph-and-quick-links flex">
        <AgencyGraph />
        <div className="quick-links-container">
          <p>Quick Links</p>
          <div className="quick-links">
            <Link to="/">Branches</Link>
            <div className="ag-divider"></div>
            <Link to="/">Teams</Link>
            <div className="ag-divider"></div>
            <Link to="/">Agents</Link>
            <div className="ag-divider"></div>
            <Link to="/">Customer Base</Link>
            <div className="ag-divider"></div>
            <Link to="/">Transactions</Link>
            <div className="ag-divider"></div>
            <Link to="/">Bank Accounts</Link>
          </div>
        </div>
      </div>
      <div className="activity-summary-container">
        <p>Activity Summary</p>
        <Slider className="activity-summaries flex">
          <div className="branch-summary">
            <ActivitySummaryCard
              image={officeSvg}
              mainContent={{
                title: "Total Branches",
                count: activitySummary.total_branch
              }}
              subContent={{
                title: "Total Requests",
                count: activitySummary.total_request
              }}
              color="blue"
            />
          </div>
          <div className="property-summary">
            <ActivitySummaryCard
              image={keySvg}
              mainContent={{
                title: "Total Properties",
                count: activitySummary.total_properties
              }}
              subContent={{
                title: "Total Units",
                count: activitySummary.total_units
              }}
              color="pink"
            />
          </div>
          <div className="applications-summary">
            <ActivitySummaryCard
              image={documentSvg}
              mainContent={{
                title: "Total Applications",
                count: activitySummary.total_application
              }}
              subContent={{
                title: "Pending Applications",
                count: activitySummary.pending_application
              }}
              color="green"
            />
          </div>
          <div className="units-summary">
            <ActivitySummaryCard
              image={shieldSvg}
              mainContent={{
                title: "Rented Units",
                count: activitySummary.rented_unit
              }}
              subContent={{
                title: "Sold Units",
                count: activitySummary.sold_unit
              }}
              color="yellow"
            />
          </div>
        </Slider>
      </div>
      <div className="quick-views-container">
        <h4>Quick Views</h4>
        <div className="quick-views grid grid-3">
          <>
            {summaryLoader ? (
              <Skeleton height={407} width={360} />
            ) : (
              <ViewCard title="PAYMENTS IN VIEW">{upComingPayments()}</ViewCard>
            )}
          </>
          <>
            {summaryLoader ? (
              <Skeleton height={407} width={360} />
            ) : (
              <ViewCard title="UPCOMING INSPECTIONS">
                {upComingInspections()}
              </ViewCard>
            )}
          </>
          <>
            {summaryLoader ? (
              <Skeleton height={407} width={360} />
            ) : (
              <ViewCard title="TRANSACTIONS">{recentTransactions()}</ViewCard>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default AgencyDashboard;
