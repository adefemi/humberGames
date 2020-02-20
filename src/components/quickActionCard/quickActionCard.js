import React from "react";
import "./quickActionCard.css";

export const QuickActionCard = ({ image, title, type = "" }) => {
  return (
    <div className={`quick-action-card ${type}`}>
      <img src={image} alt="" />
      <div className="title">{title}</div>
    </div>
  );
};
