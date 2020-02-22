import React from "react";
import "./propertyDashboardCard.css";
import { Link } from "react-router-dom";
import AppIcon from "../icons/Icon";

function PropertyDashboardCard({ cover, title, description, link }) {
  return (
    <div className="property-dashboard-card">
      <div className="img-con" style={{ backgroundImage: `url("${cover}")` }} />
      <div className="content">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <div className="link">
        <Link to={link}>
          <AppIcon name="ic_reply" type="md" />
        </Link>
      </div>
    </div>
  );
}

export default PropertyDashboardCard;
