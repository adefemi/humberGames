import React, { useContext, useEffect, useState } from "react";
import { setPageTitleAction } from "../../stateManagement/actions";
import { axiosHandler } from "../../utils/axiosHandler";
import {
  PRODUCTS_URL,
  USER_WALLET_URL,
  PRODUCT_BALANCE_URL,
} from "../../utils/urls";
import { errorHandler, getClientId, getToken } from "../../utils/helper";
import { Notification } from "../../components/notification/Notification";
import { store } from "../../stateManagement/store";
import { Spinner } from "../../components/spinner/Spinner";
import { secondaryColor } from "../../utils/data";
import { Card } from "../../components/card/Card";
import { DATA, OPTIONS } from "./graphData";
import Graph from "../../components/graph/Graph";
import moment from "moment";
import "./product.css";
import Divider from "../../components/Divider/divider";
import AppIcon from "../../components/icons/Icon";

import { Tabs } from "../../components/tabs/tabs";
import _, { set } from "lodash";
import Wallet from "./wallet";
import { Button } from "../../components/button/Button";

function SingleProduct(props) {
  const { dispatch } = useContext(store);
  const [fetching, setFetching] = useState(true);
  const [fetchingWalletId, setFetchingWallet] = useState(true);
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [tab, setTab] = useState(0);
  const [wallets, setWallets] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Single Product" });
    getProduct();
    getWallet();
    getBalance();
  }, []);

  const getProduct = () => {
    axiosHandler({
      method: "get",
      url: PRODUCTS_URL + `/${props.match.params.id}`,
      token: getToken(),
      clientID: getClientId(),
    }).then(
      (res) => {
        setProduct(res.data.data);
        setFetching(false);
      },
      (err) => {
        Notification.bubble({
          type: "error",
          content: errorHandler(err),
        });
      }
    );
  };

  const getBalance = () => {
    let month = moment().subtract(1, "month").toISOString();
    month = month.replace("Z", "");
    let today = moment().toISOString();
    today = today.replace("Z", "");

    axiosHandler({
      method: "get",
      url:
        PRODUCT_BALANCE_URL +
        `?productId=${props.match.params.id}&startDate=${month}&endDate=${today}`,
      token: getToken(),
      clientID: getClientId(),
    }).then(
      (res) => {
        let balance = res.data.sum / 100;
        setBalance(balance);
        setFetching(false);
      },
      (err) => {
        Notification.bubble({
          type: "error",
          content: errorHandler(err),
        });
      }
    );
  };

  const getWallet = (extra = "") => {
    axiosHandler({
      method: "get",
      url: USER_WALLET_URL + `?customerId=${props.match.params.id}`,
      token: getToken(),
      clientID: getClientId(),
    }).then((res) => {
      let wallets = _.get(res, "data._embedded.wallets", []);
      setWallets(wallets);
      setFetchingWallet(false);
    });
  };

  if (fetching) {
    return <Spinner color={secondaryColor} />;
  }

  const Performance = (
    <div>
      <div className="computes">
        <Card heading="Total Revenue">
          <div className="contentCard">
            <br />
            <center>
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(balance)}
            </center>
            <br />
          </div>
        </Card>
        <Card heading="Total Payout">
          <div className="contentCard">
            <br />
            <center>0</center>
            <br />
          </div>
        </Card>
      </div>
      <br />
      <Card heading="Revenues vs Time">
        <div className="contentCard">
          <div className="graph-container">
            <div className="">
              <Graph
                options={OPTIONS}
                labels={DATA.labels}
                datasets={DATA.datasets}
                height={300}
                width={1000}
                className="transaction-graph"
              />
            </div>
          </div>
        </div>
      </Card>
      <br />
    </div>
  );

  const Wallets = (
    <div>
      <Tabs
        heading={wallets.map((item, key) => `Wallet (${key + 1})`)}
        body={[
          wallets.map((item) => (
            <Wallet
              user
              fetching={fetchingWalletId}
              productId={props.match.params.id}
              walletID={item.id}
              balance={item.balance}
            />
          )),
        ]}
        activeIndex={activeTab}
        onSwitch={setActiveTab}
      />
      <br />
    </div>
  );

  const Settings = (
    <div>
      <Card className="padding-20">
        <div
          className="grid grid-2 grid-gap-2"
          style={{ display: product ? "grid" : "none" }}
        >
          <div>
            <div className="info">Product ID</div>{" "}
            <div className="content">{product ? product.id : ""}</div>
          </div>
          <div>
            <div className="info">Created At</div>{" "}
            <div className="content">
              {product ? moment(new Date(product.created_at)).fromNow() : ""}
            </div>
          </div>
          <div>
            <div className="info">Name</div>{" "}
            <div className="content">{product ? product.name : ""}</div>
          </div>
          <div>
            <div className="info">Amount</div>{" "}
            <div className="content">{product ? product.amount : ""}</div>
          </div>
          <div>
            <div className="info">Description</div>{" "}
            <div className="content">{product ? product.description : ""}</div>
          </div>
          <div>
            <div className="info"></div>{" "}
            <div className="content">
              <Button
                onClick={() =>
                  props.history.push(`/product/${product.id}/edit`)
                }
              >
                Edit
              </Button>
            </div>
          </div>
        </div>
      </Card>
      <br />
    </div>
  );

  return (
    <>
      <Tabs
        heading={["Performance", "Wallets", "Settings"]}
        body={[Performance, Wallets, Settings]}
        activeIndex={tab}
        onSwitch={setTab}
      />
    </>
  );
}

export default SingleProduct;
