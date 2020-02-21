import React from "react";
import AppIcon from "../icons/Icon";
import Badge from "../badge/Badge";
import { Button } from "../button/Button";
import PropertyCard from "./PropertyCard";
import Slider from "../slider/slider";
function PropertyContainer(props) {
  const { name, units, address } = props;
  return (
    <div className="PropertyContainer">
      <div className="flex property-container-header justify-between">
        <div className="property-details">
          <div className="flex">
            <AppIcon className="home-icon" name="ic_home" type="md" />
            <div>
              <Badge value={units + " units"}>
                <span className="property-name">{name}</span>
              </Badge>
              <div className="address">{address}</div>
            </div>
          </div>
        </div>
        <div className="property-options flex">
          <Button className="btn-add-unit">
            <div className="flex align-center">
              <AppIcon type="md" name="ic_add_circle_outline" />
              New Unit
            </div>
          </Button>
          <Button className="btn-select-unit">
            <div className="flex align-center">
              <AppIcon type="typicons" name="pinOutline" />
              Select
            </div>
          </Button>
        </div>
      </div>
      <div className="property-container-body">
        <div className="property-cards">
          <Slider className="flex property-slider">
            <PropertyCard />
            <PropertyCard />
            <PropertyCard />
            <PropertyCard />
          </Slider>
        </div>
      </div>
      <div className="flex justify-between property-container-footer">
        <div className="property-management flex">
          <Button className="btn-edit">
            <div className="flex align-center">
              <AppIcon type="feather" name="edit" />
              Edit
            </div>
          </Button>
          <Button className="btn-delete">
            <div className="flex align-center">
              <AppIcon type="feather" name="trash" />
              Delete
            </div>
          </Button>
        </div>
        <div className="view-all">
          <a href="#">View All</a>
        </div>
      </div>
    </div>
  );
}

export default PropertyContainer;
