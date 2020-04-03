import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainLayout from "./components/mainLayout/mainLayout";
import GlobalLoader from "./components/GlobalLoader/globalLoader";
import Logout from "./components/logout/logout";
import OrderSummary from "./components/orderSummary/orderSummary";

const HomeIndex = lazy(() => import("./pages/Dashboard/dashboard.js"));
const TeamCreatePage = lazy(() => import("./pages/team/TeamCreatePage.js"));
const TeamMembersPage = lazy(() => import("./pages/team/TeamMembersPage.js"));
const Branch = lazy(() => import("./pages/branch/Branch.js"));
const Profile = lazy(() => import("./pages/profile/ProfileTemplate.js"));
const Agency = lazy(() => import("./pages/agencyPortfolio/AgencyPortfolio"));
const SingleRental = lazy(() => import("./pages/activeRentals/SingleRent"));
const ActiveRents = lazy(() =>
  import("./pages/activeRentals/AllActiveRentals")
);
const Notifications = lazy(() => import("./pages/notifications/Notifications"));
const AgencyGetStarted = lazy(() =>
  import("./pages/agencyCreation/AgencyGetStarted")
);
const AgencySetup = lazy(() => import("./pages/agencyCreation/AgencySetup"));
const TenantDashboard = lazy(() =>
  import("./pages/tenantDashboard/TenantDashboard")
);
const AgencyDashboard = lazy(() =>
  import("./pages/agencyDashboard/AgencyDashboard")
);
const Transactions = lazy(() => import("./pages/transactions/Transactions"));
const BankAccount = lazy(() => import("./pages/bankAccount/BankAccount"));
const Portfolio = lazy(() =>
  import("./pages/agencyPortfolio/AgencyPortfolio.js")
);
const TenantInvite = lazy(() => import("./pages/tenantInvite/TenantInvite"));
const LeaseMain = lazy(() => import("./pages/Lease/lease"));
const LeaseDefinition = lazy(() => import("./pages/Lease/leaseDefinition"));
const LeaseCharge = lazy(() => import("./pages/leaseCharge/leaseCharge"));
const PropertyListing = lazy(() =>
  import("./pages/propertyListing/propertyListing")
);
const Properties = lazy(() => import("./pages/properties/Properties"));
const Application = lazy(() => import("./pages/application/Application"));
const Inspections = lazy(() => import("./pages/inspection/inspection"));

const RouterMain = props => {
  return (
    <>
      <GlobalLoader />
      <OrderSummary />
      <BrowserRouter>
        <Switch>
          <Route path="/logout" exact component={Logout} />
          <Route
            path="/"
            component={props => (
              <MainLayout {...props}>
                <Route
                  path="/"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <HomeIndex {...props} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/team"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <TeamCreatePage {...props} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/agencies"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <Agency {...props} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/notifications"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <Notifications {...props} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/active-rentals"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <ActiveRents {...props} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/agency-get-started"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <AgencyGetStarted {...props} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/active-rentals/single"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <SingleRental {...props} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/dashboard/tenant"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <TenantDashboard {...props} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/lease-charges"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <LeaseCharge {...props} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/agency-setup"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <AgencySetup {...props} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/transactions"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <Transactions {...props} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/dashboard/agency"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <AgencyDashboard {...props} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/bank-account"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <BankAccount {...props} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/leases"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <LeaseMain {...props} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/leases/view/:uuid"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <LeaseDefinition {...props} view />
                    </Suspense>
                  )}
                />
                <Route
                  path="/leases/:uuid"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <LeaseDefinition {...props} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/create-lease/:uuid"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <LeaseDefinition {...props} create />
                    </Suspense>
                  )}
                />
                <Route
                  path="/team/members"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <TeamMembersPage {...props} />
                    </Suspense>
                  )}
                />

                <Route
                  path="/add-property"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <PropertyListing {...props} />
                    </Suspense>
                  )}
                />

                <Route
                  path="/add-property/:uuid"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <PropertyListing {...props} continue />
                    </Suspense>
                  )}
                />

                <Route
                  path="/view-property/:uuid"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <PropertyListing {...props} view />
                    </Suspense>
                  )}
                />

                <Route
                  path="/edit-property/:uuid"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <PropertyListing {...props} edit />
                    </Suspense>
                  )}
                />
                <Route
                  path="/properties"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <Properties {...props} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/applications"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <Application {...props} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/applications/:uuid"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <Application {...props} get />
                    </Suspense>
                  )}
                />
                <Route
                  path="/branch"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <Branch {...props} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/profile"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <Profile {...props} active={0} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/inspections"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <Inspections {...props} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/profile/employment"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <Profile {...props} active={2} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/profile/basic-info"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <Profile {...props} active={1} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/profile/immigration"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <Profile {...props} active={3} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/profile/resident"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <Profile {...props} active={4} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/profile/settings"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <Profile {...props} active={5} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/user/:uuid"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <Profile {...props} active={0} preview />
                    </Suspense>
                  )}
                />

                <Route
                  path="/user/:uuid/basic"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <Profile {...props} active={1} preview />
                    </Suspense>
                  )}
                />

                <Route
                  path="/user/:uuid/employment"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <Profile {...props} active={2} preview />
                    </Suspense>
                  )}
                />

                <Route
                  path="/user/:uuid/immigration"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <Profile {...props} active={3} preview />
                    </Suspense>
                  )}
                />

                <Route
                  path="/user/:uuid/resident"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <Profile {...props} active={4} preview />
                    </Suspense>
                  )}
                />
                <Route
                  path="/tenant-invite"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <TenantInvite {...props} />
                    </Suspense>
                  )}
                />
              </MainLayout>
            )}
          />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default RouterMain;
