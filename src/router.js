import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainLayout from "./components/mainLayout/mainLayout";
import PropertyListing from "./pages/propertyListing/propertyListing";
import Properties from "./pages/properties/Properties";
import Application from "./pages/application/Application";
import TenantInvite from "./pages/tenantInvite/TenantInvite";
const HomeIndex = lazy(() => import("./pages/Dashboard/dashboard"));
const TeamCreatePage = lazy(() => import("./pages/team/TeamCreatePage.js"));
const TeamMembersPage = lazy(() => import("./pages/team/TeamMembersPage.js"));
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
                path="/tenant-invite"
                exact
                component={props => (
                  <Suspense fallback={() => <h2>Loading...</h2>}>
                    <TenantInvite {...props} />
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
            </MainLayout>
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default RouterMain;
