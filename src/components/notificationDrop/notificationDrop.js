import React, { useEffect, useState } from "react";
import "./notificationDrop.css";
import AppIcon from "../icons/Icon";
import Badge from "../Badge/badge";

function NotificationDrop(props) {
  const [showNotification, setShowNotification] = useState(false);
  useEffect(() => {
    positionOptionDrop();
    document
      .getElementById("mainBar")
      .addEventListener("scroll", positionOptionDrop);
    window.addEventListener("resize", positionOptionDrop);
  }, [showNotification]);

  const positionOptionDrop = () => {
    if (!showNotification) return;
    const bell = document.getElementById("navNotify");
    const notifyCon = document.getElementById("notification-con");
    if (!bell || !notifyCon) return;

    notifyCon.style.left = `${bell.getBoundingClientRect().left -
      notifyCon.getBoundingClientRect().width / 2}px`;

    notifyCon.style.top = `${bell.getBoundingClientRect().top +
      bell.getBoundingClientRect().height +
      10}px`;
  };

  return (
    <div className="notification-drop">
      <span
        id="navNotify"
        onClick={() => setShowNotification(!showNotification)}
      >
        <Badge count={2}>
          <AppIcon name="bell" type="entypo" />
        </Badge>{" "}
      </span>
      {showNotification && (
        <div className="notification-con">
          <div
            className="overlay"
            onClick={() => setShowNotification(!showNotification)}
          />
          <div id="notification-con" className="not-content">
            <li>
              <div className="info">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                atque autem est ipsa laudantium omnis provident quis ratione
                recusandae saepe? Perspiciatis porro quo...
              </div>
              <div className="time">3 hours ago</div>
            </li>
            <li>
              <div className="info">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                atque autem est ipsa laudantium omnis provident quis ratione
                recusandae saepe? Perspiciatis porro quo...
              </div>
              <div className="time">3 hours ago</div>
            </li>
            <li>
              <div className="info">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                atque autem est ipsa laudantium omnis provident quis ratione
                recusandae saepe? Perspiciatis porro quo...
              </div>
              <div className="time">3 hours ago</div>
            </li>
            <li>
              <div className="info">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                atque autem est ipsa laudantium omnis provident quis ratione
                recusandae saepe? Perspiciatis porro quo...
              </div>
              <div className="time">3 hours ago</div>
            </li>
            <li>
              <div className="info">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                atque autem est ipsa laudantium omnis provident quis ratione
                recusandae saepe? Perspiciatis porro quo...
              </div>
              <div className="time">3 hours ago</div>
            </li>
            <li>
              <div className="info">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                atque autem est ipsa laudantium omnis provident quis ratione
                recusandae saepe? Perspiciatis porro quo...
              </div>
              <div className="time">3 hours ago</div>
            </li>
            <li>
              <div className="info">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                atque autem est ipsa laudantium omnis provident quis ratione
                recusandae saepe? Perspiciatis porro quo...
              </div>
              <div className="time">3 hours ago</div>
            </li>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationDrop;
