import React, { useContext, useEffect } from "react";

import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import { Card } from "../../components/card/Card";
import NotificationCard from "./NotificationCard";

import "./Notifications.css";

const Notifications = () => {
  const { dispatch } = useContext(store);

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Notifications" });
  }, []);
  return (
    <div>
      <div className="today">
        <p>Today</p>
        <Card>
          <NotificationCard />
        </Card>
        <Card>
          <NotificationCard />
        </Card>
        <div className="yesterday">
          <p>Yesterday</p>
          <Card>
            <NotificationCard />
          </Card>
          <Card>
            <NotificationCard />
          </Card>
          <Card>
            <NotificationCard />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
