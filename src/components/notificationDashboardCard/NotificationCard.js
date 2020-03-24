import React from "react";

import "./NotificationCard.css";

export default function NotificationCard({ title, time }) {
  return (
    <div className="notification-card">
      <div className="notification-content">
        <p className="title"> {title} </p>
        <p className="time"> {time} </p>
      </div>
    </div>
  );
}
