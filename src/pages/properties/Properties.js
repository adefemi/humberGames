import React, { useEffect, useContext } from "react";
import {
  setGlobalLoader,
  setPageTitleAction
} from "../../stateManagement/actions";
import { store } from "../../stateManagement/store";
import houses from "../../assets/houses.svg";
import Input from "../../components/input/Input";
import { axiosHandler } from "../../utils/axiosHandler";
import { Select } from "../../components/select/Select";
import PropertyContainer from "../../components/property/PropertyContainer";
import SummaryCard from "../../components/property/SummaryCard";
import Skeleton from "react-loading-skeleton";
import { PROPERTIES_URL } from "../../utils/urls";
import { useState } from "react";
import { Modal } from "../../components/modal/Modal";
import "./Properties.css";
import { Notification } from "../../components/notification/Notification";
import qs from "query-string";
import _ from "lodash";
import PropertyModal from "../../components/property/PropertyModal";
import { getToken } from "../../utils/helper";
import Affixed from "../../components/Affixed/affixed";
import { propertySortOptions, propertyStatusOption } from "../../utils/data";
import file from "../../assets/file.svg";

function Properties(props) {
  const {
    dispatch,
    state: { userDetails }
  } = useContext(store);
  const [queryParams, setQueryParams] = useState({});
  const [activeObj, setActiveObj] = useState({});
  const [properties, setProperties] = useState({});
  const [modalState, setModalState] = useState(false);
  const [modalType, setModalType] = useState("unit");
  const [formState, setFormState] = useState({
    keyword: ""
  });
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  let searchDelay;

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Properties" });
  }, []);

  useEffect(() => {
    if (!userDetails.role) return;
    getProperties();
    if (userDetails.role.name.toLowerCase() === "tenant") {
      props.history.push("/");
    }
  }, [userDetails]);

  useEffect(() => {
    let params = qs.stringify(queryParams);
    getProperties(`${PROPERTIES_URL}?${params}`);
  }, [queryParams]);

  const getProperties = (pageRoute = PROPERTIES_URL, status = false) => {
    if (!propertiesLoading && !status) {
      setPropertiesLoading(true);
    }
    try {
      axiosHandler("GET", pageRoute, getToken()).then(res => {
        setProperties(res.data.results);
        setPropertiesLoading(false);
      });
    } catch (e) {
      // console.log(e);
    }
  };
  const onDelete = propertyId => {
    Modal.confirm({
      title: "Delete Property",
      content:
        "Are you sure you want to delete this property?, Note that all unit(s) attached to this property would be deleted as well.",
      onOK: () => {
        dispatch({
          type: setGlobalLoader,
          payload: {
            status: true,
            content: "Deleting property, Please wait..."
          }
        });
        axiosHandler("DELETE", `${PROPERTIES_URL}/${propertyId}`, getToken())
          .then(res => {
            Notification.bubble({
              type: "success",
              content: "Property successfully deleted"
            });
            getProperties(`${PROPERTIES_URL}?${qs.stringify(queryParams)}`);
            dispatch({
              type: setGlobalLoader,
              payload: {
                status: false,
                content: ""
              }
            });
          })
          .catch(err => {
            Notification.bubble({
              type: "error",
              content: "Unable to delete property"
            });
          });
      }
    });
  };

  const setFormStateHandler = e => {
    setFormState({ [e.target.id]: e.target.value });
    clearTimeout(searchDelay);
    setSearchDelay(e.target.value);
  };

  const setSearchDelay = search => {
    searchDelay = setTimeout(() => addQueryString("keyword", search), 500);
  };

  const addQueryString = (key, value) => {
    let newQueryStrings = { ...queryParams, [key]: value };
    setQueryParams(newQueryStrings);
  };

  const onEdit = activeProperty => {
    setActiveObj(activeProperty);
    setModalType("property");
    setModalState(true);
  };

  const onAddUnit = activeProperty => {
    setActiveObj(activeProperty);
    setModalType("unit");
    setModalState(true);
  };

  const closeVisibility = refresh => {
    if (refresh) {
      getProperties(`${PROPERTIES_URL}?${qs.stringify(queryParams)}`);
    }

    setModalState(false);
  };

  return (
    <div className="Properties">
      <div className="page-layout">
        <div className="main-page">
          <section className="heading-context">
            <img src={houses} alt="garden" />
            <div className="context">
              <h3>Manage Properties</h3>
              <p>
                You can always adjust your properties as you see fit, however,
                in some cases where your property has engaged in some
                activities, updating such property might proof some what hard.
              </p>
            </div>
          </section>
          <br />
          <br />
          <section className="search-section">
            <div className="flex justify-between">
              <div className="search-box">
                <Input
                  placeholder={
                    "Search properties or unit (e.g adedeji estate, unit 5)"
                  }
                  value={formState.search}
                  id={"search"}
                  onChange={setFormStateHandler}
                />
              </div>
              <div className="filter-box flex">
                <Select
                  onChange={e => {
                    addQueryString("unit_type", e.target.value);
                  }}
                  optionList={[{ title: "Apartment", value: "apartment" }]}
                  placeholder={"Property Type"}
                />
                <Select
                  placeholder="Filter..."
                  optionList={propertyStatusOption}
                  name={"status"}
                  onChange={e => {
                    addQueryString("status", e.target.value);
                  }}
                />
                <Select
                  placeholder="Sort by..."
                  onChange={e => {
                    if (e.target.value === "low" || e.target.value === "high") {
                      addQueryString("price", e.target.value);
                    } else {
                      addQueryString("date", e.target.value);
                    }
                  }}
                  optionList={propertySortOptions}
                />
              </div>
            </div>
          </section>
          {propertiesLoading ? (
            <div>
              <br />
              <Skeleton height={240} />
              <br />
              <br />
              <Skeleton height={240} />
            </div>
          ) : (
            _.get(properties, "results", []).map((property, key) => (
              <section key={key} className="property-section section-begin">
                <PropertyContainer
                  toggleModal={() => setModalState(!modalState)}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  onAddUnit={onAddUnit}
                  queryParams={queryParams}
                  key={property.id}
                  property={property}
                />
              </section>
            ))
          )}
        </div>
        <div className="right-nav">
          <Affixed offset={50}>
            <>
              <div className="section-header">Quick Summary</div>
              <SummaryCard type={"Properties"} total={properties.count} />
              <SummaryCard type={"Units"} />
              <SummaryCard type={"Interests"} />
            </>
          </Affixed>
        </div>
      </div>
      <PropertyModal
        visible={modalState}
        modalType={modalType}
        activeObj={activeObj}
        closeVisibility={closeVisibility}
      />
    </div>
  );
}

export default Properties;
