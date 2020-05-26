import React, { useEffect, useState } from "react";
import calenderSvg from "./assets/timePicker.png";
import "./timePicker.css";
import proptype from "prop-types";
import { Select } from "../select/Select";
import { getArrayCount } from "../../utils/helper";
import moment from "moment";

function TimePicker(props) {
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [section, setSection] = useState("PM");

  useEffect(() => {
    if (props.defaultValue) {
      const time = moment(props.defaultValue, "HH:mm:ss")
        .format("hh:mm:a")
        .split(":");
      setHour(time[0]);
      setMinute(time[1]);
      setSection(time[2].toUpperCase());
    }
  }, []);

  useEffect(() => {
    if (hour && minute) {
      if (props.onChange) {
        props.onChange({
          target: {
            name: props.name || "",
            value: props.use24H
              ? moment(formatTime(), "HH:mm a").format("HH:mm:ss")
              : formatTime()
          }
        });
      }
    }
  }, [hour, minute, section]);

  const formatTime = () => {
    return `${hour.length < 2 ? `0${hour}` : hour}:${
      minute.length < 2 ? `0${minute}` : minute
    } ${section}`;
  };

  const getHour = () => {
    const retVal = [];
    getArrayCount({ start: 1, count: 13, includePlus: false }).map(item => {
      retVal.push({
        title: item,
        value: item
      });
      return null;
    });
    return retVal;
  };
  const getMinute = () => {
    const retVal = [];
    getArrayCount({ start: 1, count: 61, includePlus: false }).map(item => {
      retVal.push({
        title: item,
        value: item
      });
      return null;
    });
    return retVal;
  };

  const getTimeSection = () => {
    return [{ title: "PM", value: "PM" }, { title: "AM", value: "AM" }];
  };

  return (
    <div className="adx-timepicker">
      <div className="input-field">
        <Select
          value={hour}
          optionList={getHour()}
          onChange={e => setHour(e.target.value)}
          placeholder="Hour"
        />
        <Select
          value={minute}
          optionList={getMinute()}
          onChange={e => setMinute(e.target.value)}
          placeholder="Minute"
        />
        <Select
          optionList={getTimeSection()}
          value={section}
          onChange={e => setSection(e.target.value)}
        />
      </div>

      {!props.use24H && (
        <>
          {hour && minute && <div className="timeFormat">{formatTime()}</div>}
        </>
      )}
    </div>
  );
}

TimePicker.defaultProps = {};

TimePicker.propType = {
  defaultValue: proptype.string,
  onChange: proptype.func,
  use24H: proptype.bool
};

export default TimePicker;
