import React from "react";

function LeaseDeclaration(props) {
  return (
    <div className="lease-card declaration">
      <h3>Declaration</h3>

      <div className="dec-info">
        <h4>Now It Is Hereby Agreed as Follows</h4>
        <p>
          In consideration of the covenants, stipulations and charges
          hereinafter reserved, Moni Olowo hereby let unto baji mania the
          Demised Premises for a term of 2 years CERTAIN commencing from
          20-9-2019 and ending 13-9-2021. The rent for the present term being
          ₦10.00 yearly (Net of Taxes) having being paid before the execution of
          this agreement (the receipt hereof the landlord hereby acknowledges).
        </p>
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
            <p>+234 903 3030 4004</p>
            <div className="tag">Tenant</div>
          </div>
        </div>
        <div className="flex justify-between">
          <div />
          <div className="landlord-con">
            <div className="content">
              <h4>Moni Olowo</h4>
              <p>nopivusulo@mailsoul.com</p>
              <p>+234 903 3030 4004</p>
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
    </div>
  );
}

export default LeaseDeclaration;
