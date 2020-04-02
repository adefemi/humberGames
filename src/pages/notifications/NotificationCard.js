import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import moment from "moment";

import bgImg from "../../assets/images/lahore-18h.png";

const NotificationCard = ({ link, content, time }) => {
  return (
    <div className="single-card flex align-center">
      <div className="notification-status"></div>
      {/* <img className="notification-image" src={bgImg} alt="image" /> */}
      <p className="notification-details">
        <Link to={link}>{content}</Link>
      </p>
      <div className="time-container flex">
        <p className="time">{moment(time).format("ddd, MMM, YYYY, h:mm a")}</p>
      </div>
    </div>
  );
};

export default NotificationCard;
