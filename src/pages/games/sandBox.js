import React, { useContext, useEffect, useState } from "react";
import "./games.css";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import Affixed from "../../components/Affixed/affixed";
import SummaryCard from "../../components/property/SummaryCard";
import Input from "../../components/input/Input";
import AppIcon from "../../components/icons/Icon";
import { Select } from "../../components/select/Select";
import { countryCode, statusMode, winningRules } from "../../utils/data";
import TransactionTable from "../../components/transactionTable/transactionTable";
import { Paginator } from "../../components/paginator/paginator";
import { Button } from "../../components/button/Button";
import ContentModal from "../../components/contentModal/contentModal";
import FormGroup from "../../components/formGroup/formGroup";
import CurrencyInput from "../../components/currencyInput/currencyInput";
import { genericChangeMulti, genericChangeSingle } from "../../utils/helper";
import { TextAreaField } from "../../components/textarea/TextAreaField";
import DatePicker from "../../components/DatePicker/datePicker";
import { Notification } from "../../components/notification/Notification";
import { Link } from "react-router-dom";
import { Radio } from "../../components/radio/Radio";
import FileUploadNew from "../../components/fileUploadNew/fileUploadNew";
import SelectInput from "../../components/selectInput/selectInput";

function Games(props) {
  const headings = ["ID", "Cost", "Status", "EndDate", ""];
  const play = val => {
    setVisible(true);
  };
  const data = [
    [
      "001",
      "NGN 2000",
      "active",
      "20-02-2020",
      <span className="link" onClick={() => play(2000)}>
        Play
      </span>
    ],
    [
      "002",
      "NGN 4000",
      "active",
      "20-02-2020",
      <span className="link" onClick={() => play(2000)}>
        Play
      </span>
    ],
    [
      "003",
      "NGN 6000",
      "active",
      "20-02-2020",
      <span className="link" onClick={() => play(2000)}>
        Play
      </span>
    ],
    [
      "004",
      "NGN 2000",
      "active",
      "20-02-2020",
      <span className="link" onClick={() => play(2000)}>
        Play
      </span>
    ],
    [
      "005",
      "NGN 2000",
      "active",
      "20-02-2020",
      <span className="link" onClick={() => play(2000)}>
        Play
      </span>
    ],
    [
      "006",
      "NGN 2000",
      "active",
      "20-02-2020",
      <span className="link" onClick={() => play(2000)}>
        Play
      </span>
    ],
    [
      "007",
      "NGN 2000",
      "active",
      "20-02-2020",
      <span className="link" onClick={() => play(2000)}>
        Play
      </span>
    ],
    [
      "008",
      "NGN 5000",
      "active",
      "20-02-2020",
      <span className="link" onClick={() => play(2000)}>
        Play
      </span>
    ],
    [
      "009",
      "NGN 10000",
      "active",
      "20-02-2020",
      <span className="link" onClick={() => play(2000)}>
        Play
      </span>
    ],
    [
      "0010",
      "NGN 1000",
      "active",
      "20-02-2020",
      <span className="link" onClick={() => play(2000)}>
        Play
      </span>
    ],
    [
      "0011",
      "NGN 20000",
      "active",
      "20-02-2020",
      <span className="link" onClick={() => play(2000)}>
        Play
      </span>
    ],
    [
      "0012",
      "NGN 2000",
      "active",
      "20-02-2020",
      <span className="link" onClick={() => play(2000)}>
        Play
      </span>
    ]
  ];
  const { dispatch } = useContext(store);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch({
      type: setPageTitleAction,
      payload: "SandBox"
    });
  }, []);
  return (
    <div className="singleGames">
      <br />
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
      <ContentModal visible={visible} setVisible={setVisible}>
        <NewGame setVisible={setVisible} />
      </ContentModal>
    </div>
  );
}

const NewGame = props => {
  const [gameData, setGameData] = useState({});
  const [propertyType, setPropertyType] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      Notification.bubble({
        type: "success",
        content: "You won, Congrats"
      });
      setLoading(false);
      props.setVisible(false);
    }, 2000);
  };

  return (
    <div className="newGame">
      <h3>Play Game</h3>
      <p>play well and good luck</p>

      <br />
      <div>
        Price: <span>NGN 1,000</span>
      </div>
      <br />
      <FormGroup label="Choose game mode">
        <div className="radio-group">
          <Radio
            onChange={() => setPropertyType("single")}
            name="propType"
            label="Single"
            checked={propertyType === "single"}
          />
          <Radio
            onChange={() => setPropertyType("bulk")}
            name="propType"
            label="Bulk"
            checked={propertyType === "bulk"}
          />
        </div>
        <br />
        <br />
        {propertyType === "single" && (
          <>
            <FormGroup label="Phone number">
              <SelectInput
                defaultOption={{
                  title: "+234",
                  value: "+234"
                }}
                selectPosition="left"
                minWidth={90}
                optionList={countryCode}
                selectName="country_code"
                onChange={e => genericChangeMulti(e, setGameData, gameData)}
                name="phone_number"
                isCurrency={false}
                required
                type="number"
                value={gameData.phone_number || ""}
              />
            </FormGroup>
            <FormGroup label="Transaction Reference">
              <Input
                name="transRef"
                value={gameData.transRef}
                onChange={e => genericChangeSingle(e, setGameData, gameData)}
              />
            </FormGroup>
          </>
        )}
        {propertyType === "bulk" && (
          <>
            <FileUploadNew>Upload Game Plays</FileUploadNew>
          </>
        )}
      </FormGroup>
      <br />
      <br />
      <Button loading={loading} disabled={loading} onClick={onSubmit}>
        Submit
      </Button>
      <br />
      <br />
    </div>
  );
};

export default Games;
