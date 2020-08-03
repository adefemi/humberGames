import React, { useContext, useEffect, useState } from "react";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import qs from "querystring";
import { axiosHandler } from "../../utils/axiosHandler";
import {
  errorHandler,
  genericChangeSingle,
  getClientId,
  getToken
} from "../../utils/helper";
import { CAMPAIGN_URL, PRODUCTS_URL } from "../../utils/urls";
import { Notification } from "../../components/notification/Notification";
import Badge from "../../components/Badge/badge";
import moment from "moment";
import Input from "../../components/input/Input";
import AppIcon from "../../components/icons/Icon";
import { Select } from "../../components/select/Select";
import { statusModeCampaign } from "../../utils/data";
import { Button } from "../../components/button/Button";
import TransactionTable from "../../components/transactionTable/transactionTable";
import Pagination from "../../components/Pagination/pagination";
import { cleanParameters } from "../campaign/campaign";

function Products(props) {
  const { dispatch } = useContext(store);
  const [campaigns, setCampaigns] = useState({});
  const [fetching, setFetching] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [queryParams, setQueryParams] = useState({});
  const [search, setSearch] = useState(null);

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Campaigns" });
  }, []);

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
      url: PRODUCTS_URL
    }).then(
      res => {
        console.log(res.data);
        // setCampaigns(res.data);
        // setFetching(false);
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
          <div className="lease-search-box">
            <Input
              placeholder="Search products"
              iconRight={<AppIcon name="search" type="feather" />}
              debounce
              onChange={e => setSearch(e.target.value)}
            />
          </div>
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
          &nbsp; &nbsp; &nbsp;
          <Button onClick={() => props.history.push("/campaigns/new")}>
            Add New
          </Button>
        </div>
      </div>
      <br />
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

export default Products;
