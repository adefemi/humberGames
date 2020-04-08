import React, { useContext, useEffect, useState } from "react";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import leaseBadge from "../../assets/pngs/lease_badge.png";
import Skeleton from "react-loading-skeleton";

import "./lease.css";
import AppIcon from "../../components/icons/Icon";
import Input from "../../components/input/Input";
import { getArrayCount, getToken } from "../../utils/helper";
import LeaseListCard from "../../components/leaseCards/leaseListCard";
import LeaseGridCard from "../../components/leaseCards/leaseGridCard";
import { Select } from "../../components/select/Select";
import { leaseSortOptions } from "../../utils/data";
import { axiosHandler } from "../../utils/axiosHandler";
import { LEASE_URL } from "../../utils/urls";

function Lease(props) {
  const {
    dispatch,
    state: { userDetails }
  } = useContext(store);
  const temCounter = getArrayCount({ count: 2 });
  const [leases, setLeases] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [viewType, setViewType] = useState(1); // 0 for list and 1 for grid

  useEffect(() => {
    if (!userDetails.role) return;
    if (userDetails.role.name.toLowerCase() === "tenant") {
      props.history.push("/");
    }
    dispatch({ type: setPageTitleAction, payload: "Leases" });
    fetchLease();
  }, [userDetails]);

  const fetchLease = () => {
    if (!fetching) setFetching(true);
    axiosHandler("get", LEASE_URL, getToken()).then(res => {
      setLeases(res.data.results);
      setFetching(false);
    });
  };

  return (
    <div>
      <section className="banner">
        <img src={leaseBadge} alt="garden" />
        <div className="context">
          <h3>Manage Leases</h3>
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
          <div className="align-prop">
            <AppIcon
              name="thLarge"
              type="typicons"
              onClick={() => setViewType(1)}
              className={`${viewType === 1 ? "active" : ""}`}
            />
            <AppIcon
              name="thList"
              type="typicons"
              onClick={() => setViewType(0)}
              className={`${viewType === 0 ? "active" : ""}`}
            />
          </div>
          &nbsp;
          <Select
            className="lease-search-box"
            defaultOption={{ title: "All lease", value: "all" }}
            optionList={leaseSortOptions}
          />
        </div>
      </div>

      <br />
      <br />
      {fetching && (
        <div className="lease-content">
          <div className={`${viewType === 0 ? "" : "lease-grid"}`}>
            {temCounter.map((item, id) =>
              viewType === 0 ? (
                <>
                  <Skeleton height={150} />
                  <br />
                  <br />
                </>
              ) : (
                <Skeleton height={300} />
              )
            )}
            <br />
          </div>
        </div>
      )}
      {!fetching && (
        <div className="lease-content">
          <div className={`${viewType === 0 ? "lease-list" : "lease-grid"}`}>
            {leases.results.map((item, id) =>
              viewType === 0 ? (
                <LeaseListCard key={id} lease={item} />
              ) : (
                <LeaseGridCard key={id} lease={item} />
              )
            )}
            <br />
          </div>
        </div>
      )}

      <br />
      <br />
    </div>
  );
}

export default Lease;
