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
        <div className="flex w-100 summary-flex">
          <span>
            <img src={icons[type.toLowerCase()]} alt="" />
          </span>
          <div className="card-stat-text">Total {type}</div>
          <strong className="stat-figure">{total}</strong>
        </div>
      </Card>
    </div>
  );
}

export default SummaryCard;
