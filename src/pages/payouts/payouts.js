import React, { useContext, useEffect, useState } from "react";
import Input from "../../components/input/Input";
import AppIcon from "../../components/icons/Icon";
import TransactionTable from "../../components/transactionTable/transactionTable";
import Pagination from "../../components/Pagination/pagination";
import Badge from "../../components/Badge/badge";
import { axiosHandler } from "../../utils/axiosHandler";
import { errorHandler, getClientId, getToken } from "../../utils/helper";
import { Notification } from "../../components/notification/Notification";
import moment from "moment";
import qs from "querystring";
import { CUSTOMER_WINNING_URL, PAYOUT_URL } from "../../utils/urls";
import { cleanParameters } from "../campaign/campaign";
import { Button } from "../../components/button/Button";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";

function GameTransactions(props) {
  const headings = ["UserID", "WonAt", "PaidAt", ""];
  const [transactions, setTransaction] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [queryParams, setQueryParams] = useState({});
  const [search, setSearch] = useState("");

  const { dispatch } = useContext(store);

  useEffect(() => {
    dispatch({
      type: setPageTitleAction,
      payload: "Payouts"
    });
  }, []);

  useEffect(() => {
    let extra = `page=${currentPage - 1}`;
    extra += `&${qs.stringify(
      cleanParameters(queryParams)
    )}&clientId=${getClientId()}&sort=createdAt,desc`;
    getTransactions(extra);
  }, [search, queryParams, currentPage]);

  const payNow = id => {
    const url = PAYOUT_URL + id;
    setLoading(id);
    axiosHandler({
      method: "get",
      url,
      clientID: getClientId(),
      token: getToken()
    })
      .then(res => {
        Notification.bubble({
          type: "success",
          content: "Payment initiated"
        });
        getTransactions();
      })
      .catch(err => {
        Notification.bubble({
          type: "error",
          content: errorHandler(err)
        });
        setLoading(false);
      });
  };

  const getTransactions = (extra = "") => {
    if (!fetching) {
      setFetching(true);
    }
    axiosHandler({
      method: "get",
      url: CUSTOMER_WINNING_URL + `?size=20&${extra}`,
      clientID: getClientId(),
      token: getToken()
    })
      .then(res => {
        setTransaction(res.data._embedded.playerWinnings);
        setPageInfo(res.data.page);
        setFetching(false);
        setLoading(false);
      })
      .catch(err => {
        Notification.bubble({
          type: "error",
          content: errorHandler(err, true)
        });
      });
  };

  const formatTransactions = () => {
    const returnValue = [];
    transactions.map(item => {
      returnValue.push([
        item.userId ? (
          <span>
            {item.userId.substring(0, 20)}
            {item.userId.length > 20 && "..."}
          </span>
        ) : (
          "N/A"
        ),
        item.wonAt ? moment(item.wonAt, "H:m:s").format("h:m a") : "N/A",
        item.paidAt ? (
          moment(item.paidAt, "H:m:s").format("h:m a")
        ) : (
          <Badge status="processing">Awaiting Payment</Badge>
        ),
        <>
          {item.paidAt ? (
            <Button
              color="default"
              disabled
              style={{ width: "unset", height: 30 }}
            >
              Payment Processed
            </Button>
          ) : (
            <Button
              disabled={loading === item.id}
              loading={loading === item.id}
              onClick={() => payNow(item.id)}
              className="transaction-table-button"
            >
              Pay now
            </Button>
          )}
        </>
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
        {/*<div className="flex align-center props">*/}
        {/*  &nbsp;*/}
        {/*  <Select*/}
        {/*    className="lease-search-box"*/}
        {/*    name="status"*/}
        {/*    defaultOption={statusModeTransaction[0]}*/}
        {/*    optionList={statusModeTransaction}*/}
        {/*    onChange={e => genericChangeSingle(e, setQueryParams, queryParams)}*/}
        {/*  />*/}
        {/*</div>*/}
      </div>
      <br />
      <br />
      <TransactionTable
        keys={headings}
        values={formatTransactions()}
        loading={fetching}
      />
      <br />
      {!fetching && transactions.length > 0 && (
        <Pagination
          counter={pageInfo.size}
          total={pageInfo.totalElements}
          current={currentPage}
          onChange={setCurrentPage}
        />
      )}
      <br />
    </div>
  );
}

export default GameTransactions;
