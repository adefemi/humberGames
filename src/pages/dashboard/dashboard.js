import React, { useState, useEffect } from "react";
import "./dashboard.css";
import { Card } from "../../components/card/Card";
import { DATA, OPTIONS, DATA2, OPTIONS2 } from "./transactionGraphData";
import Graph from "../../components/graph/Graph";
import DatePicker from "../../components/DatePicker/datePicker";
import { axiosHandler } from "../../utils/axiosHandler";
import { ANALYTICS_GRAPH_URL, ANALYTICS_KPI_URL } from "../../utils/urls";
import { errorHandler, getClientId, getToken } from "../../utils/helper";
import { Notification } from "../../components/notification/Notification";
import { Spinner } from "../../components/spinner/Spinner";
import moment from "moment";

var oneWeekAgo = new Date();
oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

function Dashboard(props) {
  const [data, setData] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [dateData, setDateData] = useState({
    startDate: moment(oneWeekAgo).format("YYYY-MM-DD"),
    endDate: moment(new Date()).format("YYYY-MM-DD")
  });

  useEffect(() => {
    if (!fetching) {
      setFetching(true);
    }
    getDateData();
  }, [dateData]);

  useEffect(() => {
    getDateData();
  }, []);

  const getDateData = () => {
    Promise.all([
      axiosHandler({
        method: "post",
        url: ANALYTICS_KPI_URL + props.match.params.uuid,
        clientID: getClientId(),
        token: getToken(),
        data: {
          startDate: `${dateData.startDate} 00:00:00`,
          endDate: `${dateData.endDate} 00:00:00`
        }
      }),
      axiosHandler({
        method: "post",
        url: ANALYTICS_GRAPH_URL + props.match.params.uuid,
        clientID: getClientId(),
        token: getToken(),
        data: {
          startDate: `${dateData.startDate} 00:00:00`,
          endDate: `${dateData.endDate} 00:00:00`
        }
      })
    ]).then(
      ([logs, graph]) => {
        setData({ ...data, kpiInfo: logs.data });
        setFetching(false);
        // console.log(graph);
      },
      err => {
        Notification.bubble({
          type: "error",
          content: errorHandler(err)
        });
      }
    );
  };
  return (
    <div className="dashboard">
      <div className="flex align-center">
        <DatePicker
          rangePicker
          onChange={e => setDateData({ ...dateData, ...e })}
        />
        <h3 className="link">
          &nbsp;&nbsp;Showing data between {dateData.startDate} to{" "}
          {dateData.endDate}
        </h3>
      </div>
      <br />
      <br />

      <div className="computes">
        <Card heading="Total GamePlays">
          <div className="contentCard">
            <center>
              {fetching ? (
                <Spinner color="#000000" />
              ) : (
                <h1>{data.kpiInfo ? data.kpiInfo.totalGamePlays : "-"}</h1>
              )}
            </center>
          </div>
        </Card>
        <Card heading="Total Winnings">
          <div className="contentCard">
            <center>
              {fetching ? (
                <Spinner color="#000000" />
              ) : (
                <h1>{data.kpiInfo ? data.kpiInfo.totalWinnings : "-"}</h1>
              )}
            </center>
          </div>
        </Card>
        <Card heading="Winning Ration">
          <div className="contentCard">
            <center>
              {fetching ? (
                <Spinner color="#000000" />
              ) : (
                <h1>
                  {data.kpiInfo
                    ? data.kpiInfo.totalGamePlays / data.kpiInfo.totalWinnings <
                      1
                      ? 1
                      : data.kpiInfo.totalWinnings
                    : "-"}
                </h1>
              )}
            </center>
          </div>
        </Card>
      </div>
      <br />
      <Card heading="GamePlays/Winnings vs Time">
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
      <br />
      {/*<Card heading="Revenue Income/Expense vs Time">*/}
      {/*  <div className="contentCard">*/}
      {/*    <div className="graph-container">*/}
      {/*      <div className="">*/}
      {/*        <Graph*/}
      {/*          options={OPTIONS2}*/}
      {/*          labels={DATA2.labels}*/}
      {/*          datasets={DATA2.datasets}*/}
      {/*          height={300}*/}
      {/*          width={1000}*/}
      {/*          className="transaction-graph"*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</Card>*/}
    </div>
  );
}

export default Dashboard;
