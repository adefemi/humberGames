import React from "react";

import bgImg from "../../assets/images/lahore-18h.png";

const NotificationCard = () => {
  return (
    <div className="single-card flex align-center">
      <div className="notification-status"></div>
      <img className="notification-image" src={bgImg} alt="image" />
      <p className="notification-details">
        Oliver Gucci, marlians and 5 others viewed your property at Banana
        Island
      </p>
      <div className="time-container flex">
        <p className="time">4:00 PM</p>
      </div>
    </div>
  );
};

export default NotificationCard;
