import React, { useEffect, useContext, useState } from "react";
import { setPageTitleAction } from "../../stateManagement/actions";
import { store } from "../../stateManagement/store";
import TransactionTable from "../../components/transactionTable/transactionTable";
import Input from "../../components/input/Input";
import AppIcon from "../../components/icons/Icon";
import { Select } from "../../components/select/Select";
import { statusMode } from "../../utils/data";
import { Button } from "../../components/button/Button";
import "./reward.css";
import { axiosHandler } from "../../utils/axiosHandler";
import { REWARDS_URL } from "../../utils/urls";
import { errorHandler, getClientId, getToken } from "../../utils/helper";
import { Notification } from "../../components/notification/Notification";
import moment from "moment";

function Reward(props) {
  const { dispatch } = useContext(store);
  const [fetching, setFetching] = useState(true);
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Rewards" });
    getRewards();
  }, []);

  const getRewards = () => {
    axiosHandler({
      method: "get",
      url: REWARDS_URL,
      token: getToken(),
      clientID: getClientId()
    }).then(
      res => {
        setRewards(res.data._embedded.rewards);

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

  const formatRewards = rewards => {
    let result = [];
    rewards.map(item => {
      result.push([
        item.title,
        item.drawFrequenceInHours,
        item.cutOffTimeInHours,
        moment(item.nextdrawTime, "YYYY-MM-DD HH:mm:ss").fromNow(),
        moment(new Date(item.createdAt)).fromNow(),
        <span className="link" onClick={() => props.history.push(`/reward/id`)}>
          View Reward
        </span>
      ]);
      return null;
    });
    return result;
  };

  const headings = [
    "Title",
    "Draw Frequency (in hours)",
    "Cutoff Time (in hours)",
    "Next Draw Time",
    "Created at",
    ""
  ];

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
          {/*<Select*/}
          {/*  className="lease-search-box"*/}
          {/*  defaultOption={statusMode[0]}*/}
          {/*  optionList={statusMode}*/}
          {/*/>*/}
          {/*&nbsp; &nbsp; &nbsp;*/}
          <Button onClick={() => props.history.push("/rewards/new")}>
            Add New
          </Button>
        </div>
      </div>
      <br />
      <br />
      <TransactionTable
        keys={headings}
        values={formatRewards(rewards)}
        loading={fetching}
      />
    </div>
  );
}

export default Reward;
