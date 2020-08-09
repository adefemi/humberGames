import React, { useEffect, useState } from "react";
import TransactionTable from "../../components/transactionTable/transactionTable";
import Pagination from "../../components/Pagination/pagination";
import qs from "querystring";
import { cleanParameters } from "../campaign/campaign";
import { axiosHandler } from "../../utils/axiosHandler";
import {
  errorHandler,
  genericChangeSingle,
  getClientId,
  getToken,
  numberWithCommas,
} from "../../utils/helper";
import { WALLET_TRANSACTIONS_URL, PRODUCT_BALANCE_URL } from "../../utils/urls";
import { Notification } from "../../components/notification/Notification";
import Badge from "../../components/Badge/badge";
import moment from "moment";
import { Select } from "../../components/select/Select";
import _ from "lodash";
import { walletTransOption } from "../../utils/data";

function Rules(props) {
  const getWallets = (extra = "") => {
    if (!fetching) {
      setFetching(true);
    }
    if (props.user) {
      if (props.fetching) return;
      extra = extra + `walletId=${props.walletID}`;
      if (props.walletID === 0) {
        setFetching(false);
        return;
      }
    }
    axiosHandler({
      method: "get",
      clientID: getClientId(),
      token: getToken(),
      url: WALLET_TRANSACTIONS_URL + `?limit=20&${extra}`,
    }).then(
      (res) => {
        setWallets(_.get(res.data, "_embedded.walletTransactions", []));
        setPageInfo(_.get(res.data, "page", {}));
        setFetching(false);
      },
      (err) => {
        Notification.bubble({
          type: "error",
          content: errorHandler(err),
        });
      }
    );
  };

  const headings = [
    "id",
    "Amount",
    "Type",
    "Reference",
    "narration",
    "created at",
    "",
  ];

  const getBalance = () => {
    const month = moment().subtract(1, "month").toISOString();
    const today = moment().toISOString();

    axiosHandler({
      method: "get",
      url:
        PRODUCT_BALANCE_URL +
        `?productId=${props.productId}?startDate=${month}&endDate=${today}`,
      token: getToken(),
      clientID: getClientId(),
    }).then((res) => {
      setBalance(res.sum);
    });
  };

  const formatWallets = () => {
    if (!wallets) return [];
    const result = [];
    wallets.map((item, key) => {
      result.push([
        <span>
          {item.id.substring(0, 15)}
          {item.id.length > 15 && "..."}
        </span>,
        <span>
          {numberWithCommas(
            item.debitAmount < 1 ? item.creditAmount : item.debitAmount
          )}
        </span>,
        <Badge status={item.debitAmount < 1 ? "success" : "error"}>
          {item.debitAmount > 0 ? "DR" : "CR"}
        </Badge>,
        <div style={{ maxWidth: 250, overflow: "auto" }}>{item.reference}</div>,
        item.narration || "Not specified",
        moment(new Date(item.createdAt)).fromNow(),
        "",
      ]);
      return null;
    });
    return result;
  };
  return (
    <div>
      <div className="flex align-center justify-between">
        <div>
          <div className="lease-search-box" />
          ID: {props.walletID}
          <br />
          Balance: {balance}
          <br />
          Account type: N/A
        </div>
      </div>
      <br />
      <TransactionTable
        keys={headings}
        loading={fetching}
        values={formatWallets()}
      />
      <br />
    </div>
  );
}

export default Rules;
