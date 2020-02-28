import React from "react";
import infoSvg from "../../assets/info.svg";
import Input from "../../components/input/Input";
import { TextAreaField } from "../../components/textarea/TextAreaField";
import AppIcon from "../../components/icons/Icon";
import { Button } from "../../components/button/Button";

const NewTenantModal = ({ modalState, setModalState }) => {
  return (
    <div className="invite-tenant-modal">
      <p>Invite New Tenant</p>
      <div className="modal-rectangle">
        <img src={infoSvg} alt="info-svg" className="info-svg" />
        <p>
          Provide the tenants email address along with the details of the
          property you wish to invite them to.
        </p>
      </div>
      <p className="tenant-emails">Tenant Emails</p>
      <TextAreaField placeholder="Enter multiple emails" />
      <p className="property-info">Property Info</p>
      <div className="property-info-details grid grid-2">
        <Input placeholder="Search Property Unit" />
        <Input placeholder="Select tenant" />
      </div>
      <p>
        Let's take in the current agreement information
        <AppIcon className="check" name="checkCircleO" type="fa" />
      </p>
      <div className="grid grid-2 agreement-info">
        <div className="agreement-file">
          <p>Agreement file</p>
          <small>Any agreements?</small>
          <Input placeholder="Upload agreement documents" />
        </div>
        <div className="payment-info">
          <p>When is next payment scheduled for</p>
          <small>
            Let us know when the next rent would start so that the system can
          </small>
          <Input placeholder="Next payment date" />
        </div>
      </div>
      <div className="tenant-modal-buttons flex">
        <Button onClick={() => setModalState(false)} className="close-window">
          Close Window
        </Button>
        <Button className="create-invite">Create Invite</Button>
      </div>
    </div>
  );
};

export default NewTenantModal;
