import React, { useContext, useEffect, useReducer, useState } from "react";
import "./mainlayout.css";
import { Button } from "../button/Button";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import { Icon } from "../icons";
import { addClass, hasClass, removeClass } from "../../utils/helper";
import { store } from "../../stateManagement/store";

function MainLayout(props) {
  const {
    state: { pageTitle }
  } = useContext(store);

  const toggleSlider = () => {
    const el = document.getElementById("sideBar");
    if (hasClass(el, "closed")) {
      removeClass(el, "closed");
    } else {
      addClass(el, "closed");
    }
  };

  const [title, setTitle] = useState(pageTitle);

  useEffect(() => {
    setTitle(pageTitle);
  }, [pageTitle]);

  return (
    <div className="mainLayout">
      <div className="desktop">
        <SideBar />
      </div>
      <div id="sideBar" className="mobile closed">
        <SideBar />
      </div>
      <div id="mainBar" className="mainBar">
        <div className="overlay mobile" onClick={toggleSlider} />
        <div className="contentMain">
          <div className="navBar">
            <div>
              <div className="flex align-center mobile navLeft">
                <Icon
                  name="ic_more_vert"
                  type="md"
                  size={20}
                  className="moreSide"
                  onClick={toggleSlider}
                />
                <img src={logo} className="mobile navLogo" alt="logo" />
              </div>
              <div className="pageTitle desktop">{title}</div>
            </div>
            <div className="navRight">
              <Link to="/add-property" className="navItem">
                <Button>Post Property</Button>
              </Link>
              <div className="navItem">user-profile</div>
            </div>
          </div>
          <div className="children">{props.children}</div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;

const SideLinks = ({ icon, title, link, active = false }) => (
  <Link to={link}>
    <div className={`sideLink ${active ? "active" : ""}`}>
      <i className="icon-main">{icon}</i> {title}
    </div>
  </Link>
);

const SideBar = () => {
  return (
    <div className="sideBar">
      <img src={logo} className="logo" alt="logo" />
      <div className="sideLinks">
        <SideLinks
          link={"/"}
          title="Dashboard"
          active
          icon={<Icon name="creditCard" type="feather" />}
        />
        <SideLinks
          link={"/properties"}
          title="Properties"
          icon={<Icon name="folder" type="feather" />}
        />
        <SideLinks
          link={"/applications"}
          title="Applications"
          icon={<Icon name="packageIcon" type="feather" />}
        />
        <SideLinks
          link={"/transactions"}
          title="Transactions"
          icon={<Icon name="barChart" type="feather" />}
        />
        <SideLinks
          link={"/inspections"}
          title="Inspections"
          icon={<Icon name="eye" type="feather" />}
        />
        <SideLinks
          link={"/notifications"}
          title="Notifications"
          icon={<Icon name="bell" type="feather" />}
        />
        <SideLinks
          link={"/agencies"}
          title="Agencies"
          icon={<Icon name="user" type="feather" />}
        />
      </div>
    </div>
  );
};
