import React from "react";
import { numberWithCommas } from "../../utils/helper";
import { rentrightPercent } from "../../utils/data";

function CalculateFee(props) {
  const getAgencyGross = () => {
    if (!props.rentFee) return;
    let totalFee = parseFloat(props.rentFee.replace(/,/g, ""));
    if (props.agencyCommission.term_type === "percentage") {
      return (totalFee * props.agencyCommission.agency_fee) / 100;
    }
    return props.agencyCommission.agency_fee;
  };

  const getRentright = () => {
    let agency_fee = getAgencyGross();
    return (agency_fee * rentrightPercent) / 100;
  };

  const getTotalAgency = () => {
    let rrfee = getRentright();
    let agencyGross = getAgencyGross();
    return agencyGross - rrfee;
  };
  return (
    <div className="charge-container">
      <h4>Commission Breakdown</h4>
      <div className="flex align-center justify-between charge-item">
        <div className="title">Total Property Price</div>
        <div className="value">
          ₦ {props.rentFee ? numberWithCommas(props.rentFee) : 0}
        </div>
      </div>
      <div className="flex align-center justify-between charge-item">
        <div className="title">
          Gross Agent Commission{" "}
          {props.agencyCommission.term_type === "percentage" &&
            `(${props.agencyCommission.agency_fee}%)`}
        </div>
        <div className="value">
          ₦ {getAgencyGross() ? numberWithCommas(getAgencyGross()) : 0}
        </div>
      </div>
      <div className="flex align-center justify-between charge-item">
        <div className="title">
          RentRight Commission (25% less of Agency commission)
        </div>
        <div className="value">
          ₦ {getRentright() ? numberWithCommas(getRentright()) : 0}
        </div>
      </div>
      <div className="flex align-center justify-between charge-item">
        <div className="title">Net Agent Commission (Due to Agency)</div>
        <div className="value">
          ₦ {getTotalAgency() ? numberWithCommas(getTotalAgency()) : 0}
        </div>
      </div>
    </div>
  );
}

export default CalculateFee;
