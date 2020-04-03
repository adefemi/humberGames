import React from "react";
import moment from "moment";

import "./NotificationDashboardCard.css";

export default function NotificationDashboardCard({ title, time }) {
  return (
    <div className="notification-card">
      <div className="notification-content">
        <p className="title"> {title} </p>
        <p className="time">{moment(time).format("ddd, MMM, YYYY, h:mm a")}</p>
      </div>
    </div>
  );
}
