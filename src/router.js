import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainLayout from "./components/mainLayout/mainLayout";
import GlobalLoader from "./components/GlobalLoader/globalLoader";
import Logout from "./components/logout/logout";
import Login from "./pages/login/login";

const Games = lazy(() => import("./pages/games/games"));
const SingleGame = lazy(() => import("./pages/games/singleGame"));
const GameInstance = lazy(() => import("./pages/games/gameInstance"));
const SandBox = lazy(() => import("./pages/games/sandBox"));
const Settings = lazy(() => import("./pages/settings/settings"));
const CreateGame = lazy(() => import("./pages/createGame/createGame"));

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
                      <Games {...props} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/instance/:uuid/:label"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <SingleGame {...props} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/games/create/:uuid/:label"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <CreateGame {...props} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/games/:uuid/:label"
                  exact
                  component={props => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <GameInstance {...props} />
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
  );
};

export default RouterMain;
