import React, { useEffect, useState } from "react";
import FormGroup from "../../components/formGroup/formGroup";
import CurrencyInput from "../../components/currencyInput/currencyInput";
import Input from "../../components/input/Input";
import { Button } from "../../components/button/Button";
import { Select } from "../../components/select/Select";
import { durationSelector, maxPercent, minPercent } from "../../utils/data";
import cloneDeep from "lodash/cloneDeep";
import isEmpty from "lodash/isEmpty";
import { Notification } from "../../components/notification/Notification";
import { axiosHandler } from "../../utils/axiosHandler";
import { LEASE_URL } from "../../utils/urls";
import { getToken, numberWithCommas } from "../../utils/helper";
import TransactionTable from "../../components/transactionTable/transactionTable";
import { element } from "prop-types";

function LeaseTerm(props) {
  const [selectMinLease, setSelectedMinLease] = useState(null);
  const [leaseFee, setLeaseFee] = useState([]);
  const [leaseInfo, setLeaseInfo] = useState({});
  const [unitInfo, setUnitInfo] = useState({});
  const [application, setApplication] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.lease) {
      let tempLease = cloneDeep(props.lease);
      if (props.create) {
        setLeaseFee(formatLeaseFee(props.lease.fees));
        setApplication(props.lease.application);
        setSelectedMinLease(props.lease.tenure);
        delete tempLease.application;
        delete tempLease.fees;
        delete tempLease.templates;
        setLeaseInfo({
          ...tempLease
        });
        setUnitInfo(props.lease.application.unit);
      } else {
        setLeaseFee(formatLeaseFee(props.lease.lease_fees));
        setSelectedMinLease(props.lease.tenure);
        setApplication(props.lease.application);
        delete tempLease.application;
        delete tempLease.lease_fees;
        delete tempLease.lease_charges;
        delete tempLease.signatures;
        delete tempLease.templates;
        setLeaseInfo(tempLease);
        setUnitInfo(props.lease.application.unit);
      }
    }
  }, [props.lease]);

  const titleExistInArray = (title, arr) => {
    let status = false;
    for (let i = 0; i < arr.length; i++) {
      let tempName = arr[i].fee_title.replace(/ /g, "").toLowerCase();
      let name = title.replace(/ /g, "").toLowerCase();
      if (tempName === name) {
        status = true;
        break;
      }
    }
    return status;
  };

  const formatLeaseFee = lease_fees => {
    const fees = [];
    lease_fees.map(item => {
      let tempName = item.fee_title.replace(/ /g, "").toLowerCase();
      if (
        tempName !== "rentalfee" &&
        tempName !== "salefee" &&
        tempName !== "unitcharge"
      ) {
        if (!titleExistInArray(item.fee_title, fees)) {
          fees.push({
            fee_title: item.fee_title,
            currency_type: item.currency_type,
            duration: item.duration,
            duration_type: item.duration_type,
            amount: item.amount,
            showChargeType: tempName !== "agencyfee"
          });
        }
      }

      return null;
    });
    return fees;
  };

  const onChange = e => {
    let newData = {
      ...leaseInfo,
      [e.target.name]: e.target.value
    };
    if (e.target.currency) {
      newData[e.target.currency_name] = e.target.currency;
    }
    setLeaseInfo(newData);
  };
  const onChangeFee = (id, e) => {
    const feeList = [];
    leaseFee.map((item, ind) => {
      if (id === ind) {
        let newData = {
          ...item,
          [e.target.name]: e.target.value
        };
        if (e.target.currency) {
          newData[e.target.currency_name] = e.target.currency;
        }
        feeList.push(newData);
      } else {
        feeList.push(item);
      }
      return null;
    });
    setLeaseFee(feeList);
  };

  const validateDate = dateTime => {
    try {
      let dateVal = new Date(dateTime);
      return dateVal.toISOString().split("T")[0];
    } catch (e) {
      return new Date().toISOString().slice(0, 10);
    }
  };

  const verifyAgencyPrice = agencyFee => {
    let status = true;
    let totalFee = parseFloat(leaseInfo.amount);
    // cal max% of total fee
    let maxPercentValue = (totalFee * maxPercent) / 100;
    let minPercentValue = (totalFee * minPercent) / 100;

    if (parseFloat(agencyFee) > maxPercentValue) {
      Notification.bubble({
        type: "error",
        content: `You price is more than the allowed price percent of ${maxPercent}%`
      });
      status = false;
    } else if (parseFloat(agencyFee) < minPercentValue) {
      Notification.bubble({
        type: "error",
        content: `You price is less than the allowed price percent of ${minPercent}%`
      });
      status = false;
    }

    return status;
  };

  const Submit = e => {
    e.preventDefault();
    const data = {
      ...leaseInfo,
      tenure: selectMinLease,
      lease_fees: leaseFee,
      application_id: application.id
    };
    let agencyFee = leaseFee.filter(item => {
      let tempName = item.fee_title.replace(/ /g, "").toLowerCase();
      return tempName === "agencyfee";
    })[0];
    if (!verifyAgencyPrice(agencyFee.amount)) return;
    setLoading(true);
    axiosHandler("post", LEASE_URL, getToken(), data).then(
      res => {
        Notification.bubble({
          type: "success",
          content: "Lease updated successfully"
        });
        setLoading(false);
        props.history.replace(
          `/leases/${res.data.results.uuid}_${res.data.results.id}`
        );
      },
      err => {
        Notification.bubble({
          type: "error",
          content: "Ops!, an error occurred"
        });
        setLoading(false);
      }
    );
  };

  const formatTable = fee => {
    let newList = [];
    fee.map(item => {
      newList.push([
        item.fee_title,
        `${item.currency_type}${numberWithCommas(item.amount)}`,
        item.duration_type
      ]);
      return null;
    });
    return newList;
  };

  if (isEmpty(unitInfo)) {
    return <div />;
  }

  return (
    <div className="lease-card lease-term">
      <div className="flex justify-between top">
        <h4>Premise</h4>
        <p>
          {unitInfo.title}, {unitInfo.property.title} <br />
          {unitInfo.property.address_info.address} <br />
          {unitInfo.property.address_info.city}, <br />
          {unitInfo.property.address_info.state},{" "}
          {unitInfo.property.address_info.country}
        </p>
      </div>
      {props.mode === 0 && (
        <form className="body" onSubmit={Submit}>
          <h3>Lease Term</h3>
          <FormGroup label="Lease Price">
            <CurrencyInput
              onChange={e =>
                onChange({
                  target: {
                    name: "amount",
                    value: e.target.rawValue,
                    currency: e.target.currency,
                    currency_name: "currency_type"
                  }
                })
              }
              value={leaseInfo.amount || ""}
            />
          </FormGroup>
          <div className="grid grid-2 grid-gap">
            <FormGroup
              label="Lease start date"
              subLabel="When is your lease starting"
            >
              <Input
                type="date"
                onChange={onChange}
                name="start_period"
                value={validateDate(leaseInfo.start_period)}
              />
            </FormGroup>
            <FormGroup
              label="Rent type"
              subLabel="specify your lease frequency"
            >
              <Select
                optionList={durationSelector}
                defaultOption={{
                  title: leaseInfo.tenure_type || "yearly",
                  value: leaseInfo.tenure_type || "yearly"
                }}
                name="tenure_type"
                onChange={onChange}
              />
            </FormGroup>
          </div>
          <FormGroup
            label="Whats the minimum lease?"
            subLabel="Tell us the minimum time a tenant must be willing to take this property"
          >
            <div className="flex align-center lease-count-list">
              {[1, 2, 3, 4, 5].map((item, key) => (
                <Button
                  onClick={() => setSelectedMinLease(item)}
                  className={selectMinLease === item ? "selected" : ""}
                  key={key}
                  id={key}
                >
                  {item}
                </Button>
              ))}
              <Input
                type="number"
                placeholder="Custom count, eg. 25"
                value={selectMinLease || ""}
                onChange={e => setSelectedMinLease(e.target.value)}
              />
            </div>
          </FormGroup>

          <br />
          <h3>Other Charges</h3>
          <div>
            {leaseFee.map((item, id) => {
              return (
                <div key={id} className="grid grid-auto grid-lease-charge">
                  <FormGroup label="Fee title">
                    <Input
                      name="fee_title"
                      value={item.fee_title}
                      onChange={e => onChangeFee(id, e)}
                      disabled
                    />
                  </FormGroup>
                  <FormGroup label="Amount">
                    <CurrencyInput
                      onChange={e =>
                        onChangeFee(id, {
                          target: {
                            name: "amount",
                            value: e.target.rawValue
                          }
                        })
                      }
                      value={item.amount || ""}
                    />
                  </FormGroup>
                  {item.showChargeType && (
                    <FormGroup label="Charge type">
                      <Select
                        optionList={durationSelector}
                        defaultOption={{
                          title: item.duration_type || "yearly",
                          value: item.duration_type || "yearly"
                        }}
                        name="duration_type"
                        onChange={e => onChangeFee(id, e)}
                      />
                    </FormGroup>
                  )}
                </div>
              );
            })}
          </div>

          <br />
          <Button
            type="submit"
            color="primary"
            loading={loading}
            disabled={loading}
          >
            Update Term
          </Button>
          <br />
        </form>
      )}
      {props.mode === 1 && (
        <div className="flex column align-center">
          <br />
          <h3>Terms</h3>
          <div className="term-con">
            <div className="flex align-center justify-between">
              <div className="info">Lease Starts</div>
              <div className="content">
                {validateDate(leaseInfo.start_period)}
              </div>
            </div>
            <div className="flex align-center justify-between">
              <div className="info">Rent Fee</div>
              <div className="content">
                {leaseInfo.currency_type}
                {numberWithCommas(leaseInfo.amount)}
              </div>
            </div>
            <div className="flex align-center justify-between">
              <div className="info">Rent Type</div>
              <div className="content">{leaseInfo.tenure_type}</div>
            </div>
            <div className="flex align-center justify-between">
              <div className="info">Lease Tenure</div>
              <div className="content">{selectMinLease}</div>
            </div>
          </div>
          <br />
          <br />
          <h3>Other Charges</h3>
          <div className="charge-table">
            <TransactionTable
              values={formatTable(leaseFee)}
              keys={["Type", "Price", "Frequency"]}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default LeaseTerm;
