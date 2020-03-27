import AppIcon from "../icons/Icon";
import Divider from "../Divider/divider";
import { Button } from "../button/Button";
import React, { useContext, useEffect, useState } from "react";
import "./orderSummary.css";
import { store } from "../../stateManagement/store";
import { getToken, numberWithCommas } from "../../utils/helper";
import { axiosHandler } from "../../utils/axiosHandler";
import { INITIATE_INVOICE_TRANSACTION_URL } from "../../utils/urls";
import { Notification } from "../notification/Notification";

function OrderSummary(props) {
  const [visibility, setVisibility] = useState(false);
  const [submit, setSubmit] = useState(false);
  const {
    state: { orderSummaryMain }
  } = useContext(store);
  const [data, setData] = useState({});

  useEffect(() => {
    if (orderSummaryMain.status) {
      setData(orderSummaryMain.data);
      setVisibility(true);
    }
  }, [orderSummaryMain]);

  const pay = () => {
    setSubmit(true);
    axiosHandler(
      "post",
      INITIATE_INVOICE_TRANSACTION_URL + data.id,
      getToken(),
      { callback_url: window.location.href }
    ).then(
      res => {
        window.location.href = res.data.results.authorization_url;
      },
      err => {
        Notification.bubble({
          type: "error",
          content: "Ops!, an error occurred"
        });
        setSubmit(false);
      }
    );
  };

  return (
    <div className={`order-summary-con ${visibility ? "show" : ""}`}>
      <div className="overlay" />
      <div className="summary-con">
        <div className="close" onClick={() => setVisibility(false)}>
          <AppIcon name="x" type="feather" />
        </div>
        {visibility && (
          <div className="inner">
            <h3>Order Summary</h3>
            <div className="summary-content">
              {data.fee_break_down &&
                data.fee_break_down.map((item, key) => (
                  <div className="flex align-center justify-between content-list">
                    <div className="info">{item.fee_title}</div>
                    <div className="context">{`${
                      item.currency_type
                    } ${numberWithCommas(item.amount)}`}</div>
                  </div>
                ))}
              <Divider />
              <div className="flex align-center justify-between content">
                <div className="info">
                  Total: <br />
                  <small>(Incl. VAT)</small>
                </div>
                <div className="context total">{`${
                  data.currency_type
                } ${numberWithCommas(data.total_payment)}`}</div>
              </div>
            </div>
            <br />
            <br />
            <Button
              color="success"
              loading={submit}
              disabled={submit}
              onClick={pay}
            >
              Complete Payment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderSummary;
