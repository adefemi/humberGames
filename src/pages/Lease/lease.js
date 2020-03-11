import React, { useContext, useEffect, useState } from "react";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import leaseBadge from "../../assets/pngs/lease_badge.png";

import "./lease.css";
import AppIcon from "../../components/icons/Icon";
import { Select } from "../../components/select/Select";
import Input from "../../components/input/Input";
import { Tabs } from "../../components/tabs/tabs";
import { getArrayCount } from "../../utils/helper";
import LeaseListCard from "../../components/leaseCards/leaseListCard";
import LeaseGridCard from "../../components/leaseCards/leaseGridCard";

function Lease(props) {
  const { dispatch } = useContext(store);
  const temCounter = getArrayCount({ count: 15 });
  const [viewType, setViewType] = useState(0);

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Leases" });
  }, []);

  const tabHeadings = [
    <div>Active Lease (10)</div>,
    <div>Pending Lease (0)</div>,
    <div>Annulled Lease (0)</div>,
    <div>Expired Lease (0)</div>
  ];

  const tabBodies = [
    <div className={`${viewType === 0 ? "" : "lease-grid"}`}>
      {temCounter.map((item, id) =>
        viewType === 0 ? <LeaseListCard key={id} /> : <LeaseGridCard key={id} />
      )}
      <br />
    </div>,
    <div />,
    <div />,
    <div />
  ];

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
        <div />
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
          <div className=" flex align-center sort-con">
            <div className="label">Sort by</div>
            <Select
              defaultOption={{ title: "Newest", value: "newest" }}
              optionList={[
                { title: "Newest", value: "newest" },
                { title: "Oldest", value: "oldest" },
                { title: "Expensive", value: "expensive" },
                { title: "Low budget", value: "low_budget" }
              ]}
            />
          </div>

          <div className="search-box">
            <Input
              placeholder="Search properties"
              iconRight={<AppIcon name="search" type="feather" />}
            />
          </div>
        </div>
      </div>

      <br />
      <div className="lease-content">
        <Tabs heading={tabHeadings} body={tabBodies} />
      </div>
    </div>
  );
}

export default Lease;
