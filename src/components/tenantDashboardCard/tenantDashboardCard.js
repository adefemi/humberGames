import React from "react";
import "./tenantDashboardCard.css";
import { Link } from "react-router-dom";
import AppIcon from "../icons/Icon";

function TenantDashboardCard({
  cover,
  name,
  propertyName,
  expiry,
  linkToTenant,
  linkToProperty
}) {
  return (
    <div className="tenant-dashboard-card">
      <div className="img-con" style={{ backgroundImage: `url("${cover}")` }} />
      <div className="content">
        <Link to={linkToTenant}>
          <h4>{name}</h4>
        </Link>
        <Link to={linkToProperty}>
          <p>
            <AppIcon name="ic_home" type="md" />
            {propertyName}
          </p>
        </Link>
        <small>{expiry}</small>
      </div>
    </div>
  );
}

export default TenantDashboardCard;
