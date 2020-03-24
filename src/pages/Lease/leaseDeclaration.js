import React, { useState } from "react";
import { numberWithCommas } from "../../utils/helper";

function LeaseDeclaration(props) {
  const [declaration] = useState(props.declaration);

  if (!declaration) return <div />;

  return (
    <div className="lease-card declaration">
      <h3>Declaration</h3>

      <div className="dec-info">
        <h4>Now It Is Hereby Agreed as Follows</h4>
        <p>
          In consideration of the covenants, stipulations and charges
          hereinafter reserved,{" "}
          <strong className="text-capitalized">{declaration.owner.name}</strong>{" "}
          hereby let unto{" "}
          <strong className="text-capitalized">
            {declaration.tenant.name}
          </strong>{" "}
          the Demised Premises for a term of{" "}
          <strong className="text-capitalized">
            {declaration.tenure} {declaration.tenure_type}
          </strong>{" "}
          CERTAIN commencing from <strong>{declaration.start_date}</strong> and
          ending <strong>{declaration.end_date}</strong>. The rent for the
          present term being{" "}
          <strong>
            {declaration.currency_type}
            {numberWithCommas(declaration.price)}
          </strong>{" "}
          yearly (Net of Taxes) having being paid before the execution of this
          agreement (the receipt hereof the landlord hereby acknowledges).
        </p>
      </div>

      <div className="flex column justify-between party-detail">
        <div className="tenant-con">
          <div
            className="img-con"
            style={{
              backgroundImage: `url("${declaration.tenant.image &&
                declaration.tenant.image.file}")`
            }}
          />
          <div className="content">
            <h4 className="text-capitalized">{declaration.tenant.name}</h4>
            <p>{declaration.tenant.email}</p>
            <p>{declaration.tenant.phone}</p>
            <div className="tag">Tenant</div>
          </div>
        </div>
        <div className="flex justify-between">
          <div />
          <div className="landlord-con">
            <div className="content">
              <h4 className="text-capitalized">{declaration.owner.name}</h4>
              <p>{declaration.owner.email}</p>
              <p>{declaration.owner.phone}</p>
              <div className="tag">Landlord</div>
            </div>
            <div
              className="img-con"
              style={{
                backgroundImage: `url("${declaration.owner.image &&
                  declaration.owner.image.file}")`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaseDeclaration;
