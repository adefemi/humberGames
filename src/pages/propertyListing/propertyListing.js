import React, { useContext, useEffect } from "react";
import "./propertyListing.css";
import gardenIcon from "../../assets/images/garden.svg";
import moneyIcon from "../../assets/images/money.svg";
import homeIcon from "../../assets/images/house.svg";
import commentIcon from "../../assets/images/comment.svg";
import PropertyBasicInfo from "./propertyBasicInfo";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import PropertyTerm from "./propertyTerm";

function PropertyListing(props) {
  const { dispatch } = useContext(store);
  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "New Property" });
  }, []);
  return (
    <div className="propertyListingMain">
      <div className="main-zone">
        <section className="heading-context">
          <img src={gardenIcon} alt="garden" />
          <div className="context">
            <h3>Basic Information</h3>
            <p>
              Hooray!, we are ready to start listing. Ain’t you excited to list
              your property? ... if you are lets do this, also, if you are not
              ... lets still do this.
            </p>
          </div>
        </section>
        <PropertyTerm />
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
            active
            icon={homeIcon}
          />
          <ListingSteps
            title="Property Term"
            content="You would define your property fees here. Fee includes the rent amount, the agency’s commission, extra fees and even sharing ration"
            icon={moneyIcon}
          />
          <ListingSteps
            title="Property Description"
            content="Take your time to described your property to attract customers. Here you can add facilities, documents, images etc."
            icon={commentIcon}
          />
        </div>
      </div>
    </div>
  );
}

const ListingSteps = ({ title, content, active, icon }) => {
  return (
    <div className={`tracker-item ${active ? "active" : ""}`}>
      <div className="img-con">
        <img src={icon} alt="title" />
      </div>
      <div className="context">
        <h4>{title}</h4>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default PropertyListing;
