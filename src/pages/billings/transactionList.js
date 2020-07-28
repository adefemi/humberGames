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
  getToken
} from "../../utils/helper";
import { CAMPAIGN_URL } from "../../utils/urls";
import { Notification } from "../../components/notification/Notification";
import Badge from "../../components/Badge/badge";
import moment from "moment";
import { store } from "../../stateManagement/store";
import { Select } from "../../components/select/Select";
import { statusModeCampaign } from "../../utils/data";

function TransactionList(props) {
  const [campaigns, setCampaigns] = useState({});
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
    axiosHandler({
      method: "get",
      clientID: getClientId(),
      token: getToken(),
      url: CAMPAIGN_URL + `/sms?limit=20&${extra}&clientId=${getClientId()}`
    }).then(
      res => {
        setCampaigns(res.data);
        setFetching(false);
      },
      err => {
        Notification.bubble({
          type: "error",
          content: errorHandler(err)
        });
      }
    );
  };

  const headings = [
    "id",
    "Title",
    "Status",
    "recipientCount",
    "Schedule",
    "created at",
    ""
  ];

  const formatCampaigns = () => {
    if (!campaigns.data) return [];
    const result = [];
    campaigns.data.map(item => {
      result.push([
        <span>
          {item.campaignId.substring(0, 10)}
          {item.campaignId.length > 10 && "..."}
        </span>,
        <span>
          {item.title.substring(0, 15)}
          {item.title.length > 15 && "..."}
        </span>,
        <Badge
          status={
            item.status === "sent"
              ? "success"
              : item.status === "pending" || item.status === "scheduled"
              ? "processing"
              : "error"
          }
        >
          {item.status}
        </Badge>,
        item.recipientCount,
        item.schedule,
        moment(new Date(item.createdAt)).fromNow(),
        <div>
          <span
            className="link"
            onClick={() =>
              props.history.push(`/campaigns/${item.campaignId}/active`)
            }
          >
            View
          </span>{" "}
          |&nbsp;
          <span
            className="link"
            onClick={() =>
              props.history.push(`/campaigns/${item.campaignId}/duplicate`)
            }
          >
            Duplicate
          </span>
        </div>
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
            onChange={e => genericChangeSingle(e, setQueryParams, queryParams)}
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
