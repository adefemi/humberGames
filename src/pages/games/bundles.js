import React, { useState, useEffect, useContext } from "react";
import Input from "../../components/input/Input";
import AppIcon from "../../components/icons/Icon";
import { Select } from "../../components/select/Select";
import { timeSortOption } from "../../utils/data";
import {
  genericChangeSingle,
  getClientId,
  getToken,
  numberWithCommas
} from "../../utils/helper";
import Result from "../../components/Result/result";
import Skeleton from "react-loading-skeleton";
import Pagination from "../../components/Pagination/pagination";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import qs from "querystring";
import { cleanParameters } from "../campaign/campaign";
import { axiosHandler } from "../../utils/axiosHandler";
import { GAME_BUNDLE_URL } from "../../utils/urls";
import Badge from "../../components/Badge/badge";
import moment from "moment";
import "./games.css";
import { Accordion } from "../../components/accordion/Accordion";
import { Link } from "react-router-dom";
import { Button } from "../../components/button/Button";

function Bundles(props) {
  const {
    dispatch,
    state: { activeClient }
  } = useContext(store);
  const [currentPage, setCurrentPage] = useState(1);
  const [queryParams, setQueryParams] = useState({});
  const [search, setSearch] = useState("");
  const [bundles, setBundles] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [activeBundle, setActiveBundle] = useState(null);

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Game Bundles" });
  }, []);

  useEffect(() => {
    if (!activeClient) return;
    let extra = `page=${currentPage - 1}`;
    extra += `&${qs.stringify(cleanParameters(queryParams))}`;
    getGameBundles(extra);
  }, [search, queryParams, currentPage, activeClient]);

  const getGameBundles = (extra = "") => {
    if (!fetching) {
      setFetching(true);
    }
    axiosHandler({
      method: "get",
      url: GAME_BUNDLE_URL + `?${extra}&size=6`,
      token: getToken(),
      clientID: getClientId()
    }).then(res => {
      setBundles(res.data._embedded.gameBundles);
      setPageInfo(res.data.page);
      setFetching(false);
    });
  };

  return (
    <div className="games">
      <br />
      <section className="search-section">
        <div className="flex justify-between">
          <div className="flex align-center flex-1">
            <div className="search-box">
              <Input
                placeholder={"Search game bundles..."}
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
            <Button onClick={() => props.history.push("/game-bundles/create")}>
              Create New Bundle
            </Button>
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
      {!fetching && bundles.length < 1 && (
        <>
          <br />
          <br />
          <Result
            title="Ops!, we didn't find anything"
            subTitle="It seems you have not been licensed any game yet, or your search conditions could not be met."
          />
        </>
      )}
      <div className="grid grid-3 grid-gap-2">
        {fetching ? (
          <>
            <Skeleton height={200} />
            <Skeleton height={200} />
          </>
        ) : (
          bundles.length > 0 &&
          bundles.map((item, key) => {
            return (
              <div key={key}>
                <div className="bundle-card">
                  <div className="top">
                    <Link to={`/game-bundle/${item.id}/${item.label}`}>
                      <h3>{item.label}</h3>
                    </Link>
                    <h2>N{numberWithCommas(item.amount)}</h2>
                    {item.desccription && <p>{item.desccription}</p>}
                  </div>

                  <div className="flex align-center justify-between bottom">
                    <div
                      className="flex align-center cursor-pointer"
                      onClick={() =>
                        activeBundle === key
                          ? setActiveBundle(null)
                          : setActiveBundle(key)
                      }
                    >
                      <div className="counter">
                        {item.gameInstanceIds.length}
                      </div>
                      <h4>Game Instances</h4>
                      <AppIcon name="chevronDown" type="feather" />
                    </div>
                    <small>
                      Created {moment(new Date(item.createdAt)).fromNow()}
                    </small>
                  </div>
                  <Accordion active={activeBundle === key}>
                    <div className="instance_list">
                      {item.gameInstanceIds.map((item, id) => (
                        <li key={id}>
                          <Link to={`/instance/${item}/Game Bundle`}>
                            {item}
                          </Link>{" "}
                        </li>
                      ))}
                    </div>
                  </Accordion>
                </div>
              </div>
            );
          })
        )}
      </div>
      <br />
      <br />
      {!fetching && bundles.length > 0 && (
        <Pagination
          counter={pageInfo.size}
          total={pageInfo.totalElements}
          current={currentPage}
          onChange={setCurrentPage}
        />
      )}
      <br />
      <br />
    </div>
  );
}

export default Bundles;
