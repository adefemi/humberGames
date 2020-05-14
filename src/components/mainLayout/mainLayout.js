import React, { useContext, useEffect, useState } from "react";
import "./mainlayout.css";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";
import { Icon } from "../icons";
import {
  addClass,
  checkExpiration,
  getToken,
  hasClass,
  removeClass,
  updateExpiration
} from "../../utils/helper";
import { store } from "../../stateManagement/store";
import { clientID, secondaryColor, USERTOKEN } from "../../utils/data";
import { axiosHandler } from "../../utils/axiosHandler";
import { Spinner } from "../spinner/Spinner";
import { Notification } from "../notification/Notification";
import { CLIENT_FETCH_URL, USER_ME_URL } from "../../utils/urls";
import { setActiveClient, setUserDetails } from "../../stateManagement/actions";
import jwtDecode from "jwt-decode";

function MainLayout(props) {
  const {
    dispatch,
    state: { pageTitle }
  } = useContext(store);
  const [loading, setLoading] = useState(true);

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
    checkExpiration();
    updateExpiration();
  }, [pageTitle]);

  useEffect(() => {
    // check token
    if (!checkExpiration()) {
      Notification.bubble({
        type: "info",
        content: "You session has expired."
      });
      routeToLogin();
    }
    let token = localStorage.getItem(USERTOKEN);
    if (!token) {
      routeToLogin();
      return;
    }
    const decoded = jwtDecode(token);
    axiosHandler({
      method: "get",
      clientID: "default",
      token: getToken(),
      url: CLIENT_FETCH_URL + `?clientId=${decoded.auth.clientId}`
    }).then(res => {
      dispatch({ type: setUserDetails, payload: decoded.auth });
      dispatch({ type: setActiveClient, payload: res.data.data[0] });
      setLoading(false);
      props.history.push(props.location.pathname + `?${props.location.search}`);
    });
    // verify token
    //
  }, []);

  const routeToLogin = () => {
    localStorage.clear();
    props.history.push("/login");
  };

  if (loading) {
    return <Spinner size={15} color={secondaryColor} />;
  }

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
            {/*<div className="navRight">*/}
            {/*  <div className="notifier">*/}
            {/*    <NotificationDrop />*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
          <div className="children">
            {loading ? (
              <div>
                <br />
                <Spinner color={secondaryColor} size={15} />
              </div>
            ) : (
              props.children
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;

const SideLinks = ({ icon, title, link, active = false, logout }) => (
  <Link to={link}>
    <div
      className={`sideLink ${active ? "active" : ""} ${logout ? "logout" : ""}`}
    >
      <i className="icon-main">{icon}</i> {title}
    </div>
  </Link>
);

const getActive = val => {
  let ret = false;
  let pathArr = window.location.pathname.split("/");
  if (val === "/") {
    if (window.location.pathname === "/" || window.location.pathname === "") {
      return true;
    }
  }
  if (pathArr.includes(val)) {
    ret = true;
  }
  return ret;
};

const SideBar = () => {
  return (
    <div className="sideBar">
      <img src={logo} className="logo" alt="logo" />
      <div className="sideLinks">
        <SideLinks
          link={"/"}
          title="Games"
          active={getActive("/")}
          icon={<Icon name="controller" type="entypo" />}
        />
        <SideLinks
          link={"/rewards"}
          title="Rewards"
          active={getActive("rewards")}
          icon={<Icon name="award" type="feather" />}
        />
        <SideLinks
          link={"/campaigns"}
          title="Campaigns"
          active={getActive("campaigns")}
          icon={<Icon name="volume1" type="feather" />}
        />
        <SideLinks
          link={"/sandbox"}
          title="Sandbox"
          active={getActive("sandbox")}
          icon={<Icon name="branch" type="entypo" />}
        />
        <SideLinks
          link={"/users"}
          title="Users"
          active={getActive("users")}
          icon={<Icon name="ic_face" type="md" />}
        />
        <SideLinks
          link={"/settings"}
          title="Settings"
          active={getActive("settings")}
          icon={<Icon name="cog" type="entypo" />}
        />
        <SideLinks
          link={"/logout"}
          logout
          title="Logout"
          icon={<Icon name="out" type="entypo" />}
        />
      </div>
    </div>
  );
};
