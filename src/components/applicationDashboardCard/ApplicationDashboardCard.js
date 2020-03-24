import React from "react";
import { Button } from "../button/Button";

import "./ApplicationDashboardCard.css";

export default function ApplicationDashboardCard({
  image,
  title,
  appDate,
  appStatus
}) {
  return (
    <div className="application-dashboard-card">
      <div className="app-img" style={{ backgroundImage: `url(${image})` }} />
      <div className="application-content">
        <p className="title"> {title} </p>
        <p className="application-date"> Applied at: {appDate} </p>
        <div>
          <Button className={`app-status ${appStatus}`}> {appStatus} </Button>
        </div>
      </div>
    </div>
  );
}
