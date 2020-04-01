import React, { useContext, useEffect, useState } from "react";
import moment from "moment";

import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import { Card } from "../../components/card/Card";
import NotificationCard from "./NotificationCard";
import _ from "lodash";
import { axiosHandler } from "../../utils/axiosHandler";
import { NOTIFICATIONS_URL } from "../../utils/urls";
import { getToken } from "../../utils/helper";
import { Notification } from "../../components/notification/Notification";
import { Spinner } from "../../components/spinner/Spinner";

import "./Notifications.css";

const Notifications = () => {
  const { dispatch } = useContext(store);
  const [loader, setLoader] = useState(true);
  const [notifications, setNotifications] = useState({});

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Notifications" });
    getNotifications();
  }, []);

  const today = moment().format("DD-MM-YYYY");
  const yesterday = moment()
    .subtract(1, "days")
    .calendar();

  const getNotifications = () => {
    axiosHandler("GET", NOTIFICATIONS_URL, getToken())
      .then(res => {
        setNotifications(res.data.results.results);
        setLoader(false);
      })
      .catch(err => {
        Notification.bubble({
          type: "error",
          content: "Unable to load notifications"
        });
        setLoader(false);
      });
  };

  var noteDate;

  const allNotifications = () => {
    if (notifications) {
      if (notifications.length == 0) {
        return <h4>No notifications at the moment</h4>;
      }
      return notifications.map(item => (
        // noteDate = item.updated_at;
        <Card key={item.id} className="single-notification">
          <NotificationCard item={item} />
        </Card>
      ));
    }
  };

  if (noteDate !== undefined) {
    noteDate = moment(noteDate).format("DD-MM-YYYY");
  }

  const todayNotifications = () => {
    if (today == noteDate) {
      return <h4>These are today's notifications</h4>;
    }
    // return <p>No notifications today</p>;
  };

  const yesterdayNotifications = () => {
    if (yesterday == noteDate) {
      return <h4>These are yesterday's notifications</h4>;
    }
    // return <p>No notification was received yesterday</p>;
  };

  return (
    <div>
      {/* <div className="today"> */}
      {/* <h4>Today</h4> */}
      {todayNotifications()}
      {/* </div> */}
      {/* <div className="yesterday"> */}
      {/* <h4>Yesterday</h4> */}
      {yesterdayNotifications()}
      {/* </div> */}
      <div className="later">
        <h4>Older</h4>
        {loader ? <Spinner color="#000" /> : allNotifications()}
      </div>
    </div>
  );
};

export default Notifications;
