import React, { useEffect, useContext, useState } from "react";
import { setPageTitleAction } from "../../stateManagement/actions";
import { store } from "../../stateManagement/store";
import TransactionTable from "../../components/transactionTable/transactionTable";
import Input from "../../components/input/Input";
import AppIcon from "../../components/icons/Icon";
import { Select } from "../../components/select/Select";
import { secondaryColor, statusMode } from "../../utils/data";
import { Button } from "../../components/button/Button";
import "./reward.css";
import { axiosHandler } from "../../utils/axiosHandler";
import { REWARDS_URL } from "../../utils/urls";
import { errorHandler, getClientId, getToken } from "../../utils/helper";
import { Notification } from "../../components/notification/Notification";
import moment from "moment";
import { Spinner } from "../../components/spinner/Spinner";
import qs from "querystring";
import Pagination from "../../components/Pagination/pagination";
import Badge from "../../components/Badge/badge";
import { cleanParameters } from "../campaign/campaign";

function Reward(props) {
  const { dispatch } = useContext(store);
  const [fetching, setFetching] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(null);
  const [queryParams, setQueryParams] = useState({});
  const [search, setSearch] = useState("");
  const [pageInfo, setPageInfo] = useState(null);

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Rewards" });
  }, []);

  useEffect(() => {
    let extra = `page=${currentPage - 1}`;
    extra += `&${qs.stringify(cleanParameters(queryParams))}`;
    getRewards(extra);
  }, [search, queryParams, currentPage]);

  const getRewards = (extra = "") => {
    if (!fetching) {
      setFetching(true);
    }
    axiosHandler({
      method: "get",
      url: REWARDS_URL + `?${extra}&size=20`,
      token: getToken(),
      clientID: getClientId()
    }).then(
      res => {
        setRewards(res.data._embedded.rewards);
        setPageInfo(res.data.page);
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

  const viewGame = reward => {
    setLoading(reward.id);
    axiosHandler({
      method: "get",
      url: reward._links.gameInstance.href,
      token: getToken(),
      clientID: getClientId()
    }).then(
      res => {
        props.history.push(`/instance/${res.data.id}/${res.data.label}`);
      },
      err => {
        Notification.bubble({
          type: "error",
          content: errorHandler(err)
        });
        setLoading(null);
      }
    );
  };

  const formatRewards = rewards => {
    let result = [];
    rewards.map(item => {
      result.push([
        <span>
          {item.title.substring(0, 30)} {item.title.length > 30 && "..."}
        </span>,
        // item.drawFrequenceInHours,
        // item.cutOffTimeInHours,
        // moment(item.nextdrawTime, "YYYY-MM-DD HH:mm:ss").fromNow(),
        moment(new Date(item.createdAt)).fromNow(),
        <div>
          <Badge>{item.status}</Badge>
        </div>,
        <div>
          <span
            className="link"
            onClick={() => props.history.push(`/reward/${item.id}`)}
          >
            View Reward
          </span>{" "}
          &nbsp; | &nbsp;
          {loading === item.id ? (
            <Spinner color={secondaryColor} />
          ) : (
            <span className="link" onClick={() => viewGame(item)}>
              View Game Instance
            </span>
          )}{" "}
          &nbsp; | &nbsp;{" "}
          <span
            className="link"
            onClick={() => props.history.push(`/reward/update/${item.id}`)}
          >
            Update Reward
          </span>
          &nbsp; | &nbsp;{" "}
          <span
            className="link"
            onClick={() => props.history.push(`/reward/update/${item.id}`)}
          >
            View Campaign
          </span>
        </div>
      ]);
      return null;
    });
    return result;
  };

  const headings = ["Title", "Created at", "Status", ""];

  return (
    <div>
      <div className="flex align-center justify-between">
        <div>
          <div className="lease-search-box">
            <Input
              placeholder="Search rewards"
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
      <br />
      {!fetching && rewards.length > 0 && (
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

export default Reward;
