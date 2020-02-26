import React from "react";
import "./AgencyPortfolio.css";
import agencySvg from "../../assets/agency.svg";
import bgImg from "../../assets/images/lahore-18h.png";

const AgencyPortfolio = () => {
  return (
    <div>
      <div className="rectangle flex">
        <img src={agencySvg} alt="agency-svg" className="agency-svg" />
        <div className="agency-header-container">
          <p>Agents List</p>
          <p>Manage agents under your agency</p>
        </div>
      </div>
      <div className="agent-container grid grid-2">
        <div className="rectangle-1 agent-details">
          <img src={bgImg} alt="agent-image" className="agent-image" />
          <p className="agent-name">Lara Dutta Bachchan</p>
          <p className="agent-email">lara.dutta@react.com</p>
          <p className="branch">IKOYI BRANCH</p>
          <div className="agent-property-details grid grid-3">
            <div className="money">valuation per annum</div>
            <div className="rentals">Active rentals</div>
            <div className="units">Units</div>
          </div>
        </div>
        <div className="rectangle-1 agent-actions">
          <p>Actions</p>
          <br />
          <p>Change Branch</p>
          <div className="divider" />
          <p>Remove Agent</p>
          <div className="divider" />
        </div>
      </div>
    </div>
  );
};

export default AgencyPortfolio;
