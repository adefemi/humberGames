import React, { useContext, useEffect, useState } from "react";
import "./games.css";
import { store } from "../../stateManagement/store";
import { setGameType, setPageTitleAction } from "../../stateManagement/actions";
import { Link } from "react-router-dom";
import AppIcon from "../../components/icons/Icon";
import { Select } from "../../components/select/Select";
import { gameTypeSort, timeSortOption } from "../../utils/data";
import { genericChangeSingle, getClientId, getToken } from "../../utils/helper";
import Input from "../../components/input/Input";
import qs from "querystring";
import { axiosHandler } from "../../utils/axiosHandler";
import { GAME_URL } from "../../utils/urls";
import Skeleton from "react-loading-skeleton";
import Result from "../../components/Result/result";
import Pagination from "../../components/Pagination/pagination";

function Games(props) {
  const { dispatch } = useContext(store);
  const [currentPage, setCurrentPage] = useState(1);
  const [queryParams, setQueryParams] = useState({});
  const [search, setSearch] = useState("");
  const [games, setGames] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Games" });
  }, []);

  useEffect(() => {
    let extra = `page=${currentPage - 1}`;
    extra += `&${qs.stringify(queryParams)}`;
    getGames(extra);
  }, [search, queryParams, currentPage]);

  const getGames = (extra = "") => {
    if (!fetching) {
      setFetching(true);
    }

    axiosHandler({
      method: "get",
      url: GAME_URL + `?${extra}`,
      token: getToken(),
      clientID: getClientId()
    }).then(res => {
      setGames(res.data._embedded.games);
      setPageInfo(res.data.page);
      setFetching(false);
    });
  };

  const setGame = (link, game) => {
    dispatch({ type: setGameType, payload: game });
    props.history.push(link);
  };

  return (
    <div className="games">
      <br />
      <section className="search-section">
        <div className="flex justify-between">
          <div className="flex align-center flex-1">
            <div className="search-box">
              <Input
                placeholder={"Search games..."}
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
              optionList={gameTypeSort}
              placeholder="-- filter by --"
              name="mode"
              onChange={e => {
                let data = {
                  mode: e.target.value,
                  type: null
                };
                if (
                  e.target.value === "NUMBER" ||
                  e.target.value === "RAFFLE"
                ) {
                  data = {
                    type: e.target.value,
                    mode: null
                  };
                } else if (!e.target.value) {
                  data = {
                    type: null,
                    mode: null
                  };
                }
                setQueryParams({ ...queryParams, ...data });
              }}
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
      {!fetching && games.length < 1 && (
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
          games.length > 0 &&
          games.map((item, key) => {
            return (
              <div
                key={key}
                onClick={() =>
                  setGame(
                    `/games/${item.id}/${item.label}`,
                    item.type.toLowerCase()
                  )
                }
              >
                <div className="game-card">
                  <div
                    className="img-con"
                    style={{
                      backgroundImage: `url("${
                        item.type.toLowerCase() === "number"
                          ? "https://construct-static.com/images/v780/uploads/articleuploadobject/0/images/16795/starting-screen.fw.png"
                          : "https://image.shutterstock.com/image-vector/internet-raffle-roulette-fortune-banner-260nw-1377405632.jpg"
                      }")`
                    }}
                  />
                  <div className="flex column justify-between conMain">
                    <div className="title">{item.label}</div>
                    <div className="flex justify-between">
                      <div className="subTitle">
                        <div className="info">type:</div>
                        <div className="context">{item.type}</div>
                      </div>
                      <div className="subTitle">
                        <div className="info">mode:</div>
                        <div className="context">{item.mode}</div>
                      </div>
                    </div>
                    {/*<div className="flex align-center justify-between">*/}
                    {/*  <div>*/}
                    {/*    <div className="info">Total GamePlays: &nbsp;</div>*/}
                    {/*    <div className="context">5,000</div>*/}
                    {/*  </div>*/}
                    {/*  &nbsp; &nbsp; &nbsp; &nbsp;*/}
                    {/*  <div>*/}
                    {/*    <div className="info">Total winnings: &nbsp;</div>*/}
                    {/*    <div className="context">450</div>*/}
                    {/*  </div>*/}
                    {/*</div>*/}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <br />
      {!fetching && games.length > 0 && <Pagination total={1} current={1} />}
    </div>
  );
}

export default Games;
