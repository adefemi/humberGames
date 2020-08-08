import React, { useContext, useEffect, useState } from "react";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import { Tabs } from "../../components/tabs/tabs";
import WalletList from "./walletList";
import TransactionList from "./transactionList";
import DatePicker from "../../components/DatePicker/datePicker";
import { Card } from "../../components/card/Card";
import { Spinner } from "../../components/spinner/Spinner";
import moment from "moment";
import { tomorrow } from "../dashboard/dashboard";
import "../dashboard/dashboard.css";
import { axiosHandler } from "../../utils/axiosHandler";
import { ANALYTICS_URL } from "../../utils/urls";
import { getClientId, getToken, numberWithCommas } from "../../utils/helper";
import _ from "lodash"
import { primaryColor } from "../../utils/data";

function Billings(props) {
  const { dispatch } = useContext(store);
  const [activeIndex, setActiveIndex] = useState(0);
  const [fetching, setFetching] = useState(true);
  const [summaryData, setSummaryData] = useState({});
  const [dateData, setDateData] = useState({
    startDate: moment(new Date()).format("YYYY-MM-DD"),
    endDate: moment(tomorrow).format("YYYY-MM-DD")
  });
  
  const getSummaryData = () => {
    Promise.all([
      axiosHandler({
        method: "get",
        url: ANALYTICS_URL + `deposit?clientId=${getClientId()}&startDate=2020-07-27T14:00:18.813&endDate=2020-07-29T14:00:18.813`,
        token: getToken(),
        clientID: getClientId()
      }),
      axiosHandler({
        method: "get",
        url: ANALYTICS_URL + `withdrawal?clientId=${getClientId()}&startDate=2020-07-27T14:00:18.813&endDate=2020-07-29T14:00:18.813`,
        token: getToken(),
        clientID: getClientId()
      }),
      // axiosHandler({
      //   method: "get",
      //   url: ANALYTICS_URL + `revenue?clientId=${getClientId()}&startDate=2020-07-27T14:00:18.813&endDate=2020-07-29T14:00:18.813`,
      //   token: getToken(),
      //   clientID: getClientId()
      // })
    ]).then(
      ([deposit, withdrawal]) => {
        setSummaryData({
          depo: _.get(deposit, "data.totalSum", 0),
          withdraw: _.get(withdrawal, "data.totalSum", 0),
        })
        setFetching(false);
      }
    )
  }

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Billings" });
    getSummaryData()
  }, []);

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
        <Card heading="Total Deposit">
          <div className="contentCard">
            <center>{fetching ? <Spinner color={primaryColor} /> : numberWithCommas(summaryData.depo)}</center>
          </div>
        </Card>
        <Card heading="Total Withdrawal">
          <div className="contentCard">
          <center>{fetching ? <Spinner color={primaryColor} /> : numberWithCommas(summaryData.withdraw)}</center>
          </div>
        </Card>
        <Card heading="Total Product Revenue">
          <div className="contentCard">
            <center>0</center>
          </div>
        </Card>
      </div>
      <br />
      <Tabs
        body={[<WalletList />, <TransactionList />]}
        heading={["Wallet Transaction", "Transction Record"]}
        activeIndex={activeIndex}
        onSwitch={setActiveIndex}
      />
    </div>
  );
}

export default Billings;
