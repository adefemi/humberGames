import React, { useContext, useEffect, useState } from "react";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import { Card } from "../../components/card/Card";
import { Button } from "../../components/button/Button";
import { getToken, numberWithCommas } from "../../utils/helper";
import moment from "moment";
import {
  AGENCY_TRANSACTION_URL,
  CUSTOMER_TRANSACTION_URL
} from "../../utils/urls";
import { axiosHandler } from "../../utils/axiosHandler";
import { Notification } from "../../components/notification/Notification";
import _ from "lodash";
import Graph from "../../components/graph/Graph";
import { DATA, OPTIONS } from "./transactionGraphData";
import TransactionTable from "../../components/transactionTable/transactionTable";

import contractSvg from "../../assets/transactions/contract.svg";
import earningSvg from "../../assets/transactions/earnings.svg";

import "./Transactions.css";

const Transactions = () => {
  const { dispatch } = useContext(store);
  const [profileLoader, setProfileLoader] = useState(true);
  const [agencyTrans, setAgencyTrans] = useState({});
  const [cusTrans, setCusTrans] = useState({});
  const [transLoader, setTransLoader] = useState(true);

  const {
    state: { userDetails }
  } = useContext(store);

  const getProfileStats = () => {
    if (userDetails.user) {
      setProfileLoader(false);
    }
  };

  const role = profileLoader ? "" : userDetails.role.name;
  const name = profileLoader ? "" : userDetails.user.first_name;

  const getAgencyTransactions = () => {
    if (role == "agency") {
      axiosHandler("GET", AGENCY_TRANSACTION_URL, getToken())
        .then(res => {
          setAgencyTrans(res.data);
          setTransLoader(false);
        })
        .catch(err => {
          Notification.bubble({
            type: "error",
            content: "Unable to load transactions"
          });
          setTransLoader(false);
        });
    }
  };

  const getCustomerTransactions = () => {
    axiosHandler("GET", CUSTOMER_TRANSACTION_URL, getToken())
      .then(res => {
        setCusTrans(res.data.results.results);
        setTransLoader(false);
      })
      .catch(err => {
        Notification.bubble({
          type: "error",
          content: "Unable to load transactions"
        });
        setTransLoader(false);
      });
  };

  const formatTransaction = trans => {
    let newList = [];
    trans.map(item => {
      newList.push([
        _.get(item, "transaction_type", ""),
        _.get(item, "remark", ""),
        _.get(item, "reference", ""),
        `${_.get(item, "currency_type")}${numberWithCommas(
          _.get(item, "amount")
        )}`,
        moment(_.get(item, "created_at", "")).format("MMM Do YYYY"),
        _.get(item, "status")
      ]);
      return null;
    });
    return newList;
  };

  const showTransactions = () => {
    if (cusTrans.length !== 0) {
      return (
        <>
          <p>Transactions</p>
          {transLoader ? (
            ""
          ) : (
            <TransactionTable
              keys={["Type", "Remark", "Reference", "Amount", "Date", "Status"]}
              values={formatTransaction(cusTrans)}
            />
          )}
        </>
      );
    }
    return (
      <h5
        style={{ textAlign: "center" }}
      >{`Hello ${name}. You can find your transaction details here as soon as you have some.`}</h5>
    );
  };

  const showGraph = () => {
    if (role == "agency") {
      return (
        <>
          <div className="graph-container">
            <p>Income Analysis</p>
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
        </>
      );
    }
  };

  const showCards = () => {
    if (role == "agency") {
      return (
        <>
          <div className="earnings-container grid grid-3">
            <Card>
              <div className="flex earnings-card align-center">
                <img src={earningSvg} alt="earnings" className="earnings-svg" />
                <div className="actual-earnings">
                  <p>Expenses</p>
                  <p>{`${_.get(agencyTrans, "currency_type", "NGN")} ${_.get(
                    agencyTrans,
                    "expenses",
                    0
                  )}`}</p>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex earnings-card align-center">
                <img src={earningSvg} alt="earnings" className="earnings-svg" />
                <div className="actual-earnings">
                  <p>Revenue</p>
                  <p>{`${_.get(agencyTrans, "currency_type", "NGN")} ${_.get(
                    agencyTrans,
                    "revenue",
                    0
                  )}`}</p>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex earnings-card align-center">
                <img src={earningSvg} alt="earnings" className="earnings-svg" />
                <div className="actual-earnings">
                  <p>Profit</p>
                  <p>{`${_.get(agencyTrans, "currency_type", "NGN")} ${_.get(
                    agencyTrans,
                    "profit",
                    0
                  )}`}</p>
                </div>
              </div>
            </Card>
          </div>
        </>
      );
    }
  };

  useEffect(() => {
    getAgencyTransactions();
  }, [profileLoader]);

  useEffect(() => {
    getProfileStats();
  }, [userDetails]);

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Transactions" });
    getCustomerTransactions();
  }, []);
  return (
    <div>
      <div className="rectangle flex">
        <img src={contractSvg} alt="contract" className="contract-svg" />
        <div className="flex transaction-header">
          <p>Transactions</p>
          <p>
            View your transactions here in details and visualize your cash flow
          </p>
        </div>
      </div>
      {showCards()}
      {showGraph()}
      <div className="transactions-container">{showTransactions()}</div>
    </div>
  );
};
export default Transactions;
