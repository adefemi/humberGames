import React, { useContext, useEffect } from "react";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import { Card } from "../../components/card/Card";
import { Button } from "../../components/button/Button";

import contractSvg from "../../assets/transactions/contract.svg";
import earningSvg from "../../assets/transactions/earnings.svg";

import "./Transactions.css";

const Transactions = () => {
  const { dispatch } = useContext(store);

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Transactions" });
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
      <div className="earnings-container grid grid-3">
        <Card>
          <div className="flex earnings-card align-center">
            <img src={earningSvg} alt="earnings" className="earnings-svg" />
            <div className="actual-earnings">
              <p>Earnings</p>
              <p>N2,000,000.00</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex earnings-card align-center">
            <img src={earningSvg} alt="earnings" className="earnings-svg" />
            <div className="actual-earnings">
              <p>Earnings</p>
              <p>N2,000,000.00</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex earnings-card align-center">
            <img src={earningSvg} alt="earnings" className="earnings-svg" />
            <div className="actual-earnings">
              <p>Earnings</p>
              <p>N2,000,000.00</p>
            </div>
          </div>
        </Card>
      </div>
      <div className="graph-container">
        <p>Income Analysis</p>
        <div className="flex graph">
          <h1>Graph to be here</h1>
        </div>
      </div>
      <div className="transactions-container">
        <p>Transactions</p>
        <div className="transactions-table-container">
          <table className="transactions-table">
            <tr className="transactions-row">
              <td>
                <div
                  className="Dr-circle flex align-center"
                  style={{ background: "lightBlue" }}
                >
                  Dr
                </div>
              </td>
              <td>Security Deposit for Blk 7, Atlantic City</td>
              <td>RRTZ-12509-cx33</td>
              <td>N60.90</td>
              <td>August 31, 2020</td>
              <td>Pending</td>
              <td>
                <Button className="receipt">Download Receipt</Button>
              </td>
            </tr>
            <tr className="transactions-row">
              <td>
                <div
                  className="Dr-circle flex align-center"
                  style={{ background: "green" }}
                >
                  Dr
                </div>
              </td>
              <td>Security Deposit for Blk 7, Atlantic City</td>
              <td>RRTZ-12509-cx33</td>
              <td>N60.90</td>
              <td>August 31, 2020</td>
              <td>Pending</td>
              <td>
                <Button className="receipt">Download Receipt</Button>
              </td>
            </tr>
            <tr className="transactions-row">
              <td>
                <div className="Dr-circle flex align-center">Dr</div>
              </td>
              <td>Security Deposit for Blk 7, Atlantic City</td>
              <td>RRTZ-12509-cx33</td>
              <td>N60.90</td>
              <td>August 31, 2020</td>
              <td>Pending</td>
              <td>
                <Button className="receipt">Download Receipt</Button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
