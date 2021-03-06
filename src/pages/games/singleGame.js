import React, { useContext, useEffect, useState } from "react";
import "./games.css";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import { Tabs } from "../../components/tabs/tabs";
import Dashboard from "../dashboard/dashboard";
import GameTransactions from "./gameTransactions";
import InstanceConfig from "./instanceConfig";
import { axiosHandler } from "../../utils/axiosHandler";
import { GAME_INSTANCE_URL } from "../../utils/urls";
import { errorHandler, getClientId, getToken } from "../../utils/helper";
import { Notification } from "../../components/notification/Notification";
import AppIcon from "../../components/icons/Icon";
import { primaryColor, secondaryColor } from "../../utils/data";
import GameDraws from "./drawsInfo";
import { Toggle } from "../../components/toggle/Toggle";
import { Modal } from "../../components/modal/Modal";
import { Spinner } from "../../components/spinner/Spinner";

function Games(props) {
  const { dispatch } = useContext(store);
  const [activeInstance, setActiveInstance] = useState(null);
  const [gameLink, setGameLink] = useState("");
  const [fetching, setFetching] = useState(true);
  const [transactionLink, setTransactionLink] = useState("");
  const [prizesLink, setPrizesLink] = useState("");
  const [drawsLink, setDrawsLink] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch({
      type: setPageTitleAction,
      payload: props.match.params.label
    });
    setGameData();
  }, []);

  const setGameData = () => {
    axiosHandler({
      method: "get",
      url: GAME_INSTANCE_URL + `?id=${props.match.params.uuid}`,
      clientID: getClientId(),
      token: getToken()
    })
      .then(res => {
        const activeInstanceMain = res.data._embedded.gameInstances[0];
        setActiveInstance(activeInstanceMain);
        setGameLink(activeInstanceMain._links.game.href);
        setTransactionLink(activeInstanceMain._links.gameTransactions.href);
        setPrizesLink(activeInstanceMain._links.prizes.href);
        setDrawsLink(activeInstanceMain._links.draws.href);
        setFetching(false);
      })
      .catch(err => {
        Notification.bubble({
          type: "error",
          content: errorHandler(err, true)
        });
      });
  };

  const bodies = [
    <Dashboard {...props} />,
    <GameDraws
      {...props}
      gameLink={gameLink}
      activeInstance={activeInstance}
      prizesLink={prizesLink}
      fetching={fetching}
    />,
    <GameTransactions {...props} transactionLink={transactionLink} />,
    <InstanceConfig
      {...props}
      gameLink={gameLink}
      activeInstance={activeInstance}
      prizesLink={prizesLink}
      fetching={fetching}
    />
  ];

  const heading = [
    "Performance Report",
    "Draw Info",
    "GamePlays",
    "Configuration"
  ];

  const toggleGameInstance = () => {
    const title = activeInstance.isActive
      ? "Want to deactivate Game Instance?"
      : "Want to Activate Game Instance?";
    Modal.confirm({
      title,
      content: "Click on the Proceed button to complete your operation",
      okText: "Proceed",
      onOK: () => {
        setLoading(true);
        axiosHandler({
          method: "put",
          url: GAME_INSTANCE_URL + `/${activeInstance.id}`,
          clientID: getClientId(),
          token: getToken(),
          data: {
            ...activeInstance,
            isActive: !activeInstance.isActive
          }
        }).then(
          _ => {
            Notification.bubble({
              type: "success",
              content: "Operation Completed"
            });
            setActiveInstance({
              ...activeInstance,
              isActive: !activeInstance.isActive
            });
            setLoading(false);
          },
          err => {
            Notification.bubble({
              type: "error",
              content: errorHandler(err)
            });
          }
        );
      }
    });
  };

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
        {activeInstance && (
          <div className="flex align-center">
            <Toggle
              toggleStatus={activeInstance.isActive}
              onClick={toggleGameInstance}
              handleToggle={() => null}
            />
            &nbsp;
            {loading && <Spinner color={secondaryColor} size={9} />}
          </div>
        )}
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

export default Games;
