import React from "react";
import PropTypes from "prop-types";

import "./Card.css";

const Card = props => {
  return (
    <div className={`card-main ${props.className}`} style={props.style}>
      {props.heading && <div className="card-heading">{props.heading}</div>}
      <div className="card-content">{props.children}</div>
    </div>
  );
};

Card.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string
};

Card.defaultProps = {
  style: {}
};

export default Card;
