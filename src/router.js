import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
<<<<<<< US-merging-notification
import MainLayout from "./components/mainLayout/mainLayout";
import GlobalLoader from "./components/GlobalLoader/globalLoader";
import Logout from "./components/logout/logout";
import Login from "./pages/login/login";

const HomeIndex = lazy(() => import("./pages/dashboard/dashboard"));
const Games = lazy(() => import("./pages/games/games"));
const SingleGame = lazy(() => import("./pages/games/singleGame"));
const GamePlay = lazy(() => import("./pages/games/gamePlays"));
const SandBox = lazy(() => import("./pages/games/sandBox"));
const Settings = lazy(() => import("./pages/settings/settings"));

const RouterMain = props => {
  return (
    <>
      <GlobalLoader />
      <BrowserRouter>
        <Switch>
          <Route path="/logout" exact component={Logout} />
          <Route path="/login" exact component={Login} />
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
                  path="/games"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <Games {...props} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/games/:uuid/gameplays"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <SingleGame {...props} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/games/:uuid"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <GamePlay {...props} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/sandbox"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <SandBox {...props} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/settings"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <Settings {...props} />
                    </Suspense>
                  )}
                />
              </MainLayout>
            )}
          />
        </Switch>
      </BrowserRouter>
    </>
=======
const HomeIndex = lazy(() => import("./pages/homepage"));

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
      </Switch>
    </BrowserRouter>
>>>>>>> local
  );
};

export default RouterMain;
