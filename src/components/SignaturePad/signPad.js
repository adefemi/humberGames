import React, { useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "../button/Button";
import "./signpad.css";
import { axiosHandler } from "../../utils/axiosHandler";
import { getToken } from "../../utils/helper";
import { Notification } from "../notification/Notification";

function SignPad(props) {
  const [started, setStarted] = useState(false);
  const [disabled, setDisabled] = useState(false);
  let signPad;
  const Submit = () => {
    if (!started) {
      Notification.bubble({
        type: "warning",
        content: "You need to sign first"
      });
      return;
    }
    const data = { ...props.signData, signature: signPad.toDataURL() };
    setDisabled(true);
    axiosHandler("post", props.url, getToken(), data).then(
      res => {
        Notification.bubble({
          type: "success",
          content: "Signature Appended"
        });
        props.refresh();
        props.close();
      },
      err => {
        Notification.bubble({
          type: "error",
          content: "Ops!, an error occurred."
        });
        setDisabled(false);
      }
    );
  };
  return (
    <div className="sign-canvas">
      <h4>Append your signature</h4>
      <div className="sign-area-main">
        <SignatureCanvas
          ref={ref => {
            signPad = ref;
          }}
          onBegin={() => {
            if (!started) {
              setStarted(true);
            }
          }}
          penColor="green"
          canvasProps={{ height: 200, className: "sigCanvas" }}
        />
        {!started && <div className="illustrator">Sign here...</div>}
        {disabled && <div className="disabled" />}
      </div>
      <br />
      <div className="flex align-center justify-between">
        <div />
        <div className="flex align-center controls">
          <Button
            color="success"
            onClick={Submit}
            loading={disabled}
            disabled={disabled}
          >
            Submit
          </Button>{" "}
          &nbsp;&nbsp;
          <Button
            onClick={() => {
              signPad.clear();
              setStarted(false);
            }}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SignPad;
