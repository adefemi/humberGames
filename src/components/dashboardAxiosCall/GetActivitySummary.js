import React, { useState, useEffect } from "react";
import { ActivitySummaryCard } from "../activeSummaryCard/activitySummaryCard";
import { axiosHandler, testToken } from "../../utils/axiosHandler";
import { DASHBOARD_URL } from "../../utils/urls";
import { Notification } from "../notification/Notification";
import Skeleton from "react-loading-skeleton";
import _ from "lodash";

import documentSvg from "../../assets/images/document.svg";
import shieldSvg from "../../assets/images/shield.svg";
import officeSvg from "../../assets/svg/office.svg";
import keySvg from "../../assets/images/key-outlined.svg";
import fileSvg from "../../assets/images/file-folder.svg";

export default function GetActivitySummary({ className, userRole }) {
  const [activitySummary, setActivitySummary] = useState({});
  const [summaryLoader, setSummaryLoader] = useState(true);

  useEffect(() => {
    getSummary();
  }, []);

  const getSummary = () => {
    axiosHandler("GET", DASHBOARD_URL + `?user_role=${userRole}`, testToken)
      .then(res => {
        setActivitySummary(res.data.summary);
        setSummaryLoader(false);
      })
      .catch(err => {
        Notification.bubble({
          type: "error",
          content: "Error loading activity summary"
        });
        setSummaryLoader(false);
      });
  };
  const summaryContent = () => {
    if (userRole === "tenant") {
      return (
        <>
          <ActivitySummaryCard
            image={documentSvg}
            mainContent={{
              title: "Total Applications",
              count: _.get(activitySummary, "total_application")
            }}
            subContent={{
              title: "Pending Applications",
              count: _.get(activitySummary, "pending_application")
            }}
            color="green"
          />
          <ActivitySummaryCard
            image={shieldSvg}
            mainContent={{
              title: "Total Agreements",
              count: _.get(activitySummary, "total_lease")
            }}
            subContent={{
              title: "Awaiting Signature",
              count: _.get(activitySummary, "awaiting_signature")
            }}
            color="yellow"
          />
        </>
      );
    }
    if (userRole === "agency") {
      return (
        <>
          <ActivitySummaryCard
            image={officeSvg}
            mainContent={{
              title: "Total Branches",
              count: _.get(activitySummary, "total_branch")
            }}
            subContent={{
              title: "Total Requests",
              count: _.get(activitySummary, "total_request")
            }}
            color="blue"
          />
          <ActivitySummaryCard
            image={keySvg}
            mainContent={{
              title: "Total Properties",
              count: _.get(activitySummary, "total_properties")
            }}
            subContent={{
              title: "Total Units",
              count: _.get(activitySummary, "total_units")
            }}
            color="pink"
          />
          <ActivitySummaryCard
            image={documentSvg}
            mainContent={{
              title: "Total Applications",
              count: _.get(activitySummary, "total_application")
            }}
            subContent={{
              title: "Pending Applications",
              count: _.get(activitySummary, "pending_application")
            }}
            color="green"
          />
          <ActivitySummaryCard
            image={shieldSvg}
            mainContent={{
              title: "Rented Units",
              count: _.get(activitySummary, "rented_unit")
            }}
            subContent={{
              title: "Sold Units",
              count: _.get(activitySummary, "sold_unit")
            }}
            color="yellow"
          />
        </>
      );
    }
    if (userRole === "landlord" || userRole === "agent") {
      return (
        <>
          <ActivitySummaryCard
            image={fileSvg}
            mainContent={{
              title: "Total Properties",
              count: _.get(activitySummary, "total_properties")
            }}
            subContent={{
              title: "Total Landlords",
              count: _.get(activitySummary, "total_landlord")
            }}
            color="pink"
          />
          <ActivitySummaryCard
            image={keySvg}
            mainContent={{
              title: "Active Rents",
              count: _.get(activitySummary, "active_rent")
            }}
            subContent={{
              title: "Due Rents",
              count: _.get(activitySummary, "due_rent")
            }}
            color="blue"
          />
          <ActivitySummaryCard
            image={documentSvg}
            mainContent={{
              title: "Total Applications",
              count: _.get(activitySummary, "total_application")
            }}
            subContent={{
              title: "Pending Applications",
              count: _.get(activitySummary, "pending_application")
            }}
            color="green"
          />
          <ActivitySummaryCard
            image={shieldSvg}
            mainContent={{
              title: "Total Agreements",
              count: _.get(activitySummary, "total_lease")
            }}
            subContent={{
              title: "Awaiting Signature",
              count: _.get(activitySummary, "awaiting_signature")
            }}
            color="yellow"
          />
        </>
      );
    }
  };

  return (
    <div className={className}>
      {summaryLoader ? <Skeleton width={300} height={145} /> : summaryContent()}
    </div>
  );
}
