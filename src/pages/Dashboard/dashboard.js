import React, { useContext, useEffect } from "react";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import { Button } from "../../components/button/Button";
import homeImg from "../../assets/images/home.png";
import graphImg from "../../assets/images/graph.png";
import housesImg from "../../assets/images/houses.png";
import inspectionImg from "../../assets/images/inspection.png";

import keyImg from "../../assets/images/key-outlined.svg";
import folderImg from "../../assets/images/file-folder.svg";
import shieldImg from "../../assets/images/shield.svg";
import documentImg from "../../assets/images/document.svg";

import "./dashboard.css";
import { QuickActionCard } from "../../components/quickActionCard/quickActionCard";
import { ActivitySummaryCard } from "../../components/activeSummaryCard/activitySummaryCard";
import PropertyDashboardCard from "../../components/propertyDashboardCard/propertyDashboardCard";
import TenantDashboardCard from "../../components/tenantDashboardCard/tenantDashboardCard";
import TransactionTable from "../../components/transactionTable/transactionTable";
import Slider from "../../components/slider/slider";
import { Link } from "react-router-dom";

const keys = ["Reference", "Amount (₦)", "Tag"];
const values = [
  ["rr748jhdj93", "3,000.00", "Rental"],
  ["rr748jhdj93", "3,000.00", "Rental"],
  ["rr748jhdj93", "3,000.00", "Rental"],
  ["rr748jhdj93", "3,000.00", "Rental"]
];

function Dashboard(_) {
  const { dispatch } = useContext(store);
  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Dashboard" });
  }, []);

  return (
    <div className="dashboard-main">
      <div className="home-grid">
        <div className="left-side">
          <div className="welcome-card">
            <div className="content">
              <h3>Welcome Adefemi!</h3>
              <p>
                Continue setting up your portfolio and explore how users are
                checking them out.
              </p>
              <p>
                And also, if need help, our chat bot is always available to
                help.
              </p>
            </div>
            <div className="profile-stat">
              <div className="stat-circle" />
              <div className="stat-info">
                <div className="counter">80%</div>
                <Button>Complete Profile</Button>
              </div>
            </div>
          </div>
          <div className="activity-graph">
            <div className="heading">
              <h3>Properties Activity</h3>
              <small>
                This is a quick overview on your properties have been doing
                lately.
              </small>
              <div className="graph-content"></div>
            </div>
          </div>
        </div>
        <div className="quick-action">
          <h3>Quick Actions</h3>
          <div className="quick-action-grid">
            <Link to="/add-property">
              <QuickActionCard
                title="List Property"
                type="list_property"
                image={homeImg}
              />
            </Link>
            <QuickActionCard
              title="View Properties"
              type="view_properties"
              image={housesImg}
            />
            <QuickActionCard
              title="Manage Transactions"
              type="manage_transactions"
              image={graphImg}
            />
            <QuickActionCard
              title="Manage Inspections"
              type="manage_inspections"
              image={inspectionImg}
            />
          </div>
        </div>
      </div>
      <section className="dashboard-section">
        <h3>Activity Summary</h3>
        <Slider className="summary-list">
          <ActivitySummaryCard
            image={folderImg}
            color="pink"
            mainContent={{ title: "Total Landlords", count: 21 }}
            subContent={{ title: "Total Properties", count: 102 }}
          />
          <ActivitySummaryCard
            image={keyImg}
            color="blue"
            mainContent={{ title: "Active Rents", count: 10 }}
            subContent={{ title: "Due Rents", count: 5 }}
          />
          <ActivitySummaryCard
            image={documentImg}
            color="green"
            mainContent={{ title: "Total Applications", count: 100 }}
            subContent={{ title: "Pending Applications", count: 50 }}
          />
          <ActivitySummaryCard
            image={shieldImg}
            color="yellow"
            mainContent={{ title: "Total Leases", count: 21 }}
            subContent={{ title: "Awaiting Signature", count: 102 }}
          />
        </Slider>
      </section>

      <section className="dashboard-section">
        <h3>Quick Views</h3>
        <Slider className="views-list">
          <ViewCard title="Properties">
            {[1, 2, 3, 4].map((_, key) => (
              <PropertyDashboardCard
                key={key}
                title="Northern Foreshore Estate"
                link="/"
                cover="https://cdn.pixabay.com/photo/2014/07/10/17/18/large-home-389271_960_720.jpg"
                description="Lekki view, Lagos"
              />
            ))}
          </ViewCard>
          <ViewCard title="Transactions">
            <TransactionTable keys={keys} values={values} />
          </ViewCard>
          <ViewCard title="Tenants">
            {[1, 2, 3, 4].map((_, key) => (
              <TenantDashboardCard
                key={key}
                name="Adewale Samuel"
                cover="https://cdn.pixabay.com/photo/2015/12/22/20/42/face-1104763_960_720.jpg"
                expiry="Expiry, 01-jan-2010"
                linkToProperty="/"
                linkToTenant="/"
                propertyName="Northern Foreshore Estate"
              />
            ))}
          </ViewCard>
        </Slider>
      </section>
      <br />
      <br />
    </div>
  );
}

export const ViewCard = ({ title, children }) => {
  return (
    <div className="views-card">
      <h4>{title}</h4>
      <div className="content">{children}</div>
      <div className="bottom">
        <h5>Show More</h5>
      </div>
    </div>
  );
};

export default Dashboard;
