import React, { useContext, useEffect, useState } from "react";
import "./games.css";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import { Tabs } from "../../components/tabs/tabs";
import Dashboard from "../dashboard/dashboard";
import GameTransactions from "./gameTransactions";
import InstanceConfig from "./instanceConfig";
import AppIcon from "../../components/icons/Icon";
import { primaryColor, secondaryColor } from "../../utils/data";
import { Card } from "../../components/card/Card";
import { axiosHandler } from "../../utils/axiosHandler";
import { GAME_BUNDLE_URL } from "../../utils/urls";
import {
  errorHandler,
  getClientId,
  getToken,
  numberWithCommas
} from "../../utils/helper";
import { Notification } from "../../components/notification/Notification";
import { Spinner } from "../../components/spinner/Spinner";
import { Link } from "react-router-dom";

function SingleBundle(props) {
  const { dispatch } = useContext(store);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    dispatch({
      type: setPageTitleAction,
      payload: props.match.params.label
    });
  }, []);

  const bodies = [
    <Dashboard {...props} bundle />,
    <GameTransactions {...props} bundle />,
    <BundleInfo {...props} />
  ];

  const heading = ["Performance Report", "GamePlays", "Configuration"];

  return (
    <div className="singleGames">
      <div className="flex align-center justify-between">
        <div className="flex align-center">
          <div onClick={() => props.history.goBack()}>
            <AppIcon
              name="arrowLeft"
              type="icomoon"
              style={{ color: primaryColor, cursor: "pointer" }}
            />
          </div>
          &nbsp; &nbsp; &nbsp; &nbsp;
          <h4>Back</h4>
        </div>
      </div>

      <Tabs
        heading={heading}
        body={bodies}
        activeIndex={activeTab}
        onSwitch={setActiveTab}
      />
      <br />
      <br />
    </div>
  );
}

const BundleInfo = props => {
  const [activeBundle, setActiveBundle] = useState(0);
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    axiosHandler({
      method: "get",
      url: GAME_BUNDLE_URL + `/${props.match.params.uuid}`,
      token: getToken(),
      clientID: getClientId()
    }).then(
      res => {
        setActiveBundle(res.data);
        setFetching(false);
      },
      err => {
        Notification.bubble({
          type: "error",
          content: errorHandler(err)
        });
      }
    );
  }, []);
  return (
    <Card
      heading={
        <div className="flex align-center justify-between">
          Bundle Info{" "}
          <span
            className="link"
            onClick={() =>
              props.history.push(
                `/game-bundles/edit/${props.match.params.uuid}`
              )
            }
          >
            Update bundle
          </span>
        </div>
      }
    >
      {fetching ? (
        <div className="padding-20">
          <Spinner color={secondaryColor} />
        </div>
      ) : (
        <div className="padding-20">
          <div className="grid grid-2 grid-gap-2">
            <div>
              <div className="info">Label</div>
              <div className="context">{activeBundle.label}</div>
            </div>
            <div>
              <div className="info">Amount</div>
              <div className="context">
                N{numberWithCommas(activeBundle.amount)}
              </div>
            </div>
            <div>
              <div className="info">Client ID</div>
              <div className="context">{activeBundle.clientId}</div>
            </div>
            <div>
              <div className="info">User ID</div>
              <div className="context">{activeBundle.userId}</div>
            </div>
          </div>
          <br />
          {activeBundle.desccription && (
            <div>
              <div className="info">Description</div>
              <div className="context">{activeBundle.desccription}</div>
            </div>
          )}
          <br />
          <h3>Game Instances</h3>
          <ul>
            {activeBundle.gameInstanceIds.map((item, key) => (
              <li key={key}>
                {" "}
                <Link to={`/instance/${item}/${props.match.params.label}`}>
                  {item}
                </Link>{" "}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
};

export default SingleBundle;
