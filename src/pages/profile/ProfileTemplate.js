import React, { useState } from "react";
import "./profile.css";
import AppIcon from "../../components/icons/Icon";
import BasicProfile from "../../components/profile/BasicProfile";
import EmploymentProfile from "../../components/profile/EmploymentProfile";
import ImmigrationProfile from "../../components/profile/ImmigrationProfile";
import ResidenceProfile from "../../components/profile/ResidenceProfile";
import { Link } from "react-router-dom";
import BasicInfo from "../../components/profile/BasicInfo";
import Settings from "../../components/profile/Settings";
function ProfileTemplate(props) {
  const [active] = useState(props.active);
  return (
    <div className="ProfileTemplate">
      <div className="flex">
        <div className="side-nav">
          <ul>
            <Link to="/profile">
              <li className={active === 0 ? "active" : ""}>
                <AppIcon name="user" type="feather" />
                <span className="menu-item">Profile</span>
              </li>
            </Link>
            <Link to="/profile/basic-info">
              <li className={active === 1 ? "active" : ""}>
                <AppIcon name="user" type="feather" />
                <span className="menu-item">Basic Information</span>
              </li>
            </Link>
            <Link to="/profile/employment">
              <li className={active === 2 ? "active" : ""}>
                <AppIcon name="briefcase" type="feather" />
                <span className="menu-item">Employment Information</span>
              </li>
            </Link>
            <Link to="/profile/immigration">
              <li className={active === 3 ? "active" : ""}>
                <AppIcon name="globe" type="feather" />
                <span className="menu-item">Immigration Information</span>
              </li>
            </Link>
            <Link to="/profile/resident">
              <li className={active === 4 ? "active" : ""}>
                <AppIcon name="home" type="feather" />
                <span className="menu-item">Residence Information</span>
              </li>
            </Link>
            <Link to="/profile/settings">
              <li className={active === 5 ? "active" : ""}>
                <AppIcon name="settings" type="feather" />
                <span className="menu-item">Settings</span>
              </li>
            </Link>
          </ul>
        </div>
        <div className="main-content-wrapper">
          <div className="main-content">
            {active === 0 && <BasicProfile {...props} />}
            {active === 1 && <BasicInfo {...props} />}
            {active === 2 && <EmploymentProfile {...props} />}
            {active === 3 && <ImmigrationProfile {...props} />}
            {active === 4 && <ResidenceProfile {...props} />}
            {active === 5 && <Settings {...props} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileTemplate;
