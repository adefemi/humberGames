import React from "react";
import { Card } from "../card/Card";

function PropertyCard() {
  return (
    <div className="PropertyCard">
      <Card>
        <div className="flex h-100">
          <div className="property-image"></div>
          <div className="property-description flex column justify-between">
            <div className="top">
              <strong>$1,000,000.00</strong>
              <div>Unit 15</div>
            </div>
            <div className="bottom">
              <div className="property-type">Apartment</div>
              <div className="property-status"> &#8226; unpublished</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default PropertyCard;
