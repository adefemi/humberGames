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
  const [balance, setBalance] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Single Product" });
    getProduct();
    getWalletTransactions();
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
    const month = moment().subtract(1, "month").toISOString();
    const today = moment().toISOString();

    axiosHandler({
      method: "get",
      url: PRODUCT_BALANCE_URL + `?productId=${props.match.params.id}`,
      token: getToken(),
      clientID: getClientId(),
    }).then((res) => {
      setBalance(res.sum);
    });
  };

  const getWalletTransactions = (extra = "") => {
    axiosHandler({
      method: "get",
      url: USER_WALLET_URL + `?customerId=${props.match.params.id}`,
      token: getToken(),
      clientID: getClientId(),
    }).then((res) => {
      let wallets = _.get(res, "data._embedded.wallets", []);
      wallets = wallets.map((item) => item.id);
      setWallets(wallets);
      console.log(wallets);

      setFetchingWallet(false);
    });
  };

  if (fetching) {
    return <Spinner color={secondaryColor} />;
  }

  return (
    <>
      <br />
      <Card className="padding-20">
        <div className="grid grid-2 grid-gap-2">
          <div>
            <div className="info">Product ID</div>{" "}
            <div className="content">{product.id}</div>
          </div>
          <div>
            <div className="info">Created At</div>{" "}
            <div className="content">
              {moment(new Date(product.created_at)).fromNow()}
            </div>
          </div>
          <div>
            <div className="info">Name</div>{" "}
            <div className="content">{product.name}</div>
          </div>
          <div>
            <div className="info">Amount</div>{" "}
            <div className="content">{product.amount}</div>
          </div>
          <div>
            <div className="info">Description</div>{" "}
            <div className="content">{product.description}</div>
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
      <Tabs
        heading={wallets.map((item, key) => `Wallet (${key + 1})`)}
        body={[
          wallets.map((item) => (
            <Wallet user fetching={fetchingWalletId} walletID={item} />
          )),
        ]}
        activeIndex={activeTab}
        onSwitch={setActiveTab}
      />

      <br />
    </>
  );
}

export default SingleProduct;
