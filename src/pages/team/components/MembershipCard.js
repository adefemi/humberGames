import React from "react";
import AppIcon from "../../../components/icons/Icon";
import bgImg from "../../../assets/images/horticulturists.png";

export const MembershipCard = () => {
  return (
    <>
      <div className="member-status"></div>
      <div
        className="card-picture"
        style={{ background: `url(${bgImg})` }}
      ></div>
      <div className="card-picture-details">
        <p>Josh Spencer</p>
        <small>Manager</small>
        <span>
          <AppIcon className="edit" name="edit" type="fa" />
          <small>Edit</small>
        </span>
      </div>
      <div className="extra-details">
        <div>
          <p>Properties</p>
          <p>1342</p>
        </div>
        <div>
          <p>Deals Completed</p>
          <p>12</p>
        </div>
      </div>
      <div className="line"></div>
    </>
  );
};
