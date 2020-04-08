import React, { useContext, useEffect, useState } from "react";
import { store } from "../../stateManagement/store";
import { Button } from "../../components/button/Button";
import Slider from "../../components/slider/slider";
import NotificationDashboardCard from "../../components/notificationDashboardCard/NotificationDashboardCard";
import GetActivitySummary from "../../components/dashboardAxiosCall/GetActivitySummary";
import GetQuickView from "../../components/dashboardAxiosCall/GetQuickView";
import { PROFILE_STATUS_URL, NOTIFICATIONS_URL } from "../../utils/urls";
import { getToken } from "../../utils/helper";
import { Notification } from "../../components/notification/Notification";
import { axiosHandler } from "../../utils/axiosHandler";
import { Spinner } from "../../components/spinner/Spinner";
import { Link } from "react-router-dom";

import "./TenantDashboard.css";

const TenantDashboard = () => {
  const [profileStat, setProfileStat] = useState("");
  const [profileLoader, setProfileLoader] = useState(true);
  const [notificationLoader, setNotifcationLoader] = useState(true);
  const [userNotifications, setUserNotifications] = useState({});
  const {
    state: { userDetails }
  } = useContext(store);

  const getProfileStats = () => {
    if (userDetails.user) {
      axiosHandler(
        "GET",
        PROFILE_STATUS_URL + `/${userDetails.user.id}`,
        getToken()
      )
        .then(res => {
          setProfileStat(res.data.status);
          setProfileLoader(false);
        })
        .catch(err => {
          Notification.bubble({
            type: "error",
            content: "Error loading profile status"
          });
          setProfileLoader(false);
        });
    }
  };

  const getUserNotifications = () => {
    axiosHandler("GET", NOTIFICATIONS_URL, getToken())
      .then(res => {
        setUserNotifications(res.data.results.results);
        setNotifcationLoader(false);
      })
      .catch(err => {
        Notification.bubble({
          type: "error",
          content: "Unable to load user notifications"
        });
        setNotifcationLoader(false);
      });
  };

  const showNotifications = () => {
    if (userNotifications) {
      if (userNotifications.length == 0) {
        return <h4>No notifications at the moment</h4>;
      }
      return userNotifications.map(item => (
        <NotificationDashboardCard
          key={item.id}
          title={`${item.content.substring(0, 100)}...`}
          time={item.updated_at}
        />
      ));
    }
  };

  useEffect(() => {
    getProfileStats();
  }, [userDetails]);

  useEffect(() => {
    getUserNotifications();
  }, [userDetails]);

  return (
    <div>
      <div className="welcome-and-notifications flex">
        <div className="welcome-container">
          <div className="welcome-rectangle flex align-center">
            <div className="welcome-texts">
              <p>
                {profileLoader
                  ? ""
                  : `Welcome back ${userDetails.user.first_name}`}
              </p>
              <p>
                Continue setting up your profile and explore how users are
                checking them out.
              </p>
              <p>Also, if you need help, our chat box is always available</p>
            </div>
            <div className="profile-stat">
              <div className="stat-circle"></div>
              <div className="stat-info">
                <div className="counter">
                  {profileLoader ? <Spinner /> : `${profileStat}%`}
                </div>
                <Link to="/profile">
                  <Button>Complete Profile</Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="activity-summary-container">
            <p>Activity Summary</p>
            <Slider className="activity-summaries flex">
              <GetActivitySummary userRole="tenant" className="flex" />
            </Slider>
          </div>
        </div>
        <div className="notifications-container">
          <h4>Notifications</h4>
          <div className="notifications-and-show-more">
            <div className="notifications">
              {notificationLoader ? (
                <Spinner color="#000" />
              ) : (
                showNotifications()
              )}
              {/* {[1, 2, 3, 4, 5].map((_, key) => (
                <NotificationCard
                  title="You applied to Eko Atlantic"
                  time={`05-01-2020 ${" "} 03:15pm`}
                />
              ))} */}
            </div>
            <div className="show-more">
              <a className="">Show more</a>
            </div>
          </div>
        </div>
      </div>
      <div className="quick-views-container">
        <h4>Quick Views</h4>
        <div className="quick-views grid grid-3">
          <GetQuickView userRole="tenant" />
        </div>
      </div>
    </div>
  );
};

export default TenantDashboard;
