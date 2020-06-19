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
import { GAME_BUNDLE_URL, GAME_INSTANCE_URL } from "../../utils/urls";
import { Notification } from "../../components/notification/Notification";
import { TextAreaField } from "../../components/textarea/TextAreaField";
import { Button } from "../../components/button/Button";
import "./games.css";
import { cleanParameters } from "../campaign/campaign";

function NewBundle(props) {
  const {
    dispatch,
    state: { activeClient }
  } = useContext(store);

  const [bundleData, setBundleData] = useState({});
  const [gameInstance, setGameInstance] = useState([]);
  const [gameInstanceIds, setGameInstanceIds] = useState([]);
  const [fetchingInstance, setfetchingInstance] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch({
      type: setPageTitleAction,
      payload: ""
    });
    getGameInstances();
  }, []);

  const getGameInstances = _ => {
    axiosHandler({
      method: "get",
      token: getToken(),
      clientID: getClientId(),
      url: GAME_INSTANCE_URL + `?clientId=${activeClient.id}`
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
    axiosHandler({
      method: "post",
      url: GAME_BUNDLE_URL,
      data,
      token: getToken(),
      clientID: getClientId()
    }).then(
      _ => {
        Notification.bubble({
          type: "success",
          content: "Bundle created successfully"
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
            &nbsp; Create New Game Bundle
          </span>
        </div>
        <FormGroup label="Bundle Label">
          <Input
            name="label"
            required
            value={bundleData.label || ""}
            onChange={e => genericChangeSingle(e, setBundleData, bundleData)}
          />
        </FormGroup>
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
              // defaultOption={
              //     props.update &&
              //     !fetchingInstance &&
              //     getDefaultInstance(gameInstance, rewardData.gameInstance)
              // }
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
          Create Bundle
        </Button>
      </form>
      <br />
      <br />
    </div>
  );
}

export default NewBundle;
