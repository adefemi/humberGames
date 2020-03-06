import React, { useContext, useEffect } from "react";
import { Button } from "../../components/button/Button";

import home2 from "../../assets/activeRentals/home2.jpg";
import landlordImg from "../../assets/images/lahore-18h.png";
import plugSvg from "../../assets/activeRentals/plug.svg";
import balconySvg from "../../assets/activeRentals/balcony.svg";
import trashSvg from "../../assets/activeRentals/trash.svg";
import tapSvg from "../../assets/activeRentals/water-tap.svg";
import padlockSvg from "../../assets/activeRentals/padlock.svg";

import "./AllActiveRentals.css";
import AppIcon from "../../components/icons/Icon";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";

const SingleRent = () => {
  const { dispatch } = useContext(store);

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Active Rentals" });
  }, []);
  return (
    <div className="single-rent">
      <div className="title-address">
        <h2>
          5 Bedroom Mansionette, Fully Furnitured with State of the Art Smart
          Home Technology
        </h2>
        <div className="flex align-center">
          <AppIcon type="icomoon" name="location2" className="location" />
          <p> Suite 74, Block J5, Eko Atlantic City, Lagos, Nigeria</p>
        </div>
      </div>
      <div
        className="property-image"
        style={{ background: `url(${home2})` }}
      ></div>
      <div className="payment-lease">
        <p>Payment & Leases</p>
        <div className="payment-lease-details">
          <p>
            Rent (Yearly): <span>N500,000,000</span>
          </p>
          <p>
            Current Lease Expiry Date: <span>January 30, 2022 </span>
            <span className="days-left"> (1330 days left)</span>
          </p>
          <div className="lease-button flex">
            <Button>Manage Current Lease</Button>
          </div>
        </div>
      </div>
      <p>Facilities</p>
      <div className="facilities flex">
        <div>
          <img src={plugSvg} alt="plug" className="plug image" />
          <div className="text">
            <p>Power supply</p>
          </div>
        </div>
        <div>
          <img src={tapSvg} alt="tap" className="tap image" />
          <div className="text">
            <p>Water</p>
          </div>
        </div>
        <div>
          <img src={trashSvg} alt="trash" className="trash image" />
          <div className="text">
            <p>Sanitation</p>
          </div>
        </div>
        <div>
          <img src={balconySvg} alt="balcony" className="balcony image" />
          <div className="text">
            <p>Balcony</p>
          </div>
        </div>
        <div>
          <img src={padlockSvg} alt="padlock" className="padlock image" />
          <div className="text">
            <p>Security</p>
          </div>
        </div>
      </div>
      <div className="landlord-container">
        <p>Reach out to your Landlord</p>
        <div className="landlord flex align-center">
          <img src={landlordImg} alt="landlord-img" className="landlord-img" />
          <div className="landlord-details">
            <p>
              <span>Name: </span> Lara Dutta
            </p>
            <p>
              <span>Phone Number: </span> +1234567890
            </p>
            <p>
              <span>Email: </span> Lara.Dutta@react.com
            </p>
          </div>
          <AppIcon
            type="icomoon"
            name="bubbles2"
            className="bubbles"
            size={50}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleRent;
