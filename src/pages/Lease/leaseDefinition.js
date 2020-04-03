import React, { useContext, useEffect, useState } from "react";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import leaseAggBadge from "../../assets/pngs/jam_shield-check-f.png";
import "./lease.css";
import { Button } from "../../components/button/Button";
import rrLogo from "../../assets/images/logo.svg";
import LeaseTerm from "./leaseTerm";
import LeaseDeclaration from "./leaseDeclaration";
import TenantConv from "./tenantConv";
import LandlordConv from "./landlordConv";
import Agreements from "./agreements";
import Signature from "./signature";
import LeaseSteps from "./leaseSteps";
import { axiosHandler } from "../../utils/axiosHandler";
import {
  LEASE_DECLARATION_URL,
  LEASE_GENERATE_URL,
  LEASE_SIGNATURE_URL,
  LEASE_URL
} from "../../utils/urls";
import { getToken } from "../../utils/helper";
import { Notification } from "../../components/notification/Notification";
import { Spinner } from "../../components/spinner/Spinner";
import { secondaryColor } from "../../utils/data";
import { Modal } from "../../components/modal/Modal";
import SignPad from "../../components/SignaturePad/signPad";
import Affixed from "../../components/Affixed/affixed";
import {
  finalizedOwner,
  finalizedTenant,
  finalNotOwner,
  finalOwner,
  finalTenant,
  generated,
  newLease
} from "./leaseContext";

function LeaseDefinition(props) {
  const { dispatch } = useContext(store);
  const [mode, setMode] = useState(props.view ? 1 : 0); // 0 for design mode, 1 for preview mode
  const [leaseInfo, setLeaseInfo] = useState({});
  const [fetching, setFetching] = useState(true);
  const [showSignPad, setShowSignPad] = useState(false);
  const [declaration, setDeclaration] = useState(null);
  const [signData, setSignData] = useState({});

  const {
    state: { userDetails }
  } = useContext(store);

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Lease Agreement" });
    LeaseInfo();
  }, []);

  const LeaseInfo = () => {
    if (!fetching) setFetching(true);
    if (props.create) {
      axiosHandler(
        "get",
        LEASE_GENERATE_URL + `/${getLeaseId()}`,
        getToken()
      ).then(res => {
        setLeaseInfo(res.data);
        setFetching(false);
      });
    } else {
      axiosHandler("get", LEASE_URL + `/${getLeaseId()}`, getToken()).then(
        res => {
          setLeaseInfo(res.data.results);
          if (res.data.results.signatures && mode === 0) {
            setMode(1);
          }
          setFetching(false);
        }
      );

      axiosHandler(
        "get",
        LEASE_DECLARATION_URL + `/${getLeaseId()}`,
        getToken()
      ).then(res => {
        setDeclaration(res.data);
      });
    }
  };

  const getLeaseId = () => {
    try {
      let uuidList = props.match.params.uuid.toString().split("_");
      return uuidList[uuidList.length - 1];
    } catch (e) {
      Notification.bubble({
        type: "error",
        content: "Got an issue while trying to get leases"
      });
      props.push("/");
    }
  };

  if (fetching) {
    return (
      <div>
        <br />
        <br />
        <Spinner color={secondaryColor} size={15} />
      </div>
    );
  }

  const getControlInfo = () => {
    let leaseType = generated;
    if (props.create) {
      leaseType = newLease;
    } else {
      if (!declaration && !userDetails.role) return;
      if (leaseInfo.signatures.length > 0 && leaseInfo.signatures.length < 2) {
        if (userDetails.role.name === "tenant") {
          leaseType = finalTenant;
        } else {
          if (userDetails.user.email === declaration.owner.email) {
            leaseType = finalOwner;
          } else {
            leaseType = finalNotOwner;
          }
        }
      } else if (leaseInfo.signatures.length > 1) {
        if (userDetails.role.name === "tenant") {
          leaseType = finalizedTenant;
        } else {
          leaseType = finalizedOwner;
        }
      } else if (userDetails.role.name !== "tenant") {
        leaseType = newLease;
      }
    }

    return (
      <>
        <div className="top">{leaseType.title}</div>
        <div className="context">{leaseType.content}</div>
        {leaseType.action && (
          <Button
            onClick={() => {
              if (leaseType.action === 10) {
                props.history.push(
                  `/lease-charges/lease/${leaseInfo.uuid}_${leaseInfo.id}`
                );
              } else {
                setSignData({
                  lease_id: leaseInfo.id,
                  user_category: leaseType.action === 1 ? "lessee" : "lessor"
                });
                setShowSignPad(true);
              }
            }}
          >
            {leaseType.action === 10 ? "Manage Lease Charge" : "Sign Lease"}
          </Button>
        )}
      </>
    );
  };

  return (
    <div>
      <Modal
        onClose={() => setShowSignPad(false)}
        visible={showSignPad}
        closable
      >
        <SignPad
          url={LEASE_SIGNATURE_URL}
          signData={signData}
          close={() => setShowSignPad(false)}
          refresh={LeaseInfo}
        />
      </Modal>
      <section className="banner lease-banner">
        <img src={leaseAggBadge} alt="garden" />
        <div className="context">
          <h3>Manage Agreement</h3>
          <p>
            lease manage cannot get easier than what we’ve provided for you. All
            that is left now is for you to make use of our automated leasing
            system to generate leases, and sign them
          </p>
        </div>
      </section>
      <br />
      <br />
      <div className="lease-grid-main">
        <div className="main-area">
          <div />
          <div className="flex justify-between head-part">
            <div className="info-list">
              {!props.view && !leaseInfo.signatures[0] && (
                <div className="flex align-center">
                  <div
                    className={`mode-item ${mode === 0 ? "" : "active"}`}
                    onClick={() => setMode(0)}
                  >
                    Edit Mode
                  </div>
                  <div className="spacer" />
                  <div
                    className={`mode-item ${mode === 1 ? "" : "active"}`}
                    onClick={() => setMode(1)}
                  >
                    Preview Lease
                  </div>
                </div>
              )}
              <h3>Residential lease</h3>
              {/*<small>Created On, September 13th 2019</small>*/}
            </div>
            <div className="logo">
              <img src={rrLogo} alt="" />
            </div>
          </div>
          <div className="step-guild">
            <Affixed offset={50}>
              <LeaseSteps {...props} />
            </Affixed>
          </div>
          <div className="lease-zone">
            <div id="leaseTerm" />
            <LeaseTerm {...props} mode={mode} lease={leaseInfo} />
            <div id="leaseTenant" />
            <TenantConv {...props} mode={mode} lease={leaseInfo} />
            <div id="leaseLandlord" />
            <LandlordConv {...props} mode={mode} lease={leaseInfo} />
            <div id="leaseAgree" />
            <Agreements {...props} mode={mode} lease={leaseInfo} />
            <div id="leaseDecl" />
            <LeaseDeclaration {...props} declaration={declaration} />
            <div id="leaseSig" />
            <Signature
              {...props}
              mode={mode}
              signatures={leaseInfo.signatures}
            />
          </div>
        </div>
        <div className="info">
          <Affixed offset={50}>
            <div className="info-card">{getControlInfo()}</div>
            <div className="chat-card"></div>
          </Affixed>
        </div>
      </div>
    </div>
  );
}

export default LeaseDefinition;
