import React, { useEffect, useContext } from "react";
import { setPageTitleAction } from "../../stateManagement/actions";
import { store } from "../../stateManagement/store";
import file from "../../assets/file.svg";
import Input from "../../components/input/Input";
import _ from "lodash";
import "./Application.css";
import { Select } from "../../components/select/Select";
import Skeleton from "react-loading-skeleton";
import ApplicationCard from "../../components/application/ApplicationCard";
import { APPLICATIONS_URL } from "../../utils/urls";
import { useState } from "react";
import { axiosHandler } from "../../utils/axiosHandler";
import { Notification } from "../../components/notification/Notification";
import { getToken } from "../../utils/helper";
import ApplicationCardAgency from "../../components/application/ApplicationCardAgency";

function Application() {
  const [applications, setApplications] = useState([]);
  const [formState, setFormState] = useState({});
  const [loaders, setLoaders] = useState({
    applications: true
  });
  const { dispatch } = useContext(store);
  useEffect(() => {
    getApplications();
    dispatch({ type: setPageTitleAction, payload: "Application" });
  }, []);

  const toggleLoaderState = key =>
    setLoaders({ ...loaders, [key]: !loaders[key] });
  const getApplications = async () => {
    try {
      let applications = await axiosHandler(
        "GET",
        APPLICATIONS_URL,
        getToken()
      );
      setApplications(applications.data.results.results);
      toggleLoaderState("applications");
    } catch (e) {
      Notification.bubble({
        content: _.get(e, "response.data.results.error"),
        type: "error"
      });
    }
  };

  const getApplicationCards = applications =>
    applications.map(application => (
      <ApplicationCardAgency
        onDelete={onDelete}
        key={application.id}
        application={application}
      />
    ));

  const onDelete = id => {
    axiosHandler("DELETE", `${APPLICATIONS_URL}/${id}`, getToken()).then(
      res => {
        Notification.bubble({
          type: "success",
          content: "Application deleted successfully"
        });
        let newApplications = applications.filter(
          application => application.id !== id
        );
        setApplications(newApplications);
      }
    );
  };
  const handleSearch = e => {
    setFormState({ [e.target.id]: e.target.value });
  };

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
                value={formState.search}
                id="search"
                onChange={handleSearch}
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
          {loaders.applications
            ? Array(3)
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
