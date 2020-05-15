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
import { DRAWS_URL } from "../../utils/urls";
import qs from "querystring";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [draws, setDraws] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);

  useEffect(() => {
    if (!props.fetching) {
      let extra = `page=${currentPage - 1}`;
      getDrawInfo(extra);
    }
  }, [props.fetching, search, currentPage]);

  const getDrawInfo = (extra = "") => {
    if (!fetching) {
      setFetching(true);
    }
    axiosHandler({
      method: "get",
      url:
        DRAWS_URL +
        `?gameInstance_id=${props.match.params.uuid}&${extra}&size=20`,
      clientID: getClientId(),
      token: getToken()
    }).then(
      res => {
        setDraws(res.data._embedded.draws);
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
      </div>
      <br />
      <br />
      <TransactionTable
        keys={headings}
        values={formatDraws()}
        loading={fetching}
      />
      <br />
      {!fetching && draws.length > 0 && (
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

export default GameDraws;
