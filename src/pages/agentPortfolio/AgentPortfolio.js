import React, { useContext, useEffect, useState } from "react";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";

import AppIcon from "../../components/icons/Icon";
import { Button } from "../../components/button/Button";
import { Card } from "../../components/card/Card";

import agencySvg from "../../assets/agencyPortfolio/agency.svg";
import agentValuationSvg from "../../assets/agencyPortfolio/agentValuation.svg";
import agentActiveRentalsSvg from "../../assets/agencyPortfolio/agentActiveRentals.svg";
import agentUnitsSvg from "../../assets/agencyPortfolio/agentUnits.svg";
import checkedSvg from "../../assets/agencyPortfolio/checked.svg";
import bgImg from "../../assets/images/lahore-18h.png";
import home from "../../assets/agencyPortfolio/house.jpg";
import "./AgentPortfolio.css";

const AgencyPortfolio = () => {
  const { dispatch } = useContext(store);
  const [checked, setChecked] = useState(false);
  const onCheckBoxClick = () => {
    setChecked(!checked);
  };
  const checkedBkg = checked ? { background: `url(${checkedSvg})` } : {};
  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Agent Portfolio" });
  }, []);
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
            <div className="money">
              <img
                src={agentValuationSvg}
                alt="agent-valuation"
                className="agent-valuation-svg"
              />
              <div>
                <p>N5,600,734,589.22</p>
                <p>valuation(per annum)</p>
              </div>
            </div>
            <div className="rentals">
              <img
                src={agentActiveRentalsSvg}
                alt="agent-active-rentals"
                className="agent-active-rentals-svg"
              />
              <div>
                <p>10</p>
                <p>Active rentals</p>
              </div>
            </div>
            <div className="units">
              <img src={agentUnitsSvg} alt="" className="agent-units-svg" />
              <div>
                <p>60</p>
                <p>Units</p>
              </div>
            </div>
          </div>
        </div>
        <div className="rectangle-1 agent-actions">
          <p>Actions</p>
          <br />
          <p className="change-branch">
            <AppIcon className="office" name="office" type="icomoon" />
            Change Branch
          </p>
          <div className="divider" />
          <p className="remove-agent">
            <AppIcon className="office" name="office" type="icomoon" />
            Remove Agent
          </p>
          <div className="divider" />
        </div>
      </div>
      <div className="rectangle-2">
        <div className="rectangle-2-content">
          <p className="property-text">Properties posted by agent: </p>
          <div className="agent-buttons flex">
            <Button className="reassign">Reassign</Button>
            <Button className="delete">Delete</Button>
          </div>
          <div className="property-card grid grid-4">
            <Card>
              <div
                className="property-image"
                style={{ background: `url(${home})` }}
              >
                <div
                  onClick={onCheckBoxClick}
                  style={checkedBkg}
                  className="checkbox"
                ></div>
              </div>
              <p className="property-title">
                A smart multi-faceted mansionette...
              </p>
              <p className="property-address">Chevron Drive, Lagos State</p>
            </Card>
            <Card>
              <div
                className="property-image"
                style={{ background: `url(${home})` }}
              >
                <div className="checkbox"></div>
              </div>
              <p className="property-title">
                A smart multi-faceted mansionette...
              </p>
              <p className="property-address">Chevron Drive, Lagos State</p>
            </Card>
            <Card>
              <div
                className="property-image"
                style={{ background: `url(${home})` }}
              >
                <div className="checkbox"></div>
              </div>
              <p className="property-title">
                A smart multi-faceted mansionette...
              </p>
              <p className="property-address">Chevron Drive, Lagos State</p>
            </Card>
            <Card>
              <div
                className="property-image"
                style={{ background: `url(${home})` }}
              >
                <div className="checkbox"></div>
              </div>
              <p className="property-title">
                A smart multi-faceted mansionette...
              </p>
              <p className="property-address">Chevron Drive, Lagos State</p>
            </Card>
            <Card>
              <div
                className="property-image"
                style={{ background: `url(${home})` }}
              >
                <div className="checkbox"></div>
              </div>
              <p className="property-title">
                A smart multi-faceted mansionette...
              </p>
              <p className="property-address">Chevron Drive, Lagos State</p>
            </Card>
            <Card>
              <div
                className="property-image"
                style={{ background: `url(${home})` }}
              >
                <div className="checkbox"></div>
              </div>
              <p className="property-title">
                A smart multi-faceted mansionette...
              </p>
              <p className="property-address">Chevron Drive, Lagos State</p>
            </Card>
            <Card>
              <div
                className="property-image"
                style={{ background: `url(${home})` }}
              >
                <div className="checkbox"></div>
              </div>
              <p className="property-title">
                A smart multi-faceted mansionette...
              </p>
              <p className="property-address">Chevron Drive, Lagos State</p>
            </Card>
            <Card>
              <div
                className="property-image"
                style={{ background: `url(${home})` }}
              >
                <div className="checkbox"></div>
              </div>
              <p className="property-title">
                A smart multi-faceted mansionette...
              </p>
              <p className="property-address">Chevron Drive, Lagos State</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencyPortfolio;
