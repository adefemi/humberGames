import React, { useEffect, useContext, useState } from "react";
import { setPageTitleAction } from "../../stateManagement/actions";
import { store } from "../../stateManagement/store";
import TransactionTable from "../../components/transactionTable/transactionTable";
import Input from "../../components/input/Input";
import AppIcon from "../../components/icons/Icon";
import "./users.css";
import { axiosHandler } from "../../utils/axiosHandler";
import { USER_FETCH_URL } from "../../utils/urls";
import { errorHandler, getClientId, getToken } from "../../utils/helper";
import { Notification } from "../../components/notification/Notification";
import moment from "moment";
import Pagination from "../../components/Pagination/pagination";
import qs from "query-string";
import { cleanParameters } from "../campaign/campaign";
import { Card } from "../../components/card/Card";
import { Spinner } from "../../components/spinner/Spinner";
import "../dashboard/dashboard.css";
import { primaryColor, statusMode } from "../../utils/data";
import { Select } from "../../components/select/Select";

function Users(props) {
  const { dispatch } = useContext(store);
  const [fetching, setFetching] = useState(true);
  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [queryParams, setQueryParams] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Users" });
  }, []);

  useEffect(() => {
    let extra = `page=${currentPage}`;
    extra += `&${qs.stringify(
      cleanParameters({ ...queryParams, keyword: search })
    )}`;
    setFetching(true);
    getClients(extra);
  }, [search, queryParams, currentPage]);

  const getClients = (extra = "") => {
    if (!fetching) {
      setFetching(fetching);
    }
    axiosHandler({
      method: "get",
      url: USER_FETCH_URL + `?limit=20&${extra}`,
      token: getToken(),
      clientID: getClientId()
    }).then(
      res => {
        setClients(res.data);
        console.log(res.data);
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

  const formatClients = clients => {
    if (fetching) return;
    let result = [];
    clients.map(item => {
      result.push([
        item.userId,
        item.phoneNumber,
        item.roleId,
        moment(new Date(item.createdAt)).fromNow(),
        moment(new Date(item.updatedAt)).fromNow(),
        <span
          className="link"
          onClick={() => props.history.push(`/users/${item.userId}`)}
        >
          View User
        </span>
      ]);
      return null;
    });
    return result;
  };

  const headings = [
    "UserId",
    "Phone Number",
    "RoleId",
    "Created at",
    "Updated at",
    ""
  ];

  return (
    <div className="dashboard">
      <div className="computes">
        <Card heading="Total Users">
          <div className="contentCard">
            <center>
              {fetching ? <Spinner color={primaryColor} /> : clients.total}
            </center>
          </div>
        </Card>
        <Card heading="Total New Users">
          <div className="contentCard">
            <center>0</center>
          </div>
        </Card>
      </div>
      <br />
      <div className="flex align-center justify-between">
        <div>
          <div className="lease-search-box">
            <Input
              placeholder="Search users"
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
            defaultOption={statusMode[0]}
            optionList={statusMode}
          />
        </div>
      </div>
      <br />
      <TransactionTable
        keys={headings}
        values={fetching ? [] : formatClients(clients.data)}
        loading={fetching}
      />
      <br />
      {!fetching && (
        <Pagination
          counter={clients.limit}
          total={clients.total}
          current={currentPage}
          onChange={setCurrentPage}
        />
      )}
      <br />
    </div>
  );
}

export default Users;
