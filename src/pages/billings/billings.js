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

function Billings(props) {
  const { dispatch } = useContext(store);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dateData, setDateData] = useState({
    startDate: moment(new Date()).format("YYYY-MM-DD"),
    endDate: moment(tomorrow).format("YYYY-MM-DD")
  });

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Billings" });
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
            <center>0</center>
          </div>
        </Card>
        <Card heading="Total Withdrawal">
          <div className="contentCard">
            <center>0</center>
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
