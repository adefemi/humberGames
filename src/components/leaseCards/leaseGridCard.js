import React from "react";
import "./leaseCard.css";
import { Button } from "../button/Button";
import { numberWithCommas } from "../../utils/helper";
import { getNoImage } from "../../utils/data";
import { getPropertyOwner } from "./leaseListCard";
import { Link } from "react-router-dom";

function LeaseGridCard(props) {
  const {
    application: { unit, user }
  } = props.lease;
  return (
    <div className="lease-grid-card">
      <div className="top-main">
        <div
          className="img-con"
          style={{
            backgroundImage: `url("${unit.unit_images[0].image.file}")`
          }}
        />
        <div className="flex column justify-between prop-detail">
          <div className="top">
            <div className="titl">{`${unit.title} - ${unit.property.title}`}</div>
            <small>{`${unit.property.address_info.address} ${unit.property.address_info.city}, ${unit.property.address_info.state} ${unit.property.address_info.country}`}</small>
          </div>
          <div className="bottom">
            <div className="price">{`${
              props.lease.currency_type
            }${numberWithCommas(props.lease.amount)}`}</div>
            <div className="tag">{`${props.lease.tenure_type}`}</div>
          </div>
        </div>
      </div>
      <div className="flex column justify-between party-detail">
        <div className="tenant-con">
          <div
            className="img-con"
            style={{
              backgroundImage: `url("${
                user.user_profile
                  ? user.user_profile.profile_picture.file
                  : getNoImage()
              }")`
            }}
          />
          <div className="content">
            <h4>{`${user.first_name} ${user.last_name}`}</h4>
            <p>{`${user.email}`}</p>
            <div className="tag">
              {unit.category === "rental" ? "Tenant" : "Buyer"}
            </div>
          </div>
        </div>
        <div className="landlord-con">
          <div className="content">
            <h4>{`${getPropertyOwner(unit).first_name} ${
              getPropertyOwner(unit).last_name
            }`}</h4>
            <p>{`${getPropertyOwner(unit).email}`}</p>
            <div className="tag">
              <div className="tag">
                {unit.category === "rental" ? "Landlord" : "Seller"}
              </div>
            </div>
          </div>
          <div
            className="img-con"
            style={{
              backgroundImage: `url("${
                getPropertyOwner(unit).profile_picture
              }")`
            }}
          />
        </div>
      </div>
      <div className="flex column justify-between analysis-con">
        <div className="flex align-center justify-between processes">
          <div className="item active">Tenant Signature</div>
          <div className="spacer" />
          <div className="item">Lease Finalization</div>
          <div className="spacer" />
          <div className="item">Dues Payment</div>
        </div>
        <div className="flex align-center justify-between controls">
          <Link to={`/leases/${props.lease.uuid}_${props.lease.id}`}>
            <Button>View Lease</Button>
          </Link>
          <Button className="last">Manage Payment</Button>
        </div>
      </div>
    </div>
  );
}

export default LeaseGridCard;
