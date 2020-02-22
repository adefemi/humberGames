import React from "react";
import bgImg2 from "../../../assets/images/lahore-18h.png";
import { Select } from "../../../components/select/Select";
import { Button } from "../../../components/button/Button";

const ConfirmMember = props => {
  return (
    <>
      <p>Confirm Member</p>
      <div className="confirm-member-details flex">
        <div
          className="request-picture"
          style={{ background: `url(${bgImg2})` }}
        ></div>
        <div className="membership flex">
          <p>Lara Dutta</p>
          <Select
            placeholder="assign a position"
            optionList={[
              { title: "manager", value: "manager" },
              { title: "member", value: "member" }
            ]}
            defaultOptionList={["team", "admin"]}
            name="position"
          />
        </div>
      </div>
      <div className="confirm-member-buttons">
        <Button onClick={props.onCancelClick} className="cancel">
          Cancel
        </Button>
        <Button className="complete">Complete</Button>
      </div>
    </>
  );
};

export default ConfirmMember;
