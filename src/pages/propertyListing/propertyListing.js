import React, { useContext, useEffect, useState } from "react";
import "./propertyListing.css";
import gardenIcon from "../../assets/images/garden.svg";
import moneyIcon from "../../assets/images/money.svg";
import homeIcon from "../../assets/images/house.svg";
import commentIcon from "../../assets/images/comment.svg";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import CompletionPage from "./completionPage";
import QuickLinksData from "./quickLinksData";
import { InformationBanner, ListingSteps } from "./common";
import qs from "query-string";
import PropertyBasicInfo from "./propertyBasicInfo";
import PropertyTerm from "./propertyTerm";
import PropertyDescription from "./propertyDescription";
import AOS from "aos";
import "aos/dist/aos.css";

function PropertyListing(props) {
  const { dispatch } = useContext(store);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "New Property" });
    AOS.init();
  }, []);

  useEffect(() => {
    if (props.continue) {
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
      <div className="propertyListingMain">
        <div className="main-zone">
          <InformationBanner activePage={activePage} />
          {activePage === 1 && <PropertyBasicInfo {...props} />}
          {activePage === 2 && <PropertyTerm {...props} />}
          {activePage === 3 && <PropertyDescription {...props} />}
          {activePage === 4 && <CompletionPage {...props} />}
        </div>
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
      </div>
      {activePage === 4 && (
        <>
          <br />
          <br />
          <QuickLinksData />
        </>
      )}
    </div>
  );
}

export default PropertyListing;
