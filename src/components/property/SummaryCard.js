import React from "react";
import { Card } from "../card/Card";
import AppIcon from "../icons/Icon";
import properties from "../../assets/svg/properties.svg";
import units from "../../assets/svg/units.svg";
import interests from "../../assets/svg/interests.svg";
function SummaryCard({ total, type }) {
  let icons = {
    properties,
    units,
    interests
  };
  return (
    <div className="SummaryCard">
      <Card>
        <div className="summary-flex">
          <div className="flex align-center">
            <span>
              <img src={icons[type.toLowerCase()]} alt="" />
            </span>
            <div className="card-stat-text">Total {type}</div>
          </div>
          <div className="stat-figure">{total}</div>
        </div>
      </Card>
    </div>
  );
}

export default SummaryCard;
