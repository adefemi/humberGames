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
import { APPLICATIONS_URL, INSPECTION_URL } from "../../utils/urls";
import { useState } from "react";
import { axiosHandler } from "../../utils/axiosHandler";
import { Notification } from "../../components/notification/Notification";
import { getToken } from "../../utils/helper";
import ApplicationCardAgency from "../../components/application/ApplicationCardAgency";
import PropertyModal from "../../components/property/PropertyModal";
import FormGroup from "../../components/formGroup/formGroup";
import { Button } from "../../components/button/Button";
import DatePicker from "../../components/DatePicker/datePicker";
import TimePicker from "../../components/timePicker/timePicker";
import inspectSvg from "../../assets/svgs/inspect.svg";

function Application() {
  const [applications, setApplications] = useState([]);
  const [formState, setFormState] = useState({});
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userRole, setRole] = useState(null);
  const [modalState, setModalState] = useState(false);
  const [inspectionData, setInspectionData] = useState({});
  const [inpectionID, setInspectionID] = useState(null);

  const submit = e => {
    e.preventDefault();
    setLoading(true);
    let url = inpectionID ? INSPECTION_URL + `/${inpectionID}` : INSPECTION_URL;
    axiosHandler(
      inpectionID ? "patch" : "post",
      url,
      getToken(),
      inspectionData
    ).then(
      res => {
        Notification.bubble({
          type: "success",
          content: `Inspection scheduled ${
            inpectionID ? "updated" : ""
          } successfully`
        });
        getApplications();
        setLoading(false);
        setModalState(false);
      },
      err => {
        Notification.bubble({
          type: "error",
          content: "Ops, an error occurred"
        });
        setLoading(false);
      }
    );
  };

  const bookViewing = application => {
    setInspectionData({ application_id: application.id });
    setModalState(true);
  };

  const updateViewing = inspection => {
    setInspectionID(inspection.id);
    setInspectionData({
      inspection_date: inspection.inspection_date,
      inspection_time: inspection.inspection_time
    });
    setModalState(true);
  };

  const onChange = e => {
    setInspectionData({
      ...inspectionData,
      [e.target.name]: e.target.value
    });
  };

  const {
    dispatch,
    state: { userDetails, reloadApplicationStatus }
  } = useContext(store);
  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Applications" });
    getApplications();
    if (userDetails.role) {
      setRole(userDetails.role.name);
    }
  }, [userDetails]);

  useEffect(() => {
    if (reloadApplicationStatus) {
      if (!fetching) setFetching(true);
      dispatch({ type: reloadApplication, payload: false });
      getApplications();
    }
  }, [reloadApplicationStatus]);

  const getApplications = () => {
    if (!fetching) {
      setFetching(true);
    }
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
            bookViewing={bookViewing}
            updateViewing={updateViewing}
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
    <>
      <div className="Application">
        <br />
        <section className="heading-context">
          <img src={file} alt="garden" />
          <div className="context">
            <h3>Manage Applications</h3>
            <p>
              You can always check your applications and interact with them as
              needed
            </p>
          </div>
        </section>
        <br />
        <br />
        <div className="main-page">
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
      <PropertyModal
        modalType="generic"
        visible={modalState}
        closeVisibility={() => setModalState(false)}
      >
        <div className="bookViewingMain">
          <h3>Schedule Inspection</h3>
          <p>
            Choose a date when you can go checkout the property you are aiming
            to buy
          </p>

          <form onSubmit={submit}>
            <FormGroup label="Set inspection date">
              <DatePicker name="inspection_date" onChange={onChange} />
            </FormGroup>
            <FormGroup label="Set inspection time">
              <TimePicker name="inspection_time" onChange={onChange} />
            </FormGroup>
            <br />
            <Button type={submit} disabled={loading} loading={loading}>
              {inpectionID ? "Update" : "Submit"}
            </Button>
          </form>
        </div>
      </PropertyModal>
    </>
  );
}

export default Application;
