import React, { useEffect, useContext } from "react";
import { setPageTitleAction } from "../../stateManagement/actions";
import { store } from "../../stateManagement/store";
import houses from "../../assets/houses.svg";
import Input from "../../components/input/Input";

import "./Properties.css";
import { Select } from "../../components/select/Select";
import PropertyContainer from "../../components/property/PropertyContainer";
import SummaryCard from "../../components/property/SummaryCard";

function Properties() {
  const { dispatch } = useContext(store);
  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Properties" });
  }, []);
  return (
    <div className="Properties">
      <div className="page-layout flex">
        <div className="main-page">
          <div className="rectangle flex">
            <img src={houses} alt="tenant-invite-svg" />
            <div className="rectangle-text">
              <p className="text-1">Manage Your Properties</p>
              <p className="text-2">
                You can always adjust your properties as you see fit, however,
                in some cases where your property has engaged in some
                activities, updating such property might proof some what hard.
              </p>
            </div>
          </div>
          <section className="search-section">
            <div className="flex justify-between">
              <div className="search-box">
                <Input
                  placeholder={
                    "Search properties or unit (e.g adedeji estate, unit 5)"
                  }
                />
              </div>
              <div className="filter-box flex">
                <Select
                  optionList={[
                    { title: "Property type", value: "" },
                    { title: "Hello", value: "World" }
                  ]}
                  defaultOption={{ title: "Property type" }}
                />
                <Select
                  optionList={[
                    { title: "Status", value: "" },
                    { title: "Hello", value: "World" }
                  ]}
                  defaultOption={{ title: "Status" }}
                />
                <Select
                  optionList={[
                    { title: "Sort by date", value: "" },
                    { title: "Hello", value: "World" }
                  ]}
                  defaultOption={{ title: "Sort by date" }}
                />
              </div>
            </div>
          </section>
          <section className="property-section section-begin">
            <PropertyContainer
              name="Adedeji Estate"
              address="No. 22 igoba street, ilase lagos"
              units={22}
            />
          </section>
          <section className="property-section">
            <PropertyContainer
              name="Adedeji Estate"
              address="No. 22 igoba street, ilase lagos"
              units={22}
            />
          </section>
          <section className="property-section">
            <PropertyContainer
              name="Adedeji Estate"
              address="No. 22 igoba street, ilase lagos"
              units={22}
            />
          </section>
          <section className="property-section">
            <PropertyContainer
              name="Adedeji Estate"
              address="No. 22 igoba street, ilase lagos"
              units={22}
            />
          </section>
        </div>
        <div className="right-nav">
          <div className="section-header">Quick Summary</div>
          <SummaryCard />
          <SummaryCard />
          <SummaryCard />
        </div>
      </div>
    </div>
  );
}

export default Properties;
