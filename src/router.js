import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
const HomeIndex = lazy(() => import("./pages/homepage"));
const TeamCreatePage = lazy(() => import("./pages/team/TeamCreatePage.js"));

const RouterMain = props => {
  return (
    <BrowserRouter>
      <Switch>
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
      </Switch>
    </BrowserRouter>
  );
};

export default RouterMain;
