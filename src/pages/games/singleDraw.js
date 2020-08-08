import React, { useContext, useEffect, useState } from "react";
import { setPageTitleAction } from "../../stateManagement/actions";
import { store } from "../../stateManagement/store";
import { axiosHandler } from "../../utils/axiosHandler";
import { errorHandler, getClientId, getToken } from "../../utils/helper";
import {
  ANALYTICS_KPI_URL,
  DRAW_EXECUTE_DRAW_URL,
  DRAW_EXECUTE_QUALIFY_URL,
  DRAWS_URL,
  GAME_TRANSACTION_URL
} from "../../utils/urls";
import { Notification } from "../../components/notification/Notification";
import { Spinner } from "../../components/spinner/Spinner";
import { primaryColor, secondaryColor, statusMode } from "../../utils/data";
import { Tabs } from "../../components/tabs/tabs";
import Badge from "../../components/Badge/badge";
import moment from "moment";
import Input from "../../components/input/Input";
import AppIcon from "../../components/icons/Icon";
import { Select } from "../../components/select/Select";
import TransactionTable from "../../components/transactionTable/transactionTable";
import Pagination from "../../components/Pagination/pagination";
import ContentModal from "../../components/contentModal/contentModal";
import GameTransactions, { TransactionDetails } from "./gameTransactions";
import { Card } from "../../components/card/Card";
import { Button } from "../../components/button/Button";
import { Modal } from "../../components/modal/Modal";
import { tomorrow } from "../dashboard/dashboard";

function SingleDraw(props) {
  const {
    dispatch,
    state: { userDetails }
  } = useContext(store);
  const [activeDraw, setActiveDraw] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [fetching, setFetching] = useState(true);
  const [activeGameInstance, setActiveGameInstance] = useState(null);
  const [dateData, setDateData] = useState({
    startDate: moment(new Date()).format("YYYY-MM-DD"),
    endDate: moment(tomorrow).format("YYYY-MM-DD")
  });
  useEffect(() => {
    dispatch({
      type: setPageTitleAction,
      payload: `${props.match.params.label} - Draw`
    });
    getActiveDraw();
    drawInfo();
  }, []);

  const drawInfo = () => {
    axiosHandler({
      method: "post",
      url: GAME_TRANSACTION_URL + `?draw=${props.match.params.uuid}`,
      clientID: getClientId(),
      token: getToken(),
      data: {
        startDate: `${dateData.startDate} 00:00:00`,
        endDate: `${dateData.endDate} 00:00:00`
      }
    });
  };

  const getActiveDraw = () => {
    axiosHandler({
      method: "get",
      clientID: getClientId(),
      token: getToken(),
      url: DRAWS_URL + `?id=${props.match.params.uuid}`
    }).then(
      res => {
        const activeDraw = res.data._embedded.draws[0];
        setActiveDraw(activeDraw);
        if (activeDraw) {
          axiosHandler({
            method: "get",
            clientID: getClientId(),
            token: getToken(),
            url: activeDraw._links.gameInstance.href
          }).then(
            gameInstance => {
              setActiveGameInstance(gameInstance.data);
              setFetching(false);
            },
            err => {
              Notification.bubble({
                type: "error",
                content: errorHandler(err)
              });
            }
          );
        } else {
          Notification.bubble({
            type: "error",
            content: "Not Found!"
          });
        }
      },
      err => {
        Notification.bubble({
          type: "error",
          content: errorHandler(err)
        });
      }
    );
  };

  if (fetching) {
    return <Spinner color={secondaryColor} />;
  }

  const heading = ["Overview", "Operations"];

  const body = [
    <GameTransactions {...props} draw />,
    <DrawOperations
      activeInstance={activeGameInstance}
      activeDraw={activeDraw}
      userDetails={userDetails}
    />
  ];

  return (
    <div>
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
      <Tabs
        activeIndex={activeTab}
        onSwitch={setActiveTab}
        body={body}
        heading={heading}
      />
    </div>
  );
}

const DrawOperations = props => {
  const [rewards, setRewards] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(null);

  const getDrawButton = () => {
    const currentTime = moment(new Date()).unix();
    const drawTime = props.activeDraw.drawTime;

    let drawEndTime =
      moment(new Date(props.activeDraw.endTime)).unix() +
      props.activeInstance.gameConfig.delayToDrawInMins * 60;

    if (!drawTime && currentTime > drawEndTime) {
      return (
        <Button
          onClick={() =>
            Modal.confirm({
              title: "Confirmation to execute operation!",
              content: "Click proceed to continue with this operation",
              okText: "Proceed",
              onOK: () => {
                executeDraw(
                  {
                    drawId: props.activeDraw.id,
                    actorId: props.userDetails.userId
                  },
                  "draw"
                );
              }
            })
          }
          disabled={loading === "draw"}
          loading={loading === "draw"}
        >
          Run Draw
        </Button>
      );
    } else {
      return <Button disabled>Run Draw</Button>;
    }
  };

  const getQualifyButton = reward => {
    const currentTime = moment(new Date()).unix();
    const drawTime = props.activeDraw.drawTime;
    let cutoffTimeInMins = reward.cutOffTimeInMins;
    let drawEndTime = new Date(props.activeDraw.endTime);
    drawEndTime = drawEndTime.setMinutes(
      drawEndTime.getMinutes() +
        props.activeInstance.gameConfig.delayToDrawInMins -
        cutoffTimeInMins
    );

    drawEndTime = moment(drawEndTime).unix();
    if (!drawTime && currentTime > drawEndTime) {
      return (
        <Button
          onClick={() =>
            Modal.confirm({
              title: "Confirmation to execute operation!",
              content: "Click proceed to continue with this operation",
              okText: "Proceed",
              onOK: () => {
                executeDraw(
                  {
                    drawId: props.activeDraw.id,
                    actorId: props.userDetails.userId,
                    rewardId: reward.id
                  },
                  "qualify"
                );
              }
            })
          }
          disabled={loading === "qualify"}
          loading={loading === "qualify"}
        >
          Qualify
        </Button>
      );
    } else {
      return <Button disabled>Qualify</Button>;
    }
  };

  const executeDraw = (data, type) => {
    setLoading(type);
    axiosHandler({
      method: "post",
      clientID: getClientId(),
      token: getToken(),
      url: type === "draw" ? DRAW_EXECUTE_DRAW_URL : DRAW_EXECUTE_QUALIFY_URL,
      data
    }).then(
      res => {
        Notification.bubble({
          type: "success",
          content: res.data
        });
        setLoading(null);
      },
      err => {
        Notification.bubble({
          type: "error",
          content: errorHandler(err)
        });
        setLoading(null);
      }
    );
  };

  useEffect(() => {
    axiosHandler({
      method: "get",
      clientID: getClientId(),
      token: getToken(),
      url: props.activeInstance._links.rewards.href
    }).then(
      res => {
        setRewards(res.data._embedded.rewards);
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
    <div>
      <div className="flex align-center justify-end">
        <Button color="success">Export Draw</Button>
      </div>
      <br />
      <Card heading="Qualification">
        <div className="padding-20 ">
          {fetching ? (
            <Spinner color={secondaryColor} />
          ) : (
            rewards.map((item, key) => {
              return (
                <div className="grid grid-2 grid-gap-2" key={key}>
                  <div className="context">{item.title}</div>
                  <div>{getQualifyButton(item)}</div>
                </div>
              );
            })
          )}
        </div>
      </Card>
      <br />
      <Card
        heading={
          <div className="flex align-center justify-between">
            Draw
            {getDrawButton()}
          </div>
        }
      >
        <div className="padding-20 grid grid-2 grid-gap-2">
          <div>
            <div className="info">Start Time</div>
            <div className="context">
              {!props.activeDraw.startTime
                ? "Not Define"
                : moment(props.activeDraw.startTime).format(
                    "YYYY-MM-DD HH-mm a"
                  )}
            </div>
          </div>
          <div>
            <div className="info">End Time</div>
            <div className="context">
              {!props.activeDraw.endTime
                ? "Not Define"
                : moment(props.activeDraw.endTime).format("YYYY-MM-DD HH-mm a")}
            </div>
          </div>
          <div>
            <div className="info">Draw Time</div>
            <div className="context">
              {!props.activeDraw.drawTime
                ? "Not Define"
                : moment(props.activeDraw.drawTime).format(
                    "YYYY-MM-DD HH-mm a"
                  )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SingleDraw;
