import React, { useEffect, useContext } from "react";
import { setPageTitleAction } from "../../stateManagement/actions";
import { store } from "../../stateManagement/store";
import file from "../../assets/file.svg";
import Input from "../../components/input/Input";
import _ from "lodash";
import "./Application.css";
import { Select } from "../../components/select/Select";
import PropertyContainer from "../../components/property/PropertyContainer";
import SummaryCard from "../../components/property/SummaryCard";
import Skeleton from "react-loading-skeleton";
import ApplicationCard from "../../components/application/ApplicationCard";
import { APPLICATIONS_URL } from "../../utils/urls";
import { useState } from "react";
import { axiosHandler } from "../../utils/axiosHandler";

function Application() {
  const [applications, setApplications] = useState({});
  const [loaders, setLoaders] = useState({});
  const { dispatch } = useContext(store);
  useEffect(() => {
    getApplications();
    dispatch({ type: setPageTitleAction, payload: "Application" });
  }, []);
  const toggleLoaderState = key => {
    setLoaders({ ...loaders, [key]: !loaders.key });
  };
  const getApplications = async () => {
    try {
      let applications = await axiosHandler("GET", APPLICATIONS_URL);
      setApplications(applications.data.results.results);
      toggleLoaderState("applications");
    } catch (e) {
      console.log("error here");
    }
  };

  const getApplicationCards = applications =>
    applications.map(application => (
      <ApplicationCard application={application} />
    ));
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
          {!loaders.applications
            ? Array(8)
                .fill(null)
                .map((v, i) => (
                  <div key={i} className={"flex column w-100"}>
                    <Skeleton height={70} />
                    <Skeleton height={200} />
                    <Skeleton height={70} />
                  </div>
                ))
            : getApplicationCards(applications)}
        </section>
      </div>
    </div>
  );
}

export default Application;
