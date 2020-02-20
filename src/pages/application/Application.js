import React, { useEffect, useContext } from "react";
import { setPageTitleAction } from "../../stateManagement/actions";
import { store } from "../../stateManagement/store";
import file from "../../assets/file.svg";
import Input from "../../components/input/Input";

import "./Application.css";
import { Select } from "../../components/select/Select";
import PropertyContainer from "../../components/property/PropertyContainer";
import SummaryCard from "../../components/property/SummaryCard";
import ApplicationCard from "../../components/application/ApplicationCard";

function Application() {
  const { dispatch } = useContext(store);
  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Application" });
  }, []);
  return (
    <div className="Application">
      <div className="main-page">
        <div className="rectangle flex">
          <img src={file} alt="tenant-invite-svg" />
          <div className="rectangle-text">
            <p className="text-1">Manage Your Properties</p>
            <p className="text-2">
              You can always adjust your properties as you see fit, however, in
              some cases where your property has engaged in some activities,
              updating such property might proof some what hard.
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
        <section className="application-cards">
          <ApplicationCard />
          <ApplicationCard />
          <ApplicationCard />
          <ApplicationCard />
        </section>
      </div>
    </div>
  );
}

export default Application;
