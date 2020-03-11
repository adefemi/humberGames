import React, { useEffect, useState } from "react";
import AppIcon from "../../components/icons/Icon";
import FormGroup from "../../components/formGroup/formGroup";
import Input from "../../components/input/Input";
import { Select } from "../../components/select/Select";
import CurrencyInput from "../../components/currencyInput/currencyInput";
import { Button } from "../../components/button/Button";
import { Radio } from "../../components/radio/Radio";
import infoIcon from "../../assets/images/cloud-info.svg";
import SelectInput from "../../components/selectInput/selectInput";
import { Accordion } from "../../components/accordion/Accordion";
import {
  durationSelector,
  maxPercent,
  minPercent,
  primaryColor
} from "../../utils/data";
import ChargesController from "./chargesController";
import { Notification } from "../../components/notification/Notification";
import CalculateFee from "./calculateFee";
import { axiosHandler } from "../../utils/axiosHandler";
import {
  GENERIC_FEE_URL,
  UNIT_COMMISSION_URL,
  UNIT_CONTROLLER_URL,
  UNIT_TERM_URL
} from "../../utils/urls";
import { Spinner } from "../../components/spinner/Spinner";
import { getToken } from "../../utils/helper";

function PropertyTerm(props) {
  const getUnitId = () => {
    let pathList = props.match.params.uuid.split("_");
    return pathList[pathList.length - 1];
  };
  const [fetching, setFetching] = useState(true);
  const [activeUnit, setActiveUnit] = useState(null);
  const [selectMinLease, setSelectedMinLease] = useState(null);
  const [chargeShow, setChargeShow] = useState(true);
  const [canAddCharges, setCanAddCharges] = useState(false);
  const [loading, setLoading] = useState(false);
  const [propertyTerm, setPropertyTerm] = useState({});
  const [charges, setCharges] = useState([]);
  const [showNext, setShowNext] = useState(0);
  const unit_id = getUnitId();
  const [agencyCommission, setAgencyCommission] = useState({
    term_type: "percentage"
  });

  const getActiveUnit = () => {
    axiosHandler("get", UNIT_CONTROLLER_URL + `/${unit_id}`, getToken()).then(
      res => {
        setActiveUnit(res.data.results);
        console.log(res.data.results);
        setFetching(false);
      },
      err => {
        Notification.bubble({
          type: "error",
          content: "Ops!, and error occurred while fetching unit..."
        });
      }
    );
  };

  const checkTerms = _ => {
    if (activeUnit.category === "rental") {
      if (selectMinLease && propertyTerm.amount && propertyTerm.tenure_type) {
        setShowNext(1);
      } else {
        Notification.bubble({
          type: "info",
          content: "You need to define the basic term first!"
        });
      }
    } else {
      if (propertyTerm.amount) {
        setShowNext(1);
      } else {
        Notification.bubble({
          type: "info",
          content: "You need to enter your sale amount"
        });
      }
    }
  };
  const genericChange = e => {
    let data = {
      [e.target.name]: e.target.value
    };
    if (e.target.currency) data.currency_type = e.target.currency;
    if (e.target.rawValue) data[e.target.name] = e.target.rawValue;
    setPropertyTerm({ ...propertyTerm, ...data });
  };

  const checkCharges = () => {
    let canProceed = true;
    if (canAddCharges) {
      charges.map((item, index) => {
        if (!item.fee_name || !item.amount || !item.duration) {
          canProceed = false;
        }
      });
    }
    if (canProceed) {
      setShowNext(2);
    }
  };

  const proceedControl = e => {
    if (showNext === 0) {
      checkTerms();
    } else if (showNext === 1) {
      checkCharges();
    } else if (showNext === 2) {
      if (!checkAgencyFee()) return;
      let newPropTerm = {
        ...propertyTerm,
        tenure: selectMinLease | 0,
        unit_id
      };
      let newCommissionData = {
        commission_type: agencyCommission.term_type,
        category: "main",
        value: agencyCommission.agency_fee,
        commission_fee: propertyTerm.currency_type,
        agent_id: 44,
        unit_id
      };
      let newFeeData = formatChargesData(charges);
      setLoading(true);
      Promise.all([
        axiosHandler("post", UNIT_TERM_URL, getToken(), newPropTerm),
        axiosHandler(
          "post",
          UNIT_COMMISSION_URL,
          getToken(),
          newCommissionData
        ),
        axiosHandler("post", GENERIC_FEE_URL, getToken(), newFeeData)
      ])
        .then(values => {
          props.history.push(props.location.pathname + "?stage=2");
        })
        .catch(err => {
          Notification.bubble({
            type: "error",
            content: "Ops, an error occurred."
          });
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (showNext === 1) {
      setTimeout(() => {
        try {
          document
            .getElementById("section1")
            .scrollIntoView({ behavior: "smooth" });
        } catch (e) {}
      }, 500);
    } else if (showNext === 2) {
      setTimeout(() => {
        try {
          document
            .getElementById("section2")
            .scrollIntoView({ behavior: "smooth" });
        } catch (e) {}
      }, 500);
    }
  }, [showNext]);

  const formatChargesData = data => {
    let newList = [];
    data.map(item => {
      newList.push({
        identifier_id: unit_id,
        identifier_type: "unit",
        fee_title: item.fee_name,
        amount: item.amount,
        currency_type: item.currency_type,
        duration: 0,
        duration_type: item.duration === "one_off" ? "daily" : item.duration,
        can_recur: item.duration !== "one_off"
      });
      return null;
    });
    return newList;
  };

  const onAgencyFee = e => {
    if (!e[0].target) return;
    setAgencyCommission({
      term_type: e[1].target.value,
      agency_fee:
        e[1].target.value === "percentage"
          ? e[0].target.value
          : e[0].target.rawValue
    });
  };

  const checkAgencyFee = e => {
    let status = true;
    if (agencyCommission.term_type === "percentage") {
      if (parseFloat(agencyCommission.agency_fee) > maxPercent) {
        Notification.bubble({
          type: "error",
          content: `You percentage is more than the allowed ${maxPercent}%`
        });
        status = false;
      } else if (parseFloat(agencyCommission.agency_fee) < minPercent) {
        Notification.bubble({
          type: "error",
          content: `You percentage is less than the allowed ${minPercent}%`
        });
        status = false;
      }
    } else {
      let totalFee = parseFloat(propertyTerm.amount.replace(/,/g, ""));
      // cal max% of total fee
      let maxPercentValue = (totalFee * maxPercent) / 100;
      let minPercentValue = (totalFee * minPercent) / 100;

      if (parseFloat(agencyCommission.agency_fee) > maxPercentValue) {
        Notification.bubble({
          type: "error",
          content: `You price is more than the allowed price percent of ${maxPercent}%`
        });
        status = false;
      } else if (parseFloat(agencyCommission.agency_fee) < minPercentValue) {
        Notification.bubble({
          type: "error",
          content: `You price is less than the allowed price percent of ${minPercent}%`
        });
        status = false;
      }
    }
    return status;
  };

  useEffect(() => {
    getActiveUnit();
  }, []);

  if (fetching) {
    return (
      <>
        <br />
        <Spinner size={15} color={primaryColor} />
      </>
    );
  }

  return (
    <div className="term-info-container">
      <div
        className="questions flex align-center"
        data-aos="slide-right"
        data-aos-delay="200"
      >
        Tell us what your property fee will be like!&nbsp;
        <AppIcon name="checkCircle" className="check" type="feather" />
      </div>
      <div id="snchor" />
      <br />
      <div className="grid grid-2 grid-gap">
        <div data-aos="fade-up" data-aos-delay="300">
          <FormGroup
            label={`Whats your ${
              activeUnit.category === "rental" ? "rent" : "sale"
            } fee?`}
            subLabel={`Tell us how much you want to ${
              activeUnit.category === "rental" ? "rent" : "sell"
            } this property...`}
          >
            <CurrencyInput
              onChange={genericChange}
              value={propertyTerm.amount || 0}
              name="amount"
            />
          </FormGroup>
        </div>
        {activeUnit.category === "rental" && (
          <div data-aos="fade-up" data-aos-delay="500">
            <FormGroup
              label="Whats the fee duration?"
              subLabel="Choose how long the rent fee  covers."
            >
              <Select
                placeholder="--select duration--"
                name="tenure_type"
                onChange={genericChange}
                optionList={durationSelector}
              />
            </FormGroup>
          </div>
        )}
      </div>
      <p />
      {activeUnit.category === "rental" && (
        <div data-aos="fade-up" data-aos-delay="700">
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
        </div>
      )}

      <br />
      {showNext > 0 && (
        <div className="questions flex align-center other-charge">
          Is there other charges for this property?&nbsp;
          <div className="radio-group">
            <Radio
              checked={canAddCharges}
              onChange={() => setCanAddCharges(true)}
              name="propertyCategory"
              label="Yes"
            />
            <Radio
              checked={!canAddCharges}
              onChange={() => setCanAddCharges(false)}
              name="propertyCategory"
              label="No"
            />
          </div>
        </div>
      )}

      {canAddCharges && (
        <>
          <ChargesController onChange={e => setCharges(e)} />
          <div id="section2" />
        </>
      )}

      {showNext > 1 && (
        <>
          <div
            className="banner"
            className="banner"
            data-aos="zoom-in-down"
            data-aos-anchor="snchor"
          >
            <img src={infoIcon} alt="" />
            <div className="context">
              <h4>Sharing and commission!</h4>
              <p>
                Enter your commission rate and we would calculate the sharing.
              </p>
            </div>
          </div>
          <br />
          <div className="grid grid-2 grid-gap">
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-anchor="snchor"
            >
              <FormGroup
                label="Commission"
                subLabel="You can enter your commission here, You can use flat rate or percentage.s"
              >
                <SelectInput
                  defaultOption={{
                    title: "Percentage (%)",
                    value: "percentage"
                  }}
                  minWidth={150}
                  selectName="term_type"
                  name="agency_fee"
                  type="number"
                  value={agencyCommission.value}
                  onChange={onAgencyFee}
                  isCurrency={agencyCommission.term_type !== "percentage"}
                  hideCurrency={true}
                  optionList={[
                    { title: "Percentage (%)", value: "percentage" },
                    { title: "Flat Rate", value: "flat_rate" }
                  ]}
                />
              </FormGroup>
            </div>
            <div
              className="charge-info"
              data-aos="fade-up"
              data-aos-delay="500"
              data-aos-anchor="snchor"
            >
              <small onClick={() => setChargeShow(!chargeShow)}>
                Sharing Breakdown &nbsp;{" "}
                <AppIcon
                  name={chargeShow ? "ic_arrow_drop_up" : "ic_arrow_drop_down"}
                  type="md"
                />{" "}
              </small>
              <Accordion active={chargeShow} speed={300}>
                <CalculateFee
                  rentFee={propertyTerm.amount}
                  agencyCommission={agencyCommission}
                />
              </Accordion>
            </div>
          </div>
          <div id="section2" />
        </>
      )}

      {loading ? (
        <div className="loading-bar">
          <br />
          <Spinner />
        </div>
      ) : (
        <div className="proceed" onClick={proceedControl}>
          Proceed &nbsp; <AppIcon name="ic_trending_flat" type="md" />
        </div>
      )}

      <br />
      <br />
    </div>
  );
}

export default PropertyTerm;
