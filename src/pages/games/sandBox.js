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
import Badge from "../../components/Badge/badge";

function Games(props) {
  const headings = [
    "ID",
    "Game Name",
    "Game Type",
    "Cost",
    "Status",
    "EndDate",
    ""
  ];
  const play = val => {
    setVisible(true);
  };
  const data = [
    [
      "001",
      "Diamond Xtra Daily Raffle",
      "Raffle",
      "NGN 200",
      <Badge status="success">active</Badge>,
      "20-02-2020",
      <span className="link" onClick={() => play(2000)}>
        Play
      </span>
    ],
    [
      "002",
      "Access Wallet Weekly Raffle",
      "Raffle",
      "NGN 150",
      <Badge status="success">active</Badge>,
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
                placeholder="Search"
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
        <Paginator total={1} current={1} />
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
  const [selectedFile, setSelectedFile] = useState(null);

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

      <br />
      <FormGroup label="Choose game mode">
        <div className="flex align-center radio-group">
          <Radio
            onChange={() => setPropertyType("single")}
            name="propType"
            label="Single"
            checked={propertyType === "single"}
          />
          &nbsp; &nbsp; &nbsp; &nbsp;
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
            <FileUploadNew
              onChange={e => {
                if (e[0]) {
                  setSelectedFile(e[0].name);
                }
              }}
              disableUpload
            >
              Upload Game Plays
            </FileUploadNew>
            {selectedFile && (
              <>
                <br />
                <div className="flex align-center">
                  <div
                    onClick={() => setSelectedFile(null)}
                    className="pointer"
                  >
                    <AppIcon name="x" type="feather" />
                  </div>
                  &nbsp; &nbsp; &nbsp;
                  <div className="link">{selectedFile}</div>
                </div>
              </>
            )}
          </>
        )}
      </FormGroup>
      <br />
      <br />
      <Button
        loading={loading}
        disabled={loading || !propertyType}
        onClick={onSubmit}
      >
        Submit
      </Button>
      <br />
      <br />
    </div>
  );
};

export default Games;
