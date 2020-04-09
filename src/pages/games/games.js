import React, { useContext, useEffect } from "react";
import "./games.css";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import { Link } from "react-router-dom";

function Games(props) {
  const { dispatch } = useContext(store);

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Games" });
  }, []);
  return (
    <div className="games">
      <div className="grid grid-3 grid-gap-2">
        <Link to="/games/raffle">
          <div className="game-card">
            <div
              className="img-con"
              style={{
                backgroundImage: `url("https://secureservercdn.net/45.40.148.106/l8q.5a1.myftpupload.com/wp-content/uploads/2016/11/WednesdaySundayRaffles-500x321.jpg")`
              }}
            />
            <div className="flex column justify-between conMain">
              <div className="title">Raffle</div>
              <div className="flex align-center justify-between">
                <div>
                  <div className="info">Total GamePlays: &nbsp;</div>
                  <div className="context">5,000</div>
                </div>
                &nbsp; &nbsp; &nbsp; &nbsp;
                <div>
                  <div className="info">Total winnings: &nbsp;</div>
                  <div className="context">450</div>
                </div>
              </div>
            </div>
          </div>
        </Link>
        <Link to="/games/instant">
          <div className="game-card">
            <div
              className="img-con"
              style={{
                backgroundImage: `url("https://techcrunch.com/wp-content/uploads/2018/03/facebook-instant-games.jpg?w=730&crop=1")`
              }}
            />

            <div className="flex column justify-between conMain">
              <div className="title">Instant Draw</div>
              <div className="flex align-center justify-between">
                <div>
                  <div className="info">Total GamePlays: &nbsp;</div>
                  <div className="context">25,000</div>
                </div>
                &nbsp; &nbsp; &nbsp; &nbsp;
                <div>
                  <div className="info">Total winnings: &nbsp;</div>
                  <div className="context">1450</div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Games;
