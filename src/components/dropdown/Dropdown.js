import React, { useState, useEffect } from "react";
import "./Dropdown.css";
import {
  hasClass,
  addClass,
  removeClass,
  randomIDGenerator
} from "../../utils/helper";
import { hasSomeParentTheClass } from "../../utils/helper";
import propTypes from "prop-types";

const proptypes = {
  dropDownWidth: propTypes.string,
  active: propTypes.any.isRequired,
  options: propTypes.arrayOf(propTypes.object).isRequired,
  onChange: propTypes.func.isRequired,
  staticContent: propTypes.bool,
  fixedContent: propTypes.bool,
  dropTrigger: propTypes.bool,
  setDropTrigger: propTypes.func
};

const DropDown = props => {
  const onCLickSet = option => {
    props.onChange(option);
    setActive(option.value);
  };

  const [active, setActive] = useState(props.active);

  const dropDownID = randomIDGenerator(10);
  const dropDownUlID = randomIDGenerator(10);

  const getActive = () => {
    const { options, staticContent } = props;

    if (staticContent) {
      return active;
    }

    let activeOption = options.filter(option => option.value === active)[0];
    return <div className="dropdown-content">{activeOption.content}</div>;
  };

  const getOptions = () => {
    const { options, staticContent } = props;
    const list = [];

    options.map((option, index) => {
      list.push(
        <li
          key={index}
          onClick={() => (!staticContent ? onCLickSet(option) : null)}
        >
          {option.content}
        </li>
      );
      return null;
    });
    return list;
  };

  useEffect(() => {
    if (props.dropTrigger) {
      hideDropDown(dropDownID);
      props.setDropTrigger(false);
    }
  }, [props.dropTrigger]);

  const showDropDown = id => {
    let el = document.getElementById(id);
    let overlay = el.getElementsByClassName("overlay-drop")[0];
    if (!hasClass(el, "open")) {
      addClass(el, "open");
      addClass(overlay, "open");
    } else {
      if (!props.fixedContent) {
        removeClass(el, "open");
        removeClass(overlay, "open");
      }
    }
  };

  const hideDropDown = id => {
    let el = document.getElementById(id);
    let overlay = el.getElementsByClassName("overlay-drop")[0];
    removeClass(el, "open");
    removeClass(overlay, "open");
  };

  useEffect(() => {
    document.body.onclick = removeDrop;
  });

  const removeDrop = e => {
    let dropDownCon = document.getElementsByClassName("dropdown-main");
    for (let i = 0; i < dropDownCon.length; i++) {
      let el = document.getElementById(dropDownCon[parseInt(i, 10)].id);
      if (
        hasClass(el, "open") &&
        !hasSomeParentTheClass(e.target, "dropdown-ul")
      ) {
        removeClass(el, "open");
      }
    }
  };

  return (
    <>
      <div
        id={dropDownID}
        onClick={() => !props.fixedContent && showDropDown(dropDownID)}
        className="dropdown-main"
      >
        <div
          className="overlay-drop"
          onClick={_ => props.fixedContent && hideDropDown(dropDownID)}
        />
        {props.static ? (
          <div className="dropdown-content">{props.children}</div>
        ) : props.fixedContent ? (
          <span onClick={() => props.fixedContent && showDropDown(dropDownID)}>
            {props.active}
          </span>
        ) : (
          getActive()
        )}

        <ul
          style={{ width: props.dropDownWidth }}
          id={dropDownUlID}
          className="dropdown-ul"
        >
          {props.fixedContent ? props.children : getOptions()}
        </ul>
      </div>
    </>
  );
};

DropDown.propTypes = proptypes;

DropDown.defaultProps = {
  dropDownWidth: "100px",
  staticContent: false,
  fixedContent: false
};

export { DropDown };
