import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import moment from "moment";

import bgImg from "../../assets/images/lahore-18h.png";

const NotificationCard = item => {
  console.log(item);
  return (
    <div className="single-card flex align-center">
      <div className="notification-status"></div>
      {/* <img className="notification-image" src={bgImg} alt="image" /> */}
      <p className="notification-details">
        <Link to={_.get(item, "item.rel_path", "")}>
          {_.get(item, "item.content", "")}
        </Link>
      </p>
      <div className="time-container flex">
        <p className="time">
          {moment(_.get(item, "item.updated_at", "")).format(
            "ddd, MMM, YYYY, h:mm a"
          )}
        </p>
      </div>
    </div>
  );
};

export default NotificationCard;
