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
import Badge from "../../components/Badge/badge";

function Games(props) {
  const headings = [
    "ID",
    "Game Name",
    "Operation Cost",
    "Cost",
    "Status",
    "Total GamePlays",
    "Total Winnings",
    ""
  ];
  const data = [
    [
      "001",
      "Diamond Xtra Daily Raffle",
      "NGN 300",
      "NGN 30",
      <Badge status="processing" text="active" />,
      "1586",
      "5",
      <Link to={`/games/${props.match.params.uuid}/gameplays`} className="link">
        View Game Instance
      </Link>
    ],
    [
      "002",
      "Access Wallet Weekly Raffle",
      "NGN 1000",
      "NGN 80",
      <Badge status="error" text="inactive" />,
      "0",
      "0",
      <Link to={`/games/${props.match.params.uuid}/gameplays`} className="link">
        View Game Instance
      </Link>
    ]
  ];
  const { dispatch } = useContext(store);

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
              <Button
                color="success"
                block
                onClick={() =>
                  props.history.push(`/games/${props.match.params.uuid}/create`)
                }
              >
                Create Game Instance
              </Button>
              <br />
              <br />
              <div className="section-header">Quick Summary</div>
              <p />
              <SummaryCard type={"gamesplays"} total={"2"} />
              <SummaryCard type={"games"} total={"1,589"} />
              <SummaryCard type={"wins"} total={"15"} />
            </>
          </Affixed>
        </div>
      </div>
    </div>
  );
}

export default Games;
