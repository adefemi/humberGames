import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainLayout from "./components/mainLayout/mainLayout";
import GlobalLoader from "./components/GlobalLoader/globalLoader";
import Logout from "./components/logout/logout";
import Login from "./pages/login/login";
import ForgotPassword from "./pages/login/forgotPassword";
import ChangePassword from "./pages/login/changePassword";

const Games = lazy(() => import("./pages/games/games"));
const Bundles = lazy(() => import("./pages/games/bundles"));
const NewBundle = lazy(() => import("./pages/games/newBundle"));
const SingleGame = lazy(() => import("./pages/games/singleGame"));
const SingleBundle = lazy(() => import("./pages/games/singleBundle"));
const GameInstance = lazy(() => import("./pages/games/gameInstance"));
const SandBox = lazy(() => import("./pages/games/sandBox"));
const Settings = lazy(() => import("./pages/settings/settings"));
const CreateGame = lazy(() => import("./pages/createGame/createGame"));
const Campaign = lazy(() => import("./pages/campaign/campaign"));
const NewCampaign = lazy(() => import("./pages/campaign/newCampaign"));
const SingleCampaign = lazy(() => import("./pages/campaign/singleCampaign"));
const NewReward = lazy(() => import("./pages/reward/newReward"));
const Reward = lazy(() => import("./pages/reward/reward"));
const SingleReward = lazy(() => import("./pages/reward/singleReward"));
const ClientDefinition = lazy(() => import("./pages/login/clientDefinition"));
const SingleDraw = lazy(() => import("./pages/games/singleDraw"));
const Users = lazy(() => import("./pages/users/users"));
const SingleUser = lazy(() => import("./pages/users/singleUser"));
const Payout = lazy(() => import("./pages/payouts/payouts"));
const Products = lazy(() => import("./pages/products/products"));
const NewProduct = lazy(() => import("./pages/products/newProduct"));
const UpdateProduct = lazy(() => import("./pages/products/updateProduct"));
const SingleProduct = lazy(() => import("./pages/products/singleProduct"));
const Billings = lazy(() => import("./pages/billings/billings"));
const Simulations = lazy(() => import("./pages/simulations/simulations"));

const RouterMain = (props) => {
  return (
    <>
      <GlobalLoader />
      <BrowserRouter>
        <Switch>
          <Route path="/logout" exact component={Logout} />
          <Route path="/login" exact component={Login} />
          <Route path="/forgot-password" exact component={ForgotPassword} />
          <Route path="/reset-password" exact component={ChangePassword} />
          <Route
            path="/client/:name"
            exact
            component={(props) => (
              <Suspense fallback={() => <h2>Loading...</h2>}>
                <ClientDefinition {...props} />
              </Suspense>
            )}
          />

          <Route
            path="/"
            component={(props) => (
              <MainLayout {...props}>
                <Route
                  path="/"
                  exact
                  component={(props) => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <Games {...props} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/game-bundles"
                  exact
                  component={(props) => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <Bundles {...props} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/game-bundles/create"
                  exact
                  component={(props) => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <NewBundle {...props} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/game-bundles/edit/:uuid"
                  exact
                  component={(props) => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <NewBundle {...props} edit />
                    </Suspense>
                  )}
                />
                <Route
                  path="/game-bundle/:uuid/:label"
                  exact
                  component={(props) => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <SingleBundle {...props} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/instance/:uuid/:label"
                  exact
                  component={(props) => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <SingleGame {...props} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/games/create/:uuid/:label"
                  exact
                  component={(props) => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <CreateGame {...props} />
                    </Suspense>
                  )}
                />

                <Route
                  path="/games/update/:uuid/:label"
                  exact
                  component={(props) => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <CreateGame {...props} update />
                    </Suspense>
                  )}
                />
                <Route
                  path="/payouts"
                  exact
                  component={(props) => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <Payout {...props} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/instance/draw/:uuid/:label"
                  exact
                  component={(props) => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <SingleDraw {...props} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/users"
                  exact
                  component={(props) => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <Users {...props} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/users/:uuid"
                  exact
                  component={(props) => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <SingleUser {...props} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/games/:uuid/:label"
                  exact
                  component={(props) => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <GameInstance {...props} />
                    </Suspense>
                  )}
                />

                <Route
                  path="/sandbox"
                  exact
                  component={(props) => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <SandBox {...props} />
                    </Suspense>
                  )}
                />

                <Route
                  path="/products"
                  exact
                  component={(props) => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <Products {...props} />
                    </Suspense>
                  )}
                />

                <Route
                  path="/products/new"
                  exact
                  component={(props) => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <NewProduct {...props} />
                    </Suspense>
                  )}
                />

                <Route
                  path="/product/:id/edit"
                  exact
                  component={(props) => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <UpdateProduct {...props} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/product/:id"
                  exact
                  component={(props) => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <SingleProduct {...props} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/simulations"
                  exact
                  component={(props) => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <Simulations {...props} />
                    </Suspense>
                  )}
                />
                <Route
                  path="/billings"
                  exact
                  component={(props) => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <Billings {...props} />
                    </Suspense>
                  )}
                />

                <Route
                  path="/campaigns"
                  exact
                  component={(props) => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <Campaign {...props} />
                    </Suspense>
                  )}
                />

                <Route
                  path="/campaigns/:uuid/active"
                  exact
                  component={(props) => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <SingleCampaign {...props} />
                    </Suspense>
                  )}
                />

                <Route
                  path="/campaigns/:uuid/duplicate"
                  exact
                  component={(props) => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <NewCampaign {...props} duplicate />
                    </Suspense>
                  )}
                />

                <Route
                  path="/campaigns/new"
                  exact
                  component={(props) => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <NewCampaign {...props} />
                    </Suspense>
                  )}
                />

                <Route
                  path="/rewards"
                  exact
                  component={(props) => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <Reward {...props} />
                    </Suspense>
                  )}
                />

                <Route
                  path="/reward/:uuid"
                  exact
                  component={(props) => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <SingleReward {...props} />
                    </Suspense>
                  )}
                />

                <Route
                  path="/rewards/new"
                  exact
                  component={(props) => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <NewReward {...props} />
                    </Suspense>
                  )}
                />

                <Route
                  path="/reward/update/:uuid"
                  exact
                  component={(props) => (
                    <Suspense fallback={() => <h2>Loading...</h2>}>
                      <NewReward {...props} update />
                    </Suspense>
                  )}
                />
                <Route
                  path="/settings"
                  exact
                  component={(props) => (
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
