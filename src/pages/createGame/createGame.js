import React, { useContext, useEffect, useState } from "react";
import "./createGame.css";
import { Notification } from "../../components/notification/Notification";
import FormGroup from "../../components/formGroup/formGroup";
import CurrencyInput from "../../components/currencyInput/currencyInput";
import {
  errorHandler,
  genericChangeSingle,
  getArrayCount,
  getClientId,
  getToken
} from "../../utils/helper";
import DatePicker from "../../components/DatePicker/datePicker";
import { Button } from "../../components/button/Button";
import AppIcon from "../../components/icons/Icon";
import Input from "../../components/input/Input";
import { Select } from "../../components/select/Select";
import { primaryColor, secondaryColor } from "../../utils/data";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import { axiosHandler } from "../../utils/axiosHandler";
import { GAME_INSTANCE_URL, GAME_PRICE_URL, GAME_URL } from "../../utils/urls";
import { Spinner } from "../../components/spinner/Spinner";

const CreateGame = props => {
  const [gameData, setGameData] = useState({});
  const [gameConfig, setGameConfig] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [gameType, setGameType] = useState("");
  const [activeGame, setActiveGame] = useState(null);

  const {
    dispatch,
    state: { userDetails }
  } = useContext(store);

  useEffect(() => {
    dispatch({
      type: setPageTitleAction,
      payload: props.match.params.label.toUpperCase()
    });
    getActiveGame();
  }, []);

  const getActiveGame = () => {
    axiosHandler({
      method: "get",
      url: GAME_URL + `?id=${props.match.params.uuid}`,
      token: getToken(),
      clientID: getClientId()
    }).then(res => {
      setActiveGame(res.data._embedded.games[0]);
      setGameType(res.data._embedded.games[0].type);
      setFetching(false);
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    const data = {
      ...gameData,
      productId: null,
      isActive: true,
      gameConfig: gameConfig,
      game: activeGame._links.self.href,
      userId: userDetails.userId,
      clientId: getClientId(),
      startDate: gameData.endDate + " 00:00:00",
      endDate: gameData.endDate + " 00:00:00"
    };
    axiosHandler({
      method: "post",
      url: GAME_INSTANCE_URL,
      data,
      token: getToken(),
      clientID: getClientId()
    })
      .then(res => {
        Notification.bubble({
          type: "success",
          content: "Game instance created successfully"
        });
        props.history.goBack();
      })
      .catch(err => {
        Notification.bubble({
          type: "error",
          content: errorHandler(err)
        });
        setLoading(false);
      });
  };

  if (fetching) {
    return (
      <div>
        <br />
        <Spinner size={20} color={secondaryColor} />
      </div>
    );
  }

  return (
    <div className="newGame">
      <div className="flex align-center">
        <span onClick={() => props.history.goBack()} className="link">
          <AppIcon name="arrowLeft" type="feather" />{" "}
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <h3>Add Game Instance</h3>
      </div>
      <div className="form-container-main">
        <form onSubmit={onSubmit} className="main-container">
          <FormGroup label="Game Label">
            <Input
              onChange={e => genericChangeSingle(e, setGameData, gameData)}
              value={gameData.label || ""}
              name={"label"}
              placeholder="Specify game label"
              required
            />
          </FormGroup>
          {/*<FormGroup label="Cost Type">*/}
          {/*  <div className="flex align-center">*/}
          {/*    <Radio*/}
          {/*      onChange={() => setPropertyType("fixed")}*/}
          {/*      name="fixed"*/}
          {/*      label="Fixed"*/}
          {/*      checked={propertyType === "fixed"}*/}
          {/*    />*/}
          {/*    &nbsp; &nbsp; &nbsp; &nbsp;*/}
          {/*    <Radio*/}
          {/*      onChange={() => setPropertyType("computed")}*/}
          {/*      name="computed"*/}
          {/*      label="Computed"*/}
          {/*      checked={propertyType === "computed"}*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*</FormGroup>*/}
          {/*<br />*/}
          {/*<FormGroup label="Total Operational Budget">*/}
          {/*  <CurrencyInput*/}
          {/*    onChange={e => genericChangeSingle(e, setGameData, gameData)}*/}
          {/*    value={gameData.opBudget || 0}*/}
          {/*    name={"opBudget"}*/}
          {/*    required*/}
          {/*    defaultCurrencyOption={{*/}
          {/*      title: "NGN",*/}
          {/*      value: "NGN"*/}
          {/*    }}*/}
          {/*  />*/}
          {/*</FormGroup>*/}
          {/*<FormGroup label={propertyType === "fixed" ? "Cost" : "Revenue"}>*/}
          {/*  <CurrencyInput*/}
          {/*    onChange={e => genericChangeSingle(e, setGameData, gameData)}*/}
          {/*    value={gameData.cost || 0}*/}
          {/*    name={"cost"}*/}
          {/*    required*/}
          {/*    defaultCurrencyOption={{*/}
          {/*      title: "NGN",*/}
          {/*      value: "NGN"*/}
          {/*    }}*/}
          {/*  />*/}
          {/*</FormGroup>*/}
          <div className="grid grid-2 grid-gap-2">
            <FormGroup label="Amount">
              <CurrencyInput
                onChange={e =>
                  genericChangeSingle(e, setGameData, gameData, true)
                }
                value={gameData.amount || 0}
                name={"amount"}
                required
                defaultCurrencyOption={{
                  title: "NGN",
                  value: "NGN"
                }}
              />
            </FormGroup>
            <FormGroup label="End Date">
              <DatePicker
                id={1}
                onChange={e => genericChangeSingle(e, setGameData, gameData)}
                name={"endDate"}
                required
                disablePastDate
              />
            </FormGroup>
          </div>
          <br />
          {/*{gameType === "instant" && (*/}
          {/*  <>*/}
          {/*    <h3>Set EndDate</h3>*/}
          {/*    <DatePicker id={1} />*/}
          {/*  </>*/}
          {/*)}*/}

          {/*{gameType.toLowerCase() === "raffle" && (*/}
          {/*  <>*/}
          {/*    <h3>Set Game Duration</h3>*/}
          {/*    <p />*/}
          {/*    <div>*/}
          {/*      <FormGroup label="Duration Type">*/}
          {/*        <Select*/}
          {/*          onChange={e =>*/}
          {/*            genericChangeSingle(e, setGameData, gameData)*/}
          {/*          }*/}
          {/*          value={gameData.duration || ""}*/}
          {/*          name={"duration"}*/}
          {/*          defaultOption={durationType[0]}*/}
          {/*          optionList={durationType}*/}
          {/*          required*/}
          {/*        />*/}
          {/*      </FormGroup>*/}
          {/*      <FormGroup label="Start time">*/}
          {/*        <TimePicker />*/}
          {/*      </FormGroup>*/}
          {/*      <FormGroup label="End time">*/}
          {/*        <TimePicker />*/}
          {/*      </FormGroup>*/}
          {/*    </div>*/}
          {/*    {(gameData.duration === "weekly" ||*/}
          {/*      gameData.duration === "monthly") && (*/}
          {/*      <div className="grid grid-3 grid-gap-2">*/}
          {/*        <FormGroup label="Start Date">*/}
          {/*          <DatePicker*/}
          {/*            dateType={*/}
          {/*              gameData.duration === "weekly" ? "week" : "date"*/}
          {/*            }*/}
          {/*            id={2}*/}
          {/*          />*/}
          {/*        </FormGroup>*/}
          {/*        <FormGroup label="End Date">*/}
          {/*          <DatePicker*/}
          {/*            dateType={*/}
          {/*              gameData.duration === "weekly" ? "week" : "date"*/}
          {/*            }*/}
          {/*            id={3}*/}
          {/*          />*/}
          {/*        </FormGroup>*/}
          {/*      </div>*/}
          {/*    )}*/}
          {/*  </>*/}
          {/*)}*/}
          {activeGame.requiredGameConfig.length > 0 && (
            <>
              <h3>Game Configurations</h3>
              <br />
              <div className="grid grid-2 grid-gap-h-2">
                {activeGame.requiredGameConfig.map((item, key) => {
                  return (
                    <FormGroup key={key} label={item}>
                      <Input
                        required
                        name={item}
                        value={gameConfig[item]}
                        onChange={e =>
                          genericChangeSingle(e, setGameConfig, gameConfig)
                        }
                      />
                    </FormGroup>
                  );
                })}
              </div>
            </>
          )}
          <Button
            loading={loading}
            disabled={loading}
            type="submit"
            className="createButton"
          >
            Submit
          </Button>
        </form>
        <div>
          <div className="sub-container" />
        </div>
      </div>

      <br />
      <br />
    </div>
  );
};

export default CreateGame;
