import React, { useContext, useEffect, useState } from "react";
import { setPageTitleAction } from "../../stateManagement/actions";
import { store } from "../../stateManagement/store";
import { axiosHandler } from "../../utils/axiosHandler";
import { errorHandler, getClientId, getToken } from "../../utils/helper";
import {
  DRAW_EXECUTE_DRAW_URL,
  DRAW_EXECUTE_QUALIFY_URL,
  DRAWS_URL
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
import { TransactionDetails } from "./gameTransactions";
import { Card } from "../../components/card/Card";
import { Button } from "../../components/button/Button";
import { Modal } from "../../components/modal/Modal";

function SingleDraw(props) {
  const {
    dispatch,
    state: { userDetails }
  } = useContext(store);
  const [activeDraw, setActiveDraw] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [fetching, setFetching] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [activeGameInstance, setActiveGameInstance] = useState(null);
  useEffect(() => {
    dispatch({
      type: setPageTitleAction,
      payload: `${props.match.params.label} - Draw`
    });
    getActiveDraw();
  }, []);

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
          Promise.all([
            axiosHandler({
              method: "get",
              clientID: getClientId(),
              token: getToken(),
              url: activeDraw._links.gameInstance.href
            }),
            axiosHandler({
              method: "get",
              clientID: getClientId(),
              token: getToken(),
              url: activeDraw._links.transaction.href
            })
          ]).then(
            ([gameInstance, transactions]) => {
              setActiveGameInstance(gameInstance.data);
              setTransactions(transactions.data._embedded.gameTransactions);
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
    <DrawOverview transactions={transactions} />,
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

const DrawOverview = props => {
  const [modalShow, setModalShow] = useState(false);
  const [activeTransaction, setActiveTransaction] = useState(null);
  const headings = [
    "ID",
    "Transaction Ref",
    "User ID",
    "Status",
    "Game Token",
    "User Input",
    "Game Play Time",
    ""
  ];
  const formatTransactions = () => {
    const returnValue = [];
    props.transactions.map(item => {
      returnValue.push([
        `${item.id.substring(0, 10)}${item.id.length > 10 && "..."}`,
        `${item.transactionRef.substring(0, 10)}${
          item.transactionRef.length > 10 ? "..." : ""
        }`,
        item.userId
          ? `${item.userId.substring(0, 10)}${item.userId.length > 10 && "..."}`
          : "N/A",
        item.status ? (
          <Badge
            status={
              item.status.toLowerCase() === "won"
                ? "success"
                : item.status.toLowerCase() === "lost"
                ? "error"
                : "processing"
            }
          >
            {item.status}
          </Badge>
        ) : (
          "N/A"
        ),
        item.gameToken
          ? `${item.gameToken.substring(0, 10)}${item.gameToken.length > 10 &&
              "..."}`
          : "N/A",
        item.userInput
          ? `${item.userInput.substring(0, 10)}${item.userInput.length > 10 &&
              "..."}`
          : "N/A",
        moment(new Date(item.createdAt)).fromNow(),
        <span className="link">
          {item.status && item.status.toLowerCase() === "won" && "pay"}
        </span>,
        item
      ]);
      return null;
    });
    return returnValue;
  };
  return (
    <div>
      <div className="flex align-center justify-between">
        <div>
          <div className="lease-search-box">
            <Input
              placeholder="Search ID"
              iconRight={<AppIcon name="search" type="feather" />}
            />
          </div>
        </div>
        <div className="flex align-center props">
          &nbsp;
          <Select
            className="lease-search-box"
            defaultOption={statusMode[0]}
            optionList={statusMode}
          />
        </div>
      </div>
      <br />
      <br />
      <TransactionTable
        keys={headings}
        values={formatTransactions()}
        canClick
        onClick={e => {
          setActiveTransaction(e);
          setModalShow(true);
        }}
      />
      <br />
      <Pagination total={1} current={1} />
      <br />
      <br />
      <ContentModal visible={modalShow} setVisible={setModalShow}>
        <TransactionDetails activeTrans={activeTransaction} />
      </ContentModal>
    </div>
  );
};

const DrawOperations = props => {
  const [rewards, setRewards] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(null);

  const getDrawButton = () => {
    const currentTime = moment(new Date());
    let drawEndTime = new Date(props.activeDraw.endTime);
    drawEndTime = drawEndTime.setMinutes(
      drawEndTime.getMinutes() + props.activeInstance.gameConfig.durationInMins
    );
    drawEndTime = moment(drawEndTime);
    const timeDiff = drawEndTime.diff(currentTime, "seconds");
    if (timeDiff > 0) {
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
    const currentTime = moment(new Date());
    let cutoffTimeInMins = reward.cutOffTimeInMins;
    let drawEndTime = new Date(props.activeDraw.endTime);
    drawEndTime = drawEndTime.setMinutes(
      drawEndTime.getMinutes() +
        (props.activeInstance.gameConfig.durationInMins - cutoffTimeInMins)
    );
    drawEndTime = moment(drawEndTime);
    const timeDiff = drawEndTime.diff(currentTime, "seconds");
    if (timeDiff > 0) {
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
