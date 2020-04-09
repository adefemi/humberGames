import React, { useContext, useEffect, useState } from "react";
import "./mainlayout.css";
import { Button } from "../button/Button";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";
import { Icon } from "../icons";
import { addClass, hasClass, removeClass } from "../../utils/helper";
import { store } from "../../stateManagement/store";
import { loginUrl, secondaryColor, USERTOKEN } from "../../utils/data";
import { axiosHandler } from "../../utils/axiosHandler";
import { GET_ACCESS_TOKEN, USER_ME, USER_ROLE } from "../../utils/urls";
import { Spinner } from "../spinner/Spinner";
import qs from "query-string";
import { setRoles, setUserDetails } from "../../stateManagement/actions";
import NotificationDrop from "../notificationDrop/notificationDrop";

function MainLayout(props) {
  const { dispatch } = useContext(store);
  const {
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
  }, [pageTitle]);

  useEffect(() => {
    // check token
    let token = localStorage.getItem(USERTOKEN);
    if (token) {
      setLoading(false);
    } else {
      props.history.push("/login");
    }
    // verify token
    // if (token) {
    //   axiosHandler("get", USER_ME, token.access).then(
    //     res => {
    //       setLoading(false);
    //       setUpUserCookie(res.data);
    //       const query = qs.parse(props.location.search);
    //       if (query.refresh) {
    //         delete query.refresh;
    //         let newQuery = qs.stringify(query);
    //         props.history.push(props.location.pathname + `?${newQuery}`);
    //       }
    //     },
    //     _ => {
    //       handleRefresh("logout");
    //     }
    //   );
    // } else {
    //   handleRefresh("logout");
    // }
  }, [props]);

  const setUpUserCookie = user_data => {
    dispatch({ type: setUserDetails, payload: user_data });
    axiosHandler("get", USER_ROLE).then(res => {
      dispatch({ type: setRoles, payload: res.data.results });
    });
  };

  const handleRefresh = status => {
    const query = qs.parse(props.location.search);
    if (query.refresh) {
      axiosHandler("post", GET_ACCESS_TOKEN, null, {
        refresh: query.refresh
      }).then(
        res => {
          localStorage.setItem(
            USERTOKEN,
            JSON.stringify({ access: res.data.access, refresh: query.refresh })
          );
          delete query.refresh;
          let newQuery = qs.stringify(query);
          props.history.push(props.location.pathname + `?${newQuery}`);
        },
        _ => {
          routeToLogin(status);
        }
      );
    } else {
      routeToLogin(status);
    }
  };

  const routeToLogin = status => {
    let logout = status === "logout" ? "&notactive=true" : "";
    localStorage.clear();
    // clear cookie
    window.location.href =
      loginUrl + `?redirect=${props.location.pathname}${logout}`;
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
            <div className="navRight">
              <div className="notifier">
                <NotificationDrop />
              </div>
            </div>
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
          title="Performance Reports"
          active={getActive("/")}
          icon={<Icon name="blackboard" type="entypo" />}
        />
        <SideLinks
          link={"/games"}
          title="Games"
          active={getActive("games")}
          icon={<Icon name="controller" type="entypo" />}
        />
        <SideLinks
          link={"/sandbox"}
          title="Sandbox"
          active={getActive("sandbox")}
          icon={<Icon name="branch" type="entypo" />}
        />
        <SideLinks
          link={"settings"}
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
