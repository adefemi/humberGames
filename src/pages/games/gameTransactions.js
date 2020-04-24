import React, { useEffect, useState } from "react";
import Input from "../../components/input/Input";
import AppIcon from "../../components/icons/Icon";
import { Select } from "../../components/select/Select";
import { statusMode } from "../../utils/data";
import TransactionTable from "../../components/transactionTable/transactionTable";
import Pagination from "../../components/Pagination/pagination";
import Badge from "../../components/Badge/badge";
import { axiosHandler } from "../../utils/axiosHandler";
import { errorHandler, getClientId, getToken } from "../../utils/helper";
import { Notification } from "../../components/notification/Notification";
import moment from "moment";
import ContentModal from "../../components/contentModal/contentModal";
import FormGroup from "../../components/formGroup/formGroup";

function GameTransactions(props) {
  const headings = [
    "ID",
    "Transaction Ref",
    "User ID",
    "Status",
    "Game Token",
    "User Input",
    "Draw TIme"
  ];
  const [transactions, setTransaction] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [activeTransaction, setActiveTransaction] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);

  useEffect(() => {
    if (props.transactionLink) {
      axiosHandler({
        method: "get",
        url: props.transactionLink,
        clientID: getClientId(),
        token: getToken()
      })
        .then(res => {
          console.log(res.data._embedded.gameTransactions);
          setTransaction(res.data._embedded.gameTransactions);
          setFetching(false);
        })
        .catch(err => {
          Notification.bubble({
            type: "error",
            content: errorHandler(err, true)
          });
        });
    }
  }, [props.transactionLink]);

  const formatTransactions = () => {
    const returnValue = [];
    transactions.map(item => {
      returnValue.push([
        `${item.id.substring(0, 10)}${item.id.length > 10 && "..."}`,
        `${item.transactionRef.substring(0, 10)}${
          item.transactionRef.length > 10 ? "..." : ""
        }`,
        item.userId
          ? `${item.userId.substring(0, 10)}${item.userId.length > 10 && "..."}`
          : "N/A",
        item.status ? (
          <Badge
            status={
              item.status.toLowerCase() === "won"
                ? "success"
                : item.status.toLowerCase() === "lost"
                ? "error"
                : "processing"
            }
          >
            {item.status}
          </Badge>
        ) : (
          "N/A"
        ),
        item.gameToken
          ? `${item.gameToken.substring(0, 10)}${item.gameToken.length > 10 &&
              "..."}`
          : "N/A",
        item.userInput
          ? `${item.userInput.substring(0, 10)}${item.userInput.length > 10 &&
              "..."}`
          : "N/A",
        moment(new Date(item.createdAt)).fromNow(),
        item
      ]);
      return null;
    });
    return returnValue;
  };

  return (
    <div>
      <div className="flex align-center justify-between">
        <div>
          <div className="lease-search-box">
            <Input
              placeholder="Search ID"
              iconRight={<AppIcon name="search" type="feather" />}
            />
          </div>
        </div>
        <div className="flex align-center props">
          &nbsp;
          <Select
            className="lease-search-box"
            defaultOption={statusMode[0]}
            optionList={statusMode}
          />
        </div>
      </div>
      <br />
      <br />
      <TransactionTable
        keys={headings}
        values={formatTransactions()}
        loading={fetching}
        canClick
        onClick={e => {
          setActiveTransaction(e);
          setModalShow(true);
        }}
      />
      <br />
      <Pagination total={1} current={1} />
      <br />
      <br />
      <ContentModal visible={modalShow} setVisible={setModalShow}>
        <TransactionDetails activeTrans={activeTransaction} />
      </ContentModal>
    </div>
  );
}

const TransactionDetails = props => {
  return (
    <div>
      <h4>Transaction details</h4>
      <br />
      <FormGroup>
        <div className="info">ID</div>
        <div className="context">{props.activeTrans.id}</div>
      </FormGroup>
      <FormGroup>
        <div className="info">Transaction Ref</div>
        <div className="context">{props.activeTrans.transactionRef}</div>
      </FormGroup>
      <FormGroup>
        <div className="info">User ID</div>
        <div className="context">
          {props.activeTrans.userId ? props.activeTrans.userId : "N/A"}
        </div>
      </FormGroup>
      <FormGroup>
        <div className="info">Status</div>
        <div className="context">
          {props.activeTrans.status ? (
            <Badge
              status={
                props.activeTrans.status.toLowerCase() === "won"
                  ? "success"
                  : props.activeTrans.status.toLowerCase() === "lost"
                  ? "error"
                  : "processing"
              }
            >
              {props.activeTrans.status}
            </Badge>
          ) : (
            "N/A"
          )}
        </div>
      </FormGroup>
      <FormGroup>
        <div className="info">Game Token</div>
        <div className="context">
          {props.activeTrans.gameToken ? props.activeTrans.gameToken : "N/A"}
        </div>
      </FormGroup>
      <FormGroup>
        <div className="info">User Input</div>
        <div className="context">
          {props.activeTrans.userInput ? props.activeTrans.userInput : "N/A"}
        </div>
      </FormGroup>
      <FormGroup>
        <div className="info">Draw TIme</div>
        <div className="context">
          {moment(new Date(props.activeTrans.createdAt)).fromNow()}
        </div>
      </FormGroup>
    </div>
  );
};

export default GameTransactions;
