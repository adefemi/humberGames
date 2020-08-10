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

function WalletList(props) {
  const [wallets, setWallets] = useState([]);
  const [balance, setBalance] = useState(0);
  const [pageInfo, setPageInfo] = useState({});
  const [fetching, setFetching] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [queryParams, setQueryParams] = useState({});

  useEffect(() => {
    let extra = `page=${currentPage}`;
    extra += `&${qs.stringify(queryParams)}`;
    getWallets(extra);
  }, [queryParams, currentPage]);

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

  const formatMoney = () => {
    let balance = props.balance / 100;
    balance = balance.toFixed(2);
    balance = "₦" + balance;
    return balance;
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
            item.debitAmount < 1
              ? item.creditAmount / 100
              : item.debitAmount / 100
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
          Balance: {formatMoney()}
          <br />
          Account type: N/A
        </div>
        <div className="flex align-center props">
          &nbsp;
          <Select
            className="lease-search-box"
            defaultOption={walletTransOption[0]}
            optionList={walletTransOption}
            name="status"
            onChange={(e) => {
              if (e.target.value === "credit") {
                setQueryParams({ debitAmount: 0 });
              } else if (e.target.value === "debit") {
                setQueryParams({ creditAmount: 0 });
              } else {
                setQueryParams({});
              }
            }}
          />
        </div>
      </div>
      <br />
      <TransactionTable
        keys={headings}
        loading={fetching}
        values={formatWallets()}
      />
      <br />
      {!fetching && (
        <Pagination
          counter={pageInfo.size}
          total={pageInfo.totalElements}
          current={currentPage}
          onChange={setCurrentPage}
        />
      )}
      <br />
      <br />
    </div>
  );
}

export default WalletList;
