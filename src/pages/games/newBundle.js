import React, { useContext, useEffect, useState } from "react";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import AppIcon from "../../components/icons/Icon";
import { secondaryColor } from "../../utils/data";
import FormGroup from "../../components/formGroup/formGroup";
import Input from "../../components/input/Input";
import {
  errorHandler,
  genericChangeSingle,
  getClientId,
  getToken
} from "../../utils/helper";
import { Select } from "../../components/select/Select";
import { axiosHandler } from "../../utils/axiosHandler";
import { GAME_BUNDLE_URL, GAME_INSTANCE_URL, PRODUCTS_URL } from "../../utils/urls";
import { Notification } from "../../components/notification/Notification";
import { TextAreaField } from "../../components/textarea/TextAreaField";
import { Button } from "../../components/button/Button";
import "./games.css";
import { cleanParameters } from "../campaign/campaign";
import { Spinner } from "../../components/spinner/Spinner";
import { formatProduct } from "../createGame/createGame";

function NewBundle(props) {
  const {
    dispatch,
    state: { activeClient }
  } = useContext(store);

  const [bundleData, setBundleData] = useState({});
  const [gameInstance, setGameInstance] = useState([]);
  const [gameInstanceIds, setGameInstanceIds] = useState([]);
  const [fetchingInstance, setfetchingInstance] = useState(true);
  const [fetching, setFetching] = useState(props.edit);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [fetchingProd, setFetchingProd] = useState(true);

  useEffect(() => {
    dispatch({
      type: setPageTitleAction,
      payload: ""
    });
    getGameInstances();
    if (props.edit) {
      getActiveBundle();
    }
    getProducts();
  }, []);

  const getActiveBundle = () => {
    axiosHandler({
      method: "get",
      url: GAME_BUNDLE_URL + `/${props.match.params.uuid}`,
      token: getToken(),
      clientID: getClientId()
    }).then(
      res => {
        setBundleData({
          amount: res.data.amount,
          label: res.data.label,
          desccription: res.data.desccription
        });
        setGameInstanceIds(res.data.gameInstanceIds);
        setFetching(false);
      },
      err => {
        Notification.bubble({
          type: "error",
          content: errorHandler(err)
        });
      }
    );
  };

  const getProducts = (extra = "") => {
    axiosHandler({
      method: "get",
      clientID: getClientId(),
      token: getToken(),
      url: PRODUCTS_URL,
    }).then(
      (res) => {
        setProducts(res.data.data);
        setFetchingProd(false);
      },
      (err) => {
        Notification.bubble({
          type: "error",
          content: errorHandler(err),
        });
      }
    );
  };

  const getGameInstances = _ => {
    axiosHandler({
      method: "get",
      token: getToken(),
      clientID: getClientId(),
      url: GAME_INSTANCE_URL + `?clientId=${getClientId()}`
    }).then(
      res => {
        if (res.data._embedded && res.data._embedded.gameInstances) {
          let newList = [];
          res.data._embedded.gameInstances.map(item => {
            newList.push({
              title: item.label,
              value: item.id
            });
            return null;
          });
          setGameInstance(newList);
          setfetchingInstance(false);
        }
      },
      err => {
        Notification.bubble({
          type: "error",
          content: errorHandler(err)
        });
      }
    );
  };

  const updateIdList = ({ target: { value } }) => {
    setGameInstanceIds([...gameInstanceIds, value]);
  };

  const removeId = id => {
    setGameInstanceIds(gameInstanceIds.filter((_, key) => key !== id));
  };

  const submit = e => {
    e.preventDefault();
    if (gameInstanceIds.length < 1) {
      Notification.bubble({
        type: "error",
        content: "You need to provide game instance"
      });
      return;
    }
    setLoading(true);
    const data = cleanParameters({ ...bundleData, gameInstanceIds });
    data.clientId = getClientId();
    data.userId = activeClient.userId;
    let method = "post";
    let url = GAME_BUNDLE_URL;
    if (props.edit) {
      method = "put";
      url = url + `/${props.match.params.uuid}`;
    }
    axiosHandler({
      method,
      url,
      data,
      token: getToken(),
      clientID: getClientId()
    }).then(
      _ => {
        Notification.bubble({
          type: "success",
          content: `Bundle ${props.edit ? "updated" : "created"} successfully`
        });
        props.history.push("/game-bundles");
      },
      err => {
        Notification.bubble({
          type: "error",
          content: errorHandler(err)
        });
        setLoading(false);
      }
    );
  };

  if (fetching) {
    return <Spinner color={secondaryColor} />;
  }

  return (
    <div>
      <br />
      <form className="bundle-form" onSubmit={submit}>
        <div className="top">
          <span>
            <span onClick={() => props.history.goBack()}>
              <AppIcon
                name="chevronLeft"
                type="feather"
                size={30}
                style={{ color: secondaryColor }}
                className="cursor-pointer"
              />
            </span>
            &nbsp; {props.edit ? "Update Bundle" : "Create New Game Bundle"}
          </span>
        </div>

        <div className="grid grid-2 grid-gap-2">
        <FormGroup label="Bundle Label">
          <Input
            name="label"
            required
            value={bundleData.label || ""}
            onChange={e => genericChangeSingle(e, setBundleData, bundleData)}
          />
        </FormGroup>
            <FormGroup label="Product">
              <Select placeholder={fetchingProd ? "loading products..." : "select a product"}
               optionList={formatProduct(products)} name="productId" onChange={e => genericChangeSingle(e, setBundleData, bundleData)}/>
            </FormGroup>
          </div>


        
        <div className="grid grid-2 grid-gap-2">
          <FormGroup label="Game Instance">
            <Select
              placeholder={
                fetchingInstance
                  ? "fetching game instances..."
                  : "--choose game instance--"
              }
              name="gameInstanceIds"
              dontSetValue
              onChange={updateIdList}
              optionList={gameInstance}
            />
          </FormGroup>
          <FormGroup label="Bundle Amount">
            <Input
              name="amount"
              type="number"
              required
              value={bundleData.amount || ""}
              onChange={e => genericChangeSingle(e, setBundleData, bundleData)}
            />
          </FormGroup>
        </div>
        {gameInstanceIds.length > 0 && (
          <div className="game_id_selection">
            <h3>Selected Instance IDs</h3>
            {gameInstanceIds.map((item, key) => (
              <li key={key}>
                <span>{item}</span>{" "}
                <span onClick={() => removeId(key)}>
                  <AppIcon name="x" type="feather" />
                </span>{" "}
              </li>
            ))}
          </div>
        )}
        <br />
        <FormGroup label="Description (optional)">
          <TextAreaField
            name="desccription"
            value={bundleData.desccription || ""}
            onChange={e => genericChangeSingle(e, setBundleData, bundleData)}
          />
        </FormGroup>

        <br />
        <br />
        <Button type="submit" loading={loading} disabled={loading}>
          {props.edit ? "Update" : "Create Bundle"}
        </Button>
      </form>
      <br />
      <br />
    </div>
  );
}

export default NewBundle;
