import React from "react";
import { Link } from "react-router-dom";
import AppIcon from "../icons/Icon";
import "./PaymentDashboardCard.css";

function PaymentDashboardCard({ title, dueDate, description, link }) {
  return (
    <div className="payment-dashboard-card">
      <div className="payment-content">
        <p className="title"> {title} </p>
        <p className="due-date">Due date: {dueDate} </p>
        <p className="description">Payment description: {description} </p>
      </div>
      <div className="link">
        <Link to={link}>
          Pay now
          <AppIcon name="arrowRight2" className="arrow-right" type="icomoon" />
        </Link>
      </div>
    </div>
  );
}

export default PaymentDashboardCard;
