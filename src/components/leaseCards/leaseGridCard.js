import React from "react";
import "./leaseCard.css";
import { Button } from "../button/Button";

function LeaseGridCard(props) {
  return (
    <div className="lease-grid-card">
      <div className="top-main">
        <div
          className="img-con"
          style={{
            backgroundImage: `url("${"https://cdn.pixabay.com/photo/2013/09/21/14/30/sofa-184551__340.jpg"}")`
          }}
        />
        <div className="flex column justify-between prop-detail">
          <div className="top">
            <div className="titl">Adedeji Estate</div>
            <small>12 odunta street, ileshu, lagos</small>
          </div>
          <div className="bottom">
            <div className="price">$1,000,000.00</div>
            <div className="tag">yearly</div>
          </div>
        </div>
      </div>
      <div className="flex column justify-between party-detail">
        <div className="tenant-con">
          <div
            className="img-con"
            style={{
              backgroundImage: `url("${"https://cdn.pixabay.com/photo/2016/11/29/09/38/adult-1868750__340.jpg"}")`
            }}
          />
          <div className="content">
            <h4>Baji mania</h4>
            <p>baji@quickmail.com</p>
            <div className="tag">Tenant</div>
          </div>
        </div>
        <div className="flex justify-between">
          <div />
          <div className="landlord-con">
            <div className="content">
              <h4>Moni Olowo</h4>
              <p>nopivusulo@mailsoul.com</p>
              <div className="tag">Landlord</div>
            </div>
            <div
              className="img-con"
              style={{
                backgroundImage: `url("${"https://cdn.pixabay.com/photo/2016/03/09/09/40/woman-1245926__340.jpg"}")`
              }}
            />
          </div>
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
          <Button>View Lease</Button>
          <Button>Manage Payment</Button>
        </div>
      </div>
    </div>
  );
}

export default LeaseGridCard;
