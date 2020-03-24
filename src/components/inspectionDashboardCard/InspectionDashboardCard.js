import React from "react";
import { Button } from "../button/Button";

import "./InspectionDashboardCard.css";

export default function InspectionDashboardCard({
  image,
  title,
  schedule,
  name,
  phoneNum,
  userType
}) {
  return (
    <div className="inspection-dashboard-card">
      <div className="ins-img" style={{ backgroundImage: `url(${image})` }} />
      <div className="inspection-content">
        <p className="title"> {title} </p>
        <p className="schedule"> Scheduled for: {schedule} </p>
        <div className="inspectee-details flex">
          <p> {`${name}, ${phoneNum}`} </p>
          <Button className={`userType ${userType}`}> {userType} </Button>
        </div>
      </div>
    </div>
  );
}
