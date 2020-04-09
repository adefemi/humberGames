import React, { useContext, useEffect, useState } from "react";
import "./createGame.css";
import { Notification } from "../../components/notification/Notification";
import FormGroup from "../../components/formGroup/formGroup";
import CurrencyInput from "../../components/currencyInput/currencyInput";
import { genericChangeSingle, getArrayCount } from "../../utils/helper";
import DatePicker from "../../components/DatePicker/datePicker";
import { Button } from "../../components/button/Button";
import AppIcon from "../../components/icons/Icon";
import Input from "../../components/input/Input";
import { Select } from "../../components/select/Select";
import { durationType, primaryColor, winningRules } from "../../utils/data";
import { Radio } from "../../components/radio/Radio";
import TimePicker from "../../components/timePicker/timePicker";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";

const CreateGame = props => {
  const [gameData, setGameData] = useState({});
  const [loading, setLoading] = useState(false);
  const [propertyType, setPropertyType] = useState("fixed");
  const [prices, setPrices] = useState([{}]);
  const [gameType, setGameType] = useState(props.match.params.uuid);

  const { dispatch } = useContext(store);

  useEffect(() => {
    dispatch({
      type: setPageTitleAction,
      payload: props.match.params.uuid.toUpperCase()
    });
  }, []);

  const remove = key => {
    setPrices(prices.filter((_, key2) => key2 !== key));
  };
  const change = (key, e) => {
    const activeCharge = prices.filter((item, index) => index === key)[0];
    activeCharge[e.target.name] = e.target.value;
    if (e.target.currency) activeCharge.currency_type = e.target.currency;
    if (e.target.rawValue) activeCharge[e.target.name] = e.target.rawValue;
    const newChargeList = prices.map((item, index) => {
      if (index === key) return activeCharge;
      return item;
    });

    setPrices(newChargeList);
  };

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      Notification.bubble({
        type: "success",
        content: "Game instance added successfully"
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="newGame">
      <div className="flex align-center">
        <div onClick={() => props.history.goBack()}>
          <AppIcon
            name="arrowLeft"
            type="icomoon"
            style={{ color: primaryColor, cursor: "pointer" }}
          />
        </div>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <h3>Create new Instance</h3>
      </div>
      <br />

      <form action="" onSubmit={onSubmit}>
        <FormGroup label="Game Name" className="max-width-600">
          <Input
            onChange={e => genericChangeSingle(e, setGameData, gameData)}
            value={gameData.gameName || ""}
            name={"gameName"}
            placeholder="Give game a name"
            required
          />
        </FormGroup>
        <FormGroup label="Cost Type">
          <div className="flex align-center">
            <Radio
              onChange={() => setPropertyType("fixed")}
              name="fixed"
              label="Fixed"
              checked={propertyType === "fixed"}
            />
            &nbsp; &nbsp; &nbsp; &nbsp;
            <Radio
              onChange={() => setPropertyType("computed")}
              name="computed"
              label="Computed"
              checked={propertyType === "computed"}
            />
          </div>
        </FormGroup>
        <br />
        <div className="grid grid-gap-2 grid-2">
          <FormGroup label="Total Operational Budget">
            <CurrencyInput
              onChange={e => genericChangeSingle(e, setGameData, gameData)}
              value={gameData.opBudget || 0}
              name={"opBudget"}
              required
              defaultCurrencyOption={{
                title: "NGN",
                value: "NGN"
              }}
            />
          </FormGroup>
          <FormGroup label={propertyType === "fixed" ? "Cost" : "Revenue"}>
            <CurrencyInput
              onChange={e => genericChangeSingle(e, setGameData, gameData)}
              value={gameData.cost || 0}
              name={"cost"}
              required
              defaultCurrencyOption={{
                title: "NGN",
                value: "NGN"
              }}
            />
          </FormGroup>
        </div>
        <br />
        <h3>Define your prizes</h3>
        <p />
        <div className="prices-lists">
          {prices.map((item, key) => (
            <PricesConfig
              onRemove={() => remove(key)}
              gameData={item}
              key={key}
              canShow={prices.length > 1}
              onChange={e => change(key, e)}
            />
          ))}
        </div>
        <p />
        <div className="flex justify-end">
          <div className="link" onClick={() => setPrices([...prices, {}])}>
            Add More Prizes
          </div>
        </div>
        <br />
        {gameType === "instant" && (
          <>
            <h3>Set EndDate</h3>
            <DatePicker id={1} />
          </>
        )}

        {gameType === "raffle" && (
          <>
            <h3>Set Game Duration</h3>
            <p />
            <div className="grid grid-3 grid-gap-2">
              <FormGroup label="Duration Type">
                <Select
                  onChange={e => genericChangeSingle(e, setGameData, gameData)}
                  value={gameData.duration || ""}
                  name={"duration"}
                  defaultOption={durationType[0]}
                  optionList={durationType}
                  required
                />
              </FormGroup>
              <FormGroup label="Start time">
                <TimePicker />
              </FormGroup>
              <FormGroup label="End time">
                <TimePicker />
              </FormGroup>
            </div>
            {(gameData.duration === "weekly" ||
              gameData.duration === "monthly") && (
              <div className="grid grid-3 grid-gap-2">
                <FormGroup label="Start Date">
                  <DatePicker
                    dateType={gameData.duration === "weekly" ? "week" : "date"}
                    id={2}
                  />
                </FormGroup>
                <FormGroup label="End Date">
                  <DatePicker
                    dateType={gameData.duration === "weekly" ? "week" : "date"}
                    id={3}
                  />
                </FormGroup>
              </div>
            )}
          </>
        )}
        <br />
        <br />
        <Button
          loading={loading}
          disabled={loading}
          type="submit"
          className="createButton"
        >
          Submit
        </Button>
      </form>
      <br />
      <br />
    </div>
  );
};

const PricesConfig = props => {
  return (
    <div className="prices-card">
      {props.canShow && (
        <div className="close" onClick={props.onRemove}>
          <AppIcon name="x" type="feather" />
        </div>
      )}
      <FormGroup label="Label">
        <Input
          name="label"
          onChange={props.onChange}
          value={props.gameData.label || ""}
          required
        />
      </FormGroup>
      <div className="grid grid-3 grid-gap-2">
        <FormGroup label="Amount">
          <CurrencyInput
            onChange={props.onChange}
            value={props.gameData.amount || 0}
            name={"amount"}
            required
            defaultCurrencyOption={{
              title: "NGN",
              value: "NGN"
            }}
          />
        </FormGroup>
        <FormGroup label="Winning Rule">
          <Select
            onChange={props.onChange}
            value={props.gameData.winningRule || ""}
            name={"winningRule"}
            placeholder="--select a winning rule--"
            optionList={winningRules}
            required
          />
        </FormGroup>
        <FormGroup label="Quantity">
          <Select
            onChange={props.onChange}
            value={props.gameData.quantity || ""}
            name={"quantity"}
            placeholder="--choose quantify--"
            optionList={getArrayCount({ start: 1, count: 20 }).map(item => {
              return {
                title: item,
                value: item
              };
            })}
            required
          />
        </FormGroup>
      </div>
    </div>
  );
};

export default CreateGame;
