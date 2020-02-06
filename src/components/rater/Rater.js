import React, { useState } from "react";
import propTypes from "prop-types";
import { Icon } from "../../common";
import "./Rater.css";
export default function Rater({ rate, total, size, changeable, getRate }) {
  const [rateState, changeRateState] = useState(rate);
  const changeRateStateAndCB = rate => {
    changeRateState(rate);
    getRate(rate);
  };
  const generateRating = () => {
    let rating = [];
    for (let i = 1; i <= total; i++) {
      rating.push(
        <div
          className="myRate"
          onClick={() => (changeable ? changeRateStateAndCB(i) : null)}
          key={i}
        >
          <Icon
            type="ionicons"
            name={"androidStar"}
            className={
              (rateState >= i ? "star-filled" : "star-unfilled") +
              " " +
              (changeable ? "cursor-pointer" : "")
            }
            size={size}
          />
        </div>
      );
    }

    return rating;
  };
  return <div className="Rater">{generateRating()}</div>;
}

Rater.propTypes = {
  rate: propTypes.number.isRequired,
  total: propTypes.number,
  size: propTypes.number,
  changeable: propTypes.bool
};

Rater.defaultProps = {
  total: 5,
  size: 24,
  rate: 0,
  getRate: () => null
};
