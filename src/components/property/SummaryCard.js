import React from "react";
import { Card } from "../card/Card";
import games from "../../assets/svgs/game.svg";
import wins from "../../assets/svgs/win.svg";
import "./property.css";

function SummaryCard({ total, type }) {
  let icons = {
    games,
    wins
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
