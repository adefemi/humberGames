import React, { useContext, useEffect, useState } from "react";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import leaseAggBadge from "../../assets/pngs/jam_shield-check-f.png";
import "./lease.css";
import { Button } from "../../components/button/Button";
import rrLogo from "../../assets/images/logo.svg";
import LeaseTerm from "./leaseTerm";
import LeaseDeclaration from "./leaseDeclaration";
import TenantConv from "./tenantConv";
import LandlordConv from "./landlordConv";
import Agreements from "./agreements";
import Signature from "./signature";
import LeaseSteps from "./leaseSteps";

function LeaseDefinition(props) {
  const { dispatch } = useContext(store);

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Lease Agreement" });
  }, []);
  return (
    <div>
      <section className="banner lease-banner">
        <img src={leaseAggBadge} alt="garden" />
        <div className="context">
          <h3>Manage Agreement</h3>
          <p>
            lease manage cannot get easier than what we’ve provided for you. All
            that is left now is for you to make use of our automated leasing
            system to generate leases, and sign them
          </p>
        </div>
      </section>
      <br />
      <br />
      <div className="lease-grid-main">
        <div className="main-area">
          <div />
          <div className="flex justify-between head-part">
            <div className="info-list">
              <div className="flex align-center">
                <div className="mode-item">Design Mode</div>
                <div className="spacer" />
                <div className="mode-item active">Preview Lease</div>
              </div>
              <h3>Residential lease</h3>
              <small>Created On, September 13th 2019</small>
            </div>
            <div className="logo">
              <img src={rrLogo} alt="" />
            </div>
          </div>
          <div className="step-guild">
            <LeaseSteps />
          </div>
          <div className="lease-zone">
            <LeaseTerm {...props} />
            <LeaseDeclaration {...props} />
            <TenantConv {...props} />
            <LandlordConv {...props} />
            <Agreements {...props} />
            <Signature {...props} />
          </div>
        </div>
        <div className="info">
          <div className="info-card">
            <div className="top">Awaiting Final Signature</div>
            <p>
              Tenant has signed lease. You have privilege to sign this lease on
              his behalf of the landlord. <br />
              <p /> Click the Sign This Lease button below to finalise the lease
              and have our system auto generate the rental payment schedule, or
              simply wait on the landlord to sign.
            </p>
            <Button>Sign Lease</Button>
          </div>
          <div className="chat-card"></div>
        </div>
      </div>
    </div>
  );
}

export default LeaseDefinition;
