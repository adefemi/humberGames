import React, { useContext, useEffect, useState } from "react";
import "./games.css";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import Affixed from "../../components/Affixed/affixed";
import SummaryCard from "../../components/property/SummaryCard";
import Input from "../../components/input/Input";
import AppIcon from "../../components/icons/Icon";
import { Select } from "../../components/select/Select";
import { gameStatusSort, timeSortOption } from "../../utils/data";
import { Button } from "../../components/button/Button";
import Pagination from "../../components/Pagination/pagination";
import {
  errorHandler,
  genericChangeSingle,
  getClientId,
  getToken,
  numberWithCommas
} from "../../utils/helper";
import { axiosHandler } from "../../utils/axiosHandler";
import { GAME_INSTANCE_URL, GAME_URL } from "../../utils/urls";
import { Notification } from "../../components/notification/Notification";
import qs from "querystring";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import Result from "../../components/Result/result";

function Games(props) {
  const { dispatch } = useContext(store);
  const [currentPage, setCurrentPage] = useState(1);
  const [queryParams, setQueryParams] = useState({});
  const [search, setSearch] = useState("");
  const [gameInstances, setGameInstance] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [pageInfo, setPageInfo] = useState(null);

  useEffect(() => {
    dispatch({
      type: setPageTitleAction,
      payload: props.match.params.label.toUpperCase()
    });
  }, []);

  useEffect(() => {
    let extra = `page=${currentPage - 1}`;
    extra += `&${qs.stringify(queryParams)}`;
    getInstance(extra);
  }, [search, queryParams, currentPage]);

  const getInstance = (extra = "") => {
    axiosHandler({
      method: "get",
      url: GAME_URL + `?id=${props.match.params.uuid}`,
      clientID: getClientId(),
      token: getToken()
    })
      .then(rep => {
        console.log(rep);
        axiosHandler({
          method: "get",
          url: rep.data._embedded.games[0]._links.gameInstances.href,
          clientID: getClientId(),
          token: getToken()
        }).then(res => {
          setGameInstance(res.data._embedded.gameInstances);
          setPageInfo(res.data.page);
          setFetching(false);
        });
      })
      .catch(err => {
        Notification.bubble({
          type: "error",
          content: errorHandler(err, true)
        });
      });
  };

  return (
    <div className="singleGames">
      <br />
      <div className="gridMain">
        <div className="left-nav">
          <section className="search-section">
            <div className="flex justify-between">
              <div className="flex align-center flex-1">
                <div className="search-box">
                  <Input
                    placeholder={"Search instances..."}
                    iconLeft={<AppIcon name="search" type="feather" />}
                    debounce={true}
                    debounceTimeout={500}
                    minLength={3}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
              </div>
              <div className="filter-box flex ">
                <Select
                  optionList={gameStatusSort}
                  placeholder="-- filter by --"
                  name="status"
                  onChange={e =>
                    genericChangeSingle(e, setQueryParams, queryParams)
                  }
                />
                <Select
                  optionList={timeSortOption}
                  placeholder="-- soft by --"
                  name="sort"
                  onChange={e =>
                    genericChangeSingle(e, setQueryParams, queryParams)
                  }
                />
              </div>
            </div>
          </section>
          <div className="instanceList">
            {fetching && (
              <>
                <Skeleton height={200} />
                <Skeleton height={200} />
                <Skeleton height={200} />
              </>
            )}
            {!fetching &&
              gameInstances.map((item, key) => (
                <div
                  key={key}
                  className="instanceCard"
                  onClick={() =>
                    props.history.push(`/instance/${item.id}/${item.label}`)
                  }
                >
                  <div>
                    <h3>{item.label}</h3>
                    <small>
                      created {moment(new Date(item.createdAt)).fromNow()}
                    </small>
                    <div>
                      <span className="info">start date:</span>
                      <span className="context">{item.startDate}</span>
                    </div>
                    <div>
                      <span className="info">end date:</span>
                      <span className="context">{item.endDate}</span>
                    </div>
                    <div className={`status active`} />
                  </div>
                  <div className="amount">N{numberWithCommas(item.amount)}</div>
                </div>
              ))}
          </div>
          <br />
          {!fetching && gameInstances.length > 0 && (
            <Pagination total={1} current={1} />
          )}
          {!fetching && gameInstances.length < 1 && (
            <Result
              title="We didn't find anything"
              subTitle="We could not find any game instance for your selected game. Is either you've not created an instance or your search conditions couldn't not be met"
            />
          )}
          <br />
          <br />
        </div>
        <div className="right-nav">
          <Affixed offset={50}>
            <>
              <Button
                color="success"
                block
                onClick={() =>
                  props.history.push(
                    `/games/create/${props.match.params.uuid}/${props.match.params.label}`
                  )
                }
              >
                Create Game Instance
              </Button>
              <br />
              <br />
              <div className="section-header">Quick Summary</div>
              <p />
              <SummaryCard type={"gamesplays"} total={"0"} />
              <SummaryCard type={"games"} total={"0"} />
              <SummaryCard type={"wins"} total={"0"} />
            </>
          </Affixed>
        </div>
      </div>
    </div>
  );
}

export default Games;
