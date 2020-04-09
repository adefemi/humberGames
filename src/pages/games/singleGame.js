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

function Games(props) {
  const headings = [
    "ID",
    "Transaction Ref",
    "User Input",
    "Status",
    "Game Token"
  ];
  const data = [
    ["001", "hg2020190303", "493", "lose", "400"],
    ["001", "hg2020190303", "493", "lose", "400"],
    ["001", "hg2020190303", "493", "lose", "400"],
    ["001", "hg2020190303", "493", "lose", "400"],
    ["001", "hg2020190303", "493", "lose", "400"],
    ["001", "hg2020190303", "493", "lose", "400"],
    ["001", "hg2020190303", "493", "lose", "400"],
    ["001", "hg2020190303", "493", "lose", "400"],
    ["001", "hg2020190303", "493", "lose", "400"],
    ["001", "hg2020190303", "493", "lose", "400"],
    ["001", "hg2020190303", "493", "lose", "400"],
    ["001", "hg2020190303", "493", "lose", "400"],
    ["001", "hg2020190303", "493", "lose", "400"],
    ["001", "hg2020190303", "493", "lose", "400"],
    ["001", "hg2020190303", "493", "lose", "400"],
    ["001", "hg2020190303", "493", "lose", "400"],
    ["001", "hg2020190303", "493", "lose", "400"],
    ["001", "hg2020190303", "493", "lose", "400"],
    ["001", "hg2020190303", "493", "lose", "400"],
    ["001", "hg2020190303", "493", "lose", "400"]
  ];
  const { dispatch } = useContext(store);

  useEffect(() => {
    dispatch({
      type: setPageTitleAction,
      payload: `Instance 001 GamePlays`
    });
  }, []);
  return (
    <div className="singleGames">
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
    </div>
  );
}

export default Games;
