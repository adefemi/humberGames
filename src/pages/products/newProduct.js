import React, { useContext, useEffect, useState } from "react";
import FormGroup from "../../components/formGroup/formGroup";
import { secondaryColor } from "../../utils/data";
import Input from "../../components/input/Input";
import { TextAreaField } from "../../components/textarea/TextAreaField";
import { Spinner } from "../../components/spinner/Spinner";
import { Button } from "../../components/button/Button";
import {
  setGlobalLoader,
  setPageTitleAction,
} from "../../stateManagement/actions";
import { store } from "../../stateManagement/store";

import "./product.css";
import { Notification } from "../../components/notification/Notification";
import AppIcon from "../../components/icons/Icon";
import {
  errorHandler,
  genericChangeSingle,
  getClientId,
  getToken,
} from "../../utils/helper";
import { axiosHandler } from "../../utils/axiosHandler";
import { PRODUCTS_URL, CLIENT_SETTING, REWARDS_URL } from "../../utils/urls";

import "../reward/reward.css";
import _ from "lodash";

function NewProduct(props) {
  const [submit, setSubmit] = useState(false);
  const [fetchingMain, setFetchingMain] = useState(props.duplicate);

  const [payload, setPayload] = useState({});

  const {
    dispatch,
    state: { activeClient },
  } = useContext(store);

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "New Product" });
  }, []);

  const onChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
    let contentData = payload;

    if (!contentData.name || contentData.name.length < 3) {
      Notification.bubble({
        type: "error",
        content: "Product name is too short!",
      });
      setSubmit(false);
    } else if (!contentData.amount || isNaN(contentData.amount)) {
      Notification.bubble({
        type: "error",
        content: "Product amount is required!",
      });
      setSubmit(false);
    } else if (
      !contentData.description ||
      contentData.description.length < 50
    ) {
      Notification.bubble({
        type: "error",
        content: "Product description is too short!",
      });
      setSubmit(false);
    } else {
      dispatch({
        type: setGlobalLoader,
        payload: {
          status: true,
          content: "Processing Request, this may take a while, Please wait...",
        },
      });
      axiosHandler({
        method: "post",
        clientID: getClientId(),
        token: getToken(),
        url: PRODUCTS_URL,
        data: contentData,
      }).then(
        (res) => {
          console.log(res);
          if (res.data.data.id) {
            Notification.bubble({
              type: "success",
              content: "Product added successfully!",
            });
            setSubmit(false);
            dispatch({
              type: setGlobalLoader,
              payload: {
                status: false,
                content: "",
              },
            });
            props.history.push(`/product/${res.data.data.id}`);
            return;
          }
        },
        (err) => {
          Notification.bubble({
            type: "error",
            content: errorHandler(err),
          });
          dispatch({
            type: setGlobalLoader,
            payload: {
              status: false,
              content: "",
            },
          });
          setSubmit(false);
        }
      );
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="newCampaign">
      <div className="flex align-center">
        <span onClick={() => props.history.goBack()} className="link">
          <AppIcon name="arrowLeft" type="feather" />{" "}
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <h3>New Product</h3>
      </div>
      <br />
      <div className="form-container-main">
        {fetchingMain ? (
          <Spinner color={secondaryColor} />
        ) : (
          <form onSubmit={onSubmit} className="main-container">
            <div className="grid grid-2 grid-gap-2">
              <FormGroup label="Name">
                <Input
                  placeholder="Enter product name"
                  name="name"
                  className="product-data"
                  required
                  value={payload.name || ""}
                  onChange={onChange}
                />
              </FormGroup>
            </div>

            <div className="grid grid-2 grid-gap-2">
              <FormGroup label="Amount">
                <Input
                  name="amount"
                  type="number"
                  placeholder="Enter product amount"
                  className="product-data"
                  required
                  value={payload.amount || ""}
                  onChange={onChange}
                />
              </FormGroup>
            </div>
            <br />
            <FormGroup label="Description">
              <textarea
                required
                placeholder="Enter Description"
                name="description"
                className="product-data"
                value={payload.description || ""}
                onChange={onChange}
              />
            </FormGroup>
            <br />

            <Button type="submit" loading={submit} disabled={submit}>
              Submit
            </Button>
          </form>
        )}
        <div>{/* <div className="sub-container" /> */}</div>
      </div>
      <br />
      <br />
    </div>
  );
}

export default NewProduct;
