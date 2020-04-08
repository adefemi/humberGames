import React, { useContext, useEffect, useState } from "react";
import "./leaseCharge.css";
import moneyList from "../../assets/pngs/moneyList.png";
import { Card } from "../../components/card/Card";
import LeaseChargeCard from "../../components/leaseChargeCard/leaseChargeCard";
import Affixed from "../../components/Affixed/affixed";
import Input from "../../components/input/Input";
import AppIcon from "../../components/icons/Icon";
import { Select } from "../../components/select/Select";
import { leaseChargeSortOptions } from "../../utils/data";
import { axiosHandler } from "../../utils/axiosHandler";
import {
  LEASE_CHARGE_URL,
  VERIFY_INVOICE_TRANSACTION_URL
} from "../../utils/urls";
import { getToken } from "../../utils/helper";
import Skeleton from "react-loading-skeleton";
import qs from "query-string";
import { store } from "../../stateManagement/store";
import {
  setGlobalLoader,
  setPageTitleAction
} from "../../stateManagement/actions";
import { Notification } from "../../components/notification/Notification";

function LeaseCharge(props) {
  const [fetching, setFetching] = useState(true);
  const [leaseCharges, setLeaseCharges] = useState([]);
  const {
    dispatch,
    state: { userDetails }
  } = useContext(store);

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Lease Charges" });
    const query = qs.parse(props.location.search);
    if (query.reference) {
      verifyPayment(query.reference);
    } else {
      getData();
    }
  }, [userDetails]);

  const verifyPayment = reference => {
    dispatch({
      type: setGlobalLoader,
      payload: {
        status: true,
        content: "We are verifying your payment, please exercise some patience"
      }
    });
    axiosHandler(
      "get",
      VERIFY_INVOICE_TRANSACTION_URL + reference,
      getToken()
    ).then(
      res => {
        Notification.bubble({
          type: "success",
          content: "Payment Successfully"
        });
        verificationComplete();
      },
      err => {
        Notification.bubble({
          type: "error",
          content:
            "Ops!, an error occurred. Don't worry we would resolve it quickly"
        });
        verificationComplete();
      }
    );
  };

  const verificationComplete = () => {
    props.history.replace(props.location.pathname);
    getData();

    dispatch({
      type: setGlobalLoader,
      payload: { status: false, content: "" }
    });
  };

  const getData = () => {
    if (!fetching) {
      setFetching(true);
    }
    axiosHandler("get", LEASE_CHARGE_URL, getToken()).then(res => {
      setLeaseCharges(res.data.results);
      setFetching(false);
    });
  };

  return (
    <div className="lease-charge-main">
      <section className="heading-context">
        <img src={moneyList} alt="garden" />
        <div className="context">
          <h3>Manage Payment</h3>
          <p>
            lease manage cannot get easier than what we’ve provided for you. All
            that is left now is for you to make use of our automated leasing
            system to generate leases, and sign them{" "}
          </p>
        </div>
      </section>

      <br />
      <br />
      <div className="flex align-center justify-between">
        <div>
          <div className="lease-search-box">
            <Input
              placeholder="Search properties"
              iconRight={<AppIcon name="search" type="feather" />}
            />
          </div>
        </div>
        <div className="flex align-center props">
          &nbsp;
          <Select
            className="lease-search-box"
            defaultOption={{ title: "All Charge", value: "all" }}
            optionList={leaseChargeSortOptions}
          />
        </div>
      </div>
      <br />
      <br />
      <div className="charge-grid">
        <div className="charge-list">
          {fetching && (
            <>
              <Skeleton height={150} />
              <br />
              <br />
              <Skeleton height={150} />
            </>
          )}
          {!fetching &&
            leaseCharges.results.map((item, id) => (
              <LeaseChargeCard leaseCharge={item} key={id} />
            ))}
          <br />
          <br />
        </div>
        <div>
          <Affixed offset={60}>
            <Card heading="Notifications">
              quick notifications goes here...
            </Card>
          </Affixed>
        </div>
      </div>
    </div>
  );
}

export default LeaseCharge;
