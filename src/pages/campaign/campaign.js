import React, { useEffect, useContext } from "react";
import { setPageTitleAction } from "../../stateManagement/actions";
import { store } from "../../stateManagement/store";
import TransactionTable from "../../components/transactionTable/transactionTable";
import Input from "../../components/input/Input";
import AppIcon from "../../components/icons/Icon";
import { Select } from "../../components/select/Select";
import { statusMode } from "../../utils/data";
import { Button } from "../../components/button/Button";

function Campaign(props) {
  const { dispatch } = useContext(store);

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Campaigns" });
  }, []);

  const headings = [
    "Type",
    "Title",
    "Network",
    "Status",
    "Reward",
    "Schedule",
    ""
  ];

  return (
    <div>
      <div className="flex align-center justify-between">
        <div>
          <div className="lease-search-box">
            <Input
              placeholder="Search campaigns"
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
          &nbsp; &nbsp; &nbsp;
          <Button onClick={() => props.history.push("/campaigns/new")}>
            Add New
          </Button>
        </div>
      </div>
      <br />
      <br />
      <TransactionTable keys={headings} values={[]} />
    </div>
  );
}

export default Campaign;
