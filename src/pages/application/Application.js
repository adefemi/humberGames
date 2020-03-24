import React, { useEffect, useContext } from "react";
import {
  reloadApplication,
  setPageTitleAction
} from "../../stateManagement/actions";
import { store } from "../../stateManagement/store";
import file from "../../assets/file.svg";
import Input from "../../components/input/Input";
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
  const [fetching, setFetching] = useState(true);
  const [userRole, setRole] = useState(null);

  const {
    dispatch,
    state: { userDetails, reloadApplicationStatus }
  } = useContext(store);
  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Applications" });
    getApplications();
  }, []);

  useEffect(() => {
    if (reloadApplicationStatus) {
      if (!fetching) setFetching(true);
      dispatch({ type: reloadApplication, payload: false });
      getApplications();
    }
  }, [reloadApplicationStatus]);

  useEffect(() => {
    if (userDetails.role) {
      setRole(userDetails.role.name);
    }
  }, [userDetails]);

  const getApplications = () => {
    axiosHandler("GET", APPLICATIONS_URL, getToken()).then(res => {
      setApplications(res.data.results.results);
      setFetching(false);
    });
  };

  const getApplicationCards = applications =>
    applications.map(application => {
      let appCard;
      // eslint-disable-next-line array-callback-return
      if (application.status === "rejected") return;
      if (userRole === "tenant") {
        appCard = (
          <ApplicationCard
            onDelete={onDelete}
            key={application.id}
            application={application}
          />
        );
      } else {
        appCard = (
          <ApplicationCardAgency
            onDelete={onDelete}
            key={application.id}
            application={application}
          />
        );
      }
      return appCard;
    });

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
            <p className="text-1">Manage Your Application</p>
            <p className="text-2">
              You can always check your applications and interact with them as
              needed
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
            <div className="filter-box flex ">
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
          {fetching || !userRole
            ? Array(3)
                .fill(null)
                .map((v, i) => (
                  <div key={i} className={"flex column w-100"}>
                    <Skeleton height={300} />
                  </div>
                ))
            : getApplicationCards(applications)}
        </section>
        <br />
        <br />
      </div>
    </div>
  );
}

export default Application;
