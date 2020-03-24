import React from "react";

function Signature(props) {
  if (props.create) {
    return <div />;
  }

  const getSignature = cat => {
    let returnValue = "Signature goes here!!!";
    if (props.signatures) {
      const sign = props.signatures.filter(
        item => item.user_category === cat
      )[0];
      if (sign) {
        returnValue = <img src={sign.signature} alt="" />;
      }
    }
    return returnValue;
  };
  return (
    <div className="lease-card signature">
      <h3>Signatures</h3>
      <br />
      <div className="sign-con">
        <div className="sign-view">
          <div className="title">SIGNED SEALED AND DELIVERED</div>
          <small>
            On behalf of the within name <strong>Lessee</strong>
          </small>
          <div className="sign-area">{getSignature("lessee")}</div>
        </div>
        <div className="divider" />
        <div className="sign-view">
          <div className="title">SIGNED SEALED AND DELIVERED</div>
          <small>
            On behalf of the within name <strong>Lessor</strong>
          </small>
          <div className="sign-area">{getSignature("lessor")}</div>
        </div>
      </div>
      <br />
    </div>
  );
}

export default Signature;
