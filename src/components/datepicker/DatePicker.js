import React, { Component } from "react";
import PropTypes from "prop-types";
import "react-dates/initialize";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "./DatePicker.css";

export class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: this.props.scheduleDate
        ? moment(new Date(this.props.scheduleDate))
        : null,
      calendarFocused: false
    };
  }

  onDateChange = newDate => {
    this.setState(
      {
        date:
          newDate && /^\d{2}\/\d{2}\/\d{4}$/.test(newDate.format("MM/DD/YYYY"))
            ? newDate
            : this.state.date
      },
      () =>
        this.state.date
          ? this.props.getDate(this.state.date.format("MM/DD/YYYY"))
          : null
    );
  };

  onFocusChange = () => {
    this.setState(state => ({
      calendarFocused: !state.calendarFocused
    }));
  };

  render() {
    return (
      <div className="DatePicker">
        <SingleDatePicker
          date={this.state.date}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={this.props.numberOfMonths}
          placeholder={this.props.placeholder}
          required={this.props.required}
          disabled={this.props.disabled}
        />
      </div>
    );
  }
}

DatePicker.propTypes = {
  date: PropTypes.object,
  getDate: PropTypes.func.isRequired,
  numberOfMonths: PropTypes.number,
  placeholder: PropTypes.string
};

DatePicker.defaultProps = {
  date: moment(),
  focused: false,
  numberOfMonths: 1,
  getDate: () => null
};
