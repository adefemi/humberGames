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
import { CAMPAIGN_URL, USER_TRANSACTION_URL } from "../../utils/urls";
import { Notification } from "../../components/notification/Notification";
import Badge from "../../components/Badge/badge";
import moment from "moment";
import { store } from "../../stateManagement/store";
import { Select } from "../../components/select/Select";
import { statusModeCampaign } from "../../utils/data";
import _ from "lodash";

function TransactionList(props) {
  const [campaigns, setCampaigns] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [fetching, setFetching] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [queryParams, setQueryParams] = useState({});
  const [search, setSearch] = useState(null);
  useEffect(() => {
    let extra = `page=${currentPage}`;
    extra += `&${qs.stringify(
      cleanParameters({ ...queryParams, keyword: search })
    )}`;
    getCampaigns(extra);
  }, [search, queryParams, currentPage]);

  const getCampaigns = (extra = "") => {
    if (!fetching) {
      setFetching(true);
    }
    if (props.user) {
      if (props.fetching) return;
      extra = extra + `id=${props.walletID}`;
      console.log(props.walletID);
      if (props.walletID === 0) {
        setFetching(false);
        return;
      }
    }
    axiosHandler({
      method: "get",
      clientID: getClientId(),
      token: getToken(),
      url:
        USER_TRANSACTION_URL + `?limit=20&${extra}&clientId=${getClientId()}`,
    }).then(
      (res) => {
        setCampaigns(_.get(res, "data._embedded.transactions", []));
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

  const formatCampaigns = () => {
    if (!campaigns) return [];
    const result = [];
    campaigns.map((item) => {
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
        </div>
        <div className="flex align-center props">
          &nbsp;
          <Select
            className="lease-search-box"
            defaultOption={statusModeCampaign[0]}
            optionList={statusModeCampaign}
            name="status"
            onChange={(e) =>
              genericChangeSingle(e, setQueryParams, queryParams)
            }
          />
        </div>
      </div>
      <br />
      <TransactionTable
        keys={headings}
        loading={fetching}
        values={formatCampaigns()}
      />
      <br />
      {!fetching && (
        <Pagination
          counter={campaigns.limit}
          total={campaigns.total}
          current={currentPage}
          onChange={setCurrentPage}
        />
      )}
      <br />
    </div>
  );
}

export default TransactionList;
