import React, { useContext, useEffect, useState } from "react";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import Input from "../../components/input/Input";
import { Select } from "../../components/select/Select";
import { Card } from "../../components/card/Card";
import { RentCard } from "./RentCard";

import "./AllActiveRentals.css";

const AllActiveRentals = () => {
  const { dispatch } = useContext(store);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Active Rentals" });
  }, []);
  return (
    <div>
      <div className="search flex align-center">
        <Input
          placeholder="Search Active Rents"
          value={searchValue}
          onChange={e => {
            setSearchValue(e.target.value);
          }}
        />
        <div className="flex align-center">
          <p>Sort by </p>
          <Select
            className="sort-select"
            optionList={[
              { title: "date", value: "date" },
              { title: "price", value: "price" }
            ]}
          />
        </div>
      </div>
      <div className="active-rents grid grid-4">
        <Card className="rent-card">
          <RentCard />
        </Card>
        <Card className="rent-card">
          <RentCard />
        </Card>
        <Card className="rent-card">
          <RentCard />
        </Card>
        <Card className="rent-card">
          <RentCard />
        </Card>
        <Card className="rent-card">
          <RentCard />
        </Card>
        <Card className="rent-card">
          <RentCard />
        </Card>
        <Card className="rent-card">
          <RentCard />
        </Card>
        <Card className="rent-card">
          <RentCard />
        </Card>
      </div>
    </div>
  );
};

export default AllActiveRentals;
