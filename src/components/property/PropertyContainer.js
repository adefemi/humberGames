import React, { useEffect } from "react";
import AppIcon from "../icons/Icon";
import Badge from "../Badge/badge";
import { Button } from "../button/Button";
import PropertyCard from "./PropertyCard";
import Slider from "../slider/slider";
import Skeleton from "react-loading-skeleton";
import { axiosHandler } from "../../utils/axiosHandler";
import { UNITS_URL } from "../../utils/urls";
import { useState } from "react";
import _ from "lodash";
import qs from "query-string";
import { getArrayCount } from "../../utils/helper";

function PropertyContainer(props) {
  const [units, setUnits] = useState([]);
  const [viewAll, setViewAll] = useState(false);
  const [loaders, setLoaders] = useState({});

  const toggleLoaders = key => {
    setLoaders({ ...loaders, [key]: !loaders[key] });
  };
  const {
    id,
    title,
    meta: { total_unit },
    address_info: { address }
  } = props.property;

  useEffect(() => {
    let queryParams = { ...props.queryParams, property_id: id };
    queryUnits(`?${qs.stringify(queryParams)}`);
  }, [props.property, props.queryParams]);

  const queryUnits = async params => {
    try {
      let units = await axiosHandler("GET", `${UNITS_URL}${params}`);
      setUnits(units.data.results);
      toggleLoaders("units");
    } catch (e) {}
  };
  return (
    <div className="PropertyContainer">
      <div className="flex property-container-header justify-between">
        <div className="property-details">
          <div className="flex">
            <AppIcon className="home-icon" name="ic_home" type="md" />
            <div>
              <Badge value={`${total_unit} units`}>
                <span className="property-name">{title}</span>
              </Badge>
              <div className="address">{address}</div>
            </div>
          </div>
        </div>
        <div className="property-options flex">
          <Button
            onClick={() => props.onAddUnit(props.property)}
            className="btn-add-unit"
          >
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
          {!viewAll && (
            <Slider className="flex property-slider">
              {!loaders.units ? (
                getArrayCount({ count: 4, start: 0 }).map((v, i) => (
                  <div className="space-right" key={i}>
                    <Skeleton height={160} width={320} />
                  </div>
                ))
              ) : (
                <>
                  {_.get(units, "results").map((unit, key) => (
                    <PropertyCard key={key} unit={unit} />
                  ))}
                </>
              )}
            </Slider>
          )}
          {viewAll && (
            <div className="property-grid">
              {!loaders.units ? (
                getArrayCount({ count: 4, start: 0 }).map((v, i) => (
                  <div className="space-right" key={i}>
                    <Skeleton height={160} width={320} />
                  </div>
                ))
              ) : (
                <>
                  {_.get(units, "results").map((unit, key) => (
                    <PropertyCard key={key} unit={unit} />
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between property-container-footer">
        <div className="property-management flex">
          <Button
            className="btn-edit"
            onClick={() => props.onEdit(props.property)}
          >
            <div className="flex align-center">
              <AppIcon type="feather" name="edit" />
              Edit
            </div>
          </Button>
          <Button onClick={() => props.onDelete(id)} className="btn-delete">
            <div className="flex align-center">
              <AppIcon type="feather" name="trash" />
              Delete
            </div>
          </Button>
        </div>
        <div className="view-all">
          <a
            href="/"
            onClick={e => {
              e.preventDefault();
              setViewAll(!viewAll);
            }}
          >
            {viewAll ? "Minimize" : "View All"}
          </a>
        </div>
      </div>
    </div>
  );
}

export default PropertyContainer;
