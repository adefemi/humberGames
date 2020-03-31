import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import { axiosHandler, testToken } from "../../utils/axiosHandler";
import { AGENCY_TRANSACTION_URL } from "../../utils/urls";
import { Notification } from "../../components/notification/Notification";
import _ from "lodash";
import { Bar } from "react-chartjs-2";
import Graph from "../../components/graph/Graph";
import { agencyData, agencyGraphOptions } from "./agencyGraphOptions";
import { Spinner } from "../../components/spinner/Spinner";
import { getToken } from "../../utils/helper";

export default function AgencyGraphRequest() {
  const [transactionData, setTransactionData] = useState({});
  const [transactionLoader, setTransactionLoader] = useState(true);

  const getTransaction = () => {
    axiosHandler("GET", AGENCY_TRANSACTION_URL, getToken())
      .then(res => {
        setTransactionData(res.data);
        setTransactionLoader(false);
      })
      .catch(err => {
        Notification.bubble({
          type: "error",
          content: "Error getting transactions"
        });
        setTransactionLoader(false);
      });
  };

  const tvals = transactionData;

  const transactionContent = () => {
    let tc = transactionData.expenses_graph_data;
    if (tc) {
      if (tc.length === 0) {
        return <h4>No transactions data yet</h4>;
      }
      return tc.map(transaction => <p key=""></p>);
    }
    return <h4>Failed to load expenses graph</h4>;
  };

  useEffect(() => {
    getTransaction();
  }, []);

  transactionContent();
  return (
    <div className="agency-graph">
      <div className="acct-statements-container">
        <h6>Financial Report</h6>
        <div className="acct-statements flex">
          {transactionLoader ? (
            <Spinner color="#000000" />
          ) : (
            <>
              <div className="revenue">
                <h5>{`${_.get(tvals, "currency_type")} ${_.get(
                  tvals,
                  "revenue"
                )}`}</h5>
                <p>Revenue generated</p>
              </div>
              <div className="expenses">
                <h5>{`${_.get(tvals, "currency_type")} ${_.get(
                  tvals,
                  "expenses"
                )}`}</h5>
                <p>Expenses incured</p>
              </div>
              <div className="profit">
                <h5>{`${_.get(tvals, "currency_type")} ${_.get(
                  tvals,
                  "profit"
                )}`}</h5>
                <p>Profit</p>
              </div>
            </>
          )}
        </div>
      </div>
      <Graph
        chartType={Bar}
        labels={agencyData.labels}
        datasets={agencyData.datasets}
        options={agencyGraphOptions}
      />
    </div>
  );
}
