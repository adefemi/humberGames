import React from "react";
import { Card } from "../../components/card/Card";
import moment from "moment";
import AppIcon from "../../components/icons/Icon";
import GameTransactions from "./gameTransactions";

function TransactionDetailsTwo(props) {
  return (
    <div>
      {console.log(props.activeTransaction)}
      <Card className="padding-20">
        <div className="link" onClick={() => props.setDetails2(false)}>
          <AppIcon name="chevronLeft" type="feather" />
          &nbsp;Go Back
        </div>
        <br />
        <div className="grid grid-2 grid-gap-2">
          <div>
            <div className="info">Transaction Reference</div>
            <div className="context">
              {props.activeTransaction.transactionRef}
            </div>
          </div>
          <div>
            <div className="info">User ID</div>
            <div className="context">{props.activeTransaction.userId}</div>
          </div>
          <div>
            <div className="info">User Input</div>
            <div className="context">{props.activeTransaction.userInput}</div>
          </div>
          <div>
            <div className="info">Created At</div>
            <div className="context">
              {moment(new Date(props.activeTransaction.createdAt)).fromNow()}
            </div>
          </div>
        </div>
      </Card>
      <br />
      <h3>Game Transactions</h3>
      <GameTransactions
        {...props}
        bundle={false}
        transRef={props.activeTransaction.transactionRef}
      />
    </div>
  );
}

export default TransactionDetailsTwo;
