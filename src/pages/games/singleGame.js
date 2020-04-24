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
import { primaryColor } from "../../utils/data";

function Games(props) {
  const { dispatch } = useContext(store);
  const [activeInstance, setActiveInstance] = useState(null);
  const [gameLink, setGameLink] = useState("");
  const [fetching, setFetching] = useState(true);
  const [transactionLink, setTransactionLink] = useState("");
  const [prizesLink, setPrizesLink] = useState("");
  const [drawsLink, setDrawsLink] = useState("");

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
    <Dashboard />,
    <GameTransactions transactionLink={transactionLink} />,
    <InstanceConfig
      gameLink={gameLink}
      activeInstance={activeInstance}
      prizesLink={prizesLink}
      fetching={fetching}
    />
  ];

  const heading = ["Performance Report", "GamePlays", "Configuration"];

  return (
    <div className="singleGames">
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

      <Tabs heading={heading} body={bodies} />
    </div>
  );
}

export default Games;
