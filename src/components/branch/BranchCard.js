import React from "react";
import { Card } from "../card/Card";
import AppIcon from "../icons/Icon";
import branchImg from "../../assets/svg/branch.svg";

function BranchCard() {
  const cardHeading = (
    <div className="flex justify-between">
      <div className="branch-details">
        <strong>Ikoyi Branch</strong>
        <div className="branch-location">Kufang, Plateau</div>
      </div>
      <AppIcon type="feather" name="moreVertical" />
    </div>
  );

  return (
    <div className={"BranchCard"}>
      <Card heading={cardHeading}>
        <div className="flex column card-wrap">
          <div className="top-body-section">
            <div className="flex pa-details">
              <div className="flex-1">
                <img width="18px" src={branchImg} />
                <span className="agent-stats">273 Agents</span>
              </div>
              <div className="flex-1 text-right">
                <img width="18px" src={branchImg} />
                <span className="agent-stats">273 Properties</span>
              </div>
            </div>
          </div>
          <div className="main-card-body flex-1">
            <div className="bank-name">Access Bank Plc.</div>
            <div className="account-holder">Bukola Hamidat Adesola</div>
            <div className="account-number">0059800992</div>
          </div>
          <div className="flex card-footer">
            <div className="agent-picture"></div>
            <div className="agent-details">
              <div className="agent-name">
                <strong>Hamidah Adesola</strong>
              </div>
              <div className="agent-email">cutieberry@gmail.com</div>
              <div className="manager-badge">MANAGER</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default BranchCard;
