import React, { useContext, useEffect, useState } from "react";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import tenantInvite from "../../assets/tenantInvite.svg";
import envelope from "../../assets/images/envelope.png";
import "./TenantInvite.css";
import { Button } from "../../components/button/Button";
import AppIcon from "../../components/icons/Icon";
import { TenantInviteCard } from "./TenantInviteCard";
import { Card } from "../../components/card/Card";
import { Modal } from "../../components/modal/Modal";
import NewTenantModal from "./NewTenantModal";

const TenantInvite = () => {
  const { dispatch } = useContext(store);
  const [modalState, setModalState] = useState(false);

  const onNewTenantClick = () => {
    console.log("New tenant adding...");
    setModalState(true);
  };
  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Tenant Invite" });
  });
  return (
    <div>
      <div className="rectangle flex">
        <img
          src={tenantInvite}
          alt="tenant-invite-svg"
          className="tenant-invite-svg"
        />
        <div className="rectangle-text">
          <p className="text-1">Manage Existing Tenants</p>
          <p className="text-2">
            Invite your existing tenants to Rentright and let us assit you in
            managing them
          </p>
        </div>
      </div>
      <div className="tenant-invite-container flex">
        <div className="pending-invites">
          <p>Pending Invites</p>
          <div className="pending-invites-grid">
            <Card className="single-invite">
              <TenantInviteCard />
            </Card>
            <Card className="single-invite">
              <TenantInviteCard />
            </Card>
            <Card className="single-invite">
              <TenantInviteCard />
            </Card>
            <Card className="single-invite">
              <TenantInviteCard />
            </Card>
            <Card className="single-invite">
              <TenantInviteCard />
            </Card>
            <Card className="single-invite">
              <TenantInviteCard />
            </Card>
          </div>
        </div>
        <div className="invite-new-tenants flex">
          <Button onClick={onNewTenantClick} className="new-tenant-button">
            <AppIcon className="plus" name="plus" type="fa" />
            <span>Invite new tenant</span>
          </Button>
          <div className="rectangle flex">
            <img src={envelope} alt="envelope" />
            <p>
              Do not worry about numbers. Invite as much as you want to, we got
              you covered
            </p>
          </div>
        </div>
      </div>
      <Modal
        // className="invite-tenant-modal"
        visible={modalState}
        type="default"
      >
        <NewTenantModal />
      </Modal>
    </div>
  );
};

export default TenantInvite;
