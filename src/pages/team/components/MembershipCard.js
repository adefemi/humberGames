import React from "react";
import AppIcon from "../../../components/icons/Icon";
import noImage from "../../../assets/images/no-image.jpg";
import _ from "lodash";

export const MembershipCard = ({ team }) => {
  return (
    <>
      <div className="member-status" />
      <div
        className="card-picture"
        style={{
          background: `url(${_.get(
            team,
            "user.user_profile.profile_picture.file",
            noImage
          )})`
        }}
      />
      <div className="card-picture-details">
        <p>{`${team.user.first_name} ${team.user.last_name}`}</p>
        <small>{team.role}</small>
        <span>
          <AppIcon className="edit" name="edit" type="fa" />
          <small>Edit</small>
        </span>
      </div>
      <div className="extra-details">
        <div>
          <p>Properties</p>
          <p>{team.user.meta.total_properties}</p>
        </div>
        <div>
          <p>Deals Completed</p>
          <p>{team.user.meta.total_deals}</p>
        </div>
      </div>
      <div className="divider" />
    </>
  );
};
