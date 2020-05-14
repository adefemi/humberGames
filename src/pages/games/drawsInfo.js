import React, { useEffect, useState } from "react";
import Input from "../../components/input/Input";
import AppIcon from "../../components/icons/Icon";
import { Select } from "../../components/select/Select";
import { statusMode } from "../../utils/data";
import TransactionTable from "../../components/transactionTable/transactionTable";
import Pagination from "../../components/Pagination/pagination";
import { axiosHandler } from "../../utils/axiosHandler";
import { errorHandler, getClientId, getToken } from "../../utils/helper";
import { Notification } from "../../components/notification/Notification";
import moment from "moment";
import { Link } from "react-router-dom";

function GameDraws(props) {
  const headings = [
    "ID",
    "Start Time",
    "End Time",
    "Draw Time",
    "Created At",
    ""
  ];
  const [fetching, setFetching] = useState(true);
  const [draws, setDraws] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);

  useEffect(() => {
    if (!props.fetching) {
      axiosHandler({
        method: "get",
        url: props.activeInstance._links.draws.href,
        clientID: getClientId(),
        token: getToken()
      }).then(
        res => {
          setDraws(res.data._embedded.draws);
          setFetching(false);
        },
        err => {
          Notification.bubble({
            type: "error",
            content: errorHandler(err)
          });
        }
      );
    }
  }, [props.fetching]);

  const formatDraws = () => {
    const results = [];
    draws.map(item => {
      results.push([
        <span>
          {item.id.substring(0, 15)}
          {item.id.length > 15 && "..."}
        </span>,
        item.startTime
          ? moment(new Date(item.startTime)).format("YYYY-MM-DD HH:mm a")
          : "Not Defined",
        item.endTime
          ? moment(new Date(item.endTime)).format("YYYY-MM-DD HH:mm a")
          : "Not Defined",
        item.drawTime
          ? moment(new Date(item.drawTime)).format("YYYY-MM-DD HH:mm a")
          : "Not Defined",
        moment(new Date(item.createdAt)).fromNow(),
        <Link to={`/instance/draw/${item.id}/${props.match.params.label}`}>
          <span className="link">View Draw</span>
        </Link>
      ]);
      return null;
    });
    return results;
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
        values={formatDraws()}
        loading={fetching}
      />
      <br />
      <Pagination total={1} current={1} />
    </div>
  );
}

export default GameDraws;
