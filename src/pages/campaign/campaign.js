import React, { useEffect, useContext, useState } from "react";
import { setPageTitleAction } from "../../stateManagement/actions";
import { store } from "../../stateManagement/store";
import TransactionTable from "../../components/transactionTable/transactionTable";
import Input from "../../components/input/Input";
import AppIcon from "../../components/icons/Icon";
import { Select } from "../../components/select/Select";
import { statusMode } from "../../utils/data";
import { Button } from "../../components/button/Button";
import { axiosHandler } from "../../utils/axiosHandler";
import { errorHandler, getClientId, getToken } from "../../utils/helper";
import { CAMPAIGN_URL } from "../../utils/urls";
import { Notification } from "../../components/notification/Notification";
import moment from "moment";

function Campaign(props) {
  const { dispatch } = useContext(store);
  const [campaigns, setCampaigns] = useState({});
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Campaigns" });
    getCampaigns();
  }, []);

  const getCampaigns = (extra = "") => {
    axiosHandler({
      method: "get",
      clientID: getClientId(),
      token: getToken(),
      url: CAMPAIGN_URL + "/sms?page=1&limit=10"
    }).then(
      res => {
        console.log(res.data);
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
        item.title,
        item.status,
        item.recipientCount,
        item.schedule,
        moment(new Date(item.createdAt)).fromNow(),
        <span
          className="link"
          onClick={() =>
            props.history.push(`/campaigns/${item.campaignId}/active`)
          }
        >
          View
        </span>
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
              placeholder="Search campaigns"
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
    </div>
  );
}

export default Campaign;
