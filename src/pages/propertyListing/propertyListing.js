import React, { useContext, useEffect, useState } from "react";
import "./propertyListing.css";
import moneyIcon from "../../assets/images/money.svg";
import homeIcon from "../../assets/images/house.svg";
import commentIcon from "../../assets/images/comment.svg";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import CompletionPage from "./completionPage";
import { InformationBanner, ListingSteps } from "./common";
import qs from "query-string";
import PropertyBasicInfo from "./propertyBasicInfo";
import PropertyTerm from "./propertyTerm";
import PropertyDescription from "./propertyDescription";
import AOS from "aos";
import "aos/dist/aos.css";
import { axiosHandler } from "../../utils/axiosHandler";
import { UNIT_CONTROLLER_URL } from "../../utils/urls";
import { getToken } from "../../utils/helper";
import { Notification } from "../../components/notification/Notification";

function PropertyListing(props) {
  const { dispatch } = useContext(store);
  const [activePage, setActivePage] = useState(props.view ? 4 : 1);
  const [unitInfo, setUnitInfo] = useState({});
  const [fetching, setFetching] = useState(!!props.match.params.uuid);
  const getUnitId = () => {
    if (!props.edit && !props.view && !props.continue) return null;
    let pathList = props.match.params.uuid.split("_");
    return pathList[pathList.length - 1];
  };
  const [unitID] = useState(getUnitId());

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "New Property" });
    if (!props.edit) {
      AOS.init();
    }
    if (props.match.params.uuid) {
      axiosHandler("get", UNIT_CONTROLLER_URL + `/${unitID}`, getToken()).then(
        res => {
          setUnitInfo(res.data.results);
          setFetching(false);
        },
        err => {
          Notification.bubble({
            type: "error",
            content: "Ops!, an error occurred while fetching unit info"
          });
        }
      );
    }
  }, []);

  useEffect(() => {
    if (props.continue || props.edit) {
      let query = qs.parse(props.location.search);
      if (query.stage) {
        switch (query.stage.toString()) {
          case "1":
            setActivePage(2);
            break;
          case "2":
            setActivePage(3);
            break;
          case "3":
            setActivePage(4);
            break;
          default:
            setActivePage(2);
        }
      }
    }
  }, [props.location.pathname, props.location.search]);

  return (
    <div>
      <div className={`propertyListingMain ${activePage < 4 ? "" : "single"}`}>
        <div className="main-zone">
          <InformationBanner activePage={activePage} />
          {activePage === 1 && (
            <PropertyBasicInfo
              {...props}
              unitInfo={unitInfo}
              fetching={fetching}
            />
          )}
          {activePage === 2 && (
            <PropertyTerm {...props} unitInfo={unitInfo} fetching={fetching} />
          )}
          {activePage === 3 && (
            <PropertyDescription
              {...props}
              unitInfo={unitInfo}
              fetching={fetching}
            />
          )}
          {activePage === 4 && (
            <CompletionPage
              {...props}
              unitInfo={unitInfo}
              fetching={fetching}
            />
          )}
        </div>
        {activePage < 4 && (
          <div className="sub-zone">
            <div className="progress-tracker">
              <h3>Property Listing Quick Steps</h3>
              <p>
                We have made the steps for listing as simple and interactive as
                possible, all you need do is ride on!!!
              </p>
              <br />
              <ListingSteps
                title="Basic Information"
                content="Here, you will provide the basic information about your property such as the Title, Its location, bedroom count etc."
                active={activePage === 1}
                completed={activePage > 1}
                icon={homeIcon}
              />
              <ListingSteps
                title="Property Term"
                content="You would define your property fees here. Fee includes the rent amount, the agency’s commission, extra fees and even sharing ration"
                icon={moneyIcon}
                completed={activePage > 2}
                active={activePage === 2}
              />
              <ListingSteps
                title="Property Description"
                content="Take your time to described your property to attract customers. Here you can add facilities, documents, images etc."
                icon={commentIcon}
                completed={activePage > 3}
                active={activePage === 3}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PropertyListing;
