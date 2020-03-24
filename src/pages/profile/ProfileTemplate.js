import React, { useContext, useEffect, useState } from "react";
import "./profile.css";
import AppIcon from "../../components/icons/Icon";
import BasicProfile from "../../components/profile/BasicProfile";
import EmploymentProfile from "../../components/profile/EmploymentProfile";
import ImmigrationProfile from "../../components/profile/ImmigrationProfile";
import ResidenceProfile from "../../components/profile/ResidenceProfile";
import { Link } from "react-router-dom";
import BasicInfo from "../../components/profile/BasicInfo";
import Settings from "../../components/profile/Settings";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import { Notification } from "../../components/notification/Notification";

function ProfileTemplate(props) {
  const [active] = useState(props.active);
  const { dispatch } = useContext(store);
  const [userUUID, setUserUUID] = useState(null);

  useEffect(() => {
    if (props.preview) {
      setUserUUID(props.match.params.uuid);
    }
    dispatch({ type: setPageTitleAction, payload: "User Information" });
  }, []);

  const getUserId = () => {
    if (!props.preview) return null;
    try {
      let uuidList = props.match.params.uuid.toString().split("_");
      return uuidList[uuidList.length - 1];
    } catch (e) {
      Notification.bubble({
        type: "error",
        content: "Got an issue while trying to get user info"
      });
      props.push("/");
    }
  };

  return (
    <div className="ProfileTemplate">
      <div className="flex">
        <div className="side-nav">
          <ul>
            <Link to={`${userUUID ? "/user/" + userUUID : "/profile"}`}>
              <li className={active === 0 ? "active" : ""}>
                <AppIcon name="user" type="feather" />
                <span className="menu-item">Profile</span>
              </li>
            </Link>
            <Link
              to={`${
                userUUID ? `/user/${userUUID}/basic` : "/profile/basic-info"
              }`}
            >
              <li className={active === 1 ? "active" : ""}>
                <AppIcon name="user" type="feather" />
                <span className="menu-item">Basic Information</span>
              </li>
            </Link>
            <Link
              to={`${
                userUUID
                  ? `/user/${userUUID}/employment`
                  : "/profile/employment"
              }`}
            >
              <li className={active === 2 ? "active" : ""}>
                <AppIcon name="briefcase" type="feather" />
                <span className="menu-item">Employment Information</span>
              </li>
            </Link>
            <Link
              to={`${
                userUUID
                  ? `/user/${userUUID}/immigration`
                  : "/profile/immigration"
              }`}
            >
              <li className={active === 3 ? "active" : ""}>
                <AppIcon name="globe" type="feather" />
                <span className="menu-item">Immigration Information</span>
              </li>
            </Link>
            <Link
              to={`${
                userUUID ? `/user/${userUUID}/resident` : "/profile/resident"
              }`}
            >
              <li className={active === 4 ? "active" : ""}>
                <AppIcon name="home" type="feather" />
                <span className="menu-item">Residence Information</span>
              </li>
            </Link>
            {!props.preview && (
              <Link to="/profile/settings">
                <li className={active === 5 ? "active" : ""}>
                  <AppIcon name="settings" type="feather" />
                  <span className="menu-item">Settings</span>
                </li>
              </Link>
            )}
          </ul>
        </div>
        <div className="main-content-wrapper">
          <div className="main-content">
            {active === 0 && <BasicProfile {...props} userId={getUserId()} />}
            {active === 1 && <BasicInfo {...props} userId={getUserId()} />}
            {active === 2 && (
              <EmploymentProfile {...props} userId={getUserId()} />
            )}
            {active === 3 && (
              <ImmigrationProfile {...props} userId={getUserId()} />
            )}
            {active === 4 && (
              <ResidenceProfile {...props} userId={getUserId()} />
            )}
            {active === 5 && <Settings {...props} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileTemplate;
