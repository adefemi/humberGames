import React, { useContext, useEffect, useState } from "react";
import "./games.css";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import Input from "../../components/input/Input";
import AppIcon from "../../components/icons/Icon";
import { Select } from "../../components/select/Select";
import { statusMode, winningRules } from "../../utils/data";
import TransactionTable from "../../components/transactionTable/transactionTable";
import { Paginator } from "../../components/paginator/paginator";
import Badge from "../../components/Badge/badge";
import { Tabs } from "../../components/tabs/tabs";
import Dashboard from "../dashboard/dashboard";
import { Card } from "../../components/card/Card";

function Games(props) {
  const headings = [
    "ID",
    "Transaction Ref",
    "User ID",
    "Status",
    "Game Token",
    "Draw TIme"
  ];
  const headingsPrice = ["label", "Amount", "Winning Rule", "Quantity"];
  const pricedata = [
    ["Diamond 1", "NGN 100", "ODDS_1_IN_100", "1"],
    ["Diamond 2", "NGN 120", "ODDS_1_IN_120", "3"]
  ];
  const data = [
    [
      "f51b5bf5-08df-4393-b781-4c687d079651",
      "hg2020190303",
      "8012345678",
      <Badge status="processing">pending</Badge>,
      "TYWHDAD",
      "10:15 am"
    ],
    [
      "f61b5bf5-08df-4393-b781-4c387d079651",
      "hg2020190304",
      "8012345678",
      <Badge status="error">lose</Badge>,
      "HADYUAD",
      "10:23 am"
    ],
    [
      "f51b5bf5-08df-4393-b781-4c687d079652",
      "hg2020190305",
      "8012345678",
      <Badge status="success">won</Badge>,
      "ADDYUAD",
      "11:40 am"
    ],
    [
      "f51b5bf5-08df-4393-b781-4c687d079653",
      "hg2020190306",
      "8012345678",
      <Badge status="processing">pending</Badge>,
      "FYWHDAH",
      "12:15 am"
    ]
  ];
  const { dispatch } = useContext(store);

  useEffect(() => {
    dispatch({
      type: setPageTitleAction,
      payload: `Instance 001 GamePlays`
    });
  }, []);

  const log = (
    <>
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
      <Paginator total={1} current={1} />
      <br />
      <br />
    </>
  );

  const config = (
    <>
      <Card heading="Game Settings">
        <div className="contentCard">
          <span className="info">Game Name:</span>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span className="content">Diamond Xtra Daily Raffle</span>
        </div>
        <div className="contentCard">
          <span className="info">Winning Rule:</span>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span className="content">ODDS_1_IN_100</span>
        </div>
        <div className="contentCard">
          <span className="info">Total Operational Budget:</span>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span className="content">NGN 1,000</span>
        </div>
        <div className="contentCard">
          <span className="info">Revenue:</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span className="content">NGN 100</span>
        </div>
      </Card>

      <br />

      <Card heading="Prices">
        <TransactionTable keys={headingsPrice} values={pricedata} />
      </Card>
    </>
  );

  const bodies = [<Dashboard />, log, config];

  const heading = ["Performance Report", "GamePlays", "Configuration"];

  return (
    <div className="singleGames">
      <Tabs heading={heading} body={bodies} />
    </div>
  );
}

export default Games;
