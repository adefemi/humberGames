import React from "react";
import "./profile.css";
import AppIcon from "../../components/icons/Icon";
import BasicProfile from "../../components/profile/BasicProfile";
import EmploymentProfile from "../../components/profile/EmploymentProfile";
import ImmigrationProfile from "../../components/profile/ImmigrationProfile";
import ResidenceProfile from "../../components/profile/ResidenceProfile";
function ProfileTemplate() {
  return (
    <div className="ProfileTemplate">
      <div className="flex">
        <div className="side-nav">
          <ul>
            <li className="active">
              <AppIcon name="user" type="feather" />
              <span className="menu-item">Basic Profile</span>
            </li>
            <li>
              <AppIcon name="briefcase" type="feather" />
              <span className="menu-item">Employment Information</span>
            </li>
            <li>
              <AppIcon name="globe" type="feather" />
              <span className="menu-item">Immigration Information</span>
            </li>
            <li>
              <AppIcon name="home" type="feather" />
              <span className="menu-item">Residence Information</span>
            </li>
          </ul>
        </div>
        <div className="main-content-wrapper">
          <div className="main-content">
            <ImmigrationProfile />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileTemplate;
