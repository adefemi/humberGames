import React from "react";
import { Card } from "../card/Card";
import _ from "lodash";
import { getCurrencyValue } from "../../utils/helper";

function PropertyCard(props) {
  let { unit } = props;
  return (
    <div className="PropertyCard">
      <Card>
        <div className="flex h-100">
          <div
            className="property-image"
            style={{
              backgroundImage: `url(${_.get(unit, "unit_images.0.image.file")})`
            }}
          ></div>
          <div className="property-description flex column justify-between">
            <div className="top">
              <strong>{getCurrencyValue(_.get(unit, "term"))}</strong>
              <div className="single-line">{unit.title}</div>
            </div>
            <div className="bottom">
              <div className="property-type">Apartment</div>
              <div
                className={`property-status ${
                  unit.published ? "published" : "unpublished"
                }`}
              >
                &#8226; {unit.published ? "published" : "unpublished"}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default PropertyCard;
