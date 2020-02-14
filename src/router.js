import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainLayout from "./components/mainLayout/mainLayout";
import PropertyListing from "./pages/propertyListing/propertyListing";
const HomeIndex = lazy(() => import("./pages/homepage"));

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
                path="/add-property"
                exact
                component={props => (
                  <Suspense fallback={() => <h2>Loading...</h2>}>
                    <PropertyListing {...props} />
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
