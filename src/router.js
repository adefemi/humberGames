import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainLayout from "./components/mainLayout/mainLayout";
import PropertyListing from "./pages/propertyListing/propertyListing";
import Properties from "./pages/properties/Properties";
import Application from "./pages/application/Application";
import GlobalLoader from "./components/GlobalLoader/globalLoader";
import Logout from "./components/logout/logout";

const HomeIndex = lazy(() => import("./pages/Dashboard/dashboard"));
<<<<<<< HEAD
const TeamCreatePage = lazy(() => import("./pages/team/TeamCreatePage"));
const TeamMembersPage = lazy(() => import("./pages/team/TeamMembersPage"));
const Branch = lazy(() => import("./pages/branch/Branch"));
const Profile = lazy(() => import("./pages/profile/ProfileTemplate"));
const Portfolio = lazy(() =>
  import("./pages/agencyPortfolio/AgencyPortfolio.js")
);
const TenantInvite = lazy(() => import("./pages/tenantInvite/TenantInvite"));
const LeaseMain = lazy(() => import("./pages/Lease/lease"));
const LeaseDefinition = lazy(() => import("./pages/Lease/leaseDefinition"));

const RouterMain = props => {
  return (
    <>
      <GlobalLoader />
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
=======
const TeamCreatePage = lazy(() => import("./pages/team/TeamCreatePage.js"));
const TeamMembersPage = lazy(() => import("./pages/team/TeamMembersPage.js"));
const Branch = lazy(() => import("./pages/branch/Branch.js"));
const Profile = lazy(() => import("./pages/profile/ProfileTemplate.js"));
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
                path="/bank-account"
                exact
                component={props => (
                  <Suspense fallback={() => <h2>Loading...</h2>}>
                    <BankAccount {...props} />
                  </Suspense>
                )}
              />
>>>>>>> c2c9da1f0d972ff5f023d58389be0aeb6ee19dea

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
                  path="/agencies"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <Portfolio {...props} />
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
