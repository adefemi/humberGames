import React, { useEffect, useState } from "react";

function LeaseSteps(props) {
  const [active, setActive] = useState("leaseTerm");
  useEffect(() => {}, []);
  const changeView = id => {
    document.getElementById(id).scrollIntoView({
      behavior: "smooth"
    });
    setActive(id);
  };
  return (
    <div className="lease-step-con">
      <LeaseStepItem
        title="Lease Term"
        active={active === "leaseTerm"}
        onClick={() => changeView("leaseTerm")}
        content="Define/Update your lease term to suite up with discussion between you
          and the tenant"
      />

      {!props.create && (
        <>
          <LeaseStepItem
            active={active === "leaseTenant"}
            onClick={() => changeView("leaseTenant")}
            title="Tenant Convenant"
            content="Add rules and regulation the tenant should bound by"
          />
          <LeaseStepItem
            active={active === "leaseLandlord"}
            onClick={() => changeView("leaseLandlord")}
            title="Landlord Convenant"
            content="Add rules and regulation the landlord should bound by"
          />
          <LeaseStepItem
            active={active === "leaseAgree"}
            onClick={() => changeView("leaseAgree")}
            title="Agreement"
            content="Add rules and regulation that both party (landlord/tenant) should bound by"
          />
          <LeaseStepItem
            active={active === "leaseDecl"}
            onClick={() => changeView("leaseDecl")}
            title="Declaration"
            content="RentRight would help you make the right declaration based on the content on your lease"
          />
          <LeaseStepItem
            active={active === "leaseSig"}
            onClick={() => changeView("leaseSig")}
            title="Signature"
            content="Both party signs in agreement"
          />
        </>
      )}
    </div>
  );
}

const LeaseStepItem = props => {
  return (
    <div
      className={`lease-step-item ${props.active ? "active" : ""}`}
      onClick={() => {
        if (props.onClick) {
          props.onClick();
        }
      }}
    >
      <div className="title">{props.title}</div>
      <p>{props.content}</p>
    </div>
  );
};

export default LeaseSteps;
