import React from "react";
import home2 from "../../assets/activeRentals/home2.jpg";
import calendarSvg from "../../assets/activeRentals/calendar.svg";
export const RentCard = () => {
  return (
    <>
      <div
        className="property-image"
        style={{ background: `url(${home2})` }}
      ></div>
      <div className="property-details">
        <p>No. 74 Raymond Njoku St.</p>
        <div className="flex">
          <img src={calendarSvg} alt="calendar" className="calendar-svg" />
          <p>Expires in 3 months</p>
        </div>
      </div>
    </>
  );
};
