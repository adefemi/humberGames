import React, { useEffect, useContext } from "react";
import { setPageTitleAction } from "../../stateManagement/actions";
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
function Properties() {
  const { dispatch, state } = useContext(store);
  const [queryParams, setQueryParams] = useState({});
  const [properties, setProperties] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [formState, setFormState] = useState({
    keyword: ""
  });
  const [propertiesLoading, setPropertiesLoading] = useState();

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Properties" });
    // console.log(state);
    getProperties();
  }, []);
  useEffect(() => {
    let params = qs.stringify(queryParams);
    getProperties(`${PROPERTIES_URL}?${params}`);
  }, [queryParams]);

  const getProperties = (pageRoute = PROPERTIES_URL) => {
    setPropertiesLoading(true);
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
        "Are you sure you want to delete this propery along with all unit(s) attached to it?",
      onOK: () => {
        axiosHandler("DELETE", `${PROPERTIES_URL}/${propertyId}`, getToken())
          .then(res => {
            Notification.bubble({
              type: "Success",
              content: "Property sucessfully deleted"
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
    addQueryString("keyword", e.target.value);
  };

  const addQueryString = (key, value) => {
    let newQueryStrings = { ...queryParams, [key]: value };
    setQueryParams(newQueryStrings);
  };

  const getQueryString = key => qs.parse(queryParams)[key];

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
                  placeholder="Status"
                  optionList={[
                    { title: "Sold", value: "sold" },
                    { title: "Rented", value: "rented" },
                    { title: "Pending", value: "pending" },
                    { title: "Published", value: "published" },
                    { title: "Unpublished", value: "unpublished" }
                  ]}
                  name={"status"}
                  onChange={e => {
                    addQueryString("status", e.target.value);
                  }}
                  defaultOption={{ title: "Status" }}
                />
                <Select
                  placeholder={"Sort by date"}
                  onChange={e => {
                    addQueryString("date", e.target.value);
                  }}
                  optionList={[
                    { title: "DATE: Newest First", value: "desc" },
                    { title: "DATE: Oldest First", value: "asc" }
                  ]}
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
            _.get(properties, "results", []).map(property => (
              <section className="property-section section-begin">
                <PropertyContainer
                  toggleModal={() => setModalState(!modalState)}
                  onDelete={onDelete}
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
      <PropertyModal />
    </div>
  );
}

export default Properties;
