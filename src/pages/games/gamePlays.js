import React, { useContext, useEffect, useState } from "react";
import "./games.css";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import Affixed from "../../components/Affixed/affixed";
import SummaryCard from "../../components/property/SummaryCard";
import Input from "../../components/input/Input";
import AppIcon from "../../components/icons/Icon";
import { Select } from "../../components/select/Select";
import { statusMode, winningRules } from "../../utils/data";
import TransactionTable from "../../components/transactionTable/transactionTable";
import { Paginator } from "../../components/paginator/paginator";
import { Button } from "../../components/button/Button";
import ContentModal from "../../components/contentModal/contentModal";
import FormGroup from "../../components/formGroup/formGroup";
import CurrencyInput from "../../components/currencyInput/currencyInput";
import { genericChangeSingle } from "../../utils/helper";
import { TextAreaField } from "../../components/textarea/TextAreaField";
import DatePicker from "../../components/DatePicker/datePicker";
import { Notification } from "../../components/notification/Notification";
import { Link } from "react-router-dom";

function Games(props) {
  const headings = ["ID", "Cost", "Status", "EndDate", ""];
  const data = [
    [
      "001",
      "NGN 2000",
      "active",
      "20-02-2020",
      <Link to={`/games/${props.match.params.uuid}/gameplays`} className="link">
        GamePlays
      </Link>
    ],
    [
      "002",
      "NGN 4000",
      "inactive",
      "20-02-2020",
      <Link to={`/games/${props.match.params.uuid}/gameplays`} className="link">
        GamePlays
      </Link>
    ],
    [
      "003",
      "NGN 6000",
      "inactive",
      "20-02-2020",
      <Link to={`/games/${props.match.params.uuid}/gameplays`} className="link">
        GamePlays
      </Link>
    ],
    [
      "004",
      "NGN 2000",
      "active",
      "20-02-2020",
      <Link to={`/games/${props.match.params.uuid}/gameplays`} className="link">
        GamePlays
      </Link>
    ],
    [
      "005",
      "NGN 2000",
      "inactive",
      "20-02-2020",
      <Link to={`/games/${props.match.params.uuid}/gameplays`} className="link">
        GamePlays
      </Link>
    ],
    [
      "006",
      "NGN 2000",
      "active",
      "20-02-2020",
      <Link to={`/games/${props.match.params.uuid}/gameplays`} className="link">
        GamePlays
      </Link>
    ],
    [
      "007",
      "NGN 2000",
      "active",
      "20-02-2020",
      <Link to={`/games/${props.match.params.uuid}/gameplays`} className="link">
        GamePlays
      </Link>
    ],
    [
      "008",
      "NGN 5000",
      "inactive",
      "20-02-2020",
      <Link to={`/games/${props.match.params.uuid}/gameplays`} className="link">
        GamePlays
      </Link>
    ],
    [
      "009",
      "NGN 10000",
      "active",
      "20-02-2020",
      <Link to={`/games/${props.match.params.uuid}/gameplays`} className="link">
        GamePlays
      </Link>
    ],
    [
      "0010",
      "NGN 1000",
      "active",
      "20-02-2020",
      <Link to={`/games/${props.match.params.uuid}/gameplays`} className="link">
        GamePlays
      </Link>
    ],
    [
      "0011",
      "NGN 20000",
      "active",
      "20-02-2020",
      <Link to={`/games/${props.match.params.uuid}/gameplays`} className="link">
        GamePlays
      </Link>
    ],
    [
      "0012",
      "NGN 2000",
      "active",
      "20-02-2020",
      <Link to={`/games/${props.match.params.uuid}/gameplays`} className="link">
        GamePlays
      </Link>
    ]
  ];
  const { dispatch } = useContext(store);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch({
      type: setPageTitleAction,
      payload: props.match.params.uuid.toUpperCase()
    });
  }, []);
  return (
    <div className="singleGames">
      <br />
      <div className="gridMain">
        <div className="left-nav">
          <div className="flex align-center justify-between">
            <div>
              <div className="lease-search-box">
                <Input
                  placeholder="Search ID"
                  iconRight={<AppIcon name="search" type="feather" />}
                />
              </div>
            </div>
            <div className="flex align-center props">
              &nbsp;
              <Select
                className="lease-search-box"
                defaultOption={statusMode[0]}
                optionList={statusMode}
              />
            </div>
          </div>
          <br />
          <br />
          <TransactionTable keys={headings} values={data} />
          <br />
          <Paginator total={10} current={1} />
          <br />
          <br />
        </div>
        <div className="right-nav">
          <Affixed offset={50}>
            <>
              <Button color="success" block onClick={() => setVisible(true)}>
                Create Game Instance
              </Button>
              <br />
              <br />
              <div className="section-header">Quick Summary</div>
              <p />
              <SummaryCard type={"games"} total={"10,000"} />
              <SummaryCard type={"wins"} total={15} />
            </>
          </Affixed>
        </div>
      </div>
      <ContentModal visible={visible} setVisible={setVisible}>
        <NewGame setVisible={setVisible} />
      </ContentModal>
    </div>
  );
}

const NewGame = props => {
  const [gameData, setGameData] = useState({});
  const [loading, setLoading] = useState(false);
  const [prices, setPrices] = useState([{}]);
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
      props.setVisible(false);
    }, 2000);
  };

  return (
    <div className="newGame">
      <h3>Create new Instance</h3>
      <p>let us in on the requirements of your game</p>

      <form action="" onSubmit={onSubmit}>
        <FormGroup label="Cost">
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
        <br />
        <h3>Define your prices</h3>
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
            Add More Prices
          </div>
        </div>
        <br />
        <h3>Set EndDate</h3>
        <DatePicker />
        <br />
        <br />
        <Button loading={loading} disabled={loading} type="submit">
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
      <div className="grid grid-2 grid-gap-2">
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
        <FormGroup label="Amount">
          <Select
            onChange={props.onChange}
            value={props.gameData.winningRule || ""}
            name={"winningRule"}
            placeholder="--select a winning rule--"
            optionList={winningRules}
            required
          />
        </FormGroup>
      </div>
      <FormGroup label="description">
        <TextAreaField
          onChange={props.onChange}
          name="desc"
          value={props.gameData.desc || ""}
        />
      </FormGroup>
    </div>
  );
};

export default Games;
