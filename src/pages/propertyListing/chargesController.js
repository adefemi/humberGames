import React, { useEffect, useState } from "react";
import AppIcon from "../../components/icons/Icon";
import { Accordion } from "../../components/accordion/Accordion";
import FormGroup from "../../components/formGroup/formGroup";
import { Select } from "../../components/select/Select";
import CurrencyInput from "../../components/currencyInput/currencyInput";
import { axiosHandler } from "../../utils/axiosHandler";
import { CHARGES_LOOK_UP_URL } from "../../utils/urls";
import { durationSelector } from "../../utils/data";

function ChargesController(props) {
  const [otherCharge, setOtherCharge] = useState(false);
  const [chargesCount, setChargesCount] = useState([{}]);
  const [chargeList, setChargeList] = useState([]);
  const [chargeListArc, setChargeListArc] = useState([]);
  const [fetchingList, setFetchingList] = useState(true);

  useEffect(() => {
    setOtherCharge(true);
    getCharges();
    if (props.defaultCharges) {
      setChargesCount(props.defaultCharges);
    }
    return () => {
      setOtherCharge(false);
    };
  }, []);

  const getCharges = _ => {
    axiosHandler("get", CHARGES_LOOK_UP_URL).then(
      res => {
        const data = res.data.results.results.map(item => {
          return {
            title: item.name,
            value: item.name
          };
        });
        setChargeList(data);
        setChargeListArc(data);
        setFetchingList(false);
      },
      err => {}
    );
  };

  useEffect(() => {
    const newCharList = chargeListArc.filter(item => {
      let vet = true;
      for (let i = 0; i < chargesCount.length; i++) {
        if (chargesCount[i].fee_name === item.value) {
          vet = false;
          break;
        }
      }
      return vet;
    });
    setChargeList(newCharList);
    props.onChange(chargesCount);
  }, [chargesCount]);

  const onChangeCharges = (e, ind) => {
    const activeCharge = chargesCount.filter((item, index) => index === ind)[0];
    activeCharge[e.target.name] = e.target.value;
    if (e.target.currency) activeCharge.currency_type = e.target.currency;
    if (e.target.rawValue) activeCharge[e.target.name] = e.target.rawValue;
    const newChargeList = chargesCount.map((item, index) => {
      if (index === ind) return activeCharge;
      return item;
    });

    setChargesCount(newChargeList);
  };
  return (
    <Accordion active={otherCharge}>
      <br />
      {chargesCount.map((item, key) => (
        <ChargeMore
          key={key}
          showClose={chargesCount.length > 1}
          data={chargesCount[key]}
          onChange={e => onChangeCharges(e, key)}
          chargeList={chargeList}
          fetching={fetchingList}
          removeCharge={() =>
            setChargesCount(chargesCount.filter((_, id) => id !== key))
          }
        />
      ))}
      <br />
      <div className="flex align-center justify-between">
        <div />
        <div
          className="flex align-center add-more"
          onClick={() => setChargesCount([...chargesCount, {}])}
        >
          <AppIcon name="plusCircle" type="feather" /> &nbsp; Add More
        </div>
      </div>
    </Accordion>
  );
}

const ChargeMore = props => (
  <div className="more-charge-con">
    {props.showClose && (
      <div className="close" onClick={props.removeCharge}>
        <AppIcon name="ic_add_circle" type="md" />
      </div>
    )}
    <div className="grid grid-3 grid-gap">
      <FormGroup
        label="Fee type"
        subLabel="Choose the kind of fee to add to property"
      >
        <Select
          placeholder={
            props.fetching ? "loading charges..." : "--select charge type--"
          }
          fetching={props.fetching}
          name="fee_name"
          value={props.data.fee_name}
          onChange={props.onChange}
          optionList={props.chargeList}
        />
      </FormGroup>
      <FormGroup
        label="Fee price"
        subLabel="Choose how you want your rent to be paid."
      >
        <CurrencyInput
          name="amount"
          onChange={props.onChange}
          value={props.data.amount}
        />
      </FormGroup>
      <FormGroup
        label="Payment frequency"
        subLabel="Tell us how much this fee is"
      >
        <Select
          placeholder="--select duration--"
          name="duration"
          value={props.data.duration}
          onChange={props.onChange}
          optionList={durationSelector}
        />
      </FormGroup>
    </div>
    <p />
  </div>
);

export default ChargesController;
