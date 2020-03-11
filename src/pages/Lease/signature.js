import React from "react";

function Signature(props) {
  return (
    <div className="lease-card signature">
      <h3>Signatures</h3>
      <br />
      <div className="sign-con">
        <div className="sign-view">
          <div className="title">SIGNED SEALED AND DELIVERED</div>
          <small>
            On behalf of the within name <strong>Lessor</strong>
          </small>
          <div className="sign-area">Sign here!!!</div>
        </div>
        <div className="divider" />
        <div className="sign-view">
          <div className="title">SIGNED SEALED AND DELIVERED</div>
          <small>
            On behalf of the within name <strong>Lessee</strong>
          </small>
          <div className="sign-area">Sign here!!!</div>
        </div>
      </div>
      <br />
    </div>
  );
}

export default Signature;
