import React from "react";

function LeaseSteps(props) {
  return (
    <div className="lease-step-con">
      <LeaseStepItem
        title="Lease Term"
        active={true}
        content="Define/Update your lease term to suite up with discussion between you
          and the tenant"
      />
      <LeaseStepItem
        title="Declaration"
        content="RentRight would help you make the right declaration based on the content on your lease"
      />
      <LeaseStepItem
        title="Tenant Convenant"
        content="Add rules and regulation the tenant should bound by"
      />
      <LeaseStepItem
        title="Landlord Convenant"
        content="Add rules and regulation the landlord should bound by"
      />
      <LeaseStepItem
        title="Agreement"
        content="Add rules and regulation that both party (landlord/tenant) should bound by"
      />
      <LeaseStepItem
        title="Signature"
        content="Both party signs in agreement"
      />
    </div>
  );
}

const LeaseStepItem = props => {
  return (
    <div className={`lease-step-item ${props.active ? "active" : ""}`}>
      <div className="title">{props.title}</div>
      <p>{props.content}</p>
    </div>
  );
};

export default LeaseSteps;
