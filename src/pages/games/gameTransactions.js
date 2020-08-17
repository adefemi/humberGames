import React, { useEffect, useState } from "react";
import Input from "../../components/input/Input";
import AppIcon from "../../components/icons/Icon";
import { Select } from "../../components/select/Select";
import { secondaryColor, statusModeTransaction } from "../../utils/data";
import TransactionTable from "../../components/transactionTable/transactionTable";
import Pagination from "../../components/Pagination/pagination";
import Badge from "../../components/Badge/badge";
import { axiosHandler } from "../../utils/axiosHandler";
import {
  errorHandler,
  genericChangeSingle,
  getClientId,
  getToken,
} from "../../utils/helper";
import { Notification } from "../../components/notification/Notification";
import moment from "moment";
import ContentModal from "../../components/contentModal/contentModal";
import FormGroup from "../../components/formGroup/formGroup";
import qs from "querystring";
import {
  GAME_BUNDLE_TRANSACTION_URL,
  GAME_TRANSACTION_URL,
  PAYOUT_URL,
  APP_BASE,
  ANALYTICS_KPI_URL,
  ANALYTICS_GRAPH_URL,
} from "../../utils/urls";
import { cleanParameters } from "../campaign/campaign";
import Divider from "../../components/Divider/divider";
import { Spinner } from "../../components/spinner/Spinner";
import { Button } from "../../components/button/Button";
import TransactionDetailsTwo from "./transactionDetailsTwo";
import { formatApp } from "./singleGame";
import _ from "lodash";
import { Card } from "../../components/card/Card";
import { calculateWinningRatio } from "../dashboard/dashboard";
import "../dashboard/dashboard.css";

function GameTransactions(props) {
  let headings = [
    "ID",
    "Transaction Ref",
    "User ID",
    "Status",
    "Game Token",
    "User Input",
    "Draw TIme",
    "",
  ];
  if (props.bundle) {
    headings = ["Transaction Ref", "User ID", "User Input", ""];
  }
  const [transactions, setTransaction] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [fetchingSum, setFetchingSum] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [activeTransaction, setActiveTransaction] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [queryParams, setQueryParams] = useState({});
  const [search, setSearch] = useState("");
  const [showDetails2, setShowDetails2] = useState(false);
  const [data, setData] = useState(null);

  const [apps, setApps] = useState([]);
  const [fetchingApps, setFetchingApps] = useState(true);

  const getApps = () => {
    axiosHandler({
      method: "get",
      clientID: getClientId(),
      token: getToken(),
      url: APP_BASE,
    }).then(
      (res) => {
        setApps(_.get(res, "data._embedded.apps", []));
        setFetchingApps(false);
      },
      (err) => {
        Notification.bubble({
          type: "error",
          content: errorHandler(err),
        });
      }
    );
  };

  const [appId, setAppId] = useState(null);

  useEffect(() => {
    let extra = `page=${currentPage - 1}`;
    queryParams["appId"] = appId;
    extra += `&${qs.stringify(cleanParameters(queryParams))}`;
    getTransactions(extra);
    getDateData(qs.stringify(cleanParameters({ appId })));
    getApps();
  }, [search, queryParams, currentPage, appId]);

  const getTransactions = (extra = "") => {
    if (!fetching) {
      setFetching(true);
    }
    let url =
      GAME_TRANSACTION_URL +
      `?${props.user ? "userId" : props.draw ? "draw" : "gameInstance"}=${
        props.match.params.uuid
      }&size=20&${extra}&sort=createdAt,desc`;
    if (props.bundle) {
      url =
        GAME_BUNDLE_TRANSACTION_URL +
        `?game_bundle_id=${props.match.params.uuid}&size=20&${extra}&sort=drawTime,desc`;
    }
    if (props.transRef) {
      url =
        GAME_TRANSACTION_URL +
        `?transactionRef=${props.transRef}&size=20&${extra}&sort=drawTime,desc`;
    }
    axiosHandler({
      method: "get",
      url,
      clientID: getClientId(),
      token: getToken(),
    })
      .then((res) => {
        let data;
        if (props.bundle) {
          data = res.data._embedded.gameBundleTransactions;
        } else {
          data = res.data._embedded.gameTransactions;
        }
        setTransaction(data);
        setPageInfo(res.data.page);
        setFetching(false);
      })
      .catch((err) => {
        Notification.bubble({
          type: "error",
          content: errorHandler(err, true),
        });
      });
  };

  const getDateData = (extra) => {
    Promise.all([
      axiosHandler({
        method: "post",
        url: ANALYTICS_KPI_URL + `?${extra}`,
        clientID: getClientId(),
        token: getToken(),
        // data: {
        //   startDate: `${dateData.startDate} 00:00:00`,
        //   endDate: `${dateData.endDate} 00:00:00`
        // }
      }),
      axiosHandler({
        method: "post",
        url: ANALYTICS_GRAPH_URL + `?${extra}`,
        clientID: getClientId(),
        token: getToken(),
        // data: {
        //   startDate: `${dateData.startDate} 00:00:00`,
        //   endDate: `${dateData.endDate} 00:00:00`
        // }
      }),
    ]).then(
      ([logs, graph]) => {
        setData({ ...data, kpiInfo: logs.data });
        setFetchingSum(false);
      },
      (err) => {
        Notification.bubble({
          type: "error",
          content: errorHandler(err),
        });
      }
    );
  };

  const formatTransactions = () => {
    const returnValue = [];
    if (props.bundle) {
      transactions.map((item) => {
        returnValue.push([
          `${item.transactionRef.substring(0, 10)}${
            item.transactionRef.length > 10 ? "..." : ""
          }`,
          item.userId ? (
            <span>
              {item.userId.substring(0, 10)}
              {item.userId.length > 10 && "..."}
            </span>
          ) : (
            "N/A"
          ),
          item.userInput ? (
            <span>
              {item.userInput.substring(0, 10)}
              {item.userInput.length > 10 && "..."}
            </span>
          ) : (
            "N/A"
          ),
          <span
            className="link"
            onClick={() => {
              setActiveTransaction(item);
              setShowDetails2(true);
            }}
          >
            View Transaction
          </span>,
        ]);
        return null;
      });
    } else {
      transactions.map((item) => {
        returnValue.push([
          `${item.id.substring(0, 10)}${item.id.length > 10 ? "..." : ""}`,
          `${item.transactionRef.substring(0, 10)}${
            item.transactionRef.length > 10 ? "..." : ""
          }`,
          item.userId ? (
            <span>
              {item.userId.substring(0, 10)}
              {item.userId.length > 10 && "..."}
            </span>
          ) : (
            "N/A"
          ),
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
          item.gameToken ? (
            <span>
              {item.gameToken.substring(0, 10)}
              {item.gameToken.length > 10 && "..."}
            </span>
          ) : (
            "N/A"
          ),
          item.userInput ? (
            <span>
              {item.userInput.substring(0, 10)}
              {item.userInput.length > 10 && "..."}
            </span>
          ) : (
            "N/A"
          ),
          moment(new Date(item.createdAt)).fromNow(),
          <span
            className="link"
            onClick={() => {
              setActiveTransaction(item);
              setModalShow(true);
            }}
          >
            View Transaction
          </span>,
        ]);
        return null;
      });
    }
    return returnValue;
  };

  return (
    <div className="dashboard">
      <div className="computes">
        <Card heading="Total GamePlays">
          <div className="contentCard">
            <center>
              {fetchingSum ? (
                <Spinner color="#000000" />
              ) : (
                <h1>
                  {!data
                    ? "-"
                    : data.kpiInfo
                    ? data.kpiInfo.totalGamePlays
                    : "-"}
                </h1>
              )}
            </center>
          </div>
        </Card>
        <Card heading="Total Winnings">
          <div className="contentCard">
            <center>
              {fetchingSum ? (
                <Spinner color="#000000" />
              ) : (
                <h1>
                  {!data
                    ? "-"
                    : data.kpiInfo
                    ? data.kpiInfo.totalWinnings
                    : "-"}
                </h1>
              )}
            </center>
          </div>
        </Card>
        <Card heading="Winning Ratio">
          <div className="contentCard">
            <center>
              {fetchingSum ? (
                <Spinner color="#000000" />
              ) : (
                <h1>
                  {!data
                    ? "-"
                    : data.kpiInfo && calculateWinningRatio().length > 6
                    ? calculateWinningRatio().toFixed(4)
                    : calculateWinningRatio()}
                </h1>
              )}
            </center>
          </div>
        </Card>
      </div>
      <br />
      {showDetails2 && (
        <TransactionDetailsTwo
          {...props}
          activeTransaction={activeTransaction}
          setDetails2={setShowDetails2}
        />
      )}
      {!showDetails2 && (
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
              name="status"
              defaultOption={statusModeTransaction[0]}
              optionList={statusModeTransaction}
              onChange={(e) =>
                genericChangeSingle(e, setQueryParams, queryParams)
              }
            />
            &nbsp;
            <Select
              style={{ width: 200 }}
              placeholder={fetchingApps ? "loading apps..." : "select an app"}
              optionList={[{ title: "All", value: null }, ...formatApp(apps)]}
              name="appId"
              onChange={(e) => setAppId(e.target.value)}
            />
          </div>
        </div>
      )}
      {!showDetails2 && (
        <>
          <br />
          <br />
          <TransactionTable
            keys={headings}
            values={formatTransactions()}
            loading={fetching}
          />
          <br />
          {!fetching && transactions.length > 0 && (
            <Pagination
              counter={pageInfo.size}
              total={pageInfo.totalElements}
              current={currentPage}
              onChange={setCurrentPage}
            />
          )}
        </>
      )}

      <br />
      <ContentModal visible={modalShow} setVisible={setModalShow}>
        <TransactionDetails
          activeTrans={activeTransaction}
          bundle={props.bundle}
        />
      </ContentModal>
    </div>
  );
}

export const TransactionDetails = (props) => {
  const [fetching, setFetching] = useState(true);
  const [winningInfo, setWinningInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (
      props.activeTrans.status &&
      props.activeTrans.status.toLowerCase() === "won"
    ) {
      getWinningInfo();
    }
  }, []);
  const getWinningInfo = () => {
    setFetching(true);
    axiosHandler({
      method: "get",
      token: getToken(),
      clientID: getClientId(),
      url: GAME_TRANSACTION_URL + `/${props.activeTrans.id}/playerWinning`,
    }).then(
      (res) => {
        setWinningInfo(res.data);
        setFetching(false);
        setLoading(false);
      },
      (err) => {
        Notification.bubble({
          type: "error",
          content: errorHandler(err),
        });
      }
    );
  };

  const payNow = () => {
    const url = PAYOUT_URL + winningInfo.id;
    setLoading(true);
    axiosHandler({
      method: "get",
      url,
      clientID: getClientId(),
      token: getToken(),
    })
      .then((res) => {
        Notification.bubble({
          type: "success",
          content: "Payment initiated",
        });
        getWinningInfo();
      })
      .catch((err) => {
        Notification.bubble({
          type: "error",
          content: errorHandler(err),
        });
        setLoading(false);
      });
  };

  return (
    <div>
      <h4>Transaction details</h4>
      <br />
      {!props.bundle && (
        <FormGroup>
          <div className="info">ID</div>
          <div className="context">{props.activeTrans.id}</div>
        </FormGroup>
      )}
      <FormGroup>
        <div className="info">Transaction Ref</div>
        <div className="context">{props.activeTrans.transactionRef}</div>
      </FormGroup>
      <FormGroup>
        <div className="info">User ID</div>
        <div className="context">
          {props.activeTrans.userId ? props.activeTrans.userId : "N/A"}
        </div>
      </FormGroup>
      {!props.bundle && (
        <FormGroup>
          <div className="info">Status</div>
          <div className="context">
            {props.activeTrans.status ? (
              <Badge
                status={
                  props.activeTrans.status.toLowerCase() === "won"
                    ? "success"
                    : props.activeTrans.status.toLowerCase() === "lost"
                    ? "error"
                    : "processing"
                }
              >
                {props.activeTrans.status}
              </Badge>
            ) : (
              "N/A"
            )}
          </div>
        </FormGroup>
      )}
      {!props.bundle && (
        <FormGroup>
          <div className="info">Game Token</div>
          <div className="context">
            {props.activeTrans.gameToken ? props.activeTrans.gameToken : "N/A"}
          </div>
        </FormGroup>
      )}

      <FormGroup>
        <div className="info">User Input</div>
        <div className="context">
          {props.activeTrans.userInput ? props.activeTrans.userInput : "N/A"}
        </div>
      </FormGroup>
      {!props.bundle && (
        <FormGroup>
          <div className="info">Draw TIme</div>
          <div className="context">
            {moment(new Date(props.activeTrans.createdAt)).fromNow()}
          </div>
        </FormGroup>
      )}

      {props.activeTrans.status &&
        props.activeTrans.status.toLowerCase() === "won" && (
          <>
            <Divider />
            <div className="flex align-center justify-between">
              <h3>Winning Info</h3>
              {!fetching && (
                <>
                  {winningInfo.paidAt ? (
                    <Button
                      color="default"
                      disabled
                      style={{ width: "unset", height: 30 }}
                    >
                      Payment Processed
                    </Button>
                  ) : (
                    <Button
                      disabled={loading}
                      loading={loading}
                      onClick={payNow}
                      style={{ width: "unset", height: 30 }}
                    >
                      Pay now
                    </Button>
                  )}
                </>
              )}
            </div>
            {fetching ? (
              <Spinner color={secondaryColor} />
            ) : (
              <div>
                <FormGroup>
                  <div className="info">UserID</div>
                  <div className="context">{winningInfo.userId}</div>
                </FormGroup>
                <FormGroup>
                  <div className="info">Won At</div>
                  <div className="context">
                    {winningInfo.wonAt
                      ? moment(winningInfo.wonAt, "H:m:s").format("h:m a")
                      : "N/A"}
                  </div>
                </FormGroup>
                <FormGroup>
                  <div className="info">Paid At</div>
                  <div className="context">
                    {winningInfo.paidAt
                      ? moment(winningInfo.paidAt, "H:m:s").format("h:m a")
                      : "Awaiting Payment"}
                  </div>
                </FormGroup>
              </div>
            )}
          </>
        )}
    </div>
  );
};

export default GameTransactions;
