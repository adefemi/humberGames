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

const newDate = new Date();
const data = items => {
  console.log("items", items);
  const newArray = [];

  items &&
    items.map(item => {
      newArray.push({
        messageId: item.messageId,
        timestamp: moment(item.timestamp).format("DD-MM-YYYY HH:mm"),
        recipient: item.recipient,
        reason: item.reason || item.status,
        productId: <span className="text-overflow">{item.message}</span>,
        status: (
          <span
            className={`status-badge ${
              item.status.toLowerCase() === "pending" ? "pending" : "approved"
            }`}
          >
            {item.status.toUpperCase()}
          </span>
        )
      });
      return null;
    });
  return newArray;
};

const columns = [
  "Timestamp",
  "Message ID",
  "Recipient",
  "Status",
  "Description"
];

function SingleCampaign(props) {
  const [campaign, setCampaign] = useState({ content: null, fetching: true });
  const [activeCampaign] = useState(props.match.params.slug);
  const [activeTab, setActiveTab] = useState(0);
  const [logs, setLogs] = useState({
    data: [],
    total: 0,
    page: 1,
    fetching: true
  });
  const [report, setReport] = useState({
    all: 0,
    success: 0,
    failed: 0,
    pending: 0,
    fetching: true
  });
  const [messageChart, setMessageChart] = useState({
    data: 0,
    fetching: true
  });

  const [dates, setDate] = useState({
    startDate: moment(newDate.setDate(newDate.getDate() - 1)),
    endDate: moment(new Date())
  });

  const [focus, setFocus] = useState(null);

  const onFetchData = (status, payload, _type) => {
    if (status) {
      let activeData = payload.data.data;
      if (_type === "logs") {
        setLogs({
          fetching: false,
          pages: activeData.pages,
          page: activeData.page,
          data: activeData.data,
          total: activeData.count.all
        });
        setReport(activeData.count);
      }
      if (_type === "campaignData") {
        setCampaign({
          content: activeData,
          fetching: false
        });
      } else if (_type === "messageChart") {
        setMessageChart({
          data: activeData,
          fetching: false
        });
      }
    } else {
    }
  };

  useEffect(() => {
    // getLogs(1);
    // axiosFunc(
    //   "get",
    //   campaignURL(`?campaignId=${activeCampaign}`),
    //   null,
    //   "yes",
    //   onFetchData,
    //   "campaignData"
    // );
    // getSubData();
  }, []);

  // const getSubData = (type = "new", newStartDate, newEndDate) => {
  //   let startDate = dates.startDate;
  //   let endDate = dates.endDate;
  //
  //   if (type === "refresh") {
  //     setMessageChart({
  //       ...messageChart,
  //       fetching: true
  //     });
  //
  //     startDate = newStartDate;
  //     endDate = newEndDate;
  //   }
  //
  //   if (!startDate || !endDate) {
  //     Notification.bubble({
  //       type: "error",
  //       content: "Both start-date and end-date are required"
  //     });
  //     return;
  //   }
  //
  //   axiosFunc(
  //     "get",
  //     notificationUrl(
  //       `notification/sms/aggregate?type=campaign&campaignId=${activeCampaign}&stepType=day&dateFrom=${dates.startDate.format(
  //         "YYYY-MM-DD"
  //       )}&dateTo=${dates.endDate.format("YYYY-MM-DD")}`
  //     ),
  //     null,
  //     "yes",
  //     onFetchData,
  //     "messageChart"
  //   );
  // };
  //
  // const getLogs = page => {
  //   console.log("oage", page);
  //   axiosFunc(
  //     "get",
  //     campaignURL(`logs?page=${page}&limit=${50}&campaignId=${activeCampaign}`),
  //     null,
  //     "yes",
  //     onFetchData,
  //     "logs"
  //   );
  // };
  const onChangePage = page => {
    setLogs({
      fetching: true,
      data: []
    });
    // getLogs(page);
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
                className={"productCardInfo"}
                style={{ backgroundColor: "#e6b2ff", color: "white" }}
              >
                <div className="padding-20">
                  <div className={"title"}>Total Messages</div>
                  <div className="inner-content">
                    {report.fetching ? (
                      <Spinner />
                    ) : (
                      <div className="mainFig">{report.all}</div>
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
                    {report.fetching ? (
                      <Spinner />
                    ) : (
                      <div className="mainFig">{report.success}</div>
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
                    {report.fetching ? (
                      <Spinner />
                    ) : (
                      <div className="mainFig">{report.failed}</div>
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
                    {report.fetching ? (
                      <Spinner />
                    ) : (
                      <div className="mainFig">{report.pending}</div>
                    )}
                  </div>
                </div>
              </Card>
            </div>
            <br />
            <br />
            <div className="grid-2">
              <Card heading="GamePlays/Winnings vs Time">
                <p />
                <div className="contentCard">
                  <div className="graph-container">
                    <div className="">
                      <Graph
                        options={OPTIONS}
                        labels={DATA.labels}
                        datasets={DATA.datasets}
                        height={300}
                        width={1000}
                        className="transaction-graph"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <br />
            <br />
            <TransactionTable
              keys={columns}
              values={[]}
              loading={logs.fetching}
            />
            <br />
          </>,
          <Card heading="Campaign Info">
            {campaign.fetching ? (
              <div className="padding-20">
                {" "}
                <Spinner />
              </div>
            ) : (
              <div className="padding-20">
                <table className="campTable">
                  <tbody>
                    <tr>
                      <th>Title</th>
                      <td>{campaign.content.title}</td>
                    </tr>
                    <tr>
                      <th>ProductID</th>
                      <td>{campaign.content.productId}</td>
                    </tr>
                    <tr>
                      <th>Schedule (Date/Time)</th>
                      <td>
                        {moment(new Date(campaign.content.schedule)).format(
                          "DD MMMM, YYYY"
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>Message</th>
                      <td>{campaign.content.message}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        ]}
      />
      <br />
    </div>
  );
}

export default SingleCampaign;
