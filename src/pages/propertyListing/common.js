import React from "react";

export const ListingSteps = ({ title, content, active, icon }) => {
  return (
    <div className={`tracker-item ${active ? "active" : ""}`}>
      <div className="img-con">
        <img src={icon} alt="title" />
      </div>
      <div className="context">
        <h4>{title}</h4>
        <p>{content}</p>
      </div>
    </div>
  );
};

export const InformationBanner = ({ title, content, icon }) => {
  return (
    <section className="heading-context">
      <img src={icon} alt="garden" />
      <div className="context">
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
    </section>
  );
};
