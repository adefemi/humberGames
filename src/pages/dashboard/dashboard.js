import React, { useState, useEffect } from "react";
import "./dashboard.css";
import { Card } from "../../components/card/Card";
import { DATA, OPTIONS } from "./transactionGraphData";
import Graph from "../../components/graph/Graph";
import DatePicker from "../../components/DatePicker/datePicker";
import { axiosHandler } from "../../utils/axiosHandler";
import { ANALYTICS_GRAPH_URL, ANALYTICS_KPI_URL } from "../../utils/urls";
import { errorHandler, getClientId, getToken } from "../../utils/helper";
import { Notification } from "../../components/notification/Notification";
import { Spinner } from "../../components/spinner/Spinner";
import moment from "moment";
import { Select } from "../../components/select/Select";
import { cleanParameters } from "../campaign/campaign";
import qs from "querystring";

let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
export { tomorrow };

function Dashboard(props) {
  const [data, setData] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [appId, setAppId] = useState(null);
  const [dateData, setDateData] = useState({
    startDate: moment(new Date()).format("YYYY-MM-DD"),
    endDate: moment(tomorrow).format("YYYY-MM-DD")
  });

  useEffect(() => {
    if (props.bundle) return;
    if (!fetching) {
      setFetching(true);
    }
    
    getDateData(qs.stringify(cleanParameters({appId})));
  }, [dateData, appId]);


  const getDateData = (extra) => {
    Promise.all([
      axiosHandler({
        method: "post",
        url: ANALYTICS_KPI_URL + props.match.params.uuid + `?${extra}`,
        clientID: getClientId(),
        token: getToken(),
        data: {
          startDate: `${dateData.startDate} 00:00:00`,
          endDate: `${dateData.endDate} 00:00:00`
        }
      }),
      axiosHandler({
        method: "post",
        url: ANALYTICS_GRAPH_URL + props.match.params.uuid + `?${extra}`,
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
      },
      err => {
        Notification.bubble({
          type: "error",
          content: errorHandler(err)
        });
      }
    );
  };

  const calculateWinningRatio = () => {
    if (!data.kpiInfo) return 0;
    if (data.kpiInfo.totalGamePlays <= 0) return 0;
    return data.kpiInfo.totalWinnings / data.kpiInfo.totalGamePlays;
  };

  return (
    <div className="dashboard">
      <div className="flex align-center justify-between">
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
        <Select style={{maxWidth: 200}} placeholder={props.fetchingApp ? "loading apps..." : "select an app"}
                optionList={[{title: "All", value:null}, ...props.formatApp(props.apps)]} name="appId" onChange={e => setAppId(e.target.value)}/>
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
        <Card heading="Winning Ratio">
          <div className="contentCard">
            <center>
              {fetching ? (
                <Spinner color="#000000" />
              ) : (
                <h1>
                  {calculateWinningRatio().length > 6
                    ? calculateWinningRatio().toFixed(4)
                    : calculateWinningRatio()}
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
