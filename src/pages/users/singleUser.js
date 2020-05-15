import React, { useContext, useEffect, useState } from "react";
import { setPageTitleAction } from "../../stateManagement/actions";
import { axiosHandler } from "../../utils/axiosHandler";
import { USER_FETCH_URL } from "../../utils/urls";
import { errorHandler, getClientId, getToken } from "../../utils/helper";
import { Notification } from "../../components/notification/Notification";
import { store } from "../../stateManagement/store";
import { Spinner } from "../../components/spinner/Spinner";
import { secondaryColor } from "../../utils/data";
import { Card } from "../../components/card/Card";
import moment from "moment";
import "./users.css";
import Divider from "../../components/Divider/divider";
import AppIcon from "../../components/icons/Icon";
import GameTransactions from "../games/gameTransactions";

function SingleUser(props) {
  const { dispatch } = useContext(store);
  const [fetching, setFetching] = useState(true);
  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Single User" });
    getClients();
  }, []);

  const getClients = () => {
    axiosHandler({
      method: "get",
      url: USER_FETCH_URL + `/${props.match.params.uuid}`,
      token: getToken(),
      clientID: getClientId()
    }).then(
      res => {
        console.log(res.data.data);
        setActiveUser(res.data.data);
        setFetching(false);
      },
      err => {
        Notification.bubble({
          type: "error",
          content: errorHandler(err)
        });
      }
    );
  };

  const getUserMeta = metas => {
    const results = [];
    for (let meta in metas) {
      if (metas.hasOwnProperty(meta)) {
        results.push(
          <div>
            <div className="info">{meta}</div>{" "}
            <div className="content">{metas[meta] || "Not Defined"}</div>
          </div>
        );
      }
    }
    return results;
  };

  if (fetching) {
    return <Spinner color={secondaryColor} />;
  }

  return (
    <>
      <div className="flex align-center">
        <span onClick={() => props.history.goBack()} className="link">
          <AppIcon name="arrowLeft" type="feather" />{" "}
        </span>
      </div>
      <br />
      <Card className="padding-20">
        <div className="grid grid-2 grid-gap-2">
          <div>
            <div className="info">UserId</div>{" "}
            <div className="content">{activeUser.userId}</div>
          </div>
          <div>
            <div className="info">Phone Number</div>{" "}
            <div className="content">{activeUser.phoneNumber}</div>
          </div>
          <div>
            <div className="info">Created At</div>{" "}
            <div className="content">
              {moment(new Date(activeUser.createdAt)).fromNow()}
            </div>
          </div>

          {activeUser.profile.name && (
            <div>
              <div className="info">Name</div>{" "}
              <div className="content">{activeUser.profile.name}</div>
            </div>
          )}
        </div>
        {activeUser.profile && activeUser.profile.meta && (
          <div>
            <br />
            <h3>User Meta</h3>
            <Divider />
            <div className="grid grid-2 grid-gap-2">
              {getUserMeta(activeUser.profile.meta)}
            </div>
          </div>
        )}
      </Card>
      <br />
      <h3>User Transactions</h3>
      <br />
      <GameTransactions {...props} user />
      <br />
      <br />
    </>
  );
}

export default SingleUser;
