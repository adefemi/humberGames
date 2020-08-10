import React, { useContext, useEffect, useState } from "react";
import "./games.css";
import { store } from "../../stateManagement/store";
import { setGameType, setPageTitleAction } from "../../stateManagement/actions";
import AppIcon from "../../components/icons/Icon";
import { Select } from "../../components/select/Select";
import { gameTypeSort, timeSortOption } from "../../utils/data";
import { genericChangeSingle, getClientId, getToken } from "../../utils/helper";
import Input from "../../components/input/Input";
import qs from "querystring";
import { axiosHandler } from "../../utils/axiosHandler";
import { GAME_LICENSE_URL } from "../../utils/urls";
import Skeleton from "react-loading-skeleton";
import Result from "../../components/Result/result";
import Pagination from "../../components/Pagination/pagination";
import GameInstances from "./gameInstance";
import { cleanParameters } from "../campaign/campaign";

function Games(props) {
  const {
    dispatch,
    state: { activeClient }
  } = useContext(store);
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
    if (!activeClient) return;
    let extra = `page=${currentPage - 1}`;
    extra += `&${qs.stringify(cleanParameters(queryParams))}`;
    getGames(extra);
  }, [search, queryParams, currentPage, activeClient]);

  const getGames = (extra = "") => {
    if (!fetching) {
      setFetching(true);
    }
    axiosHandler({
      method: "get",
      url:
        GAME_LICENSE_URL +
        `?projection=licenseWithGame&${extra}&clientId=${getClientId()}&size=3&sort=createdAt,desc`,
      token: getToken(),
      clientID: getClientId()
    }).then(res => {
      setGames(formatGames(res.data._embedded.gameLicenses));
      setPageInfo(res.data.page);
      setFetching(false);
    });
  };

  const formatGames = license => {
    const result = [];
    license.map(item => {
      result.push(item.game);
      return null;
    });
    return result;
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
                {console.log(item.type)}
                <div className="game-card">
                  <div
                    className="img-con"
                    style={{
                      backgroundImage: `url("${
                        item.type.toLowerCase() === "number"
                          ? "https://construct-static.com/images/v780/uploads/articleuploadobject/0/images/16795/starting-screen.fw.png"
                          : item.type.toLowerCase() === "instant_draw"
                          ? "https://images.ctfassets.net/d6o62jwe1jlr/5VCRTLLJTSD35aDtC4XVAq/64766b1d9ad9fec6669807ab21161198/438x274_GamesLobby_GameTile_321Draw_Responsive_OnSiteCRM.jpg"
                          : "https://image.shutterstock.com/image-vector/internet-raffle-roulette-fortune-banner-260nw-1377405632.jpg"
                      }")`
                    }}
                  />
                  <div className="flex column justify-between conMain">
                    <div className="title">{item.label}</div>
                    <div>
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
      {!fetching && games.length > 0 && (
        <Pagination
          counter={pageInfo.size}
          total={pageInfo.totalElements}
          current={currentPage}
          onChange={setCurrentPage}
        />
      )}
      <br />
      <br />
      <h3>Game Instances</h3>
      <GameInstances {...props} embedded />
    </div>
  );
}

export default Games;
