import React, { useContext, useEffect, useState } from "react";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import DatePicker from "../../components/DatePicker/datePicker";
import { Card } from "../../components/card/Card";
import { Spinner } from "../../components/spinner/Spinner";
import moment from "moment";
import "../dashboard/dashboard.css";
import { axiosHandler } from "../../utils/axiosHandler";
import { ANALYTICS_URL } from "../../utils/urls";
import { getClientId, getToken, numberWithCommas } from "../../utils/helper";
import _ from "lodash"
import { primaryColor } from "../../utils/data";
import Graph from "../../components/graph/Graph";
import { OPTIONS, DATA } from "../dashboard/transactionGraphData";


function PerformanceReport(props) {
  const [fetching, setFetching] = useState(true);
  const [summaryData, setSummaryData] = useState({});
  const [dateData, setDateData] = useState({
    endDate: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    startDate: moment(new Date()).format("YYYY-MM-DD") + " 00:00:00"
  });
  
  const getSummaryData = () => {
    Promise.all([
      axiosHandler({
        method: "get",
        url: ANALYTICS_URL + `deposit?startDate=${dateData.startDate.replace(" ", "T")}&endDate=${dateData.endDate.replace(" ", "T")}`,
        token: getToken(),
        clientID: getClientId()
      }),
      axiosHandler({
        method: "get",
        url: ANALYTICS_URL + `withdrawal?startDate=${dateData.startDate.replace(" ", "T")}&endDate=${dateData.endDate.replace(" ", "T")}`,
        token: getToken(),
        clientID: getClientId()
      }),
      axiosHandler({
        method: "get",
        url: ANALYTICS_URL + `revenue?startDate=${dateData.startDate.replace(" ", "T")}&endDate=${dateData.endDate.replace(" ", "T")}`,
        token: getToken(),
        clientID: getClientId()
      })
    ]).then(
      ([deposit, withdrawal, rev]) => {
        setSummaryData({
          depo: _.get(deposit, "data.sum", 0),
          withdraw: _.get(withdrawal, "data.sum", 0),
          revenue: _.get(rev, "data.sum", 0),
        })
        setFetching(false);
      }
    )
  }

  useEffect(() => {
    getSummaryData()
    setFetching(true);
  }, [dateData]);

  const setDateDataInfo = (data) => {
    setDateData({
      startDate: data.startDate + moment(new Date()).format(" HH:mm:ss"),
      endDate: data.endDate + moment(new Date()).format(" HH:mm:ss"),
    })
  }

  return (
    <div className="dashboard">
      <div className="flex align-center">
        <DatePicker
          rangePicker
          onChange={e => setDateDataInfo({ ...dateData, ...e })}
        />
        <h3 className="link">
          &nbsp;&nbsp;Showing data between {dateData.startDate} to{" "}
          {dateData.endDate}
        </h3>
      </div>
      <br />
      <br />
      <div className="computes">
        <Card heading="Total Deposit">
          <div className="contentCard">
            <center>{fetching ? <Spinner color={primaryColor} /> : numberWithCommas(summaryData.depo) || 0}</center>
          </div>
        </Card>
        <Card heading="Total Withdrawal">
          <div className="contentCard">
          <center>{fetching ? <Spinner color={primaryColor} /> : numberWithCommas(summaryData.withdraw) || 0}</center>
          </div>
        </Card>
        <Card heading="Total Product Revenue">
          <div className="contentCard">
          <center>{fetching ? <Spinner color={primaryColor} /> : numberWithCommas(summaryData.revenue) || 0}</center>
          </div>
        </Card>
      </div>
      <br/>
      <br/>
      <Card className="graph-container " heading="Transaction and WalletTransaction Trend">
            {
              <div className="padding-20">
                <Graph
                  options={OPTIONS}
                  labels={DATA.labels}
                  datasets={DATA.datasets}
                  height={300}
                  width={1000}
                  className="transaction-graph"
                />
              </div>
            }
          </Card>
    </div>
  );
}

export default PerformanceReport;
