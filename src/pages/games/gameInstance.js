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
  genericChangeSingle,
  getClientId,
  getToken,
  numberWithCommas
} from "../../utils/helper";
import { axiosHandler } from "../../utils/axiosHandler";
import { GAME_INSTANCE_URL } from "../../utils/urls";
import qs from "querystring";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import Result from "../../components/Result/result";
import { cleanParameters } from "../campaign/campaign";

function GameInstances(props) {
  const {
    dispatch,
    state: { activeClient }
  } = useContext(store);
  const [currentPage, setCurrentPage] = useState(1);
  const [queryParams, setQueryParams] = useState({});
  const [search, setSearch] = useState("");
  const [gameInstances, setGameInstance] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [pageInfo, setPageInfo] = useState(null);

  useEffect(() => {
    if (!props.embedded) {
      dispatch({
        type: setPageTitleAction,
        payload: props.match.params.label.toUpperCase()
      });
    }
  }, []);

  useEffect(() => {
    let extra = `page=${currentPage - 1}`;
    extra += `&${qs.stringify(cleanParameters(queryParams))}`;
    getInstance(extra);
  }, [search, queryParams, currentPage]);

  const getInstance = (extra = "") => {
    if (!activeClient) {
      props.history.push("/logout");
      return;
    }
    if (!fetching) {
      setFetching(true);
    }
    if (!props.embedded) {
      axiosHandler({
        method: "get",
        url: GAME_INSTANCE_URL + `?gameId=${props.match.params.uuid}`,
        clientID: getClientId(),
        token: getToken()
      }).then(res => {
        setGameInstance(res.data._embedded.gameInstances);
        setPageInfo(res.data.page);
        setFetching(false);
      });
    } else {
      axiosHandler({
        method: "get",
        url:
          GAME_INSTANCE_URL + `?clientId=${activeClient.id}&size=10&${extra}`,
        clientID: getClientId(),
        token: getToken()
      }).then(res => {
        setGameInstance(res.data._embedded.gameInstances);
        setPageInfo(res.data.page);
        setFetching(false);
      });
    }
  };

  return (
    <div className="singleGames">
      <br />
      <div className={`gridMain ${props.embedded ? "embedded" : ""}`}>
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
                  name="isActive"
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
                    <div
                      className={`status ${item.isActive ? "active" : ""}`}
                    />
                  </div>
                  <div className="amount">N{numberWithCommas(item.amount)}</div>
                </div>
              ))}
          </div>
          <br />

          {!fetching && gameInstances.length > 0 && (
            <Pagination
              counter={pageInfo.size}
              total={pageInfo.totalElements}
              current={currentPage}
              onChange={setCurrentPage}
            />
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
        {!props.embedded && (
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
        )}
      </div>
    </div>
  );
}

export default GameInstances;
