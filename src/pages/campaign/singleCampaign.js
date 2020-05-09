import React, { useEffect, useState } from "react";
import { Card } from "../../components/card/Card";
import { Spinner } from "../../components/spinner/Spinner";
import { axiosHandler } from "../../utils/axiosHandler";
import moment from "moment";
import AppIcon from "../../components/icons/Icon";
import { secondaryColor } from "../../utils/data";
import "./campaign.css";
import { Tabs } from "../../components/tabs/tabs";
import Graph from "../../components/graph/Graph";
import { DATA, OPTIONS } from "../dashboard/transactionGraphData";
import TransactionTable from "../../components/transactionTable/transactionTable";
import { errorHandler, getClientId, getToken } from "../../utils/helper";
import {
  CAMPAIGN_URL,
  NOTIFICATION_LOGS_URL,
  NOTIFICATION_STATUS_URL
} from "../../utils/urls";
import { Notification } from "../../components/notification/Notification";
import Badge from "../../components/Badge/badge";
import Pagination from "../../components/Pagination/pagination";

const newDate = new Date();

const columns = [
  "Recipient",
  "Message",
  "Message ID",
  "Sent at",
  "Status",
  "Created At"
];

function SingleCampaign(props) {
  const [campaign, setCampaign] = useState({ content: null, fetching: true });
  const [activeCampaign, setActiveCampaign] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [fetchingLogs, setFetchingLogs] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [logs, setLogs] = useState({});
  const [status, setStatus] = useState({});

  useEffect(() => {
    getActiveCampaign();
  }, []);

  useEffect(() => {
    if (!fetchingLogs) {
      setFetchingLogs(true);
    }
    getLogs();
  }, [activePage]);

  const getActiveCampaign = () => {
    Promise.all([
      axiosHandler({
        method: "get",
        clientID: getClientId(),
        token: getToken(),
        url: CAMPAIGN_URL + `/sms/${props.match.params.uuid}`
      }),
      axiosHandler({
        method: "get",
        clientID: getClientId(),
        token: getToken(),
        url: NOTIFICATION_STATUS_URL + props.match.params.uuid
      })
    ])
      .then(([activeCampaign, statuses]) => {
        setActiveCampaign(activeCampaign.data.data);

        setStatus(statuses.data.data);
        setFetching(false);
      })
      .catch(e => {
        Notification.bubble({
          type: "error",
          content: errorHandler(e)
        });
      });
  };

  const getLogs = () => {
    axiosHandler({
      method: "get",
      clientID: getClientId(),
      token: getToken(),
      url: NOTIFICATION_LOGS_URL + `?limit=20&page=${activePage}`
    })
      .then(res => {
        setLogs(res.data.data);
        setFetchingLogs(false);
      })
      .catch(e => {
        Notification.bubble({
          type: "error",
          content: errorHandler(e)
        });
      });
  };

  const formatCampaign = () => {
    const results = [];
    if (logs.data) {
      logs.data.map(item => {
        results.push([
          item.recipient,
          <div className="messages">{item.message}</div>,
          <span>
            {item.messageId.substring(0, 15)}
            {item.messageId.length > 15 && "..."}
          </span>,
          moment.unix(item.sentAt).fromNow(),
          <Badge
            status={
              item.status === "SUCCESS"
                ? "success"
                : item.status === "PENDING"
                ? "processing"
                : "error"
            }
          >
            {item.status}
          </Badge>,
          moment(new Date(item.createdAt)).fromNow()
        ]);
        return null;
      });
    }
    return results;
  };

  return (
    <div className="newCampaign">
      <div className="flex align-center">
        <span onClick={() => props.history.goBack()} className="link">
          <AppIcon name="arrowLeft" type="feather" />{" "}
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <h3>Add Campaign</h3>
      </div>
      <br />
      <Tabs
        heading={["Dashboard", "Info"]}
        activeIndex={activeTab}
        onSwitch={setActiveTab}
        body={[
          <>
            <div className="grid grid-4 grid-gap-2">
              <Card
                round
                className="productCardInfo"
                style={{ backgroundColor: "#e6b2ff", color: "white" }}
              >
                <div className="padding-20">
                  <div className={"title"}>Total Messages</div>
                  <div className="inner-content">
                    {fetching ? (
                      <Spinner />
                    ) : (
                      <div className="mainFig">{status.total}</div>
                    )}
                  </div>
                </div>
              </Card>
              <Card
                round
                className={"productCardInfo"}
                style={{ backgroundColor: "#0bc733", color: "white" }}
              >
                <div className="padding-20">
                  <div className={"title"}>Sent</div>
                  <div className="inner-content">
                    {fetching ? (
                      <Spinner />
                    ) : (
                      <div className="mainFig">{status.success}</div>
                    )}
                  </div>
                </div>
              </Card>
              <Card
                round
                className={"productCardInfo"}
                style={{ backgroundColor: "#ff7675", color: "white" }}
              >
                <div className="padding-20">
                  <div className={"title"}>Failed</div>
                  <div className="inner-content">
                    {fetching ? (
                      <Spinner />
                    ) : (
                      <div className="mainFig">{status.failed}</div>
                    )}
                  </div>
                </div>
              </Card>
              <Card
                round
                className={"productCardInfo"}
                style={{ backgroundColor: "#6776ff", color: "white" }}
              >
                <div className="padding-20">
                  <div className={"title"}>Pending</div>
                  <div className="inner-content">
                    {fetching ? (
                      <Spinner />
                    ) : (
                      <div className="mainFig">{status.pending}</div>
                    )}
                  </div>
                </div>
              </Card>
            </div>
            {/*<br />*/}
            {/*<br />*/}
            {/*<div>*/}
            {/*  <Card heading="GamePlays/Winnings vs Time">*/}
            {/*    <p />*/}
            {/*    <div className="contentCard">*/}
            {/*      <div className="graph-container">*/}
            {/*        <div className="">*/}
            {/*          <Graph*/}
            {/*            options={OPTIONS}*/}
            {/*            labels={DATA.labels}*/}
            {/*            datasets={DATA.datasets}*/}
            {/*            height={300}*/}
            {/*            width={1000}*/}
            {/*            className="transaction-graph"*/}
            {/*          />*/}
            {/*        </div>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </Card>*/}
            {/*</div>*/}
            <br />
            <br />
            <TransactionTable
              keys={columns}
              values={formatCampaign()}
              loading={fetchingLogs}
            />
            <br />
            {!fetchingLogs && (logs.data && logs.data.length > 0) && (
              <Pagination
                total={logs.total}
                current={activePage}
                onChange={e => setActivePage(e)}
              />
            )}
            <br />
          </>,
          <CampaignInfo fetching={fetching} activeCampaign={activeCampaign} />
        ]}
      />
      <br />
    </div>
  );
}

const CampaignInfo = props => {
  if (props.fetching) {
    return (
      <>
        <br />
        <Spinner color={secondaryColor} />
      </>
    );
  }

  return (
    <Card heading="Campaign Info">
      <div className="grid grid-2 grid-gap-2 padding-20">
        <div>
          <div className="info">Schedule Type</div>
          <div className="context">{props.activeCampaign.schedule}</div>
        </div>
        <div>
          <div className="info">Status</div>
          <div className="context">
            <Badge
              status={
                props.activeCampaign.status === "sent"
                  ? "success"
                  : props.activeCampaign.status === "pending"
                  ? "processing"
                  : "error"
              }
            >
              {props.activeCampaign.status}
            </Badge>
          </div>
        </div>
        <div>
          <div className="info">Title</div>
          <div className="context">{props.activeCampaign.title}</div>
        </div>
        <div>
          <div className="info">Message</div>
          <div className="context">{props.activeCampaign.message}</div>
        </div>
        <div>
          <div className="info">Sender</div>
          <div className="context">{props.activeCampaign.sender || "null"}</div>
        </div>
        <div>
          <div className="info">Recipient Count</div>
          <div className="context">{props.activeCampaign.recipientCount}</div>
        </div>
        <div>
          <div className="info">Campaign ID</div>
          <div className="context">{props.activeCampaign.campaignId}</div>
        </div>
        <div>
          <div className="info">Campaign ID</div>
          <div className="context">
            {moment(new Date(props.activeCampaign.createdAt)).fromNow()}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SingleCampaign;
