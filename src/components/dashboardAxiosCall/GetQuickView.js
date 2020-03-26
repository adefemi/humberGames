import React, { useState, useEffect } from "react";
import { axiosHandler, testToken } from "../../utils/axiosHandler";
import { DASHBOARD_URL } from "../../utils/urls";
import { Notification } from "../notification/Notification";
import Skeleton from "react-loading-skeleton";
import { ViewCard } from "../../pages/Dashboard/dashboard";
import moment from "moment";
import PaymentDashboardCard from "../paymentDashboardCard/PaymentDashboardCard";
import InspectionDashboardCard from "../inspectionDashboardCard/InspectionDashboardCard";
import ApplicationDashboardCard from "../applicationDashboardCard/ApplicationDashboardCard";
import TransactionTable from "../transactionTable/transactionTable";
import _ from "lodash";
import TenantDashboardCard from "../tenantDashboardCard/tenantDashboardCard";
import PropertyDashboardCard from "../propertyDashboardCard/propertyDashboardCard";

export default function GetQuickView({ userRole }) {
  const [quickView, setQuickView] = useState({});
  const [quickViewLoader, setQucickViewLoader] = useState(true);

  useEffect(() => {
    getQuickView();
  }, []);

  const getQuickView = () => {
    axiosHandler("GET", DASHBOARD_URL + `?user_role=${userRole}`, testToken)
      .then(res => {
        setQuickView(res.data.quick_views);
        setQucickViewLoader(false);
      })
      .catch(err => {
        Notification.bubble({
          type: "error",
          content: "Error loading quick views"
        });
        setQucickViewLoader(false);
      });
  };

  const upComingPayments = () => {
    let up = quickView["upcoming_payments"];
    if (up) {
      if (up.length === 0) {
        return <h4>No upcoming payments</h4>;
      }
      return up.map(payment => (
        <PaymentDashboardCard
          showPay={userRole}
          key={_.get(payment, "uuid")}
          title={_.get(payment, "title")}
          dueDate={moment(_.get(payment, "due_date")).format("MMM Do YYYY")}
          description={`${_.get(payment, "description")}, ${_.get(
            payment,
            "total_fee_currency"
          )}${_.get(payment, "total_fee")}`}
          link="/"
        />
      ));
    }
    return <h4>Failed to load upcoming payments</h4>;
  };

  const upComingInspections = () => {
    let ui = quickView["upcoming_inspection"];
    if (ui) {
      if (ui.length === 0) {
        return <h4>No upcoming inspections</h4>;
      }
      return ui.map(inspection => (
        <InspectionDashboardCard
          key={_.get(inspection, "uuid")}
          image={_.get(
            inspection,
            "application.unit.unit_images[0].image.file"
          )}
          title={_.get(inspection, "application.unit.title")}
          schedule={`${_.get(inspection, "inspection_date")}, ${_.get(
            inspection,
            "inspection_time"
          )}`}
          name={`${_.get(inspection, "application.user.first_name")}, ${_.get(
            inspection,
            "application.user.last_name"
          )}`}
          phoneNum={`${_.get(
            inspection,
            "application.user.user_profile.country_code"
          )}${_.get(inspection, "application.user.user_profile.phone_number")}`}
          userType={_.get(inspection, "application.user.user_type")}
        />
      ));
    }
    return <h4>Failed to load upcoming inspections</h4>;
  };

  const applications = () => {
    let apps = quickView["applications"];
    if (apps) {
      if (apps.length === 0) {
        return <h4>No applications at the moment</h4>;
      }
      return apps.map(app => (
        <ApplicationDashboardCard
          key={_.get(app, "uuid")}
          image={_.get(app, "unit.unit_images[0].image.file")}
          title={_.get(app, "unit.title")}
          appDate={moment(_.get(app, "updated_at")).format("MMM Do YYYY")}
          appStatus={_.get(app, "status")}
        />
      ));
    }
    return <h4>Failed to load applications</h4>;
  };

  const recentTransactions = () => {
    let rt = quickView["transactions"];
    if (rt) {
      if (rt.length === 0) {
        return <h4>No recent transactions at the moment</h4>;
      }
      return rt.map(transaction => (
        <TransactionTable
          key={["blah", "blah"]}
          values={[["a", 1], ["b", 2]]}
        />
      ));
    }
    return <h4>Failed to load recent transactions</h4>;
  };

  const activeRentals = () => {
    let ar = quickView["tenants"];
    if (ar) {
      if (ar.length === 0) {
        return <h4> No active rentals at the moment</h4>;
      }
      return ar.map(rentals => (
        <TenantDashboardCard
          key={_.get(rentals, "uuid")}
          name={_.get(rentals, "user.first_name")}
          cover={_.get(rentals, "user.user_profile.profile_picture.file")}
          expiry={_.get(rentals, "expiry")}
          propertyName={_.get(rentals, "title")}
          linkToProperty="/"
          linkToTenant="/"
        />
      ));
    }
    return <h4>Failed to load active rentals</h4>;
  };

  const unpublishedProperties = () => {
    let unpub = quickView["non_published_units"];
    if (unpub) {
      if (unpub.length === 0) {
        return <h4>No unpublished properties at the moment</h4>;
      }
      return unpub.map(unit => (
        <PropertyDashboardCard
          key={_.get(unit, "uuid")}
          title={_.get(unit, "title")}
          cover={_.get(unit, "unit_images[0].image.file")}
          description={_.get(unit, "description")}
          link="/"
        />
      ));
    }
    return <h4>Failed to load unpublished properties</h4>;
  };

  const quickViewContent = () => {
    if (userRole == "tenant") {
      return (
        <>
          {quickViewLoader ? (
            <Skeleton width={360} height={407} />
          ) : (
            <>
              <ViewCard title="PAYMENTS IN VIEW">{upComingPayments()}</ViewCard>
            </>
          )}
          {quickViewLoader ? (
            <Skeleton width={360} height={407} />
          ) : (
            <>
              <ViewCard title="UPCOMING INSPECTIONS">
                {upComingInspections()}
              </ViewCard>
            </>
          )}
          {quickViewLoader ? (
            <Skeleton width={360} height={407} />
          ) : (
            <>
              <ViewCard title="APPLICATIONS">{applications()}</ViewCard>
            </>
          )}
        </>
      );
    }

    if (userRole == "agency") {
      return (
        <>
          {quickViewLoader ? (
            <Skeleton width={360} height={407} />
          ) : (
            <>
              <ViewCard title="PAYMENTS IN VIEW">{upComingPayments()}</ViewCard>
            </>
          )}
          {quickViewLoader ? (
            <Skeleton width={360} height={407} />
          ) : (
            <>
              <ViewCard title="RECENT TRANSACTIONS">
                {recentTransactions()}
              </ViewCard>
            </>
          )}
        </>
      );
    }

    if (userRole == "agent" || userRole == "landlord") {
      return (
        <>
          {quickViewLoader ? (
            <Skeleton width={360} height={407} />
          ) : (
            <>
              <ViewCard title="UPCOMING INSPECTIONS">
                {upComingInspections()}
              </ViewCard>
            </>
          )}
          {quickViewLoader ? (
            <Skeleton width={360} height={407} />
          ) : (
            <>
              <ViewCard title="ACTIVE RENTALS">{activeRentals()}</ViewCard>
            </>
          )}
          {quickViewLoader ? (
            <Skeleton width={360} height={407} />
          ) : (
            <>
              <ViewCard title="RECENT TRANSACTIONS">
                {recentTransactions()}
              </ViewCard>
            </>
          )}
          {quickViewLoader ? (
            <Skeleton width={360} height={407} />
          ) : (
            <>
              <ViewCard title="UNPUBLISHED PROPERTIES">
                {unpublishedProperties()}
              </ViewCard>
            </>
          )}
        </>
      );
    }
  };

  return <>{quickViewContent()}</>;
}
