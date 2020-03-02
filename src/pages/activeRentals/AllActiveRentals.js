import React, { useContext, useEffect } from "react";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import Input from "../../components/input/Input";
import { Select } from "../../components/select/Select";

import "./AllActiveRentals.css";

const AllActiveRentals = () => {
  const { dispatch } = useContext(store);

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Active Rentals" });
  }, []);
  return (
    <div>
      <div className="search flex align-center">
        <Input placeholder="Search Active Rents" />
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
    </div>
  );
};

export default AllActiveRentals;
