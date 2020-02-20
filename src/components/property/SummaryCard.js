import React from "react";
import { Card } from "../card/Card";
import AppIcon from "../icons/Icon";
import properties from "../../assets/svg/properties.svg";
function SummaryCard() {
  return (
    <div className="SummaryCard">
      <Card>
        <div className="flex w-100 summary-flex">
          <span>
            <img src={properties} alt="" />
          </span>
          <div className="card-stat-text">Total Properties</div>
          <strong>28</strong>
        </div>
      </Card>
    </div>
  );
}

export default SummaryCard;
