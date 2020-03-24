import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainLayout from "./components/mainLayout/mainLayout";
import PropertyListing from "./pages/propertyListing/propertyListing";
import Properties from "./pages/properties/Properties";
import Application from "./pages/application/Application";
const HomeIndex = lazy(() => import("./pages/Dashboard/dashboard"));
const TeamCreatePage = lazy(() => import("./pages/team/TeamCreatePage.js"));
const TeamMembersPage = lazy(() => import("./pages/team/TeamMembersPage.js"));
const Branch = lazy(() => import("./pages/branch/Branch.js"));
const Profile = lazy(() => import("./pages/profile/ProfileTemplate.js"));
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
const Transactins = lazy(() => import("./pages/transactions/Transactions"));
const BankAccount = lazy(() => import("./pages/bankAccount/BankAccount"));

const RouterMain = props => {
  return (
    <BrowserRouter>
      <Switch>
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
                path="/team/members"
                exact
                component={props => (
                  <Suspense fallback={() => <h2>Loading...</h2>}>
                    <TeamMembersPage {...props} />
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
                path="/agency-get-started"
                exact
                component={props => (
                  <Suspense fallback={() => <h2>Loading...</h2>}>
                    <AgencyGetStarted {...props} />
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
                    <Transactins {...props} />
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
                    <Profile {...props} />
                  </Suspense>
                )}
              />
            </MainLayout>
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default RouterMain;
