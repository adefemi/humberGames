import React, { useEffect, useContext, useState } from "react";
import { setPageTitleAction } from "../../stateManagement/actions";
import { store } from "../../stateManagement/store";
import TransactionTable from "../../components/transactionTable/transactionTable";
import Input from "../../components/input/Input";
import AppIcon from "../../components/icons/Icon";
import { Button } from "../../components/button/Button";
import "./users.css";
import { axiosHandler } from "../../utils/axiosHandler";
import { CLIENT_FETCH_URL, USER_FETCH_URL } from "../../utils/urls";
import { errorHandler, getClientId, getToken } from "../../utils/helper";
import { Notification } from "../../components/notification/Notification";
import moment from "moment";
import Pagination from "../../components/Pagination/pagination";

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
    // extra += `&${qs.stringify(queryParams)}`;
    getClients(extra);
  }, [search, queryParams, currentPage]);

  const getClients = (extra = "") => {
    if (!fetching) {
      setFetching(fetching);
    }
    axiosHandler({
      method: "get",
      url: USER_FETCH_URL, // + `?limit=5&page=${currentPage}`,
      token: getToken(),
      clientID: getClientId()
    }).then(
      res => {
        setClients(res.data.data);

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
    let result = [];
    clients.map(item => {
      result.push([
        item.userId,
        item.phoneNumber,
        moment(new Date(item.createdAt)).fromNow(),
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

  const headings = ["UserId", "Phone Number", "Created at", ""];

  return (
    <div>
      <div className="flex align-center justify-between">
        <div>
          <div className="lease-search-box">
            <Input
              placeholder="Search users"
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
        </div>
      </div>
      <br />
      <br />
      <TransactionTable
        keys={headings}
        values={formatClients(clients)}
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
